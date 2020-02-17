import React from 'react';
import {Link} from 'react-router-dom';
class Apple extends React.Component{
  render(){
    return(
      <div>
          <ul>
            <li >
            <Link to='./train'>火车</Link>
            </li>
            <li>
            <Link to='./air'>飞机</Link>
            </li>
          </ul>
             {this.props.children}
        </div>
    )
  }
}
export default Apple;