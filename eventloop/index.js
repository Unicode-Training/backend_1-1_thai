console.log('Start');
Promise.resolve().then(() => {
    console.log('Ok');
})
setTimeout(() => {
    console.log('setTimeout');
}, 0);

//Callback
//setTimeout -> Libuv (setTimeout) -> callback -> Macro Queue -> Event loop check callstack trống -> đẩy callback vào callstack để thực thi callback