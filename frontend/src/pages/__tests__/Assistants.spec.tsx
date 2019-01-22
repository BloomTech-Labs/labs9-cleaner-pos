import React from 'react';
import { Assistants } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import { waitForElement, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('Houses dashboard', () => {
    test('should render an assistant card for every assistant received through axios call', async () => {
        const { getAllByTestId } = renderWithRouter(<Assistants />, {});
        const assistantCards = await waitForElement(() => getAllByTestId('assistant-item'));
        expect(assistantCards.length).toBe(3);
    });

    test('should include 1 button for every assistant card,', async () => {
        const { getAllByTestId } = renderWithRouter(<Assistants />, {});

        const buttons = await waitForElement(() => getAllByTestId('assistant-button'));
        expect(buttons.length).toBe(3);
    });
});
