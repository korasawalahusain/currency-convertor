const useInitConstants = (...constants) => {
	const [constantsLoaded, setConstantsLoaded] = useState(false);

	const CONVERTORPAGE_MAX_TRANSLATE_Y = -constants[0] - 50;
	const COMPONENTS_MAX_TRANSLATE_Y = -constants[0];

	const CONVERTORPAGEMAX_INITIAL_SCROLL_POSITION =
		CONVERTORPAGE_MAX_TRANSLATE_Y;
	const COMPONENTS_INITIAL_SCROLL_POSITION = -650;

	return [constantsLoaded];
};
