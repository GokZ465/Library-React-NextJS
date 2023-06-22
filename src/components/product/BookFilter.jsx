import { CloseCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter } from "@/redux/actions/filterActions";

const BookFilter = ({ searchCount }) => {
  const dispatch = useDispatch();
  const titleQuery = useSelector((state) => state.filter.titleQuery);
  const authorQuery = useSelector((state) => state.filter.authorQuery);
  const genreQuery = useSelector((state) => state.filter.genreQuery);
  const publishDateRange = useSelector(
    (state) => state.filter.publishDateRange
  );

  const isBookFiltered = [
    titleQuery,
    authorQuery,
    genreQuery,
    publishDateRange,
  ].some((value) => !!value);

  const onRemoveKeywordFilter = () => {
    dispatch(applyFilter({ titleQuery: "" }));
  };

  const onRemoveAuthorFilter = () => {
    dispatch(applyFilter({ authorQuery: "" }));
  };

  const onRemoveGenreFilter = () => {
    dispatch(applyFilter({ genreQuery: "" }));
  };

  const onRemovePublishDateFilter = () => {
    dispatch(applyFilter({ publishDateRange: "" }));
  };

  return !isBookFiltered ? null : (
    <>
      <div className="product-list-header">
        <div className="product-list-header-title">
          <h5>
            {searchCount > 0 &&
              `Found ${searchCount} ${searchCount > 1 ? "books" : "book"}`}
          </h5>
        </div>
      </div>
      <div className="product-applied-filters">
        {titleQuery && (
          <div className="pill-wrapper">
            <span className="d-block">Title</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{titleQuery}</h5>
              <div
                className="pill-remove"
                onClick={onRemoveKeywordFilter}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {authorQuery && (
          <div className="pill-wrapper">
            <span className="d-block">Author</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{authorQuery}</h5>
              <div
                className="pill-remove"
                onClick={onRemoveAuthorFilter}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {genreQuery && (
          <div className="pill-wrapper">
            <span className="d-block">Genre</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{genreQuery}</h5>
              <div
                className="pill-remove"
                onClick={onRemoveGenreFilter}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {publishDateRange && (
          <div className="pill-wrapper">
            <span className="d-block">Publish Date Range</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{publishDateRange}</h5>
              <div
                className="pill-remove"
                onClick={onRemovePublishDateFilter}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

BookFilter.propTypes = {
  searchCount: PropTypes.number,
};

export default BookFilter;
