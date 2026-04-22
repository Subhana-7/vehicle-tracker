import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  otp?: {
    code: string;
    expiresAt: Date;
  };
  forgotPasswordOtp?: {
    code: string;
    expiresAt: Date;
    verified: boolean;
  };
  refreshToken?: string;
  isVerified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function (this: { googleId?: string }) {
        return !this.googleId;
      },
    },
    otp: {
      code: { type: String },
      expiresAt: { type: Date },
    },
    forgotPasswordOtp: {
      code: { type: String },
      expiresAt: { type: Date },
      verified: { type: Boolean, default: false },
    },
    refreshToken:{ type:String},
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel =  mongoose.model<IUser>("User", userSchema);
