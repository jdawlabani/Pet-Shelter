import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../App.css'

const SinglePet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/pets/${id}`)
      .then((res) => {
        console.log(`${pet.name} was adopted!`);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Pet Shelter</h1>
        <Link to="/">back to home</Link>
      </div>
      <div className="d-flex justify-content-around">
        <h3>Details about: {pet.name}</h3>
        <img src={pet.image} alt="No image found" />
        <button
          className="btn btn-danger"
          onClick={(e) => deleteHandler(pet._id)}
        >
          Adopt {pet.name}!
        </button>
      </div>
      <div className="border border-4 border-dark bg-dark text-info p-4">
        <h4>Pet type:{pet.type}</h4>
        <h4>Description:{pet.description}</h4>
        <h4>Pet skills:</h4>
        <ol className="no-spacing">
          <li>{pet.skill1}</li>
          <li>{pet.skill2}</li>
          <li>{pet.skill3}</li>
        </ol>
      </div>
    </>
  );
};

export default SinglePet;
