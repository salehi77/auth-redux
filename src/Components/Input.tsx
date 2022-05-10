import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(
  ({ theme }) => `
  >div{
    height:60px
  }
  input{
  }
  fieldset{
    border:1px solid #EEEEEE;
    border-radius:30px;
    padding:18px 26px;
  }
`
);

export default StyledTextField;
