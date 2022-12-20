const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
// I'm not specifying username and password because I'm doing this: UserSchema.plugin(passportLocalMongoose)
// pass in  the result of requiring the passportLocalMongoose package and this is going to add to my Schema a username and a field  for password

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);