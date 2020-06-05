import * as React from 'react';
import {Header} from './header';
import './index.scss';
import {SearchForm} from './searchForm';

export class App extends React.Component<{}, {}> {

    public render(): React.ReactNode {
        return (
            <>
                <Header/>
                <SearchForm/>
            </>
        );
    }

}
