import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewPet = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //check if skills are blank so we do not save null in database
    if (skill1 === "") {
      setSkill1("None");
    }
    if (skill2 === "") {
      setSkill2("None");
    }
    if (skill3 === "") {
      setSkill3("None");
    }
    axios.get("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      console.log(response.data.message);
      setImage(response.data.message);
      console.log(image);
    })
    .catch((err) => {
              console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
    })
    axios
      .post("http://localhost:8000/api/pets", {
        image,
        name,
        type,
        description,
        skill1,
        skill2,
        skill3,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="col-8 mx-auto">
      <div className="d-flex justify-content-between">
        <h1>Pet Shelter</h1>
        <Link to="/">back to home</Link>
      </div>
      <h3>Know a pet needing a forever home?</h3>
      <div className="border border-dark border-4 p-4 text-info bg-dark">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Pet Name:</label>
            {/* Need additional step in name to separate unique error from required/minlength errors */}
            {errors.name &&
              (errors.name.kind === "required" ||
                errors.name.kind === "minlength") && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            {errors.name && errors.name.kind === "unique" && (
              <p className="text-danger">{errors.name.properties.value} has already been taken!</p>
            )}
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Pet Type:</label>
            {errors.type && (
              <p className="text-danger">{errors.type.message}</p>
            )}
            <input
              type="text"
              className="form-control"
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Pet Description:</label>
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <br />
          <br />
          <p>Skills (optional):</p>
          <div className="form-group">
            <label htmlFor="skill1">Skill 1:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSkill1(e.target.value)}
              value={skill1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skill2">Skill 2:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSkill2(e.target.value)}
              value={skill2}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skill3">Skill 3:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSkill3(e.target.value)}
              value={skill3}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPet;
