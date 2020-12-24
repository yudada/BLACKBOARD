<template>
  <div>
    <Breadcrumb :navData="navData" />
    <div>
      <el-card>
        <el-form ref="detailForm" :model="detailForm" label-width="150px">
          <el-form-item label="试卷标题">
            <span>{{detailForm.exaTitle}}</span>
          </el-form-item>
          <el-form-item label="考试科目">
            <span>{{detailForm.bookid}}</span>
          </el-form-item>
          <el-form-item label="试卷题型结构">
            <span>{{detailForm.exaQStructure}}</span>
          </el-form-item>
          <el-form-item label="试卷题目">
            <span>{{detailForm.exaQSid}}</span>
          </el-form-item>
          <el-form-item label="试卷说明">
            <span>{{detailForm.exaRemarks}}</span>
          </el-form-item>
          <el-form-item label="考试开始时间">
            <span>{{detailForm.exaStarttime}}</span>
          </el-form-item>
          <el-form-item label="考试结束时间">
            <span>{{detailForm.exaEndtime}}</span>
          </el-form-item>
          <el-form-item label="答题时间(分钟)">
            <span>{{detailForm.exaDatitime}} 分钟</span>
          </el-form-item>
          <el-form-item label="考试次数">
            <span>{{detailForm.exaDatinum}}</span>
          </el-form-item>
          <el-form-item label="取分规则">
            <span>{{detailForm.exaJifenfangshi}}</span>
          </el-form-item>
          <el-form-item label="试卷状态">
            <span>{{detailForm.status}}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{detailForm.created_at}}</span>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb.vue'
import { wisdomBookList } from '@/api/wisdomBook'
import { parperDetail } from '@/api/classManage'
import { mapState, mapMutations } from 'vuex'
export default {
  components: { Breadcrumb },
  props: [''],
  data() {
    return {
      navData: {
        childTitle: '试卷列表',
        goTo: '返回列表'
      },
      detailForm: {},
      bookList: []
    }
  },
  computed: {
    ...mapState(['classInfo']),
    parperId: function() {
      return this.$route.query.id
    }
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      wisdomBookList().then(res => {
        console.log(res);
        this.bookList = res.data;
        this.getParperDetail();
      })
    },
    getParperDetail() {
      parperDetail(this.parperId).then(res=>{
        console.log(res);
        this.detailForm = res.data;
        this.bookList.map(item => {
          if(this.detailForm.bookid === item.id) {
            this.detailForm.bookid = item.bookName
          }
          if(this.detailForm.exaJifenfangshi = 1) {
            this.detailForm.exaJifenfangshi = '分布式';
          } else {
            this.detailForm.exaJifenfangshi = '等第式（不显示平均分）';
          }
          if(this.detailForm.status = 1) {
            this.detailForm.status = '立即发布';
          } else {
            this.detailForm.status = '暂时存稿';
          }
        })
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>