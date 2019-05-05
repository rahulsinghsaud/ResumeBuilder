import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AsideMenu from './AsideMenu'
import Body from './Body'
import Template from './Template'
import 'bulma/css/bulma.css'


class App extends Component {
  render() {
    return (
      
      <div>
        <Route exact path='/' component={Body} />
        <Route exact path='/AsideMenu' component={AsideMenu} /> 
        <Route exact path='/Template' component={Template} />        
      </div>

    )

  }
}
export default App