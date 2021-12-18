import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthProvider } from "../context/AuthProvider";
import { useParams } from "react-router-dom";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
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
          console.log("Upload is " + progress + "% done");
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
                    type: "file",
                    createdAt : serverTimestamp(),
                });

          });
        }
      );
    }
  }, [file]);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  console.log(progress);
  return (
    <>
      <label className="btn btn-primary mx-2" htmlFor="file-upload">
        Upload File
      </label>
      <input className="visually-hidden" type="file" id="file-upload" onChange={(e) => handleChange(e)} />
    </>
  );
};

export default UploadFile;
