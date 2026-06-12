import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
import { Ar as require_prop_types, Dr as capitalize, F as useDefaultProps$1, P as DefaultPropsProvider$1, en as GlobalStyles$1, j as unstable_memoTheme, sn as require_jsx_runtime } from "./system-BtmZd1DY.js";
import { a as identifier_default, o as defaultTheme } from "./styled-SFJTYq9a.js";
//#region node_modules/@mui/material/utils/capitalize.mjs
var capitalize_default = capitalize;
//#endregion
//#region node_modules/@mui/material/GlobalStyles/GlobalStyles.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GlobalStyles(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$1, {
		...props,
		defaultTheme,
		themeId: identifier_default
	});
}
GlobalStyles.propTypes = { 
/**
* The styles you want to apply globally.
*/
styles: import_prop_types.default.oneOfType([
	import_prop_types.default.array,
	import_prop_types.default.func,
	import_prop_types.default.number,
	import_prop_types.default.object,
	import_prop_types.default.string,
	import_prop_types.default.bool
]) };
//#endregion
//#region node_modules/@mui/material/zero-styled/index.mjs
function globalCss(styles) {
	return function GlobalStylesWrapper(props) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles, { styles: typeof styles === "function" ? (theme) => styles({
			theme,
			...props
		}) : styles });
	};
}
//#endregion
//#region node_modules/@mui/material/utils/memoTheme.mjs
var memoTheme = unstable_memoTheme;
require_react();
function DefaultPropsProvider(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultPropsProvider$1, { ...props });
}
DefaultPropsProvider.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* @ignore
	*/
	value: import_prop_types.default.object.isRequired
};
function useDefaultProps(params) {
	return useDefaultProps$1(params);
}
//#endregion
export { capitalize_default as a, GlobalStyles as i, memoTheme as n, globalCss as r, useDefaultProps as t };

//# sourceMappingURL=DefaultPropsProvider-DbF6HWWd.js.map