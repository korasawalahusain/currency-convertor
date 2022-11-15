import { Asset } from 'expo-asset';
import { loadAsync } from 'expo-font';
import { useEffect, useState } from 'react';

const usePromiseAll = (promises, cb) =>
	useEffect(() => {
		(async () => {
			await Promise.all(promises);
			cb();
		})();
	});

const useLoadAssets = (assets = [], fonts = {}) => {
	const [assetsLoaded, setAssetsLoaded] = useState(false);
	usePromiseAll(
		[loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
		() => setAssetsLoaded(true)
	);
	return [assetsLoaded];
};

export default useLoadAssets;
