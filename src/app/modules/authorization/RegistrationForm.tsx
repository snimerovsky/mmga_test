import { Field, FieldProps, Form, Formik } from "formik";
import React from "react";
import { withRoute } from "react-router5";
import { RouteContext } from "react-router5/types/types";
import * as Yup from "yup";
import { Api } from "../../../api";
import { withApi } from "../../../api/withApi";
import { Button } from "../../../ui/button";
import Checkbox from "../../../ui/checkbox";
import { getIndicatorStatus } from "../../../ui/Indicator/utils";
import { Input } from "../../../ui/input";
import { RouteNameChoices, RouteNames, router } from "../router";
import { FieldWrapper } from "./FieldWrapper";
import { InputWrapper } from "./InputWrapper";
import { SelectError } from "./SelectError";
import classnames from "classnames";
import styles from "./RegistrationForm.module.scss";

const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неверный формат имейла")
    .required("Введите ваш имейл"),
  password: Yup.string()
    .min(6, "Пароль слишком короткий!")
    .max(50, "Пароль слишком длинный!")
    .required("Введи пароль"),
  referrer: Yup.string(),
  phone: Yup.string()
    .required("Введите ваш телефон")
    .test(
      "phoneNumberLengthIs10Digits",
      "Неверный формат телефона",
      (value: string = "") => {
        return value.length === 18;
      }
    )
    .required(),
  agreement: Yup.boolean().oneOf([true], "Вам нужно согласиться с правилами"),
  login: Yup.string().required("Введите ваш логин"),
});

interface IFormValues {
  email: string;
  password: string;
  referrer: string;
  phone: string;
  login: string;
  agreement: boolean;
}

interface IProps extends RouteContext {
  api: Api;
}

function _RegistrationForm(props: IProps) {
  const {
    api,
    route: { path },
  } = props;

  const paramUrl =
    path !== `/${RouteNames[RouteNameChoices.registration]}`
      ? path.split(`/${RouteNames[RouteNameChoices.registration]}/`).join("")
      : "";

  return (
    <Formik<IFormValues>
      initialValues={{
        email: "",
        password: "",
        referrer: paramUrl,
        phone: "",
        login: "",
        agreement: false,
      }}
      onSubmit={async (values, { setErrors }) => {
        const { password, email, login, phone, referrer } = values;
        try {
          await api.register({
            password,
            email,
            login,
            phone,
            referrer,
          });
          router.navigate(RouteNames[RouteNameChoices.profileRegistrationForm]);
        } catch (e) {
          setErrors(e.response.data);
        }
      }}
      validationSchema={registrationSchema}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form translate="" className={styles.RegistrationForm}>
          {paramUrl.length === 0 ? null : (
            <Field name={"referrer"}>
              {(props: FieldProps<string, IFormValues>) => {
                const { field, meta } = props;
                return (
                  <InputWrapper
                    labelText={"Реферальная ссылка"}
                    name={field.name}
                  >
                    <Input
                      readOnly
                      type={"text"}
                      indicator={{
                        status: getIndicatorStatus(true, meta.error),
                      }}
                      error={meta.touched && meta.error}
                      {...field}
                      onChange={(value) => {
                        setFieldValue(field.name, value);
                      }}
                    />
                  </InputWrapper>
                );
              }}
            </Field>
          )}
          <Field name={"email"}>
            {(props: FieldProps<string, IFormValues>) => {
              const { field, meta } = props;
              // console.log('meta.touched, meta.error', meta.touched, meta.error);
              return (
                <InputWrapper name={field.name} labelText={"Электронный адрес"}>
                  <Input
                    type={"text"}
                    placeholder={"name@e-mail.com"}
                    indicator={{
                      status: getIndicatorStatus(meta.touched, meta.error),
                    }}
                    error={meta.touched && meta.error}
                    {...field}
                    onChange={(value) => {
                      setFieldValue(field.name, value);
                    }}
                  />
                </InputWrapper>
              );
            }}
          </Field>
          <FieldWrapper
            type={"phone"}
            name={"phone"}
            labelText={"Номер телефона"}
            autocomplete={"off"}
            setFieldValue={setFieldValue}
            placeholder={"+ 7 (___) __-__-__"}
          />
          <FieldWrapper
            labelText={"Имя аккаунта в сервисе"}
            name={"login"}
            setFieldValue={setFieldValue}
            type={"text"}
            placeholder={"546cvf44"}
          />
          <FieldWrapper
            labelText={"Пароль"}
            name={"password"}
            setFieldValue={setFieldValue}
            type={"password"}
          />
          <Field name={"agreement"}>
            {(props: FieldProps<string, IFormValues>) => {
              const { form, field, meta } = props;
              const { setValue } = form.getFieldHelpers(field.name);
              return (
                <div
                  className={classnames({
                    [styles.checkbox]: true,
                    [styles.checkbox_invalid]: meta.touched && meta.error,
                  })}
                >
                  <Checkbox
                    value={values.agreement}
                    onChange={setValue}
                    text={
                      <div>
                        Создавая аккаунт, вы соглашаетесь с
                        <a href="conditions">Условиями использования</a> и{" "}
                        <a href="rules">Правилами</a> конфиденциальности MMGA"
                      </div>
                    }
                  />
                  <SelectError touched={meta.touched} error={meta.error} />
                </div>
              );
            }}
          </Field>
          <div className={styles.buttonWrapper}>
            <div className={styles.button}>
              <Button
                text={"Регистрация"}
                type={"submit"}
                // disabled={isSubmitting || !values.agreement}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export const RegistrationForm = withRoute(withApi(_RegistrationForm));
