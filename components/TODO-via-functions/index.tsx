import {
  FormEvent,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

// Components
import { RemoveSVG } from 'components';
import { Board, TextInput } from './components';

// Mocks
import MOCK_ITEMS from 'public/mocks/items.json';

// Utils
import { mockFetch } from 'utils';

// Types
import { Todo } from 'types';

export const TODOViaFunctions = (): ReactElement => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const inputEl: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

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

  const onRemoveItem = (id: number): void => {
    // Filter out the item via its `id`.
    const updatedItems: Todo[] = todoItems.filter(
      (item: Todo) => item.id !== id,
    );

    // Update the todoState without that item.
    setTodoItems(updatedItems);
  };

  const onAddItem = (e: FormEvent<EventTarget>): void => {
    // Prevent default form submission behavior.
    e.preventDefault();

    // Get the value of the input field.
    const title: string = inputEl.current?.value || '';

    // Add the new item to the to-do list.
    setTodoItems((prevItems: Todo[]): Todo[] => [
      ...prevItems,
      { title, isComplete: false, id: todoItems.length + 1 },
    ]);

    // Clear the value of the input.
    inputEl.current!.value = '';

    // Focus the user's cursor back to the input after adding.
    inputEl.current!.focus();
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
      <form onSubmit={onAddItem}>
        <div className="grid grid-cols-12 gap-4 justify-between items-end">
          <div className="col-span-8">
            <TextInput ref={inputEl} label="What do you have todo?" />
          </div>
          <button
            className="btn btn-accent col-span-4"
            onClick={onAddItem}
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
              <Board className="flex justify-between items-center px-2">
                <label className="label cursor-pointer justify-start inline-flex">
                  <input
                    checked={isComplete}
                    className="checkbox mr-2"
                    onChange={(): void => onToggleComplete(id)}
                    type="checkbox"
                  />
                  <span
                    className={`label-text ${
                      isComplete && 'line-through italic'
                    }`}
                  >
                    {title}
                  </span>
                </label>
                <button
                  className="btn btn-sm btn-error btn-circle"
                  onClick={(): void => onRemoveItem(id)}
                >
                  <RemoveSVG />
                </button>
              </Board>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
