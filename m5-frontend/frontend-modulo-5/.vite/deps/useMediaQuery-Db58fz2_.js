import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { Ar as require_prop_types, L as useRtl, N as useId, Or as composeClasses, R as exactProp, Tr as require_react_is, _t as generateUtilityClass, cn as css, gt as generateUtilityClasses, it as unstable_createUseMediaQuery, kr as clsx, ln as keyframes, lt as resolveProps, m as isMuiElement, ot as useEnhancedEffect, sn as require_jsx_runtime, un as _extends, yt as ClassNameGenerator } from "./system-BtmZd1DY.js";
import { a as capitalize_default, n as memoTheme, t as useDefaultProps } from "./DefaultPropsProvider-DbF6HWWd.js";
import { a as identifier_default, n as rootShouldForwardProp, t as styled } from "./styled-SFJTYq9a.js";
import { i as appendOwnerState, o as isEventHandler, r as resolveComponentProps, s as useForkRef, t as mergeSlotProps$1 } from "./mergeSlotProps-Cerp6S_Y.js";
import { t as require_react_dom } from "./react-dom-B-MQ20_l.js";
//#region node_modules/@mui/utils/createChainedFunction/createChainedFunction.mjs
/**
* Safe chained function.
*
* Will only create a new function if needed,
* otherwise will pass back existing functions or null.
*/
function createChainedFunction(...funcs) {
	return funcs.reduce((acc, func) => {
		if (func == null) return acc;
		return function chainedFunction(...args) {
			acc.apply(this, args);
			func.apply(this, args);
		};
	}, () => {});
}
//#endregion
//#region node_modules/@mui/material/utils/createChainedFunction.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_jsx_runtime = require_jsx_runtime();
var createChainedFunction_default = createChainedFunction;
//#endregion
//#region node_modules/@mui/utils/debounce/debounce.mjs
function debounce$1(func, wait = 166) {
	let timeout;
	function debounced(...args) {
		const later = () => {
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}
	debounced.clear = () => {
		clearTimeout(timeout);
	};
	return debounced;
}
//#endregion
//#region node_modules/@mui/material/utils/debounce.mjs
var debounce_default = debounce$1;
//#endregion
//#region node_modules/@mui/utils/deprecatedPropType/deprecatedPropType.mjs
function deprecatedPropType(validator, reason) {
	return (props, propName, componentName, location, propFullName) => {
		const componentNameSafe = componentName || "<<anonymous>>";
		const propFullNameSafe = propFullName || propName;
		if (typeof props[propName] !== "undefined") return /* @__PURE__ */ new Error(`The ${location} \`${propFullNameSafe}\` of \`${componentNameSafe}\` is deprecated. ${reason}`);
		return null;
	};
}
//#endregion
//#region node_modules/@mui/material/utils/deprecatedPropType.mjs
var deprecatedPropType_default = deprecatedPropType;
//#endregion
//#region node_modules/@mui/material/utils/isMuiElement.mjs
var isMuiElement_default = isMuiElement;
//#endregion
//#region node_modules/@mui/utils/getActiveElement/getActiveElement.mjs
/**
* Gets the actual active element, traversing through shadow roots if necessary.
*
* When an element inside a shadow root has focus, `document.activeElement` returns
* the shadow host element. This function recursively traverses shadow roots to find
* the actual focused element.
*
* @param root - The document or shadow root to start the search from.
* @returns The actual focused element, or null if no element has focus.
*
* @example
* // In a shadow DOM context
* const activeElement = getActiveElement(document);
* // Returns the actual focused element inside the shadow root
*
* @example
* // Starting from a specific document
* const activeElement = getActiveElement(ownerDocument(element));
*/
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
//#endregion
//#region node_modules/@mui/material/utils/getActiveElement.mjs
var getActiveElement_default = activeElement;
//#endregion
//#region node_modules/@mui/utils/ownerDocument/ownerDocument.mjs
function ownerDocument(node) {
	return node && node.ownerDocument || document;
}
//#endregion
//#region node_modules/@mui/material/utils/ownerDocument.mjs
var ownerDocument_default = ownerDocument;
//#endregion
//#region node_modules/@mui/utils/ownerWindow/ownerWindow.mjs
function ownerWindow(node) {
	return ownerDocument(node).defaultView || window;
}
//#endregion
//#region node_modules/@mui/material/utils/ownerWindow.mjs
var ownerWindow_default = ownerWindow;
//#endregion
//#region node_modules/@mui/utils/requirePropFactory/requirePropFactory.mjs
function requirePropFactory(componentNameInError, Component) {
	const prevPropTypes = Component ? { ...Component.propTypes } : null;
	const requireProp = (requiredProp) => (props, propName, componentName, location, propFullName, ...args) => {
		const propFullNameSafe = propFullName || propName;
		const defaultTypeChecker = prevPropTypes?.[propFullNameSafe];
		if (defaultTypeChecker) {
			const typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);
			if (typeCheckerResult) return typeCheckerResult;
		}
		if (typeof props[propName] !== "undefined" && !props[requiredProp]) return /* @__PURE__ */ new Error(`The prop \`${propFullNameSafe}\` of \`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`);
		return null;
	};
	return requireProp;
}
//#endregion
//#region node_modules/@mui/material/utils/requirePropFactory.mjs
var requirePropFactory_default = requirePropFactory;
//#endregion
//#region node_modules/@mui/utils/setRef/setRef.mjs
/**
* TODO v5: consider making it private
*
* passes {value} to {ref}
*
* WARNING: Be sure to only call this inside a callback that is passed as a ref.
* Otherwise, make sure to cleanup the previous {ref} if it changes. See
* https://github.com/mui/material-ui/issues/13539
*
* Useful if you want to expose the ref of an inner component to the public API
* while still using it inside the component.
* @param ref A ref callback or ref object. If anything falsy, this is a no-op.
*/
function setRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
}
//#endregion
//#region node_modules/@mui/material/utils/setRef.mjs
var setRef_default = setRef;
//#endregion
//#region node_modules/@mui/material/utils/useEnhancedEffect.mjs
var useEnhancedEffect_default = useEnhancedEffect;
//#endregion
//#region node_modules/@mui/material/utils/useId.mjs
var useId_default = useId;
//#endregion
//#region node_modules/@mui/utils/unsupportedProp/unsupportedProp.mjs
function unsupportedProp(props, propName, componentName, location, propFullName) {
	const propFullNameSafe = propFullName || propName;
	if (typeof props[propName] !== "undefined") return /* @__PURE__ */ new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
	return null;
}
//#endregion
//#region node_modules/@mui/material/utils/unsupportedProp.mjs
var unsupportedProp_default = unsupportedProp;
//#endregion
//#region node_modules/@mui/utils/useControlled/useControlled.mjs
function useControlled(props) {
	const { controlled, default: defaultProp, name, state = "value" } = props;
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	const value = isControlled ? controlled : valueState;
	{
		import_react.useEffect(() => {
			if (isControlled !== (controlled !== void 0)) console.error([
				`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`,
				"Elements should not switch from uncontrolled to controlled (or vice versa).",
				`Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`,
				"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
				"More info: https://fb.me/react-controlled-components"
			].join("\n"));
		}, [
			state,
			name,
			controlled
		]);
		const { current: defaultValue } = import_react.useRef(defaultProp);
		import_react.useEffect(() => {
			if (!isControlled && JSON.stringify(defaultProp) !== JSON.stringify(defaultValue)) console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
		}, [JSON.stringify(defaultProp)]);
	}
	return [value, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
//#endregion
//#region node_modules/@mui/material/utils/useControlled.mjs
var useControlled_default = useControlled;
//#endregion
//#region node_modules/@mui/utils/useEventCallback/useEventCallback.mjs
/**
* Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
* See RFC in https://github.com/reactjs/rfcs/pull/220
*/
function useEventCallback(fn) {
	const ref = import_react.useRef(fn);
	useEnhancedEffect(() => {
		ref.current = fn;
	});
	return import_react.useRef((...args) => (0, ref.current)(...args)).current;
}
//#endregion
//#region node_modules/@mui/material/utils/useEventCallback.mjs
var useEventCallback_default = useEventCallback;
//#endregion
//#region node_modules/@mui/material/utils/useForkRef.mjs
var useForkRef_default = useForkRef;
//#endregion
//#region node_modules/@mui/material/utils/mergeSlotProps.mjs
function mergeSlotProps(externalSlotProps, defaultSlotProps) {
	if (!externalSlotProps) return defaultSlotProps;
	function extractHandlers(externalSlotPropsValue, defaultSlotPropsValue) {
		const handlers = {};
		Object.keys(defaultSlotPropsValue).forEach((key) => {
			if (isEventHandler(key, defaultSlotPropsValue[key]) && typeof externalSlotPropsValue[key] === "function") handlers[key] = (...args) => {
				externalSlotPropsValue[key](...args);
				defaultSlotPropsValue[key](...args);
			};
		});
		return handlers;
	}
	if (typeof externalSlotProps === "function" || typeof defaultSlotProps === "function") return (ownerState) => {
		const defaultSlotPropsValue = typeof defaultSlotProps === "function" ? defaultSlotProps(ownerState) : defaultSlotProps;
		const externalSlotPropsValue = typeof externalSlotProps === "function" ? externalSlotProps({
			...ownerState,
			...defaultSlotPropsValue
		}) : externalSlotProps;
		const className = clsx(ownerState?.className, defaultSlotPropsValue?.className, externalSlotPropsValue?.className);
		const handlers = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);
		return {
			...defaultSlotPropsValue,
			...externalSlotPropsValue,
			...handlers,
			...!!className && { className },
			...defaultSlotPropsValue?.style && externalSlotPropsValue?.style && { style: {
				...defaultSlotPropsValue.style,
				...externalSlotPropsValue.style
			} },
			...defaultSlotPropsValue?.sx && externalSlotPropsValue?.sx && { sx: [...Array.isArray(defaultSlotPropsValue.sx) ? defaultSlotPropsValue.sx : [defaultSlotPropsValue.sx], ...Array.isArray(externalSlotPropsValue.sx) ? externalSlotPropsValue.sx : [externalSlotPropsValue.sx]] }
		};
	};
	const typedDefaultSlotProps = defaultSlotProps;
	const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
	const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
	return {
		...defaultSlotProps,
		...externalSlotProps,
		...handlers,
		...!!className && { className },
		...typedDefaultSlotProps?.style && externalSlotProps?.style && { style: {
			...typedDefaultSlotProps.style,
			...externalSlotProps.style
		} },
		...typedDefaultSlotProps?.sx && externalSlotProps?.sx && { sx: [...Array.isArray(typedDefaultSlotProps.sx) ? typedDefaultSlotProps.sx : [typedDefaultSlotProps.sx], ...Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]] }
	};
}
//#endregion
//#region node_modules/@mui/material/utils/index.mjs
var unstable_ClassNameGenerator = { configure: (generator) => {
	console.warn([
		"MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.",
		"",
		"You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead",
		"",
		"The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401",
		"",
		"The updated documentation: https://mui.com/guides/classname-generator/"
	].join("\n"));
	ClassNameGenerator.configure(generator);
} };
//#endregion
//#region node_modules/@mui/utils/chainPropTypes/chainPropTypes.mjs
function chainPropTypes(propType1, propType2) {
	return function validate(...args) {
		return propType1(...args) || propType2(...args);
	};
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t;
	}, _setPrototypeOf(t, e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
	t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroupContext.js
var TransitionGroupContext_default = import_react.createContext(null);
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
	if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
//#endregion
//#region node_modules/react-transition-group/esm/utils/ChildMapping.js
/**
* Given `this.props.children`, return an object mapping key to child.
*
* @param {*} children `this.props.children`
* @return {object} Mapping of key to child
*/
function getChildMapping(children, mapFn) {
	var mapper = function mapper(child) {
		return mapFn && (0, import_react.isValidElement)(child) ? mapFn(child) : child;
	};
	var result = Object.create(null);
	if (children) import_react.Children.map(children, function(c) {
		return c;
	}).forEach(function(child) {
		result[child.key] = mapper(child);
	});
	return result;
}
/**
* When you're adding or removing children some may be added or removed in the
* same render pass. We want to show *both* since we want to simultaneously
* animate elements in and out. This function takes a previous set of keys
* and a new set of keys and merges them with its best guess of the correct
* ordering. In the future we may expose some of the utilities in
* ReactMultiChild to make this easy, but for now React itself does not
* directly have this concept of the union of prevChildren and nextChildren
* so we implement it here.
*
* @param {object} prev prev children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @param {object} next next children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @return {object} a key set that contains all keys in `prev` and all keys
* in `next` in a reasonable order.
*/
function mergeChildMappings(prev, next) {
	prev = prev || {};
	next = next || {};
	function getValueForKey(key) {
		return key in next ? next[key] : prev[key];
	}
	var nextKeysPending = Object.create(null);
	var pendingKeys = [];
	for (var prevKey in prev) if (prevKey in next) {
		if (pendingKeys.length) {
			nextKeysPending[prevKey] = pendingKeys;
			pendingKeys = [];
		}
	} else pendingKeys.push(prevKey);
	var i;
	var childMapping = {};
	for (var nextKey in next) {
		if (nextKeysPending[nextKey]) for (i = 0; i < nextKeysPending[nextKey].length; i++) {
			var pendingNextKey = nextKeysPending[nextKey][i];
			childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
		}
		childMapping[nextKey] = getValueForKey(nextKey);
	}
	for (i = 0; i < pendingKeys.length; i++) childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	return childMapping;
}
function getProp(child, prop, props) {
	return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
	return getChildMapping(props.children, function(child) {
		return (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			appear: getProp(child, "appear", props),
			enter: getProp(child, "enter", props),
			exit: getProp(child, "exit", props)
		});
	});
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
	var nextChildMapping = getChildMapping(nextProps.children);
	var children = mergeChildMappings(prevChildMapping, nextChildMapping);
	Object.keys(children).forEach(function(key) {
		var child = children[key];
		if (!(0, import_react.isValidElement)(child)) return;
		var hasPrev = key in prevChildMapping;
		var hasNext = key in nextChildMapping;
		var prevChild = prevChildMapping[key];
		var isLeaving = (0, import_react.isValidElement)(prevChild) && !prevChild.props.in;
		if (hasNext && (!hasPrev || isLeaving)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
		else if (!hasNext && hasPrev && !isLeaving) children[key] = (0, import_react.cloneElement)(child, { in: false });
		else if (hasNext && hasPrev && (0, import_react.isValidElement)(prevChild)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: prevChild.props.in,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
	});
	return children;
}
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroup.js
var values = Object.values || function(obj) {
	return Object.keys(obj).map(function(k) {
		return obj[k];
	});
};
var defaultProps = {
	component: "div",
	childFactory: function childFactory(child) {
		return child;
	}
};
/**
* The `<TransitionGroup>` component manages a set of transition components
* (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
* components, `<TransitionGroup>` is a state machine for managing the mounting
* and unmounting of components over time.
*
* Consider the example below. As items are removed or added to the TodoList the
* `in` prop is toggled automatically by the `<TransitionGroup>`.
*
* Note that `<TransitionGroup>`  does not define any animation behavior!
* Exactly _how_ a list item animates is up to the individual transition
* component. This means you can mix and match animations across different list
* items.
*/
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(TransitionGroup, _React$Component);
	function TransitionGroup(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		_this.state = {
			contextValue: { isMounting: true },
			handleExited: _this.handleExited.bind(_assertThisInitialized(_this)),
			firstRender: true
		};
		return _this;
	}
	var _proto = TransitionGroup.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.mounted = true;
		this.setState({ contextValue: { isMounting: false } });
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.mounted = false;
	};
	TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
		var prevChildMapping = _ref.children, handleExited = _ref.handleExited;
		return {
			children: _ref.firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
			firstRender: false
		};
	};
	_proto.handleExited = function handleExited(child, node) {
		var currentChildMapping = getChildMapping(this.props.children);
		if (child.key in currentChildMapping) return;
		if (child.props.onExited) child.props.onExited(node);
		if (this.mounted) this.setState(function(state) {
			var children = _extends({}, state.children);
			delete children[child.key];
			return { children };
		});
	};
	_proto.render = function render() {
		var _this$props = this.props, Component = _this$props.component, childFactory = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
		var contextValue = this.state.contextValue;
		var children = values(this.state.children).map(childFactory);
		delete props.appear;
		delete props.enter;
		delete props.exit;
		if (Component === null) return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, children);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, /* @__PURE__ */ import_react.createElement(Component, props, children));
	};
	return TransitionGroup;
}(import_react.Component);
TransitionGroup.propTypes = {
	/**
	* `<TransitionGroup>` renders a `<div>` by default. You can change this
	* behavior by providing a `component` prop.
	* If you use React v16+ and would like to avoid a wrapping `<div>` element
	* you can pass in `component={null}`. This is useful if the wrapping div
	* borks your css styles.
	*/
	component: import_prop_types.default.any,
	/**
	* A set of `<Transition>` components, that are toggled `in` and out as they
	* leave. the `<TransitionGroup>` will inject specific transition props, so
	* remember to spread them through if you are wrapping the `<Transition>` as
	* with our `<Fade>` example.
	*
	* While this component is meant for multiple `Transition` or `CSSTransition`
	* children, sometimes you may want to have a single transition child with
	* content that you want to be transitioned out and in when you change it
	* (e.g. routes, images etc.) In that case you can change the `key` prop of
	* the transition child as you change its content, this will cause
	* `TransitionGroup` to transition the child out and back in.
	*/
	children: import_prop_types.default.node,
	/**
	* A convenience prop that enables or disables appear animations
	* for all children. Note that specifying this will override any defaults set
	* on individual children Transitions.
	*/
	appear: import_prop_types.default.bool,
	/**
	* A convenience prop that enables or disables enter animations
	* for all children. Note that specifying this will override any defaults set
	* on individual children Transitions.
	*/
	enter: import_prop_types.default.bool,
	/**
	* A convenience prop that enables or disables exit animations
	* for all children. Note that specifying this will override any defaults set
	* on individual children Transitions.
	*/
	exit: import_prop_types.default.bool,
	/**
	* You may need to apply reactive updates to a child as it is exiting.
	* This is generally done by using `cloneElement` however in the case of an exiting
	* child the element has already been removed and not accessible to the consumer.
	*
	* If you do need to update a child as it leaves you can provide a `childFactory`
	* to wrap every child, even the ones that are leaving.
	*
	* @type Function(child: ReactElement) -> ReactElement
	*/
	childFactory: import_prop_types.default.func
};
TransitionGroup.defaultProps = defaultProps;
//#endregion
//#region node_modules/@mui/utils/useLazyRef/useLazyRef.mjs
var UNINITIALIZED = {};
/**
* A React.useRef() that is initialized lazily with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useLazyRef(sortColumns, columns)
*/
function useLazyRef(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
//#endregion
//#region node_modules/@mui/utils/useOnMount/useOnMount.mjs
var EMPTY$1 = [];
/**
* A React.useEffect equivalent that runs once, when the component is mounted.
*/
function useOnMount(fn) {
	import_react.useEffect(fn, EMPTY$1);
}
//#endregion
//#region node_modules/@mui/utils/useTimeout/useTimeout.mjs
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = null;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = null;
			fn();
		}, delay);
	}
	clear = () => {
		if (this.currentId !== null) {
			clearTimeout(this.currentId);
			this.currentId = null;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
function useTimeout() {
	const timeout = useLazyRef(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region node_modules/@mui/utils/elementTypeAcceptingRef/elementTypeAcceptingRef.mjs
function isClassComponent(elementType) {
	const { prototype = {} } = elementType;
	return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
	const propValue = props[propName];
	const safePropName = propFullName || propName;
	if (propValue == null || typeof window === "undefined") return null;
	let warningHint;
	/**
	* Blacklisting instead of whitelisting
	*
	* Blacklisting will miss some components, such as React.Fragment. Those will at least
	* trigger a warning in React.
	* We can't whitelist because there is no safe way to detect React.forwardRef
	* or class components. "Safe" means there's no public API.
	*
	*/
	if (typeof propValue === "function" && !isClassComponent(propValue)) warningHint = "Did you accidentally provide a plain function component instead?";
	if (propValue === import_react.Fragment) warningHint = "Did you accidentally provide a React.Fragment instead?";
	if (warningHint !== void 0) return /* @__PURE__ */ new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
	return null;
}
var elementTypeAcceptingRef_default = chainPropTypes(import_prop_types.default.elementType, elementTypeAcceptingRef);
//#endregion
//#region node_modules/@mui/utils/refType/refType.mjs
var refType = import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]);
//#endregion
//#region node_modules/@mui/utils/isFocusVisible/isFocusVisible.mjs
/**
* Returns a boolean indicating if the event's target has :focus-visible
*/
function isFocusVisible(element) {
	try {
		return element.matches(":focus-visible");
	} catch (error) {
		if (!window.navigator.userAgent.includes("jsdom")) console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join("\n"));
	}
	return false;
}
//#endregion
//#region node_modules/@mui/material/utils/useFocusableWhenDisabled.mjs
function useFocusableWhenDisabled(parameters) {
	const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
	const isFocusableComposite = composite && focusableWhenDisabled !== false;
	const isNonFocusableComposite = composite && focusableWhenDisabled === false;
	return import_react.useMemo(() => {
		const additionalProps = { onKeyDown(event) {
			if (disabled && focusableWhenDisabled && event.key !== "Tab") event.preventDefault();
		} };
		if (!composite) {
			additionalProps.tabIndex = tabIndexProp;
			if (!isNativeButton && disabled) additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
		}
		if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) additionalProps["aria-disabled"] = disabled;
		if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) additionalProps.disabled = disabled;
		return additionalProps;
	}, [
		composite,
		disabled,
		focusableWhenDisabled,
		isFocusableComposite,
		isNonFocusableComposite,
		isNativeButton,
		tabIndexProp
	]);
}
//#endregion
//#region node_modules/@mui/material/ButtonBase/useButtonBase.mjs
var EMPTY = {};
function useButtonBase(parameters) {
	const { nativeButton, nativeButtonProp, internalNativeButton = nativeButton, allowInferredHostMismatch = false, disabled, type, hasFormAction = false, tabIndex = 0, focusableWhenDisabled: focusableWhenDisabledParam, stopEventPropagation = false, onBeforeKeyDown, onBeforeKeyUp } = parameters;
	const rootRef = import_react.useRef(null);
	const focusableWhenDisabled = focusableWhenDisabledParam === true;
	const focusableWhenDisabledProps = useFocusableWhenDisabled({
		focusableWhenDisabled,
		disabled,
		isNativeButton: nativeButton,
		tabIndex
	});
	import_react.useEffect(() => {
		const root = rootRef.current;
		if (root == null) return;
		const isButtonTag = root.tagName === "BUTTON";
		if (nativeButtonProp !== void 0) {
			if (nativeButtonProp && !isButtonTag) console.error("MUI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Render a real <button> or set `nativeButton` to `false`.");
			if (!nativeButtonProp && isButtonTag) console.error("MUI: A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while additionally applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Render a non-<button> such as <div>, or set `nativeButton` to `true`.");
			return;
		}
		if (allowInferredHostMismatch) return;
		if (internalNativeButton && !isButtonTag) console.error("MUI: A component rendering a native <button> resolved to a non-<button> element, but `nativeButton={false}` was not specified and the resolved root is a non-<button>. When rendering a custom component, set `nativeButton={false}` explicitly or render a <button> element.");
		if (!internalNativeButton && isButtonTag) console.error("MUI: A component that acts as a non-native button resolved to a native <button> element, but `nativeButton={true}` was not specified. When rendering a custom component, set `nativeButton={true}` explicitly or render a non-<button> element.");
	}, [
		allowInferredHostMismatch,
		internalNativeButton,
		nativeButtonProp
	]);
	const hasNativeKeyboardActivation = import_react.useCallback(() => {
		const root = rootRef.current;
		if (root == null) return nativeButton;
		if (root.tagName === "BUTTON") return true;
		return Boolean(root.tagName === "A" && root.href);
	}, [nativeButton]);
	const buttonProps = import_react.useMemo(() => {
		const resolvedButtonProps = focusableWhenDisabled ? {} : { tabIndex: disabled ? -1 : tabIndex };
		if (nativeButton) {
			resolvedButtonProps.type = type === void 0 && !hasFormAction ? "button" : type;
			if (!focusableWhenDisabled) resolvedButtonProps.disabled = disabled;
		} else {
			resolvedButtonProps.role = "button";
			if (!focusableWhenDisabled && disabled) resolvedButtonProps["aria-disabled"] = disabled;
		}
		if (focusableWhenDisabled) return {
			...resolvedButtonProps,
			...focusableWhenDisabledProps
		};
		return resolvedButtonProps;
	}, [
		disabled,
		focusableWhenDisabled,
		focusableWhenDisabledProps,
		hasFormAction,
		nativeButton,
		tabIndex,
		type
	]);
	return {
		getButtonProps: import_react.useCallback((externalProps = EMPTY) => {
			const { onClick: externalOnClick, onKeyDown: externalOnKeyDown, onKeyUp: externalOnKeyUp, ...otherExternalProps } = externalProps;
			const handleClick = (event) => {
				if (stopEventPropagation) event.stopPropagation();
				if (disabled) {
					event.preventDefault();
					return;
				}
				externalOnClick?.(event);
			};
			const handleKeyDown = (event) => {
				if (focusableWhenDisabled) focusableWhenDisabledProps.onKeyDown(event);
				if (disabled) return;
				onBeforeKeyDown?.(event);
				externalOnKeyDown?.(event);
				if (event.target !== event.currentTarget || hasNativeKeyboardActivation()) return;
				if (event.key === " ") {
					event.preventDefault();
					return;
				}
				if (event.key === "Enter") {
					event.preventDefault();
					event.currentTarget.click();
				}
			};
			const handleKeyUp = (event) => {
				if (disabled) return;
				onBeforeKeyUp?.(event);
				externalOnKeyUp?.(event);
				if (event.target === event.currentTarget && !hasNativeKeyboardActivation() && event.key === " " && !event.defaultPrevented) event.currentTarget.click();
			};
			return {
				...buttonProps,
				...otherExternalProps,
				onClick: handleClick,
				onKeyDown: handleKeyDown,
				onKeyUp: handleKeyUp
			};
		}, [
			buttonProps,
			disabled,
			focusableWhenDisabled,
			focusableWhenDisabledProps,
			hasNativeKeyboardActivation,
			onBeforeKeyDown,
			onBeforeKeyUp,
			stopEventPropagation
		]),
		rootRef
	};
}
//#endregion
//#region node_modules/@mui/material/useLazyRipple/useLazyRipple.mjs
/**
* Lazy initialization container for the Ripple instance. This improves
* performance by delaying mounting the ripple until it's needed.
*/
var LazyRipple = class LazyRipple {
	/** React ref to the ripple instance */
	/** If the ripple component should be mounted */
	/** Promise that resolves when the ripple component is mounted */
	/** If the ripple component has been mounted */
	/** React state hook setter */
	static create() {
		return new LazyRipple();
	}
	static use() {
		const ripple = useLazyRef(LazyRipple.create).current;
		const [shouldMount, setShouldMount] = import_react.useState(false);
		ripple.shouldMount = shouldMount;
		ripple.setShouldMount = setShouldMount;
		import_react.useEffect(ripple.mountEffect, [shouldMount]);
		return ripple;
	}
	constructor() {
		this.ref = { current: null };
		this.mounted = null;
		this.didMount = false;
		this.shouldMount = false;
		this.setShouldMount = null;
	}
	mount() {
		if (!this.mounted) {
			this.mounted = createControlledPromise();
			this.shouldMount = true;
			this.setShouldMount(this.shouldMount);
		}
		return this.mounted;
	}
	mountEffect = () => {
		if (this.shouldMount && !this.didMount) {
			if (this.ref.current !== null) {
				this.didMount = true;
				this.mounted.resolve();
			}
		}
	};
	start(...args) {
		this.mount().then(() => this.ref.current?.start(...args));
	}
	stop(...args) {
		this.mount().then(() => this.ref.current?.stop(...args));
	}
	pulsate(...args) {
		this.mount().then(() => this.ref.current?.pulsate(...args));
	}
};
function useLazyRipple() {
	return LazyRipple.use();
}
function createControlledPromise() {
	let resolve;
	let reject;
	const p = new Promise((resolveFn, rejectFn) => {
		resolve = resolveFn;
		reject = rejectFn;
	});
	p.resolve = resolve;
	p.reject = reject;
	return p;
}
//#endregion
//#region node_modules/@mui/material/ButtonBase/Ripple.mjs
/**
* @ignore - internal component.
*/
function Ripple(props) {
	const { className, classes, pulsate = false, rippleX, rippleY, rippleSize, in: inProp, onExited, timeout } = props;
	const [leaving, setLeaving] = import_react.useState(false);
	const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
	const rippleStyles = {
		width: rippleSize,
		height: rippleSize,
		top: -(rippleSize / 2) + rippleY,
		left: -(rippleSize / 2) + rippleX
	};
	const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
	if (!inProp && !leaving) setLeaving(true);
	import_react.useEffect(() => {
		if (!inProp && onExited != null) {
			const timeoutId = setTimeout(onExited, timeout);
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [
		onExited,
		inProp,
		timeout
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: rippleClassName,
		style: rippleStyles,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: childClassName })
	});
}
Ripple.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object.isRequired,
	className: import_prop_types.default.string,
	/**
	* @ignore - injected from TransitionGroup
	*/
	in: import_prop_types.default.bool,
	/**
	* @ignore - injected from TransitionGroup
	*/
	onExited: import_prop_types.default.func,
	/**
	* If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
	*/
	pulsate: import_prop_types.default.bool,
	/**
	* Diameter of the ripple.
	*/
	rippleSize: import_prop_types.default.number,
	/**
	* Horizontal position of the ripple center.
	*/
	rippleX: import_prop_types.default.number,
	/**
	* Vertical position of the ripple center.
	*/
	rippleY: import_prop_types.default.number,
	/**
	* exit delay
	*/
	timeout: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/material/ButtonBase/touchRippleClasses.mjs
function getTouchRippleUtilityClass(slot) {
	return generateUtilityClass("MuiTouchRipple", slot);
}
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", [
	"root",
	"ripple",
	"rippleVisible",
	"ripplePulsate",
	"child",
	"childLeaving",
	"childPulsate"
]);
//#endregion
//#region node_modules/@mui/material/ButtonBase/TouchRipple.mjs
var DURATION = 550;
var enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
var exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
var pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
var TouchRippleRoot = styled("span", {
	name: "MuiTouchRipple",
	slot: "Root"
})({
	overflow: "hidden",
	pointerEvents: "none",
	position: "absolute",
	zIndex: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	borderRadius: "inherit"
});
var TouchRippleRipple = styled(Ripple, {
	name: "MuiTouchRipple",
	slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses.ripplePulsate} {
    animation-duration: ${({ theme }) => theme.transitions.duration.shorter}ms;
  }

  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;
/**
* @ignore - internal component.
*
* TODO v5: Make private
*/
var TouchRipple = /* @__PURE__ */ import_react.forwardRef(function TouchRipple(inProps, ref) {
	const { center: centerProp = false, classes = {}, className, ...other } = useDefaultProps({
		props: inProps,
		name: "MuiTouchRipple"
	});
	const [ripples, setRipples] = import_react.useState([]);
	const nextKey = import_react.useRef(0);
	const rippleCallback = import_react.useRef(null);
	import_react.useEffect(() => {
		if (rippleCallback.current) {
			rippleCallback.current();
			rippleCallback.current = null;
		}
	}, [ripples]);
	const ignoringMouseDown = import_react.useRef(false);
	const startTimer = useTimeout();
	const startTimerCommit = import_react.useRef(null);
	const container = import_react.useRef(null);
	const startCommit = import_react.useCallback((params) => {
		const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
		setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRipple, {
			classes: {
				ripple: clsx(classes.ripple, touchRippleClasses.ripple),
				rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
				ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses.ripplePulsate),
				child: clsx(classes.child, touchRippleClasses.child),
				childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
				childPulsate: clsx(classes.childPulsate, touchRippleClasses.childPulsate)
			},
			timeout: DURATION,
			pulsate,
			rippleX,
			rippleY,
			rippleSize
		}, nextKey.current)]);
		nextKey.current += 1;
		rippleCallback.current = cb;
	}, [classes]);
	const start = import_react.useCallback((event = {}, options = {}, cb = () => {}) => {
		const { pulsate = false, center = centerProp || options.pulsate, fakeElement = false } = options;
		if (event?.type === "mousedown" && ignoringMouseDown.current) {
			ignoringMouseDown.current = false;
			return;
		}
		if (event?.type === "touchstart") ignoringMouseDown.current = true;
		const element = fakeElement ? null : container.current;
		const rect = element ? element.getBoundingClientRect() : {
			width: 0,
			height: 0,
			left: 0,
			top: 0
		};
		let rippleX;
		let rippleY;
		let rippleSize;
		if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
			rippleX = Math.round(rect.width / 2);
			rippleY = Math.round(rect.height / 2);
		} else {
			const { clientX, clientY } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
			rippleX = Math.round(clientX - rect.left);
			rippleY = Math.round(clientY - rect.top);
		}
		if (center) {
			rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
			if (rippleSize % 2 === 0) rippleSize += 1;
		} else {
			const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
			const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
			rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
		}
		if (event?.touches) {
			if (startTimerCommit.current === null) {
				startTimerCommit.current = () => {
					startCommit({
						pulsate,
						rippleX,
						rippleY,
						rippleSize,
						cb
					});
				};
				startTimer.start(80, () => {
					if (startTimerCommit.current) {
						startTimerCommit.current();
						startTimerCommit.current = null;
					}
				});
			}
		} else startCommit({
			pulsate,
			rippleX,
			rippleY,
			rippleSize,
			cb
		});
	}, [
		centerProp,
		startCommit,
		startTimer
	]);
	const pulsate = import_react.useCallback(() => {
		start({}, { pulsate: true });
	}, [start]);
	const stop = import_react.useCallback((event, cb) => {
		startTimer.clear();
		if (event?.type === "touchend" && startTimerCommit.current) {
			startTimerCommit.current();
			startTimerCommit.current = null;
			startTimer.start(0, () => {
				stop(event, cb);
			});
			return;
		}
		startTimerCommit.current = null;
		setRipples((oldRipples) => {
			if (oldRipples.length > 0) return oldRipples.slice(1);
			return oldRipples;
		});
		rippleCallback.current = cb;
	}, [startTimer]);
	import_react.useImperativeHandle(ref, () => ({
		pulsate,
		start,
		stop
	}), [
		pulsate,
		start,
		stop
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRoot, {
		className: clsx(touchRippleClasses.root, classes.root, className),
		ref: container,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionGroup, {
			component: null,
			exit: true,
			children: ripples
		})
	});
});
TouchRipple.propTypes = {
	/**
	* If `true`, the ripple starts at the center of the component
	* rather than at the point of interaction.
	*/
	center: import_prop_types.default.bool,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string
};
//#endregion
//#region node_modules/@mui/material/ButtonBase/buttonBaseClasses.mjs
function getButtonBaseUtilityClass(slot) {
	return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", [
	"root",
	"disabled",
	"focusVisible"
]);
//#endregion
//#region node_modules/@mui/material/ButtonBase/ButtonBase.mjs
var useUtilityClasses$7 = (ownerState) => {
	const { disabled, focusVisible, focusVisibleClassName, suppressFocusVisible, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		disabled && "disabled",
		focusVisible && !suppressFocusVisible && "focusVisible"
	] }, getButtonBaseUtilityClass, classes);
	if (focusVisible && !suppressFocusVisible && focusVisibleClassName) composedClasses.root += ` ${focusVisibleClassName}`;
	return composedClasses;
};
var ButtonBaseRoot = styled("button", {
	name: "MuiButtonBase",
	slot: "Root"
})({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
	WebkitTapHighlightColor: "transparent",
	backgroundColor: "transparent",
	outline: 0,
	border: 0,
	margin: 0,
	borderRadius: 0,
	padding: 0,
	cursor: "pointer",
	userSelect: "none",
	verticalAlign: "middle",
	MozAppearance: "none",
	WebkitAppearance: "none",
	textDecoration: "none",
	color: "inherit",
	"&::-moz-focus-inner": { borderStyle: "none" },
	[`&.${buttonBaseClasses.disabled}`]: {
		pointerEvents: "none",
		cursor: "default"
	},
	"@media print": { colorAdjust: "exact" }
});
/**
* `ButtonBase` contains as few styles as possible.
* It aims to be a simple building block for creating a button.
* It contains a load of style reset and some focus/ripple logic.
*/
var ButtonBase = /* @__PURE__ */ import_react.forwardRef(function ButtonBase(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiButtonBase"
	});
	const { action, centerRipple = false, children, className, component = "button", disabled = false, disableRipple = false, disableTouchRipple = false, focusRipple = false, focusVisibleClassName, focusableWhenDisabled, suppressFocusVisible = false, internalNativeButton: internalNativeButtonProp, LinkComponent = "a", nativeButton: nativeButtonProp, onBlur, onClick: onClickProp, onContextMenu, onDragLeave, onFocus, onFocusVisible, onKeyDown: onKeyDownProp, onKeyUp: onKeyUpProp, onMouseDown, onMouseLeave, onMouseUp, onTouchEnd, onTouchMove, onTouchStart, tabIndex = 0, TouchRippleProps, touchRippleRef, type, ...other } = props;
	const isLink = Boolean(other.href || other.to);
	const hasFormAction = Boolean(other.formAction);
	let ComponentProp = component;
	if (ComponentProp === "button" && isLink) ComponentProp = LinkComponent;
	const internalNativeButton = typeof ComponentProp === "string" ? ComponentProp === "button" : internalNativeButtonProp ?? false;
	const nativeButton = nativeButtonProp ?? internalNativeButton;
	const ripple = useLazyRipple();
	const handleRippleRef = useForkRef_default(ripple.ref, touchRippleRef);
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	if ((disabled || suppressFocusVisible) && focusVisible) setFocusVisible(false);
	const handleBeforeKeyDown = useEventCallback_default((event) => {
		if (focusRipple && !event.repeat && focusVisible && event.key === " ") ripple.stop(event, () => {
			ripple.start(event);
		});
	});
	const handleBeforeKeyUp = useEventCallback_default((event) => {
		if (focusRipple && event.key === " " && focusVisible && !event.defaultPrevented) ripple.stop(event, () => {
			ripple.pulsate(event);
		});
	});
	const { getButtonProps, rootRef: buttonRef } = useButtonBase({
		nativeButton,
		nativeButtonProp,
		internalNativeButton,
		allowInferredHostMismatch: isLink || typeof ComponentProp === "string",
		disabled,
		type,
		hasFormAction,
		tabIndex,
		onBeforeKeyDown: handleBeforeKeyDown,
		onBeforeKeyUp: handleBeforeKeyUp
	});
	const { onClick, onKeyDown, onKeyUp, ...buttonProps } = getButtonProps({
		onClick: onClickProp,
		onKeyDown: onKeyDownProp,
		onKeyUp: onKeyUpProp
	});
	import_react.useImperativeHandle(action, () => ({ focusVisible: () => {
		setFocusVisible(true);
		buttonRef.current.focus();
	} }), [buttonRef]);
	const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
	import_react.useEffect(() => {
		if (focusVisible && focusRipple && !disableRipple) ripple.pulsate();
	}, [
		disableRipple,
		focusRipple,
		focusVisible,
		ripple
	]);
	const handleMouseDown = useRippleHandler(ripple, "start", onMouseDown, disableTouchRipple);
	const handleContextMenu = useRippleHandler(ripple, "stop", onContextMenu, disableTouchRipple);
	const handleDragLeave = useRippleHandler(ripple, "stop", onDragLeave, disableTouchRipple);
	const handleMouseUp = useRippleHandler(ripple, "stop", onMouseUp, disableTouchRipple);
	const handleMouseLeave = useRippleHandler(ripple, "stop", (event) => {
		if (focusVisible) event.preventDefault();
		if (onMouseLeave) onMouseLeave(event);
	}, disableTouchRipple);
	const handleTouchStart = useRippleHandler(ripple, "start", onTouchStart, disableTouchRipple);
	const handleTouchEnd = useRippleHandler(ripple, "stop", onTouchEnd, disableTouchRipple);
	const handleTouchMove = useRippleHandler(ripple, "stop", onTouchMove, disableTouchRipple);
	const handleBlur = useRippleHandler(ripple, "stop", (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	}, false);
	const handleFocus = useEventCallback_default((event) => {
		if (!buttonRef.current) buttonRef.current = event.currentTarget;
		if (!suppressFocusVisible && isFocusVisible(event.target)) {
			setFocusVisible(true);
			if (onFocusVisible) onFocusVisible(event);
		}
		if (onFocus) onFocus(event);
	});
	const linkProps = {};
	if (isLink) {
		linkProps.tabIndex = disabled ? -1 : tabIndex;
		if (disabled) linkProps["aria-disabled"] = disabled;
		linkProps.type = type;
	}
	const handleRef = useForkRef_default(ref, buttonRef);
	const ownerState = {
		...props,
		centerRipple,
		component,
		disabled,
		disableRipple,
		disableTouchRipple,
		focusRipple,
		suppressFocusVisible,
		tabIndex,
		focusVisible
	};
	const classes = useUtilityClasses$7(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonBaseRoot, {
		as: ComponentProp,
		className: clsx(classes.root, className),
		ownerState,
		onBlur: handleBlur,
		onClick,
		onContextMenu: handleContextMenu,
		onFocus: handleFocus,
		onKeyDown,
		onKeyUp,
		onMouseDown: handleMouseDown,
		onMouseLeave: handleMouseLeave,
		onMouseUp: handleMouseUp,
		onDragLeave: handleDragLeave,
		onTouchEnd: handleTouchEnd,
		onTouchMove: handleTouchMove,
		onTouchStart: handleTouchStart,
		ref: handleRef,
		...isLink ? linkProps : buttonProps,
		...other,
		children: [children, enableTouchRipple ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRipple, {
			ref: handleRippleRef,
			center: centerRipple,
			...TouchRippleProps
		}) : null]
	});
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
	return useEventCallback_default((event) => {
		if (eventCallback) eventCallback(event);
		if (!skipRippleAction) ripple[rippleAction](event);
		return true;
	});
}
ButtonBase.propTypes = {
	/**
	* A ref for imperative actions.
	* It currently only supports `focusVisible()` action.
	*/
	action: refType,
	/**
	* If `true`, the ripples are centered.
	* They won't start at the cursor interaction position.
	* @default false
	*/
	centerRipple: import_prop_types.default.bool,
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: elementTypeAcceptingRef_default,
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the ripple effect is disabled.
	*
	* ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
	* to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
	* @default false
	*/
	disableRipple: import_prop_types.default.bool,
	/**
	* If `true`, the touch ripple effect is disabled.
	* @default false
	*/
	disableTouchRipple: import_prop_types.default.bool,
	/**
	* If `true`, the base button will have a keyboard focus ripple.
	* @default false
	*/
	focusRipple: import_prop_types.default.bool,
	/**
	* This prop can help identify which element has keyboard focus.
	* The class name will be applied when the element gains the focus through keyboard interaction.
	* It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
	* The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
	* A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
	* if needed.
	*/
	focusVisibleClassName: import_prop_types.default.string,
	/**
	* @ignore
	*/
	formAction: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]),
	/**
	* @ignore
	*/
	href: import_prop_types.default.any,
	/**
	* The component used to render a link when the `href` prop is provided.
	* @default 'a'
	*/
	LinkComponent: import_prop_types.default.elementType,
	/**
	* Whether the custom component is expected to render a native `<button>` element
	* when passing a React component to the `component` or `slots` prop.
	*/
	nativeButton: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	onBlur: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onClick: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onContextMenu: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onDragLeave: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onFocus: import_prop_types.default.func,
	/**
	* Callback fired when the component is focused with a keyboard.
	* We trigger a `onFocus` callback too.
	*/
	onFocusVisible: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onKeyDown: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onKeyUp: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onMouseDown: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onMouseLeave: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onMouseUp: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onTouchEnd: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onTouchMove: import_prop_types.default.func,
	/**
	* @ignore
	*/
	onTouchStart: import_prop_types.default.func,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
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
	* @default 0
	*/
	tabIndex: import_prop_types.default.number,
	/**
	* Props applied to the `TouchRipple` element.
	*/
	TouchRippleProps: import_prop_types.default.object,
	/**
	* A ref that points to the `TouchRipple` element.
	*/
	touchRippleRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		pulsate: import_prop_types.default.func.isRequired,
		start: import_prop_types.default.func.isRequired,
		stop: import_prop_types.default.func.isRequired
	}) })]),
	/**
	* The HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
	* attribute applied to `button` and `a` elements.
	* Ignored when rendering non-native buttons.
	* @default 'button'
	*/
	type: import_prop_types.default.string
};
//#endregion
//#region node_modules/@mui/material/utils/createSimplePaletteValueFilter.mjs
/**
* Type guard to check if the object has a "main" property of type string.
*
* @param obj - the object to check
* @returns boolean
*/
function hasCorrectMainProperty(obj) {
	return typeof obj.main === "string";
}
/**
* Checks if the object conforms to the SimplePaletteColorOptions type.
* The minimum requirement is that the object has a "main" property of type string, this is always checked.
* Optionally, you can pass additional properties to check.
*
* @param obj - The object to check
* @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
* @returns boolean
*/
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
	if (!hasCorrectMainProperty(obj)) return false;
	for (const value of additionalPropertiesToCheck) if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") return false;
	return true;
}
/**
* Creates a filter function used to filter simple palette color options.
* The minimum requirement is that the object has a "main" property of type string, this is always checked.
* Optionally, you can pass additional properties to check.
*
* @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
* @returns ([, value]: [any, PaletteColorOptions]) => boolean
*/
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
	return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}
//#endregion
//#region node_modules/@mui/material/CircularProgress/circularProgressClasses.mjs
function getCircularProgressUtilityClass(slot) {
	return generateUtilityClass("MuiCircularProgress", slot);
}
var circularProgressClasses = generateUtilityClasses("MuiCircularProgress", [
	"root",
	"determinate",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"svg",
	"track",
	"circle",
	"circleDisableShrink"
]);
//#endregion
//#region node_modules/@mui/material/CircularProgress/CircularProgress.mjs
var SIZE = 44;
var circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
var circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;
var rotateAnimation = typeof circularRotateKeyframe !== "string" ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
var dashAnimation = typeof circularDashKeyframe !== "string" ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
var useUtilityClasses$6 = (ownerState) => {
	const { classes, variant, color, disableShrink } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			`color${capitalize_default(color)}`
		],
		svg: ["svg"],
		track: ["track"],
		circle: ["circle", disableShrink && "circleDisableShrink"]
	}, getCircularProgressUtilityClass, classes);
};
var CircularProgressRoot = styled("span", {
	name: "MuiCircularProgress",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-block",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("transform") }
		},
		{
			props: { variant: "indeterminate" },
			style: rotateAnimation || { animation: `${circularRotateKeyframe} 1.4s linear infinite` }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		}))
	]
})));
var CircularProgressSVG = styled("svg", {
	name: "MuiCircularProgress",
	slot: "Svg"
})({ display: "block" });
var CircularProgressCircle = styled("circle", {
	name: "MuiCircularProgress",
	slot: "Circle",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.circle, ownerState.disableShrink && styles.circleDisableShrink];
	}
})(memoTheme(({ theme }) => ({
	stroke: "currentColor",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("stroke-dashoffset") }
		},
		{
			props: { variant: "indeterminate" },
			style: {
				strokeDasharray: "80px, 200px",
				strokeDashoffset: 0
			}
		},
		{
			props: ({ ownerState }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
			style: dashAnimation || { animation: `${circularDashKeyframe} 1.4s ease-in-out infinite` }
		}
	]
})));
var CircularProgressTrack = styled("circle", {
	name: "MuiCircularProgress",
	slot: "Track"
})(memoTheme(({ theme }) => ({
	stroke: "currentColor",
	opacity: (theme.vars || theme).palette.action.activatedOpacity
})));
/**
* ## ARIA
*
* If the progress bar is describing the loading progress of a particular region of a page,
* you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
* attribute to `true` on that region until it has finished loading.
*/
var CircularProgress = /* @__PURE__ */ import_react.forwardRef(function CircularProgress(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCircularProgress"
	});
	const { className, color = "primary", disableShrink = false, enableTrackSlot = false, min: minProp, max: maxProp, size = 40, style, thickness = 3.6, value = props.min ?? 0, variant = "indeterminate", ...other } = props;
	if (variant === "indeterminate" && (minProp !== void 0 || maxProp !== void 0)) console.warn(`MUI: You have provided the \`min\` or \`max\` props with an 'indeterminate' variant. These props will have no effect.`);
	const min = minProp ?? 0;
	const max = maxProp ?? 100;
	const ownerState = {
		...props,
		color,
		disableShrink,
		size,
		thickness,
		value,
		variant,
		enableTrackSlot
	};
	const classes = useUtilityClasses$6(ownerState);
	const circleStyle = {};
	const rootStyle = {};
	const rootProps = {};
	if (variant === "determinate") {
		const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
		if (value < min || value > max || min >= max) console.error(`MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=${min}, max=${max}, value=${value}.`);
		const range = max - min;
		circleStyle.strokeDasharray = circumference.toFixed(3);
		circleStyle.strokeDashoffset = range > 0 ? `${((max - value) / range * circumference).toFixed(3)}px` : `${circumference.toFixed(3)}px`;
		rootStyle.transform = "rotate(-90deg)";
		rootProps["aria-valuenow"] = value;
		rootProps["aria-valuemin"] = min;
		rootProps["aria-valuemax"] = max;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressRoot, {
		className: clsx(classes.root, className),
		style: {
			width: size,
			height: size,
			...rootStyle,
			...style
		},
		ownerState,
		ref,
		role: "progressbar",
		...rootProps,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CircularProgressSVG, {
			className: classes.svg,
			ownerState,
			viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
			children: [enableTrackSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressTrack, {
				className: classes.track,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness,
				"aria-hidden": "true"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressCircle, {
				className: classes.circle,
				style: circleStyle,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness
			})]
		})
	});
});
CircularProgress.propTypes = {
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'primary'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* If `true`, the shrink animation is disabled.
	* This only works if variant is `indeterminate`.
	* @default false
	*/
	disableShrink: chainPropTypes(import_prop_types.default.bool, (props) => {
		if (props.disableShrink && props.variant && props.variant !== "indeterminate") return /* @__PURE__ */ new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.");
		return null;
	}),
	/**
	* If `true`, a track circle slot is mounted to show a subtle background for the progress.
	* The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
	* @default false
	*/
	enableTrackSlot: import_prop_types.default.bool,
	/**
	* The maximum value for the progress indicator for the determinate variant.
	* @default 100
	*/
	max: import_prop_types.default.number,
	/**
	* The minimum value for the progress indicator for the determinate variant.
	* @default 0
	*/
	min: import_prop_types.default.number,
	/**
	* The size of the component.
	* If using a number, the pixel unit is assumed.
	* If using a string, you need to provide the CSS unit, for example '3rem'.
	* @default 40
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	/**
	* @ignore
	*/
	style: import_prop_types.default.object,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
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
	* The thickness of the circle.
	* @default 3.6
	*/
	thickness: import_prop_types.default.number,
	/**
	* The value of the progress indicator for the determinate variant.
	* Value between `min` and `max`.
	* @default props.min ?? 0
	*/
	value: import_prop_types.default.number,
	/**
	* The variant to use.
	* Use indeterminate when there is no progress value.
	* @default 'indeterminate'
	*/
	variant: import_prop_types.default.oneOf(["determinate", "indeterminate"])
};
//#endregion
//#region node_modules/@mui/material/IconButton/iconButtonClasses.mjs
function getIconButtonUtilityClass(slot) {
	return generateUtilityClass("MuiIconButton", slot);
}
var iconButtonClasses = generateUtilityClasses("MuiIconButton", [
	"root",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning",
	"edgeStart",
	"edgeEnd",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"loading",
	"loadingIndicator",
	"loadingWrapper"
]);
//#endregion
//#region node_modules/@mui/material/IconButton/IconButton.mjs
var useUtilityClasses$5 = (ownerState) => {
	const { classes, disabled, color, edge, size, loading } = ownerState;
	return composeClasses({
		root: [
			"root",
			loading && "loading",
			disabled && "disabled",
			color !== "default" && `color${capitalize_default(color)}`,
			edge && `edge${capitalize_default(edge)}`,
			`size${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getIconButtonUtilityClass, classes);
};
var IconButtonRoot = styled(ButtonBase, {
	name: "MuiIconButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.loading && styles.loading,
			ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`],
			ownerState.edge && styles[`edge${capitalize_default(ownerState.edge)}`],
			styles[`size${capitalize_default(ownerState.size)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	textAlign: "center",
	flex: "0 0 auto",
	fontSize: theme.typography.pxToRem(24),
	padding: 8,
	borderRadius: "50%",
	color: (theme.vars || theme).palette.action.active,
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shortest }),
	variants: [
		{
			props: (props) => !props.disableRipple,
			style: {
				"--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
				"&:hover": {
					backgroundColor: "var(--IconButton-hoverBg)",
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: { edge: "start" },
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		}
	]
})), memoTheme(({ theme }) => ({
	variants: [
		{
			props: { color: "inherit" },
			style: { color: "inherit" }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: {
				color: (theme.vars || theme).palette[color].main,
				"--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
			}
		})),
		{
			props: { size: "small" },
			style: {
				padding: 5,
				fontSize: theme.typography.pxToRem(18)
			}
		},
		{
			props: { size: "large" },
			style: {
				padding: 12,
				fontSize: theme.typography.pxToRem(28)
			}
		}
	],
	[`&.${iconButtonClasses.disabled}`]: {
		backgroundColor: "transparent",
		color: (theme.vars || theme).palette.action.disabled
	},
	[`&.${iconButtonClasses.loading}`]: { color: "transparent" }
})));
var IconButtonLoadingIndicator = styled("span", {
	name: "MuiIconButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	color: (theme.vars || theme).palette.action.disabled,
	variants: [{
		props: { loading: true },
		style: { display: "flex" }
	}]
}));
/**
* Refer to the [Icons](/material-ui/icons/) section of the documentation
* regarding the available icon options.
*/
var IconButton = /* @__PURE__ */ import_react.forwardRef(function IconButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiIconButton"
	});
	const { edge = false, children, className, color = "default", disabled = false, disableFocusRipple = false, size = "medium", id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		edge,
		color,
		disabled,
		disableFocusRipple,
		loading,
		loadingIndicator,
		size
	};
	const classes = useUtilityClasses$5(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconButtonRoot, {
		id: loading ? loadingId : idProp,
		className: clsx(classes.root, className),
		centerRipple: true,
		internalNativeButton: true,
		focusRipple: !disableFocusRipple,
		disabled: disabled || loading,
		ref,
		...other,
		ownerState,
		children: [typeof loading === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: classes.loadingWrapper,
			style: { display: "contents" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButtonLoadingIndicator, {
				className: classes.loadingIndicator,
				ownerState,
				children: loading && loadingIndicator
			})
		}), children]
	});
});
IconButton.propTypes = {
	/**
	* The icon to display.
	*/
	children: chainPropTypes(import_prop_types.default.node, (props) => {
		if (import_react.Children.toArray(props.children).some((child) => /* @__PURE__ */ import_react.isValidElement(child) && child.props.onClick)) return new Error([
			"MUI: You are providing an onClick event listener to a child of a button element.",
			"Prefer applying it to the IconButton directly.",
			"This guarantees that the whole <button> will be responsive to click events."
		].join("\n"));
		return null;
	}),
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'default'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"default",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the  keyboard focus ripple is disabled.
	* @default false
	*/
	disableFocusRipple: import_prop_types.default.bool,
	/**
	* If `true`, the ripple effect is disabled.
	*
	* ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
	* to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
	* @default false
	*/
	disableRipple: import_prop_types.default.bool,
	/**
	* If given, uses a negative margin to counteract the padding on one
	* side (this is often helpful for aligning the left or right
	* side of the icon with content above or below, without ruining the border
	* size and shape).
	* @default false
	*/
	edge: import_prop_types.default.oneOf([
		"end",
		"start",
		false
	]),
	/**
	* @ignore
	*/
	id: import_prop_types.default.string,
	/**
	* If `true`, the loading indicator is visible and the button is disabled.
	* If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
	* @default null
	*/
	loading: import_prop_types.default.bool,
	/**
	* Element placed before the children if the button is in loading state.
	* The node should contain an element with `role="progressbar"` with an accessible name.
	* By default, it renders a `CircularProgress` that is labeled by the button itself.
	* @default <CircularProgress color="inherit" size={16} />
	*/
	loadingIndicator: import_prop_types.default.node,
	/**
	* The size of the component.
	* `small` is equivalent to the dense button styling.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/material/Typography/typographyClasses.mjs
function getTypographyUtilityClass(slot) {
	return generateUtilityClass("MuiTypography", slot);
}
var typographyClasses = generateUtilityClasses("MuiTypography", [
	"root",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"subtitle1",
	"subtitle2",
	"body1",
	"body2",
	"inherit",
	"button",
	"caption",
	"overline",
	"alignLeft",
	"alignRight",
	"alignCenter",
	"alignJustify",
	"noWrap",
	"gutterBottom"
]);
//#endregion
//#region node_modules/@mui/material/Typography/Typography.mjs
var useUtilityClasses$4 = (ownerState) => {
	const { align, gutterBottom, noWrap, variant, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		ownerState.align !== "inherit" && `align${capitalize_default(align)}`,
		gutterBottom && "gutterBottom",
		noWrap && "noWrap"
	] }, getTypographyUtilityClass, classes);
};
var TypographyRoot = styled("span", {
	name: "MuiTypography",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.variant && styles[ownerState.variant],
			ownerState.align !== "inherit" && styles[`align${capitalize_default(ownerState.align)}`],
			ownerState.noWrap && styles.noWrap,
			ownerState.gutterBottom && styles.gutterBottom
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 0,
	variants: [
		{
			props: { variant: "inherit" },
			style: {
				font: "inherit",
				lineHeight: "inherit",
				letterSpacing: "inherit"
			}
		},
		...Object.entries(theme.typography).filter(([variant, value]) => variant !== "inherit" && value && typeof value === "object").map(([variant, value]) => ({
			props: { variant },
			style: value
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		})),
		...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === "string").map(([color]) => ({
			props: { color: `text${capitalize_default(color)}` },
			style: { color: (theme.vars || theme).palette.text[color] }
		})),
		{
			props: ({ ownerState }) => ownerState.align !== "inherit",
			style: { textAlign: "var(--Typography-textAlign)" }
		},
		{
			props: ({ ownerState }) => ownerState.noWrap,
			style: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			}
		},
		{
			props: ({ ownerState }) => ownerState.gutterBottom,
			style: { marginBottom: "0.35em" }
		}
	]
})));
var defaultVariantMapping = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	inherit: "p"
};
var Typography = /* @__PURE__ */ import_react.forwardRef(function Typography(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTypography"
	});
	const { color, align = "inherit", className, component, gutterBottom = false, noWrap = false, variant = "body1", variantMapping = defaultVariantMapping, ...other } = props;
	const ownerState = {
		...props,
		align,
		color,
		className,
		component,
		gutterBottom,
		noWrap,
		variant,
		variantMapping
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypographyRoot, {
		as: component || variantMapping[variant] || defaultVariantMapping[variant] || "span",
		ref,
		className: clsx(useUtilityClasses$4(ownerState).root, className),
		...other,
		ownerState,
		style: {
			...align !== "inherit" && { "--Typography-textAlign": align },
			...other.style
		}
	});
});
Typography.propTypes = {
	/**
	* Set the text-align on the component.
	* @default 'inherit'
	*/
	align: import_prop_types.default.oneOf([
		"center",
		"inherit",
		"justify",
		"left",
		"right"
	]),
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"primary",
		"secondary",
		"success",
		"error",
		"info",
		"warning",
		"textPrimary",
		"textSecondary",
		"textDisabled"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, the text will have a bottom margin.
	* @default false
	*/
	gutterBottom: import_prop_types.default.bool,
	/**
	* If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
	*
	* Note that text overflow can only happen with block or inline-block level elements
	* (the element needs to have a width in order to overflow).
	* @default false
	*/
	noWrap: import_prop_types.default.bool,
	/**
	* @ignore
	*/
	style: import_prop_types.default.object,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
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
	* Applies the theme typography styles.
	* @default 'body1'
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"body1",
		"body2",
		"button",
		"caption",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"inherit",
		"overline",
		"subtitle1",
		"subtitle2"
	]), import_prop_types.default.string]),
	/**
	* The component maps the variant prop to a range of different HTML element types.
	* For instance, subtitle1 to `<h6>`.
	* If you wish to change that mapping, you can provide your own.
	* Alternatively, you can use the `component` prop.
	* @default {
	*   h1: 'h1',
	*   h2: 'h2',
	*   h3: 'h3',
	*   h4: 'h4',
	*   h5: 'h5',
	*   h6: 'h6',
	*   subtitle1: 'h6',
	*   subtitle2: 'h6',
	*   body1: 'p',
	*   body2: 'p',
	*   inherit: 'p',
	* }
	*/
	variantMapping: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/utils/HTMLElementType/HTMLElementType.mjs
function HTMLElementType(props, propName, componentName, location, propFullName) {
	const propValue = props[propName];
	const safePropName = propFullName || propName;
	if (propValue == null) return null;
	if (propValue && propValue.nodeType !== 1) return /* @__PURE__ */ new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an HTMLElement.`);
	return null;
}
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [
	"top",
	bottom,
	right,
	left
];
var start = "start";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
	return acc.concat([placement + "-" + start, placement + "-end"]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
	return acc.concat([
		placement,
		placement + "-" + start,
		placement + "-end"
	]);
}, []);
var modifierPhases = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
	return element ? (element.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
	if (node == null) return window;
	if (node.toString() !== "[object Window]") {
		var ownerDocument = node.ownerDocument;
		return ownerDocument ? ownerDocument.defaultView || window : window;
	}
	return node;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
	return node instanceof getWindow(node).Element || node instanceof Element;
}
function isHTMLElement$1(node) {
	return node instanceof getWindow(node).HTMLElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
	if (typeof ShadowRoot === "undefined") return false;
	return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
	var state = _ref.state;
	Object.keys(state.elements).forEach(function(name) {
		var style = state.styles[name] || {};
		var attributes = state.attributes[name] || {};
		var element = state.elements[name];
		if (!isHTMLElement$1(element) || !getNodeName(element)) return;
		Object.assign(element.style, style);
		Object.keys(attributes).forEach(function(name) {
			var value = attributes[name];
			if (value === false) element.removeAttribute(name);
			else element.setAttribute(name, value === true ? "" : value);
		});
	});
}
function effect$2(_ref2) {
	var state = _ref2.state;
	var initialStyles = {
		popper: {
			position: state.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(state.elements.popper.style, initialStyles.popper);
	state.styles = initialStyles;
	if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
	return function() {
		Object.keys(state.elements).forEach(function(name) {
			var element = state.elements[name];
			var attributes = state.attributes[name] || {};
			var style = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]).reduce(function(style, property) {
				style[property] = "";
				return style;
			}, {});
			if (!isHTMLElement$1(element) || !getNodeName(element)) return;
			Object.assign(element.style, style);
			Object.keys(attributes).forEach(function(attribute) {
				element.removeAttribute(attribute);
			});
		});
	};
}
var applyStyles_default = {
	name: "applyStyles",
	enabled: true,
	phase: "write",
	fn: applyStyles,
	effect: effect$2,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
	return placement.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
	var uaData = navigator.userAgentData;
	if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) return uaData.brands.map(function(item) {
		return item.brand + "/" + item.version;
	}).join(" ");
	return navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
	return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	var clientRect = element.getBoundingClientRect();
	var scaleX = 1;
	var scaleY = 1;
	if (includeScale && isHTMLElement$1(element)) {
		scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
		scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	}
	var visualViewport = (isElement(element) ? getWindow(element) : window).visualViewport;
	var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	var width = clientRect.width / scaleX;
	var height = clientRect.height / scaleY;
	return {
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
	var clientRect = getBoundingClientRect(element);
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
	if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
		width,
		height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
	var rootNode = child.getRootNode && child.getRootNode();
	if (parent.contains(child)) return true;
	else if (rootNode && isShadowRoot(rootNode)) {
		var next = child;
		do {
			if (next && parent.isSameNode(next)) return true;
			next = next.parentNode || next.host;
		} while (next);
	}
	return false;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
	return getWindow(element).getComputedStyle(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
	return [
		"table",
		"td",
		"th"
	].indexOf(getNodeName(element)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
	return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
	if (getNodeName(element) === "html") return element;
	return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
	if (!isHTMLElement$1(element) || getComputedStyle(element).position === "fixed") return null;
	return element.offsetParent;
}
function getContainingBlock(element) {
	var isFirefox = /firefox/i.test(getUAString());
	if (/Trident/i.test(getUAString()) && isHTMLElement$1(element)) {
		if (getComputedStyle(element).position === "fixed") return null;
	}
	var currentNode = getParentNode(element);
	if (isShadowRoot(currentNode)) currentNode = currentNode.host;
	while (isHTMLElement$1(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
		var css = getComputedStyle(currentNode);
		if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") return currentNode;
		else currentNode = currentNode.parentNode;
	}
	return null;
}
function getOffsetParent(element) {
	var window = getWindow(element);
	var offsetParent = getTrueOffsetParent(element);
	while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") offsetParent = getTrueOffsetParent(offsetParent);
	if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) return window;
	return offsetParent || getContainingBlock(element) || window;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
	return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function within(min$2, value, max$2) {
	return max(min$2, min(value, max$2));
}
function withinMaxClamp(min, value, max) {
	var v = within(min, value, max);
	return v > max ? max : v;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
	return Object.assign({}, getFreshSideObject(), paddingObject);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
	return keys.reduce(function(hashMap, key) {
		hashMap[key] = value;
		return hashMap;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject(padding, state) {
	padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, { placement: state.placement })) : padding;
	return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
	var _state$modifiersData$;
	var state = _ref.state, name = _ref.name, options = _ref.options;
	var arrowElement = state.elements.arrow;
	var popperOffsets = state.modifiersData.popperOffsets;
	var basePlacement = getBasePlacement(state.placement);
	var axis = getMainAxisFromPlacement(basePlacement);
	var len = ["left", "right"].indexOf(basePlacement) >= 0 ? "height" : "width";
	if (!arrowElement || !popperOffsets) return;
	var paddingObject = toPaddingObject(options.padding, state);
	var arrowRect = getLayoutRect(arrowElement);
	var minProp = axis === "y" ? "top" : left;
	var maxProp = axis === "y" ? bottom : right;
	var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	var arrowOffsetParent = getOffsetParent(arrowElement);
	var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	var centerToReference = endDiff / 2 - startDiff / 2;
	var min = paddingObject[minProp];
	var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	var offset = within(min, center, max);
	var axisProp = axis;
	state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect$1(_ref2) {
	var state = _ref2.state;
	var _options$element = _ref2.options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
	if (arrowElement == null) return;
	if (typeof arrowElement === "string") {
		arrowElement = state.elements.popper.querySelector(arrowElement);
		if (!arrowElement) return;
	}
	if (!contains(state.elements.popper, arrowElement)) return;
	state.elements.arrow = arrowElement;
}
var arrow_default = {
	name: "arrow",
	enabled: true,
	phase: "main",
	fn: arrow,
	effect: effect$1,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
	return placement.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
	var x = _ref.x, y = _ref.y;
	var dpr = win.devicePixelRatio || 1;
	return {
		x: round(x * dpr) / dpr || 0,
		y: round(y * dpr) / dpr || 0
	};
}
function mapToStyles(_ref2) {
	var _Object$assign2;
	var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
	var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
	var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
		x,
		y
	}) : {
		x,
		y
	};
	x = _ref3.x;
	y = _ref3.y;
	var hasX = offsets.hasOwnProperty("x");
	var hasY = offsets.hasOwnProperty("y");
	var sideX = left;
	var sideY = "top";
	var win = window;
	if (adaptive) {
		var offsetParent = getOffsetParent(popper);
		var heightProp = "clientHeight";
		var widthProp = "clientWidth";
		if (offsetParent === getWindow(popper)) {
			offsetParent = getDocumentElement(popper);
			if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
				heightProp = "scrollHeight";
				widthProp = "scrollWidth";
			}
		}
		offsetParent = offsetParent;
		if (placement === "top" || (placement === "left" || placement === "right") && variation === "end") {
			sideY = bottom;
			var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
			y -= offsetY - popperRect.height;
			y *= gpuAcceleration ? 1 : -1;
		}
		if (placement === "left" || (placement === "top" || placement === "bottom") && variation === "end") {
			sideX = right;
			var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
			x -= offsetX - popperRect.width;
			x *= gpuAcceleration ? 1 : -1;
		}
	}
	var commonStyles = Object.assign({ position }, adaptive && unsetSides);
	var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
		x,
		y
	}, getWindow(popper)) : {
		x,
		y
	};
	x = _ref4.x;
	y = _ref4.y;
	if (gpuAcceleration) {
		var _Object$assign;
		return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	}
	return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
	var state = _ref5.state, options = _ref5.options;
	var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	var commonStyles = {
		placement: getBasePlacement(state.placement),
		variation: getVariation(state.placement),
		popper: state.elements.popper,
		popperRect: state.rects.popper,
		gpuAcceleration,
		isFixed: state.options.strategy === "fixed"
	};
	if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.popperOffsets,
		position: state.options.strategy,
		adaptive,
		roundOffsets
	})));
	if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.arrow,
		position: "absolute",
		adaptive: false,
		roundOffsets
	})));
	state.attributes.popper = Object.assign({}, state.attributes.popper, { "data-popper-placement": state.placement });
}
var computeStyles_default = {
	name: "computeStyles",
	enabled: true,
	phase: "beforeWrite",
	fn: computeStyles,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = { passive: true };
function effect(_ref) {
	var state = _ref.state, instance = _ref.instance, options = _ref.options;
	var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
	var window = getWindow(state.elements.popper);
	var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	if (scroll) scrollParents.forEach(function(scrollParent) {
		scrollParent.addEventListener("scroll", instance.update, passive);
	});
	if (resize) window.addEventListener("resize", instance.update, passive);
	return function() {
		if (scroll) scrollParents.forEach(function(scrollParent) {
			scrollParent.removeEventListener("scroll", instance.update, passive);
		});
		if (resize) window.removeEventListener("resize", instance.update, passive);
	};
}
var eventListeners_default = {
	name: "eventListeners",
	enabled: true,
	phase: "write",
	fn: function fn() {},
	effect,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash$1 = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, function(matched) {
		return hash$1[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash = {
	start: "end",
	end: "start"
};
function getOppositeVariationPlacement(placement) {
	return placement.replace(/start|end/g, function(matched) {
		return hash[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
	var win = getWindow(node);
	return {
		scrollLeft: win.pageXOffset,
		scrollTop: win.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
	return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
	var win = getWindow(element);
	var html = getDocumentElement(element);
	var visualViewport = win.visualViewport;
	var width = html.clientWidth;
	var height = html.clientHeight;
	var x = 0;
	var y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		var layoutViewport = isLayoutViewport();
		if (layoutViewport || !layoutViewport && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	return {
		width,
		height,
		x: x + getWindowScrollBarX(element),
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
	var _element$ownerDocumen;
	var html = getDocumentElement(element);
	var winScroll = getWindowScroll(element);
	var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	var y = -winScroll.scrollTop;
	if (getComputedStyle(body || html).direction === "rtl") x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	return {
		width,
		height,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
	var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
	return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
	if ([
		"html",
		"body",
		"#document"
	].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
	if (isHTMLElement$1(node) && isScrollParent(node)) return node;
	return getScrollParent(getParentNode(node));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
	var _element$ownerDocumen;
	if (list === void 0) list = [];
	var scrollParent = getScrollParent(element);
	var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	var win = getWindow(scrollParent);
	var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	var updatedList = list.concat(target);
	return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
	return Object.assign({}, rect, {
		left: rect.x,
		top: rect.y,
		right: rect.x + rect.width,
		bottom: rect.y + rect.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
	var rect = getBoundingClientRect(element, false, strategy === "fixed");
	rect.top = rect.top + element.clientTop;
	rect.left = rect.left + element.clientLeft;
	rect.bottom = rect.top + element.clientHeight;
	rect.right = rect.left + element.clientWidth;
	rect.width = element.clientWidth;
	rect.height = element.clientHeight;
	rect.x = rect.left;
	rect.y = rect.top;
	return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
	return clippingParent === "viewport" ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
	var clippingParents = listScrollParents(getParentNode(element));
	var clipperElement = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0 && isHTMLElement$1(element) ? getOffsetParent(element) : element;
	if (!isElement(clipperElement)) return [];
	return clippingParents.filter(function(clippingParent) {
		return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
	});
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
	var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
	var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	var firstClippingParent = clippingParents[0];
	var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
		var rect = getClientRectFromMixedType(element, clippingParent, strategy);
		accRect.top = max(rect.top, accRect.top);
		accRect.right = min(rect.right, accRect.right);
		accRect.bottom = min(rect.bottom, accRect.bottom);
		accRect.left = max(rect.left, accRect.left);
		return accRect;
	}, getClientRectFromMixedType(element, firstClippingParent, strategy));
	clippingRect.width = clippingRect.right - clippingRect.left;
	clippingRect.height = clippingRect.bottom - clippingRect.top;
	clippingRect.x = clippingRect.left;
	clippingRect.y = clippingRect.top;
	return clippingRect;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
	var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
	var basePlacement = placement ? getBasePlacement(placement) : null;
	var variation = placement ? getVariation(placement) : null;
	var commonX = reference.x + reference.width / 2 - element.width / 2;
	var commonY = reference.y + reference.height / 2 - element.height / 2;
	var offsets;
	switch (basePlacement) {
		case "top":
			offsets = {
				x: commonX,
				y: reference.y - element.height
			};
			break;
		case bottom:
			offsets = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case right:
			offsets = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case left:
			offsets = {
				x: reference.x - element.width,
				y: commonY
			};
			break;
		default: offsets = {
			x: reference.x,
			y: reference.y
		};
	}
	var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	if (mainAxis != null) {
		var len = mainAxis === "y" ? "height" : "width";
		switch (variation) {
			case start:
				offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
				break;
			case "end":
				offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
				break;
			default:
		}
	}
	return offsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
	if (options === void 0) options = {};
	var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
	var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
	var altContext = elementContext === "popper" ? reference : popper;
	var popperRect = state.rects.popper;
	var element = state.elements[altBoundary ? altContext : elementContext];
	var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	var referenceClientRect = getBoundingClientRect(state.elements.reference);
	var popperOffsets = computeOffsets({
		reference: referenceClientRect,
		element: popperRect,
		strategy: "absolute",
		placement
	});
	var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	var elementClientRect = elementContext === "popper" ? popperClientRect : referenceClientRect;
	var overflowOffsets = {
		top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
		bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
		left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
		right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	};
	var offsetData = state.modifiersData.offset;
	if (elementContext === "popper" && offsetData) {
		var offset = offsetData[placement];
		Object.keys(overflowOffsets).forEach(function(key) {
			var multiply = ["right", "bottom"].indexOf(key) >= 0 ? 1 : -1;
			var axis = ["top", "bottom"].indexOf(key) >= 0 ? "y" : "x";
			overflowOffsets[key] += offset[axis] * multiply;
		});
	}
	return overflowOffsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
	if (options === void 0) options = {};
	var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	var variation = getVariation(placement);
	var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement) {
		return getVariation(placement) === variation;
	}) : basePlacements;
	var allowedPlacements = placements$1.filter(function(placement) {
		return allowedAutoPlacements.indexOf(placement) >= 0;
	});
	if (allowedPlacements.length === 0) allowedPlacements = placements$1;
	var overflows = allowedPlacements.reduce(function(acc, placement) {
		acc[placement] = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			padding
		})[getBasePlacement(placement)];
		return acc;
	}, {});
	return Object.keys(overflows).sort(function(a, b) {
		return overflows[a] - overflows[b];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
	if (getBasePlacement(placement) === "auto") return [];
	var oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeVariationPlacement(placement),
		oppositePlacement,
		getOppositeVariationPlacement(oppositePlacement)
	];
}
function flip(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	if (state.modifiersData[name]._skip) return;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
	var preferredPlacement = state.options.placement;
	var isBasePlacement = getBasePlacement(preferredPlacement) === preferredPlacement;
	var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement) {
		return acc.concat(getBasePlacement(placement) === "auto" ? computeAutoPlacement(state, {
			placement,
			boundary,
			rootBoundary,
			padding,
			flipVariations,
			allowedAutoPlacements
		}) : placement);
	}, []);
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var checksMap = /* @__PURE__ */ new Map();
	var makeFallbackChecks = true;
	var firstFittingPlacement = placements[0];
	for (var i = 0; i < placements.length; i++) {
		var placement = placements[i];
		var _basePlacement = getBasePlacement(placement);
		var isStartVariation = getVariation(placement) === start;
		var isVertical = ["top", bottom].indexOf(_basePlacement) >= 0;
		var len = isVertical ? "width" : "height";
		var overflow = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			altBoundary,
			padding
		});
		var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : "top";
		if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
		var altVariationSide = getOppositePlacement(mainVariationSide);
		var checks = [];
		if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
		if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
		if (checks.every(function(check) {
			return check;
		})) {
			firstFittingPlacement = placement;
			makeFallbackChecks = false;
			break;
		}
		checksMap.set(placement, checks);
	}
	if (makeFallbackChecks) {
		var numberOfChecks = flipVariations ? 3 : 1;
		var _loop = function _loop(_i) {
			var fittingPlacement = placements.find(function(placement) {
				var checks = checksMap.get(placement);
				if (checks) return checks.slice(0, _i).every(function(check) {
					return check;
				});
			});
			if (fittingPlacement) {
				firstFittingPlacement = fittingPlacement;
				return "break";
			}
		};
		for (var _i = numberOfChecks; _i > 0; _i--) if (_loop(_i) === "break") break;
	}
	if (state.placement !== firstFittingPlacement) {
		state.modifiersData[name]._skip = true;
		state.placement = firstFittingPlacement;
		state.reset = true;
	}
}
var flip_default = {
	name: "flip",
	enabled: true,
	phase: "main",
	fn: flip,
	requiresIfExists: ["offset"],
	data: { _skip: false }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
	if (preventedOffsets === void 0) preventedOffsets = {
		x: 0,
		y: 0
	};
	return {
		top: overflow.top - rect.height - preventedOffsets.y,
		right: overflow.right - rect.width + preventedOffsets.x,
		bottom: overflow.bottom - rect.height + preventedOffsets.y,
		left: overflow.left - rect.width - preventedOffsets.x
	};
}
function isAnySideFullyClipped(overflow) {
	return [
		"top",
		right,
		bottom,
		left
	].some(function(side) {
		return overflow[side] >= 0;
	});
}
function hide(_ref) {
	var state = _ref.state, name = _ref.name;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var preventedOffsets = state.modifiersData.preventOverflow;
	var referenceOverflow = detectOverflow(state, { elementContext: "reference" });
	var popperAltOverflow = detectOverflow(state, { altBoundary: true });
	var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	state.modifiersData[name] = {
		referenceClippingOffsets,
		popperEscapeOffsets,
		isReferenceHidden,
		hasPopperEscaped
	};
	state.attributes.popper = Object.assign({}, state.attributes.popper, {
		"data-popper-reference-hidden": isReferenceHidden,
		"data-popper-escaped": hasPopperEscaped
	});
}
var hide_default = {
	name: "hide",
	enabled: true,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: hide
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset) {
	var basePlacement = getBasePlacement(placement);
	var invertDistance = ["left", "top"].indexOf(basePlacement) >= 0 ? -1 : 1;
	var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, { placement })) : offset, skidding = _ref[0], distance = _ref[1];
	skidding = skidding || 0;
	distance = (distance || 0) * invertDistance;
	return ["left", "right"].indexOf(basePlacement) >= 0 ? {
		x: distance,
		y: skidding
	} : {
		x: skidding,
		y: distance
	};
}
function offset(_ref2) {
	var state = _ref2.state, options = _ref2.options, name = _ref2.name;
	var _options$offset = options.offset, offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	var data = placements.reduce(function(acc, placement) {
		acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
		return acc;
	}, {});
	var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
	if (state.modifiersData.popperOffsets != null) {
		state.modifiersData.popperOffsets.x += x;
		state.modifiersData.popperOffsets.y += y;
	}
	state.modifiersData[name] = data;
}
var offset_default = {
	name: "offset",
	enabled: true,
	phase: "main",
	requires: ["popperOffsets"],
	fn: offset
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
	var state = _ref.state, name = _ref.name;
	state.modifiersData[name] = computeOffsets({
		reference: state.rects.reference,
		element: state.rects.popper,
		strategy: "absolute",
		placement: state.placement
	});
}
var popperOffsets_default = {
	name: "popperOffsets",
	enabled: true,
	phase: "read",
	fn: popperOffsets,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
	return axis === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	var overflow = detectOverflow(state, {
		boundary,
		rootBoundary,
		padding,
		altBoundary
	});
	var basePlacement = getBasePlacement(state.placement);
	var variation = getVariation(state.placement);
	var isBasePlacement = !variation;
	var mainAxis = getMainAxisFromPlacement(basePlacement);
	var altAxis = getAltAxis(mainAxis);
	var popperOffsets = state.modifiersData.popperOffsets;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, { placement: state.placement })) : tetherOffset;
	var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
		mainAxis: tetherOffsetValue,
		altAxis: tetherOffsetValue
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, tetherOffsetValue);
	var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	var data = {
		x: 0,
		y: 0
	};
	if (!popperOffsets) return;
	if (checkMainAxis) {
		var _offsetModifierState$;
		var mainSide = mainAxis === "y" ? "top" : left;
		var altSide = mainAxis === "y" ? bottom : right;
		var len = mainAxis === "y" ? "height" : "width";
		var offset = popperOffsets[mainAxis];
		var min$1 = offset + overflow[mainSide];
		var max$1 = offset - overflow[altSide];
		var additive = tether ? -popperRect[len] / 2 : 0;
		var minLen = variation === "start" ? referenceRect[len] : popperRect[len];
		var maxLen = variation === "start" ? -popperRect[len] : -referenceRect[len];
		var arrowElement = state.elements.arrow;
		var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
			width: 0,
			height: 0
		};
		var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
		var arrowPaddingMin = arrowPaddingObject[mainSide];
		var arrowPaddingMax = arrowPaddingObject[altSide];
		var arrowLen = within(0, referenceRect[len], arrowRect[len]);
		var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
		var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
		var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
		var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
		var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
		var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
		var tetherMax = offset + maxOffset - offsetModifierValue;
		var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
		popperOffsets[mainAxis] = preventedOffset;
		data[mainAxis] = preventedOffset - offset;
	}
	if (checkAltAxis) {
		var _offsetModifierState$2;
		var _mainSide = mainAxis === "x" ? "top" : left;
		var _altSide = mainAxis === "x" ? bottom : right;
		var _offset = popperOffsets[altAxis];
		var _len = altAxis === "y" ? "height" : "width";
		var _min = _offset + overflow[_mainSide];
		var _max = _offset - overflow[_altSide];
		var isOriginSide = ["top", left].indexOf(basePlacement) !== -1;
		var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
		var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
		var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
		var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
		popperOffsets[altAxis] = _preventedOffset;
		data[altAxis] = _preventedOffset - _offset;
	}
	state.modifiersData[name] = data;
}
var preventOverflow_default = {
	name: "preventOverflow",
	enabled: true,
	phase: "main",
	fn: preventOverflow,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
	return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
	if (node === getWindow(node) || !isHTMLElement$1(node)) return getWindowScroll(node);
	else return getHTMLElementScroll(node);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
	var rect = element.getBoundingClientRect();
	var scaleX = round(rect.width) / element.offsetWidth || 1;
	var scaleY = round(rect.height) / element.offsetHeight || 1;
	return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	if (isFixed === void 0) isFixed = false;
	var isOffsetParentAnElement = isHTMLElement$1(offsetParent);
	var offsetParentIsScaled = isHTMLElement$1(offsetParent) && isElementScaled(offsetParent);
	var documentElement = getDocumentElement(offsetParent);
	var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	var scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	var offsets = {
		x: 0,
		y: 0
	};
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isHTMLElement$1(offsetParent)) {
			offsets = getBoundingClientRect(offsetParent, true);
			offsets.x += offsetParent.clientLeft;
			offsets.y += offsetParent.clientTop;
		} else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
	}
	return {
		x: rect.left + scroll.scrollLeft - offsets.x,
		y: rect.top + scroll.scrollTop - offsets.y,
		width: rect.width,
		height: rect.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
	var map = /* @__PURE__ */ new Map();
	var visited = /* @__PURE__ */ new Set();
	var result = [];
	modifiers.forEach(function(modifier) {
		map.set(modifier.name, modifier);
	});
	function sort(modifier) {
		visited.add(modifier.name);
		[].concat(modifier.requires || [], modifier.requiresIfExists || []).forEach(function(dep) {
			if (!visited.has(dep)) {
				var depModifier = map.get(dep);
				if (depModifier) sort(depModifier);
			}
		});
		result.push(modifier);
	}
	modifiers.forEach(function(modifier) {
		if (!visited.has(modifier.name)) sort(modifier);
	});
	return result;
}
function orderModifiers(modifiers) {
	var orderedModifiers = order(modifiers);
	return modifierPhases.reduce(function(acc, phase) {
		return acc.concat(orderedModifiers.filter(function(modifier) {
			return modifier.phase === phase;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
	var pending;
	return function() {
		if (!pending) pending = new Promise(function(resolve) {
			Promise.resolve().then(function() {
				pending = void 0;
				resolve(fn());
			});
		});
		return pending;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
	var merged = modifiers.reduce(function(merged, current) {
		var existing = merged[current.name];
		merged[current.name] = existing ? Object.assign({}, existing, current, {
			options: Object.assign({}, existing.options, current.options),
			data: Object.assign({}, existing.data, current.data)
		}) : current;
		return merged;
	}, {});
	return Object.keys(merged).map(function(key) {
		return merged[key];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function areValidElements() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return !args.some(function(element) {
		return !(element && typeof element.getBoundingClientRect === "function");
	});
}
function popperGenerator(generatorOptions) {
	if (generatorOptions === void 0) generatorOptions = {};
	var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	return function createPopper(reference, popper, options) {
		if (options === void 0) options = defaultOptions;
		var state = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
			modifiersData: {},
			elements: {
				reference,
				popper
			},
			attributes: {},
			styles: {}
		};
		var effectCleanupFns = [];
		var isDestroyed = false;
		var instance = {
			state,
			setOptions: function setOptions(setOptionsAction) {
				var options = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
				cleanupModifierEffects();
				state.options = Object.assign({}, defaultOptions, state.options, options);
				state.scrollParents = {
					reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
					popper: listScrollParents(popper)
				};
				var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
				state.orderedModifiers = orderedModifiers.filter(function(m) {
					return m.enabled;
				});
				runModifierEffects();
				return instance.update();
			},
			forceUpdate: function forceUpdate() {
				if (isDestroyed) return;
				var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
				if (!areValidElements(reference, popper)) return;
				state.rects = {
					reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === "fixed"),
					popper: getLayoutRect(popper)
				};
				state.reset = false;
				state.placement = state.options.placement;
				state.orderedModifiers.forEach(function(modifier) {
					return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
				});
				for (var index = 0; index < state.orderedModifiers.length; index++) {
					if (state.reset === true) {
						state.reset = false;
						index = -1;
						continue;
					}
					var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
					if (typeof fn === "function") state = fn({
						state,
						options: _options,
						name,
						instance
					}) || state;
				}
			},
			update: debounce(function() {
				return new Promise(function(resolve) {
					instance.forceUpdate();
					resolve(state);
				});
			}),
			destroy: function destroy() {
				cleanupModifierEffects();
				isDestroyed = true;
			}
		};
		if (!areValidElements(reference, popper)) return instance;
		instance.setOptions(options).then(function(state) {
			if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
		});
		function runModifierEffects() {
			state.orderedModifiers.forEach(function(_ref) {
				var name = _ref.name, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, effect = _ref.effect;
				if (typeof effect === "function") {
					var cleanupFn = effect({
						state,
						name,
						instance,
						options
					});
					effectCleanupFns.push(cleanupFn || function noopFn() {});
				}
			});
		}
		function cleanupModifierEffects() {
			effectCleanupFns.forEach(function(fn) {
				return fn();
			});
			effectCleanupFns = [];
		}
		return instance;
	};
}
var createPopper = /* @__PURE__ */ popperGenerator({ defaultModifiers: [
	eventListeners_default,
	popperOffsets_default,
	computeStyles_default,
	applyStyles_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default,
	hide_default
] });
//#endregion
//#region node_modules/@mui/utils/useSlotProps/useSlotProps.mjs
/**
* @ignore - do not document.
* Builds the props to be passed into the slot of an unstyled component.
* It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
* If the slot component is not a host component, it also merges in the `ownerState`.
*
* @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
*/
function useSlotProps(parameters) {
	const { elementType, externalSlotProps, ownerState, skipResolvingSlotProps = false, ...other } = parameters;
	const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
	const { props: mergedProps, internalRef } = mergeSlotProps$1({
		...other,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);
	return appendOwnerState(elementType, {
		...mergedProps,
		ref
	}, ownerState);
}
//#endregion
//#region node_modules/@mui/material/utils/isLayoutSupported.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function isLayoutSupported() {
	return !(/jsdom|HappyDOM/.test(window.navigator.userAgent) || false);
}
//#endregion
//#region node_modules/@mui/utils/getReactElementRef/getReactElementRef.mjs
/**
* Returns the ref of a React element handling differences between React 19 and older versions.
* It will throw runtime error if the element is not a valid React element.
*
* @param element React.ReactElement
* @returns React.Ref<any> | null
*/
function getReactElementRef(element) {
	if (parseInt("19.2.6", 10) >= 19) return element?.props?.ref || null;
	return element?.ref || null;
}
//#endregion
//#region node_modules/@mui/material/Portal/Portal.mjs
function getContainer(container) {
	return typeof container === "function" ? container() : container;
}
/**
* Portals provide a first-class way to render children into a DOM node
* that exists outside the DOM hierarchy of the parent component.
*
* Demos:
*
* - [Portal](https://mui.com/material-ui/react-portal/)
*
* API:
*
* - [Portal API](https://mui.com/material-ui/api/portal/)
*/
var Portal = /* @__PURE__ */ import_react.forwardRef(function Portal(props, forwardedRef) {
	const { children, container, disablePortal = false } = props;
	const [mountNode, setMountNode] = import_react.useState(null);
	const handleRef = useForkRef(/* @__PURE__ */ import_react.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
	useEnhancedEffect(() => {
		if (!disablePortal) setMountNode(getContainer(container) || document.body);
	}, [container, disablePortal]);
	useEnhancedEffect(() => {
		if (mountNode && !disablePortal) {
			setRef(forwardedRef, mountNode);
			return () => {
				setRef(forwardedRef, null);
			};
		}
	}, [
		forwardedRef,
		mountNode,
		disablePortal
	]);
	if (disablePortal) {
		if (/* @__PURE__ */ import_react.isValidElement(children)) {
			const newProps = { ref: handleRef };
			return /* @__PURE__ */ import_react.cloneElement(children, newProps);
		}
		return children;
	}
	return mountNode ? /* @__PURE__ */ import_react_dom.createPortal(children, mountNode) : mountNode;
});
Portal.propTypes = {
	/**
	* The children to render into the `container`.
	*/
	children: import_prop_types.default.node,
	/**
	* An HTML element or function that returns one.
	* The `container` will have the portal children appended to it.
	*
	* You can also provide a callback, which is called in a React layout effect.
	* This lets you set the container from a ref, and also makes server-side rendering possible.
	*
	* By default, it uses the body of the top-level document object,
	* so it's simply `document.body` most of the time.
	*/
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	/**
	* The `children` will be under the DOM hierarchy of the parent component.
	* @default false
	*/
	disablePortal: import_prop_types.default.bool
};
Portal["propTypes"] = exactProp(Portal.propTypes);
//#endregion
//#region node_modules/@mui/material/Popper/popperClasses.mjs
function getPopperUtilityClass(slot) {
	return generateUtilityClass("MuiPopper", slot);
}
var popperClasses = generateUtilityClasses("MuiPopper", ["root"]);
//#endregion
//#region node_modules/@mui/material/Popper/BasePopper.mjs
function flipPlacement(placement, direction) {
	if (direction === "ltr") return placement;
	switch (placement) {
		case "bottom-end": return "bottom-start";
		case "bottom-start": return "bottom-end";
		case "top-end": return "top-start";
		case "top-start": return "top-end";
		default: return placement;
	}
}
function resolveAnchorEl(anchorEl) {
	return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement(element) {
	return element.nodeType !== void 0;
}
function isVirtualElement(element) {
	return !isHTMLElement(element);
}
var useUtilityClasses$3 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getPopperUtilityClass, classes);
};
var defaultPopperOptions = {};
var PopperTooltip = /* @__PURE__ */ import_react.forwardRef(function PopperTooltip(props, forwardedRef) {
	const { anchorEl, children, direction, disablePortal, modifiers, open, placement: initialPlacement, popperOptions, popperRef: popperRefProp, slotProps = {}, slots = {}, TransitionProps, ownerState: ownerStateProp, ...other } = props;
	const tooltipRef = import_react.useRef(null);
	const ownRef = useForkRef(tooltipRef, forwardedRef);
	const popperRef = import_react.useRef(null);
	const handlePopperRef = useForkRef(popperRef, popperRefProp);
	const handlePopperRefRef = import_react.useRef(handlePopperRef);
	useEnhancedEffect(() => {
		handlePopperRefRef.current = handlePopperRef;
	}, [handlePopperRef]);
	import_react.useImperativeHandle(popperRefProp, () => popperRef.current, []);
	const rtlPlacement = flipPlacement(initialPlacement, direction);
	/**
	* placement initialized from prop but can change during lifetime if modifiers.flip.
	* modifiers.flip is essentially a flip for controlled/uncontrolled behavior
	*/
	const [placement, setPlacement] = import_react.useState(rtlPlacement);
	const [resolvedAnchorElement, setResolvedAnchorElement] = import_react.useState(resolveAnchorEl(anchorEl));
	import_react.useEffect(() => {
		if (popperRef.current) popperRef.current.forceUpdate();
	});
	import_react.useEffect(() => {
		if (anchorEl) setResolvedAnchorElement(resolveAnchorEl(anchorEl));
	}, [anchorEl]);
	useEnhancedEffect(() => {
		if (!resolvedAnchorElement || !open) return;
		const handlePopperUpdate = (data) => {
			setPlacement(data.placement);
		};
		if (resolvedAnchorElement && isHTMLElement(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
			const box = resolvedAnchorElement.getBoundingClientRect();
			if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) console.warn([
				"MUI: The `anchorEl` prop provided to the component is invalid.",
				"The anchor element should be part of the document layout.",
				"Make sure the element is present in the document or that it's not display none."
			].join("\n"));
		}
		let popperModifiers = [
			{
				name: "preventOverflow",
				options: { altBoundary: disablePortal }
			},
			{
				name: "flip",
				options: { altBoundary: disablePortal }
			},
			{
				name: "onUpdate",
				enabled: true,
				phase: "afterWrite",
				fn: ({ state }) => {
					handlePopperUpdate(state);
				}
			}
		];
		if (modifiers != null) popperModifiers = popperModifiers.concat(modifiers);
		if (popperOptions && popperOptions.modifiers != null) popperModifiers = popperModifiers.concat(popperOptions.modifiers);
		const popper = createPopper(resolvedAnchorElement, tooltipRef.current, {
			placement: rtlPlacement,
			...popperOptions,
			modifiers: popperModifiers
		});
		handlePopperRefRef.current(popper);
		const popperElement = tooltipRef.current;
		return () => {
			if (popperElement) {
				const { style } = popperElement;
				const position = style.position;
				const top = style.top;
				const left = style.left;
				const transform = style.transform;
				popper.destroy();
				style.position = position;
				style.top = top;
				style.left = left;
				style.transform = transform;
			} else popper.destroy();
			handlePopperRefRef.current(null);
		};
	}, [
		resolvedAnchorElement,
		disablePortal,
		modifiers,
		open,
		popperOptions,
		rtlPlacement
	]);
	const childProps = { placement };
	if (TransitionProps !== null) childProps.TransitionProps = TransitionProps;
	const classes = useUtilityClasses$3(props);
	const Root = slots.root ?? "div";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		...useSlotProps({
			elementType: Root,
			externalSlotProps: slotProps.root,
			externalForwardedProps: other,
			additionalProps: {
				role: "tooltip",
				ref: ownRef
			},
			ownerState: props,
			className: classes.root
		}),
		children: typeof children === "function" ? children(childProps) : children
	});
});
/**
* @ignore - internal component.
*/
var Popper$1 = /* @__PURE__ */ import_react.forwardRef(function Popper(props, forwardedRef) {
	const { anchorEl, children, container: containerProp, direction = "ltr", disablePortal = false, keepMounted = false, modifiers, open, placement = "bottom", popperOptions = defaultPopperOptions, popperRef, style, transition = false, slotProps = {}, slots = {}, ...other } = props;
	const [exited, setExited] = import_react.useState(true);
	const handleEnter = () => {
		setExited(false);
	};
	const handleExited = () => {
		setExited(true);
	};
	if (!keepMounted && !open && (!transition || exited)) return null;
	let container;
	if (containerProp) container = containerProp;
	else if (anchorEl) {
		const resolvedAnchorEl = resolveAnchorEl(anchorEl);
		container = resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
	}
	const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
	const transitionProps = transition ? {
		in: open,
		onEnter: handleEnter,
		onExited: handleExited
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		disablePortal,
		container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperTooltip, {
			anchorEl,
			direction,
			disablePortal,
			modifiers,
			ref: forwardedRef,
			open: transition ? !exited : open,
			placement,
			popperOptions,
			popperRef,
			slotProps,
			slots,
			...other,
			style: {
				position: "fixed",
				top: 0,
				left: 0,
				display,
				...style
			},
			TransitionProps: transitionProps,
			children
		})
	});
});
Popper$1.propTypes = {
	/**
	* An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
	* or a function that returns either.
	* It's used to set the position of the popper.
	* The return value will passed as the reference object of the Popper instance.
	*/
	anchorEl: chainPropTypes(import_prop_types.default.oneOfType([
		HTMLElementType,
		import_prop_types.default.object,
		import_prop_types.default.func
	]), (props) => {
		if (props.open) {
			const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
			if (resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
				const box = resolvedAnchorEl.getBoundingClientRect();
				if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) return new Error([
					"MUI: The `anchorEl` prop provided to the component is invalid.",
					"The anchor element should be part of the document layout.",
					"Make sure the element is present in the document or that it's not display none."
				].join("\n"));
			} else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) return new Error([
				"MUI: The `anchorEl` prop provided to the component is invalid.",
				"It should be an HTML element instance or a virtualElement ",
				"(https://popper.js.org/docs/v2/virtual-elements/)."
			].join("\n"));
		}
		return null;
	}),
	/**
	* Popper render function or node.
	*/
	children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
	/**
	* An HTML element or function that returns one.
	* The `container` will have the portal children appended to it.
	*
	* You can also provide a callback, which is called in a React layout effect.
	* This lets you set the container from a ref, and also makes server-side rendering possible.
	*
	* By default, it uses the body of the top-level document object,
	* so it's simply `document.body` most of the time.
	*/
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	/**
	* Direction of the text.
	* @default 'ltr'
	*/
	direction: import_prop_types.default.oneOf(["ltr", "rtl"]),
	/**
	* The `children` will be under the DOM hierarchy of the parent component.
	* @default false
	*/
	disablePortal: import_prop_types.default.bool,
	/**
	* Always keep the children in the DOM.
	* This prop can be useful in SEO situation or
	* when you want to maximize the responsiveness of the Popper.
	* @default false
	*/
	keepMounted: import_prop_types.default.bool,
	/**
	* Popper.js is based on a "plugin-like" architecture,
	* most of its features are fully encapsulated "modifiers".
	*
	* A modifier is a function that is called each time Popper.js needs to
	* compute the position of the popper.
	* For this reason, modifiers should be very performant to avoid bottlenecks.
	* To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
	*/
	modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		data: import_prop_types.default.object,
		effect: import_prop_types.default.func,
		enabled: import_prop_types.default.bool,
		fn: import_prop_types.default.func,
		name: import_prop_types.default.any,
		options: import_prop_types.default.object,
		phase: import_prop_types.default.oneOf([
			"afterMain",
			"afterRead",
			"afterWrite",
			"beforeMain",
			"beforeRead",
			"beforeWrite",
			"main",
			"read",
			"write"
		]),
		requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
		requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
	})),
	/**
	* If `true`, the component is shown.
	*/
	open: import_prop_types.default.bool.isRequired,
	/**
	* Popper placement.
	* @default 'bottom'
	*/
	placement: import_prop_types.default.oneOf([
		"auto-end",
		"auto-start",
		"auto",
		"bottom-end",
		"bottom-start",
		"bottom",
		"left-end",
		"left-start",
		"left",
		"right-end",
		"right-start",
		"right",
		"top-end",
		"top-start",
		"top"
	]),
	/**
	* Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
	* @default {}
	*/
	popperOptions: import_prop_types.default.shape({
		modifiers: import_prop_types.default.array,
		onFirstUpdate: import_prop_types.default.func,
		placement: import_prop_types.default.oneOf([
			"auto-end",
			"auto-start",
			"auto",
			"bottom-end",
			"bottom-start",
			"bottom",
			"left-end",
			"left-start",
			"left",
			"right-end",
			"right-start",
			"right",
			"top-end",
			"top-start",
			"top"
		]),
		strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
	}),
	/**
	* A ref that points to the used popper instance.
	*/
	popperRef: refType,
	/**
	* The props used for each slot inside the Popper.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({ root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]) }),
	/**
	* The components used for each slot inside the Popper.
	* Either a string to use a HTML element or a component.
	* @default {}
	*/
	slots: import_prop_types.default.shape({ root: import_prop_types.default.elementType }),
	/**
	* Help supporting a react-transition-group/Transition component.
	* @default false
	*/
	transition: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/material/Popper/Popper.mjs
var PopperRoot = styled(Popper$1, {
	name: "MuiPopper",
	slot: "Root"
})({});
/**
*
* Demos:
*
* - [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
* - [Menu](https://mui.com/material-ui/react-menu/)
* - [Popper](https://mui.com/material-ui/react-popper/)
*
* API:
*
* - [Popper API](https://mui.com/material-ui/api/popper/)
*/
var Popper = /* @__PURE__ */ import_react.forwardRef(function Popper(inProps, ref) {
	const isRtl = useRtl();
	const { anchorEl, component, container, disablePortal, keepMounted, modifiers, open, placement, popperOptions, popperRef, transition, slots, slotProps, ...other } = useDefaultProps({
		props: inProps,
		name: "MuiPopper"
	});
	const otherProps = {
		anchorEl,
		container,
		disablePortal,
		keepMounted,
		modifiers,
		open,
		placement,
		popperOptions,
		popperRef,
		transition,
		...other
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperRoot, {
		as: component,
		direction: isRtl ? "rtl" : "ltr",
		slots,
		slotProps,
		...otherProps,
		ref
	});
});
Popper.propTypes = {
	/**
	* An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
	* or a function that returns either.
	* It's used to set the position of the popper.
	* The return value will passed as the reference object of the Popper instance.
	*/
	anchorEl: import_prop_types.default.oneOfType([
		HTMLElementType,
		import_prop_types.default.object,
		import_prop_types.default.func
	]),
	/**
	* Popper render function or node.
	*/
	children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* An HTML element or function that returns one.
	* The `container` will have the portal children appended to it.
	*
	* You can also provide a callback, which is called in a React layout effect.
	* This lets you set the container from a ref, and also makes server-side rendering possible.
	*
	* By default, it uses the body of the top-level document object,
	* so it's simply `document.body` most of the time.
	*/
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	/**
	* The `children` will be under the DOM hierarchy of the parent component.
	* @default false
	*/
	disablePortal: import_prop_types.default.bool,
	/**
	* Always keep the children in the DOM.
	* This prop can be useful in SEO situation or
	* when you want to maximize the responsiveness of the Popper.
	* @default false
	*/
	keepMounted: import_prop_types.default.bool,
	/**
	* Popper.js is based on a "plugin-like" architecture,
	* most of its features are fully encapsulated "modifiers".
	*
	* A modifier is a function that is called each time Popper.js needs to
	* compute the position of the popper.
	* For this reason, modifiers should be very performant to avoid bottlenecks.
	* To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
	*/
	modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		data: import_prop_types.default.object,
		effect: import_prop_types.default.func,
		enabled: import_prop_types.default.bool,
		fn: import_prop_types.default.func,
		name: import_prop_types.default.any,
		options: import_prop_types.default.object,
		phase: import_prop_types.default.oneOf([
			"afterMain",
			"afterRead",
			"afterWrite",
			"beforeMain",
			"beforeRead",
			"beforeWrite",
			"main",
			"read",
			"write"
		]),
		requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
		requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
	})),
	/**
	* If `true`, the component is shown.
	*/
	open: import_prop_types.default.bool.isRequired,
	/**
	* Popper placement.
	* @default 'bottom'
	*/
	placement: import_prop_types.default.oneOf([
		"auto-end",
		"auto-start",
		"auto",
		"bottom-end",
		"bottom-start",
		"bottom",
		"left-end",
		"left-start",
		"left",
		"right-end",
		"right-start",
		"right",
		"top-end",
		"top-start",
		"top"
	]),
	/**
	* Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
	* @default {}
	*/
	popperOptions: import_prop_types.default.shape({
		modifiers: import_prop_types.default.array,
		onFirstUpdate: import_prop_types.default.func,
		placement: import_prop_types.default.oneOf([
			"auto-end",
			"auto-start",
			"auto",
			"bottom-end",
			"bottom-start",
			"bottom",
			"left-end",
			"left-start",
			"left",
			"right-end",
			"right-start",
			"right",
			"top-end",
			"top-start",
			"top"
		]),
		strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
	}),
	/**
	* A ref that points to the used popper instance.
	*/
	popperRef: refType,
	/**
	* The props used for each slot inside the Popper.
	* @default {}
	*/
	slotProps: import_prop_types.default.shape({ root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]) }),
	/**
	* The components used for each slot inside the Popper.
	* Either a string to use a HTML element or a component.
	* @default {}
	*/
	slots: import_prop_types.default.shape({ root: import_prop_types.default.elementType }),
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
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
	* Help supporting a react-transition-group/Transition component.
	* @default false
	*/
	transition: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/material/Button/buttonClasses.mjs
function getButtonUtilityClass(slot) {
	return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", [
	"root",
	"text",
	"outlined",
	"contained",
	"disableElevation",
	"focusVisible",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorError",
	"colorInfo",
	"colorWarning",
	"sizeMedium",
	"sizeSmall",
	"sizeLarge",
	"fullWidth",
	"startIcon",
	"endIcon",
	"icon",
	"loading",
	"loadingWrapper",
	"loadingIconPlaceholder",
	"loadingIndicator",
	"loadingPositionCenter",
	"loadingPositionStart",
	"loadingPositionEnd"
]);
//#endregion
//#region node_modules/@mui/material/ButtonGroup/ButtonGroupContext.mjs
/**
* @ignore - internal component.
*/
var ButtonGroupContext = /* @__PURE__ */ import_react.createContext({});
ButtonGroupContext.displayName = "ButtonGroupContext";
//#endregion
//#region node_modules/@mui/material/ButtonGroup/ButtonGroupButtonContext.mjs
/**
* @ignore - internal component.
*/
var ButtonGroupButtonContext = /* @__PURE__ */ import_react.createContext(void 0);
ButtonGroupButtonContext.displayName = "ButtonGroupButtonContext";
//#endregion
//#region node_modules/@mui/material/Button/Button.mjs
var useUtilityClasses$2 = (ownerState) => {
	const { color, disableElevation, fullWidth, size, variant, loading, loadingPosition, classes } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			loading && "loading",
			variant,
			`size${capitalize_default(size)}`,
			`color${capitalize_default(color)}`,
			disableElevation && "disableElevation",
			fullWidth && "fullWidth",
			loading && `loadingPosition${capitalize_default(loadingPosition)}`
		],
		startIcon: ["icon", "startIcon"],
		endIcon: ["icon", "endIcon"],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getButtonUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var commonIconStyles = [
	{
		props: { size: "small" },
		style: { "& > *:nth-of-type(1)": { fontSize: 18 } }
	},
	{
		props: { size: "medium" },
		style: { "& > *:nth-of-type(1)": { fontSize: 20 } }
	},
	{
		props: { size: "large" },
		style: { "& > *:nth-of-type(1)": { fontSize: 22 } }
	}
];
var ButtonRoot = styled(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`size${capitalize_default(ownerState.size)}`],
			ownerState.color === "inherit" && styles.colorInherit,
			ownerState.disableElevation && styles.disableElevation,
			ownerState.fullWidth && styles.fullWidth,
			ownerState.loading && styles.loading
		];
	}
})(memoTheme(({ theme }) => {
	const inheritContainedBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
	const inheritContainedHoverBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey.A100 : theme.palette.grey[700];
	return {
		...theme.typography.button,
		minWidth: 64,
		padding: "6px 16px",
		border: 0,
		borderRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create([
			"background-color",
			"box-shadow",
			"border-color",
			"color"
		], { duration: theme.transitions.duration.short }),
		"&:hover": { textDecoration: "none" },
		[`&.${buttonClasses.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
		variants: [
			{
				props: ({ ownerState }) => ownerState.startIcon || ownerState.loading && ownerState.loadingPosition === "start",
				style: { "&::before": {
					content: "\"\\200b\"",
					width: 0,
					overflow: "hidden"
				} }
			},
			{
				props: { variant: "contained" },
				style: {
					color: `var(--variant-containedColor)`,
					backgroundColor: `var(--variant-containedBg)`,
					boxShadow: (theme.vars || theme).shadows[2],
					"&:hover": {
						boxShadow: (theme.vars || theme).shadows[4],
						"@media (hover: none)": { boxShadow: (theme.vars || theme).shadows[2] }
					},
					"&:active": { boxShadow: (theme.vars || theme).shadows[8] },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: (theme.vars || theme).shadows[6] },
					[`&.${buttonClasses.disabled}`]: {
						color: (theme.vars || theme).palette.action.disabled,
						boxShadow: (theme.vars || theme).shadows[0],
						backgroundColor: (theme.vars || theme).palette.action.disabledBackground
					}
				}
			},
			{
				props: { variant: "outlined" },
				style: {
					padding: "5px 15px",
					border: "1px solid currentColor",
					borderColor: `var(--variant-outlinedBorder, currentColor)`,
					backgroundColor: `var(--variant-outlinedBg)`,
					color: `var(--variant-outlinedColor)`,
					[`&.${buttonClasses.disabled}`]: { border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}` }
				}
			},
			{
				props: { variant: "text" },
				style: {
					padding: "6px 8px",
					color: `var(--variant-textColor)`,
					backgroundColor: `var(--variant-textBg)`
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: { color },
				style: {
					"--variant-textColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedBorder": theme.alpha((theme.vars || theme).palette[color].main, .5),
					"--variant-containedColor": (theme.vars || theme).palette[color].contrastText,
					"--variant-containedBg": (theme.vars || theme).palette[color].main,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": (theme.vars || theme).palette[color].dark,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBorder": (theme.vars || theme).palette[color].main,
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			})),
			{
				props: { color: "inherit" },
				style: {
					color: "inherit",
					borderColor: "currentColor",
					"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			},
			{
				props: {
					size: "small",
					variant: "text"
				},
				style: {
					padding: "4px 5px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "text"
				},
				style: {
					padding: "8px 11px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					padding: "3px 9px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "outlined"
				},
				style: {
					padding: "7px 21px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "contained"
				},
				style: {
					padding: "4px 10px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "contained"
				},
				style: {
					padding: "8px 22px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: { disableElevation: true },
				style: {
					boxShadow: "none",
					"&:hover": { boxShadow: "none" },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: "none" },
					"&:active": { boxShadow: "none" },
					[`&.${buttonClasses.disabled}`]: { boxShadow: "none" }
				}
			},
			{
				props: { fullWidth: true },
				style: { width: "100%" }
			},
			{
				props: { loadingPosition: "center" },
				style: {
					transition: theme.transitions.create([
						"background-color",
						"box-shadow",
						"border-color"
					], { duration: theme.transitions.duration.short }),
					[`&.${buttonClasses.loading}`]: { color: "transparent" }
				}
			}
		]
	};
}));
var ButtonStartIcon = styled("span", {
	name: "MuiButton",
	slot: "StartIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.startIcon, ownerState.loading && styles.startIconLoadingStart];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: 8,
	marginLeft: -4,
	variants: [
		{
			props: { size: "small" },
			style: { marginLeft: -2 }
		},
		{
			props: {
				loadingPosition: "start",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "start",
				loading: true,
				fullWidth: true
			},
			style: { marginRight: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonEndIcon = styled("span", {
	name: "MuiButton",
	slot: "EndIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.endIcon, ownerState.loading && styles.endIconLoadingEnd];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: -4,
	marginLeft: 8,
	variants: [
		{
			props: { size: "small" },
			style: { marginRight: -2 }
		},
		{
			props: {
				loadingPosition: "end",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "end",
				loading: true,
				fullWidth: true
			},
			style: { marginLeft: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonLoadingIndicator = styled("span", {
	name: "MuiButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	variants: [
		{
			props: { loading: true },
			style: { display: "flex" }
		},
		{
			props: { loadingPosition: "start" },
			style: { left: 14 }
		},
		{
			props: {
				loadingPosition: "start",
				size: "small"
			},
			style: { left: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "start"
			},
			style: { left: 6 }
		},
		{
			props: { loadingPosition: "center" },
			style: {
				left: "50%",
				transform: "translate(-50%)",
				color: (theme.vars || theme).palette.action.disabled
			}
		},
		{
			props: { loadingPosition: "end" },
			style: { right: 14 }
		},
		{
			props: {
				loadingPosition: "end",
				size: "small"
			},
			style: { right: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "end"
			},
			style: { right: 6 }
		},
		{
			props: {
				loadingPosition: "start",
				fullWidth: true
			},
			style: {
				position: "relative",
				left: -10
			}
		},
		{
			props: {
				loadingPosition: "end",
				fullWidth: true
			},
			style: {
				position: "relative",
				right: -10
			}
		}
	]
}));
var ButtonLoadingIconPlaceholder = styled("span", {
	name: "MuiButton",
	slot: "LoadingIconPlaceholder"
})({
	display: "inline-block",
	width: "1em",
	height: "1em"
});
var Button = /* @__PURE__ */ import_react.forwardRef(function Button(inProps, ref) {
	const contextProps = import_react.useContext(ButtonGroupContext);
	const buttonGroupButtonContextPositionClassName = import_react.useContext(ButtonGroupButtonContext);
	const props = useDefaultProps({
		props: resolveProps(contextProps, inProps),
		name: "MuiButton"
	});
	const { children, color = "primary", component = "button", className, disabled = false, disableElevation = false, disableFocusRipple = false, endIcon: endIconProp, focusVisibleClassName, fullWidth = false, id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, loadingPosition = "center", size = "medium", startIcon: startIconProp, type, variant = "text", ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		disableElevation,
		disableFocusRipple,
		fullWidth,
		loading,
		loadingIndicator,
		loadingPosition,
		size,
		type,
		variant
	};
	const classes = useUtilityClasses$2(ownerState);
	const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonStartIcon, {
		className: classes.startIcon,
		ownerState,
		children: startIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonEndIcon, {
		className: classes.endIcon,
		ownerState,
		children: endIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const positionClassName = buttonGroupButtonContextPositionClassName || "";
	const loader = typeof loading === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: classes.loadingWrapper,
		style: { display: "contents" },
		children: loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIndicator, {
			className: classes.loadingIndicator,
			ownerState,
			children: loadingIndicator
		})
	}) : null;
	const { root, ...forwardedClasses } = classes;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonRoot, {
		ownerState,
		className: clsx(contextProps.className, classes.root, className, positionClassName),
		component,
		disabled: disabled || loading,
		focusRipple: !disableFocusRipple,
		focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
		ref,
		internalNativeButton: true,
		type,
		id: loading ? loadingId : idProp,
		...other,
		classes: forwardedClasses,
		children: [
			startIcon,
			loadingPosition !== "end" && loader,
			children,
			loadingPosition === "end" && loader,
			endIcon
		]
	});
});
Button.propTypes = {
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the component.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'primary'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary",
		"success",
		"error",
		"info",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, no elevation is used.
	* @default false
	*/
	disableElevation: import_prop_types.default.bool,
	/**
	* If `true`, the  keyboard focus ripple is disabled.
	* @default false
	*/
	disableFocusRipple: import_prop_types.default.bool,
	/**
	* If `true`, the ripple effect is disabled.
	*
	* ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
	* to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
	* @default false
	*/
	disableRipple: import_prop_types.default.bool,
	/**
	* Element placed after the children.
	*/
	endIcon: import_prop_types.default.node,
	/**
	* @ignore
	*/
	focusVisibleClassName: import_prop_types.default.string,
	/**
	* If `true`, the button will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
	/**
	* The URL to link to when the button is clicked.
	* If defined, an `a` element will be used as the root node.
	*/
	href: import_prop_types.default.string,
	/**
	* @ignore
	*/
	id: import_prop_types.default.string,
	/**
	* If `true`, the loading indicator is visible and the button is disabled.
	* If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
	* @default null
	*/
	loading: import_prop_types.default.bool,
	/**
	* Element placed before the children if the button is in loading state.
	* The node should contain an element with `role="progressbar"` with an accessible name.
	* By default, it renders a `CircularProgress` that is labeled by the button itself.
	* @default <CircularProgress color="inherit" size={16} />
	*/
	loadingIndicator: import_prop_types.default.node,
	/**
	* The loading indicator can be positioned on the start, end, or the center of the button.
	* @default 'center'
	*/
	loadingPosition: import_prop_types.default.oneOf([
		"center",
		"end",
		"start"
	]),
	/**
	* The size of the component.
	* `small` is equivalent to the dense button styling.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
	/**
	* Element placed before the children.
	*/
	startIcon: import_prop_types.default.node,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
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
	* @ignore
	*/
	type: import_prop_types.default.string,
	/**
	* The variant to use.
	* @default 'text'
	*/
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"contained",
		"outlined",
		"text"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/utils/getValidReactChildren/getValidReactChildren.mjs
/**
* Gets only the valid children of a component,
* and ignores any nullish or falsy child.
*
* @param children the children
*/
function getValidReactChildren(children) {
	return import_react.Children.toArray(children).filter((child) => /* @__PURE__ */ import_react.isValidElement(child));
}
//#endregion
//#region node_modules/@mui/material/NoSsr/NoSsr.mjs
/**
* NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
*
* This component can be useful in a variety of situations:
*
* * Escape hatch for broken dependencies not supporting SSR.
* * Improve the time-to-first paint on the client by only rendering above the fold.
* * Reduce the rendering time on the server.
* * Under too heavy server load, you can turn on service degradation.
*
* Demos:
*
* - [No SSR](https://mui.com/material-ui/react-no-ssr/)
*
* API:
*
* - [NoSsr API](https://mui.com/material-ui/api/no-ssr/)
*/
function NoSsr(props) {
	const { children, defer = false, fallback = null } = props;
	const [mountedState, setMountedState] = import_react.useState(false);
	useEnhancedEffect(() => {
		if (!defer) setMountedState(true);
	}, [defer]);
	import_react.useEffect(() => {
		if (defer) setMountedState(true);
	}, [defer]);
	return mountedState ? children : fallback;
}
NoSsr.propTypes = {
	/**
	* You can wrap a node.
	*/
	children: import_prop_types.default.node,
	/**
	* If `true`, the component will not only prevent server-side rendering.
	* It will also defer the rendering of the children into a different screen frame.
	* @default false
	*/
	defer: import_prop_types.default.bool,
	/**
	* The fallback content to display.
	* @default null
	*/
	fallback: import_prop_types.default.node
};
NoSsr["propTypes"] = exactProp(NoSsr.propTypes);
//#endregion
//#region node_modules/@mui/material/ToggleButton/toggleButtonClasses.mjs
function getToggleButtonUtilityClass(slot) {
	return generateUtilityClass("MuiToggleButton", slot);
}
var toggleButtonClasses = generateUtilityClasses("MuiToggleButton", [
	"root",
	"disabled",
	"selected",
	"standard",
	"primary",
	"secondary",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"fullWidth"
]);
//#endregion
//#region node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroupContext.mjs
/**
* @ignore - internal component.
*/
var ToggleButtonGroupContext = /* @__PURE__ */ import_react.createContext({});
ToggleButtonGroupContext.displayName = "ToggleButtonGroupContext";
//#endregion
//#region node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroupButtonContext.mjs
/**
* @ignore - internal component.
*/
var ToggleButtonGroupButtonContext = /* @__PURE__ */ import_react.createContext(void 0);
ToggleButtonGroupButtonContext.displayName = "ToggleButtonGroupButtonContext";
//#endregion
//#region node_modules/@mui/material/ToggleButtonGroup/isValueSelected.mjs
function isValueSelected(value, candidate) {
	if (candidate === void 0 || value === void 0) return false;
	if (Array.isArray(candidate)) return candidate.includes(value);
	return value === candidate;
}
//#endregion
//#region node_modules/@mui/material/ToggleButton/ToggleButton.mjs
var useUtilityClasses$1 = (ownerState) => {
	const { classes, fullWidth, selected, disabled, size, color } = ownerState;
	return composeClasses({ root: [
		"root",
		selected && "selected",
		disabled && "disabled",
		fullWidth && "fullWidth",
		`size${capitalize_default(size)}`,
		color
	] }, getToggleButtonUtilityClass, classes);
};
var ToggleButtonRoot = styled(ButtonBase, {
	name: "MuiToggleButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, styles[`size${capitalize_default(ownerState.size)}`]];
	}
})(memoTheme(({ theme }) => ({
	...theme.typography.button,
	borderRadius: (theme.vars || theme).shape.borderRadius,
	padding: 11,
	border: `1px solid ${(theme.vars || theme).palette.divider}`,
	color: (theme.vars || theme).palette.action.active,
	[`&.${toggleButtonClasses.disabled}`]: {
		color: (theme.vars || theme).palette.action.disabled,
		border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
	},
	"&:hover": {
		textDecoration: "none",
		backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	variants: [
		{
			props: { color: "standard" },
			style: { [`&.${toggleButtonClasses.selected}`]: {
				color: (theme.vars || theme).palette.text.primary,
				backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.selectedOpacity),
				"&:hover": {
					backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
					"@media (hover: none)": { backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.selectedOpacity) }
				}
			} }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { [`&.${toggleButtonClasses.selected}`]: {
				color: (theme.vars || theme).palette[color].main,
				backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.selectedOpacity),
				"&:hover": {
					backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
					"@media (hover: none)": { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.selectedOpacity) }
				}
			} }
		})),
		{
			props: { fullWidth: true },
			style: { width: "100%" }
		},
		{
			props: { size: "small" },
			style: {
				padding: 7,
				fontSize: theme.typography.pxToRem(13)
			}
		},
		{
			props: { size: "large" },
			style: {
				padding: 15,
				fontSize: theme.typography.pxToRem(15)
			}
		}
	]
})));
var ToggleButton = /* @__PURE__ */ import_react.forwardRef(function ToggleButton(inProps, ref) {
	const { value: contextValue, ...contextProps } = import_react.useContext(ToggleButtonGroupContext);
	const toggleButtonGroupButtonContextPositionClassName = import_react.useContext(ToggleButtonGroupButtonContext);
	const props = useDefaultProps({
		props: resolveProps({
			...contextProps,
			selected: isValueSelected(inProps.value, contextValue)
		}, inProps),
		name: "MuiToggleButton"
	});
	const { children, className, color = "standard", disabled = false, disableFocusRipple = false, fullWidth = false, onChange, onClick, selected, size = "medium", value, ...other } = props;
	const ownerState = {
		...props,
		color,
		disabled,
		disableFocusRipple,
		fullWidth,
		size
	};
	const classes = useUtilityClasses$1(ownerState);
	const handleChange = (event) => {
		if (onClick) {
			onClick(event, value);
			if (event.defaultPrevented) return;
		}
		if (onChange) onChange(event, value);
	};
	const positionClassName = toggleButtonGroupButtonContextPositionClassName || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleButtonRoot, {
		className: clsx(contextProps.className, classes.root, className, positionClassName),
		internalNativeButton: true,
		disabled,
		focusRipple: !disableFocusRipple,
		ref,
		onClick: handleChange,
		onChange,
		value,
		ownerState,
		"aria-pressed": selected,
		...other,
		children
	});
});
ToggleButton.propTypes = {
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the button when it is in an active state.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'standard'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"standard",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* If `true`, the component is disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, the  keyboard focus ripple is disabled.
	* @default false
	*/
	disableFocusRipple: import_prop_types.default.bool,
	/**
	* If `true`, the ripple effect is disabled.
	*
	* ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
	* to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
	* @default false
	*/
	disableRipple: import_prop_types.default.bool,
	/**
	* If `true`, the button will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
	/**
	* Callback fired when the state changes.
	*
	* @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
	* @param {any} value of the selected button.
	*/
	onChange: import_prop_types.default.func,
	/**
	* Callback fired when the button is clicked.
	*
	* @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
	* @param {any} value of the selected button.
	*/
	onClick: import_prop_types.default.func,
	/**
	* If `true`, the button is rendered in an active state.
	*/
	selected: import_prop_types.default.bool,
	/**
	* The size of the component.
	* The prop defaults to the value inherited from the parent ToggleButtonGroup component.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
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
	* The value to associate with the button when selected in a
	* ToggleButtonGroup.
	*/
	value: import_prop_types.default.any.isRequired
};
//#endregion
//#region node_modules/@mui/material/ToggleButtonGroup/toggleButtonGroupClasses.mjs
var import_react_is = require_react_is();
function getToggleButtonGroupUtilityClass(slot) {
	return generateUtilityClass("MuiToggleButtonGroup", slot);
}
var toggleButtonGroupClasses = generateUtilityClasses("MuiToggleButtonGroup", [
	"root",
	"selected",
	"horizontal",
	"vertical",
	"disabled",
	"grouped",
	"fullWidth",
	"firstButton",
	"lastButton",
	"middleButton"
]);
//#endregion
//#region node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.mjs
var useUtilityClasses = (ownerState) => {
	const { classes, orientation, fullWidth, disabled } = ownerState;
	return composeClasses({
		root: [
			"root",
			orientation,
			fullWidth && "fullWidth"
		],
		grouped: ["grouped", disabled && "disabled"],
		firstButton: ["firstButton"],
		lastButton: ["lastButton"],
		middleButton: ["middleButton"]
	}, getToggleButtonGroupUtilityClass, classes);
};
var ToggleButtonGroupRoot = styled("div", {
	name: "MuiToggleButtonGroup",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${toggleButtonGroupClasses.grouped}`]: styles.grouped },
			{ [`& .${toggleButtonGroupClasses.firstButton}`]: styles.firstButton },
			{ [`& .${toggleButtonGroupClasses.lastButton}`]: styles.lastButton },
			{ [`& .${toggleButtonGroupClasses.middleButton}`]: styles.middleButton },
			styles.root,
			ownerState.orientation === "vertical" && styles.vertical,
			ownerState.fullWidth && styles.fullWidth
		];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-flex",
	borderRadius: (theme.vars || theme).shape.borderRadius,
	variants: [
		{
			props: { orientation: "vertical" },
			style: {
				flexDirection: "column",
				[`& .${toggleButtonGroupClasses.grouped}`]: { [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]: {
					borderTop: 0,
					marginTop: 0
				} },
				[`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]: {
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0
				},
				[`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]: {
					marginTop: -1,
					borderTop: "1px solid transparent",
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0
				},
				[`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]: { borderTop: "1px solid transparent" }
			}
		},
		{
			props: { fullWidth: true },
			style: { width: "100%" }
		},
		{
			props: { orientation: "horizontal" },
			style: {
				[`& .${toggleButtonGroupClasses.grouped}`]: { [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]: {
					borderLeft: 0,
					marginLeft: 0
				} },
				[`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]: {
					borderTopRightRadius: 0,
					borderBottomRightRadius: 0
				},
				[`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]: {
					marginLeft: -1,
					borderLeft: "1px solid transparent",
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0
				},
				[`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]: { borderLeft: "1px solid transparent" }
			}
		}
	]
})));
var ToggleButtonGroup = /* @__PURE__ */ import_react.forwardRef(function ToggleButtonGroup(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiToggleButtonGroup"
	});
	const { children, className, color = "standard", disabled = false, exclusive = false, fullWidth = false, onChange, orientation = "horizontal", size = "medium", value, ...other } = props;
	const ownerState = {
		...props,
		disabled,
		fullWidth,
		orientation,
		size
	};
	const classes = useUtilityClasses(ownerState);
	const handleChange = import_react.useCallback((event, buttonValue) => {
		if (!onChange) return;
		const index = value && value.indexOf(buttonValue);
		let newValue;
		if (value && index >= 0) {
			newValue = value.slice();
			newValue.splice(index, 1);
		} else newValue = value ? value.concat(buttonValue) : [buttonValue];
		onChange(event, newValue);
	}, [onChange, value]);
	const handleExclusiveChange = import_react.useCallback((event, buttonValue) => {
		if (!onChange) return;
		onChange(event, value === buttonValue ? null : buttonValue);
	}, [onChange, value]);
	const context = import_react.useMemo(() => ({
		className: classes.grouped,
		onChange: exclusive ? handleExclusiveChange : handleChange,
		value,
		size,
		fullWidth,
		color,
		disabled
	}), [
		classes.grouped,
		exclusive,
		handleExclusiveChange,
		handleChange,
		value,
		size,
		fullWidth,
		color,
		disabled
	]);
	const validChildren = getValidReactChildren(children);
	const childrenCount = validChildren.length;
	const getButtonPositionClassName = (index) => {
		const isFirstButton = index === 0;
		const isLastButton = index === childrenCount - 1;
		if (isFirstButton && isLastButton) return "";
		if (isFirstButton) return classes.firstButton;
		if (isLastButton) return classes.lastButton;
		return classes.middleButton;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleButtonGroupRoot, {
		role: "group",
		className: clsx(classes.root, className),
		ref,
		ownerState,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleButtonGroupContext.Provider, {
			value: context,
			children: validChildren.map((child, index) => {
				if ((0, import_react_is.isFragment)(child)) console.error(["MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleButtonGroupButtonContext.Provider, {
					value: getButtonPositionClassName(index),
					children: child
				}, index);
			})
		})
	});
});
ToggleButtonGroup.propTypes = {
	/**
	* The content of the component.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The color of the button when it is selected.
	* It supports both default and custom theme colors, which can be added as shown in the
	* [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
	* @default 'standard'
	*/
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"standard",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	/**
	* If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
	* @default false
	*/
	disabled: import_prop_types.default.bool,
	/**
	* If `true`, only allow one of the child ToggleButton values to be selected.
	* @default false
	*/
	exclusive: import_prop_types.default.bool,
	/**
	* If `true`, the button group will take up the full width of its container.
	* @default false
	*/
	fullWidth: import_prop_types.default.bool,
	/**
	* Callback fired when the value changes.
	*
	* @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
	* @param {any} value of the selected buttons. When `exclusive` is true
	* this is a single value; when false an array of selected values. If no value
	* is selected and `exclusive` is true the value is null; when false an empty array.
	*/
	onChange: import_prop_types.default.func,
	/**
	* The component orientation (layout flow direction).
	* @default 'horizontal'
	*/
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
	/**
	* The size of the component.
	* @default 'medium'
	*/
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
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
	* The currently selected value within the group or an array of selected
	* values when `exclusive` is false.
	*
	* The value must have reference equality with the option in order to be selected.
	*/
	value: import_prop_types.default.any
};
//#endregion
//#region node_modules/@mui/material/useMediaQuery/index.mjs
var useMediaQuery = unstable_createUseMediaQuery({ themeId: identifier_default });
//#endregion
export { useControlled_default as $, circularProgressClasses as A, elementTypeAcceptingRef_default as B, Typography as C, getIconButtonUtilityClass as D, IconButton as E, getButtonBaseUtilityClass as F, _inheritsLoose as G, useTimeout as H, getTouchRippleUtilityClass as I, unstable_ClassNameGenerator as J, _objectWithoutPropertiesLoose as K, touchRippleClasses as L, createSimplePaletteValueFilter as M, ButtonBase as N, iconButtonClasses as O, buttonBaseClasses as P, useEventCallback as Q, isFocusVisible as R, HTMLElementType as S, typographyClasses as T, useLazyRef as U, Timeout as V, TransitionGroupContext_default as W, useForkRef_default as X, mergeSlotProps as Y, useEventCallback_default as Z, popperClasses as _, createChainedFunction_default as _t, ToggleButton as a, setRef as at, isLayoutSupported as b, NoSsr as c, ownerWindow as ct, ButtonGroupButtonContext as d, getActiveElement_default as dt, useControlled as et, ButtonGroupContext as f, activeElement as ft, getPopperUtilityClass as g, debounce$1 as gt, Popper as h, debounce_default as ht, toggleButtonGroupClasses as i, setRef_default as it, getCircularProgressUtilityClass as j, CircularProgress as k, getValidReactChildren as l, ownerDocument_default as lt, getButtonUtilityClass as m, deprecatedPropType_default as mt, ToggleButtonGroup as n, useId_default as nt, getToggleButtonUtilityClass as o, requirePropFactory_default as ot, buttonClasses as p, isMuiElement_default as pt, chainPropTypes as q, getToggleButtonGroupUtilityClass as r, useEnhancedEffect_default as rt, toggleButtonClasses as s, ownerWindow_default as st, useMediaQuery as t, unsupportedProp_default as tt, Button as u, ownerDocument as ut, Portal as v, createChainedFunction as vt, getTypographyUtilityClass as w, useSlotProps as x, getReactElementRef as y, refType as z };

//# sourceMappingURL=useMediaQuery-Db58fz2_.js.map