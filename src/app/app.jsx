import { createMuiTheme, CssBaseline, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Header from '../components/Header';
// import SideMenu from '../components/SideMenu';
import Employees from '../pages/Employees/Employees';

const useStyles = makeStyles({
    appMain: {
        // paddingLeft: '300px',
        width: '100%',
    },
});

const theme = createMuiTheme({
    palette: {
        background: {
            default: '#EFF5FB',
        },
    },
});

export default function App() {
    const { appMain } = useStyles();
    return (
        <ThemeProvider theme={theme}>
            {/* <SideMenu /> */}
            <div className={appMain}>
                <Header />
                <Employees />
            </div>
            <CssBaseline />
        </ThemeProvider>
    );
}
