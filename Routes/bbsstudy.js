const express = require('express');

const router = express.Router();
const studyModel = require('../Models/bbsstudy');
const profileModel = require('../Models/profile');
const passport = require('passport');
const authCheck = passport.authenticate('jwt', { session: false });
//multer는 파일첨부할 수 있게 하는 라이브러리
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');

    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a File
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter


});

//@route localhost:3000/bbsstudy
//@desc bbsstudy에 새로 등록(post)한 게시물을 데려온다. 
//@auth private


router.get('/', authCheck, (req, res) => {
    studyModel
        .find()
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    studyCount: docs.length,
                    studyInfo: docs
                });
            }
        })
        .catch(err => res.json(err));
});

// //@route localhost:3000/bbsstudy
// //@desc bbsstudy에 새로 등록(post)한다.
// //@auth private

router.post('/', authCheck, upload.single('files'), async (req, res) => {
    
    
    const newPost = new studyModel({

            user: req.user.id,
            title: req.body.title,
            desc: req.body.desc,
            files: req.file.path,
            link: req.body.link,
            tag: req.body.tag
    
            
    });

    await newPost.save()
            .then(post => 
                res.status(200).json({
                    msg: 'created study',
                    post: post,
                }))
            .catch(err => res.json(err));

})


//@route localhost:3000/bbsstudy/like/:post_id
//@desc LEC 게시글에 좋아요 누르기
//@auth private

router.post('/like/:post_id', authCheck, (req, res) => {
    profileModel
        .findOne({user:req.user.id})
        .then(profile => {
            studyModel
                .findById(req.params.post_id)
                .then(post =>{
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({
                            msg: "User already Liked this post"
                        });
                    }
                    post.likes.unshift({user: req.user.id});
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
})

//@route localhost:3000/bbsstudy/unlike/:post_id
//@desc LEC 게시글 좋아요 해제
//@auth private

router.post('/unlike/:post_id', authCheck, (req, res) => {
    profileModel
        .findOne({ user: req.user.id })
        .then(profile => {
            studyModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            msg: "You have not liked this post"
                        })
                    } else {
                        //get remove index
                        const removeIndex = post.likes
                            .map(item => item.user.toString())
                            .indexOf(req.user.id)

                        //splice out of array
                        post.likes.splice(removeIndex, 1);

                        //save
                        post.save().then(post => res.json(post));
                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.status(404).json({
            msg: "no post found"
        }));
})



module.exports = router;