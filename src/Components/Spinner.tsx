import { CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={150} />
    </div>
  );
}
