import cx from "Utils/classNames";

const SongView = function ({ title, artists, image, onClick }) {
  return (
    <div
      className={cx([
        "flex px-3 py-1 space-x-3 items-center",
        onClick && "cursor-pointer hover:bg-main-800",
      ])}
      onClick={() => onClick && onClick()}
    >
      <img className="flex-none w-16 h-16" src={image} alt="" />

      <div className="flex-auto flex flex-col place-start overflow-hidden">
        <span className="block nowrap-ellipsis">
          {title}
        </span>
        <span className="block nowrap-ellipsis text-main-400">{artists.join(", ")}</span>
      </div>
    </div>
  );
};

export default SongView;
// <a
// className={styles.resultSong}
// key={song.id}
// href="_"
// onClick={handleClick}
// >
