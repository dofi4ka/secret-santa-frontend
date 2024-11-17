/* @refresh reload */
import {render} from 'solid-js/web';
import {Route, Router} from "@solidjs/router";

import './index.css';
import Login from "./pages/login";
import Index from "./pages/index";
import Panel from "./pages/panel";

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={Index}/>
      <Route path="/login" component={Login}/>
      <Route path="/panel" component={Panel}/>
    </Router>
  ),
  root!
);
