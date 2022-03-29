const SpotifyControlView = function ({onModifyPlayback, data}) {
  console.log("test", data);
  return (
    <div>
      <img src={data.image_src} alt={"_"}/>
      <span> {data.name} </span>
      <img src={data.is_playing ? "" : ""} alt={"_"} onClick={onModifyPlayback}/>
    </div>
  )
}

export default SpotifyControlView;
