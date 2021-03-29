<template>
    <div class='board'>
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
        <div class='btn' :class='{active: isBookListActive}' data-type='4'>
          <el-tooltip content="课件列表" placement="top" effect="light">
            <img v-if='!isBookListActive' src='../../assets/images/board/ppt.png' />
            <img v-else src='../../assets/images/board/ppt-active.png' />
          </el-tooltip>
        </div>
        <div class='btn' :class='{active: isSitActive}' data-type='5'>
          <el-tooltip content="学生座位" placement="top" effect="light">
            <img v-if='!isSitActive' src='../../assets/images/board/sit.png' />
            <img v-else src='../../assets/images/board/sit-active.png' />
          </el-tooltip>
        </div>
        <div class='btn' :class='{active: isRestActive}' data-type='6'>
          <el-tooltip content="清理黑板" placement="top" effect="light">
            <img v-if='!isRestActive' src='../../assets/images/board/trash.png' />
            <img v-else src='../../assets/images/board/trash-active.png' />
          </el-tooltip>
        </div>
      </div>
      <div class='trash'>
        <el-tooltip content="垃圾桶" placement="top" effect="light">
          <img src='../../assets/images/board/trash.png'>
        </el-tooltip>
      </div>
      <div class='sidebar'>
        <div class='side-item'>
          <img class='auto' src='../../assets/images/board/avatar1.png' />
        </div>
        <div class='side-item'>
          <el-tooltip content="切换管理模式" placement="left" effect="light">
            <img src='../../assets/images/board/mode.png' />
          </el-tooltip>
        </div>
        <div class='side-item'>
          <el-tooltip content="搜索" placement="left" effect="light">
            <img src='../../assets/images/board/search.png' />
          </el-tooltip>
        </div>
        <div class='side-item' v-if='isMagicPenActive' @click='getModel'>
          <el-tooltip content="检索模型" placement="left" effect="light">
            <img src='../../assets/images/board/search.png' />
          </el-tooltip>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'blackBoard',
  data () {
    return {
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
      lastPoint: {x: undefined, y: undefined},
      ratioX: undefined,
      ratioY: undefined,
      isCommonPenActive: true,
      isMagicPenActive: false,
      isEraserActive: false,
      isBookListActive: false,
      isSitActive: false,
      isRestActive: false
    }
  },
  mounted() {
    this.$store.state.isCollapse = true
    this.drawBg()
  },
  methods: {
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

            this.$store.state.ctx.clearRect(0,0,this.$store.state.canvas.width,this.$store.state.canvas.height)
            this.$store.state.ctx.drawImage(img,0,0,this.$store.state.canvas.width,this.$store.state.canvas.height)
            this.$store.state.canvas.style.width = '100%'

            this.ratioX = document.querySelector('.board').clientWidth / this.$store.state.canvas.width
            this.ratioY = document.querySelector('.board').clientHeight / this.$store.state.canvas.height
            this.$store.state.canvas = document.querySelector('#myCanvas')
            this.$store.state.ctx = this.$store.state.canvas.getContext('2d')
            this.$store.state.canvas.width = img.width
            this.$store.state.canvas.height = img.height
            this.$store.state.ctx.clearRect(0,0,this.$store.state.canvas.width,this.$store.state.canvas.height)
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
    saveData (data) {
      (this.historyDeta.length === 10) && (this.historyDeta.shift())
      this.historyDeta.push(data)
    },
    drawCircle(x, y, radius) {
      this.$store.state.ctx.save();
      this.$store.state.ctx.beginPath();
      this.$store.state.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.$store.state.ctx.fill();
      if (this.clear) {
        this.$store.state.ctx.clip();
        this.$store.state.ctx.clearRect(0,0,this.$store.state.canvas.width,this.$store.state.canvas.height);
        this.$store.state.ctx.restore();
      }
    },
    drawLine(x1, y1, x2, y2) {
      this.$store.state.ctx.lineWidth = this.lWidth;
      this.$store.state.ctx.lineCap = "round";
      this.$store.state.ctx.lineJoin = "round";
      if (this.clear) {
        this.$store.state.ctx.lineWidth = 20
        this.$store.state.ctx.save();
        this.$store.state.ctx.globalCompositeOperation = "destination-out";
        this.$store.state.ctx.moveTo(x1, y1);
        this.$store.state.ctx.lineTo(x2, y2);
        this.$store.state.ctx.stroke();
        this.$store.state.ctx.closePath();
        this.$store.state.ctx.clip();
        this.$store.state.ctx.clearRect(0,0,this.$store.state.canvas.width,this.$store.state.canvas.height);
        this.$store.state.ctx.restore();
      }else{
        this.$store.state.ctx.moveTo(x1, y1);
        this.$store.state.ctx.lineTo(x2, y2);
        this.$store.state.ctx.stroke();
        this.$store.state.ctx.closePath();
      }
    },
    handleMouseDown (e) {
      this.firstDot = this.$store.state.ctx.getImageData(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
      this.saveData(this.firstDot)
      this.painting = true
      let x = (e.clientX) / this.ratioX
      let y = (e.clientY) / this.ratioY
      this.$store.state.ctx.fill()
      if (this.tempMaxX === undefined) this.tempMaxX = x
      if (this.tempMinX === undefined) this.tempMinX = x
      if (this.tempMaxY === undefined) this.tempMaxY = y
      if (this.tempMinY === undefined) this.tempMinY = y
      if (this.originX === undefined) this.originX = x
      if (this.originY === undefined) this.originY = y
      this.lastPoint = {"x": x, "y": y};
      this.$store.state.ctx.save();
      this.drawCircle(x, y, 0);
    },
    handleMouseMove (e) {
      if (this.painting) {
        let x = (e.clientX) / this.ratioX
        let y = (e.clientY) / this.ratioY
        let newPoint = {"x": x, "y": y};
        this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y,this.clear);
        if (this.tempMaxY < y) this.tempMaxY = y
        if (this.tempMaxX < x) this.tempMaxX = x
        if (this.tempMinY > y) this.tempMinY = y
        if (this.tempMinX > x) this.tempMinX = x
        this.lastPoint = newPoint;
      }
    },
    handleMouseUp (e) {
      this.painting = false;
    },
    handleMouseLeave (e) {
      this.painting = false;
    },
    handleTouchStart (e) {
      this.firstDot = this.$store.state.ctx.getImageData(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height)
      this.saveData(this.firstDot);
      this.painting = true;
      let x = (e.touches[0].clientX) / this.ratioX
      let y = (e.touches[0].clientX) / this.ratioY
      if (this.tempMaxX === undefined) this.tempMaxX = x
      if (this.tempMinX === undefined) this.tempMinX = x
      if (this.tempMaxY === undefined) this.tempMaxY = y
      if (this.tempMinY === undefined) this.tempMinY = y
      if (this.originX === undefined) this.originX = x
      if (this.originY === undefined) this.originY = y
      this.lastPoint = {"x": x, "y": y};
      this.$store.state.ctx.save();
      this.drawCircle(x, y, 0);
    },
    handleTouchMove (e) {
      if (this.painting) {
        let x = (e.touches[0].clientX) / this.ratioX
        let y = (e.touches[0].clientX) / this.ratioY
        let newPoint = {"x": x, "y": y};
        this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y);
        if (this.tempMaxY < y) this.tempMaxY = y
        if (this.tempMaxX < x) this.tempMaxX = x
        if (this.tempMinY > y) this.tempMinY = y
        if (this.tempMinX > x) this.tempMinX = x
        this.lastPoint = newPoint;
      }
    },
    handleTouchEnd (e) {
      this.painting = false;
    },
    switchTool (e) {
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
          this.$store.state.ctx.clearRect(0, 0, this.$store.state.canvas.width, this.$store.state.canvas.height);
          break
      }
    },
    getBase64Image(context, x1, y1, x2, y2) {
      var dataImg = context.getImageData(x2, y2, Math.abs(x1 - x2), Math.abs(y1 - y2))
      var canvas2 = document.createElement("canvas");
      var context2 = canvas2.getContext("2d");
      var width = Math.abs(x1 - x2);
      var height = Math.abs(y1 - y2);
      canvas2.width = width;
      canvas2.height = height;
      context2.putImageData(dataImg, 0, 0, 0, 0, width, height);
      var res = canvas2.toDataURL('image/png');
      return res;
    },
    getModel () {
      this.$store.state.ctx.save()
      this.$store.state.ctx.rect(this.tempMinX,this.tempMinY,Math.abs(this.tempMaxX - this.tempMinX),Math.abs(this.tempMaxY - this.tempMinY))
      this.$store.state.ctx.clip()
      let img = this.getBase64Image(this.$store.state.ctx, this.tempMaxX, this.tempMaxY, this.tempMinX, this.tempMinY)
      let saveA = document.createElement("a");
      document.body.appendChild(saveA);
      saveA.href = img;
      this.$store.state.ctx.restore()
      this.sendImgToBackend(img, 'http://192.168.8.123/api/images/search', this)
    },
    sendImgToBackend(img, url, vm) {
      fetch(url,{
        body: JSON.stringify({imgBase64: img}),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          let iframeEl = document.createElement('embed')
          iframeEl.src = json.data.purl
          iframeEl.width = Math.abs(vm.tempMaxX - vm.tempMinX)
          iframeEl.height = Math.abs(vm.tempMaxY - vm.tempMinY)
          iframeEl.style.position = 'absolute'
          iframeEl.style.top = vm.tempMinY + 'px'
          iframeEl.style.left = vm.tempMinY + 'px'
          iframeEl.style.border = '0'
          document.body.appendChild(iframeEl)
          vm.$store.state.ctx.save()
          // ctx.rect(tempMinX,tempMinY,Math.abs(tempMaxX - tempMinX),Math.abs(tempMaxY - tempMinY))
          // ctx.clip()
          vm.$store.state.ctx.clearRect(vm.tempMinX-20,vm.tempMinY-20,Math.abs(vm.tempMaxX - vm.tempMinX) + 50,Math.abs(vm.tempMaxY - vm.tempMinY)+50)
          vm.$store.state.ctx.save()
          vm.tempMaxX = undefined
          vm.tempMaxY = undefined
          vm.tempMinX = undefined
          vm.tempMinY = undefined
          vm.originX = undefined
          vm.originY = undefined
        })
        .catch(err => {
          console.log(err)
        })
    }
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
    img
      background: #999
  .sidebar
    position: absolute
    top: 85px
    right: 48px
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
</style>