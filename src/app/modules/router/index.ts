import createRouter, { Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';

/*
const buildRouteName = (...routeNames: string[]) => {
  return routeNames.join(".");
};
*/

export enum RouteNameChoices {
  home = 'home',
  rules = 'rules',
  user = 'user',
  tasks = 'tasks',
  tutorial = 'tutorial',

  crew = 'crew',
  statuses = 'statuses',
  finance = 'finance',
  news = 'news',
  chatting = 'chatting',

  analytics = 'analytics',
  conditions = 'conditions',
  modering = 'modering',
  authorization = 'authorization',
  registration = 'registration',
  registrationRef = 'registrationRef',
  secretRegistration = 'secretRegistration',
  profileRegistrationForm = 'profileRegistrationForm',
  assignments = 'assignments',
  privateSettings = 'privateSettings',
}

export const RouteNames = {
  [RouteNameChoices.home]: RouteNameChoices.home,
  [RouteNameChoices.tutorial]: RouteNameChoices.tutorial,

  [RouteNameChoices.crew]: RouteNameChoices.crew,
  [RouteNameChoices.statuses]: RouteNameChoices.statuses,
  [RouteNameChoices.finance]: RouteNameChoices.finance,
  [RouteNameChoices.news]: RouteNameChoices.news,
  [RouteNameChoices.chatting]: RouteNameChoices.chatting,

  [RouteNameChoices.conditions]: RouteNameChoices.conditions,
  [RouteNameChoices.modering]: RouteNameChoices.modering,
  [RouteNameChoices.rules]: RouteNameChoices.rules,
  [RouteNameChoices.tasks]: RouteNameChoices.tasks,
  [RouteNameChoices.analytics]: RouteNameChoices.analytics,
  [RouteNameChoices.user]: RouteNameChoices.user,
  [RouteNameChoices.authorization]: RouteNameChoices.authorization,
  [RouteNameChoices.registration]: RouteNameChoices.registration,
  [RouteNameChoices.registrationRef]: RouteNameChoices.registrationRef,
  [RouteNameChoices.secretRegistration]: RouteNameChoices.secretRegistration,
  [RouteNameChoices.profileRegistrationForm]:
    RouteNameChoices.profileRegistrationForm,
  [RouteNameChoices.assignments]: RouteNameChoices.assignments,

  [RouteNameChoices.privateSettings]: RouteNameChoices.privateSettings,
};

const routes: Route[] = [
  {
    name: RouteNameChoices.home,
    path: '/',
    children: [],
  },
  {
    name: RouteNameChoices.rules,
    path: '/rules',
    children: [],
  },
  {
    name: RouteNameChoices.user,
    path: '/user',
    children: [],
  },
  {
    name: RouteNameChoices.tasks,
    path: '/user/tasks',
    children: [],
  },
  {
    name: RouteNameChoices.analytics,
    path: '/user/analytics',
    children: [],
  },

  {
    name: RouteNameChoices.tutorial,
    path: '/user/tutorial',
    children: [],
  },

  {
    name: RouteNameChoices.crew,
    path: '/user/crew',
    children: [],
  },
  {
    name: RouteNameChoices.statuses,
    path: '/user/statuses',
    children: [],
  },
  {
    name: RouteNameChoices.finance,
    path: '/user/finance',
    children: [],
  },
  {
    name: RouteNameChoices.news,
    path: '/user/news',
    children: [],
  },
  {
    name: RouteNameChoices.chatting,
    path: '/user/chatting',
    children: [],
  },

  {
    name: RouteNameChoices.conditions,
    path: '/conditions',
    children: [],
  },
  {
    name: RouteNameChoices.modering,
    path: '/modering',
    children: [],
  },
  {
    name: RouteNameChoices.profileRegistrationForm,
    path: '/profile-form',
    children: [],
  },
  {
    name: RouteNameChoices.authorization,
    path: '/authorization',
    children: [],
  },
  {
    name: RouteNameChoices.registration,
    path: '/registration',
    children: [],
  },
  {
    name: RouteNameChoices.registrationRef,
    path: '/registration/:ref',
    children: [],
  },
  {
    name: RouteNameChoices.secretRegistration,
    path: '/secret-registration',
    children: [],
  },
  {
    name: RouteNameChoices.assignments,
    path: '/user/assignments',
    children: [],
  },
  {
    name: RouteNameChoices.privateSettings,
    path: '/user/settings',
    children: [],
  },
];

export const router = createRouter(routes, {
  defaultRoute: RouteNames[RouteNameChoices.home],
});

router.usePlugin(browserPlugin());

router.start();
