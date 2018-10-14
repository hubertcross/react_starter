import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CitySearchScreen from './CitySearchScreen'
// import StorePicker from './StorePicker'

var settings = require('../config/settings');

const ScreenHolder = () => {
  return (
    <Switch>
      
      {/*<Route path="/storepicker" component={StorePicker} />*/}
      <Route exact path="/cities" render={ (props) => <CitySearchScreen config={settings.config} uri='city'/> }/>
  {/*
  	<Route path="/products" component={ProductSearchScreen} />
  <Route exact path="/details/:id" render={(props) => <DetailsPage globalStore={globalStore} {...props} /> } />*/}
    </Switch>
  )
}

export default ScreenHolder
