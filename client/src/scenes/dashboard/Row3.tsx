import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Add } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams, GridEventListener } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { connect, useDispatch } from "react-redux";
import { editProduct } from "@/state/redux/actions";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Products } from "@/state/types";
 
const Row3 = ( ) => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const [selected, setSelected] = useState(false);
  const [FinalClickInfo,setFinalClickInfo] = useState();
  const dispatch = useDispatch();
  const [clickedRows, setClickedRows] = useState<any[]>([]);

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];
 
  
const handleOnCellClick: GridEventListener<'rowClick'> = (
  params, // GridCallbackDetails
) => { 
  setSelected(true);
  setFinalClickInfo(params.row); 
  const info = JSON.stringify(params.row);
  const n_Info = JSON.parse(info);
   const isDuplicate = clickedRows.some(row => row._id === n_Info._id); // Assuming there's an ID property to check uniqueness
    console.log(isDuplicate)
  // If not a duplicate, update clickedRows state
 setClickedRows(prevRows => {
  // Check if the row already exists in clickedRows to avoid duplicates
  const isDuplicate = prevRows.some(row => row._id === n_Info._id); // Assuming there's an ID property to check uniqueness
  if (!isDuplicate) {
    // If it's not a duplicate, concatenate the new row with the existing rows
    return [...prevRows, n_Info];
  } else {
    // If it's a duplicate, return the existing state without modification
    return prevRows;
  }
})};

 useEffect(() => {
    // Dispatch action with clickedRows as payload whenever clickedRows changes
    const action = {
      type: 'VIEW_PRODUCT',
      payload: clickedRows,
    };
    dispatch(action);
  }, [clickedRows, dispatch]); // Dispatch the action whenever clickedRows changes

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
          addIcon={ <Add />}
          editIcon={<EditIcon/>}
          viewIcon={<VisibilityIcon/>}
        />
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
            rows={productData || []}
            columns={productColumns}
            getRowId={(row)=>row._id} 
            onCellClick={handleOnCellClick}
            checkboxSelection 
            disableColumnSelector
            />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
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
            rows={transactionData || []}
            getRowId={(row)=>row._id}
            columns={transactionColumns}
            onCellClick={handleOnCellClick}
            checkboxSelection 
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};

const mapDispatchToProps =  {
  dispatchAddProduct: editProduct,
};


export default connect(null, mapDispatchToProps)(Row3);
