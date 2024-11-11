import { useEffect, useRef, useState } from "react";
import s from "./Filters.module.css";
import { Formik, Form, Field } from "formik";
import SvgIcon from "../../../hooks/SvgIcon.jsx";
import { useDispatch } from "react-redux";
import { changePriorityFilter } from "../../../redux/filters/slice.js";

const Filters = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState(false);
  const modalRef = useRef(null);

  const handleFilterChange = (filterOption) => {
    dispatch(changePriorityFilter(filterOption));
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalStyle(false);
  };
  const closeModal = () => {
    setModalStyle(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 800);
  };

  useEffect(() => {
    const handleOverlayClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isModalOpen]);

  const initialValues = {
    filterOption: "",
  };

  const handleReset = (setFieldValue) => {
    setFieldValue("filterOption", "");
    handleFilterChange("");
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <button
          type="button"
          className={s.button}
          onClick={openModal}
          disabled={isModalOpen}
        >
          <SvgIcon
            name="icon-filter"
            width="16"
            height="16"
            className={s.icon}
          />
          <p className={s.title}>Filters</p>
        </button>
      </div>
      {isModalOpen && (
        <div
          ref={modalRef}
          className={`${s.filtersModal} ${modalStyle ? s.exiting : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={s.modalTitle}>Filters</h2>
          <button className={s.btnClose} type="button" onClick={closeModal}>
            <SvgIcon
              name="icon-plus"
              width="18"
              height="18"
              className={s.iconClose}
            />
          </button>
          <div className={s.line}></div>
          <Formik initialValues={initialValues}>
            {({ setFieldValue, values }) => (
              <Form>
                <div role="group" aria-labelledby="radio-group">
                  <div className={s.filtersWrapper}>
                    <h3 className={s.formLabel}>Label color</h3>
                    <button
                      type="button"
                      className={s.resetButton}
                      onClick={() => handleReset(setFieldValue)}
                    >
                      Show all
                    </button>
                  </div>
                  <label
                    className={`${s.formOptions} ${s.optionWithoutPriority} ${
                      values.filterOption === "without" ? s.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="filterOption"
                      value="without"
                      className={s.radioBtn}
                      onChange={() => {
                        setFieldValue("filterOption", "without"); // Изменяем значение фильтра
                        handleFilterChange("without"); // Сразу применяем фильтр в Redux
                      }}
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
                      className={s.radioBtn}
                      onChange={() => {
                        setFieldValue("filterOption", "low"); // Изменяем значение фильтра
                        handleFilterChange("low"); // Сразу применяем фильтр в Redux
                      }}
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
                      className={s.radioBtn}
                      onChange={() => {
                        setFieldValue("filterOption", "medium"); // Изменяем значение фильтра
                        handleFilterChange("medium"); // Сразу применяем фильтр в Redux
                      }}
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
                      className={s.radioBtn}
                      onChange={() => {
                        setFieldValue("filterOption", "high"); // Изменяем значение фильтра
                        handleFilterChange("high"); // Сразу применяем фильтр в Redux
                      }}
                    />
                    High
                  </label>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Filters;
