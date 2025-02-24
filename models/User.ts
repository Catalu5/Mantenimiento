import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
  profileImage?: string;
  greenhouseData?: {
    temperature: number;
    humidity: number;
    acidity: number;
    nutrients: string;
  };
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profileImage: { type: String, default: "/default-avatar.png" },
  greenhouseData: {
    temperature: { type: Number, default: Math.random() * 10 + 20 },
    humidity: { type: Number, default: Math.random() * 30 + 50 },
    acidity: { type: Number, default: Math.random() * 3 + 4 },
    nutrients: { type: String, default: "NPK balanceado" },
  },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
