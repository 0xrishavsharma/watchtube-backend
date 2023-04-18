import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).send(updatedUser)
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "Please check the added user Id. You can only update your account!"))
    }
}
export const deleteUser = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).send(`User has been deleted and the deleted user is:  ${deletedUser}`)
        } catch (err) {
            next(err);
        }
        d
    } else {
        return next(createError(403, "Please check the added user Id. You can only delete your account!"))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    } catch (err) {
        next(err);
    }
}
export const subscribe = async (req, res, next) => {
    try {
        // adding the requested channel to the subscribed channels array
        await User.findById(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })
        // adding user to the channel subscribers array
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).send(`Successfully subscribed to the ${channel.name}'s channel.`)
    } catch (err) {
        next(err);
    }
}
export const unsubscribe = async (req, res, next) => {
    try {
        // adding the requested channel to the subscribed channels array
        await User.findById(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })
        // adding user to the channel subscribers array
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).send(`Successfully subscribed to the ${channel.name}'s channel.`)
    } catch (err) {
        next(err);
    }
}
export const like = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).send(`The user that was deleted is ${deletedUser}`)
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "Please check the added user Id. You can only delete your account!"))
    }
}
export const dislike = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).send(`The user that was deleted is ${deletedUser}`)
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "Please check the added user Id. You can only delete your account!"))
    }
}