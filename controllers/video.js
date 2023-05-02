import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const createVideo = async (req, res, next) => {
    const newVideo = await Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
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
            return next(createError(403, "You can only update your video!"))
        }
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === video.userId) {
            const deletedVideo = await Video.findByIdAndDelete(req.params.id)
            res.status(200).send(`Video with videoId: ${deletedVideo.videoId} was successfully deleted!`)
        } else {
            return next(createError(403, "You can only delete your video!"))
        }
    } catch (err) {
        next(err);
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        res.status(200).send(video);
    } catch (err) {
        next(err);
    }
}

export const updateViews = async (req, res, next) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
            {
                $inc: { views: 1 }
            })
        res.status(200).send("Video updated successfully!")
    } catch (err) {
        next(err);
    }
}

export const getRandomVideos = async (req, res, next) => {
    try {
        const randomVideos = await Video.aggregate([{ $sample: { size: 30 } }]); //$sample function returns us a random sample of videos and here we have mentioned that we want 38 videos
        res.status(200).send(randomVideos)
    } catch (err) {
        next(err);
    }
}

export const getTrendingVideos = async (req, res, next) => {
    try {
        const trendingVideos = await Video.find().sort({ views: 1 }); // Here by setting sorting condition to views: 1 are saying that bring us the most viewed videos
        res.status(200).send(trendingVideos);
    } catch (err) {
        next(err);
    }
}

export const getSubscriptionVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedChannels;

        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).send(list.flat().sort((a, b) => b.createdAt - a.createdAt)); // flat method is used to flatten the array of arrays into a single array. 
        // Here we are using it because we are getting an array of arrays from the above Promise.all function
        // So, we are using flat method to flatten array of two arrays into a single array
    } catch (err) {
        next(err);
    }
}

export const getByTags = async (req, res, next) => {
    try {
        const tags = req.query.tags.split(","); // Here we are splitting the tags by comma and storing them in an array

        const videos = await Video.find({ tags: { $in: tags } }).limit(20); // Here we are using $in operator to find videos that have tags that are in the tags array
        res.status(200).send(videos)
    } catch (err) {
        next(err);
    }
}

export const getSearchedVideos = async (req, res, next) => {
    const query = req.query.q;
    try {
        const searchedVideos = await Video.find({
            videoTitle: { $regex: query, $options: "i" }
        }).limit(40); // Here by setting sorting condition to views: 1 are saying that bring us the most viewed videos
        res.status(200).send(searchedVideos);
    } catch (err) {
        next(err);
    }
}