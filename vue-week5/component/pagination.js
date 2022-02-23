const pagination = {
    props:['page'],
    template: `
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
                                    <!-- 沒有前一頁 按鈕就disabled -->
            <li class="page-item" :class="{ disabled: !page.has_pre }">
                <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="$emit('get-product', page.current_page - 1)">
                <!-- ↑↑↑ 點擊＜按鈕 等於當前頁數-1  ↑↑↑ -->
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
                                <!-- active 判斷 頁數是否等於當前頁數 -->
            <li class="page-item" :class="{ active: pages === page.current_page }"
                v-for="pages in page.total_pages" :key="pages">
                <a class="page-link" href="#" @click.prevent="$emit('get-product', pages)"> {{ pages }} </a>
            </li>
            <li class="page-item" :class="{ disabled: !page.has_next}">
                <a class="page-link" href="#" aria-label="Next"
                @click.prevent="$emit('get-product', page.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`
};

export {
    pagination
};