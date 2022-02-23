const cart = {
    props: ['cart_data', 'loading_item'],
    template: `
    <div class="container">
        <div class="d-flex">
            <h2>購物車</h2>
            <div class="ms-auto">
                <button class="btn btn-outline-danger" type="button" @click="$emit('openModal', 'cart_delete_all')"
                    :disabled="!cart_data.length">清空購物車</button>
            </div>
        </div>

        <table class="table align-middle">
            <thead>
                <tr>
                    <th>刪除</th>
                    <th>品名</th>
                    <th style="width: 150px">數量/單位</th>
                    <th></th>
                    <th>單價</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <template v-if="cart_data">
                    <tr v-for="product_item in cart_data" :key="product_item.id">
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm"
                                @click="$emit('openModal','cart_delete' ,product_item)"
                                :disabled="loading_item.delete === product_item.id"> X </button>
                        </td>
                        <td>
                            {{ product_item.product.title }}
                        </td>
                        <td>
                            <div class="input-group input-group-sm">
                                <div class="input-group mb-3">
                                    <input min="1" type="number" class="form-control" v-model="product_item.qty"
                                        @blur="$emit('update_product_num', product_item)" :disabled="loading_item.update_product_num === product_item.id">
                                    <span class="input-group-text" id="basic-addon2">{{ product_item.product.unit }}</span>
                                </div>
                            </div>
                        </td>
                        <td></td>
                        <td>
                            {{ product_item.product.price }} 元
                        </td>
                        <td></td>
                        <td>
                            {{ product_item.final_total }} 元
                        </td>
                    </tr>
                </template>
                <template v-if="cart_data.length === 0">
                    <tr>
                        <td>無</td>
                        <td>無</td>
                        <td>無</td>
                        <td></td>
                        <td>無</td>
                        <td></td>
                        <td></td>
                    </tr>
                </template>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="text-end">
                        總計
                    </td>
                    <td class="text-end">
                        待補
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
        `
}

export {
    cart
}

