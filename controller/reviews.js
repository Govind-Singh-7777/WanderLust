const Review = require("../models/review");
const Listing = require("../models/listing")

module.exports.createReview = async(req,res)=>{
    let list = await Listing.findById(req.params.id);
    let rev = new Review(req.body.review); 
    rev.author = req.user._id;
    list.reviews.push(rev);
    await rev.save();
    await list.save();
    req.flash("success","New Review Posted");
    res.redirect(`/listings/${req.params.id}`);
}
module.exports.destroy = async(req,res)=>{
    let { id , revId } = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: revId}});
    await Review.findByIdAndDelete(revId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}