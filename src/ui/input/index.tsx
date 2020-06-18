import classNames from "classnames";
import React, { Component } from "react";
import { Indicator, Types as IndicatorTypes } from "../Indicator";
import styles from "./index.module.scss";
import IMask from "imask";

export interface IProps {
  name: string;
  type: "text" | "password" | "number" | "phone";
  onChange?: (value: string | number) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  readOnly?: boolean;
  indicator?: {
    status: IndicatorTypes;
  };
  value?: string;
  error?: boolean | string;
  autocomplete?: string;
}

export class Input extends Component<IProps> {
  ref = React.createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.props.type === "phone") {
      IMask(this.ref.current!, {
        mask: "+{7} (000) 000-00-00"
      });
    }
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event.target.value);
    }
  };

  render() {
    const {
      name,
      type,
      placeholder,
      defaultValue,
      className,
      readOnly,
      indicator,
      onBlur,
      value,
      error,
      autocomplete,
    } = this.props;
    return (
      <div className={styles.Input}>
        {indicator && <Indicator status={indicator.status} />}
        <input
          ref={this.ref}
          className={classNames(styles.field, className, {
            [styles.fieldError]: typeof error === 'string'
          })}
          placeholder={placeholder}
          name={name}
          type={type}
          defaultValue={defaultValue}
          readOnly={readOnly}
          onChange={this.onChange}
          onBlur={onBlur}
          value={value}
          autoComplete={autocomplete}
        />
        {error && <div className={styles.errorText}>{error}</div>}
      </div>
    );
  }
}
