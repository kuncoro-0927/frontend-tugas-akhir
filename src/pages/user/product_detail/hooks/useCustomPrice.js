import { useEffect, useState } from "react";

export default function useCustomPrice(product, custom_width, custom_height) {
  const [customPrice, setCustomPrice] = useState(0);

  useEffect(() => {
    if (
      custom_width &&
      custom_height &&
      product?.width &&
      product?.height &&
      product?.price
    ) {
      const baseWidth = Number(product.width);
      const baseHeight = Number(product.height);
      const basePrice = Number(product.price);

      const baseArea = baseWidth * baseHeight;
      const pricePerCm2 = basePrice / baseArea;

      const customArea = Number(custom_width) * Number(custom_height);
      const newPriceRaw = pricePerCm2 * customArea;

      // Pembulatan ke 1.000 terdekat
      const newPrice = Math.round(newPriceRaw / 1000) * 1000;

      setCustomPrice(newPrice);
    } else if (product?.price) {
      setCustomPrice(Number(product.price));
    }
  }, [custom_width, custom_height, product]);

  return customPrice;
}
