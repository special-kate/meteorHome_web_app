var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var rentSchema = new Schema(
  {
    user_id:{type: Schema.Types.ObjectId, ref: 'usersearch'},
    rentinuser_id:{type: String},
    home_description:
      {
        price:{type:Number,required: "missing"},
        home_type:{type:String,required: "missing"},
        location:{type:String,required: "missing"},
        address:{type:String,required:"missing",default:"100 street"},
        area:{type:Number,required: "missing"},
        bedroom_no:{type:Number,required: "missing"},
        bathroom_no:{type:Number,required: "missing"},
        duration:{type:Number,default:"12"}
      },
    rentout:
      {
        rentout_id:{type:String,default:"RO"+(new Date()).getTime().toString()},
        home_availablestatus:{type:Boolean,required: "missing",default:true},
        rentout_price:{type:Number,required: "missing"},
        receive_rent:{type:Number,required: "missing"}
      },
    rentin:
      {
        rentin_id:{type:String,default:"RI"+(new Date()).getTime().toString()},
        home_status:{type:Boolean,required: "missing",default:true},
        rentin_price:{type:Number,required: "missing"},
        already_payrent:{type:Number,required: "missing"}
      }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }
  }
);

// get virtual attribute
rentSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// use virtuals attribute
rentSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("rent", rentSchema);
