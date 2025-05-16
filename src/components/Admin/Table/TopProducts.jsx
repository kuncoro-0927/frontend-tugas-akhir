import { useEffect, useState } from "react";
import { instance } from "../../../utils/axios";
import CardImage from "../../Card/CardImage";
const TopProduct = () => {
  const [topProduct, setTopProduct] = useState([]);

  useEffect(() => {
    instance
      .get("/top/product")
      .then((response) => {
        setTopProduct(response.data.data); // Set array langsung
      })
      .catch((error) =>
        console.error("Error fetching top agrotourism:", error)
      );
  }, []);

  const formatNumber = (number) => {
    return parseFloat(number).toLocaleString("id-ID"); // Format Indonesia
  };

  return (
    <>
      <div className="w-full border shadow-md  rounded-lg">
        <table className="w-full mb-3 rounded-lg min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className=" border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Produk Teratas
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            {topProduct.map((product) => (
              <tr key={product.product_id}>
                <td className="p-4 border-t border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="">
                      <CardImage
                        image={`${import.meta.env.VITE_BACKEND_URL}${
                          product.image_url
                        }`}
                        width="w-[60px]"
                        height="h-[60px]"
                      />
                    </div>
                    <div>
                      <p className="block antialiased font-bold text-sm leading-normal text-blue-gray-900">
                        {product.product_name}
                      </p>
                      <div className="flex items-center gap-5">
                        <p className="text-xs underline">
                          {product.category_name}
                        </p>

                        <p className="text-xs">
                          <span className="text-blue-500">Transaksi</span>
                          <span className=" ml-3 font-medium">
                            #{product.total_transactions}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4 border-t border-blue-gray-50">
                  <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-extrabold">
                    IDR: {formatNumber(product.total_amount)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TopProduct;
