const express = require('express');

const router = express.Router();
const bbsModel = require('../Models/bbs');
const passport = require('passport');
const authCheck = passport.authenticate('jwt', { session: false });
//@route localhost:3000/bbs
//@desc bbs에 새로 등록(post)한 게시물을 데려온다. 
//@auth private

router.get('/:bbsid', authCheck, (req, res) => {
    bbsModel
        .find({_id: req.params.bbsid})
        .then(docs => res.status(200).json({
            docsCount: docs.length,
            doc_info: docs
        }))
        .catch(err => res.status(400).json({err}));
})

//@route localhost:3000/bbs
//@desc bbs에 새로 등록(post)한다.
//@auth private

router.post('/', authCheck, (req, res) => {
    const newBbs = new bbsModel({
        title: req.body.title,
        desc: req.body.desc

    })
    newBbs.save()
        .then(bbs => res.json(bbs))
        .catch(err=> res.status(400).json({err}));
})


//@route localhost:3000/bbs
//@desc bbs에 등록(post)된 게시물을 수정(patch)한다.
//@auth private

router.patch('/', authCheck, (req, res) => {
    res.status(200).json({
        msg: 'bbs patch'
    })
})

//@route localhost:3000/bbs
//@desc bbs에 등록(post)된 게시물을 삭제(delete)한다.
//@auth private

router.delete('/:bbsid', authCheck, (req, res) => {

    bbsModel
        .remove({_id: req.params.bbsid})
        .then(()=> res.json({success: true}))
        .catch(err => res.status(400).json(err));
})

module.exports = router;