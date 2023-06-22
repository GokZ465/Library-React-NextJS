import { BookFilter, ProductGrid } from "@/components/product";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Home = () => {
  const [titleQuery, setTitleQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [genreQuery, setGenreQuery] = useState("");
  const [publishDateRange, setPublishDateRange] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (
      titleQuery.trim() === "" &&
      authorQuery.trim() === "" &&
      genreQuery.trim() === "" &&
      publishDateRange.trim() === ""
    ) {
      setSearchResults([]);
      setSearchCount(0);
    } else {
      searchBooks();
    }
  }, [titleQuery, authorQuery, genreQuery, publishDateRange]);

  const searchBooks = () => {
    setIsLoading(true);
    setPage(1); // Reset the page number
    let searchUrl = "https://openlibrary.org/search.json?";

    if (titleQuery.trim() !== "") {
      searchUrl += `title=${encodeURIComponent(titleQuery)}&`;
    }

    if (authorQuery.trim() !== "") {
      searchUrl += `author=${encodeURIComponent(authorQuery)}&`;
    }

    if (genreQuery.trim() !== "") {
      searchUrl += `subject=${encodeURIComponent(genreQuery)}&`;
    }

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        let books = data.docs.map((book) => {
          if (!book.cover_i) {
            return null;
          }

          const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
          const randomNum = Math.floor(Math.random() * 10000);
          const bookId = `book-${book.cover_i}-${
            book.title
          }-${book.author_name?.join("-")}-${randomNum}`;

          return {
            id: bookId,
            title: book.title,
            author: book.author_name?.join(", ") || "Unknown Author",
            publishDate: book.publish_date?.[0] || "Unknown Publish Date",
            coverUrl: coverUrl,
          };
        });

        books = books.filter((book) => book !== null); // Remove null elements

        if (publishDateRange.trim() !== "") {
          const [startYear, endYear] = publishDateRange.split("-").map(Number);
          books = books.filter((book) => {
            const publishYear = Number(book.publishDate);
            return (
              !isNaN(publishYear) &&
              publishYear >= startYear &&
              publishYear <= endYear
            );
          });
        }

        setSearchResults(books);
        setSearchCount(books.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Book Search Error:", error);
        setIsLoading(false);
      });
  };

  const loadMoreBooks = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      let searchUrl = "https://openlibrary.org/search.json?";
      const startIndex = (page - 1) * 30;

      if (titleQuery.trim() !== "") {
        searchUrl += `title=${encodeURIComponent(titleQuery)}&`;
      }

      if (authorQuery.trim() !== "") {
        searchUrl += `author=${encodeURIComponent(authorQuery)}&`;
      }

      if (genreQuery.trim() !== "") {
        searchUrl += `subject=${encodeURIComponent(genreQuery)}&`;
      }

      searchUrl += `start=${startIndex}&`;

      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          let books = data.docs.map((book) => {
            const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            const randomNum = Math.floor(Math.random() * 10000);
            const bookId = `book-${book.cover_i}-${
              book.title
            }-${book.author_name?.join("-")}-${randomNum}`;

            return {
              id: bookId,
              title: book.title,
              author: book.author_name?.join(", ") || "Unknown Author",
              publishDate: book.publish_date?.[0] || "Unknown Publish Date",
              coverUrl: book.cover_i ? coverUrl : null,
            };
          });

          setSearchResults((prevResults) => [...prevResults, ...books]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Book Load More Error:", error);
          setIsLoading(false);
        });
    }
  }, [page]);

  return (
    <div className="container">
      <h1 className="text-center">Book Search</h1>
      <div className="row justify-content-center mb-3">
        <div className="col-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title"
              value={titleQuery}
              onChange={(event) => {
                setTitleQuery(event.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search by Author"
              value={authorQuery}
              onChange={(event) => {
                setAuthorQuery(event.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search by Genre"
              value={genreQuery}
              onChange={(event) => {
                setGenreQuery(event.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search by Publish Date Range (e.g., 2000-2010)"
              value={publishDateRange}
              onChange={(event) => {
                setPublishDateRange(event.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              onClick={searchBooks}
              disabled={isLoading}
            >
              Search
            </button>
            <BookFilter searchCount={searchCount} />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          {isLoading ? (
            <SkeletonTheme color="#f3f3f3" highlightColor="#ecebeb">
              <Skeleton height={150} count={3} />
            </SkeletonTheme>
          ) : (
            <div>
              <p className="text-center">
                Search results: {searchCount} books found
              </p>
              <ul className="list-group">
                {searchResults.length === 0 ? (
                  <li className="list-group-item text-center">
                    No results found
                  </li>
                ) : (
                  <>
                    <ProductGrid products={searchResults.slice(0, page * 30)} />
                    {searchResults.length > page * 30 && (
                      <li className="list-group-item text-center">
                        {isLoading ? (
                          <SkeletonTheme
                            color="#f3f3f3"
                            highlightColor="#ecebeb"
                          >
                            <Skeleton width={120} height={40} />
                          </SkeletonTheme>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={loadMoreBooks}
                            disabled={isLoading}
                          >
                            Load More
                          </button>
                        )}
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
