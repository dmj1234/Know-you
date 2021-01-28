<template>
  <scroll-view class="recommend_view" scroll-y v-if="recommends.length > 0">
    <view class="recommend_wrap">
      <view class="recommend_item" v-for="item in recommends" :key="item.id">
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>

    <view class="monthes_wrap">
      <view class="monthes_title">
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text>{{ monthes.DD }}/</text>
            {{ monthes.MM }}月
          </view>
          <view class="monthes_text">{{ monthes.title }}</view>
        </view>
        <view class="monthes_title_more"> 更多 > </view>
      </view>
      <view class="monthes_content">
        <view class="monthes_item" v-for="item in monthes.items" :key="item.id">
          <image
            mode="aspectFill"
            :src="item.thumb + item.rule.replace('$<height>', 360)"
          ></image>
        </view>
      </view>
    </view>
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="item in hots" :key="item.id">
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
    };
  },
  mounted() {
    this.request({
      url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
      // url: "http://service.picasso.adesk.com/v3/homepage/vertical",
      data: {
        limit: 30,
        order: "hot",
        skip: 0,
      },
    }).then((result) => {
      console.log(result);

      this.recommends = result.res.homepage[1].items;

      this.monthes = result.res.homepage[2];
      this.monthes.MM = moment(this.monthes.stime).format("MM");
      this.monthes.DD = moment(this.monthes.stime).format("DD");
    });
  },
};
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
      justify-content: flex-end;
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