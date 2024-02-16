import FlexBetween from "@/components/FlexBetween";
import { useCreateLineItemsMutation } from "@/state/api";
import { useTheme } from "@emotion/react";
import {  Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "@/state/types";
 
const Row1 = () => {
   const {palette} = useTheme()
   const [time,setTime] = useState(Date)
   const [updatePunch] = useCreateLineItemsMutation();
   const [selected,setSelected] = useState("")
  const [punchInTime, setPunchInTime] = useState({});
  const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser);
  let parseUser: any = Object.values(currentUser);
  const firstName = parseUser[0]?.currentUser.firstName;

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

   function handleClockedIn() {
     setPunchInTime(time);
     console.log(time)
     updatePunch({
      'firstName':firstName,
      "startTime":punchInTime,
      "rate":20,
      "date":punchInTime
     }).unwrap()
    .then((response: any) => {
      console.log(response); 
    })
    .catch((error: any) => {
      console.error('Wrong Credentials:', error);
    });
    };
 
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
