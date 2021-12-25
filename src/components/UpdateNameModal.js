import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../config/firebase-config';

const UpdateNameModal = ({ id, name, type, setItem}) => {
    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState(type=== "files" ? name.substring(0, name.lastIndexOf(".")) : name);

    async function updateName(){
      let extension = ""
      if(type==="files"){
        extension = name.substring(name.lastIndexOf("."))
      }
      setLoading(true)
      await updateDoc(doc(db, type, id), {
        name: newName + extension
      });
      setLoading(false)
      setItem(null)
    }

    return (
        <div className="modal fade d-block show">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Rename
              </h5>
              <button type="button" className="btn-close" onClick={()=>setItem(null)}></button>
            </div>
            <div className="modal-body">
                <label className="form-label">Enter name</label>
                <input type="email" className="form-control" value={newName} onChange={(e)=>setNewName(e.target.value)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" disabled={loading || !name} onClick={updateName}>
              Update
            { loading && <span className="ms-3 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> }
          </button>
            </div>
          </div>
        </div>
        </div>
    )
}

export default UpdateNameModal
