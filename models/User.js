import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';

console.log(validator.isEmail("test@example.com"));

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    dob:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail,"Please Provide A Valid Email!"]
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = mongoose.model("User", userSchema);
  
  export default User;