<template>
  <div class="faq_main">
    <div class="main_header">
      <h4>阅读笔记</h4>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">班级管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>阅读笔记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="faq_content">
      <el-row>
        <el-col :span="24">
          <el-card :body-style="{ padding: 0 }">
            <div v-for="item in readNote" :key="item.id" class="text">
              <div class="card_body">
                <h4>{{ item.title }}</h4>
                <h6>
                  摘至: 《{{ item.bookName }}&nbsp;&nbsp;{{
                    item.subName
                  }}》&nbsp;&nbsp;{{ item.dirName }}
                </h6>
                <p>
                  {{ item.note }}<span>--{{ item.noteTime }}</span>
                </p>
              </div>
            </div>
            <!-- 分页 -->
            <el-pagination
              style="padding: 10px 20px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 60, 80, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { readNote } from '@/api/classManage'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      readNote: [],
    }
  },
  created() {
    this.getReadNoteList()
  },
  methods: {
    async getReadNoteList() {
      this.pageSize = parseFloat(this.pageSize)
      const params = {
        limit: this.pageSize,
      }
      readNote(params).then((res) => {
        const { data } = res
        const { total, current_page, per_page } = res.data
        this.readNote = data.data
        this.currentPage = current_page
        this.total = total
        this.pageSize = parseFloat(per_page)
        console.log(data)
      })
    },
    // 分页
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getReadNoteList()
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getReadNoteList()
    },
  },
}
</script>

<style lang="scss" scoped>
.text {
  border-bottom: 1px solid #eaeaea;
}
.card_body {
  padding: 20px;
  h4,
  h6,
  p {
    color: #636262;
    margin: 0.5rem;
    span {
      color: #999999;
      padding-left: 30px;
    }
  }
  h4 {
    font-size: large;
  }
  h6,
  p {
    font-size: 0.875rem;
    margin-bottom: 0.66em;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
  }
}
</style>