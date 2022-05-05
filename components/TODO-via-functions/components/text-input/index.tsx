import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from 'react';

// Types
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const TextInput = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLInputElement>): ReactElement => {
    const { id, label } = props;

    return (
      <div className="form-control w-full">
        <label className="label" id={id}>
          <span className="label-text">{label}</span>
        </label>
        <input
          aria-labelledby={id}
          className="input input-bordered"
          placeholder="Type here"
          ref={ref}
          type="text"
        />
      </div>
    );
  },
);
