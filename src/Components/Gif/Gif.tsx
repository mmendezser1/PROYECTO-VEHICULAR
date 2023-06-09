import { Gif } from "../../Models/Gif";
import "./Gif.css";
export const ComponentGif = (myGif: Gif) => {
  return <img data-testid="gif" src={myGif.src} alt={myGif.alt} />;
};
