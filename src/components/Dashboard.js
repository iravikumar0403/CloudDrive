import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthProvider } from "../context/AuthProvider";
import useFirestore from "../hooks/useFirestore";
import CreateNewFolder from "./CreateNewFolder";
import FilesListing from "./FilesListing";
import FoldersListing from "./FoldersListing";
import UploadFile from "./UploadFile";

const Dashboard = () => {
  const { currentUser } = useAuthProvider();
  const { folder_id } = useParams();

  const [category, setCategory] = useState("All");

  const [loadingFolders, folders] = useFirestore("folders", currentUser.uid, folder_id);
  const [loadingFiles, files] = useFirestore("files", currentUser.uid, folder_id);

  return (
    <div className="container">
      <div className="row my-3 flex-row-reverse">
        <div className="col-md-6 px-0 d-flex justify-content-md-end mb-2 justify-content-center">
          <CreateNewFolder />
          <UploadFile />
        </div>
        <div className="col-md-6 px-0 mb-2 text-center text-md-start">
          <button className={`btn  ${category === "All" ? "btn-info" : "btn-light"} rounded-pill me-2`} onClick={() => setCategory("All")}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button className={`btn ${category === "Folders" ? "btn-info" : "btn-light"} rounded-pill me-2`} onClick={() => setCategory("Folders")}>
            &nbsp;&nbsp;Folders&nbsp;&nbsp;
          </button>
          <button className={`btn ${category === "Files" ? "btn-info" : "btn-light"} rounded-pill me-2`} onClick={() => setCategory("Files")}>
            &nbsp;&nbsp;&nbsp;&nbsp;Files&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col p-0 mb-3"></div>
      </div>
      {loadingFiles && loadingFolders && (
        <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      {category === "All" || category === "Folders" ? (
        <>
          {!loadingFolders && folders.length > 0 && (
            <div className="row">
              <h2 className="px-0 m-0">Folders</h2>
              <FoldersListing folders={folders} />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {category === "All" || category === "Files" ? (
        <>
          {" "}
          {!loadingFiles && files.length > 0 && (
            <div className="row">
              <h2 className="px-0 m-0 mt-3">Files</h2>
              <FilesListing files={files} />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {files.length === 0 && folders.length === 0 && !loadingFiles && !loadingFolders && <p className="text-center fst-italic">Nothing here</p>}
    </div>
  );
};

export default Dashboard;
