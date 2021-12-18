import React from "react";
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

  const [loadingFolders, folders] = useFirestore("folders", currentUser.uid, folder_id);
  const [loadingFiles, files] = useFirestore("files", currentUser.uid, folder_id);

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col px-0">
          <p className="m-0 fs-5">{`Hey, ${currentUser.displayName || currentUser.email.split("@")[0].replace(/[0-9]/g, "")}`}</p>
        </div>
        <div className="col d-flex justify-content-end">
          <CreateNewFolder />
          <UploadFile />
        </div>
      </div>
      {loadingFiles && loadingFolders && (
        <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      {!loadingFolders && folders.length > 0 && (
        <div className="row">
          <h2 className="px-0 m-0">Folders</h2>
          <FoldersListing folders={folders} />
        </div>
      )}
      {!loadingFiles && files.length > 0 && (
        <div className="row">
          <h2 className="px-0 m-0 mt-3">Files</h2>
          <FilesListing files={files} />
        </div>
      )}
      {( files.length === 0 && folders.length === 0 && !loadingFiles && !loadingFolders) && <p className="text-center fst-italic">Nothing here</p>}
    </div>
  );
};

export default Dashboard;
