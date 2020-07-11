import {WTA_MessageTypes} from "./WTA_MessageTypes";

const calculateFib = k => k < 2 ? 1 : calculateFib(k - 1) + calculateFib(k - 2);

self.onmessage = e => {
    if(!e || !e.data)
        return;
    postMessage({
        result: calculateFib(e.data.task),
        taskId: e.data.taskId,
        type: WTA_MessageTypes.CALCULATED
    });
};
