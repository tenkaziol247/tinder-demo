import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab: {
        margin: '0px 0px 8px',
        cursor: 'pointer',
        padding: '2px 4px',
        border: `1px solid ${theme.palette.common.white}`,
        color: theme.palette.common.white,
        transition: 'all 0.3s',
    },
    tabActive: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function Tabs({ value = 0, data, handleChange }) {
    const classes = useStyles();

    const renderItems = () => {
        return data.map((ele, ind) => {
            return (
                <Box
                    className={[
                        classes.tab,
                        value === ind ? classes.tabActive : '',
                    ].join(' ')}
                    key={ind}
                    onClick={() => handleChange(ind)}
                >
                    <Typography variant='subtitle2' component='span'>
                        {ele}
                    </Typography>
                </Box>
            );
        });
    };

    return <Box className={classes.root}>{renderItems()}</Box>;
}
