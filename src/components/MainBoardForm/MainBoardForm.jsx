import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "../MainBoardForm/MainBoardForm.module.css";
import backgroundImages from "../../images/backgroundImages.json";
import { IconRadioButton } from "../ IconRadioButton/ IconRadioButton.jsx";
import { BackgroundRadioButton } from "../BackgroundRadioButton/BackgroundRadioButton.jsx";

export const MainBoardForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  title,
  setFormOpen,
  submitButton,
}) => (
  <div className={s.container}>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      <Form>
        <div className={s.containerTitle}>
          <h2 className={s.title}>{title}</h2>
          <button
            type="button"
            onClick={() => setFormOpen(false)}
            className={s.closeButton}
          >
            <svg width="18" height="18">
              <use href={`/src/images/icons.svg?t=1730829317287#icon-plus`} />
            </svg>
          </button>
        </div>
        <div className={s.containerError}>
          <Field name="title" placeholder="Title" className={s.input} />
          <ErrorMessage name="title" component="div" className={s.error} />
        </div>
        <h3>Icons</h3>
        <div className={s.iconContainer}>
          <Field name="icon">
            {({ field }) => (
              <>
                <IconRadioButton iconId="icon-1" field={field} value="icon-1" />
                <IconRadioButton iconId="icon-2" field={field} value="icon-2" />
                <IconRadioButton iconId="icon-3" field={field} value="icon-3" />
                <IconRadioButton iconId="icon-4" field={field} value="icon-4" />
                <IconRadioButton iconId="icon-5" field={field} value="icon-5" />
                <IconRadioButton iconId="icon-6" field={field} value="icon-6" />
                <IconRadioButton iconId="icon-7" field={field} value="icon-7" />
                <IconRadioButton iconId="icon-8" field={field} value="icon-8" />
              </>
            )}
          </Field>
        </div>
        <h3>Background</h3>
        <div className={s.backgroundContainer}>
          <Field name="background">
            {({ field }) => (
              <>
                {backgroundImages.map((background) => (
                  <BackgroundRadioButton
                    key={background.id}
                    background={background}
                    field={field}
                  />
                ))}
              </>
            )}
          </Field>
        </div>
        {submitButton}
      </Form>
    </Formik>
  </div>
);
