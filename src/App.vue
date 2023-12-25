<script setup>
import utils from './utils';
import Settings from './components/Settings.vue'
import { GM_getValue } from '$';

function addEventListener(obj) {
  // Get the textarea element
  var input = obj.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container > div > div.input-row > cib-text-input").shadowRoot.querySelector("#searchbox")


  function setInputValue(value) {
    // Clear any existing text in the textarea
    input.value = "";
    input.value = value;

    var event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }

  function typePrompt() {
    let chat = obj.shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelectorAll("#cib-chat-main > cib-chat-turn");
    let lastChat = chat[chat.length - 1];
    let response = lastChat.shadowRoot.querySelector("cib-message-group.response-message-group")
    var lastQ = "";
    if (response) {
      let responseMessages = response.shadowRoot.querySelectorAll("cib-message")
      let lastA = responseMessages[responseMessages.length - 1]
      let counter = lastA.shadowRoot.querySelector("div > cib-turn-counter").shadowRoot.querySelector("div.text > span:nth-child(1)").innerText
      let total = lastA.shadowRoot.querySelector("div > cib-turn-counter").shadowRoot.querySelector("div.text > span:nth-child(3)").innerText
      // 结束对话判断: && lastA[0].shadowRoot.querySelector("cib-shared > div.content.text-message-content").innerText.indexOf("New topic") > -1
      // eg: I’m sorry but I prefer not to continue this conversation. I’m still learning so I appreciate your understanding and patience.
      if (counter === total) {
        lastQ = lastChat.shadowRoot.querySelector("cib-message-group:nth-child(1)").shadowRoot.querySelector("cib-message").shadowRoot.querySelector("cib-shared > div.content.text-message-content").innerText
        console.log("end of conversation, because reach the limit: " + total + ", last question: " + lastQ)
      }
    }
    setInputValue(GM_getValue("prompt", utils.defaultPrompt) + lastQ);
  }

  var newTopicBtn = obj.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.button-compose-wrapper > button");
  newTopicBtn.addEventListener("click", typePrompt);

  let sendButton = obj.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container > div > div.bottom-controls > div.bottom-right-controls > div.control.submit > button");
  function instantPrompt() {
    let urlSearchParams = new URLSearchParams(window.location.search);
    let paramsObject = Object.fromEntries(urlSearchParams.entries());
    let userPrompt = paramsObject["prompt"];
    if (userPrompt) {
      console.log("set prompt: " + userPrompt);
      setInputValue(userPrompt);
      setTimeout(() => {
        sendButton.click();
      }, 50);
    }
  }
  instantPrompt();
}

utils.waitObj("#b_sydConvCont > cib-serp", function (obj) {
  addEventListener(obj);
  console.log("bing script loaded.");
})
</script>

<template>
  <Settings/>
</template>

<style scoped>
</style>
