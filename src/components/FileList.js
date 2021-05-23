import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [ editStatus, setEditStatus ] = useState(false)//目前编辑pdf
    const [ value, setValue ] = useState('')
    return(
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                        className="list-group-item bg-light row d-flex align-iteams-center file"
                        key={file.id}
                    >
                        { (file.id != editStatus) &&
                        <>
                            <span className="col-2">
                                <FontAwesomeIcon
                                    size="lg"
                                    icon={faFilePdf}
                                />
                            </span>
                            <span 
                                className="col-8 c-link"//手指
                                onClick={() => {onFileClick(file.id)}}
                            >    
                                {file.title}</span>
                            <button
                                type="button"
                                className="icon-button col-1"
                                onClick={()=>{setEditStatus(file.id);setValue(file.title)}}//1、传id 2、放title
                            >
                                <FontAwesomeIcon
                                    title="编辑"
                                    size="lg"
                                    icon={faEdit}
                                />
                            </button>
                            <button
                                type="button"
                                className="icon-button col-1"
                                onClick={()=>{ onFileDelete(file.id)}}
                            >
                                <FontAwesomeIcon
                                    title="删除"
                                    size="lg"
                                    icon={faTrash}
                                />
                            </button>
                        </>
                        }
                    </li>
                ))
            }   
        </ul>
    )
}
export default FileList