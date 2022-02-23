import { pagination } from './component/pagination.js'; //*分頁;
import { product_modal, del_product_modal } from './component/productModal.js';  //* 新增、編輯產品
import { del_cart_modal } from './component/cart_delete_modal.js' //* 刪除購物車內容 modal
import { product_info } from './component/product_info.js'; //* 顯示產品資訊
import { cart } from './component/cart.js' //* 購物車
import { order_form } from './component/order_form.js' //*表單

//* 表單驗證規則
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});
//* 多國語系
VeeValidateI18n.loadLocaleFromURL('./language/zh_TW.json');
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, //* 調整為輸入字元立即進行驗證
});
const app = Vue.createApp({
    components: {
        pagination,
        product_modal,
        del_product_modal,
        product_info,
        cart,
        order_form,
        del_cart_modal
    },
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'mizu123',
            products: [],
            isNew: false, //* 確認是新增或編輯
            productModal: '',
            delProductModal: '',
            cart_delete: '',
            product_info: '',
            tempProduct: {
                imagesUrl: [],
            },
            pagination: {},
            temp: {},
            loading_item: {}, //* 用來做 disabled 和 加載效果 判斷
            loading_status: false,
            addCart: {
                product_id: '',
                qty: 1
            },
            cart_data: [],
            cart_delete_status: '',
        }
    },
    methods: {
        //* 檢查登入狀態
        checkLogin() {
            const url = `${this.url}/api/user/check`
            axios.post(url)
                .then(() => {
                    //* 取得產品、購物車資訊
                    this.getProducts();
                    this.getCartList();
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'login.html'
                })
        },
        //* 取得產品資訊
        getProducts(page = 1) {  //*參數預設值，將頁面預設為第一頁
            const url = `${this.url}/api/${this.path}/admin/products/?page=${page}`
            axios.get(url)
                .then((res) => {
                    this.products = res.data.products;
                    this.pagination = res.data.pagination; //*取出分頁資訊
                    this.loading_window(600); //* 螢幕讀取 loading效果
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
                this.loading('edit', product.id)
                this.tempProduct = JSON.parse(JSON.stringify(product)); //* 深拷貝
                //* 因為在新增時多圖不是必填的選項，所以在編輯時會遇到沒有多圖 imagesUrl 陣列，無法新增多圖的情況 ，
                //* 若要新增多圖可以在 openeModal 先判斷有沒有 imagesUrl 陣列，如果不存在就新增一個空的 imagesUrl 陣列
                if (!this.tempProduct.imagesUrl) {
                    this.tempProduct.imagesUrl = [];
                }
                this.productModal.show();
            } else if (control === 'delete') {
                this.loading('delete', product.id)
                this.tempProduct = { ...product };
                this.delProductModal.show();
            } else if (control === 'info') {
                this.loading('info', product.id)
                this.tempProduct = JSON.parse(JSON.stringify(product)); //* 深拷貝
                this.product_info.show()
            } else if (control === 'cart_delete') {
                this.tempProduct = { ...product };
                //* 用來判斷 刪除按鈕 是刪除全部，還是刪除單筆
                this.cart_delete_status = product.id;
                this.cart_delete.show();
            } else if (control === 'cart_delete_all') {
                this.cart_delete_status = '';
                this.cart_delete.show();
            }
        },
        //* 新增購物車
        add_cart(product) {
            this.addCart.product_id = product.id;
            this.loading('addCart', product.id)
            const url = `${this.url}/api/${this.path}/cart`
            axios.post(url, { data: this.addCart })
                .then((res) => {
                    alert(res.data.message);
                    this.getCartList();
                    this.product_info.hide();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //* 取得購物車資訊
        getCartList() {
            const url = `${this.url}/api/${this.path}/cart`
            axios.get(url)
                .then((res) => {
                    this.cart_data = res.data.data.carts;
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //* 清空購物車
        remove_cart_all() {
            const url = `${this.url}/api/${this.path}/carts`
            axios.delete(url)
                .then((res) => {
                    alert(res.data.message);
                    this.getCartList();
                    this.cart_delete.hide();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //* 刪除購物車_單一產品
        remove_cart_product(id) {
            const url = `${this.url}/api/${this.path}/cart/${id}`
            axios.delete(url)
                .then((res) => {
                    this.loading('delete', id)
                    alert(res.data.message);
                    this.getCartList();
                    this.cart_delete.hide();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //* 調整產品數量
        update_product_num(product) {
            this.loading('update_product_num', product.id)
            const url = `${this.url}/api/${this.path}/cart/${product.id}`
            const data = {
                product_id: product.product_id,
                qty: product.qty
            }
            axios.put(url, { data: data })
                .then((res) => {
                    alert(res.data.message);
                    this.getCartList();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //* 發送訂單
        send_order(order_info) {
            const url = `${this.url}/api/${this.path}/order`
            axios.post(url, { data: order_info })
                .then((res) => {
                    alert(res.data.message);
                    this.$refs.order_form.$refs.form.resetForm(); //* 表單欄位清空
                    order_info.message = '';
                    this.getCartList();
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        },
        //* 單個物件_加載效果
        loading(control, id) {
            this.loading_item[control] = id;
            setTimeout(() => {
                this.loading_item = {
                    edit: '',
                    delete: '',
                    info: '',
                    addCart: '',
                    update_product_num: ''
                }
            }, 1000)
        },
        //* 螢幕讀取_加載效果
        loading_window(time) {
            this.loading_status = true;
            setTimeout(() => {
                this.loading_status = false;
            }, time)
        }
    },
    created() {
        this.loading_window(1200);
    },
    mounted() {
        //* Modal 
        //* 將BS modal的實體賦予到變數上，就能對這變數使用modal的方法
        this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false //*不可用 ESC 關閉 modal
        });
        this.product_info = new bootstrap.Modal(document.getElementById('product_info'))
        this.cart_delete = new bootstrap.Modal(document.getElementById('cart_delete'))
        //* 將儲存在 cookie 的 token 取出
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)mizuToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        //* 檢查登入
        this.checkLogin();
    }
})
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app')

