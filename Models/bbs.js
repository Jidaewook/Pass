const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BbsSchema = new Schema({
    method: {
        type: String,
        enum: ['notice', 'approach', 'workbook', 'study', 'consult', 'error'],
        required: true
    },
        notice: {
            author: {
                //게시판에서의 작성자는 아이디가 바로 뜨게 해야 하기 때문에, 유저스라는 콜렉션에서 오브젝트아이디를 타입으로 삼아야 한다. 
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            title: {
                type: String,
                //required 항목을 미이행해서 에러가 발생하면 프론트에서 작업해야 한다. 
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            files: {
                //Object는 파일 경로를 선택하는 과정의 타입이다. 
                type: Object
            },
            link: {
                type: String
            },
            image: {
                type: String
            },


        },
        approach: {
            author: {
                //게시판에서의 작성자는 아이디가 바로 뜨게 해야 하기 때문에, 유저스라는 콜렉션에서 오브젝트아이디를 타입으로 삼아야 한다. 
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            title: {
                type: String,
                //required 항목을 미이행해서 에러가 발생하면 프론트에서 작업해야 한다. 
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            files: {
                //Object는 파일 경로를 선택하는 과정의 타입이다. 
                type: Object
            },
            link: {
                type: String
            },
            image: {
                type: String
            },


        },
        workbook: {
            author: {
                //게시판에서의 작성자는 아이디가 바로 뜨게 해야 하기 때문에, 유저스라는 콜렉션에서 오브젝트아이디를 타입으로 삼아야 한다. 
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            title: {
                type: String,
                //required 항목을 미이행해서 에러가 발생하면 프론트에서 작업해야 한다. 
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            files: {
                //Object는 파일 경로를 선택하는 과정의 타입이다. 
                type: Object
            },
            link: {
                type: String
            },
            image: {
                type: String
            },


        },
        study: {
            author: {
                //게시판에서의 작성자는 아이디가 바로 뜨게 해야 하기 때문에, 유저스라는 콜렉션에서 오브젝트아이디를 타입으로 삼아야 한다. 
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            title: {
                type: String,
                //required 항목을 미이행해서 에러가 발생하면 프론트에서 작업해야 한다. 
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            files: {
                //Object는 파일 경로를 선택하는 과정의 타입이다. 
                type: Object
            },
            link: {
                type: String
            },
            image: {
                type: String
            },

            likes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'users'
                    }

                }
            ],
            comments: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'users'
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String
                    },
                    avatar: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ],
        },
        consult: {
            author: {
                //게시판에서의 작성자는 아이디가 바로 뜨게 해야 하기 때문에, 유저스라는 콜렉션에서 오브젝트아이디를 타입으로 삼아야 한다. 
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            title: {
                type: String,
                //required 항목을 미이행해서 에러가 발생하면 프론트에서 작업해야 한다. 
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            files: {
                //Object는 파일 경로를 선택하는 과정의 타입이다. 
                type: Object
            },
            link: {
                type: String
            },
            image: {
                type: String
            },

            comments: [],
        }, 
        error: {
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            files: {
                type: Object
            },

        },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('bbs', BbsSchema);