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
            
        </Container>
    )

}
