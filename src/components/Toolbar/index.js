import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        position: 'relative',
        cursor: 'pointer',
        margin: '0 4px',
        padding: '8px 0',
        borderTop: `2px solid transparent`,
        transition: 'all 0.3s ease-out',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderTop: `6px solid transparent`,
            borderBottom: `6px solid transparent`,
            borderLeft: `6px solid transparent`,
            borderRight: `6px solid transparent`,
            transition: 'all 0.3s ease-out',
        },
    },
    itemActive: {
        color: theme.palette.success.main,
        borderTopColor: theme.palette.success.main,
        '&::after': {
            borderBottomColor: theme.palette.success.main,
        },
    },
}));

export default function Toolbar({ value = 0, children, handleChange }) {
    const classes = useStyles();

    const renderItems = () => {
        return React.Children.map(children, (ele, ind) => {
            return (
                <Box
                    key={ind}
                    className={[
                        classes.item,
                        value === ind ? classes.itemActive : '',
                    ].join(' ')}
                    onClick={() => handleChange(ind)}
                    onTouchStart={() => handleChange(ind)}
                >
                    {ele}
                </Box>
            );
        });
    };

    return <Box className={classes.root}>{renderItems()}</Box>;
}
