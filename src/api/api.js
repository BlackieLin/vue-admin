import axios from 'axios'
import qs from 'qs'

// let base = 'https://api.bendibao.com'

export const requestLogin = params => {
  return axios.get('/api/wxapi/ad_check.php', qs.stringify({ text: '最好的 产品' })).then(
    res => res.data
  )
}

export const getUserListPage = params => {
  return axios.get('/api/wxapi/ad_check.php', qs.stringify({ text: '最好的 产品' })).then(
    function (res) {
      let data = {
        'data': {
          'total': 100,
          users: [
            {id: 1, name: '小黑', addr: '深圳'},
            {id: 2, name: '小白', addr: '武冈'},
            {id: 3, name: '小力', addr: '长沙'}
          ]
        }
      }
      return data
    }
  )
}
