<template>
  <scroll-view @scrolltolower="handleToLower" class="recommend_view" scroll-y v-if="recommends.length > 0">
    <view class="recommend_wrap">
      <navigator class="recommend_item" v-for="item in recommends" :key="item.id" :url="`/pages/album/index?id=${item.target}`">
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>

    <view class="monthes_wrap">
      <view class="monthes_title">
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text>{{ monthes.DD }} /</text>
            {{ monthes.MM }}月
          </view>
          <view class="monthes_text">{{ monthes.title }}</view>
        </view>
        <view class="monthes_title_more"> 更多 > </view>
      </view>
      <view class="monthes_content">
        <view class="monthes_item" v-for="(item,index) in monthes.items" :key="item.id">
          <image
            mode="widthFix"
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
          ></image>
        </view>
      </view>
    </view>
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hots_item" v-for="(item,index) in hots" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      recommends: [],
      monthes: {},
      hots:[],
      params:{
        limit: 30,
        order: "hot",
        skip: 0,
      },
      hasMore:true
    }
  },
  mounted() {
    uni.setNavigationBarTitle({title:"推荐"})
    this.getList();
  },
  methods:{
    //获取接口数据
    getList(){
      this.request({
        url:'http://157.122.54.189:9088/image/v3/homepage/vertical',
        data: this.params,
      }).then(result=> {
        if (result.res.vertical.length ===0) {
          this.hasMore = false;
          uni.showToast({
            title: '没有更多数据了！',
            icon: "none"
          });
          return;
        }

        if (this.recommends.length ===0) {
          this.recommends = result.res.homepage[1].items;

          this.monthes = result.res.homepage[2];
          this.monthes.MM = moment(this.monthes.stime).format("MM");
          this.monthes.DD = moment(this.monthes.stime).format("DD");
        }

        this.hots = [...this.hots,...result.res.vertical];
      })
    },
    //滚动条触发事件
    handleToLower(){
      //修改参数   skip+= limit;
      //重新发送请求  getList()
      //请求回来成功  hots会叠加
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      }else{
        uni.showToast ({
          title:"数据没有了",
          icon:"none"
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend_view{
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5px solid #fff;
  }
}
.monthes_wrap {
  .monthes_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .monthes_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .monthes_info {
        text {
          font-size: 36rpx;
        }
      }

      .monthes_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .monthes_title_more {
      font-size: 24rpx;
      color: $color;
    }
  }
  .monthes_content {
    display: flex;
    flex-wrap: wrap;
    .monthes_item {
      width: 33.33%;
      border: 5px solid #fff;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20px;
    text {
      border-left: 5rpx solid $color;
      font-size: 24rpx;
      font-weight: 600;
      color: $color;
      padding-left: 20rpx;
    }
  }
  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>