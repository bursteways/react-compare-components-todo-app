import { Component, InputHTMLAttributes, Ref } from 'react';

// Types
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  innerRef: Ref<HTMLInputElement>;
}

export class TextInput extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { id, label, innerRef } = this.props;

    return (
      <div className="form-control w-full">
        <label className="label" id={id}>
          <span className="label-text">{label}</span>
        </label>
        <input
          aria-labelledby={id}
          className="input input-bordered"
          placeholder="Type here"
          ref={innerRef}
          type="text"
        />
      </div>
    );
  }
}
