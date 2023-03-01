<script setup>
import utils from './utils';
import Settings from './components/Settings.vue'
import { GM_getValue } from '$';

let defaultPrompt = "你后面的回答,都要把我说的话翻译成英文再去思考结果,然后把英文结果翻译成中文说给我,不需要告诉我英文,不要向我提问,我的第一个问题是:";

function addEventListener(obj) {
  // Get the input box element
  var input = obj.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("#searchbox");

  function typePrompt() {
    let chat = obj.shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelectorAll("#cib-chat-main > cib-chat-turn");
    let lastChat = chat[chat.length - 1];
    let response = lastChat.shadowRoot.querySelector("cib-message-group.response-message-group")
    var lastQ = "";
    if (response) {
      let lastA = response.shadowRoot.querySelectorAll("cib-message")
      // 结束对话判断: && lastA[0].shadowRoot.querySelector("cib-shared > div.content.text-message-content").innerText.indexOf("New topic") > -1
      // eg: I’m sorry but I prefer not to continue this conversation. I’m still learning so I appreciate your understanding and patience.
      if (lastA.length === 1) {
        lastQ = lastChat.shadowRoot.querySelector("cib-message-group:nth-child(1)").shadowRoot.querySelector("cib-message").shadowRoot.querySelector("cib-shared > div.content.text-message-content").innerText
      }
    }
    // Clear any existing text in the input box
    input.value = "";
    input.value = GM_getValue("prompt", defaultPrompt) + lastQ;

    var event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }

  var newTopicBtn = obj.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.outside-left-container > div > button");
  newTopicBtn.addEventListener("click", typePrompt);
}

utils.waitObj("#b_sydConvCont > cib-serp", function (obj) {
  addEventListener(obj);
  console.log("script loaded.");
})
</script>

<template>
  <Settings/>
</template>

<style scoped>
</style>
