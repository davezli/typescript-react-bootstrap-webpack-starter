// #region imports
import React from 'react';
import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Container } from 'reactstrap';
import NavigationBar from '../../components/navigation';
import BackToTop from '../../components/backToTop/BackToTop';
import navigationModel, { Navigation } from '../../config/navigation';
import registerServiceWorker from '../../services/sw/registerServiceWorker';
import { getDisplayName } from '../utils/index';
// #endregion

// #region flow types
interface Props extends RouteComponentProps {
  [key: string]: any;
}

type InjectedProps = any;

// type InjectedProps = {
//   [key: string]: any;
// };

interface State {
  navModel: Navigation;
}
// #endregion

// #region withMainLayout HOC
function withMainLayout<
  InjectedProps
>(/* no args option yet, but could pass them here */) {
  return (BaseComponent: any) => {
    // #region returned Component
    class WithMainLayout extends React.Component<Props, State> {
      static displayName = `withMainLayout${getDisplayName(BaseComponent)}`;

      state = { navModel: navigationModel };

      // #region lifecycle
      componentDidMount() {
        // register service worker (no worry about multiple attempts to register, browser will ignore when already registered)
        registerServiceWorker();
      }

      render() {
        /* eslint-disable no-unused-vars */
        const { history, location, match, ...passProps } = this.props;
        /* eslint-enable no-unused-vars */
        const { navModel } = this.state;

        return (
          <div id="appContainer">
            <NavigationBar
              navModel={navModel}
              handleLeftNavItemClick={this.handleLeftNavItemClick}
              handleRightNavItemClick={this.handleRightNavItemClick}
            />
            <Container fluid>
              <BaseComponent {...passProps} />
            </Container>
            <BackToTop minScrollY={40} scrollTo="appContainer" />
          </div>
        );
      }
      // #endregion

      /* eslint-disable no-unused-vars */
      handleLeftNavItemClick = (
        event: React.SyntheticEvent<any>,
        viewName: string,
      ) => {
        // something to do here?
      };

      handleRightNavItemClick = (
        event: React.SyntheticEvent<any>,
        viewName: string,
      ) => {
        // something to do here?
      };
      /* eslint-enable no-unused-vars */
    }

    // #region add static displayName for dev
    // /* eslint-disable no-process-env */
    // if (process.env.NODE_ENV !== 'production') {
    //   // HOC would obfuscate component name, this trick is helpful for dev (we don't care in production)
    //   WithMainLayout.displayName = wrapDisplayName(
    //     BaseComponent,
    //     'withMainLayout',
    //   );
    // }
    // /* eslint-enable no-process-env */
    // #endregion

    return compose(withRouter)(WithMainLayout);
  };
}
// #endregion

export default withMainLayout;
