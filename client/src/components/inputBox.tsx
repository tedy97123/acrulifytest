import { Box } from "@mui/material";
import { styled } from "@mui/system";

const InputBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.6rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  width:"15em",
  height:"4rem",
  marginLeft:"480px",
  marginTop:"2rem"
}));

export default InputBox;