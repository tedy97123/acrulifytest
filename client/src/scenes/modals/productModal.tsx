import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { currentUser } from '@/state/types';
import { usePostClockInMutation, usePostClockOutMutation, usePostTotalWorkHoursMutation } from '@/state/api';

interface ModernModalProps {
  open: boolean;
  onClose: () => void;
}

const ModernModal: React.FC<ModernModalProps> = ({ open, onClose }) => {
  const { palette } = useTheme();
  const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser);
  const [updatePunchInTime] = usePostClockInMutation();
  const [updateTotalWorkHours] = usePostTotalWorkHoursMutation();
  const [clockOut] = usePostClockOutMutation();
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleStopTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStopTime(event.target.value);
  };

  const handleTimeUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const userId = currentUser.currentUser.id;
    const lineItemId = currentUser.selctedLines[0].id; 
    const lineItemRate = currentUser.selctedLines[0].rate;
    console.log(lineItemId)
    updatePunchInTime({
      'userId': userId,
      'startTime': startTime,
      'lineItemId': lineItemId,
    }).unwrap()
      .then((updateResponse) => {
        console.log('Line item updated and clocked In:', updateResponse);
        return clockOut({
          'userId': userId,
          'stopTime': stopTime,
          'startTime': startTime,
          'lineItemId': lineItemId  ,
          'rate' : lineItemRate
        }).unwrap();
      })
      .then((updateResponse) => {
        console.log('Line item updated and clocked Out:', updateResponse);
        return updateTotalWorkHours({
          'userId': userId,
          'lineItemId': lineItemId,
          "startTime":startTime,
          "stopTime":stopTime,
          "rate":lineItemRate,

        }).unwrap();
      })
      .then((updateResponse) => {
        console.log('Total work hours updated:', updateResponse);
      })
      .catch(error => {
        console.error('Error updating time:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Line Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Follow this format HH:MM:SS
        </DialogContentText> 
        <Box component="form" onSubmit={handleTimeUpdate} noValidate sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            id="startTime"
            name="startTime"
            type="time"
            fullWidth
            variant="outlined"
            inputProps={{ step: 1 }}
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <TextField
            margin="dense"
            id="stopTime"
            name="stopTime"
            type="time"
            fullWidth
            variant="outlined"
            inputProps={{ step: 1 }}
            value={stopTime}
            onChange={handleStopTimeChange}
          />
          <DialogActions>
            <Button 
              type="submit"
              sx={{
                color: palette.grey[500],
                backgroundColor: palette.tertiary[500],
              }}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModernModal;
