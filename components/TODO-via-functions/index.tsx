import { ReactElement, RefObject, useEffect, useRef, useState } from 'react';

// Components
import { TextInput } from './components';

// Mocks
import MOCK_ITEMS from 'static/mocks/items.json';

// Utils
import { mockFetch } from 'utils';

// Types
import { Todo } from 'types';

export const TODOViaFunctions = (): ReactElement => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const inputEl: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const onButtonClick = (): void => {
    // Focus the user's cursor back to the input after adding.
    inputEl.current?.focus();
  };

  const onToggleComplete = (id: number): void => {
    // Flip the state of the checked/unchecked item.
    const updatedItems: Todo[] = todoItems.map(
      (item: Todo): Todo =>
        item.id === id
          ? {
              ...item,
              isComplete: !item.isComplete,
            }
          : item,
    );

    // Set the state with the updated items.
    setTodoItems(updatedItems);
  };

  useEffect(() => {
    // Fetch from an `API` on load.
    mockFetch().then((): void => setTodoItems(MOCK_ITEMS));
  }, []);

  return (
    <div className="bg-secondary p-4">
      <h1 className="text-secondary-content bold text-center text-2xl">
        Functional components
      </h1>
      <form>
        <div className="grid grid-cols-12 gap-4 justify-between items-end">
          <div className="col-span-8">
            <TextInput ref={inputEl} label="What do you have todo?" />
          </div>
          <button
            className="btn btn-accent col-span-4"
            onClick={onButtonClick}
            type="button"
          >
            Add +
          </button>
        </div>
      </form>

      {/* List items */}
      <ul>
        {todoItems.map((item: Todo): ReactElement => {
          const { id, isComplete, title } = item;

          return (
            <li className="flex my-4" key={id}>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    checked={isComplete}
                    className="checkbox mr-2"
                    onChange={(): void => onToggleComplete(id)}
                    type="checkbox"
                  />
                  <span className="label-text">{title}</span>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
