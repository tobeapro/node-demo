new Vue({
    name:'index',
    el:'#app',
    data(){
        return {
            waiting:false,
            searchValue:'',
            searchList:[],
            playIndex:null,
            playProgress:0,
            pageIndex:1
        }
    },
    computed:{
        audio () {
            return this.$refs.audio
        }
    },
    methods:{
        searchMusic(){
            var _this=this
            this.waiting=true
            if(this.searchValue.trim()===""){
                this.waiting=false
                this.$message.warning("请输入搜索内容");
            }else{              
                $.ajax({
                    type:'get',
                    url:'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?&n=30&w=' + this.searchValue,
                    dataType:'jsonp',
                    jsonp: 'jsonpCallback',
                    jsonpCallback:'callback',
                    success: (res)=>{
                        _this.waiting=false
                        if(res.data.song.list.length===0){
                            this.$message.warning('无搜索结果')
                            return
                        }else{
                            _this.playIndex=null
                            this.playProgress=0
                            _this.audio.load()
                            _this.searchList=[]
                            res.data.song.list.forEach(val=>{
                                _this.searchList.push({
                                    id:val.songid,
                                    name: val.songname,
                                    singer: val.singer[0].name,
                                    img: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + val.albummid + '.jpg?max_age=2592000',
                                    url: 'http://ws.stream.qqmusic.qq.com/' + val.songid + '.m4a?fromtag=46',
                                    lyric: 'https://api.darlin.me/music/lyric/'+val.songid
                                })
                            })
                        }
                    },
                    error:(err)=>{
                        _this.waiting=false
                        _this.$message.error('请求失败!')
                        console.log(err)
                    }
                })
            }
        },
        saveMusic(item){
            var _this=this
            $.ajax({
                type:'post',
                url:'/music/saveMusic',
                data:item,
                success:function(res){
                    if(res.status===200){
                        _this.$message.success('保存成功!')
                    }else{
                        _this.$message.warning('已存在！')
                    }
                },
                error:function(err){
                    console.log(err)
                    _this.$message.error('保存失败!')
                }
            })
        },
        openMusic(url,index){
            this.playIndex=index
            this.audio.setAttribute("src",url)
            this.audio.play()
        },
        musicUpdate(){
            this.playProgress = `${(this.audio.currentTime / this.audio.duration * 100).toFixed(2)}%`
        },
        musicEnded(){
            this.playIndex = null
            this.playProgress = 0 
        }
    }
})