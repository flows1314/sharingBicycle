import React from 'react';
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
import { HashRouter, Route, Switch } from 'react-router-dom';
class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/admin' render={
              () => <Admin>
                <Route path='/admin/home' component={Home}></Route>
                <Route path='/admin/ui/buttons' component={Buttons}></Route>
                <Route path='/admin/ui/loading' component={Loading}></Route>
                <Route path='/admin/ui/modals' component={Modals}></Route>
                <Route path='/admin/ui/notification' component={Notification}></Route>
                <Route path='/admin/ui/messages' component={Message}></Route>
                <Route path='/admin/ui/gallery' component={Gallery}></Route>
                <Route path='/admin/ui/tabs' component={Tabs}></Route>
                <Route path='/admin/ui/carousel' component={Carousel}></Route>
                <Route path='/admin/form/log' component={Log}></Route>
                <Route path='/admin/table/basic' component={TableBasic}></Route>
                <Route path='/admin/table/high' component={HighTable}></Route>
              </Admin>}>
            </Route>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
export default Router;