const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const ListingController = require("../controller/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });


//create
router.get("/new",isLoggedIn,wrapAsync(ListingController.renderNewForm))


router.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(ListingController.postListing))



router.route("/:id")
.get(wrapAsync(ListingController.showList))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(ListingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(ListingController.deleteListing))


//edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.editListing));

module.exports = router;
