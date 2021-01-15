<template>
  <div class="detial_main">
    <Breadcrumb :navData="navData" v-if="!tip" />

    <div class="detial_concent">
      <el-row>
        <el-col :span="24">
          <el-card>
            <div slot="header" v-if="tip">
              <span>作业详情</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="goBack"
              >
                返回
              </el-button>
            </div>
            <el-table
              :data="detialTableData"
              style="width: 100%"
              v-loading="loading"
              stripe
              border
            >
              <el-table-column prop="stuName" label="学生姓名" width="120" />
              <el-table-column prop="exeStartTime" label="开始时间" />
              <el-table-column prop="exeEndTime" label="结束时间" />
              <el-table-column prop="status" label="状态" width="80">
                <template slot-scope="scope">
                  <el-tag :type="statusList[scope.row.status].type">
                    {{ statusList[scope.row.status].status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="attachFinalTime"
                label="最后的答题时间"
                :formatter="formatterValue"
              />
              <el-table-column
                prop="finishTime"
                label="作业完成时间"
                :formatter="formatterValue"
              />
              <el-table-column
                prop="expendSeconds"
                label="花费时间（分钟）"
                align="center"
              />
              <el-table-column
                prop="attachCount"
                label="作业内容数量"
                width="120"
                align="center"
              />
              <el-table-column
                prop="attachCompletedCount"
                label="完成进度"
                width="140"
                align="center"
              />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      navData: {
        childTitle: '作业详情',
        goTo: '返回列表',
      },
      detialTableData: [],
      loading: true,
      statusList: [
        { type: 'warning', status: '未开始' },
        { type: 'warning', status: '待完成(进行中)' },
        { type: 'success', status: '已完成' },
        { type: 'danger', status: '已超时' },
      ],
    }
  },
  created() {
    this.getdetail()
  },
  computed: {
    id: function () {
      return this.$route.query.id
    },
    tip: function () {
      return this.$route.query.tip ? true : false
    },
  },
  methods: {
    async getdetail() {
      const { data: res } = await this.$http.post(
        `api/exercises/detail/${this.id}`
      )
      if (res.statusCode !== 200)
        return this.$message.error('获取详细信息失败！')
      this.detialTableData = res.data
      this.loading = false
    },
    goBack() {
      this.$router.go(-1)
    },
    formatterValue(row, column, cellValue, index) {
      if (!Boolean(cellValue)) {
        return '— —'
      } else {
        return cellValue
      }
    },
  },
}
</script>
