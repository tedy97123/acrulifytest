import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { PlusOne } from "@mui/icons-material";
import ModernModal from "@/scenes/modals/productModal";
import TransactionsModal from "@/scenes/modals/viewProductsModal";
import { useSelector } from "react-redux";
import axios from "axios";

type Props = {
  title: string;
  sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
  addIcon?: React.ReactNode;
  editIcon?: React.ReactNode;
  viewIcon?: React.ReactNode;
 };

const BoxHeader = ({ icon, title, subtitle, sideText, addIcon,editIcon,viewIcon}: Props) => {
  const { palette } = useTheme();
  //  const {lineItem} = useSelector((state: any) => state.rootReducer.lineItem);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [transactionHistoryModalIsOpen, setTransactionHistoryModalIsOpen] = useState(false);
  const [productData, setProductData] = useState();
  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
  };

  const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
  };

  const setTransactionHistoryModalToTrue =()=>{
    setTransactionHistoryModalIsOpen(true)
  };

  const setTransactionHistoryModalToFalse =()=>{
    setTransactionHistoryModalIsOpen(false)
  };

  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h3" mb="-1.4rem">
            {title}
          </Typography>
         <Typography ml="40rem" variant="h5" fontWeight="700" color={palette.secondary[500]}>
          <ModernModal open={modalIsOpen} onClose={setModalIsOpenToFalse}/>
            <TransactionsModal  open={transactionHistoryModalIsOpen} onClose={setTransactionHistoryModalToFalse}/>
              <IconButton onClick={setTransactionHistoryModalToTrue}  >
                  {viewIcon}
              </IconButton>
              <IconButton onClick={setTransactionHistoryModalToTrue} >
              {editIcon}
            </IconButton>
            <IconButton onClick={setModalIsOpenToTrue} >
              {addIcon}
          </IconButton>
        </Typography>
        </Box>  
      </FlexBetween> 
    </FlexBetween>
  );
};

export default BoxHeader;
