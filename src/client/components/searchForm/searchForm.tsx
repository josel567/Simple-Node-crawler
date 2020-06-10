import React, {Component} from 'react';
import {Button, TextField} from '@material-ui/core';
import axios, {AxiosResponse} from 'axios';

import styles from './searchForm.scss';
import {TableResults} from '../tableResults';
import {Website} from '../../../model';

interface SearchFormState {
    results?: Website;
    isLoading?: boolean;
    error?: boolean;
    totalTime?: {m: number, s: number};
}

export class SearchForm extends Component<{}, SearchFormState> {

    public constructor() {

        super({});

        this.state = {
            isLoading: false
        };

        this.handleUrlSubmit = this.handleUrlSubmit.bind(this);

    }

    public render(): React.ReactNode {

        return (
            <>

                <div className={styles.formContainer}>

                    <form noValidate className={styles.form} onSubmit={this.handleUrlSubmit}>

                        <TextField id="url"
                                   label="Enter a valid url to start scanning it..."
                                   className={styles.searchInput}/>

                        <TextField id="level"
                                   label="Depth level"
                                   type="number"
                                   defaultValue="1"
                                   className={styles.levelInput}
                        />

                        <Button variant="contained" color="primary" className={styles.searchButton} type="submit">
                            Start scanning
                        </Button>

                    </form>

                </div>

                { this.state.isLoading && <div className={styles.loadingContainer}>
                    <img src="/public/images/loading.gif" alt="Loading" width="80"/>
                </div> }

                { this.state.error && <div className={styles.errorContainer}>
                    <p>An error has occurred.</p>
                </div> }

                { this.state.results && <TableResults results={this.state.results} totalTime={this.state.totalTime} /> }

            </>

        );

    }

    private handleUrlSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({
            isLoading: true,
            results: undefined,
            error: undefined
        });

        const url = e.currentTarget.url.value;
        const level = e.currentTarget.level.value;

        const startTime = new Date();

        axios.get(`http://localhost:3000/crawl?url=${url}&level=${level}`).then((res: AxiosResponse) => {

            const finishTime = new Date();
            const executionTime = Math.round(Math.abs((startTime.getTime() - finishTime.getTime()) / 1000));
            const totalTime: {m: number, s: number} = {m: 0, s: 0};

            if (executionTime > 60) {
                totalTime.m = Math.floor(executionTime / 60);
                totalTime.s = executionTime - totalTime.m * 60;
            } else {
                totalTime.s = executionTime;
            }

            this.setState({
                results: res.data,
                isLoading: false,
                totalTime
            });
        }).catch(() => {
            this.setState({
                isLoading: false,
                error: true
            });
        });

    }

}
