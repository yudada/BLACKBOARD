import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    classInfo: {},
    teacherInfo: {},
    isCollapse: false,
    isFooter: true,
    tagAllList: [],
    studentList: [],
    studentIndexs: [],
    tagAddList: [],
    tagMinusList: [],
    markList: [],
    rewardsDialog: false,
    reload: false,
    handUPDialog: false,
    checkedBox: false,
    groupNum: '',
    isGroup: false,
    groupNumChange: false,
    groupArr: [],
    pageCache: [],
    upImgURL: '',
    manageMode: true,
    canvas: undefined,
    ctx: undefined
  },
  mutations: {
    setTeacherInfo: function (state, data) {
      state.teacherInfo = data
    },
    setClassInfo: function (state, data) {
      state.classInfo = data
    },
    setCollapse: function (state, data) {
      state.isCollapse = data
    },
    setFooter: function (state, data) {
      state.isFooter = data
    },
    setTagAllList: function (state, data) {
      state.tagAllList = data
    },
    setStudentList: function (state, data) {
      state.studentList = data
    },
    setStudentIndexs: function (state, data) {
      state.studentIndexs = data
    },
    setTagAddList: function (state, data) {
      state.tagAddList = data
    },
    setTagMinusList: function (state, data) {
      state.tagMinusList = data
    },
    setMarkList: function (state, data) {
      state.markList = data
    },
    setRewardsDialog: function (state, data) {
      state.rewardsDialog = data
    },
    setHandUPDialog: function (state, data) {
      state.handUPDialog = data
    },
    setCheckedBox: function (state, data) {
      state.checkedBox = data
    },
    setReload: function (state) {
      state.reload = !state.reload
    },
    setGroupNum: function (state, data) {
      state.groupNum = data
    },
    setGroupNumChange: function (state, data) {
      state.groupNumChange = data
    },
    setIsGroup: function (state, data) {
      state.isGroup = data
    },
    setGroupArr: function (state, data) {
      state.groupArr = data
    },
    addPageCache(state, obj) {//??????????????????
      let isTrue = state.pageCache.some((cur, index, arr) => {
        return cur['nameE'] && cur['nameE'] == obj['nameE'];//??????????????????
      })
      if (isTrue) return;
      state.pageCache.push({
        nameE: obj.nameE,
        nameZh: obj.nameZh
      })
    },
    removePageCache(state, obj) {//??????????????????
      var pageCache = state.pageCache.filter((cur, index, arr) => {
        if (cur['nameE'] && cur['nameE'] != obj['nameE']) {
          return cur;
        }
      })
      if (pageCache.length != state.pageCache.length) {//????????????
        state.pageCache = pageCache;
        if (pageCache.length > 0) {//????????????tagview?????????
          // obj.router.go(-1);
        }
      }

    },
    changeMode(state, payload) {
        state.manageMode  = payload
    }
  }
})
