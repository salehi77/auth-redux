import React, { useState } from "react";
import { Avatar, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import Button from "../Components/Button";

// assets
import PersonImage from "../Assets/images/person.png";

// redux
import { logoutAction } from "../Store/actions/auth";
import { useAppDispatch } from "../Store";

type UserLayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 300;

const StyledWrapper = styled("div")(
  ({ theme }) => `   
    min-height:100vh;
    display:flex;
    position:relative
`
);

const StyledDrawer = styled(Drawer)(
  ({ theme }) => `
  .MuiDrawer-paper{
    width:${drawerWidth}px;
    background: linear-gradient(180deg, #0575E6 0%, #02298A 84.79%, #021B79 100%);
    padding:40px 15px 30px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    color:white;
    position:fixed;
    >div:first-of-type{
      display:flex;
      justify-content:center;
      gap:10px;
      font-size:32px;
      font-weight:700;
    }
    >div:last-of-type{
      >div{
        display:flex;
        flex-direction:column;
        align-items:center;
        font-size:24px
      }
      button{
        margin-top:35px;
        width:100%
      }
    }
  } 
`
);

const StyledContent = styled("div")(
  ({ theme }) => `
  width:100%;
  padding:30px 40px;
  @media (max-width: 900px) {
    padding-top:60px
  }
`
);

const StyledIconButton = styled("div" as any)(
  ({ theme, drawerOpen }) => `
    background: linear-gradient(180deg, #0575E6 0%, #02298A 84.79%, #021B79 100%);
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:55px;
    border-bottom:1px solid #EEE;
    >button{
      position:relative;
      top:5px;
      left:20px;
      width:45px;
      height:45px;
      background:#EEE;
      transform:rotate(90deg);
      transition:all .3s;
      &:hover{
        background:#EEE;
      }
    }
`
);

export default function UserLayout({ children }: UserLayoutProps) {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <StyledWrapper>
      {isMobile && (
        <StyledIconButton drawerOpen={drawerOpen}>
          <IconButton
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
          >
            III
          </IconButton>
        </StyledIconButton>
      )}
      <StyledDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={isMobile ? undefined : "permanent"}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div>
          <span>GoFinance</span>
        </div>

        <div>
          <div>
            <Avatar
              alt="Remy Sharp"
              src={PersonImage}
              sx={{ width: 78, height: 78 }}
            />
            <span>Remy Sharp</span>
          </div>
          <Button
            onClick={() => {
              dispatch<any>(logoutAction());
            }}
          >
            logout
          </Button>
        </div>
      </StyledDrawer>

      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  );
}
