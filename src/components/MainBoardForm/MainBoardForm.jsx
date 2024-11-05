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
          <Field name="shape">
            {({ field }) => (
              <>
                <IconRadioButton
                  iconId="icon-icon-1-square"
                  field={field}
                  value="square"
                />
                <IconRadioButton
                  iconId="icon-icon-2-star"
                  field={field}
                  value="star"
                />
                <IconRadioButton
                  iconId="icon-icon-3-circle"
                  field={field}
                  value="circle"
                />
                <IconRadioButton
                  iconId="icon-icon-4-pazzle"
                  field={field}
                  value="puzzle"
                />
                <IconRadioButton
                  iconId="icon-icon-5-cube"
                  field={field}
                  value="cube"
                />
                <IconRadioButton
                  iconId="icon-icon-6-lightning"
                  field={field}
                  value="lightning"
                />
                <IconRadioButton
                  iconId="icon-icon-7-colors"
                  field={field}
                  value="colors"
                />
                <IconRadioButton
                  iconId="icon-icon-8-hexagon"
                  field={field}
                  value="hexagon"
                />
              </>
            )}
          </Field>
        </div>
        <h3>Background</h3>
        <div className={s.backgroundContainer}>
          <Field name="background">
            {({ field }) => (
              <>
                {backgroundImages.map((bg) => (
                  <BackgroundRadioButton
                    key={bg.id}
                    background={bg}
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
