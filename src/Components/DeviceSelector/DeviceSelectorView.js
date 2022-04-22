import styles from "./DeviceSelector.module.css"
import soundIcon from "Assets/images/sound-icon.png";

const DeviceSelectorView = function ({devices, onClickDevice}) {

  return <div className={styles.DeviceSelector}>
    {devices.map(device => {
      return <button key={device.id} className={styles.Device} onClick={() => onClickDevice(device)}>
        {device.name}
        {device.is_active && <img src={soundIcon} alt="sound icon" className={styles.SoundIcon}/>}
      </button>
    })}
  </div>
}

export default DeviceSelectorView;
