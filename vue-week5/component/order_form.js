const order_form = {
  props: ['cart_data'],
  data(){
    return {
      order_form: {
        user: {
            name: "",
            email: "",
            tel: "",
            address: ""
        },
        message: ""
    }
    }
  },
  template: `
  <div class="my-5 row justify-content-center">
    <v-form action="/" v-slot="{ errors }" @submit="$emit('send_order', order_form)" class="col-md-6" ref="form">
      <div class="d-flex mb-5">
        <div>
          <h2>結帳</h2>
        </div>
        <div class="ms-auto">
          <h3>填寫客戶資料</h3>
        </div>
      </div>

      <div>
        <label for="email">E-mail</label>
        <v-field type="email" id="email" placeholder="請輸入E-mail"  class="form-control"
              name="信箱" rules="email|required" :class="{ 'is-invalid': errors['信箱'] }"
              :disabled="!cart_data.length" v-model="order_form.user.email">
        </v-field>
        <error-message name="信箱" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" :disabled="!cart_data.length"  v-model="order_form.user.name">
        </v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話" rules="required|min:8|max:10" :disabled="!cart_data.length"  v-model="order_form.user.tel">
        </v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址" rules="required" :disabled="!cart_data.length"  v-model="order_form.user.address">
        </v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea name="" id="message" class="form-control" cols="30" rows="10" :disabled="!cart_data.length" v-model="order_form.message"></textarea>
      </div>
      <div class="d-flex">
        <div v-show="!cart_data.length">
          <h3>
            <strong class="text-danger">購物車目前尚無訂單，可點擊右側"向上按鈕"返回購物！</strong>
          </h3>
        </div>
        <div class="ms-auto">
          <button type="submit" class="btn btn-danger" :disabled="!cart_data.length">送出訂單</button>
        </div>
      </div>
    </v-form>
  </div>
    `
}

export {
  order_form
}