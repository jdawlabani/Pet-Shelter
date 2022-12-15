const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const PetSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be 3 characters or more"],
      unique: [true, "Name has already been taken"],
    },
    type: {
      type: String,
      required: [true, "Pet type is required"],
      minLength: [3, "Pet type must be 3 characters or more"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [3, "Description must be 3 characters or more"],
    },
    skill1: {
      type: String,
      required: [false],
    },
    skill2: {
      type: String,
      required: [false],
    },
    skill3: {
      type: String,
      required: [false],
    },
  },
  { timestamps: true }
);

PetSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Pet", PetSchema);
