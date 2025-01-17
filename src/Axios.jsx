import axios from 'axios'
import Cookies from 'js-cookie'

const is_auth = Cookies.get('is_auth')

const instance = axios.create({
  baseURL: 'https://tourist-server.onrender.com/',
  headers: {
    Authorization: is_auth
  }
})

export default instance
