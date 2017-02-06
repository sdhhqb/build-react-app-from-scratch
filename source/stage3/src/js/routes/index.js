import App from '../components/App';
import Home from '../components/home';
import Info from '../components/info';
import About from '../components/about';

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: Home
  },
  childRoutes: [
    {path: '/home', component: Home},
    {path: '/info', component: Info},
    {path: '/about', component: About}
  ]
}
export default routes;