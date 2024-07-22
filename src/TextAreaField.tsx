import { JSX } from 'preact/jsx-runtime';
import { makeKebabCase } from './utils';
import { RefObject } from 'preact';
import styles from './formfield.module.css';

interface TextAreaFieldProps {
  refObj: RefObject<HTMLTextAreaElement>;
  label: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  invalidFeedback?: string;
  lines?: number;
  [attr: string]: any;
}

function TextAreaField({
  refObj,
  label,
  isRequired = false,
  isInvalid = false,
  invalidFeedback = '',
  lines = 3,
  ...attrs
}: TextAreaFieldProps): JSX.Element {
  const id = makeKebabCase(label);
  return (
    <div class={styles.field + (isInvalid ? ' ' + styles.isInvalid : '')}>
      <label htmlFor={id}>
        {label} {isRequired ? <span class={styles.required}>*</span> : <></>}
      </label>
      <textarea
        class={styles.input}
        style={{
          resize: 'none',
        }}
        ref={refObj}
        id={id}
        rows={lines}
        data-required={isRequired}
        {...attrs}
      ></textarea>
      <span className={styles.feedback}>{invalidFeedback}</span>
    </div>
  );
}

export default TextAreaField;
