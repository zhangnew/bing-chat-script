<script setup>
import { ref } from 'vue';
import { GM_registerMenuCommand, GM_setValue, GM_getValue } from '$';

let showSetting = ref(false);

GM_registerMenuCommand("Settings", function () {
    showSetting.value = true;
});

let defaultPrompt = "你后面的回答,都要把我说的话翻译成英文再去思考结果,然后把英文结果翻译成中文说给我,不需要告诉我英文,不要向我提问,我的第一个问题是:";
const prompt = ref(GM_getValue("prompt", defaultPrompt));

function saveSettings() {
    console.log("save: " + prompt.value);
    GM_setValue("prompt", prompt.value);
    showSetting.value = false;
}

function resetPrompt() {
    prompt.value = defaultPrompt;
    GM_setValue("prompt", prompt.value);
}

function clearPrompt() {
    prompt.value = "";
}
</script>

<template>
    <div id="bing-chat-script-settings" v-show="showSetting">
        <span style="font-weight: bold; position: relative; left: 30%;">Bing Chat Settings</span>
        <br/><br/>
        <label>Prompt text: </label>
        <textarea style="height: 80px; width: 98%;" v-model="prompt" />
        <br/><br/>
        <button @click="resetPrompt">Reset default prompt</button>
        <button style="margin-right: 10%;" @click="clearPrompt">clear prompt</button>
        <br/><br/>
        <button @click="saveSettings">Save settings (Refresh the page to take effect)</button>
    </div>
</template>
  
<style scoped>
    #bing-chat-script-settings {
        z-index: 999;
        position: fixed;
        top: 20%;
        left: 80%;
        transform: translate(-50%, -50%);
        border: 1px solid #000;
        padding: 10px;
        background-color: #fff;
    }
</style>
  