import React from "react";


const ImageGallery = ({ children }) => {
  return (
    <>
      <ul className="gallery">
       {children}
      </ul>
    </>
  );
};

export default ImageGallery;