import React, { useEffect, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as D1 } from '../../assets/dashboardimg/d1.svg'
import { ReactComponent as D2 } from '../../assets/dashboardimg/d2.svg'
import { ReactComponent as D3 } from '../../assets/dashboardimg/d3.svg'
import { ReactComponent as D4 } from '../../assets/dashboardimg/d4.svg'
import { ReactComponent as BurgerIcon } from '../../assets/dashboardimg/hamburgermenuicon.svg'
import {
    home,
    settings,
    subscriptionplan,
    thoughts
} from '../../config/routingConsts'

const Sidebar = () => {
    const [toggle, setToggle] = useState(false)
    const toggleref = useRef()

    const handleToggle = () => {
        setToggle((current) => !current)
        toggleref.current.classList.toggle('active')
    }

    const location = useLocation()
    const [currentState, setCurrentState] = useState('')
    const { t } = useTranslation()
    useEffect(() => {
        if (location.state) {
            setCurrentState(location.state)
        } else if (
            location.state == 'thoughts' ||
            location.state == 'createthoughtInner'
        ) {
            setCurrentState('Thoughts')
        } else {
            setCurrentState('Dashboard')
        }
    }, [currentState])

    return (
        <div className="sidebar" ref={toggleref}>
            <button className=" collapse-icon" onClick={handleToggle}>
                <BurgerIcon />
            </button>
            <ul className="sidebar-menu">
                <li>
                    <Nav.Link as={NavLink} to={home} state="Dashboard" end>
                        <span>
                            <D1 />
                        </span>{' '}
                        {t('Dashboard')}
                    </Nav.Link>
                </li>
                <li>
                    <Nav.Link as={NavLink} to={thoughts} state="Challenges" end>
                        <span>
                            <D2 />
                        </span>{' '}
                        {t('Thoughts')}
                    </Nav.Link>
                </li>
                <li>
                    <Nav.Link
                        as={NavLink}
                        to={subscriptionplan}
                        state="Subscription Plan"
                        end
                    >
                        <span>
                            <D3 />
                        </span>{' '}
                        {t('subscriptionPlan')}{' '}
                    </Nav.Link>
                </li>
                <li>
                    <Nav.Link as={NavLink} to={settings} state="Settings" end>
                        <span>
                            <D4 />
                        </span>{' '}
                        {/* Settings */}
                        {t('Settings')}
                    </Nav.Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
