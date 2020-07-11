import WorkerAgent from "./WorkerAgent";

class WorkerLoadBalancer {

    constructor(amount) {
        this.taskQueue = [];
        this.workers = new Array(amount || navigator.hardwareConcurrency)
            .fill().map((w, i) => new WorkerAgent(i));
    }

    size = () => this.workers.length;

    loaded = () => this.workers.filter(w => !w.isFree()).length;

    getFree = () => this.workers.find(w => w.isFree());

    tryExecute = (worker = this.getFree()) => {
        if (worker && worker.isFree() && this.taskQueue.length) {
            worker.process(this.taskQueue.shift());
        }
    }

    addTask = task => {
        const promise = new Promise((resolve, reject) => {
                this.taskQueue.push({
                    task,
                    onSucc: (w, res) => {resolve(res); this.tryExecute(w)},
                    onErr: (w, res) => {reject(res); this.tryExecute(w)}
                });
            }
        );
        this.tryExecute();
        return promise;
    }
}


export default new WorkerLoadBalancer();