export function getDominantMood(expressions){

  if(!expressions){
    return "No Face";
  }

  let maxMood = "";
  let maxValue = 0;

  for(const mood in expressions){

    if(expressions[mood] > maxValue){

      maxValue = expressions[mood];

      maxMood = mood;
    }
  }

  return maxMood;
}