import "./App.css";
import React, { useEffect, useState } from "react";
import Gif from "./Models/Gif";

const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=15";

export const ComponentGif = (myGif: Gif) => {
  return <img src={myGif.src} alt={myGif.alt} />;
};

function App() {
  const [gifs, setGifs] = useState<Gif[] | undefined>(undefined);

  useEffect(() => {
    const loadGift = async () => {
      const response = await fetch(URL_API);

      const res = await response.json();
      setGifs(res);
    };

    loadGift();
  }, []);
  if (gifs === undefined) {
    return <p>loading...</p>;
  }
  return (
    <div className="App">
      <header className="App-header">
        {gifs.map((gif) => {
          return <ComponentGif {...gif} />;
        })}
      </header>
    </div>
  );
}

export default App;
