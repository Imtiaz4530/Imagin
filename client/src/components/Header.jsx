import { motion } from "motion/react";

import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const sampleImages = [
  assets.sample_img_1,
  assets.sample_img_4,
  assets.sample_img_3,
  assets.sample_img_2,
  assets.sample_img_7,
  assets.sample_img_6,
];

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);

  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-stone-500 inline-flex text-center gap-2 bg-black rounded-full px-6 py-1 border border-neutral-500"
      >
        <p>The Ultimate Text-to-Image Generator.</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto text-white mt-10 text-center"
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-center max-w-xl max-auto mt-5 text-gray-400"
      >
        Unleash Your Creativity with AI. Transform Your Imagination into Visual
        Art in Seconds – Simply Type, and Watch the Magic Unfold.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
        className="sm:text-lg text-white bg-blue-500 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full "
        onClick={onClickHandler}
      >
        Generate Images
        <img src={assets.star_group} alt="" className="h-6" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-wrap justify-center mt-16 gap-4"
      >
        {sampleImages.map((item, i) => (
          <motion.img
            whileHover={{ scale: 1.05, duration: 0.1 }}
            src={item}
            key={i}
            width={90}
            alt=""
            className="rounded hover:scale-1.5 transition-all duration-300 cursor-pointer max-sm:w-10"
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-3 text-gray-400"
      >
        Generate Stunning Images with Imagin in Seconds.
      </motion.p>
    </motion.div>
  );
};

export default Header;
