import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Debes definir MONGODB_URI en tu .env");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "authDB",
      bufferCommands: false,
    }).then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
