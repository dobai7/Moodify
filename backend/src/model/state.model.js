import mongoose from "mongoose";

const userStateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true
  },
  totalMoodDetections: { type: Number, default: 0 },
  totalSongsPlayed: { type: Number, default: 0 },
  moodHistory: [
    {
      mood: String,
      detectedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const stateModel = mongoose.model("UserStats", userStateSchema);

export default stateModel