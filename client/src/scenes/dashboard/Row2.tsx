import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { Box  , useTheme } from "@mui/material";
import { DataGrid, GridCellParams, GridEventListener } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "@/state/types";
import { useEffect, useState } from "react";
import { useGetLineItemsQuery } from "@/state/api";
import { Add } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Row2 = () => {
 const { palette } = useTheme();
const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser);
const userId = currentUser?.currentUser?.id;
const [lineItemUpdated, setLineItemUpdated] = useState(false);
const [selected, setSelected] = useState(false);
const [FinalClickInfo,setFinalClickInfo] = useState();
const dispatch = useDispatch();
const firstName =  currentUser?.currentUser?.firstName;
const [clickedRows, setClickedRows] = useState<any[]>([]);
const { data: lineItems } = useGetLineItemsQuery(userId); 
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
      field:"rate",
      headerName:"Rate",
      flex:1,
     renderCell: (params: GridCellParams) => `$${params.value}/hr`,
    },
      {
      field:"totalEarnings",
      headerName:"Gross",
      flex:1,
     renderCell: (params: GridCellParams) => `$${params.value}`,
    }, 
  ]
  
  const handleOnCellClick: GridEventListener<'rowClick'> = (
  params, // GridCallbackDetails
) => { 
  setSelected(true);
  setFinalClickInfo(params.row); 
  const info = JSON.stringify(params.row);
  const n_Info = JSON.parse(info);
  const isDuplicate = clickedRows.some(row => row._id === n_Info._id);  
 setClickedRows(prevRows => {
  const isDuplicate = prevRows.some(row => row._id === n_Info._id);  
  if (!isDuplicate) {
    return [...prevRows, n_Info];
  } else {
    return prevRows;
  }
})};

 useEffect(() => {
     
    const action = {
      type: 'VIEW_LINE',
      payload: clickedRows,
    };
    dispatch(action);
  }, [clickedRows, dispatch]);  
  return (
  <>  
    <DashboardBox sx={{ marginTop: "50px"}} gridArea="e">
      <FlexBetween>
      <BoxHeader
            title="LineItems"
            subtitle="Time Sheet"
            addIcon={<Add />}
            editIcon={<EditIcon />}
            viewIcon={<VisibilityIcon />}
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
        rows={lineItems || []}      
        getRowId={(row)=>row._id} 
         onCellClick={handleOnCellClick}
        checkboxSelection 
        disableColumnSelector        
          />
      </Box> 
    </DashboardBox>
  </>
  );
};

export default Row2;