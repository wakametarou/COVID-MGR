import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const host_selector = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return "https://api.covid-mgr.com/api/v1"
    default:
      return "http://localhost:3001/api/v1"
  }
}

const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
  baseURL: host_selector()
}), options)

export default client
