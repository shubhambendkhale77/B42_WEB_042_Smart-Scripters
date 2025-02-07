import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/useAuth.jsx";
<<<<<<< HEAD
import { store } from "./redux/store";
import { Provider } from "react-redux";
=======

>>>>>>> 45733279c524ec94846221ea38918ec3cf64209f
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </Provider>
  </BrowserRouter>
);
