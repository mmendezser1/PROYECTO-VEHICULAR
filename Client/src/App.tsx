import React, { useEffect, useState } from "react";
import { Gif } from "./Models/Gif";
import { ComponentGif } from "./Components/Gif/Gif";

const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=15";

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
  if (gifs.length === 0) {
    return <p>No hay ningún gif disponible...</p>;
  }

  return (
    <div className="App">
      <div className="home">
        <section className="container-gifs">
          <p>los princiales Gifs</p>
          <div className="list-gifs">
            {gifs.map((gif) => {
              return <ComponentGif {...gif} />; //TODO Para que están los ...
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
