import CarDebugScene from "@/scenes/CarDebugScene.tsx";
import StartScene from "@/scenes/StartScene.tsx";
import VehicleSelectionScene from "@/scenes/VehicleSelectionScene.tsx";
import {proxy} from "valtio/vanilla";
import MapSelectionScene from "@/scenes/MapSelectionScene.tsx";
import GameMapScene from "@/scenes/GameMapScene.tsx";

export const Scenes = {
  carDebugScene: CarDebugScene,
  startScene: StartScene,
  vehicleSelectionScene: VehicleSelectionScene,
  mapSelectionScene: MapSelectionScene,
  gameMapScene: GameMapScene,
}

export type ScenesStoreType = {
  currentScene: keyof typeof Scenes
}

export const sceneStore = proxy<ScenesStoreType>({
  currentScene: "gameMapScene"
})

export const setCurrentScene = (scene: keyof typeof Scenes) => {
  sceneStore.currentScene = scene;
}
