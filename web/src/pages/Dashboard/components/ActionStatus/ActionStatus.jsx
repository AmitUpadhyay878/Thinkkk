import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { formatDateToMonthShortwithFormate2 } from '../../../../util/common'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function ActionStatus({ dashboardStatus, loading, error }) {
    const [graphData, setGraphData] = useState([])

    useEffect(() => {
        if (loading) {
            return <Spinner color="#198754" style={{ marginLeft: '250px' }} />
        } else {
            setGraphData(dashboardStatus?.data?.actionGraph)
        }
    }, [dashboardStatus])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                onClick: () => {},
                position: 'top'
            },
            title: {
                display: false,
                text: 'Action Items Status'
            }
        }
    }
    const labels = graphData?.map((da) =>
        formatDateToMonthShortwithFormate2(da?.date2)
    )

    // const graphlabel = graphData?.map((d)=>d?.date)

    // const totalActionLabel = graphData?.map((d)=>formatDateToMonthShortwithFormate2(d?.date2))

    const totalAction = {
        // labels,
        label: 'Total Actions',
        data: graphData?.map((da) => da.totalActions),
        backgroundColor: '#BCC1CE'
    }
    const completedAction = {
        // graphlabel,
        label: 'Completed Actions',
        data: graphData?.map((da) => da.completedActions),
        backgroundColor: '#fa5560'
    }

    const data = {
        labels,
        datasets: [
            totalAction,
            completedAction
            // {
            //     label: 'Total Actions',
            //     data: graphData?.map((da) => da.totalActions),
            //     backgroundColor: '#666666'
            // },
            // {
            //     label: 'Completed Actions',
            //     data: graphData?.map((da) => da.completedActions),
            //     backgroundColor: '#fa5560'
            // }
        ]
    }

    return <Bar options={options} data={data} />
}

export default React.memo(ActionStatus)
