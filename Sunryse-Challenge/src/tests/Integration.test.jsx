import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App'; 

describe('App component', () => {
  it('should open the modal when a random card is clicked', async () => {
    render(<App />);

    const cardElements = await screen.findAllByTestId('user-card');

    fireEvent.click(cardElements[0]); 

    const modalText = await screen.findByText(/Role:/i);
    expect(modalText).toBeInTheDocument();
  });
});