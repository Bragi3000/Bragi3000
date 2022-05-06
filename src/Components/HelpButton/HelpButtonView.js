

const HelpButtonView = function({text, toggle}) {
  return (
    <button className={"text-green-400 hover:underline pr-6"} onClick={toggle}>
      {text}
    </button>
  )
}

export default HelpButtonView;
