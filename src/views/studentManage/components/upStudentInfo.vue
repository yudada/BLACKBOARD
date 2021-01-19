<template>
  <div>
    <el-dialog
      title="学生导入"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="upURL + 'api/student/import'"
        :accept="accept"
        :on-success="handleSuccess"
        :file-list="fileList"
        :auto-upload="false"
        name="excel"
        :headers="headers"
      >
        <el-button slot="trigger" size="small" type="success">
          选取文件
        </el-button>
        <div slot="tip" class="el-upload__tip">
          点击按钮选取文件
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button class="cn_btn" @click="submitUpload">
          上 传
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { studentImport } from '@/api/studentManage.js'
export default {
  props: [],
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      upData: {
        excel: ''
      },
      upFile: null,
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      },
      accept: '.xlsx,.xls,XLSX,.XLS',
    }
  },
  computed: {
    upURL: function () {
      const isDev = process.env.NODE_ENV === 'development'
      return isDev ? 'http://192.168.8.123/' : 'https://api.vrbook.vip/'
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      if(response.statusCode !== 200) {
        return this.$message.error(response.msg)
      } else {
        this.dialogVisible = false
        this.$message.success(response.msg)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>