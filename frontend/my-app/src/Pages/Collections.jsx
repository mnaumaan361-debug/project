
import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../components/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../components/Card";

function Collections() {
  const [showFilter, setShowFilter] = useState(false);

  const {
    search,
    product,
    showSearch
  } = useContext(shopDataContext);

  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // Category filter
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // SubCategory filter
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubCategory((prev) => [
        ...prev,
        e.target.value
      ]);
    }
  };

  // Apply filters
  const applyFilter = () => {
    let productCopy = product.slice();

    // Search filter
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // SubCategory filter
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productCopy);
  };

  // Sort products
  const sortProduct = () => {
    let productCopy = filterProduct.slice();

    switch (sortType) {
      case "low-high":
        setFilterProduct(
          productCopy.sort((a, b) => a.price - b.price)
        );
        break;

      case "high-low":
        setFilterProduct(
          productCopy.sort((a, b) => b.price - a.price)
        );
        break;

      default:
        applyFilter();
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(product);
  }, [product]);

  useEffect(() => {
    applyFilter();
  }, [
    category,
    subCategory,
    product,
    search,
    showSearch
  ]);

  return (
    <div
      className="
        w-screen
        min-h-screen
        bg-gradient-to-b
        from-[#141414]
        to-[#0c2025]
        flex
        flex-col
        md:flex-row
        items-start
        justify-start
        pt-[70px]
        px-[15px]
        md:px-[30px]
        gap-[30px]
        md:gap-[40px]
        overflow-x-hidden
        z-[2]
        text-white
      "
    >
      {/* ================= FILTER SECTION ================= */}

      <div className="w-full md:w-[250px] flex-shrink-0">

        {/* All Collection */}
        <div
          className="
            w-full
            border
            border-[#96969635]
            rounded-lg
            p-[15px]
            bg-[#00000025]
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              cursor-pointer
            "
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <span className="text-[20px] font-semibold">
              ALL COLLECTION
            </span>

            {showFilter ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </div>

          {/* Filter Options */}
          <div
            className={`
              ${
                showFilter
                  ? "flex"
                  : "hidden md:flex"
              }
              flex-col
              gap-[15px]
              mt-[20px]
            `}
          >
            {/* Category */}
            <div>
              <p className="text-[18px] font-semibold mb-[10px]">
                CATEGORY
              </p>

              <div className="flex flex-col gap-[10px]">
                <label className="flex gap-[10px] items-center">
                  <input
                    type="checkbox"
                    value="Men"
                    onChange={toggleCategory}
                  />
                  Men
                </label>

                <label className="flex gap-[10px] items-center">
                  <input
                    type="checkbox"
                    value="Women"
                    onChange={toggleCategory}
                  />
                  Women
                </label>

                <label className="flex gap-[10px] items-center">
                  <input
                    type="checkbox"
                    value="Kids"
                    onChange={toggleCategory}
                  />
                  Kids
                </label>
              </div>
            </div>

            {/* Sub Category */}
            <div className="mt-[10px]">
              <p className="text-[18px] font-semibold mb-[10px]">
                SUB CATEGORY
              </p>

              <div className="flex flex-col gap-[10px]">
                <label className="flex gap-[10px] items-center">
                  <input
                    type="checkbox"
                    value="Topwear"
                    onChange={toggleSubCategory}
                  />
                  Topwear
                </label>

                <label className="flex gap-[10px] items-center">
                  <input
                    type="checkbox"
                    value="Bottomwear"
                    onChange={toggleSubCategory}
                  />
                  Bottomwear
                </label>

                <label className="flex gap-[10px] items-center">
                  <input
                    type="checkbox"
                    value="Winterwear"
                    onChange={toggleSubCategory}
                  />
                  Winterwear
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS SECTION ================= */}

      <div className="w-full flex-1">

        {/* Heading + Sort */}
        <div
          className="
            w-full
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            justify-between
            gap-[20px]
            mb-[30px]
          "
        >
          <Title text1="ALL" text2="COLLECTION" />

          {/* Sort */}
          <select
            className="
              w-full
              sm:w-[220px]
              h-[50px]
              px-[10px]
              bg-slate-600
              text-white
              rounded-lg
              border-2
              hover:border-[#46d1f7]
              outline-none
              cursor-pointer
            "
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value)
            }
          >
            <option value="relavent">
              Sort By: Relevant
            </option>

            <option value="low-high">
              Sort By: Low To High
            </option>

            <option value="high-low">
              Sort By: High To Low
            </option>
          </select>
        </div>

        {/* Products */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            gap-x-[15px]
            gap-y-[30px]
            pb-[50px]
          "
        >
          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              image={item.image1}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;