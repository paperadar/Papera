import React from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BottomBtn = ({ text, colorClass, icon, onBtnClick}) => (
    <button
        type='button'
        className={`btn btn-block no-border ${colorClass}`}
        onClick={onBtnClick}
    >      
        <FontAwesomeIcon
            className='mr-2'
            size="lg"
            icon={icon}
        />
        {text}
    </button>
)

export default BottomBtn