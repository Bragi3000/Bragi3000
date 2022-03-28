const SpotifyControlView = function ({onModifyPlayback, data}) {

  return (
    <div>
      <img src={data.image_src} alt={"_"}/>
      <span> {data.name} </span>
      <img src={data.is_playing ? "" : ""} alt={"_"} onClick={onModifyPlayback(data.is_playing)}/>
    </div>
  )
}

export default SpotifyControlView;
