import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, setToys }) {

  function handleDelete(id) {
    setToys(toys.filter(toy => id !== toy.id))

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...toy,
        likes: toy.likes + 1
      })
  })
  .then(resp => resp.json())
  .then(updatedToy => setToys(toys.map(toy => {
    if (toy.id === updatedToy.id) {
      return updatedToy
    } else return toy
  })))
}

  const toyCards = toys.map(toy => 
  <ToyCard 
  key={toy.id} 
  toy={toy} 
  onDelete={handleDelete}
  onLike={handleLike}
  />)

  return (
    <div id="toy-collection">{toyCards}</div>
  );
}

export default ToyContainer;
