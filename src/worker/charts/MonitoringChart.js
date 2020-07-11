import React, {useEffect, useRef, useState} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const withZero = (time) => (time < 10 ? "0" : "") + time;

export const getCurTimeString = (date = new Date()) => {
    const h = withZero(date.getHours());
    const m = withZero(date.getMinutes());
    const s = withZero(date.getSeconds());
    return `${h}:${m}:${s}`;
};

const lastN = (array, n) => array.slice(Math.max(0, array.length - n), array.length);

const emptyTimeLine = n => new Array(n).fill()
    .map((e, i) => new Date(Date.now() - (n - i) * 1000))
    .map(d => ({time: getCurTimeString(d), value: 0}));


const MonitoringChart = ({title, n, currentValue, refreshEach}) => {

    const [timeLine, setTimeLine] = useState(emptyTimeLine(n));

    const addCurrent = () => setTimeLine([...lastN(timeLine, n), {time: getCurTimeString(), value: currentValue}]);

    useEffect(() => {
        const i = setInterval(addCurrent, refreshEach);
        return () => {
            clearInterval(i);
        }
    }, [timeLine]);

    return (<div style={{padding: 5, width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <h4 style={{margin: 0}}>{title}</h4>
        <ResponsiveContainer height={'90%'}>
                <LineChart
                    data={timeLine}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line isAnimationActive={false} dot={false} type="basis" dataKey="value" stroke="blue"/>
                </LineChart>
        </ResponsiveContainer>
    </div>);

}

export default React.memo(MonitoringChart);