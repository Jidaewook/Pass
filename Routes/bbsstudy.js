const express = require('express');
const router = express.Router();
const bbsstudyController = require('../controller/bbsstudy');

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


router.get('/', authCheck, bbsstudyController.bbsstudy_getall);

// //@route localhost:3000/bbsstudy
// //@desc bbsstudy에 새로 등록(post)한다.
// //@auth private

router.post('/', authCheck, upload.single('files'), bbsstudyController.bbsstudy_post);


//@route localhost:3000/bbsstudy/like/:post_id
//@desc LEC 게시글에 좋아요 누르기
//@auth private

router.post('/like/:post_id', authCheck, bbsstudyController.bbsstudy_like);

//@route localhost:3000/bbsstudy/unlike/:post_id
//@desc LEC 게시글 좋아요 해제
//@auth private

router.post('/unlike/:post_id', authCheck, bbsstudyController.bbsstudy_unlike);



module.exports = router;