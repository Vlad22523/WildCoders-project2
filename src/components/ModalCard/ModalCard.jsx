import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import uk from "date-fns/locale/uk";
import RadioColored from "../../shared/RadioColored";
import SvgIcon from "../../hooks/SvgIcon.jsx";
import { IoClose } from "react-icons/io5";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./ModalCard.module.css";

const TitleSchema = Yup.object().shape({
  cardTitle: Yup.string().required("Title is required"),
  cardDescr: Yup.string(),
});

const ModalCard = ({
  onClose,
  title: modalTitle,
  btnName,
  addCard,
  editingCard,
  updateCard,
  cardTitle = "",
  cardDescription,
  currentPriority = "Without",
  deadline = false,
  column,
}) => {
  registerLocale("en", uk);

  const [startDate, setStartDate] = useState(
    deadline ? new Date(deadline) : new Date()
  );
  const [priority, setPriority] = useState(currentPriority);

  const compareDate = () => {
    const curDate = startDate.toISOString().split("T")[0];
    const dateNow = new Date().toISOString().split("T")[0];
    return curDate === dateNow;
  };

  const handleFormSubmit = (values, { resetForm }) => {
    const { cardTitle: title, cardDescr: description } = values;
    const newCard = {
      id: editingCard ? editingCard.id : Date.now(),
      title,
      description,
      priority,
      deadline: startDate,
      column,
    };

    console.log("Form Submitted: ", newCard);
    if (editingCard) {
      updateCard(newCard);
    } else {
      addCard(newCard);
    }

    resetForm();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.header}>
          <span className={styles.text}>{modalTitle}</span>
          <button className={styles.buttonClose} onClick={onClose}>
            <IoClose className={styles.svg} />
          </button>
        </h2>

        <Formik
          initialValues={{
            cardTitle: cardTitle || "",
            cardDescr: cardDescription || "",
          }}
          validationSchema={TitleSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleChange, values }) => (
            <Form>
              <label htmlFor="cardTitle"></label>
              <Field
                name="cardTitle"
                type="text"
                placeholder="Title"
                onChange={handleChange}
                value={values.cardTitle}
                className={styles.field}
              />
              <ErrorMessage
                name="cardTitle"
                component="p"
                className={styles.err}
              />

              <label htmlFor="cardDescr"></label>
              <Field
                placeholder="Description"
                id="cardDescr"
                name="cardDescr"
                onChange={handleChange}
                value={values.cardDescr}
                className={styles.field}
              />

              <p className={styles.subtitle}>Label color</p>

              <RadioColored
                onRadioChange={setPriority}
                currentPriority={currentPriority}
                className={styles.colored}
              />
              <label className={styles.label} htmlFor="date">
                Deadline
              </label>
              <div className={styles.datePickerWrapper}>
                {compareDate() && (
                  <span className={styles.spanStyled}>Today,&nbsp;</span>
                )}
                <DatePicker
                  locale="en"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  dateFormat="MMMM d"
                  className={styles.datepicker__input}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </div>
              <button type="submit" className={styles.button}>
                <div className={styles.svgWrapper}>
                  <SvgIcon
                    name="icon-plus"
                    width="14"
                    height="14"
                    className={styles.icon}
                  />
                </div>
                {btnName}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalCard;
