import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Verify = () => {
  const { token, backendUrl, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const transactionId = searchParams.get("transactionId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/verifystripe`,
        { success, transactionId },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        navigate("/");
      } else {
        navigate("/buy");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
