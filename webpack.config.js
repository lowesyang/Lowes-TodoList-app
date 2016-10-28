var webpack=require("webpack");

module.exports={
    entry: {
        main:'./frontend/index',
        vendor:['vue','vuex','vue-router']
    },
    output:{
        path:'./build',
        filename:'bundle.min.js',
        publicPath:'./build/',
        chunkFilename:'[id].[chunkhash:5].chunk.js'
    },
    module:{
        loaders:[
            {
                test:/\.js[x]?$/,
                loader:'babel',
                exclude:/node_modules/,
                plugins:['transform-time']
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test:/\.(png|jpg|svg|gif|eot|woff|ttf)$/,
                loader:'url?limit=8192'
            },
            {
                test:/\.vue$/,
                loader:'vue'
            }
        ]
    },
    resolve:{
        extensions:['','.js','.jsx']
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('vendor','commons.js')
    ]
}