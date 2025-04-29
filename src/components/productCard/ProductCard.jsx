import { useState } from "react";
import ProductForm from "../forms/ProductForm";

const ProductCard = ({ product, onDelete, onRefetch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <li key={product._id}>
      {product.title} – {product.price} kr.
      {product.image && <img alt={product.title} src={product.image} />}
      <div>
        <button onClick={() => onDelete(product._id)}>Slet produkt</button>
        <button onClick={handleEditClick}>Redigér produkt</button>
      </div>
      {isEditing && (
        <ProductForm
          onProductCreated={onRefetch}
          isEditMode={true}
          id={product._id}
        />
      )}
    </li>
  );
};

export default ProductCard;
