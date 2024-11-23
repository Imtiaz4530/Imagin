import { useContext } from "react";
import { motion } from "motion/react";

import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin } = useContext(AppContext);

  const payment = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-stripe`,
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-300 px-10 py-2 rounded-full mb-6 text-white">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10 text-white">
        Choose the Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, i) => (
          <div
            key={i}
            className="bg-gray-800 drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 "
          >
            <img src={assets.logo_icon} alt="" width={45} />
            <p className="mt-3 mb-1 font-semibold text-gray-200">{item.id}</p>
            <p className="text-sm text-gray-200">{item.desc}</p>
            <p className="mt-6 text-gray-200">
              <span className="text-3xl font-medium">${item.price} </span>/{" "}
              {item.credits} credits
            </p>
            <button
              onClick={() => payment(item.id)}
              className="w-full bg-blue-500 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
