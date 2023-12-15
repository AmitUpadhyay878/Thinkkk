import axios from 'axios'
import { FailureToastNotification } from '../components/ToastServerError/ToasterMessage'
const request = async(
    method = 'get',
    request = '/',
    payload,
    params,
    isToken = false
) => {
    let headers = {}
    const authToken = JSON.parse(localStorage.getItem('auth'))
        // const authToken = JSON.parse(sessionStorage.getItem('auth'))

    if (isToken) {
        headers = {
            Authorization: `Bearer ${authToken.tokenData}`
        }
    }
    const url = process.env.REACT_APP_API_HOST + request
    const options = {
        method,
        url,
        data: payload !== undefined && payload,
        params: params,
        headers
    }
    return new Promise((resolve, reject) => {
        axios(options, payload)
            .then((res) => {
                let { data } = res
                if (data?.meta?.status === 1) {
                    resolve(res)
                } else {
                    reject(data)
                }
            })
            .catch (async(error) => {
                if(error?.response?.statusCode === 401){
                    localStorage.removeItem("user")
                    localStorage.removeItem('authToken')
                    await FailureToastNotification(error?.message)
                }
                if (
                    error?.response?.statusCode === 401 ||
                    error?.response?.statusCode === 402 ||
                    error?.response?.statusCode === 400
                ) {} else {
                    reject(error)
                }
            })
    })
}

export default request