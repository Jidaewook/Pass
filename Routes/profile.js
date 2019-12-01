const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportConf = require('../config/passport');
const authCheck = passport.authenticate('jwt', { session: false });

const profileController = require('../controller/profile');

//@route localhost:5000/profile
//@desc profile에 새로 등록(post)한 게시물을 데려(get)온다. 
//@auth private

router.get('/', authCheck, profileController.profiles_getall);

//@route localhost:5000/profile
//@desc profile에 새로 등록(post)한다.
//@auth private

router.post('/', authCheck, profileController.profile_post);


//@route localhost:5000/profile
//@desc profile에 등록(post)된 게시물을 수정(patch)한다.
//@auth private

router.patch('/', profileController.profile_patch);

//@route localhost:5000/profile
//@desc profile에 등록(post)된 게시물을 삭제(delete)한다.
//@auth private

router.delete('/', profileController.profile_delete);

module.exports = router;