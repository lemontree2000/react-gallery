import * as React from 'react';

import imageData from '../../data/imageDatas';
require('./App.less');

interface ImageArrType {
  disc: string,
  fileName: string,
  title: string,
  imageUrl?: any
}

const imageArr: ImageArrType[] = imageData.map((item, index): ImageArrType => {
  // tslint:disable-next-line:no-var-requires
  const transformUrl = require(`../../images/${item.fileName}`);
  return {
    ...item,
    imageUrl: transformUrl
  }
});

console.log(imageArr);

class App extends React.Component {
  // constructor(props: object) {
  //   super(props)
  // }
  public render() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

export default App;
