import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [ editStatus, setEditStatus ] = useState(false)//目前编辑pdf
    const [ value, setValue ] = useState('')
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    const closeSearch = () => {
        setEditStatus(false)
        setValue('')
    }
    useEffect(() => {
        if(enterPressed && editStatus) {
            const editItem = files.find(file => file.id == editStatus)
            onSaveEdit(editItem.id, value)
            setEditStatus(false)
            setValue('') 
        }
        if(escPressed && editStatus) {
            closeSearch()
        }
    })
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
                        { (file.id == editStatus) &&
                            <>
                                <input
                                    className="form-control col-10"
                                    value={value}
                                    onChange={(e) => { setValue(e.target.value) }}
                                />
                                <button
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={closeSearch}
                                >
                                    <FontAwesomeIcon
                                        title="关闭"
                                        size="lg"
                                        icon={faTimes}
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