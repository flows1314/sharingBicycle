import React from 'react';
import NoFound from './pages/Nofound'
import App from './app';
import Admin from './admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Buttons from './pages/Buttons';
import Modals from './pages/Modals';
import Loading from './pages/Loading';
import TableBasic from './pages/Table/basicTable';
import HighTable from './pages/Table/highTable';
import Notification from './pages/notification';
import Message from './pages/Message';
import Gallery from './pages/Gallery';
import Tabs from './pages/Tabs';
import Carousel from './pages/Carousel';
import Log from './pages/Form/log';
import Register from './pages/Form/reg';
import City from './pages/City';
import Order from './pages/order';
import Detail from './pages/order/detail';
import Common from './common';
import User from './pages/User';
import Map from './pages/Map';
import Bar from './pages/Echarts/Bar';
import Pie from './pages/Echarts/Pie';
import Line from './pages/Echarts/Line';
import RichText from './pages/RichText';
import Authority from './pages/Authority';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/common' render={() =>
              <Common>
                <Route path='/common/order/detail/:orderID' component={Detail}></Route>
              </Common>}>
            </Route>
            <Route path='/' render={
              () => <Admin>
                <Switch>
                  <Route path='/home' component={Home}></Route>
                  <Route path='/ui/buttons' component={Buttons}></Route>
                  <Route path='/ui/loading' component={Loading}></Route>
                  <Route path='/ui/modals' component={Modals}></Route>
                  <Route path='/ui/notification' component={Notification}></Route>
                  <Route path='/ui/messages' component={Message}></Route>
                  <Route path='/ui/gallery' component={Gallery}></Route>
                  <Route path='/ui/tabs' component={Tabs}></Route>
                  <Route path='/ui/carousel' component={Carousel}></Route>
                  <Route path='/form/log' component={Log}></Route>
                  <Route path='/form/register' component={Register}></Route>
                  <Route path='/table/basic' component={TableBasic}></Route>
                  <Route path='/table/high' component={HighTable}></Route>
                  <Route path='/city' component={City}></Route>
                  <Route path='/order' component={Order}></Route>
                  <Route path='/user' component={User}></Route>
                  <Route path='/map' component={Map}></Route>
                  <Route path='/echarts/bar' component={Bar}></Route>
                  <Route path='/echarts/pie' component={Pie}></Route>
                  <Route path='/echarts/line' component={Line}></Route>
                  <Route path='/rich' component={RichText}></Route>
                  <Route path='/authority' component={Authority}></Route>
                  <Redirect to='/home'/>  //重定向放到最后，当匹配不到其他时在匹配它
                  {/* <Route component={NoFound}></Route> */}
                </Switch>
              </Admin>}>
            </Route>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
export default Router;