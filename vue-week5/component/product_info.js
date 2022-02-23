const product_info = {
  props: ['product-info','loading_item'],
  template: `
    <!-- Modal -->
    <div class="modal fade" id="product_info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content container">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> <strong class="">單一產品細節</strong> </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div>
                        <template v-if="productInfo.category">
                            <div class="card mb-3">
                                <img :src="productInfo.imageUrl" class="card-img-top primary-image img-fluid" alt="主圖">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        {{ productInfo.title }}
                                        <span class="badge bg-primary ms-2">{{ productInfo.category }}</span>
                                    </h5>
                                    <p class="card-text"> <strong>商品描述：</strong> <br> {{ productInfo.description }}</p>
                                    <p class="card-text"> <strong>商品內容：</strong> <br> {{ productInfo.content }}</p>
                                    <div class="d-flex">
                                        <p class="card-text me-2 text-danger">{{ productInfo.price }}</p>
                                        <p class="card-text text-secondary"><del>{{ productInfo.origin_price }}</del></p>
                                        {{ productInfo.unit }} / 元
                                        <div class="ms-auto">
                                            <button type="button" class="btn btn-danger"
                                                @click="$emit('add_cart', productInfo )"
                                                :disabled="loading_item.addCart === productInfo.id">加入購物車
                                                <div class="spinner-border spinner-border-sm" role="status"
                                                    v-show="loading_item.addCart === productInfo.id">
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template v-for="(img,i) in productInfo.imagesUrl" :key="i">
                                <img :src="img" alt="" class="images m-2 img-fluid">
                            </template>
                        </template>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                </div>
            </div>
        </div>
    </div>
`
}

export {
  product_info
}

