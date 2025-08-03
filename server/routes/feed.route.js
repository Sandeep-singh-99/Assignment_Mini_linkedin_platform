import express from 'express';
import { createFeed, getFeeds, getUserprofileId, userProfile } from '../controller/feed.controller.js';

const router = express.Router();

router.route("/create-feed").post(createFeed);

router.route("/get-all-feeds").get(getFeeds);

router.route("/user-profile").get(userProfile)

router.route("/user-profile/:id").get(getUserprofileId);


export default router;