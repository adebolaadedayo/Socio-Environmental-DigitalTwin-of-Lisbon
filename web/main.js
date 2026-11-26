import { TWIN_CONFIG } from "./config.js";

Cesium.Ion.defaultAccessToken = TWIN_CONFIG.ionToken;

const viewerOptions = {
  baseLayerPicker: false,
  geocoder: false,
  timeline: false,
  animation: false
};

if (TWIN_CONFIG.assets.dtmTerrainId) {
  viewerOptions.terrainProvider = await Cesium.CesiumTerrainProvider.fromAssetId(
    TWIN_CONFIG.assets.dtmTerrainId
  );
}

const viewer = new Cesium.Viewer("cesiumContainer", viewerOptions);

function flyToCamera({ lon, lat, height, heading = 0, pitch = -40, roll = 0 }) {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
    orientation: {
      heading: Cesium.Math.toRadians(heading),
      pitch: Cesium.Math.toRadians(pitch),
      roll: Cesium.Math.toRadians(roll)
    }
  });
}

flyToCamera(TWIN_CONFIG.initialCamera);

let buildingsTileset = null;
if (TWIN_CONFIG.assets.buildings3DTilesId) {
  buildingsTileset = await Cesium.Cesium3DTileset.fromIonAssetId(
    TWIN_CONFIG.assets.buildings3DTilesId
  );
  viewer.scene.primitives.add(buildingsTileset);
}

// Populate controls from config
const scenarioSelect = document.getElementById("scenarioSelect");
TWIN_CONFIG.scenarios.forEach((s) => {
  const opt = document.createElement("option");
  opt.value = s.id;
  opt.textContent = s.label;
  scenarioSelect.appendChild(opt);
});

const poiSelect = document.getElementById("poiSelect");
const defaultPoiOpt = document.createElement("option");
defaultPoiOpt.value = "";
defaultPoiOpt.textContent = "Overview";
poiSelect.appendChild(defaultPoiOpt);

TWIN_CONFIG.pois.forEach((p) => {
  const opt = document.createElement("option");
  opt.value = p.id;
  opt.textContent = p.label;
  poiSelect.appendChild(opt);
});

scenarioSelect.addEventListener("change", (e) => {
  const selectedScenario = e.target.value;
  // Placeholder hook: swap scenario layers/styles once final datasets are loaded
  console.log("Active scenario:", selectedScenario);
});

poiSelect.addEventListener("change", (e) => {
  const poi = TWIN_CONFIG.pois.find((item) => item.id === e.target.value);
  if (poi) {
    flyToCamera(poi);
  } else {
    flyToCamera(TWIN_CONFIG.initialCamera);
  }
});

document.getElementById("toggleBuildings").addEventListener("change", (e) => {
  if (buildingsTileset) {
    buildingsTileset.show = e.target.checked;
  }
});

document.getElementById("toggleLighting").addEventListener("change", (e) => {
  viewer.scene.globe.enableLighting = e.target.checked;
});

// Basic click inspection hook
const infoBox = document.getElementById("selectionInfo");
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((movement) => {
  const picked = viewer.scene.pick(movement.position);
  if (!Cesium.defined(picked)) {
    infoBox.textContent = "No feature selected.";
    return;
  }
  const props = picked.getPropertyIds ? picked.getPropertyIds() : [];
  if (props.length > 0) {
    const lines = props.slice(0, 6).map((k) => `${k}: ${picked.getProperty(k)}`);
    infoBox.innerHTML = lines.join("<br>");
  } else {
    infoBox.textContent = "Selected scene object (no attributes attached).";
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);