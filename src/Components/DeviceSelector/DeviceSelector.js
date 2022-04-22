import DeviceSelectorView from "./DeviceSelectorView";
import useSpotifyAuth from "../../Store/selectors/useSpotifyAuthData";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchDevices, selectDevices} from "Store/slices/playback";

/*
Component to select device to play music from.
 */
const DeviceSelector = function () {

  const token = useSpotifyAuth();
  const dispatch = useDispatch();
  const accessToken = token.access_token;

  // fetch devices intially
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

  const devices = useSelector(state => selectDevices(state));
  return <DeviceSelectorView devices={devices} />;
}

export default DeviceSelector;
