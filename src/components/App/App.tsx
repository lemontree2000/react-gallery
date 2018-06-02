import * as React from 'react';
import imageData from '../../data/imageDatas';
import ControllerUnit from '../ControllerUnit/ControllerUnit';
import ImgFigure from '../ImgFigure/ImgFigure';

require('./App.less');

export interface IimageArrType {
  disc: string,
  fileName: string,
  title: string,
  imageUrl?: any,
  imgRef?: any,
  index?: number,
  arrange?: any,
  inverse?: any,
  center?: any
}
interface IstateType {
  imgsArrangeArr: any
}

/**
 * 获取区间的一个随机整数
 * @param low 最小
 * @param high 最大
 */
const getRangeRandom = (low: number, high: number): number => {
  return Math.ceil(Math.random() * (high - low) + low)
}

const get30DegRandom = (): string => {
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30) + 'deg';
}


const imageArr: IimageArrType[] = imageData.map((item, index): IimageArrType => {
  // tslint:disable-next-line:no-var-requires
  const transformUrl = require(`../../images/${item.fileName}`);
  return {
    ...item,
    imageUrl: transformUrl
  };
});


// ImgFigure 组件



class App extends React.Component {
  [x: string]: any;
  public stageDom: HTMLElement;
  public Constant = {
    centerPos: {
      left: 0,
      top: 0
    },
    hPosRange: { // 水平方向的取值
      leftSecX: [0, 0],
      rightSecx: [0, 0],
      y: [0, 0]
    },
    vPosRange: { // 垂直方向的取值
      topY: [0, 0],
      x: [0, 0]
    }
  }
  public state: IstateType;
  constructor(props: object) {
    super(props);
    this.bindImgRefs = this.bindImgRefs.bind(this);
    this.inverse = this.inverse.bind(this);
    this.state = {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: '0',
        //     top: '0'
        //   },
        //   rotate: 0,
        //   isInverse: false,
        //   isCenter: false,
        // }
      ]
    }
  }
  /**
   * 批量绑定ImgRefs方法
   * @param node dom对象 
   * @param index 索引
   */
  public bindImgRefs(node: any, index: number): void {
    this[`figureImgDom${index}`] = node;
  }

  /**
   * 
   * @param index 要翻转图片的index
   */
  public inverse(index: number): any {
    return () => {
      const imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr
      })
    };
  }

  public center(index: number) {
    return () => {
      this.rearrange(index)
    }
  }
  /**
   * 重新布局所有图片
   * @param centerIndex 指定中心是哪个图片
   */
  public rearrange(centerIndex: number) {
    const imgsArrangeArr: Array<[any][0]> = this.state.imgsArrangeArr;
    const Constant = this.Constant;
    const { hPosRange, vPosRange, centerPos } = Constant;
    const { leftSecX: hPosRangeLeftSecX, rightSecx: hPosRangeRightSecX, y: hPosRangeY } = hPosRange;
    const { x: vPosRangeX, topY: vPosRangeTopY } = vPosRange;

    let imgsArrangeTopArr: any[0] = [];
    const topImgNum = Math.floor(Math.random() * 2);
    let topImgSpliceIndex = 0;
    const imgsArrangeCenterArr: any[0] = imgsArrangeArr.splice(centerIndex, 1)
    // 首先居中 centerIndex 的图片
    // 居中的centerIndex的图片不需要旋转
    imgsArrangeCenterArr[0] = {
      isCenter: true,
      pos: centerPos,
      rotate: 0,
    }

    // 取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((item: any, index: number) => {
      imgsArrangeTopArr[index] = {
        isCenter: false,
        pos: {
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
        },
        rotate: get30DegRandom()
      }
    })

    // 布局左右两侧的图片
    // tslint:disable-next-line:prefer-for-of

    for (let i = 0; i < imgsArrangeArr.length; i++) {
      const k = imgsArrangeArr.length / 2;
      let hPosRangeLORX = null;
      // 前半部分布局左边， 右半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] = {
        isCenter: false,
        pos: {
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        },
        rotate: get30DegRandom(),
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({
      imgsArrangeArr
    });
  }
  // 组件挂载以后， 为每张图片计算其位置的范围
  public componentDidMount() {
    const stageDom = this.stageDom;
    const figureImgDom = this.figureImgDom1
    // 获取舞台大小
    const stageW = stageDom.scrollWidth;
    const stageH = stageDom.scrollHeight;
    const halfStageW = Math.ceil(stageW / 2);
    const halfStageH = Math.ceil(stageH / 2);

    // 获取 figureImg 大小

    const imgW = figureImgDom.scrollWidth;
    const imgH = figureImgDom.scrollHeight;
    const halfImgW = Math.ceil(imgW / 2);
    const halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecx[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecx[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上部区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[0] = halfStageW;

    this.rearrange(0);
  }

  public render() {
    const controllerUnits:any = [];

    return (
      <section className="stage" ref={(node: any) => { this.stageDom = node }}>
        <section className="img-sec">
          {
            imageArr.map((item, index) => {
              if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                  isCenter: false,
                  isInverse: false,
                  pos: {
                    left: 0,
                    top: 0
                  },
                  rotate: 0
                }
              }
              controllerUnits.push(<ControllerUnit key={index}/>)
              return (
                <ImgFigure
                  key={index} {...item}
                  index={index}
                  inverse={this.inverse(index)}
                  arrange={this.state.imgsArrangeArr[index]}
                  imgRef={this.bindImgRefs}
                  center={this.center(index)}
                />
              )
            })
          }
        </section>
        <nav className="controller-nav">
        {
         controllerUnits
        }
        </nav>
      </section>
    );
  }
}

export default App;
