const defaultPrompt = '请你后面的回答都用英文资料去思考,并翻译成中文回答,请务必翻译成中文,第一个问题是: ';

export default {
    defaultPrompt,
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