import mongoose from "mongoose"

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  deletedAt: { type: Date, required: true }
})

blacklistSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 0 })

const blacklistModel = await mongoose.model("blacklist", blacklistSchema)

export default blacklistModel