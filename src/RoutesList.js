import { Routes, Route, Navigate } from 'react-router-dom';
import userContext from './userContext';
import React, { useContext } from "react";

import Homepage from "./Homepage";
import ProfileForm from './ProfileForm';
import SignUp from './SignUpForm';
import Login from './LoginForm';

/** Function  creates paths to different pages
 *
 * Props:
 * - login: function to be called in from parent
 * - signup: function to be called in from parent
 *
 * State: none
 *
 * App -> RoutesList -> { Homepage,   }
 *
*/

function RouteList({ login, signup }) {
  const { currentUser } = useContext(userContext);

  return (
    <Routes>


      {currentUser &&
        <>
          <Route
            path="/profile"
            element={<ProfileForm />}
          />
        </>}

        <Route
        path="/"
        element={<Homepage />}
      />

      {!currentUser &&
        <>
          <Route
            path="/login"
            element={<Login login={login} />}
          />

          <Route
            path="/signup"
            element={<SignUp register={signup} />}
          />
        </>
      }

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default RouteList;

