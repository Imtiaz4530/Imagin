import { motion } from "motion/react";

import { assets } from "../assets/assets";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-white">
        Create AI Images
      </h1>
      <p className="text-gray-400 mb-8">Bring your imagination into visuals</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src={assets.sample_img_5}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4 text-white">
            Presenting the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-400 mb-4">
            Effortlessly Bring Your Ideas to Life with Our Free AI Image
            Generator. Whether you&apos;re looking for stunning visuals or
            unique imagery, our tool transforms your text into eye-catching
            images with just a few clicks. Imagine it, describe it, and watch it
            come to life instantly.
          </p>

          <p className="text-gray-400 ">
            Simply type a text prompt, and our advanced AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don’t exist yet can be
            visualized effortlessly. Powered by cutting-edge AI technology, the
            creative possibilities are endless!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
