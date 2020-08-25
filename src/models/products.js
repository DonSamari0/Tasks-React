const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: string, requited: true },
  gender: { type: string, require: true },
});
