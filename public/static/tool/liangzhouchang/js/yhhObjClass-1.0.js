/**
 * 灰痕封装的canvas类的集合
 * 版本：1.0
 */

// 图片 基类
class imgObj {
    constructor(obj) {
        if (obj === undefined) {
            obj = {};
            console.log("你必须至少传入一个图片地址和要绘制的canvas!");
        }

        this.loadTime = 1;
        this._loadImg(obj.imgSrc, obj.w, obj.h);

        this._getContext(obj.canvas);

        this.x = obj.x ? obj.x : 0;// x 位置
        this.y = obj.y ? obj.y : 0;// y 位置
        this.s = obj.s ? obj.s : 1;// 缩放尺寸
        this.alpha = obj.alpha ? obj.alpha : 1;// 透明度
        this.visible = typeof obj.visible === "boolean" ? obj.visible : true;// 是否显示图片

        this.onCenter = false;
    }

    // 加载图片
    _loadImg(imgSrc, w, h) {
        let _this = this;

        if (imgSrc.length > 0) {
            _this.img = new Image();// 图片
            _this.img.src = imgSrc;
            _this.img.onload = () => {

                // console.log('加载图片成功');

                _this._initImgSizeW(w, h);
            }
        }
    }

    // 加载canvas
    _getContext(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    // 初始化图片大小
    _initImgSizeW(w, h) {
        let _this = this;
        let proportion = _this.img.height / _this.img.width;

        if (w === undefined && h === undefined) {
            _this.w = 100;
            _this.h = 100 * proportion;
        } else if (w === undefined && h !== undefined) {
            _this.h = h;
            _this.w = h / proportion;
        } else if (w !== undefined && h === undefined) {
            _this.w = w;
            _this.h = w * proportion;
        } else {
            _this.w = w;
            _this.h = h;
        }
    }

    // 绘制图片
    draw(onCenter) {    //中心点：正中
        let _this = this;

        if (_this.visible) {
            if (_this.img && _this.img.complete) {
                let { x, y, w, h, s, alpha } = _this
                w *= s;
                h *= s;

                _this.ctx.save();
                _this.ctx.globalAlpha = alpha;
                if (onCenter) {
                    _this.onCenter = true;
                    _this.ctx.drawImage(_this.img, x - w / 2, y - h / 2, w, h);
                } else {
                    _this.ctx.drawImage(_this.img, x, y, w, h);
                }
                _this.ctx.restore();
            } else {
                setTimeout(() => {
                    if (_this.loadTime >= 50) {
                        console.log("图片绘制失败！");
                    } else {
                        _this.draw(onCenter);

                        _this.loadTime += 1;
                        // console.log("尝试绘制了" + _this.loadTime + "次");
                    }
                }, 200);
            }
        }
    }

    // 统一设置图片
    setImg(obj) {
        if (typeof obj === "undefined") {
            obj = {};
        }
        this.x = obj.x ? obj.x : this.x;
        this.y = obj.y ? obj.y : this.y;
        this.w = obj.w ? obj.w : this.w;
        this.h = obj.h ? obj.h : this.h;
        this.s = obj.s ? obj.s : this.s;
        this.alpha = obj.alpha ? obj.alpha : this.alpha;// 透明度
        this.visible = typeof obj.visible === "boolean" ? obj.visible : this.visible;// 是否显示图片

    }

    // 获取图片所在范围
    getRange() {
        if (this.onCenter) {
            return {
                l: this.x - this.w * this.s / 2,
                r: this.x + this.w * this.s / 2,
                t: this.y - this.h * this.s / 2,
                b: this.y + this.h * this.s / 2
            }
        } else {
            return {
                l: this.x,
                r: this.x + this.w * this.s,
                t: this.y,
                b: this.y + this.h * this.s
            }
        }
    }

    setVisible(bool){
        this.visible = bool;
    }
}

// 盒子 类
class boxObj {
    constructor(obj) {
        if (obj === undefined) {
            obj = {};
            console.log("你必须至少传入一个要绘制的canvas!");
        }

        this._getContext(obj.canvas);

        this.x = obj.x ? obj.x : 0;
        this.y = obj.y ? obj.y : 0;
        this.w = obj.w ? obj.w : 100;
        this.h = obj.h ? obj.h : 100;
        this.visible = typeof obj.visible === "boolean" ? obj.visible : true;// 是否显示图片

    }

    // 加载canvas
    _getContext(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    draw() {    //中心点：左下
        if (this.visible) {
            this.ctx.save();
            this.ctx.strokeStyle = "#2F2F33";
            this.ctx.shadowColor = "black";
            this.ctx.shadowBlur = 6;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(this.x, this.y + this.h);
            this.ctx.lineWidth = this.w;
            // this.ctx.lineCap = 'round';
            this.ctx.stroke();
            this.ctx.restore();
        }
    }
}

// 文本 类
class textObj {
    constructor(obj) {
        if (obj === undefined) {
            obj = {};
            console.log("你必须至少传入一个要绘制的canvas!");
        }

        this._getContext(obj.canvas);

        this.text = obj.text ? obj.text : "文字";
        this.x = obj.x ? obj.x : 0;
        this.y = obj.y ? obj.y : 0;
        this.size = obj.size ? obj.size : 18;
        this.lineNum = obj.lineNum ? obj.lineNum : this.text.length;
        this.w = obj.w ? obj.w : this.size * this.text.length;
        this.visible = typeof obj.visible === "boolean" ? obj.visible : true;
    }

    // 加载canvas
    _getContext(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    draw() {    //中心点：正中
        if (this.visible) {
            let t = this.text;
            let arr = [];
            for (let i = 0; i < t.length; i += this.lineNum) {
                arr.push(t.slice(i, i + this.lineNum));
            }

            c.save();

            c.fillStyle = "#ffffff";
            c.font = "" + this.size + "px sans-serif";
            c.textAlign = "center";
            for (let j = 0; j < arr.length; j++) {
                c.fillText(arr[j], this.x, this.y + this.size / 2 + j * this.size + j * 5, this.w);
            }
            c.restore();
        }
    }
}

// 表格 类
class tabbleObj {
    constructor(obj) {
        if (obj === undefined) {
            obj = {};
            console.log("你必须至少传入一个要绘制的canvas!");
        }

        this._getContext(obj.canvas);

        this.x = obj.x ? obj.x : 0;
        this.y = obj.y ? obj.y : 0;
        this.w = obj.w ? obj.w : 100;
        this.h = obj.h ? obj.h : 100;
        this.size = obj.size ? obj.size : 16;
        this.a1 = obj.a1 ? obj.a1 : false;
        this.a2 = obj.a2 ? obj.a2 : false;
        this.a3 = obj.a3 ? obj.a3 : false;
        this.a4 = obj.a4 ? obj.a4 : false;
        this.a5 = obj.a5 ? obj.a5 : false;
        this.a6 = obj.a6 ? obj.a6 : false;
        this.visible = typeof obj.visible === "boolean" ? obj.visible : true;// 是否显示

    }

    // 加载canvas
    _getContext(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    draw() {    //中心点：左上
        let c = this.ctx;
        if (this.visible) {
            c.save();
            c.fillStyle = "#3E3F40";
            c.fillRect(this.x, this.y, this.w, this.h / 2);

            c.lineWidth = 2;
            c.strokeStyle = "#4C4D4E";
            // 框
            c.beginPath();
            c.moveTo(this.x, this.y);
            c.lineTo(this.x + this.w, this.y);
            c.lineTo(this.x + this.w, this.y + this.h);
            c.lineTo(this.x, this.y + this.h);
            c.closePath();
            // 横
            c.moveTo(this.x, this.y + this.h / 2);
            c.lineTo(this.x + this.w, this.y + this.h / 2);

            // 竖
            c.moveTo(this.x + this.w / 7, this.y);
            c.lineTo(this.x + this.w / 7, this.y + this.h);
            c.moveTo(this.x + this.w / 7 * 2, this.y);
            c.lineTo(this.x + this.w / 7 * 2, this.y + this.h);
            c.moveTo(this.x + this.w / 7 * 3, this.y);
            c.lineTo(this.x + this.w / 7 * 3, this.y + this.h);
            c.moveTo(this.x + this.w / 7 * 4, this.y);
            c.lineTo(this.x + this.w / 7 * 4, this.y + this.h);
            c.moveTo(this.x + this.w / 7 * 5, this.y);
            c.lineTo(this.x + this.w / 7 * 5, this.y + this.h);
            c.moveTo(this.x + this.w / 7 * 6, this.y);
            c.lineTo(this.x + this.w / 7 * 6, this.y + this.h);

            c.stroke();

            // 标题
            c.fillStyle = "#ffffff";
            c.font = "" + this.size + "px sans-serif";
            c.textBaseline = "top";
            c.fillText("图形编号", this.x + 30, this.y + 14);
            c.fillText("图形周长(cm)", this.x + 10, this.y + 54);

            c.fillText("1", this.x + this.w / 7 + this.w / 14, this.y + 14);
            c.fillText("2", this.x + this.w / 7 * 2 + this.w / 14, this.y + 14);
            c.fillText("3", this.x + this.w / 7 * 3 + this.w / 14, this.y + 14);
            c.fillText("4", this.x + this.w / 7 * 4 + this.w / 14, this.y + 14);
            c.fillText("5", this.x + this.w / 7 * 5 + this.w / 14, this.y + 14);
            c.fillText("6", this.x + this.w / 7 * 6 + this.w / 14, this.y + 14);

            c.font = "" + 18 + "px sans-serif";

            this.a1 && c.fillText("27.96", this.x + this.w / 7 + this.w / 14 - 25, this.y + 54);
            this.a2 && c.fillText("34.13", this.x + this.w / 7 * 2 + this.w / 14 - 25, this.y + 54);
            this.a3 && c.fillText("28.52", this.x + this.w / 7 * 3 + this.w / 14 - 25, this.y + 54);
            this.a4 && c.fillText("35.20", this.x + this.w / 7 * 4 + this.w / 14 - 25, this.y + 54);
            this.a5 && c.fillText("35.41", this.x + this.w / 7 * 5 + this.w / 14 - 25, this.y + 54);
            this.a6 && c.fillText("43.68", this.x + this.w / 7 * 6 + this.w / 14 - 25, this.y + 54);

            c.restore();
        }
    }
}
