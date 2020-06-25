import React, { Component } from "react";
import styles from "./ModalRestore.module.scss";
import { Field, FieldProps, Form, Formik } from "formik";
import confirmImg from "../../../styles/sources/images/icons/email.png";
import close from "../../../styles/sources/images/icons/x.svg";
import { Button } from "../../../ui/button";
import { getIndicatorStatus } from "../../../ui/Indicator/utils";
import { Input } from "../../../ui/input";
import { inject, IReactComponent, observer } from "mobx-react";
import { withRoute } from "react-router5";
import { IStore } from "../../store";
import { withApi } from "../../../api/withApi";
import { Api } from "../../../api";
import { RouteNameChoices, RouteNames, router } from "../router";
import * as Yup from "yup";
import { RouteContext } from "react-router5/types/types";

interface IFormValues {
  email: string;
}

const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неверный формат имейла")
    .required("Введите ваш имейл"),
});

@observer
class ClassModalRestore extends Component<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { authStore, api } = this.props;
    return (
      <>
        <div className={styles.back}></div>
        <div className={styles.box}>
          <div className={styles.modalBox}>
            <div className={styles.close}>
              <img
                src={close}
                alt="close"
                onClick={() => authStore.closeModalPassword()}
              />
            </div>
            <h1 className={styles.title}>Восстановить пароль</h1>
            <img
              src={confirmImg}
              alt="confirm img"
              className={styles.confirmImg}
            />
            <div className={styles.description}>
              На ваш e-mail будет отправлена инструктция для восстановление
              пароля.
            </div>
            <p className={styles.emailText}>
              Введите e-mail, который вы указали при регистрации.
            </p>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                const { email } = values;
                try {
                  await api.recoveryAsk({
                    email,
                  });
                  router.navigate(RouteNames[RouteNameChoices.restoring]);
                } catch (e) {
                  setErrors(e.response.data);
                }
              }}
              validationSchema={registrationSchema}
            >
              {(props) => {
                const { isSubmitting, setFieldValue } = props;
                return (
                  <Form translate="" className={styles.RestoreForm}>
                    <div className={styles.fieldInput}>
                      <Field name="email">
                        {(props: FieldProps<string, IFormValues>) => {
                          const { field, meta } = props;
                          return (
                            <Input
                              type={"text"}
                              indicator={{
                                status: getIndicatorStatus(
                                  meta.touched,
                                  meta.error
                                ),
                              }}
                              placeholder={"name@e-mail.com"}
                              error={meta.touched && meta.error}
                              {...field}
                              onChange={(value) => {
                                setFieldValue(field.name, value);
                              }}
                            />
                          );
                        }}
                      </Field>
                    </div>
                    <div>
                      <Button
                        text={"Отправить"}
                        type={"submit"}
                        disabled={isSubmitting}
                        className={styles.button}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export const ModalRestore: IReactComponent = withRoute(
  withApi(
    inject((store: IStore) => ({
      authStore: store.authStore,
    }))(ClassModalRestore)
  )
);
