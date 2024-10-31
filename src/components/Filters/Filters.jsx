import { useState } from "react";
import SvgIcon from "../../hooks/SvgIcon.jsx";
import s from "./Filters.module.css";
import { Formik, Form, Field } from "formik";

const Filters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const initialValues = {
    filterOption: "",
  };

  const handleReset = (setFieldValue) => {
    setFieldValue("filterOption", "");
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <button type="button" className={s.button} onClick={toggleModal}>
          <SvgIcon
            name="icon-filter"
            width="16"
            height="16"
            className={s.icon}
          />
          <h2 className={s.title}>Filters</h2>
        </button>
      </div>
      {isModalOpen && (
        <div className={s.filtersModal}>
          <p className={s.modalTitle}>Filters</p>
          <button className={s.btnClose} type="button" onClick={toggleModal}>
            <SvgIcon
              name="icon-plus"
              width="18"
              height="18"
              className={s.iconClose}
            />
          </button>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log("Выбран фильтр:", values.filterOption);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div role="group" aria-labelledby="radio-group">
                  <h3 className={s.formLabel}>Label color</h3>
                  <label
                    className={`${s.formOptions} ${s.optionWithoutPriority} ${
                      values.filterOption === "without-priority"
                        ? s.selected
                        : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="filterOption"
                      value="without-priority"
                      onClick={() =>
                        setFieldValue("filterOption", "without-priority")
                      }
                      className={s.radioBtn}
                    />
                    Without priority
                  </label>
                  <label
                    className={`${s.formOptions} ${s.optionLow} ${
                      values.filterOption === "low" ? s.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="filterOption"
                      value="low"
                      onClick={() => setFieldValue("filterOption", "low")}
                      className={s.radioBtn}
                    />
                    Low
                  </label>
                  <label
                    className={`${s.formOptions} ${s.optionMedium} ${
                      values.filterOption === "medium" ? s.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="filterOption"
                      value="medium"
                      onClick={() => setFieldValue("filterOption", "medium")}
                      className={s.radioBtn}
                    />
                    Medium
                  </label>
                  <label
                    className={`${s.formOptions} ${s.optionHigh} ${
                      values.filterOption === "high" ? s.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="filterOption"
                      value="high"
                      onClick={() => setFieldValue("filterOption", "high")}
                      className={s.radioBtn}
                    />
                    High
                  </label>
                </div>
                <button
                  type="button"
                  className={s.resetButton}
                  onClick={() => handleReset(setFieldValue)}
                >
                  Reset Filters
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Filters;
