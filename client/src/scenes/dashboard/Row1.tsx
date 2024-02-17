import FlexBetween from "@/components/FlexBetween";
import { useCreateLineItemsMutation, useGetLineItemsQuery, usePostClockOutMutation } from "@/state/api";
import {  Button, Typography } from "@mui/material";
import { useEffect,  useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {  currentUser , lineItems } from "@/state/types";

 
function Row1 ()  {
  const [time,setTime] = useState(Date)
  const [updatePunch] = useCreateLineItemsMutation();
  const [clockOut] = usePostClockOutMutation();
  const [punchInTime, setPunchInTime] = useState("");
  const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser,shallowEqual);
  const firstName =  currentUser?.currentUser?.firstName;
  const email = currentUser?.currentUser?.email;
  const {data: lineItemData} = useGetLineItemsQuery(email)
  
 
  
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
    const date =  Date.now() 
    setPunchInTime(time) 
     updatePunch({
      'firstName':firstName,
      "startTime":time,
      "rate":20,
      "date": date,
     }).unwrap()
    .then((response: any) => {
      console.log(response); 
       
     })
    .catch((error: any) => {
      console.error('Wrong Credentials:', error);
    });
    };
    function handleClockOut() {
    // Ensure that lineItemData is not empty and sorted (if necessary)
    if (lineItemData && lineItemData.length > 0) {
      // Assuming the last item is the most recent one
      const mostRecentLineItem = lineItemData[lineItemData.length - 1];

      // Update the most recent line item with the stopTime
      clockOut({
        'firstName': firstName,
        "stopTime": time,
        'lineItemId': mostRecentLineItem.id // Use the ID of the most recent line item
      }).unwrap()
      .then((response: any) => {
        console.log(response); 
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
    } else {
      console.error('No line items available to update');
    }
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
              onClick={handleClockedIn}
              style={{
                transform :"inherit",
                textDecoration: "inherit",
                fontSize:18
              }}
            >
            Punch In
          </Button> 
          <Button
            onClick={handleClockOut}
            style={{
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
