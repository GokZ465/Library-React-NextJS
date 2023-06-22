import { CloseOutlined } from "@ant-design/icons";
import { BasketItemControl } from "@/components/basket";
import { ImageLoader } from "@/components/common";
import { displayMoney } from "@/helpers/utils";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromBasket } from "@/redux/actions/basketActions";
import { CheckOutlined } from "@ant-design/icons";

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));

  return (
    <div className="basket-item">
      <BasketItemControl product={product} />
      <div className="basket-item-wrapper">
        <div className="basket-item-img-wrapper">
          <ImageLoader
            alt={product.name}
            className="basket-item-img"
            src={product.coverUrl}
          />
        </div>
        <div className="basket-item-details">
          <Link
            to={`/product/${product.id}`}
            onClick={() => document.body.classList.remove("is-basket-open")}
          >
            <h4 className="underline basket-item-name">{product.name}</h4>
          </Link>
          <div className="basket-item-specs">
            <div>
              <span className="spec-title">Quantity</span>
              <h5
                style={{
                  fontSize: "1.3rem",
                  marginLeft: "1.3rem",
                }}
                className="my-0"
              >
                1
              </h5>
            </div>
            <div>
              <span className="spec-title">Availability</span>

              <CheckOutlined
                className="fa fa-check "
                style={{
                  color: "green",
                  fontSize: "1.3rem",
                  marginRight: "3.2rem",
                }}
              />
            </div>
            <div>
              <span className="spec-title">Rent From Amount</span>
              <div
                style={{
                  // backgroundColor: "blue",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="basket-item-price">
          <h4 className="my-0">{displayMoney(product.price * 1)}</h4>
        </div>
        <button
          className="basket-item-remove button button-border button-border-gray button-small"
          onClick={onRemoveFromBasket}
          type="button"
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  product: PropType.shape({
    id: PropType.string,
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    quantity: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    selectedSize: PropType.string,
    selectedColor: PropType.string,
    imageCollection: PropType.arrayOf(PropType.string),
    sizes: PropType.arrayOf(PropType.number),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string),
  }).isRequired,
};

export default BasketItem;
