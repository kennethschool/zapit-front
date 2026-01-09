import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { motion } from "motion/react";
import { useCookies } from "react-cookie";
import { decrypt, encrypt } from "~/lib/utils";

const CookiesComponent = () => {
  const [isOnManageCookieScreen, setOnManageCookieScreen] = useState(false);
  const [isOffscreen, setIsOffscreen] = useState(false);
  const [cookies, setCookie] = useCookies(["__tracking"]);
  const [cookiesGrabbed, setCookiesGrabbed] = useState(false);
  const [hasSetCookies, setHasSetCookies] = useState(true);
  const [cookieSettings, setCookieSettings] = useState({
    functional: false,
    advertising: true,
    analytics: false,
    cookiesAccepted: false,
  });

  const setSetting = (type: keyof typeof cookieSettings) => {
    setCookieSettings((prev) => {
      const updated = { ...prev, [type]: !prev[type] };
      console.log(updated);
      return updated;
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="hidden">
      <motion.div
        initial={{ y: !isOffscreen ? "100%" : 0, opacity: "0%" }}
        animate={{ y: isOffscreen ? "100%" : 0 }} 
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        className="fixed inset-x-0 overflow-hidden font-sans bottom-0 h-[25%] hover:bg-background transition-all duration-300 backdrop-blur-[5px] z-[100] border-t flex"
      >
        <motion.div
          initial={{ y: 0 }}
          animate={{
            opacity: isOnManageCookieScreen ? "0%" : "100%",
            zIndex: isOnManageCookieScreen ? "0" : "10",
          }}
          className="p-2 m-8 self-center w-full h-2/3 space-y-4"
        >
          <p className="text-card-foreground outfit-font text-3xl">
            This website uses cookies!
          </p>
          <p>
            Zapit is here to make quizzes, games, and learning more exciting and
            engaging for everyone. To do this, we use cookies to collect
            essential user data—nothing personal, just the info we need to see
            how players interact with the platform.
            <br /> This helps us fine-tune features, improve game flow, and make
            sure every session feels smooth, personalized, and fun. By using
            this data responsibly, we can keep Zapit an enjoyable and dynamic
            space for all players, every time they join the game.
          </p>
          <div className="flex justify-between w-fit gap-x-3">
            <Button onClick={() => setIsOffscreen(!isOffscreen)}>
              Accept All Cookies
            </Button>
            <Button
              onClick={() => setOnManageCookieScreen(!isOnManageCookieScreen)}
            >
              Manage Cookies
            </Button>{" "}
            <Button variant={"outline"}>More information</Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 0, opacity: "0%", zIndex: "0" }}
          animate={{
            opacity: !isOnManageCookieScreen ? "0%" : "100%",
            zIndex: !isOnManageCookieScreen ? "0" : "10",
          }}
          className="absolute p-2 m-8 self-center w-full h-2/3 space-y-4"
        >
          <p className="text-card-foreground outfit-font text-3xl">
            Manage Cookies
          </p>
          <div className="flex justify-between w-full gap-x-6">
            <div className="gap-2 w-2/3 grid grid-cols-2">
              <div className="border rounded-lg p-4 inline-flex justify-between items-center space-x-6 w-full">
                <p>Essential Cookies</p>
                <Switch disabled checked={true}></Switch>
              </div>
              <div className="border rounded-lg p-4 inline-flex justify-between items-center space-x-6 w-full">
                <p>Advertising Cookies</p>
                <Switch
                  onClick={() => setSetting("advertising")}
                  checked={cookieSettings.advertising}
                ></Switch>
              </div>{" "}
              <div className="border rounded-lg p-4 inline-flex justify-between items-center space-x-6 w-full">
                <p>Functional Cookies</p>
                <Switch
                  onClick={() => setSetting("functional")}
                  checked={cookieSettings.functional}
                ></Switch>
              </div>{" "}
              <div className="border rounded-lg p-4 inline-flex justify-between items-center space-x-6 w-full">
                <p>Analytical Cookies</p>
                <Switch
                  onClick={() => setSetting("analytics")}
                  checked={cookieSettings.analytics}
                ></Switch>
              </div>
            </div>
            <div className="space-y-2 w-1/3 text-center content-center">
              <Button
                onClick={() => setIsOffscreen(!isOffscreen)}
                className="w-2/3 text-2xl p-2"
              >
                Save
              </Button>
              <Button
                onClick={() => setOnManageCookieScreen(!isOnManageCookieScreen)}
                variant={"ghost"}
                className="w-2/3 text-2xl"
              >
                Back
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CookiesComponent;
