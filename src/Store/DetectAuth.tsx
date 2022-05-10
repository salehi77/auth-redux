import React, { useEffect, useState } from "react";
import { useAppDispatch } from ".";
import { loginStorage } from "./actions/auth";
import { CircularProgress } from "@mui/material";

type DetectAuthProps = {
  children: React.ReactNode;
};

export default function DetectAuth({ children }: DetectAuthProps) {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handleStorage = async () => {
    await dispatch(loginStorage());
    setLoading(false);
  };

  useEffect(() => {
    handleStorage();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={150} />
        </div>
      ) : (
        children
      )}
    </>
  );
}
