const express = require('express');

const router = express.Router();
const bbsworkModel = require('../Models/bbswork');
const profileModel = require('../Models/profile');
const passport = require('passport');
const authCheck = passport.authenticate('jwt', { session: false });

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject Files
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter

      
});


//@route localhost:3000/bbs
//@desc bbs에 새로 등록(post)한 게시물을 데려온다. 
//@auth private


router.get('/', authCheck, (req, res) => {
    bbsworkModel
        .find()
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    bbsCount: docs.length,
                    bbsInfo: docs
                });
            }
        })
        .catch(err => res.json(err));
});

// router.get('/:bbsid', authCheck, (req, res) => {
//     bbsworkModel
//         .find({_id: req.params.bbsid})
//         .then(docs => res.status(200).json({
//             docsCount: docs.length,
//             doc_info: docs
//         }))
//         .catch(err => res.status(400).json({err}));
// })

// //@route localhost:3000/bbs
// //@desc bbs에 새로 등록(post)한다.
// //@auth private

router.post('/', authCheck, upload.single('files'), async (req, res) => {
    const newPost = new bbsworkModel({
            user: req.user.id,
            title: req.body.title,
            desc: req.body.desc,
            files: req.file.path,
            link: req.body.link,
            // image: req.body.image

        
    });

    await newPost.save()
            .then(post => 
                res.status(200).json({
                    msg: 'created Post',
                    post: post,
                }))
            .catch(err => res.json(err));
    // const newBbs = new bbsModel({
    //     title: req.body.title,
    //     desc: req.body.desc

    // })
    // newBbs.save()
    //     .then(bbs => res.json(bbs))
    //     .catch(err=> res.status(400).json({err}));
})


// //@route localhost:3000/bbs
// //@desc bbs에 등록(post)된 게시물을 수정(patch)한다.
// //@auth private

// router.patch('/', authCheck, (req, res) => {
//     res.status(200).json({
//         msg: 'bbs patch'
//     })
// })

// //@route localhost:3000/bbs
// //@desc bbs에 등록(post)된 게시물을 삭제(delete)한다.
// //@auth private

// router.delete('/:bbsid', authCheck, (req, res) => {

//     bbsworkModel
//         .remove({_id: req.params.bbsid})
//         .then(()=> res.json({success: true}))
//         .catch(err => res.status(400).json(err));
// })

//@route POST localhost:3000/bbswork/like/:post_id
//@desc Like bbswork
//@access Private

router.post('/like/:post_id', authCheck, (req, res) => {
    profileModel
        .findOne({user: req.user.id})
        .then(profile => {
            bbsworkModel
                .findById(req.params.post_id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({
                            msg: "User already liked this post"
                        });
                    } 
                    //unshift는 최신순으로 보여주는 걸 의미.
                    post.likes.unshift({user: req.user.id});
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    msg: "no Post found"
                }));
        })
        .catch(err => res.json(err));
});

//@route POST api/posts/unlike/:post_id
//@desc Unlike post
//@access Private

//:post_id는 좋아요/좋아요취소를 위해 선택하는 게시글의 주소를 의미함
router.post('/unlike/:post_id', authCheck, (req, res) => {
    profileModel
        .findOne({user: req.user.id})
        .then(profile => {
            bbsworkModel
                .findById(req.params.post_id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        msg: "You have not liked this post"
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