import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles/AddProperty.css";
import Navbar from "../components/Navbar";

function AddProperty() {
  const path = process.env.REACT_APP_PATH;
  const navigate = useNavigate();
  let [property, setProperty] = useState({
    name: "",
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    price: 0,
    todo: "",
  });

  const [user, setUser] = useState("");

  const handleChange = (event) => {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    axios.get(`${path}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setUser(response.data.user[0].uname);
      }
    });
  }, []);

  const handleSubmit = () => {
    axios.post(`${path}/addproperty`, { property, user });
    navigate("/home");
  };

  return (
    <>
      <Navbar post={true} />
      <div className="about-container">
        <div className="cont-inner-div">
          <center className="animate__animated animate__fadeInUp animate__slow">
            Add your property<i className="fa fa-home"></i>
          </center>
        </div>
      </div>
      <div onSubmit={handleSubmit} className="form-container">
        <div>
          <label className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={property.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={property.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label className="form-label">Bedrooms:</label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            min={1}
            max={5}
            value={property.bedrooms}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label className="form-label">Bathrooms:</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            min={1}
            max={5}
            value={property.bathrooms}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label className="form-label">Area:</label>
          <input
            type="number"
            id="area"
            name="area"
            value={property.area}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={property.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label className="form-label">To Do:</label>
          <select
            id="todo"
            name="todo"
            value={property.todo}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select an option</option>
            <option value="buy">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="form-submit-btn">
          Submit
        </button>
      </div>
    </>
  );
}

export default AddProperty;
