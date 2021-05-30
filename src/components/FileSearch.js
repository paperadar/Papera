import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
    const [ inputActive, setInputActive ] = useState(false)
    const [ value, setValue ] = useState('')
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    let node = useRef(null)
    const closeSearch = () => {
        setInputActive(false)
        setValue('')
    }
    useEffect(() => {
        //enter搜索
        if(enterPressed && inputActive) {
            onFileSearch(value)
        }
        //esc退出
        if(escPressed && inputActive) {
            closeSearch()
        }
    })
    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
            { !inputActive &&
                <>
                    <span>{title}</span>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={() => {setInputActive(true) }}
                    >
                        <FontAwesomeIcon
                            title="搜索"
                            size="lg"
                            icon={faSearch}
                        />
                    </button>
                </>
            }
            { inputActive &&
                <>
                    <input
                        className="form-control"
                        value={value}
                        ref={node}
                        onChange={(e) => { setValue(e.target.value) }}
                    />
                    <button
                        type="button"
                        className="icon-button"
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
        </div>
    )
}
export default FileSearch