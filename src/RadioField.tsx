import { JSX } from 'preact/jsx-runtime';
import { makeKebabCase } from './utils';
import styles from './formfield.module.css';

export type SelectOption = {
  text: string;
  value: string;
};

interface RadioFieldProps {
  label: string;
  currentValue?: string; // should match with option value if any checkedd
  isRequired?: boolean;
  isInvalid?: boolean;
  invalidFeedback?: string;
  options: Array<SelectOption>;
  onChange: (newValue: string) => void;
}

function RadioField({
  label,
  currentValue = '',
  isRequired = false,
  isInvalid = false,
  options = [
    {
      text: 'Example',
      value: 'example',
    },
  ],
  invalidFeedback = '',
  onChange,
}: RadioFieldProps): JSX.Element {
  const id = makeKebabCase(label);
  return (
    <div class={styles.field + (isInvalid ? ' ' + styles.isInvalid : '')}>
      <span>
        {label} {isRequired ? <span class={styles.required}>*</span> : <></>}
      </span>
      <div class={styles.radioFieldGroups} data-required={isRequired}>
        {options.map((option) => {
          const isChecked = option.value === currentValue;
          return (
            <button type="button" class={styles.radioField} data-checked={isChecked} onClick={()=>{
              onChange(option.value);
            }}>
              <input
                class={styles.radioBoxCtrl}
                type="radio"
                name={id}
                id={option.value}
                value={option.value}
                checked={isChecked}
                onClick={(e: JSX.TargetedEvent<HTMLInputElement>) => {
                  e.stopPropagation();
                  onChange(e.currentTarget?.value);
                }}
                tabindex={-1}
              />
              <span class={styles.radioBox}></span>
              <label htmlFor={option.value}>{option.text}</label>
            </button>
          );
        })}
      </div>
      <span className={styles.feedback}>{invalidFeedback}</span>
    </div>
  );
}

export default RadioField;
