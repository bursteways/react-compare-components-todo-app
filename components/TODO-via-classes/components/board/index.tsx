import { Component, PropsWithChildren } from 'react';

type IProps = PropsWithChildren<{ className?: string }>;
type IState = {};

export class Board extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={`bg-base-100 shadow-xl w-full ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}
