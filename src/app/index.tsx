import { inject, IReactComponent, observer } from 'mobx-react';
import React from 'react';
import { withRoute } from 'react-router5';
import { RouteContext } from 'react-router5/types/types';
import styles from './index.module.scss';
import { AuthorizationPage } from './modules/authorization/AuthorizationPage';
import { AuthStore } from './modules/authorization/stores/AuthStore';
import { LandingHomePage } from './modules/landing-home/LandingHomePage';
import Rules from './modules/landing-home/Rules';
import UserDashboard from './modules/loggedUser/Dashboard';
import Tasks from './modules/loggedUser/containers/Tasks';
import Analytics from './modules/loggedUser/containers/Analytics';
import Modering from './modules/landing-home/Modering';
import Conditions from './modules/landing-home/Conditions';
import { RouteNameChoices, RouteNames } from './modules/router';
import { IStore } from './store';
import './index.scss';
import 'antd/dist/antd.css';
import Tutorial from './modules/loggedUser/containers/Tutorial';
import Assignment from './modules/loggedUser/containers/Assignment';
import { withApi } from '../api/withApi';

import Crew from './modules/loggedUser/containers/Crew';
import Statuses from './modules/loggedUser/containers/Statuses';
import Finance from './modules/loggedUser/containers/Finance';
import News from './modules/loggedUser/containers/News';
import Chatting from './modules/loggedUser/containers/Chatting';
import PrivateSettings from './modules/loggedUser/containers/PrivateSettings';

@observer
class AppComponent extends React.Component<any> {
  async componentDidMount() {
    const { authStore } = this.props;
    await authStore.fetchMyProfile();
    this.redirect();
  }

  redirect() {
    const { authStore, router, route } = this.props;

    if (authStore.isLoggedIn()) {
      const me = authStore.getMe()!;

      console.log("route==", route.name);
      if (route.name === RouteNameChoices.home && me.first_task_completed) {
        router.navigate(RouteNames[RouteNameChoices.tasks]);
        return;
      }

      const first_task_completed = me.first_task_completed;
      // const first_task_completed = true;
      if (!me.account_filled) {
        router.navigate(RouteNames[RouteNameChoices.profileRegistrationForm]);
        return;
      }
      if (!me.approved) {
        router.navigate(RouteNames[RouteNameChoices.modering]);
        return;
      }
      if (!first_task_completed) {
        router.navigate(RouteNames[RouteNameChoices.assignments]);
        return;
      }
    }
  }

  render() {
    let renderComponent = null;
    const { authStore, router, api, route, financeStore } = this.props;
    const isTaskComplete = authStore.getMe()?.first_task_completed;
    const approved = authStore.getMe()?.approved;
    const user = authStore.getMe();

    const {
      route: { name: routeName },
    } = this.props;

    if (
      routeName === RouteNames.authorization ||
      routeName === RouteNames.registration ||
      routeName === RouteNames.secretRegistration ||
      routeName === RouteNames.registrationRef
    ) {
      renderComponent = <AuthorizationPage />;
    } else if (routeName === RouteNames.rules) {
      renderComponent = <Rules />;
    } else if (routeName === RouteNames.conditions) {
      renderComponent = <Conditions />;
    } else if (
      routeName === RouteNames.home ||
      routeName === RouteNames.profileRegistrationForm
    ) {
      renderComponent = <LandingHomePage />;
    } else if (isTaskComplete && routeName === RouteNames.user) {
      renderComponent = <UserDashboard user={user} />;
    } else if (isTaskComplete && routeName === RouteNames.tasks) {
      renderComponent = (
        <UserDashboard user={user}>
          <Tasks />
        </UserDashboard>
      );
    }

    // else if (isTaskComplete && routeName === RouteNames.analytics) {
    //   renderComponent = (
    //     <UserDashboard user={user}>
    //       <Analytics />
    //     </UserDashboard>
    //   );
    // }
    else if (isTaskComplete && routeName === RouteNames.tutorial) {
      renderComponent = (
        <UserDashboard user={user}>
          <Tutorial />
        </UserDashboard>
      );
    } else if (isTaskComplete && routeName === RouteNames.crew) {
      renderComponent = (
        <UserDashboard user={user}>
          <Crew user={user} authStore={authStore} />
        </UserDashboard>
      );
    } else if (isTaskComplete && routeName === RouteNames.statuses) {
      renderComponent = (
        <UserDashboard user={user}>
          <Statuses user={user} />
        </UserDashboard>
      );
    } else if (isTaskComplete && routeName === RouteNames.finance) {
      console.log('Finance: ', financeStore);
      renderComponent = (
        <UserDashboard user={user}>
          {/*<Finance financeStore={financeStore}/>*/}
          <Finance />
        </UserDashboard>
      );
    }

    // else if (isTaskComplete && routeName === RouteNames.news) {
    //   renderComponent = (
    //     <UserDashboard user={user}>
    //       <News />
    //     </UserDashboard>
    //   );
    // }
    // else if (isTaskComplete && routeName === RouteNames.chatting) {
    //   renderComponent = (
    //     <UserDashboard user={user}>
    //       <Chatting />
    //     </UserDashboard>
    //   );
    // }
    else if (
      !approved &&
      !isTaskComplete &&
      routeName === RouteNames.assignments
    ) {
      router.navigate(RouteNames[RouteNameChoices.modering]);
    } else if (
      approved &&
      !isTaskComplete &&
      routeName === RouteNames.assignments
    ) {
      renderComponent = (
        <UserDashboard user={user}>
          <Assignment route={route} api={api} authStore={authStore} />
        </UserDashboard>
      );
    } else if (isTaskComplete && routeName === RouteNames.assignments) {
      router.navigate(RouteNames[RouteNameChoices.tasks]);
    } else if (isTaskComplete && routeName === RouteNames.privateSettings) {
      renderComponent = (
        <UserDashboard user={user}>
          <PrivateSettings user={user} />
        </UserDashboard>
      );
    } else if (isTaskComplete && routeName === RouteNames.assignments) {
      router.navigate(RouteNames[RouteNameChoices.tasks]);
    } else if (routeName === RouteNames.modering) {
      renderComponent = <Modering />;
    }

    return <div className={styles.App}>{renderComponent}</div>;
  }
}

export const App: IReactComponent = withRoute(
  withApi(
    inject((store: IStore) => ({
      authStore: store.authStore,
      // financeStore: store.financeStore,
    }))(AppComponent)
  )
);
