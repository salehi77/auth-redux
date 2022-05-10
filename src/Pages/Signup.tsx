import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import { Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store";
import Button from "../Components/Button";
import Input from "../Components/Input";

// redux
import { signupAction } from "../Store/actions/auth";

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

export default function Signup() {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await dispatch<any>(signupAction(data));
    toast.success("Register was successful");
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>Hello!</div>
      <div>Sign Up to Get Started</div>
      <Input
        {...register("first_name", {
          required: "This field is required!",
        })}
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
        variant="outlined"
        placeholder="First Name"
      />
      <Input
        {...register("last_name", {
          required: "This field is required!",
        })}
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
        variant="outlined"
        placeholder="Last Name"
      />
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
      <Input
        {...register("password_confirm", {
          required: "This field is required!",
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "Your passwords do no match";
            }
          },
        })}
        error={!!errors.password_confirm}
        helperText={errors.password_confirm?.message}
        variant="outlined"
        placeholder="Password Confirm"
        type="password"
      />
      <FormControlLabel
        control={<Checkbox {...register("remember")} defaultChecked />}
        label="Remember me"
      />
      <Button type="submit" loading={loading}>
        Register
      </Button>

      <p>
        Already have account? <Link to="/login">Click here</Link>
      </p>
    </StyledForm>
  );
}
