import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { dashboardApi } from "../Api";

interface IData {
  name: string;
  uv: number;
}

const StyledGrid = styled(Grid)(
  ({ theme }) => `
    height:100%;
    display:flex;
    align-items:center;
    >div{
      height:300px
    }
`
);

export default function Dashboard() {
  const [data, setData] = useState<IData[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dashboardApi()
      .then((res) => {
        setData(res);
        setLoading(false);
        setData(res.Reports.map((uv: any, i: number) => ({ name: i + 1, uv })));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <StyledGrid container>
      <Grid item xs={12} md={10}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </StyledGrid>
  );
}
