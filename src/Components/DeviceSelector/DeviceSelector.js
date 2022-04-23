import DeviceSelectorView from "./DeviceSelectorView";
import useSpotifyAuth from "../../Store/selectors/useSpotifyAuthData";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchDevices, selectDevices, setActiveDeviceState} from "Store/slices/playback";
import {setActiveDevice} from "Services/Spotify/spotifyAPI";

/*
 * Component to select device to play music from.
 */
const DeviceSelector = function () {

  const token = useSpotifyAuth();
  const dispatch = useDispatch();
  const accessToken = token.access_token;

  // fetch devices initially
  useEffect(() => {
    dispatch(fetchDevices({ accessToken }));
  }, []);

  // trigger fetch of devices in fixed interval
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchDevices({ accessToken }));
    }, 5000);
    return () => clearInterval(interval);
  }, [accessToken, dispatch]);

  const onDeviceClick = async (device) => {
    await setActiveDevice(token.access_token, device.id);
    dispatch(setActiveDeviceState({device}));
    dispatch(fetchDevices({ accessToken }));
  };

  const devices = useSelector(state => selectDevices(state));
  return <DeviceSelectorView devices={devices} onClickDevice={onDeviceClick} />;
}

export default DeviceSelector;
