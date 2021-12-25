import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import UpdateNameModal from "./UpdateNameModal";

const FilesListing = ({ files }) => {
  const navigate = useNavigate();
  const [fileToUpdate, setFileToUpdate] = useState(null);

  function handleClick(file) {
    navigate("/file/" + file.id, { state: file });
  }

  async function deleteFile(event, file) {
    event.stopPropagation();
    await deleteDoc(doc(db, "files", file.id));
  }

  function updateName(event, file){
    event.stopPropagation();
    setFileToUpdate(file);
  }
  return (
    <>
      {files.map((file) => (
        <div key={file.id} className="my-1 col-12 col-md-3 p-1">
          <div className="btn btn-outline-secondary w-100 text-start rounded-3" onClick={() => handleClick(file)}>
            <p className="fs-5 text-truncate w-100 mb-0">{file.name.substring(0, file.name.lastIndexOf("."))}</p>
            <p className="fs-6 text-truncate w-100">{file.name.substring(file.name.lastIndexOf(".") + 1)}</p>
            <div className="d-flex justify-content-between">
              <span className="fs-6">{file.createdAt && format(new Date(file.createdAt.toDate()).toISOString())}</span>
              <div className="dropdown">
                <div className="dropdown">
                  <span
                    className="dropdown-toggle text-dark btn btn-outline-info text-center border-0 top-100 end-0 px-2 py-0"
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
                      <button className="m-0 dropdown-item" onClick={(event) => deleteFile(event, file)}>
                        Delete
                      </button>
                      <button className="m-0 dropdown-item" onClick={(event)=> updateName(event, file)}>Rename</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      { fileToUpdate && <UpdateNameModal id={fileToUpdate.id} name={fileToUpdate.name} type="files" setItem={setFileToUpdate}/> }
    </>
  );
};

export default FilesListing;
