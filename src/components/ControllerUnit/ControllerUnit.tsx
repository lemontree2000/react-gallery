import * as React from 'react';

class ControllerUnit extends React.Component {

    constructor(props:any) {
        super(props);
    }
    public handleClick(e:any):void {
        e.preventDefault();
        e.stopPropagation();
    }
    public render() {
        return (
            <span className="controller-unit" onClick={this.handleClick}></span>
        );
    }
}

export default ControllerUnit;
