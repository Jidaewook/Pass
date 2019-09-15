const express = require('express');

const router = express.Router();

//@route localhost:3000/profile
//@desc profile에 새로 등록(post)한 게시물을 데려(get)온다. 
//@auth private

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "profile get"
    })
})

//@route localhost:3000/profile
//@desc profile에 새로 등록(post)한다.
//@auth private

router.post('/', (req, res) => {
    res.status(200).json({
        msg: 'profile post'
    })
})


//@route localhost:3000/profile
//@desc profile에 등록(post)된 게시물을 수정(patch)한다.
//@auth private

router.patch('/', (req, res) => {
    res.status(200).json({
        msg: 'profile patch'
    })
})

//@route localhost:3000/profile
//@desc profile에 등록(post)된 게시물을 삭제(delete)한다.
//@auth private

router.delete('/', (req, res) => {
    res.status(200).json({
        msg: 'profile delete'
    })
})

module.exports = router;