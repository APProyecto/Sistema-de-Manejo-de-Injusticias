import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { Ar as require_prop_types, Or as composeClasses, _t as generateUtilityClass, gt as generateUtilityClasses, kr as clsx, sn as require_jsx_runtime, un as _extends } from "./system-BtmZd1DY.js";
import { i as useTheme, t as styled } from "./styled-SFJTYq9a.js";
import { f as useThemeProps } from "./styles-BJQjLzTu.js";
import { K as _objectWithoutPropertiesLoose, Q as useEventCallback } from "./useMediaQuery-Db58fz2_.js";
import { A as ANIMATION_TIMING_FUNCTION, C as min, D as tau, E as sqrt, Et as number_default, G as useChartsContext, I as selectorChartsHighlightStateCallback, J as useChartKeyboardNavigation, K as useChartHighlight, L as useAllSeriesOfType, O as constant_default, Ot as deg2rad, S as max, T as sin, Tt as useChartVisibilityManager, W as useStore, Y as useChartTooltip, _ as asin, a as getPieCoordinates, bt as selectorChartSeriesLayout, c as ChartsTooltip, f as useSkipAnimation, g as acos, h as abs, i as ChartsDataProvider, j as useItemHighlightState, k as useAnimate, l as getLabel, m as withPath, n as useChartsContainerProps, o as ChartsOverlay, p as useFocusedItem, r as ChartsSurface, rt as fastObjectShallowCompare, s as ChartsLegend, t as ChartsWrapper, ut as useChartInteraction, v as atan2, vt as DEFAULT_PIE_CHART_MARGIN, w as pi, x as halfPi, xt as defaultizeMargin, y as cos } from "./ChartsWrapper-D7aAyx_2.js";
//#region node_modules/@mui/x-charts/hooks/usePieSeries.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Get access to the internal state of pie series.
* The returned object contains:
* - series: a mapping from ids to series attributes.
* - seriesOrder: the array of series ids.
* @returns the pie series
*/
function usePieSeriesContext() {
	return useAllSeriesOfType("pie");
}
/**
* Get access to the pie layout.
* @returns {Record<SeriesId, PieSeriesLayout>} the pie layout
*/
function usePieSeriesLayout() {
	return useStore().use(selectorChartSeriesLayout).pie ?? {};
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/useItemHighlightStateGetter.mjs
/**
* A hook to get a callback that returns the highlight state of an item.
*
* If you're interested by a single item, consider using `useItemHighlightState`.
*
* @returns {(item: HighlightItemIdentifierWithType | null) => HighlightState} callback to get the highlight state of an item.
*/
function useItemHighlightStateGetter() {
	return useStore().use(selectorChartsHighlightStateCallback);
}
//#endregion
//#region node_modules/d3-shape/src/arc.js
function arcInnerRadius(d) {
	return d.innerRadius;
}
function arcOuterRadius(d) {
	return d.outerRadius;
}
function arcStartAngle(d) {
	return d.startAngle;
}
function arcEndAngle(d) {
	return d.endAngle;
}
function arcPadAngle(d) {
	return d && d.padAngle;
}
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
	if (t * t < 1e-12) return;
	t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
	return [x0 + t * x10, y0 + t * y10];
}
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
	if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
	return {
		cx: cx0,
		cy: cy0,
		x01: -ox,
		y01: -oy,
		x11: cx0 * (r1 / r - 1),
		y11: cy0 * (r1 / r - 1)
	};
}
function arc_default() {
	var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant_default(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null, path = withPath(arc);
	function arc() {
		var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da = abs(a1 - a0), cw = a1 > a0;
		if (!context) context = buffer = path();
		if (r1 < r0) r = r1, r1 = r0, r0 = r;
		if (!(r1 > 1e-12)) context.moveTo(0, 0);
		else if (da > tau - 1e-12) {
			context.moveTo(r1 * cos(a0), r1 * sin(a0));
			context.arc(0, 0, r1, a0, a1, !cw);
			if (r0 > 1e-12) {
				context.moveTo(r0 * cos(a1), r0 * sin(a1));
				context.arc(0, 0, r0, a1, a0, cw);
			}
		} else {
			var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > 1e-12 && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)), rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t0, t1;
			if (rp > 1e-12) {
				var p0 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
				if ((da0 -= p0 * 2) > 1e-12) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
				else da0 = 0, a00 = a10 = (a0 + a1) / 2;
				if ((da1 -= p1 * 2) > 1e-12) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
				else da1 = 0, a01 = a11 = (a0 + a1) / 2;
			}
			var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
			if (rc > 1e-12) {
				var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x00 = r0 * cos(a00), y00 = r0 * sin(a00), oc;
				if (da < pi) if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
					var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2), lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
					rc0 = min(rc, (r0 - lc) / (kc - 1));
					rc1 = min(rc, (r1 - lc) / (kc + 1));
				} else rc0 = rc1 = 0;
			}
			if (!(da1 > 1e-12)) context.moveTo(x01, y01);
			else if (rc1 > 1e-12) {
				t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
				t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
				context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
				if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
				else {
					context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
					context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
					context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
				}
			} else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
			if (!(r0 > 1e-12) || !(da0 > 1e-12)) context.lineTo(x10, y10);
			else if (rc0 > 1e-12) {
				t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
				t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
				context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
				if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);
				else {
					context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
					context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
					context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
				}
			} else context.arc(0, 0, r0, a10, a00, cw);
		}
		context.closePath();
		if (buffer) return context = null, buffer + "" || null;
	}
	arc.centroid = function() {
		var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
		return [cos(a) * r, sin(a) * r];
	};
	arc.innerRadius = function(_) {
		return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant_default(+_), arc) : innerRadius;
	};
	arc.outerRadius = function(_) {
		return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant_default(+_), arc) : outerRadius;
	};
	arc.cornerRadius = function(_) {
		return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant_default(+_), arc) : cornerRadius;
	};
	arc.padRadius = function(_) {
		return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant_default(+_), arc) : padRadius;
	};
	arc.startAngle = function(_) {
		return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default(+_), arc) : startAngle;
	};
	arc.endAngle = function(_) {
		return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default(+_), arc) : endAngle;
	};
	arc.padAngle = function(_) {
		return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default(+_), arc) : padAngle;
	};
	arc.context = function(_) {
		return arguments.length ? (context = _ == null ? null : _, arc) : context;
	};
	return arc;
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/animation/useAnimatePieArc.mjs
function pieArcPropsInterpolator(from, to) {
	const interpolateStartAngle = number_default(from.startAngle, to.startAngle);
	const interpolateEndAngle = number_default(from.endAngle, to.endAngle);
	const interpolateInnerRadius = number_default(from.innerRadius, to.innerRadius);
	const interpolateOuterRadius = number_default(from.outerRadius, to.outerRadius);
	const interpolatePaddingAngle = number_default(from.paddingAngle, to.paddingAngle);
	const interpolateCornerRadius = number_default(from.cornerRadius, to.cornerRadius);
	return (t) => {
		return {
			startAngle: interpolateStartAngle(t),
			endAngle: interpolateEndAngle(t),
			innerRadius: interpolateInnerRadius(t),
			outerRadius: interpolateOuterRadius(t),
			paddingAngle: interpolatePaddingAngle(t),
			cornerRadius: interpolateCornerRadius(t)
		};
	};
}
/** Animates a slice of a pie chart by increasing the start and end angles from the middle angle to their final values.
* The props object also accepts a `ref` which will be merged with the ref returned from this hook. This means you can
* pass the ref returned by this hook to the `path` element and the `ref` provided as argument will also be called. */
function useAnimatePieArc(props) {
	const initialProps = {
		startAngle: (props.startAngle + props.endAngle) / 2,
		endAngle: (props.startAngle + props.endAngle) / 2,
		innerRadius: props.innerRadius,
		outerRadius: props.outerRadius,
		paddingAngle: props.paddingAngle,
		cornerRadius: props.cornerRadius
	};
	return useAnimate({
		startAngle: props.startAngle,
		endAngle: props.endAngle,
		innerRadius: props.innerRadius,
		outerRadius: props.outerRadius,
		paddingAngle: props.paddingAngle,
		cornerRadius: props.cornerRadius
	}, {
		createInterpolator: pieArcPropsInterpolator,
		transformProps: (p) => ({
			d: arc_default().cornerRadius(p.cornerRadius)({
				padAngle: p.paddingAngle,
				innerRadius: p.innerRadius,
				outerRadius: p.outerRadius,
				startAngle: p.startAngle,
				endAngle: p.endAngle
			}),
			visibility: p.startAngle === p.endAngle ? "hidden" : "visible"
		}),
		applyProps(element, p) {
			element.setAttribute("d", p.d);
			element.setAttribute("visibility", p.visibility);
		},
		initialProps,
		skip: props.skipAnimation,
		ref: props.ref
	});
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/animation/useAnimatePieArcLabel.mjs
function pieArcLabelPropsInterpolator(from, to) {
	const interpolateStartAngle = number_default(from.startAngle, to.startAngle);
	const interpolateEndAngle = number_default(from.endAngle, to.endAngle);
	const interpolateArcLabelRadius = number_default(from.arcLabelRadius, to.arcLabelRadius);
	const interpolatePaddingAngle = number_default(from.paddingAngle, to.paddingAngle);
	const interpolateCornerRadius = number_default(from.cornerRadius, to.cornerRadius);
	return (t) => {
		return {
			startAngle: interpolateStartAngle(t),
			endAngle: interpolateEndAngle(t),
			arcLabelRadius: interpolateArcLabelRadius(t),
			paddingAngle: interpolatePaddingAngle(t),
			cornerRadius: interpolateCornerRadius(t)
		};
	};
}
/** Animates the label of pie slice from its middle point to the centroid of the slice.
* The props object also accepts a `ref` which will be merged with the ref returned from this hook. This means you can
* pass the ref returned by this hook to the `path` element and the `ref` provided as argument will also be called. */
function useAnimatePieArcLabel(props) {
	const initialProps = {
		startAngle: (props.startAngle + props.endAngle) / 2,
		endAngle: (props.startAngle + props.endAngle) / 2,
		arcLabelRadius: props.arcLabelRadius,
		paddingAngle: props.paddingAngle,
		cornerRadius: props.cornerRadius
	};
	return useAnimate({
		startAngle: props.startAngle,
		endAngle: props.endAngle,
		arcLabelRadius: props.arcLabelRadius,
		paddingAngle: props.paddingAngle,
		cornerRadius: props.cornerRadius
	}, {
		createInterpolator: pieArcLabelPropsInterpolator,
		transformProps: (animatedProps) => {
			const [x, y] = arc_default().cornerRadius(animatedProps.cornerRadius).centroid({
				padAngle: animatedProps.paddingAngle,
				startAngle: animatedProps.startAngle,
				endAngle: animatedProps.endAngle,
				innerRadius: animatedProps.arcLabelRadius,
				outerRadius: animatedProps.arcLabelRadius
			});
			return {
				x,
				y
			};
		},
		applyProps(element, { x, y }) {
			element.setAttribute("x", x.toString());
			element.setAttribute("y", y.toString());
		},
		initialProps,
		skip: props.skipAnimation,
		ref: props.ref
	});
}
//#endregion
//#region node_modules/@mui/x-charts/hooks/useInteractionItemProps.mjs
function onPointerDown(event) {
	if ("hasPointerCapture" in event.currentTarget && event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
}
var useInteractionItemProps = (data) => {
	const { instance } = useChartsContext();
	const interactionActive = import_react.useRef(false);
	const onPointerEnter = useEventCallback(() => {
		interactionActive.current = true;
		instance.setLastUpdateSource("pointer");
		instance.setTooltipItem(data);
		instance.setHighlight(data);
	});
	const onPointerLeave = useEventCallback(() => {
		interactionActive.current = false;
		instance.removeTooltipItem(data);
		instance.clearHighlight();
	});
	import_react.useEffect(() => {
		return () => {
			if (interactionActive.current) onPointerLeave();
		};
	}, [onPointerLeave]);
	return import_react.useMemo(() => ({
		onPointerEnter,
		onPointerLeave,
		onPointerDown
	}), [onPointerEnter, onPointerLeave]);
};
//#endregion
//#region node_modules/@mui/x-charts/PieChart/pieClasses.mjs
function getPieUtilityClass(slot) {
	return generateUtilityClass("MuiPieChart", slot);
}
var pieClasses = generateUtilityClasses("MuiPieChart", [
	"root",
	"series",
	"seriesLabels",
	"arc",
	"arcLabel",
	"animate",
	"focusIndicator"
]);
var useUtilityClasses = (options) => {
	const { classes, skipAnimation } = options ?? {};
	return composeClasses({
		root: ["root"],
		series: ["series"],
		seriesLabels: ["seriesLabels"],
		arc: ["arc"],
		arcLabel: ["arcLabel", !skipAnimation && "animate"],
		focusIndicator: ["focusIndicator"]
	}, getPieUtilityClass, classes);
};
//#endregion
//#region node_modules/@mui/x-charts/PieChart/PieArc.mjs
var _excluded$5 = [
	"className",
	"classes",
	"color",
	"dataIndex",
	"seriesId",
	"isFaded",
	"isHighlighted",
	"isFocused",
	"onClick",
	"cornerRadius",
	"startAngle",
	"endAngle",
	"innerRadius",
	"outerRadius",
	"paddingAngle",
	"skipAnimation",
	"stroke",
	"skipInteraction"
];
var PieArcRoot = styled("path", {
	name: "MuiPieArc",
	slot: "Root"
})({
	transitionProperty: "opacity, fill, filter",
	transitionDuration: `300ms`,
	transitionTimingFunction: ANIMATION_TIMING_FUNCTION
});
var PieArc = /* @__PURE__ */ import_react.forwardRef(function PieArc(props, ref) {
	const { className, classes: innerClasses, color, dataIndex, seriesId, isFaded, isHighlighted, isFocused, onClick, cornerRadius, startAngle, endAngle, innerRadius, outerRadius, paddingAngle, skipAnimation, stroke: strokeProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
	const theme = useTheme();
	const stroke = strokeProp ?? (theme.vars || theme).palette.background.paper;
	const ownerState = {
		seriesId,
		dataIndex,
		classes: innerClasses,
		color,
		isFaded,
		isHighlighted,
		isFocused
	};
	const classes = useUtilityClasses(ownerState);
	const interactionProps = useInteractionItemProps({
		type: "pie",
		seriesId,
		dataIndex
	});
	const animatedProps = useAnimatePieArc({
		cornerRadius,
		startAngle,
		endAngle,
		innerRadius,
		outerRadius,
		paddingAngle,
		skipAnimation,
		ref
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieArcRoot, _extends({
		onClick,
		cursor: onClick ? "pointer" : "unset",
		ownerState,
		className: clsx(classes.arc, className),
		fill: color,
		opacity: isFaded ? .3 : 1,
		filter: isHighlighted ? "brightness(120%)" : "none",
		stroke,
		strokeWidth: 1,
		strokeLinejoin: "round",
		"data-highlighted": isHighlighted || void 0,
		"data-faded": isFaded || void 0,
		"data-index": dataIndex
	}, other, interactionProps, animatedProps));
});
PieArc.displayName = "PieArc";
PieArc.propTypes = {
	classes: import_prop_types.default.object,
	cornerRadius: import_prop_types.default.number.isRequired,
	dataIndex: import_prop_types.default.number.isRequired,
	endAngle: import_prop_types.default.number.isRequired,
	innerRadius: import_prop_types.default.number.isRequired,
	isFaded: import_prop_types.default.bool.isRequired,
	isFocused: import_prop_types.default.bool.isRequired,
	isHighlighted: import_prop_types.default.bool.isRequired,
	outerRadius: import_prop_types.default.number.isRequired,
	paddingAngle: import_prop_types.default.number.isRequired,
	seriesId: import_prop_types.default.string.isRequired,
	/**
	* If `true`, the animation is disabled.
	*/
	skipAnimation: import_prop_types.default.bool,
	/**
	* If `true`, the default event handlers are disabled.
	* Those are used, for example, to display a tooltip or highlight the arc on hover.
	*/
	skipInteraction: import_prop_types.default.bool,
	startAngle: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/x-charts/hooks/useIsItemFocusedGetter.mjs
/**
* A hook to check focus state of multiple items.
* If you're interested by a single one, consider using `useIsItemFocused`.
*
* @returns {(item: FocusedItemData) => boolean} callback to get the state of the item.
*/
function useIsItemFocusedGetter() {
	const focusedItem = useFocusedItem();
	return (item) => focusedItem !== null && fastObjectShallowCompare(focusedItem, item);
}
//#endregion
//#region node_modules/@mui/x-charts/PieChart/dataTransform/getModifiedArcProperties.mjs
/**
* Function that returns arc properties after applying transformation from highlight/fade states.
*/
function getModifiedArcProperties(seriesDef, seriesLayout, isHighlighted, isFaded) {
	const { faded, highlighted, paddingAngle: basePaddingAngle = 0, cornerRadius: baseCornerRadius = 0 } = seriesDef;
	const { radius: { inner: baseInnerRadius = 0, label: baseArcLabelRadius, outer: baseOuterRadius } } = seriesLayout;
	const attributesOverride = _extends({ additionalRadius: 0 }, isFaded && faded || isHighlighted && highlighted || {});
	const paddingAngle = Math.max(0, deg2rad(attributesOverride.paddingAngle ?? basePaddingAngle));
	const innerRadius = Math.max(0, attributesOverride.innerRadius ?? baseInnerRadius);
	const outerRadius = Math.max(0, attributesOverride.outerRadius ?? baseOuterRadius + attributesOverride.additionalRadius);
	return {
		paddingAngle,
		innerRadius,
		outerRadius,
		cornerRadius: attributesOverride.cornerRadius ?? baseCornerRadius,
		arcLabelRadius: attributesOverride.arcLabelRadius ?? baseArcLabelRadius ?? (innerRadius + outerRadius) / 2
	};
}
//#endregion
//#region node_modules/@mui/x-charts/PieChart/dataTransform/useTransformData.mjs
function useTransformData(series) {
	const { id: seriesId, data, faded, highlighted } = series;
	const getHighlightState = useItemHighlightStateGetter();
	const isItemFocused = useIsItemFocusedGetter();
	return import_react.useMemo(() => data.map((item, itemIndex) => {
		const identifier = {
			type: "pie",
			seriesId,
			dataIndex: itemIndex
		};
		const highlightState = getHighlightState(identifier);
		const isHighlighted = highlightState === "highlighted";
		const isFaded = highlightState === "faded";
		const isFocused = isItemFocused(identifier);
		const arcSizes = getModifiedArcProperties(series, { radius: {
			inner: series.innerRadius ?? 0,
			outer: series.outerRadius,
			label: series.arcLabelRadius ?? 0,
			available: 0
		} }, isHighlighted, isFaded);
		return _extends({}, item, _extends({ additionalRadius: 0 }, isFaded && faded || isHighlighted && highlighted || {}), {
			dataIndex: itemIndex,
			isFaded,
			isHighlighted,
			isFocused
		}, arcSizes);
	}), [
		data,
		seriesId,
		getHighlightState,
		isItemFocused,
		series,
		faded,
		highlighted
	]);
}
//#endregion
//#region node_modules/@mui/x-charts/PieChart/PieArcPlot.mjs
var _excluded$4 = [
	"slots",
	"slotProps",
	"innerRadius",
	"outerRadius",
	"cornerRadius",
	"paddingAngle",
	"seriesId",
	"highlighted",
	"faded",
	"data",
	"onItemClick",
	"skipAnimation"
];
var PieArcPlotRoot = styled("g", {
	name: "MuiPieArcPlot",
	slot: "Root"
})();
function PieArcPlot(props) {
	const { slots, slotProps, innerRadius = 0, outerRadius, cornerRadius = 0, paddingAngle = 0, seriesId, highlighted, faded = { additionalRadius: -5 }, data, onItemClick, skipAnimation } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
	const transformedData = useTransformData({
		innerRadius,
		outerRadius,
		cornerRadius,
		paddingAngle,
		id: seriesId,
		highlighted,
		faded,
		data
	});
	if (data.length === 0) return null;
	const Arc = slots?.pieArc ?? PieArc;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieArcPlotRoot, _extends({}, other, { children: transformedData.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arc, _extends({
		startAngle: item.startAngle,
		endAngle: item.endAngle,
		paddingAngle: item.paddingAngle,
		innerRadius: item.innerRadius,
		outerRadius: item.outerRadius,
		cornerRadius: item.cornerRadius,
		skipAnimation: skipAnimation ?? false,
		seriesId,
		color: item.color,
		dataIndex: index,
		isFaded: item.isFaded,
		isHighlighted: item.isHighlighted,
		isFocused: item.isFocused,
		onClick: onItemClick && ((event) => {
			onItemClick(event, {
				type: "pie",
				seriesId,
				dataIndex: index
			}, item);
		})
	}, slotProps?.pieArc), item.dataIndex)) }));
}
PieArcPlot.propTypes = {
	/**
	* The radius between circle center and the arc label in px.
	* @default (innerRadius - outerRadius) / 2
	*/
	arcLabelRadius: import_prop_types.default.number,
	/**
	* The radius applied to arc corners (similar to border radius).
	* @default 0
	*/
	cornerRadius: import_prop_types.default.number,
	data: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		color: import_prop_types.default.string.isRequired,
		endAngle: import_prop_types.default.number.isRequired,
		formattedValue: import_prop_types.default.string.isRequired,
		id: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
		index: import_prop_types.default.number.isRequired,
		label: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]),
		labelMarkType: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
			"circle",
			"line",
			"square"
		]), import_prop_types.default.func]),
		padAngle: import_prop_types.default.number.isRequired,
		startAngle: import_prop_types.default.number.isRequired,
		value: import_prop_types.default.number.isRequired
	})).isRequired,
	/**
	* Override the arc attributes when it is faded.
	* @default { additionalRadius: -5 }
	*/
	faded: import_prop_types.default.shape({
		additionalRadius: import_prop_types.default.number,
		arcLabelRadius: import_prop_types.default.number,
		color: import_prop_types.default.string,
		cornerRadius: import_prop_types.default.number,
		innerRadius: import_prop_types.default.number,
		outerRadius: import_prop_types.default.number,
		paddingAngle: import_prop_types.default.number
	}),
	/**
	* Override the arc attributes when it is highlighted.
	*/
	highlighted: import_prop_types.default.shape({
		additionalRadius: import_prop_types.default.number,
		arcLabelRadius: import_prop_types.default.number,
		color: import_prop_types.default.string,
		cornerRadius: import_prop_types.default.number,
		innerRadius: import_prop_types.default.number,
		outerRadius: import_prop_types.default.number,
		paddingAngle: import_prop_types.default.number
	}),
	/**
	* The id of this series.
	*/
	seriesId: import_prop_types.default.string.isRequired,
	/**
	* The radius between circle center and the beginning of the arc.
	* @default 0
	*/
	innerRadius: import_prop_types.default.number,
	/**
	* Callback fired when a pie item is clicked.
	* @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
	* @param {PieItemIdentifier} pieItemIdentifier The pie item identifier.
	* @param {DefaultizedPieValueType} item The pie item.
	*/
	onItemClick: import_prop_types.default.func,
	/**
	* The radius between circle center and the end of the arc.
	*/
	outerRadius: import_prop_types.default.number.isRequired,
	/**
	* The padding angle (deg) between two arcs.
	* @default 0
	*/
	paddingAngle: import_prop_types.default.number,
	/**
	* If `true`, animations are skipped.
	* @default false
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
//#region node_modules/@mui/x-charts/PieChart/PieArcLabel.mjs
var _excluded$3 = [
	"seriesId",
	"classes",
	"color",
	"startAngle",
	"endAngle",
	"paddingAngle",
	"arcLabelRadius",
	"cornerRadius",
	"formattedArcLabel",
	"isHighlighted",
	"isFaded",
	"skipAnimation",
	"hidden",
	"className"
];
var PieArcLabelRoot = styled("text", {
	name: "MuiPieArcLabel",
	slot: "Root"
})(({ theme }) => ({
	fill: (theme.vars || theme).palette.text.primary,
	textAnchor: "middle",
	dominantBaseline: "middle",
	pointerEvents: "none",
	animationName: "animate-opacity",
	animationDuration: "0s",
	animationTimingFunction: ANIMATION_TIMING_FUNCTION,
	transitionDuration: `300ms`,
	transitionProperty: "opacity",
	transitionTimingFunction: ANIMATION_TIMING_FUNCTION,
	[`&.${pieClasses.animate}`]: { animationDuration: `300ms` },
	"@keyframes animate-opacity": { from: { opacity: 0 } }
}));
var PieArcLabel = /* @__PURE__ */ import_react.forwardRef(function PieArcLabel(props, ref) {
	const { seriesId, classes: innerClasses, color, startAngle, endAngle, paddingAngle, arcLabelRadius, cornerRadius, formattedArcLabel, isHighlighted, isFaded, skipAnimation, hidden, className } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
	const classes = useUtilityClasses({
		seriesId,
		classes: innerClasses,
		color,
		isFaded,
		isHighlighted,
		skipAnimation
	});
	const animatedProps = useAnimatePieArcLabel({
		cornerRadius,
		startAngle,
		endAngle,
		arcLabelRadius,
		paddingAngle,
		skipAnimation,
		ref
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieArcLabelRoot, _extends({
		className: clsx(classes.arcLabel, className),
		"data-highlighted": isHighlighted || void 0,
		"data-faded": isFaded || void 0
	}, other, animatedProps, {
		opacity: hidden ? 0 : 1,
		children: formattedArcLabel
	}));
});
PieArcLabel.displayName = "PieArcLabel";
PieArcLabel.propTypes = {
	arcLabelRadius: import_prop_types.default.number.isRequired,
	classes: import_prop_types.default.object,
	color: import_prop_types.default.string.isRequired,
	cornerRadius: import_prop_types.default.number.isRequired,
	endAngle: import_prop_types.default.number.isRequired,
	formattedArcLabel: import_prop_types.default.string,
	hidden: import_prop_types.default.bool,
	isFaded: import_prop_types.default.bool.isRequired,
	isHighlighted: import_prop_types.default.bool.isRequired,
	paddingAngle: import_prop_types.default.number.isRequired,
	seriesId: import_prop_types.default.string.isRequired,
	skipAnimation: import_prop_types.default.bool.isRequired,
	startAngle: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/x-charts/PieChart/PieArcLabelPlot.mjs
var _excluded$2 = [
	"arcLabel",
	"arcLabelMinAngle",
	"arcLabelRadius",
	"cornerRadius",
	"data",
	"faded",
	"highlighted",
	"seriesId",
	"innerRadius",
	"outerRadius",
	"paddingAngle",
	"skipAnimation",
	"slotProps",
	"slots"
];
var RATIO = 180 / Math.PI;
function getItemLabel(arcLabel, arcLabelMinAngle, item) {
	if (!arcLabel) return null;
	if ((item.endAngle - item.startAngle) * RATIO < arcLabelMinAngle) return null;
	switch (arcLabel) {
		case "label": return getLabel(item.label, "arc");
		case "value": return item.value?.toString();
		case "formattedValue": return item.formattedValue;
		default: return arcLabel(_extends({}, item, { label: getLabel(item.label, "arc") }));
	}
}
var PieArcLabelPlotRoot = styled("g", {
	name: "MuiPieArcLabelPlot",
	slot: "Root"
})();
function PieArcLabelPlot(props) {
	const { arcLabel, arcLabelMinAngle = 0, arcLabelRadius, cornerRadius = 0, data, faded = { additionalRadius: -5 }, highlighted, seriesId, innerRadius, outerRadius, paddingAngle = 0, skipAnimation, slotProps, slots } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
	const transformedData = useTransformData({
		innerRadius,
		outerRadius,
		arcLabelRadius,
		cornerRadius,
		paddingAngle,
		id: seriesId,
		highlighted,
		faded,
		data
	});
	if (data.length === 0) return null;
	const ArcLabel = slots?.pieArcLabel ?? PieArcLabel;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieArcLabelPlotRoot, _extends({}, other, { children: transformedData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArcLabel, _extends({
		startAngle: item.startAngle,
		endAngle: item.endAngle,
		paddingAngle: item.paddingAngle,
		arcLabelRadius: item.arcLabelRadius,
		cornerRadius: item.cornerRadius,
		hidden: item.hidden,
		seriesId,
		color: item.color,
		isFaded: item.isFaded,
		isHighlighted: item.isHighlighted,
		formattedArcLabel: getItemLabel(arcLabel, arcLabelMinAngle, item),
		skipAnimation: skipAnimation ?? false
	}, slotProps?.pieArcLabel), item.id ?? item.dataIndex)) }));
}
PieArcLabelPlot.propTypes = {
	/**
	* The label displayed into the arc.
	*/
	arcLabel: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"formattedValue",
		"label",
		"value"
	]), import_prop_types.default.func]),
	/**
	* The minimal angle required to display the arc label.
	* @default 0
	*/
	arcLabelMinAngle: import_prop_types.default.number,
	/**
	* The radius between circle center and the arc label in px.
	* @default (innerRadius - outerRadius) / 2
	*/
	arcLabelRadius: import_prop_types.default.number,
	/**
	* The radius applied to arc corners (similar to border radius).
	* @default 0
	*/
	cornerRadius: import_prop_types.default.number,
	data: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		color: import_prop_types.default.string.isRequired,
		endAngle: import_prop_types.default.number.isRequired,
		formattedValue: import_prop_types.default.string.isRequired,
		id: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
		index: import_prop_types.default.number.isRequired,
		label: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]),
		labelMarkType: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
			"circle",
			"line",
			"square"
		]), import_prop_types.default.func]),
		padAngle: import_prop_types.default.number.isRequired,
		startAngle: import_prop_types.default.number.isRequired,
		value: import_prop_types.default.number.isRequired
	})).isRequired,
	/**
	* Override the arc attributes when it is faded.
	* @default { additionalRadius: -5 }
	*/
	faded: import_prop_types.default.shape({
		additionalRadius: import_prop_types.default.number,
		arcLabelRadius: import_prop_types.default.number,
		color: import_prop_types.default.string,
		cornerRadius: import_prop_types.default.number,
		innerRadius: import_prop_types.default.number,
		outerRadius: import_prop_types.default.number,
		paddingAngle: import_prop_types.default.number
	}),
	/**
	* Override the arc attributes when it is highlighted.
	*/
	highlighted: import_prop_types.default.shape({
		additionalRadius: import_prop_types.default.number,
		arcLabelRadius: import_prop_types.default.number,
		color: import_prop_types.default.string,
		cornerRadius: import_prop_types.default.number,
		innerRadius: import_prop_types.default.number,
		outerRadius: import_prop_types.default.number,
		paddingAngle: import_prop_types.default.number
	}),
	/**
	* The id of this series.
	*/
	seriesId: import_prop_types.default.string.isRequired,
	/**
	* The radius between circle center and the beginning of the arc.
	* @default 0
	*/
	innerRadius: import_prop_types.default.number,
	/**
	* The radius between circle center and the end of the arc.
	*/
	outerRadius: import_prop_types.default.number.isRequired,
	/**
	* The padding angle (deg) between two arcs.
	* @default 0
	*/
	paddingAngle: import_prop_types.default.number,
	/**
	* If `true`, animations are skipped.
	* @default false
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
//#region node_modules/@mui/x-charts/PieChart/PiePlot.mjs
/**
* Demos:
*
* - [Pie](https://mui.com/x/react-charts/pie/)
* - [Pie demonstration](https://mui.com/x/react-charts/pie-demo/)
*
* API:
*
* - [PiePlot API](https://mui.com/x/api/charts/pie-plot/)
*/
function PiePlot(props) {
	const { skipAnimation: inSkipAnimation, slots, slotProps, onItemClick, className } = props;
	const seriesData = usePieSeriesContext();
	const seriesLayout = usePieSeriesLayout();
	const skipAnimation = useSkipAnimation(inSkipAnimation);
	const classes = useUtilityClasses();
	if (seriesData === void 0) return null;
	const { series, seriesOrder } = seriesData;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: clsx(classes.root, className),
		children: [seriesOrder.map((seriesId) => {
			const { cornerRadius, paddingAngle, data, highlighted, faded } = series[seriesId];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: classes.series,
				transform: `translate(${seriesLayout[seriesId].center.x}, ${seriesLayout[seriesId].center.y})`,
				"data-series": seriesId,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieArcPlot, {
					innerRadius: seriesLayout[seriesId].radius.inner,
					outerRadius: seriesLayout[seriesId].radius.outer,
					cornerRadius,
					paddingAngle,
					seriesId,
					data,
					skipAnimation,
					highlighted,
					faded,
					onItemClick,
					slots,
					slotProps
				})
			}, seriesId);
		}), seriesOrder.map((seriesId) => {
			const { cornerRadius, paddingAngle, arcLabel, arcLabelMinAngle, data } = series[seriesId];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: classes.seriesLabels,
				transform: `translate(${seriesLayout[seriesId].center.x}, ${seriesLayout[seriesId].center.y})`,
				"data-series": seriesId,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieArcLabelPlot, {
					innerRadius: seriesLayout[seriesId].radius.inner,
					outerRadius: seriesLayout[seriesId].radius.outer,
					arcLabelRadius: seriesLayout[seriesId].radius.label,
					cornerRadius,
					paddingAngle,
					seriesId,
					data,
					skipAnimation,
					arcLabel,
					arcLabelMinAngle,
					slots,
					slotProps
				})
			}, seriesId);
		})]
	});
}
PiePlot.propTypes = {
	/**
	* Callback fired when a pie item is clicked.
	* @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
	* @param {PieItemIdentifier} pieItemIdentifier The pie item identifier.
	* @param {DefaultizedPieValueType} item The pie item.
	*/
	onItemClick: import_prop_types.default.func,
	/**
	* If `true`, animations are skipped.
	* @default false
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
//#region node_modules/@mui/x-charts/PieChart/PieChart.plugins.mjs
var PIE_CHART_PLUGINS = [
	useChartTooltip,
	useChartInteraction,
	useChartHighlight,
	useChartVisibilityManager,
	useChartKeyboardNavigation
];
//#endregion
//#region node_modules/@mui/x-charts/PieChart/FocusedPieArc.mjs
var _excluded$1 = ["arcLabelRadius"];
function FocusedPieArc(props) {
	const theme = useTheme();
	const focusedItem = useFocusedItem();
	const pieSeriesLayout = usePieSeriesLayout();
	const highlightState = useItemHighlightState(focusedItem);
	const isHighlighted = highlightState === "highlighted";
	const isFaded = highlightState === "faded";
	const pieSeries = usePieSeriesContext();
	const classes = useUtilityClasses();
	if (focusedItem === null || focusedItem.type !== "pie" || !pieSeries) return null;
	const series = pieSeries?.series[focusedItem.seriesId];
	const { center, radius } = pieSeriesLayout[focusedItem.seriesId];
	if (!series || !center || !radius) return null;
	const item = series.data[focusedItem.dataIndex];
	if (!item || item.hidden) return null;
	const arcSizes = _objectWithoutPropertiesLoose(getModifiedArcProperties(series, pieSeriesLayout[focusedItem.seriesId], isHighlighted, isFaded), _excluded$1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieArc, _extends({
		transform: `translate(${pieSeriesLayout[series.id].center.x}, ${pieSeriesLayout[series.id].center.y})`,
		startAngle: item.startAngle,
		endAngle: item.endAngle,
		color: "transparent",
		pointerEvents: "none",
		skipInteraction: true,
		skipAnimation: true,
		stroke: (theme.vars ?? theme).palette.text.primary,
		seriesId: series.id,
		className: classes.focusIndicator,
		dataIndex: focusedItem.dataIndex,
		isFaded: false,
		isHighlighted: false,
		isFocused: false,
		strokeWidth: 3
	}, arcSizes, props));
}
//#endregion
//#region node_modules/@mui/x-charts/PieChart/PieChart.mjs
var _excluded = [
	"series",
	"width",
	"height",
	"margin",
	"colors",
	"sx",
	"skipAnimation",
	"hideLegend",
	"children",
	"slots",
	"slotProps",
	"onItemClick",
	"loading",
	"highlightedItem",
	"onHighlightChange",
	"className",
	"showToolbar"
];
/**
* Demos:
*
* - [Pie](https://mui.com/x/react-charts/pie/)
* - [Pie demonstration](https://mui.com/x/react-charts/pie-demo/)
*
* API:
*
* - [PieChart API](https://mui.com/x/api/charts/pie-chart/)
*/
var PieChart = /* @__PURE__ */ import_react.forwardRef(function PieChart(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPieChart"
	});
	const { series, width, height, margin: marginProps, colors, sx, skipAnimation, hideLegend, children, slots, slotProps, onItemClick, loading, highlightedItem, onHighlightChange, className, showToolbar } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	const margin = defaultizeMargin(marginProps, DEFAULT_PIE_CHART_MARGIN);
	const { chartsDataProviderProps, chartsSurfaceProps } = useChartsContainerProps(_extends({}, other, {
		series: series.map((s) => _extends({ type: "pie" }, s)),
		width,
		height,
		margin,
		colors,
		highlightedItem,
		onHighlightChange,
		skipAnimation,
		plugins: PIE_CHART_PLUGINS
	}));
	const Tooltip = slots?.tooltip ?? ChartsTooltip;
	const Toolbar = slots?.toolbar;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsDataProvider, _extends({}, chartsDataProviderProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartsWrapper, {
		legendPosition: slotProps?.legend?.position,
		legendDirection: slotProps?.legend?.direction ?? "vertical",
		sx,
		hideLegend: hideLegend ?? false,
		className,
		ref,
		children: [
			showToolbar && Toolbar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, _extends({}, slotProps?.toolbar)) : null,
			!hideLegend && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsLegend, {
				direction: slotProps?.legend?.direction ?? "vertical",
				slots,
				slotProps
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartsSurface, _extends({}, chartsSurfaceProps, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiePlot, {
					slots,
					slotProps,
					onItemClick
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusedPieArc, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsOverlay, {
					loading,
					slots,
					slotProps
				}),
				children
			] })),
			!loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, _extends({ trigger: "item" }, slotProps?.tooltip))
		]
	}) }));
});
PieChart.displayName = "PieChart";
PieChart.propTypes = {
	apiRef: import_prop_types.default.shape({ current: import_prop_types.default.object }),
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
	* If `true`, disables keyboard navigation for the chart.
	*/
	disableKeyboardNavigation: import_prop_types.default.bool,
	/**
	* Options to enable features planned for the next major.
	*/
	experimentalFeatures: import_prop_types.default.object,
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
		type: import_prop_types.default.oneOf(["pie"]).isRequired
	}), import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["pie"])
	})]).isRequired),
	/**
	* If `true`, the legend is not rendered.
	*/
	hideLegend: import_prop_types.default.bool,
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
		type: import_prop_types.default.oneOf(["pie"]).isRequired
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
		type: import_prop_types.default.oneOf(["pie"]).isRequired
	}), import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["pie"])
	})]).isRequired),
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
	* Callback fired when a pie arc is clicked.
	*/
	onItemClick: import_prop_types.default.func,
	/**
	* The callback fired when the tooltip item changes.
	*
	* @param {SeriesItemIdentifier<SeriesType> | null} tooltipItem  The newly highlighted item.
	*/
	onTooltipItemChange: import_prop_types.default.func,
	/**
	* The series to display in the pie chart.
	* An array of [[PieSeries]] objects.
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
	* The tooltip item.
	* Used when the tooltip is controlled.
	*/
	tooltipItem: import_prop_types.default.oneOfType([import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number.isRequired,
		seriesId: import_prop_types.default.string.isRequired
	}), import_prop_types.default.shape({
		dataIndex: import_prop_types.default.number.isRequired,
		seriesId: import_prop_types.default.string.isRequired,
		type: import_prop_types.default.oneOf(["pie"]).isRequired
	})]),
	/**
	* The width of the chart in px. If not defined, it takes the width of the parent element.
	*/
	width: import_prop_types.default.number
};
//#endregion
export { FocusedPieArc, PIE_CHART_PLUGINS, PieArc, PieArcLabel, PieArcLabelPlot, PieArcPlot, PieChart, PiePlot, getPieCoordinates, pieClasses };

//# sourceMappingURL=@mui_x-charts_PieChart.js.map