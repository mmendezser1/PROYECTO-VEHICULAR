import { Gif } from "../../Models/Gif";
import "./Gif.css";
export const ComponentGif = (myGif: Gif) => {
  return (
    <li>
      <img
        className="itemGif"
        data-testid="gif"
        src={myGif.src}
        alt={myGif.alt}
      />
    </li>
  );
};

//TODO Evitar archivos con el mismo nombre
