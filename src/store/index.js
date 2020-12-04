import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        classInfo: {},
        teacherInfo: {},
        isCollapse: false,
        isFooter: true
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
        }
    }
})
