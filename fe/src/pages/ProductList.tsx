import { useEffect, useState } from 'react'
import IProduct from '../interfaces/product';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import instance from '../config/axiosConfig';

function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products`);
        console.log(data);
        // return
        setProducts(data.data);
      } catch (error: any) {
        // console.log(error);
        
        toast.error(error.message);
      }
    })()
  }, []);

  const handleDelete = async (id: string) =>{
    if(window.confirm("Bạn có chắc chắn muốn xóa không ?")){
      try {
        await instance.delete(`/products/${id}`)
        
        toast.success("Xóa thành công");

        setProducts((prev: IProduct[])=>{
          return prev.filter((item:IProduct)=>{
            return item._id != id
          })
        })
      } catch (error) {
        toast.error((error as AxiosError).message)
      }
    }
    
  }

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <Link className="btn btn-primary" to={`add`}>Thêm mới</Link>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Giá bán</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item: IProduct, index: number) => {
            return (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.active ? "Có": "Không"}</td>
                <td>
                  <button onClick={()=>{handleDelete(item._id)}} className="btn btn-danger">Xóa</button>
                  <Link className="btn btn-warning" to={`edit/${item._id}`}>Sửa</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList