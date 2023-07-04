import React, { useEffect, useState } from "react";
import { Gif } from "./Models/Gif";
import { ComponentGif } from "./Components/Gif/Gif";

const URL_API = "http://localhost:3005/api/gifs";
function App() {
  const [gifs, setGifs] = useState<Gif[] | undefined>(undefined);

  useEffect(() => {
    const loadGift = async () => {
      try {
        const response = await fetch(URL_API, {
          method: "GET",
        });
        const res = await response.json();

        setGifs(res.response);
      } catch (error) {
        setGifs([]);
      }
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
        <header className="header">
          <img className="image-header" src="/images/Logo.svg" alt="Logo" />
          <h1 className="title-h1">GUIFAFFINITY</h1>
        </header>
        <section className="browserBox">
          <input
            className="browserInput"
            type="text"
            placeholder="¿Que quieres buscar? ¡Encuentralo!"
          />
          <button className="browserImage">
            <img src="/images/lupa.svg" alt="lupa" />
          </button>
        </section>
        <section className="container-gifs-header"></section>
        <section className="container-gifs">
          <h2>los princiales Gifs</h2>
          <ol className="list-gifs">
            {gifs.map((gif, i) => {
              return <ComponentGif key={i} {...gif} />;
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}

export default App;
