import PlaylistView from "./PlaylistView";
import {
  fetchPlaylistId,
  fetchPlaylistSongs,
  selectPlaylistSongs,
} from "Store/slices/playlist";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSpotifyAccessToken } from "Store/slices/spotifyAuth";
import { selectPlayback } from "Store/slices/playback";

const useRemainingTime = function () {
  const playbackState = useSelector(selectPlayback);
  const playlistSongs = useSelector(selectPlaylistSongs);

  return useMemo(
    () =>
      playbackState.duration_ms -
      playbackState.progress_ms +
      playlistSongs.reduce((accumulate, track) => {
        return accumulate + track.duration_ms;
      }, 0),
    [playbackState, playlistSongs]
  );
};

const useTimeUntilSongs = function (songs = []) {
  const playbackState = useSelector(selectPlayback);

  return songs.reduce(
    (acc, currSong) => [...acc, acc[acc.length - 1] + currSong.duration_ms],
    [playbackState.duration_ms - playbackState.progress_ms]
  );
};

/**
 * Component that displays the playlist of the game.
 */
const Playlist = function () {
  const accessToken = useSelector(selectSpotifyAccessToken);
  const dispatch = useDispatch();
  const remainingTime = useRemainingTime();
  const songs = useSelector((state) => selectPlaylistSongs(state));
  const timeUntilSongs = useTimeUntilSongs(songs);

  useEffect(() => {
    dispatch(fetchPlaylistId({ accessToken }))
      .unwrap()
      .then(() => dispatch(fetchPlaylistSongs({ accessToken })));
  }, [dispatch, accessToken]);

  return <PlaylistView {...{ songs, remainingTime, timeUntilSongs }} />;
};

export default Playlist;
