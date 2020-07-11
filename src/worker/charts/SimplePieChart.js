import React from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";

const SimplePieChart = ({title, data}) => (<div style={{width: '100%', height: '100%'}}>
        <h4 style={{margin: 0}}>{title}</h4>
        <ResponsiveContainer height={'80%'}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey={'value'}
                    isAnimationActive={false}
                    startAngle={90}
                    endAngle={-270}
                    label
                >
                    {data.map(p => <Cell fill={p.fill}/>)}
                </Pie>
                <Legend verticalAlign="top" height={36}/>
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default React.memo(SimplePieChart);