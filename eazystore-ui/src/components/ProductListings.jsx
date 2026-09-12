import { useState, useMemo } from "react";

import ProductCard from "./ProductCard";
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";

const sortList = ["Popularity", "Price: Low to High", "Price: High to Low"];

export default function ProductListings({ products }) {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(sortList[0]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase()),
    );

    return filteredProducts.slice().sort((a, b) => {
      switch (selectedOption) {
        case "Price: Low to High":
          return parseFloat(a.price) - parseFloat(b.price);
        case "Price: High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Popularity":
        default:
          return parseInt(b.popularity) - parseInt(a.popularity);
      }
    });
  }, [products, searchText, selectedOption]);

  function handleSearchChange(inputSearch) {
    setSearchText(inputSearch);
  }

  function handleSortOption(option) {
    setSelectedOption(option);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox
          label="Search"
          placeholder="Search products..."
          value={searchText}
          handleSearch={(value) => handleSearchChange(value)}
        />
        <Dropdown
          label="Sort By"
          options={sortList}
          value={selectedOption}
          handleSort={(value) => handleSortOption(value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary">
            No Products Available.
          </p>
        )}
      </div>
    </div>
  );
}
