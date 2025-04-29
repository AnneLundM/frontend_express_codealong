import { useState } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import ProductForm from "../components/forms/ProductForm";

const Products = () => {
  const { products, error, isLoading } = useFetchProducts();
  const [showForm, setShowForm] = useState(false);

  console.log(products);

  const handleAddProduct = () => {
    setShowForm(true);
  };

  if (isLoading) return <p>Indlæser produkter...</p>;
  if (error) return <p>Fejl: {error}</p>;

  return (
    <>
      <h1>Produkter</h1>
      <button onClick={() => handleAddProduct()}>Tilføj produkt</button>
      {showForm && <ProductForm />}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.title} – {product.price} kr.
            {product.image && <img alt={product.title} src={product.image} />}
            {/* <div>
            <button onClick={}>Slet produkt</button>
            <button onClick={}>Redigér produkt</button>
            </div> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
