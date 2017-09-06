const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
  },
    // optional settings object for this schema
    {
        // adds "createdAt" and "updatedAt" fields to the schema
        timestamps: true
    }

);

userSchema.plugin(beautifyUnique);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
