<template>
  <div class="search">
    <div class="tabctitem">
      <form action="/">
        <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch"/>
      </form>
      <div class="m-default">
        <div class="remen">
          <h2>热门搜索</h2>
          <ul class="remensousuo">
            <li
              v-for="(item, key) in ['花粥','我曾','绿色','心如止水','权力的游戏', '路过人间']"
              :key="key"
              @click="text(item)">
              {{item}}
            </li>
          </ul>
        </div>
        <section class="m-hotlist">
          <h3 class="title">最佳匹配</h3>
          <router-link ref= "sgitem" class="m-sgitem"  v-for="(i,index) in prolist" :key="index" :to="{
            name:'song',
            params:{
              id:i.id,
              index,
              songs: prolist
            }
          }">
            <div class="sgfr">
              <div class="sgchfl">
                <div class="f-thide">{{i.name}}</div>
                <div class="sginfo">
                  <p class="hcover">
                    <span class="highlight">{{i.singer}}</span>
                  </p>-{{i.name}}
                </div>
              </div>
              <div class="sgchfr">
                <span class="u-hmsprt"></span>
              </div>
            </div>
          </router-link>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      value: "",
      prolist:'',
    };
  },
  methods: {
    onSearch() {

      axios
        .get(`https://api.itooi.cn/music/netease/search`, {
          params: {
            key: "579621905",
            s: this.value,
            type:'song',
          }
        })
        .then(res => {
          this.prolist=res.data.data
        },err=>{
          console.log(err)
        });
    },
    text(val){
      this.value=val;
      this.onSearch()
    }
  }
};
</script>

<style scoped>
.search {
  height: 100%;
  width: 100%;
}
.tabctitem {
  width: 100%;
  height: 100%;
}
.m-sgitem {
  display: flex;
  padding-left: 10px;


}
.sgfr {
  flex: 1 1 auto;
  display: flex;
  position: relative;
  border: 0 solid rgba(0,0,0,.1);
  border-bottom-width: 0.5px;
}
.sgchfl {
  flex: 1 1 auto;
  padding: 6px 0;
  width: 0;
}
.f-thide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  font-size: 17px;
  color:#333;
}
.sginfo {
  font-size: 12px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
}
.hcover {
  display: inline;
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  word-break: normal;
}
.highlight {
  color: #507daf;
  font-size: 12px;
}
.normal {
  font-size: 12px;
  color: #888;
}
.sgchfr {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.u-hmsprt {
  background-image: url(https://s3.music.126.net/m/s/img/index_icon_3x.png?49a82fee3e0fc602e9c8b25df2bda159);
  display: inline-block;
  width: 22px;
  height: 22px;
  background-size: 166px 97px;
  background-position: -24px 0;
}
.remensousuo{
      margin: 10px 0 7px;
}
.remensousuo li{
      display: inline-block;
    height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 14px;
    font-size: 14px;
    line-height: 32px;
    color: #333;
    border-radius: 10%;
    border:1px solid #ccc;
    margin-left:8px;
}
</style>
