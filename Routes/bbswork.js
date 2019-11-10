const express = require('express');

const router = express.Router();
const bbsworkModel = require('../Models/bbswork');
const profileModel = require('../Models/profile');
const bbsworkController = require('../controller/bbswork');

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


router.get('/', bbsworkController.bbswork_getall);

router.get('/:bbsid', (req, res) => {
    bbsworkModel
        .find({_id: req.params.bbsid})
        .then(docs => res.status(200).json({
            docsCount: docs.length,
            doc_info: docs
        }))
        .catch(err => res.status(400).json({err}));
})

// //@route localhost:3000/bbs
// //@desc bbs에 새로 등록(post)한다.
// //@auth private

router.post('/', authCheck, upload.single('files'), bbsworkController.bbswork_post);


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

router.post('/like/:post_id', authCheck, bbsworkController.bbswork_like);

//@route POST api/posts/unlike/:post_id
//@desc Unlike post
//@access Private

//:post_id는 좋아요/좋아요취소를 위해 선택하는 게시글의 주소를 의미함
router.post('/unlike/:post_id', authCheck, bbsworkController.bbswork_unlike);


module.exports = router;