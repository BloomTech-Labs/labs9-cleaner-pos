import React, { useState, useLayoutEffect, useRef } from 'react';
import { Button, Container } from '../../components/index';
import axios from 'axios';
import {
    AssistantItem,
    CardBody,
    ThumbNail,
    CardContent,
    ButtonContainer,
    CardHeading,
    Asst,
    CheckList,
    AssistantHeader,
} from './Assistants.styling';

interface AssistantsEnum extends Array<Assistant> {}

interface Assistant {
    id?: number;
    user_id: string;
}

const Assistants = () => {
    const [assistants, setAssistants] = useState<AssistantsEnum>([]);
    const shouldFetch = useRef(true);
    async function fetchAssistants() {
        try {
            const res = await axios.get('https://cleaner-pos.herokuapp.com/houses');
            setAssistants(res.data);
        } catch (e) {
            throw e;
        }
    }

    useLayoutEffect(
        () => {
            fetchAssistants();
            shouldFetch.current = false;
        },
        [shouldFetch],
    );

    return (
        <Container>
            <AssistantHeader>Turnover Assistants</AssistantHeader>
            {assistants.map((assistant) => {
                return (

                <AssistantItem key={assistants.id} data-testid='assistant-item'>
                    <ThumbNail
                        src='../../../../assets/ronald.jpg'
                        alt='Ronald'
                    />
                    <CardContent>
                        <CardHeading>
                            <h4>{assistant.id}</h4>
                        </CardHeading>
                        <CardBody>
                            <CheckList>
                                <p>Items</p>
                            </CheckList>
                            <ButtonContainer>
                                <Button text='House Availability' datatestid='assistant-button' />
                            </ButtonContainer>
                            <Asst>
                                <div>This is a placeholder.</div>
                            </Asst>
                        </CardBody>
                    </CardContent>
                </AssistantItem>
                );
            })}
        </Container>
    );
};

export default Assistants;
