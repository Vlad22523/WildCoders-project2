import { useState } from "react";
import SvgIcon from "../../hooks/SvgIcon.jsx";
import s from "./Filters.module.css";
import { Formik, Form, Field } from 'formik';
import { Transition } from "react-transition-group";

const Filters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  
  const initialValues = {
    filterOption: '',
  };

  const handleReset = (setFieldValue) => {
    setFieldValue('filterOption', '');
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <button type="button" className={s.button} onClick={toggleModal}>
          <SvgIcon name="icon-filter" width="16" height="16" className={s.icon} />
          <p className={s.title}>Filters</p>
        </button>
      </div>
      {isModalOpen && (
        <Transition
          in={isModalOpen}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div className={`${s.filtersModal} ${!isModalOpen ? 'exiting' : ''}`}>
            <h2 className={s.modalTitle}>Filters</h2>
            <button className={s.btnClose} type="button" onClick={toggleModal}>
              <SvgIcon name="icon-plus" width="18" height="18" className={s.iconClose} />
            </button>
            <div className={s.line}></div>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log('Выбран фильтр:', values.filterOption);
              }}
            >
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
                    <label className={`${s.formOptions} ${s.optionWithoutPriority} ${values.filterOption === 'without-priority' ? s.selected : ''}`}>
                      <Field
                        type="radio"
                        name="filterOption"
                        value="without-priority"
                        onClick={() => setFieldValue('filterOption', 'without-priority')}
                        className={s.radioBtn}
                      />
                      Without priority
                    </label>
                    <label className={`${s.formOptions} ${s.optionLow} ${values.filterOption === 'low' ? s.selected : ''}`}>
                      <Field
                        type="radio"
                        name="filterOption"
                        value="low"
                        onClick={() => setFieldValue('filterOption', 'low')}
                        className={s.radioBtn}
                      />
                      Low
                    </label>
                    <label className={`${s.formOptions} ${s.optionMedium} ${values.filterOption === 'medium' ? s.selected : ''}`}>
                      <Field
                        type="radio"
                        name="filterOption"
                        value="medium"
                        onClick={() => setFieldValue('filterOption', 'medium')}
                        className={s.radioBtn}
                      />
                      Medium
                    </label>
                    <label className={`${s.formOptions} ${s.optionHigh} ${values.filterOption === 'high' ? s.selected : ''}`}>
                      <Field
                        type="radio"
                        name="filterOption"
                        value="high"
                        onClick={() => setFieldValue('filterOption', 'high')}
                        className={s.radioBtn}
                      />
                      High
                    </label>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Transition>)}
        
    </div> )
};

export default Filters;
