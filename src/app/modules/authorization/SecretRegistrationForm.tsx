import { Formik } from "formik";
import React from "react";
import { withRoute } from "react-router5";
import { RouteContext } from "react-router5/types/types";
import { Api } from "../../../api";
import { withApi } from "../../../api/withApi";
import { Button } from "../../../ui/button";
import Checkbox from "../../../ui/checkbox";
import { getIndicatorStatus } from "../../../ui/Indicator/utils";
import { Input } from "../../../ui/input";
import { RouteNameChoices, RouteNames } from "../router";
import { authSchema } from "./authSchema";
import { InputWrapper } from "./InputWrapper";
import styles from "./RegistrationForm.module.scss";

interface IProps extends RouteContext {
  api: Api;
}

function _SecretRegistrationForm(props: IProps) {
  const api = props.api;
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        agreement: false,
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await api.registerHidden({
            email: values.email,
            password: values.password,
          });
          props.router.navigate(
            RouteNames[RouteNameChoices.profileRegistrationForm]
          );
        } catch (e) {
          if (e.response.data === "email exists") {
            setErrors({
              email: e.response.data,
            });
          }
        }
        setSubmitting(false);
      }}
      validationSchema={authSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.RegistrationForm}>
            <InputWrapper name={"email"} labelText={"Электронный адрес"}>
              <Input
                type={"text"}
                name={"email"}
                placeholder={"name@e-mail.com"}
                indicator={{
                  status: getIndicatorStatus(touched.email, errors.email),
                }}
                onChange={(value) => {
                  setFieldValue("email", value);
                }}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email}
              />
            </InputWrapper>
            <InputWrapper name={"password"} labelText={"Пароль"}>
              <Input
                type={"password"}
                name={"password"}
                indicator={{
                  status: getIndicatorStatus(touched.password, errors.password),
                }}
                onChange={(value) => {
                  setFieldValue("password", value);
                }}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password}
              />
            </InputWrapper>
            <div className={styles.checkbox}>
              <Checkbox
                text={
                  "Создавая аккаунт, вы соглашаетесь с Условиями использования и Правилами конфиденциальности MMGA"
                }
                value={values.agreement}
                onChange={(value: any) => {
                  setFieldValue("agreement", value);
                }}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <div className={styles.button}>
                <Button
                  text={"Регистрация"}
                  type={"submit"}
                  disabled={!values.agreement || isSubmitting}
                />
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export const SecretRegistrationForm = withRoute(
  withApi(_SecretRegistrationForm)
);
