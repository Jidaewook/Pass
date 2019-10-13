const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//스키마는 다루고자 하는 각각의 정보항목을 의미한다. 
const userSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // avatar: {
    //     type: String
    // }, 
    // date: {
    //     type: String,
    //     default: Date.now
    // }

    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            //lowercase: 소문자 설정
            lowercase: true
            
        }, 
        password: {
            type: String
            
        },
        avatar: {
            type: String
        }
        
    },
    google: {
        id: {
            type: String
        }, 
        email: {
            type: String,
            lowercase: true
        },
        avatar: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        avatar: {
            type: String
        }
    }, 
    date: {
        type: Date,
        default: Date.now()
        
    }



});



userSchema.pre('save', async function(next){
    //pre: 뒤의 함수인 저장 전에 할 작업에 대한 설정
    try{
        console.log('entered');
        if(this.method !== 'local'){
            next();
        } 

        //Generate Salt
        const salt = await bcrypt.genSalt(10);
        //Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        //Re-assign hashed version over original, palin text password
        this.local.password = passwordHash;
        console.log('exited');
        next();

    }
    catch(error){
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try{
        return await bcrypt.compare(newPassword, this.local.password);

    } catch(error){
        throw new Error(error);
    }
}


//몽고db에 users라는 콜렉션이 생기고 그 안에 UserSchema의 내용이 들어간다. 
module.exports = mongoose.model('users', userSchema);