import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        top: theme.spacing(9),
    },
}));

export default function Notification({ notify, setNotify }) {
    const { root } = useStyles();

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;
        setNotify({
            ...notify,
            isOpen: false,
        });
    };

    return (
        <Snackbar
            className={root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={(e, reason) => handleClose(e, reason)}
        >
            <Alert severity={notify.type}>{notify.message}</Alert>
        </Snackbar>
    );
}
