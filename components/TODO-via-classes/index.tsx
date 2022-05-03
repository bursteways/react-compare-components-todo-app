import { Component, createRef, ReactElement, RefObject } from 'react';

// Components
import { TextInput } from './components';

// Mocks
import MOCK_ITEMS from 'static/mocks/items.json';

// Utils
import { mockFetch } from 'utils';

// Types
import { Todo } from 'types';

type IProps = {};
type IState = { todoItems: Todo[] };

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggleComplete = this.onToggleComplete.bind(this);
  }

  componentDidMount() {
    // Fetch from an `API` on load.
    mockFetch().then((): void => this.setState({ todoItems: MOCK_ITEMS }));
  }

  onSubmit(): void {
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
        <form>
          <div className="grid grid-cols-12 gap-4 justify-between items-end">
            <div className="col-span-8">
              <TextInput
                innerRef={this.inputRef}
                label="What do you have todo?"
              />
            </div>
            <button
              className="btn btn-accent col-span-4"
              onClick={this.onSubmit}
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
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      checked={isComplete}
                      className="checkbox mr-2"
                      onChange={(): void => this.onToggleComplete(id)}
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
  }
}
