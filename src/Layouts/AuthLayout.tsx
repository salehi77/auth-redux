import React from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import Button from "../Components/Button";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const StyledGrid = styled(Grid)(
  ({ theme }) => `
    min-height:100vh;
    color: ${console.log("theme", theme)};
`
);

const StyledLeftGrid = styled(Grid)(
  ({ theme }) => `
  background: linear-gradient(180deg, #0575E6 0%, #02298A 84.79%, #021B79 100%);
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:30px 10%;
  color:white;
  h1{
    margin:0;
  }
`
);
const StyledRightGrid = styled(Grid)(
  ({ theme }) => `
  padding:30px 0;
`
);

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <StyledGrid container>
      <StyledLeftGrid item xs={12} md={7}>
        <h1>GoFinance</h1>
        <p>The most popular peer to peer lending at SEA</p>
        <div>
          <Button>Read More</Button>
        </div>
      </StyledLeftGrid>
      <StyledRightGrid item xs={12} md={5}>
        {children}
      </StyledRightGrid>
    </StyledGrid>
  );
}
