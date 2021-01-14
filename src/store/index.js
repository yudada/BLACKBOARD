import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
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
        handUPDialog:false,
        checkedBox: false,
        groupNum: 5,
        groupNumChange: false
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
        setCheckedBox: function (state,data) {
            state.checkedBox = data
        },
        setReload: function (state) {
            state.reload = !state.reload
        },
        setGroupNum: function (state, data) {
            state.groupNum = data
            state.groupNumChange = !state.groupNumChange
        }
    }
})
