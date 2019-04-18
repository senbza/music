<template>
  <div class="player" ref="player">
    <div class="m-fiflter"></div>
    <div class="houtui" @click="houtui"></div>
    <div class="m-newson">
      <!-- <van-icon name="arrow-left" size=30px  class="icon-left" /> -->
      <div class="m-song-plybtn"></div>
      <div class="m-song-wrap">
        <div class="m-song-disc">
          <div class="m-song-turn">
            <div class="m-song-rollwrap">
              <div :class="['m-song-img',{play: !this.status}]">
                <img :src="songs.pic" alt class="u-img" ref="rotate">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-song-info">
        <h2 class="m-song-h2">
          <span class="m-song-sname">{{songs.name}}</span>
          <span class="m-song-gap">-</span>
          <b class="m-song-autr">{{songs.singer}}</b>
        </h2>
        <div class="m-song-lrc">
          <div class="m-song-scroll">
            <div class="m-song-iner">
              <p class="m-song-lritem">{{lir}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="progress" ref="progressBar" @click="progressClick">
        <div class="pro-warp" :style="{width:items+'%'}" ref="progress">
          <div class="pro-main">
            <span
              class="xiaoqiu"
              :style="{left:items+'%'}"
              @touchstart.prevent="progressTouchStart"
              @touchmove.prevent="progressTouchMove"
              @touchend="progressTouchEnd"
              ref="progressBtn"
            ></span>
          </div>
        </div>
      </div>
      <div class="tiem">
        <span class="cTime">{{format(cTime)}}</span>
        <span class="dTime">{{format(dTime)}}</span>
      </div>
      <div class="buttom">
        <span class="play-up" @click="playup"></span>
        <span :class="{playplay:status,playpause:!status}" @click="btnaudio" ref="playpause"></span>
        <span class="play-down" @click="playdown"></span>
      </div>
    </div>
    <audio :src="scrurl" ref="mySummaryAudio" autoplay="autoplay" @timeupdate="jiant" preload='preload'></audio>
  </div>
</template>
<script>
import axios from "axios";
import way from './config.js'
export default {
  data() {
    return {
      scrurl: `https://api.itooi.cn/music/netease/url?key=579621905&id=${
        this.$route.params.id
      }&br=999000`,
      test: "controls",
      status: false,
      styles: "paly",
      songs: "",
      items: "",
      lir: "",
      cTime: "0", // 已播放时间
      dTime: "0", // 总播放时间
      dv: "",
      songslist:'',
      changeControls: false
    };
  },
  mounted() {
    axios
      .get(`https://api.itooi.cn/music/netease/song`, {
        params: {
          key: "579621905",
          id: this.$route.params.id
        }
      })
      .then(res => {
        this.songs = res.data.data;
        this.$refs.player.style.backgroundImage = "url(" + this.songs.pic + ")";
      }),
      axios
        .get(`https://api.itooi.cn/music/netease/lrc`, {
          params: {
            key: "579621905",
            id: this.$route.params.id
          }
        })
        .then(res => {
          this.lir = res.data;
        });
  },
  created() {
    this.touch = {};

  },
  methods: {
    //切歌（前）
    playup(){
       if(this.$route.params.index == 0){
          this.$notify('亲!前面没有歌曲了哦');
        return
      }
    this.$refs.mySummaryAudio.pause();
    this.songs=this.$route.params.songs[this.$route.params.index-1]
    this.$refs.player.style.backgroundImage = "url(" + this.$route.params.songs[this.$route.params.index-=1].pic + ")";
    this.scrurl= `https://api.itooi.cn/music/netease/url?key=579621905&id=${
        this.songs.id
      }&br=999000`
      console.log(this.$route.params.index==0)
    },
    //切歌（后）
    playdown(){
    if(this.$route.params.index == this.$route.params.songs.length-1){
        this.$notify('亲,这是最后一首歌了哦亲');
      return
    }
    this.$refs.mySummaryAudio.pause();
    this.songs=this.$route.params.songs[this.$route.params.index+1]
    console.log(this.$route.params)
    this.$refs.player.style.backgroundImage = "url(" + this.$route.params.songs[this.$route.params.index+=1].pic + ")";
    this.scrurl= `https://api.itooi.cn/music/netease/url?key=579621905&id=${
        this.songs.id
      }&br=999000`
    },
    houtui(){
      this.$refs.mySummaryAudio.pause();
      this.$router.go(-1)
    },
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
        this.changeControls = true;
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        Math.max(0, this.touch.left + deltaX),
        this.$refs.progressBar.offsetWidth
      );
      this.items = offsetWidth / (this.$refs.progressBar.offsetWidth / 100);
    },
    //拖拽
    progressTouchEnd(e) {
      console.log(e)
      this.changeControls = false;
      const deltaX = e.changedTouches[0].clientX - (document.body.clientWidth - this.$refs.progressBar.clientWidth) / 2;
      const temT = deltaX / this.$refs.progressBar.offsetWidth
      this.$refs.mySummaryAudio.currentTime =
        this.$refs.mySummaryAudio.duration * temT;
      this.cTime = this.$refs.mySummaryAudio.currentTime;
      console.log(this.items)
        return (this.items =
          (this.$refs.mySummaryAudio.currentTime /
            this.$refs.mySummaryAudio.duration) *
          100);
    },
    progressClick(e) {},
    //歌曲监听
    jiant(e) {
      this.cTime = this.$refs.mySummaryAudio.currentTime;
      this.dTime = this.$refs.mySummaryAudio.duration;
      if (this.$refs.mySummaryAudio.currentTime ==this.$refs.mySummaryAudio.duration) {
        this.$refs.rotate.className = "u-img";
        this.songs=this.$route.params.songs[this.$route.params.index+1]
        console.log(this.$route.params)
        this.$refs.player.style.backgroundImage = "url(" + this.$route.params.songs[this.$route.params.index+=1].pic + ")";
        this.scrurl= `https://api.itooi.cn/music/netease/url?key=579621905&id=${
            this.songs.id
            }&br=999000`
      }
      if (this.changeControls) {
          return;
      }
      if (this.touch.initiated) {
        this.items =
          (this.$refs.mySummaryAudio.currentTime /
            this.$refs.mySummaryAudio.duration) *
          100;
        return;
      } else {
        this.items =
          (this.$refs.mySummaryAudio.currentTime /
            this.$refs.mySummaryAudio.duration) *
          100;
      }
      const barWidth = this.$refs.progressBar.clientWidth - 20;
    },
    //歌曲播放时间
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    //点击播放或者暂停
    btnaudio() {
      if (this.status == false) {
        this.$refs.mySummaryAudio.pause();
        this.status = true;
      } else {
        if (this.status == true) {
          this.$refs.mySummaryAudio.play();
          this.status = false;
        }
      }
    }
  }
};
</script>



<style scoped>
.player {
  height: 100%;
}
.icon-left {
  padding: 10px 0px 10px 10px;
}
.m-song-plybtn {
  width: 110px;
  height: 157px;
  top: 0px;
  left: 140px;
  background-image: url(https://s3.music.126.net/m/s/img/needle-plus.png?994aa910ce3e4d242eb7076620b0e502);
  position: absolute;
  background-size: 100%;
  background-repeat: no-repeat;
  z-index: 6;
}
.m-song-wrap {
  padding-top: 80px;
}
.m-song-disc {
  width: 8.5rem;
  height: 8.375rem;
  position: relative;
  margin: 0 auto;
}
.m-song-turn {
  width: 100%;
  height: 100%;
  background-image: url(https://s3.music.126.net/m/s/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f);
  position: absolute;
  right: 0;
  top: 13px;
  bottom: 0;
  z-index: 2;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 0 auto;
}
.m-song-rollwrap {
  width: 5.25rem;
  height: 5.25rem;
  margin: 1.6rem 0 0 1.6rem;
}
.m-song-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: url(https://s3.music.126.net/m/s/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188)
    no-repeat;
  background-size: contain;
  animation: haha1 8s linear infinite;
  animation-play-state: paused;
}
.m-song-img.play {
  animation-play-state: running;
}
.u-img {
  width: 100%;
  vertical-align: middle;
}
@keyframes haha1 {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
.m-song-info {
  padding: 0 2.1875rem;
  position: relative;
}

.m-song-h2 {
  text-align: center;
  font-size: 18px;
  line-height: 1.1;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.m-song-gap {
  margin: 0 4px;
}
.m-song-lrc {
  margin-top: 14px;
  min-height: 3.375rem;
  position: relative;
}
.m-song-scroll {
  line-height: 1.5;
  text-align: center;
  color: #000;
  font-size: 13px;
  height: 72px;
  overflow: hidden;
}
.m-song-lritem {
  padding-bottom: 8px;
}
.buttom {
  margin: 0.61rem;
  display: flex;
  justify-content: space-around;
  z-index: 10;
  position: relative;
}
.play-up,
.play-down,
.playpause,
.playplay {
  background-image: url(up.png);
  background-size: 75%;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  margin-top: 5px;
}
.playpause {
  background-image: url(pause.png);
  background-size: 85%;
  margin-top: 5px;
}
.play-down {
  background-image: url(down.png);
  margin-top: 5px;
}
.playplay {
  background-image: url(play.png);
  background-size: 85%;
}
.progress {
  height: 10px;
  background-color:#fff;
  border-radius: 40px;
  position: relative;
  width: 80%;
  margin: 0 auto;
}
.player {
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -164px 0px;
  min-height: 100%;
}
.xiaoqiu {
  width: 20px;
  height: 20px;
  background-color: #000;
  display: block;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  margin-left: -10px;
}
.pro-warp {
  width: 0%;
  background-color: #000;
  height: 10px;
  border-radius: 40px;
  padding-right: 3px;
}
.tiem {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  position: relative;
}
.cTime {
  position: absolute;
  left: 2px;
  top: -14px;
}
.dTime {
  position: absolute;
  right: 2px;
  top: -14px;
}
.m-newson {
  width: 100%;
  height: 100%;
}
.m-fiflter {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.712);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.houtui{
  background-image: url(houtui.png);
  width:30px;
  height:30px;
  position: absolute;
  z-index: 90;
  left:0;
  top:0;
  background-repeat: no-repeat;
  background-size: 100%;
  margin:0.3rem;
}
</style>
