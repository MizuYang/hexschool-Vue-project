import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'


const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'mizu123',
            products: [],
            temp: {},
            isNew: false, //* 確認是新增或編輯
            productModal: '',
            delProductModal: '',
            tempProduct: {
                imagesUrl: [],
            }
        }
    },
    methods: {
        //* 檢查登入狀態
        checkLogin() {
            const url = `${this.url}/api/user/check`
            axios.post(url)
                .then(() => {
                    this.getProducts();
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'login.html'
                })
        },
        //* 取得產品資訊
        getProducts() {
            const url = `${this.url}/api/${this.path}/admin/products`
            axios.get(url)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'login.html'
                })
        },
        //* 刪除產品
        delProduct() {
            const url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
            axios.delete(url)
                .then((res) => {
                    this.delProductModal.hide();
                    alert(res.data.message);
                    this.getProducts();
                    this.temp = {}; //* 刪除資料的同時，將查看產品細節清空
                })
                .catch((err) => {
                    this.delProductModal.hide();
                    alert(err.data.message);
                })
        },
        //* 新增或編輯 產品
        updateProduct() {
            let url = `${this.url}/api/${this.path}/admin/product`;
            let method = 'post';
            //* 如果不是新的資料，就改用 put 方法編輯資料
            if (!this.isNew) {
                url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
                method = 'put'
            }

            axios[method](url, { data: this.tempProduct })
                .then((res) => {
                    alert(res.data.message);
                    this.productModal.hide();
                    this.getProducts();
                    this.temp = {}; //* 將查看產品細節清空
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //* modal 視窗 (判斷是新增、編輯 還是刪除，並顯示 modal)
        openModal(control, product) {
            if (control === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                this.productModal.show()
            } else if (control === 'edit') {
                this.isNew = false;
                this.tempProduct = JSON.parse(JSON.stringify(product)); //* 深拷貝
                //* 因為在新增時多圖不是必填的選項，所以在編輯時會遇到沒有多圖 imagesUrl 陣列，無法新增多圖的情況 ，
                //* 若要新增多圖可以在 openeModal 先判斷有沒有 imagesUrl 陣列，如果不存在就新增一個空的 imagesUrl 陣列
                if (!this.tempProduct.imagesUrl) {
                    this.tempProduct.imagesUrl = [];
                }
                this.productModal.show();
            } else if (control === 'delete') {
                this.tempProduct = { ...product }; 
                this.delProductModal.show();
            }
        }
    },
    mounted() {
        //* Modal 
        //* 將BS modal的實體賦予到變數上，就能對這變數使用modal的方法
        this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false //*不可用 ESC 之類的按鍵關閉 modal
        });
        //* 將儲存在 cookie 的 token 取出
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)mizuToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        //* 檢查登入
        this.checkLogin();
    }
})
app.mount('#app')

