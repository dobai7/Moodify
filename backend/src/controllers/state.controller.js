import stateModel from "../model/state.model.js"


export async function moodController(req,res) {

  try{

    const user = req.user
    const {mood} = req.body

    const states = await stateModel.findOneAndUpdate({userId:user._id},{
      $inc:{totalMoodDetections:1},
      $push:{ moodHistory: { mood } }
    })

    

    res.status(200).json({ message: "mood updated",
      states
     })


  }catch(err){
    res.status(500).json({ message: "error in mood controller "+err.message });
  }
  
}

export async function songController(req,res) {
  try{

    const user = req.user

    const states = await stateModel.findOneAndUpdate({userId:user._id},{
      $inc:{totalSongsPlayed:1}
    })

    res.status(200).json({ message: "song updated", states })


  }catch(err){
    res.status(500).json({ message: "error in song controller "+err.message });
  }
}

export async function getState(req,res){
  try{
    const user = req.user

    const states = await stateModel.findOne({ userId: user.id })

    res.status(200).json({ states })

  }catch(err){
    res.status(500).json({ message: "error in get State controller "+err.message });
  }
}