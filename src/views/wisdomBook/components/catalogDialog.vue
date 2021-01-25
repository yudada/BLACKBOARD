<template>
  <div class="container_book">
    <el-dialog
      title="课本目录"
      :visible.sync="isOpenDialog"
      width="630px"
      custom-class="catalog-dialog"
      top="96px"
      :before-close="handleClose"
    >
      <div class="title_catalog">
        <!-- <el-card
          shadow="never"
          :body-style="{ padding: '0 32px' }"
          class="catalog-card"
          v-for="(item, index) in bookInfo"
          :key="index"
        >
          <div slot="header">
            <span>{{ item.dirName }}</span>
          </div>
          <div>
            <div
              class="catalog-content"
              v-for="(item2, index) in item.child"
              :key="index"
            >
              <span>{{ item2.dirName }}</span>
              <div class="resource">
                <img src="@/assets/images/catalog_resource.png" alt="" />
                <span v-if="item2.modelNum">{{ item2.modelNum }}个</span>
                <span v-else>0个</span>
              </div>
            </div>
          </div>
        </el-card> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["isOpenDialog",'bookInfo'],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("dialog", false);
    },
  },
};
</script>

<style lang="scss">
.container_book {
  .catalog-dialog {
    height: 612px;
    border-radius: 10px;

    .el-dialog__header {
      display: flex;
      justify-content: center;
      // background-color: #039fee;
      border-radius: 10px 10px 0 0;
      padding: 15px;

      span {
        width: 78px;
        height: 18px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .el-dialog__body {
      height: 563px;
      overflow: scroll;
      .title_catalog {
        height: 100%;
        overflow: scroll;
        span {
          font-size: 16px;
          font-family: Microsoft YaHei;
          color: #666666;
        }
      }
      .title_catalog::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.close-btn {
  position: absolute;
  right: -35px;
  top: -48px;
  padding: 0;
  margin: 0;
}
.catalog-card {
  width: 580px;
  background: #f3f4f5 !important;
  border-radius: 10px;
  border: none;
  margin-bottom: 10px;
  .el-card__header {
    border-bottom: 1px solid #dcdcdc;
  }
  .catalog-content {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
    border-bottom: 1px dashed #dcdcdc;
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
</style>