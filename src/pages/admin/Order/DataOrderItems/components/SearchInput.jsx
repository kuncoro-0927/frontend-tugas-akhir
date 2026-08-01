const SearchInput = ({ value, onChange }) => (
  <div className="mb-4">
    <div className="max-w-md mx-auto">
      <div className="relative flex items-center border border-gray-400 w-full h-10 rounded-lg focus-within:border-gray-700 bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          className="peer h-full w-full outline-none text-sm text-gray-500 pr-2"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="search"
          placeholder="Cari data item pesanan"
        />
      </div>
    </div>
  </div>
);

export default SearchInput;
