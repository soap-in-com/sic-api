import http from 'http'
import { initApp } from './app'

const port = process.env.APP_PORT || 3000

const app = initApp()

const serve = async () => {
  try {
    const server = http.createServer(app)

    server.listen(port, () => {
      console.info(`🚀 ${port} 포트에서 서버가 시작되었습니다! 🚀`)
    })
  } catch (err) {
    console.error(err)
  }
}

serve()
