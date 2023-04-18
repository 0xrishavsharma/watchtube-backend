import mongoose from "mongoose"
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).send(`${newUser.name}'s account have been successfully created!`);
    } catch (err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));

        // comparing the password entered by the user with the one we stored in the database
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return next(createError(401, "Password is incorrect!"));

        // creating a jwt token after hashing the user id and we are going to send this token to the user after successful login
        // The second argument is a secret key that we need to provide, it can be anything
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        // separating password from the user object so that we don't send password in the response
        const { password, ...otherUserDetails } = user._doc;
        // To send this token we are going to use cookies
        // Turning the httpOnly is important as because of this 3rd party cookies won't be able to access our cookies 
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(otherUserDetails);
    } catch (err) {
        next(err)
    }
}

export const google = (req, res) => {

} 