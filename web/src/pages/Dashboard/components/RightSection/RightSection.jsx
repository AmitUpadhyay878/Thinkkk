import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardAction } from '../../../../Redux/Actions/dashboardAction'

// //React Skeleton
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

import ActionStatus from '../ActionStatus'
import OurStatus from '../OurStatus'

const RightSection = () => {
    const dispatch = useDispatch()
    const { dashboardStatus, loading, error } = useSelector(
        (state) => state.Dash
    )
    const { t } = useTranslation()
    useEffect(() => {
        dispatch(dashboardAction())
    }, [])

    return (
        <>
            <div className="col-lg-5 col-md-12 col-12 me-auto">
                <div className="tpartion">
                    <div className="card status-card">
                        <div className="header-box">
                            <div className="title-text">
                                <h2>{t('ourstatus')}</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <OurStatus
                                dashboardStatus={dashboardStatus}
                                loading={loading}
                                error={error}
                            />
                        </div>
                    </div>
                    {/* action item status */}
                    <div className="card action-item">
                        <div className="header-box">
                            <div className="title-text">
                                <h2>Action Items Status</h2>
                            </div>
                        </div>
                        <ActionStatus
                            dashboardStatus={dashboardStatus}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightSection
