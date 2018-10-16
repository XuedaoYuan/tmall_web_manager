import Vue from 'vue'
import axios from 'axios'


const baseUrl = "/tmall"
/*
*请求拦截器
*/
axios.interceptors.request.use(function(config) {
	config.url = baseUrl + config.url;
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(res => res.data, err => Promise.reject(err))

Vue.prototype.$axios = axios;