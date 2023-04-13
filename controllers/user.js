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
            const deletedUser = await User.findByIdAndDelete(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )
            res.status(200).send(`User has been deleted and the user that was deleted is:  ${deletedUser}`)
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "Please check the added user Id. You can only delete your account!"))
    }
}
export const getUser = async (req, res, next) => {
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
export const subscribe = async (req, res, next) => {
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
export const unsubscribe = async (req, res, next) => {
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