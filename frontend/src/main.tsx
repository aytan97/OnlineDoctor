
import App from './App.tsx'
import './App.css'
import "./styles/index.scss"
import 'wookiee-style-sass/dist/index.css'
import React, { Suspense } from 'react'
import ReactDOM from "react-dom/client"
import { AuthProvider } from './shared/contexts/AuthContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import LoadingSpinner from './shared/layout/ReactSpinner/index.tsx'
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
)
