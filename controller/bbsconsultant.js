const consultantModel = require('../Models/bbsconsultant');
const profileModel = require('../Models/profile');


exports.bbsconsultant_getall = (req, res) => {
    consultantModel
        .find()
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    consultantCount: docs.length,
                    consultantInfo: docs
                });
            }
        })
        .catch(err => res.json(err));
};

exports.bbsconsultant_post = async (req, res) => {


    const newPost = new consultantModel({

        user: req.user.id,
        title: req.body.title,
        desc: req.body.desc,
        tag: req.body.tag


    });

    await newPost.save()
        .then(post =>
            res.status(200).json({
                msg: 'created consultant',
                post: post,
            }))
        .catch(err => res.json(err));

};

