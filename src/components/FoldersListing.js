import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from "timeago.js"

const FoldersListing = ({ folders }) => {
    const navigate = useNavigate();
    return (
        <>
            {
                folders.map(folder => (
                    <div 
                        key={folder.id} 
                        className='btn btn-outline-secondary text-start rounded-3 p-2 me-3 my-3' 
                        style={{maxWidth : "15em"}}
                        onClick={()=>navigate("/folder/" + folder.id)}
                    >
                        <p className='fs-5'>{folder.name}</p>
                        <span className='fs-6'>{folder.createdAt && format(new Date(folder.createdAt.toDate()).toISOString())}</span>
                    </div>
                ))
            }
        </>
    )
}

export default FoldersListing
