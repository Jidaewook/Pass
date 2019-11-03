const bbsworkModel = require('../Models/bbswork');
const profileModel = require('../Models/profile');

exports.bbswork_getall = (req, res) => {
    bbsworkModel
        .find()
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    bbsCount: docs.length,
                    bbsInfo: docs
                });
            }
        })
        .catch(err => res.json(err));
};

exports.bbswork_post = async (req, res) => {
    const newPost = new bbsworkModel({
        user: req.user.id,
        title: req.body.title,
        desc: req.body.desc,
        // files: req.file.path,
        link: req.body.link,
        // image: req.body.image


    });

    await newPost.save()
        .then(post =>
            res.status(200).json({
                msg: 'created Post',
                post: post,
            }))
        .catch(err => res.json(err));
    
};

exports.bbswork_like = (req, res) => {
    profileModel
        .findOne({ user: req.user.id })
        .then(profile => {
            bbsworkModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            msg: "User already liked this post"
                        });
                    }
                    //unshift는 최신순으로 보여주는 걸 의미.
                    post.likes.unshift({ user: req.user.id });
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({
                    msg: "no Post found"
                }));
        })
        .catch(err => res.json(err));
};

exports.bbswork_unlike = (req, res) => {
    profileModel
        .findOne({ user: req.user.id })
        .then(profile => {
            bbsworkModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        msg: "You have not liked this post"
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