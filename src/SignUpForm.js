import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import "./SignUpForm.css"
import userContext from "./userContext";

/** Form for adding.
 *
 * Props:
 * - register: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> SignUpForm
 */

function SignUpForm({ register }) {
  const { currentUser } = useContext(userContext);
  const initial =
    { username: "",
    firstName: "",
    age: "",
    bio: "",
    hobbies: "",
    interests: "",
    zipCode: "",
    radius: 0,
    image: "",
    password: ""};
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initial);
  const [isBadLogin, setIsBadLogin] = useState(true);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();
    for (let key in formData){
      data.append(key, formData[key])
    }

    register(data);
    setFormData(initial);
    if(currentUser) navigate("/");
    if(!currentUser) setIsBadLogin(false);
  }

   /** Updates state for file input */
   function handleImage(evt) {
    const {name} = evt.target;
    const value = evt.target.files[0];
    setFormData(currData => ({
      ...currData,
      [name]: value,
    }))
  }

  return (
    <div className="signupPage">
      <h3 className="mb-4">Sign Up</h3>
      <form className="SignUpForm" onSubmit={handleSubmit} encType="multipart/form-data" action="">

        <div className="mb-3">
        <label className="mb-2 label">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">First Name</label>
          <input
            id="firstName"
            name="firstName"
            className="form-control"
            placeholder="Enter first name"
            onChange={handleChange}
            value={formData.firstName}
            aria-label="First Name"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Age</label>
          <input
            id="age"
            name="age"
            className="form-control"
            placeholder="Enter age"
            onChange={handleChange}
            value={formData.age}
            aria-label="Age"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Bio</label>
          <input
            id="bio"
            name="bio"
            className="form-control"
            placeholder="Enter bio"
            onChange={handleChange}
            value={formData.bio}
            aria-label="Bio"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Hobbies</label>
          <input
            id="hobbies"
            name="hobbies"
            className="form-control"
            placeholder="Enter hobbies"
            onChange={handleChange}
            value={formData.hobbies}
            aria-label="Hobbies"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Interests</label>
          <input
            id="interests"
            name="interests"
            className="form-control"
            placeholder="Enter interests"
            onChange={handleChange}
            value={formData.interests}
            aria-label="Interests"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Location</label>
          <input
            id="zipCode"
            name="zipCode"
            className="form-control"
            placeholder="Enter zip code"
            onChange={handleChange}
            value={formData.zipCode}
            aria-label="Zip Code"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Radius</label>
          <input
            id="radius"
            name="radius"
            className="form-control"
            placeholder="Enter radius"
            onChange={handleChange}
            value={formData.radius}
            aria-label="Radius"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Profile Picture</label>
          <input
            id="image"
            name="image"
            className="form-control"
            placeholder="Enter image"
            onChange={handleImage}
            type="file"
            aria-label="image"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
            type="password"
          />
        </div>
        {/* {!isBadLogin &&
          <div class="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
        } */}
        <div>
          <button className="btn btn-primary">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default SignUpForm;
