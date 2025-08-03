import express from 'express';
import { createFeed, getFeeds, getUserprofileId, userProfile } from '../controller/feed.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/create-feed").post(authMiddleware, createFeed);

router.route("/get-all-feeds").get(getFeeds);

router.route("/user-profile").get(authMiddleware, userProfile)

router.route("/user-profile/:id").get(authMiddleware, getUserprofileId);


export default router;