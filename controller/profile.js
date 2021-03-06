const profileModel = require('../Models/profile');


exports.profiles_getall = (req, res) => {
    profileModel
        .find()
        .populate('user', ['local.email, local.avatar'])
        .then(docs => {
            if (docs.length <= 0) {
                return res.status(400).json({
                    msg: 'Data is none'
                });
            } else {
                res.status(200).json({
                    profileCount: docs.length,
                    profileInfo: docs
                });
            }
        })
        .catch(err => res.json(err));
};

exports.profile_post = (req, res) => {

    // collections안의 _id와 그에 대한 local.email을 불러온다. 
    // res.json({
    //     id: req.user._id,
    //     email: req.user.local.email,
    //     msg: 'test'
    // })

    // 빈공간 만들기
    const profileFields = {};
    profileFields.user = req.user._id;

    //profileFields에서 단일 항목을 선택하는 경우
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.major) profileFields.major = req.body.major;


    //profileFields에서 중복 항목을 선택할 수 있게 하는 경우, location항목이 'undefined'(빈칸상태)가 아니라면 ,로 location에 들어가는 값들을 구분해줘러.
    if (typeof req.body.location !== 'undefined') {
        profileFields.location = req.body.location.split(',');

    }

    if (typeof req.body.testname !== 'undefined') {
        profileFields.testname = req.body.testname.split(',');
    }

    if (typeof req.body.preference !== 'undefined') {
        profileFields.preference = req.body.preference.split(',');

    }

    if (typeof req.body.task !== 'undefined') {
        profileFields.task = req.body.task.split(',');
    }

    profileModel
        .findOne({ user: req.user._id })
        .then(profile => {
            if (profile) {
                profileModel
                    .findOneAndUpdate(
                        { user: req.user._id },
                        { $set: profileFields },
                        { new: true }
                    )
                    .then(profile => res.json(profile))
                    .catch(err => res.json(err));
            } else {
                new profileModel(profileFields)
                    .save()
                    .then(profile => res.json(profile))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));

    // new profileModel(profileFields)
    //     .save()
    //     .then(profile => res.json(profile))
    //     .catch(err => res.json(err));


};

exports.profile_patch = (req, res) => {
    res.status(200).json({
        msg: 'profile patch'
    })
};

exports.profile_delete = (req, res) => {
    res.status(200).json({
        msg: 'profile delete'
    })
};