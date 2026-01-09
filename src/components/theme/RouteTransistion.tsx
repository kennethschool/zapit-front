import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useTheme } from "./ThemeProvider";
import { useNavigation } from "react-router";

export default function RouteTransition() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const isNavigating = navigation.state === "loading";

  // if (!isNavigating) return null;

  // useEffect(() => {
  //   setShow(true);

  //   const timer = setTimeout(() => {
  //     setShow(false);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [location]);

  // if (!show) return null;

  return (
    <>
      {" "}
      <div className="bg-background overflow-hidden ">
        <AnimatePresence>
          {isNavigating && (
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="animated-pattern bg-background z-50 w-screen h-screen fixed inset-0 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="zapitPattern"
                  x="0"
                  y="0"
                  width="200"
                  height="100"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <g>
                    <path
                      fill="yellow"
                      stroke="yellow"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                    <text
                      x="30"
                      y="20"
                      fontFamily="Arial"
                      fontSize="24"
                      fill={theme === "dark" ? "white" : "black"}
                      className="font-bold uppercase"
                    >
                      zapit
                    </text>
                  </g>

                  <g transform="translate(100,50)">
                    <path
                      fill="yellow"
                      stroke="yellow"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                    <text
                      x="30"
                      y="20"
                      fontFamily="Arial"
                      fontSize="24"
                      fill={theme === "dark" ? "white" : "black"}
                      className="font-bold uppercase"
                    >
                      zapit
                    </text>
                  </g>

                  <animateTransform
                    attributeName="patternTransform"
                    type="translate"
                    from="0,0"
                    to="200,0"
                    dur="0.3s"
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="url(#zapitPattern)" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
