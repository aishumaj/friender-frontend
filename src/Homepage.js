import React, { useContext } from "react";
import userContext from "./userContext";


/** Displays main homepage for Jobly app
 *
 * Props: none
 * State: none
 *
 * RouteList -> Homepage
 *
 */

function Homepage() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="homepage">
      <h1 className="fw-bold">Friender</h1>
      <br />
      <p>Make new friends wherever you go!</p>
      {currentUser &&
        <div>
          <h1>Welcome Back, {currentUser.firstName}!</h1>
          {/* <CardList getAllUsers={getAllUsers}
            getAllLikes={getAllLikesForCurrentUser}
            getAllDislikes={getAllDislikesForCurrentUser} /> */}
        </div>}
      {!currentUser &&
        <div className="homepage-btn">
          <a href="/login" className="btn btn-primary me-3">Log In</a>
          <a href="/signup" className="btn btn-primary">Sign Up</a>
        </div>}
    </div>
  );
}

export default Homepage;

