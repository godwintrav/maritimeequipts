const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        required: [true, "Please enter your first name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    lastName:{
        required: [true, "Please enter your last name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password length is 6 characters'],
        required: [true, "Please enter your password"]
    }
}, {timestamps: true});

//hash password before doc is saved
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
            const auth = await bcrypt.compare(password, user.password);
            
            if(auth){
                return user;
            }

            throw Error('incorrect login');
    }

    throw Error('incorrect login');
}

const User = mongoose.model('user', userSchema);

module.exports = User;