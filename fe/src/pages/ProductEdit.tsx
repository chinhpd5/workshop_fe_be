import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductInput } from "../interfaces/product";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import instance from "../config/axiosConfig";

function ProductEdit() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProductInput>();

  useEffect(()=>{
    (async () =>{
      if(id){
        (async()=>{
          const {data} = await instance.get(`/products/${id}`)
          console.log(data);
          
          if(data){
            reset(data.data)
          }
        })()
      }
    })()
  },[id])

  const onSubmit = async (data: ProductInput) => {
    try {
      await instance.put(`/products/${id}`, {
        ...data,
        active: data.active == "true" ? true: false
      });
      toast.success("Cập nhật thành công");
      navigate("/product");
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };
  return (
    <div>
      <h1>cập nhật sản phẩm</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("name", {
              required: "Không để trống tên sản phẩm",
            })}
          />
          {errors?.name && (
            <span className="text-danger">{errors?.name.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Giá bán
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            {...register("price", {
              required: "Không để trống giá bán",
              min: {
                value: 0,
                message: "Giá bán tối thiếu bằng 0",
              },
              pattern: {
                value: /^\d+$/,
                message: "Chưa đúng định dạng số",
              },
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="active" className="form-label">
            Trạng thái
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="true"
              value={'true'}
              {...register("active")}
            />
            <label className="form-check-label" htmlFor="true">
              Có
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="false"
              value={'false'}
              {...register("active")}
            />
            <label className="form-check-label" htmlFor="false">
              Không
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
