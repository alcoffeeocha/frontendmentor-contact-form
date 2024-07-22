import { JSX } from 'preact/jsx-runtime';
import { makeKebabCase } from './utils';
import { RefObject } from 'preact';
import styles from './formfield.module.css';

interface TextFieldProps {
  refObj: RefObject<HTMLInputElement>;
  label: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  invalidFeedback?: string;
  [attr: string]: any;
}

function TextField({
  refObj,
  label,
  isRequired = false,
  isInvalid = false,
  invalidFeedback = '',
  ...attrs
}: TextFieldProps): JSX.Element {
  const id = makeKebabCase(label);
  return (
    <div class={styles.field + (isInvalid ? ' ' + styles.isInvalid : '')}>
      <label htmlFor={id}>
        {label} {isRequired ? <span class={styles.required}>*</span> : <></>}
      </label>
      <input
        class={styles.input}
        ref={refObj}
        type="text"
        id={id}
        data-required={isRequired}
        {...attrs}
      />
      <span className={styles.feedback}>{invalidFeedback}</span>
    </div>
  );
}

export default TextField;
