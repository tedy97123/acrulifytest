import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";
import { currentUser } from "@/state/types";
import { useTheme } from "@emotion/react";
import {  Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
 
interface clock {
  time: React.ReactNode;
}
const Row1 = () => {
   const {palette} = useTheme()
   const [time,setTime] = useState(Date)
   const [selected,setSelected] = useState("")
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
   }, []);

   function handleClockedIn() {
     setPunchInTime(time);
     console.log(punchInTime)
   }
   return (
    <>  
    
    <FlexBetween> 
        <Typography padding="1rem" marginLeft="28rem" variant="h1" mb="-0.1rem">
          {time}
        </Typography> 
      </FlexBetween> 
      <FlexBetween style={{marginRight:"17rem",marginLeft:"18rem"}}>
        <Button
              onClick={() => {setSelected("PunchIn"); handleClockedIn();}}
              style={{
                color: selected === "PunchIn" ? "inherit" : palette.grey[500],
                transform :"inherit",
                textDecoration: "inherit",
                fontSize:18
              }}
            >
            Punch In
          </Button> 
          <Button
            onClick={() => setSelected("PunchOut")}
            style={{
              color: selected === "PunchOut" ? "inherit" : palette.grey[500],
              transform :"inherit",
              textDecoration: "inherit",
              fontSize:18
            }}
          >
                  Punch Out
           </Button>
      </FlexBetween>
 
        
</>
  );
};

export default Row1;
