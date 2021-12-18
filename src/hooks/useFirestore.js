import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../config/firebase-config";

function formatData(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

const useFirestore = (collectionName, uid, folderId = null) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function handleResponse(querySnapshot) {
    const docData = [];
    querySnapshot.forEach((doc) => {
      docData.push(formatData(doc));
    });
    setData(docData);
    setLoading(false);
  }

  function handleError(error) {
    console.log(error);
  }

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, collectionName), where("uid", "==", uid), where("parentFolder", "==", folderId), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (querySnapshot) => handleResponse(querySnapshot),
      (error) => handleError(error)
    );
    return () => unsub;
  }, [collectionName, folderId, uid]);

  return [loading, data];
};

export default useFirestore;
