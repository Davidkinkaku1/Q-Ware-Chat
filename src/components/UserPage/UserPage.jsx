import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const userLinks = useSelector((store) => store.linkListReducer);
  // CALLING THE DISPATCH
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_LINKS" });
  }, []);

  const removeUrl = (id) => {


    // should be able refresh the page
    // delete the object that it's tagerting by id
    // do the axios call
    console.log(' inside the submit button ')
    
    // doing the delete axios to delete the url
    dispatch({ type: "DELETE_URL", payload: id })
    dispatch({ type: "FETCH_LINKS" });
    

  };

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
      <br />
      <div>
        <button>Start a Q-Ware Rom</button>
        <br />
        <p>These are all your Q-Ware Chats!</p>
        {userLinks.map((link, i) => (
          <li key={i}> {link.url} 
           {<button onClick={() =>removeUrl(link.id)}>delete</button>}
          </li>
        ))}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
