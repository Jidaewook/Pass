const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //profile 스키마가 ref를 통해서 users의 하위개념으로 엮이게 된다. 
        ref: 'users'
    },

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    files: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    tag: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model('study', studySchema);