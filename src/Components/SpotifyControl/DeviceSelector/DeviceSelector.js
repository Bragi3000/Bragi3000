import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDevices,
  selectDevices,
  setActiveDevice,
  selectActiveDevice,
} from "Store/slices/devices";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";
import DeviceSelectorView from "./DeviceSelectorView";

/**
 * A list of Spotify devices from which the active device can be chosen.
 * @returns The presenter for the component
 */
const DeviceSelector = function () {
  const accessToken = useSelector(selectSpotifyAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDevices({ accessToken }));

    const interval = setInterval(() => {
      dispatch(fetchDevices({ accessToken }));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, accessToken]);

  const devices = useSelector((state) => selectDevices(state));
  const activeDeviceId = useSelector((state) => selectActiveDevice(state));

  const handleSelectDeviceId = async (deviceId) => {
    await dispatch(setActiveDevice({ accessToken, deviceId })).unwrap();
    await dispatch(fetchDevices({ accessToken })).unwrap();
  };

  return (
    <DeviceSelectorView
      devices={devices}
      activeDeviceId={activeDeviceId}
      onSelectDeviceId={handleSelectDeviceId}
    />
  );
};

export default DeviceSelector;
