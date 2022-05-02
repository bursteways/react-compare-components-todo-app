import { Component, createRef, RefObject } from 'react';

// Components
import { TextInput } from './components';

export class TODOViaClasses extends Component {
  private readonly inputRef: RefObject<any>;
  constructor(props: any) {
    super(props);

    // Local State.
    this.state = {};

    // Refs.
    this.inputRef = createRef();

    // Bind Event Handlers.
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.inputRef.current.focus();
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
      </div>
    );
  }
}
