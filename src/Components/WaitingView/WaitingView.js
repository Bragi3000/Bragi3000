import styles from "./WaitingView.module.css";
import spinner from "Assets/images/spinner.svg";

/**
 * Component which is shown by the other components when the required data is not available yet
 * Displays a spinner and a message
 * @param text - text which is shown in the waiting view
 */
const WaitingView = function ({ text = "Waiting..." }) {
  return (
    <div className={styles.view}>
      <img className={styles.spinner} src={spinner} alt="Spinner" draggable={false} />
      <span>{text}</span>
    </div>
  );
};

export default WaitingView;
