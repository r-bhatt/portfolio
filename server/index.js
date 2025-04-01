import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useRef } from "react";
import clsx from "clsx";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const tick = "_tick_ba12b_1";
const activetick = "_activetick_ba12b_12";
const styles$1 = {
  tick,
  activetick
};
const TICKS_NUMBER = 5;
const STARTING_TICK_ANGLE = -45;
const STEP_SIZE = 90 / (TICKS_NUMBER - 1);
const Ticks = ({ activeTick }) => new Array(TICKS_NUMBER).fill(0).map((_, idx) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: { rotate: STARTING_TICK_ANGLE + STEP_SIZE * idx + "deg" },
      className: clsx(
        "absolute size-full top-0 left-0 overflow-visible",
        styles$1.tick,
        {
          [styles$1.activetick]: idx === activeTick
        }
      )
    },
    idx
  );
});
const knob_surround = "_knob_surround_1f7r8_1";
const knob = "_knob_1f7r8_1";
const styles = {
  knob_surround,
  knob
};
const Knob = () => {
  const [grabbed, setGrabbed] = useState(true);
  const [knobAngle, setKnobAngle] = useState(0);
  const knobRef = useRef(null);
  const handleMouseDown = () => {
    console.log("down");
  };
  const handleMouseUp = () => {
    console.log("up");
  };
  const handleMouseMove = (e) => {
    if (!knobRef.current) return;
    if (!grabbed) return;
    const { x, y, width, height } = knobRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const oppositeSide = centerY - clientY;
    const adjacentSide = centerX - clientX;
    const currentRadianAngle = Math.atan2(oppositeSide, adjacentSide);
    const currentDegreeAngle = currentRadianAngle * 180 / Math.PI;
    if (Math.abs(currentDegreeAngle) <= 45) setKnobAngle(currentDegreeAngle);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: knobRef,
      className: clsx(
        "w-[14em] aspect-square rounded-full relative m-[5em] border-light-gray border-[0.25em]",
        styles.knob_surround
      ),
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            id: "knob",
            style: { rotate: knobAngle + "deg" },
            className: clsx("absolute size-full", styles.knob)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "absolute uppercase text-gray-text text-[80%] opacity-50 bottom-[1em] -left-[2.5em]", children: "Min" }),
        /* @__PURE__ */ jsx("span", { className: "absolute uppercase text-gray-text text-[80%] opacity-50 -left-[2.5em]", children: "Max" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: /* @__PURE__ */ jsx(Ticks, { activeTick: 2 }) })
      ]
    }
  );
};
const PortfolioLayout = () => {
  return /* @__PURE__ */ jsx(Knob, {});
};
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(PortfolioLayout, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-RtqKm1w7.js", "imports": ["/assets/chunk-K6CSEXPM-BkoTNwhC.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-BQCYblsj.js", "imports": ["/assets/chunk-K6CSEXPM-BkoTNwhC.js", "/assets/with-props-kfWWD9C7.js"], "css": ["/assets/root-Bkj4Xw_q.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-C7KJGbcS.js", "imports": ["/assets/with-props-kfWWD9C7.js", "/assets/chunk-K6CSEXPM-BkoTNwhC.js"], "css": ["/assets/home-BMHDvbio.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-91078da1.js", "version": "91078da1" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
