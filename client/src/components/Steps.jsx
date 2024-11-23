import { motion } from "motion/react";
import { stepsData } from "../assets/assets";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32 "
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-white">
        How it works
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        Transform Text Into Stunning Visuals
      </p>

      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 px-8 bg-gray-700 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
          >
            <img src={item.icon} alt="" width={40} />
            <div>
              <h2 className="text-xl font-medium text-gray-200">
                {item.title}
              </h2>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
