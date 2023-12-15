import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import visualImg from '../../../../../assets/dashboardimg/visulation.png'
import { exceptionHandler } from '../../../../../util/common'
import request from '../../../../../util/request'

const Visualization = ({ isActiveTab }) => {
    const { thoughtId } = useParams()
    const [GetVisualization, setVisualization] = useState({})

    const fetchVisualData = () => {
        request(
            'POST',
            `/visulization/view`,
            { thoughtId: thoughtId },
            {},
            true
        )
            .then(({ data }) => {
                setVisualization(data.data)
            })
            .catch((error) => {
                const res = exceptionHandler(error).message()
            })
    }

    useEffect(() => {
        if (isActiveTab) {
            try {
                fetchVisualData()
            } catch (err) {
                console.log(err)
            }
        }
    }, [isActiveTab])

    return (
        <>
            <div className="visual-image">
                {/* <img
                    data-src={visualImg}
                    className="lazyload img-fluid"
                    alt=""
                /> */}
                <h2>Coming soon</h2>
            </div>
            {/* <div className="progress-label">
                <h5>
                    Work Progress:<span>{GetVisualization.workProgress}%</span>
                </h5>
            </div> */}
        </>
    )
}

export default React.memo(Visualization)
