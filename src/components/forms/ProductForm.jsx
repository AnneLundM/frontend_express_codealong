import { useState } from "react";
import styles from "./form.module.css";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmitProduct = () => {
    console.log("Produkt tilføjet!");
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objUrl = window.URL.createObjectURL(file);
      setImage(objUrl);
    }
  };

  return (
    <form onSubmit={handleSubmitProduct} className={styles.form}>
      <label htmlFor='title'>Titel</label>
      <input
        type='text'
        value={title}
        id='title'
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor='description'>Beskrivelse</label>
      <input
        type='text'
        value={description}
        id='description'
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor='price'>Pris</label>
      <input
        type='number'
        value={price}
        id='price'
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor='category'>Kategori</label>
      <input
        type='number'
        value={category}
        id='category'
        onChange={(e) => setCategory(e.target.value)}
      />
      <label htmlFor='image'>Vælg billede (valgfrit):</label>
      {image && <img src={image} />}
      <input type='file' id='image' onChange={handleAddImage} />

      <button type='submit'>Tilføj produkt</button>
    </form>
  );
};

export default ProductForm;
