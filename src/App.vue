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

let searchBox = null;
let sendMsgBtn = null;
// for chinese input english word and press enter, don't send msg
function resetEnterEvent() {
  // 保存原始的 addEventListener 函数
  var originalAddEventListener = EventTarget.prototype.addEventListener;

  // 重写 addEventListener 函数
  EventTarget.prototype.addEventListener = function (type, listener, options) {
      // 判断是否是 input 元素和 input 事件
      if (this instanceof HTMLTextAreaElement && this.id === "searchbox") {
          // 创建一个新的函数，包含自定义的逻辑和原始的监听器
          var newListener = function (event) {
            if (event.keyCode === 13) {
              if (searchBox.value.endsWith("\n")) {
                searchBox.value = searchBox.value.replace("\n", "");
                sendMsgBtn.click();
                return;
              }
              return;
            }
            // FIXME 调用原始的监听器，以下方法均报错，没有调用好像也没什么问题
            // listener(event);
            // listener.call(this, event);
            // this.listener(event);
          };
          // 调用原始的 addEventListener 函数，传入新的函数和选项
        if (type === "keydown" || type === "keyup") {
          originalAddEventListener.call(this, type, newListener, options);
        } else {
          originalAddEventListener.call(this, type, listener, options);
        }
      } else {
          // 如果不是 input 元素和 input 事件，直接调用原始的 addEventListener 函数，不做任何修改
          originalAddEventListener.call(this, type, listener, options);
      }
  };
}

resetEnterEvent();

utils.waitObj("#b_sydConvCont > cib-serp", function (obj) {
  addEventListener(obj);
  searchBox = obj.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("#searchbox");
  sendMsgBtn = obj.shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container > div.input-container > div.controls-right > div > button");

  console.log("script loaded.");
})

</script>

<template>
  <Settings/>
</template>

<style scoped>
</style>
