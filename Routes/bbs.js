const express = require('express');

const router = express.Router();


//@route localhost:3000/bbs
//@desc bbs에 새로 등록(post)한 게시물을 데려온다. 
//@auth private

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "bbs get"
    })
})

//@route localhost:3000/bbs
//@desc bbs에 새로 등록(post)한다.
//@auth private

router.post('/', (req, res) => {
    res.status(200).json({
        msg: 'bbs post'
    })
})


//@route localhost:3000/bbs
//@desc bbs에 등록(post)된 게시물을 수정(patch)한다.
//@auth private

router.patch('/', (req, res) => {
    res.status(200).json({
        msg: 'bbs patch'
    })
})

//@route localhost:3000/bbs
//@desc bbs에 등록(post)된 게시물을 삭제(delete)한다.
//@auth private

router.delete('/', (req, res) => {
    res.status(200).json({
        msg: 'bbs delete'
    })
})

module.exports = router;