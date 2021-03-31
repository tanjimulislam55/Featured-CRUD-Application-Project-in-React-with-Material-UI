import { makeStyles, Paper } from '@material-ui/core';
import TableContainer from '../../components/TableContainer';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

export default function Employees() {
    const { pageContent } = useStyles();

    return (
        <div>
            <Paper className={pageContent}>
                <TableContainer />
            </Paper>
        </div>
    );
}
