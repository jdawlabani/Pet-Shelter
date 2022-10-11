import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

const PetList = () => {
  const [allPets, setAllPets] = useState([]);

  //grab the list of pets from database and set it to allPets
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((response) => {
        console.log(response.data);
        setAllPets(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Pet Shelter</h1>
        <Link to="/pets/new">add a pet to the shelter</Link>
      </div>
      <div className="col-8 mx-auto">
        <h3>These pets are looking for a good home</h3>
        <table className="table table-striped">
          <thead className="bg-dark text-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPets.map((pet, index) => {
              return (
                <tr key={pet._id}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>
                    <div className="d-flex flex-nowrap justify-content-center">
                      <Link to={`/pets/${pet._id}`}>details</Link>
                      <p className="mx-1"> | </p>
                      <Link to={`/pets/${pet._id}/edit`}>edit</Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetList;
