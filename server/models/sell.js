var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var sellSchema = new Schema(
  {
    user_id:{type: Schema.Types.ObjectId, ref: 'usersearch'},
    sellin_user_id:{type: String},
    home_description:
      {
        price:{type:Number,required: "missing"},
        home_type:{type:String,required: "missing"},
        location:{type:String,required: "missing"},
        address:{type:String,required:"missing",default:"100 street"},
        area:{type:Number,required: "missing"},
        bedroom_no:{type:Number,required: "missing"},
        bathroom_no:{type:Number,required: "missing"}
      },
    sellout:
      {
        sellout_id:{type:String,default:"SO"+(new Date()).getTime().toString()},
        home_available_status:{type:Boolean,required: "missing",default:true},
        sellout_price:{type:Number,required: "missing"},
        receive_sell:{type:Number,required: "missing"}
      },
    sellin:
      {
        sellin_id:{type:String,default:"SI"+(new Date()).getTime().toString()},
        home_status:{type:Boolean,required: "missing",default:true},
        sellin_price:{type:Number,required: "missing"},
        already_pay_sell:{type:Number,required: "missing"}
      }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }
  }
);

// get virtual attribute
sellSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// use virtuals attribute
sellSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("sell", sellSchema);
