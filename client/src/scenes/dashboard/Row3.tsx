import React, { useState } from "react";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import BoxHeader from "@/components/BoxHeader";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import { useSelector } from "react-redux";
import { usePostDescriptionsMutation, useGetLineItemsQuery } from "@/state/api";

const Row3 = () => {
  const [description, setDescription] = useState(""); // State to hold textarea value
  const [postDescription] = usePostDescriptionsMutation();
  const currentUser = useSelector((state: any) => state.rootReducer.currentUser);
  const id = currentUser?.currentUser?.id;
  const { data: lineItemData } = useGetLineItemsQuery(id);

  // Handler for textarea change
  const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescription(event.target.value);
  };

  // Handler for submit button
  async function handleDescriptionSubmit() {
    const userId = currentUser.currentUser.id;
     if (lineItemData && lineItemData.length > 0) {
    // Get the most recent line item
     const getNewLineItem = await lineItemData.slice(-1)
      const mostRecentLineItem = getNewLineItem[0].id
    postDescription({
      'userId': userId, 
      'lineItemId': mostRecentLineItem,
      'description': description  // Pass the description state here
    }).unwrap()
    .then((updateResponse) => {
      console.log('Line item updated:', updateResponse);  
    });
  }
}

  return (
    <>
      <DashboardBox sx={{ marginTop: "50px" }} gridArea="e">
        <FlexBetween>
          <BoxHeader
            title="Descriptions"
            subtitle="If any discrepancies happen in your timesheet, mark them here!"
            sideText={""}
          />
        </FlexBetween>
        <FlexBetween>
          <Box>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              style={{ width: "40rem", marginLeft: "5rem", height: "12rem", marginTop: "2rem" }}
            />
          </Box>
        </FlexBetween>
        <Button
          onClick={handleDescriptionSubmit}
          style={{
            marginLeft: "21.5rem",
            transform: "inherit",
            textDecoration: "inherit",
            fontSize: 18
          }}
        >
          Submit
        </Button>
      </DashboardBox>
    </>
  );
};

export default Row3;
