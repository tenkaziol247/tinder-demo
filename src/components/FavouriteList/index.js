import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 8,
    },
    listItemText: {
        '& > .MuiListItemText-primary': {
            textTransform: 'capitalize',
        },
    },
}));

export default function FavouriteList({ data, removeFarouriteItem }) {
    const classes = useStyles();

    const renderFavouriteItem = () => {
        return data.map((ele, ind) => {
            return (
                <ListItem key={ind} button divider>
                    <ListItemAvatar>
                        <Avatar alt='avatar-item' src={ele.picture} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${ele.name.title}. ${ele.name.first} ${ele.name.last}`}
                        className={classes.listItemText}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            size='small'
                            onClick={() => removeFarouriteItem(ele.sha256)}
                        >
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    };

    return (
        <Box className={classes.root}>
            <List dense>{renderFavouriteItem()}</List>
        </Box>
    );
}
