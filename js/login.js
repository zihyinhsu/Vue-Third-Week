import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2' ;

const app = createApp({
  data() {
    return {
       user:{
          username: '',
          password: '' 
       }
    }
  },
  methods: {
   login(){
    if(this.user.name == '' || this.user.password == ''){
      alert(`請輸入帳號或密碼`)
    }else{
      // 發送 API 至遠端並登入（並儲存 Token）
     axios.post(`${url}/admin/signin`,this.user)
     .then((res)=>{
      alert(`登入成功!`)

     //從res.data中取出toden和expired
     const { token, expired } = res.data;
  
     // 寫入 cookie token
     document.cookie = `zyToken=${token}; expires=${new Date(expired)}`;

     // 轉址到商品頁
     window.location = 'admin.html';
   
    }).catch((error)=>{
    alert(error.data.message)
    this.user.password='';
   })
    }

     
     
   }
  },
})

app.mount('#app');


