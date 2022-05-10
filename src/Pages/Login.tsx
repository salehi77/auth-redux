import { useForm } from "react-hook-form";
import { styled } from "@mui/system";

import Button from "../Components/Button";
import Input from "../Components/Input";

// redux
import { loginAction } from "../Store/actions/auth";
import { useAppDispatch, useAppSelector } from "../Store";
import { Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StyledForm = styled("form")(
  ({ theme }) => `
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:16px;
    padding:0 20%;
    >div:first-of-type{
      font-size:26px;
      font-weight:700;
    }
    >div:last-of-type{
      font-size:18px;
      font-weight:400;
    }
    button{
      padding-top:18px;
      padding-bottom:18px;
    }
`
);

export default function Login() {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await dispatch<any>(loginAction(data));
    toast.success("Login was successful");
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>Hello Again!</div>
      <div>Welcome Back</div>
      <Input
        {...register("email", {
          required: "This field is required!",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address!",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        placeholder="Email Address"
      />
      <Input
        {...register("password", {
          required: "This field is required!",
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        variant="outlined"
        placeholder="Password"
        type="password"
      />
      <FormControlLabel
        control={<Checkbox {...register("remember")} defaultChecked />}
        label="Remember me"
      />
      <Button type="submit" loading={loading}>
        Login
      </Button>

      <p>
        Dont't have account? <Link to="/signup">Click here</Link>
      </p>
    </StyledForm>
  );
}
