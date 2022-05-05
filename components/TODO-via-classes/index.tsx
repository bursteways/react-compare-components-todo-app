import {
  Component,
  createRef,
  FormEvent,
  ReactElement,
  RefObject,
} from 'react';

// Components
import { Board, TextInput } from './components';
import { RemoveSVG } from 'components';

// Mocks
import MOCK_ITEMS from 'public/mocks/items.json';

// Utils
import { mockFetch } from 'utils';

// Types
import { Todo } from 'types';

interface ITodos {
  todoItems: Todo[];
}

type IProps = {};
type IState = ITodos;

export class TODOViaClasses extends Component<IProps, IState> {
  private readonly inputRef: RefObject<any>;

  constructor(props: IProps) {
    super(props);

    // Local State.
    this.state = {
      todoItems: [],
    };

    // Refs.
    this.inputRef = createRef();

    // Bind Event Handlers.
    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onToggleComplete = this.onToggleComplete.bind(this);
  }

  componentDidMount() {
    // Fetch from an `API` on load.
    mockFetch().then((): void => this.setState({ todoItems: MOCK_ITEMS }));
  }

  onRemoveItem(id: number): void {
    // Filter out the item via its `id`.
    const todoItems: Todo[] = this.state.todoItems.filter(
      (item: Todo): boolean => item.id !== id,
    );

    // Update the todoState without that item.
    this.setState({ todoItems });
  }

  onAddItem(e: FormEvent<EventTarget>): void {
    // Prevent default form submission behavior.
    e.preventDefault();

    // Get the value of the input field.
    const title: string = this.inputRef.current?.value || '';

    // Add the new item to the to-do list.
    this.setState(({ todoItems }: ITodos) => ({
      todoItems: [
        ...todoItems,
        { title, isComplete: false, id: todoItems.length + 1 },
      ],
    }));

    // Clear the value of the input.
    this.inputRef.current!.value = '';

    // Focus the user's cursor back to the input after adding.
    this.inputRef.current.focus();
  }

  onToggleComplete(id: number): void {
    // Flip the state of the checked/unchecked item.
    const todoItems: Todo[] = this.state.todoItems.map(
      (item: Todo): Todo =>
        item.id === id
          ? {
              ...item,
              isComplete: !item.isComplete,
            }
          : item,
    );

    // Set the state with the updated items.
    this.setState({ todoItems });
  }

  render() {
    return (
      <div className="bg-primary p-4">
        <h1 className="text-primary-content bold text-center text-2xl">
          Class components
        </h1>
        <form onSubmit={this.onAddItem}>
          <div className="grid grid-cols-12 gap-4 justify-between items-end">
            <div className="col-span-8">
              <TextInput
                id="todo-input"
                innerRef={this.inputRef}
                label="What do you have todo?"
              />
            </div>
            <button
              className="btn btn-accent col-span-4"
              onClick={this.onAddItem}
              type="button"
            >
              Add +
            </button>
          </div>
        </form>

        {/* List items */}
        <ul>
          {this.state.todoItems.map((item: Todo): ReactElement => {
            const { id, title, isComplete } = item;

            return (
              <li className="flex my-4" key={id}>
                <Board className="flex justify-between items-center px-2">
                  <label className="label cursor-pointer justify-start inline-flex">
                    <input
                      checked={isComplete}
                      className="checkbox mr-2"
                      onChange={(): void => this.onToggleComplete(id)}
                      type="checkbox"
                    />
                    <span
                      className={`label-text ${
                        isComplete && 'line-through italic'
                      }`}
                      title={title}
                    >
                      {title}
                    </span>
                  </label>
                  <button
                    className="btn btn-sm btn-error btn-circle"
                    onClick={(): void => this.onRemoveItem(id)}
                    title={`delete ${title}`}
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
  }
}
