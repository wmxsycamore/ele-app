module.exports = {
//    配置接口和跨域请求
    devServer : {
        open:false,
        host:"localhost",
        port: 8080,
        https:false,
        hotOnly:false,
        proxy:{
        //    配置跨域
            '/api':{
                target:'http://ele-interface.herokuapp.com/api',
                changeOrigin: true,
                ws:true,
                pathRewrite:{
                    '^/api':''

                }
            }
        }
    }
}