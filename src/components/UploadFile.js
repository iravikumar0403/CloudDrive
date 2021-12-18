import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthProvider } from "../context/AuthProvider";
import { useParams } from "react-router-dom";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { folder_id } = useParams();
  const { currentUser } = useAuthProvider();

  useEffect(() => {
    if (file) {
      const path = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(path, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
        },
        (error) => {
            console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(collection(db, "files"), {
                    name: file.name,
                    uid : currentUser.uid,
                    parentFolder : folder_id || null,
                    type: file.type,
                    url: downloadURL,
                    createdAt : serverTimestamp(),
                });
                setProgress(null)
                setFile(null)
          });
        }
      );
    }
  }, [currentUser.uid, file, folder_id]);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <>
      <label className="btn btn-primary mx-2" htmlFor="file-upload">
        Upload File
      </label>
      <input className="visually-hidden" type="file" id="file-upload" onChange={(e) => handleChange(e)} />
      {
        progress !== null && <div className="position-fixed bg-info rounded-3 end-0 bottom-0 m-3 p-3 w-50">
          <p className="fst-italic text-truncate w-100">Uploading {file?.name}</p>
          <div className="progress">
            <div className="progress-bar bg-success" style={{width:`${progress}%`}}>{parseInt(progress)} %</div>
          </div>
        </div>
      }
    </>
  );
};

export default UploadFile;
