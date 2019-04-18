<template>
<div class="songlist">
  <div class="houtui" @click="houtui"></div>
  <div class="test" ref="test"></div>
  <div class="m-song">
    <div class="song-h">
      <div class="song-bg" ref="songbg"></div>
      <div class="song-fr">
        <h2 class="song-h2">{{prolist.songListName}}</h2>
        <div class="song-f">
          <a href="#" class="song-link">
            <div class="song-ava">
              <img src="http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.webp?imageView&thumbnail=90x0&quality=75&tostatic=0&type=webp" alt="" class="u-avatar">
              网易云音乐</div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="song-info">
    <div class="list-tags">标签:
      <em class="f-bd">放松</em>
      <em class="f-bd">流行</em>
    </div>
    <div class="u-info">
      <div class="f-brk">
        <div class="f-brk-span">{{prolist.songListDescription}}</div>
      </div>
    </div>
  </div>
      <div class="pylst_list">
      <h3 class="u-smtitle">歌曲列表</h3>
      <ol class="u-songs">
        <router-link class="u-song" v-for="(i,index) in prolist.songs " :key="index" :to="{
          name: 'song',
          params: {
            id: i.id,
            index,
            songs: prolist.songs
          }
        }" >
          <div class="sgi_fl" >{{index+1}}</div>
          <div class="sgi_fr">
            <div class="sgich_fl">
              <div class="f-thide" >{{i.name}}</div>
              <div class="sgich_info">{{i.singer}}</div>
            </div>
            <div class="sgich_fr">
              <span class="u-hmsprt"></span>
            </div>
          </div>
        </router-link>
      </ol>
    </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      prolist:'',
      key:''
    }
  },
  mounted () {
     axios.get(`https://api.itooi.cn/music/netease/songList`,{
      params:{
        key:579621905,
        id:this.$route.params.id,
      }
    }).then((res)=>{
      this.prolist=res.data.data
      this.$refs.test.style.backgroundImage="url("+this.prolist.songListPic+")"
      this.$refs.songbg.style.backgroundImage="url("+this.prolist.songListPic+")"
    })
},
  created () {

  },
  methods: {
    houtui(){
    this.$router.go(-1)
   },
  },
}
</script>

<style scoped>
.songlist{
  height:100%;
}
.m-song{

}
.song-h{
    position: relative;
    padding: 0.875rem 0.325rem 0.875rem 0.3375rem;
    overflow: hidden;
    display: flex
}
.song-bg{
  background-size:100%;
  width: 4.5625rem;
    height: 3.00rem;
  position: relative;
}
.song-fr{
    position: relative;
    z-index: 2;
    margin-left:0.5rem;
    
}
.song-h2{
  color:#fff;
  font-weight: normal;
  height:1.06rem;
}
.song-link{
font-size:0.375rem;
color:#ccc;
display: inline-block;
}
.test{
   background-image: url(https://p3.music.126.net/XEgXA_Ft-3PccA9QXFWVWg==/109951163992794037.jpg?param=170y170);
    background-repeat: no-repeat;
    background-size:100%;
    filter: blur(20px);
    height:200px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.u-avatar{
  width:30px;
  height:30px;
  border-radius: 50%;
  vertical-align: middle;
}
.song-info{
      position: relative;
    margin: 0 10px 0 15px;
    padding-top: 10px;
    line-height: 19px;
    color: #666;
}
.lstit_tags{
  margin-bottom: 10px;
    line-height: 20px;
    margin-right: -10px;
}
.f-bd{
  display: inline-block;
    margin-right: 10px;
    padding: 1px 8px;
    font-size: 12px;
    position: relative;
    font-style: normal;
}
.list-tags{
      margin-bottom: 10px;
    line-height: 20px;
    margin-right: -10px;
    font-size:14px;
        border-width: 1px;

}
.f-brk {
      overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
        word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    font-size:0.32rem;
}
.u-smtitle{
      height: 23px;
    line-height: 23px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
    font-weight: 400;
    margin-bottom: 0;
}
.u-song{
  display: flex;
}
.f-brk-span{
 display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
height:55px;
text-indent: 0.3rem;
letter-spacing:2px;
}
.sgi_fl{
    display: flex;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 40px;
    font-size: 17px;
    color: #999;
}
.sgi_fr{
  flex: 1 1 auto;
    position: relative;
    display: flex;
}
.sgich_fl{
  flex: 1 1 auto;
    padding: 6px 0;
    width: 0;
}
.f-thide{
      font-size: 17px;
          overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
    color:#333;
}
.sgich_info{
  font-size: 12px;
    color: #888;
        overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
}
.sgich_fr{
      display: flex;
    align-items: center;
    padding: 0 0.25rem;
}
.u-hmsprt{
  display: inline-block;
    width: 22px;
    height: 22px;
    background: url(https://s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880) no-repeat -24px 0px;
    background-size: 166px 97px;
}
.u-songs{
  background-color: #f8f8f8;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.houtui{
  background-image: url(houtui.png);
  width:30px;
  height:30px;
  position: absolute;
  z-index: 90;
  left:0;
  top:-7px;
  background-repeat: no-repeat;
  background-size: 100%;
  margin:0.3rem;
}
</style>
