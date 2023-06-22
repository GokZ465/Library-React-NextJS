import { useLayoutEffect } from "react";

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Library - eCommerce React App";
    }
  }, [title]);
};

export default useDocumentTitle;
