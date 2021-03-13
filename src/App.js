import {
    Box,
    Container,
    createMuiTheme,
    makeStyles,
    Paper,
    ThemeProvider,
} from '@material-ui/core';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

import Tabs from './components/Tabs';
import Board from './components/Board';
import FavouriteList from './components/FavouriteList';

const CARD_URL = 'https://randomuser.me/api/0.4/?randomapi.json';

export const CardContext = createContext({});

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to top, #ccc 70%, #333 30%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    container: {
        height: 520,
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: theme.palette.common.white,
    },
    skeleton: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: theme.palette.common.white,
    },
}));

function App() {
    const classes = useStyles();
    const [tabCurrent, setTabCurrent] = useState(0);
    const [cardList, setCardList] = useState([]);
    const [favouriteList, setFavouriteList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let unmount = false;
        setLoading(true);
        const tempArr = [];
        axios
            .get(CARD_URL)
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                }
                return axios.get(CARD_URL);
            })
            .then((response) => {
                if (!unmount) {
                    tempArr.push(response.data.results[0].user);
                    setCardList(tempArr);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (!unmount) {
                    setLoading(false);
                }
            });
        return () => {
            unmount = true;
        };
    }, []);

    useEffect(() => {
        const JSONdata = window.localStorage.getItem('favouriteList');
        if (JSONdata) {
            setFavouriteList(JSON.parse(JSONdata));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(
            'favouriteList',
            JSON.stringify(favouriteList),
        );
    }, [favouriteList]);

    const handleTabChange = (tab) => {
        setTabCurrent(tab);
    };

    const handleLoadMore = async () => {
        const item = await axios.get(CARD_URL);
        setCardList([...cardList, item.data.results[0].user]);
    };

    const addFavourite = (user) => {
        setFavouriteList([...favouriteList, user]);
    };

    const removeFarouriteItem = (id) => {
        setFavouriteList((favouriteList) =>
            favouriteList.filter((ele) => ele.sha256 !== id),
        );
    };

    return (
        <CardContext.Provider
            value={{ cardList, handleLoadMore, addFavourite }}
        >
            <ThemeProvider theme={theme}>
                <Box className={classes.root}>
                    <Container maxWidth='xs'>
                        <Box className={classes.container}>
                            <Tabs
                                value={tabCurrent}
                                data={['Swipe now', 'Favourite']}
                                handleChange={handleTabChange}
                            />
                            <Paper elevation={2} className={classes.paper}>
                                <Box
                                    display={
                                        tabCurrent === 0 ? 'block' : 'none'
                                    }
                                    width={1}
                                    height={1}
                                    position='relative'
                                    className={classes.boxCustom}
                                >
                                    <Board />
                                    {loading && (
                                        <Box className={classes.skeleton}>
                                            <Skeleton
                                                animation='wave'
                                                width='100%'
                                                height='100%'
                                                variant='rect'
                                            />
                                        </Box>
                                    )}
                                </Box>
                                <Box
                                    display={
                                        tabCurrent === 1 ? 'block' : 'none'
                                    }
                                >
                                    <FavouriteList
                                        data={favouriteList}
                                        removeFarouriteItem={
                                            removeFarouriteItem
                                        }
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        </CardContext.Provider>
    );
}

export default App;
