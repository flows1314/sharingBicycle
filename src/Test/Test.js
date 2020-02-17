import React from 'react';
import {HashRouter,Route,Link,Switch} from 'react-router-dom';
import Main from './Main';
import Car from './Car';
import Air from './Air';
import Train from './Train';
class Test extends React.Component{
  render(){
    return(
      <HashRouter>
       <Main>
         <Switch>
          <Route path='/train' render={
            ()=><Train>
                    <Route path='/train/ui/car1' component={Car}></Route>
                    <Route path='/train/ui/car2' component={Air}></Route>
                </Train>
          }>
          </Route>
          <Route path='/air' component={Air}></Route>
         </Switch>
       </Main>
      </HashRouter>
    )
  }
}
export default Test;