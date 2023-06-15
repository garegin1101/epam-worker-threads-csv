import { availableParallelism } from "os";

export default (files, length) => {
    if (files.length == 0) console.log("There is no csv file in this directory")

    let arr = Array.from({ length }, () => [])

    let i = 0;
    for (const file of files) {
        if (i >= length) i = 0
        arr[i].push(file)
        i++
    }

    arr = arr.filter(val => val.length)

    if (arr.length > 4) {
        const virtualCpus = availableParallelism();
        process.env.UV_THREADPOOL_SIZE = virtualCpus > arr.length ? arr.length : virtualCpus;
    }

    return arr;
}

