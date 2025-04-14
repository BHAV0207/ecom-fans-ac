import { createContext, useState, useContext } from "react";
import axios from "axios";

export const LogicContext = createContext();

export const LogicProvider = ({ children }) => {
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState(null);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const [allOrders , setAllOrders] = useState([]);
  const [allRiders , setAllRiders] = useState([]);
  const [rider , setRider] = useState(null);

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
   
      setProductLoading(true);
      setProductError(null);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Fetching all orders...");
      const response = await axios.get(
        "http://localhost:5000/api/orders",
        config
      );
      console.log("Order Fetched successfully:", response.data);
      setAllOrders(response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch Products Error:", error);
      setProductError(error.response?.data?.message || "Something went wrong");
    } finally {
      setProductLoading(false);
    }
  }

  const getAllRiders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get(
        "http://localhost:5000/api/admin/riders",
        config
      );  
      console.log("Riders Fetched successfully:", response.data);
      setAllRiders(response.data.data);
      return response.data.data; 
    } catch (error) {
      console.error("Fetch Riders Error:", error);
      setProductError(error.response?.data?.message || "Something went wrong");
    }
  }

  const assignRiderToOrder = async (orderId, riderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.put(
        "http://localhost:5000/api/orders/assign-rider",
        { orderId, riderId },
        config
      );
  
      // Refresh orders after assignment
      await getAllOrders();
  
      return response.data;
    } catch (error) {
      console.error("Assign Rider Error:", error);
      setProductError(error.response?.data?.message || "Something went wrong while assigning rider");
    }
  };
  
  const createRider = async (riderData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(
        "http://localhost:5000/api/admin/rider-create",
        riderData,
        config
      );
  
      // Refresh riders after creation
      setRider(response.data.data);
      console.log("Rider created successfully:", response.data.data);
      await getAllRiders();
  
      return response.data;
    } catch (error) {
      console.error("Create Rider Error:", error);
      setProductError(error.response?.data?.message || "Something went wrong while creating rider");
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
        assignRiderToOrder,
        getAllRiders,
        allRiders,
        createRider,
        rider
      }}
    >
      {children}
    </LogicContext.Provider>
  );
};

export default LogicProvider;
