import { MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { useDocumentTitle, useFeaturedProducts, useScrollTop } from "@/hooks";
import bannerImg from "@/images/banner-how.png";
import React from "react";

const FeaturedProducts = () => {
  useDocumentTitle("How to | Library");
  useScrollTop();

  // Add your how to use instructions here

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>How to Use the Library Management Page</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <main className="content">
          <section className="product-list-wrapper">
            <h2>Aesthetically Pleasing and Optimized Loading Animation</h2>
            {/* <h3>
              Welcome to the Library Management Page! This guide will walk you
              through the various modules and features available on this
              platform.
            </h3> */}
            <h4>
              Welcome to the Library Management Page! This guide will walk you
              through the various modules and features available on this
              platform.
            </h4>
            <h3>Dark and Light Modes</h3>
            <p>
              The Library Management Page offers both Dark and Light modes to
              suit your preference. You can easily switch between the two modes
              by clicking on the respective toggle switch or button. Choose the
              mode that provides the best reading experience for you.
            </p>
            <h3>New User Signup and Login</h3>
            <p>
              To get started, if you are a new user, you need to sign up for an
              account. Click on the "Sign Up" button and provide the required
              information, such as your name, email, and password. Optionally,
              you may also have the option to sign up using your social media
              accounts for added convenience. Proper authentication and session
              management are in place to ensure the security of your account. If
              you are an existing user, click on the "Login" button and enter
              your credentials to access your account.
            </p>
            <h3>Book List</h3>
            <p>
              Once logged in, you will be able to see a list of books available
              in the library. The data for these books is sourced from the Open
              Library API, ensuring accurate and up-to-date information. To
              optimize performance and prevent information overload, the book
              list is displayed using optimized pagination. This means that only
              a certain number of books will be loaded initially, and additional
              books will be loaded as you scroll down the page (infinite
              scrolling with lazy loading).
            </p>
            <h3>Search Bar And Filters</h3>
            <p>
              The Library Management Page features a powerful search bar that
              allows you to search for books based on various criteria,
              including book name, author name, genre, and year of publishing.
              As you type your query, the search bar will provide suggestions,
              helping you find the desired books more easily. The Library
              Management Page provides real-time book count information to keep
              you informed. To add books to your cart, simply click on the "Add
              to Cart" button next to the desired books. The selected books will
              be added to your cart, and you can proceed to the checkout
              process.
            </p>
            <h3>Admin Dashboard (Book Management)</h3>
            <p>
              The Library Management Page also provides an admin dashboard
              specifically designed for administrators. If you have admin
              privileges, you can access this dashboard. In the admin dashboard,
              you will have the ability to manually add books to the library.
              Simply enter the necessary details, such as book name, author,
              genre, and other relevant information. Submit the form, and the
              newly added book will be available for users to browse and rent.
            </p>
          </section>
        </main>
      </div>
    </main>
  );
};

export default FeaturedProducts;
