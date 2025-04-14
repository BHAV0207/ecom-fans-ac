import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    const role = searchParams.get("role");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (token && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email, role  , id }));
      
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }, 100);
    } else {
      navigate("/"); // fallback
    }
  }, [searchParams, navigate]);

  return <p>Redirecting based on role...</p>;
};

export default OAuthSuccess;
