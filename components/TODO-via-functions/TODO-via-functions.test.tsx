import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { TODOViaFunctions } from './';

describe('<TODOViaFunctions />', () => {
  beforeEach(() => {
    render(<TODOViaFunctions />);
  });
  it('renders a heading, an input field, and a submit button.', async () => {
    // Heading.
    await screen.findByRole('heading', {
      level: 1,
      name: 'Functional components',
    });

    // Input.
    await screen.findByLabelText('What do you have todo?', {
      selector: 'input',
    });

    // Submit button.
    await screen.findByRole('button', {
      name: 'Add +',
    });
  });

  it('should add items to the list when submitted', async () => {
    // Input.
    const input: HTMLInputElement = await screen.findByLabelText(
      /What do you have todo?/i,
    );
    // Type into the field.
    await userEvent.type(input, 'Drive to the store');

    // Assert there is a value.
    expect(input.value).toBe('Drive to the store');

    // Click the button to add.
    const button = await screen.findByRole('button', {
      name: 'Add +',
    });
    await userEvent.click(button);

    // Expect the input to be empty after the event.
    expect(input.value).toBe('');

    // Expect there to be a new list item.
    await screen.findByLabelText('Drive to the store');
  });

  it('should mark the item as complete when the checkbox is clicked', async () => {
    // Find the default item (timeout needed to showcase API load time).
    await waitFor(
      async () => {
        // Find checkbox.
        const checkbox = await screen.findByRole('checkbox');

        // Assert there first items is loaded.
        const todoItem = await screen.findByTitle('Mow the lawn');

        // Click the checkbox.
        await userEvent.click(checkbox);

        // Assert that it is marked as completed after the click.
        await expect(todoItem).toHaveClass('line-through italic');
      },
      { timeout: 2000 },
    );
  });

  it('should remove the item from the list when the delete button is clicked', async () => {
    // Find the default item (timeout needed to showcase API load time).
    await waitFor(
      async () => {
        const deleteButton = await screen.findByRole('button', {
          name: 'delete Mow the lawn',
        });

        // Click the delete button.
        await userEvent.click(deleteButton);
      },
      { timeout: 2000 },
    );

    // Assert the item no longer exists.
    const deleteButton = screen.queryByRole('button', {
      name: 'delete Mow the lawn',
    });

    expect(deleteButton).toBeNull();
  });
});
