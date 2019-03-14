import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactChartkick, { BarChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

const Run = (props) => {
    const [presenceData, setPresenceData] = useState({})

    const fetchData = async () => {
        try {
            const {auditId} = props.match.params
            const {runId} = props.match.params

            const presenceData = await axios.get(`https://api.observepoint.com/v2/web-audits/${auditId}/runs/${runId}/results/tag/presence`)

            setPresenceData(presenceData.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log('presenceData', presenceData)

    if (presenceData.producedSelection === undefined) return '...loading'
    if (presenceData.runTags.length === 0) return 'There is no Tag Presence data for this run'
    
    const {completed, id} = presenceData.producedSelection.runs[0]
    const {tags} = presenceData.runTags[0]

    const createChartObj = (tags) => {
        let chartObj = {}
        tags.forEach(i => {
            chartObj[i.name] = i.percentTagged
        })
        return chartObj
    }

    return (
        <div className='Run'>
            <h2>Run {id} completed on {completed}</h2>
            <h3>Tag Presence</h3>
            <BarChart 
                data={createChartObj(tags)}
                height='1000px'   
                xtitle='Percent Tagged' 
            />
        </div>
    )
}

export default Run