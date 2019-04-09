import React, { Component } from 'react'
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip} from 'recharts'
import "../bootstrap/StatisticsPage.css";

class StatisticsPage extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const data = [
            { x: '1', y: 1.978 },
            { x: '2', y: 1.3 },
            { x: '3', y: 2.964 },
            { x: '4', y: 2.955 },
            { x: '5', y: 2.937 },
            { x: '6', y: 2.919 },
            { x: '7', y: 2.902 },
            { x: '8', y: 2.978 },
            { x: '9', y: 3.0 },
            { x: '10', y: 3.2 },
            { x: '11', y: 3.4 },
            { x: '12', y: 3.9 },
            { x: '14', y: 2 },
            { x: '15', y: 1 },
            { x: '16', y: 4 },
            { x: '17', y: 4.5 },
            { x: '18', y: 4.2 },
            { x: '19', y: 3.9 },
            { x: '20', y: 5 }
        ];
        return (
        <div className="stats-graph-container">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{top: 5, right: 20, left: 0, bottom: 0}}>
                    <XAxis 
                        dataKey="x"
                        fontFamily="sans-serif"
                        dy='25'
                    />
                    <YAxis domain={['dataMin', 'dataMax']} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0]}/>
                    <CartesianGrid vertical={true} stroke="#ebf3f0" strokeDasharray="5 5"/>
                    <Tooltip />
                    <Line dataKey="y" dot={true}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        )
    }
}

export default StatisticsPage;