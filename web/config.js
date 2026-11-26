export const TWIN_CONFIG = {
  ionToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Im5hcUVEOWFBVE1FTV84TW4iLCJqdGkiOiJiNjMzYmIzYi00NzJlLTQ4MTktODg1NS0wODBhZGJhOTk2OWEiLCJpZCI6NTQxMDg3LCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3OTM2MzMwMTR9.wgjrFUb7YPiYlhryDnDUuoTuqBWqkKxEArQiqD0dE6o",
  initialCamera: {
    lon: -9.1393,
    lat: 38.7223,
    height: 1800,
    heading: 0,
    pitch: -40,
    roll: 0
  },
  assets: {
    dtmTerrainId: null,         // Replace with Quantized Mesh asset ID
    buildings3DTilesId: null,   // Replace with 3D Tiles asset ID
    orthophotoId: null          // Replace with tiled imagery asset ID
  },
  scenarios: [
    { id: "baseline", label: "Baseline (Current)" },
    { id: "trees", label: "Street Trees Scenario" },
    { id: "green_roofs", label: "Green Roofs Scenario" },
    { id: "green_depaved", label: "Green Depaved Scenario" }
  ],
  pois: [
    { id: "poi_1", label: "Study POI 1", lon: -9.14, lat: 38.72, height: 120, heading: 30, pitch: -35 }
  ]
};