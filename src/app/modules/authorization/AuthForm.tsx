import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react';
import { withRoute } from 'react-router5';
import { Router } from 'router5';
import { Api } from '../../../api';
import { withApi } from '../../../api/withApi';
import { Button } from '../../../ui/button';
import { getIndicatorStatus } from '../../../ui/Indicator/utils';
import { Input } from '../../../ui/input';
import { RouteNames } from '../router';
import styles from './AuthForm.module.scss';
import { authSchema } from './authSchema';
import { InputWrapper } from './InputWrapper';
import { inject, observer } from 'mobx-react';

interface IFormValues {
  email: string;
  password: string;
}

interface IProps {
  api: Api;
  router: Router;
  authStore: any;
}

const _AuthForm = (props: IProps) => {
  const { authStore } = props;
  return (
    <Formik<IFormValues>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await props.api.login({
            email: values.email,
            password: values.password,
          });
          await authStore.fetchMyProfile();
          props.router.navigate(RouteNames.assignments);
        } catch (e) {
          if (e.response.status === 400) {
            setErrors({
              email: '',
              password: '',
            });
          }
        }
        setSubmitting(false);
      }}
      validationSchema={authSchema}
    >
      {(props) => {
        const { isSubmitting, setFieldValue } = props;
        return (
          <Form translate="" className={styles.AuthForm}>
            <Field name="email">
              {(props: FieldProps<string, IFormValues>) => {
                const { field, meta } = props;
                return (
                  <InputWrapper
                    name={field.name}
                    labelText={'Электронный адрес'}
                  >
                    <Input
                      type={'text'}
                      indicator={{
                        status: getIndicatorStatus(meta.touched, meta.error),
                      }}
                      placeholder={'name@e-mail.com'}
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
            <Field name="password">
              {(props: FieldProps<string, IFormValues>) => {
                const { field, meta } = props;
                return (
                  <InputWrapper name={field.name} labelText={'Пароль'}>
                    <Input
                      type={'password'}
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
            <div className={styles.button}>
              <Button text={'Войти'} type={'submit'} disabled={isSubmitting} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const WithApiAuthForm = withApi(
  inject((store: any) => ({
    authStore: store.authStore,
  }))(_AuthForm)
);

export const AuthForm = withRoute(({ router }) => (
  <WithApiAuthForm router={router} />
));
