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
                <h6>{{ item.resource }}</h6>
                <p>{{ item.content}}&nbsp;&nbsp;--{{ item.time }}</p>
              </div>
            </div>
          </el-card>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
        total: 10,
        readNote: [
          { id: 1, title: '...看着他转过去的背景，我的眼泪情不自禁的流了出来...', resource: '摘至<<背影>>.朱之清 片段' , content: '我必须向你们解释，所有这些谴责快乐和赞美痛苦的错误想法是如何产生的，我将给你们一个完整的系统描述，并阐述伟大的真理探索者，人类幸福的缔造者的实际教导。没有人拒绝、厌恶或回避快乐本身，因为它是快乐，但因为那些不知道如何理性地追求快乐的人会遭遇后果', time: '2020-10-22 11:15:02' },
          { id: 2, title: 'How Can I contact?', resource: '' , content: 'I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences', time: '2020-10-22 11:15:02' },
          { id: 3, title: 'Can I use this Plugins in Another Template?', resource: '' , content: 'I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequencesI must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences', time: '2020-10-22 11:15:02' },
          { id: 4, title: 'Can I use this Plugins in Another Template?', resource: '' , content: 'I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences', time: '2020-10-22 11:15:02' },
          { id: 5, title: 'Can I use this Plugins in Another Template?', resource: '' , content: 'I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences', time: '2020-10-22 11:15:02' }
        ]
      }
    },
    created() {
      this.getReadNoteList();
    },
    methods: {
      async getReadNoteList() {
        // const { data: res } = await this.$http.get('api/reading/notes')
        // if (res.statusCode !== 200) return this.$message.error('获取笔记列表失败！')
        // this.$message.success('获取阅读笔记成功！')
        // console.log(res);
        // this.readNote = res
      },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
    }
    }
}
</script>

<style lang="scss" scoped>
.text {
  border-bottom: 1px solid #eaeaea;
}
.card_body{
  padding: 20px;
  h4, h6, p {
    color: #636262;
    margin: 0.5rem;
  }
  h4 {
    font-size: large;
  }
  h6, p {
    font-size: 0.875rem;
    margin-bottom: 0.66em;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
  }
}
.el-pagination{
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}
</style>