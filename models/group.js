const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  groupName: {
    type: String,
    unique: true,
  },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
