import classNames from "classnames";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { Indicator, Types as IndicatorTypes } from "../Indicator";
import FadeAnimation from "../utils/fade-animation";
import { HandleOnClickOutside } from "../utils/handle-on-click-outside";
import styles from "./Container.module.scss";
import { IProps as IOptionProps, Option } from "./Option";

interface IProps {
  options: IOptionProps[];
  className?: string;
  defaultText?: string;
  indicator?: {
    status: IndicatorTypes;
  };
  defaultSelectedOptionId?: string | number;
  disabled?: boolean;
  error?: boolean | string;
  onChange?: (id: string | number) => void;
}

@observer
export class Container extends Component<IProps> {
  @observable
  optionsIsVisible: boolean = false;

  @observable
  selectedOptionId: number | string | null = null;

  componentDidMount() {
    if (this.props.defaultSelectedOptionId !== undefined) {
      const option = this.props.options.find(
        (option: IOptionProps) =>
          option.id === this.props.defaultSelectedOptionId
      );
      if (option !== undefined) {
        runInAction(() => {
          this.selectedOptionId = option.id;
        });
      }
    }
  }

  @action
  setOptionsVisibility = (value: boolean) => {
    this.optionsIsVisible = value;
  };

  showOptions = () => {
    if (this.props.disabled) {
      return;
    }
    if (this.optionsIsVisible) {
      this.setOptionsVisibility(false);
      return;
    }
    this.setOptionsVisibility(true);
  };

  hideOptions = () => {
    this.setOptionsVisibility(false);
  };

  @action
  onOptionClick = (id: string | number) => {
    this.selectedOptionId = id;
    this.hideOptions();
    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.selectedOptionId);
    }
  };

  getOptionTextById = (id: string | number | null) => {
    let option = this.props.options.find(
      (option: IOptionProps) => option.id === id
    );
    if (option === undefined) {
      return this.props.defaultText;
    }
    return option.text;
  };

  render() {
    const { className, options, indicator, error, disabled } = this.props;
    const optionText = this.getOptionTextById(this.selectedOptionId);
    return (
      <HandleOnClickOutside onClickOutsideCallback={this.hideOptions}>
        <div className={classNames(styles.Container, className)}>
          {indicator && <Indicator status={indicator.status} />}
          <div
            className={classNames(styles.field, {
              [styles.fieldError]: typeof error === "string",
              [styles.fieldDisabled]: disabled,
            })}
            onClick={this.showOptions}
          >
            <div
              className={classNames(styles.arrow, {
                [styles.opened]: this.optionsIsVisible,
                [styles.arrowDisabled]: disabled
              })}
            />
            <span
              className={classNames(styles.text, {
                [styles.default]: this.props.defaultText === optionText
              })}
            >
              {optionText}
            </span>
            {error && <div className={styles.errorText}>{error}</div>}
          </div>
          <FadeAnimation
            isVisible={this.optionsIsVisible}
            className={styles.options}
          >
            {options.map(opt => {
              return (
                <Option
                  id={opt.id}
                  text={opt.text}
                  className={opt.className}
                  onClick={this.onOptionClick}
                  key={opt.id}
                />
              );
            })}
          </FadeAnimation>
        </div>
      </HandleOnClickOutside>
    );
  }
}
