# New Bing Chat Helper

- Automatic copy the last question when the session is ended
- Automatic input prompt for new session
- When using the Chinese input method, disable the Enter key to send the problem

## Developing

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

```bash
# install self signed cert for dev
brew install mkcert
mkcert -install
mkcert localhost.bing.com

echo '127.0.0.1 localhost.bing.com' >> /etc/hosts

pnpm install
pnpm run dev
pnpm run build
```

## Thanks

https://github.com/lisonge/vite-plugin-monkey/
