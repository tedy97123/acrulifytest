import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetLineItemsQuery } from "@/state/api";
import { Box  , useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { currentUser } from "@/state/types";
import { skipToken } from "@reduxjs/toolkit/query";
const Row2 = () => {
 const { palette } = useTheme();
  const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser);
  let parseUser: any = Object.values(currentUser);
  const email = parseUser[0]?.currentUser.email;
  const isLoggedIn = email != null;
  const { data: lineItemData } = useGetLineItemsQuery(isLoggedIn ? email : skipToken);
  console.log(lineItemData)

    const LineItemColumns = [
    {
      field:"id",
      headerName:"id",
      flex:1
    },
     {
      field:"startTime",
      headerName:"Clocked-In",
      flex:1,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
     {
      field:"stopTime",
      headerName:"Clocked-out",
      flex:1,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field:"totalTimeWorked",
      headerName:"Total Time Worked",
      flex:1,
     renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field:"Descriptions",
      headerName:"Descriptions",
      flex:1,
      renderCell: (params: GridCellParams) => `${params.value}`,
    }
  ]
  return (
  <>  
    <DashboardBox sx={{ marginTop: "50px"}} gridArea="e">
      <FlexBetween>
      <BoxHeader
          title="LineItems"
          subtitle="Time Sheet"
          sideText={""}   
        />
      </FlexBetween> 
      <Box
      mt="0.5rem"
      p="0 0.5rem"
      height="75%"
      sx={{
        "& .MuiDataGrid-root": {
          color: palette.grey[300],
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${palette.grey[800]} !important`,
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: `1px solid ${palette.grey[800]} !important`,
        },
        "& .MuiDataGrid-columnSeparator": {
          visibility: "hidden",
        },
      }}
    >
      <DataGrid
        columnHeaderHeight={25}
        rowHeight={35}
        hideFooter={true}
        columns={LineItemColumns} 
        rows={lineItemData || []}      
        getRowId={(row)=>row._id} 
          />
      </Box> 
    </DashboardBox>
  </>
  );
};

export default Row2;
