import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
  AllArtists,
  AllArtwork,
  Artist,
  Artwork,
  Cart
} from './components';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/artists' component={AllArtists} />
        <Route exact path='/' component={AllArtwork} />
        <Route exact path='/artists/:id' component={Artist} />
        <Route exact path='/artwork' component={AllArtwork} />
        <Route exact path='/artwork/:id' component={Artwork} />
        <Route exact path='/cart' component={Cart} />
        <Route path='/counter' component={Counter} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
