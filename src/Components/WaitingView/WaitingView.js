import styles from "./WaitingView.module.css";
import spinner from "Assets/images/spinner.svg";

const WaitingView = function ({ text = "Waiting..." }) {
  return (
    <div className={styles.view}>
      <img className={styles.spinner} src={spinner} alt="Spinner" draggable={false} />
      <span>{text}</span>
    </div>
  );
};

export default WaitingView;
