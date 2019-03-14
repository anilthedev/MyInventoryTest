import React,{ Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from "./routes";

class Layout extends Component {
    loading() {
        return '<div className="animated fadeIn pt-1 text-center">Loading...</div>';
    };

    render() {
        return (
            <React.Fragment>
                <Suspense fallback={this.loading()}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => <route.component {...props} />}
                                />
                            ) : null;
                        })}
                    </Switch>
                </Suspense>
            </React.Fragment>
        );
    }
}

export default Layout;
