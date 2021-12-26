import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileViewer from "./FileViewer";

const ViewFile = () => {
  const { state: file } = useLocation();
  const [showToolbar, setShowToolbar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (showToolbar && file.type !== "application/pdf") {
      setTimeout(() => {
        setShowToolbar(false);
      }, 2000);
    }
  }, [showToolbar]);

  useEffect(() => {
    function enableToolbar() {
      setShowToolbar(true);
    }
    window.addEventListener("mousemove", enableToolbar);
    return () => {
      window.removeEventListener("mousemove", enableToolbar);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showToolbar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-dark position-fixed top-0 w-100 text-white px-5 py-3 d-flex justify-content-between  align-items-center"
            style={{ height: "3em", zIndex: "1000" }}>
            <button className="col-1 btn text-white fs-4" onClick={() => navigate(-1)}>
              &larr;
            </button>
            <span className="col fs-4 p-5 text-truncate">{file.name}</span>
            <a href={file.url} target="_blank" download rel="noreferrer">
              <button className="col-md-2 col-6 btn btn-primary w-100">Download</button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-dark w-100 vh-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0 bg-light">
        <FileViewer file={file} />
      </div>
    </>
  );
};

export default ViewFile;
