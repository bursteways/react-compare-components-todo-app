import { Component, InputHTMLAttributes, Ref } from 'react';

// Types
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  innerRef: Ref<HTMLInputElement>;
}
export class TextInput extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { label, innerRef } = this.props;

    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered"
          ref={innerRef}
        />
      </div>
    );
  }
}
