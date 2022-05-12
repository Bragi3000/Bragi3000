import { useDispatch, useSelector } from "react-redux";
import {
  selectHasValidSpotifyToken,
  selectSpotifyAccessToken,
} from "Store/slices/spotifyAuth";
import { selectPlaylistId, setBannedSongs } from "Store/slices/playlist";
import { resetPlaylist } from "Services/Spotify/spotifyAPI";
import { useState } from "react";
import { setPlayedSongs } from "Store/slices/playback";
import PlaylistSettingsView from "./PlaylistSettingsView";

/**
 * Settings section showing configuration for the playlist.
 * @returns The presenter for the component
 */
const PlaylistSettings = function () {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectSpotifyAccessToken);
  const hasValidToken = useSelector(selectHasValidSpotifyToken);
  const playlistId = useSelector(selectPlaylistId);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onReset = () => {
    resetPlaylist(accessToken, playlistId);
    dispatch(setBannedSongs([]));
    dispatch(setPlayedSongs([]));
  };

  return (
    <PlaylistSettingsView
      {...{
        hasValidToken,
        onReset,
        showConfirmation,
        setShowConfirmation,
      }}
    />
  );
};

export default PlaylistSettings;
