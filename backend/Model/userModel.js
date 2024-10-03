const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,//bat buoc phai nhap
        unique: true,
    },
    password: {
        type: String,
        required: true,//bat buoc phai
    },
    role: {
        type: String,
        default: 'user',
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/tatdevweb/image/upload/v1646135659/download_b6mzzk.png',
    },
    phone_number: {
        type: String,
        required: false,
        trim: true,
    },
    sex: {
        type: String,
        required: false,
        trim: true,
    },
    date_of_birth: {
        type: String,
        required: false,
        trim: true,

    },
    verify: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: String,
        required: false,
        trim: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
    {
        timestamps: true
    }
);

const userModel = mongoose.model('User', UserSchema);

UserSchema.methods.getResetPasswordToken = function () {
    // tao ma thong bao
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Them resetPasswordToken vaof userSchema
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};
exports.verifyAccount = (email) => {
    console.log('email', email)
    return userModel.updateOne(
        { email: email },
        { $set: { verify: true } },
    );
}
exports.Users =  userModel
