import { defineConfig } from 'vite'
// import { viteMockServe } from 'vite-plugin-mock'
import VitePluginMock from './plugins/VitePluginMock'
export default defineConfig({

  plugins: [
    // viteMockServe()
    VitePluginMock()
  ],
})