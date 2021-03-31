import { Card, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function PageHeader({ title, subTitle }) {
    const { root } = useStyles();
    return (
        <Paper elevation={0} style={{ paddingLeft: '20px', display: 'flex', flexWrap: 'wrap' }}>
            <Card className={root}>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {subTitle}
                </Typography>
            </Card>
        </Paper>
    );
}
