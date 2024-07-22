import { RefObject } from 'preact';
import { JSX } from 'preact/jsx-runtime';

export enum AlertStatus {
  success = 'success',
}

interface PopupAlertProps {
  refObj: RefObject<HTMLDialogElement>;
  status: AlertStatus;
  title: string;
  detail?: string;
}

function PopupAlert({
  refObj,
  status = AlertStatus.success,
  title = 'Success!',
  detail = '',
}: PopupAlertProps): JSX.Element {
  return (
    <dialog class={`alert alert--${status}`} ref={refObj}>
      <span class="icon-text">
        <i class={`icon icon--${status}`}></i>
        <strong>{title}</strong>
      </span>
      <p>{detail}</p>
    </dialog>
  );
}

export default PopupAlert;
