import Gif from "../Models/Gif";

export const ComponentGif = (myGif: Gif) => {
  return <img src={myGif.src} alt={myGif.alt} />;
};
