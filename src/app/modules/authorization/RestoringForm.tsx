import { Form, Formik } from "formik";
import React from "react";
import { withRoute } from "react-router5";
import { RouteContext } from "react-router5/types/types";
import * as Yup from "yup";
import { Api } from "../../../api";
import { withApi } from "../../../api/withApi";
import { Button } from "../../../ui/button";
import { RouteNameChoices, RouteNames, router } from "../router";
import { FieldWrapper } from "./FieldWrapper";
import styles from "./RestoringForm.module.scss";
import { Header } from "../../../ui/header";

const registrationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Пароль слишком короткий!")
    .max(50, "Пароль слишком длинный!")
    .required("Введи пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают!")
    .required("Введи пароль"),
});

interface IFormValues {
  password: string;
  confirmPassword: string;
}

interface IProps extends RouteContext {
  api: Api;
}

function _RestoringForm(props: IProps) {
  const {
    api,
    route: { path },
  } = props;

  return (
    <div className={styles.AuthorizationPage}>
      <Header />
      <main>
        <div className={styles.tabs}>
          <div className={`${styles.tabItem} ${styles.active} ${styles.title}`}>
            Восстановление пароля
          </div>
        </div>
        <div className={styles.formWrapper}>
          <Formik<IFormValues>
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const { password, confirmPassword } = values;
              try {
                console.log(props.route.params.code);
                await api.recoveryValidate({
                  code: props.route.params.code,
                });
                await api.recoveryRecover({
                  code: props.route.params.code,
                  password,
                });
                router.navigate(RouteNames[RouteNameChoices.authorization]);
              } catch (e) {
                setErrors(e.response.data);
              }
            }}
            validationSchema={registrationSchema}
          >
            {({ setFieldValue, values }) => (
              <>
                <Form translate="" className={`${styles.RegistrationForm}`}>
                  <FieldWrapper
                    labelText={"Новый пароль"}
                    name={"password"}
                    setFieldValue={setFieldValue}
                    type={"password"}
                  />
                  <FieldWrapper
                    labelText={"Подтвердите пароль"}
                    name={"confirmPassword"}
                    setFieldValue={setFieldValue}
                    type={"password"}
                  />
                  <div
                    className={`${styles.buttonWrapper} ${styles.btnBoxForm}`}
                  >
                    <div className={styles.button}>
                      <Button text={"Сохранить"} type={"submit"} />
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}

export const RestoringForm = withRoute(withApi(_RestoringForm));
