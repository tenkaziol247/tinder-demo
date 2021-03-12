import { Box } from '@material-ui/core';
import React, { useContext } from 'react';
import Card from '../Card';
import { CardContext } from '../../App';

export default function Board(props) {
    const { cardList } = useContext(CardContext);

    const renderCard = () => {
        return cardList.map((ele, ind) => {
            return <Card z={ind} key={ind} data={ele} />;
        });
    };

    return (
        <Box width={1} height={1} position='relative'>
            {renderCard()}
        </Box>
    );
}
