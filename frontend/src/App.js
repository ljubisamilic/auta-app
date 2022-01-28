import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBrand from "./pages/AddBrand";
import AddCar from "./pages/AddCar";
import Error from "./pages/Error";
import UpdateCar from "./pages/UpdateCar";
import { useEffect } from "react";
import axios from "axios";
import { useGlobalcontext } from "./context";

function App() {
  const { setUser, setUserData } = useGlobalcontext();
  const refreshToken = async () => {
    if (!localStorage.getItem("token")) return;
    console.log(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/check",
        {},
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setUser(true);
      setUserData(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
      setUser(false);
    }
  };
  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="addcar"
          element={
            <RequireAuth>
              <AddCar />
            </RequireAuth>
          }
        />
        <Route
          path="addbrand"
          element={
            <RequireAuth>
              <AddBrand />
            </RequireAuth>
          }
        />
        <Route
          path="updatecar/:id"
          element={
            <RequireAuth>
              <UpdateCar />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

const RequireAuth = ({ children }) => {
  const { user } = useGlobalcontext();
  const location = useLocation();
  return user === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default App;
