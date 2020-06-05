import React, {Component} from 'react';
import styles from './searchForm.scss';
import {Button, TextField} from '@material-ui/core';


export class SearchForm extends Component<{}, {}> {

    public render(): React.ReactNode {

        return (
            <form noValidate autoComplete="off" className={styles.form}>
                <TextField label="Enter a valid url to start scanning it..."  className={styles.searchInput}/>
                <Button variant="contained" color="primary">
                    Start
                </Button>
            </form>
        );

    }

}
