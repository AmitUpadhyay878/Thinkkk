import React from 'react'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { home } from '../../config/routingConsts'
import notFoundImage from '../../assets/images/404_webp.webp'
import Helmet from 'react-helmet'
const NotFound = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(home)
    }
    return (
        <div className="send-btn">
            <Helmet>
                <title>404 || Page Not Found</title>
                <meta name="404" content="pricing page" />
            </Helmet>

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
        </div>
    )
}
export default NotFound
