import { motion } from "framer-motion";

type HeaderProps = {
  currentPage: string;
};

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const variants = {
    drinks: {
      width: "32%",
      left: "0%",
    },
    ingredients: {
      width: "55%",
      left: "45%",
    },
  };
  return (
    <div className="fixed left-0 right-0 top-0 z-50 mx-auto mt-2 flex h-fit w-64 flex-col gap-4 rounded-3xl bg-slate-50 px-8 py-3 shadow-md md:hidden">
      <div className="relative flex w-full items-center justify-between">
        <motion.h1
          className="text-xl font-bold"
          animate={{
            color: currentPage === "drinks" ? "#000000" : "#9CA3AF",
          }}
          transition={{ duration: 0.2 }}
        >
          Drinks
        </motion.h1>
        <motion.h1
          className="text-xl font-bold"
          animate={{
            color: currentPage === "ingredients" ? "#000000" : "#9CA3AF",
          }}
          transition={{ duration: 0.2 }}
        >
          Ingredients
        </motion.h1>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-3xl bg-black"
          animate={currentPage === "drinks" ? "drinks" : "ingredients"}
          transition={{
            duration: 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          variants={variants}
        />
      </div>
    </div>
  );
};

export default Header;
