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
 };

const BoxHeader = ({ icon, title, subtitle }: Props) => {
  const { palette } = useTheme();
  //  const {products} = useSelector((state: any) => state.rootReducer.products);

  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h3" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween> 
    </FlexBetween>
  );
};

export default BoxHeader;
