import { useState } from 'react';

export const useImageUpload = (resetPrediction) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      if (resetPrediction) {
        resetPrediction();
      }
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return {
    selectedImage,
    handleImageUpload
  };
};
