new Vue({
    name:'index',
    el:'#app',
    data(){
        return {
            waiting:false,
            searchValue:'',
            musicList:[{
                "id": 466722,
                "name":"夜的第七章",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000002jLGWe16Tf1H.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/466722.m4a?fromtag=46",
                "lyric":""
              },
              {
                "id":1249546,
                "name":"裙下之臣",
                "singer":"陈奕迅",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000003nMzes28P7wv.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/1249546.m4a?fromtag=46",
                "lyric":""
              },
              {
                "id":1313993,
                "name":"好久不见",
                "singer":"陈奕迅",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000003yQidc3s7P65.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/1313993.m4a?fromtag=46",
                "lyric":""
              },
              {
                "id":718483,
                "name":"麦芽糖",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000024bjiL2aocxT.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/718483.m4a?fromtag=46",
                "lyric":""
              }]
        }
    },
    methods:{
        searchMusic(){
            this.waiting=true
            if(this.searchValue.trim()===""){
                this.waiting=false
                this.$message.warning("请输入搜索内容");
            }else{
                $.ajax({
                    type:'get',
                    url:'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?n=30&w=' + this.searchValue,
                    dataType:'jsonp',
                    success: (res)=>{
                        this.waiting=false
                        if(res.data.song.list===[]){
                            this.$message.warning('无搜索结果')
                            return
                        }else{
                            this.musicList=[]
                            console.log(res)
                            res.data.song.list.forEach(val=>{
                                this.musicList.push({
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
                        this.waiting=false
                        this.$message.error('请求失败!')
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
        }
    }
})