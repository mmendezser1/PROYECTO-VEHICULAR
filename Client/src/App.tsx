import React, { useEffect, useState } from "react";
import { Gif } from "./Models/Gif";
import { ComponentGif } from "./Components/Gif/Gif";

const URL_API = "http://localhost:3005/api/gifs";
function App() {
  const [gifs, setGifs] = useState<Gif[] | undefined>(undefined);
  const [errorMessage, seterrorMessage] = useState("loading...");

  useEffect(() => {
    const loadGift = async () => {
      try {
        const response = await fetch(URL_API, {
          method: "GET",
        });
        const res = await response.json();

        setGifs(res.response);
        seterrorMessage("");
      } catch (error) {
        setGifs(undefined);
        seterrorMessage("Hubo un problema con el servidor..."); //TODO habra que mostrar en la pantalla un error, no un mensaje de que no se han encontrado gifs
      }
    };

    loadGift();
  }, []);

  if (gifs !== undefined && gifs.length === 0) {
    seterrorMessage("No se han encontrado gifs... "); //TODO Hacer que se muestre centrado y con tipografía adecuada
  }

  const ComponentHeader = () => {
    return (
      <header className="header">
        <img className="image-header" src="/images/Logo.svg" alt="Logo" />
        <h1 className="title-h1">GUIFAFFINITY</h1>
      </header>
    );
  };
  const ComponentBrowser = () => {
    return (
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
    );
  };

  const ComponentAllGifs = ({
    msjError,
    myGifs,
  }: {
    myGifs: Gif[] | undefined;
    msjError: string;
  }) => {
    if (myGifs !== undefined) {
      return (
        <section className="container-gifs">
          <h2 className="">los princiales Gifs</h2>
          <ol className="list-gifs">
            {myGifs.map((gif) => {
              return <ComponentGif myGif={gif} />;
            })}
          </ol>
        </section>
      );
    } else {
      return <p>{msjError} </p>;
    }
  };

  return (
    <div className="App">
      <div className="home">
        <ComponentHeader />
        <ComponentBrowser />
        <ComponentAllGifs myGifs={gifs} msjError={errorMessage} />
      </div>
    </div>
  );
}

export default App;
