import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
 
 
interface ModernModalProps {
  open: boolean;
  onClose: () => void;
}
 
const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
];


//TODO add product flow to frontend
const ModernModal: React.FC<ModernModalProps> = ({ open, onClose }) => {
   const { palette } = useTheme();
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add/Update Product Table</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update or add a new product, fill out this form.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="productName"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"                   
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            variant="outlined"
          />
          <TextField
            id="filled-select-currency-native"
            select
            margin="dense"
            label="Currency Type"
            defaultValue="Dollar"
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
            variant="filled"
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="expense"
            label="Expense"
            type="number"
            fullWidth
            variant="outlined" 
          />
          <DialogActions>
           <Button  
           sx={{
            color: palette.grey[500],
            backgroundColor: palette.tertiary[500],
          }}>Submit</Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ModernModal;