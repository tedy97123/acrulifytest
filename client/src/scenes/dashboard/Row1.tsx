import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";
import { useTheme } from "@emotion/react";
import {  Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
 
interface clock {
  time: React.ReactNode;
}
const Row1 = () => {
   const {palette} = useTheme()
   const [time,setTime] = useState(Date)
   const [selected,setSelected] = useState("")
 
  setInterval(() => {
     let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let currentTime = hours + ":" +  minutes + ":" + seconds
    setTime(currentTime) 
  }, 10)
  
  return (
    <>  
      <BoxHeader
      title="Clock"
      subtitle="Remeber to punch in and punch out"
      sideText="on time!"
      /> 
    <FlexBetween> 
        <Typography padding="1rem" marginLeft="28rem" variant="h1" mb="-0.1rem">
          {time}
        </Typography> 
      </FlexBetween> 
      <FlexBetween style={{marginRight:"17rem",marginLeft:"18rem"}}>
        <Button
              onClick={() => setSelected("PunchIn")}
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
