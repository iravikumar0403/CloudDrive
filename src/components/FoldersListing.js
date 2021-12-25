import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import UpdateNameModal from "./UpdateNameModal";

const FoldersListing = ({ folders }) => {
  const navigate = useNavigate();
  const [folderToUpdate, setFolderToUpdate] = useState(null);

  const deleteFolder = async (event, folder) => {
    event.stopPropagation();
    await deleteDoc(doc(db, "folders", folder.id));
  };

  function updateName(event, folder){
      event.stopPropagation();
      setFolderToUpdate(folder);
  }

  return (
    <>
      {folders.map((folder) => (
        <div key={folder.id} className="my-1 col-12 col-md-3 p-1">
          <div className="btn btn-outline-secondary w-100 text-start rounded-3" onClick={() => navigate("/folder/" + folder.id)}>
            <p className="fs-5 text-truncate">{folder.name}</p>
            <div className="d-flex justify-content-between">
            <span className="fs-6">{folder.createdAt ? format(new Date(folder.createdAt.toDate()).toISOString()) : "just now"}</span>
              <div className="dropdown">
                <div className="dropdown">
                  <span
                    className="dropdown-toggle text-dark btn btn-outline-info text-center border-0 px-2 py-0"
                    id="menu-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}>
                    &#10247;
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="menu-dropdown">
                    <li>
                      <button className="m-0 dropdown-item" onClick={(event) => deleteFolder(event, folder)}>
                        Delete
                      </button>
                      <button className="m-0 dropdown-item" onClick={(event)=>updateName(event, folder)}>Rename</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      { folderToUpdate && <UpdateNameModal id={folderToUpdate.id} name={folderToUpdate.name} type="folders" setItem={setFolderToUpdate}/> }
    </>
  );
};

export default FoldersListing;
