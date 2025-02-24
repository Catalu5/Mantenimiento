"use client";
import { useEffect } from "react";

const CloudinaryScript = () => {
  useEffect(() => {
    if (!document.getElementById("cloudinary-script")) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.id = "cloudinary-script";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default CloudinaryScript;
