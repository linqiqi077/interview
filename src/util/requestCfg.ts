const requestUrl = process.env.NODE_ENV == 'development' ? "http://192.168.125.118:8000" : window.location.origin
export default requestUrl;