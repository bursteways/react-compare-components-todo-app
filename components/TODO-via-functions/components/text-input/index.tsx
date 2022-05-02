import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from 'react';

// Types
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLInputElement>): ReactElement => {
    const { label } = props;

    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered"
          ref={ref}
        />
      </div>
    );
  },
);
