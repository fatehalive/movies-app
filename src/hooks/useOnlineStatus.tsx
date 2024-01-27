import { useState, useEffect } from "react";

// pendekatan simpel direct akses
export const useOnlineStatus = () => {
  const [isOnline, setOnline] = useState(navigator.onLine);

  const handleOnlineStatusChange = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return isOnline;
};
