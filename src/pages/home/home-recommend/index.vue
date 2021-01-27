<template>
  <view>
<view class="recommend_wrap">
  <view class="recommend_item"
  v-for="item in recommends"
        :key="item.id"
  >
    <image mode="widthFix" :src="item.thumb"></image>
  </view>
</view>

   <view class="moneths_wrap">
   <view class="moneths_title">
     <view class="moneths_title_info">
       <view class="moneths_info">
       <text>18/</text>
       01  月
       </view>
       <view class="moneths_text">试问卷帘人</view>
     </view>
     <view class="moneths_title_more"> 更多 > </view>
   </view>
  <view class="moneths_content"></view>
</view>

  </view>
</template>

<script>
export default {
  data(){
    return {
      recommends:[]
    }

  },
mounted(){
  this.request({
    url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
    data:{
      limit:30,
      order:"hot",
      skip:0
    }
  })
  .then(result=>{
    console.log(result);
    this.recommends= result.res.homepage[1].items;
  });
}
}
</script>

<style lang="scss" scoped>
.recommend_wrap{
  display: flex;
  flex-wrap: wrap;
.recommend_item{
  width: 50%;
  border:5px solid #fff;
}
}
.moneths_wrap{
  .moneths_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .moneths_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .moneths_info {
        text {
         font-size: 36rpx;
        }
      }

      .moneths_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .moneths_title_more {
      font-size: 24rpx;
      color: $color;
      justify-content: flex-end;
    }
  }
  .moneths_content{

  }
}
</style>