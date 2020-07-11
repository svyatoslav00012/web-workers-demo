import React, {useEffect, useState} from "react";
import MonitoringChart from "./MonitoringChart";
import NumberIndicator from "./NumberIndicator";
import WorkerLoadBalancer from "../WorkerLoadBalancer";
import SimplePieChart from "./SimplePieChart";
import CustomLabelPieChart from "./CustomLabelPieChart";
import ListItems from "./ListItems";
import {Responsive, WidthProvider} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(Responsive);

const ChartRoot = ({tasks, tasksDone, onLayoutChange}) => {

    const layouts = {
        lg: [
            {i: 'queue-size-history', x: 0, y: 0, w: 20, h: 12},
            {i: 'queue-size', x: 0, y: 12, w: 5, h: 2},
            {i: 'tasks-done', x: 5, y: 12, w: 5, h: 2},
            {i: 'loaded-workers-simple', x: 0, y: 14, w: 10, h: 7},
            {i: 'loaded-workers-custom', x: 10, y: 12, w: 10, h: 9},
            {i: 'list-items', x: 20, y: 0, w: 4, h: 21}
        ],
        md: [
            {"w": 12, "h": 12, "x": 0, "y": 0, "i": "queue-size-history"},
            {"w": 6, "h": 2, "x": 0, "y": 12, "i": "queue-size"},
            {"w": 6, "h": 2, "x": 6, "y": 12, "i": "tasks-done"},
            {"w": 6, "h": 7, "x": 0, "y": 14, "i": "loaded-workers-simple"},
            {"w": 6, "h": 7, "x": 6, "y": 14, "i": "loaded-workers-custom"},
            {"w": 4, "h": 21, "x": 12, "y": 0, "i": "list-items"}
        ],
        sm: [
            {"w": 8, "h": 12, "x": 0, "y": 0, "i": "queue-size-history"},
            {"w": 4, "h": 2, "x": 0, "y": 12, "i": "queue-size"},
            {"w": 4, "h": 2, "x": 4, "y": 12, "i": "tasks-done"},
            {"w": 4, "h": 7, "x": 0, "y": 14, "i": "loaded-workers-simple"},
            {"w": 4, "h": 7, "x": 4, "y": 14, "i": "loaded-workers-custom"},
            {"w": 4, "h": 21, "x": 8, "y": 0, "i": "list-items"}
        ],
        xs: [
            {"w": 4, "h": 8, "x": 0, "y": 0, "i": "queue-size-history"},
            {"w": 1, "h": 2, "x": 0, "y": 8, "i": "queue-size"},
            {"w": 1, "h": 2, "x": 1, "y": 8, "i": "tasks-done"},
            {"w": 2, "h": 5, "x": 0, "y": 10, "i": "loaded-workers-simple"},
            {"w": 2, "h": 7, "x": 2, "y": 8, "i": "loaded-workers-custom"},
            {"w": 2, "h": 15, "x": 4, "y": 0, "i": "list-items"}
        ],
        xxs: [
            {"w": 8, "h": 12, "x": 0, "y": 0, "i": "queue-size-history"},
            {"w": 4, "h": 2, "x": 0, "y": 12, "i": "queue-size"},
            {"w": 4, "h": 2, "x": 4, "y": 12, "i": "tasks-done"},
            {"w": 4, "h": 7, "x": 4, "y": 14, "i": "loaded-workers-simple"},
            {"w": 4, "h": 7, "x": 0, "y": 14, "i": "loaded-workers-custom"},
            {"w": 4, "h": 21, "x": 8, "y": 0, "i": "list-items"}
        ]
    }

    const handleLayoutChange = newLayout => {
        console.log(newLayout);
    }

    const pieChartData = [
        {name: 'Loaded', value: WorkerLoadBalancer.loaded(), fill: 'red'},
        {name: 'Free', value: WorkerLoadBalancer.size() - WorkerLoadBalancer.loaded(), fill: 'green'}
    ]

    //
    //

    return (
        <div style={{position: 'relative', width: '100vw', height: '90vh'}}>
            <ReactGridLayout
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 24, md: 16, sm: 12, xs: 6, xxs: 4}}
                layouts={layouts}
                items={6}
                rowHeight={30}
                // compactType='No compact'
                onBreakpointChange={b => console.log('br', b)}
                onLayoutChange={handleLayoutChange}
                className="layout"
            >
                <div key='queue-size-history' style={{backgroundColor: 'lightgrey'}}>
                    <MonitoringChart title='queue size history' n={100} refreshEach={250}
                                     currentValue={WorkerLoadBalancer.taskQueue.length}/>
                </div>
                <div key='queue-size' style={{backgroundColor: 'lightgrey'}}>
                    <NumberIndicator title='Queue size' value={WorkerLoadBalancer.taskQueue.length}/>
                </div>
                <div key='tasks-done' style={{backgroundColor: 'lightgrey'}}>
                    <NumberIndicator title='Tasks done' value={tasksDone}/>
                </div>
                <div key='loaded-workers-simple' style={{backgroundColor: 'lightgrey'}}>
                    <SimplePieChart title='loaded workers' data={pieChartData}/>
                </div>
                <div key='loaded-workers-custom' style={{backgroundColor: 'lightgrey'}}>
                    <CustomLabelPieChart title='loaded workers (custom label)' data={pieChartData}/>
                </div>
                <div key='list-items' style={{backgroundColor: 'lightgrey'}}>
                    <ListItems title='Fibonacci Tasks' items={tasks}/>
                </div>
            </ReactGridLayout>
        </div>
    )
        ;

}

export default React.memo(ChartRoot);