import React, { useState } from "react";

function ToyForm({ onNewToy }) {
  const [toyFormData, setToyFormData] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    
    fetch('http://localhost:3001/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: toyFormData.name,
        image: toyFormData.image,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(newToy => onNewToy(newToy))
  }

  function handleNameChange(event) {
    // console.log(event.target.value)
    setToyFormData({
      name: event.target.value
    })
  }

  function handleImageChange(event) {
    setToyFormData({
      ...toyFormData,
      image: event.target.value
    })
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          value={toyFormData.name}
          className="input-text"
          onChange={handleNameChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={toyFormData.image}
          onChange={handleImageChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
