import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from "timeago.js"

const FoldersListing = ({ folders }) => {
    const navigate = useNavigate();
    return (
        <>
            {
                folders.map(folder => (
                    <div key={folder.id} className='my-1 col-12 col-md-3 p-1'>
                        <div 
                        className='btn btn-outline-secondary w-100 text-start rounded-3'
                        onClick={()=>navigate("/folder/" + folder.id)}
                    >
                        <p className='fs-5 text-truncate'>{folder.name}</p>
                        <span className='fs-6'>{folder.createdAt && format(new Date(folder.createdAt.toDate()).toISOString())}</span>
                    </div>
                    </div>
                ))
            }
        </>
    )
}

export default FoldersListing
