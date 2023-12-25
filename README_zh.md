# 必应聊天页面优化

[README](README.md) | [中文文档](README_zh.md)

- ~~中文输入法写英文的时候, 按回车不发送对话~~(官方已经支持)
- 对话被强制结束的时候，自动复制最后一个问题，并粘贴到下一次对话
- 新的对话开头自动加上一些提示，比如默认提示：`请你后面的回答都用英文资料去思考,并翻译成中文回答,第一个问题是:`
- 及时问答，比如您可以直接在 url 中加入 `?prompt=你好`，就可以直接跳转到聊天页面，并且自动输入 `你好` 并发送，比如访问 [https://www.bing.com/chat?prompt=Who is Harry Potter](https://www.bing.com/chat?prompt=Who%20is%20Harry%20Potter)

## 开发

### 推荐开发环境

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

```bash
# install self signed cert for dev
brew install mkcert
mkcert -install
mkcert localhost.bing.com

echo '127.0.0.1 localhost.bing.com' >> /etc/hosts

npm install
npm run dev
npm run build
```

## 致谢

https://github.com/lisonge/vite-plugin-monkey/
