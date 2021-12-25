import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

const Breadcrumb = () => {
  const { folder_id } = useParams();
  const [path, setPath] = useState([]);
  const [currentFolder, setcurrentFolder] = useState("")

  useEffect(() => {
    async function getPath() {
      const docRef = doc(db, "folders", folder_id);
      const docSnap = await getDoc(docRef);
      setPath(docSnap.data().path);
      setcurrentFolder(docSnap.data().name)
    }
    if (folder_id) {
      getPath();
    }else{
        setPath([]);
        setcurrentFolder("Drive")
    }
    return () => {};
  }, [folder_id]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {path?.map((item) => (
            <li key={item.id} className="breadcrumb-item">
              <Link to={ item.id ? `/folder/${item.id}` : "/"}>{item.name}</Link>
            </li>
          ))}
          <li className="breadcrumb-item active" aria-current="page">
            {currentFolder}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
