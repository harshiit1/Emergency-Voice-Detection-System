export const emergency_Keywords = [
  "help",
  "Help",
  " help",
  " help.",
  " Help.",
  "Ambulance",
  "save me",
  "ambulance",
  "bachao",
  "emergency",
  "Emergency",
  "doctor",
  "accident",
  "police",
];

export const includes_emergency_keyword = (txt: string) => {
  const cleanText = txt
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .trim();

  return emergency_Keywords.some((word) => cleanText.includes(word));
};
