const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/reviews.js");

//Post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))

//Delete Review
router.delete("/:revId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroy))

module.exports = router;