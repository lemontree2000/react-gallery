import * as React from "react";
import { IimageArrType } from '../App/App';

class ImgFigure extends React.Component<IimageArrType, {}> {
    constructor(props: IimageArrType) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    public componentWillMount() {
        // console.log(this.props);
    }
    public handleClick(e: any) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    public render() {
        let styles: any = {};
        if (this.props.arrange.pos) {
            // 防止内存引用 
            styles = Object.assign({}, this.props.arrange.pos);
        }

        if (this.props.arrange.rotate) {
            styles.transform = `rotate(${this.props.arrange.rotate})`;
        }
        if (this.props.arrange.isCenter) {
            styles.zIndex = 11;
        }

        let imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure
                className={imgFigureClassName}
                style={styles}
                onClick={this.handleClick}
                ref={(node) => { this.props.imgRef(node, this.props.index) }}
            >
                <img src={this.props.imageUrl} alt={this.props.title} />
                <figcaption>
                    <h2 className="img-title">{this.props.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{this.props.disc}</p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

export default ImgFigure;
