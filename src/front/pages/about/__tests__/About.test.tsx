// #region imports
import React from 'react';
import renderer from 'react-test-renderer'; // needed both for snpashot testing but also to prevent errors from enzyme
import { MemoryRouter } from 'react-router';
import About from '../About';
// #endregion

describe('About page', () => {
  it('renders as expected', () => {
    const props = {};

    const component = renderer
      .create(
        <div>
          <MemoryRouter>
            <About />
          </MemoryRouter>
        </div>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
