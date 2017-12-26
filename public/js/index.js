new Vue({
    name:'index',
    el:'#app',
    data(){
        return {
            waiting:false,
            searchValue:'',
            searchList:[{
                "id":718477,
                "name":"夜曲",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000024bjiL2aocxT.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/718477.m4a?fromtag=46",
                "lyric":""
              },
              {
                "id":718481,
                "name":"蓝色风暴",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000024bjiL2aocxT.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/718481.m4a?fromtag=46",
                "lyric":""
              },
              {
                "id":718475,
                "name":"发如雪",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000024bjiL2aocxT.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/718475.m4a?fromtag=46",
                "lyric":""
              },
              {
                "id":718480,
                "name":"黑色毛衣",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000024bjiL2aocxT.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/718480.m4a?fromtag=46",
                "lyric":""
              }],
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
                this.$http.jsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?&n=30&w=' + this.searchValue,{jsonp:'jsonpCallback'})
                .then(res=>{
                    if(res.body.data.song.list.length===0){
                        this.$message.warning('无搜索结果')
                        return
                    }else{
                        this.playIndex=null
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
                })
                .catch(err=>{
                    this.waiting=false
                    this.$message.error('请求失败!')
                    console.log(err)
                }) 
                // $.ajax({
                //     type:'get',
                //     url:'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?&n=30&w=' + this.searchValue,
                //     dataType:'jsonp',
                //     jsonp: 'jsonpCallback',
                //     jsonpCallback:'callback',
                //     success: (res)=>{
                //         _this.waiting=false
                //         if(res.data.song.list.length===0){
                //             this.$message.warning('无搜索结果')
                //             return
                //         }else{
                //             _this.playIndex=null
                //             this.playProgress=0
                //             _this.audio.load()
                //             _this.searchList=[]
                //             res.data.song.list.forEach(val=>{
                //                 _this.searchList.push({
                //                     id:val.songid,
                //                     name: val.songname,
                //                     singer: val.singer[0].name,
                //                     img: 'https://y.gtimg.cn/music/photo_new/T002R150x150M000' + val.albummid + '.jpg?max_age=2592000',
                //                     url: 'http://ws.stream.qqmusic.qq.com/' + val.songid + '.m4a?fromtag=46',
                //                     lyric: 'https://api.darlin.me/music/lyric/'+val.songid
                //                 })
                //             })
                //         }
                //     },
                //     error:(err)=>{
                //         _this.waiting=false
                //         _this.$message.error('请求失败!')
                //         console.log(err)
                //     }
                // })
            }
        },
        saveMusic(item){
            this.$http.post('/music/saveMusic',item,{emulateJSON:true})
            .then(res=>{
                if(res.body.status===200){
                    this.$message.success('保存成功!')
                    location.reload()
                }else{
                    this.$message.warning('已存在！')
                }
            })
            .catch(err=>{
                console.log(err)
                this.$message.error('保存失败!')
            })
        },
        delMusic(){
            console.log(1)
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