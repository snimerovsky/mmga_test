import React, { Component, createRef, ReactNode, RefObject } from 'react';

interface HandleOnClickOutsideProps {
  className?: string;
  children: ReactNode;
  onClickOutsideCallback: () => void;
}

export class HandleOnClickOutside extends Component<HandleOnClickOutsideProps> {
  static defaultProps = {
    className: '',
  };

  ref: RefObject<HTMLDivElement> = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside as any);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside as any);
  }

  handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onClickOutsideCallback } = this.props;
    if (this.ref.current && !this.ref.current.contains((event as any).target)) {
      onClickOutsideCallback();
    }
  };

  render() {
    const { children, className } = this.props;
    return <div ref={this.ref} className={className}>{children}</div>;
  }
}
