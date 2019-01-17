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
