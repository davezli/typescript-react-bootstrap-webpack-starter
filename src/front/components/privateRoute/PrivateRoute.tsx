// #region imports
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { AuthContextProps } from '../../contexts/auth/consumerHOC';
// #endregion

// #region flow types
interface Props extends RouteComponentProps<any>, AuthContextProps {
  // parent
  component: any;
  path: string;
}

interface State {}
// #endregion

class PrivateRoute extends Component<Props, State> {
  // #region lifecycle
  render() {
    const { component: InnerComponent, ...rest } = this.props;

    return <Route {...rest} render={this.renderScene} />;
  }
  // #endregion

  renderScene = (props: any) => {
    const { component: InnerComponent, ...rest } = this.props;
    const { location, isAuthenticated } = this.props;
    const isTokenExpired = false; // this.isExpired()

    return !isTokenExpired && isAuthenticated ? (
      <InnerComponent {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: location } }} />
    );
  };

  isExpired() {
    const { checkTokenIsExpired } = this.props;
    const isExpired = checkTokenIsExpired();
    return isExpired;
  }
}

export default PrivateRoute;
