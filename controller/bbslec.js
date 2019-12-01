const bbslecModel = require('../Models/bbslec');
const profileModel = require('../Models/profile');

exports.bbslec_getall = (req, res) => {
    bbslecModel
        .find()
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    count: docs.length,
                    results: docs
                });
            }
        })
        .catch(err => res.json(err.message));
};

exports.bbslec_post = async (req, res) => {


    const newPost = new bbslecModel({

        user: req.user.id,
        title: req.body.title,
        desc: req.body.desc,
        files: req.file.path,
        link: req.body.link,
        tag: req.body.tag,


    });

    await newPost.save()
        .then(post =>
            res.status(200).json({
                msg: 'created Post',
                post: post,
            }))
        .catch(err => res.json(err));

};

exports.bbslec_like = (req, res) => {
    profileModel
        .findOne({ user: req.user.id })
        .then(profile => {
            bbslecModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            msg: "User already Liked this post"
                        });
                    }
                    post.likes.unshift({ user: req.user.id });
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
};

exports.bbslec_unlike = (req, res) => {
    // profileModel
    //     .findOne({user: req.user.id})
    //     .then(profile => {
    //         bbslecModel
    //             .findById(req.params.post_id)
    //             .then(post => {
    //                 if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
    //                     return res.status(400).json({
    //                         msg: "You have not liked this post"
    //                     })
    //                 } else {
    //                     const removeIndex = post.likes
    //                         .map(item = item.user.toString())
    //                         .indexOf(req.user.id)

    //                     post.likes.splice(removeIndex, 1);    
    //                     post.save().then(post => res.json(post));
    //                 }
    //             })
    //             .catch(err => res.json(err));
    //     })
    //     .catch(err => res.json(err));


    profileModel
        .findOne({ user: req.user.id })
        .then(profile => {
            bbslecModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            msg: "You have not liked this post"
                        })
                    } else {
                        //get remove index
                        const removeIndex = post.likes
                            .map(item => item.user.toString())
                            .indexOf(req.user.id)

                        //splice out of array
                        post.likes.splice(removeIndex, 1);

                        //save
                        post.save().then(post => res.json(post));
                    }
                })
                .catch(err => res.json(err));
        })
        .catch(err => res.status(404).json({
            msg: "no post found"
        }));
};