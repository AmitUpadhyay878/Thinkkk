import React from 'react'
import { useNavigate } from 'react-router-dom'
import { home } from '../../config/routingConsts'
import notFoundImage from '../../assets/images/404_webp.webp'
import Button from '../../components/Button'
const NotFound2 = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(home)
    }
    return (
        <>
            <div className="notfound-page">
                <div className="error-image">
                    <img src={notFoundImage} alt="" className="img-fluid" />
                </div>

                <Button
                    onClick={handleClick}
                    commonClass="common-btn"
                    addedClass="go-home"
                    text="Go To Home Page"
                />
            </div>
        </>
    )
}

export default NotFound2
