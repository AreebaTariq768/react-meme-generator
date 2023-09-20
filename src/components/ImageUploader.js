import React, { useState } from 'react';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
console.log(image);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" />}
    </div>
  );
};

export default ImageUploader;
