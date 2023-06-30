export const hasSpecialCharacter = (text: String) => {
  const characterCorrected = text.replace(/[^a-zA-Z0-9]/g, "");
  return characterCorrected === text ? false : true;
};
