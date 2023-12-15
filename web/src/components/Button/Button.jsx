import React from 'react'
import { ReactComponent as RightarrowIcon } from '../../assets/images/rightarrow.svg'
import { ReactComponent as Plus } from '../../assets/dashboardimg/plus.svg'
import { ReactComponent as ButtonLogo } from '../../assets/images/ButtonLogo.svg'
import { ReactComponent as EditSVGIcon } from '../../assets/images/EditSVGIcon.svg'
const Button = ({
    commonClass = 'common-btn',
    text = 'Read More',
    isLink = false,
    type = '',
    onClick,
    addedClass = '',
    logoClass = '',
    disabled = false
}) => {
    return (
        <button
            disabled={disabled}
            className={`${commonClass} ${addedClass}`}
            type={type}
            onClick={onClick}
        >
            {logoClass && (
                <span className={`${logoClass}`}>
                    {logoClass == 'plus' ? (
                        <Plus />
                    ) : (
                        (logoClass = 'abendent' ? (
                            <EditSVGIcon />
                        ) : logoClass == 'action-btn' ? (
                            <ButtonLogo />
                        ) : (
                            <RightarrowIcon />
                        ))
                    )}
                </span>
            )}{' '}
            {text}{' '}
            {isLink ? (
                <span>
                    <RightarrowIcon />
                </span>
            ) : (
                ''
            )}
        </button>
    )
}
export default React.memo(Button)
