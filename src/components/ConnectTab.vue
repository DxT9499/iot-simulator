<template>
    <div class="connect-tab-container" v-if="isShow">
        <div class="header">
            Connect
        </div>
        <div >
            <div class="info">
                <label >Your URL *</label>
            </div>
            <div class="info">
                <input type="text" v-model="url" placeholder="ex: http://localhost:8080">
            </div>
            <div class="info">
                <label>Your API Token *</label>
            </div>
            <div class="info">
                <input type="text" v-model="token" placeholder="oh.{name_token}.{token}">
            </div>
        </div>
        <div class="info" v-show="caution">
            <label style= "color:red">Check your data then try again!</label>
        </div>
        <div class="info">
            <button @click= "sendData">Submit</button>
        </div>
        <a href="https://www.openhab.org/docs/installation/" target="_blank">How to install openHAB</a>
        <a href="https://www.openhab.org/docs/configuration/apitokens.html" target="_blank">How to make API Token</a>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            isShow:true,
            caution:false,
            check:false,
            url: '',
            token:''
        }
    },
    methods:{
        sendData: function() {
            const HTTP = axios.create({
                baseURL: this.url+'/rest',
                headers: {
                    uthorization: "Bearer "+this.token,
                    ContentType: "application/json",
                    AccessControlAllowOrigin:"*"
                }
            })
            HTTP.get('/sitemaps').then(async response=>{
                const data = await response;
                if(!response.ok){
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                    
                }
            }).catch(error => {
                console.log(error)
                if(error.search("Error") == -1) this.check = true
                if(this.check == true) {
                this.$store.commit("changeDataApiUrl",this.url)
                this.$store.commit("changeDataApiToken",this.token)
                this.$emit('enable')
                this.isShow = false
            }
            else {
                this.url =''
                this.token =''
                this.caution=true
            }
            })
            console.log(this.url,this.token)
            console.log(this.check)
            
        }
    }
}
</script>

<style scoped>
.connect-tab-container {
    position: relative;
    display: block;
    width: 25%;
    height: 700px;
    margin: auto;
    margin-top: 50px;
    border: 2px solid #108ee9;
    background-color: #F5F8FD;
    border-radius: 5px;
}
.connect-tab-container .header {
    margin-top: 0;
    position: relative;
    background-color: #108ee9;
    display: block;
    height: 75px;
    color: white;
    text-align: center;
    line-height: 75px;
    font-size:30px;
    margin-bottom: 50px;
}

.connect-tab-container .info {
    position: relative;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
input {
    height: 36px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 30px;
    border: 1px solid #108ee9;
}
.connect-tab-container button {
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    width: 50%;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: #108ee9;
    color: white;
}
.connect-tab-container a {
    margin-top: 30px;
    display: block;
    text-align: center;
}
</style>