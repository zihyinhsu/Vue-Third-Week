import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js'; 

const url = 'https://vue3-course-api.hexschool.io/v2' ;
const path = 'zy123';

const products =[];

let productModal={};
let delProductModal={};

const app = createApp({
  data(){
    return{
      temp:{
        imagesUrl:[],
      },
      products: [],
      isNew: true,
    }
  },
methods:{
  getProducts(){
    axios.get(`${url}/api/${path}/admin/products`)
      .then((res)=>{
        this.products = res.data.products;
      }).catch((error)=>{
        alert(error.data.message) 
       })  
  },

  checkLogin(){

    // 取得 Token（Token 僅需要設定一次）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)zyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // header的夾帶
    axios.defaults.headers.common['Authorization'] = token;

    axios.post(`${url}/api/user/check`)
    .then((res)=>{
      this.getProducts();
      // alert(`確認登入!`)
      
    }).catch((error)=>{
      alert(`確認登入失敗!`)

      //轉址到登入頁
      window.location = 'login.html';
    })
  },
  
  openModal(status,product){
    if(status === 'isNew'){
      this.temp={
        imagesUrl:[],
      }
      productModal.show();
      this.isNew = true;
    }else if(status === 'edit'){
      // 這裡也可以做深拷貝
      this.temp = {...product}
      productModal.show();
      this.isNew = false;
    }else if (status === 'delete'){
      this.temp = {...product}
      delProductModal.show();
    }
  },
  updateProduct(){
    let apiUrl = `${url}/api/${path}/admin/product`
    let method = 'post'
    let alertContent = '已成功新增商品'
    if(this.isNew  ==  false){
      apiUrl = `${url}/api/${path}/admin/product/${this.temp.id}`
      method = 'put';
      alertContent = '已成功修改商品'
    }

    axios[method](apiUrl,{data: this.temp})
    .then((res)=>{
      alert(`${alertContent}`)
      //重新刷新頁面
      this.getProducts(); 
      productModal.hide();
    }).catch((error)=>{
      alert(error.data.message) 
    })
  },
  deleteProduct(){
    axios.delete(`${url}/api/${path}/admin/product/${this.temp.id}`
    )
    .then((res)=>{
      alert(`已成功刪除商品`)
      delProductModal.hide();
      this.getProducts();
    }).catch((error)=>{
      alert(error.data.message) 
    })
  },
 
},
//生命週期
mounted(){
  this.products = products;
  this.checkLogin();

  productModal = new bootstrap.Modal(document.getElementById('productModal'), {
    keyboard: false
  })

  delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
    keyboard: false
  })
}
})

app.mount('#app')


