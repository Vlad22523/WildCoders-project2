import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "../BoardForm/BoardForm.module.css";
import backgroundImages from "../../images/backgroundImages.json";
import * as Yup from "yup";
import { IconRadioButton } from "../ IconRadioButton/ IconRadioButton";
import { BackgroundRadioButton } from "../BackgroundRadioButton/BackgroundRadioButton";

export const BoardForm = ({ isEditMode, onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Min 3 characters")
      .max(14, "Max 14 characters")
      .required("Title is required"),
  });

  return (
    <div className={s.container}>
      <Formik
        initialValues={{ title: "", shape: "square", background: "0" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className={s.containerTitle}>
            <h2 className={s.title}>
              {isEditMode ? "Edit board" : "New board"}
            </h2>
            <button type="button" className={s.closeButton}>
              <svg width="18" height="18">
                <use href={`/public/images/icons.svg#icon-close`} />
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
                    iconId="icon-icon-4-puzzle"
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
          <button className={s.button} type="submit">
            <svg className={s.iconButton} width="28" height="28">
              <use href={`/public/images/icons.svg#icon-plus`} />
            </svg>
            {isEditMode ? "Update" : "Create"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
