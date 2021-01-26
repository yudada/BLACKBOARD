<template>
  <div class="container_book">
    <el-dialog
      :title="catalogInfo.bookName + ' ' + catalogInfo.subName"
      :visible.sync="isOpenDialog"
      :append-to-body="true"
      :before-close="handleClose"
      custom-class="catalog-dialog"
      width="630px"
      top="10vh"
    >
      <div class="title_catalog">
        <el-card
          shadow="never"
          :body-style="{ padding: '0 32px' }"
          class="catalog-card"
          v-for="(item, index) in catalogInfo.textbook_dir"
          :key="index"
        >
          <div slot="header">
            <span>{{ item.dirName }}</span>
          </div>
          <div
            class="catalog-content"
            v-for="(item2, index) in item.child"
            :key="index"
          >
            <div class="catalog-content-item">
              <span>{{ item2.dirName }}</span>
            </div>
            <div class="resource">
              <img src="@/assets/images/catalog_resource.png" alt="" />
              <span v-if="item2.modelNum">{{ item2.modelNum }}个</span>
              <span v-else>0个</span>
            </div>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['isOpenDialog', 'catalogInfo'],
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('dialog', false)
    },
  },
}
</script>

<style lang="scss">
.catalog-dialog {
  .el-dialog__body {
    height: 70vh;
    overflow: scroll;
    .title_catalog {
      height: 100%;
      overflow: scroll;
      span {
        font-size: 16px;
        color: #666666;
      }
    }
  }
}
.catalog-card {
  background: #f3f4f5 !important;
  border-radius: 10px;
  border: none;
  margin-bottom: 10px;
  box-shadow: none !important;
  .el-card__header {
    border-bottom: 1px solid #dcdcdc;
  }
  .catalog-content {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
    border-bottom: 1px dashed #dcdcdc;
    height: 1.5rem;
    .catalog-content-item {
      width: 88%;
      height: 100%;
      overflow: hidden;
    }
    .resource {
      img {
        margin-right: 10px;
      }
    }
  }
  .catalog-content:last-child {
    border-bottom: none;
  }
}
.catalog-card:hover,
.catalog-card:focus {
  box-shadow: none !important;
}
</style>