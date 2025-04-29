import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "wookiee-style-sass/dist/index.css";
import "./App.css";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { AuthProvider } from "./shared/contexts/AuthContext.tsx";
import LoadingSpinner from "./shared/layout/ReactSpinner/index.tsx";
import "./styles/index.scss";
// import { SocketProvider } from './shared/contexts/SocketProvider.tsx'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <AuthProvider>
          {/* <SocketProvider> */}
          <App />
          {/* </SocketProvider> */}
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  </Provider>
);
