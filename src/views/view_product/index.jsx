import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { ColorChooser, ImageLoader, MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { RECOMMENDED_PRODUCTS, SHOP } from "@/constants/routes";
import { displayMoney } from "@/helpers/utils";
import { useLocation } from "react-router-dom";

import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useRecommendedProducts,
  useScrollTop,
} from "@/hooks";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";

const ViewProduct = (props) => {
  const location = useLocation();
  const book = location.state.book;
  // console.log("book :", book);
  const { id } = book.id;
  const product = [book];
  const isLoading = false;
  const error = false;
  const { addToBasket, isItemOnBasket } = useBasket(id);
  useScrollTop();
  useDocumentTitle(`View ${product?.name || "Item"}`);

  const [selectedImage, setSelectedImage] = useState(product?.coverUrl || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useRecommendedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToBasket = () => {
    addToBasket({
      ...product[0],
      selectedColor,
      selectedSize: selectedSize || product.sizes[0],
    });
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: "3rem" }} />
        </div>
      )}
      {error && <MessageDisplay message={error} />}
      {console.log("book :", product[0])}
      {product && !isLoading && (
        <div className="product-view">
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Back to shop
            </h3>
          </Link>
          <div className="product-modal">
            {product.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.coverUrl)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.coverUrl}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && (
                <input
                  type="color"
                  disabled
                  ref={colorOverlay}
                  id="color-overlay"
                />
              )}
              <ImageLoader
                alt={product.name}
                className="product-modal-image"
                src={selectedImage || product[0].coverUrl}
              />
            </div>
            <div className="product-modal-details">
              <br />
              <span className="text-subtle">{`Id: ${product[0].id.substring(
                7
              )}     Edition : ${product[0].edition}`}</span>
              <h1 className="margin-top-0">{product[0].title}</h1>
              <h2>{product[0].author.split(",")[0]}</h2>
              <span>{product[0].publishPlace}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              <div>
                <h3 className="text-subtle">{`Published Date: ${product[0].publishDate}`}</h3>
                <span>
                  {product[0].subject.length > 60
                    ? `${product[0].subject.slice(0, 260)}...`
                    : product[0].subject}
                </span>
                <br />
                <br />
                <Select
                  placeholder="--Available--"
                  onChange={onSelectedSizeChange}
                  options={product
                    //   // .sort((a, b) => (a < b ? -1 : 1))
                    .map((size) => ({
                      label: `${size.quantity} quantity`,
                      value: size,
                    }))}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div>
              <br />
              {/* {product.availableColors.length >= 1 && (
                <div>
                  <span className="text-subtle">Choose Color</span>
                  <br />
                  <br />
                  <ColorChooser
                    availableColors={product.availableColors}
                    onSelectedColorChange={onSelectedColorChange}
                  />
                </div>
              )} */}
              <h1>{displayMoney(product[0].price)}</h1>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${
                    isItemOnBasket(product.id)
                      ? "button-border button-border-gray"
                      : ""
                  }`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                  {isItemOnBasket(product.id)
                    ? "Remove From Basket"
                    : "Add To Basket"}
                </button>
              </div>
            </div>
          </div>
          {/* <div style={{ marginTop: "10rem" }}>
            <div className="display-header">
              <h1>Recommended</h1>
              <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
            </div>
            {errorFeatured && !isLoadingFeatured ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={recommendedProducts}
                skeletonCount={3}
              />
            )}
          </div> */}
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
