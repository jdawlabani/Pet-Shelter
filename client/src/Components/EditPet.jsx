import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPet = (props) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${id}`)
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setOriginalName(response.data.name);
        setType(response.data.type);
        setDescription(response.data.description);
        setSkill1(response.data.skill1);
        setSkill2(response.data.skill2);
        setSkill3(response.data.skill3);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const submitHandler = (e) => {
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
    axios
      .put(`http://localhost:8000/api/pets/${id}`, {
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
    <>
      <div className="d-flex justify-content-between">
        <h1>Pet Shelter</h1>
        <Link to="/">back to home</Link>
      </div>
      <h3>Edit {originalName}</h3>
      <div className="border border-dark border-4 p-4 text-info bg-dark">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Pet Name:</label>
            {/* Need additional step in name to separate unique error from required/minlength errors */}
            {errors.name &&
              (errors.name.kind === "required" ||
                errors.name.kind === "minlength") && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            {errors.name && errors.name.kind === "unique" && (
              <p className="text-danger">
                {errors.name.properties.value} has already been taken!
              </p>
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
            Edit Pet
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPet;
