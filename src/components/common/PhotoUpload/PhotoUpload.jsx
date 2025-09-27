import { useState } from "react";
import styles from "./PhotoUpload.module.css";
import CameraIcon from "../../../assets/icons/camera.svg?react";

const PhotoUpload = ({ field, form }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setFieldValue(field.name, file);
    }
  };

  return (
    <div className={styles.photoUpload}>
      <label className={styles.photoLabel}>
        {preview ? (
          <img src={preview} alt="Preview" className={styles.previewImage} />
        ) : (
          <>
            <CameraIcon className={styles.icon} />
            <span className={styles.uploadText}>Upload a photo</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className={styles.photoInput}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default PhotoUpload;
