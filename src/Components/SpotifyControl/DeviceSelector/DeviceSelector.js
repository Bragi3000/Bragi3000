import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDevice } from "Services/Spotify/spotifyAPI";
import useSpotifyAuthData from "Store/selectors/useSpotifyAuthData";
import {
  fetchDevices,
  selectActiveDevice,
  selectDevices,
  setActiveDeviceState,
} from "Store/slices/playback";
import DeviceSelectorView from "./DeviceSelectorView";

/**
 * A list of Spotify devices from which the active device can be chosen.
 * @returns The presenter for the component
 */
const DeviceSelector = function () {
  const { access_token: accessToken } = useSpotifyAuthData();
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
    await setActiveDevice(accessToken, deviceId);
    dispatch(
      setActiveDeviceState({
        device: devices.find((device) => device.id === deviceId),
      })
    );
    dispatch(fetchDevices({ accessToken }));
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
