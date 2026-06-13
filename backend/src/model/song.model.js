import mongoose from "mongoose";

const songSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  artist: {
    type: String,
    required: true
  },

  mood: {
    type: String,
    enum: [
      "happy",
      "sad",
      "romantic",
      "neutral",
      "angry",
      "chill",
      "motivate",
      "lonely",
      "surprised"
    ],
    required: true
  },

  audioUrl: {
    type: String,
    required: true
  },

  thumbnail: {
    type: String
  }

}, {
  timestamps: true
});

const songModel = mongoose.model("Songs", songSchema);

export default songModel;