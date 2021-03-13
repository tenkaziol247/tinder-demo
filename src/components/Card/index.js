import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MapIcon from '@material-ui/icons/Map';
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';
import Draggable from 'react-draggable';

import { CardContext } from '../../App';

import Toolbar from '../Toolbar';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: (props) => 100 - props.z,
        transition: 'all 0.3s ease-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `linear-gradient(to top, ${theme.palette.common.white} 70%, ${theme.palette.common.black} 70.2%, ${theme.palette.grey[100]} 30%)`,
        border: (props) =>
            `1px solid ${
                props.like
                    ? theme.palette.success.light
                    : props.dislike
                    ? theme.palette.error.light
                    : theme.palette.common.white
            }`,
    },
    like: {
        position: 'absolute',
        top: 48,
        right: 32,
        fontWeight: 700,
        padding: 8,
        color: theme.palette.success.light,
        border: `2px solid ${theme.palette.success.light}`,
    },
    dislike: {
        position: 'absolute',
        top: 48,
        left: 32,
        fontWeight: 700,
        padding: 8,
        color: theme.palette.error.light,
        border: `2px solid ${theme.palette.error.light}`,
    },
    imgContainer: {
        margin: '16px 0',
        padding: 3,
        borderRadius: '50%',
        border: `1px solid ${theme.palette.common.black}`,
        backgroundColor: theme.palette.common.white,
        width: '130px',
        height: '130px',
    },
    img: {
        objectFit: 'cover',
        borderRadius: '50%',
        width: '100%',
        height: '100%',
    },
    toolbar: {
        padding: 3,
    },
    contentContainer: {
        height: 240,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    text: {
        marginTop: 12,
        textTransform: 'capitalize',
    },
}));

export default function Card({ z, data }) {
    const { userName, picture, name, gender, location, phone } = data;

    const [value, setValue] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const classes = useStyles({ z, like, dislike });

    const nodeRef = useRef(null);

    const { handleLoadMore, addFavourite } = useContext(CardContext);

    const handleChangeToolbar = (value) => {
        setValue(value);
    };

    const handleStart = (e) => {
        e.preventDefault();
    };

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: 0 });
        if (data.x >= 200) {
            setLike(true);
            return;
        }
        if (data.x <= -200) {
            setDislike(true);
            return;
        }
        setLike(false);
        setDislike(false);
    };

    const handleStop = (e, position) => {
        if (Math.abs(position.x) < 200) {
            setPosition({ x: 0, y: 0 });
            return;
        }
        if (position.x >= 200) {
            setPosition({ x: 2000, y: 0 });
            addFavourite(data);
        }
        if (position.x <= -200) {
            setPosition({ x: -2000, y: 0 });
        }
        handleLoadMore();
    };

    const renderContentItem = (ind, sub, text) => {
        return (
            <Box display={value === ind ? 'block' : 'none'}>
                <Typography component='p' variant='inherit'>
                    {sub}
                </Typography>
                <Typography
                    component='h2'
                    variant='inherit'
                    className={classes.text}
                >
                    {text}
                </Typography>
            </Box>
        );
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            axis='x'
            defaultPosition={{ x: 0, y: 0 }}
            position={position}
            grid={[24, 24]}
            scale={1}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
        >
            <Box className={classes.card} ref={nodeRef}>
                <Box className={classes.like} display={like ? 'block' : 'none'}>
                    Like
                </Box>
                <Box
                    className={classes.dislike}
                    display={dislike ? 'block' : 'none'}
                >
                    Dislike
                </Box>
                <Box className={classes.imgContainer}>
                    <img src={picture} alt='avatar' className={classes.img} />
                </Box>
                <Box className={classes.contentContainer}>
                    <Box>
                        {renderContentItem(
                            0,
                            'My name is',
                            `${name.first} ${name.last}`,
                        )}
                        {renderContentItem(1, 'My gender is', gender)}
                        {renderContentItem(2, 'My address is', location.street)}
                        {renderContentItem(3, 'My phone number is', phone)}
                        {renderContentItem(4, 'My account is', userName)}
                    </Box>
                </Box>
                <Box className={classes.toolbar}>
                    <Toolbar value={value} handleChange={handleChangeToolbar}>
                        <PermIdentityIcon fontSize='large' />
                        <ListAltIcon fontSize='large' />
                        <MapIcon fontSize='large' />
                        <PhoneIcon fontSize='large' />
                        <LockIcon fontSize='large' />
                    </Toolbar>
                </Box>
            </Box>
        </Draggable>
    );
}
