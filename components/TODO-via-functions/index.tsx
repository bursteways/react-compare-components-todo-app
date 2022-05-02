import { DOMElement, forwardRef, ReactElement, useRef, useState } from 'react';

// Components
import { TextInput } from './components';

export const TODOViaFunctions = (): ReactElement => {
  const [todoState, setTodoState] = useState();
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputEl.current?.focus();
  };

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
    </div>
  );
};
