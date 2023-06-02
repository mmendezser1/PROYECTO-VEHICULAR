import "./App.css";
import React, { useEffect, useState } from "react";

interface Gif {
  src: string;
  alt: string;
}

function App() {
  const [gifs, setGifs] = useState<Gif[] | undefined>(undefined);

  useEffect(() => {
    const loadGift = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=15"
      );

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
          return <img src={gif.src} alt={gif.alt} />;
        })}
      </header>
    </div>
  );
}

export default App;
