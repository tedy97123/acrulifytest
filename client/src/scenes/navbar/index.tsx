import { useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import LogoutIcon from '@mui/icons-material/Logout';
type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
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
            to="/Login"
            onClick={() => setSelected("Login")}
            style={{
              color: selected === "Login" ? "inherit" : palette.grey[700],
              transform :"inherit",
              textDecoration: "inherit",
            }}
          >
            Login
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/Logout"
            onClick={() => setSelected("logout")}
            style={{
              color: selected === "logout" ? "inherit" : palette.grey[700],
              transform :"inherit",
              textDecoration: "inherit",
            }}
          >
            <LogoutIcon/> 
          </Link>
        </Box>                
  
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
