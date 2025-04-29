import { useEffect, useState } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get all products
  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/products");
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      setError("Der skete en fejl", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create product
  const createProduct = async (productData) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3042/product", {
        method: "POST",
        body: productData,
      });

      if (response.status === "error") {
        throw new Error("Fejl ved oprettelse af ophold");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch
  const refetch = () => {
    fetchProducts();
  };

  // Update product

  const updateProduct = async (productData) => {
    try {
      const response = await fetch(`http://localhost:3042/product`, {
        method: "PUT",
        body: productData,
      });

      if (response.status === "error") {
        console.log("fejl");
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/product/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data);

      if (data.status === "ok") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get by ID
  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/product/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log("fejl", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchProductById,
    refetch,
    error,
    isLoading,
  };
};

export { useFetchProducts };
