import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { //verify function will return either an error or the valid user
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user; // we are assigning the jwt user object given by the verify function to req.user
        // so that we are able to use this req.user in any api request
        next(); //Adding nex() means that we'll continue where we left off in the code
    })
}