import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
import {
  createStore
} from "./chunk-LU5A5MW3.js";
import {
  ActivityRowStoreSchema,
  BrowserConnectivityService,
  ContactRowStoreSchema,
  GroupRowStoreSchema,
  MembershipRowStoreSchema,
  PersonaRowStoreSchema,
  createCliAppConfig,
  detectPlatform,
  external_exports,
  pathArgSchema,
  unsafeAsDirectoryPath,
  unsafeAsFilePath
} from "./chunk-SZXJCQYO.js";
import {
  __commonJS,
  __toESM
} from "./chunk-H32PEK2K.js";

// node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement2(object3) {
      return "object" === typeof object3 && null !== object3 && object3.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement2(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement2(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size2) {
        return ReactSharedInternals.H.useMemoCache(size2);
      }
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render2) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render: render2 };
    };
    exports.isValidElement = isValidElement2;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(value2, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value2, initialValue);
    };
    exports.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer2) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer2);
    };
    exports.useReducer = function(reducer2, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer2, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.2.4";
  }
});

// node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value2) {
        return "" + value2;
      }
      function checkKeyStringCoercion(value2) {
        try {
          testStringCoercion(value2);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value2[Symbol.toStringTag] || value2.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value2);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement2(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement2(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement2(object3) {
        return "object" === typeof object3 && null !== object3 && object3.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement2(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement2(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size2) {
          return resolveDispatcher().useMemoCache(size2);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement2(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = fnName;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = deprecatedAPIs;
      exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports.forwardRef = function(render2) {
        null != render2 && render2.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render2 ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render2 ? "null" : typeof render2
        ) : 0 !== render2.length && 2 !== render2.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render2.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render2 && null != render2.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render: render2 }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render2.name || render2.displayName || (Object.defineProperty(render2, "name", { value: name }), render2.displayName = name);
          }
        });
        return elementType;
      };
      exports.isValidElement = isValidElement2;
      exports.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports.useDebugValue = function(value2, formatterFn) {
        return resolveDispatcher().useDebugValue(value2, formatterFn);
      };
      exports.useDeferredValue = function(value2, initialValue) {
        return resolveDispatcher().useDeferredValue(value2, initialValue);
      };
      exports.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports.useId = function() {
        return resolveDispatcher().useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer2) {
        return resolveDispatcher().useOptimistic(passthrough, reducer2);
      };
      exports.useReducer = function(reducer2, initialArg, init) {
        return resolveDispatcher().useReducer(reducer2, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports.version = "19.2.4";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/.pnpm/react@19.2.4/node_modules/react/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_production();
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = __commonJS({
  "node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config.key && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      };
    }
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = jsxProd;
    exports.jsxs = jsxProd;
  }
});

// node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/.pnpm/react@19.2.4/node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value2) {
        return "" + value2;
      }
      function checkKeyStringCoercion(value2) {
        try {
          testStringCoercion(value2);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value2[Symbol.toStringTag] || value2.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value2);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement2(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement2(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement2(object3) {
        return "object" === typeof object3 && null !== object3 && object3.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React47 = require_react(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = React47.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React47 = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React47.react_stack_bottom_frame.bind(
        React47,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_jsx_runtime_production();
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/.pnpm/deepmerge@4.3.1/node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/deepmerge@4.3.1/node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value2) {
      return isNonNullObject(value2) && !isSpecial(value2);
    };
    function isNonNullObject(value2) {
      return !!value2 && typeof value2 === "object";
    }
    function isSpecial(value2) {
      var stringValue = Object.prototype.toString.call(value2);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value2);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? /* @__PURE__ */ Symbol.for("react.element") : 60103;
    function isReactElement(value2) {
      return value2.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value2, options) {
      return options.clone !== false && options.isMergeableObject(value2) ? deepmerge2(emptyTarget(value2), value2, options) : value2;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge2;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge2;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object3, property) {
      try {
        return property in object3;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge2(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge2.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge2(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge2;
    module.exports = deepmerge_1;
  }
});

// packages/cli-shell/src/lib/filesystem-actions.ts
import path2 from "path";

// packages/filesystem/src/drivers/memory.ts
import path from "path";

// packages/filesystem/src/index.ts
var driverPromise;
var createFilesystemDriver = async () => {
  if (driverPromise) return driverPromise;
  driverPromise = (async () => {
    const env2 = detectPlatform();
    if (env2.platform === "nodejs" /* NodeJS */) {
      const { NativeFSDriver } = await import(
        /* @vite-ignore */
        "./node-NKGHIXEV.js"
      );
      return new NativeFSDriver();
    }
    if (env2.platform === "tauri" /* Tauri */) {
      const { TauriFSDriver } = await import("./tauri-V4MSLYBQ.js");
      return new TauriFSDriver();
    }
    const { BrowserStoreFSDriver } = await import("./browser-store-FXRKRRVP.js");
    return new BrowserStoreFSDriver();
  })();
  return driverPromise;
};
var getFilesystemBackendInfo = async () => {
  const env2 = detectPlatform();
  const driver = await createFilesystemDriver();
  if (env2.platform === "nodejs" /* NodeJS */) {
    return {
      platform: env2.platform,
      adapter: "native-node"
    };
  }
  if (env2.platform === "tauri" /* Tauri */) {
    const tauriDriver = driver;
    const info2 = await tauriDriver.getBackendInfo?.();
    const out2 = {
      platform: env2.platform,
      adapter: info2?.adapter ?? "tauri"
    };
    if (info2?.baseDir) out2.baseDir = info2.baseDir;
    return out2;
  }
  const browserDriver = driver;
  const info = await browserDriver.getBackendInfo?.();
  const out = {
    platform: env2.platform,
    adapter: info?.adapter ?? "browser-store"
  };
  if (info?.persistence) out.persistence = info.persistence;
  return out;
};

// packages/cli-shell/src/lib/file-operations.ts
var driverPromise2;
var getDriver = async () => {
  if (!driverPromise2) {
    driverPromise2 = createFilesystemDriver();
  }
  return driverPromise2;
};
var getFilesystemBackendInfo2 = async () => getFilesystemBackendInfo();

// packages/cli-shell/src/lib/bft-transfer.ts
var BftTextNodeSchema = external_exports.object({
  type: external_exports.literal("text"),
  content: external_exports.string(),
  comment: external_exports.string().optional()
});
var BftBinaryNodeSchema = external_exports.object({
  type: external_exports.literal("binary"),
  encoding: external_exports.literal("base64"),
  content: external_exports.string(),
  comment: external_exports.string().optional()
});
var BftNodeSchema = external_exports.lazy(
  () => external_exports.union([
    BftTextNodeSchema,
    BftBinaryNodeSchema,
    external_exports.object({
      type: external_exports.literal("directory"),
      entries: external_exports.record(external_exports.string(), BftNodeSchema),
      comment: external_exports.string().optional()
    })
  ])
);
var utf8Decoder = new TextDecoder("utf-8", { fatal: true });

// packages/cli-shell/src/lib/filesystem-args.schema.ts
var PathTokenSchema = pathArgSchema;
var CdArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var LsArgsSchema = external_exports.object({
  path: PathTokenSchema.optional()
});
var TreeArgsSchema = external_exports.object({
  path: PathTokenSchema.optional()
});
var StatArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var CatArgsSchema = external_exports.object({
  file: PathTokenSchema
});
var TouchArgsSchema = external_exports.object({
  file: PathTokenSchema
});
var MkdirArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var RmArgsSchema = external_exports.object({
  path: PathTokenSchema
});
var CpArgsSchema = external_exports.object({
  source: PathTokenSchema,
  dest: PathTokenSchema
});
var MvArgsSchema = external_exports.object({
  source: PathTokenSchema,
  dest: PathTokenSchema
});

// packages/cli-shell/src/lib/filesystem-actions.ts
var isNode = () => detectPlatform().platform === "nodejs" /* NodeJS */;
var pathOps = () => isNode() ? path2 : path2.posix;
var getDefaultCwd = () => {
  if (!isNode()) return "/";
  const nodeProcess = globalThis.process;
  return nodeProcess?.cwd?.() ?? "/";
};
var joinFsPath = (left, right) => pathOps().join(left, right);
var resolveFsPath = (cwd, input = ".") => {
  const ops = pathOps();
  return isNode() ? ops.resolve(cwd, input) : ops.normalize(input.startsWith("/") ? input : ops.join(cwd, input));
};
var basename = (targetPath) => pathOps().basename(targetPath);
var toFilePath = (targetPath) => unsafeAsFilePath(targetPath);
var toDirectoryPath = (targetPath) => unsafeAsDirectoryPath(targetPath);
var validatePathArg = (value2, label) => {
  const parsed = PathTokenSchema.safeParse(value2);
  if (!parsed.success) {
    const message2 = parsed.error.issues.map((issue) => issue.message).join("; ");
    throw new Error(`${label}: ${message2}`);
  }
  return parsed.data;
};
var sortEntries = (entries) => entries.slice().sort((a, b) => {
  if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
  return a.name.localeCompare(b.name);
});
var changeDir = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  if (!entry.isDirectory) {
    throw new Error(`Not a directory: ${requested}`);
  }
  return targetPath;
};
var listDirectory = async (cwd, requested = ".") => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  const entries = await driver.readdir(toDirectoryPath(targetPath));
  return sortEntries(entries);
};
var readTextFile = async (cwd, requested) => {
  const bytes = await readBytesFile(cwd, requested);
  return new TextDecoder().decode(bytes);
};
var readBytesFile = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid file path"));
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  if (entry.isDirectory) {
    throw new Error(`Not a file: ${requested}`);
  }
  return driver.readFile(toFilePath(targetPath));
};
var touchFile = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid file path"));
  const driver = await getDriver();
  const exists = await driver.exists(toFilePath(targetPath));
  if (exists) {
    const entry = await driver.stat(toFilePath(targetPath));
    if (entry.isDirectory) {
      throw new Error(`Not a file: ${requested}`);
    }
  }
  await driver.writeFile(toFilePath(targetPath), new Uint8Array());
  return targetPath;
};
var makeDirectory = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  await driver.mkdir(toDirectoryPath(targetPath));
  return targetPath;
};
var removeRecursiveAbsolute = async (targetPath) => {
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  if (entry.isDirectory) {
    const children = await driver.readdir(toDirectoryPath(targetPath));
    for (const child of children) {
      await removeRecursiveAbsolute(joinFsPath(targetPath, child.name));
    }
  }
  await driver.rm(toFilePath(targetPath));
};
var copyRecursiveAbsolute = async (sourcePath, destPath) => {
  const driver = await getDriver();
  const source = await driver.stat(toFilePath(sourcePath));
  if (source.isDirectory) {
    await driver.mkdir(toDirectoryPath(destPath));
    const children = await driver.readdir(toDirectoryPath(sourcePath));
    for (const child of children) {
      await copyRecursiveAbsolute(joinFsPath(sourcePath, child.name), joinFsPath(destPath, child.name));
    }
    return;
  }
  const data = await driver.readFile(toFilePath(sourcePath));
  await driver.writeFile(toFilePath(destPath), data);
};
var removePath = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid path"));
  await removeRecursiveAbsolute(targetPath);
  return targetPath;
};
var copyPath = async (cwd, source, dest) => {
  const sourcePath = resolveFsPath(cwd, validatePathArg(source, "Invalid source path"));
  const destPath = resolveFsPath(cwd, validatePathArg(dest, "Invalid destination path"));
  await copyRecursiveAbsolute(sourcePath, destPath);
  return { sourcePath, destPath };
};
var movePath = async (cwd, source, dest) => {
  const sourcePath = resolveFsPath(cwd, validatePathArg(source, "Invalid source path"));
  const destPath = resolveFsPath(cwd, validatePathArg(dest, "Invalid destination path"));
  await copyRecursiveAbsolute(sourcePath, destPath);
  await removeRecursiveAbsolute(sourcePath);
  return { sourcePath, destPath };
};
var statPath = async (cwd, requested) => {
  const targetPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid path"));
  const driver = await getDriver();
  const entry = await driver.stat(toFilePath(targetPath));
  return { path: targetPath, entry };
};
var buildTree = async (cwd, requested = ".") => {
  const rootPath = resolveFsPath(cwd, validatePathArg(requested, "Invalid directory path"));
  const driver = await getDriver();
  const root = await driver.stat(toFilePath(rootPath));
  if (!root.isDirectory) {
    throw new Error(`Not a directory: ${requested}`);
  }
  const walk = async (dirPath, name) => {
    const entries = sortEntries(await driver.readdir(toDirectoryPath(dirPath)));
    const children = await Promise.all(
      entries.map(async (entry) => {
        const childPath = joinFsPath(dirPath, entry.name);
        if (!entry.isDirectory) {
          return { name: entry.name, path: childPath, isDirectory: false };
        }
        return walk(childPath, entry.name);
      })
    );
    return {
      name,
      path: dirPath,
      isDirectory: true,
      children
    };
  };
  const rootName = basename(rootPath) || rootPath;
  return walk(rootPath, rootName);
};
var treeText = async (cwd, requested = ".") => {
  const tree = await buildTree(cwd, requested);
  const lines = [`${tree.name}/`];
  const walk = (node, prefix) => {
    const children = node.children ?? [];
    children.forEach((child, index) => {
      const isLast = index === children.length - 1;
      const branch = isLast ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ";
      lines.push(`${prefix}${branch}${child.name}${child.isDirectory ? "/" : ""}`);
      if (child.isDirectory) {
        walk(child, `${prefix}${isLast ? "    " : "\u2502   "}`);
      }
    });
  };
  walk(tree, "");
  return lines.join("\n");
};

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/annotations.js
var annotationKey = /* @__PURE__ */ Symbol.for("@optique/core/parser/annotation");

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/message.js
function message(message$1, ...values$1) {
  const messageTerms = [];
  for (let i = 0; i < message$1.length; i++) {
    if (message$1[i] !== "") messageTerms.push({
      type: "text",
      text: message$1[i]
    });
    if (i >= values$1.length) continue;
    const value$1 = values$1[i];
    if (typeof value$1 === "string") messageTerms.push({
      type: "value",
      value: value$1
    });
    else if (Array.isArray(value$1)) messageTerms.push(...value$1);
    else if (typeof value$1 === "object" && value$1 != null && "type" in value$1) messageTerms.push(value$1);
    else throw new TypeError(`Invalid value type in message: ${typeof value$1}.`);
  }
  return messageTerms;
}
function text(text$1) {
  return {
    type: "text",
    text: text$1
  };
}
function optionName(name) {
  return {
    type: "optionName",
    optionName: name
  };
}
function metavar(metavar$1) {
  return {
    type: "metavar",
    metavar: metavar$1
  };
}
function valueSet(values$1, options) {
  if (values$1.length === 0) return [];
  const formatter = new Intl.ListFormat(options?.locale, {
    type: options?.type,
    style: options?.style
  });
  const parts = formatter.formatToParts(values$1);
  const result = [];
  for (const part of parts) if (part.type === "element") result.push({
    type: "value",
    value: part.value
  });
  else result.push({
    type: "text",
    text: part.value
  });
  return result;
}
function formatMessage(msg, options = {}) {
  const colorConfig = options.colors ?? false;
  const useColors = typeof colorConfig === "boolean" ? colorConfig : true;
  const resetSuffix = typeof colorConfig === "object" ? colorConfig.resetSuffix ?? "" : "";
  const useQuotes = options.quotes ?? true;
  const resetSequence = `\x1B[0m${resetSuffix}`;
  function* stream() {
    const wordPattern = /\s*\S+\s*/g;
    for (const term of msg) if (term.type === "text") if (term.text.includes("\n\n")) {
      const paragraphs = term.text.split(/\n\n+/);
      for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        if (paragraphIndex > 0) yield {
          text: "\n",
          width: -1
        };
        const paragraph = paragraphs[paragraphIndex].replace(/\n/g, " ");
        wordPattern.lastIndex = 0;
        while (true) {
          const match = wordPattern.exec(paragraph);
          if (match == null) break;
          yield {
            text: match[0],
            width: match[0].length
          };
        }
      }
    } else {
      const normalizedText = term.text.replace(/\n/g, " ");
      if (normalizedText.trim() === "" && normalizedText.length > 0) yield {
        text: " ",
        width: 1
      };
      else {
        wordPattern.lastIndex = 0;
        while (true) {
          const match = wordPattern.exec(normalizedText);
          if (match == null) break;
          yield {
            text: match[0],
            width: match[0].length
          };
        }
      }
    }
    else if (term.type === "optionName") {
      const name = useQuotes ? `\`${term.optionName}\`` : term.optionName;
      yield {
        text: useColors ? `\x1B[3m${name}${resetSequence}` : name,
        width: name.length
      };
    } else if (term.type === "optionNames") {
      const names = term.optionNames.map((name) => useQuotes ? `\`${name}\`` : name);
      let i = 0;
      for (const name of names) {
        if (i > 0) yield {
          text: "/",
          width: 1
        };
        yield {
          text: useColors ? `\x1B[3m${name}${resetSequence}` : name,
          width: name.length
        };
        i++;
      }
    } else if (term.type === "metavar") {
      const metavar$1 = useQuotes ? `\`${term.metavar}\`` : term.metavar;
      yield {
        text: useColors ? `\x1B[1m${metavar$1}${resetSequence}` : metavar$1,
        width: metavar$1.length
      };
    } else if (term.type === "value") {
      const value$1 = useQuotes ? `${JSON.stringify(term.value)}` : term.value;
      yield {
        text: useColors ? `\x1B[32m${value$1}${resetSequence}` : value$1,
        width: value$1.length
      };
    } else if (term.type === "values") for (let i = 0; i < term.values.length; i++) {
      if (i > 0) yield {
        text: " ",
        width: 1
      };
      const value$1 = useQuotes ? JSON.stringify(term.values[i]) : term.values[i];
      yield {
        text: useColors ? i <= 0 ? `\x1B[32m${value$1}` : i + 1 >= term.values.length ? `${value$1}${resetSequence}` : value$1 : value$1,
        width: value$1.length
      };
    }
    else if (term.type === "envVar") {
      const envVar$1 = useQuotes ? `\`${term.envVar}\`` : term.envVar;
      yield {
        text: useColors ? `\x1B[1;4m${envVar$1}${resetSequence}` : envVar$1,
        width: envVar$1.length
      };
    } else if (term.type === "commandLine") {
      const cmd = useQuotes ? `\`${term.commandLine}\`` : term.commandLine;
      yield {
        text: useColors ? `\x1B[36m${cmd}${resetSequence}` : cmd,
        width: cmd.length
      };
    } else if (term.type === "lineBreak") yield {
      text: "\n",
      width: -1
    };
    else if (term.type === "url") {
      const urlString = term.url.href;
      const displayText = useQuotes ? `<${urlString}>` : urlString;
      if (useColors) {
        const hyperlink = `\x1B]8;;${urlString}\x1B\\${displayText}\x1B]8;;\x1B\\${resetSuffix}`;
        yield {
          text: hyperlink,
          width: displayText.length
        };
      } else yield {
        text: displayText,
        width: displayText.length
      };
    } else throw new TypeError(`Invalid MessageTerm type: ${term["type"]}.`);
  }
  let output = "";
  let totalWidth = 0;
  for (const { text: text$1, width } of stream()) {
    if (width === -1) {
      output += text$1;
      totalWidth = 0;
      continue;
    }
    if (options.maxWidth != null && totalWidth + width > options.maxWidth) {
      output += "\n";
      totalWidth = 0;
    }
    output += text$1;
    totalWidth += width;
  }
  return output;
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/dependency.js
var dependencySourceMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencySourceMarker");
var derivedValueParserMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/derivedValueParserMarker");
var dependencyId = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencyId");
var dependencyIds = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencyIds");
var defaultValues = /* @__PURE__ */ Symbol.for("@optique/core/dependency/defaultValues");
var parseWithDependency = /* @__PURE__ */ Symbol.for("@optique/core/dependency/parseWithDependency");
var suggestWithDependency = /* @__PURE__ */ Symbol.for("@optique/core/dependency/suggestWithDependency");
function isDependencySource(parser) {
  return dependencySourceMarker in parser && parser[dependencySourceMarker] === true;
}
function isDerivedValueParser(parser) {
  return derivedValueParserMarker in parser && parser[derivedValueParserMarker] === true;
}
var deferredParseMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/deferredParseMarker");
function isDeferredParseState(value2) {
  return typeof value2 === "object" && value2 !== null && deferredParseMarker in value2 && value2[deferredParseMarker] === true;
}
function getDependencyIds(parser) {
  if (dependencyIds in parser) return parser[dependencyIds];
  return [parser[dependencyId]];
}
function getDefaultValuesFunction(parser) {
  if (defaultValues in parser) return parser[defaultValues];
  return void 0;
}
function createDeferredParseState(rawInput, parser, preliminaryResult) {
  const multipleIds = dependencyIds in parser ? parser[dependencyIds] : void 0;
  const defaultValuesFn = defaultValues in parser ? parser[defaultValues] : void 0;
  const defaultVals = defaultValuesFn ? defaultValuesFn() : void 0;
  return {
    [deferredParseMarker]: true,
    rawInput,
    parser,
    dependencyId: parser[dependencyId],
    dependencyIds: multipleIds,
    defaultValues: defaultVals,
    preliminaryResult
  };
}
var dependencySourceStateMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/dependencySourceStateMarker");
function isDependencySourceState(value2) {
  return typeof value2 === "object" && value2 !== null && dependencySourceStateMarker in value2 && value2[dependencySourceStateMarker] === true;
}
function createDependencySourceState(result, depId) {
  return {
    [dependencySourceStateMarker]: true,
    [dependencyId]: depId,
    result
  };
}
var pendingDependencySourceStateMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/pendingDependencySourceStateMarker");
function isPendingDependencySourceState(value2) {
  return typeof value2 === "object" && value2 !== null && pendingDependencySourceStateMarker in value2 && value2[pendingDependencySourceStateMarker] === true;
}
var wrappedDependencySourceMarker = /* @__PURE__ */ Symbol.for("@optique/core/dependency/wrappedDependencySourceMarker");
function isWrappedDependencySource(parser) {
  return typeof parser === "object" && parser !== null && wrappedDependencySourceMarker in parser;
}
var DependencyRegistry = class DependencyRegistry2 {
  values = /* @__PURE__ */ new Map();
  /**
  * Registers a resolved dependency value.
  * @param id The dependency ID.
  * @param value The resolved value.
  */
  set(id, value2) {
    this.values.set(id, value2);
  }
  /**
  * Gets a resolved dependency value.
  * @param id The dependency ID.
  * @returns The resolved value, or undefined if not found.
  */
  get(id) {
    return this.values.get(id);
  }
  /**
  * Checks if a dependency has been resolved.
  * @param id The dependency ID.
  * @returns `true` if the dependency has been resolved.
  */
  has(id) {
    return this.values.has(id);
  }
  /**
  * Creates a copy of the registry.
  */
  clone() {
    const copy = new DependencyRegistry2();
    for (const [id, value2] of this.values) copy.values.set(id, value2);
    return copy;
  }
};

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/usage.js
function extractOptionNames(usage) {
  const names = /* @__PURE__ */ new Set();
  function traverseUsage(terms) {
    if (!terms || !Array.isArray(terms)) return;
    for (const term of terms) if (term.type === "option") {
      if (term.hidden) continue;
      for (const name of term.names) names.add(name);
    } else if (term.type === "optional" || term.type === "multiple") traverseUsage(term.terms);
    else if (term.type === "exclusive") for (const exclusiveUsage of term.terms) traverseUsage(exclusiveUsage);
  }
  traverseUsage(usage);
  return names;
}
function extractCommandNames(usage) {
  const names = /* @__PURE__ */ new Set();
  function traverseUsage(terms) {
    if (!terms || !Array.isArray(terms)) return;
    for (const term of terms) if (term.type === "command") {
      if (term.hidden) continue;
      names.add(term.name);
    } else if (term.type === "optional" || term.type === "multiple") traverseUsage(term.terms);
    else if (term.type === "exclusive") for (const exclusiveUsage of term.terms) traverseUsage(exclusiveUsage);
  }
  traverseUsage(usage);
  return names;
}
function extractArgumentMetavars(usage) {
  const metavars = /* @__PURE__ */ new Set();
  function traverseUsage(terms) {
    if (!terms || !Array.isArray(terms)) return;
    for (const term of terms) if (term.type === "argument") {
      if (term.hidden) continue;
      metavars.add(term.metavar);
    } else if (term.type === "optional" || term.type === "multiple") traverseUsage(term.terms);
    else if (term.type === "exclusive") for (const exclusiveUsage of term.terms) traverseUsage(exclusiveUsage);
  }
  traverseUsage(usage);
  return metavars;
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/mode-dispatch.js
function dispatchByMode(mode, syncFn, asyncFn) {
  if (mode === "async") return asyncFn();
  return syncFn();
}
function dispatchIterableByMode(mode, syncFn, asyncFn) {
  if (mode === "async") return asyncFn();
  return syncFn();
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/suggestion.js
function levenshteinDistance(source, target) {
  if (source.length === 0) return target.length;
  if (target.length === 0) return source.length;
  if (source.length > target.length) [source, target] = [target, source];
  let previousRow = new Array(source.length + 1);
  let currentRow = new Array(source.length + 1);
  for (let i = 0; i <= source.length; i++) previousRow[i] = i;
  for (let j = 1; j <= target.length; j++) {
    currentRow[0] = j;
    for (let i = 1; i <= source.length; i++) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      currentRow[i] = Math.min(currentRow[i - 1] + 1, previousRow[i] + 1, previousRow[i - 1] + cost);
    }
    [previousRow, currentRow] = [currentRow, previousRow];
  }
  return previousRow[source.length];
}
var DEFAULT_FIND_SIMILAR_OPTIONS = {
  maxDistance: 3,
  maxDistanceRatio: 0.5,
  maxSuggestions: 3,
  caseSensitive: false
};
function findSimilar(input, candidates, options = {}) {
  const maxDistance = options.maxDistance ?? DEFAULT_FIND_SIMILAR_OPTIONS.maxDistance;
  const maxDistanceRatio = options.maxDistanceRatio ?? DEFAULT_FIND_SIMILAR_OPTIONS.maxDistanceRatio;
  const maxSuggestions = options.maxSuggestions ?? DEFAULT_FIND_SIMILAR_OPTIONS.maxSuggestions;
  const caseSensitive = options.caseSensitive ?? DEFAULT_FIND_SIMILAR_OPTIONS.caseSensitive;
  if (input.length === 0) return [];
  const normalizedInput = caseSensitive ? input : input.toLowerCase();
  const matches = [];
  for (const candidate of candidates) {
    const normalizedCandidate = caseSensitive ? candidate : candidate.toLowerCase();
    const distance = levenshteinDistance(normalizedInput, normalizedCandidate);
    if (distance === 0) return [candidate];
    const distanceRatio = distance / input.length;
    if (distance <= maxDistance && distanceRatio <= maxDistanceRatio) matches.push({
      candidate,
      distance
    });
  }
  matches.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    const lengthDiffA = Math.abs(a.candidate.length - input.length);
    const lengthDiffB = Math.abs(b.candidate.length - input.length);
    if (lengthDiffA !== lengthDiffB) return lengthDiffA - lengthDiffB;
    return a.candidate.localeCompare(b.candidate);
  });
  return matches.slice(0, maxSuggestions).map((m) => m.candidate);
}
function createSuggestionMessage(suggestions) {
  if (suggestions.length === 0) return [];
  if (suggestions.length === 1) return message`Did you mean ${optionName(suggestions[0])}?`;
  const messageParts = [text("Did you mean one of these?")];
  for (const suggestion of suggestions) {
    messageParts.push(text("\n  "));
    messageParts.push(optionName(suggestion));
  }
  return messageParts;
}
function createErrorWithSuggestions(baseError, invalidInput, usage, type = "both", customFormatter) {
  const candidates = /* @__PURE__ */ new Set();
  if (type === "option" || type === "both") for (const name of extractOptionNames(usage)) candidates.add(name);
  if (type === "command" || type === "both") for (const name of extractCommandNames(usage)) candidates.add(name);
  const suggestions = findSimilar(invalidInput, candidates, DEFAULT_FIND_SIMILAR_OPTIONS);
  const suggestionMsg = customFormatter ? customFormatter(suggestions) : createSuggestionMessage(suggestions);
  return suggestionMsg.length > 0 ? [
    ...baseError,
    text("\n\n"),
    ...suggestionMsg
  ] : baseError;
}
function getSuggestionKey(suggestion) {
  if (suggestion.kind === "literal") return suggestion.text;
  return `__FILE__:${suggestion.type}:${suggestion.extensions?.join(",") ?? ""}:${suggestion.pattern ?? ""}`;
}
function deduplicateSuggestions(suggestions) {
  const seen = /* @__PURE__ */ new Set();
  return suggestions.filter((suggestion) => {
    const key = getSuggestionKey(suggestion);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/constructs.js
function isOptionRequiringValue(usage, token) {
  function traverse(terms) {
    if (!terms || !Array.isArray(terms)) return false;
    for (const term of terms) if (term.type === "option") {
      if (term.metavar && term.names.includes(token)) return true;
    } else if (term.type === "optional" || term.type === "multiple") {
      if (traverse(term.terms)) return true;
    } else if (term.type === "exclusive") {
      for (const exclusiveUsage of term.terms) if (traverse(exclusiveUsage)) return true;
    }
    return false;
  }
  return traverse(usage);
}
function extractRequiredUsage(usage) {
  const required = [];
  for (const term of usage) if (term.type === "optional") continue;
  else if (term.type === "exclusive") {
    const requiredBranches = term.terms.map((branch) => extractRequiredUsage(branch)).filter((branch) => branch.length > 0);
    if (requiredBranches.length > 0) required.push({
      type: "exclusive",
      terms: requiredBranches
    });
  } else if (term.type === "multiple") {
    if (term.min > 0) {
      const requiredTerms = extractRequiredUsage(term.terms);
      if (requiredTerms.length > 0) required.push({
        type: "multiple",
        terms: requiredTerms,
        min: term.min
      });
    }
  } else required.push(term);
  return required;
}
function analyzeNoMatchContext(parsers) {
  const combinedUsage = [{
    type: "exclusive",
    terms: parsers.map((p) => p.usage)
  }];
  const requiredUsage = extractRequiredUsage(combinedUsage);
  return {
    hasOptions: extractOptionNames(requiredUsage).size > 0,
    hasCommands: extractCommandNames(requiredUsage).size > 0,
    hasArguments: extractArgumentMetavars(requiredUsage).size > 0
  };
}
var DuplicateOptionError = class extends Error {
  constructor(optionName$1, sources) {
    const sourceNames = sources.map((s) => typeof s === "symbol" ? s.description ?? s.toString() : s);
    super(`Duplicate option name "${optionName$1}" found in fields: ${sourceNames.join(", ")}. Each option name must be unique within a parser combinator.`);
    this.optionName = optionName$1;
    this.sources = sources;
    this.name = "DuplicateOptionError";
  }
};
function checkDuplicateOptionNames(parserSources) {
  const optionNameSources = /* @__PURE__ */ new Map();
  for (const [source, usage] of parserSources) {
    const names = extractOptionNames(usage);
    for (const name of names) {
      if (!optionNameSources.has(name)) optionNameSources.set(name, []);
      optionNameSources.get(name).push(source);
    }
  }
  for (const [name, sources] of optionNameSources) if (sources.length > 1) throw new DuplicateOptionError(name, sources);
}
function generateNoMatchError(context) {
  const { hasOptions, hasCommands, hasArguments } = context;
  if (hasArguments && !hasOptions && !hasCommands) return message`Missing required argument.`;
  else if (hasCommands && !hasOptions && !hasArguments) return message`No matching command found.`;
  else if (hasOptions && !hasCommands && !hasArguments) return message`No matching option found.`;
  else if (hasCommands && hasOptions && !hasArguments) return message`No matching option or command found.`;
  else if (hasArguments && hasOptions && !hasCommands) return message`No matching option or argument found.`;
  else if (hasArguments && hasCommands && !hasOptions) return message`No matching command or argument found.`;
  else return message`No matching option, command, or argument found.`;
}
function* suggestObjectSync(context, prefix, parserPairs) {
  const registry = context.dependencyRegistry instanceof DependencyRegistry ? context.dependencyRegistry : new DependencyRegistry();
  if (context.state && typeof context.state === "object") collectDependencies(context.state, registry);
  const contextWithRegistry = {
    ...context,
    dependencyRegistry: registry
  };
  if (context.buffer.length > 0) {
    const lastToken = context.buffer[context.buffer.length - 1];
    for (const [field, parser] of parserPairs) if (isOptionRequiringValue(parser.usage, lastToken)) {
      const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
      yield* parser.suggest({
        ...contextWithRegistry,
        state: fieldState
      }, prefix);
      return;
    }
  }
  const suggestions = [];
  for (const [field, parser] of parserPairs) {
    const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
    const fieldSuggestions = parser.suggest({
      ...contextWithRegistry,
      state: fieldState
    }, prefix);
    suggestions.push(...fieldSuggestions);
  }
  yield* deduplicateSuggestions(suggestions);
}
async function* suggestObjectAsync(context, prefix, parserPairs) {
  const registry = context.dependencyRegistry instanceof DependencyRegistry ? context.dependencyRegistry : new DependencyRegistry();
  if (context.state && typeof context.state === "object") collectDependencies(context.state, registry);
  const contextWithRegistry = {
    ...context,
    dependencyRegistry: registry
  };
  if (context.buffer.length > 0) {
    const lastToken = context.buffer[context.buffer.length - 1];
    for (const [field, parser] of parserPairs) if (isOptionRequiringValue(parser.usage, lastToken)) {
      const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
      const suggestions$1 = parser.suggest({
        ...contextWithRegistry,
        state: fieldState
      }, prefix);
      for await (const s of suggestions$1) yield s;
      return;
    }
  }
  const suggestions = [];
  for (const [field, parser] of parserPairs) {
    const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
    const fieldSuggestions = parser.suggest({
      ...contextWithRegistry,
      state: fieldState
    }, prefix);
    for await (const s of fieldSuggestions) suggestions.push(s);
  }
  yield* deduplicateSuggestions(suggestions);
}
function collectDependencies(state, registry, visited = /* @__PURE__ */ new WeakSet()) {
  if (state === null || state === void 0) return;
  if (typeof state === "object") {
    if (visited.has(state)) return;
    visited.add(state);
  }
  if (isDependencySourceState(state)) {
    const depId = state[dependencyId];
    const result = state.result;
    if (result.success) registry.set(depId, result.value);
    return;
  }
  if (Array.isArray(state)) {
    for (const item of state) collectDependencies(item, registry, visited);
    return;
  }
  if (typeof state === "object" && !isDeferredParseState(state)) for (const key of Reflect.ownKeys(state)) collectDependencies(state[key], registry, visited);
}
function isPlainObject(value2) {
  if (typeof value2 !== "object" || value2 === null) return false;
  const proto2 = Object.getPrototypeOf(value2);
  return proto2 === Object.prototype || proto2 === null;
}
function collectDependencyValues(deferredState, registry) {
  const depIds = deferredState.dependencyIds;
  if (depIds && depIds.length > 0) {
    const defaults = deferredState.defaultValues;
    const dependencyValues = [];
    for (let i = 0; i < depIds.length; i++) {
      const depId$1 = depIds[i];
      if (registry.has(depId$1)) dependencyValues.push(registry.get(depId$1));
      else if (defaults && i < defaults.length) dependencyValues.push(defaults[i]);
      else return null;
    }
    return dependencyValues;
  }
  const depId = deferredState.dependencyId;
  if (registry.has(depId)) return registry.get(depId);
  return null;
}
function resolveDeferred(state, registry, visited = /* @__PURE__ */ new WeakSet()) {
  if (state === null || state === void 0) return state;
  if (typeof state === "object") {
    if (visited.has(state)) return state;
    visited.add(state);
  }
  if (isDeferredParseState(state)) {
    const deferredState = state;
    const dependencyValue = collectDependencyValues(deferredState, registry);
    if (dependencyValue === null) return deferredState.preliminaryResult;
    const reParseResult = deferredState.parser[parseWithDependency](deferredState.rawInput, dependencyValue);
    if (reParseResult instanceof Promise) return deferredState.preliminaryResult;
    return reParseResult;
  }
  if (isDependencySourceState(state)) return state;
  if (Array.isArray(state)) return state.map((item) => resolveDeferred(item, registry, visited));
  if (isPlainObject(state)) {
    const resolved = {};
    for (const key of Reflect.ownKeys(state)) resolved[key] = resolveDeferred(state[key], registry, visited);
    return resolved;
  }
  return state;
}
function resolveDeferredParseStates(fieldStates) {
  const registry = new DependencyRegistry();
  collectDependencies(fieldStates, registry);
  return resolveDeferred(fieldStates, registry);
}
async function resolveDeferredAsync(state, registry, visited = /* @__PURE__ */ new WeakSet()) {
  if (state === null || state === void 0) return state;
  if (typeof state === "object") {
    if (visited.has(state)) return state;
    visited.add(state);
  }
  if (isDeferredParseState(state)) {
    const deferredState = state;
    const dependencyValue = collectDependencyValues(deferredState, registry);
    if (dependencyValue === null) return deferredState.preliminaryResult;
    const reParseResult = deferredState.parser[parseWithDependency](deferredState.rawInput, dependencyValue);
    return Promise.resolve(reParseResult);
  }
  if (isDependencySourceState(state)) return state;
  if (Array.isArray(state)) return Promise.all(state.map((item) => resolveDeferredAsync(item, registry, visited)));
  if (isPlainObject(state)) {
    const resolved = {};
    const keys = Reflect.ownKeys(state);
    await Promise.all(keys.map(async (key) => {
      resolved[key] = await resolveDeferredAsync(state[key], registry, visited);
    }));
    return resolved;
  }
  return state;
}
async function resolveDeferredParseStatesAsync(fieldStates) {
  const registry = new DependencyRegistry();
  collectDependencies(fieldStates, registry);
  return await resolveDeferredAsync(fieldStates, registry);
}
function object(labelOrParsers, maybeParsersOrOptions, maybeOptions) {
  const label = typeof labelOrParsers === "string" ? labelOrParsers : void 0;
  let parsers;
  let options = {};
  if (typeof labelOrParsers === "string") {
    parsers = maybeParsersOrOptions;
    options = maybeOptions ?? {};
  } else {
    parsers = labelOrParsers;
    options = maybeParsersOrOptions ?? {};
  }
  const parserKeys = Reflect.ownKeys(parsers);
  const parserPairs = parserKeys.map((k) => [k, parsers[k]]);
  parserPairs.sort(([_, parserA], [__, parserB]) => parserB.priority - parserA.priority);
  const initialState = {};
  for (const key of parserKeys) initialState[key] = parsers[key].initialState;
  if (!options.allowDuplicates) checkDuplicateOptionNames(parserPairs.map(([field, parser]) => [field, parser.usage]));
  const noMatchContext = analyzeNoMatchContext(parserKeys.map((k) => parsers[k]));
  const combinedMode = parserKeys.some((k) => parsers[k].$mode === "async") ? "async" : "sync";
  const getInitialError = (context) => ({
    consumed: 0,
    error: context.buffer.length > 0 ? (() => {
      const token = context.buffer[0];
      const customMessage = options.errors?.unexpectedInput;
      if (customMessage) return typeof customMessage === "function" ? customMessage(token) : customMessage;
      const baseError = message`Unexpected option or argument: ${token}.`;
      return createErrorWithSuggestions(baseError, token, context.usage, "both", options.errors?.suggestions);
    })() : (() => {
      const customEndOfInput = options.errors?.endOfInput;
      return customEndOfInput ? typeof customEndOfInput === "function" ? customEndOfInput(noMatchContext) : customEndOfInput : generateNoMatchError(noMatchContext);
    })()
  });
  const parseSync2 = (context) => {
    let error = getInitialError(context);
    let currentContext = context;
    let anySuccess = false;
    const allConsumed = [];
    let madeProgress = true;
    while (madeProgress && currentContext.buffer.length > 0) {
      madeProgress = false;
      for (const [field, parser] of parserPairs) {
        const result = parser.parse({
          ...currentContext,
          state: currentContext.state && typeof currentContext.state === "object" && field in currentContext.state ? currentContext.state[field] : parser.initialState
        });
        if (result.success && result.consumed.length > 0) {
          currentContext = {
            ...currentContext,
            buffer: result.next.buffer,
            optionsTerminated: result.next.optionsTerminated,
            state: {
              ...currentContext.state,
              [field]: result.next.state
            }
          };
          allConsumed.push(...result.consumed);
          anySuccess = true;
          madeProgress = true;
          break;
        } else if (!result.success && error.consumed < result.consumed) error = result;
      }
    }
    if (anySuccess) return {
      success: true,
      next: currentContext,
      consumed: allConsumed
    };
    if (context.buffer.length === 0) {
      let allCanComplete = true;
      for (const [field, parser] of parserPairs) {
        const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
        const completeResult = parser.complete(fieldState);
        if (!completeResult.success) {
          allCanComplete = false;
          break;
        }
      }
      if (allCanComplete) return {
        success: true,
        next: context,
        consumed: []
      };
    }
    return {
      ...error,
      success: false
    };
  };
  const parseAsync2 = async (context) => {
    let error = getInitialError(context);
    let currentContext = context;
    let anySuccess = false;
    const allConsumed = [];
    let madeProgress = true;
    while (madeProgress && currentContext.buffer.length > 0) {
      madeProgress = false;
      for (const [field, parser] of parserPairs) {
        const resultOrPromise = parser.parse({
          ...currentContext,
          state: currentContext.state && typeof currentContext.state === "object" && field in currentContext.state ? currentContext.state[field] : parser.initialState
        });
        const result = await resultOrPromise;
        if (result.success && result.consumed.length > 0) {
          currentContext = {
            ...currentContext,
            buffer: result.next.buffer,
            optionsTerminated: result.next.optionsTerminated,
            state: {
              ...currentContext.state,
              [field]: result.next.state
            }
          };
          allConsumed.push(...result.consumed);
          anySuccess = true;
          madeProgress = true;
          break;
        } else if (!result.success && error.consumed < result.consumed) error = result;
      }
    }
    if (anySuccess) return {
      success: true,
      next: currentContext,
      consumed: allConsumed
    };
    if (context.buffer.length === 0) {
      let allCanComplete = true;
      for (const [field, parser] of parserPairs) {
        const fieldState = context.state && typeof context.state === "object" && field in context.state ? context.state[field] : parser.initialState;
        const completeResult = await parser.complete(fieldState);
        if (!completeResult.success) {
          allCanComplete = false;
          break;
        }
      }
      if (allCanComplete) return {
        success: true,
        next: context,
        consumed: []
      };
    }
    return {
      ...error,
      success: false
    };
  };
  return {
    $mode: combinedMode,
    $valueType: [],
    $stateType: [],
    priority: Math.max(...parserKeys.map((k) => parsers[k].priority)),
    usage: parserPairs.flatMap(([_, p]) => p.usage),
    initialState,
    parse(context) {
      return dispatchByMode(combinedMode, () => parseSync2(context), () => parseAsync2(context));
    },
    complete(state) {
      return dispatchByMode(combinedMode, () => {
        const preCompletedState = {};
        const preCompletedKeys = /* @__PURE__ */ new Set();
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldState = state[fieldKey];
          const fieldParser = parsers[field];
          if (Array.isArray(fieldState) && fieldState.length === 1 && isPendingDependencySourceState(fieldState[0])) {
            const completed = fieldParser.complete(fieldState);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isPendingDependencySourceState(fieldParser.initialState)) {
            const completed = fieldParser.complete([fieldParser.initialState]);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isWrappedDependencySource(fieldParser)) {
            const pendingState = fieldParser[wrappedDependencySourceMarker];
            const completed = fieldParser.complete([pendingState]);
            if (isDependencySourceState(completed)) {
              preCompletedState[fieldKey] = completed;
              preCompletedKeys.add(fieldKey);
            } else preCompletedState[fieldKey] = fieldState;
          } else preCompletedState[fieldKey] = fieldState;
        }
        const resolvedState = resolveDeferredParseStates(preCompletedState);
        const result = {};
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldResolvedState = resolvedState[fieldKey];
          const fieldParser = parsers[field];
          if (isDependencySourceState(fieldResolvedState) && preCompletedKeys.has(fieldKey)) {
            const depResult = fieldResolvedState.result;
            if (depResult.success) result[fieldKey] = depResult.value;
            else return {
              success: false,
              error: depResult.error
            };
            continue;
          }
          const valueResult = fieldParser.complete(fieldResolvedState);
          if (valueResult.success) result[fieldKey] = valueResult.value;
          else return {
            success: false,
            error: valueResult.error
          };
        }
        return {
          success: true,
          value: result
        };
      }, async () => {
        const preCompletedState = {};
        const preCompletedKeys = /* @__PURE__ */ new Set();
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldState = state[fieldKey];
          const fieldParser = parsers[field];
          if (Array.isArray(fieldState) && fieldState.length === 1 && isPendingDependencySourceState(fieldState[0])) {
            const completed = await fieldParser.complete(fieldState);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isPendingDependencySourceState(fieldParser.initialState)) {
            const completed = await fieldParser.complete([fieldParser.initialState]);
            preCompletedState[fieldKey] = completed;
            preCompletedKeys.add(fieldKey);
          } else if (fieldState === void 0 && isWrappedDependencySource(fieldParser)) {
            const pendingState = fieldParser[wrappedDependencySourceMarker];
            const completed = await fieldParser.complete([pendingState]);
            if (isDependencySourceState(completed)) {
              preCompletedState[fieldKey] = completed;
              preCompletedKeys.add(fieldKey);
            } else preCompletedState[fieldKey] = fieldState;
          } else preCompletedState[fieldKey] = fieldState;
        }
        const resolvedState = await resolveDeferredParseStatesAsync(preCompletedState);
        const result = {};
        for (const field of parserKeys) {
          const fieldKey = field;
          const fieldResolvedState = resolvedState[fieldKey];
          const fieldParser = parsers[field];
          if (isDependencySourceState(fieldResolvedState) && preCompletedKeys.has(fieldKey)) {
            const depResult = fieldResolvedState.result;
            if (depResult.success) result[fieldKey] = depResult.value;
            else return {
              success: false,
              error: depResult.error
            };
            continue;
          }
          const valueResult = await fieldParser.complete(fieldResolvedState);
          if (valueResult.success) result[fieldKey] = valueResult.value;
          else return {
            success: false,
            error: valueResult.error
          };
        }
        return {
          success: true,
          value: result
        };
      });
    },
    suggest(context, prefix) {
      return dispatchIterableByMode(combinedMode, () => {
        const syncParserPairs = parserPairs;
        return suggestObjectSync(context, prefix, syncParserPairs);
      }, () => suggestObjectAsync(context, prefix, parserPairs));
    },
    getDocFragments(state, defaultValue) {
      const fragments = parserPairs.flatMap(([field, p]) => {
        const fieldState = state.kind === "unavailable" ? { kind: "unavailable" } : {
          kind: "available",
          state: state.state[field]
        };
        return p.getDocFragments(fieldState, defaultValue?.[field]).fragments;
      });
      const entries = fragments.filter((d) => d.type === "entry");
      const sections = [];
      for (const fragment of fragments) {
        if (fragment.type !== "section") continue;
        if (fragment.title == null) entries.push(...fragment.entries);
        else sections.push(fragment);
      }
      const section = {
        title: label,
        entries
      };
      sections.push(section);
      return { fragments: sections.map((s) => ({
        ...s,
        type: "section"
      })) };
    }
  };
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/modifiers.js
function parseOptionalStyleSync(context, parser) {
  const innerState = typeof context.state === "undefined" ? parser.initialState : context.state[0];
  const result = parser.parse({
    ...context,
    state: innerState
  });
  return processOptionalStyleResult(result, innerState, context);
}
async function parseOptionalStyleAsync(context, parser) {
  const innerState = typeof context.state === "undefined" ? parser.initialState : context.state[0];
  const result = await parser.parse({
    ...context,
    state: innerState
  });
  return processOptionalStyleResult(result, innerState, context);
}
function processOptionalStyleResult(result, innerState, context) {
  if (result.success) {
    if (result.next.state !== innerState || result.consumed.length === 0) return {
      success: true,
      next: {
        ...result.next,
        state: [result.next.state]
      },
      consumed: result.consumed
    };
    return {
      success: true,
      next: {
        ...result.next,
        state: context.state
      },
      consumed: result.consumed
    };
  }
  if (result.consumed === 0) return {
    success: true,
    next: context,
    consumed: []
  };
  return result;
}
function optional(parser) {
  const syncParser = parser;
  function* suggestSync2(context, prefix) {
    const innerState = typeof context.state === "undefined" ? syncParser.initialState : context.state[0];
    yield* syncParser.suggest({
      ...context,
      state: innerState
    }, prefix);
  }
  async function* suggestAsync2(context, prefix) {
    const innerState = typeof context.state === "undefined" ? syncParser.initialState : context.state[0];
    const suggestions = parser.suggest({
      ...context,
      state: innerState
    }, prefix);
    for await (const s of suggestions) yield s;
  }
  const innerHasWrappedDependency = isWrappedDependencySource(parser);
  const innerHasDirectDependency = isPendingDependencySourceState(syncParser.initialState);
  const wrappedDependencyMarker = innerHasWrappedDependency ? { [wrappedDependencySourceMarker]: parser[wrappedDependencySourceMarker] } : innerHasDirectDependency ? { [wrappedDependencySourceMarker]: syncParser.initialState } : {};
  const hasWrappedDependencySource = wrappedDependencySourceMarker in wrappedDependencyMarker;
  const wrappedPendingState = hasWrappedDependencySource ? wrappedDependencyMarker[wrappedDependencySourceMarker] : void 0;
  return {
    $mode: parser.$mode,
    $valueType: [],
    $stateType: [],
    priority: parser.priority,
    usage: [{
      type: "optional",
      terms: parser.usage
    }],
    initialState: void 0,
    ...wrappedDependencyMarker,
    parse(context) {
      return dispatchByMode(parser.$mode, () => parseOptionalStyleSync(context, syncParser), () => parseOptionalStyleAsync(context, parser));
    },
    complete(state) {
      if (typeof state === "undefined") {
        if (innerHasWrappedDependency && wrappedPendingState) return dispatchByMode(parser.$mode, () => syncParser.complete([wrappedPendingState]), () => parser.complete([wrappedPendingState]));
        return {
          success: true,
          value: void 0
        };
      }
      if (Array.isArray(state) && state.length === 1 && isPendingDependencySourceState(state[0])) {
        if (innerHasWrappedDependency) return dispatchByMode(parser.$mode, () => syncParser.complete(state), () => parser.complete(state));
        return {
          success: true,
          value: void 0
        };
      }
      return dispatchByMode(parser.$mode, () => syncParser.complete(state[0]), () => parser.complete(state[0]));
    },
    suggest(context, prefix) {
      return dispatchIterableByMode(parser.$mode, () => suggestSync2(context, prefix), () => suggestAsync2(context, prefix));
    },
    getDocFragments(state, defaultValue) {
      const innerState = state.kind === "unavailable" ? { kind: "unavailable" } : state.state === void 0 ? { kind: "unavailable" } : {
        kind: "available",
        state: state.state[0]
      };
      return syncParser.getDocFragments(innerState, defaultValue);
    }
  };
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/nonempty.js
function ensureNonEmptyString(value2) {
  if (value2 === "") throw new TypeError("Expected a non-empty string.");
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/valueparser.js
function string(options = {}) {
  const metavar2 = options.metavar ?? "STRING";
  ensureNonEmptyString(metavar2);
  return {
    $mode: "sync",
    metavar: metavar2,
    parse(input) {
      if (options.pattern != null && !options.pattern.test(input)) return {
        success: false,
        error: options.errors?.patternMismatch ? typeof options.errors.patternMismatch === "function" ? options.errors.patternMismatch(input, options.pattern) : options.errors.patternMismatch : message`Expected a string matching pattern ${text(options.pattern.source)}, but got ${input}.`
      };
      return {
        success: true,
        value: input
      };
    },
    format(value2) {
      return value2;
    }
  };
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/primitives.js
function createOptionParseState(rawInput, valueParser, parseResult) {
  if (isDerivedValueParser(valueParser)) return createDeferredParseState(rawInput, valueParser, parseResult);
  if (isDependencySource(valueParser)) return createDependencySourceState(parseResult, valueParser[dependencyId]);
  return parseResult;
}
function* getSuggestionsWithDependency(valueParser, prefix, dependencyRegistry) {
  if (!valueParser.suggest) return;
  if (isDerivedValueParser(valueParser) && suggestWithDependency in valueParser) {
    const derived = valueParser;
    const suggestWithDep = derived[suggestWithDependency];
    if (suggestWithDep && dependencyRegistry) {
      const depIds = getDependencyIds(derived);
      const defaultsFn = getDefaultValuesFunction(derived);
      const defaults = defaultsFn?.();
      const dependencyValues = [];
      let hasAnyValue = false;
      for (let i = 0; i < depIds.length; i++) {
        const depId = depIds[i];
        if (dependencyRegistry.has(depId)) {
          dependencyValues.push(dependencyRegistry.get(depId));
          hasAnyValue = true;
        } else if (defaults && i < defaults.length) dependencyValues.push(defaults[i]);
        else {
          yield* valueParser.suggest(prefix);
          return;
        }
      }
      if (hasAnyValue) {
        const depValue = depIds.length === 1 ? dependencyValues[0] : dependencyValues;
        yield* suggestWithDep(prefix, depValue);
        return;
      }
    }
  }
  yield* valueParser.suggest(prefix);
}
async function* getSuggestionsWithDependencyAsync(valueParser, prefix, dependencyRegistry) {
  if (!valueParser.suggest) return;
  if (isDerivedValueParser(valueParser) && suggestWithDependency in valueParser) {
    const derived = valueParser;
    const suggestWithDep = derived[suggestWithDependency];
    if (suggestWithDep && dependencyRegistry) {
      const depIds = getDependencyIds(derived);
      const defaultsFn = getDefaultValuesFunction(derived);
      const defaults = defaultsFn?.();
      const dependencyValues = [];
      let hasAnyValue = false;
      for (let i = 0; i < depIds.length; i++) {
        const depId = depIds[i];
        if (dependencyRegistry.has(depId)) {
          dependencyValues.push(dependencyRegistry.get(depId));
          hasAnyValue = true;
        } else if (defaults && i < defaults.length) dependencyValues.push(defaults[i]);
        else {
          for await (const suggestion of valueParser.suggest(prefix)) yield suggestion;
          return;
        }
      }
      if (hasAnyValue) {
        const depValue = depIds.length === 1 ? dependencyValues[0] : dependencyValues;
        for await (const suggestion of suggestWithDep(prefix, depValue)) yield suggestion;
        return;
      }
    }
  }
  for await (const suggestion of valueParser.suggest(prefix)) yield suggestion;
}
function* suggestArgumentSync(valueParser, hidden, prefix, dependencyRegistry) {
  if (hidden) return;
  if (valueParser.suggest) yield* getSuggestionsWithDependency(valueParser, prefix, dependencyRegistry);
}
async function* suggestArgumentAsync(valueParser, hidden, prefix, dependencyRegistry) {
  if (hidden) return;
  if (valueParser.suggest) yield* getSuggestionsWithDependencyAsync(valueParser, prefix, dependencyRegistry);
}
function argument(valueParser, options = {}) {
  const isAsync = valueParser.$mode === "async";
  const optionPattern = /^--?[a-z0-9-]+$/i;
  const term = {
    type: "argument",
    metavar: valueParser.metavar,
    ...options.hidden && { hidden: true }
  };
  const result = {
    $mode: valueParser.$mode,
    $valueType: [],
    $stateType: [],
    priority: 5,
    usage: [term],
    initialState: void 0,
    parse(context) {
      if (context.buffer.length < 1) return {
        success: false,
        consumed: 0,
        error: options.errors?.endOfInput ?? message`Expected an argument, but got end of input.`
      };
      let i = 0;
      let optionsTerminated = context.optionsTerminated;
      if (!optionsTerminated) {
        if (context.buffer[i] === "--") {
          optionsTerminated = true;
          i++;
        } else if (context.buffer[i].match(optionPattern)) return {
          success: false,
          consumed: i,
          error: message`Expected an argument, but got an option: ${optionName(context.buffer[i])}.`
        };
      }
      if (context.buffer.length < i + 1) return {
        success: false,
        consumed: i,
        error: message`Expected an argument, but got end of input.`
      };
      if (context.state != null) return {
        success: false,
        consumed: i,
        error: options.errors?.multiple ? typeof options.errors.multiple === "function" ? options.errors.multiple(valueParser.metavar) : options.errors.multiple : message`The argument ${metavar(valueParser.metavar)} cannot be used multiple times.`
      };
      const rawInput = context.buffer[i];
      const parseResultOrPromise = valueParser.parse(rawInput);
      if (isAsync) return parseResultOrPromise.then((parseResult) => ({
        success: true,
        next: {
          ...context,
          buffer: context.buffer.slice(i + 1),
          state: createOptionParseState(rawInput, valueParser, parseResult),
          optionsTerminated
        },
        consumed: context.buffer.slice(0, i + 1)
      }));
      return {
        success: true,
        next: {
          ...context,
          buffer: context.buffer.slice(i + 1),
          state: createOptionParseState(rawInput, valueParser, parseResultOrPromise),
          optionsTerminated
        },
        consumed: context.buffer.slice(0, i + 1)
      };
    },
    complete(state) {
      if (state == null) return {
        success: false,
        error: options.errors?.endOfInput ?? message`Expected a ${metavar(valueParser.metavar)}, but too few arguments.`
      };
      if (isDeferredParseState(state)) {
        const preliminaryResult = state.preliminaryResult;
        if (preliminaryResult.success) return preliminaryResult;
        return {
          success: false,
          error: options.errors?.invalidValue ? typeof options.errors.invalidValue === "function" ? options.errors.invalidValue(preliminaryResult.error) : options.errors.invalidValue : message`${metavar(valueParser.metavar)}: ${preliminaryResult.error}`
        };
      }
      if (isDependencySourceState(state)) {
        const result$1 = state.result;
        if (result$1.success) return result$1;
        return {
          success: false,
          error: options.errors?.invalidValue ? typeof options.errors.invalidValue === "function" ? options.errors.invalidValue(result$1.error) : options.errors.invalidValue : message`${metavar(valueParser.metavar)}: ${result$1.error}`
        };
      }
      if (state.success) return state;
      return {
        success: false,
        error: options.errors?.invalidValue ? typeof options.errors.invalidValue === "function" ? options.errors.invalidValue(state.error) : options.errors.invalidValue : message`${metavar(valueParser.metavar)}: ${state.error}`
      };
    },
    suggest(context, prefix) {
      if (isAsync) return suggestArgumentAsync(valueParser, options.hidden ?? false, prefix, context.dependencyRegistry);
      return suggestArgumentSync(valueParser, options.hidden ?? false, prefix, context.dependencyRegistry);
    },
    getDocFragments(_state, defaultValue) {
      if (options.hidden) return {
        fragments: [],
        description: options.description
      };
      const choicesMessage = valueParser.choices != null && valueParser.choices.length > 0 ? valueSet(valueParser.choices.map((c) => valueParser.format(c)), { type: "unit" }) : void 0;
      const fragments = [{
        type: "entry",
        term,
        description: options.description,
        default: defaultValue == null ? void 0 : message`${valueParser.format(defaultValue)}`,
        choices: choicesMessage
      }];
      return {
        fragments,
        description: options.description
      };
    },
    [/* @__PURE__ */ Symbol.for("Deno.customInspect")]() {
      return `argument()`;
    }
  };
  return result;
}

// node_modules/.pnpm/@optique+core@0.10.3/node_modules/@optique/core/dist/parser.js
function parseSync(parser, args, options) {
  let initialState = parser.initialState;
  if (options?.annotations) initialState = {
    ...typeof initialState === "object" && initialState !== null ? initialState : {},
    [annotationKey]: options.annotations
  };
  let context = {
    buffer: args,
    optionsTerminated: false,
    state: initialState,
    usage: parser.usage
  };
  do {
    const result = parser.parse(context);
    if (!result.success) return {
      success: false,
      error: result.error
    };
    const previousBuffer = context.buffer;
    context = result.next;
    if (context.buffer.length > 0 && context.buffer.length === previousBuffer.length && context.buffer.every((item, i) => item === previousBuffer[i])) return {
      success: false,
      error: message`Unexpected option or argument: ${context.buffer[0]}.`
    };
  } while (context.buffer.length > 0);
  const endResult = parser.complete(context.state);
  return endResult.success ? {
    success: true,
    value: endResult.value
  } : {
    success: false,
    error: endResult.error
  };
}
async function parseAsync(parser, args, options) {
  let initialState = parser.initialState;
  if (options?.annotations) initialState = {
    ...typeof initialState === "object" && initialState !== null ? initialState : {},
    [annotationKey]: options.annotations
  };
  let context = {
    buffer: args,
    optionsTerminated: false,
    state: initialState,
    usage: parser.usage
  };
  do {
    const result = await parser.parse(context);
    if (!result.success) return {
      success: false,
      error: result.error
    };
    const previousBuffer = context.buffer;
    context = result.next;
    if (context.buffer.length > 0 && context.buffer.length === previousBuffer.length && context.buffer.every((item, i) => item === previousBuffer[i])) return {
      success: false,
      error: message`Unexpected option or argument: ${context.buffer[0]}.`
    };
  } while (context.buffer.length > 0);
  const endResult = await parser.complete(context.state);
  return endResult.success ? {
    success: true,
    value: endResult.value
  } : {
    success: false,
    error: endResult.error
  };
}
function parse(parser, args, options) {
  if (parser.$mode === "async") return parseAsync(parser, args, options);
  return parseSync(parser, args, options);
}

// packages/cli-shell/src/lib/filesystem-args.parser.ts
var cpParser = object({
  source: argument(string()),
  dest: argument(string())
});
var cdParser = object({
  path: argument(string())
});
var lsParser = object({
  path: optional(argument(string()))
});
var treeParser = object({
  path: optional(argument(string()))
});
var statParser = object({
  path: argument(string())
});
var catParser = object({
  file: argument(string())
});
var touchParser = object({
  file: argument(string())
});
var mkdirParser = object({
  path: argument(string())
});
var rmParser = object({
  path: argument(string())
});
var mvParser = object({
  source: argument(string()),
  dest: argument(string())
});
var zodErrorToMessage = (error) => error.issues.map((issue) => issue.message).join("; ");
var parseWithSchema = (parser, args, schema, mapValue) => {
  const result = parse(parser, args);
  if (!result.success) {
    return { success: false, error: formatMessage(result.error) };
  }
  const input = mapValue ? mapValue(result.value) : result.value;
  const validated = schema.safeParse(input);
  if (!validated.success) {
    return { success: false, error: zodErrorToMessage(validated.error) };
  }
  return { success: true, value: validated.data };
};
var parseCpArgs = (args) => parseWithSchema(cpParser, args, CpArgsSchema);
var parseCdArgs = (args) => parseWithSchema(cdParser, args, CdArgsSchema);
var parseLsArgs = (args) => parseWithSchema(lsParser, args, LsArgsSchema);
var parseTreeArgs = (args) => parseWithSchema(treeParser, args, TreeArgsSchema);
var parseStatArgs = (args) => parseWithSchema(statParser, args, StatArgsSchema);
var parseCatArgs = (args) => parseWithSchema(catParser, args, CatArgsSchema);
var parseTouchArgs = (args) => parseWithSchema(touchParser, args, TouchArgsSchema);
var parseMkdirArgs = (args) => parseWithSchema(mkdirParser, args, MkdirArgsSchema);
var parseRmArgs = (args) => parseWithSchema(rmParser, args, RmArgsSchema);
var parseMvArgs = (args) => parseWithSchema(mvParser, args, MvArgsSchema);

// packages/cli-shell/src/commands/_util.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
import { Box, Text } from "ink";
var makeOutput = (text2) => ({
  component: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: text2 }) })
});
var makeError = (message2) => ({
  component: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { color: "red", children: message2 }) }),
  error: message2
});
var makeResult = (text2, data) => ({
  component: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: text2 }) }),
  data,
  status: "ok"
});
var makeResultError = (message2, data) => ({
  component: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { flexDirection: "column", padding: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { color: "red", children: message2 }) }),
  error: message2,
  data,
  status: "error"
});
var mergeCommands = (...groups) => {
  const merged = {};
  for (const group2 of groups) {
    for (const [name, handler] of Object.entries(group2)) {
      if (name in merged) {
        throw new Error(`Duplicate command registration: "${name}"`);
      }
      merged[name] = handler;
    }
  }
  return merged;
};

// packages/cli-shell/src/commands/filesystem.ts
var filesystemCommands = {
  pwd: async (_args, options) => {
    const cwd = options?.cwd ?? getDefaultCwd();
    return makeOutput(cwd);
  },
  cd: async (args, options) => {
    const parsed = parseCdArgs(args);
    if (!parsed.success) return makeError(`Usage: cd <path>
${parsed.error}`);
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const targetPath = await changeDir(cwd, parsed.value.path);
      options?.setCwd?.(targetPath);
      return makeOutput(targetPath);
    } catch (err) {
      return makeError(String(err.message ?? `Directory not found: ${parsed.value.path}`));
    }
  },
  ls: async (args, options) => {
    const parsed = parseLsArgs(args);
    if (!parsed.success) return makeError(`Usage: ls [path]
${parsed.error}`);
    const requested = parsed.value.path ?? ".";
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const entries = await listDirectory(cwd, requested);
      const output = entries.length === 0 ? "(empty)" : entries.map((entry) => entry.isDirectory ? `${entry.name}/` : entry.name).join("\n");
      return makeOutput(output);
    } catch {
      return makeError(`Cannot list directory: ${requested}`);
    }
  },
  tree: async (args, options) => {
    const parsed = parseTreeArgs(args);
    if (!parsed.success) return makeError(`Usage: tree [path]
${parsed.error}`);
    const requested = parsed.value.path ?? ".";
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await treeText(cwd, requested));
    } catch {
      return makeError(`Cannot read directory: ${requested}`);
    }
  },
  stat: async (args, options) => {
    const parsed = parseStatArgs(args);
    if (!parsed.success) return makeError(`Usage: stat <path>
${parsed.error}`);
    const requested = parsed.value.path;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const { path: path3, entry } = await statPath(cwd, requested);
      const mtime = entry.mtime ? entry.mtime.toISOString() : "unknown";
      const lines = [
        `Path: ${path3}`,
        `Name: ${entry.name}`,
        `Type: ${entry.isDirectory ? "directory" : "file"}`,
        `Size: ${entry.size} bytes`,
        `Modified: ${mtime}`
      ];
      return makeOutput(lines.join("\n"));
    } catch {
      return makeError(`Path not found: ${requested}`);
    }
  },
  cat: async (args, options) => {
    const parsed = parseCatArgs(args);
    if (!parsed.success) return makeError(`Usage: cat <file>
${parsed.error}`);
    const requested = parsed.value.file;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await readTextFile(cwd, requested));
    } catch {
      return makeError(`Cannot read file: ${requested}`);
    }
  },
  touch: async (args, options) => {
    const parsed = parseTouchArgs(args);
    if (!parsed.success) return makeError(`Usage: touch <file>
${parsed.error}`);
    const requested = parsed.value.file;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await touchFile(cwd, requested));
    } catch {
      return makeError(`Cannot touch file: ${requested}`);
    }
  },
  mkdir: async (args, options) => {
    const parsed = parseMkdirArgs(args);
    if (!parsed.success) return makeError(`Usage: mkdir <path>
${parsed.error}`);
    const requested = parsed.value.path;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await makeDirectory(cwd, requested));
    } catch {
      return makeError(`Cannot create directory: ${requested}`);
    }
  },
  cp: async (args, options) => {
    const parsed = parseCpArgs(args);
    if (!parsed.success) return makeError(`Usage: cp <source> <dest>
${parsed.error}`);
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const { sourcePath, destPath } = await copyPath(cwd, parsed.value.source, parsed.value.dest);
      return makeOutput(`${sourcePath} -> ${destPath}`);
    } catch {
      return makeError(`Cannot copy: ${parsed.value.source} -> ${parsed.value.dest}`);
    }
  },
  mv: async (args, options) => {
    const parsed = parseMvArgs(args);
    if (!parsed.success) return makeError(`Usage: mv <source> <dest>
${parsed.error}`);
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      const { sourcePath, destPath } = await movePath(cwd, parsed.value.source, parsed.value.dest);
      return makeOutput(`${sourcePath} -> ${destPath}`);
    } catch {
      return makeError(`Cannot move: ${parsed.value.source} -> ${parsed.value.dest}`);
    }
  },
  rm: async (args, options) => {
    const parsed = parseRmArgs(args);
    if (!parsed.success) return makeError(`Usage: rm <path>
${parsed.error}`);
    const requested = parsed.value.path;
    try {
      const cwd = options?.cwd ?? getDefaultCwd();
      return makeOutput(await removePath(cwd, requested));
    } catch {
      return makeError(`Cannot remove: ${requested}`);
    }
  }
};

// packages/cli-shell/src/commands/system.ts
var systemCommands = {
  clear: async (_args, options) => {
    options?.clearScreen?.();
    return makeOutput("");
  },
  backend: async () => {
    const info = await getFilesystemBackendInfo2();
    const lines = [`Platform: ${info.platform}`, `Adapter: ${info.adapter}`];
    if (info.persistence) lines.push(`Persistence: ${info.persistence}`);
    if (info.baseDir) lines.push(`Base directory: ${info.baseDir}`);
    return makeOutput(lines.join("\n"));
  },
  exit: async (_args, options) => {
    if (!options?.exit) return makeError("exit is only available in terminal interactive mode");
    options.exit();
    return makeOutput("Exiting...");
  },
  help: async (_args, options) => {
    if (!options?.createProgram) {
      return makeOutput("No program registered. Pass createProgram when setting up the shell.");
    }
    const program = options.createProgram();
    const lines = [];
    lines.push(`Usage: ${program.name()} [options] [command]`);
    lines.push("");
    lines.push(program.description());
    lines.push("");
    lines.push("Commands:");
    for (const cmd of program.commands) {
      const args = cmd.registeredArguments?.map((a) => a.required ? `<${a.name()}>` : `[${a.name()}]`).join(" ") ?? "";
      lines.push(`  ${(cmd.name() + " " + args).trim().padEnd(20)} ${cmd.description()}`);
    }
    return makeOutput(lines.join("\n"));
  }
};

// packages/cli-shell/src/commands/app.ts
var appCommands = {
  "app-config": async (_args, options) => {
    if (!options?.config) {
      return makeOutput("App config is not available in this runtime context.");
    }
    const { config } = options;
    return makeOutput(
      [
        `appId: ${config.appId}`,
        `appName: ${config.appName}`,
        `storageKey: ${config.storageKey}`,
        `podNamespace: ${config.podNamespace}`,
        `socialLocalPath: ${config.socialLocalPath}`,
        `sync.social.pollIntervalMs: ${config.sync.social.pollIntervalMs}`,
        `sync.social.outboundDebounceMs: ${config.sync.social.outboundDebounceMs}`,
        `sync.files.pollIntervalMs: ${config.sync.files.pollIntervalMs}`,
        `sync.files.outboundDebounceMs: ${config.sync.files.outboundDebounceMs}`,
        `sync.files.maxFileSizeBytes: ${config.sync.files.maxFileSizeBytes}`,
        `features.socialSync: ${config.features.socialSync}`,
        `features.fileSync: ${config.features.fileSync}`,
        `features.fileSharing: ${config.features.fileSharing}`
      ].join("\n")
    );
  }
};

// packages/cli-shell/src/components/InteractiveShell.tsx
var import_react67 = __toESM(require_react(), 1);
import { Box as Box20, Text as Text22 } from "ink";

// packages/ui/src/primitives/text-input.tsx
var import_react33 = __toESM(require_react(), 1);

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/badge/badge.js
var import_react3 = __toESM(require_react(), 1);
import { Text as Text2 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/theme.js
var import_react2 = __toESM(require_react(), 1);
var import_deepmerge = __toESM(require_cjs(), 1);

// node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js
import process2 from "process";
function isUnicodeSupported() {
  const { env: env2 } = process2;
  const { TERM, TERM_PROGRAM } = env2;
  if (process2.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env2.WT_SESSION) || Boolean(env2.TERMINUS_SUBLIME) || env2.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env2.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/figures@6.1.0/node_modules/figures/index.js
var common = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "\u2588",
  squareDarkShade: "\u2593",
  squareMediumShade: "\u2592",
  squareLightShade: "\u2591",
  squareTop: "\u2580",
  squareBottom: "\u2584",
  squareLeft: "\u258C",
  squareRight: "\u2590",
  squareCenter: "\u25A0",
  bullet: "\u25CF",
  dot: "\u2024",
  ellipsis: "\u2026",
  pointerSmall: "\u203A",
  triangleUp: "\u25B2",
  triangleUpSmall: "\u25B4",
  triangleDown: "\u25BC",
  triangleDownSmall: "\u25BE",
  triangleLeftSmall: "\u25C2",
  triangleRightSmall: "\u25B8",
  home: "\u2302",
  heart: "\u2665",
  musicNote: "\u266A",
  musicNoteBeamed: "\u266B",
  arrowUp: "\u2191",
  arrowDown: "\u2193",
  arrowLeft: "\u2190",
  arrowRight: "\u2192",
  arrowLeftRight: "\u2194",
  arrowUpDown: "\u2195",
  almostEqual: "\u2248",
  notEqual: "\u2260",
  lessOrEqual: "\u2264",
  greaterOrEqual: "\u2265",
  identical: "\u2261",
  infinity: "\u221E",
  subscriptZero: "\u2080",
  subscriptOne: "\u2081",
  subscriptTwo: "\u2082",
  subscriptThree: "\u2083",
  subscriptFour: "\u2084",
  subscriptFive: "\u2085",
  subscriptSix: "\u2086",
  subscriptSeven: "\u2087",
  subscriptEight: "\u2088",
  subscriptNine: "\u2089",
  oneHalf: "\xBD",
  oneThird: "\u2153",
  oneQuarter: "\xBC",
  oneFifth: "\u2155",
  oneSixth: "\u2159",
  oneEighth: "\u215B",
  twoThirds: "\u2154",
  twoFifths: "\u2156",
  threeQuarters: "\xBE",
  threeFifths: "\u2157",
  threeEighths: "\u215C",
  fourFifths: "\u2158",
  fiveSixths: "\u215A",
  fiveEighths: "\u215D",
  sevenEighths: "\u215E",
  line: "\u2500",
  lineBold: "\u2501",
  lineDouble: "\u2550",
  lineDashed0: "\u2504",
  lineDashed1: "\u2505",
  lineDashed2: "\u2508",
  lineDashed3: "\u2509",
  lineDashed4: "\u254C",
  lineDashed5: "\u254D",
  lineDashed6: "\u2574",
  lineDashed7: "\u2576",
  lineDashed8: "\u2578",
  lineDashed9: "\u257A",
  lineDashed10: "\u257C",
  lineDashed11: "\u257E",
  lineDashed12: "\u2212",
  lineDashed13: "\u2013",
  lineDashed14: "\u2010",
  lineDashed15: "\u2043",
  lineVertical: "\u2502",
  lineVerticalBold: "\u2503",
  lineVerticalDouble: "\u2551",
  lineVerticalDashed0: "\u2506",
  lineVerticalDashed1: "\u2507",
  lineVerticalDashed2: "\u250A",
  lineVerticalDashed3: "\u250B",
  lineVerticalDashed4: "\u254E",
  lineVerticalDashed5: "\u254F",
  lineVerticalDashed6: "\u2575",
  lineVerticalDashed7: "\u2577",
  lineVerticalDashed8: "\u2579",
  lineVerticalDashed9: "\u257B",
  lineVerticalDashed10: "\u257D",
  lineVerticalDashed11: "\u257F",
  lineDownLeft: "\u2510",
  lineDownLeftArc: "\u256E",
  lineDownBoldLeftBold: "\u2513",
  lineDownBoldLeft: "\u2512",
  lineDownLeftBold: "\u2511",
  lineDownDoubleLeftDouble: "\u2557",
  lineDownDoubleLeft: "\u2556",
  lineDownLeftDouble: "\u2555",
  lineDownRight: "\u250C",
  lineDownRightArc: "\u256D",
  lineDownBoldRightBold: "\u250F",
  lineDownBoldRight: "\u250E",
  lineDownRightBold: "\u250D",
  lineDownDoubleRightDouble: "\u2554",
  lineDownDoubleRight: "\u2553",
  lineDownRightDouble: "\u2552",
  lineUpLeft: "\u2518",
  lineUpLeftArc: "\u256F",
  lineUpBoldLeftBold: "\u251B",
  lineUpBoldLeft: "\u251A",
  lineUpLeftBold: "\u2519",
  lineUpDoubleLeftDouble: "\u255D",
  lineUpDoubleLeft: "\u255C",
  lineUpLeftDouble: "\u255B",
  lineUpRight: "\u2514",
  lineUpRightArc: "\u2570",
  lineUpBoldRightBold: "\u2517",
  lineUpBoldRight: "\u2516",
  lineUpRightBold: "\u2515",
  lineUpDoubleRightDouble: "\u255A",
  lineUpDoubleRight: "\u2559",
  lineUpRightDouble: "\u2558",
  lineUpDownLeft: "\u2524",
  lineUpBoldDownBoldLeftBold: "\u252B",
  lineUpBoldDownBoldLeft: "\u2528",
  lineUpDownLeftBold: "\u2525",
  lineUpBoldDownLeftBold: "\u2529",
  lineUpDownBoldLeftBold: "\u252A",
  lineUpDownBoldLeft: "\u2527",
  lineUpBoldDownLeft: "\u2526",
  lineUpDoubleDownDoubleLeftDouble: "\u2563",
  lineUpDoubleDownDoubleLeft: "\u2562",
  lineUpDownLeftDouble: "\u2561",
  lineUpDownRight: "\u251C",
  lineUpBoldDownBoldRightBold: "\u2523",
  lineUpBoldDownBoldRight: "\u2520",
  lineUpDownRightBold: "\u251D",
  lineUpBoldDownRightBold: "\u2521",
  lineUpDownBoldRightBold: "\u2522",
  lineUpDownBoldRight: "\u251F",
  lineUpBoldDownRight: "\u251E",
  lineUpDoubleDownDoubleRightDouble: "\u2560",
  lineUpDoubleDownDoubleRight: "\u255F",
  lineUpDownRightDouble: "\u255E",
  lineDownLeftRight: "\u252C",
  lineDownBoldLeftBoldRightBold: "\u2533",
  lineDownLeftBoldRightBold: "\u252F",
  lineDownBoldLeftRight: "\u2530",
  lineDownBoldLeftBoldRight: "\u2531",
  lineDownBoldLeftRightBold: "\u2532",
  lineDownLeftRightBold: "\u252E",
  lineDownLeftBoldRight: "\u252D",
  lineDownDoubleLeftDoubleRightDouble: "\u2566",
  lineDownDoubleLeftRight: "\u2565",
  lineDownLeftDoubleRightDouble: "\u2564",
  lineUpLeftRight: "\u2534",
  lineUpBoldLeftBoldRightBold: "\u253B",
  lineUpLeftBoldRightBold: "\u2537",
  lineUpBoldLeftRight: "\u2538",
  lineUpBoldLeftBoldRight: "\u2539",
  lineUpBoldLeftRightBold: "\u253A",
  lineUpLeftRightBold: "\u2536",
  lineUpLeftBoldRight: "\u2535",
  lineUpDoubleLeftDoubleRightDouble: "\u2569",
  lineUpDoubleLeftRight: "\u2568",
  lineUpLeftDoubleRightDouble: "\u2567",
  lineUpDownLeftRight: "\u253C",
  lineUpBoldDownBoldLeftBoldRightBold: "\u254B",
  lineUpDownBoldLeftBoldRightBold: "\u2548",
  lineUpBoldDownLeftBoldRightBold: "\u2547",
  lineUpBoldDownBoldLeftRightBold: "\u254A",
  lineUpBoldDownBoldLeftBoldRight: "\u2549",
  lineUpBoldDownLeftRight: "\u2540",
  lineUpDownBoldLeftRight: "\u2541",
  lineUpDownLeftBoldRight: "\u253D",
  lineUpDownLeftRightBold: "\u253E",
  lineUpBoldDownBoldLeftRight: "\u2542",
  lineUpDownLeftBoldRightBold: "\u253F",
  lineUpBoldDownLeftBoldRight: "\u2543",
  lineUpBoldDownLeftRightBold: "\u2544",
  lineUpDownBoldLeftBoldRight: "\u2545",
  lineUpDownBoldLeftRightBold: "\u2546",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "\u256C",
  lineUpDoubleDownDoubleLeftRight: "\u256B",
  lineUpDownLeftDoubleRightDouble: "\u256A",
  lineCross: "\u2573",
  lineBackslash: "\u2572",
  lineSlash: "\u2571"
};
var specialMainSymbols = {
  tick: "\u2714",
  info: "\u2139",
  warning: "\u26A0",
  cross: "\u2718",
  squareSmall: "\u25FB",
  squareSmallFilled: "\u25FC",
  circle: "\u25EF",
  circleFilled: "\u25C9",
  circleDotted: "\u25CC",
  circleDouble: "\u25CE",
  circleCircle: "\u24DE",
  circleCross: "\u24E7",
  circlePipe: "\u24BE",
  radioOn: "\u25C9",
  radioOff: "\u25EF",
  checkboxOn: "\u2612",
  checkboxOff: "\u2610",
  checkboxCircleOn: "\u24E7",
  checkboxCircleOff: "\u24BE",
  pointer: "\u276F",
  triangleUpOutline: "\u25B3",
  triangleLeft: "\u25C0",
  triangleRight: "\u25B6",
  lozenge: "\u25C6",
  lozengeOutline: "\u25C7",
  hamburger: "\u2630",
  smiley: "\u32E1",
  mustache: "\u0DF4",
  star: "\u2605",
  play: "\u25B6",
  nodejs: "\u2B22",
  oneSeventh: "\u2150",
  oneNinth: "\u2151",
  oneTenth: "\u2152"
};
var specialFallbackSymbols = {
  tick: "\u221A",
  info: "i",
  warning: "\u203C",
  cross: "\xD7",
  squareSmall: "\u25A1",
  squareSmallFilled: "\u25A0",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(\u25CB)",
  circleCross: "(\xD7)",
  circlePipe: "(\u2502)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[\xD7]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(\xD7)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "\u2206",
  triangleLeft: "\u25C4",
  triangleRight: "\u25BA",
  lozenge: "\u2666",
  lozengeOutline: "\u25CA",
  hamburger: "\u2261",
  smiley: "\u263A",
  mustache: "\u250C\u2500\u2510",
  star: "\u2736",
  play: "\u25BA",
  nodejs: "\u2666",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10"
};
var mainSymbols = { ...common, ...specialMainSymbols };
var fallbackSymbols = { ...common, ...specialFallbackSymbols };
var shouldUseMain = isUnicodeSupported();
var figures = shouldUseMain ? mainSymbols : fallbackSymbols;
var figures_default = figures;
var replacements = Object.entries(specialMainSymbols);

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/alert/theme.js
var colorByVariant = {
  info: "blue",
  success: "green",
  error: "red",
  warning: "yellow"
};
var theme = {
  styles: {
    container: ({ variant }) => ({
      flexGrow: 1,
      borderStyle: "round",
      borderColor: colorByVariant[variant],
      gap: 1,
      paddingX: 1
    }),
    iconContainer: () => ({
      flexShrink: 0
    }),
    icon: ({ variant }) => ({
      color: colorByVariant[variant]
    }),
    content: () => ({
      flexShrink: 1,
      flexGrow: 1,
      minWidth: 0,
      flexDirection: "column",
      gap: 1
    }),
    title: () => ({
      bold: true
    }),
    message: () => ({})
  },
  config({ variant }) {
    let icon;
    if (variant === "info") {
      icon = figures_default.info;
    }
    if (variant === "success") {
      icon = figures_default.tick;
    }
    if (variant === "error") {
      icon = figures_default.cross;
    }
    if (variant === "warning") {
      icon = figures_default.warning;
    }
    return { icon };
  }
};
var theme_default = theme;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/badge/theme.js
var theme2 = {
  styles: {
    container: ({ color }) => ({
      backgroundColor: color
    }),
    label: () => ({
      color: "black"
    })
  }
};
var theme_default2 = theme2;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/confirm-input/theme.js
var theme3 = {
  styles: {
    input: ({ isFocused }) => ({
      dimColor: !isFocused
    })
  }
};
var theme_default3 = theme3;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/multi-select/theme.js
var theme4 = {
  styles: {
    container: () => ({
      flexDirection: "column"
    }),
    option: ({ isFocused }) => ({
      gap: 1,
      paddingLeft: isFocused ? 0 : 2
    }),
    selectedIndicator: () => ({
      color: "green"
    }),
    focusIndicator: () => ({
      color: "blue"
    }),
    label({ isFocused, isSelected }) {
      let color;
      if (isSelected) {
        color = "green";
      }
      if (isFocused) {
        color = "blue";
      }
      return { color };
    },
    highlightedText: () => ({
      bold: true
    })
  }
};
var theme_default4 = theme4;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/ordered-list/theme.js
var theme5 = {
  styles: {
    list: () => ({
      flexDirection: "column"
    }),
    listItem: () => ({
      gap: 1
    }),
    marker: () => ({
      dimColor: true
    }),
    content: () => ({
      flexDirection: "column"
    })
  }
};
var theme_default5 = theme5;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/progress-bar/theme.js
var theme6 = {
  styles: {
    container: () => ({
      flexGrow: 1,
      minWidth: 0
    }),
    completed: () => ({
      color: "magenta"
    }),
    remaining: () => ({
      dimColor: true
    })
  },
  config: () => ({
    // Character for rendering a completed bar
    completedCharacter: figures_default.square,
    // Character for rendering a remaining bar
    remainingCharacter: figures_default.squareLightShade
  })
};
var theme_default6 = theme6;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/select/theme.js
var theme7 = {
  styles: {
    container: () => ({
      flexDirection: "column"
    }),
    option: ({ isFocused }) => ({
      gap: 1,
      paddingLeft: isFocused ? 0 : 2
    }),
    selectedIndicator: () => ({
      color: "green"
    }),
    focusIndicator: () => ({
      color: "blue"
    }),
    label({ isFocused, isSelected }) {
      let color;
      if (isSelected) {
        color = "green";
      }
      if (isFocused) {
        color = "blue";
      }
      return { color };
    },
    highlightedText: () => ({
      bold: true
    })
  }
};
var theme_default7 = theme7;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/spinner/theme.js
var theme8 = {
  styles: {
    container: () => ({
      gap: 1
    }),
    frame: () => ({
      color: "blue"
    }),
    label: () => ({})
  }
};
var theme_default8 = theme8;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/status-message/theme.js
var colorByVariant2 = {
  success: "green",
  error: "red",
  warning: "yellow",
  info: "blue"
};
var iconByVariant = {
  success: figures_default.tick,
  error: figures_default.cross,
  warning: figures_default.warning,
  info: figures_default.info
};
var theme9 = {
  styles: {
    container: () => ({
      gap: 1
    }),
    iconContainer: () => ({
      flexShrink: 0
    }),
    icon: ({ variant }) => ({
      color: colorByVariant2[variant]
    }),
    message: () => ({})
  },
  config: ({ variant }) => ({
    icon: iconByVariant[variant]
  })
};
var theme_default9 = theme9;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/theme.js
var theme10 = {
  styles: {
    list: () => ({
      flexDirection: "column"
    }),
    listItem: () => ({
      gap: 1
    }),
    marker: () => ({
      dimColor: true
    }),
    content: () => ({
      flexDirection: "column"
    })
  },
  config: () => ({
    marker: figures_default.line
  })
};
var theme_default10 = theme10;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/text-input/theme.js
var theme11 = {
  styles: {
    value: () => ({})
  }
};
var theme_default11 = theme11;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/email-input/theme.js
var theme12 = {
  styles: {
    value: () => ({})
  }
};
var theme_default12 = theme12;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/password-input/theme.js
var theme13 = {
  styles: {
    value: () => ({})
  }
};
var theme_default13 = theme13;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/theme.js
var defaultTheme = {
  components: {
    Alert: theme_default,
    Badge: theme_default2,
    ConfirmInput: theme_default3,
    MultiSelect: theme_default4,
    OrderedList: theme_default5,
    ProgressBar: theme_default6,
    Select: theme_default7,
    Spinner: theme_default8,
    StatusMessage: theme_default9,
    UnorderedList: theme_default10,
    TextInput: theme_default11,
    EmailInput: theme_default12,
    PasswordInput: theme_default13
  }
};
var ThemeContext = (0, import_react2.createContext)(defaultTheme);
var useComponentTheme = (component) => {
  const theme14 = (0, import_react2.useContext)(ThemeContext);
  return theme14.components[component];
};

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/confirm-input/confirm-input.js
var import_react4 = __toESM(require_react(), 1);
import { Text as Text3, useInput } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/unordered-list.js
var import_react8 = __toESM(require_react(), 1);
import { Box as Box3 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/unordered-list-item.js
var import_react6 = __toESM(require_react(), 1);
import { Box as Box2, Text as Text4 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/unordered-list-item-context.js
var import_react5 = __toESM(require_react(), 1);

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/constants.js
var defaultMarker = figures_default.line;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/unordered-list-item-context.js
var UnorderedListItemContext = (0, import_react5.createContext)({
  marker: defaultMarker
});

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/unordered-list-item.js
function UnorderedListItem({ children }) {
  const { marker } = (0, import_react6.useContext)(UnorderedListItemContext);
  const { styles: styles3 } = useComponentTheme("UnorderedList");
  return import_react6.default.createElement(
    Box2,
    { ...styles3.listItem() },
    import_react6.default.createElement(Text4, { ...styles3.marker() }, marker),
    import_react6.default.createElement(Box2, { ...styles3.content() }, children)
  );
}

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/unordered-list-context.js
var import_react7 = __toESM(require_react(), 1);
var UnorderedListContext = (0, import_react7.createContext)({
  depth: 0
});

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/unordered-list/unordered-list.js
function UnorderedList({ children }) {
  const { depth } = (0, import_react8.useContext)(UnorderedListContext);
  const { styles: styles3, config } = useComponentTheme("UnorderedList");
  const listContext = (0, import_react8.useMemo)(() => ({
    depth: depth + 1
  }), [depth]);
  const listItemContext = (0, import_react8.useMemo)(() => {
    const { marker } = config();
    if (typeof marker === "string") {
      return { marker };
    }
    if (Array.isArray(marker)) {
      return {
        marker: marker[depth] ?? marker.at(-1) ?? defaultMarker
      };
    }
    return {
      marker: defaultMarker
    };
  }, [config, depth]);
  return import_react8.default.createElement(
    UnorderedListContext.Provider,
    { value: listContext },
    import_react8.default.createElement(
      UnorderedListItemContext.Provider,
      { value: listItemContext },
      import_react8.default.createElement(Box3, { ...styles3.list() }, children)
    )
  );
}
UnorderedList.Item = UnorderedListItem;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/multi-select/multi-select.js
var import_react11 = __toESM(require_react(), 1);
import { Box as Box5, Text as Text6 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/multi-select/multi-select-option.js
var import_react9 = __toESM(require_react(), 1);
import { Box as Box4, Text as Text5 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/multi-select/use-multi-select-state.js
var import_react10 = __toESM(require_react(), 1);
import { isDeepStrictEqual } from "util";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/multi-select/use-multi-select.js
import { useInput as useInput2 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/progress-bar/progress-bar.js
var import_react12 = __toESM(require_react(), 1);
import { Box as Box6, Text as Text7, measureElement } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/select/select.js
var import_react15 = __toESM(require_react(), 1);
import { Box as Box8, Text as Text9 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/select/select-option.js
var import_react13 = __toESM(require_react(), 1);
import { Box as Box7, Text as Text8 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/select/use-select-state.js
var import_react14 = __toESM(require_react(), 1);
import { isDeepStrictEqual as isDeepStrictEqual2 } from "util";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/select/use-select.js
import { useInput as useInput3 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/spinner/spinner.js
var import_react17 = __toESM(require_react(), 1);
import { Box as Box9, Text as Text10 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/spinner/use-spinner.js
var import_react16 = __toESM(require_react(), 1);

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/text-input/text-input.js
var import_react20 = __toESM(require_react(), 1);
import { Text as Text11 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/text-input/use-text-input-state.js
var import_react18 = __toESM(require_react(), 1);
var reducer = (state, action) => {
  switch (action.type) {
    case "move-cursor-left": {
      return {
        ...state,
        cursorOffset: Math.max(0, state.cursorOffset - 1)
      };
    }
    case "move-cursor-right": {
      return {
        ...state,
        cursorOffset: Math.min(state.value.length, state.cursorOffset + 1)
      };
    }
    case "insert": {
      return {
        ...state,
        previousValue: state.value,
        value: state.value.slice(0, state.cursorOffset) + action.text + state.value.slice(state.cursorOffset),
        cursorOffset: state.cursorOffset + action.text.length
      };
    }
    case "delete": {
      const newCursorOffset = Math.max(0, state.cursorOffset - 1);
      return {
        ...state,
        previousValue: state.value,
        value: state.value.slice(0, newCursorOffset) + state.value.slice(newCursorOffset + 1),
        cursorOffset: newCursorOffset
      };
    }
  }
};
var useTextInputState = ({ defaultValue = "", suggestions, onChange, onSubmit }) => {
  const [state, dispatch] = (0, import_react18.useReducer)(reducer, {
    previousValue: defaultValue,
    value: defaultValue,
    cursorOffset: defaultValue.length
  });
  const suggestion = (0, import_react18.useMemo)(() => {
    if (state.value.length === 0) {
      return;
    }
    return suggestions?.find((suggestion2) => suggestion2.startsWith(state.value))?.replace(state.value, "");
  }, [state.value, suggestions]);
  const moveCursorLeft = (0, import_react18.useCallback)(() => {
    dispatch({
      type: "move-cursor-left"
    });
  }, []);
  const moveCursorRight = (0, import_react18.useCallback)(() => {
    dispatch({
      type: "move-cursor-right"
    });
  }, []);
  const insert = (0, import_react18.useCallback)((text2) => {
    dispatch({
      type: "insert",
      text: text2
    });
  }, []);
  const deleteCharacter = (0, import_react18.useCallback)(() => {
    dispatch({
      type: "delete"
    });
  }, []);
  const submit = (0, import_react18.useCallback)(() => {
    if (suggestion) {
      insert(suggestion);
      onSubmit?.(state.value + suggestion);
      return;
    }
    onSubmit?.(state.value);
  }, [state.value, suggestion, insert, onSubmit]);
  (0, import_react18.useEffect)(() => {
    if (state.value !== state.previousValue) {
      onChange?.(state.value);
    }
  }, [state.previousValue, state.value, onChange]);
  return {
    ...state,
    suggestion,
    moveCursorLeft,
    moveCursorRight,
    insert,
    delete: deleteCharacter,
    submit
  };
};

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/text-input/use-text-input.js
var import_react19 = __toESM(require_react(), 1);
import { useInput as useInput4 } from "ink";

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group2] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group2)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group2[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group2,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer2 = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer2 >> 16 & 255,
          integer2 >> 8 & 255,
          integer2 & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value2 = Math.max(red, green, blue) * 2;
        if (value2 === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value2 === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/supports-color/index.js
import process3 from "process";
import os from "os";
import tty from "tty";
function hasFlag(flag2, argv = globalThis.Deno ? globalThis.Deno.args : process3.argv) {
  const prefix = flag2.startsWith("-") ? "" : flag2.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag2);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = process3;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process3.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/utilities.js
function stringReplaceAll(string2, substring, replacer) {
  let index = string2.indexOf(substring);
  if (index === -1) {
    return string2;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string2.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string2.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string2.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string2, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string2[index - 1] === "\r";
    returnValue += string2.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string2.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string2.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = /* @__PURE__ */ Symbol("GENERATOR");
var STYLER = /* @__PURE__ */ Symbol("STYLER");
var IS_EMPTY = /* @__PURE__ */ Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object3, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object3.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string2) => {
  if (self.level <= 0 || !string2) {
    return self[IS_EMPTY] ? "" : string2;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string2;
  }
  const { openAll, closeAll } = styler;
  if (string2.includes("\x1B")) {
    while (styler !== void 0) {
      string2 = stringReplaceAll(string2, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string2.indexOf("\n");
  if (lfIndex !== -1) {
    string2 = stringEncaseCRLFWithFirstIndex(string2, closeAll, openAll, lfIndex);
  }
  return openAll + string2 + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/text-input/use-text-input.js
var cursor = source_default.inverse(" ");
var useTextInput = ({ isDisabled = false, state, placeholder = "" }) => {
  const renderedPlaceholder = (0, import_react19.useMemo)(() => {
    if (isDisabled) {
      return placeholder ? source_default.dim(placeholder) : "";
    }
    return placeholder && placeholder.length > 0 ? source_default.inverse(placeholder[0]) + source_default.dim(placeholder.slice(1)) : cursor;
  }, [isDisabled, placeholder]);
  const renderedValue = (0, import_react19.useMemo)(() => {
    if (isDisabled) {
      return state.value;
    }
    let index = 0;
    let result = state.value.length > 0 ? "" : cursor;
    for (const char of state.value) {
      result += index === state.cursorOffset ? source_default.inverse(char) : char;
      index++;
    }
    if (state.suggestion) {
      if (state.cursorOffset === state.value.length) {
        result += source_default.inverse(state.suggestion[0]) + source_default.dim(state.suggestion.slice(1));
      } else {
        result += source_default.dim(state.suggestion);
      }
      return result;
    }
    if (state.value.length > 0 && state.cursorOffset === state.value.length) {
      result += cursor;
    }
    return result;
  }, [isDisabled, state.value, state.cursorOffset, state.suggestion]);
  useInput4((input, key) => {
    if (key.upArrow || key.downArrow || key.ctrl && input === "c" || key.tab || key.shift && key.tab) {
      return;
    }
    if (key.return) {
      state.submit();
      return;
    }
    if (key.leftArrow) {
      state.moveCursorLeft();
    } else if (key.rightArrow) {
      state.moveCursorRight();
    } else if (key.backspace || key.delete) {
      state.delete();
    } else {
      state.insert(input);
    }
  }, { isActive: !isDisabled });
  return {
    inputValue: state.value.length > 0 ? renderedValue : renderedPlaceholder
  };
};

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/text-input/text-input.js
function TextInput({ isDisabled = false, defaultValue, placeholder = "", suggestions, onChange, onSubmit }) {
  const state = useTextInputState({
    defaultValue,
    suggestions,
    onChange,
    onSubmit
  });
  const { inputValue } = useTextInput({
    isDisabled,
    placeholder,
    state
  });
  const { styles: styles3 } = useComponentTheme("TextInput");
  return import_react20.default.createElement(Text11, { ...styles3.value() }, inputValue);
}

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/ordered-list/ordered-list.js
var import_react24 = __toESM(require_react(), 1);
import { Box as Box11 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/ordered-list/ordered-list-item.js
var import_react22 = __toESM(require_react(), 1);
import { Box as Box10, Text as Text12 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/ordered-list/ordered-list-item-context.js
var import_react21 = __toESM(require_react(), 1);
var OrderedListItemContext = (0, import_react21.createContext)({
  marker: figures_default.line
});

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/ordered-list/ordered-list-item.js
function OrderedListItem({ children }) {
  const { marker } = (0, import_react22.useContext)(OrderedListItemContext);
  const { styles: styles3 } = useComponentTheme("OrderedList");
  return import_react22.default.createElement(
    Box10,
    { ...styles3.listItem() },
    import_react22.default.createElement(Text12, { ...styles3.marker() }, marker),
    import_react22.default.createElement(Box10, { ...styles3.content() }, children)
  );
}

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/ordered-list/ordered-list-context.js
var import_react23 = __toESM(require_react(), 1);
var OrderedListContext = (0, import_react23.createContext)({
  marker: ""
});

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/ordered-list/ordered-list.js
function OrderedList({ children }) {
  const { marker: parentMarker } = (0, import_react24.useContext)(OrderedListContext);
  const { styles: styles3 } = useComponentTheme("OrderedList");
  let numberOfItems = 0;
  for (const child of import_react24.default.Children.toArray(children)) {
    if (!(0, import_react24.isValidElement)(child) || child.type !== OrderedListItem) {
      continue;
    }
    numberOfItems++;
  }
  const maxMarkerWidth = String(numberOfItems).length;
  return import_react24.default.createElement(Box11, { ...styles3.list() }, import_react24.default.Children.map(children, (child, index) => {
    if (!(0, import_react24.isValidElement)(child) || child.type !== OrderedListItem) {
      return child;
    }
    const paddedMarker = `${String(index + 1).padStart(maxMarkerWidth)}.`;
    const marker = `${parentMarker}${paddedMarker}`;
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      import_react24.default.createElement(
        OrderedListContext.Provider,
        { value: { marker } },
        import_react24.default.createElement(OrderedListItemContext.Provider, { value: { marker } }, child)
      )
    );
  }));
}
OrderedList.Item = OrderedListItem;

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/password-input/password-input.js
var import_react27 = __toESM(require_react(), 1);
import { Text as Text13 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/password-input/use-password-input-state.js
var import_react25 = __toESM(require_react(), 1);

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/password-input/use-password-input.js
var import_react26 = __toESM(require_react(), 1);
import { useInput as useInput5 } from "ink";
var cursor2 = source_default.inverse(" ");

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/status-message/status-message.js
var import_react28 = __toESM(require_react(), 1);
import { Box as Box12, Text as Text14 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/alert/alert.js
var import_react29 = __toESM(require_react(), 1);
import { Box as Box13, Text as Text15 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/email-input/email-input.js
var import_react32 = __toESM(require_react(), 1);
import { Text as Text16 } from "ink";

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/email-input/use-email-input-state.js
var import_react30 = __toESM(require_react(), 1);

// node_modules/.pnpm/@inkjs+ui@2.0.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4_/node_modules/@inkjs/ui/build/components/email-input/use-email-input.js
var import_react31 = __toESM(require_react(), 1);
import { useInput as useInput6 } from "ink";
var cursor3 = source_default.inverse(" ");

// packages/ui/src/primitives/text-input.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var TextInput2 = ({
  value: value2,
  defaultValue,
  onChange,
  onSubmit,
  placeholder,
  isDisabled,
  suggestions
}) => {
  const inputProps = {
    onChange,
    onSubmit: (nextValue) => onSubmit?.(nextValue),
    ...typeof isDisabled === "boolean" ? { isDisabled } : {},
    ...typeof placeholder === "string" ? { placeholder } : {},
    ...typeof (value2 ?? defaultValue) === "string" ? { defaultValue: value2 ?? defaultValue } : {},
    ...Array.isArray(suggestions) ? { suggestions } : {}
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TextInput, { ...inputProps });
};

// packages/ui/src/primitives/spinner.tsx
var import_react34 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/primitives/select.tsx
var import_react37 = __toESM(require_react(), 1);

// node_modules/.pnpm/ink-select-input@6.2.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4__react@19.2.4/node_modules/ink-select-input/build/Indicator.js
var import_react35 = __toESM(require_react(), 1);
import { Box as Box14, Text as Text17 } from "ink";

// node_modules/.pnpm/ink-select-input@6.2.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4__react@19.2.4/node_modules/ink-select-input/build/Item.js
var React23 = __toESM(require_react(), 1);
import { Text as Text18 } from "ink";

// node_modules/.pnpm/ink-select-input@6.2.0_ink@6.7.0_@types+react@19.2.14_react@19.2.4__react@19.2.4/node_modules/ink-select-input/build/SelectInput.js
var import_react36 = __toESM(require_react(), 1);
import { isDeepStrictEqual as isDeepStrictEqual3 } from "util";
import { Box as Box15, useInput as useInput7 } from "ink";

// packages/ui/src/primitives/select.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/primitives/tree-view.tsx
var import_react38 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
import { Box as Box16, Text as Text19 } from "ink";

// packages/ui/src/primitives/status-bar.tsx
var import_react39 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
import { Box as Box17, Text as Text20 } from "ink";

// packages/ui/src/primitives/scroll-area.tsx
var import_react40 = __toESM(require_react(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
import { Box as Box18 } from "ink";

// packages/ui/src/shell/shell-context.tsx
var import_react41 = __toESM(require_react(), 1);
var ShellContext = (0, import_react41.createContext)(null);

// packages/ui/src/shell/browser-shell-provider.tsx
var import_react42 = __toESM(require_react(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var BrowserShellProvider = ({ children }) => {
  const [isCommandRunning, setIsCommandRunning] = (0, import_react42.useState)(false);
  const value2 = (0, import_react42.useMemo)(
    () => ({
      isCommandRunning,
      startCommand: () => setIsCommandRunning(true),
      endCommand: () => setIsCommandRunning(false)
    }),
    [isCommandRunning]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ShellContext.Provider, { value: value2, children });
};

// packages/ui/src/shell/terminal-shell-provider.tsx
var import_react43 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var TerminalShellProvider = ({ children }) => {
  const [isCommandRunning, setIsCommandRunning] = (0, import_react43.useState)(false);
  const value2 = (0, import_react43.useMemo)(
    () => ({
      isCommandRunning,
      startCommand: () => setIsCommandRunning(true),
      endCommand: () => setIsCommandRunning(false)
    }),
    [isCommandRunning]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ShellContext.Provider, { value: value2, children });
};

// packages/ui/src/shell/interactive-shell.tsx
var import_react44 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
import { Box as Box19, Text as Text21 } from "ink";

// packages/ui/src/hooks/use-keyboard.ts
import { useInput as useInput8 } from "ink";

// packages/ui/src/social/persona-card.tsx
var import_react45 = __toESM(require_react(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/social/persona-list.tsx
var import_react46 = __toESM(require_react(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/social/contact-card.tsx
var import_react47 = __toESM(require_react(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/social/contact-list.tsx
var import_react48 = __toESM(require_react(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/social/group-card.tsx
var import_react49 = __toESM(require_react(), 1);
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/social/group-list.tsx
var import_react50 = __toESM(require_react(), 1);
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/social/membership-list.tsx
var import_react51 = __toESM(require_react(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/social/social-entity-badge.tsx
var import_react52 = __toESM(require_react(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/file-handlers/image-file-preview.tsx
var import_react53 = __toESM(require_react(), 1);
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/file-handlers/markdown-edit.tsx
var import_react54 = __toESM(require_react(), 1);
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/file-handlers/markdown-view.tsx
var import_react55 = __toESM(require_react(), 1);
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/file-handlers/markdown-view-edit.tsx
var import_react56 = __toESM(require_react(), 1);
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);

// packages/ui/src/file-handlers/text-file-view-edit.tsx
var import_react57 = __toESM(require_react(), 1);
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);

// node_modules/.pnpm/tinybase@7.3.4_@sqlite.org+sqlite-wasm@3.51.2-build6_effect@3.19.18_react-dom@19.2.4_re_6b17624b1e1b989d6af746770c44149e/node_modules/tinybase/schematizers/schematizer-zod/index.js
var getTypeOf = (thing) => typeof thing;
var EMPTY_STRING = "";
var STRING = getTypeOf(EMPTY_STRING);
var BOOLEAN = getTypeOf(true);
var NUMBER = getTypeOf(0);
var TYPE = "type";
var DEFAULT = "default";
var ALLOW_NULL = "allowNull";
var NULLABLE = "nullable";
var OPTIONAL = "optional";
var getIfNotFunction = (predicate) => (value2, then, otherwise) => predicate(value2) ? otherwise?.() : then(value2);
var isNullish = (thing) => thing == null;
var isUndefined = (thing) => thing === void 0;
var ifNotNullish = getIfNotFunction(isNullish);
var ifNotUndefined = getIfNotFunction(isUndefined);
var size = (arrayOrString) => arrayOrString.length;
var arrayForEach = (array, cb) => array.forEach(cb);
var object2 = Object;
var getPrototypeOf = (obj) => object2.getPrototypeOf(obj);
var objEntries = object2.entries;
var isObject = (obj) => !isNullish(obj) && ifNotNullish(
  getPrototypeOf(obj),
  (objPrototype) => objPrototype == object2.prototype || isNullish(getPrototypeOf(objPrototype)),
  /* istanbul ignore next */
  () => true
);
var objIds = object2.keys;
var objFreeze = object2.freeze;
var objNew = (entries = []) => object2.fromEntries(entries);
var objForEach = (obj, cb) => arrayForEach(objEntries(obj), ([id, value2]) => cb(value2, id));
var objSize = (obj) => size(objIds(obj));
var objIsEmpty = (obj) => isObject(obj) && objSize(obj) == 0;
var createCustomSchematizer = (unwrapSchema2, getProperties2) => {
  const toCellOrValueSchema = (schema) => {
    const [unwrapped, defaultValue, allowNull] = unwrapSchema2(schema);
    const type = unwrapped?.type;
    if (type !== STRING && type !== NUMBER && type !== BOOLEAN) {
      return void 0;
    }
    const cellOrValueSchema = { [TYPE]: type };
    ifNotUndefined(defaultValue, (defaultValue2) => {
      cellOrValueSchema[DEFAULT] = defaultValue2;
    });
    if (allowNull) {
      cellOrValueSchema[ALLOW_NULL] = true;
    }
    return cellOrValueSchema;
  };
  const toTablesSchema = (schemas) => {
    const tablesSchema = objNew();
    objForEach(schemas, (schema, tableId) => {
      const tableSchema = objNew();
      ifNotUndefined(
        getProperties2(schema),
        (properties) => objForEach(
          properties,
          (cellSchema, cellId) => ifNotUndefined(toCellOrValueSchema(cellSchema), (cellSchema2) => {
            tableSchema[cellId] = cellSchema2;
          })
        )
      );
      if (!objIsEmpty(tableSchema)) {
        tablesSchema[tableId] = tableSchema;
      }
    });
    return tablesSchema;
  };
  const toValuesSchema = (schemas) => {
    const valuesSchema = objNew();
    objForEach(
      schemas,
      (schema, valueId) => ifNotUndefined(toCellOrValueSchema(schema), (valueSchema) => {
        valuesSchema[valueId] = valueSchema;
      })
    );
    return valuesSchema;
  };
  return objFreeze({
    toTablesSchema,
    toValuesSchema
  });
};
var unwrapSchema = (schema, defaultValue, allowNull) => {
  const type = schema?.def?.type;
  return type === OPTIONAL ? unwrapSchema(schema.def.innerType, defaultValue, allowNull) : type === NULLABLE ? unwrapSchema(schema.def.innerType, defaultValue, true) : type === DEFAULT ? unwrapSchema(schema.def.innerType, schema.def.defaultValue, allowNull) : [schema, defaultValue, allowNull ?? false];
};
var getProperties = (schema) => schema?.def?.shape;
var createZodSchematizer = () => createCustomSchematizer(unwrapSchema, getProperties);

// packages/state/src/schemas/social.ts
var PERSONAS_TABLE = "personas";
var CONTACTS_TABLE = "contacts";
var GROUPS_TABLE = "groups";
var MEMBERSHIPS_TABLE = "memberships";
var ACTIVITIES_TABLE = "activities";
var DEFAULT_PERSONA_ID_VALUE = "defaultPersonaId";
var SCHEMA_VERSION_VALUE = "schemaVersion";
var CURRENT_SCHEMA_VERSION = 3;

// packages/state/src/store.ts
var createDevalboStore = () => {
  const store = createStore();
  const schematizer = createZodSchematizer();
  const socialTablesSchema = schematizer.toTablesSchema({
    [PERSONAS_TABLE]: PersonaRowStoreSchema,
    [CONTACTS_TABLE]: ContactRowStoreSchema,
    [GROUPS_TABLE]: GroupRowStoreSchema,
    [MEMBERSHIPS_TABLE]: MembershipRowStoreSchema,
    [ACTIVITIES_TABLE]: ActivityRowStoreSchema
  });
  store.setTablesSchema({
    entries: {
      path: { type: "string" },
      name: { type: "string" },
      parentPath: { type: "string" },
      isDirectory: { type: "boolean" },
      size: { type: "number" },
      mtime: { type: "string" }
    },
    buffers: {
      path: { type: "string" },
      content: { type: "string" },
      isDirty: { type: "boolean" },
      cursorLine: { type: "number" },
      cursorCol: { type: "number" }
    },
    sync_roots: {
      label: { type: "string" },
      localPath: { type: "string" },
      podUrl: { type: "string" },
      webId: { type: "string" },
      readonly: { type: "boolean" },
      enabled: { type: "boolean" }
    },
    file_sync_state: {
      path: { type: "string" },
      syncRootId: { type: "string" },
      podEtag: { type: "string" },
      contentHash: { type: "string" },
      status: { type: "string" }
    },
    ...socialTablesSchema
  });
  store.setValuesSchema({
    [DEFAULT_PERSONA_ID_VALUE]: { type: "string", default: "" },
    [SCHEMA_VERSION_VALUE]: { type: "number", default: CURRENT_SCHEMA_VERSION }
  });
  const schemaVersion = store.getValue(SCHEMA_VERSION_VALUE);
  if (schemaVersion == null || schemaVersion === 0) {
    store.setValue(SCHEMA_VERSION_VALUE, CURRENT_SCHEMA_VERSION);
  } else if (typeof schemaVersion === "number" && schemaVersion > CURRENT_SCHEMA_VERSION) {
    console.warn(
      `[devalbo-state] Store schema version (${schemaVersion}) is newer than supported (${CURRENT_SCHEMA_VERSION}). Unknown tables/values may be ignored by this runtime.`
    );
  }
  return store;
};

// packages/state/src/hooks/use-store.ts
var import_react58 = __toESM(require_react(), 1);
var StoreContext = (0, import_react58.createContext)(null);

// packages/state/src/hooks/use-table.ts
var import_react59 = __toESM(require_react(), 1);

// packages/state/src/hooks/use-row.ts
var import_react60 = __toESM(require_react(), 1);

// packages/state/src/hooks/use-personas.ts
var import_react61 = __toESM(require_react(), 1);

// packages/state/src/hooks/use-contacts.ts
var import_react62 = __toESM(require_react(), 1);

// packages/state/src/hooks/use-groups.ts
var import_react63 = __toESM(require_react(), 1);

// packages/state/src/hooks/use-memberships.ts
var import_react64 = __toESM(require_react(), 1);

// packages/state/src/hooks/use-activities.ts
var import_react65 = __toESM(require_react(), 1);

// packages/state/src/hooks/use-app-config.tsx
var import_react66 = __toESM(require_react(), 1);
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
var AppConfigContext = (0, import_react66.createContext)(null);
var AppConfigProvider = ({ config, children }) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(AppConfigContext.Provider, { value: config, children });
var useAppConfig = () => {
  const ctx = (0, import_react66.useContext)(AppConfigContext);
  if (!ctx) throw new Error("useAppConfig must be used inside AppConfigProvider");
  return ctx;
};

// packages/commands/src/parser.ts
var splitInput = (input) => {
  if (Array.isArray(input)) {
    return input.map((value2) => value2.trim()).filter((value2) => value2.length > 0);
  }
  return input.trim().split(/\s+/).filter((value2) => value2.length > 0);
};
var parseCommand = (input) => {
  const parts = splitInput(input);
  const first = parts[0];
  return {
    fullName: first ?? "",
    path: first ? [first] : [],
    name: first ?? "",
    args: parts.slice(1)
  };
};

// packages/cli-shell/src/lib/command-runtime.ts
var parseCommandLine = (raw) => {
  const { name, args } = parseCommand(raw);
  return { commandName: name, args };
};
var notReady = () => makeError("CLI not ready");
var buildCommandOptions = (ctx) => ({
  store: ctx.store,
  cwd: ctx.cwd,
  setCwd: ctx.setCwd,
  ...ctx.session !== void 0 ? { session: ctx.session } : {},
  ...ctx.config !== void 0 ? { config: ctx.config } : {},
  ...ctx.driver ? { driver: ctx.driver } : {},
  ...ctx.connectivity ? { connectivity: ctx.connectivity } : {},
  ...ctx.clearScreen ? { clearScreen: ctx.clearScreen } : {},
  ...ctx.exit ? { exit: ctx.exit } : {},
  ...ctx.createProgram ? { createProgram: ctx.createProgram } : {}
});
var executeCommand = async (commandName, args, ctx) => {
  if (!ctx) return notReady();
  const command2 = ctx.commands[commandName];
  if (!command2) {
    return makeError(`Command not found: ${commandName}`);
  }
  try {
    return await command2(args, buildCommandOptions(ctx));
  } catch (error) {
    const message2 = error instanceof Error ? error.message : String(error);
    return makeError(message2);
  }
};
var executeCommandRaw = async (raw, ctx) => {
  if (!ctx) return notReady();
  const { commandName, args } = parseCommandLine(raw);
  if (!commandName) return makeOutput("");
  return executeCommand(commandName, args, ctx);
};

// packages/cli-shell/src/components/InteractiveShell.tsx
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
function ShellContent({
  commands,
  createProgram,
  runtime,
  store,
  config,
  driver,
  cwd,
  setCwd,
  session,
  welcomeMessage
}) {
  const [connectivity] = (0, import_react67.useState)(() => new BrowserConnectivityService());
  const [input, setInput] = (0, import_react67.useState)("");
  const [inputKey, setInputKey] = (0, import_react67.useState)(0);
  const [history, setHistory] = (0, import_react67.useState)([
    {
      component: typeof welcomeMessage === "string" ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Text22, { color: "cyan", children: welcomeMessage }) : welcomeMessage
    }
  ]);
  const executeCommand2 = async (raw) => {
    const { commandName } = parseCommandLine(raw);
    if (!commandName) return;
    const result = await executeCommandRaw(raw, {
      commands,
      store,
      cwd,
      setCwd,
      ...createProgram ? { createProgram } : {},
      ...session !== void 0 ? { session } : {},
      ...config !== void 0 ? { config } : {},
      ...driver ? { driver } : {},
      ...connectivity ? { connectivity } : {},
      clearScreen: () => setHistory([]),
      ...runtime === "terminal" ? {
        exit: () => {
          const nodeProcess = globalThis.process;
          nodeProcess?.exit?.(0);
        }
      } : {}
    });
    if (commandName !== "clear") {
      setHistory((prev) => [...prev, { command: `$ ${raw}`, component: result.component }]);
    }
    setInput("");
    setInputKey((prev) => prev + 1);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Box20, { flexDirection: "column", padding: 1, children: [
    history.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Box20, { flexDirection: "column", marginBottom: 1, children: [
      item.command ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Text22, { dimColor: true, children: item.command }) : null,
      item.component && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Box20, { marginLeft: 2, children: item.component })
    ] }, idx)),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Box20, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Text22, { color: "green", children: "$ " }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        TextInput2,
        {
          defaultValue: input,
          onChange: setInput,
          onSubmit: executeCommand2,
          placeholder: "Type command"
        },
        inputKey
      )
    ] })
  ] });
}
var InteractiveShell = ({
  commands,
  createProgram,
  runtime = "browser",
  store,
  config,
  driver = null,
  cwd,
  setCwd,
  session,
  welcomeMessage
}) => {
  const shellStore = (0, import_react67.useMemo)(() => store ?? createDevalboStore(), [store]);
  const fallbackCwd = (0, import_react67.useMemo)(() => {
    if (detectPlatform().platform !== "nodejs" /* NodeJS */) return "/";
    const nodeProcess = globalThis.process;
    return nodeProcess?.cwd?.() ?? "/";
  }, []);
  const resolvedCwd = cwd ?? fallbackCwd;
  const resolvedSetCwd = setCwd ?? (() => void 0);
  if (runtime === "terminal") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TerminalShellProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      ShellContent,
      {
        commands,
        ...createProgram ? { createProgram } : {},
        runtime: "terminal",
        store: shellStore,
        ...config ? { config } : {},
        driver,
        cwd: resolvedCwd,
        setCwd: resolvedSetCwd,
        ...session !== void 0 ? { session } : {},
        welcomeMessage
      }
    ) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(BrowserShellProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    ShellContent,
    {
      commands,
      ...createProgram ? { createProgram } : {},
      runtime: "browser",
      store: shellStore,
      ...config ? { config } : {},
      driver,
      cwd: resolvedCwd,
      setCwd: resolvedSetCwd,
      ...session !== void 0 ? { session } : {},
      welcomeMessage
    }
  ) });
};

// packages/cli-shell/src/program-helpers.ts
var registerBuiltinCommands = (program) => {
  program.command("pwd").description("Print working directory");
  program.command("cd <path>").description("Change directory");
  program.command("ls [path]").description("List directory contents");
  program.command("tree [path]").description("Show directory tree");
  program.command("cat <file>").description("Display file contents");
  program.command("touch <file>").description("Create empty file");
  program.command("mkdir <dir>").description("Create directory");
  program.command("cp <src> <dest>").description("Copy file or directory");
  program.command("mv <src> <dest>").description("Move/rename file or directory");
  program.command("rm <path>").description("Remove file or directory");
  program.command("stat <path>").description("Show file/directory info");
  program.command("clear").description("Clear terminal");
  program.command("backend").description("Show filesystem backend info");
  program.command("exit").description("Exit the shell");
  program.command("help").description("Show available commands");
  program.command("app-config").description("Show current app configuration");
};
var defaultWelcomeMessage = (config) => {
  const name = config?.appName ?? config?.appId ?? "CLI shell";
  return `Welcome to ${name}. Type "help" for available commands.`;
};

// packages/cli-shell/src/web/console-helpers.ts
var runtimeSource = null;
var bindCliRuntimeSource = (source) => {
  runtimeSource = source;
};
var unbindCliRuntimeSource = () => {
  runtimeSource = null;
};
var getCliRuntimeStatus = () => {
  if (!runtimeSource) return { ready: false, missing: ["runtimeSource"] };
  const ctx = runtimeSource.getContext();
  if (!ctx) return { ready: false, missing: ["runtimeContext"] };
  return { ready: true, missing: [] };
};
function extractText(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = node.props;
    if (props?.children) return extractText(props.children);
  }
  return "";
}
var withCwdOverride = (ctx, cwdOverride) => {
  if (!cwdOverride) return ctx;
  return { ...ctx, cwd: cwdOverride };
};
var getContextOrThrow = (cwdOverride) => {
  const status = getCliRuntimeStatus();
  if (!status.ready || !runtimeSource) {
    throw new Error(`CLI not ready: ${status.missing.join(", ") || "unknown"}`);
  }
  const ctx = runtimeSource.getContext();
  if (!ctx) {
    throw new Error("CLI not ready: runtimeContext");
  }
  return withCwdOverride(ctx, cwdOverride);
};
var unwrapOrThrow = (result) => {
  if (result.error) throw new Error(result.error);
  return result;
};
async function exec(commandName, args = [], cwdOverride) {
  const ctx = getContextOrThrow(cwdOverride);
  const result = await executeCommand(commandName, args, ctx);
  const commandResult = unwrapOrThrow(result);
  const text2 = extractText(commandResult.component);
  if (text2) {
    console.log(`
${text2}
`);
  }
  return commandResult;
}
async function execRaw(raw, cwdOverride) {
  const ctx = getContextOrThrow(cwdOverride);
  const result = await executeCommandRaw(raw, ctx);
  const commandResult = unwrapOrThrow(result);
  const text2 = extractText(commandResult.component);
  if (text2) {
    console.log(`
${text2}
`);
  }
  return commandResult;
}
async function execText(commandName, args = [], cwdOverride) {
  try {
    const result = await exec(commandName, args, cwdOverride);
    return {
      text: extractText(result.component),
      error: result.error ?? null
    };
  } catch (error) {
    return {
      text: "",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
var cli = {
  exec,
  execRaw,
  execText,
  status: getCliRuntimeStatus,
  pwd: () => exec("pwd"),
  cd: (target) => exec("cd", [target]),
  ls: (target = ".") => exec("ls", [target]),
  tree: (target = ".") => exec("tree", [target]),
  stat: (target) => exec("stat", [target]),
  clear: () => exec("clear"),
  cat: (target) => exec("cat", [target]),
  touch: (target) => exec("touch", [target]),
  mkdir: (target) => exec("mkdir", [target]),
  cp: (source, dest) => exec("cp", [source, dest]),
  mv: (source, dest) => exec("mv", [source, dest]),
  rm: (target) => exec("rm", [target]),
  backend: () => exec("backend"),
  export: (target = ".", output) => exec("export", output ? [target, output] : [target]),
  import: (locationOrBftFile, location) => exec("import", location ? [locationOrBftFile ?? "", location] : locationOrBftFile ? [locationOrBftFile] : []),
  exit: () => exec("exit"),
  help: () => exec("help"),
  helpText: async () => (await execText("help")).text
};

// packages/cli-shell/src/cli-entry.tsx
var import_react68 = __toESM(require_react(), 1);
var import_react69 = __toESM(require_react(), 1);
import { render } from "ink";
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
async function startInteractiveCli(opts) {
  const store = createDevalboStore();
  const driver = await createFilesystemDriver();
  const initialCwd = globalThis.process?.cwd?.() ?? "/";
  const App = () => {
    const [cwd, setCwd] = (0, import_react68.useState)(initialCwd);
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      InteractiveShell,
      {
        runtime: "terminal",
        commands: opts.commands,
        createProgram: opts.createProgram,
        store,
        config: opts.config,
        driver,
        cwd,
        setCwd,
        welcomeMessage: opts.welcomeMessage
      }
    );
  };
  render(/* @__PURE__ */ (0, import_jsx_runtime26.jsx)(App, {}));
}

// packages/cli-shell/src/index.ts
var builtinCommands = { ...filesystemCommands, ...systemCommands, ...appCommands };
export {
  AppConfigProvider,
  BrowserConnectivityService,
  InteractiveShell,
  StoreContext,
  bindCliRuntimeSource,
  builtinCommands,
  cli,
  createCliAppConfig,
  createDevalboStore,
  createFilesystemDriver,
  defaultWelcomeMessage,
  makeError,
  makeOutput,
  makeResult,
  makeResultError,
  mergeCommands,
  registerBuiltinCommands,
  startInteractiveCli,
  unbindCliRuntimeSource,
  useAppConfig
};
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
