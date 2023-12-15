import React from 'react'

const AmitButton = (
    {
    commonClass="",
    addedClass="",
    text = "",
    type = "",
    onClick,
    isDisabled
    }
) => {
    return (
        <button className={`${commonClass} ${ addedClass}`} type={type} onClick={onClick} disabled={isDisabled}>{text}</button>
    )
}

export default AmitButton