import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { useEffect, useState } from "react";

 
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [time,setTime] = useState('')
  const [punchInTime, setPunchInTime] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
       const date = new Date();
       const hours = date.getHours().toString().padStart(2, '0');
       const minutes = date.getMinutes().toString().padStart(2, '0');
       const seconds = date.getSeconds().toString().padStart(2, '0');
       const currentTime = `${hours}:${minutes}:${seconds}`;
       setTime(currentTime); 
     }, 1000); 
     return () => clearInterval(interval); // Clear the interval to avoid memory leaks
   }, [punchInTime]);

 
  return (
    <Box
      width="100%"
      height="100%"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 time={time} />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
