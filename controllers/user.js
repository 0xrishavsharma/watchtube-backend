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
        const channel = await User.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if (channel === null) {
            return res.status(400).send(`Channel with ${channel.name} name does not exist.`);
        }
        if (user.subscribedChannels.indexOf(channel._id) !== -1) {
            return res.status(400).send(`The ${channel.name}'s channel has already been subscribed.`);
        }
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedChannels: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).send(`Successfully subscribed to ${channel.name}'s channel.`);
    } catch (err) {
        next(err);
    }
};
export const unsubscribe = async (req, res, next) => {
    try {
        const channel = await User.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if (user.subscribedChannels.indexOf(channel._id) === -1) {
            return res.status(400).send(`${channel.name}'s channel has already unsubscribed or doesn't exist in the subscribed channels list.`);
        }
        // get the current subscribers count
        const currentSubscribers = channel.subscribers;
        // check if the subscribers count is greater than 0 before decrementing it
        if (currentSubscribers > 0) {
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedChannels: req.params.id },
            });
            res.status(200).send(`Successfully unsubscribed from ${channel.name}'s channel.`);
        } else {
            res.status(400).send(`The subscribers count for ${channel.name}'s channel is already 0.`);
        }
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