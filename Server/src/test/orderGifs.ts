import { GifDTO } from "../GifDTO";
export const orderGifs = (myGifs: Array<GifDTO>) => {
  myGifs.sort((gif1, gif2) => {
    if (gif1.numberOfLikes > gif2.numberOfLikes) return -1;
    if (gif1.numberOfLikes < gif2.numberOfLikes) return 1;
    return 0;
  });
  return myGifs;
};
