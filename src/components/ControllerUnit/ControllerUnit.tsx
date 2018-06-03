import * as React from 'react';

export interface IController {
    arrange: any,
    inverse: any,
    center: any
}
class ControllerUnit extends React.Component<IController,{}> {

    constructor(props: IController) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    public handleClick(e: any): void {
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        
        e.preventDefault();
        e.stopPropagation();
    }
    public render() {
        let controllerUnitClassName = "controller-unit";
        // 如果对应的是居中的图片， 显示控制按钮的居中态
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += " is-center";
            // 如果同时对于的是翻转图片，显示控制按钮的翻转态
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += " is-inverse";
            }
        }
        return (
            <span className={controllerUnitClassName} onClick={this.handleClick}></span>
        );
    }
}

export default ControllerUnit;
