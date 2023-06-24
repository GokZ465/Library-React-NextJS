# Library-React-NextJS

# Library Management Page

Welcome to the Library Management Page! This guide will walk you through the various modules and features available on this platform.
## PWA Progressive Web App 
Pwa with Mobile Responsiveness for any screen sizes , all pages are curated for mobile responsiveness and PWA
## Tech Stack

- **React/Next.js**: The Library Management Page is built using React, a popular JavaScript library for building user interfaces, and Next.js, a framework for server-rendered React applications. This powerful combination provides a seamless development experience and ensures efficient rendering and routing of pages.

- **Firebase**: The Library Management Page is powered by Firebase, a comprehensive suite of cloud-based tools and services provided by Google. Firebase offers various features that enhance the functionality and security of your application.

  - **Firebase Authentication**: User authentication is seamlessly integrated into the Library Management Page using Firebase Authentication. Users can sign up and log in to the platform using their email and password. Additionally, the platform supports multiple social media login providers, allowing users to sign in with their existing social media accounts for added convenience.

  ![Profile Updates](https://github.com/GokZ465/Library-React-NextJS/blob/main/assets/gif-signup.gif)

  - **Firebase Storage**: Firebase Storage is utilized to store users' images securely. Users can upload their profile pictures or any other images related to their library collection. Firebase Storage ensures reliable and scalable storage for your application's assets.

## Dark and Light Modes

![Dark and Light](https://github.com/GokZ465/Library-React-NextJS/blob/main/assets/gif-dark-light.gif)

The Library Management Page offers both Dark and Light modes to suit your preference. You can easily switch between the two modes by clicking on the respective toggle switch or button. Choose the mode that provides the best reading experience for you.

## New User Signup and Login

![Signup and Login](https://github.com/GokZ465/Library-React-NextJS/blob/main/assets/gif-signup-login.gif)

To get started, if you are a new user, you need to sign up for an account. Click on the "Sign Up" button and provide the required information, such as your name, email, and password. Optionally, you may also have the option to sign up using your social media accounts for added convenience. Proper authentication and session management are in place to ensure the security of your account.

If you are an existing user, click on the "Login" button and enter your credentials to access your account.

## Book List

![Book List](https://github.com/GokZ465/Library-React-NextJS/blob/main/assets/gif-book-list.gif)

Once logged in, you will be able to see a list of books available in the library. The data for these books is sourced from the Open Library API, ensuring accurate and up-to-date information. To optimize performance and prevent information overload, the book list is displayed using optimized pagination. This means that only a certain number of books will be loaded initially, and additional books will be loaded as you scroll down the page (infinite scrolling with lazy loading).

You can easily browse through the book list and view important details such as the book title, author, genre, and publication year. Each book is presented in a visually appealing format with an accompanying book cover image.

## Search Bar And Filters

The Library Management Page features a powerful search bar that allows you to search for books based on various criteria, including book name, author name, genre, and year of publishing. As you type your query, the search bar will provide suggestions, helping you find the desired books more easily. The Library Management Page provides real-time book count information to keep you informed.

![Search Bar and Filters](https://github.com/GokZ465/Library-React-NextJS/blob/main/assets/gif-search-filters.gif)

In addition to the search bar, you can also utilize advanced filtering options to narrow down your search results. Filter books by genre, author, or publication year to find precisely what you're looking for.

To add books to your cart, simply click on the "Add to Cart" button next to the desired books. The selected books will be added to your cart, and you can proceed to the checkout process.

## Admin Dashboard (Book Management)

The Library Management Page also provides an admin dashboard specifically designed for administrators. If you have admin privileges, you can access this dashboard. In the admin dashboard, you will have the ability to manually add books to the library. Simply enter the necessary details, such as book name, author, genre, and other relevant information. Submit the form, and the newly added book will be available for users to browse and rent.

![Admin Dashboard](https://github.com/GokZ465/Library-React-NextJS/blob/main/assets/gif-admin-dashboard.gif)

The admin dashboard empowers administrators to manage the library efficiently and effortlessly. From adding new books to updating existing book information, administrators have complete control over the library's content.

Enjoy managing your library with ease using the Library Management Page!
