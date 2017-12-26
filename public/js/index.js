new Vue({
    name:'index',
    el:'#app',
    data(){
        return {
            waiting:false,
            searchValue:'',
            searchList:[],
            musicList:[],
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
                    console.log(res)
                    if(res.body.data.song.list.length===0){
                        this.waiting = false
                        this.$message.warning('无搜索结果')
                        this.searchList = []
                        return
                    }else{
                        this.playIndex=null
                        this.playProgress=0
                        this.audio.load()
                        this.searchList=[]
                        this.waiting = false
                        res.body.data.song.list.forEach(val=>{
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
            }
        },
        saveMusic(item){
            this.$http.post('/music/saveMusic',item,{emulateJSON:true})
            .then(res=>{
                if(res.body.status===200){
                    this.$message.success('保存成功!')
                    this.musicList.push(item)
                }else{
                    this.$message.warning('已存在！')
                }
            })
            .catch(err=>{
                console.log(err)
                this.$message.error('保存失败!')
            })
        },
        delMusic(id,el,bol){
            this.$http.post('/music/delMusic', { id: id }, { emulateJSON: true })
            .then(res=>{
                if(res.body.status===200){
                    this.$message.success('删除成功!')
                    if(bol){   
                        let musicList=document.querySelector('.music-list')
                        musicList.removeChild(el.path[1])
                    }else{
                        this.musicList.splice(el,1)
                    }
                }else{
                    this.$message.error(res.body.text)
                }
            })
            .catch(err=>{
                this.$message.error('操作异常!')
                console.error(err)
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