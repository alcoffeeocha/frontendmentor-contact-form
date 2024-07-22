import { JSX } from 'preact/jsx-runtime';
import styles from './form.module.css';
import TextField from './TextField';
import { useState, useRef, useCallback } from 'preact/hooks';
import { createRef, RefObject } from 'preact';
import TextAreaField from './TextAreaField';
import CheckboxField from './CheckboxField';
import { isValidEmail } from './utils';
import RadioField, { SelectOption } from './RadioField';
import PopupAlert, { AlertStatus } from './PopupAlert';

type Fields = {
  firstName: {
    label: string;
    ref: RefObject<any>;
    required: boolean;
    isValid: boolean;
  };
  lastName: {
    label: string;
    ref: RefObject<any>;
    required: boolean;
    isValid: boolean;
  };
  email: {
    label: string;
    ref: RefObject<any>;
    required: boolean;
    isValidEmail: boolean;
    isNotEmptyEmail: boolean;
  };
  query: {
    label: string;
    ref: RefObject<any>;
    required: boolean;
    isValid: boolean;
    value: string;
    options: Array<SelectOption>;
  };
  message: {
    label: string;
    ref: RefObject<any>;
    required: boolean;
    isValid: boolean;
  };
  consent: {
    ref: RefObject<any>;
    required: boolean;
    isValid: boolean;
  };
};

function TheForm(): JSX.Element {
  const [fields, setFields] = useState<Fields>({
    firstName: {
      label: 'First Name',
      ref: useRef<HTMLInputElement>(null),
      required: true,
      isValid: true,
    },
    lastName: {
      label: 'Last Name',
      ref: useRef<HTMLInputElement>(null),
      required: true,
      isValid: true,
    },
    email: {
      label: 'Email Address',
      ref: useRef<HTMLInputElement>(null),
      required: true,
      isValidEmail: true,
      isNotEmptyEmail: true,
    },
    message: {
      label: 'Message',
      ref: useRef<HTMLTextAreaElement>(null),
      required: true,
      isValid: true,
    },
    query: {
      label: 'Query Type',
      ref: useRef<HTMLSelectElement>(null),
      required: true,
      isValid: true,
      value: '',
      options: [
        {
          text: 'General Enquiry',
          value: 'general-enquiry',
        },
        {
          text: 'Support Request',
          value: 'support-request',
        },
      ],
    },
    consent: {
      ref: useRef<HTMLInputElement>(null),
      required: true,
      isValid: true,
    },
  });
  const feedbackDialogRef = createRef();
  const handleRadioChange = useCallback(function (newValue: string) {
    setFields((previousField) => ({
      ...previousField,
      query: {
        ...previousField.query,
        value: newValue,
      },
    }));
  }, []);
  const showSuccess = () => {
    feedbackDialogRef.current?.showModal();
    setTimeout(() => {
      feedbackDialogRef.current?.close();
    }, 10000);
  };
  const handleSubmit = function (e: JSX.TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    const firstName = fields.firstName.ref.current?.value;
    const lastName = fields.lastName.ref.current?.value;
    const email = fields.email.ref.current?.value;
    const message = fields.message.ref.current?.value;
    const query = fields.query.value;
    const checkecConsent = fields.consent.ref.current?.checked;
    const updatedFields = Object.assign({}, fields) as Fields;
    let hasInvalid = false;
    updatedFields.firstName.isValid = true;
    updatedFields.lastName.isValid = true;
    updatedFields.email.isNotEmptyEmail = true;
    updatedFields.email.isValidEmail = true;
    updatedFields.query.isValid = true;
    updatedFields.message.isValid = true;
    updatedFields.consent.isValid = true;

    if (firstName.trim() === '') {
      updatedFields.firstName.isValid = false;
      hasInvalid = true;
    }
    if (lastName.trim() === '') {
      updatedFields.lastName.isValid = false;
      hasInvalid = true;
    }
    const trimmedEmail = email.trim();
    if (trimmedEmail === '') {
      updatedFields.email.isNotEmptyEmail = false;
      hasInvalid = true;
    } else if (!isValidEmail(trimmedEmail)) {
      updatedFields.email.isValidEmail = false;
      hasInvalid = true;
    }
    if (!query) {
      updatedFields.query.isValid = false;
      hasInvalid = true;
    }
    if (message.trim() === '') {
      updatedFields.message.isValid = false;
      hasInvalid = true;
    }
    if (!checkecConsent) {
      updatedFields.consent.isValid = false;
      hasInvalid = true;
    }
    setFields((_) => updatedFields);
    if (!hasInvalid) {
      showSuccess();
      // TODO: ajax post
    }
  };
  return (
    <form class={styles.form} method="POST" onSubmit={handleSubmit}>
      <h1 class={styles.formHeading}>Contact Us</h1>
      <main class={styles.formFields}>
        <div class={styles.columns}>
          <TextField
            refObj={fields.firstName.ref}
            label={fields.firstName.label}
            isRequired={fields.firstName.required}
            isInvalid={!fields.firstName.isValid}
            invalidFeedback="This field is required"
          ></TextField>
          <TextField
            refObj={fields.lastName.ref}
            label={fields.lastName.label}
            isRequired={fields.lastName.required}
            isInvalid={!fields.lastName.isValid}
            invalidFeedback="This field is required"
          />
        </div>
        <TextField
          refObj={fields.email.ref}
          label={fields.email.label}
          isRequired={fields.email.required}
          isInvalid={
            !fields.email.isValidEmail || !fields.email.isNotEmptyEmail
          }
          invalidFeedback={
            ['This field is required', 'Please enter a valid email address'][
              !fields.email.isValidEmail ? 1 : 0
            ]
          }
        />
        <RadioField
          label={fields.query.label}
          isRequired={fields.query.required}
          isInvalid={!fields.query.isValid}
          invalidFeedback="Please select a query type"
          options={fields.query.options}
          currentValue={fields.query.value}
          onChange={handleRadioChange}
        />
        <TextAreaField
          refObj={fields.message.ref}
          label={fields.message.label}
          isRequired={fields.message.required}
          isInvalid={!fields.message.isValid}
          invalidFeedback="This field is required"
        />
        <CheckboxField
          refObj={fields.consent.ref}
          isRequired={fields.consent.required}
          isInvalid={!fields.consent.isValid}
          invalidFeedback="To submit this form, please consent to being contacted"
        />
        <button class={styles.btnPrimary} type="submit">
          Submit
        </button>
      </main>
      <PopupAlert
        refObj={feedbackDialogRef}
        status={AlertStatus.success}
        title="Message Sent!"
        detail="Thanks for completing the form. We'll be in touch soon!"
      />
    </form>
  );
}

export default TheForm;
