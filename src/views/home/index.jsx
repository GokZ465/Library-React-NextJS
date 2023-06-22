import { useState, useEffect } from "react";

const Home = () => {
  const [titleQuery, setTitleQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [genreQuery, setGenreQuery] = useState("");
  const [publishDateRange, setPublishDateRange] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
          const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
          return {
            title: book.title,
            author: book.author_name?.join(", ") || "Unknown Author",
            publishDate: book.publish_date?.[0] || "Unknown Publish Date",
            coverUrl: book.cover_i ? coverUrl : null,
          };
        });

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
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          {isLoading ? (
            <p className="text-center">Loading...</p>
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
                  searchResults.map((book, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center">
                        {book.coverUrl && (
                          <img
                            src={book.coverUrl}
                            alt="Book Cover"
                            style={{ width: "100px", marginRight: "10px" }}
                          />
                        )}
                        <div>
                          <strong>Title:</strong> {book.title}
                          <br />
                          <strong>Author:</strong> {book.author}
                          <br />
                          <strong>Publish Date:</strong> {book.publishDate}
                        </div>
                      </div>
                    </li>
                  ))
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
