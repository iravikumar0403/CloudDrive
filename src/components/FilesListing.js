import React from 'react'
import { format } from 'timeago.js'

const FilesListing = ({ files }) => {

    function handleClick(file){
        window.open(file.url)
    }

    return (
        <>
        {
            files.map(file => (
                <div 
                    key={file.id} 
                    className='btn btn-outline-secondary text-start rounded-3 p-2 me-3 mt-3' 
                    style={{maxWidth : "15em"}}
                    onClick={()=>handleClick(file)}
                >
                    <p className='fs-5 text-truncate w-100'>{file.name}</p>
                    <span className='fs-6'>{file.createdAt && format(new Date(file.createdAt.toDate()).toISOString())}</span>
                </div>
            ))
        }
    </>
    )
}

export default FilesListing
