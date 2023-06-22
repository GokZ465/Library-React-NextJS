import { CheckOutlined } from "@ant-design/icons";
import { ImageLoader } from "@/components/common";
import PropType from "prop-types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

const BookItem = ({ book, isItemOnBasket, addToBasket }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!book) return;

    if (book.id) {
      history.push(`/book/${book.id}`);
    }
  };
  const itemOnBasket = isItemOnBasket ? isItemOnBasket(book.id) : false;

  const handleAddToBasket = () => {
    if (addToBasket) addToBasket({ ...book, selectedQuantity: '10' });
  };

  if (!book) {
    return (
      <div className="product-card product-loading">
        <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
          <Skeleton width="100%" height="100%" />
        </SkeletonTheme>
      </div>
    );
  }

  const { id, title, author, coverUrl, publishDate } = book;

  return (
    <div
      className="product-card"
      style={{
        border: book ? "1px solid #a6a5a5" : "",
        boxShadow: book ? "0 10px 15px rgba(0, 0, 0, .07)" : "none",
      }}
    >
      {id && <CheckOutlined className="fa fa-check product-card-check" />}
      <div
        className="product-card-content"
        onClick={onClickItem}
        role="presentation"
      >
        {/* {console.log("console :", coverUrl, author, title, publishDate)} */}
        <div className="product-card-img-wrapper">
          {coverUrl ? (
            <ImageLoader
              alt={title}
              className="product-card-img"
              src={coverUrl}
            />
          ) : (
            <Skeleton width="100%" height="90%" />
          )}
        </div>
        <div className="product-details">
          <h5 className="product-card-name text-overflow-ellipsis margin-auto">
            {title || <Skeleton width={80} />}
          </h5>
          <p className="product-card-author">
            {author || <Skeleton width={60} />}
          </p>
          <h4 className="product-card-publish-date">
            {publishDate || <Skeleton width={40} />}
          </h4>
        </div>
      </div>
      {id && (
        <button
          className={`product-card-button button-small button button-block ${
            itemOnBasket ? "button-border button-border-gray" : ""
          }`}
          onClick={handleAddToBasket}
          type="button"
        >
          {itemOnBasket ? "Remove from basket" : "Add to basket"}
        </button>
      )}
    </div>
  );
};

BookItem.propTypes = {
  book: PropType.shape({
    id: PropType.string,
    title: PropType.string,
    author: PropType.string,
    coverUrl: PropType.string,
    publishDate: PropType.string,
    isItemOnBasket: PropType.func,
    addToBasket: PropType.func,
  }),
};

export default BookItem;
