import { Worker } from "worker_threads";
import { once } from "events";
import optimization from "./optimization/index.js";
import findCSV from "./findCSV/index.js";

export default async (dirname) => {
    const start = Date.now();

    try {

        const files = await findCSV(dirname);

        let j = 0;
        for (const fileGroup of optimization(files, 11)) {

            const worker = new Worker("./worker.js", {
                workerData: fileGroup
            });

            // for true index, if I directly put ++j it will work wrong due to scope
            const i = ++j;

            once(worker, "message")
                .then((records) => {
                    console.log(`worker ${i} - ${records} records : duration ${Date.now() - start} milisecond`);
                    worker.terminate()
                })

        }

    } catch (err) {

        console.log(err.message);

    }
}