import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

const FilesListing = ({ files }) => {
  const navigate = useNavigate();
  function handleClick(file) {
    navigate("/file/" + file.id, { state: file });
  }

  return (
    <>
      {files.map((file) => (
        <div key={file.id} className="my-1 col-12 col-md-3 p-1">
          <div className="btn btn-outline-secondary w-100 text-start rounded-3" onClick={() => handleClick(file)}>
            <p className="fs-5 text-truncate w-100 mb-0">{file.name}</p>
            <p className="fs-6 text-truncate w-100">{file.name.substring(file.name.lastIndexOf(".") + 1)}</p>
            <span className="fs-6">{file.createdAt && format(new Date(file.createdAt.toDate()).toISOString())}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default FilesListing;
