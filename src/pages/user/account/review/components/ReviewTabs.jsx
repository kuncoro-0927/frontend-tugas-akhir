const ReviewTabs = ({ activeTab, onTabChange }) => (
  <div className="flex">
    <button
      onClick={() => onTabChange("products")}
      className={`font-bold py-2 px-4 ${
        activeTab === "products" ? "border-blue-400 border-b-4" : ""
      }`}
    >
      Produk Anda
    </button>
    <button
      onClick={() => onTabChange("reviews")}
      className={`font-bold py-2 px-4 ml-5 ${
        activeTab === "reviews" ? "border-blue-400 border-b-4" : ""
      }`}
    >
      Ulasan Anda
    </button>
  </div>
);

export default ReviewTabs;
