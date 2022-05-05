import cx from "Utils/classNames";

/**
 * Component showing information of a single song.
 * This view is only meant to be used by the presenter.
 * @param title Title of the song to display
 * @param artists List of artists of the song to display
 * @param image Source of the album cover to display
 * @param onClick (Optional) event fired when the song is clicked
 * @returns The view for the component
 */
const SongView = function ({ title, artists, image, onClick }) {
  return (
    <div
      className={cx([
        "flex px-3 py-1 space-x-3 items-center",
        onClick && "cursor-pointer hover:bg-gray-800",
      ])}
      onClick={() => onClick && onClick()}
    >
      <img className="flex-none w-16 h-16" src={image} alt="" />

      <div className="flex-auto flex flex-col place-start overflow-hidden">
        <span className="block nowrap-ellipsis">
          {title}
        </span>
        <span className="block nowrap-ellipsis text-gray-400">{artists.join(", ")}</span>
      </div>
    </div>
  );
};

export default SongView;
