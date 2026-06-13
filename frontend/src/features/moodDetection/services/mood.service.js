import * as faceapi from "face-api.js";

export async function loadModels() {

  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

  await faceapi.nets.faceExpressionNet.loadFromUri("/models");

  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
}

export async function detectMood(video) {

  // console.log("video came",video)
  const detection = await faceapi
    .detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions()
    )
    .withFaceExpressions();

  // console.log(detection)

  return detection;
}