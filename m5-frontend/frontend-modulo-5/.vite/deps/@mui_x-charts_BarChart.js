import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { Ar as require_prop_types, L as useRtl, N as useId, Or as composeClasses, _t as generateUtilityClass, gt as generateUtilityClasses, kr as clsx, ot as useEnhancedEffect, sn as require_jsx_runtime, un as _extends } from "./system-BtmZd1DY.js";
import { i as useTheme, t as styled } from "./styled-SFJTYq9a.js";
import { f as useThemeProps } from "./styles-BJQjLzTu.js";
import { K as _objectWithoutPropertiesLoose, x as useSlotProps } from "./useMediaQuery-Db58fz2_.js";
import { $ as selectorBrushShouldPreventAxisHighlight, A as ANIMATION_TIMING_FUNCTION, At as getStringSize, B as useYAxes, Ct as selectorChartXAxisAutoSizeResults, Dt as getGraphemeCount, Et as number_default, F as selectorChartSeriesUnfadedItem, G as useChartsContext, H as useChartId, J as useChartKeyboardNavigation, K as useChartHighlight, L as useAllSeriesOfType, M as selectorChartIsSeriesFaded, Mt as DEFAULT_Y_AXIS_KEY, N as selectorChartIsSeriesHighlighted, Nt as createSelector, Ot as deg2rad, P as selectorChartSeriesHighlightedItem, Pt as createSelectorMemoized, Q as useChartBrush, R as useChartsLayerContainerRef, St as selectorChartDrawingArea, Tt as useChartVisibilityManager, U as useDrawingArea, V as clampAngle, W as useStore, X as getValueToPositionMapper, Y as useChartTooltip, Z as selectorBarItemAtPosition, _t as isDateData, at as selectorChartsInteractionXAxisIndex, c as ChartsTooltip, ct as selectorChartsInteractionYAxisValue, d as getColor, dt as getChartPoint, et as selectorChartsItemIsFocused, f as useSkipAnimation, ft as selectorChartXAxis, gt as isOrdinalScale, ht as useChartZAxis, i as ChartsDataProvider, it as useChartCartesianAxis, j as useItemHighlightState, jt as DEFAULT_X_AXIS_KEY, k as useAnimate, kt as batchMeasureStrings, lt as selectorChartsLastInteraction, mt as selectorChartZoomIsInteracting, n as useChartsContainerProps, nt as selectorChartsKeyboardYAxisIndex, o as ChartsOverlay, ot as selectorChartsInteractionXAxisValue, p as useFocusedItem, pt as selectorChartYAxis, q as EPSILON, r as ChartsSurface, s as ChartsLegend, st as selectorChartsInteractionYAxisIndex, t as ChartsWrapper, tt as selectorChartsKeyboardXAxisIndex, u as createGetBarDimensions, ut as useChartInteraction, wt as selectorChartYAxisAutoSizeResults, yt as warnOnce, z as useXAxes } from "./ChartsWrapper-D7aAyx_2.js";
//#region node_modules/@mui/x-charts/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianHighlight.selectors.mjs
/**
* The return type of the `selectAxisHighlightWithValue`.
*/
function getAxisHighlight(lastInteractionUpdate, pointerHighlight, keyboardHighlight) {
	if (lastInteractionUpdate === "pointer") {
		if (pointerHighlight) return [pointerHighlight];
		if (keyboardHighlight) return [keyboardHighlight];
	}
	if (lastInteractionUpdate === "keyboard") {
		if (keyboardHighlight) return [keyboardHighlight];
		if (pointerHighlight) return [pointerHighlight];
	}
	return [];
}
var selectorChartControlledCartesianAxisHighlight = (state) => state.controlledCartesianAxisHighlight;
var selectAxisHighlight = (computedIndex, axis, controlledAxisItems, keyboardAxisItem, lastInteractionUpdate, isBrushSelectionActive) => {
	if (isBrushSelectionActive) return [];
	if (controlledAxisItems !== void 0) return controlledAxisItems.filter((item) => axis.axis[item.axisId] !== void 0).map((item) => item);
	return getAxisHighlight(lastInteractionUpdate, computedIndex !== null && {
		axisId: axis.axisIds[0],
		dataIndex: computedIndex
	}, keyboardAxisItem != null && keyboardAxisItem);
};
createSelectorMemoized(selectorChartsInteractionXAxisIndex, selectorChartXAxis, selectorChartControlledCartesianAxisHighlight, selectorChartsKeyboardXAxisIndex, selectorChartsLastInteraction, selectorBrushShouldPreventAxisHighlight, selectAxisHighlight);
createSelectorMemoized(selectorChartsInteractionYAxisIndex, selectorChartYAxis, selectorChartControlledCartesianAxisHighlight, selectorChartsKeyboardYAxisIndex, selectorChartsLastInteraction, selectorBrushShouldPreventAxisHighlight, selectAxisHighlight);
var selectAxisHighlightWithValue = (computedIndex, computedValue, axis, controlledAxisItems, keyboardAxisItem, lastInteractionUpdate, isBrushSelectionActive) => {
	if (isBrushSelectionActive) return [];
	if (controlledAxisItems !== void 0) return controlledAxisItems.map((item) => _extends({}, item, { value: axis.axis[item.axisId]?.data?.[item.dataIndex] })).filter(({ value }) => value !== void 0);
	const pointerHighlight = computedValue != null && {
		axisId: axis.axisIds[0],
		value: computedValue
	};
	if (pointerHighlight && computedIndex != null) pointerHighlight.dataIndex = computedIndex;
	const keyboardValue = keyboardAxisItem != null && axis.axis[keyboardAxisItem.axisId]?.data?.[keyboardAxisItem.dataIndex];
	return getAxisHighlight(lastInteractionUpdate, pointerHighlight, keyboardAxisItem != null && keyboardValue != null && _extends({}, keyboardAxisItem, { value: keyboardValue }));
};
var selectorChartsHighlightXAxisValue = createSelectorMemoized(selectorChartsInteractionXAxisIndex, selectorChartsInteractionXAxisValue, selectorChartXAxis, selectorChartControlledCartesianAxisHighlight, selectorChartsKeyboardXAxisIndex, selectorChartsLastInteraction, selectorBrushShouldPreventAxisHighlight, selectAxisHighlightWithValue);
var selectorChartsHighlightYAxisValue = createSelectorMemoized(selectorChartsInteractionYAxisIndex, selectorChartsInteractionYAxisValue, selectorChartYAxis, selectorChartControlledCartesianAxisHighlight, selectorChartsKeyboardYAxisIndex, selectorChartsLastInteraction, selectorBrushShouldPreventAxisHighlight, selectAxisHighlightWithValue);
/**
* Get the scale of the axis with highlight if controlled. The default axis otherwise.
* @param controlledItem The controlled value of highlightedAxis
* @param axis The axis state after all the processing
* @returns axis state
*/
var selectAxis = (axisItems, axis) => {
	if (axisItems === void 0) return [axis.axis[axis.axisIds[0]]];
	return axisItems.map((item) => axis.axis[item.axisId] ?? null).filter((item) => item !== null);
};
createSelector(selectorChartControlledCartesianAxisHighlight, selectorChartXAxis, selectAxis);
createSelector(selectorChartControlledCartesianAxisHighlight, selectorChartYAxis, selectAxis);
//#endregion
//#region node_modules/@mui/x-charts/hooks/useBarSeries.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Get access to the internal state of bar series.
* The returned object contains:
* - series: a mapping from ids to series attributes.
* - seriesOrder: the array of series ids.
* - stackingGroups: the array of stacking groups. Each group contains the series ids stacked and the strategy to use.
* @returns the bar series
*/
function useBarSeriesContext() {
	return useAllSeriesOfType("bar");
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/animation/useAnimateBar.mjs
function barPropsInterpolator(from, to) {
	const interpolateX = number_default(from.x, to.x);
	const interpolateY = number_default(from.y, to.y);
	const interpolateWidth = number_default(from.width, to.width);
	const interpolateHeight = number_default(from.height, to.height);
	return (t) => {
		return {
			x: interpolateX(t),
			y: interpolateY(t),
			width: interpolateWidth(t),
			height: interpolateHeight(t)
		};
	};
}
/**
* Animates a bar from the start of the axis (x-axis for vertical layout, y-axis for horizontal layout) to its
* final position.
*
* The props object also accepts a `ref` which will be merged with the ref returned from this hook. This means you can
* pass the ref returned by this hook to the `path` element and the `ref` provided as argument will also be called.
*/
function useAnimateBar(props) {
	const initialProps = {
		x: props.layout === "vertical" ? props.x : props.xOrigin,
		y: props.layout === "vertical" ? props.yOrigin : props.y,
		width: props.layout === "vertical" ? props.width : 0,
		height: props.layout === "vertical" ? 0 : props.height
	};
	return useAnimate({
		x: props.x,
		y: props.y,
		width: props.width,
		height: props.height
	}, {
		createInterpolator: barPropsInterpolator,
		applyProps(element, animatedProps) {
			element.setAttribute("x", animatedProps.x.toString());
			element.setAttribute("y", animatedProps.y.toString());
			element.setAttribute("width", animatedProps.width.toString());
			element.setAttribute("height", animatedProps.height.toString());
		},
		transformProps: (p) => p,
		initialProps,
		skip: props.skipAnimation,
		ref: props.ref
	});
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/animation/useAnimateBarLabel.mjs
function barLabelPropsInterpolator(from, to) {
	const interpolateX = number_default(from.x, to.x);
	const interpolateY = number_default(from.y, to.y);
	const interpolateWidth = number_default(from.width, to.width);
	const interpolateHeight = number_default(from.height, to.height);
	return (t) => ({
		x: interpolateX(t),
		y: interpolateY(t),
		width: interpolateWidth(t),
		height: interpolateHeight(t)
	});
}
/**
* Animates a bar label from the start of the axis (x-axis for vertical layout, y-axis for horizontal layout) to the
* center of the bar it belongs to.
* The label is horizontally centered within the bar when the layout is vertical, and vertically centered for laid out
* horizontally.
*
* The props object also accepts a `ref` which will be merged with the ref returned from this hook. This means you can
* pass the ref returned by this hook to the `path` element and the `ref` provided as argument will also be called.
*/
function useAnimateBarLabel(props) {
	const { initialX, currentX, initialY, currentY } = props.placement === "outside" ? getOutsidePlacement(props) : getCenterPlacement(props);
	const initialProps = {
		x: initialX,
		y: initialY,
		width: props.width,
		height: props.height
	};
	return useAnimate({
		x: currentX,
		y: currentY,
		width: props.width,
		height: props.height
	}, {
		createInterpolator: barLabelPropsInterpolator,
		transformProps: (p) => p,
		applyProps(element, animatedProps) {
			element.setAttribute("x", animatedProps.x.toString());
			element.setAttribute("y", animatedProps.y.toString());
			element.setAttribute("width", animatedProps.width.toString());
			element.setAttribute("height", animatedProps.height.toString());
		},
		initialProps,
		skip: props.skipAnimation,
		ref: props.ref
	});
}
var LABEL_OFFSET = 4;
function getCenterPlacement(props) {
	return {
		initialX: props.layout === "vertical" ? props.x + props.width / 2 : props.xOrigin,
		initialY: props.layout === "vertical" ? props.yOrigin : props.y + props.height / 2,
		currentX: props.x + props.width / 2,
		currentY: props.y + props.height / 2
	};
}
function getOutsidePlacement(props) {
	let initialY = 0;
	let currentY = 0;
	let initialX = 0;
	let currentX = 0;
	if (props.layout === "vertical") {
		if (props.y < props.yOrigin) {
			initialY = props.yOrigin - LABEL_OFFSET;
			currentY = props.y - LABEL_OFFSET;
		} else {
			initialY = props.yOrigin + LABEL_OFFSET;
			currentY = props.y + props.height + LABEL_OFFSET;
		}
		return {
			initialX: props.x + props.width / 2,
			currentX: props.x + props.width / 2,
			initialY,
			currentY
		};
	}
	if (props.x < props.xOrigin) {
		initialX = props.xOrigin;
		currentX = props.x - LABEL_OFFSET;
	} else {
		initialX = props.xOrigin;
		currentX = props.x + props.width + LABEL_OFFSET;
	}
	return {
		initialX,
		currentX,
		initialY: props.y + props.height / 2,
		currentY: props.y + props.height / 2
	};
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsAxis/axisClasses.mjs
function getAxisUtilityClass(slot) {
	return generateUtilityClass("MuiChartsAxis", slot);
}
var axisClasses = generateUtilityClasses("MuiChartsAxis", [
	"root",
	"line",
	"tickContainer",
	"tick",
	"tickLabel",
	"label",
	"directionX",
	"directionY",
	"top",
	"bottom",
	"left",
	"right"
]);
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/utilities.mjs
var useUtilityClasses$4 = (ownerState) => {
	const { classes, position } = ownerState;
	return composeClasses({
		root: [
			"root",
			"directionX",
			position
		],
		line: ["line"],
		tickContainer: ["tickContainer"],
		tick: ["tick"],
		tickLabel: ["tickLabel"],
		label: ["label"]
	}, getAxisUtilityClass, classes);
};
var defaultProps$1 = {
	disableLine: false,
	disableTicks: false,
	tickSize: 6,
	tickLabelMinGap: 4
};
//#endregion
//#region node_modules/@mui/x-charts/internals/isInfinity.mjs
function isInfinity(v) {
	return typeof v === "number" && !Number.isFinite(v);
}
//#endregion
//#region node_modules/@mui/x-charts/utils/timeTicks.mjs
function yearNumber(from, to) {
	return Math.abs(to.getFullYear() - from.getFullYear());
}
function monthNumber(from, to) {
	return Math.abs(to.getFullYear() * 12 + to.getMonth() - 12 * from.getFullYear() - from.getMonth());
}
function dayNumber(from, to) {
	return Math.abs(to.getTime() - from.getTime()) / (1e3 * 60 * 60 * 24);
}
function hourNumber(from, to) {
	return Math.abs(to.getTime() - from.getTime()) / (1e3 * 60 * 60);
}
var tickFrequencies = {
	years: {
		getTickNumber: yearNumber,
		isTick: (prev, value) => value.getFullYear() !== prev.getFullYear(),
		format: (d) => d.getFullYear().toString()
	},
	quarterly: {
		getTickNumber: (from, to) => Math.floor(monthNumber(from, to) / 3),
		isTick: (prev, value) => value.getMonth() !== prev.getMonth() && value.getMonth() % 3 === 0,
		format: new Intl.DateTimeFormat("default", { month: "short" }).format
	},
	months: {
		getTickNumber: monthNumber,
		isTick: (prev, value) => value.getMonth() !== prev.getMonth(),
		format: new Intl.DateTimeFormat("default", { month: "short" }).format
	},
	biweekly: {
		getTickNumber: (from, to) => dayNumber(from, to) / 14,
		isTick: (prev, value) => (value.getDay() < prev.getDay() || dayNumber(value, prev) > 7) && Math.floor(value.getDate() / 7) % 2 === 1,
		format: new Intl.DateTimeFormat("default", { day: "numeric" }).format
	},
	weeks: {
		getTickNumber: (from, to) => dayNumber(from, to) / 7,
		isTick: (prev, value) => value.getDay() < prev.getDay() || dayNumber(value, prev) >= 7,
		format: new Intl.DateTimeFormat("default", { day: "numeric" }).format
	},
	days: {
		getTickNumber: dayNumber,
		isTick: (prev, value) => value.getDate() !== prev.getDate(),
		format: new Intl.DateTimeFormat("default", { day: "numeric" }).format
	},
	hours: {
		getTickNumber: hourNumber,
		isTick: (prev, value) => value.getHours() !== prev.getHours(),
		format: new Intl.DateTimeFormat("default", {
			hour: "2-digit",
			minute: "2-digit"
		}).format
	}
};
//#endregion
//#region node_modules/@mui/x-charts/hooks/useTicks.mjs
var offsetRatio$1 = {
	start: 0,
	extremities: 0,
	end: 1,
	middle: .5
};
function getTickPosition(scale, value, placement) {
	return scale(value) - (scale.step() - scale.bandwidth()) / 2 + offsetRatio$1[placement] * scale.step();
}
/**
* Returns a new domain where each tick is at least {@link tickSpacing}px from the next one.
* Assumes tick spacing is greater than 0.
* @param domain Domain of the scale.
* @param range Range of the scale.
* @param tickSpacing Spacing in pixels.
*/
function applyTickSpacing(domain, range, tickSpacing) {
	const rangeSpan = Math.abs(range[1] - range[0]);
	const every = Math.ceil(domain.length / (rangeSpan / tickSpacing));
	if (Number.isNaN(every) || every <= 1) return domain;
	return domain.filter((_, index) => index % every === 0);
}
function getTimeTicks(domain, tickNumber, ticksFrequencies, scale, isInside) {
	if (ticksFrequencies.length === 0) return [];
	const isReversed = scale.range()[0] > scale.range()[1];
	const startIndex = domain.findIndex((value) => {
		return isInside(getTickPosition(scale, value, isReversed ? "start" : "end"));
	});
	const endIndex = domain.findLastIndex((value) => isInside(getTickPosition(scale, value, isReversed ? "end" : "start")));
	const start = domain[0];
	const end = domain[domain.length - 1];
	if (!(start instanceof Date) || !(end instanceof Date)) return [];
	let startFrequencyIndex = 0;
	for (let i = 0; i < ticksFrequencies.length; i += 1) if (ticksFrequencies[i].getTickNumber(start, end) !== 0) {
		startFrequencyIndex = i;
		break;
	}
	let endFrequencyIndex = startFrequencyIndex;
	for (let i = startFrequencyIndex; i < ticksFrequencies.length; i += 1) {
		if (i === ticksFrequencies.length - 1) {
			endFrequencyIndex = i;
			break;
		}
		const prevTickCount = ticksFrequencies[i].getTickNumber(start, end);
		const nextTickCount = ticksFrequencies[i + 1].getTickNumber(start, end);
		if (nextTickCount > tickNumber || tickNumber / prevTickCount < nextTickCount / tickNumber) {
			endFrequencyIndex = i;
			break;
		}
	}
	const ticks = [];
	for (let tickIndex = Math.max(1, startIndex); tickIndex <= endIndex; tickIndex += 1) for (let i = startFrequencyIndex; i <= endFrequencyIndex; i += 1) {
		const prevDate = domain[tickIndex - 1];
		const currentDate = domain[tickIndex];
		if (prevDate instanceof Date && currentDate instanceof Date && ticksFrequencies[i].isTick(prevDate, currentDate)) {
			ticks.push({
				index: tickIndex,
				formatter: ticksFrequencies[i].format
			});
			break;
		}
	}
	return ticks;
}
function getTicks(options) {
	const { scale, tickNumber, valueFormatter, tickInterval, tickPlacement: tickPlacementProp, tickLabelPlacement: tickLabelPlacementProp, tickSpacing, isInside, ordinalTimeTicks } = options;
	if (ordinalTimeTicks !== void 0 && isDateData(scale.domain()) && isOrdinalScale(scale)) {
		const domain = scale.domain();
		if (domain.length === 0 || domain.length === 1) return [];
		const tickPlacement = "middle";
		return getTimeTicks(domain, tickNumber, ordinalTimeTicks.map((tickDef) => typeof tickDef === "string" ? tickFrequencies[tickDef] : tickDef), scale, isInside).map(({ index, formatter }) => {
			const value = domain[index];
			return {
				value,
				formattedValue: formatter(value),
				offset: getTickPosition(scale, value, tickPlacement),
				labelOffset: 0
			};
		});
	}
	const tickPlacement = tickPlacementProp ?? "extremities";
	if (isOrdinalScale(scale)) {
		const domain = scale.domain();
		const tickLabelPlacement = tickLabelPlacementProp ?? "middle";
		let filteredDomain = domain;
		if (typeof tickInterval === "object" && tickInterval != null) filteredDomain = tickInterval;
		else {
			if (typeof tickInterval === "function") filteredDomain = filteredDomain.filter(tickInterval);
			if (tickSpacing !== void 0 && tickSpacing > 0) filteredDomain = applyTickSpacing(filteredDomain, scale.range(), tickSpacing);
		}
		if (filteredDomain.length === 0) return [];
		if (scale.bandwidth() > 0) {
			const isReversed = scale.range()[0] > scale.range()[1];
			const startIndex = filteredDomain.findIndex((value) => {
				return isInside(getTickPosition(scale, value, isReversed ? "start" : "end"));
			});
			const endIndex = filteredDomain.findLastIndex((value) => isInside(getTickPosition(scale, value, isReversed ? "end" : "start")));
			return [...filteredDomain.slice(startIndex, endIndex + 1).map((value) => {
				const defaultTickLabel = `${value}`;
				return {
					value,
					formattedValue: valueFormatter?.(value, {
						location: "tick",
						scale,
						tickNumber,
						defaultTickLabel
					}) ?? defaultTickLabel,
					offset: getTickPosition(scale, value, tickPlacement),
					labelOffset: tickLabelPlacement === "tick" ? 0 : scale.step() * (offsetRatio$1[tickLabelPlacement] - offsetRatio$1[tickPlacement])
				};
			}), ...tickPlacement === "extremities" && endIndex === domain.length - 1 && isInside(scale.range()[1]) ? [{
				formattedValue: void 0,
				offset: scale.range()[1],
				labelOffset: 0
			}] : []];
		}
		return filteredDomain.map((value) => {
			const defaultTickLabel = `${value}`;
			return {
				value,
				formattedValue: valueFormatter?.(value, {
					location: "tick",
					scale,
					tickNumber,
					defaultTickLabel
				}) ?? defaultTickLabel,
				offset: scale(value),
				labelOffset: 0
			};
		});
	}
	if (scale.domain().some(isInfinity)) return [];
	const tickLabelPlacement = tickLabelPlacementProp;
	const ticks = typeof tickInterval === "object" ? tickInterval : getDefaultTicks(scale, tickNumber);
	const visibleTicks = [];
	for (let i = 0; i < ticks.length; i += 1) {
		const value = ticks[i];
		const offset = scale(value);
		if (isInside(offset)) {
			const defaultTickLabel = scale.tickFormat(tickNumber)(value);
			visibleTicks.push({
				value,
				formattedValue: valueFormatter?.(value, {
					location: "tick",
					scale,
					tickNumber,
					defaultTickLabel
				}) ?? defaultTickLabel,
				offset,
				labelOffset: tickLabelPlacement === "middle" ? scale(ticks[i - 1] ?? 0) - (offset + scale(ticks[i - 1] ?? 0)) / 2 : 0
			});
		}
	}
	return visibleTicks;
}
function getDefaultTicks(scale, tickNumber) {
	const domain = scale.domain();
	if (domain[0] === domain[1]) return [domain[0]];
	return scale.ticks(tickNumber);
}
var alwaysTrue = () => true;
var isInsideRotation = (scale) => (rotation) => Math.abs(scale.range()[0] - rotation) < Math.PI * 2 - EPSILON;
function getIsInside(scale, direction, instance) {
	switch (direction) {
		case "rotation": return isInsideRotation(scale);
		case "radius": return (radiusOffset) => radiusOffset >= 1;
		case "x": return instance.isXInside;
		case "y": return instance.isYInside;
		default: return alwaysTrue;
	}
}
function useTicks(options) {
	const { scale, tickNumber, valueFormatter, tickInterval, tickPlacement = "extremities", tickLabelPlacement, tickSpacing, direction, ordinalTimeTicks } = options;
	const { instance } = useChartsContext();
	return import_react.useMemo(() => getTicks({
		scale,
		tickNumber,
		tickPlacement,
		tickInterval,
		tickLabelPlacement,
		tickSpacing,
		valueFormatter,
		isInside: getIsInside(scale, direction, instance),
		ordinalTimeTicks
	}), [
		scale,
		tickNumber,
		tickPlacement,
		tickInterval,
		tickLabelPlacement,
		tickSpacing,
		valueFormatter,
		direction,
		instance,
		ordinalTimeTicks
	]);
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/barClasses.mjs
function getBarUtilityClass(slot) {
	return generateUtilityClass("MuiBarChart", slot);
}
var barClasses = generateUtilityClasses("MuiBarChart", [
	"root",
	"series",
	"seriesLabels",
	"element",
	"label",
	"labelAnimate"
]);
var useUtilityClasses$3 = (options) => {
	const { skipAnimation, classes } = options ?? {};
	return composeClasses({
		root: ["root"],
		series: ["series"],
		seriesLabels: ["seriesLabels"],
		element: ["element"],
		label: ["label", !skipAnimation && "labelAnimate"]
	}, getBarUtilityClass, classes);
};
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarLabel/getBarLabel.mjs
function getBarLabel(options) {
	const { barLabel, value, dataIndex, seriesId, height, width } = options;
	if (barLabel === "value") return value ? value?.toString() : null;
	return barLabel({
		seriesId,
		dataIndex,
		value
	}, { bar: {
		height,
		width
	} });
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarLabel/BarLabel.mjs
var _excluded$14 = [
	"seriesId",
	"dataIndex",
	"color",
	"isFaded",
	"isHighlighted",
	"classes",
	"skipAnimation",
	"layout",
	"xOrigin",
	"yOrigin",
	"placement",
	"hidden"
];
var BarLabelComponent = styled("text", {
	name: "MuiBarLabel",
	slot: "Root"
})(({ theme }) => _extends({}, theme?.typography?.body2, {
	stroke: "none",
	fill: (theme.vars || theme)?.palette?.text?.primary,
	transitionProperty: "opacity, fill",
	transitionDuration: `300ms`,
	transitionTimingFunction: ANIMATION_TIMING_FUNCTION,
	pointerEvents: "none"
}));
function BarLabel(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiBarLabel"
	});
	const { isFaded, hidden } = props, otherProps = _objectWithoutPropertiesLoose(props, _excluded$14);
	const animatedProps = useAnimateBarLabel(props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarLabelComponent, _extends({
		textAnchor: getTextAnchor(props),
		dominantBaseline: getDominantBaseline(props),
		opacity: hidden ? 0 : isFaded ? .3 : 1
	}, otherProps, animatedProps));
}
function getTextAnchor({ placement, layout, xOrigin, x }) {
	if (placement === "outside") {
		if (layout === "horizontal") return x < xOrigin ? "end" : "start";
		return "middle";
	}
	return "middle";
}
function getDominantBaseline({ placement, layout, yOrigin, y }) {
	if (placement === "outside") {
		if (layout === "horizontal") return "central";
		return y < yOrigin ? "auto" : "hanging";
	}
	return "central";
}
BarLabel.propTypes = {
	classes: import_prop_types.default.object,
	dataIndex: import_prop_types.default.number.isRequired,
	/**
	* Height of the bar this label belongs to.
	*/
	height: import_prop_types.default.number.isRequired,
	/**
	* If true, the bar label is hidden.
	*/
	hidden: import_prop_types.default.bool,
	isFaded: import_prop_types.default.bool.isRequired,
	isHighlighted: import_prop_types.default.bool.isRequired,
	layout: import_prop_types.default.oneOf(["horizontal", "vertical"]).isRequired,
	/**
	* The placement of the bar label.
	* It controls whether the label is rendered in the center or outside the bar.
	* @default 'center'
	*/
	placement: import_prop_types.default.oneOf(["center", "outside"]),
	seriesId: import_prop_types.default.string.isRequired,
	skipAnimation: import_prop_types.default.bool.isRequired,
	/**
	* Width of the bar this label belongs to.
	*/
	width: import_prop_types.default.number.isRequired,
	/**
	* Position in the x-axis of the bar this label belongs to.
	*/
	x: import_prop_types.default.number.isRequired,
	/**
	* The x-coordinate of the stack this bar label belongs to.
	*/
	xOrigin: import_prop_types.default.number.isRequired,
	/**
	* Position in the y-axis of the bar this label belongs to.
	*/
	y: import_prop_types.default.number.isRequired,
	/**
	* The y-coordinate of the stack this bar label belongs to.
	*/
	yOrigin: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarLabel/BarLabelItem.mjs
var _excluded$13 = [
	"seriesId",
	"classes",
	"color",
	"dataIndex",
	"barLabel",
	"slots",
	"slotProps",
	"xOrigin",
	"yOrigin",
	"x",
	"y",
	"width",
	"height",
	"value",
	"skipAnimation",
	"layout",
	"barLabelPlacement",
	"hidden"
], _excluded2$4 = ["ownerState"];
/**
* @ignore - internal component.
*/
function BarLabelItem(props) {
	const { seriesId, classes: innerClasses, color, dataIndex, barLabel, slots, slotProps, xOrigin, yOrigin, x, y, width, height, value, skipAnimation, layout, barLabelPlacement, hidden } = props, other = _objectWithoutPropertiesLoose(props, _excluded$13);
	const highlightState = useItemHighlightState({
		type: "bar",
		seriesId,
		dataIndex
	});
	const isHighlighted = highlightState === "highlighted";
	const isFaded = highlightState === "faded";
	const ownerState = {
		seriesId,
		classes: innerClasses,
		color,
		isFaded,
		isHighlighted,
		dataIndex,
		skipAnimation,
		layout
	};
	const classes = useUtilityClasses$3(ownerState);
	const Component = slots?.barLabel ?? BarLabel;
	const _useSlotProps = useSlotProps({
		elementType: Component,
		externalSlotProps: slotProps?.barLabel,
		additionalProps: _extends({}, other, {
			xOrigin,
			yOrigin,
			x,
			y,
			width,
			height,
			placement: barLabelPlacement,
			className: classes.label,
			"data-highlighted": isHighlighted || void 0,
			"data-faded": isFaded || void 0
		}),
		ownerState
	}), { ownerState: barLabelOwnerState } = _useSlotProps, barLabelProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded2$4);
	if (!barLabel) return null;
	const formattedLabelText = getBarLabel({
		barLabel,
		value,
		dataIndex,
		seriesId,
		height,
		width
	});
	if (!formattedLabelText) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, _extends({}, barLabelProps, barLabelOwnerState, {
		hidden,
		children: formattedLabelText
	}));
}
BarLabelItem.propTypes = {
	/**
	* If provided, the function will be used to format the label of the bar.
	* It can be set to 'value' to display the current value.
	* @param {BarItem} item The item to format.
	* @param {BarLabelContext} context data about the bar.
	* @returns {string} The formatted label.
	*/
	barLabel: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["value"]), import_prop_types.default.func]),
	classes: import_prop_types.default.object,
	color: import_prop_types.default.string.isRequired,
	dataIndex: import_prop_types.default.number.isRequired,
	/**
	* The height of the bar.
	*/
	height: import_prop_types.default.number.isRequired,
	seriesId: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]).isRequired,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	/**
	* The value of the data point.
	*/
	value: import_prop_types.default.number,
	/**
	* The width of the bar.
	*/
	width: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarLabel/BarLabelPlot.mjs
var _excluded$12 = [
	"processedSeries",
	"className",
	"skipAnimation"
];
/**
* @ignore - internal component.
*/
function BarLabelPlot(props) {
	const { processedSeries, className, skipAnimation } = props, other = _objectWithoutPropertiesLoose(props, _excluded$12);
	const { seriesId, data, layout, xOrigin, yOrigin } = processedSeries;
	if (!processedSeries.barLabel) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		className,
		"data-series": seriesId,
		children: data.map(({ x, y, dataIndex, color, value, width, height, hidden }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarLabelItem, _extends({
			seriesId,
			dataIndex,
			value,
			color,
			xOrigin,
			yOrigin,
			x,
			y,
			width,
			height,
			skipAnimation: skipAnimation ?? false,
			layout: layout ?? "vertical",
			hidden
		}, other, {
			barLabel: processedSeries.barLabel,
			barLabelPlacement: processedSeries.barLabelPlacement || "center"
		}), dataIndex))
	}, seriesId);
}
//#endregion
//#region node_modules/@mui/x-charts/internals/plugins/featurePlugins/useChartCartesianAxis/useInternalIsZoomInteracting.mjs
/**
* Check if the zoom is interacting.
*
* This should probably be moved/merged to the AnimationContext when we move it to the new API.
*
* @ignore Internal hook, similar to the PRO one.
*
* @returns {boolean} Inform the zoom is interacting.
*/
function useInternalIsZoomInteracting() {
	return useStore().use(selectorChartZoomIsInteracting);
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/checkBarChartScaleErrors.mjs
var getAxisMessage = (axisDirection, axisId) => {
	const axisName = `${axisDirection}-axis`;
	const axisIdName = `${axisDirection}Axis`;
	return axisId === (axisDirection === "x" ? "DEFAULT_X_AXIS_KEY" : "DEFAULT_Y_AXIS_KEY") ? `The first \`${axisIdName}\`` : `The ${axisName} with id "${axisId}"`;
};
function checkBarChartScaleErrors(verticalLayout, seriesId, seriesDataLength, xAxisId, xAxis, yAxisId, yAxis) {
	const xAxisConfig = xAxis[xAxisId];
	const yAxisConfig = yAxis[yAxisId];
	const discreteAxisConfig = verticalLayout ? xAxisConfig : yAxisConfig;
	const continuousAxisConfig = verticalLayout ? yAxisConfig : xAxisConfig;
	const discreteAxisId = verticalLayout ? xAxisId : yAxisId;
	const continuousAxisId = verticalLayout ? yAxisId : xAxisId;
	const discreteAxisDirection = verticalLayout ? "x" : "y";
	const continuousAxisDirection = verticalLayout ? "y" : "x";
	if (discreteAxisConfig.scaleType !== "band") throw new Error(`MUI X Charts: ${getAxisMessage(discreteAxisDirection, discreteAxisId)} should be of type "band" to display the bar series of id "${seriesId}". Bar charts require a band scale for the category axis to properly position and size the bars. Set the scaleType to "band" for this axis.`);
	if (discreteAxisConfig.data === void 0) throw new Error(`MUI X Charts: ${getAxisMessage(discreteAxisDirection, discreteAxisId)} should have a data property. The axis needs data to define the categories for the bar chart. Provide a data array to the axis configuration.`);
	if (continuousAxisConfig.scaleType === "band" || continuousAxisConfig.scaleType === "point") throw new Error(`MUI X Charts: ${getAxisMessage(continuousAxisDirection, continuousAxisId)} should be a continuous type to display the bar series of id "${seriesId}". Bar charts require a continuous scale (like "linear" or "log") for the value axis. Change the scaleType to a continuous type such as "linear".`);
	if (discreteAxisConfig.data.length < seriesDataLength) warnOnce([`MUI X Charts: ${getAxisMessage(discreteAxisDirection, discreteAxisId)} has less data (${discreteAxisConfig.data.length} values) than the bar series of id "${seriesId}" (${seriesDataLength} values).`, "The axis data should have at least the same length than the series using it."], "error");
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/useBarPlotData.mjs
function useBarPlotData(drawingArea, xAxes, yAxes) {
	const seriesData = useBarSeriesContext() ?? {
		series: {},
		stackingGroups: [],
		seriesOrder: []
	};
	const defaultXAxisId = useXAxes().xAxisIds[0];
	const defaultYAxisId = useYAxes().yAxisIds[0];
	return processBarDataForPlot(drawingArea, useChartId(), seriesData.stackingGroups, seriesData.series, xAxes, yAxes, defaultXAxisId, defaultYAxisId);
}
function processBarDataForPlot(drawingArea, chartId, stackingGroups, series, xAxes, yAxes, defaultXAxisId, defaultYAxisId) {
	const masks = {};
	return {
		completedData: stackingGroups.flatMap(({ ids: seriesIds }, groupIndex) => {
			const xMin = drawingArea.left;
			const xMax = drawingArea.left + drawingArea.width;
			const yMin = drawingArea.top;
			const yMax = drawingArea.top + drawingArea.height;
			const lastNegativePerIndex = /* @__PURE__ */ new Map();
			const lastPositivePerIndex = /* @__PURE__ */ new Map();
			return seriesIds.map((seriesId) => {
				const xAxisId = series[seriesId].xAxisId ?? defaultXAxisId;
				const yAxisId = series[seriesId].yAxisId ?? defaultYAxisId;
				const layout = series[seriesId].layout;
				const xAxisConfig = xAxes[xAxisId];
				const yAxisConfig = yAxes[yAxisId];
				const verticalLayout = series[seriesId].layout === "vertical";
				const reverse = (verticalLayout ? yAxisConfig.reverse : xAxisConfig.reverse) ?? false;
				checkBarChartScaleErrors(verticalLayout, seriesId, series[seriesId].stackedData.length, xAxisId, xAxes, yAxisId, yAxes);
				const baseScaleConfig = verticalLayout ? xAxisConfig : yAxisConfig;
				const xScale = xAxisConfig.scale;
				const yScale = yAxisConfig.scale;
				const xOrigin = Math.round(xScale(0) ?? 0);
				const yOrigin = Math.round(yScale(0) ?? 0);
				const colorGetter = getColor(series[seriesId], xAxes[xAxisId], yAxes[yAxisId]);
				const seriesDataPoints = [];
				const getBarDimensions = createGetBarDimensions({
					verticalLayout,
					xAxisConfig,
					yAxisConfig,
					series: series[seriesId],
					numberOfGroups: stackingGroups.length
				});
				for (let dataIndex = 0; dataIndex < baseScaleConfig.data.length; dataIndex += 1) {
					const barDimensions = getBarDimensions(dataIndex, groupIndex);
					if (barDimensions == null) continue;
					const stackId = series[seriesId].stack;
					const result = _extends({
						seriesId,
						dataIndex,
						hidden: series[seriesId].hidden
					}, barDimensions, {
						color: colorGetter(dataIndex),
						value: series[seriesId].data[dataIndex],
						maskId: `${chartId}_${stackId || seriesId}_${groupIndex}_${dataIndex}`
					});
					if (result.x > xMax || result.x + result.width < xMin || result.y > yMax || result.y + result.height < yMin) continue;
					const lastNegative = lastNegativePerIndex.get(dataIndex);
					const lastPositive = lastPositivePerIndex.get(dataIndex);
					const sign = (reverse ? -1 : 1) * Math.sign(result.value ?? 0);
					if (sign > 0) {
						if (lastPositive) delete lastPositive.borderRadiusSide;
						result.borderRadiusSide = verticalLayout ? "top" : "right";
						lastPositivePerIndex.set(dataIndex, result);
					} else if (sign < 0) {
						if (lastNegative) delete lastNegative.borderRadiusSide;
						result.borderRadiusSide = verticalLayout ? "bottom" : "left";
						lastNegativePerIndex.set(dataIndex, result);
					}
					if (!masks[result.maskId]) masks[result.maskId] = {
						id: result.maskId,
						width: 0,
						height: 0,
						hasNegative: false,
						hasPositive: false,
						layout,
						xOrigin,
						yOrigin,
						x: 0,
						y: 0
					};
					const mask = masks[result.maskId];
					mask.width = layout === "vertical" ? result.width : mask.width + result.width;
					mask.height = layout === "vertical" ? mask.height + result.height : result.height;
					mask.x = Math.min(mask.x === 0 ? Infinity : mask.x, result.x);
					mask.y = Math.min(mask.y === 0 ? Infinity : mask.y, result.y);
					const value = result.value ?? 0;
					mask.hasNegative = mask.hasNegative || (reverse ? value > 0 : value < 0);
					mask.hasPositive = mask.hasPositive || (reverse ? value < 0 : value > 0);
					seriesDataPoints.push(result);
				}
				return {
					seriesId,
					barLabel: series[seriesId].barLabel,
					barLabelPlacement: series[seriesId].barLabelPlacement,
					data: seriesDataPoints,
					layout,
					xOrigin,
					yOrigin
				};
			});
		}),
		masksData: Object.values(masks)
	};
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/AnimatedBarElement.mjs
var _excluded$11 = [
	"ownerState",
	"skipAnimation",
	"seriesId",
	"dataIndex",
	"xOrigin",
	"yOrigin"
];
function AnimatedBarElement(props) {
	const { ownerState } = props, other = _objectWithoutPropertiesLoose(props, _excluded$11);
	const animatedProps = useAnimateBar(props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", _extends({}, other, {
		filter: ownerState.isHighlighted ? "brightness(120%)" : void 0,
		opacity: ownerState.isFaded ? .3 : 1,
		"data-highlighted": ownerState.isHighlighted || void 0,
		"data-faded": ownerState.isFaded || void 0
	}, animatedProps));
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/useIsItemFocused.mjs
/**
* A hook to check if an item has the focus.
*
* If you need to process multiple points, use the `useIsItemFocusedGetter` hook instead.
*
* @param {FocusedItemIdentifier} item is the item to check
* @returns {boolean} the focus state
*/
function useIsItemFocused(item) {
	return useStore().use(selectorChartsItemIsFocused, item);
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarElement.mjs
var _excluded$10 = [
	"seriesId",
	"dataIndex",
	"classes",
	"color",
	"slots",
	"slotProps",
	"style",
	"onClick",
	"skipAnimation",
	"layout",
	"x",
	"xOrigin",
	"y",
	"yOrigin",
	"width",
	"height",
	"hidden"
];
function BarElement(props) {
	const { seriesId, dataIndex, classes: innerClasses, color, slots, slotProps, style, onClick, skipAnimation, layout, x, xOrigin, y, yOrigin, width, height, hidden } = props, other = _objectWithoutPropertiesLoose(props, _excluded$10);
	const itemIdentifier = import_react.useMemo(() => ({
		type: "bar",
		seriesId,
		dataIndex
	}), [seriesId, dataIndex]);
	const highlightState = useItemHighlightState(itemIdentifier);
	const ownerState = {
		seriesId,
		dataIndex,
		classes: innerClasses,
		color,
		isFaded: highlightState === "faded",
		isHighlighted: highlightState === "highlighted",
		isFocused: useIsItemFocused(itemIdentifier)
	};
	const classes = useUtilityClasses$3(ownerState);
	const Bar = slots?.bar ?? AnimatedBarElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, _extends({}, useSlotProps({
		elementType: Bar,
		externalSlotProps: slotProps?.bar,
		externalForwardedProps: other,
		additionalProps: {
			seriesId,
			dataIndex,
			color,
			x,
			xOrigin,
			y,
			yOrigin,
			width,
			height,
			style,
			onClick,
			cursor: onClick ? "pointer" : void 0,
			stroke: "none",
			fill: color,
			skipAnimation,
			layout,
			hidden
		},
		className: classes.element,
		ownerState
	})));
}
BarElement.propTypes = {
	classes: import_prop_types.default.object,
	dataIndex: import_prop_types.default.number.isRequired,
	layout: import_prop_types.default.oneOf(["horizontal", "vertical"]).isRequired,
	seriesId: import_prop_types.default.string.isRequired,
	skipAnimation: import_prop_types.default.bool.isRequired,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	xOrigin: import_prop_types.default.number.isRequired,
	yOrigin: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarClipPath.mjs
function barClipPathPropsInterpolator(from, to) {
	const interpolateX = number_default(from.x, to.x);
	const interpolateY = number_default(from.y, to.y);
	const interpolateWidth = number_default(from.width, to.width);
	const interpolateHeight = number_default(from.height, to.height);
	const interpolateBorderRadius = number_default(from.borderRadius, to.borderRadius);
	return (t) => {
		return {
			x: interpolateX(t),
			y: interpolateY(t),
			width: interpolateWidth(t),
			height: interpolateHeight(t),
			borderRadius: interpolateBorderRadius(t)
		};
	};
}
function useAnimateBarClipPath(props) {
	const initialProps = {
		x: props.layout === "vertical" ? props.x : props.xOrigin,
		y: props.layout === "vertical" ? props.yOrigin : props.y,
		width: props.layout === "vertical" ? props.width : 0,
		height: props.layout === "vertical" ? 0 : props.height,
		borderRadius: props.borderRadius
	};
	return useAnimate({
		x: props.x,
		y: props.y,
		width: props.width,
		height: props.height,
		borderRadius: props.borderRadius
	}, {
		createInterpolator: barClipPathPropsInterpolator,
		transformProps: (p) => ({ d: generateClipPath(props.hasNegative, props.hasPositive, props.layout, p.x, p.y, p.width, p.height, props.xOrigin, props.yOrigin, p.borderRadius) }),
		applyProps(element, { d }) {
			if (d) element.setAttribute("d", d);
		},
		initialProps,
		skip: props.skipAnimation,
		ref: props.ref
	});
}
/**
* @ignore - internal component.
*/
function BarClipPath(props) {
	const { maskId, x, y, width, height, skipAnimation } = props;
	const { ref, d } = useAnimateBarClipPath({
		layout: props.layout ?? "vertical",
		hasNegative: props.hasNegative,
		hasPositive: props.hasPositive,
		xOrigin: props.xOrigin,
		yOrigin: props.yOrigin,
		x,
		y,
		width,
		height,
		borderRadius: props.borderRadius ?? 0,
		skipAnimation
	});
	if (!props.borderRadius || props.borderRadius <= 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
		id: maskId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			ref,
			d
		})
	});
}
function generateClipPath(hasNegative, hasPositive, layout, x, y, width, height, xOrigin, yOrigin, borderRadius) {
	if (layout === "vertical") {
		if (hasPositive && hasNegative) {
			const bR = Math.min(borderRadius, width / 2, height / 2);
			return `M${x},${y + height / 2} v${-(height / 2 - bR)} a${bR},${bR} 0 0 1 ${bR},${-bR} h${width - bR * 2} a${bR},${bR} 0 0 1 ${bR},${bR} v${height - 2 * bR} a${bR},${bR} 0 0 1 ${-bR},${bR} h${-(width - bR * 2)} a${bR},${bR} 0 0 1 ${-bR},${-bR} v${-(height / 2 - bR)}`;
		}
		const bR = Math.min(borderRadius, width / 2);
		if (hasPositive) return `M${x},${Math.max(yOrigin, y + bR)} v${Math.min(0, -(yOrigin - y - bR))} a${bR},${bR} 0 0 1 ${bR},${-bR} h${width - bR * 2} a${bR},${bR} 0 0 1 ${bR},${bR} v${Math.max(0, yOrigin - y - bR)} Z`;
		if (hasNegative) return `M${x},${Math.min(yOrigin, y + height - bR)} v${Math.max(0, height - bR)} a${bR},${bR} 0 0 0 ${bR},${bR} h${width - bR * 2} a${bR},${bR} 0 0 0 ${bR},${-bR} v${-Math.max(0, height - bR)} Z`;
	}
	if (layout === "horizontal") {
		if (hasPositive && hasNegative) {
			const bR = Math.min(borderRadius, width / 2, height / 2);
			return `M${x + width / 2},${y} h${width / 2 - bR} a${bR},${bR} 0 0 1 ${bR},${bR} v${height - bR * 2} a${bR},${bR} 0 0 1 ${-bR},${bR} h${-(width - 2 * bR)} a${bR},${bR} 0 0 1 ${-bR},${-bR} v${-(height - bR * 2)} a${bR},${bR} 0 0 1 ${bR},${-bR} h${width / 2 - bR}`;
		}
		const bR = Math.min(borderRadius, height / 2);
		if (hasPositive) return `M${Math.min(xOrigin, x - bR)},${y} h${width} a${bR},${bR} 0 0 1 ${bR},${bR} v${height - bR * 2} a${bR},${bR} 0 0 1 ${-bR},${bR} h${-width} Z`;
		if (hasNegative) return `M${Math.max(xOrigin, x + width + bR)},${y} h${-width} a${bR},${bR} 0 0 0 ${-bR},${bR} v${height - bR * 2} a${bR},${bR} 0 0 0 ${bR},${bR} h${width} Z`;
	}
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/useRegisterItemClickHandlers.mjs
/**
* Hook that registers pointer event handlers for chart item clicking.
* @param onItemClick Callback for item click events.
*/
function useRegisterItemClickHandlers(onItemClick) {
	const { instance } = useChartsContext();
	const chartsLayerContainerRef = useChartsLayerContainerRef();
	const store = useStore();
	import_react.useEffect(() => {
		const element = chartsLayerContainerRef.current;
		if (!element || !onItemClick) return;
		let lastPointerUp = null;
		const onClick = function onClick(event) {
			let point = event;
			if (lastPointerUp) {
				if (Math.abs(event.clientX - lastPointerUp.clientX) <= 1 && Math.abs(event.clientY - lastPointerUp.clientY) <= 1) point = {
					clientX: lastPointerUp.clientX,
					clientY: lastPointerUp.clientY
				};
			}
			lastPointerUp = null;
			const svgPoint = getChartPoint(element, point);
			if (!instance.isPointInside(svgPoint.x, svgPoint.y)) return;
			const item = selectorBarItemAtPosition(store.state, svgPoint);
			if (item) onItemClick(event, {
				type: "bar",
				seriesId: item.seriesId,
				dataIndex: item.dataIndex
			});
		};
		const onPointerUp = function onPointerUp(event) {
			lastPointerUp = event;
		};
		element.addEventListener("click", onClick);
		element.addEventListener("pointerup", onPointerUp);
		return () => {
			element.removeEventListener("click", onClick);
			element.removeEventListener("pointerup", onPointerUp);
		};
	}, [
		instance,
		onItemClick,
		store,
		chartsLayerContainerRef
	]);
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/IndividualBarPlot.mjs
var _excluded$9 = [
	"completedData",
	"masksData",
	"borderRadius",
	"onItemClick",
	"skipAnimation"
];
function IndividualBarPlot(_ref) {
	let { completedData, masksData, borderRadius, onItemClick, skipAnimation } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$9);
	useRegisterItemClickHandlers(onItemClick);
	const classes = useUtilityClasses$3();
	const withoutBorderRadius = !borderRadius || borderRadius <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [!withoutBorderRadius && masksData.map(({ id, x, y, xOrigin, yOrigin, width, height, hasPositive, hasNegative, layout }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarClipPath, {
			maskId: id,
			borderRadius,
			hasNegative,
			hasPositive,
			layout,
			x,
			y,
			xOrigin,
			yOrigin,
			width,
			height,
			skipAnimation: skipAnimation ?? false
		}, id);
	}), completedData.map(({ seriesId, layout, xOrigin, yOrigin, data }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			"data-series": seriesId,
			className: classes.series,
			children: data.map(({ dataIndex, color, maskId, x, y, width, height }) => {
				const barElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarElement, _extends({
					seriesId,
					dataIndex,
					color,
					skipAnimation: skipAnimation ?? false,
					layout: layout ?? "vertical",
					x,
					xOrigin,
					y,
					yOrigin,
					width,
					height,
					cursor: onItemClick ? "pointer" : void 0
				}, other), dataIndex);
				if (withoutBorderRadius) return barElement;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					clipPath: `url(#${maskId})`,
					children: barElement
				}, dataIndex);
			})
		}, seriesId);
	})] });
}
//#endregion
//#region node_modules/@mui/x-charts/internals/appendAtKey.mjs
/**
* Given a map of arrays, appends a value to the array at the given key.
* If no array exists at that key, one is created and the value appended.
* @param map Map of arrays
* @param key Key to append the value at
* @param value Value to append
*/
function appendAtKey(map, key, value) {
	let bucket = map.get(key);
	if (!bucket) {
		bucket = [value];
		map.set(key, bucket);
	} else bucket.push(value);
	return bucket;
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BatchBarPlot/useCreateBarPaths.mjs
var MAX_POINTS_PER_PATH = 1e3;
function generateBarPath(x, y, width, height, topLeftBorderRadius, topRightBorderRadius, bottomRightBorderRadius, bottomLeftBorderRadius) {
	const tLBR = Math.min(topLeftBorderRadius, width / 2, height / 2);
	const tRBR = Math.min(topRightBorderRadius, width / 2, height / 2);
	const bRBR = Math.min(bottomRightBorderRadius, width / 2, height / 2);
	const bLBR = Math.min(bottomLeftBorderRadius, width / 2, height / 2);
	return `M${x + tLBR},${y}
   h${width - tLBR - tRBR}
   a${tRBR},${tRBR} 0 0 1 ${tRBR},${tRBR}
   v${height - tRBR - bRBR}
   a${bRBR},${bRBR} 0 0 1 -${bRBR},${bRBR}
   h-${width - bRBR - bLBR}
   a${bLBR},${bLBR} 0 0 1 -${bLBR},-${bLBR}
   v-${height - bLBR - tLBR}
   a${tLBR},${tLBR} 0 0 1 ${tLBR},-${tLBR}
   Z`;
}
function createPath(barData, borderRadius) {
	return generateBarPath(barData.x, barData.y, barData.width, barData.height, barData.borderRadiusSide === "left" || barData.borderRadiusSide === "top" ? borderRadius : 0, barData.borderRadiusSide === "right" || barData.borderRadiusSide === "top" ? borderRadius : 0, barData.borderRadiusSide === "right" || barData.borderRadiusSide === "bottom" ? borderRadius : 0, barData.borderRadiusSide === "left" || barData.borderRadiusSide === "bottom" ? borderRadius : 0);
}
/**
* Hook that creates bar paths for a given series data. Used by the batch bar renderer.
* @param seriesData
* @param borderRadius
*/
function useCreateBarPaths(seriesData, borderRadius) {
	const paths = /* @__PURE__ */ new Map();
	const temporaryPaths = /* @__PURE__ */ new Map();
	for (let j = 0; j < seriesData.data.length; j += 1) {
		const barData = seriesData.data[j];
		const pathString = createPath(barData, borderRadius);
		const tempPath = appendAtKey(temporaryPaths, barData.color, pathString);
		if (tempPath.length >= MAX_POINTS_PER_PATH) {
			appendAtKey(paths, barData.color, tempPath.join(""));
			temporaryPaths.delete(barData.color);
		}
	}
	for (const [fill, tempPath] of temporaryPaths.entries()) if (tempPath.length > 0) appendAtKey(paths, fill, tempPath.join(""));
	return paths;
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BatchBarPlot/BarGroup.mjs
var _excluded$8 = [
	"skipAnimation",
	"layout",
	"xOrigin",
	"yOrigin"
], _excluded2$3 = [
	"children",
	"layout",
	"xOrigin",
	"yOrigin"
];
var PathGroup = styled("g")({
	"&[data-faded=\"true\"]": { opacity: .3 },
	"& path": { pointerEvents: "none" }
});
function BarGroup(_ref) {
	let { skipAnimation, layout, xOrigin, yOrigin } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$8);
	if (skipAnimation) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathGroup, _extends({}, props));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedGroup, _extends({}, props, {
		layout,
		xOrigin,
		yOrigin
	}));
}
var AnimatedRect = styled("rect")({
	"@keyframes scaleInX": {
		from: { transform: "scaleX(0)" },
		to: { transform: "scaleX(1)" }
	},
	"@keyframes scaleInY": {
		from: { transform: "scaleY(0)" },
		to: { transform: "scaleY(1)" }
	},
	animationDuration: `300ms`,
	animationFillMode: "forwards",
	"&[data-orientation=\"horizontal\"]": { animationName: "scaleInX" },
	"&[data-orientation=\"vertical\"]": { animationName: "scaleInY" }
});
function AnimatedGroup(_ref2) {
	let { children, layout, xOrigin, yOrigin } = _ref2, props = _objectWithoutPropertiesLoose(_ref2, _excluded2$3);
	const drawingArea = useStore().use(selectorChartDrawingArea);
	const clipPathId = useId();
	const animateChildren = [];
	if (layout === "horizontal") {
		animateChildren.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedRect, {
			"data-orientation": "horizontal",
			x: drawingArea.left,
			width: xOrigin - drawingArea.left,
			y: drawingArea.top,
			height: drawingArea.height,
			style: { transformOrigin: `${xOrigin}px ${drawingArea.top + drawingArea.height / 2}px` }
		}, "left"));
		animateChildren.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedRect, {
			"data-orientation": "horizontal",
			x: xOrigin,
			width: drawingArea.left + drawingArea.width - xOrigin,
			y: drawingArea.top,
			height: drawingArea.height,
			style: { transformOrigin: `${xOrigin}px ${drawingArea.top + drawingArea.height / 2}px` }
		}, "right"));
	} else {
		animateChildren.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedRect, {
			"data-orientation": "vertical",
			x: drawingArea.left,
			width: drawingArea.width,
			y: drawingArea.top,
			height: yOrigin - drawingArea.top,
			style: { transformOrigin: `${drawingArea.left + drawingArea.width / 2}px ${yOrigin}px` }
		}, "top"));
		animateChildren.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedRect, {
			"data-orientation": "vertical",
			x: drawingArea.left,
			width: drawingArea.width,
			y: yOrigin,
			height: drawingArea.top + drawingArea.height - yOrigin,
			style: { transformOrigin: `${drawingArea.left + drawingArea.width / 2}px ${yOrigin}px` }
		}, "bottom"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
		id: clipPathId,
		children: animateChildren
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathGroup, _extends({ clipPath: `url(#${clipPathId})` }, props, { children }))] });
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BatchBarPlot/BatchBarPlot.mjs
function BatchBarPlot({ completedData, borderRadius = 0, onItemClick, skipAnimation = false }) {
	useRegisterItemClickHandlers(onItemClick);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: completedData.map((series) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesBatchPlot, {
		series,
		borderRadius,
		skipAnimation
	}, series.seriesId)) });
}
var MemoFadedHighlightedBars = /* @__PURE__ */ import_react.memo(FadedHighlightedBars);
MemoFadedHighlightedBars.displayName = "MemoFadedHighlightedBars";
function SeriesBatchPlot({ series, borderRadius, skipAnimation }) {
	const classes = useUtilityClasses$3();
	const { store } = useChartsContext();
	const isSeriesHighlighted = store.use(selectorChartIsSeriesHighlighted, series.seriesId);
	const isSeriesFaded = store.use(selectorChartIsSeriesFaded, series.seriesId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarGroup, {
		className: classes.series,
		"data-series": series.seriesId,
		layout: series.layout,
		xOrigin: series.xOrigin,
		yOrigin: series.yOrigin,
		skipAnimation,
		"data-faded": isSeriesFaded || void 0,
		"data-highlighted": isSeriesHighlighted || void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchBarSeriesPlot, {
			processedSeries: series,
			borderRadius
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoFadedHighlightedBars, {
		processedSeries: series,
		borderRadius
	})] });
}
function BatchBarSeriesPlot({ processedSeries, borderRadius }) {
	const paths = useCreateBarPaths(processedSeries, borderRadius);
	const children = [];
	let i = 0;
	for (const [fill, dArray] of paths.entries()) for (const d of dArray) {
		children.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill,
			d
		}, i));
		i += 1;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children });
}
function FadedHighlightedBars({ processedSeries, borderRadius }) {
	const { store } = useChartsContext();
	const seriesHighlightedDataIndex = store.use(selectorChartSeriesHighlightedItem, processedSeries.seriesId);
	const seriesUnfadedDataIndex = store.use(selectorChartSeriesUnfadedItem, processedSeries.seriesId);
	const seriesHighlightedItem = seriesHighlightedDataIndex != null ? processedSeries.data.find((v) => v.dataIndex === seriesHighlightedDataIndex) || null : null;
	const seriesUnfadedItem = seriesUnfadedDataIndex != null ? processedSeries.data.find((v) => v.dataIndex === seriesUnfadedDataIndex) || null : null;
	const siblings = [];
	if (seriesHighlightedItem != null) siblings.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: seriesHighlightedItem.color,
		filter: "brightness(120%)",
		"data-highlighted": true,
		d: createPath(seriesHighlightedItem, borderRadius)
	}, `highlighted-${processedSeries.seriesId}`));
	if (seriesUnfadedItem != null) siblings.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: seriesUnfadedItem.color,
		d: createPath(seriesUnfadedItem, borderRadius)
	}, `unfaded-${seriesUnfadedItem.seriesId}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: siblings });
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarPlot.mjs
var _excluded$7 = [
	"className",
	"skipAnimation",
	"onItemClick",
	"borderRadius",
	"renderer"
];
var BarPlotRoot = styled("g", {
	name: "MuiBarPlot",
	slot: "Root"
})({ [`& .${barClasses.element}`]: {
	transitionProperty: "opacity, fill",
	transitionDuration: `300ms`,
	transitionTimingFunction: ANIMATION_TIMING_FUNCTION
} });
/**
* Demos:
*
* - [Bars](https://mui.com/x/react-charts/bars/)
* - [Bar demonstration](https://mui.com/x/react-charts/bar-demo/)
* - [Stacking](https://mui.com/x/react-charts/stacking/)
*
* API:
*
* - [BarPlot API](https://mui.com/x/api/charts/bar-plot/)
*/
function BarPlot(props) {
	const { className, skipAnimation: inSkipAnimation, onItemClick, borderRadius, renderer } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
	const skipAnimation = useSkipAnimation(useInternalIsZoomInteracting() || inSkipAnimation);
	const batchSkipAnimation = useSkipAnimation(inSkipAnimation);
	const { xAxis: xAxes } = useXAxes();
	const { yAxis: yAxes } = useYAxes();
	const { completedData, masksData } = useBarPlotData(useDrawingArea(), xAxes, yAxes);
	const classes = useUtilityClasses$3();
	const BarElementPlot = renderer === "svg-batch" ? BatchBarPlot : IndividualBarPlot;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarPlotRoot, {
		className: clsx(classes.root, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarElementPlot, _extends({
			completedData,
			masksData,
			skipAnimation: renderer === "svg-batch" ? batchSkipAnimation : skipAnimation,
			onItemClick,
			borderRadius
		}, other)), completedData.map((processedSeries) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarLabelPlot, _extends({
			className: classes.seriesLabels,
			processedSeries,
			skipAnimation
		}, other), processedSeries.seriesId))]
	});
}
BarPlot.propTypes = {
	/**
	* Defines the border radius of the bar element.
	*/
	borderRadius: import_prop_types.default.number,
	/**
	* A CSS class name applied to the root element.
	*/
	className: import_prop_types.default.string,
	/**
	* Callback fired when a bar item is clicked.
	* @param {MouseEvent | React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
	*        It is a native MouseEvent for `svg-batch` renderer and a React MouseEvent for `svg-single` renderer.
	* @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
	*/
	onItemClick: import_prop_types.default.func,
	/**
	* The type of renderer to use for the bar plot.
	* - `svg-single`: Renders every bar in a `<rect />` element.
	* - `svg-batch`: Batch renders bars in `<path />` elements for better performance with large datasets, at the cost of some limitations.
	*                Read more: https://mui.com/x/react-charts/bars/#performance
	*
	* @default 'svg-single'
	*/
	renderer: import_prop_types.default.oneOf(["svg-batch", "svg-single"]),
	/**
	* If `true`, animations are skipped.
	* @default undefined
	*/
	skipAnimation: import_prop_types.default.bool,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-charts/hooks/useIsHydrated.mjs
/** Returns true after hydration is done on the client.
*
* Basically a implementation of Option 2 of this gist: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#option-2-lazily-show-component-with-uselayouteffect. */
function useIsHydrated() {
	const [isHydrated, setIsHydrated] = import_react.useState(false);
	import_react.useEffect(() => {
		setIsHydrated(true);
	}, []);
	return isHydrated;
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/useMounted.mjs
function useMounted(defer = false) {
	const [mountedState, setMountedState] = import_react.useState(false);
	useEnhancedEffect(() => {
		if (!defer) setMountedState(true);
	}, [defer]);
	import_react.useEffect(() => {
		if (defer) setMountedState(true);
	}, [defer]);
	return mountedState;
}
//#endregion
//#region node_modules/@mui/x-charts/internals/degToRad.mjs
/** Converts degrees to radians. */
function degToRad(degrees) {
	return degrees * (Math.PI / 180);
}
//#endregion
//#region node_modules/@mui/x-charts/internals/sliceUntil.mjs
var segmenter = typeof window !== "undefined" && "Intl" in window && "Segmenter" in Intl ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null;
function sliceUntilFallback(text, endIndex) {
	return text.slice(0, endIndex);
}
function sliceUntilModern(text, endIndex) {
	const segments = segmenter.segment(text);
	let newText = "";
	let i = 0;
	for (const segment of segments) {
		newText += segment.segment;
		i += 1;
		if (i >= endIndex) break;
	}
	return newText;
}
/** Creates a slice of {@link text} from the start until the {@link endIndex}th grapheme (basically character). */
var sliceUntil = segmenter ? sliceUntilModern : sliceUntilFallback;
//#endregion
//#region node_modules/@mui/x-charts/internals/ellipsize.mjs
var ELLIPSIS = "…";
function doesTextFitInRect(text, config) {
	const { width, height, measureText } = config;
	const angle = degToRad(config.angle);
	const textSize = measureText(text);
	const angledWidth = Math.abs(textSize.width * Math.cos(angle)) + Math.abs(textSize.height * Math.sin(angle));
	const angledHeight = Math.abs(textSize.width * Math.sin(angle)) + Math.abs(textSize.height * Math.cos(angle));
	return angledWidth <= width && angledHeight <= height;
}
/** This function finds the best place to clip the text to add an ellipsis.
*  This function assumes that the {@link doesTextFit} never returns true for longer text after returning false for
*  shorter text.
*
*  @param text Text to ellipsize if needed
*  @param doesTextFit a function that returns whether a string fits inside a container.
*/
function ellipsize(text, doesTextFit) {
	if (doesTextFit(text)) return text;
	let shortenedText = text;
	let step = 1;
	let by = 1 / 2;
	const graphemeCount = getGraphemeCount(text);
	let newLength = graphemeCount;
	let lastLength = graphemeCount;
	let longestFittingText = null;
	do {
		lastLength = newLength;
		newLength = Math.floor(graphemeCount * by);
		if (newLength === 0) break;
		shortenedText = sliceUntil(text, newLength).trim();
		const fits = doesTextFit(shortenedText + ELLIPSIS);
		step += 1;
		if (fits) {
			longestFittingText = shortenedText;
			by += 1 / 2 ** step;
		} else by -= 1 / 2 ** step;
	} while (Math.abs(newLength - lastLength) !== 1);
	return longestFittingText ? longestFittingText + ELLIPSIS : "";
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/shortenLabels.mjs
function shortenLabels$1(visibleLabels, drawingArea, maxHeight, isRtl, tickLabelStyle) {
	const shortenedLabels = /* @__PURE__ */ new Map();
	const angle = clampAngle(tickLabelStyle?.angle ?? 0);
	let leftBoundFactor = 1;
	let rightBoundFactor = 1;
	if (tickLabelStyle?.textAnchor === "start") {
		leftBoundFactor = Infinity;
		rightBoundFactor = 1;
	} else if (tickLabelStyle?.textAnchor === "end") {
		leftBoundFactor = 1;
		rightBoundFactor = Infinity;
	} else {
		leftBoundFactor = 2;
		rightBoundFactor = 2;
	}
	if (angle > 90 && angle < 270) [leftBoundFactor, rightBoundFactor] = [rightBoundFactor, leftBoundFactor];
	if (isRtl) [leftBoundFactor, rightBoundFactor] = [rightBoundFactor, leftBoundFactor];
	for (const item of visibleLabels) if (item.formattedValue) {
		const width = Math.min((item.offset + item.labelOffset) * leftBoundFactor, (drawingArea.left + drawingArea.width + drawingArea.right - item.offset - item.labelOffset) * rightBoundFactor);
		const doesTextFit = (text) => doesTextFitInRect(text, {
			width,
			height: maxHeight,
			angle,
			measureText: (string) => getStringSize(string, tickLabelStyle)
		});
		shortenedLabels.set(item, ellipsize(item.formattedValue.toString(), doesTextFit));
	}
	return shortenedLabels;
}
//#endregion
//#region node_modules/@mui/x-charts/internals/geometry.mjs
var ANGLE_APPROX = 5;
/**
* Return the minimal translation along the x-axis to avoid overflow of a rectangle of a given width, height, and rotation.
* This assumes that all rectangles have the same height and angle between -90 and 90.
* Otherwise it would be problematic because you need the height/width of the next rectangle to do the correct computation.
* @param width the side along the x-axis.
* @param height the side along the y-axis.
* @param angle the rotation in degrees.
*/
function getMinXTranslation(width, height, angle = 0) {
	if (angle > 90 && angle < -90) warnOnce([
		`MUI X Charts: It seems you applied an angle larger than 90° or smaller than -90° to an axis text.`,
		`This could cause some text overlapping.`,
		`If you encounter a use case where it's needed, please open an issue.`
	]);
	const standardAngle = Math.min(Math.abs(angle) % 180, Math.abs(Math.abs(angle) % 180 - 180) % 180);
	if (standardAngle < ANGLE_APPROX) return width;
	if (standardAngle > 90 - ANGLE_APPROX) return height;
	const radAngle = deg2rad(standardAngle);
	if (radAngle < Math.atan2(height, width)) return width / Math.cos(radAngle);
	return height / Math.sin(radAngle);
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/getVisibleLabels.mjs
function getVisibleLabels(xTicks, { tickLabelStyle: style, tickLabelInterval, tickLabelMinGap, reverse, isMounted, isXInside }) {
	if (typeof tickLabelInterval === "function") return new Set(xTicks.filter((item, index) => tickLabelInterval(item.value, index)));
	let previousTextLimit = 0;
	const direction = reverse ? -1 : 1;
	const candidateTickLabels = xTicks.filter((item) => {
		const { offset, labelOffset, formattedValue } = item;
		if (formattedValue === "") return false;
		return isXInside(offset + labelOffset);
	});
	const sizeMap = measureTickLabels(candidateTickLabels, style);
	return new Set(candidateTickLabels.filter((item, labelIndex) => {
		const { offset, labelOffset } = item;
		const textPosition = offset + labelOffset;
		if (labelIndex > 0 && direction * textPosition < direction * (previousTextLimit + tickLabelMinGap)) return false;
		const { width, height } = isMounted ? getTickLabelSize(sizeMap, item) : {
			width: 0,
			height: 0
		};
		const distance = getMinXTranslation(width, height, style?.angle);
		const currentTextLimit = textPosition - direction * distance / 2;
		if (labelIndex > 0 && direction * currentTextLimit < direction * (previousTextLimit + tickLabelMinGap)) return false;
		previousTextLimit = textPosition + direction * distance / 2;
		return true;
	}));
}
function getTickLabelSize(sizeMap, tick) {
	if (tick.formattedValue === void 0) return {
		width: 0,
		height: 0
	};
	let width = 0;
	let height = 0;
	for (const line of tick.formattedValue.split("\n")) {
		const lineSize = sizeMap.get(line);
		if (lineSize) {
			width = Math.max(width, lineSize.width);
			height += lineSize.height;
		}
	}
	return {
		width,
		height
	};
}
function measureTickLabels(ticks, style) {
	const strings = /* @__PURE__ */ new Set();
	for (const tick of ticks) if (tick.formattedValue) tick.formattedValue.split("\n").forEach((line) => strings.add(line));
	return batchMeasureStrings(strings, style);
}
//#endregion
//#region node_modules/@mui/x-charts/internals/getWordsByLines.mjs
function getWordsByLines({ style, needsComputation, text }) {
	return text.split("\n").map((subText) => _extends({ text: subText }, needsComputation ? getStringSize(subText, style) : {
		width: 0,
		height: 0
	}));
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsText/ChartsText.mjs
var _excluded$6 = [
	"x",
	"y",
	"style",
	"text",
	"ownerState"
], _excluded2$2 = [
	"angle",
	"textAnchor",
	"dominantBaseline"
];
/**
* Helper component to manage multiline text in SVG
*/
function ChartsText(props) {
	const { x, y, style: styleProps, text } = props, textProps = _objectWithoutPropertiesLoose(props, _excluded$6);
	const _ref = styleProps ?? {}, { angle, textAnchor, dominantBaseline } = _ref, style = _objectWithoutPropertiesLoose(_ref, _excluded2$2);
	const isHydrated = useIsHydrated();
	const wordsByLines = import_react.useMemo(() => getWordsByLines({
		style,
		needsComputation: isHydrated && text.includes("\n"),
		text
	}), [
		style,
		text,
		isHydrated
	]);
	let startDy;
	switch (dominantBaseline) {
		case "hanging":
		case "text-before-edge":
			startDy = 0;
			break;
		case "central":
			startDy = (wordsByLines.length - 1) / 2 * -wordsByLines[0].height;
			break;
		default:
			startDy = (wordsByLines.length - 1) * -wordsByLines[0].height;
			break;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", _extends({}, textProps, {
		transform: angle ? `rotate(${angle}, ${x}, ${y})` : void 0,
		x,
		y,
		textAnchor,
		dominantBaseline,
		style,
		children: wordsByLines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", {
			x,
			dy: `${index === 0 ? startDy : wordsByLines[0].height}px`,
			dominantBaseline,
			children: line.text
		}, index))
	}));
}
ChartsText.propTypes = {
	/**
	* Height of a text line (in `em`).
	*/
	lineHeight: import_prop_types.default.number,
	/**
	* If `true`, the line width is computed.
	* @default false
	*/
	needsComputation: import_prop_types.default.bool,
	ownerState: import_prop_types.default.any,
	/**
	* Style applied to text elements.
	*/
	style: import_prop_types.default.object,
	/**
	* Text displayed.
	*/
	text: import_prop_types.default.string.isRequired
};
//#endregion
//#region node_modules/@mui/x-charts/ChartsText/defaultTextPlacement.mjs
/**
* Provide the text-anchor based on the angle between the text and the associated element.
* - 0 means the element is on top of the text, 180 bellow, and 90 on the right of the text.
* @param {number} angle The angle between the text and the element.
* @returns
*/
function getDefaultTextAnchor(angle) {
	const adjustedAngle = clampAngle(angle);
	if (adjustedAngle <= 30 || adjustedAngle >= 330) return "middle";
	if (adjustedAngle <= 210 && adjustedAngle >= 150) return "middle";
	if (adjustedAngle <= 180) return "end";
	return "start";
}
function getDefaultBaseline(angle) {
	const adjustedAngle = clampAngle(angle);
	if (adjustedAngle <= 30 || adjustedAngle >= 330) return "hanging";
	if (adjustedAngle <= 210 && adjustedAngle >= 150) return "auto";
	return "central";
}
//#endregion
//#region node_modules/@mui/x-charts/internals/invertTextAnchor.mjs
function invertTextAnchor(textAnchor) {
	switch (textAnchor) {
		case "start": return "end";
		case "end": return "start";
		default: return textAnchor;
	}
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/useAxisTicksProps.mjs
var _excluded$5 = [
	"scale",
	"tickNumber",
	"reverse"
];
function useAxisTicksProps$1(inProps) {
	const { xAxis, xAxisIds } = useXAxes();
	const _xAxis = xAxis[inProps.axisId ?? xAxisIds[0]], { scale: xScale, tickNumber, reverse } = _xAxis;
	const defaultizedProps = _extends({}, defaultProps$1, useThemeProps({
		props: _extends({}, _objectWithoutPropertiesLoose(_xAxis, _excluded$5), inProps),
		name: "MuiChartsXAxis"
	}));
	const { position, tickLabelStyle, slots, slotProps } = defaultizedProps;
	const theme = useTheme();
	const isRtl = useRtl();
	const classes = useUtilityClasses$4(defaultizedProps);
	const positionSign = position === "bottom" ? 1 : -1;
	const Tick = slots?.axisTick ?? "line";
	const TickLabel = slots?.axisTickLabel ?? ChartsText;
	const defaultTextAnchor = getDefaultTextAnchor((position === "bottom" ? 0 : 180) - (tickLabelStyle?.angle ?? 0));
	const defaultDominantBaseline = getDefaultBaseline((position === "bottom" ? 0 : 180) - (tickLabelStyle?.angle ?? 0));
	return {
		xScale,
		defaultizedProps,
		tickNumber,
		positionSign,
		classes,
		Tick,
		TickLabel,
		axisTickLabelProps: useSlotProps({
			elementType: TickLabel,
			externalSlotProps: slotProps?.axisTickLabel,
			additionalProps: { style: _extends({}, theme.typography.caption, {
				fontSize: 12,
				lineHeight: 1.25,
				textAnchor: isRtl ? invertTextAnchor(defaultTextAnchor) : defaultTextAnchor,
				dominantBaseline: defaultDominantBaseline
			}, tickLabelStyle) },
			className: classes.tickLabel,
			ownerState: {}
		}),
		reverse
	};
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/ChartsSingleXAxisTicks.mjs
/**
* @ignore - internal component.
*/
function ChartsSingleXAxisTicks(inProps) {
	const { axisLabelHeight, ordinalTimeTicks } = inProps;
	const { xScale, defaultizedProps, tickNumber, positionSign, classes, Tick, TickLabel, axisTickLabelProps, reverse } = useAxisTicksProps$1(inProps);
	const isRtl = useRtl();
	const isMounted = useMounted();
	const { disableTicks, tickSize: tickSizeProp, valueFormatter, slotProps, tickInterval, tickLabelInterval, tickPlacement, tickLabelPlacement, tickLabelMinGap, tickSpacing, height: axisHeight } = defaultizedProps;
	const drawingArea = useDrawingArea();
	const { instance } = useChartsContext();
	const isHydrated = useIsHydrated();
	const tickSize = disableTicks ? 4 : tickSizeProp;
	const xTicks = useTicks({
		scale: xScale,
		tickNumber,
		valueFormatter,
		tickInterval,
		tickPlacement,
		tickLabelPlacement,
		tickSpacing,
		direction: "x",
		ordinalTimeTicks
	});
	const visibleLabels = getVisibleLabels(xTicks, {
		tickLabelStyle: axisTickLabelProps.style,
		tickLabelInterval,
		tickLabelMinGap,
		reverse,
		isMounted,
		isXInside: instance.isXInside
	});
	const tickLabelsMaxHeight = Math.max(0, axisHeight - (axisLabelHeight > 0 ? axisLabelHeight + 4 : 0) - tickSize - 3);
	const tickLabels = isHydrated ? shortenLabels$1(visibleLabels, drawingArea, tickLabelsMaxHeight, isRtl, axisTickLabelProps.style) : new Map(Array.from(visibleLabels).map((item) => [item, item.formattedValue]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: xTicks.map((item, index) => {
		const { offset: tickOffset, labelOffset } = item;
		const xTickLabel = labelOffset ?? 0;
		const yTickLabel = positionSign * (tickSize + 3);
		const showTick = instance.isXInside(tickOffset);
		const tickLabel = tickLabels.get(item);
		const showTickLabel = visibleLabels.has(item);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(${tickOffset}, 0)`,
			className: classes.tickContainer,
			children: [!disableTicks && showTick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tick, _extends({
				y2: positionSign * tickSize,
				className: classes.tick
			}, slotProps?.axisTick)), tickLabel !== void 0 && showTickLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickLabel, _extends({
				x: xTickLabel,
				y: yTickLabel
			}, axisTickLabelProps, { text: tickLabel }))]
		}, index);
	}) });
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/useTicksGrouped.mjs
var offsetRatio = {
	start: 0,
	extremities: 0,
	end: 1,
	middle: .5,
	tick: 0
};
function useTicksGrouped(options) {
	const { scale, tickInterval, tickLabelPlacement = "middle", tickPlacement = "extremities", groups } = options;
	return import_react.useMemo(() => {
		const domain = scale.domain();
		const filteredDomain = typeof tickInterval === "function" && domain.filter(tickInterval) || typeof tickInterval === "object" && tickInterval || domain;
		if (scale.bandwidth() > 0) {
			const entries = mapToGrouping(filteredDomain, groups, tickPlacement, tickLabelPlacement, scale);
			if (entries[0]) entries[0].ignoreTick = true;
			return [
				{
					formattedValue: void 0,
					offset: scale.range()[0],
					labelOffset: 0,
					groupIndex: groups.length - 1
				},
				...entries,
				{
					formattedValue: void 0,
					offset: scale.range()[1],
					labelOffset: 0,
					groupIndex: groups.length - 1
				}
			];
		}
		return mapToGrouping(filteredDomain, groups, tickPlacement, tickLabelPlacement, scale);
	}, [
		scale,
		tickInterval,
		groups,
		tickPlacement,
		tickLabelPlacement
	]);
}
function mapToGrouping(tickValues, groups, tickPlacement, tickLabelPlacement, scale) {
	const allTickItems = [];
	const dataIndexToTickIndex = /* @__PURE__ */ new Map();
	let currentValueCount = 0;
	for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) for (let dataIndex = 0; dataIndex < tickValues.length; dataIndex += 1) {
		const tickValue = tickValues[dataIndex];
		const groupValue = groups[groupIndex].getValue(tickValue, dataIndex);
		const lastItem = allTickItems[allTickItems.length - 1];
		if (lastItem?.value !== groupValue || lastItem?.groupIndex !== groupIndex) {
			currentValueCount = 1;
			const tickOffset = isOrdinalScale(scale) ? scale(tickValue) - (scale.step() - scale.bandwidth()) / 2 + offsetRatio[tickPlacement] * scale.step() : scale(tickValue);
			const labelOffset = scale.step() * currentValueCount * (offsetRatio[tickLabelPlacement] - offsetRatio[tickPlacement]);
			allTickItems.push({
				value: groupValue,
				formattedValue: `${groupValue}`,
				offset: tickOffset,
				groupIndex,
				dataIndex,
				ignoreTick: false,
				labelOffset
			});
			if (!dataIndexToTickIndex.has(dataIndex)) dataIndexToTickIndex.set(dataIndex, /* @__PURE__ */ new Set());
			const tickIndexes = dataIndexToTickIndex.get(dataIndex);
			for (const previousIndex of tickIndexes.values()) allTickItems[previousIndex].ignoreTick = true;
			tickIndexes.add(allTickItems.length - 1);
		} else {
			currentValueCount += 1;
			lastItem.labelOffset = scale.step() * currentValueCount * (offsetRatio[tickLabelPlacement] - offsetRatio[tickPlacement]);
		}
	}
	return allTickItems;
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/ChartsGroupedXAxisTicks.mjs
var DEFAULT_GROUPING_CONFIG$1 = { tickSize: 6 };
var getGroupingConfig$1 = (groups, groupIndex, tickSize, computedGroupTickSizes) => {
	const config = groups[groupIndex] ?? {};
	const defaultTickSize = tickSize ?? DEFAULT_GROUPING_CONFIG$1.tickSize;
	const calculatedTickSize = defaultTickSize * groupIndex * 2 + defaultTickSize;
	return _extends({}, DEFAULT_GROUPING_CONFIG$1, config, { tickSize: computedGroupTickSizes?.[groupIndex] ?? config.tickSize ?? calculatedTickSize });
};
/**
* @ignore - internal component.
*/
function ChartsGroupedXAxisTicks(inProps) {
	const { xScale, defaultizedProps, tickNumber, positionSign, classes, Tick, TickLabel, axisTickLabelProps } = useAxisTicksProps$1(inProps);
	if (!isOrdinalScale(xScale)) throw new Error("MUI X Charts: ChartsGroupedXAxis only supports the `band` and `point` scale types. Grouped axis ticks require an ordinal scale to display category groupings. Use a band or point scale type for the x-axis, or use a non-grouped axis component.");
	const { disableTicks, tickSize, valueFormatter, slotProps, tickInterval, tickPlacement, tickLabelPlacement } = defaultizedProps;
	const groups = defaultizedProps.groups;
	const axisId = defaultizedProps.id;
	const { instance } = useChartsContext();
	const autoSizeResults = useStore().use(selectorChartXAxisAutoSizeResults);
	const computedGroupTickSizes = (axisId ? autoSizeResults[axisId] : void 0)?.groupTickSizes;
	const xTicks = useTicksGrouped({
		scale: xScale,
		tickNumber,
		valueFormatter,
		tickInterval,
		tickPlacement,
		tickLabelPlacement,
		direction: "x",
		groups
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: xTicks.map((item, index) => {
		const { offset: tickOffset, labelOffset } = item;
		const xTickLabel = labelOffset ?? 0;
		const showTick = instance.isXInside(tickOffset);
		const tickLabel = item.formattedValue;
		const ignoreTick = item.ignoreTick ?? false;
		const groupIndex = item.groupIndex ?? 0;
		const groupConfig = getGroupingConfig$1(groups, groupIndex, tickSize, computedGroupTickSizes);
		const tickYSize = positionSign * groupConfig.tickSize;
		const labelPositionY = positionSign * (groupConfig.tickSize + 3);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(${tickOffset}, 0)`,
			className: classes.tickContainer,
			"data-group-index": groupIndex,
			children: [!disableTicks && !ignoreTick && showTick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tick, _extends({
				y2: tickYSize,
				className: classes.tick
			}, slotProps?.axisTick)), tickLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickLabel, _extends({
				x: xTickLabel,
				y: labelPositionY
			}, axisTickLabelProps, {
				style: _extends({}, axisTickLabelProps.style, groupConfig.tickLabelStyle),
				text: tickLabel
			}))]
		}, index);
	}) });
}
//#endregion
//#region node_modules/@mui/x-charts/internals/components/AxisSharedComponents.mjs
var AxisRoot = styled("g", {
	name: "MuiChartsAxis",
	slot: "Root"
})(({ theme }) => ({
	[`& .${axisClasses.tickLabel}`]: _extends({}, theme.typography.caption, { fill: (theme.vars || theme).palette.text.primary }),
	[`& .${axisClasses.label}`]: { fill: (theme.vars || theme).palette.text.primary },
	[`& .${axisClasses.line}`]: {
		stroke: (theme.vars || theme).palette.text.primary,
		shapeRendering: "crispEdges",
		strokeWidth: 1
	},
	[`& .${axisClasses.tick}`]: {
		stroke: (theme.vars || theme).palette.text.primary,
		shapeRendering: "crispEdges"
	}
}));
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/ChartsXAxisImpl.mjs
var _excluded$4 = ["axis"], _excluded2$1 = [
	"scale",
	"tickNumber",
	"reverse",
	"ordinalTimeTicks"
];
var XAxisRoot = styled(AxisRoot, {
	name: "MuiChartsXAxis",
	slot: "Root"
})({});
/**
* @ignore - internal component. Use `ChartsXAxis` instead.
*/
function ChartsXAxisImpl(_ref) {
	let { axis } = _ref, inProps = _objectWithoutPropertiesLoose(_ref, _excluded$4);
	const { scale: xScale, ordinalTimeTicks } = axis;
	const defaultizedProps = _extends({}, defaultProps$1, useThemeProps({
		props: _extends({}, _objectWithoutPropertiesLoose(axis, _excluded2$1), inProps),
		name: "MuiChartsXAxis"
	}));
	const { position, className, labelStyle, offset, slots, slotProps, sx, disableLine, label, height: axisHeight } = defaultizedProps;
	const theme = useTheme();
	const classes = useUtilityClasses$4(defaultizedProps);
	const { left, top, width, height } = useDrawingArea();
	const positionSign = position === "bottom" ? 1 : -1;
	const Line = slots?.axisLine ?? "line";
	const Label = slots?.axisLabel ?? ChartsText;
	const axisLabelProps = useSlotProps({
		elementType: Label,
		externalSlotProps: slotProps?.axisLabel,
		additionalProps: { style: _extends({}, theme.typography.body1, {
			lineHeight: 1,
			fontSize: 14,
			textAnchor: "middle",
			dominantBaseline: position === "bottom" ? "text-after-edge" : "text-before-edge"
		}, labelStyle) },
		ownerState: {}
	});
	if (position === "none") return null;
	const labelHeight = label ? getStringSize(label, axisLabelProps.style).height : 0;
	const domain = xScale.domain();
	const skipTickRendering = isOrdinalScale(xScale) ? domain.length === 0 : domain.some(isInfinity);
	let children = null;
	if (!skipTickRendering) children = "groups" in axis && Array.isArray(axis.groups) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsGroupedXAxisTicks, _extends({}, inProps)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsSingleXAxisTicks, _extends({}, inProps, {
		axisLabelHeight: labelHeight,
		ordinalTimeTicks
	}));
	const labelRefPoint = {
		x: left + width / 2,
		y: positionSign * axisHeight
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(XAxisRoot, {
		transform: `translate(0, ${position === "bottom" ? top + height + offset : top - offset})`,
		className: clsx(classes.root, className),
		"data-axis-id": defaultizedProps.id,
		sx,
		children: [
			!disableLine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, _extends({
				x1: left,
				x2: left + width,
				className: classes.line
			}, slotProps?.axisLine)),
			children,
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: classes.label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, { text: label }))
			})
		]
	});
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsXAxis/ChartsXAxis.mjs
/**
* Demos:
*
* - [Axis](https://mui.com/x/react-charts/axis/)
*
* API:
*
* - [ChartsXAxis API](https://mui.com/x/api/charts/charts-x-axis/)
*/
function ChartsXAxis(inProps) {
	const { xAxis, xAxisIds } = useXAxes();
	const axis = xAxis[inProps.axisId ?? xAxisIds[0]];
	if (!axis) {
		warnOnce(`MUI X Charts: No axis found. The axisId "${inProps.axisId}" is probably invalid.`);
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsXAxisImpl, _extends({}, inProps, { axis }));
}
ChartsXAxis.propTypes = {
	axis: import_prop_types.default.oneOf(["x"]),
	/**
	* The id of the axis to render.
	* If undefined, it will be the first defined axis.
	*/
	axisId: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* If true, the axis line is disabled.
	* @default false
	*/
	disableLine: import_prop_types.default.bool,
	/**
	* If true, the ticks are disabled.
	* @default false
	*/
	disableTicks: import_prop_types.default.bool,
	/**
	* The label of the axis.
	*/
	label: import_prop_types.default.string,
	/**
	* The style applied to the axis label.
	*/
	labelStyle: import_prop_types.default.object,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	/**
	* Defines which ticks are displayed.
	* Its value can be:
	* - 'auto' In such case the ticks are computed based on axis scale and other parameters.
	* - a filtering function of the form `(value, index) => boolean` which is available only if the axis has "point" scale.
	* - an array containing the values where ticks should be displayed.
	* @see See {@link https://mui.com/x/react-charts/axis/#fixed-tick-positions}
	* @default 'auto'
	*/
	tickInterval: import_prop_types.default.oneOfType([
		import_prop_types.default.oneOf(["auto"]),
		import_prop_types.default.array,
		import_prop_types.default.func
	]),
	/**
	* Defines which ticks get its label displayed. Its value can be:
	* - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
	* - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
	* @default 'auto'
	*/
	tickLabelInterval: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.func]),
	/**
	* The minimum gap in pixels between two tick labels.
	* If two tick labels are closer than this minimum gap, one of them will be hidden.
	* @default 4
	*/
	tickLabelMinGap: import_prop_types.default.number,
	/**
	* The placement of ticks label. Can be the middle of the band, or the tick position.
	* Only used if scale is 'band'.
	* @default 'middle'
	*/
	tickLabelPlacement: import_prop_types.default.oneOf(["middle", "tick"]),
	/**
	* The style applied to ticks text.
	*/
	tickLabelStyle: import_prop_types.default.object,
	/**
	* Maximal step between two ticks.
	* When using time data, the value is assumed to be in ms.
	* Not supported by categorical axis (band, points).
	*/
	tickMaxStep: import_prop_types.default.number,
	/**
	* Minimal step between two ticks.
	* When using time data, the value is assumed to be in ms.
	* Not supported by categorical axis (band, points).
	*/
	tickMinStep: import_prop_types.default.number,
	/**
	* The number of ticks. This number is not guaranteed.
	* Not supported by categorical axis (band, points).
	*/
	tickNumber: import_prop_types.default.number,
	/**
	* The placement of ticks in regard to the band interval.
	* Only used if scale is 'band'.
	* @default 'extremities'
	*/
	tickPlacement: import_prop_types.default.oneOf([
		"end",
		"extremities",
		"middle",
		"start"
	]),
	/**
	* The size of the ticks.
	* @default 6
	*/
	tickSize: import_prop_types.default.number
};
//#endregion
//#region node_modules/@mui/x-charts/ChartsYAxis/shortenLabels.mjs
function shortenLabels(visibleLabels, drawingArea, maxWidth, isRtl, tickLabelStyle) {
	const shortenedLabels = /* @__PURE__ */ new Map();
	const angle = clampAngle(tickLabelStyle?.angle ?? 0);
	let topBoundFactor = 1;
	let bottomBoundFactor = 1;
	if (tickLabelStyle?.textAnchor === "start") {
		topBoundFactor = Infinity;
		bottomBoundFactor = 1;
	} else if (tickLabelStyle?.textAnchor === "end") {
		topBoundFactor = 1;
		bottomBoundFactor = Infinity;
	} else {
		topBoundFactor = 2;
		bottomBoundFactor = 2;
	}
	if (angle > 180) [topBoundFactor, bottomBoundFactor] = [bottomBoundFactor, topBoundFactor];
	if (isRtl) [topBoundFactor, bottomBoundFactor] = [bottomBoundFactor, topBoundFactor];
	for (const item of visibleLabels) if (item.formattedValue) {
		const height = Math.min((item.offset + item.labelOffset) * topBoundFactor, (drawingArea.top + drawingArea.height + drawingArea.bottom - item.offset - item.labelOffset) * bottomBoundFactor);
		const doesTextFit = (text) => doesTextFitInRect(text, {
			width: maxWidth,
			height,
			angle,
			measureText: (string) => getStringSize(string, tickLabelStyle)
		});
		shortenedLabels.set(item, ellipsize(item.formattedValue.toString(), doesTextFit));
	}
	return shortenedLabels;
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsYAxis/utilities.mjs
var useUtilityClasses$2 = (ownerState) => {
	const { classes, position } = ownerState;
	return composeClasses({
		root: [
			"root",
			"directionY",
			position
		],
		line: ["line"],
		tickContainer: ["tickContainer"],
		tick: ["tick"],
		tickLabel: ["tickLabel"],
		label: ["label"]
	}, getAxisUtilityClass, classes);
};
var defaultProps = {
	disableLine: false,
	disableTicks: false,
	tickSize: 6
};
//#endregion
//#region node_modules/@mui/x-charts/ChartsYAxis/useAxisTicksProps.mjs
var _excluded$3 = [
	"scale",
	"tickNumber",
	"reverse"
];
function useAxisTicksProps(inProps) {
	const { yAxis, yAxisIds } = useYAxes();
	const _yAxis = yAxis[inProps.axisId ?? yAxisIds[0]], { scale: yScale, tickNumber } = _yAxis;
	const defaultizedProps = _extends({}, defaultProps, useThemeProps({
		props: _extends({}, _objectWithoutPropertiesLoose(_yAxis, _excluded$3), inProps),
		name: "MuiChartsYAxis"
	}));
	const { position, tickLabelStyle, slots, slotProps } = defaultizedProps;
	const theme = useTheme();
	const isRtl = useRtl();
	const classes = useUtilityClasses$2(defaultizedProps);
	const positionSign = position === "right" ? 1 : -1;
	const tickFontSize = typeof tickLabelStyle?.fontSize === "number" ? tickLabelStyle.fontSize : 12;
	const Tick = slots?.axisTick ?? "line";
	const TickLabel = slots?.axisTickLabel ?? ChartsText;
	const defaultTextAnchor = getDefaultTextAnchor((position === "right" ? -90 : 90) - (tickLabelStyle?.angle ?? 0));
	const defaultDominantBaseline = getDefaultBaseline((position === "right" ? -90 : 90) - (tickLabelStyle?.angle ?? 0));
	return {
		yScale,
		defaultizedProps,
		tickNumber,
		positionSign,
		classes,
		Tick,
		TickLabel,
		axisTickLabelProps: useSlotProps({
			elementType: TickLabel,
			externalSlotProps: slotProps?.axisTickLabel,
			additionalProps: { style: _extends({}, theme.typography.caption, {
				fontSize: tickFontSize,
				textAnchor: isRtl ? invertTextAnchor(defaultTextAnchor) : defaultTextAnchor,
				dominantBaseline: defaultDominantBaseline
			}, tickLabelStyle) },
			className: classes.tickLabel,
			ownerState: {}
		})
	};
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsYAxis/ChartsSingleYAxisTicks.mjs
/**
* @ignore - internal component.
*/
function ChartsSingleYAxisTicks(inProps) {
	const { axisLabelHeight, ordinalTimeTicks } = inProps;
	const { yScale, defaultizedProps, tickNumber, positionSign, classes, Tick, TickLabel, axisTickLabelProps } = useAxisTicksProps(inProps);
	const isRtl = useRtl();
	const { disableTicks, tickSize: tickSizeProp, valueFormatter, slotProps, tickPlacement, tickLabelPlacement, tickInterval, tickLabelInterval, tickSpacing, width: axisWidth } = defaultizedProps;
	const drawingArea = useDrawingArea();
	const { instance } = useChartsContext();
	const isHydrated = useIsHydrated();
	const tickSize = disableTicks ? 4 : tickSizeProp;
	const yTicks = useTicks({
		scale: yScale,
		tickNumber,
		valueFormatter,
		tickPlacement,
		tickLabelPlacement,
		tickInterval,
		tickSpacing,
		direction: "y",
		ordinalTimeTicks
	});
	const tickLabelsMaxWidth = Math.max(0, axisWidth - (axisLabelHeight > 0 ? axisLabelHeight + 2 : 0) - tickSize - 2);
	const tickLabels = isHydrated ? shortenLabels(yTicks, drawingArea, tickLabelsMaxWidth, isRtl, axisTickLabelProps.style) : new Map(Array.from(yTicks).map((item) => [item, item.formattedValue]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: yTicks.map((item, index) => {
		const { offset: tickOffset, labelOffset, value } = item;
		const xTickLabel = positionSign * (tickSize + 2);
		const yTickLabel = labelOffset;
		const skipLabel = typeof tickLabelInterval === "function" && !tickLabelInterval?.(value, index);
		const showLabel = instance.isYInside(tickOffset);
		const tickLabel = tickLabels.get(item);
		if (!showLabel) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(0, ${tickOffset})`,
			className: classes.tickContainer,
			children: [!disableTicks && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tick, _extends({
				x2: positionSign * tickSize,
				className: classes.tick
			}, slotProps?.axisTick)), tickLabel !== void 0 && !skipLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickLabel, _extends({
				x: xTickLabel,
				y: yTickLabel,
				text: tickLabel
			}, axisTickLabelProps))]
		}, index);
	}) });
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsYAxis/ChartsGroupedYAxisTicks.mjs
var DEFAULT_GROUPING_CONFIG = { tickSize: 6 };
var getGroupingConfig = (groups, groupIndex, tickSize, computedGroupTickSizes) => {
	const config = groups[groupIndex] ?? {};
	const defaultTickSize = tickSize ?? DEFAULT_GROUPING_CONFIG.tickSize;
	const calculatedTickSize = defaultTickSize * groupIndex * 2 + defaultTickSize;
	return _extends({}, DEFAULT_GROUPING_CONFIG, config, { tickSize: computedGroupTickSizes?.[groupIndex] ?? config.tickSize ?? calculatedTickSize });
};
/**
* @ignore - internal component.
*/
function ChartsGroupedYAxisTicks(inProps) {
	const { yScale, defaultizedProps, tickNumber, positionSign, classes, Tick, TickLabel, axisTickLabelProps } = useAxisTicksProps(inProps);
	if (!isOrdinalScale(yScale)) throw new Error("MUI X Charts: ChartsGroupedYAxis only supports the `band` and `point` scale types. Grouped axis ticks require an ordinal scale to display category groupings. Use a band or point scale type for the y-axis, or use a non-grouped axis component.");
	const { disableTicks, tickSize, valueFormatter, slotProps, tickInterval, tickPlacement, tickLabelPlacement } = defaultizedProps;
	const groups = defaultizedProps.groups;
	const axisId = defaultizedProps.id;
	const { instance } = useChartsContext();
	const autoSizeResults = useStore().use(selectorChartYAxisAutoSizeResults);
	const computedGroupTickSizes = (axisId ? autoSizeResults[axisId] : void 0)?.groupTickSizes;
	const yTicks = useTicksGrouped({
		scale: yScale,
		tickNumber,
		valueFormatter,
		tickInterval,
		tickPlacement,
		tickLabelPlacement,
		direction: "y",
		groups
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: yTicks.map((item, index) => {
		const { offset: tickOffset, labelOffset } = item;
		const yTickLabel = labelOffset ?? 0;
		const showTick = instance.isYInside(tickOffset);
		const tickLabel = item.formattedValue;
		const ignoreTick = item.ignoreTick ?? false;
		const groupIndex = item.groupIndex ?? 0;
		const groupConfig = getGroupingConfig(groups, groupIndex, tickSize, computedGroupTickSizes);
		const tickXSize = positionSign * groupConfig.tickSize;
		const labelPositionX = positionSign * (groupConfig.tickSize + 2);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: `translate(0, ${tickOffset})`,
			className: classes.tickContainer,
			"data-group-index": groupIndex,
			children: [!disableTicks && !ignoreTick && showTick && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tick, _extends({
				x2: tickXSize,
				className: classes.tick
			}, slotProps?.axisTick)), tickLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TickLabel, _extends({
				x: labelPositionX,
				y: yTickLabel
			}, axisTickLabelProps, {
				style: _extends({}, axisTickLabelProps.style, groupConfig.tickLabelStyle),
				text: tickLabel
			}))]
		}, index);
	}) });
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsYAxis/ChartsYAxisImpl.mjs
var _excluded$2 = ["axis"], _excluded2 = [
	"scale",
	"tickNumber",
	"reverse",
	"ordinalTimeTicks"
];
var YAxisRoot = styled(AxisRoot, {
	name: "MuiChartsYAxis",
	slot: "Root"
})({});
/**
* @ignore - internal component. Use `ChartsYAxis` instead.
*/
function ChartsYAxisImpl(_ref) {
	let { axis } = _ref, inProps = _objectWithoutPropertiesLoose(_ref, _excluded$2);
	const { scale: yScale, ordinalTimeTicks } = axis, settings = _objectWithoutPropertiesLoose(axis, _excluded2);
	const isHydrated = useIsHydrated();
	const defaultizedProps = _extends({}, defaultProps, useThemeProps({
		props: _extends({}, settings, inProps),
		name: "MuiChartsYAxis"
	}));
	const { position, className, disableLine, label, labelStyle, offset, width: axisWidth, sx, slots, slotProps } = defaultizedProps;
	const theme = useTheme();
	const classes = useUtilityClasses$2(defaultizedProps);
	const { left, top, width, height } = useDrawingArea();
	const positionSign = position === "right" ? 1 : -1;
	const Line = slots?.axisLine ?? "line";
	const Label = slots?.axisLabel ?? ChartsText;
	const lineProps = useSlotProps({
		elementType: Line,
		externalSlotProps: slotProps?.axisLine,
		additionalProps: { strokeLinecap: "square" },
		ownerState: {}
	});
	const axisLabelProps = useSlotProps({
		elementType: Label,
		externalSlotProps: slotProps?.axisLabel,
		additionalProps: { style: _extends({}, theme.typography.body1, {
			lineHeight: 1,
			fontSize: 14,
			angle: positionSign * 90,
			textAnchor: "middle",
			dominantBaseline: "text-before-edge"
		}, labelStyle) },
		ownerState: {}
	});
	if (position === "none") return null;
	const labelRefPoint = {
		x: positionSign * axisWidth,
		y: top + height / 2
	};
	const axisLabelHeight = label == null ? 0 : getStringSize(label, axisLabelProps.style).height;
	const domain = yScale.domain();
	const skipTickRendering = isOrdinalScale(yScale) ? domain.length === 0 : domain.some(isInfinity);
	let children = null;
	if (!skipTickRendering) children = "groups" in axis && Array.isArray(axis.groups) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsGroupedYAxisTicks, _extends({}, inProps)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsSingleYAxisTicks, _extends({}, inProps, {
		axisLabelHeight,
		ordinalTimeTicks
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(YAxisRoot, {
		transform: `translate(${position === "right" ? left + width + offset : left - offset}, 0)`,
		className: clsx(classes.root, className),
		"data-axis-id": defaultizedProps.id,
		sx,
		children: [
			!disableLine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, _extends({
				y1: top,
				y2: top + height,
				className: classes.line
			}, lineProps)),
			children,
			label && isHydrated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: classes.label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, { text: label }))
			})
		]
	});
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsYAxis/ChartsYAxis.mjs
/**
* Demos:
*
* - [Axis](https://mui.com/x/react-charts/axis/)
*
* API:
*
* - [ChartsYAxis API](https://mui.com/x/api/charts/charts-y-axis/)
*/
function ChartsYAxis(inProps) {
	const { yAxis, yAxisIds } = useYAxes();
	const axis = yAxis[inProps.axisId ?? yAxisIds[0]];
	if (!axis) {
		warnOnce(`MUI X Charts: No axis found. The axisId "${inProps.axisId}" is probably invalid.`);
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsYAxisImpl, _extends({}, inProps, { axis }));
}
ChartsYAxis.propTypes = {
	axis: import_prop_types.default.oneOf(["y"]),
	/**
	* The id of the axis to render.
	* If undefined, it will be the first defined axis.
	*/
	axisId: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* If true, the axis line is disabled.
	* @default false
	*/
	disableLine: import_prop_types.default.bool,
	/**
	* If true, the ticks are disabled.
	* @default false
	*/
	disableTicks: import_prop_types.default.bool,
	/**
	* The label of the axis.
	*/
	label: import_prop_types.default.string,
	/**
	* The style applied to the axis label.
	*/
	labelStyle: import_prop_types.default.object,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	/**
	* Defines which ticks are displayed.
	* Its value can be:
	* - 'auto' In such case the ticks are computed based on axis scale and other parameters.
	* - a filtering function of the form `(value, index) => boolean` which is available only if the axis has "point" scale.
	* - an array containing the values where ticks should be displayed.
	* @see See {@link https://mui.com/x/react-charts/axis/#fixed-tick-positions}
	* @default 'auto'
	*/
	tickInterval: import_prop_types.default.oneOfType([
		import_prop_types.default.oneOf(["auto"]),
		import_prop_types.default.array,
		import_prop_types.default.func
	]),
	/**
	* Defines which ticks get its label displayed. Its value can be:
	* - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
	* - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
	* @default 'auto'
	*/
	tickLabelInterval: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.func]),
	/**
	* The placement of ticks label. Can be the middle of the band, or the tick position.
	* Only used if scale is 'band'.
	* @default 'middle'
	*/
	tickLabelPlacement: import_prop_types.default.oneOf(["middle", "tick"]),
	/**
	* The style applied to ticks text.
	*/
	tickLabelStyle: import_prop_types.default.object,
	/**
	* Maximal step between two ticks.
	* When using time data, the value is assumed to be in ms.
	* Not supported by categorical axis (band, points).
	*/
	tickMaxStep: import_prop_types.default.number,
	/**
	* Minimal step between two ticks.
	* When using time data, the value is assumed to be in ms.
	* Not supported by categorical axis (band, points).
	*/
	tickMinStep: import_prop_types.default.number,
	/**
	* The number of ticks. This number is not guaranteed.
	* Not supported by categorical axis (band, points).
	*/
	tickNumber: import_prop_types.default.number,
	/**
	* The placement of ticks in regard to the band interval.
	* Only used if scale is 'band'.
	* @default 'extremities'
	*/
	tickPlacement: import_prop_types.default.oneOf([
		"end",
		"extremities",
		"middle",
		"start"
	]),
	/**
	* The size of the ticks.
	* @default 6
	*/
	tickSize: import_prop_types.default.number
};
//#endregion
//#region node_modules/@mui/x-charts/ChartsAxis/ChartsAxis.mjs
/**
* Demos:
*
* - [Axis](https://mui.com/x/react-charts/axis/)
*
* API:
*
* - [ChartsAxis API](https://mui.com/x/api/charts/charts-axis/)
*/
function ChartsAxis(props) {
	const { slots, slotProps } = props;
	const { xAxisIds, xAxis } = useXAxes();
	const { yAxisIds, yAxis } = useYAxes();
	const XAxis = slots?.xAxis ?? ChartsXAxis;
	const YAxis = slots?.yAxis ?? ChartsYAxis;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [xAxisIds.map((axisId) => {
		if (!xAxis[axisId].position || xAxis[axisId].position === "none") return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
			slots,
			slotProps,
			axisId
		}, axisId);
	}), yAxisIds.map((axisId) => {
		if (!yAxis[axisId].position || yAxis[axisId].position === "none") return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
			slots,
			slotProps,
			axisId
		}, axisId);
	})] });
}
ChartsAxis.propTypes = {
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-charts/ChartsAxisHighlight/chartsAxisHighlightClasses.mjs
function getAxisHighlightUtilityClass(slot) {
	return generateUtilityClass("MuiChartsAxisHighlight", slot);
}
generateUtilityClasses("MuiChartsAxisHighlight", ["root"]);
//#endregion
//#region node_modules/@mui/x-charts/ChartsAxisHighlight/ChartsAxisHighlightPath.mjs
var ChartsAxisHighlightPath = styled("path", {
	name: "MuiChartsAxisHighlight",
	slot: "Root"
})(({ theme }) => ({
	pointerEvents: "none",
	variants: [{
		props: { axisHighlight: "band" },
		style: _extends({
			fill: "white",
			fillOpacity: .1
		}, theme.applyStyles("light", { fill: "gray" }))
	}, {
		props: { axisHighlight: "line" },
		style: _extends({
			strokeDasharray: "5 2",
			stroke: "#ffffff"
		}, theme.applyStyles("light", { stroke: "#000000" }))
	}]
}));
//#endregion
//#region node_modules/@mui/x-charts/ChartsAxisHighlight/ChartsYAxisHighlight.mjs
/**
* @ignore - internal component.
*/
function ChartsYHighlight(props) {
	const { type, classes } = props;
	const { left, width } = useDrawingArea();
	const store = useStore();
	const axisYValues = store.use(selectorChartsHighlightYAxisValue);
	const yAxes = store.use(selectorChartYAxis);
	if (axisYValues.length === 0) return null;
	return axisYValues.map(({ axisId, value }) => {
		const yScale = yAxes.axis[axisId].scale;
		const getYPosition = getValueToPositionMapper(yScale);
		const isYScaleOrdinal = type === "band" && value !== null && isOrdinalScale(yScale);
		if (isYScaleOrdinal && yScale(value) === void 0) console.error([
			`MUI X Charts: The position value provided for the axis is not valid for the current scale.`,
			`This probably means something is wrong with the data passed to the chart.`,
			`The ChartsAxisHighlight component will not be displayed.`
		].join("\n"));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [isYScaleOrdinal && yScale(value) !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsAxisHighlightPath, {
			d: `M ${left} ${yScale(value) - (yScale.step() - yScale.bandwidth()) / 2} l 0 ${yScale.step()} l ${width} 0 l 0 ${-yScale.step()} Z`,
			className: classes.root,
			ownerState: { axisHighlight: "band" }
		}), type === "line" && value !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsAxisHighlightPath, {
			d: `M ${left} ${getYPosition(value)} L ${left + width} ${getYPosition(value)}`,
			className: classes.root,
			ownerState: { axisHighlight: "line" }
		})] }, `${axisId}-${value}`);
	});
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsAxisHighlight/ChartsXAxisHighlight.mjs
/**
* @ignore - internal component.
*/
function ChartsXHighlight(props) {
	const { type, classes } = props;
	const { top, height } = useDrawingArea();
	const store = useStore();
	const axisXValues = store.use(selectorChartsHighlightXAxisValue);
	const xAxes = store.use(selectorChartXAxis);
	if (axisXValues.length === 0) return null;
	return axisXValues.map(({ axisId, value }) => {
		const xScale = xAxes.axis[axisId].scale;
		const getXPosition = getValueToPositionMapper(xScale);
		const isXScaleOrdinal = type === "band" && value !== null && isOrdinalScale(xScale);
		if (isXScaleOrdinal && xScale(value) === void 0) console.error([
			`MUI X Charts: The position value provided for the axis is not valid for the current scale.`,
			`This probably means something is wrong with the data passed to the chart.`,
			`The ChartsAxisHighlight component will not be displayed.`
		].join("\n"));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [isXScaleOrdinal && xScale(value) !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsAxisHighlightPath, {
			d: `M ${xScale(value) - (xScale.step() - xScale.bandwidth()) / 2} ${top} l ${xScale.step()} 0 l 0 ${height} l ${-xScale.step()} 0 Z`,
			className: classes.root,
			ownerState: { axisHighlight: "band" }
		}), type === "line" && value !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsAxisHighlightPath, {
			d: `M ${getXPosition(value)} ${top} L ${getXPosition(value)} ${top + height}`,
			className: classes.root,
			ownerState: { axisHighlight: "line" }
		})] }, `${axisId}-${value}`);
	});
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsAxisHighlight/ChartsAxisHighlight.mjs
var useUtilityClasses$1 = () => {
	return composeClasses({ root: ["root"] }, getAxisHighlightUtilityClass);
};
/**
* Demos:
*
* - [Custom components](https://mui.com/x/react-charts/components/)
*
* API:
*
* - [ChartsAxisHighlight API](https://mui.com/x/api/charts/charts-axis-highlight/)
*/
function ChartsAxisHighlight(props) {
	const { x: xAxisHighlight, y: yAxisHighlight } = props;
	const classes = useUtilityClasses$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [xAxisHighlight && xAxisHighlight !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsXHighlight, {
		type: xAxisHighlight,
		classes
	}), yAxisHighlight && yAxisHighlight !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsYHighlight, {
		type: yAxisHighlight,
		classes
	})] });
}
ChartsAxisHighlight.propTypes = {
	x: import_prop_types.default.oneOf([
		"band",
		"line",
		"none"
	]),
	y: import_prop_types.default.oneOf([
		"band",
		"line",
		"none"
	])
};
//#endregion
//#region node_modules/@mui/x-charts/ChartsClipPath/ChartsClipPath.mjs
/**
* API:
*
* - [ChartsClipPath API](https://mui.com/x/api/charts/charts-clip-path/)
*/
function ChartsClipPath(props) {
	const { id, offset: offsetProps } = props;
	const { left, top, width, height } = useDrawingArea();
	const offset = _extends({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}, offsetProps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
		id,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: left - offset.left,
			y: top - offset.top,
			width: width + offset.left + offset.right,
			height: height + offset.top + offset.bottom
		})
	});
}
ChartsClipPath.propTypes = {
	/**
	* The id of the clip path.
	*/
	id: import_prop_types.default.string.isRequired,
	/**
	* Offset, in pixels, of the clip path rectangle from the drawing area.
	*
	* A positive value will move the rectangle outside the drawing area.
	*/
	offset: import_prop_types.default.shape({
		bottom: import_prop_types.default.number,
		left: import_prop_types.default.number,
		right: import_prop_types.default.number,
		top: import_prop_types.default.number
	})
};
//#endregion
//#region node_modules/@mui/x-charts/ChartsGrid/chartsGridClasses.mjs
function getChartsGridUtilityClass(slot) {
	return generateUtilityClass("MuiChartsGrid", slot);
}
var chartsGridClasses = generateUtilityClasses("MuiChartsGrid", [
	"root",
	"line",
	"horizontalLine",
	"verticalLine"
]);
//#endregion
//#region node_modules/@mui/x-charts/ChartsGrid/styledComponents.mjs
var GridRoot = styled("g", {
	name: "MuiChartsGrid",
	slot: "Root",
	overridesResolver: (props, styles) => [
		{ [`& .${chartsGridClasses.verticalLine}`]: styles.verticalLine },
		{ [`& .${chartsGridClasses.horizontalLine}`]: styles.horizontalLine },
		styles.root
	]
})({});
var GridLine = styled("line", {
	name: "MuiChartsGrid",
	slot: "Line"
})(({ theme }) => ({
	stroke: (theme.vars || theme).palette.divider,
	shapeRendering: "crispEdges",
	strokeWidth: 1
}));
//#endregion
//#region node_modules/@mui/x-charts/ChartsGrid/ChartsVerticalGrid.mjs
/**
* @ignore - internal component.
*/
function ChartsGridVertical(props) {
	const { instance } = useChartsContext();
	const { axis, start, end, classes } = props;
	const { scale, tickNumber, tickInterval, tickSpacing } = axis;
	const xTicks = useTicks({
		scale,
		tickNumber,
		tickInterval,
		tickSpacing,
		direction: "x",
		ordinalTimeTicks: "ordinalTimeTicks" in axis ? axis.ordinalTimeTicks : void 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: xTicks.map(({ value, offset }) => !instance.isXInside(offset) ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridLine, {
		y1: start,
		y2: end,
		x1: offset,
		x2: offset,
		className: classes.verticalLine
	}, `vertical-${value?.getTime?.() ?? value}`)) });
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsGrid/ChartsHorizontalGrid.mjs
/**
* @ignore - internal component.
*/
function ChartsGridHorizontal(props) {
	const { instance } = useChartsContext();
	const { axis, start, end, classes } = props;
	const { scale, tickNumber, tickInterval, tickSpacing } = axis;
	const yTicks = useTicks({
		scale,
		tickNumber,
		tickInterval,
		tickSpacing,
		direction: "y",
		ordinalTimeTicks: "ordinalTimeTicks" in axis ? axis.ordinalTimeTicks : void 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: yTicks.map(({ value, offset }) => !instance.isYInside(offset) ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridLine, {
		y1: offset,
		y2: offset,
		x1: start,
		x2: end,
		className: classes.horizontalLine
	}, `horizontal-${value?.getTime?.() ?? value}`)) });
}
//#endregion
//#region node_modules/@mui/x-charts/ChartsGrid/ChartsGrid.mjs
var _excluded$1 = [
	"className",
	"vertical",
	"horizontal"
];
var useUtilityClasses = ({ classes }) => {
	return composeClasses({
		root: ["root"],
		verticalLine: ["line", "verticalLine"],
		horizontalLine: ["line", "horizontalLine"]
	}, getChartsGridUtilityClass, classes);
};
/**
* Demos:
*
* - [Axis](https://mui.com/x/react-charts/axis/)
*
* API:
*
* - [ChartsGrid API](https://mui.com/x/api/charts/charts-axis/)
*/
function ChartsGrid(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiChartsGrid"
	});
	const drawingArea = useDrawingArea();
	const { className, vertical, horizontal } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
	const { xAxis, xAxisIds } = useXAxes();
	const { yAxis, yAxisIds } = useYAxes();
	const classes = useUtilityClasses(props);
	const horizontalAxis = yAxis[yAxisIds[0]];
	const verticalAxis = xAxis[xAxisIds[0]];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GridRoot, _extends({}, other, {
		className: clsx(classes.root, className),
		children: [vertical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsGridVertical, {
			axis: verticalAxis,
			start: drawingArea.top,
			end: drawingArea.height + drawingArea.top,
			classes
		}), horizontal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsGridHorizontal, {
			axis: horizontalAxis,
			start: drawingArea.left,
			end: drawingArea.width + drawingArea.left,
			classes
		})]
	}));
}
ChartsGrid.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* Displays horizontal grid.
	*/
	horizontal: import_prop_types.default.bool,
	/**
	* Displays vertical grid.
	*/
	vertical: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarChart.plugins.mjs
var BAR_CHART_PLUGINS = [
	useChartZAxis,
	useChartBrush,
	useChartTooltip,
	useChartInteraction,
	useChartCartesianAxis,
	useChartHighlight,
	useChartVisibilityManager,
	useChartKeyboardNavigation
];
//#endregion
//#region node_modules/@mui/x-charts/BarChart/useBarChartProps.mjs
var _excluded = [
	"xAxis",
	"yAxis",
	"series",
	"width",
	"height",
	"margin",
	"colors",
	"dataset",
	"sx",
	"axisHighlight",
	"grid",
	"children",
	"slots",
	"slotProps",
	"skipAnimation",
	"loading",
	"layout",
	"onItemClick",
	"highlightedItem",
	"onHighlightChange",
	"borderRadius",
	"className",
	"hideLegend",
	"showToolbar",
	"brushConfig",
	"renderer"
];
/**
* A helper function that extracts BarChartProps from the input props
* and returns an object with props for the children components of BarChart.
*
* @param props The input props for BarChart
* @returns An object with props for the children components of BarChart
*/
var useBarChartProps = (props) => {
	const { xAxis, yAxis, series, width, height, margin, colors, dataset, sx, axisHighlight, grid, children, slots, slotProps, skipAnimation, loading, layout, onItemClick, highlightedItem, onHighlightChange, borderRadius, className, brushConfig, renderer } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	const clipPathId = `${useId()}-clip-path`;
	const hasHorizontalSeries = layout === "horizontal" || layout === void 0 && series.some((item) => item.layout === "horizontal");
	const defaultBandXAxis = import_react.useMemo(() => [{
		id: DEFAULT_X_AXIS_KEY,
		scaleType: "band",
		data: Array.from({ length: Math.max(...series.map((s) => (s.data ?? dataset ?? []).length)) }, (_, index) => index)
	}], [dataset, series]);
	const defaultBandYAxis = import_react.useMemo(() => [{
		id: DEFAULT_Y_AXIS_KEY,
		scaleType: "band",
		data: Array.from({ length: Math.max(...series.map((s) => (s.data ?? dataset ?? []).length)) }, (_, index) => index)
	}], [dataset, series]);
	const seriesWithDefault = import_react.useMemo(() => series.map((s) => _extends({ type: "bar" }, s, { layout: hasHorizontalSeries ? "horizontal" : "vertical" })), [hasHorizontalSeries, series]);
	const defaultXAxis = hasHorizontalSeries ? void 0 : defaultBandXAxis;
	const processedXAxis = import_react.useMemo(() => {
		if (!xAxis) return defaultXAxis;
		return hasHorizontalSeries ? xAxis : xAxis.map((axis) => _extends({ scaleType: "band" }, axis));
	}, [
		defaultXAxis,
		hasHorizontalSeries,
		xAxis
	]);
	const defaultYAxis = hasHorizontalSeries ? defaultBandYAxis : void 0;
	const chartsContainerProps = _extends({}, other, {
		series: seriesWithDefault,
		width,
		height,
		margin,
		colors,
		dataset,
		xAxis: processedXAxis,
		yAxis: import_react.useMemo(() => {
			if (!yAxis) return defaultYAxis;
			return hasHorizontalSeries ? yAxis.map((axis) => _extends({ scaleType: "band" }, axis)) : yAxis;
		}, [
			defaultYAxis,
			hasHorizontalSeries,
			yAxis
		]),
		highlightedItem,
		onHighlightChange,
		disableAxisListener: slotProps?.tooltip?.trigger !== "axis" && axisHighlight?.x === "none" && axisHighlight?.y === "none",
		skipAnimation,
		brushConfig,
		plugins: BAR_CHART_PLUGINS
	});
	const barPlotProps = {
		onItemClick,
		slots,
		slotProps,
		borderRadius,
		renderer
	};
	const gridProps = {
		vertical: grid?.vertical,
		horizontal: grid?.horizontal
	};
	const clipPathGroupProps = { clipPath: `url(#${clipPathId})` };
	const clipPathProps = { id: clipPathId };
	const overlayProps = {
		slots,
		slotProps,
		loading
	};
	const chartsAxisProps = {
		slots,
		slotProps
	};
	const axisHighlightProps = _extends({}, hasHorizontalSeries ? { y: "band" } : { x: "band" }, axisHighlight);
	const legendProps = {
		slots,
		slotProps
	};
	return {
		chartsWrapperProps: {
			sx,
			legendPosition: props.slotProps?.legend?.position,
			legendDirection: props.slotProps?.legend?.direction,
			hideLegend: props.hideLegend ?? false,
			className
		},
		chartsContainerProps,
		barPlotProps,
		gridProps,
		clipPathProps,
		clipPathGroupProps,
		overlayProps,
		chartsAxisProps,
		axisHighlightProps,
		legendProps,
		children
	};
};
//#endregion
//#region node_modules/@mui/x-charts/BarChart/FocusedBar.mjs
function FocusedBar(props) {
	const theme = useTheme();
	const focusedItem = useFocusedItem();
	const barSeries = useBarSeriesContext();
	const { xAxis, xAxisIds } = useXAxes();
	const { yAxis, yAxisIds } = useYAxes();
	if (focusedItem === null || focusedItem.type !== "bar" || !barSeries) return null;
	const series = barSeries.series[focusedItem.seriesId];
	if (!series || series.hidden) return null;
	if (series.data[focusedItem.dataIndex] == null) return null;
	const xAxisId = series.xAxisId ?? xAxisIds[0];
	const yAxisId = series.yAxisId ?? yAxisIds[0];
	const xAxisConfig = xAxis[xAxisId];
	const yAxisConfig = yAxis[yAxisId];
	const verticalLayout = barSeries.series[focusedItem.seriesId].layout === "vertical";
	const groupIndex = barSeries.stackingGroups.findIndex((group) => group.ids.includes(focusedItem.seriesId));
	const barDimensions = createGetBarDimensions({
		verticalLayout,
		xAxisConfig,
		yAxisConfig,
		series,
		numberOfGroups: barSeries.stackingGroups.length
	})(focusedItem.dataIndex, groupIndex);
	if (barDimensions === null) return null;
	const { x, y, height, width } = barDimensions;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", _extends({
		fill: "none",
		stroke: (theme.vars ?? theme).palette.text.primary,
		strokeWidth: 2,
		x: x - 3,
		y: y - 3,
		width: width + 6,
		height: height + 6,
		rx: 3,
		ry: 3
	}, props));
}
//#endregion
//#region node_modules/@mui/x-charts/BarChart/BarChart.mjs
/**
* Demos:
*
* - [Bars](https://mui.com/x/react-charts/bars/)
* - [Bar demonstration](https://mui.com/x/react-charts/bar-demo/)
* - [Stacking](https://mui.com/x/react-charts/stacking/)
*
* API:
*
* - [BarChart API](https://mui.com/x/api/charts/bar-chart/)
*/
var BarChart = /* @__PURE__ */ import_react.forwardRef(function BarChart(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiBarChart"
	});
	const { chartsWrapperProps, chartsContainerProps, barPlotProps, gridProps, clipPathProps, clipPathGroupProps, overlayProps, chartsAxisProps, axisHighlightProps, legendProps, children } = useBarChartProps(props);
	const { chartsDataProviderProps, chartsSurfaceProps } = useChartsContainerProps(chartsContainerProps);
	const Tooltip = props.slots?.tooltip ?? ChartsTooltip;
	const Toolbar = props.slots?.toolbar;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsDataProvider, _extends({}, chartsDataProviderProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartsWrapper, _extends({}, chartsWrapperProps, {
		ref,
		children: [
			props.showToolbar && Toolbar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, _extends({}, props.slotProps?.toolbar)) : null,
			!props.hideLegend && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsLegend, _extends({}, legendProps)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartsSurface, _extends({}, chartsSurfaceProps, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsGrid, _extends({}, gridProps)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", _extends({}, clipPathGroupProps, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarPlot, _extends({}, barPlotProps)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsOverlay, _extends({}, overlayProps)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsAxisHighlight, _extends({}, axisHighlightProps)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusedBar, {})
				] })),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsAxis, _extends({}, chartsAxisProps)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsClipPath, _extends({}, clipPathProps)),
				children
			] })),
			!props.loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, _extends({}, props.slotProps?.tooltip))
		]
	})) }));
});
BarChart.displayName = "BarChart";
BarChart.propTypes = {
	apiRef: import_prop_types.default.shape({ current: import_prop_types.default.object }),
	/**
	* A gap added between axes when multiple axes are rendered on the same side of the chart.
	* @default 0
	*/
	axesGap: import_prop_types.default.number,
	/**
	* The configuration of axes highlight.
	* Default is set to 'band' in the bar direction.
	* Depends on `layout` prop.
	* @see See {@link https://mui.com/x/react-charts/highlighting/ highlighting docs} for more details.
	*/
	axisHighlight: import_prop_types.default.shape({
		x: import_prop_types.default.oneOf([
			"band",
			"line",
			"none"
		]),
		y: import_prop_types.default.oneOf([
			"band",
			"line",
			"none"
		])
	}),
	/**
	* Defines the border radius of the bar element.
	*/
	borderRadius: import_prop_types.default.number,
	/**
	* Configuration for the brush interaction.
	*/
	brushConfig: import_prop_types.default.shape({
		enabled: import_prop_types.default.bool,
		preventHighlight: import_prop_types.default.bool,
		preventTooltip: import_prop_types.default.bool
	}),
	children: import_prop_types.default.node,
	className: import_prop_types.default.string,
	/**
	* Color palette used to colorize multiple series.
	* @default rainbowSurgePalette
	*/
	colors: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.string), import_prop_types.default.func]),
	/**
	* An array of objects that can be used to populate series and axes data using their `dataKey` property.
	*/
	dataset: import_prop_types.default.arrayOf(import_prop_types.default.object),
	/**
	* The description of the chart.
	* Used to provide an accessible description for the chart.
	*/
	desc: import_prop_types.default.string,
	/**
	* If `true`, the charts will not listen to the mouse move event.
	* It might break interactive features, but will improve performance.
	* @default false
	*/
	disableAxisListener: import_prop_types.default.bool,
	/**
	* If `true`, disables keyboard navigation for the chart.
	*/
	disableKeyboardNavigation: import_prop_types.default.bool,
	/**
	* Options to enable features planned for the next major.
	*/
	experimentalFeatures: import_prop_types.default.object,
	/**
	* Option to display a cartesian grid in the background.
	*/
	grid: import_prop_types.default.shape({
		horizontal: import_prop_types.default.bool,
		vertical: import_prop_types.default.bool
	}),
	/**
	* The height of the chart in px. If not defined, it takes the height of the parent element.
	*/
	height: import_prop_types.default.number,
	/**
	* List of hidden series and/or items.
	*
	* Different chart types use different keys.
	*
	* @example
	* ```ts
	* [
	*   {
	*     type: 'pie',
	*     seriesId: 'series-1',
	*     dataIndex: 3,
	*   },
	*   {
	*     type: 'line',
	*     seriesId: 'series-2',
	*   }
	* ]
	* ```
	*/
	hiddenItems: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["bar"]).isRequired
	}), import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["bar"])
	})]).isRequired),
	/**
	* If `true`, the legend is not rendered.
	*/
	hideLegend: import_prop_types.default.bool,
	/**
	* The controlled axis highlight.
	* Identified by the axis id, and data index.
	*/
	highlightedAxis: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		axisId: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]).isRequired,
		dataIndex: import_prop_types.default.number.isRequired
	})),
	/**
	* The highlighted item.
	* Used when the highlight is controlled.
	*/
	highlightedItem: import_prop_types.default.oneOfType([import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired
	}), import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["bar"]).isRequired
	})]),
	/**
	* This prop is used to help implement the accessibility logic.
	* If you don't provide this prop. It falls back to a randomly generated id.
	*/
	id: import_prop_types.default.string,
	/**
	* List of initially hidden series and/or items.
	* Used for uncontrolled state.
	*
	* Different chart types use different keys.
	*
	* @example
	* ```ts
	* [
	*   {
	*     type: 'pie',
	*     seriesId: 'series-1',
	*     dataIndex: 3,
	*   },
	*   {
	*     type: 'line',
	*     seriesId: 'series-2',
	*   }
	* ]
	* ```
	*/
	initialHiddenItems: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["bar"]).isRequired
	}), import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["bar"])
	})]).isRequired),
	/**
	* The direction of the bar elements.
	* @default 'vertical'
	*/
	layout: import_prop_types.default.oneOf(["horizontal", "vertical"]),
	/**
	* If `true`, a loading overlay is displayed.
	* @default false
	*/
	loading: import_prop_types.default.bool,
	/**
	* Localized text for chart components.
	*/
	localeText: import_prop_types.default.object,
	/**
	* The margin between the SVG and the drawing area.
	* It's used for leaving some space for extra information such as the x- and y-axis or legend.
	*
	* Accepts a `number` to be used on all sides or an object with the optional properties: `top`, `bottom`, `left`, and `right`.
	*/
	margin: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		bottom: import_prop_types.default.number,
		left: import_prop_types.default.number,
		right: import_prop_types.default.number,
		top: import_prop_types.default.number
	})]),
	/**
	* The function called for onClick events.
	* The second argument contains information about all line/bar elements at the current mouse position.
	* @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
	* @param {null | ChartsAxisData} data The data about the clicked axis and items associated with it.
	*/
	onAxisClick: import_prop_types.default.func,
	/**
	* Callback fired when any hidden identifiers change.
	* @param {VisibilityIdentifierWithType[]} hiddenItems The new list of hidden identifiers.
	*/
	onHiddenItemsChange: import_prop_types.default.func,
	/**
	* The callback fired when the highlighted item changes.
	*
	* @param {HighlightItemIdentifierWithType<SeriesType> | null} highlightedItem  The newly highlighted item.
	*/
	onHighlightChange: import_prop_types.default.func,
	/**
	* The function called when the pointer position corresponds to a new axis data item.
	* This update can either be caused by a pointer movement, or an axis update.
	* In case of multiple axes, the function is called if at least one axis is updated.
	* The argument contains the identifier for all axes with a `data` property.
	* @param {AxisItemIdentifier[]} axisItems The array of axes item identifiers.
	*/
	onHighlightedAxisChange: import_prop_types.default.func,
	/**
	* Callback fired when a bar item is clicked.
	* @param {MouseEvent | React.MouseEvent<SVGElement, MouseEvent>} event The event source of the callback.
	*        It is a native MouseEvent for `svg-batch` renderer and a React MouseEvent for `svg-single` renderer.
	* @param {BarItemIdentifier} barItemIdentifier The bar item identifier.
	*/
	onItemClick: import_prop_types.default.func,
	/**
	* The function called when the pointer position corresponds to a new axis data item.
	* This update can either be caused by a pointer movement, or an axis update.
	* In case of multiple axes, the function is called if at least one axis is updated.
	* The argument contains the identifier for all axes with a `data` property.
	* @param {AxisItemIdentifier[]} axisItems The array of axes item identifiers.
	*/
	onTooltipAxisChange: import_prop_types.default.func,
	/**
	* The callback fired when the tooltip item changes.
	*
	* @param {SeriesItemIdentifier<SeriesType> | null} tooltipItem  The newly highlighted item.
	*/
	onTooltipItemChange: import_prop_types.default.func,
	/**
	* The type of renderer to use for the bar plot.
	* - `svg-single`: Renders every bar in a `<rect />` element.
	* - `svg-batch`: Batch renders bars in `<path />` elements for better performance with large datasets, at the cost of some limitations.
	*                Read more: https://mui.com/x/react-charts/bars/#performance
	*
	* @default 'svg-single'
	*/
	renderer: import_prop_types.default.oneOf(["svg-batch", "svg-single"]),
	/**
	* The series to display in the bar chart.
	* An array of [[BarSeries]] objects.
	*/
	series: import_prop_types.default.arrayOf(import_prop_types.default.object).isRequired,
	/**
	* If true, shows the default chart toolbar.
	* @default false
	*/
	showToolbar: import_prop_types.default.bool,
	/**
	* If `true`, animations are skipped.
	* If unset or `false`, the animations respects the user's `prefers-reduced-motion` setting.
	*/
	skipAnimation: import_prop_types.default.bool,
	/**
	* The props used for each component slot.
	* @default {}
	*/
	slotProps: import_prop_types.default.object,
	/**
	* Overridable component slots.
	* @default {}
	*/
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	theme: import_prop_types.default.oneOf(["dark", "light"]),
	/**
	* The title of the chart.
	* Used to provide an accessible label for the chart.
	*/
	title: import_prop_types.default.string,
	/**
	* The controlled axis tooltip.
	* Identified by the axis id, and data index.
	*/
	tooltipAxis: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		axisId: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]).isRequired,
		dataIndex: import_prop_types.default.number.isRequired
	})),
	/**
	* The tooltip item.
	* Used when the tooltip is controlled.
	*/
	tooltipItem: import_prop_types.default.oneOfType([import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number.isRequired,
		seriesId: import_prop_types.default.string.isRequired
	}), import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number.isRequired,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["bar"]).isRequired
	})]),
	/**
	* The width of the chart in px. If not defined, it takes the width of the parent element.
	*/
	width: import_prop_types.default.number,
	/**
	* The configuration of the x-axes.
	* If not provided, a default axis config is used.
	* An array of [[AxisConfig]] objects.
	*/
	xAxis: import_prop_types.default.arrayOf(import_prop_types.default.object),
	/**
	* The configuration of the y-axes.
	* If not provided, a default axis config is used.
	* An array of [[AxisConfig]] objects.
	*/
	yAxis: import_prop_types.default.arrayOf(import_prop_types.default.object)
};
//#endregion
export { BAR_CHART_PLUGINS, BarChart, BarElement, BarLabel, BarPlot, FocusedBar, barClasses };

//# sourceMappingURL=@mui_x-charts_BarChart.js.map