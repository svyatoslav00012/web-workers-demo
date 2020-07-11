import React, {useEffect, useState} from 'react';
import ChartRoot from "./worker/charts/ChartRoot";
import WorkerLoadBalancer from "./worker/WorkerLoadBalancer";
import {v4 as uuidv4} from 'uuid';

export const Cdiv = props => (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {props.children}
    </div>
);

let id = 0;
let tasks = [];
let tasksDone = 0;

const App = props => {

    const [trigger, setTrigger] = useState(uuidv4());

    const removeTask = id => tasks = tasks.filter(t => t.id !== id);

    const setResult = (id, res) => {
        const index = tasks.findIndex(t => t.id === id);
        tasks = [...tasks.slice(0, index), {...tasks[index], res}, ...tasks.slice(index + 1, tasks.length)];
        setTrigger(uuidv4());
        tasksDone++;
        setTimeout(() => removeTask(id), 5000);
    }

    const calculateFib = () => {
        const task = {
            id: id++,
            num: Math.floor(Math.random() * 47),
            res: 'pending...'
        };
        tasks.push(task);
        setTrigger(uuidv4());
        WorkerLoadBalancer.addTask(task.num)
            .then(res => setResult(task.id, res))
            .catch(res => setResult(task.id, 'error'));
    };

    const tenFibs = () => {
        new Array(20).fill().map(() => calculateFib());
    }


    const st = {
        button: {
            cursor: 'pointer',
            width: 200,
            height: 40,
            margin: 10,
        }
    };

    const [time, setTime] = useState(0);

    useEffect(() => {
        const i = setInterval(() => {
            setTime(time + 1)
        }, 1000);
        return () => {
            clearInterval(i);
        }
    }, [time]);

    return (
        <div>
            <Cdiv>
                <div style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>{time}</div>
            </Cdiv>
            <Cdiv>
                <button style={st.button} onClick={tenFibs}>Add 20 Fibonacci Tasks</button>
            </Cdiv>
            <ChartRoot trigger={trigger}
                       tasks={tasks}
                       tasksDone={tasksDone}
            />
        </div>
    );
}

export default App;
