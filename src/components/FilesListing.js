import React from 'react'
import { format } from 'timeago.js'

const FilesListing = ({ files }) => {
    return (
        <>
        {
            files.map(folder => (
                <div 
                    key={folder.id} 
                    className='btn btn-outline-secondary text-start rounded-3 p-2 me-3 mt-3' 
                    style={{maxWidth : "15em"}}
                >
                    <p className='fs-5'>{folder.name}</p>
                    <span className='fs-6'>{folder.createdAt && format(new Date(folder.createdAt.toDate()).toISOString())}</span>
                </div>
            ))
        }
    </>
    )
}

export default FilesListing
