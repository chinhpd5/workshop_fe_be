import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../interfaces/user";
import instance from "../config/axiosConfig";

function Register() {
  const {
    register,
    handleSubmit,
    formState:{errors},
    watch
  } = useForm<IRegister>();
  const navigate = useNavigate()

  const onSubmit = async (data: IRegister) =>{
    try {
      data.confirmPassword = undefined;
      await instance.post(`/auth/register`,data)
      toast.success("Đăng ký thành công");
      navigate('/login')
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }

  return (
    <div>
      <h1>Đăng ký</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            {...register("username",{
              required: "Không để trống Username"
            })}
          />
          {errors?.username && <span className="text-danger">{errors?.username?.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email",{
              required: "Không để trống email",
              pattern:{
                value: /^\S+@\S+\.\S+$/,
                message:"Sai định dạng email"
              }
            })}
          />
          {errors?.email && <span className="text-danger">{errors?.email?.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password",{
              required: "Không để trống password",
              minLength:{
                value: 6,
                message: "Cần tối thiểu 6 ký tự"
              }
            })}
          />
          {errors?.password && <span className="text-danger">{errors?.password?.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            {...register("confirmPassword",{
              required: "Không để trống Confirm password",
              validate: (value)=>{
                return value == watch("password") || "Confirm password không trùng với password"
              }
            })}
          />
          {errors?.confirmPassword && <span className="text-danger">{errors?.confirmPassword?.message}</span>}
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;