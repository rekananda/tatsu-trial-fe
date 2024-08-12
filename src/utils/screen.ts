import { MantineBreakpoint, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface useMediaQueryFromBreakpointsParams {
	(breakpoint?: MantineBreakpoint, query?: "max-width" | "min-width"): boolean|undefined;
}

export const useMediaQueryFromBreakpoints: useMediaQueryFromBreakpointsParams = (
	breakpoint = "mobile",
	query = "max-width",
) => {
	const theme = useMantineTheme();
	const bool = useMediaQuery(`(${query}: ${theme.breakpoints[breakpoint]})`, undefined, {
		getInitialValueInEffect: false,
	});

	return bool;
};