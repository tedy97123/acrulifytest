import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import TabNavigator from '@/components/Products/TabNavigator';
import { Chip, Divider, Stack } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';
import UpdateIcon from '@mui/icons-material/Update';
import StarRateIcon from '@mui/icons-material/StarRate';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardDescriptions from '@/components/Card';
import { lineItems } from '@/state/types';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 44,
  p: 4,
};
const line = {
  padding:'8px'
}

const boxContainer ={
  paddingTop:"30px",
  marginLeft:'30px'
}

interface ModernTransactionsModal {
  open: boolean;
  onClose: () => void;
}

const TransactionsModal: React.FC<ModernTransactionsModal> = ({ open, onClose  }) => {
  // Assuming 'products' is the key used in the rootReducer for the productReducer
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
        <TabNavigator value={opend}/>
        {/* Mapping products */}
        {/* {lineItems && lineItems.map((punches: any, index: any) => {
          return(
            <Box key={index}> 
              <BoxHeader
                title="lineItems"
                subtitle={"ID: " + punches?._id}
                sideText={''}                  
              /> 
              <CardDescriptions/>
              <Stack  sx={boxContainer} direction="row" spacing={4}>
                <Chip color="primary" label={punches?.startTime} icon={<AccountBalanceWalletIcon/>}  size="medium" /> 
                <Chip label={punches?.stopTime}  icon={<StarRateIcon/>}  size="medium" />
                <Chip label= {punches?.rate} icon={<UpdateIcon/>}  size="medium" />
             </Stack>  
            <Divider light sx={line}/>
          </Box>
          )
        })}   */}
      <Button onClick={onClose}>Cancel</Button>
    </Box>
  </Fade>
</Modal>
  );
};

export default TransactionsModal;
