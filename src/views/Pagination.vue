<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pages.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getPage(pages.current_page -1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pages.total_pages"
          :key="page"
          :class="{'active':pages.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="getPage(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pages.has_next}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getPage(pages.current_page +1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {     //使用props 儲存來自外層products的資料 要使用下列格式type設定傳送的內容樣式等於物件 比較好  把此資料渲染在此元件的pagination上 
               //然後回傳回去 使用this.$emit 外層去觸發returnPageData事件後會去觸發getProducts外層的方法 這樣資料就從內層回傳到外層了
               // 從 products 傳進來的物件
    pages: {   //儲存來自products的Pagination元件內的:pages="pagination" 存給props裡面的pages 此元件就會儲存資料
      type: Object,
    }
  },
  methods: {
    getPage(page) {
      this.$emit("returnPageData", page); //把此內層資料傳到外層 觸發這paginationRun方法 觸發後把帶參數Page 只要外層使用returnPageData 去觸發外層的methos就會把參數帶過去外層
    }
  }
};
</script>
