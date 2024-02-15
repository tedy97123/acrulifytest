import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { Padding } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

 
const Row2 = () => {
  const {palette} = useTheme();

    const LineItemColumns = [
    {
      field:"id",
      headerName:"id",
      flex:1
    },
     {
      field:"startTime",
      headerName:"Clocked-In",
      flex:1
    },
     {
      field:"stopTime",
      headerName:"Clocked-out",
      flex:1
    },
    {
      field:"totalTimeWorked",
      headerName:"Total Time Worked",
      flex:1
    },
    {
      field:"Descriptions",
      headerName:"Descriptions",
      flex:1
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
        rows={[]}      
          />
      </Box> 
    </DashboardBox>
  </>
  );
};

export default Row2;
