import React, { useState, useLayoutEffect, useRef } from 'react';
import { Button, Container, SpecialButton } from '../../components/index';
import axios, { AxiosRequestConfig } from 'axios';
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
    HeaderWrapper,
} from './Assistants.styling';

interface AssistantsEnum extends Array<Assistant> {}

interface Assistant {
    id?: number;
    user_id: string;
    openAst: any;
    house_id: any;
}

const token = localStorage.getItem('token');

const header: AxiosRequestConfig = {
    headers: { Authorization: token },
};

const Assistants = () => {
    const [assistants, setAssistants] = useState<AssistantsEnum>([]);
    const shouldFetch = useRef(true);
    async function fetchAssistants() {
        try {
            const res = await axios.get('https://cleaner-pos.herokuapp.com/assistants', header);
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
            <HeaderWrapper>
                <AssistantHeader>Turnover Assistants</AssistantHeader>
                <Button text='+ New Assistant' />
            </HeaderWrapper>
            {assistants.map((assistant) => {
                return (
                <AssistantItem key={assistant.id} data-testid='assistant-item'>
                    <CardContent>
                        <CardHeading>
                            {/* May move a header in here later */}
                        </CardHeading>
                        <CardBody>
                            <ThumbNail
                                src='../assets/ronald.jpg'
                                alt='Ronald'
                            />
                            <CheckList>
                                <h3>Checklist Items</h3>
                                <div>{assistant.openAst.length}</div>
                            </CheckList>
                            <Asst>
                                <h3>Available Houses</h3>
                                <div>{assistant.openAst.length}</div>
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
