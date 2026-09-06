const Listing = require("../models/listing")

module.exports.index = async(req,res)=>{
    let list = await Listing.find();
    res.render("listings/listing.ejs",{list});
};

module.exports.renderNewForm = async(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showList = async(req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!list){
        req.flash("error","Listing Does Not Exist");
        res.redirect("/listings");
    }
    else{
        res.render("listings/list.ejs",{list});
    }
};

module.exports.postListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = {url,filename};
    await newList.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
}
module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    let newList = await Listing.findById(id);
    if(!newList){
        req.flash("error","Listing Does Not Exist");
        return res.redirect("/listings");
    }
    let imgUrl = newList.image.url;
    imgUrl = imgUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{newList,imgUrl});
}
module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};