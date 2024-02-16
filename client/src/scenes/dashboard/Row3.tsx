import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { connect, useDispatch } from "react-redux";
import FlexBetween from "@/components/FlexBetween";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import { useTheme } from "@emotion/react";
import { useState } from "react";
 
const Row3 = ( ) => {
  const {palette} = useTheme();
  const [selected,setSelected] = useState("")
  return (
  <>
      <DashboardBox sx={{ marginTop: "50px"}} gridArea="e">
        <FlexBetween> 
        <BoxHeader
          title="Descriptions"
          subtitle="If any descrpecidies happen in your timesheet mark them here!" sideText={""}        
        />
        </FlexBetween>
        <FlexBetween>
          <Box>
            <textarea style={{width:"40rem", marginLeft:"5rem", height:"12rem", marginTop:"2rem" }}/>
          </Box>
        </FlexBetween>
         <Button  
              onClick={() => setSelected("Submit")}
              style={{
              marginLeft:"21.5rem",
              color: selected === "Submit" ? "inherit" : palette.grey[500],
              transform :"inherit",
              textDecoration: "inherit",
              fontSize:18
            }}>
                Submit
          </Button>   
      </DashboardBox>
    
  </>   
  );
};

// const mapDispatchToProps =  {
//   dispatchAddProduct: editProduct,
// };

export default Row3;
// export default connect(null, mapDispatchToProps)(Row3);
