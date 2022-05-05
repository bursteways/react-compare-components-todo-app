import { render, screen } from '@testing-library/react';

// Components
import Index from 'pages';

describe('<Index />', () => {
  it('should render a class app + a functional app', async () => {
    render(<Index />);

    // Class Component h1.
    await screen.findByRole('heading', {
      level: 1,
      name: 'Class components',
    });

    // Functional Component h1.
    await screen.findByRole('heading', {
      level: 1,
      name: 'Functional components',
    });
  });
});
