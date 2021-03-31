import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
        transform: 'tranlateZ(0)',
    },
    searchInput: {
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '1 rem',
        '&:hover': {
            backgroundColor: '#f2f2f2',
        },
        '& .MuiSvgIcon-root': {
            marginRight: '8px',
        },
    },
});

export default function Header() {
    const { root, searchInput } = useStyles();
    return (
        <AppBar position="static" className={root}>
            <Toolbar>
                <Grid container alignContent="center">
                    <Grid item style={{ border: '1px solid #fff' }}>
                        <InputBase
                            placeholder="Search topic"
                            className={searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}
                        />
                    </Grid>
                    <Grid item sm />
                    <Grid item style={{ border: '1px solid #fff' }}>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="secondary">
                                <ChatBubbleOutlineIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
