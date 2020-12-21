import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

//comps
import App from "./components/app";

//store
import store from "./store";

//translation
import "./i18n";

//scss
import "./index.scss";

const token = localStorage.getItem("token");
ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => {
          const headers = {
            Authorization: token,
          };
          return fetch(process.env.REACT_APP_CUSTOMER_PRODUCT_API + resource, {
            headers,
          }).then(async (res) => {
            if (!res.ok) {
              let error = new Error(
                "An error occurred while fetching the data."
              );
              // Attach extra info to the error object.
              const err = await res.json();
              if (err.error)
                error = {
                  message: error.message,
                  ...err.error,
                };
              throw error;
            }
            return res.json();
          });
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SWRConfig>
  </Suspense>,
  document.getElementById("root")
);
