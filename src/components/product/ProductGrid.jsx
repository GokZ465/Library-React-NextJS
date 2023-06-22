import { useBasket } from "@/hooks";
import PropType from "prop-types";
import React from "react";
import ProductItem from "./ProductItem";
import BookItem from "./BookItem";

const ProductGrid = ({ products , calculatePrice }) => {
  const { addToBasket, isItemOnBasket } = useBasket();

  return (
    <div className="product-grid">
      {products.length === 0
        ? new Array(12).fill({}).map((product, index) => (
            <ProductItem
              // eslint-disable-next-line react/no-array-index-key
              key={`product-skeleton ${index}`}
              product={product}
            />
          ))
        : products.map((product) => (
            <BookItem
              key={product.id}
              isItemOnBasket={isItemOnBasket}
              addToBasket={addToBasket}
              book={product}
            />
          ))}
    </div>
  );
};

ProductGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropType.array.isRequired,
};

export default ProductGrid;
