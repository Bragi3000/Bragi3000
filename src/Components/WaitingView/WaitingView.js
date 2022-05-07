import spinner from "Assets/images/spinner.svg";

/**
 * Component which is shown by the other components when the required data is not available yet
 * Displays a spinner and a message
 * @param text - text which is shown in the waiting view
 */
const WaitingView = function ({text = "Waiting..."}) {
  return (
    <div className={"absolute inset-0 h-screen flex justify-center items-center text-center"}>
      <div>
        <img className={"mx-auto w-[100px] h-[100px"} src={spinner} alt="Spinner" draggable={false}/>
        <span className={"mt-auto"}>{text}</span>
      </div>
    </div>
  );
};

export default WaitingView;
