import React from "react";

const FileViewer = ({ file }) => {
  const styles = {
    maxWidth: "90vw",
    maxHeight: "90vh",
    zIndex: "1000"
  }
  if (file.type === "application/pdf") {
    return (
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0 bg-light">
        <div className="position-fixed top-50 start-50 spinner-border text-primary" role="status"></div>
        {/* <object src={file.url} style={styles} width="100%" height="100%">
          l
        </object> */}
        {console.log(file.url)}
        <iframe src={file.url} style={{zIndex: 1000}} height="100%" width="100%" title="pdf"/>
        {/* <object width="900" height="900" data={`https://docs.google.com/gview?embedded=true&url=${file.url}`}></object> */}
      </div>
    );
  } else if (file.type.includes("image")) {
    return (
      <>
        <div className="position-fixed top-50 start-50 spinner-border text-primary" role="status"></div>
        <img src={file.url} style={styles} alt="" />
      </>
    );
  } else if (file.type.includes("video")) {
    return (
      <>
        <div className="position-fixed top-50 start-50 spinner-border text-primary" role="status"></div>
        <video controls src={file.url} style={styles} alt="" />
      </>
    );
  } else if (file.type.includes("audio")) {
    return (
      <>
        <audio controls src={file.url} style={styles} alt="" />
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
