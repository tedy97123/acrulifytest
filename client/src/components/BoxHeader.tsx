import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import ModernModal from "@/scenes/modals/productModal";
import TransactionsModal from "@/scenes/modals/viewProductsModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransactionHistoryModalOpen, setIsTransactionHistoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Renamed for clarity

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openTransactionHistoryModal = () => setIsTransactionHistoryModalOpen(true);
  const closeTransactionHistoryModal = () => setIsTransactionHistoryModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true); // Use renamed state
  const closeEditModal = () => setIsEditModalOpen(false); // Use renamed state
 

  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h3" mb="-1.4rem">
            {title}
          </Typography>
          <Typography ml="40rem" variant="h5" fontWeight="700" color={palette.secondary[500]}>
              <ModernModal open={isEditModalOpen} onClose={closeEditModal}/>
              <TransactionsModal open={isTransactionHistoryModalOpen} onClose={closeTransactionHistoryModal}/>
              <IconButton onClick={openTransactionHistoryModal}>
                {viewIcon}
              </IconButton>
              <IconButton onClick={openEditModal}>
                {editIcon}
              </IconButton>
              {sideText}
            </Typography>
        </Box>  
      </FlexBetween> 
    </FlexBetween>
  );
};

export default BoxHeader;
