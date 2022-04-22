const DeviceSelectorView = function ({devices}) {

  return <div>
    {devices.map(device => {
      return <p key={device.id}> {device.name} </p>
    })}
  </div>
}

export default DeviceSelectorView;
