const studyModel = require('../Models/bbsstudy');
const profileModel = require('../Models/profile');

exports.bbsstudy_getall = (req, res) => {
    studyModel
        .find()
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    studyCount: docs.length,
                    studyInfo: docs
                });
            }
        })
        .catch(err => res.json(err));
};

exports.bbsstudy_post = async (req, res) => {


    const newPost = new studyModel({

        user: req.user.id,
        title: req.body.title,
        desc: req.body.desc,
        files: req.file.path,
        link: req.body.link,
        tag: req.body.tag


    });

    await newPost.save()
        .then(post =>
            res.status(200).json({
                msg: 'created study',
                post: post,
            }))
        .catch(err => res.json(err));

};

exports.bbsstudy_like = (req, res) => {
    profileModel
        .findOne({ user: req.user.id })
        .then(profile => {
            studyModel
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

exports.bbsstudy_unlike = (req, res) => {
    profileModel
        .findOne({ user: req.user.id })
        .then(profile => {
            studyModel
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