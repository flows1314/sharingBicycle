import React from 'react';
class Car extends React.Component{
  render(){
    return(
    <div>这是汽车,编号{this.props.match.params.value}</div>
    )
  }
}
export default Car;