import React, { useState, useEffect } from 'react';
import { RowContainer, LeafletMap } from '../../components/index';
import { AssistantBar, AsstDetail, AsstProperty, ThumbNail, DetailMap } from './Assistants.styling';

const AssistantsDetails = () => {
    return (
        <RowContainer>
            <DetailMap>
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
            </DetailMap>
        <LeafletMap />
        </RowContainer>
    );
};

export default AssistantsDetails;
