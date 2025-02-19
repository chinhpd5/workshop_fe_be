import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import LayoutClient from "./pages/layouts/LayoutClient"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProductList from "./pages/ProductList"
import ProductAdd from "./pages/ProductAdd"
import ProductEdit from "./pages/ProductEdit"

function App() {

  return (
    <>
       <Routes>
        
        <Route path="/" element={<LayoutClient/>}>
          <Route index element={<Home/>}/>

          <Route path="product" element={<ProductList/>}/>
          <Route path="product/add" element={<ProductAdd/>}/>
          <Route path="product/edit/:id" element={<ProductEdit/>}/>

          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
        </Route>

        <Route path="*" element={<h1>Not found</h1>}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
