import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShowContext } from "../Context/ShowContext";
import styles from "./Navbar.module.css";
import Signin from "./Signin";
import Signup from "./Signup";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
export function Navbar() {
 
  const [color, setColor] = useState(false);
  const { show, setShow } = useContext(ShowContext);

  const [email, setEmail] = useState("");
  const { setIsAuth } = useContext(ShowContext);
  onAuthStateChanged(auth, (currentUser) => {
    setEmail(currentUser.email);
    setIsAuth(true);
  });

  let name = email.split("@");

  name = name[0].toUpperCase();

  function logoutUser() {
    signOut(auth).then((res) => {
      setEmail("");
      setIsAuth(false);
    });
  }


  const changeColor = () => {
    if (window.scrollY > 100) {
      setColor(true);
      setShow(true);
    } else {
      setColor(false);
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
  }, []);
   

  return (

    

    <Box
      id={styles.navbar}
      style={
        show
          ? { backgroundColor: "#2f9bdb", transition: "all 0.5s ease-out" }
          : { backgroundColor: "transparent", transition: "all 0.5s ease-out" }
      }
    >
      <Box>
        <NavLink to="/"><Image src="https://cdn1.tripoto.com/assets/2.9/img/logo/tripoto.svg"/></NavLink>
      </Box>
      <Box>
        {show && (
          <Input
            transition="all 0.5s ease-out"
            bg="white"
            placeholder="Search for itineraries, destinations, hotels or activities"
            width="500px"
            height="30px"
          />
        )}
      </Box>
      <Box>
        {/* <NavLink to="/inspirations"> */}
        <Menu>
          <MenuButton as={Box}>Inspiration</MenuButton>
          <MenuList color="black" width="30px" fontSize="14px">
            <MenuItem><NavLink to="/inspiration/singapore">Visit Singapore</NavLink></MenuItem>
            <MenuItem><NavLink to="inspiration/beach">Beaches</NavLink></MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
        {/* </NavLink> */}
        <NavLink to="/forum">Forum</NavLink>
        <NavLink to="/packages">Packages</NavLink>
        <NavLink to="/publish">Publish trip</NavLink>
       {name ? <div> {name}<button style={{marginLeft:"10px"}} onClick={logoutUser}>{" "}Log Out</button> </div>: <Signin  />}
      
      </Box>
    </Box>
  );
}
