import Worker from "./app.worker.js";
import { v4 as uuidv4 } from "uuid";
import {ATW_MessageTypes} from "./ATW_MessageTypes";
import {WTA_MessageTypes} from "./WTA_MessageTypes";

export default class WorkerAgent {

    constructor(id){
        this.id = id;
        this.worker = new Worker();
        this.currentTask = null;
        this.worker.onmessage = this.listenEvents;
        this.worker.onerror = this.listenErrors;
    }

    listenEvents = e => {
        if(!e)
            return;
        const {onSucc, onErr, taskId} = this.currentTask;
        this.currentTask = null;
        if(!e || !e.data)
            onErr({
                message: 'wrong message received',
                data: e
            });

        switch (e.data.type) {
            case WTA_MessageTypes.CALCULATED:
                if(e.data.taskId !== taskId)
                    onErr(this, {
                        message: 'wrong task id received',
                        data: e
                    })
                onSucc(this, e.data.result);
                break;
            default:
                onErr(this, e.data);
        }

    };

    listenErrors = err => {
        if(!err)
            return;
        const {onSucc, onErr, taskId} = this.currentTask;
        this.currentTask = null;
        onErr({
            message: 'error calculating task',
            data: err
        })
    };

    process = (taskAndCallb) => {
        this.currentTask = {
            ...taskAndCallb,
            taskId: uuidv4()
        };
        this.worker.postMessage({
            task: this.currentTask.task,
            taskId: this.currentTask.taskId,
            workerId: this.id,
            type: ATW_MessageTypes.CALCULATE
        });
    };

    isFree = () => !this.currentTask;
}