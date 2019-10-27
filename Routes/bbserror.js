const express = require('express');

const router = express.Router();
const errorModel = require('../Models/bbserror');
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

//@route localhost:3000/bbserror
//@desc bbserror에 새로 등록(post)한 게시물을 데려온다. 
//@auth private


router.get('/', authCheck, (req, res) => {
    errorModel
        .find()
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    errorCount: docs.length,
                    errorInfo: docs
                });
            }
        })
        .catch(err => res.json(err));
});

// //@route localhost:3000/bbserror
// //@desc bbserror에 새로 등록(post)한다.
// //@auth private

router.post('/', authCheck, upload.single('files'), async (req, res) => {
    
    
    const newPost = new errorModel({

            user: req.user.id,
            title: req.body.title,
            desc: req.body.desc,
            tag: req.body.tag
    
            
    });

    await newPost.save()
            .then(post => 
                res.status(200).json({
                    msg: 'created error',
                    post: post,
                }))
            .catch(err => res.json(err));

})



module.exports = router;