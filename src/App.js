import { useEffect, useState } from "react";
import "./App.css";
import { Howl } from "howler";

const App = (props) => {
  console.log(props.nameBank);
  const [displayName, setDisplayName] = useState(props.nameBank);
  const [volumeControl, setVolumeControl] = useState(0.5);

  useEffect(() => {
    setDisplayName(props.nameBank);
  }, [props]);

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      volume: volumeControl,
    });
    sound.play();
  };

  const handleKeydown = (e) => {
    if (document.getElementById(e.key.toUpperCase()) !== null) {
      document.getElementById(e.key.toUpperCase()).click();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
  }, []);

  const RenderButtonSound = () => {
    return props.sound.map((soundObj) => {
      return (
        <button
          key={soundObj.keyCode}
          id={soundObj.keyTrigger}
          onClick={() => {
            soundPlay(soundObj.url);
            setDisplayName(soundObj.id);
          }}
        >
          {soundObj.keyTrigger}
        </button>
      );
    });
  };

  return (
    <div>
      <div className="Drum">
        {RenderButtonSound()}
        <h3 id="display">{displayName}</h3>
      </div>
      <div className="slidecontainer">
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volumeControl}
          onChange={(event) => {
            setVolumeControl(event.target.valueAsNumber);
          }}
        />
      </div>
    </div>
  );
};
export default App;
