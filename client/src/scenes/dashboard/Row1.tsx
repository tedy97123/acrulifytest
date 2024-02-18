import FlexBetween from "@/components/FlexBetween";
import { useCreateLineItemsMutation, useGetLineItemsQuery, usePostClockInMutation, usePostClockOutMutation, usePostTotalWorkHoursMutation } from "@/state/api";
import {  Button, Typography } from "@mui/material";
import { useEffect,  useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {  currentUser  } from "@/state/types";

 interface Row1Props {
  time: string
 }
function Row1 ({ time }: Row1Props)  {
  const [updatePunch] = useCreateLineItemsMutation();
  const [updatePunchInTime] = usePostClockInMutation()
  const [clockOut] = usePostClockOutMutation();
  const [updateTotalWorkHours] = usePostTotalWorkHoursMutation()
  const [punchInTime, setPunchInTime] = useState("");
  const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser,shallowEqual);
  const firstName =  currentUser?.currentUser?.firstName;
  const id = currentUser?.currentUser?.id;
  const {data: lineItemData} = useGetLineItemsQuery(id);  


function handleClockedIn() {
  const date = Date.now();
  setPunchInTime(time);

  // First API call to create the line item
  updatePunch({
    'id': id,
    "rate": 20,
    "date": date,
    "startTime": time,
  }).unwrap()
  .then((response) => {

    updatePunchInTime({
      'userId': id,
      "startTime": time,
      'lineItemId':lineItemData.id,
    }).unwrap()
    .then((updateResponse) => {
      console.log('Line item updated and clocked In:', updateResponse);
    })
    .catch((updateError) => {
      console.error('Error updating line item:', updateError);
    });
  })
  .catch((error) => {
    console.error('Error creating line item:', error);
  });
}
  
  
 async  function handleClockOut() {
  // Ensure that lineItemData is not empty
  if (lineItemData && lineItemData.length > 0) {
    // Get the most recent line item
     const getNewLineItem = await lineItemData.slice(-1)
      const mostRecentLineItem = getNewLineItem[0]
     console.log("Hey im the most recent line item",mostRecentLineItem)
    if (mostRecentLineItem.startTime) {
      // Update the most recent line item with the stopTime
      clockOut({
        'userId': id,
        "stopTime": time,
        'lineItemId': mostRecentLineItem.id  
      }).unwrap()
     .then((updateResponse) => {
      console.log('Line item updated and clocked Out:', updateResponse);
     updateTotalWorkHours({
      'userId': id,
      'lineItemId': mostRecentLineItem.id  ,
    }).unwrap()
    .then((updateResponse) => {
      console.log('Line item updated and clocked In:', updateResponse);
    }) 
    .catch((updateError) => {
      console.error('Error updating line item:', updateError);
    }) 
  })}
  }
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
