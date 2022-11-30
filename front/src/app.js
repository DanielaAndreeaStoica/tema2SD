import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './navigation-bar';
import Home from './home/home';
import AdminContainer from './admin/admin-container';
import ClientContainer from './client/client-container';
import AdminDeviceContainer from './admin-device/admin-device-container';
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';

/*
    Namings: https://reactjs.org/docs/jsx-in-depth.html#html-tags-vs.-react-components
    Should I use hooks?: https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both
*/
function App() {
    return (
        <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home />} 
                        />

                        <Route
                            exact
                            path='/admin'
                            render={() => JSON.parse(localStorage.getItem('userContext')).role == 'ADMIN' ? <AdminContainer /> : <Home />}
                        />

                        <Route
                            exact
                            path='/client'
                            render={() => JSON.parse(localStorage.getItem('userContext')).role == 'CLIENT' ? <ClientContainer /> : <Home />}
                        />

                        <Route
                            exact
                            path='/admin/device'
                            render={() => JSON.parse(localStorage.getItem('userContext')).role == 'ADMIN' ? <AdminDeviceContainer /> : < Home />}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage />}
                        />

                        <Route render={() => <ErrorPage />} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
