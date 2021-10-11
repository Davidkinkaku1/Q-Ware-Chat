import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Qrcode from "../Qrcode/Qrcode";
import "./UserPage.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

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
    console.log(" inside the submit button ");

    // doing the delete axios to delete the url
    dispatch({ type: "DELETE_URL", payload: id });
    dispatch({ type: "FETCH_LINKS" });
  };

  // **************RANDOMIZING LINKS AND SENDING IT TO POST FUNCTION**************** //

  const randomizeLink = (event, id) => {
    event.preventDefault();
    // setting a random variable that generates random numbers between 0-1500

    dispatch({
      type: "ADD_LINK",
      payload: {
        // url: "http://localhost:3000/#/chat/" ,  //won't be local host in the long
        // user_id: id
      },
    });
  };

  let serverName = window.location.origin;

  return (
    <>
      <div class="linker">
        <Typography className="container">Welcome, {user.username}!</Typography>
        <Button
          variant="contained"
          href="#outlined-buttons"
          onClick={randomizeLink}
        >
          Start a Q-Ware Rom
        </Button>
        {/* <button onClick={randomizeLink}> Start a Q-Ware Rom</button> */}
        <p>These are all your Q-Ware Chats!</p>
        {userLinks.map((link, i) => (
          <Card sx={{ maxWidth: "100%", backgroundColor: "#E6e6fa", display:"flex" }} key={i}>
            <CardActionArea>
              <CardMedia>
                {" "}
                <Qrcode url={`${serverName}/#/chat/${link.url}`} />
              </CardMedia>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  nowrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "20rem",
                  }}
                >
                  Chat link{" "}
                  <a
                    href={`${serverName}/#/chat/${link.url}`}
                  >{`${serverName}/#/chat/${link.url}`}</a>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <DeleteIcon
                    fontSize="small"
                    variant="contained"
                    size="small"
                    onClick={() => removeUrl(link.id)}
                  />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </>
  );
}

export default UserPage;

{
  /* <div class="conversation-card">
          <a
            href={`${serverName}/#/chat/${link.url}`}
          >{`${serverName}/#/chat/${link.url}`}</a>
          <button onClick={() => removeUrl(link.id)}>delete</button>

          <Qrcode url={`${serverName}/#/chat/${link.url}`} />
        </div> */
}
