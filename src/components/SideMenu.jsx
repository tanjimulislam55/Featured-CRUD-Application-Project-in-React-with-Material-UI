import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: '100%',
        backgroundColor: '#253053',
        position: 'absolute',
        left: '0px',
    },
});

export default function SideMenu() {
    const { sideMenu } = useStyles();
    return <div className={sideMenu} />;
}
