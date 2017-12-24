new Vue({
    name:'detail',
    el:'#app',
    data(){
        return {
            waiting:true,
            lyric:[],
            playStatus:false,
            currentTime:0
        }
    },
    computed:{
        audio(){
            return this.$refs.audio
        }
    },
    methods:{
        playMusic(){
            if(this.playStatus){
                this.audio.pause()
                this.playStatus=false
            }else{
                this.audio.play()
                this.playStatus=true
            }
        },
        canPlay(id){
            var _this=this
            $.ajax({
                type:'get',
                url:'https://api.darlin.me/music/lyric/'+id,
                dataType:'jsonp',
                success:function(res){
                    var lyric=res.lyric
                    _this.lyric=_this.parseLyric(_this.decode(lyric))
                    _this.waiting=false
                },
                error:function(err){
                    _this.waiting=false
                    console.log(err)
                }
            })
        },
        musicUpdate(){
            this.currentTime=this.audio.currentTime
        },
        decode(input) {
            var  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this._utf8_decode(output);
            return output;
        },
        _utf8_decode(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        },
        parseLyric(lrc) {
            let lyrics = lrc.split("\n");
            let lrcAry = [];
            for(let i=0;i<lyrics.length;i++){
                let lyric = decodeURIComponent(lyrics[i]);
                let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                let timeRegExpArr = lyric.match(timeReg);
                if(!timeRegExpArr)continue;
                let clause = lyric.replace(timeReg,'');
                for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
                    let t = timeRegExpArr[k];
                    let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                        sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    let time = min * 60 + sec;
                    lrcAry.push({"time":time,"lrc":clause})
                }
            }
            return lrcAry;
        }
    }
})
