"use client";

import { useEffect, useState } from "react";

const useIsSmallDevice = (breakpoint: number = 1024) => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth <= breakpoint);
    };

    // Initial check after mount
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return hasMounted ? isSmallDevice : false;
};

export default useIsSmallDevice;
