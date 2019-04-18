<template>
  <div class="hotsong">
    <div class="hotoct">
      <div class="hoticon"></div>
      <div class="hottiem">"云音乐热歌榜：云音乐用户一周内收听所有线上歌曲 官方TOP排行榜，每周四更新。"</div>
    </div>
    <div class="hotcont">
      <div class="m-sglst">
        <router-link class="m-sgitem" v-for="(i,index) in prohot" :key="index" :to="{
          name:'song',
          params:{
            id:i.id,
            index,
            songs:prohot
            }
        }">
          <div class="sgfl ">{{index+1}}</div>
          <div class="sgfr">
            <div class="sgchfl">
              <div class="f-thide">{{i.name}}</div>
              <div class="sginfo">
                 <i class="u-hmsprt"></i>
                {{i.name}}-{{i.name}}
              </div>
            </div>
            <div class="sgchfr">
              <span class="sgchply"></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      prohot:''
    }
  },
  created () {
    axios.get(`https://api.itooi.cn/music/netease/songList`,{
      params:{
        key:"579621905",
        id:"83251094",
      }
    }).then((res)=>{
      this.prohot=res.data.data.songs
    })
  }
}
</script>
<style scoped>
.hotsong{
  width: 100%;
  height: 100%;
}
.hotoct{
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url(https://s3.music.126.net/m/s/img/hot_music_bg_3x.jpg?2bfefd3ba37eaffbd66b7d108b9de26a) no-repeat;
  background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    padding-left: 20px;
    box-sizing: border-box;
}
.hoticon{
  width: 142px;
  height: 67px;
  background: url(https://s3.music.126.net/m/s/img/index_icon_3x.png?49a82fee3e0fc602e9c8b25df2bda159)no-repeat;
  background-size: 166px 97px;
  background-position: -24px -30px;
  position: absolute;
  top:22%;
  left:9%;
}
.hottiem{
margin-top: 10px;
color: hsla(0,0%,100%,.8);
font-size: 12px;
transform: scale(.91);
transform-origin: left top;
position: absolute;
left:5%;
bottom:5%;
}
.hotcont{
  position: relative;
}
.m-sgitem{
  color: #333;
  display: flex;
  padding-left: 10px;
  cursor: pointer;
}
.m-sgitem .sgfl{
  color: #df3436;
  align-items: center;
  width: 38px;
  font-size: 17px;
  display: flex;
  justify-content: center
}
.sgfr{
  display: flex;
  position: relative;
  flex: 1 1 auto;
  border: 0 solid rgba(0,0,0,.1);
      border-bottom-width: 0.5px;
}
.sgchfl{
  flex: 1 1 auto;
  padding: 6px 0;
  width: 0;
}
.f-thide{
  font-size: 17px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
}
.sginfo{
  font-size: 12px;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
}
.u-hmsprt{
  background: url(https://s3.music.126.net/m/s/img/index_icon_3x.png?49a82fee3e0fc602e9c8b25df2bda159);
  background-size: 166px 97px;
  display: inline-block;
    width: 12px;
    height: 8px;
    margin-right: 4px;
}
.sgchply{
  display: inline-block;
    width: 22px;
    height: 22px;
    background-position: -24px 0;
    background-image: url(https://s3.music.126.net/m/s/img/index_icon_3x.png?49a82fee3e0fc602e9c8b25df2bda159);
    background-repeat: no-repeat;
    background-size: 166px 97px;
    
}
.sgchfr{
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>
