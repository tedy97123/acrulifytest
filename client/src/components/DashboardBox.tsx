import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.6rem 0.15rem 0.1rem rgba(0, 0, 0, .8)",
  width:"820px",
  height:"350px",
  marginLeft:"200px"
}));

export default DashboardBox;
