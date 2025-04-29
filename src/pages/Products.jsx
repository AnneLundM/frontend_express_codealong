import { useState } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import ProductForm from "../components/forms/ProductForm";
import ProductCard from "../components/productCard/ProductCard";

const Products = () => {
  const { products, refetch, deleteProduct, error, isLoading } =
    useFetchProducts();
  const [showForm, setShowForm] = useState(false);

  console.log(products);

  const handleAddProduct = () => {
    setShowForm(!showForm);
  };

  const handleDeleteProduct = async (productId) => {
    const result = await deleteProduct(productId);

    console.log(result);
  };

  if (isLoading) return <p>Indlæser produkter...</p>;
  if (error) return <p>Fejl: {error}</p>;

  return (
    <>
      <h1>Produkter</h1>
      <button onClick={() => handleAddProduct()}>Tilføj produkt</button>
      {showForm && <ProductForm onProductCreated={refetch} />}
      <ul>
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product._id}
            onDelete={handleDeleteProduct}
            onRefetch={refetch}
          />
        ))}
      </ul>
    </>
  );
};

export default Products;
