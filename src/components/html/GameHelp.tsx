import KeyboardAOutline from "@/assets/images/inputs/keyboard_a_outline.png";
import KeyboardWOutline from "@/assets/images/inputs/keyboard_w_outline.png";
import KeyboardSOutline from "@/assets/images/inputs/keyboard_s_outline.png";
import KeyboardDOutline from "@/assets/images/inputs/keyboard_d_outline.png";
import KeyboardSpaceOutline from "@/assets/images/inputs/keyboard_space_icon_outline.png";
import KeyboardHOutline from "@/assets/images/inputs/keyboard_h_outline.png";
import BaseButton from "@/components/html/BaseButton.tsx";
import {ButtonType} from "@/components/html/ButtonType.ts";
import {useEffect, useState} from "react";

export default function GameHelp() {

  const [showHelp, setShowHelp] = useState(false);

  // handle keyboard shortcuts
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'h' || event.key === 'H') {
      event.preventDefault();
      setShowHelp(prev => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return <>
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center">
      <div className={"p-4 rounded-md text-white bg-neutral-800/60 " + (showHelp ? "block" : "hidden")}>
        <h1 className="text-center text-2xl font-bold">Game Help</h1>
        <p>Use the following controls to play the game:</p>
        <ul>
          <li className="flex items-center">
            <img className="w-8 h-8" src={KeyboardWOutline} alt="Accelerate"/>
            <span>: Accelerate</span>
          </li>
          <li className="flex items-center">
            <img className="w-8 h-8" src={KeyboardSOutline} alt="Backward"/>
            <span>: Backward</span>
          </li>
          <li className="flex items-center">
            <img className="w-8 h-8" src={KeyboardAOutline} alt="Turn Left"/>
            <span>: Turn Left</span>
          </li>
          <li className="flex items-center">
            <img className="w-8 h-8" src={KeyboardDOutline} alt="Turn Right"/>
            <span>: Turn Right</span>
          </li>
          <li className="flex items-center">
            <img className="w-8 h-8" src={KeyboardSpaceOutline} alt="Brake"/>
            <span>: Brake</span>
          </li>
        </ul>
        <div className="flex justify-center">
          <BaseButton type={ButtonType.DANGER} className="mx-auto" onClick={() => window.location.reload()}>
            Close
          </BaseButton>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-white bg-neutral-800/60 p-2 rounded-md flex items-center">
        <img className="w-8 h-8" src={KeyboardHOutline} alt="Show Help"/>
        <span>: Show help</span>
      </div>
    </div>
  </>
}
