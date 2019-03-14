import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const WebAudits = () => {
    const [webAudits, setWebAudits] = useState([])

    const fecthWebAudits = async () => {
        const webAudits = await axios.get('https://api.observepoint.com/v2/web-audits')
        setWebAudits(webAudits.data)
    }

    useEffect(() => {
        fecthWebAudits()
    }, [])

    return (
        <div className='WebAudits'>
            <h2>Web Audits</h2>
            <ul>
                {webAudits.map(audit => {
                    return (
                        <li key={audit.id}>
                            <Link to={`/${audit.id}`}>
                                {audit.name}
                            </Link>       
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default WebAudits;