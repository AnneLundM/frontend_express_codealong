import { useEffect } from "react";
import styles from "./form.module.css";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useForm } from "react-hook-form";

const ProductForm = ({ onProductCreated, isEditMode, id }) => {
  const { createProduct, updateProduct, fetchProductById } = useFetchProducts();
  const { register, handleSubmit, setValue, watch } = useForm();

  const imagePreview = watch("imagepreview");

  // Når vi er i redigeringsmode, skal vi hente eksisterende produktdata
  useEffect(() => {
    if (isEditMode && id) {
      const loadProductData = async () => {
        try {
          const response = await fetchProductById(id);
          if (response) {
            // Udfyld formularen med eksisterende data
            setValue("title", response.title);
            setValue("description", response.description);
            setValue("price", response.price);
            setValue("category", response.category);
            setValue("imagePreview", response.image); // Forhåndsvisning af eksisterende billede
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      loadProductData();
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    const productData = new FormData();

    productData.append("title", data.title);
    productData.append("description", data.description);
    productData.append("category", data.category);
    productData.append("price", data.price);

    if (data.selectedFile && data.selectedFile[0]) {
      productData.append("image", data.selectedFile[0]);
    }

    try {
      let response;

      if (isEditMode && id) {
        productData.append("id", id);
        response = await updateProduct(productData);
      } else {
        response = await createProduct(productData);
      }

      if (response && onProductCreated) {
        onProductCreated();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objUrl = window.URL.createObjectURL(file);
      setValue("imagePreview", objUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor='title'>Titel</label>
      <input id='title' {...register("title", { required: true })} />

      <label htmlFor='description'>Beskrivelse</label>
      <input id='description' {...register("description")} />

      <label htmlFor='price'>Pris</label>
      <input id='price' type='number' {...register("price")} />

      <label htmlFor='category'>Kategori</label>
      <input id='category' {...register("category")} />

      <label htmlFor='image'>Vælg billede (valgfrit):</label>
      {imagePreview && <img src={imagePreview} alt='Preview' />}

      <input
        id='image'
        type='file'
        {...register("selectedFile")}
        onChange={handleAddImage}
      />
      <button type='submit'>Tilføj produkt</button>
    </form>
  );
};

export default ProductForm;
