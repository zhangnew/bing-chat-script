export default {
    waitObj(selection, fn) {
        setTimeout(function loading() {
            let obj = document.querySelector(selection);
            if (obj) {
                fn(obj);
            } else {
                console.log('waiting for obj:' + selection);
                setTimeout(loading, 500);
            }
        }, 500);
    }
}