import { it, expect, describe } from 'vitest';
import { render, screen } from "@testing-library/react";
import Card from '../Card';

describe('Card', () => {
    it('should render the card when client data is provided', () => {
        render(<Card
            firstName={"Manu"}
            lastName={"Sekhon"}
            profilePic={"https://robohash.org/illumvitaeea.png?size=50x50&set=set1"} />)

            screen.debug();
    })
    
})