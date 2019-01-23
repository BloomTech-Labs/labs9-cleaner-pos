import React, { useState, useEffect } from 'react';
import { Container, LeafletMap } from '../../components/index';
import { AssistantBar, AsstDetail, AsstProperty, ThumbNail } from './Assistants.styling';

const AssistantsDetails = () => {
    return (
        <Container>
                <AssistantBar>
                    <AsstDetail>
                        <ThumbNail
                            src='../assets/ronald.jpg'
                            alt='Ronald'
                        />
                        <AsstProperty>
                            <h2>Ronald LeBagels</h2>
                            <h3>378 Corny Way</h3>
                        </AsstProperty>
                    </AsstDetail>
                </AssistantBar>
            <LeafletMap />
        </Container>
    );
};

export default AssistantsDetails;
