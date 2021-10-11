import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./AdminPage.css"

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
    console.log(' inside the submit button ')
    
    // doing the delete axios to delete the url
    dispatch({ type: "DELETE_URL", payload: id })
    dispatch({ type: "FETCH_ADMIN_LIST" });
  };


  return (
    <>
      <div className="admin-container">
        <h2> Admin, {user.username}!</h2>
        {/* <p>Your ID is: {user.id}</p> */}
        {/* <LogOutButton className="btn" /> */}
      </div>

  
      <br />
      <div className="admin-page" >
        <br />
        <p>These are all your Q-Ware Users and Their Chats!</p>

        <table className="userList" >
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
                  <td width="25%">{item.id}</td>
                  <td width="25%">{item.username}</td>
                  <td width="25%">{item.url}</td>
                  <td width="25%">{<button onClick={() =>removeUrl(item.conversation_id)}>delete</button>}</td>
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
