import React from 'react';
import {Link} from 'react-router-dom';
class Train extends React.Component{
  render(){
    return(
     <div>这是火车,
          <Link to='./train/ui/car1'>点击一下汽车1</Link>,
          <Link to='./train/ui/car2'>点击一下汽车2</Link>
          {this.props.children}
     </div>
    )
  }
}
export default Train;