import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const useLogout = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("isAdmin");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return logout;
};

export default useLogout;
