import mongoose from "mongoose";
import { Feed } from "../models/feed.model.js";

export const createFeed = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user._id
        
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

       const newFeed = await Feed.create({
            user: userId,
            content: content
       })

       res.status(201).json({ message: 'Feed created successfully', data: newFeed });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}

export const getFeeds = async (req, res) => {
    try {
        const feeds = await Feed.find().populate('user', 'name').sort({ createdAt: -1 });
        if (!feeds.length) {
            return res.status(404).json({ message: 'No feeds found' });
        }

        res.status(200).json({ message: 'Feeds retrieved successfully', data: feeds });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}


export const userProfile = async (req, res) => {
    try {
        const userId = req.user;

        if (!userId) {
            return res.status(400).json({ message: 'user Id not found' });
        }

        const userFeeds = await Feed.find({ user: userId }).populate('user', 'name email bio').sort({ createdAt: -1 });

        if (!userFeeds.length) {
            return res.status(404).json({ message: 'No feeds found for this user' });
        }

        res.status(200).json({ message: 'User feeds retrieved successfully', data: userFeeds });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}

export const getUserprofileId = async (req, res) => {
    try {
        const id = req.params.id;

        console.log("User ID:", id);

        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const userFeeds = await Feed.aggregate([
            
            {
                $match: { user: new mongoose.Types.ObjectId(id) } 
            },
           
            {
                $sort: { createdAt: -1 }
            },
           
            {
                $lookup: {
                    from: 'auths',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
          
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true 
                }
            },
            
            {
                $group: {
                    _id: '$user', 
                    userData: {
                        $first: {
                            _id: '$userDetails._id',
                            name: '$userDetails.name',
                            email: '$userDetails.email',
                            bio: '$userDetails.bio'
                           
                        }
                    },
                    content: {
                        $push: {
                            feedId: '$_id',
                            text: '$content', 
                            createdAt: '$createdAt'
                        }
                    }
                }
            },
            // Project to shape the final output
            {
                $project: {
                    _id: 0, 
                    userData: 1,
                    content: 1
                }
            }
        ]);

        console.log("User Feeds with Data:", userFeeds);

        if (!userFeeds.length) {
            return res.status(404).json({ message: 'No feeds found for this user' });
        }

        res.status(200).json({
            message: 'User feeds and data retrieved successfully',
            data: userFeeds[0] 
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};