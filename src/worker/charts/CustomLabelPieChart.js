import React from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";

const CustomLabelPieChart = ({title, data}) => {

    const total = data.reduce((ac, p) => ac + p.value, 0);

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}% (${percent * total})`}
            </text>
        );
    };

    return (<div style={{padding: 5, width: '100%', height: '100%'}}>
        <h4 style={{margin: 0}}>{title}</h4>
        <ResponsiveContainer height='90%'>
            <PieChart>
                <Pie
                    data={data}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    isAnimationActive={false}
                    dataKey={'value'}
                    startAngle={90}
                    endAngle={-270}
                >
                    {data.map(p => <Cell fill={p.fill}/>)}
                </Pie>
                <Legend verticalAlign="top" height={36}/>
            </PieChart>
        </ResponsiveContainer>
    </div>);
};

export default React.memo(CustomLabelPieChart);