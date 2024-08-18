import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SquareLogo from "../../assets/png/Login Images/KrofileSquareLogo.png";
import RightBg from "../../assets/png/Login Images/LoginRightSideBg.png";
import RobotImage from "../../assets/png/Login Images/LoginRobotImage1.png";
import StarImage from "../../assets/png/Login Images/LoginStar.svg";

export default function LoginRobot() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Business", "Rapidly", "Exponentially"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="content relative">
      <img src={RightBg} alt="right bg" className="w-full" />
      <div className="topLeftStar absolute top-0 left-0 flex justify-center items-center w-[64px] h-[64px] p-1 border-2 border-solid border-[#E2E6E9] rounded-full">
        <img src={StarImage} alt="star image" className="" />
      </div>
      <div className="robot absolute top-0 -left-32 rotate-[-4deg] h-[100%]">
        <img src={RobotImage} alt="RobotImage" className="w-full h-full" />
      </div>
      <div className="footerContent border border-white absolute bottom-6 left-6 h-auto w-[90%] rounded-[24px] px-[16px] py-[8px] backdrop-blur-[21px] flex justify-between login-gradient">
        <div className="flex justify-center items-center gap-2">
          <img src={SquareLogo} alt="RobotImage" className="" />
          <span>Krofile is growing...</span>
        </div>
        <motion.button className="px-[24px] bg-white rounded-[12px] h-[48px] relative flex justify-center items-center w-[100px]">
          <AnimatePresence>
            <motion.span
              key={textIndex}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-3.5 left-4"
            >
              {texts[textIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
