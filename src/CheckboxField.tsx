import { JSX, RefObject } from 'preact';
import styles from './formfield.module.css';

interface CheckboxFieldProps {
  refObj: RefObject<HTMLInputElement>;
  isRequired: boolean;
  isInvalid?: boolean;
  invalidFeedback?: string;
}

function CheckboxField({
  refObj,
  isRequired,
  isInvalid,
  invalidFeedback,
}: CheckboxFieldProps): JSX.Element {
  return (
    <div
      class={
        styles.checkFieldWrapper + (isInvalid ? ' ' + styles.isInvalid : '')
      }
    >
      <div class={styles.checkField}>
        <input
          ref={refObj}
          class={styles.checkboxCtrl}
          type="checkbox"
          onClick={(e) => {
            console.log(e.currentTarget?.checked);
          }}
        />
        <span class={styles.checkbox}></span>
        <span class={styles.checkboxText}>
          I consent to being contacted by the team{' '}
          {isRequired ? <span class={styles.required}>*</span> : <></>}
        </span>
      </div>
      <span className={styles.feedback}>{invalidFeedback}</span>
    </div>
  );
}

export default CheckboxField;
