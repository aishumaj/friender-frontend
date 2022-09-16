import FrienderApi from "./_api";
import userContext from "./userContext";
import { useState, useContext } from 'react';
// import './ProfileForm.css';

/** Form for updating a user info.
 *
 * Props: none
 *
 * State:
 * - formData
 * - update: sets boolean to true when successfully updated
 *
 * RoutesList -> ProfileForm
 */

function ProfileForm() {
  let { currentUser, setCurrentUser } = useContext(userContext);
  let { username, firstName, lastName, email } = currentUser;
  let initial = { username, firstName, lastName, email };

  const [formData, setFormData] = useState(initial);

  const [updateSuccessful, setUpdateSuccessful] = useState(false);

  async function updateProfile(formData) {
    const { username, firstName, password, age, zipCode, bio,
      hobbies, interests, radius, image } = formData;
    try {
      const updatedUser = await FrienderApi.updateUserInfo(username, firstName, password, age, zipCode, bio,
        hobbies, interests, radius, image);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    await updateProfile(formData);
    setUpdateSuccessful(true);
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
    <div className="profilePage">
      <h3 className="mb-4">Profile</h3>
      <form className="ProfileForm" onSubmit={handleSubmit}>
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
            id="location"
            name="location"
            className="form-control"
            placeholder="Enter location"
            onChange={handleChange}
            value={formData.location}
            aria-label="Location"
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
          <label className="mb-2 label" htmlFor="image">Profile Picture</label>
          <input
            id="image"
            name="image"
            className="form-control"
            placeholder="Enter image"
            onChange={handleImage}
            type="file"
            value={formData.image}
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

        {updateSuccessful &&
          <div className="alert alert-success" role="alert">
            Updated Successfully!
          </div>
        }
        <div>
          <button className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;