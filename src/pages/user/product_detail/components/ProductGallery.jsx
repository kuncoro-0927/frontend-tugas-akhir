import React from "react";
import CardImage from "../../../../components/Card/CardImage";
const ProductGallery = ({ imageUrl }) => {
  return (
    <div className="md:w-1/2 lg:h-[550px] w-full h-[300px]">
      <CardImage image={imageUrl} />
    </div>
  );
};

export default ProductGallery;
