import { createContext, useState, useContext } from "react";
import axios from "axios";

export const LogicContext = createContext();

export const LogicProvider = ({ children }) => {
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState(null);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const [allOrders , setAllOrders] = useState([]);

  const createProduct = async (productData) => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      // Check if productData is valid
      if (!productData || typeof productData !== "object") {
        throw new Error("Invalid product data");
      }
      
      setProductLoading(true);
      setProductError(null);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/products",
        productData,
        config
      );
      console.log("Product created successfully:", response.data);
      setCreatedProduct(response.data);

      getProducts(); // Fetch all products after creating a new one

      return response.data;
    } catch (error) {
      console.error("Create Product Error:", error);
      setProductError(error.response?.data?.message || "Something went wrong");
    } finally {
      setProductLoading(false);
    }
  };


  const getProducts = async () => {
    try {
     
      setProductLoading(true);
      setProductError(null);


      const response = await axios.get(
        "http://localhost:5000/api/products",
      );
      setAllProducts(response.data.data);
      return response.data;
    } catch (error) {
      console.error("Fetch Products Error:", error);
      setProductError(error.response?.data?.message || "Something went wrong");
    } finally {
      setProductLoading(false);
    }
  }

  const getAllOrders = async () => { 


    try {

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      // Check if productData is valid
      if (!productData || typeof productData !== "object") {
        throw new Error("Invalid product data");
      }

      setProductLoading(true);
      setProductError(null);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/orders",
        config
      );
      setAllOrders(response.data.data);
      return response.data;
    } catch (error) {
      console.error("Fetch Products Error:", error);
      setProductError(error.response?.data?.message || "Something went wrong");
    } finally {
      setProductLoading(false);
    }
  }


  return (
    <LogicContext.Provider
      value={{
        createProduct,
        productLoading,
        productError,
        createdProduct,
        allProducts,
        getProducts,
        getAllOrders, 
        allOrders,
      }}
    >
      {children}
    </LogicContext.Provider>
  );
};

export default LogicProvider;
