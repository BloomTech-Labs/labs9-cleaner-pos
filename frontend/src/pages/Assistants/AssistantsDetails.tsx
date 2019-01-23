import React, { useState, useEffect } from 'react';
import { Container, Button, LeafletMap } from '../../components/index';
import { AssistantBar, AsstDetail, AsstProperty, ThumbNail } from './Assistants.styling';

const AssistantsDetails = () => {
    return (
        <Container>
                <AssistantBar>
                    <ThumbNail
                        src='../assets/ronald.jpg'
                        alt='Ronald'
                        />
                    <AsstDetail>
                        <h2>Ronald LeBagels</h2>
                        <h3>378 Corny Way</h3>
                    </AsstDetail>
                    <AsstProperty>
                        <h2>Default Properties</h2>
                        <Button text='+ Add New Item' />
                    </AsstProperty>
                    <AsstProperty>
                        <h2>Available Properties</h2>
                        <Button text='+ Add New Item' />
                    </AsstProperty>
                </AssistantBar>
            <LeafletMap />
        </Container>
    );
};

export default AssistantsDetails;
