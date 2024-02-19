import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import TabNavigator from '@/components/Products/TabNavigator';
import {  Card, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';
 import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {  currentUser } from '@/state/types';
 
const line = {
  padding:'8px'
}
 
interface ModernTransactionsModal {
  open: boolean;
  onClose: () => void;
}

const style = {
  py: 0,
  width: '100%',
  maxWidth: 560,
  borderRadius: 2,
  marginLeft:48,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.light',
};

  const scrollableContainerStyle = {
    maxHeight: '400px', // Set a max height for the scrollable area
    overflowY: 'auto' // Add vertical scroll
  };

const TransactionsModal: React.FC<ModernTransactionsModal> = ({ open, onClose  }) => {
  const {palette} = useTheme()
  const currentUser = useSelector((state: currentUser) => state.rootReducer.currentUser);
  const lineItems = currentUser?.selctedLines;
  const [opend, setOpend] = React.useState(false); 
  const handleOpen = () => setOpend(true);
  const handleClose = () => setOpend(false); 
   return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      
  <Fade in={open}>
    <Box sx={style}> 
        <TabNavigator value={opend} />
         <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'center',
              overflow: 'auto',
              maxHeight: 800,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >   
 
        {/* Mapping products */}
         {lineItems && lineItems.map((punches: any, index: any) => {
          return(
            <Box key={index}>  
              <Stack sx={{  overflow: 'auto' }} direction="row" spacing={1}>
              <Box
                  mt="0.5rem"
                  p="2.5rem"
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
                <Card variant="outlined" sx={{ p: 4.55, ml:1}}  >
                    <Box >
                      <Stack sx={{ p: 4.55, ml:1}} >
                        <Typography gutterBottom variant="h3"  >
                          id : {punches?.id}
                        </Typography>  
                      <Typography color="text.secondary" variant="body2">
                      ClockedIn: {punches?.startTime}
                      </Typography>
                   <Typography color="text.secondary" variant="body2">
                      ClockedIn: {punches?.stopTime}
                      </Typography>
                       <Typography color="text.secondary" variant="body2">
                      createdAt: {punches?.createdAt}
                      </Typography>
                   <Typography color="text.secondary" variant="body2">
                      totalEarnings: {punches?.totalEarnings}
                      </Typography>
                 </Stack>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                      <Typography gutterBottom variant="body2">
                       Details:
                      </Typography>
                      <Stack direction="column" spacing={2}>
                        <Chip color="primary" label={punches?.createdAt} size="small" />
                        <Chip   size="small"  label={punches?.totalEarnings} />
                        <Chip  size="small" label={punches?.rate} />
                      </Stack>
                    </Box>
                  </Card>
                </Box>
             </Stack>  
            <Divider light sx={line}/>
          </Box>
          )
        })}  
    </List> 
      <Button onClick={onClose}>Cancel</Button>
    </Box>
  </Fade>
</Modal>
  );
};

export default TransactionsModal;
