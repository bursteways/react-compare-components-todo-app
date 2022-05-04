import { PropsWithChildren, ReactElement } from 'react';

type IProps = PropsWithChildren<{
  className?: string;
}>;

export const Board = (props: IProps): ReactElement => {
  const { children, className } = props;
  return (
    <div className={`bg-base-100 shadow-xl w-full ${className}`}>
      {children}
    </div>
  );
};
