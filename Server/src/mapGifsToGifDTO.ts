export const mapGifsToGifDTO = (myGifs: Array<Gif>) => {
  return myGifs.map((myGif, key) => {
    return {
      name: myGif.title,
      src: myGif.images.small.url,
      numberOfLikes: (key += 5),
    };
  });
};
