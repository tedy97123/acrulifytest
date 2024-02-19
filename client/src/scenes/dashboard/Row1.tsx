import FlexBetween from "@/components/FlexBetween";
import { useCreateLineItemsMutation, useGetLineItemsQuery, usePostClockInMutation, usePostClockOutMutation, usePostTotalWorkHoursMutation } from "@/state/api";
import {  Box, Button, TextareaAutosize, Typography } from "@mui/material";
import { useEffect,  useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {  currentUser  } from "@/state/types";
import BoxHeader from "@/components/BoxHeader";
import InputBox from "@/components/inputBox";

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
  const [rate,setRate] = useState('')

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const rateValue = data.get('rate');

  const userData = {
    rate: rateValue as string,  
  };
  setRate(userData?.rate)
  console.log(userData);
}
function handleClockedIn() {
  const date = Date.now();
  setPunchInTime(time);
  updatePunch({
    'id': id,
    "rate": rate,
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
  if (lineItemData && lineItemData.length > 0) {
    // Get the most recent line item
     const getNewLineItem = await lineItemData.slice(-1)
      const mostRecentLineItem = getNewLineItem[0]
     console.log("Hey im the most recent line item",mostRecentLineItem)
    if (mostRecentLineItem.startTime) {
      clockOut({
        'userId': id,
        "stopTime": time,
        "startTime":mostRecentLineItem.startTime,
        "rate":rate,
        'lineItemId': mostRecentLineItem.id  
      }).unwrap()
     .then((updateResponse) => {
      console.log('Line item updated and clocked Out:', updateResponse);
     updateTotalWorkHours({
      'userId': id,
      'lineItemId': mostRecentLineItem.id  ,
    }).unwrap()
    .then((updateResponse) => {
      console.log('TotalHours:', updateResponse);
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
      <FlexBetween  
      style={{
              transform :"inherit",
              textDecoration: "inherit",
              fontSize:18,
              paddingBottom:11
            }} >
       <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate sx={{ mt: 2 }} 
          > 
        <InputBox> 
          <Typography mt={3} ml={1} variant="h4" fontWeight="1000">
            Rate
          </Typography> 
          <TextareaAutosize
           style={{marginLeft:"2rem",width:'13rem',marginTop:'0.4rem'}}
              required
              id="rate"
              name="rate"
              autoFocus
           /> 
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {}}
            >
              Sumbit
            </Button>
          </InputBox>
          </Box>  
        </FlexBetween>   
        
   </>
  );
};

export default Row1;
