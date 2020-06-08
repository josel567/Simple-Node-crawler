import React, {Component} from 'react';
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import styles from './tableResults.scss';
import {Website} from '../../../model';


interface TableResultsProps {
    results: Website;
}

export class TableResults extends Component<TableResultsProps, {}> {

    public render(): React.ReactNode {

        const {results} = this.props;

        const linksList = results.links.map((link: {anchor: string, href: string}, index: number) =>
            <TableRow key={index} hover role="checkbox">

                        <TableCell>
                            {index}
                        </TableCell>

                        <TableCell>
                            {link.anchor}
                        </TableCell>

                        <TableCell>
                            <a href={link.href} target="_blank">{link.href}</a>
                        </TableCell>

                    </TableRow>
        );

        return (
            <>
                <div className={styles.summaryContainer}>

                    <div className={styles.summary}>

                        <Card className={styles.summaryElement}>

                            <CardContent>

                                <Typography color="textSecondary" gutterBottom>
                                    Total links
                                </Typography>

                                <Typography variant="h5" component="h2">
                                    {results.links.length}
                                </Typography>

                            </CardContent>

                        </Card>

                        <Card className={styles.summaryElement}>

                            <CardContent>

                                <Typography color="textSecondary" gutterBottom>
                                    Time
                                </Typography>

                                <Typography variant="h5" component="h2">
                                    {results.time}s
                                </Typography>

                            </CardContent>

                        </Card>

                        <Card className={styles.summaryElement}>

                            <CardContent>

                                <Typography color="textSecondary" gutterBottom>
                                    Status
                                </Typography>

                                <Typography variant="h5" component="h2">
                                    Finished
                                </Typography>

                            </CardContent>

                        </Card>

                    </div>

                </div>

                <TableContainer className={styles.tableContainer}>

                    <Table stickyHeader aria-label="sticky table" className={styles.table}>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    #
                                </TableCell>

                                <TableCell>
                                    Anchor text
                                </TableCell>

                                <TableCell>
                                    Link
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {linksList}

                        </TableBody>

                    </Table>

                </TableContainer>
            </>
        );
    }

}
