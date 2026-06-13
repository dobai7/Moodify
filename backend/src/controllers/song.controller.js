// import uploadFile from "../services/imageKit.js";
// import songModel from "../model/song.model.js";
// import id3 from "node-id3";
// // import userModel from "../model/user.model.js";

// const cleanText = (str) => str?.replace(/\([^)]*\.(com|net|org|CoM)[^)]*\)/gi, "").trim();

// export async function uploadSongController(req, res) {
//   try {
//     const { mood } = req.body;
//     const tag = id3.read(req.file.buffer);

//     const title = cleanText(tag.title);
//     const artist = cleanText(tag.artist);

//     const [songUrl, imgUrl] = await Promise.all([
//       uploadFile({ buffer: req.file.buffer, filename: req.file.originalname, folder: "moodify/songs" }),
//       uploadFile({ buffer: tag.image.imageBuffer, filename: `${title}_cover.jpg`, folder: "moodify/covers" })
//     ]);

//     await songModel.create({
//       title,
//       artist,
//       mood,
//       audioUrl: songUrl.url,
//       thumbnail: imgUrl.url
//     });

//     res.status(201).json({ message: "song listed" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// export async function getSongsController(req,res){
//   try{

//     const {mood} = req.params

//     if(!mood){
//       return res.status(404).json({
//         message:"mood not found"
//       })
//     }

//     const songs = await songModel.find({mood})

//     res.status(200).json({
//       message:"songs fetched",
//       songs
//     })

//   }catch(err){
//     console.log(err)
//   }
// }

import uploadFile from "../services/imageKit.js";
import songModel from "../model/song.model.js";
import id3 from "node-id3";
// import userModel from "../model/user.model.js";

const cleanText = (str) => str?.replace(/\([^)]*\.(com|net|org|CoM)[^)]*\)/gi, "").trim();

const cleanTitle = (str) => {
  if (!str) return str;
  let cleaned = cleanText(str);
  // remove everything after " - " (e.g. "Kesariya - PagalNew" -> "Kesariya")
  cleaned = cleaned.split(/\s*-\s*/)[0];
  return cleaned.trim();
};

export async function uploadSongController(req, res) {
  try {
    const { mood } = req.body;
    const tag = id3.read(req.file.buffer);

    const title = cleanTitle(tag.title);
    const artist = cleanText(tag.artist);

    const [songUrl, imgUrl] = await Promise.all([
      uploadFile({ buffer: req.file.buffer, filename: req.file.originalname, folder: "moodify/songs" }),
      uploadFile({ buffer: tag.image.imageBuffer, filename: `${title}_cover.jpg`, folder: "moodify/covers" })
    ]);

    await songModel.create({
      title,
      artist,
      mood,
      audioUrl: songUrl.url,
      thumbnail: imgUrl.url
    });

    res.status(201).json({ message: "song listed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getSongsController(req,res){
  try{

    const {mood} = req.params

    if(!mood){
      return res.status(404).json({
        message:"mood not found"
      })
    }

    const songs = await songModel.find({mood})

    res.status(200).json({
      message:"songs fetched",
      songs
    })

  }catch(err){
    console.log(err)
  }
}