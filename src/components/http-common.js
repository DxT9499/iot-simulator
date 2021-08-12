import axios from 'axios';
import { EventBus } from './event-bus.js'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export function config() {
    var base_url = ``
    var api_token = "Bearer "
    EventBus.$on("connect-data", (data_url, data_token) => {
        base_url = data_url + `/rest/`
        api_token = "Bearer " + data_token
        console.log(base_url, api_token)
        return axios.create({
            baseURL: base_url,
            headers: {
                Authorization: api_token,
                ContentType: "application/json",
                AccessControlAllowOrigin: "*"
            },
        })
    })
}