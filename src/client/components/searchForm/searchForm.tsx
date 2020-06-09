import React, {Component} from 'react';
import styles from './searchForm.scss';
import {Button, TextField} from '@material-ui/core';
import axios, {AxiosResponse} from 'axios';
import {TableResults} from '../tableResults';
import {Website} from '../../../model';

interface SearchFormState {
    results?: Website;
    isLoading?: boolean;
    executionTime?: number;
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

                { this.state.results && <TableResults results={this.state.results} executionTime={this.state.executionTime} /> }

            </>

        );

    }

    private handleUrlSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({
            isLoading: true,
            results: undefined
        });

        const url = e.currentTarget.url.value;
        const level = e.currentTarget.level.value;

        const startTime = new Date();

        axios.get(`http://localhost:3000/crawl?url=${url}&level=${level}`).then((res: AxiosResponse) => {

            const finishTime = new Date();
            const executionTime = Math.abs((startTime.getTime() - finishTime.getTime()) / 1000);

            this.setState({
                results: res.data,
                isLoading: false,
                executionTime
            });
        });

    }

}
