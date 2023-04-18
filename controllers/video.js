import User from "../models/User";
import Video from "../models/Video";

export const createVideo = async (req, res, next) => {
    const newVideo = await Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json("Video created successfully!", savedVideo)
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true // without this the updatedVideo constant will contain the old version of the video. So, to update the video we need to set new: true
                }
            )
            res.status(200).send(updatedVideo)
        } else {

        }
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const getVideo = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}