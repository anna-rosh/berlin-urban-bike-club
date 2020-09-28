import React from 'react';
import BioEditor from './BioEditor';
import { render, fireEvent, waitFor, waitForElement } from "@testing-library/react";
import axios from './axios';

//////////////////// TEST 1 //////////////////
test("Shows the 'add bio' button if the passed bio value is falsy", () => {
    const { container } = render(<BioEditor bio={null} />);

    expect(container.querySelector('.add-bio-btn').innerHTML)
        .toContain('add bio');
});

//////////////////// TEST 2 ///////////////////
test("Shows the 'edit bio' button if the passed bio value is truthy", () => {
    const { container } = render(<BioEditor bio="here is some bio" />);

    expect(container.querySelector('.edit-bio-btn').innerHTML)
        .toContain('edit bio');
});

////////////////// TEST 3 ////////////////////
test("A textarea and the 'save' btn are shown when 'add bio' or 'edit bio' are cliked", () => {
    const { container } = render(<BioEditor bio={null} />);

    expect(container.innerHTML).toContain('add bio');

    fireEvent.click(container.querySelector('.add-bio-btn'));

    expect(container.innerHTML).toContain('textarea');
    expect(container.innerHTML).toContain('save-bio-btn');
});

///////////////// TESTS 4 & 5 ////////////////
