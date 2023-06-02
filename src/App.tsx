import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [gifs, setGifs] = useState();

  useEffect(() => {
    const loadGift = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=15"
      );

      const res = await response.json();
      console.log("res", res);
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
        <img src={gifs.src} alt={gifs.alt} />
      </header>
    </div>
  );
}

export default App;
