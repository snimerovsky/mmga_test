import { Field, FieldProps } from "formik";
import React from "react";
import { getIndicatorStatus } from "../../../ui/Indicator/utils";
import { Input } from "../../../ui/input";
import { InputWrapper } from "./InputWrapper";

interface IProps {
  name: string;
  labelText: string;
  setFieldValue: Function;
  placeholder?: string;
  type: "text" | "password" | "number" | "phone";
  autocomplete?: string;
}

export function FieldWrapper<FormValues>(props: IProps) {
  const { setFieldValue, labelText, type, placeholder, name, autocomplete } = props;
  return (
    <Field name={name}>
      {(props: FieldProps<string>) => {
        const { field, meta } = props;
        return (
          <InputWrapper labelText={labelText} name={field.name}>
            <Input
              type={type}
              indicator={{
                status: getIndicatorStatus(meta.touched, meta.error)
              }}
              error={meta.touched && meta.error}
              {...field}
              onChange={value => {
                setFieldValue(field.name, value);
              }}
              placeholder={placeholder}
              autocomplete={autocomplete}
            />
          </InputWrapper>
        );
      }}
    </Field>
  );
}
