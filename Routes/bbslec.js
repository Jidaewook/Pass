const express = require('express');

const router = express.Router();
const bbslecModel = require('../Models/bbslec');

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

//@route localhost:5000/bbs
//@desc bbs에 새로 등록(post)한 게시물을 데려온다. 
//@auth private


router.get('/', bbsleccontroller.bbslec_getall);

router.get('/:bbsid', (req, res) => {
    bbslecModel
        .find({_id: req.params.bbsid})
        .then(docs => res.status(200).json({
            docsCount: docs.length,
            doc_info: docs
        }))
        .catch(err => res.status(400).json({err}));
})

// //@route localhost:5000/bbs
// //@desc bbs에 새로 등록(post)한다.
// //@auth private

router.post('/', authCheck, upload.single('files'), bbsleccontroller.bbslec_post);


//@route localhost:5000/bbslec/like/:post_id
//@desc LEC 게시글에 좋아요 누르기
//@auth private

router.post('/like/:post_id', authCheck, bbsleccontroller.bbslec_like);

//@route localhost:5000/bbslec/unlike/:post_id
//@desc LEC 게시글 좋아요 해제
//@auth private

router.post('/unlike/:post_id', authCheck, bbsleccontroller.bbslec_unlike);



module.exports = router;