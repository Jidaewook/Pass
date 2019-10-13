const express = require('express');

const router = express.Router();
const bbsworkModel = require('../Models/bbswork');
const passport = require('passport');
const authCheck = passport.authenticate('jwt', { session: false });
//@route localhost:3000/bbs
//@desc bbs에 새로 등록(post)한 게시물을 데려온다. 
//@auth private


// router.get('/', authCheck, (req, res) => {
//     // bbsworkModel
//     //     .find()
//     //     .then(docs => {
//     //         if (docs.length <= 0) {
//     //             return res.status(400).json({
//     //                 msg: 'Data is none'
//     //             });
//     //         } else {
//     //             res.status(200).json({
//     //                 bbsCount: docs.length,
//     //                 bbsInfo: docs
//     //             });
//     //         }
//     //     })
//     //     .catch(err => res.json(err));
// });

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

router.post('/', authCheck, async (req, res) => {
    const newPost = new bbsModel({
        method: req.body.workbook,
        workbook: {
            author: req.user._id,
            title: req.body.title,
            desc: req.body.desc,
            files: req.body.files,
            link: req.body.link,
            // image: req.body.image

        }
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

module.exports = router;