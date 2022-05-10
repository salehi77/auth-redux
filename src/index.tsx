import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// redux
import { store } from "./Store";
import { Provider } from "react-redux";
import DetectAuth from "./Store/DetectAuth";

// styles
import "react-toastify/dist/ReactToastify.css";
import "./Assets/styles/global.css";

// mui theme
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Utils/theme";
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ErrorBoundary
    fallbackRender={({ resetErrorBoundary }) => (
      <div>
        There was an error!{" "}
        <button onClick={() => resetErrorBoundary()}>Try again</button>
      </div>
    )}
  >
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <DetectAuth>
            <App />
          </DetectAuth>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
