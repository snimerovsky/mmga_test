import React, { Component, createRef, CSSProperties, ReactNode } from 'react';

interface IProps {
  isVisible: boolean;
  children: ReactNode;
  animationDuration?: string;
  className?: string;
}

interface IState {
  opacity: number;
  isVisible: boolean;
}

export default class FadeAnimation extends Component<IProps, IState> {
  static defaultProps = {
    animationDuration: '.2s',
  };

  state = {
    opacity: this.props.isVisible ? 1 : 0,
    isVisible: this.props.isVisible,
  };

  ref = createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.ref.current !== null) {
      this.ref.current.addEventListener('transitionend', (event: any) => {
        if (event.target.style.opacity === '0') {
          this.setState({ isVisible: false });
        }
      });
    }
  }

  componentDidUpdate(prevProps: IProps) {
    const { isVisible } = this.props;
    if (!prevProps.isVisible && isVisible) {
      this.setState({ opacity: 1, isVisible: true });
    }
    if (prevProps.isVisible && !isVisible) {
      this.setState({ opacity: 0 });
    }
  }

  render() {
    const { children, animationDuration, className } = this.props;
    const { isVisible, opacity } = this.state;
    const style: CSSProperties = {
      opacity,
      transition: `opacity ${animationDuration} cubic-bezier(0.55, 0, 0.55, 0.2)`,
    };
    return (
      <div style={style} ref={this.ref} className={className}>
        {isVisible && children}
      </div>
    );
  }
}
