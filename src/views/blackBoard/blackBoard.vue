<template xmlns='http://www.w3.org/1999/html'>
    <div class='board'
         @mousedown='handleModelMouseDown'
         @mousemove='handleModelMouseMove'
         @mouseup='handleModelMouseUp'
         @touchstart='handleModelTouchStart'
         @touchmove='handleModelTouchMove'
         @touchend='handleModelTouchEnd'
    >
      <canvas class='canvas-bottom' id='bgCanvas'></canvas>
      <canvas class='canvas' id='myCanvas' :class='{clearP: isEraserActive, commonP: isCommonPenActive, magicP: isMagicPenActive}'
        @mousedown='handleMouseDown'
        @mousemove='handleMouseMove'
        @mouseup='handleMouseUp'
        @mouseleave='handleMouseLeave'
        @touchstart = 'handleTouchStart'
        @touchmove = 'handleTouchMove'
        @touchend = 'handleTouchEnd'
      ></canvas>
      <div class='tools' @click='switchTool'>
        <div class='btn' :class='{active: isCommonPenActive}' data-type='1'>
          <el-tooltip content="普通画笔" placement="top" effect="light">
            <img v-if='!isCommonPenActive' src='../../assets/images/board/common_pen.png' />
            <img v-else src='../../assets/images/board/active_common_pen.png'/>
          </el-tooltip>
        </div>
        <div class='btn' :class='{active: isMagicPenActive}' data-type='2'>
          <el-tooltip content="魔法笔" placement="top" effect="light">
            <img v-if='!isMagicPenActive' src='../../assets/images/board/magic.png' />
            <img v-else src='../../assets/images/board/magic-active.png' />
          </el-tooltip>
        </div>
        <div class='btn' :class='{active: isEraserActive}' data-type='3'>
          <el-tooltip content="橡皮擦" placement="top" effect="light">
            <img v-if='!isEraserActive' src='../../assets/images/board/eraser.png' />
            <img v-else src='../../assets/images/board/eraser-active.png' />
          </el-tooltip>
        </div>
        <div class='btn' :class='{active: isBookListActive}' data-type='4' @click='getCourseList'>
          <el-tooltip content="课件列表" placement="top" effect="light">
            <img v-if='!isBookListActive' src='../../assets/images/board/ppt.png' />
            <img v-else src='../../assets/images/board/ppt-active.png' />
          </el-tooltip>
        </div>
        <div class='btn' :class='{active: isSitActive}' data-type='5' @click='getStudent' @touchstart='getStudent'>
          <el-tooltip content="学生座位" placement="top" effect="light">
            <img v-if='!isSitActive' src='../../assets/images/board/sit.png' />
            <img v-else src='../../assets/images/board/sit-active.png' />
          </el-tooltip>
        </div>
        <div class='btn' :class='{active: isRestActive}' data-type='6'>
          <el-tooltip content="清理黑板" placement="top" effect="light">
            <img v-if='!isRestActive' src='../../assets/images/board/reset.png' />
            <img v-else src='../../assets/images/board/reset-active.png' />
          </el-tooltip>
        </div>
      </div>
      <div class='color-and-size' v-show='toolbarShow'>
          <div class="color_panel" @click='changeColor'>
            <div>选择粉笔颜色：</div>
            <div id="white" class="color-item active" style="background-color: white;"></div>
            <div id="black" class="color-item" style="background-color: black;"></div>
            <div id="red" class="color-item" style="background-color: #FF3333;"></div>
            <div id="blue" class="color-item" style="background-color: #0066FF;"></div>
            <div id="yellow" class="color-item" style="background-color: #FFFF33;"></div>
            <div id="green" class="color-item" style="background-color: #33CC66;"></div>
            <div id="gray" class="color-item" style="background-color: gray;"></div>
          </div>
        <div id="range-wrap">
          <div>设置粉笔粗细：</div>
          <input @change='changeWidth' type="range" id="range" min="1" max="30" value="5" title="调整笔刷粗细">
        </div>
      </div>
      <div class='trash' ref='trash'>
        <el-tooltip content="垃圾桶" placement="top" effect="light">
          <img v-if='!isTrash' src='../../assets/images/board/trash.png'>
          <img v-else src='../../assets/images/board/trash-start.png'>
        </el-tooltip>
      </div>
      <div class='sidebar'>
        <div v-if="!this.hasUser" class='side-item'>
          <img class='auto' src='../../assets/images/board/avatar.png'>
        </div>
        <div class='side-item' v-else>
          <el-tooltip :content="this.userInfo.realName" placement="left" effect="light">
            <img class='auto' style='border-radius: 50%' :src='this.userInfo.photo' />
          </el-tooltip>
        </div>
        <div class='side-item' @click='toManageMode'>
          <el-tooltip content="切换管理模式" placement="left" effect="light">
            <img src='../../assets/images/board/mode.png' />
          </el-tooltip>
        </div>
        <div class='side-item' @click='showSearchPanel'>
          <el-tooltip content="搜索" placement="left" effect="light">
            <img src='../../assets/images/board/search.png' />
          </el-tooltip>
        </div>
        <div class='side-item' v-if='isMagicPenActive' @click='getModel'>
          <el-tooltip content="检索模型" placement="left" effect="light">
            <img src='../../assets/images/board/searchmodel.png' />
          </el-tooltip>
        </div>
        <div class='side-item' v-else style='visibility: hidden'>
            <img src='../../assets/images/board/searchmodel.png' />
        </div>
      </div>
      <div class='model-container' v-for='(m,index) in modelArr' :key='index' :style='{top:m.t, left: m.l, width: m.w, height: m.h}' :mid='m.mid'>
        <div class='close-btn' @click='closeModel' :data-index='index'>
          <img src='../../assets/images/board/close@2x.png'>
        </div>
        <embed :src='m.url' />
      </div>

      <template v-if='isCourseShow'>
        <div class='course-container' :class='{fullscreen: isFull}'>
          <div class='close-btn' @click='closeCourseList'>
            <img src='../../assets/images/board/close.png'>
          </div>
          <div class='maximum-btn' @click='setToFullScreen'>
            <img src='../../assets/images/board/maximum.png'>
          </div>
          <div class='minimum-btn' @click='exitFullScreen'>
            <img src='../../assets/images/board/minimum.png'>
          </div>
          <div class='list-container'>
            <el-table :data="courseData" style="width: 100%" stripe border>
              <el-table-column prop="title" label="标题" />
              <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                  <el-button type="text" @click="openDetail(scope.row.id)">
                    查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>

      <template v-if='isCourseDetailShow'>
        <div class='course-detail-container' :class='{fulldetailscreen: isDetailFull}'>
          <div class='close-btn' @click='closeCourseDetail'>
            <img src='../../assets/images/board/close.png'>
          </div>
          <div class='maximum-btn' @click='setToFullScreen2'>
            <img src='../../assets/images/board/maximum.png'>
          </div>
          <div class='minimum-btn' @click='exitFullScreen2'>
            <img src='../../assets/images/board/minimum.png'>
          </div>
          <div class='detail-container'>
            <el-card>
              <el-form :data="courseDetailData" label-position="left" label-width="100px">
                <el-form-item label="课件名称" prop="title">
                  <span>{{ courseDetailData.title }}</span>
                </el-form-item>
                <el-form-item label="附件下载" prop="path">
                  <a
                    v-for="(item, index) in courseDetailData.path"
                    :key="item"
                    :href="item"
                    target="_self"
                    style="color: #ad5df3"
                  >
                    {{ courseDetailData.fileName[index] }} ,
                  </a>
                </el-form-item>
                <el-form-item label="课件内容">
                  <p v-html="courseDetailData.content"></p>
                </el-form-item>
                <el-form-item label="状态">
                  <span v-if="courseDetailData.is_share === 1">共享</span>
                  <span v-if="courseDetailData.is_share === 2">私有</span>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
      </template>

      <template v-if='isStudentShow'>
        <div class='course-container' ref='studentContainer' :class='{send: showTip}'>
          <div class='close-btn' @click='closeStudentList'>
            <img src='../../assets/images/board/close.png'>
          </div>
          <el-switch
            class='all-select'
            v-model="setSwitchValue"
            active-text="取消全选"
            inactive-text="全选"
            active-color='gray'
            inactive-color='#AD5DF3'
            @change='allSelect'>
          </el-switch>
          <div class='list-container'>
            <div
              v-for="(student, index) in studentList"
              :key="index"
              class="student_card"
            >
              <div class="student_content">
                <div style="position: relative">
                  <div class="student_avatar">
                    <!-- 头像 -->
                      <div class="avater">
                        <img
                          v-if="student.photo"
                          :src="student.photo"
                          alt=""
                          :onerror="defaultPic"
                        />
                        <img v-else src="@/assets/def_avater.jpg" alt="" />
                      </div>
                    <span v-if="student.stuName">{{ student.stuName }}</span>
                    <span v-else>未知</span>
                  </div>
                  <el-checkbox
                    v-show="checkedBox"
                    class="student_check"
                    v-model="student.isPulishChecked"
                    @change="toggleSelection(student)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if='searchPanel'>
        <div class='course-container' :class='{searchFullScreen: isSearchFull}'>
          <div class='close-btn' @click='closeSearchPanel'>
            <img src='../../assets/images/board/close.png'>
          </div>
          <div class='maximum-btn' @click='setToFullScreen3'>
            <img src='../../assets/images/board/maximum.png'>
          </div>
          <div class='minimum-btn' @click='exitFullScreen3'>
            <img src='../../assets/images/board/minimum.png'>
          </div>
          <div class='list-container search-container'>
            <el-input placeholder="请输入内容" v-model="searchWord" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click='startSearchSources'></el-button>
            </el-input>
            <div v-if='searchData.length' class='sources-contaniner'>
<!--              <swiper class='swiper' :options="swiperOptions">-->
<!--                <swiper-slide v-for='source in searchData' :key='source.id'>-->
<!--                  <preview :source='source'></preview>-->
<!--                </swiper-slide>-->
<!--                <div class="swiper-pagination" slot="pagination"></div>-->
<!--              </swiper>-->
              <el-table :data="searchData" style="width: 100%" stripe border>
                <el-table-column prop="name" label="标题" />
                <el-table-column label='类型' width='150px'>
                  <template slot-scope='scope'>
                    <div v-if='scope.row.type === 1'>图片</div>
                    <div v-if='scope.row.type === 2'>音频</div>
                    <div v-if='scope.row.type === 3'>视频</div>
                    <div v-if='scope.row.type === 4'>模型</div>
                  </template>
                </el-table-column>
                <el-table-column prop="created_at" label="上传时间" />
                <el-table-column label="操作" width="150px">
                  <template slot-scope="scope">
                    <el-button type="text" @click="examineSource(scope.row)">
                      查看
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else class='tip-panel'>
              <div style='width: 50px;height: 50px;margin-right: 15px'>
                <img style='width: 100%;height:auto' src='../../assets/images/board/enter.png'/>
              </div>
              <div v-if='!isSearch'>请输入文字以搜索资源~</div>
              <div v-else>
                您还没有收藏资源 ，<router-link to='/personal-resources'>（请先添加资源）</router-link>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if='showSource'>
        <preview @closeDetail='closeSourceShow' :source='whichSource'></preview>
      </template>

      <div class='pen' @click='changePenColor' data-color='#fff'>
        <img src='../../assets/images/board/pen1.png' />
      </div>

      <div class='pen pen2' @click='changePenColor' data-color='#FFC125'>
        <img src='../../assets/images/board/pen2.png' />
      </div>

      <div class='pen pen3' @click='changePenColor' data-color='#ff0000'>
        <img src='../../assets/images/board/pen3.png' />
      </div>

      <div class='pen pen4' @click='changePenColor' data-color='#33CCFF'>
        <img src='../../assets/images/board/pen4.png' />
      </div>

      <div class='hbc' @click='setClear'>
        <img src='../../assets/images/board/hbc.png' />
      </div>

      <div v-if='clear' class='mobile-hbc' :style='{top: top, left: left}'>
        <img src='../../assets/images/board/heibancha.png' />
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {
  courseWareDetail,
  courseWareList,
  classExerciseAdd,
  searchSources,
  searchModel,
  studentName
} from '@/api/classRoom.js'
import { classInfo } from '@/api'
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination, Mousewheel, Autoplay])
Vue.use(getAwesomeSwiper(SwiperClass))
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
import 'swiper/swiper-bundle.css'
import Preview from './components/preview'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'blackBoard',
  components: {
    Swiper,
    SwiperSlide,
    Preview
  },
  data() {
    return {
      top: '95%',
      left: '95%',
      showSource: false,
      whichSource: undefined,
      isSearch: false,
      isFull: false,
      isDetailFull: false,
      isSearchFull: false,
      historyDeta: [],
      tempMaxX: undefined,
      tempMaxY: undefined,
      tempMinX: undefined,
      tempMinY: undefined,
      originX: undefined,
      originY: undefined,
      clear: false,
      firstDot: undefined,
      panting: false,
      lWidth: 6,
      lastPoint: { x: undefined, y: undefined },
      ratioX: undefined,
      ratioY: undefined,
      isCommonPenActive: true,
      isMagicPenActive: false,
      isEraserActive: false,
      isBookListActive: false,
      isSitActive: false,
      isRestActive: false,
      modelArr: [],
      clientX: undefined,
      clientY: undefined,
      elW: undefined,
      elH: undefined,
      elOffsetLeft: undefined,
      elOffsetTop: undefined,
      elScrollTop: undefined,
      couldDragModel: false,
      couldMoveModel: false,
      elIdx: undefined,
      temp: {},
      isTrash: false,
      courseData: [],
      searchData: [],
      courseDetailData: [],
      isCourseShow: false,
      isCourseDetailShow: false,
      isStudentShow: false,
      defaultPic: 'this.src="' + require('@/assets/def_avater.jpg') + '"',
      checkedBox: true,
      selectArr: [],
      showTip: false,
      value1: true,
      searchPanel: false,
      searchWord: '',
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      },
      userInfo: undefined,
      hasUser: false,
      studentList: [],
      toolbarShow: false,
    }
  },
  computed: {
    ...mapState(['classInfo']),
    setSwitchValue () {
        if(this.studentList.every(v => v.isPulishChecked)) {
          return false
        } else {
          return true
        }
      }
  },
  mounted() {
    this.$store.state.isCollapse = true
    this.drawBg()
  },
  created() {
    this.$nextTick(
      this.getUserInfo()
    )
    this.getStudentList()
  },
  watch: {
    reload: function () {
      this.getStudentList()
    },
  },
  methods: {
    changePenColor (e) {
      console.log(e.target)
      this.$store.state.ctx.fillStyle = e.target.closest('.pen').dataset.color
      this.$store.state.ctx.strokeStyle = e.target.closest('.pen').dataset.color
    },
    setClear () {
      this.isEraserActive = true
      this.isCommonPenActive = false
      this.isMagicPenActive = false
      this.isBookListActive = false
      this.isSitActive = false
      this.isRestActive = false
      this.clear = true
      this.panting = true
      this.toolbarShow = false
    },
    closeSourceShow () {
      this.showSource = false
    },
    changeWidth (e) {
      this.lWidth = e.target.value
      console.log(this.lWidth)
    },
    changeColor(e){
      if (e.target.closest('.color-item')) {
        this.$store.state.ctx.fillStyle = e.target.style.backgroundColor
        this.$store.state.ctx.strokeStyle = e.target.style.backgroundColor
        this.removeActive(e.target.parentElement)
        e.target.classList.add('active')
      }
    },
    removeActive (el) {
      for (let v of el.children) {
        v.classList.remove('active')
      }
    },
    getUserInfo () {
      classInfo().then(res => {
        const { userInfo } = res.data
        this.userInfo = userInfo
        this.hasUser = true
      })
    },
    toggleSelection(student) {
      console.log(student.isPulishChecked)
      if (student.isPulishChecked) {
        if (this.selectArr.indexOf(student.sid) === -1) {
          this.selectArr.push(student.sid)
        }
      } else {
        let index = this.selectArr.indexOf(student.sid)
        this.selectArr.splice(index, 1)
      }
    },
    showSearchPanel () {
      this.searchPanel = true
    },
    drawBg() {
      this.$nextTick(() => {
        this.$store.state.canvas = document.querySelector('#bgCanvas')
        this.$store.state.ctx = this.$store.state.canvas.getContext('2d')
        let img = new Image()
        img.setAttribute('crossOrigin', 'Anonymous')
        img.src = require('../../assets/images/board/bg.png')
        img.onload = () => {
          if (img.complete) {
            this.$store.state.canvas.width = img.width
            this.$store.state.canvas.height = img.height

            this.$store.state.ctx.clearRect(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
            this.$store.state.ctx.drawImage(img, 0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
            this.$store.state.canvas.style.width = '100%'

            this.ratioX = document.querySelector('.board').clientWidth / this.$store.state.canvas.width
            this.ratioY = document.querySelector('.board').clientHeight / this.$store.state.canvas.height
            this.$store.state.canvas = document.querySelector('#myCanvas')
            this.$store.state.ctx = this.$store.state.canvas.getContext('2d')
            this.$store.state.canvas.width = img.width
            this.$store.state.canvas.height = img.height
            this.$store.state.ctx.clearRect(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
            this.$store.state.canvas.style.width = '100%'
            this.$store.state.ctx.fillStyle = "#fff"
            this.$store.state.ctx.strokeStyle = "#fff"
          }
        }
        img.onerror = (e) => {
          console.log(e)
        }
      })
    },
    saveData(data) {
      (this.historyDeta.length === 10) && (this.historyDeta.shift())
      this.historyDeta.push(data)
    },
    drawCircle(x, y, radius) {
      this.$store.state.ctx.save()
      this.$store.state.ctx.beginPath()
      this.$store.state.ctx.arc(x, y, radius, 0, Math.PI * 2)
      this.$store.state.ctx.fill()
      if (this.clear) {
        this.$store.state.ctx.clip()
        this.$store.state.ctx.clearRect(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
        this.$store.state.ctx.restore()
      }
    },
    drawLine(x1, y1, x2, y2) {
      this.$store.state.ctx.lineWidth = this.lWidth
      this.$store.state.ctx.lineCap = "round"
      this.$store.state.ctx.lineJoin = "round"
      if (this.clear) {
        this.$store.state.ctx.lineWidth = 60
        this.$store.state.ctx.save()
        this.$store.state.ctx.globalCompositeOperation = "destination-out"
        this.$store.state.ctx.moveTo(x1, y1)
        this.$store.state.ctx.lineTo(x2, y2)
        this.$store.state.ctx.stroke()
        this.$store.state.ctx.closePath()
        this.$store.state.ctx.clip()
        this.$store.state.ctx.clearRect(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
        this.$store.state.ctx.restore()
      } else {
        this.$store.state.ctx.moveTo(x1, y1)
        this.$store.state.ctx.lineTo(x2, y2)
        this.$store.state.ctx.stroke()
        this.$store.state.ctx.closePath()
      }
    },
    handleMouseDown(e) {
      this.toolbarShow = false
      this.firstDot = this.$store.state.ctx.getImageData(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
      this.saveData(this.firstDot)
      this.painting = true
      let x = (e.clientX) / this.ratioX
      let y = (e.clientY) / this.ratioY
      //this.$store.state.ctx.fill()
      if (this.isMagicPenActive) {
        if (this.tempMaxX === undefined) this.tempMaxX = x
        if (this.tempMinX === undefined) this.tempMinX = x
        if (this.tempMaxY === undefined) this.tempMaxY = y
        if (this.tempMinY === undefined) this.tempMinY = y
        if (this.originX === undefined) this.originX = x
        if (this.originY === undefined) this.originY = y
      }
      this.lastPoint = { "x": x, "y": y }
      this.$store.state.ctx.save()
      this.drawCircle(x, y, 0)
    },
    handleMouseMove(e) {
      if (this.painting) {
        let x = (e.clientX) / this.ratioX
        let y = (e.clientY) / this.ratioY
        let newPoint = { "x": x, "y": y }
        this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y, this.clear)
        if (this.isMagicPenActive) {
          if (this.tempMaxY < y) this.tempMaxY = y
          if (this.tempMaxX < x) this.tempMaxX = x
          if (this.tempMinY > y) this.tempMinY = y
          if (this.tempMinX > x) this.tempMinX = x
        }
        this.lastPoint = newPoint
      }
    },
    handleMouseUp(e) {
      this.painting = false
    },
    handleMouseLeave(e) {
      this.painting = false
    },
    handleTouchStart(e) {
      this.toolbarShow = false
      this.firstDot = this.$store.state.ctx.getImageData(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
      this.saveData(this.firstDot)
      this.painting = true
      let x = (e.touches[0].clientX) / this.ratioX
      let y = (e.touches[0].clientY) / this.ratioY
      if (this.clear) {
        this.left = e.touches[0].clientX + 'px'
        this.top = e.touches[0].clientY + 'px'
      }
      if (this.isMagicPenActive) {
        if (this.tempMaxX === undefined) this.tempMaxX = x
        if (this.tempMinX === undefined) this.tempMinX = x
        if (this.tempMaxY === undefined) this.tempMaxY = y
        if (this.tempMinY === undefined) this.tempMinY = y
        if (this.originX === undefined) this.originX = x
        if (this.originY === undefined) this.originY = y
      }
      this.lastPoint = { "x": x, "y": y }
      this.$store.state.ctx.save()
      this.drawCircle(x, y, 0)
    },
    handleTouchMove(e) {
      if (this.clear) {
        this.left = e.touches[0].clientX + 'px'
        this.top = e.touches[0].clientY + 'px'
      }
      if (this.painting) {
        let x = (e.touches[0].clientX) / this.ratioX
        let y = (e.touches[0].clientY) / this.ratioY
        let newPoint = { "x": x, "y": y }
        this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y)
        if (this.isMagicPenActive) {
          if (this.tempMaxY < y) this.tempMaxY = y
          if (this.tempMaxX < x) this.tempMaxX = x
          if (this.tempMinY > y) this.tempMinY = y
          if (this.tempMinX > x) this.tempMinX = x
        }
        this.lastPoint = newPoint
      }
    },
    handleTouchEnd(e) {
      this.painting = false
      if (this.clear) {
        this.left = '95%'
        this.top = '95%'
      }
    },
    switchTool(e) {
      let type = e.target.closest('.btn').dataset.type
      switch (type) {
        case '1':
          //普通画图，不做处理
          this.isCommonPenActive = true
          this.isMagicPenActive = false
          this.isEraserActive = false
          this.isBookListActive = false
          this.isSitActive = false
          this.isRestActive = false
          this.clear = false
          this.panting = true
          this.toolbarShow = true
          break
        case '2':
          //需要上传图片获取模型
          this.isMagicPenActive = true
          this.isCommonPenActive = false
          this.isEraserActive = false
          this.isBookListActive = false
          this.isSitActive = false
          this.isRestActive = false
          this.clear = false
          this.panting = true
          this.toolbarShow = true
          break
        case '3':
          this.isEraserActive = true
          this.isCommonPenActive = false
          this.isMagicPenActive = false
          this.isBookListActive = false
          this.isSitActive = false
          this.isRestActive = false
          this.clear = true
          this.panting = true
          this.toolbarShow = false
          break
        case '4':
          this.isBookListActive = true
          this.isCommonPenActive = false
          this.isMagicPenActive = false
          this.isEraserActive = false
          this.isSitActive = false
          this.isRestActive = false
          this.clear = false
          this.panting = false
          this.toolbarShow = false
          break
        case '5':
          this.isSitActive = true
          this.isCommonPenActive = false
          this.isMagicPenActive = false
          this.isEraserActive = false
          this.isBookListActive = false
          this.isRestActive = false
          this.clear = false
          this.panting = false
          this.toolbarShow = false
          break
        case '6':
          this.isRestActive = true
          this.isCommonPenActive = false
          this.isMagicPenActive = false
          this.isEraserActive = false
          this.isBookListActive = false
          this.isSitActive = false
          this.clear = false
          this.panting = false
          this.$store.state.ctx.clearRect(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
          this.toolbarShow = false
          break
      }
    },
    getBase64Image(context, x1, y1, x2, y2) {
      var dataImg = context.getImageData(x2, y2, Math.abs(x1 - x2), Math.abs(y1 - y2))
      var canvas2 = document.createElement("canvas")
      var context2 = canvas2.getContext("2d")
      var width = Math.abs(x1 - x2)
      var height = Math.abs(y1 - y2)
      canvas2.width = width
      canvas2.height = height
      context2.putImageData(dataImg, 0, 0, 0, 0, width, height)
      var res = canvas2.toDataURL('image/png')
      return res
    },
    getModel() {
      this.$store.state.ctx.save()
      this.$store.state.ctx.rect(this.tempMinX, this.tempMinY, Math.abs(this.tempMaxX - this.tempMinX), Math.abs(this.tempMaxY - this.tempMinY))
      this.$store.state.ctx.clip()
      let img = this.getBase64Image(this.$store.state.ctx, this.tempMaxX, this.tempMaxY, this.tempMinX, this.tempMinY)
      this.$store.state.ctx.restore()
      this.sendImgToBackend(img, 'http://192.168.8.123/api/images/search', this)
    },
    sendImgToBackend(img, url, vm) {
      let data = { imgBase64: img }
      axios.post('https://api.vrbook.vip/api/images/search',data).then(res => {
        if (Object.keys(res.data.data).length !== 0) {
          vm.modelArr.push({
            url: res.data.data.purl,
            w: Math.abs(vm.tempMaxX - vm.tempMinX) + 'px',
            h: Math.abs(vm.tempMaxY - vm.tempMinY) + 50 + 'px',
            t: vm.tempMinY + 'px',
            l: vm.tempMinY + 'px',
            mid: res.data.data.vrbookPid
          })
        } else {
          vm.$message.info('神物走丢了，请反馈管理员找回')
        }
        vm.$store.state.ctx.clearRect(vm.tempMinX - 20, vm.tempMinY - 20, Math.abs(vm.tempMaxX - vm.tempMinX) + 50, Math.abs(vm.tempMaxY - vm.tempMinY) + 50)
        vm.tempMaxX = undefined
        vm.tempMaxY = undefined
        vm.tempMinX = undefined
        vm.tempMinY = undefined
        vm.originX = undefined
        vm.originY = undefined
      })
    },
    closeModel(e) {
      let idx = e.target.closest('.close-btn').dataset.index
      this.modelArr.splice(idx, 1)
    },
    closeCourseList () {
      this.isCourseShow = false
    },
    setToFullScreen (e) {
      //e.target.closest('.course-container').requestFullscreen()
      this.isFull = true
    },
    setToFullScreen2 (e) {
      this.isDetailFull = true
    },
    exitFullScreen (e) {
      //document.exitFullscreen()
      this.isFull = false
    },
    exitFullScreen2 (e) {
      //document.exitFullscreen()
      this.isDetailFull = false
    },
    setToFullScreen3 (e) {
      this.isSearchFull = true
    },
    exitFullScreen3 (e) {
      this.isSearchFull = false
    },
    closeSearchPanel () {
      this.searchPanel = false
    },
    startSearchSources () {
      searchSources({title: this.searchWord}).then(res => {
        while(this.searchData.length > 0) {
          this.searchData.pop()
        }
        if (res.data.length > 0) {
          console.log(res.data)
          res.data.map(v => {
            let data = {}
            switch(v.type) {
              case 1:
                //图片
                v.imageArr.map((val, index) => {
                  data = {}
                  data.name = v.name
                  data.modelId = v.model_id
                  data.coverImg = v.coverImg
                  data.type = 1
                  data.id = v.id + '-' + index
                  data.uri = val
                  data.created_at = v.created_at
                  this.searchData.push(data)
                })

                break
              case 2:
                //动图
                data.id = v.id
                data.name = v.name
                data.uri = v.materialPath
                data.modelId = v.model_id
                data.coverImg = v.coverImg
                data.type = 1
                data.created_at = v.created_at
                this.searchData.push(data)
                break
              case 3:
                //音频
                data.id = v.id
                data.name = v.name
                data.uri = v.materialPath
                data.modelId = v.model_id
                data.coverImg = v.coverImg
                data.type = 2
                data.created_at = v.created_at
                this.searchData.push(data)
                break
              case 4:
                //视频
                data.id = v.id
                data.name = v.name
                data.uri = v.materialPath
                data.modelId = v.model_id
                data.coverImg = v.coverImg
                data.type = 3
                data.created_at = v.created_at
                this.searchData.push(data)
                break
              case 5:
                //模型
                data.id = v.id
                data.name = v.name
                data.uri = v.materialPath
                data.modelId = v.model_id
                data.coverImg = ''
                data.type = 4
                data.created_at = v.created_at
                this.searchData.push(data)
                break
            }
          })
        } else {
            this.isSearch = true
        }
        this.searchWord = ''
      })
    },
    closeCourseDetail () {
      this.isCourseDetailShow = false
    },
    closeStudentList () {
      this.isStudentShow = false
    },
    allSelect (val) {
      if (!val) {
        this.studentList.map(v => {
          v.isPulishChecked = true
        })
      } else {
        this.studentList.map(v => {
          v.isPulishChecked = false
        })
      }
      this.updateSelect()
      console.log(this.selectArr)
    },
    updateSelect() {
      this.studentList.map(v => {
       if (v.isPulishChecked && this.selectArr.indexOf(v.sid) === -1) {
         this.selectArr.push(v.sid)
       } else if(!v.isPulishChecked) {
         let idx = this.selectArr.indexOf(v.sid)
         if (idx !== -1) {
           this.selectArr.splice(idx, 1)
         }
       }
      })
    },
    openDetail(id) {
        courseWareDetail(id).then((res) => {
          const { data } = res
          this.courseDetailData = data
          console.log(this.courseDetailData)
          this.isCourseDetailShow = true
        })
    },
    examineSource(source) {
      this.whichSource = source
      this.showSource = true
    },
    handleModelMouseDown(e) {
      if (e.target.classList.contains('model-container')) {
        this.clientX = e.clientX
        this.clientY = e.clientY
        this.elW = e.target.clientWidth
        this.elH = e.target.clientHeight
        this.elOffsetLeft = e.target.offsetLeft
        this.elOffsetTop = e.target.offsetTop
        this.elScrollTop = e.target.scrollTop
        this.elIdx = e.target.firstElementChild.dataset.index
        e.target.style.userSelect = 'none'
        if (e.clientX > e.target.offsetLeft + e.target.clientWidth - 10) {
          e.target.style.cursor = 'w-resize'
          this.couldDragModel = true
        } else if (e.target.scrollTop + e.clientY > e.target.offsetTop + e.target.clientHeight - 10) {
          e.target.style.cursor = 's-resize'
          this.couldDragModel = true
        } else if (e.target.scrollTop + e.clientY < e.target.offsetTop + e.target.clientHeight - 10 || e.target.offsetLeft + 10 > e.clientX) {
          this.couldMoveModel = true
          this.temp = {
            t: this.modelArr[this.elIdx].t,
            l: this.modelArr[this.elIdx].l
          }
        }
      }
    },
    handleModelTouchStart (e) {
      if (e.target.classList.contains('model-container')) {
        this.clientX = e.touches[0].clientX
        this.clientY = e.touches[0].clientY
        this.elW = e.target.clientWidth
        this.elH = e.target.clientHeight
        this.elOffsetLeft = e.target.offsetLeft
        this.elOffsetTop = e.target.offsetTop
        this.elScrollTop = e.target.scrollTop
        this.elIdx = e.target.firstElementChild.dataset.index
        e.target.style.userSelect = 'none'
        if (e.touches[0].clientX > e.target.offsetLeft + e.target.clientWidth - 10) {
          e.target.style.cursor = 'w-resize'
          this.couldDragModel = true
        } else if (e.target.scrollTop + e.touches[0].clientY > e.target.offsetTop + e.target.clientHeight - 10) {
          e.target.style.cursor = 's-resize'
          this.couldDragModel = true
        } else if (e.target.scrollTop + e.touches[0].clientY < e.target.offsetTop + e.target.clientHeight - 10 || e.target.offsetLeft + 10 > e.touches[0].clientX) {
          this.couldMoveModel = true
          this.temp = {
            t: this.modelArr[this.elIdx].t,
            l: this.modelArr[this.elIdx].l
          }
        }
      }
    },
    handleModelMouseMove(e) {
      // e.preventDefault()
      // e.stopPropagation()
      if (this.couldDragModel) {
        //右侧鼠标拖拽位置

        if (this.clientX > this.elOffsetLeft + this.elW - 10 && this.clientX < this.elOffsetLeft + this.elW) {

          //往左拖拽

          if (this.clientX > e.clientX) {
            this.modelArr[this.elIdx].w = this.elW - (this.clientX - e.clientX) + 'px'
          }

          //往右拖拽

          if (this.clientX < e.clientX) {

            this.modelArr[this.elIdx].w = this.elW + (e.clientX - this.clientX) + 'px'

          }

        }

        //底部鼠标拖拽位置

        if (this.elScrollTop + this.clientY > this.elOffsetTop + this.elH - 20 && this.elScrollTop + this.clientY < this.elOffsetTop + this.elH) {

          //往上拖拽

          if (this.clientY > e.clientY) {
            this.modelArr[this.elIdx].h = this.elH - (this.clientY - e.clientY) + 'px'
          }

          //往下拖拽

          if (this.clientY < e.clientY) {

            this.modelArr[this.elIdx].h = this.elH + (e.clientY - this.clientY) + 'px'

          }

        }
      }

      if (this.couldMoveModel) {
        let diffX = e.clientX - this.clientX,
          diffY = e.clientY - this.clientY
        this.modelArr[this.elIdx].t = parseInt(this.temp.t.slice(0, this.temp.t.length - 2)) + diffY + 'px'
        this.modelArr[this.elIdx].l = parseInt(this.temp.l.slice(0, this.temp.l.length - 2)) + diffX + 'px'
        this.isHit(e.target, this.$refs.trash)
        if (this.isStudentShow) {
          if (this.impact(e.target, this.$refs.studentContainer)) {
            if (this.selectArr.length !== 0) {
              this.showTip = true
            } else {
              this.showTip = false
            }
          } else {
            this.showTip = false
          }
        }
      }
    },
    handleModelTouchMove (e) {
      // e.preventDefault()
      // e.stopPropagation()
      if (this.couldDragModel) {
        //右侧鼠标拖拽位置

        if (this.clientX > this.elOffsetLeft + this.elW - 10 && this.clientX < this.elOffsetLeft + this.elW) {

          //往左拖拽

          if (this.clientX > e.touches[0].clientX) {
            this.modelArr[this.elIdx].w = this.elW - (this.clientX - e.touches[0].clientX) + 'px'
          }

          //往右拖拽

          if (this.clientX < e.touches[0].clientX) {

            this.modelArr[this.elIdx].w = this.elW + (e.touches[0].clientX - this.clientX) + 'px'

          }

        }

        //底部鼠标拖拽位置

        if (this.elScrollTop + this.clientY > this.elOffsetTop + this.elH - 20 && this.elScrollTop + this.clientY < this.elOffsetTop + this.elH) {

          //往上拖拽

          if (this.clientY > e.touches[0].clientY) {
            this.modelArr[this.elIdx].h = this.elH - (this.clientY - e.touches[0].clientY) + 'px'
          }

          //往下拖拽

          if (this.clientY < e.touches[0].clientY) {

            this.modelArr[this.elIdx].h = this.elH + (e.touches[0].clientY - this.clientY) + 'px'

          }

        }
      }

      if (this.couldMoveModel) {
        let diffX = e.touches[0].clientX - this.clientX,
          diffY = e.touches[0].clientY - this.clientY
        this.modelArr[this.elIdx].t = parseInt(this.temp.t.slice(0, this.temp.t.length - 2)) + diffY + 'px'
        this.modelArr[this.elIdx].l = parseInt(this.temp.l.slice(0, this.temp.l.length - 2)) + diffX + 'px'
        this.isHit(e.target, this.$refs.trash)
        if (this.isStudentShow) {
          if (this.impact(e.target, this.$refs.studentContainer)) {
            if (this.selectArr.length !== 0) {
              this.showTip = true
            } else {
              this.showTip = false
            }
          }else {
            this.showTip = false
          }
        }
      }
    },
    handleModelMouseUp(e) {
      if (e.target.closest('.model-container')) {
        e.target.closest('.model-container').style.cursor = 'pointer'
        if ( this.isHit(e.target, this.$refs.trash)) {
          this.modelArr.splice(this.elIdx,1)
          this.isTrash = false
          this.$refs.trash.style.backgroundColor = '#fff'
        }

        if (this.showTip) {
          let mid = e.target.closest('.model-container').getAttribute('mid')
          let data = {
            exeType: 1,
            model_ids: [mid],
            sid_arr: this.selectArr
          }
          classExerciseAdd(data).then(res => {
           this.$message.success('发布成功')
            while(this.selectArr.length) {
             this.selectArr.pop()
            }
            this.studentList.map(v => {
              v.isPulishChecked = false
            })
            this.showTip = false
          })
        }
      }
      this.clientX = undefined
      this.clientY = undefined
      this.elW = undefined
      this.elH = undefined
      this.elOffsetLeft = undefined
      this.elOffsetTop = undefined
      this.elScrollTop = undefined
      this.couldDragModel = false
      this.couldMoveModel = false
      this.elIdx = undefined
      this.temp = {}
    },
    handleModelTouchEnd (e) {
      if (e.target.closest('.model-container')) {
        e.target.closest('.model-container').style.cursor = 'pointer'
        if ( this.isHit(e.target, this.$refs.trash)) {
          this.modelArr.splice(this.elIdx,1)
          this.isTrash = false
          this.$refs.trash.style.backgroundColor = '#fff'
        }

        if (this.showTip) {
          let mid = e.target.closest('.model-container').getAttribute('mid')
          let data = {
            exeType: 1,
            model_ids: [mid],
            sid_arr: this.selectArr
          }
          classExerciseAdd(data).then(res => {
            this.$message.success('发布成功')
            while(this.selectArr.length) {
              this.selectArr.pop()
            }
            this.studentList.map(v => {
              v.isPulishChecked = false
            })
            this.showTip = false
          })
        }

      }
      this.clientX = undefined
      this.clientY = undefined
      this.elW = undefined
      this.elH = undefined
      this.elOffsetLeft = undefined
      this.elOffsetTop = undefined
      this.elScrollTop = undefined
      this.couldDragModel = false
      this.couldMoveModel = false
      this.elIdx = undefined
      this.temp = {}
    },
    isHit(set, el) {
      //获取移动视图的  左  右  上  下  的位置
      let moveL = set.offsetLeft
      let moveR = set.offsetLeft + set.offsetWidth
      let moveT = set.offsetTop
      let moveX = set.offsetTop + set.offsetHeight

      //获取被撞视图的 左  右  上  下  位置
      let hitL = el.offsetLeft
      let hitR = el.offsetLeft + el.offsetWidth
      let hitT = el.offsetTop
      let hitX = el.offsetTop + el.offsetHeight

      //定义检测是否碰撞的条件
      let p1 = moveR >= hitL
      let p2 = moveL <= hitR
      let p3 = moveT <= hitX
      let p4 = moveX >= hitT

      if (p1 && p2 && p3 && p4) {
        this.isTrash = true
        el.style.backgroundColor = 'transparent'
        return true
      } else {
        this.isTrash = false
        el.style.backgroundColor = '#fff'
        return false
      }
    },
    impact(obj, dobj) {
      var boxMes = obj.getBoundingClientRect();
      var blueMes = dobj.getBoundingClientRect();

      if ( boxMes.bottom < blueMes.top || boxMes.left > blueMes.right || boxMes.top > blueMes.bottom || boxMes.right < blueMes.left) {
        return false;
      } else {
        return true;
      }
    },
    getDefaultStyle(obj, attribute) {
      return parseInt(obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj, false)[attribute]);
    },
    toManageMode () {
      this.$router.push('/classroom')
    },
    getCourseList () {
      const pageInfo = {
        limit: 10,
        page: 1,
      }
      courseWareList(pageInfo).then((res) => {
        const { data } = res.data
        this.courseData = data
      })
      this.isCourseShow = true
    },
    getStudent () {
      this.isStudentShow = true
      console.log(this.$store.state.studentList)
    },
    // 获取学生列表
    async getStudentList() {
      let info = {
        classId: this.classInfo.class_id,
        classType: 1,
      }
      await studentName(info).then((res) => {
        const { student } = res.data
        this.studentList = this.setList(student)
      })
    },
    // 数据处理
    setList(data, checked = false, boardChecked = false) {
      const result = data.map((item) => {
        return {
          ...item,
          isChecked: checked,
          isPulishChecked: boardChecked
        }
      })
      return result
    },
  }
}
</script>

<style lang='sass' scoped>
.board
  width: 100%
  height: 100%
  position: relative
  .canvas-bottom
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
  .canvas
    width: 100%
    height: 100%
    cursor: crosshair
    position: absolute
    top: 0
    left: 0
  .clearP
    cursor: url(../../assets/images/board/eraser-cursor.png), crosshair
  .commonP
    cursor: url(../../assets/images/board/pen-cursor.png), crosshair
  .magicP
    cursor: url(../../assets/images/board/magic-cursor.png), crosshair
  .tools
    position: absolute
    bottom: 53px
    left: 50%
    transform: translate(-50%, 0)
    height: 45px
    width: 555px
    display: flex
    justify-content: space-between
    align-items: center
    .btn
      width: 45px
      height: 45px
      border-radius: 50%
      background: radial-gradient(circle, #ECECEC 0%, #FFFFFF 100%)
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
    .active
      background: linear-gradient(0deg, #07A4F3 0%, #38FCC4 100%)
  .color-and-size
    position: absolute
    bottom: 105px
    left: 50%
    transform: translate(-50%, 0)
    height: 45px
    width: 800px
    display: flex
    justify-content: space-between
    align-items: center
    color: #fff
    .color_panel
      flex: 1
      display: flex
      justify-content: space-around
      align-items: center
      height: 100%
      .color-item
        width: 30px
        height: 30px
        border-radius: 50%
        box-sizing: border-box
        border: 3px solid white
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2)
        cursor: pointer
        transition: 0.3s
      .active
        box-shadow: 0 0 15px #00CCFF
    #range-wrap
      flex: 1
      display: flex
      justify-content: center
      align-items: center
  .trash
    width: 45px
    height: 45px
    background: #FFFFFF
    border-radius: 5px
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    bottom: 53px
    right: 47px
    cursor: pointer
    z-index: 9999
  .sidebar
    position: absolute
    top: 25px
    right: 25px
    width: 45px
    height: 240px
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    .side-item
      width: 45px
      height: 45px
      border-radius: 50%
      display: flex
      justify-content: center
      align-items: center
      background: #fff
      cursor: pointer
      .auto
        width: 100%
        height: auto
  .model-container
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)
    background-size: cover
    background-repeat: no-repeat
    border-radius: 10px
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    z-index: 999
    embed
      width: 90%
      height: 90%
      border: 0
    .close-btn
      position: absolute
      right: 0
      top: 0
      transform: translate(50%,-50%)
      width: 30px
      height: 30px
      cursor: pointer
      img
        width: 100%
        height: auto
  .course-container
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)
    background-size: cover
    background-repeat: no-repeat
    border-radius: 10px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    width: 60vw
    height: 60vh
    .all-select
      position: absolute
      top: 1%
      right: 6%
    .list-container
      width: 100%
      height: 90%
      margin-top: 20px
      border-radius: 10px
      overflow: scroll
      display: flex
      justify-content: space-between
      align-content: space-between
      flex-wrap: wrap
      .sources-contaniner
        width: 100%
        height: 90%
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        align-content: space-between
        overflow-y: scroll
      .tip-panel
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        color: #796bb2
        font-size: 25px
      .student_card
        width: calc(15% - 20px)
        margin: 10px 0.5rem
        border: 1px solid #ebeef5
        .student_content
          position: relative
          padding: 0.25rem
          height: 100%
          z-index: 1
          .student_status
            position: absolute
            margin: 0
          .student_avatar
              width: 100%
              display: flex
              flex-direction: column
              justify-content: center
              align-items: center
              .avater
                width: 100%
                padding-bottom: 100%
                overflow: hidden
                height: 0
                cursor: pointer
                position: relative
                img
                  width: 100%
              span
                color: #636262
                font-size: 14px
                min-height: 2rem
                display: flex
                justify-content: center
                align-items: center
          .student_check
            position: absolute
            width: 100%
            height: 100%
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
            background: rgb(0, 0, 0, 0.1)
    .search-container
      width: 95%
    .close-btn
      position: absolute
      right: 10px
      top: 0
      width: 30px
      height: 30px
      cursor: pointer
      img
        width: 100%
        height: auto
    .maximum-btn
      position: absolute
      right: 45px
      top: 0
      width: 30px
      height: 30px
      cursor: pointer
      img
        width: 100%
        height: auto
    .minimum-btn
      position: absolute
      right: 85px
      top: 0
      width: 30px
      height: 30px
      cursor: pointer
      img
        width: 100%
        height: auto
  .send
    background-image: radial-gradient(circle at top right, transparent 20px, #fbc2eb 0 ,#a6c1ee 100%)
  .course-detail-container
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)
    background-size: cover
    background-repeat: no-repeat
    border-radius: 10px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    width: 60vw
    height: 60vh
    .detail-container
      width: 100%
      height: 90%
      margin-top: 20px
      border-radius: 10px
      overflow-y: scroll
    .close-btn
      position: absolute
      right: 10px
      top: 0
      width: 30px
      height: 30px
      cursor: pointer
      img
        width: 100%
        height: auto
    .maximum-btn
      position: absolute
      right: 45px
      top: 0
      width: 30px
      height: 30px
      cursor: pointer
      img
        width: 100%
        height: auto
    .minimum-btn
      position: absolute
      right: 85px
      top: 0
      width: 30px
      height: 30px
      cursor: pointer
      img
        width: 100%
        height: auto
  .fullscreen
    width: 100%
    height: 100%
    z-index: 10000
  .fulldetailscreen
    width: 100%
    height: 100%
    z-index: 10000
  .searchFullScreen
    width: 100%
    height: 100%
    z-index: 10000
  .pen
    width: 10%
    position: absolute
    left: 6%
    bottom: 0.5%
    cursor: pointer
    img
      width: 100%
      height: auto
  .pen2
    left: 20%
    width: 7%
  .pen3
    left: 28%
    width: 6%
    bottom: .5%
  .pen4
    left: 80%
    width: 6%
  .hbc
    width: 10%
    position: absolute
    right: 3%
    bottom: 0.5%
    cursor: pointer
    img
      width: 100%
      height: auto
  .mobile-hbc
    position: absolute
    width: 86px
    height: 60px
    transform: translate(-50%,-50%)
    img
      width: 100%
      height: auto
</style>