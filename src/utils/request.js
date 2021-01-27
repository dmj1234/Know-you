export default (params)=>{
    // 加载中
    uni.showLoading({
        title:'加载中'
    })
    return new Promise((resolve, reject)=>{
        wx.request({
            // 此处简写url,data等，只接受一个形参 params
            ...params,
            success(res){
                // 如果成功 则返回一个数据，在this.request().then(res=>{})的then中接受
                resolve(res.data)
            },
            fail(err){
                reject(err)
            },
            // complete方法是无论成功还是失败最后都要执行的
            complete(){
                // 关闭加载中的特效
                uni.hideLoading()
            }

        })
    })
}