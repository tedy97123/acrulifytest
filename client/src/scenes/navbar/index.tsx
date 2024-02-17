import {  useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import LogoutIcon from '@mui/icons-material/Logout';
import {  shallowEqual, useDispatch, useSelector } from "react-redux";
import { currentUser } from "@/state/types";
type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();

  const [selected, setSelected] = useState("dashboard");

  const dispatch = useDispatch();
  
  const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser);
  
  console.log(currentUser) 
  
  const isLoggedIn = Array.isArray(currentUser)  ? 

  currentUser.length > 0 && currentUser == null 
  : 
  currentUser !== null && currentUser !== undefined;
                  
  console.log(isLoggedIn)


  function handleLogout() {
    dispatch({ type: 'LOG_OUT' });
    setSelected("Login"); // Reset selected state
  }
  
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Acrulify Test
        </Typography>
      </FlexBetween>

       {/* RIGHT SIDE */} 
     <FlexBetween gap="2rem"> 
     {isLoggedIn ?
     <>
     <Box sx={{ "&:hover": { color: palette.grey[700] } }}>
        
            Dashboard
         
        </Box> 
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/Dashboard"
            onClick={() => setSelected("Dashboard")}
            style={{
              color: selected === "Dashboard" ? "inherit" : palette.grey[700],
              transform :"inherit",
              textDecoration: "inherit",
            }}
          >
            {currentUser?.currentUser?.firstName + " " + currentUser?.currentUser?.lastName}
          </Link>
        </Box> 
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={handleLogout}
            style={{
              color: selected === "logout" ? "inherit" : palette.grey[700],
              transform :"inherit",
              textDecoration: "inherit",
            }}
          >
            <LogoutIcon/> 
          </Link>
        </Box>   
      </>
      : (
     <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/Dashboard"
            onClick={() => setSelected("Dashboard")}
            style={{
              color: selected === "Dashboard" ? "inherit" : palette.grey[700],
              transform :"inherit",
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box> 
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={handleLogout}
            style={{
              color: selected === "logout" ? "inherit" : palette.grey[500],
              transform :"inherit",
              textDecoration: "inherit",
            }}
          >
            <LogoutIcon/> 
          </Link>
        </Box>   
      </FlexBetween> 
      )
}
 </FlexBetween>
  </FlexBetween>

  );
};

 
export default  Navbar;
