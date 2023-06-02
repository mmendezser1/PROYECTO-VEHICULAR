import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [gift, setGift] = useState();

  useEffect(() => {
    const loadGift = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=15"
      );

      const res = await response.json();
      setGift(undefined);
    };

    loadGift();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p> </p>
      </header>
    </div>
  );
}

export default App;
