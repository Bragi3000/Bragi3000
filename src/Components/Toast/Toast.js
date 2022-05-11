import {toast, Toaster} from "react-hot-toast";
import {Info as InfoIcon, Warning as ErrorIcon } from "phosphor-react";

/**
 * Toast for info messages.
 * @param message to be displayed in the toast.
 */
const infoToast = function (message) {
  toast(message, {
    icon: <InfoIcon size={24}/>,
    style: {
      color: "#000",
      background: "#16a34a"
    }
  });
}

/**
 * Toast for error messages.
 * @param message to be displayed in the toast.
 */
const errorToast = function (message) {
  toast(message, {
    icon: <ErrorIcon size={24}/>,
    style: {
      color: "#000",
      background: "#ea580c"
    }
  });
}

/**
 * Toast component which is used to display info and error toasts.
 */
const Toast = function () {
  return <Toaster position={"top-center"}/>
}

export {infoToast, errorToast};
export default Toast;
