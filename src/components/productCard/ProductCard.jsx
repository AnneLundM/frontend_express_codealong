import { useState } from "react";
import ProductForm from "../forms/ProductForm";
import styles from "./productCard.module.css";

const ProductCard = ({ product, onDelete, onRefetch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <ProductForm
          onProductCreated={onRefetch}
          isEditMode={true}
          id={product._id}
        />
      ) : (
        <figure key={product._id} className={styles.productCard}>
          <h2>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
          <p>{product.price} kr.</p>
          {product.image && <img alt={product.title} src={product.image} />}
          <div className={styles.buttonContainer}>
            <button onClick={() => onDelete(product._id)}>Slet produkt</button>
            <button onClick={handleEditClick}>Redigér produkt</button>
          </div>
        </figure>
      )}
    </>
  );
};

export default ProductCard;
