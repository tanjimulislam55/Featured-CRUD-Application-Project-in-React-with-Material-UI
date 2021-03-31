import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    // eslint-disable-next-line prettier/prettier
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dialog: {
        position: 'absolute',
        padding: theme.spacing(2),
        top: theme.spacing(5),
    },
    dialogContent: {
        textAlign: 'center',
    },
    dialogAction: {
        justifyContent: 'center',
    },
}));

export default function ConfirmDialog({ confirmDialog, setConfirmDialog }) {
    const { dialog, dialogAction, dialogContent } = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: dialog }}>
            <DialogTitle />
            <DialogContent className={dialogContent}>
                <Typography variant="h6">{confirmDialog.title}</Typography>
                <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
            </DialogContent>
            <DialogActions className={dialogAction}>
                <Button
                    variant="outlined"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                >
                    No
                </Button>
                <Button variant="outlined" color="secondary" onClick={confirmDialog.onConfirm}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
