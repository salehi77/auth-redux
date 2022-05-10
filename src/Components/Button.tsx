import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button as any)(
  ({ theme, loading }) => `
  background: ${theme.palette.primary.main};
  color:${loading ? "#777" : "white"};
  border-radius:30px;
  padding:8px 30px;
  position:relative;
  text-transform:unset;
  &:hover{
    background: ${theme.palette.primary.main};
  }
`
);

interface NewButtonProps extends ButtonProps {
  loading?: boolean;
}

export default function NewButton({
  loading,
  children,
  ...props
}: NewButtonProps) {
  return (
    <StyledButton {...props} loading={loading}>
      <span>{children}</span>
      {loading && (
        <CircularProgress
          size={30}
          color="secondary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-15px",
            marginLeft: "-15px",
          }}
        />
      )}
    </StyledButton>
  );
}
