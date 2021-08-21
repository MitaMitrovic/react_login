import { Route } from 'react-router-dom';

import Dashboard from '../../pages/dashboard'
import renderWithNavigation from '../HOC/renderWithNavigation';

function AuthorizedRoutes() {
  return (
    <>
      <Route path="/dashboard" component={Dashboard} />
    </>
  );
}

export default renderWithNavigation(AuthorizedRoutes);
