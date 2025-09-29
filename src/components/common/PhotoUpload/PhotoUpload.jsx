import { useEffect, useState } from "react";
import styles from "./PhotoUpload.module.css";
import CameraIcon from "../../../assets/icons/camera.svg?react";

const PhotoUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (!value) setPreview(null);
  }, [value]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onChange(file);
  };

  return (
    <div className={styles.photoUpload}>
      {!preview ? (
        <label className={styles.photoLabel}>
          <CameraIcon className={styles.icon} />
          <span className={styles.uploadText}>Upload a photo</span>
          <input
            type="file"
            accept="image/*"
            className={styles.photoInput}
            onChange={handleChange}
          />
        </label>
      ) : (
        <>
          <img src={preview} alt="Preview" className={styles.previewImage} />
          <label className={styles.uploadLink}>
            <input
              type="file"
              accept="image/*"
              className={styles.photoInput}
              onChange={handleChange}
            />
            Upload another photo
          </label>
        </>
      )}
    </div>
  );
};

export default PhotoUpload;
