import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

// Utils
import { createLineChartObject } from '../utils/createLineChartObject'

ReactChartkick.addAdapter(Chart)

const AuditIdRuns = (props) => {
    const [auditData, setAuditData] = useState({})
    const [runsData, setRunsData] = useState([])

    const fetchData = async () => {
        try {
            const {auditId} = props.match.params
            const auditData = await Axios.get(`https://api.observepoint.com/v2/web-audits/${auditId}`)
            const runsData = await Axios.get(`https://api.observepoint.com/v2/web-audits/${auditId}/runs`)

            setAuditData(auditData.data)
            setRunsData(runsData.data)

            console.log(auditData.data)
            console.log(runsData.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (auditData === undefined) return 'loading...'

    return (
        <div className='AuditIdRuns'>
            <h2>Runs for {auditData.name}</h2>
            <LineChart 
                data={createLineChartObject(runsData)}
                ytitle='Audit Scores'
            />
            <p>Click below to get data on a particular Run</p>
            <ul>
                {runsData.map(run => {
                    return (
                        <li key={run.id}>
                            <Link to={`/${auditData.id}/${run.id}`}>
                                {run.completed} - {run.score}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default AuditIdRuns