const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
  firstName: String,
  lastName:String,
  email: String,
  telephone:String,
  age: Number,
  country: String,
  gender: String,
});

// Create a model based on that schema
const Mydata = mongoose.model("Mydata", articleSchema);

 
// export the model
module.exports = Mydata;