const express = require('express');

const router = express.Router();
const bbslecModel = require('../Models/bbslec');
const profileModel = require('../Models/profile');

const bbsleccontroller = require('../controller/bbslec');
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

//@route localhost:3000/bbs
//@desc bbs에 새로 등록(post)한 게시물을 데려온다. 
//@auth private


router.get('/', authCheck, bbsleccontroller.bbslec_getall);

// router.get('/:bbsid', authCheck, (req, res) => {
//     bbslecModel
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

router.post('/', authCheck, upload.single('files'), bbsleccontroller.bbslec_post);


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

//     bbslecModel
//         .remove({_id: req.params.bbsid})
//         .then(()=> res.json({success: true}))
//         .catch(err => res.status(400).json(err));
// })


//@route localhost:3000/bbslec/like/:post_id
//@desc LEC 게시글에 좋아요 누르기
//@auth private

router.post('/like/:post_id', authCheck, bbsleccontroller.bbslec_like);

//@route localhost:3000/bbslec/unlike/:post_id
//@desc LEC 게시글 좋아요 해제
//@auth private

router.post('/unlike/:post_id', authCheck, bbsleccontroller.bbslec_unlike);



// profileModel
//     .findOne({ user: req.user.id })
//     .then(profile => {
//         bbsworkModel
//             .findById(req.params.post_id)
//             .then(post => {
//                 if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
//                     msg: "You have not liked this post"
//                 } else {
//                     //get remove index
//                     const removeIndex = post.likes
//                         .map(item => item.user.toString())
//                         .indexOf(req.user.id)

//                     //splice out of array
//                     post.likes.splice(removeIndex, 1);

//                     //save
//                     post.save().then(post => res.json(post));
//                 }
//             })
//             .catch(err => res.json(err));
//     })
//     .catch(err => res.status(404).json({
//         msg: "no post found"
//     }));
module.exports = router;