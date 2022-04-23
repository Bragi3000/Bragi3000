import styles from "./DeviceSelector.module.css"
import soundIcon from "Assets/images/sound-icon.png";

/*
 * DeviceSelectorView to display the list of devices and let the user select one.
 */
const DeviceSelectorView = function ({devices, onClickDevice}) {

  return <div className={styles.DeviceSelector}>
    {devices.map(device => {
      return <button key={device.id} className={styles.Device} onClick={() => onClickDevice(device)}>
        {device.name}
        {device.is_active && <img src={soundIcon} alt="sound icon" className={styles.SoundIcon}/>}
      </button>
    })}
    {devices.length === 0 &&
      <div className={styles.NoDevices}>No devices found, open Spotify on the device you want to use</div>}
  </div>
}

export default DeviceSelectorView;
