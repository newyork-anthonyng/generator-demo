// https://hackernoon.com/async-await-generators-promises-51f1a6ceede2

function wait(cb) {
    return new Promise(resolve => {
        setTimeout(() => {
            cb(resolve);
        }, 1000);
    });
}

function doTask1() {
    return wait((resolve) => {
        console.log("doTask1");
        resolve({ count: 1});
    });
}

function doTask2(val) {
    return wait((resolve) => {
        console.log("doTask2", val);
        resolve({ count: 2 });

    });
}

function doTask3(val) {
    return wait((resolve) => {
        console.log("doTask3", val);
        resolve({ count: 3 });
    });
}

/*
// This function mimics an async/await function
async function init2() {
    const res1 = await doTask1();
    console.log(res1);

    const res2 = await doTask2(res1);
    console.log(res2);

    const res3 = await doTask3(res2);
    console.log(res3);

    return res3;
}
*/
function* init() {
    const res1 = yield doTask1();
    console.log(res1);

    const res2 = yield doTask2(res1);
    console.log(res2);

    const res3 = yield doTask3(res2);
    console.log(res3);

    return res3;
}

// This function runs the generator function until completion
function runner(genFn) {
    const iterator = genFn();

    function run(arg) {
        const result = iterator.next(arg);

        if (result.done) {
            return result.value;
        } else {
            // Wait for yielded promise to resolve
            // Then run the rest of the code
            return Promise.resolve(result.value).then(run);
        }
    }

    return run();
}
