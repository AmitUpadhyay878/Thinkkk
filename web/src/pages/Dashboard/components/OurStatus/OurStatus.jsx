import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
//SVG Section
import { ReactComponent as Totalactionitems } from '../../../../assets/images/OurStatus/totalactionitems.svg'
import { ReactComponent as Panddingactionitems } from '../../../../assets/images/OurStatus/panddingactionitems.svg'
import { ReactComponent as Completedactionitems } from '../../../../assets/images/OurStatus/completedactionitems.svg'
import { ReactComponent as TotalThoughts } from '../../../../assets/images/OurStatus/totalThoughts.svg'
import { ReactComponent as Pandingthoughts } from '../../../../assets/images/OurStatus/pandingthoughts.svg'
import { ReactComponent as Completedthoughts } from '../../../../assets/images/OurStatus/completedthoughts.svg'

const OurStatus = ({ dashboardStatus, loading, error }) => {
    const [statusTitles, setStatusTitles] = useState(null)
    useEffect(() => {
        if (loading) {
            return <Spinner color="#198754" style={{ marginLeft: '250px' }} />
        } else {
            // console.log(dashboardStatus.data,"*-*-*-*-*-*-*-*--*-*-*-*-*");
            setStatusTitles(dashboardStatus.data)
        }
    }, [dashboardStatus])
    if (statusTitles === null) {
        return <h1>Loading...</h1>
    }
    function changeTitle(params) {
        let tmp = [
            {
                key: 'totalAction',
                title: 'Total Action',
                svgimg: <Totalactionitems />
            },
            {
                key: 'completedAction',
                title: 'Completed Action',
                svgimg: <Completedactionitems />
            },
            {
                key: 'pendingAction',
                title: 'Pending Action',
                svgimg: <Panddingactionitems />
            },
            {
                key: 'totalThoughts',
                title: 'Total Challenges',
                svgimg: <TotalThoughts />
            },
            {
                key: 'pendingThoughts',
                title: 'Pending Challenges',
                svgimg: <Pandingthoughts />
            },
            {
                key: 'completedThoughts',
                title: 'Completed Challenges',
                svgimg: <Completedthoughts />
            }
        ]
        return tmp.find((e) => e.key === params)
    }
    return (
        <div className="ourstatus-box">
            <div className="total-actionbox">
                <div className="row">
                    {dashboardStatus?.data &&
                        Object.entries(dashboardStatus?.data)?.map((e, i) => {
                            if (e[0] === 'actionGraph') {
                                return false
                            }
                            return (
                                <div
                                    className="col-lg-6 col-md-12 col-12"
                                    key={i} 
                                >
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="thought-imageno-box">
                                                <div className="thought-image">
                                                    {changeTitle(e[0]).svgimg}
                                                </div>
                                                <div className="thought-no">
                                                    {e[1]}
                                                </div>
                                            </div>
                                            <p>{changeTitle(e[0]).title}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(OurStatus)
