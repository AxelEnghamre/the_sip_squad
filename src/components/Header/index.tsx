import { AnimatePresence, motion } from "framer-motion";

type HeaderProps = {
  currentPage: string;
};
const Header = ({
  currentPage,
  ingredientsScrollHandler,
  drinksScrollHandler,
  errorMessage,
  clearErrorMessage,
}: {
  currentPage: string;
  ingredientsScrollHandler: Function;
  drinksScrollHandler: Function;
  errorMessage: string | null;
  clearErrorMessage: Function;
}) => {
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
    <>
      <div className="fixed left-0 right-0 top-0 z-50 mx-auto mt-1 flex h-fit w-64 flex-col gap-4 rounded-3xl bg-slate-50 px-8 py-3 shadow-md md:hidden">
        <div className="relative flex w-full items-center justify-between">
          <motion.h1
            className="text-xl font-bold"
            animate={{
              color: currentPage === "drinks" ? "#000000" : "#9CA3AF",
            }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              drinksScrollHandler();
            }}
          >
            Drinks
          </motion.h1>
          <motion.h1
            className="text-xl font-bold"
            animate={{
              color: currentPage === "ingredients" ? "#000000" : "#9CA3AF",
            }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              ingredientsScrollHandler();
            }}
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
            initial={false}
            variants={variants}
          />
        </div>
      </div>
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-0 right-0 top-0 z-50 mx-auto mt-1 flex h-fit w-fit flex-row gap-4 rounded-3xl border-2 border-red-300 bg-red-100 px-8 py-3 shadow-md md:mt-8"
          >
            <div className="relative flex w-full items-center justify-between">
              <h1 className="text-xl font-bold text-red-500">{errorMessage}</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
