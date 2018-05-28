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
    public handleClick(e:any) {
        e.preventDefault();
        e.stopPropagation();
        console.log(1);
        this.props.inverse();
    }
    public render() {
        const styles = this.props.arrange.pos ? this.props.arrange.pos : {};
        if (this.props.arrange.rotate && !styles.transform) {
            styles.transform = `rotate(${this.props.arrange.rotate})`;
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
