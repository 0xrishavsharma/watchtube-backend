import { createError } from '../error.js';
import Video from '../models/Video.js';
import Comment from '../models/comment.js';

export const addComment = async (req, res, next) => {
    const newComment = await Comment({ ...req.body, userId: req.user.id })
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.finById(req.user.id);
        if (comment.userId === req.user.id || video.userId === req.user.id) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment deleted successfully")
        } else {
            return next(createError(403, "You are not allowed to delete this comment"))
        }
    }
    catch (err) {
        next(err)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}