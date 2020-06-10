import React, {Component} from 'react';
import {AppBar, Toolbar} from '@material-ui/core';

import styles from './header.scss';

export class Header extends Component<{}, {}> {

    public render(): React.ReactNode {

        return (
            <div className={styles.header}>
                <AppBar position="static" className={styles.appBar}>
                    <Toolbar className={styles.centerToolbar}>
                        <img src="public/images/logo.png" alt="Logo"/>
                    </Toolbar>
                </AppBar>
            </div>
        );

    }

}
