import React from "react";

const FileViewer = ({ file }) => {
  if (file.type === "application/pdf") {
    return (
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0 bg-light">
        <div className="position-fixed top-50 start-50 spinner-border text-primary" role="status"></div>
        <embed style={{ objectFit: "contain", zIndex: "100" }} src={file.url} width="100%" height="100%" />
      </div>
    );
  } else if (file.type.includes("image")) {
    return (
      <>
        <div className="position-fixed top-50 start-50 spinner-border text-primary" role="status"></div>
        <img height="100%" style={{ objectFit: "contain", zIndex: "100" }} src={file.url} alt="" />
      </>
    );
  } else if (file.type.includes("video")) {
    return (
      <>
        <div className="position-fixed top-50 start-50 spinner-border text-primary" role="status"></div>
        <video controls height="100%" style={{ objectFit: "contain", zIndex: "100" }} src={file.url} alt="" />
      </>
    );
  } else if (file.type.includes("audio")) {
    return (
      <>
        <div className="position-fixed top-50 start-50 spinner-border text-primary" role="status"></div>
        <audio controls width="100%" height="100%" style={{ objectFit: "contain", zIndex: "100" }} src={file.url} alt="" />
      </>
    );
  } else {
    return (
      <div>
        <p className="text-white">No Preview Available</p>{" "}
        <a href={file.url} target="_blank" download rel="noreferrer">
          <button className="col-md-2 col-6 btn btn-primary w-100">Download</button>
        </a>
      </div>
    );
  }
};
export default FileViewer;
