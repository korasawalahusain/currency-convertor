import { useState } from "react";
import { Asset } from "expo-asset";
import { loadAsync } from "expo-font";

const usePromiseAll = async (promises, cb) => {
  await Promise.all(promises);
  cb();
};

const useLoadAssets = (assets = [], fonts = {}) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  usePromiseAll(
    [loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setAssetsLoaded(true)
  );
  return [assetsLoaded];
};

export default useLoadAssets;
