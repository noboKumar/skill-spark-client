import React, { useEffect, useState } from "react";
import NavBar from "../components/shared/NavBar";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/shared/Footer";
import { Toaster } from "react-hot-toast";
import PageLoading from "../components/UI/PageLoading";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const MainLayout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 2000);
    }
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="body-font">
      <NavBar />
      <div className="min-h-[calc(100vh-300px)] w-11/12 mx-auto py-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
