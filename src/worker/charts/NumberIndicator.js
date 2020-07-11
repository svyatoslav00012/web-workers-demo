import React from "react";
import {Bar, BarChart, ResponsiveContainer} from "recharts";
import {Cdiv} from "../../App";

const NumberIndicator = ({title, value, color}) => (<div style={{
    height: '100%',
    width: '100%',
    padding: 5
}}>
    <h5 style={{margin: 0}}>{title}</h5>
    <Cdiv>
        <div style={{
            color: color || 'green',
            fontSize: 40
        }}>{value}</div>
    </Cdiv>
</div>);

export default React.memo(NumberIndicator);