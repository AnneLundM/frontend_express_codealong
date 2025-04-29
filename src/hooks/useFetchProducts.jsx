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

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    error,
    isLoading,
  };
};

export { useFetchProducts };
