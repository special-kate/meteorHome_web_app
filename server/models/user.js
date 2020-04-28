var mongoose = require("mongoose");
const Schema = mongoose.Schema;



var userSchema = new Schema(
  {
    account: {type: String, required: "missing account" },
    password: {type: String, required: "missing password" },
    firstname: {type: String, required: "missing firstname" },
    lastname: {type: String, required: "missing lastname" },
    email: {type: String, required: "missing email" },
    phone: {type: String, required: "missing phone number" },
    balance:{type:Number,default:0}
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }
  }
);


// get virtual attribute
userSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// use virtuals attribute
userSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("usersearch", userSchema);
