import classNames from "classnames";
import { Field, FieldArray, FieldProps, Form, Formik } from "formik";
import { observable, runInAction } from "mobx";
import { inject, Observer } from "mobx-react";
import React, { Fragment } from "react";
import { withRoute } from "react-router5";
import { Router } from "router5";
import * as Yup from "yup";
import { Api } from "../../../api";
import { Subject } from "../../../api/interfaces";
import { withApi } from "../../../api/withApi";
import phoneImg from "../../../styles/sources/images/phone-2.png";
import { Button } from "../../../ui/button";
import { getIndicatorStatus } from "../../../ui/Indicator/utils";
import Radio from "../../../ui/radio";
import { Select } from "../../../ui/select";
import { range } from "../../../utils/range";
import { IStore } from "../../store";
import { AuthStore } from "../authorization/stores/AuthStore";
import { RouteNameChoices, RouteNames } from "../router";
import { InstagramAuthButton } from "./InstagramAuthButton";
import styles from "./LandingHomePage.module.scss";
import { SelectError } from "./SelectError";

import { Input } from "../../../ui/input";
import { InputWrapper } from "./InputWrapper";

export enum Sex {
  UNKNOWN,
  MALE,
  FEMALE,
}

export enum AccountType {
  personal = 1,
  business = 2,
}

interface IFormValues {
  profileUrl: string | null;
  sex: Sex | null;
  interestedInSex: Sex | null;
  accountType: AccountType | null;
  city: string | null;
  myAccountSubjects: number[];
  interestedInSubjects: number[];
}

const initialValues: IFormValues = {
  profileUrl: "",
  sex: null,
  interestedInSex: Sex.UNKNOWN,
  accountType: AccountType.personal,
  city: "",
  myAccountSubjects: [],
  interestedInSubjects: [],
};

const validationSchema = Yup.object().shape({
  profileUrl: Yup.string()
    .test("phoneNumberLengthIs10Digits", "Введите ссылку", (value) => {
      return value !== undefined;
    })
    .trim()
    .url("Введите ссылку"),
  sex: Yup.number()
    .oneOf(Object.values<number>(Sex as any), "Укажите ваш пол")
    .nullable(true)
    .required("Required"),
  interestedInSex: Yup.number()
    .oneOf(Object.values<number>(Sex as any))
    .nullable(true)
    .required("Укажите пол"),
  accountType: Yup.number()
    .oneOf(Object.values<number>(AccountType as any))
    .nullable(true)
    .required("Required"),
  city: Yup.string()
    .nullable(true)
    .required("Введите ваш город"),
  myAccountSubjects: Yup.array()
    .of(Yup.number())
    .min(3, "Укажите тематики")
    .required("Укажите тематики"),
  interestedInSubjects: Yup.array()
    .of(Yup.number())
    .min(3, "Укажите тематики")
    .required("Укажите тематики"),
});

interface IProps {
  api?: Api;
  router: Router;
  authStore?: AuthStore;
}

@withApi
@inject(({ authStore }: IStore) => ({ authStore }))
class ProfileRegistrationFormComponent extends React.Component<IProps> {
  @observable
  subjectsData: {
    isLoading: boolean;
    subjects: Subject[];
  } = {
    isLoading: true,
    subjects: [],
  };

  async componentDidMount() {
    const api = this.props.api!;
    await this.props.authStore!.fetchMyProfile();
    try {
      const { data } = await api.getSubjects();
      runInAction(() => {
        this.subjectsData.subjects = data;
      });
    } catch (e) {}
    runInAction(() => {
      this.subjectsData.isLoading = false;
    });
  }

  render() {
    const authStore = this.props.authStore!;
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.ProfileRegistrationForm}>
          <div className={styles.title}>Добро пожаловать в наш сервис!</div>
          <div
            className={classNames(
              styles.additionalText,
              styles.additionalTextMargin
            )}
          >
            Для продолжения работы заполните мини анкету
          </div>
          <img className={styles.phoneImg} src={phoneImg} alt="phone" />

          <Formik<IFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const {
                profileUrl,
                interestedInSubjects,
                myAccountSubjects,
                city,
                accountType,
                interestedInSex,
                sex,
              } = values;
              console.log(profileUrl);
              try {
                await this.props.api!.profileForm({
                  profile_url: profileUrl,
                  account_type: accountType!,
                  city: city!,
                  i_interested_in_sex: interestedInSex!,
                  i_interested_in_subjects: interestedInSubjects!,
                  my_account_subjects: myAccountSubjects,
                  my_sex: sex!,
                  id: authStore.getMe()!.id,
                });

                this.props.router.navigate(
                  RouteNames[RouteNameChoices.modering]
                );
              } catch (e) {
                const profileUrl = e?.response?.data?.profile_url;
                const accountType = e?.response?.data?.account_type;
                const city = e?.response?.data?.city;
                const interestedInSex = e?.response?.data?.i_interested_in_sex;
                const interestedInSubjects =
                  e?.response?.data?.i_interested_in_subjects;
                const myAccountSubjects =
                  e?.response?.data?.my_account_subjects;
                const sex = e?.response?.data?.my_sex;

                setErrors({
                  profileUrl,
                  accountType,
                  city,
                  interestedInSex,
                  interestedInSubjects,
                  myAccountSubjects,
                  sex,
                });
              }
              setSubmitting(false);
            }}
          >
            {(props) => {
              const { isSubmitting, setFieldValue } = props;
              return (
                <Form translate={""}>
                  <div className={styles.form}>
                    <div className={styles.section}>
                      <div className={styles.row}>
                        <span className={styles.textBold}>
                          Введите ссылку на соц сеть для подключения:
                        </span>
                        <Field name={"profileUrl"}>
                          {(props: FieldProps<string, IFormValues>) => {
                            const {
                              field,
                              form: { getFieldHelpers },
                              meta,
                            } = props;

                            const { setValue } = getFieldHelpers(field.name);
                            return (
                              <Input
                                type={"text"}
                                placeholder={
                                  "https://www.instagram.com/leonardodicaprio"
                                }
                                indicator={{
                                  status: getIndicatorStatus(
                                    meta.touched,
                                    meta.error
                                  ),
                                }}
                                error={meta.touched && meta.error}
                                {...field}
                                onChange={(value) => {
                                  setValue(value);
                                }}
                              />
                            );
                          }}
                        </Field>
                      </div>

                      <div className={styles.row}>
                        <span className={styles.textBold}>
                          Укажите ваш пол:
                        </span>
                        <Field name={"sex"}>
                          {(props: FieldProps<string, IFormValues>) => {
                            const { field, form, meta } = props;
                            const { setValue } = form.getFieldHelpers(
                              field.name
                            );
                            return (
                              <Fragment>
                                <Radio
                                  className={styles.sexRadioChoices}
                                  options={[
                                    {
                                      id: Sex.MALE,
                                      text: "Мужской",
                                    },
                                    {
                                      id: Sex.FEMALE,
                                      text: "Женский",
                                    },
                                    {
                                      id: Sex.UNKNOWN,
                                      text: "Не важно",
                                    },
                                  ]}
                                  value={meta.value}
                                  onChange={setValue}
                                  reverseText
                                />
                                <SelectError
                                  touched={meta.touched}
                                  error={meta.error}
                                />
                              </Fragment>
                            );
                          }}
                        </Field>
                      </div>

                      <div className={styles.row}>
                        <span className={styles.textBold}>
                          Тип вашего аккаунта:
                        </span>
                        <Field name={"accountType"}>
                          {(props: FieldProps<number, IFormValues>) => {
                            const { field, form, meta } = props;
                            const { setValue } = form.getFieldHelpers(
                              field.name
                            );

                            return (
                              <Select.Container
                                defaultText={"Выберите тип аккаунта"}
                                options={[
                                  {
                                    id: AccountType.personal,
                                    text: "Личный",
                                  },
                                  {
                                    id: AccountType.business,
                                    text: "Бизнес",
                                  },
                                ]}
                                indicator={{
                                  status: getIndicatorStatus(
                                    meta.touched,
                                    meta.error
                                  ),
                                }}
                                defaultSelectedOptionId={AccountType.personal}
                                onChange={setValue}
                                error={meta.touched && meta.error}
                              />
                            );
                          }}
                        </Field>
                      </div>

                      <div className={styles.row}>
                        <span className={styles.textBold}>Ваш город:</span>
                        <Field name={"city"}>
                          {(props: FieldProps<string, IFormValues>) => {
                            const {
                              field,
                              form: { getFieldHelpers },
                              meta,
                            } = props;
                            const { setValue } = getFieldHelpers(field.name);

                            return (
                              <InputWrapper
                                name={field.name}
                                labelText={"Город"}
                              >
                                <Input
                                  type={"text"}
                                  placeholder={"Введите город"}
                                  indicator={{
                                    status: getIndicatorStatus(
                                      meta.touched,
                                      meta.error
                                    ),
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
                      </div>

                      <div className={styles.row}>
                        <span className={styles.textBold}>
                          Укажите минимум 3 тематики, к которым подходит ваш
                          аккаунт:
                        </span>
                        <FieldArray name={"myAccountSubjects"}>
                          {(arrayHelpers) => {
                            return (
                              <Fragment>
                                {range(0, 3).map((index) => {
                                  return (
                                    <Field
                                      name={`myAccountSubjects.${index}`}
                                      key={index}
                                    >
                                      {(
                                        props: FieldProps<string, IFormValues>
                                      ) => {
                                        const { form } = props;
                                        return (
                                          <div className={styles.selectWrapper}>
                                            <span
                                              className={classNames(
                                                styles.textRegular,
                                                styles.selectText
                                              )}
                                            >
                                              Тематика №{index + 1}
                                            </span>
                                            <div className={styles.selectBox}>
                                              <Observer>
                                                {() => {
                                                  const {
                                                    isLoading,
                                                    subjects,
                                                  } = this.subjectsData;
                                                  return (
                                                    <Select.Container
                                                      defaultText={
                                                        "Выберите тематику"
                                                      }
                                                      options={subjects.map(
                                                        (subject) => ({
                                                          id: subject.ID,
                                                          text: subject.Name,
                                                        })
                                                      )}
                                                      indicator={{
                                                        status: getIndicatorStatus(
                                                          form.touched
                                                            .myAccountSubjects,
                                                          form.errors
                                                            .myAccountSubjects as string
                                                        ),
                                                      }}
                                                      disabled={isLoading}
                                                      error={
                                                        form.touched
                                                          .myAccountSubjects &&
                                                        (form.errors
                                                          .myAccountSubjects as string) &&
                                                        ""
                                                      }
                                                      onChange={(value) => {
                                                        // const subjs =
                                                        // arrayHelpers.form
                                                        //   .values
                                                        //   .myAccountSubjects;
                                                        // if (subjs.length < 3) {
                                                        //   arrayHelpers.push(
                                                        //     value
                                                        //   );
                                                        // }
                                                        // else if (
                                                        // subjs.length >= 3
                                                        // ) {
                                                        arrayHelpers.replace(
                                                          index,
                                                          value
                                                        );
                                                        // }
                                                      }}
                                                    />
                                                  );
                                                }}
                                              </Observer>
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </Field>
                                  );
                                })}
                                {arrayHelpers.form.touched.myAccountSubjects &&
                                  arrayHelpers.form.errors
                                    .myAccountSubjects && (
                                    <div className={styles.subjectErrorText}>
                                      {
                                        arrayHelpers.form.errors
                                          .myAccountSubjects
                                      }
                                    </div>
                                  )}
                              </Fragment>
                            );
                          }}
                        </FieldArray>
                        {/*
                      <div className={styles.addSubjectButtonWrapper}>
                        <Button
                          text={"Добавить тематику"}
                          className={styles.addSubjectButton}
                          disableSolidFill={true}
                          icon={Plus}
                          iconConfig={{
                            color: "#2b64b0"
                          }}
                          type={"button"}
                        />
                      </div>
*/}
                      </div>
                    </div>

                    <div className={styles.section}>
                      <div className={styles.row}>
                        <span className={styles.textBold}>
                          Укажите пол аккаунтов для подписки:
                        </span>
                        <Field name={"interestedInSex"}>
                          {(props: FieldProps<string, IFormValues>) => {
                            const { field, form, meta } = props;
                            const { setValue } = form.getFieldHelpers(
                              field.name
                            );

                            return (
                              <Fragment>
                                <Radio
                                  className={styles.sexRadioChoices}
                                  options={[
                                    {
                                      id: Sex.MALE,
                                      text: "Мужской",
                                    },
                                    {
                                      id: Sex.FEMALE,
                                      text: "Женский",
                                    },
                                    {
                                      id: Sex.UNKNOWN,
                                      text: "Не важно",
                                    },
                                  ]}
                                  value={meta.value}
                                  onChange={setValue}
                                  reverseText
                                />
                                <SelectError
                                  touched={meta.touched}
                                  error={meta.error}
                                />
                              </Fragment>
                            );
                          }}
                        </Field>
                      </div>

                      <div className={styles.row}>
                        <span className={styles.textBold}>
                          Укажите 3 тематики, на которые вы хотели бы
                          подписаться:
                        </span>
                        <FieldArray name={"interestedInSubjects"}>
                          {(arrayHelpers) => {
                            return (
                              <Fragment>
                                {range(0, 3).map((index) => {
                                  return (
                                    <Field
                                      name={`interestedInSubjects.${index}`}
                                      key={index}
                                    >
                                      {(
                                        props: FieldProps<string, IFormValues>
                                      ) => {
                                        const { form } = props;
                                        return (
                                          <div className={styles.selectWrapper}>
                                            <span
                                              className={classNames(
                                                styles.textRegular,
                                                styles.selectText
                                              )}
                                            >
                                              Тематика №{index + 1}
                                            </span>
                                            <div className={styles.selectBox}>
                                              <Observer>
                                                {() => {
                                                  const {
                                                    isLoading,
                                                    subjects,
                                                  } = this.subjectsData;
                                                  return (
                                                    <Select.Container
                                                      defaultText={
                                                        "Выберите тематику"
                                                      }
                                                      options={subjects.map(
                                                        (subject) => ({
                                                          id: subject.ID,
                                                          text: subject.Name,
                                                        })
                                                      )}
                                                      indicator={{
                                                        status: getIndicatorStatus(
                                                          form.touched
                                                            .interestedInSubjects,
                                                          form.errors
                                                            .interestedInSubjects as string
                                                        ),
                                                      }}
                                                      disabled={isLoading}
                                                      error={
                                                        form.touched
                                                          .interestedInSubjects &&
                                                        (form.errors
                                                          .interestedInSubjects as string) &&
                                                        ""
                                                      }
                                                      onChange={(value) => {
                                                        const subjs =
                                                          arrayHelpers.form
                                                            .values
                                                            .interestedInSubjects;
                                                        if (subjs.length < 3) {
                                                          arrayHelpers.push(
                                                            value
                                                          );
                                                        } else if (
                                                          subjs.length >= 3
                                                        ) {
                                                          arrayHelpers.replace(
                                                            index,
                                                            value
                                                          );
                                                        }
                                                      }}
                                                    />
                                                  );
                                                }}
                                              </Observer>
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </Field>
                                  );
                                })}
                                {arrayHelpers.form.touched
                                  .interestedInSubjects &&
                                  arrayHelpers.form.errors
                                    .interestedInSubjects && (
                                    <div className={styles.subjectErrorText}>
                                      {
                                        arrayHelpers.form.errors
                                          .interestedInSubjects
                                      }
                                    </div>
                                  )}
                              </Fragment>
                            );
                          }}
                        </FieldArray>
                      </div>
                    </div>

                    <div className={styles.section}>
                      <div className={styles.nextButton}>
                        <Button
                          text={"Продолжить"}
                          type={"submit"}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }
}

export const ProfileRegistrationForm = withRoute(({ router }) => (
  <ProfileRegistrationFormComponent router={router} />
));
