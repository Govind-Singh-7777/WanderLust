const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/WanderLust")
}

main()
.then((res)=>{
    console.log("DataBase Connected");
}).catch((err)=>{
    console.log(err);
})

const initiate = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"6a93d88903fe3ed84729e8f5"}));
    await Listing.insertMany(initData.data);
    console.log("data is initialize");
}

initiate();


