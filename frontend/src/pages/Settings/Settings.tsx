import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Button } from '../../components/shared_components';

const Settings = () => {
    return (
        <Container>
        <Button text='Update Contact' />
            <input type='checkbox' name='email' /> I would like to receive updates via email.<br />
            <input type='checkbox' name='text' /> I would like to receive updates via text.<br />
        <Button text='Save' />
        </Container>
    );
};

export default Settings;
