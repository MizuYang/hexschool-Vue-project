const del_cart_modal = {
    props: ['cart_delete_status', 'temp-product'],
    template: `
    <div id="cart_delete" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <!-- 這是刪除購物車_單個產品的判斷 -->
                <div v-if="cart_delete_status">
                    <div class="modal-body">
                        <p>是否刪除 <strong class="text-danger">
                                        {{ tempProduct.product.title }}
                                    </strong>
                            這項商品 (刪除後將無法恢復)。</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-danger"
                            @click="$emit('remove_cart_product', cart_delete_status)">
                            確認刪除
                        </button>
                    </div>
                </div>

                <!-- 這是刪除所有購物車的判斷 -->
                <div v-else>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">所有</strong> 商品 (刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-danger" @click="$emit('remove_cart_all')">
                            確認刪除
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>`
};

export {
    del_cart_modal
};


