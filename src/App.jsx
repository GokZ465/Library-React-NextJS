/* eslint-disable react/forbid-prop-types */
import { Preloader } from "@/components/common";
import PropType from "prop-types";
import React, { StrictMode, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "@/routers/AppRouter";
import { ThemeProvider } from "next-themes";
import { registerServiceWorker } from "./serviceWorker"; // Import the registerServiceWorker function

const App = ({ store, persistor }) => {
  useEffect(() => {
    registerServiceWorker(); // Call the registerServiceWorker function during component mount
  }, []);

  return (
    <StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={<Preloader />} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
};

App.propTypes = {
  store: PropType.any.isRequired,
  persistor: PropType.any.isRequired,
};

export default App;
