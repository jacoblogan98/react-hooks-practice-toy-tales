import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// App
//  |-Header
//  |-ToyForm
//  |_ToyContainer
//       |_ToyCard

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(resp => resp.json())
    .then(toys => setToys(toys))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToy(newToy) {
    setToys([...toys, newToy])
  }



  return (
    <>
      <Header />
      {showForm ? <ToyForm onNewToy={handleNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} setToys={setToys}/>
    </>
  );
}

export default App;
