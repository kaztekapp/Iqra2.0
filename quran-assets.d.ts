// Surah data files (assets/quran/*.qjson): bundled as assets, required as asset ids.
declare module '*.qjson' {
  const asset: number;
  export default asset;
}
