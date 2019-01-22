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

                <AssistantItem key={assistant.id} data-testid='assistant-item'>
                    {/* ThumbNail image should render inline with each assistant card}
                    {/* <ThumbNail
                        src='../../../../assets/ronald.jpg'
                        alt='Ronald'
                    /> */}
                    <CardContent>
                        <CardHeading>
                            {/* <h4>{assistant.id}</h4> */}
                        </CardHeading>
                        <CardBody>
                            <ThumbNail
                                src='../assets/ronald.jpg'
                                alt='Ronald'
                            />
                            <CheckList>
                                <h3>Checklist Items</h3>
                            </CheckList>
                            <Asst>
                                <h3>Available Houses</h3>
                            </Asst>
                            <ButtonContainer>
                                <Button text='House Availability' datatestid='assistant-button' />
                            </ButtonContainer>
                        </CardBody>
                    </CardContent>
                </AssistantItem>
                );
            })}
        </Container>
    );
};

export default Assistants;
