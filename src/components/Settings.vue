<script setup>
import { ref } from 'vue';
import utils from '../utils';
import { GM_registerMenuCommand, GM_setValue, GM_getValue } from '$';

let showSetting = ref(false);

GM_registerMenuCommand("Settings", function () {
    showSetting.value = true;
});

const prompt = ref(GM_getValue("prompt", utils.defaultPrompt));

function saveSettings() {
    console.log("save: " + prompt.value);
    GM_setValue("prompt", prompt.value);
    showSetting.value = false;
}

function resetPrompt() {
    prompt.value = utils.defaultPrompt;
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
        <button style="float: right;" @click="clearPrompt">clear prompt</button>
        <br/><br/>
        <button @click="saveSettings">Save settings (Refresh the page to take effect)</button>
    </div>
</template>
  
<style scoped>
/* @import url('../sakura.css'); */
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

/* CSS */
button {
  padding: 0.6em 1em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

button:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
</style>
  