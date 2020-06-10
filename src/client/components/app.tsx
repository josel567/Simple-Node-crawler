import * as React from 'react';

import {Header} from './header';
import styles from './index.scss';
import {SearchForm} from './searchForm';

export class App extends React.Component<{}, {}> {

    public render(): React.ReactNode {
        return (
            <>
                <Header/>
                <div className={styles.container}>
                    <SearchForm/>
                </div>
            </>
        );
    }

}
