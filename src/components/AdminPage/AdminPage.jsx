import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import axios from "axios";

function AdminPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const allUsersUrl = useSelector((store) => store.adminGetReducer);

  // CALLING THE DISPATCH
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_LIST" });
  }, []);

  const removeUrl = (id) => {


    // should be able refresh the page
    // delete the object that it's tagerting by id
    // do the axios call
    console.log(' inside the submit button ')
    
    // doing the delete axios to delete the url
    dispatch({ type: "DELETE_URL", payload: id })
    dispatch({ type: "FETCH_ADMIN_LIST" });
    

  };

  return (
    <>
      <div className="admin-container">
        <h2> Q-Ware Admin, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
      <br />
      <div className="admin-page">
        <br />
        <p>These are all your Q-Ware Users and Their Chats!</p>

        <table className="userList">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Username</th>
              <th>Chat Url</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUsersUrl.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.url}</td>
                  <td>{<button onClick={() =>removeUrl(item.conversation_id)}>delete</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default AdminPage;
