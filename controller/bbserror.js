const errorModel = require('../Models/bbserror');

exports.bbserror_getall = (req, res) => {
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
};

exports.bbserror_post = async (req, res) => {


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

};