import { jsx as G, jsxs as f1, Fragment as z4 } from "react/jsx-runtime";
import * as s1 from "react";
import Y1, { useState as c1, useMemo as W1, useEffect as p1, useCallback as r1, createContext as d6, useContext as Q1, useRef as v1, forwardRef as L4, useImperativeHandle as f6, useLayoutEffect as E9, cloneElement as x6, Component as D7, Fragment as X3, useTransition as A9 } from "react";
import { useLoader as V7, useThree as h6, useFrame as S9, Canvas as W7 } from "@react-three/fiber";
import { Loader as j7, FileLoader as X7, Matrix3 as k4, Vector2 as T1, Vector3 as w1, Box2 as H7, ShapeUtils as Z7, Shape as R9, Path as b3, BufferGeometry as p6, Float32BufferAttribute as _3, SRGBColorSpace as Y7, ShapePath as y4, Color as g6, Group as J7, BufferAttribute as U7, ExtrudeGeometry as H3, MeshLambertMaterial as z9, DoubleSide as i2, ShapeGeometry as $7, Mesh as k2, CanvasTexture as O9, CurvePath as Q7, LineCurve3 as K7, TubeGeometry as ee, MeshBasicMaterial as H4, Raycaster as le, PlaneGeometry as te, Box3 as T9, PerspectiveCamera as O2, SpriteMaterial as ne, Texture as oe, MeshStandardMaterial as re, MeshPhongMaterial as qe } from "three";
import { useFont as w9, Html as b6, MapControls as ie, Stats as ae } from "@react-three/drei";
import X4, { createPortal as se } from "react-dom";
const ce = Y7;
class _6 extends j7 {
  /**
   * Constructs a new SVG loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(l) {
    super(l), this.defaultDPI = 90, this.defaultUnit = "px";
  }
  /**
   * Starts loading from the given URL and passes the loaded SVG asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function({paths:Array<ShapePath>,xml:string})} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(l, t, o, n) {
    const r = this, q = new X7(r.manager);
    q.setPath(r.path), q.setRequestHeader(r.requestHeader), q.setWithCredentials(r.withCredentials), q.load(l, function(c) {
      try {
        t(r.parse(c));
      } catch (i) {
        n ? n(i) : console.error(i), r.manager.itemError(l);
      }
    }, o, n);
  }
  /**
   * Parses the given SVG data and returns the resulting data.
   *
   * @param {string} text - The raw SVG data as a string.
   * @return {{paths:Array<ShapePath>,xml:string}} An object holding an array of shape paths and the
   * SVG XML document.
   */
  parse(l) {
    const t = this;
    function o(z, I) {
      if (z.nodeType !== 1) return;
      const b = u(z);
      let h = !1, R = null;
      switch (z.nodeName) {
        case "svg":
          I = x(z, I);
          break;
        case "style":
          r(z);
          break;
        case "g":
          I = x(z, I);
          break;
        case "path":
          I = x(z, I), z.hasAttribute("d") && (R = n(z));
          break;
        case "rect":
          I = x(z, I), R = i(z);
          break;
        case "polygon":
          I = x(z, I), R = a(z);
          break;
        case "polyline":
          I = x(z, I), R = s(z);
          break;
        case "circle":
          I = x(z, I), R = m(z);
          break;
        case "ellipse":
          I = x(z, I), R = v(z);
          break;
        case "line":
          I = x(z, I), R = A(z);
          break;
        case "defs":
          h = !0;
          break;
        case "use":
          I = x(z, I);
          const K = (z.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "").substring(1), T = z.viewportElement.getElementById(K);
          T ? o(T, I) : console.warn("SVGLoader: 'use node' references non-existent node id: " + K);
          break;
      }
      R && (I.fill !== void 0 && I.fill !== "none" && R.color.setStyle(I.fill, ce), E(R, M), j.push(R), R.userData = { node: z, style: I });
      const k = z.childNodes;
      for (let N = 0; N < k.length; N++) {
        const K = k[N];
        h && K.nodeName !== "style" && K.nodeName !== "defs" || o(K, I);
      }
      b && ($.pop(), $.length > 0 ? M.copy($[$.length - 1]) : M.identity());
    }
    function n(z) {
      const I = new y4(), b = new T1(), h = new T1(), R = new T1();
      let k = !0, N = !1;
      const K = z.getAttribute("d");
      if (K === "" || K === "none") return null;
      const T = K.match(/[a-df-z][^a-df-z]*/ig);
      for (let t1 = 0, U = T.length; t1 < U; t1++) {
        const Y = T[t1], L = Y.charAt(0), V = Y.slice(1).trim();
        k === !0 && (N = !0, k = !1);
        let O;
        switch (L) {
          case "M":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 2)
              b.x = O[y + 0], b.y = O[y + 1], h.x = b.x, h.y = b.y, y === 0 ? I.moveTo(b.x, b.y) : I.lineTo(b.x, b.y), y === 0 && R.copy(b);
            break;
          case "H":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y++)
              b.x = O[y], h.x = b.x, h.y = b.y, I.lineTo(b.x, b.y), y === 0 && N === !0 && R.copy(b);
            break;
          case "V":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y++)
              b.y = O[y], h.x = b.x, h.y = b.y, I.lineTo(b.x, b.y), y === 0 && N === !0 && R.copy(b);
            break;
          case "L":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 2)
              b.x = O[y + 0], b.y = O[y + 1], h.x = b.x, h.y = b.y, I.lineTo(b.x, b.y), y === 0 && N === !0 && R.copy(b);
            break;
          case "C":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 6)
              I.bezierCurveTo(
                O[y + 0],
                O[y + 1],
                O[y + 2],
                O[y + 3],
                O[y + 4],
                O[y + 5]
              ), h.x = O[y + 2], h.y = O[y + 3], b.x = O[y + 4], b.y = O[y + 5], y === 0 && N === !0 && R.copy(b);
            break;
          case "S":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 4)
              I.bezierCurveTo(
                p(b.x, h.x),
                p(b.y, h.y),
                O[y + 0],
                O[y + 1],
                O[y + 2],
                O[y + 3]
              ), h.x = O[y + 0], h.y = O[y + 1], b.x = O[y + 2], b.y = O[y + 3], y === 0 && N === !0 && R.copy(b);
            break;
          case "Q":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 4)
              I.quadraticCurveTo(
                O[y + 0],
                O[y + 1],
                O[y + 2],
                O[y + 3]
              ), h.x = O[y + 0], h.y = O[y + 1], b.x = O[y + 2], b.y = O[y + 3], y === 0 && N === !0 && R.copy(b);
            break;
          case "T":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 2) {
              const a1 = p(b.x, h.x), I1 = p(b.y, h.y);
              I.quadraticCurveTo(
                a1,
                I1,
                O[y + 0],
                O[y + 1]
              ), h.x = a1, h.y = I1, b.x = O[y + 0], b.y = O[y + 1], y === 0 && N === !0 && R.copy(b);
            }
            break;
          case "A":
            O = d(V, [3, 4], 7);
            for (let y = 0, n1 = O.length; y < n1; y += 7) {
              if (O[y + 5] == b.x && O[y + 6] == b.y) continue;
              const a1 = b.clone();
              b.x = O[y + 5], b.y = O[y + 6], h.x = b.x, h.y = b.y, q(
                I,
                O[y],
                O[y + 1],
                O[y + 2],
                O[y + 3],
                O[y + 4],
                a1,
                b
              ), y === 0 && N === !0 && R.copy(b);
            }
            break;
          case "m":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 2)
              b.x += O[y + 0], b.y += O[y + 1], h.x = b.x, h.y = b.y, y === 0 ? I.moveTo(b.x, b.y) : I.lineTo(b.x, b.y), y === 0 && R.copy(b);
            break;
          case "h":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y++)
              b.x += O[y], h.x = b.x, h.y = b.y, I.lineTo(b.x, b.y), y === 0 && N === !0 && R.copy(b);
            break;
          case "v":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y++)
              b.y += O[y], h.x = b.x, h.y = b.y, I.lineTo(b.x, b.y), y === 0 && N === !0 && R.copy(b);
            break;
          case "l":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 2)
              b.x += O[y + 0], b.y += O[y + 1], h.x = b.x, h.y = b.y, I.lineTo(b.x, b.y), y === 0 && N === !0 && R.copy(b);
            break;
          case "c":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 6)
              I.bezierCurveTo(
                b.x + O[y + 0],
                b.y + O[y + 1],
                b.x + O[y + 2],
                b.y + O[y + 3],
                b.x + O[y + 4],
                b.y + O[y + 5]
              ), h.x = b.x + O[y + 2], h.y = b.y + O[y + 3], b.x += O[y + 4], b.y += O[y + 5], y === 0 && N === !0 && R.copy(b);
            break;
          case "s":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 4)
              I.bezierCurveTo(
                p(b.x, h.x),
                p(b.y, h.y),
                b.x + O[y + 0],
                b.y + O[y + 1],
                b.x + O[y + 2],
                b.y + O[y + 3]
              ), h.x = b.x + O[y + 0], h.y = b.y + O[y + 1], b.x += O[y + 2], b.y += O[y + 3], y === 0 && N === !0 && R.copy(b);
            break;
          case "q":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 4)
              I.quadraticCurveTo(
                b.x + O[y + 0],
                b.y + O[y + 1],
                b.x + O[y + 2],
                b.y + O[y + 3]
              ), h.x = b.x + O[y + 0], h.y = b.y + O[y + 1], b.x += O[y + 2], b.y += O[y + 3], y === 0 && N === !0 && R.copy(b);
            break;
          case "t":
            O = d(V);
            for (let y = 0, n1 = O.length; y < n1; y += 2) {
              const a1 = p(b.x, h.x), I1 = p(b.y, h.y);
              I.quadraticCurveTo(
                a1,
                I1,
                b.x + O[y + 0],
                b.y + O[y + 1]
              ), h.x = a1, h.y = I1, b.x = b.x + O[y + 0], b.y = b.y + O[y + 1], y === 0 && N === !0 && R.copy(b);
            }
            break;
          case "a":
            O = d(V, [3, 4], 7);
            for (let y = 0, n1 = O.length; y < n1; y += 7) {
              if (O[y + 5] == 0 && O[y + 6] == 0) continue;
              const a1 = b.clone();
              b.x += O[y + 5], b.y += O[y + 6], h.x = b.x, h.y = b.y, q(
                I,
                O[y],
                O[y + 1],
                O[y + 2],
                O[y + 3],
                O[y + 4],
                a1,
                b
              ), y === 0 && N === !0 && R.copy(b);
            }
            break;
          case "Z":
          case "z":
            I.currentPath.autoClose = !0, I.currentPath.curves.length > 0 && (b.copy(R), I.currentPath.currentPoint.copy(b), k = !0);
            break;
          default:
            console.warn(Y);
        }
        N = !1;
      }
      return I;
    }
    function r(z) {
      if (!(!z.sheet || !z.sheet.cssRules || !z.sheet.cssRules.length))
        for (let I = 0; I < z.sheet.cssRules.length; I++) {
          const b = z.sheet.cssRules[I];
          if (b.type !== 1) continue;
          const h = b.selectorText.split(/,/gm).filter(Boolean).map((R) => R.trim());
          for (let R = 0; R < h.length; R++) {
            const k = Object.fromEntries(
              Object.entries(b.style).filter(([, N]) => N !== "")
            );
            l1[h[R]] = Object.assign(
              l1[h[R]] || {},
              k
            );
          }
        }
    }
    function q(z, I, b, h, R, k, N, K) {
      if (I == 0 || b == 0) {
        z.lineTo(K.x, K.y);
        return;
      }
      h = h * Math.PI / 180, I = Math.abs(I), b = Math.abs(b);
      const T = (N.x - K.x) / 2, t1 = (N.y - K.y) / 2, U = Math.cos(h) * T + Math.sin(h) * t1, Y = -Math.sin(h) * T + Math.cos(h) * t1;
      let L = I * I, V = b * b;
      const O = U * U, y = Y * Y, n1 = O / L + y / V;
      if (n1 > 1) {
        const H1 = Math.sqrt(n1);
        I = H1 * I, b = H1 * b, L = I * I, V = b * b;
      }
      const a1 = L * y + V * O, I1 = (L * V - a1) / a1;
      let y1 = Math.sqrt(Math.max(0, I1));
      R === k && (y1 = -y1);
      const N1 = y1 * I * Y / b, P1 = -y1 * b * U / I, b1 = Math.cos(h) * N1 - Math.sin(h) * P1 + (N.x + K.x) / 2, j1 = Math.sin(h) * N1 + Math.cos(h) * P1 + (N.y + K.y) / 2, e4 = c(1, 0, (U - N1) / I, (Y - P1) / b), P4 = c((U - N1) / I, (Y - P1) / b, (-U - N1) / I, (-Y - P1) / b) % (Math.PI * 2);
      z.currentPath.absellipse(b1, j1, I, b, e4, e4 + P4, k === 0, h);
    }
    function c(z, I, b, h) {
      const R = z * b + I * h, k = Math.sqrt(z * z + I * I) * Math.sqrt(b * b + h * h);
      let N = Math.acos(Math.max(-1, Math.min(1, R / k)));
      return z * h - I * b < 0 && (N = -N), N;
    }
    function i(z) {
      const I = g(z.getAttribute("x") || 0), b = g(z.getAttribute("y") || 0), h = g(z.getAttribute("rx") || z.getAttribute("ry") || 0), R = g(z.getAttribute("ry") || z.getAttribute("rx") || 0), k = g(z.getAttribute("width")), N = g(z.getAttribute("height")), K = 1 - 0.551915024494, T = new y4();
      return T.moveTo(I + h, b), T.lineTo(I + k - h, b), (h !== 0 || R !== 0) && T.bezierCurveTo(
        I + k - h * K,
        b,
        I + k,
        b + R * K,
        I + k,
        b + R
      ), T.lineTo(I + k, b + N - R), (h !== 0 || R !== 0) && T.bezierCurveTo(
        I + k,
        b + N - R * K,
        I + k - h * K,
        b + N,
        I + k - h,
        b + N
      ), T.lineTo(I + h, b + N), (h !== 0 || R !== 0) && T.bezierCurveTo(
        I + h * K,
        b + N,
        I,
        b + N - R * K,
        I,
        b + N - R
      ), T.lineTo(I, b + R), (h !== 0 || R !== 0) && T.bezierCurveTo(I, b + R * K, I + h * K, b, I + h, b), T;
    }
    function a(z) {
      function I(k, N, K) {
        const T = g(N), t1 = g(K);
        R === 0 ? h.moveTo(T, t1) : h.lineTo(T, t1), R++;
      }
      const b = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g, h = new y4();
      let R = 0;
      return z.getAttribute("points").replace(b, I), h.currentPath.autoClose = !0, h;
    }
    function s(z) {
      function I(k, N, K) {
        const T = g(N), t1 = g(K);
        R === 0 ? h.moveTo(T, t1) : h.lineTo(T, t1), R++;
      }
      const b = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g, h = new y4();
      let R = 0;
      return z.getAttribute("points").replace(b, I), h.currentPath.autoClose = !1, h;
    }
    function m(z) {
      const I = g(z.getAttribute("cx") || 0), b = g(z.getAttribute("cy") || 0), h = g(z.getAttribute("r") || 0), R = new b3();
      R.absarc(I, b, h, 0, Math.PI * 2);
      const k = new y4();
      return k.subPaths.push(R), k;
    }
    function v(z) {
      const I = g(z.getAttribute("cx") || 0), b = g(z.getAttribute("cy") || 0), h = g(z.getAttribute("rx") || 0), R = g(z.getAttribute("ry") || 0), k = new b3();
      k.absellipse(I, b, h, R, 0, Math.PI * 2);
      const N = new y4();
      return N.subPaths.push(k), N;
    }
    function A(z) {
      const I = g(z.getAttribute("x1") || 0), b = g(z.getAttribute("y1") || 0), h = g(z.getAttribute("x2") || 0), R = g(z.getAttribute("y2") || 0), k = new y4();
      return k.moveTo(I, b), k.lineTo(h, R), k.currentPath.autoClose = !1, k;
    }
    function x(z, I) {
      I = Object.assign({}, I);
      let b = {};
      if (z.hasAttribute("class")) {
        const N = z.getAttribute("class").split(/\s/).filter(Boolean).map((K) => K.trim());
        for (let K = 0; K < N.length; K++)
          b = Object.assign(b, l1["." + N[K]]);
      }
      z.hasAttribute("id") && (b = Object.assign(b, l1["#" + z.getAttribute("id")]));
      function h(N, K, T) {
        T === void 0 && (T = function(U) {
          return U.startsWith("url") && console.warn("SVGLoader: url access in attributes is not implemented."), U;
        }), z.hasAttribute(N) && (I[K] = T(z.getAttribute(N))), b[N] && (I[K] = T(b[N])), z.style && z.style[N] !== "" && (I[K] = T(z.style[N]));
      }
      function R(N) {
        return Math.max(0, Math.min(1, g(N)));
      }
      function k(N) {
        return Math.max(0, g(N));
      }
      return h("fill", "fill"), h("fill-opacity", "fillOpacity", R), h("fill-rule", "fillRule"), h("opacity", "opacity", R), h("stroke", "stroke"), h("stroke-opacity", "strokeOpacity", R), h("stroke-width", "strokeWidth", k), h("stroke-linejoin", "strokeLineJoin"), h("stroke-linecap", "strokeLineCap"), h("stroke-miterlimit", "strokeMiterLimit", k), h("visibility", "visibility"), I;
    }
    function p(z, I) {
      return z - (I - z);
    }
    function d(z, I, b) {
      if (typeof z != "string")
        throw new TypeError("Invalid input: " + typeof z);
      const h = {
        WHITESPACE: /[ \t\r\n]/,
        DIGIT: /[\d]/,
        SIGN: /[-+]/,
        POINT: /\./,
        COMMA: /,/,
        EXP: /e/i,
        FLAGS: /[01]/
      }, R = 0, k = 1, N = 2, K = 3;
      let T = R, t1 = !0, U = "", Y = "";
      const L = [];
      function V(a1, I1, y1) {
        const N1 = new SyntaxError('Unexpected character "' + a1 + '" at index ' + I1 + ".");
        throw N1.partial = y1, N1;
      }
      function O() {
        U !== "" && (Y === "" ? L.push(Number(U)) : L.push(Number(U) * Math.pow(10, Number(Y)))), U = "", Y = "";
      }
      let y;
      const n1 = z.length;
      for (let a1 = 0; a1 < n1; a1++) {
        if (y = z[a1], Array.isArray(I) && I.includes(L.length % b) && h.FLAGS.test(y)) {
          T = k, U = y, O();
          continue;
        }
        if (T === R) {
          if (h.WHITESPACE.test(y))
            continue;
          if (h.DIGIT.test(y) || h.SIGN.test(y)) {
            T = k, U = y;
            continue;
          }
          if (h.POINT.test(y)) {
            T = N, U = y;
            continue;
          }
          h.COMMA.test(y) && (t1 && V(y, a1, L), t1 = !0);
        }
        if (T === k) {
          if (h.DIGIT.test(y)) {
            U += y;
            continue;
          }
          if (h.POINT.test(y)) {
            U += y, T = N;
            continue;
          }
          if (h.EXP.test(y)) {
            T = K;
            continue;
          }
          h.SIGN.test(y) && U.length === 1 && h.SIGN.test(U[0]) && V(y, a1, L);
        }
        if (T === N) {
          if (h.DIGIT.test(y)) {
            U += y;
            continue;
          }
          if (h.EXP.test(y)) {
            T = K;
            continue;
          }
          h.POINT.test(y) && U[U.length - 1] === "." && V(y, a1, L);
        }
        if (T === K) {
          if (h.DIGIT.test(y)) {
            Y += y;
            continue;
          }
          if (h.SIGN.test(y)) {
            if (Y === "") {
              Y += y;
              continue;
            }
            Y.length === 1 && h.SIGN.test(Y) && V(y, a1, L);
          }
        }
        h.WHITESPACE.test(y) ? (O(), T = R, t1 = !1) : h.COMMA.test(y) ? (O(), T = R, t1 = !0) : h.SIGN.test(y) ? (O(), T = k, U = y) : h.POINT.test(y) ? (O(), T = N, U = y) : V(y, a1, L);
      }
      return O(), L;
    }
    const _ = ["mm", "cm", "in", "pt", "pc", "px"], S = {
      mm: {
        mm: 1,
        cm: 0.1,
        in: 1 / 25.4,
        pt: 72 / 25.4,
        pc: 6 / 25.4,
        px: -1
      },
      cm: {
        mm: 10,
        cm: 1,
        in: 1 / 2.54,
        pt: 72 / 2.54,
        pc: 6 / 2.54,
        px: -1
      },
      in: {
        mm: 25.4,
        cm: 2.54,
        in: 1,
        pt: 72,
        pc: 6,
        px: -1
      },
      pt: {
        mm: 25.4 / 72,
        cm: 2.54 / 72,
        in: 1 / 72,
        pt: 1,
        pc: 6 / 72,
        px: -1
      },
      pc: {
        mm: 25.4 / 6,
        cm: 2.54 / 6,
        in: 1 / 6,
        pt: 72 / 6,
        pc: 1,
        px: -1
      },
      px: {
        px: 1
      }
    };
    function g(z) {
      let I = "px";
      if (typeof z == "string" || z instanceof String)
        for (let h = 0, R = _.length; h < R; h++) {
          const k = _[h];
          if (z.endsWith(k)) {
            I = k, z = z.substring(0, z.length - k.length);
            break;
          }
        }
      let b;
      return I === "px" && t.defaultUnit !== "px" ? b = S.in[t.defaultUnit] / t.defaultDPI : (b = S[I][t.defaultUnit], b < 0 && (b = S[I].in * t.defaultDPI)), b * parseFloat(z);
    }
    function u(z) {
      if (!(z.hasAttribute("transform") || z.nodeName === "use" && (z.hasAttribute("x") || z.hasAttribute("y"))))
        return null;
      const I = f(z);
      return $.length > 0 && I.premultiply($[$.length - 1]), M.copy(I), $.push(I), I;
    }
    function f(z) {
      const I = new k4(), b = Q;
      if (z.nodeName === "use" && (z.hasAttribute("x") || z.hasAttribute("y"))) {
        const h = g(z.getAttribute("x")), R = g(z.getAttribute("y"));
        I.translate(h, R);
      }
      if (z.hasAttribute("transform")) {
        const h = z.getAttribute("transform").split(")");
        for (let R = h.length - 1; R >= 0; R--) {
          const k = h[R].trim();
          if (k === "") continue;
          const N = k.indexOf("("), K = k.length;
          if (N > 0 && N < K) {
            const T = k.slice(0, N), t1 = d(k.slice(N + 1));
            switch (b.identity(), T) {
              case "translate":
                if (t1.length >= 1) {
                  const U = t1[0];
                  let Y = 0;
                  t1.length >= 2 && (Y = t1[1]), b.translate(U, Y);
                }
                break;
              case "rotate":
                if (t1.length >= 1) {
                  let U = 0, Y = 0, L = 0;
                  U = t1[0] * Math.PI / 180, t1.length >= 3 && (Y = t1[1], L = t1[2]), Z.makeTranslation(-Y, -L), J.makeRotation(U), P.multiplyMatrices(J, Z), Z.makeTranslation(Y, L), b.multiplyMatrices(Z, P);
                }
                break;
              case "scale":
                if (t1.length >= 1) {
                  const U = t1[0];
                  let Y = U;
                  t1.length >= 2 && (Y = t1[1]), b.scale(U, Y);
                }
                break;
              case "skewX":
                t1.length === 1 && b.set(
                  1,
                  Math.tan(t1[0] * Math.PI / 180),
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1
                );
                break;
              case "skewY":
                t1.length === 1 && b.set(
                  1,
                  0,
                  0,
                  Math.tan(t1[0] * Math.PI / 180),
                  1,
                  0,
                  0,
                  0,
                  1
                );
                break;
              case "matrix":
                t1.length === 6 && b.set(
                  t1[0],
                  t1[2],
                  t1[4],
                  t1[1],
                  t1[3],
                  t1[5],
                  0,
                  0,
                  1
                );
                break;
            }
          }
          I.premultiply(b);
        }
      }
      return I;
    }
    function E(z, I) {
      function b(N) {
        B.set(N.x, N.y, 1).applyMatrix3(I), N.set(B.x, B.y);
      }
      function h(N) {
        const K = N.xRadius, T = N.yRadius, t1 = Math.cos(N.aRotation), U = Math.sin(N.aRotation), Y = new w1(K * t1, K * U, 0), L = new w1(-T * U, T * t1, 0), V = Y.applyMatrix3(I), O = L.applyMatrix3(I), y = Q.set(
          V.x,
          O.x,
          0,
          V.y,
          O.y,
          0,
          0,
          0,
          1
        ), n1 = Z.copy(y).invert(), y1 = J.copy(n1).transpose().multiply(n1).elements, N1 = e1(y1[0], y1[1], y1[4]), P1 = Math.sqrt(N1.rt1), b1 = Math.sqrt(N1.rt2);
        if (N.xRadius = 1 / P1, N.yRadius = 1 / b1, N.aRotation = Math.atan2(N1.sn, N1.cs), !((N.aEndAngle - N.aStartAngle) % (2 * Math.PI) < Number.EPSILON)) {
          const e4 = Z.set(
            P1,
            0,
            0,
            0,
            b1,
            0,
            0,
            0,
            1
          ), P4 = J.set(
            N1.cs,
            N1.sn,
            0,
            -N1.sn,
            N1.cs,
            0,
            0,
            0,
            1
          ), H1 = e4.multiply(P4).multiply(y), p2 = (F4) => {
            const { x: B4, y: h3 } = new w1(Math.cos(F4), Math.sin(F4), 0).applyMatrix3(H1);
            return Math.atan2(h3, B4);
          };
          N.aStartAngle = p2(N.aStartAngle), N.aEndAngle = p2(N.aEndAngle), C(I) && (N.aClockwise = !N.aClockwise);
        }
      }
      function R(N) {
        const K = F(I), T = D(I);
        N.xRadius *= K, N.yRadius *= T;
        const t1 = K > Number.EPSILON ? Math.atan2(I.elements[1], I.elements[0]) : Math.atan2(-I.elements[3], I.elements[4]);
        N.aRotation += t1, C(I) && (N.aStartAngle *= -1, N.aEndAngle *= -1, N.aClockwise = !N.aClockwise);
      }
      const k = z.subPaths;
      for (let N = 0, K = k.length; N < K; N++) {
        const t1 = k[N].curves;
        for (let U = 0; U < t1.length; U++) {
          const Y = t1[U];
          Y.isLineCurve ? (b(Y.v1), b(Y.v2)) : Y.isCubicBezierCurve ? (b(Y.v0), b(Y.v1), b(Y.v2), b(Y.v3)) : Y.isQuadraticBezierCurve ? (b(Y.v0), b(Y.v1), b(Y.v2)) : Y.isEllipseCurve && (q1.set(Y.aX, Y.aY), b(q1), Y.aX = q1.x, Y.aY = q1.y, w(I) ? h(Y) : R(Y));
        }
      }
    }
    function C(z) {
      const I = z.elements;
      return I[0] * I[4] - I[1] * I[3] < 0;
    }
    function w(z) {
      const I = z.elements, b = I[0] * I[3] + I[1] * I[4];
      if (b === 0) return !1;
      const h = F(z), R = D(z);
      return Math.abs(b / (h * R)) > Number.EPSILON;
    }
    function F(z) {
      const I = z.elements;
      return Math.sqrt(I[0] * I[0] + I[1] * I[1]);
    }
    function D(z) {
      const I = z.elements;
      return Math.sqrt(I[3] * I[3] + I[4] * I[4]);
    }
    function e1(z, I, b) {
      let h, R, k, N, K;
      const T = z + b, t1 = z - b, U = Math.sqrt(t1 * t1 + 4 * I * I);
      return T > 0 ? (h = 0.5 * (T + U), K = 1 / h, R = z * K * b - I * K * I) : T < 0 ? R = 0.5 * (T - U) : (h = 0.5 * U, R = -0.5 * U), t1 > 0 ? k = t1 + U : k = t1 - U, Math.abs(k) > 2 * Math.abs(I) ? (K = -2 * I / k, N = 1 / Math.sqrt(1 + K * K), k = K * N) : Math.abs(I) === 0 ? (k = 1, N = 0) : (K = -0.5 * k / I, k = 1 / Math.sqrt(1 + K * K), N = K * k), t1 > 0 && (K = k, k = -N, N = K), { rt1: h, rt2: R, cs: k, sn: N };
    }
    const j = [], l1 = {}, $ = [], Q = new k4(), Z = new k4(), J = new k4(), P = new k4(), q1 = new T1(), B = new w1(), M = new k4(), W = new DOMParser().parseFromString(l, "image/svg+xml");
    return o(W.documentElement, {
      fill: "#000",
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
      strokeLineJoin: "miter",
      strokeLineCap: "butt",
      strokeMiterLimit: 4
    }), { paths: j, xml: W.documentElement };
  }
  /**
   * Creates from the given shape path and array of shapes.
   *
   * @param {ShapePath} shapePath - The shape path.
   * @return {Array<Shape>} An array of shapes.
   */
  static createShapes(l) {
    const o = {
      ORIGIN: 0,
      DESTINATION: 1,
      BETWEEN: 2,
      LEFT: 3,
      RIGHT: 4,
      BEHIND: 5,
      BEYOND: 6
    }, n = {
      loc: o.ORIGIN,
      t: 0
    };
    function r(p, d, _, S) {
      const g = p.x, u = d.x, f = _.x, E = S.x, C = p.y, w = d.y, F = _.y, D = S.y, e1 = (E - f) * (C - F) - (D - F) * (g - f), j = (u - g) * (C - F) - (w - C) * (g - f), l1 = (D - F) * (u - g) - (E - f) * (w - C), $ = e1 / l1, Q = j / l1;
      if (l1 === 0 && e1 !== 0 || $ <= 0 || $ >= 1 || Q < 0 || Q > 1)
        return null;
      if (e1 === 0 && l1 === 0) {
        for (let Z = 0; Z < 2; Z++)
          if (q(Z === 0 ? _ : S, p, d), n.loc == o.ORIGIN) {
            const J = Z === 0 ? _ : S;
            return { x: J.x, y: J.y, t: n.t };
          } else if (n.loc == o.BETWEEN) {
            const J = +(g + n.t * (u - g)).toPrecision(10), P = +(C + n.t * (w - C)).toPrecision(10);
            return { x: J, y: P, t: n.t };
          }
        return null;
      } else {
        for (let P = 0; P < 2; P++)
          if (q(P === 0 ? _ : S, p, d), n.loc == o.ORIGIN) {
            const q1 = P === 0 ? _ : S;
            return { x: q1.x, y: q1.y, t: n.t };
          }
        const Z = +(g + $ * (u - g)).toPrecision(10), J = +(C + $ * (w - C)).toPrecision(10);
        return { x: Z, y: J, t: $ };
      }
    }
    function q(p, d, _) {
      const S = _.x - d.x, g = _.y - d.y, u = p.x - d.x, f = p.y - d.y, E = S * f - u * g;
      if (p.x === d.x && p.y === d.y) {
        n.loc = o.ORIGIN, n.t = 0;
        return;
      }
      if (p.x === _.x && p.y === _.y) {
        n.loc = o.DESTINATION, n.t = 1;
        return;
      }
      if (E < -Number.EPSILON) {
        n.loc = o.LEFT;
        return;
      }
      if (E > Number.EPSILON) {
        n.loc = o.RIGHT;
        return;
      }
      if (S * u < 0 || g * f < 0) {
        n.loc = o.BEHIND;
        return;
      }
      if (Math.sqrt(S * S + g * g) < Math.sqrt(u * u + f * f)) {
        n.loc = o.BEYOND;
        return;
      }
      let C;
      S !== 0 ? C = u / S : C = f / g, n.loc = o.BETWEEN, n.t = C;
    }
    function c(p, d) {
      const _ = [], S = [];
      for (let g = 1; g < p.length; g++) {
        const u = p[g - 1], f = p[g];
        for (let E = 1; E < d.length; E++) {
          const C = d[E - 1], w = d[E], F = r(u, f, C, w);
          F !== null && _.find((D) => D.t <= F.t + Number.EPSILON && D.t >= F.t - Number.EPSILON) === void 0 && (_.push(F), S.push(new T1(F.x, F.y)));
        }
      }
      return S;
    }
    function i(p, d, _) {
      const S = new T1();
      d.getCenter(S);
      const g = [];
      return _.forEach((u) => {
        u.boundingBox.containsPoint(S) && c(p, u.points).forEach((E) => {
          g.push({ identifier: u.identifier, isCW: u.isCW, point: E });
        });
      }), g.sort((u, f) => u.point.x - f.point.x), g;
    }
    function a(p, d, _, S, g) {
      (g == null || g === "") && (g = "nonzero");
      const u = new T1();
      p.boundingBox.getCenter(u);
      const f = [new T1(_, u.y), new T1(S, u.y)], E = i(f, p.boundingBox, d);
      E.sort((j, l1) => j.point.x - l1.point.x);
      const C = [], w = [];
      E.forEach((j) => {
        j.identifier === p.identifier ? C.push(j) : w.push(j);
      });
      const F = C[0].point.x, D = [];
      let e1 = 0;
      for (; e1 < w.length && w[e1].point.x < F; )
        D.length > 0 && D[D.length - 1] === w[e1].identifier ? D.pop() : D.push(w[e1].identifier), e1++;
      if (D.push(p.identifier), g === "evenodd") {
        const j = D.length % 2 === 0, l1 = D[D.length - 2];
        return { identifier: p.identifier, isHole: j, for: l1 };
      } else if (g === "nonzero") {
        let j = !0, l1 = null, $ = null;
        for (let Q = 0; Q < D.length; Q++) {
          const Z = D[Q];
          j ? ($ = d[Z].isCW, j = !1, l1 = Z) : $ !== d[Z].isCW && ($ = d[Z].isCW, j = !0);
        }
        return { identifier: p.identifier, isHole: j, for: l1 };
      } else
        console.warn('fill-rule: "' + g + '" is currently not implemented.');
    }
    let s = 999999999, m = -999999999, v = l.subPaths.map((p) => {
      const d = p.getPoints();
      let _ = -999999999, S = 999999999, g = -999999999, u = 999999999;
      for (let f = 0; f < d.length; f++) {
        const E = d[f];
        E.y > _ && (_ = E.y), E.y < S && (S = E.y), E.x > g && (g = E.x), E.x < u && (u = E.x);
      }
      return m <= g && (m = g + 1), s >= u && (s = u - 1), { curves: p.curves, points: d, isCW: Z7.isClockWise(d), identifier: -1, boundingBox: new H7(new T1(u, S), new T1(g, _)) };
    });
    v = v.filter((p) => p.points.length > 1);
    for (let p = 0; p < v.length; p++)
      v[p].identifier = p;
    const A = v.map((p) => a(p, v, s, m, l.userData ? l.userData.style.fillRule : void 0)), x = [];
    return v.forEach((p) => {
      if (!A[p.identifier].isHole) {
        const _ = new R9();
        _.curves = p.curves, A.filter((g) => g.isHole && g.for === p.identifier).forEach((g) => {
          const u = v[g.identifier], f = new b3();
          f.curves = u.curves, _.holes.push(f);
        }), x.push(_);
      }
    }), x;
  }
  /**
   * Returns a stroke style object from the given parameters.
   *
   * @param {number} [width=1] - The stroke width.
   * @param {string} [color='#000'] - The stroke color, as  returned by {@link Color#getStyle}.
   * @param {'round'|'bevel'|'miter'|'miter-limit'} [lineJoin='miter'] - The line join style.
   * @param {'round'|'square'|'butt'} [lineCap='butt'] - The line cap style.
   * @param {number} [miterLimit=4] - Maximum join length, in multiples of the `width` parameter (join is truncated if it exceeds that distance).
   * @return {Object} The style object.
   */
  static getStrokeStyle(l, t, o, n, r) {
    return l = l !== void 0 ? l : 1, t = t !== void 0 ? t : "#000", o = o !== void 0 ? o : "miter", n = n !== void 0 ? n : "butt", r = r !== void 0 ? r : 4, {
      strokeColor: t,
      strokeWidth: l,
      strokeLineJoin: o,
      strokeLineCap: n,
      strokeMiterLimit: r
    };
  }
  /**
   * Creates a stroke from an array of points.
   *
   * @param {Array<Vector2>} points - The points in 2D space. Minimum 2 points. The path can be open or closed (last point equals to first point).
   * @param {Object} style - Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.
   * @param {number} [arcDivisions=12] - Arc divisions for round joins and endcaps.
   * @param {number} [minDistance=0.001] - Points closer to this distance will be merged.
   * @return {?BufferGeometry} The stroke geometry. UV coordinates are generated ('u' along path. 'v' across it, from left to right).
   * Returns `null` if not geometry was generated.
   */
  static pointsToStroke(l, t, o, n) {
    const r = [], q = [], c = [];
    if (_6.pointsToStrokeWithBuffers(l, t, o, n, r, q, c) === 0)
      return null;
    const i = new p6();
    return i.setAttribute("position", new _3(r, 3)), i.setAttribute("normal", new _3(q, 3)), i.setAttribute("uv", new _3(c, 2)), i;
  }
  /**
   * Creates a stroke from an array of points.
   *
   * @param {Array<Vector2>} points - The points in 2D space. Minimum 2 points.
   * @param {Object} style - Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.
   * @param {number} [arcDivisions=12] - Arc divisions for round joins and endcaps.
   * @param {number} [minDistance=0.001] - Points closer to this distance will be merged.
   * @param {Array<number>} vertices - An array holding vertices.
   * @param {Array<number>} normals - An array holding normals.
   * @param {Array<number>} uvs - An array holding uvs.
   * @param {number} [vertexOffset=0] - The vertex offset.
   * @return {number} The number of vertices.
   */
  static pointsToStrokeWithBuffers(l, t, o, n, r, q, c, i) {
    const a = new T1(), s = new T1(), m = new T1(), v = new T1(), A = new T1(), x = new T1(), p = new T1(), d = new T1(), _ = new T1(), S = new T1(), g = new T1(), u = new T1(), f = new T1(), E = new T1(), C = new T1(), w = new T1(), F = new T1();
    o = o !== void 0 ? o : 12, n = n !== void 0 ? n : 1e-3, i = i !== void 0 ? i : 0, l = t1(l);
    const D = l.length;
    if (D < 2) return 0;
    const e1 = l[0].equals(l[D - 1]);
    let j, l1 = l[0], $;
    const Q = t.strokeWidth / 2, Z = 1 / (D - 1);
    let J = 0, P, q1, B, M, W = !1, H = 0, z = i * 3, I = i * 2;
    b(l[0], l[1], a).multiplyScalar(Q), d.copy(l[0]).sub(a), _.copy(l[0]).add(a), S.copy(d), g.copy(_);
    for (let U = 1; U < D; U++) {
      j = l[U], U === D - 1 ? e1 ? $ = l[1] : $ = void 0 : $ = l[U + 1];
      const Y = a;
      if (b(l1, j, Y), m.copy(Y).multiplyScalar(Q), u.copy(j).sub(m), f.copy(j).add(m), P = J + Z, q1 = !1, $ !== void 0) {
        b(j, $, s), m.copy(s).multiplyScalar(Q), E.copy(j).sub(m), C.copy(j).add(m), B = !0, m.subVectors($, l1), Y.dot(m) < 0 && (B = !1), U === 1 && (W = B), m.subVectors($, j), m.normalize();
        const L = Math.abs(Y.dot(m));
        if (L > Number.EPSILON) {
          const V = Q / L;
          m.multiplyScalar(-V), v.subVectors(j, l1), A.copy(v).setLength(V).add(m), w.copy(A).negate();
          const O = A.length(), y = v.length();
          v.divideScalar(y), x.subVectors($, j);
          const n1 = x.length();
          switch (x.divideScalar(n1), v.dot(w) < y && x.dot(w) < n1 && (q1 = !0), F.copy(A).add(j), w.add(j), M = !1, q1 ? B ? (C.copy(w), f.copy(w)) : (E.copy(w), u.copy(w)) : k(), t.strokeLineJoin) {
            case "bevel":
              N(B, q1, P);
              break;
            case "round":
              K(B, q1), B ? R(j, u, E, P, 0) : R(j, C, f, P, 1);
              break;
            case "miter":
            case "miter-clip":
            default:
              const a1 = Q * t.strokeMiterLimit / O;
              if (a1 < 1)
                if (t.strokeLineJoin !== "miter-clip") {
                  N(B, q1, P);
                  break;
                } else
                  K(B, q1), B ? (x.subVectors(F, u).multiplyScalar(a1).add(u), p.subVectors(F, E).multiplyScalar(a1).add(E), h(u, P, 0), h(x, P, 0), h(j, P, 0.5), h(j, P, 0.5), h(x, P, 0), h(p, P, 0), h(j, P, 0.5), h(p, P, 0), h(E, P, 0)) : (x.subVectors(F, f).multiplyScalar(a1).add(f), p.subVectors(F, C).multiplyScalar(a1).add(C), h(f, P, 1), h(x, P, 1), h(j, P, 0.5), h(j, P, 0.5), h(x, P, 1), h(p, P, 1), h(j, P, 0.5), h(p, P, 1), h(C, P, 1));
              else
                q1 ? (B ? (h(_, J, 1), h(d, J, 0), h(F, P, 0), h(_, J, 1), h(F, P, 0), h(w, P, 1)) : (h(_, J, 1), h(d, J, 0), h(F, P, 1), h(d, J, 0), h(w, P, 0), h(F, P, 1)), B ? E.copy(F) : C.copy(F)) : B ? (h(u, P, 0), h(F, P, 0), h(j, P, 0.5), h(j, P, 0.5), h(F, P, 0), h(E, P, 0)) : (h(f, P, 1), h(F, P, 1), h(j, P, 0.5), h(j, P, 0.5), h(F, P, 1), h(C, P, 1)), M = !0;
              break;
          }
        } else
          k();
      } else
        k();
      !e1 && U === D - 1 && T(l[0], S, g, B, !0, J), J = P, l1 = j, d.copy(E), _.copy(C);
    }
    if (!e1)
      T(j, u, f, B, !1, P);
    else if (q1 && r) {
      let U = F, Y = w;
      W !== B && (U = w, Y = F), B ? (M || W) && (Y.toArray(r, 0 * 3), Y.toArray(r, 3 * 3), M && U.toArray(r, 1 * 3)) : (M || !W) && (Y.toArray(r, 1 * 3), Y.toArray(r, 3 * 3), M && U.toArray(r, 0 * 3));
    }
    return H;
    function b(U, Y, L) {
      return L.subVectors(Y, U), L.set(-L.y, L.x).normalize();
    }
    function h(U, Y, L) {
      r && (r[z] = U.x, r[z + 1] = U.y, r[z + 2] = 0, q && (q[z] = 0, q[z + 1] = 0, q[z + 2] = 1), z += 3, c && (c[I] = Y, c[I + 1] = L, I += 2)), H += 3;
    }
    function R(U, Y, L, V, O) {
      a.copy(Y).sub(U).normalize(), s.copy(L).sub(U).normalize();
      let y = Math.PI;
      const n1 = a.dot(s);
      Math.abs(n1) < 1 && (y = Math.abs(Math.acos(n1))), y /= o, m.copy(Y);
      for (let a1 = 0, I1 = o - 1; a1 < I1; a1++)
        v.copy(m).rotateAround(U, y), h(m, V, O), h(v, V, O), h(U, V, 0.5), m.copy(v);
      h(v, V, O), h(L, V, O), h(U, V, 0.5);
    }
    function k() {
      h(_, J, 1), h(d, J, 0), h(u, P, 0), h(_, J, 1), h(u, P, 0), h(f, P, 1);
    }
    function N(U, Y, L) {
      Y ? U ? (h(_, J, 1), h(d, J, 0), h(u, P, 0), h(_, J, 1), h(u, P, 0), h(w, P, 1), h(u, L, 0), h(E, L, 0), h(w, L, 0.5)) : (h(_, J, 1), h(d, J, 0), h(f, P, 1), h(d, J, 0), h(w, P, 0), h(f, P, 1), h(f, L, 1), h(w, L, 0), h(C, L, 1)) : U ? (h(u, L, 0), h(E, L, 0), h(j, L, 0.5)) : (h(f, L, 1), h(C, L, 0), h(j, L, 0.5));
    }
    function K(U, Y) {
      Y && (U ? (h(_, J, 1), h(d, J, 0), h(u, P, 0), h(_, J, 1), h(u, P, 0), h(w, P, 1), h(u, J, 0), h(j, P, 0.5), h(w, P, 1), h(j, P, 0.5), h(E, J, 0), h(w, P, 1)) : (h(_, J, 1), h(d, J, 0), h(f, P, 1), h(d, J, 0), h(w, P, 0), h(f, P, 1), h(f, J, 1), h(w, P, 0), h(j, P, 0.5), h(j, P, 0.5), h(w, P, 0), h(C, J, 1)));
    }
    function T(U, Y, L, V, O, y) {
      switch (t.strokeLineCap) {
        case "round":
          O ? R(U, L, Y, y, 0.5) : R(U, Y, L, y, 0.5);
          break;
        case "square":
          if (O)
            a.subVectors(Y, U), s.set(a.y, -a.x), m.addVectors(a, s).add(U), v.subVectors(s, a).add(U), V ? (m.toArray(r, 1 * 3), v.toArray(r, 0 * 3), v.toArray(r, 3 * 3)) : (m.toArray(r, 1 * 3), c[3 * 2 + 1] === 1 ? v.toArray(r, 3 * 3) : m.toArray(r, 3 * 3), v.toArray(r, 0 * 3));
          else {
            a.subVectors(L, U), s.set(a.y, -a.x), m.addVectors(a, s).add(U), v.subVectors(s, a).add(U);
            const n1 = r.length;
            V ? (m.toArray(r, n1 - 1 * 3), v.toArray(r, n1 - 2 * 3), v.toArray(r, n1 - 4 * 3)) : (v.toArray(r, n1 - 2 * 3), m.toArray(r, n1 - 1 * 3), v.toArray(r, n1 - 4 * 3));
          }
          break;
      }
    }
    function t1(U) {
      let Y = !1;
      for (let V = 1, O = U.length - 1; V < O; V++)
        if (U[V].distanceTo(U[V + 1]) < n) {
          Y = !0;
          break;
        }
      if (!Y) return U;
      const L = [];
      L.push(U[0]);
      for (let V = 1, O = U.length - 1; V < O; V++)
        U[V].distanceTo(U[V + 1]) >= n && L.push(U[V]);
      return L.push(U[U.length - 1]), L;
    }
  }
}
const ue = {
  0: {
    ha: 919,
    x_min: 72,
    x_max: 849,
    o: "m 460 -8 q 260 51 347 -8 q 122 220 172 110 q 72 486 72 331 q 122 752 72 642 q 260 922 172 863 q 460 981 347 981 q 660 922 572 981 q 798 752 747 863 q 849 486 849 642 q 798 220 849 331 q 660 51 747 110 q 460 -8 572 -8 m 460 83 q 610 130 546 83 q 710 266 674 176 q 746 486 746 356 q 710 706 746 617 q 610 842 674 796 q 460 889 546 889 q 311 842 376 889 q 210 706 246 796 q 174 486 174 617 q 210 266 174 356 q 311 130 246 176 q 460 83 376 83 z "
  },
  1: {
    ha: 501,
    x_min: 13,
    x_max: 342,
    o: "m 242 0 l 242 883 l 13 883 l 13 972 l 342 972 l 342 0 l 242 0 z "
  },
  2: {
    ha: 789,
    x_min: 25,
    x_max: 736,
    o: "m 54 0 l 54 71 l 458 467 q 542 562 514 521 q 579 639 569 603 q 589 707 589 675 q 531 840 589 792 q 361 889 474 889 q 209 863 275 889 q 96 781 143 836 l 25 842 q 171 944 82 908 q 369 981 260 981 q 540 949 468 981 q 652 858 613 918 q 692 718 692 799 q 678 625 692 671 q 631 528 665 579 q 532 414 597 478 l 161 50 l 133 89 l 736 89 l 736 0 l 54 0 z "
  },
  3: {
    ha: 783,
    x_min: 13,
    x_max: 715,
    o: "m 363 -8 q 163 26 257 -8 q 13 117 69 60 l 61 196 q 188 115 108 147 q 363 83 268 83 q 548 136 483 83 q 613 278 613 189 q 549 419 613 367 q 350 472 486 472 l 281 472 l 281 546 l 581 922 l 594 883 l 53 883 l 53 972 l 678 972 l 678 901 l 378 525 l 329 557 l 367 557 q 628 479 542 557 q 715 279 715 401 q 676 132 715 197 q 559 29 638 67 q 363 -8 481 -8 z "
  },
  4: {
    ha: 918,
    x_min: 56,
    x_max: 899,
    o: "m 56 256 l 56 328 l 571 972 l 682 972 l 171 328 l 117 344 l 899 344 l 899 256 l 56 256 m 604 0 l 604 256 l 607 344 l 607 569 l 704 569 l 704 0 l 604 0 z "
  },
  5: {
    ha: 786,
    x_min: 31,
    x_max: 732,
    o: "m 379 -8 q 181 26 275 -8 q 31 117 86 60 l 79 196 q 205 115 125 147 q 378 83 285 83 q 566 138 501 83 q 631 282 631 193 q 601 390 631 344 q 500 460 571 435 q 306 485 429 485 l 99 485 l 149 972 l 681 972 l 681 883 l 189 883 l 240 932 l 197 524 l 146 574 l 328 574 q 564 538 475 574 q 692 437 653 501 q 732 286 732 372 q 693 137 732 204 q 576 31 654 69 q 379 -8 499 -8 z "
  },
  6: {
    ha: 846,
    x_min: 72,
    x_max: 803,
    o: "m 471 -8 q 253 49 342 -8 q 118 216 164 107 q 72 478 72 325 q 128 755 72 643 q 285 924 185 867 q 517 981 385 981 q 642 968 582 981 q 747 928 701 956 l 707 847 q 621 883 669 872 q 518 893 572 893 q 267 793 361 893 q 174 494 174 693 q 177 419 174 464 q 193 329 181 374 l 158 356 q 218 478 174 428 q 329 556 263 529 q 475 582 396 582 q 646 546 572 582 q 761 444 719 510 q 803 290 803 379 q 760 133 803 200 q 641 28 717 65 q 471 -8 565 -8 m 467 76 q 590 102 536 76 q 674 176 643 128 q 704 288 704 224 q 638 440 704 383 q 460 497 572 497 q 329 469 385 497 q 242 394 274 442 q 210 285 210 346 q 239 184 210 232 q 326 106 268 136 q 467 76 383 76 l 471 -8 z"
  },
  7: {
    ha: 818,
    x_min: 44,
    x_max: 758,
    o: "m 243 0 l 643 883 l 143 883 l 143 701 l 44 701 l 44 972 l 758 972 l 758 901 l 351 0 l 243 0 z "
  },
  8: {
    ha: 886,
    x_min: 67,
    x_max: 819,
    o: "m 442 -8 q 241 25 325 -8 q 112 122 157 58 q 67 271 67 185 q 110 413 67 354 q 238 504 154 472 q 442 536 322 536 q 644 504 560 536 q 774 413 729 472 q 819 271 819 354 q 774 122 819 185 q 643 25 728 58 q 442 -8 558 -8 m 442 76 q 644 129 571 76 q 717 272 717 182 q 644 415 717 363 q 442 467 571 467 q 240 415 313 467 q 168 272 168 363 q 240 129 168 182 q 442 76 313 76 m 442 479 q 258 508 333 479 q 142 592 182 538 q 101 724 101 647 q 144 862 101 804 q 263 950 186 919 q 442 981 339 981 q 622 950 544 981 q 742 862 699 919 q 785 724 785 804 q 744 592 785 647 q 627 508 704 538 q 442 479 550 479 m 442 546 q 619 593 556 546 q 683 719 683 640 q 617 849 683 803 q 442 896 551 896 q 267 849 332 896 q 201 721 201 803 q 265 593 201 640 q 442 546 328 546 z "
  },
  9: {
    ha: 846,
    x_min: 43,
    x_max: 774,
    o: "m 375 981 q 593 923 504 981 q 728 757 682 865 q 774 494 774 649 q 717 218 774 331 q 561 49 661 106 q 329 -8 461 -8 q 205 4 264 -8 q 99 44 146 17 l 139 125 q 226 90 176 100 q 328 79 275 79 q 578 179 485 79 q 672 478 672 279 q 669 554 672 510 q 653 643 665 599 l 688 617 q 628 494 674 544 q 517 417 583 443 q 371 390 451 390 q 201 426 275 390 q 85 528 126 463 q 43 682 43 593 q 86 840 43 774 q 205 944 129 907 q 375 981 281 981 m 379 896 q 256 870 310 896 q 172 797 203 844 q 142 685 142 750 q 208 532 142 589 q 386 475 274 475 q 517 503 461 475 q 605 579 574 531 q 636 688 636 628 q 607 789 636 742 q 521 866 578 836 q 379 896 464 896 z "
  },
  A: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Á: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ă: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ắ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ặ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 m 499 -264 q 457 -247 475 -264 q 439 -204 439 -231 q 457 -161 439 -178 q 499 -144 475 -144 q 541 -161 524 -144 q 558 -204 558 -178 q 541 -247 558 -231 q 499 -264 524 -264 z "
  },
  Ằ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ẳ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ẵ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ǎ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Â: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ấ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ậ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 m 499 -264 q 457 -247 475 -264 q 439 -204 439 -231 q 457 -161 439 -178 q 499 -144 475 -144 q 541 -161 524 -144 q 558 -204 558 -178 q 541 -247 558 -231 q 499 -264 524 -264 z "
  },
  Ầ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ẩ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ẫ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ȁ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ä: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ạ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 m 499 -264 q 457 -247 475 -264 q 439 -204 439 -231 q 457 -161 439 -178 q 499 -144 475 -144 q 541 -161 524 -144 q 558 -204 558 -178 q 541 -247 558 -231 q 499 -264 524 -264 z "
  },
  À: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ả: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ȃ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ā: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Ą: {
    ha: 996,
    x_min: 3,
    x_max: 1022,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 m 904 -306 q 793 -269 835 -306 q 751 -174 751 -233 q 769 -103 751 -140 q 829 -31 786 -67 q 947 38 872 6 l 993 0 q 890 -58 926 -29 q 838 -113 853 -86 q 824 -167 824 -140 q 849 -225 824 -206 q 914 -244 875 -244 q 960 -237 938 -244 q 1000 -218 983 -231 l 1022 -272 q 967 -297 997 -287 q 904 -306 938 -306 z "
  },
  Å: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 m 497 1069 q 423 1089 456 1069 q 372 1140 390 1108 q 353 1211 353 1172 q 372 1283 353 1250 q 424 1337 392 1317 q 497 1357 457 1357 q 572 1337 539 1357 q 624 1283 604 1317 q 643 1211 643 1250 q 624 1140 643 1172 q 572 1089 604 1108 q 497 1069 539 1069 m 497 1118 q 565 1145 539 1118 q 592 1211 592 1172 q 565 1280 592 1251 q 497 1308 539 1308 q 431 1281 457 1308 q 404 1211 404 1253 q 430 1144 404 1171 q 497 1118 456 1118 z "
  },
  Ǻ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 m 497 1069 q 423 1089 456 1069 q 372 1140 390 1108 q 353 1211 353 1172 q 372 1283 353 1250 q 424 1337 392 1317 q 497 1357 457 1357 q 572 1337 539 1357 q 624 1283 604 1317 q 643 1211 643 1250 q 624 1140 643 1172 q 572 1089 604 1108 q 497 1069 539 1069 m 497 1118 q 565 1145 539 1118 q 592 1211 592 1172 q 565 1280 592 1251 q 497 1308 539 1308 q 431 1281 457 1308 q 404 1211 404 1253 q 430 1144 404 1171 q 497 1118 456 1118 m 606 1289 l 547 1310 l 688 1449 l 743 1404 l 606 1289 z "
  },
  Ã: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 z "
  },
  Æ: {
    ha: 1435,
    x_min: 3,
    x_max: 1351,
    o: "m 3 0 l 596 972 l 697 972 l 697 883 l 606 883 l 669 925 l 110 0 l 3 0 m 235 260 l 246 343 l 697 343 l 697 260 l 235 260 m 756 538 l 1271 538 l 1271 450 l 756 450 l 756 538 m 767 89 l 1351 89 l 1351 0 l 664 0 l 664 972 l 1331 972 l 1331 883 l 767 883 l 767 89 z "
  },
  Ǽ: {
    ha: 1435,
    x_min: 3,
    x_max: 1351,
    o: "m 3 0 l 596 972 l 697 972 l 697 883 l 606 883 l 669 925 l 110 0 l 3 0 m 235 260 l 246 343 l 697 343 l 697 260 l 235 260 m 756 538 l 1271 538 l 1271 450 l 756 450 l 756 538 m 767 89 l 1351 89 l 1351 0 l 664 0 l 664 972 l 1331 972 l 1331 883 l 767 883 l 767 89 z"
  },
  B: {
    ha: 1047,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 578 972 q 830 907 740 972 q 919 722 919 842 q 883 589 919 643 q 783 507 846 535 q 828 484 761 513 q 933 399 896 456 q 971 260 971 343 q 880 68 971 136 q 606 0 789 0 l 158 0 m 261 85 l 604 85 q 800 128 732 85 q 868 268 868 172 q 800 406 868 363 q 604 450 732 450 l 250 450 l 250 535 l 571 535 q 752 579 688 535 q 817 711 817 624 q 752 844 817 800 q 571 888 688 888 l 261 888 l 261 85 l 158 0 z"
  },
  C: {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 379 944 286 907 q 582 981 472 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 z "
  },
  Ć: {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 379 944 286 907 q 582 981 472 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 z "
  },
  Č: {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 379 944 286 907 q 582 981 472 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 z "
  },
  Ç: {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 379 944 286 907 q 582 981 472 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 m 531 -306 q 467 -297 496 -306 q 414 -274 439 -289 l 438 -221 q 481 -240 458 -233 q 529 -247 504 -247 q 593 -230 571 -247 q 615 -182 615 -212 q 594 -136 615 -154 q 529 -118 572 -118 l 497 -118 l 531 8 l 590 8 l 569 -72 q 657 -108 626 -76 q 688 -185 688 -139 q 644 -273 688 -240 q 531 -306 600 -306 z "
  },
  Ḉ: {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 379 944 286 907 q 582 981 472 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 m 531 -306 q 467 -297 496 -306 q 414 -274 439 -289 l 438 -221 q 481 -240 458 -233 q 529 -247 504 -247 q 593 -230 571 -247 q 615 -182 615 -212 q 594 -136 615 -154 q 529 -118 572 -118 l 497 -118 l 531 8 l 590 8 l 569 -72 q 657 -108 626 -76 q 688 -185 688 -139 q 644 -273 688 -240 q 531 -306 600 -306 z "
  },
  Ĉ: {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 379 944 286 907 q 582 981 472 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 z "
  },
  Ċ: {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 379 944 286 907 q 582 981 472 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 z "
  },
  D: {
    ha: 1147,
    x_min: 158,
    x_max: 1075,
    o: "m 158 0 l 158 972 l 554 972 q 827 910 710 972 q 1010 739 944 849 q 1075 486 1075 629 q 1010 233 1075 343 q 827 62 944 124 q 554 0 710 0 l 158 0 m 261 89 l 549 89 q 773 140 678 89 q 921 280 868 190 q 974 486 974 369 q 921 693 974 604 q 773 833 868 782 q 549 883 678 883 l 261 883 l 261 89 z "
  },
  Ǆ: {
    ha: 2022,
    x_min: 158,
    x_max: 1968,
    o: "m 158 0 l 158 972 l 554 972 q 827 910 710 972 q 1010 739 944 849 q 1075 486 1075 629 q 1010 233 1075 343 q 827 62 944 124 q 554 0 710 0 l 158 0 m 261 89 l 549 89 q 773 140 678 89 q 921 280 868 190 q 974 486 974 369 q 921 693 974 604 q 773 833 868 782 q 549 883 678 883 l 261 883 l 261 89 z "
  },
  Ð: {
    ha: 1154,
    x_min: 18,
    x_max: 1082,
    o: "m 165 0 l 165 972 l 561 972 q 834 910 717 972 q 1017 739 951 849 q 1082 486 1082 629 q 1017 233 1082 343 q 834 62 951 124 q 561 0 717 0 l 165 0 m 268 89 l 556 89 q 780 140 685 89 q 928 280 875 190 q 981 486 981 369 q 928 693 981 604 q 780 833 875 782 q 556 883 685 883 l 268 883 l 268 89 m 18 454 l 18 536 l 557 536 l 557 454 l 18 454 z "
  },
  Ď: {
    ha: 1147,
    x_min: 158,
    x_max: 1075,
    o: "m 158 0 l 158 972 l 554 972 q 827 910 710 972 q 1010 739 944 849 q 1075 486 1075 629 q 1010 233 1075 343 q 827 62 944 124 q 554 0 710 0 l 158 0 m 261 89 l 549 89 q 773 140 678 89 q 921 280 868 190 q 974 486 974 369 q 921 693 974 604 q 773 833 868 782 q 549 883 678 883 l 261 883 l 261 89 z "
  },
  Đ: {
    ha: 1154,
    x_min: 18,
    x_max: 1082,
    o: "m 165 0 l 165 972 l 561 972 q 834 910 717 972 q 1017 739 951 849 q 1082 486 1082 629 q 1017 233 1082 343 q 834 62 951 124 q 561 0 717 0 l 165 0 m 268 89 l 556 89 q 780 140 685 89 q 928 280 875 190 q 981 486 981 369 q 928 693 981 604 q 780 833 875 782 q 556 883 685 883 l 268 883 l 268 89 m 18 454 l 18 536 l 557 536 l 557 454 l 18 454 z "
  },
  Ḍ: {
    ha: 1147,
    x_min: 158,
    x_max: 1075,
    o: "m 158 0 l 158 972 l 554 972 q 827 910 710 972 q 1010 739 944 849 q 1075 486 1075 629 q 1010 233 1075 343 q 827 62 944 124 q 554 0 710 0 l 158 0 m 261 89 l 549 89 q 773 140 678 89 q 921 280 868 190 q 974 486 974 369 q 921 693 974 604 q 773 833 868 782 q 549 883 678 883 l 261 883 l 261 89 m 539 -264 q 497 -247 515 -264 q 479 -204 479 -231 q 497 -161 479 -178 q 539 -144 515 -144 q 581 -161 564 -144 q 599 -204 599 -178 q 581 -247 599 -231 q 539 -264 564 -264 z "
  },
  Ḏ: {
    ha: 1147,
    x_min: 158,
    x_max: 1075,
    o: "m 158 0 l 158 972 l 554 972 q 827 910 710 972 q 1010 739 944 849 q 1075 486 1075 629 q 1010 233 1075 343 q 827 62 944 124 q 554 0 710 0 l 158 0 m 261 89 l 549 89 q 773 140 678 89 q 921 280 868 190 q 974 486 974 369 q 921 693 974 604 q 773 833 868 782 q 549 883 678 883 l 261 883 l 261 89 m 325 -235 l 325 -169 l 753 -169 l 753 -235 l 325 -235 z "
  },
  ǅ: {
    ha: 1857,
    x_min: 158,
    x_max: 1800,
    o: "m 158 0 l 158 972 l 554 972 q 827 910 710 972 q 1010 739 944 849 q 1075 486 1075 629 q 1010 233 1075 343 q 827 62 944 124 q 554 0 710 0 l 158 0 m 261 89 l 549 89 q 773 140 678 89 q 921 280 868 190 q 974 486 974 369 q 921 693 974 604 q 773 833 868 782 q 549 883 678 883 l 261 883 l 261 89 z "
  },
  E: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  É: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ĕ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ě: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ḝ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 m 481 -306 q 417 -297 446 -306 q 364 -274 389 -289 l 388 -221 q 431 -240 408 -233 q 479 -247 454 -247 q 543 -230 521 -247 q 565 -182 565 -212 q 544 -136 565 -154 q 479 -118 522 -118 l 447 -118 l 481 8 l 540 8 l 519 -72 q 607 -108 576 -76 q 638 -185 638 -139 q 594 -273 638 -240 q 481 -306 550 -306 z "
  },
  Ê: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ế: {
    ha: 929,
    x_min: 158,
    x_max: 908,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ệ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 m 511 -264 q 469 -247 488 -264 q 451 -204 451 -231 q 469 -161 451 -178 q 511 -144 488 -144 q 553 -161 536 -144 q 571 -204 571 -178 q 553 -247 571 -231 q 511 -264 536 -264 z "
  },
  Ề: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ể: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ễ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ȅ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ë: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ė: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ẹ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 m 511 -264 q 469 -247 488 -264 q 451 -204 451 -231 q 469 -161 451 -178 q 511 -144 488 -144 q 553 -161 536 -144 q 571 -204 571 -178 q 553 -247 571 -231 q 511 -264 536 -264 z "
  },
  È: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ẻ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ȇ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ē: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ḗ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ḕ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ę: {
    ha: 929,
    x_min: 158,
    x_max: 874,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 m 757 -306 q 646 -269 688 -306 q 604 -174 604 -233 q 622 -103 604 -140 q 682 -31 639 -67 q 800 38 725 6 l 846 0 q 742 -58 779 -29 q 691 -113 706 -86 q 676 -167 676 -140 q 702 -225 676 -206 q 767 -244 728 -244 q 813 -237 790 -244 q 853 -218 836 -231 l 875 -272 q 820 -297 850 -287 q 757 -306 790 -306 z "
  },
  Ẽ: {
    ha: 929,
    x_min: 158,
    x_max: 846,
    o: "m 250 538 l 764 538 l 764 450 l 250 450 l 250 538 m 261 89 l 846 89 l 846 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 89 z "
  },
  Ʒ: {
    ha: 854,
    x_min: 44,
    x_max: 778,
    o: "m 410 -8 q 197 26 294 -8 q 44 114 100 60 l 85 194 q 219 113 135 146 q 407 81 304 81 q 606 134 538 81 q 675 279 675 188 q 607 421 675 368 q 394 474 539 474 l 322 474 l 322 546 l 646 922 l 654 885 l 81 885 l 81 972 l 735 972 l 735 901 l 413 525 l 372 556 l 410 556 q 615 521 533 556 q 737 424 696 486 q 778 279 778 361 q 737 132 778 197 q 614 29 696 67 q 410 -8 532 -8 z "
  },
  Ǯ: {
    ha: 854,
    x_min: 44,
    x_max: 778,
    o: "m 410 -8 q 197 26 294 -8 q 44 114 100 60 l 85 194 q 219 113 135 146 q 407 81 304 81 q 606 134 538 81 q 675 279 675 188 q 607 421 675 368 q 394 474 539 474 l 322 474 l 322 546 l 646 922 l 654 885 l 81 885 l 81 972 l 735 972 l 735 901 l 413 525 l 372 556 l 410 556 q 615 521 533 556 q 737 424 696 486 q 778 279 778 361 q 737 132 778 197 q 614 29 696 67 q 410 -8 532 -8 z "
  },
  F: {
    ha: 879,
    x_min: 158,
    x_max: 825,
    o: "m 250 501 l 764 501 l 764 413 l 250 413 l 250 501 m 261 0 l 158 0 l 158 972 l 825 972 l 825 883 l 261 883 l 261 0 z "
  },
  G: {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  Ğ: {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  Ǧ: {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  Ĝ: {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  Ģ: {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 m 513 -364 l 551 -214 l 561 -253 q 518 -237 535 -253 q 501 -199 501 -222 q 518 -160 501 -175 q 561 -144 535 -144 q 605 -160 589 -144 q 621 -199 621 -176 q 617 -228 621 -212 q 606 -261 614 -243 l 567 -364 l 513 -364 z "
  },
  Ġ: {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  Ḡ: {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  Ǥ: {
    ha: 1119,
    x_min: 72,
    x_max: 1088,
    o: "m 565 286 l 565 369 l 1088 369 l 1088 286 l 565 286 m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  H: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 869 972 l 971 972 l 971 0 l 869 0 l 869 972 m 261 0 l 158 0 l 158 972 l 261 972 l 261 0 m 879 449 l 250 449 l 250 539 l 879 539 l 879 449 z "
  },
  Ħ: {
    ha: 1143,
    x_min: 18,
    x_max: 1125,
    o: "m 876 972 l 978 972 l 978 0 l 876 0 l 876 972 m 268 0 l 165 0 l 165 972 l 268 972 l 268 0 m 886 449 l 257 449 l 257 539 l 886 539 l 886 449 m 17 719 l 17 803 l 1124 803 l 1124 719 l 17 719 z "
  },
  Ḫ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 869 972 l 971 972 l 971 0 l 869 0 l 869 972 m 261 0 l 158 0 l 158 972 l 261 972 l 261 0 m 879 449 l 250 449 l 250 539 l 879 539 l 879 449 m 564 -285 q 416 -239 476 -285 q 353 -117 356 -193 l 419 -117 q 463 -198 421 -168 q 564 -228 504 -228 q 667 -198 625 -228 q 708 -117 708 -168 l 775 -117 q 712 -239 772 -193 q 564 -285 651 -285 z "
  },
  Ȟ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 869 972 l 971 972 l 971 0 l 869 0 l 869 972 m 261 0 l 158 0 l 158 972 l 261 972 l 261 0 m 879 449 l 250 449 l 250 539 l 879 539 l 879 449 z "
  },
  Ĥ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 869 972 l 971 972 l 971 0 l 869 0 l 869 972 m 261 0 l 158 0 l 158 972 l 261 972 l 261 0 m 879 449 l 250 449 l 250 539 l 879 539 l 879 449 z "
  },
  Ḥ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 869 972 l 971 972 l 971 0 l 869 0 l 869 972 m 261 0 l 158 0 l 158 972 l 261 972 l 261 0 m 879 449 l 250 449 l 250 539 l 879 539 l 879 449 m 564 -264 q 522 -247 540 -264 q 504 -204 504 -231 q 522 -161 504 -178 q 564 -144 540 -144 q 606 -161 589 -144 q 624 -204 624 -178 q 606 -247 624 -231 q 564 -264 589 -264 z "
  },
  I: {
    ha: 419,
    x_min: 158,
    x_max: 261,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ĳ: {
    ha: 997,
    x_min: 136,
    x_max: 847,
    o: "m 454 -8 q 279 18 361 -8 q 136 88 197 44 l 178 169 q 308 106 236 128 q 457 83 379 83 q 669 165 593 83 q 744 415 744 247 l 744 972 l 847 972 l 847 419 q 798 183 847 278 q 661 40 749 88 q 454 -8 574 -8 m 150 419 l 150 972 l 253 972 l 253 419 l 150 419 z "
  },
  Í: {
    ha: 419,
    x_min: 119,
    x_max: 442,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ĭ: {
    ha: 419,
    x_min: -1,
    x_max: 421,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Î: {
    ha: 419,
    x_min: -19,
    x_max: 439,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ȉ: {
    ha: 419,
    x_min: -103,
    x_max: 367,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ï: {
    ha: 419,
    x_min: 26,
    x_max: 393,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ḯ: {
    ha: 419,
    x_min: 29,
    x_max: 413,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  İ: {
    ha: 419,
    x_min: 143,
    x_max: 276,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ị: {
    ha: 419,
    x_min: 150,
    x_max: 269,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 m 210 -264 q 168 -247 186 -264 q 150 -204 150 -231 q 168 -161 150 -178 q 210 -144 186 -144 q 252 -161 235 -144 q 269 -204 269 -178 q 252 -247 269 -231 q 210 -264 235 -264 z "
  },
  Ì: {
    ha: 419,
    x_min: -22,
    x_max: 300,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ỉ: {
    ha: 419,
    x_min: 90,
    x_max: 338,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ȋ: {
    ha: 419,
    x_min: -1,
    x_max: 421,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Ī: {
    ha: 419,
    x_min: 35,
    x_max: 385,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Į: {
    ha: 419,
    x_min: 108,
    x_max: 314,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 m 232 -306 q 142 -271 176 -306 q 108 -179 108 -236 q 133 -74 108 -131 q 225 38 158 -18 l 261 0 q 194 -94 208 -53 q 181 -169 181 -136 q 199 -226 181 -206 q 243 -246 218 -246 q 271 -240 258 -246 q 294 -226 283 -235 l 314 -276 q 232 -306 283 -306 z "
  },
  Ĩ: {
    ha: 419,
    x_min: -10,
    x_max: 428,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  J: {
    ha: 696,
    x_min: -6,
    x_max: 546,
    o: "m 263 -8 q 109 28 181 -8 q -6 131 38 64 l 54 200 q 147 111 94 142 q 264 81 200 81 q 444 294 444 81 l 444 883 l 89 883 l 89 972 l 546 972 l 546 299 q 474 68 546 144 q 263 -8 403 -8 z "
  },
  Ĵ: {
    ha: 696,
    x_min: -6,
    x_max: 547,
    o: "m 263 -8 q 109 28 181 -8 q -6 131 38 64 l 54 200 q 147 111 94 142 q 264 81 200 81 q 444 294 444 81 l 444 883 l 89 883 l 89 972 l 546 972 l 546 299 q 474 68 546 144 q 263 -8 403 -8 z "
  },
  K: {
    ha: 988,
    x_min: 158,
    x_max: 979,
    o: "m 247 242 l 243 367 l 832 972 l 950 972 l 521 522 l 463 460 l 247 242 m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 m 857 0 l 438 483 l 507 558 l 979 0 l 857 0 z "
  },
  Ǩ: {
    ha: 988,
    x_min: 158,
    x_max: 979,
    o: "m 247 242 l 243 367 l 832 972 l 950 972 l 521 522 l 463 460 l 247 242 m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 m 857 0 l 438 483 l 507 558 l 979 0 l 857 0 z "
  },
  Ķ: {
    ha: 988,
    x_min: 158,
    x_max: 979,
    o: "m 247 242 l 243 367 l 832 972 l 950 972 l 521 522 l 463 460 l 247 242 m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 m 857 0 l 438 483 l 507 558 l 979 0 l 857 0 m 469 -364 l 508 -214 l 518 -253 q 475 -237 492 -253 q 458 -199 458 -222 q 475 -160 458 -175 q 518 -144 492 -144 q 562 -160 546 -144 q 578 -199 578 -176 q 574 -228 578 -212 q 563 -261 571 -243 l 524 -364 l 469 -364 z "
  },
  L: {
    ha: 818,
    x_min: 158,
    x_max: 806,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 z "
  },
  Ǉ: {
    ha: 1514,
    x_min: 158,
    x_max: 1364,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 m 1081 -8 q 927 28 999 -8 q 813 131 856 64 l 872 200 q 965 111 913 142 q 1082 81 1018 81 q 1263 294 1263 81 l 1263 883 l 907 883 l 907 972 l 1364 972 l 1364 299 q 1292 68 1364 144 q 1081 -8 1221 -8 z "
  },
  Ĺ: {
    ha: 818,
    x_min: 119,
    x_max: 806,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 z "
  },
  Ľ: {
    ha: 818,
    x_min: 158,
    x_max: 806,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 m 611 750 l 611 1011 l 694 1011 l 682 750 l 611 750 z "
  },
  Ļ: {
    ha: 818,
    x_min: 158,
    x_max: 806,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 m 449 -364 l 488 -214 l 497 -253 q 454 -237 471 -253 q 438 -199 438 -222 q 454 -160 438 -175 q 497 -144 471 -144 q 541 -160 525 -144 q 557 -199 557 -176 q 553 -228 557 -212 q 542 -261 550 -243 l 503 -364 l 449 -364 z "
  },
  Ŀ: {
    ha: 818,
    x_min: 158,
    x_max: 806,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 m 618 461 q 570 481 590 461 q 550 531 550 501 q 570 581 550 561 q 618 600 590 600 q 667 581 647 600 q 686 531 686 561 q 667 481 686 501 q 618 461 647 461 z "
  },
  Ḷ: {
    ha: 818,
    x_min: 158,
    x_max: 806,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 m 497 -264 q 456 -247 474 -264 q 438 -204 438 -231 q 456 -161 438 -178 q 497 -144 474 -144 q 540 -161 522 -144 q 557 -204 557 -178 q 540 -247 557 -231 q 497 -264 522 -264 z "
  },
  ǈ: {
    ha: 1199,
    x_min: 158,
    x_max: 1085,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 z "
  },
  Ḻ: {
    ha: 818,
    x_min: 158,
    x_max: 806,
    o: "m 158 0 l 158 972 l 261 972 l 261 89 l 806 89 l 806 0 l 158 0 m 283 -235 l 283 -169 l 711 -169 l 711 -235 l 283 -235 z "
  },
  Ł: {
    ha: 825,
    x_min: 26,
    x_max: 813,
    o: "m 165 0 l 165 972 l 268 972 l 268 89 l 813 89 l 813 0 l 165 0 m 72 360 l 26 418 l 432 724 l 479 664 l 72 360 z "
  },
  M: {
    ha: 1326,
    x_min: 158,
    x_max: 1168,
    o: "m 158 0 l 158 972 l 243 972 l 688 214 l 643 214 l 1083 972 l 1168 972 l 1168 0 l 1069 0 l 1069 818 l 1093 818 l 688 124 l 639 124 l 231 818 l 257 818 l 257 0 l 158 0 z "
  },
  Ṃ: {
    ha: 1326,
    x_min: 158,
    x_max: 1168,
    o: "m 158 0 l 158 972 l 243 972 l 688 214 l 643 214 l 1083 972 l 1168 972 l 1168 0 l 1069 0 l 1069 818 l 1093 818 l 688 124 l 639 124 l 231 818 l 257 818 l 257 0 l 158 0 m 663 -264 q 621 -247 639 -264 q 603 -204 603 -231 q 621 -161 603 -178 q 663 -144 639 -144 q 705 -161 688 -144 q 722 -204 722 -178 q 705 -247 722 -231 q 663 -264 688 -264 z "
  },
  N: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 z "
  },
  Ǌ: {
    ha: 1826,
    x_min: 158,
    x_max: 1675,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 m 1392 -8 q 1238 28 1310 -8 q 1124 131 1167 64 l 1183 200 q 1276 111 1224 142 q 1393 81 1329 81 q 1574 294 1574 81 l 1574 883 l 1218 883 l 1218 972 l 1675 972 l 1675 299 q 1603 68 1675 144 q 1392 -8 1532 -8 z "
  },
  Ń: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 z "
  },
  Ň: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 z "
  },
  Ņ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 m 515 -364 l 554 -214 l 564 -253 q 521 -237 538 -253 q 504 -199 504 -222 q 521 -160 504 -175 q 564 -144 538 -144 q 608 -160 592 -144 q 624 -199 624 -176 q 620 -228 624 -212 q 608 -261 617 -243 l 569 -364 l 515 -364 z "
  },
  Ṅ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 z "
  },
  Ṇ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 m 564 -264 q 522 -247 540 -264 q 504 -204 504 -231 q 522 -161 504 -178 q 564 -144 540 -144 q 606 -161 589 -144 q 624 -204 624 -178 q 606 -247 624 -231 q 564 -264 589 -264 z "
  },
  Ŋ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 m 690 -276 q 551 -245 617 -276 q 443 -157 486 -214 l 494 -85 q 581 -160 531 -133 q 690 -187 631 -187 q 869 28 869 -187 l 869 972 l 971 972 l 971 39 q 900 -199 971 -121 q 690 -276 829 -276 z "
  },
  ǋ: {
    ha: 1510,
    x_min: 158,
    x_max: 1396,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 z "
  },
  Ṉ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 m 350 -235 l 350 -169 l 778 -169 l 778 -235 l 350 -235 z "
  },
  Ñ: {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 z "
  },
  O: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ó: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ŏ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ô: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ố: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ộ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 m 583 -264 q 542 -247 560 -264 q 524 -204 524 -231 q 542 -161 524 -178 q 583 -144 560 -144 q 626 -161 608 -144 q 643 -204 643 -178 q 626 -247 643 -231 q 583 -264 608 -264 z "
  },
  Ồ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ổ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ỗ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ȍ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ö: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ȫ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ȱ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ọ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 m 583 -264 q 542 -247 560 -264 q 524 -204 524 -231 q 542 -161 524 -178 q 583 -144 560 -144 q 626 -161 608 -144 q 643 -204 643 -178 q 626 -247 643 -231 q 583 -264 608 -264 z "
  },
  Ò: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ỏ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ơ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 735 971 672 981 q 861 961 799 961 q 964 988 929 961 q 999 1067 999 1014 q 990 1115 999 1093 q 971 1156 982 1136 l 1036 1181 q 1063 1126 1053 1157 q 1072 1064 1072 1096 q 1017 938 1072 982 q 857 894 961 894 q 780 899 822 894 q 700 908 738 903 l 822 924 q 965 821 904 886 q 1060 670 1026 756 q 1093 486 1093 585 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 114 671 83 q 874 199 819 144 q 960 326 929 253 q 990 486 990 400 q 960 646 990 572 q 874 774 929 719 q 745 858 819 828 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 327 174 400 q 291 199 236 254 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ớ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 735 971 672 981 q 861 961 799 961 q 964 988 929 961 q 999 1067 999 1014 q 990 1115 999 1093 q 971 1156 982 1136 l 1036 1181 q 1063 1126 1053 1157 q 1072 1064 1072 1096 q 1017 938 1072 982 q 857 894 961 894 q 780 899 822 894 q 700 908 738 903 l 822 924 q 965 821 904 886 q 1060 670 1026 756 q 1093 486 1093 585 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 114 671 83 q 874 199 819 144 q 960 326 929 253 q 990 486 990 400 q 960 646 990 572 q 874 774 929 719 q 745 858 819 828 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 327 174 400 q 291 199 236 254 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ợ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 735 971 672 981 q 861 961 799 961 q 964 988 929 961 q 999 1067 999 1014 q 990 1115 999 1093 q 971 1156 982 1136 l 1036 1181 q 1063 1126 1053 1157 q 1072 1064 1072 1096 q 1017 938 1072 982 q 857 894 961 894 q 780 899 822 894 q 700 908 738 903 l 822 924 q 965 821 904 886 q 1060 670 1026 756 q 1093 486 1093 585 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 114 671 83 q 874 199 819 144 q 960 326 929 253 q 990 486 990 400 q 960 646 990 572 q 874 774 929 719 q 745 858 819 828 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 327 174 400 q 291 199 236 254 q 421 113 346 143 q 583 83 496 83 m 583 -264 q 542 -247 560 -264 q 524 -204 524 -231 q 542 -161 524 -178 q 583 -144 560 -144 q 626 -161 608 -144 q 643 -204 643 -178 q 626 -247 643 -231 q 583 -264 608 -264 z "
  },
  Ờ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 735 971 672 981 q 861 961 799 961 q 964 988 929 961 q 999 1067 999 1014 q 990 1115 999 1093 q 971 1156 982 1136 l 1036 1181 q 1063 1126 1053 1157 q 1072 1064 1072 1096 q 1017 938 1072 982 q 857 894 961 894 q 780 899 822 894 q 700 908 738 903 l 822 924 q 965 821 904 886 q 1060 670 1026 756 q 1093 486 1093 585 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 114 671 83 q 874 199 819 144 q 960 326 929 253 q 990 486 990 400 q 960 646 990 572 q 874 774 929 719 q 745 858 819 828 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 327 174 400 q 291 199 236 254 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ở: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 735 971 672 981 q 861 961 799 961 q 964 988 929 961 q 999 1067 999 1014 q 990 1115 999 1093 q 971 1156 982 1136 l 1036 1181 q 1063 1126 1053 1157 q 1072 1064 1072 1096 q 1017 938 1072 982 q 857 894 961 894 q 780 899 822 894 q 700 908 738 903 l 822 924 q 965 821 904 886 q 1060 670 1026 756 q 1093 486 1093 585 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 114 671 83 q 874 199 819 144 q 960 326 929 253 q 990 486 990 400 q 960 646 990 572 q 874 774 929 719 q 745 858 819 828 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 327 174 400 q 291 199 236 254 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ỡ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 735 971 672 981 q 861 961 799 961 q 964 988 929 961 q 999 1067 999 1014 q 990 1115 999 1093 q 971 1156 982 1136 l 1036 1181 q 1063 1126 1053 1157 q 1072 1064 1072 1096 q 1017 938 1072 982 q 857 894 961 894 q 780 899 822 894 q 700 908 738 903 l 822 924 q 965 821 904 886 q 1060 670 1026 756 q 1093 486 1093 585 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 114 671 83 q 874 199 819 144 q 960 326 929 253 q 990 486 990 400 q 960 646 990 572 q 874 774 929 719 q 745 858 819 828 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 327 174 400 q 291 199 236 254 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ő: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ȏ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ō: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ṓ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ṑ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ǫ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 589 -306 q 477 -269 518 -306 q 436 -174 436 -233 q 453 -103 436 -140 q 513 -29 469 -65 q 631 38 557 7 l 626 -6 q 603 -8 614 -7 q 583 -8 593 -8 q 380 28 472 -8 q 218 132 288 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 380 944 288 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1042 262 1093 361 q 906 98 992 163 q 717 8 821 33 q 610 -33 657 -6 q 535 -94 563 -60 q 508 -167 508 -128 q 534 -225 508 -206 q 599 -244 560 -244 q 644 -237 621 -244 q 683 -218 667 -231 l 707 -272 q 652 -297 682 -287 q 589 -306 622 -306 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 400 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ø: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 m 121 -97 l 964 1069 l 1046 1069 l 204 -97 l 121 -97 z "
  },
  Ǿ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 m 121 -97 l 964 1069 l 1046 1069 l 204 -97 l 121 -97 z "
  },
  Õ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ṍ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ṏ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Ȭ: {
    ha: 1165,
    x_min: 72,
    x_max: 1093,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 583 83 q 745 113 671 83 q 874 198 819 143 q 960 326 929 253 q 990 486 990 399 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 291 198 236 253 q 421 113 346 143 q 583 83 496 83 z "
  },
  Œ: {
    ha: 1557,
    x_min: 72,
    x_max: 1474,
    o: "m 593 0 q 320 62 438 0 q 138 233 203 124 q 72 485 72 342 q 138 738 72 628 q 320 910 203 849 q 593 972 438 972 l 813 972 l 813 883 l 597 883 q 374 833 469 883 q 226 692 279 782 q 174 485 174 603 q 226 279 174 368 q 374 140 279 190 q 597 89 469 89 l 813 89 l 813 0 l 593 0 m 878 538 l 1392 538 l 1392 450 l 878 450 l 878 538 m 888 89 l 1474 89 l 1474 0 l 786 0 l 786 972 l 1453 972 l 1453 883 l 888 883 l 888 89 z "
  },
  P: {
    ha: 997,
    x_min: 158,
    x_max: 919,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 347 824 388 q 522 307 646 307 l 215 307 l 261 356 l 261 0 l 158 1 m 261 347 l 215 397 l 519 397 q 741 460 665 397 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 z "
  },
  Þ: {
    ha: 997,
    x_min: 158,
    x_max: 919,
    o: "m 235 179 l 235 269 l 519 269 q 741 333 665 269 q 817 514 817 397 q 741 693 817 629 q 519 757 665 757 l 235 757 l 235 846 l 522 846 q 735 806 646 846 q 872 692 824 765 q 919 514 919 618 q 872 335 919 410 q 735 219 824 260 q 522 179 646 179 l 235 179 m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 z "
  },
  Q: {
    ha: 1165,
    x_min: 72,
    x_max: 1138,
    o: "m 583 -8 q 380 28 474 -8 q 217 133 286 65 q 110 290 149 200 q 72 486 72 379 q 110 683 72 593 q 217 840 149 772 q 379 944 286 907 q 583 981 472 981 q 786 944 693 981 q 948 840 879 907 q 1055 683 1017 774 q 1093 486 1093 593 q 1055 289 1093 379 q 948 132 1017 199 q 786 28 879 65 q 583 -8 693 -8 m 901 -193 q 815 -182 857 -193 q 731 -147 774 -171 q 644 -83 689 -122 q 547 11 600 -44 l 660 39 q 744 -46 703 -12 q 824 -95 785 -79 q 903 -111 864 -111 q 1088 -22 1011 -111 l 1138 -82 q 901 -193 1046 -193 m 583 83 q 745 113 671 83 q 874 199 819 143 q 960 327 929 254 q 990 486 990 400 q 960 647 990 574 q 874 774 929 719 q 745 859 819 829 q 583 889 671 889 q 421 859 496 889 q 291 774 346 829 q 205 647 236 719 q 174 486 174 574 q 205 327 174 400 q 291 199 236 254 q 421 113 346 143 q 583 83 496 83 z "
  },
  R: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 1 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 z "
  },
  Ŕ: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 0 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 z "
  },
  Ř: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 0 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 z "
  },
  Ŗ: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 0 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 m 464 -364 l 503 -214 l 513 -253 q 469 -237 486 -253 q 453 -199 453 -222 q 469 -160 453 -175 q 513 -144 486 -144 q 556 -160 540 -144 q 572 -199 572 -176 q 569 -228 572 -212 q 557 -261 565 -243 l 518 -364 l 464 -364 z "
  },
  Ȑ: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 0 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 z "
  },
  Ṛ: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 0 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 m 513 -264 q 471 -247 489 -264 q 453 -204 453 -231 q 471 -161 453 -178 q 513 -144 489 -144 q 555 -161 538 -144 q 572 -204 572 -178 q 555 -247 572 -231 q 513 -264 538 -264 z "
  },
  Ȓ: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 0 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 z "
  },
  Ṟ: {
    ha: 1004,
    x_min: 158,
    x_max: 935,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 348 824 388 q 522 308 646 308 l 215 308 l 261 356 l 261 0 l 158 0 m 822 0 l 572 353 l 683 353 l 935 0 l 822 0 m 261 347 l 215 396 l 519 396 q 741 460 665 396 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 m 299 -235 l 299 -169 l 726 -169 l 726 -235 l 299 -235 z "
  },
  S: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  Ś: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  Ṥ: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  "Ꞌ": {
    ha: 335,
    x_min: 117,
    x_max: 218,
    o: "m 117 414 l 117 972 l 218 972 l 207 414 l 117 414 z "
  },
  Š: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  Ṧ: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  Ş: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 m 415 -306 q 352 -297 381 -306 q 299 -274 324 -289 l 322 -221 q 366 -240 343 -233 q 414 -247 389 -247 q 478 -230 456 -247 q 500 -182 500 -212 q 478 -136 500 -154 q 414 -118 457 -118 l 382 -118 l 415 8 l 475 8 l 454 -72 q 542 -108 511 -76 q 572 -185 572 -139 q 528 -273 572 -240 q 415 -306 485 -306 z "
  },
  Ŝ: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  Ș: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 m 397 -364 l 436 -214 l 446 -253 q 403 -237 419 -253 q 386 -199 386 -222 q 403 -160 386 -175 q 446 -144 419 -144 q 490 -160 474 -144 q 506 -199 506 -176 q 502 -228 506 -212 q 490 -261 499 -243 l 451 -364 l 397 -364 z "
  },
  Ṡ: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  Ṣ: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 m 446 -264 q 404 -247 422 -264 q 386 -204 386 -231 q 404 -161 386 -178 q 446 -144 422 -144 q 488 -161 471 -144 q 506 -204 506 -178 q 488 -247 506 -231 q 446 -264 471 -264 z "
  },
  Ṩ: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 m 446 -264 q 404 -247 422 -264 q 386 -204 386 -231 q 404 -161 386 -178 q 446 -144 422 -144 q 488 -161 471 -144 q 506 -204 506 -178 q 488 -247 506 -231 q 446 -264 471 -264 z "
  },
  "ẞ": {
    ha: 1050,
    x_min: 150,
    x_max: 974,
    o: "m 639 -8 q 540 0 586 -8 q 450 28 493 8 l 468 114 q 547 88 504 97 q 638 79 589 79 q 807 130 744 79 q 869 279 869 181 q 806 429 869 379 q 633 479 742 479 q 572 475 603 479 q 515 463 540 471 l 494 515 l 828 878 l 838 808 q 715 873 783 853 q 572 893 647 893 q 334 809 415 893 q 253 567 253 725 l 253 0 l 150 0 l 150 571 q 199 790 150 699 q 342 931 249 882 q 567 981 435 981 q 683 970 625 981 q 792 939 740 960 q 883 885 843 918 l 883 817 l 579 488 l 540 546 q 592 557 564 554 q 649 560 619 560 q 816 527 743 560 q 931 431 889 494 q 974 275 974 368 q 932 120 974 183 q 815 24 890 57 q 639 -8 739 -8 z "
  },
  Ə: {
    ha: 1135,
    x_min: 72,
    x_max: 1063,
    o: "m 568 -8 q 370 28 461 -8 q 213 133 279 65 q 109 291 146 200 q 72 490 72 382 l 72 521 l 974 521 l 974 433 l 139 433 l 174 486 q 203 323 174 397 q 284 194 232 249 q 408 110 336 140 q 568 81 481 81 q 723 110 651 81 q 848 193 794 139 q 931 321 901 247 q 960 481 960 394 l 960 490 q 929 649 960 576 q 844 775 899 721 q 715 859 789 829 q 557 889 642 889 q 443 877 499 889 q 338 840 388 865 q 246 776 289 815 l 185 847 q 288 920 231 890 q 415 965 346 950 q 557 981 483 981 q 759 944 667 981 q 919 840 851 907 q 1025 683 988 774 q 1063 488 1063 593 q 1025 292 1063 382 q 920 134 988 201 q 763 29 853 67 q 568 -8 672 -8 z "
  },
  T: {
    ha: 797,
    x_min: 6,
    x_max: 792,
    o: "m 347 0 l 347 883 l 6 883 l 6 972 l 792 972 l 792 883 l 450 883 l 450 0 l 347 0 z "
  },
  Ŧ: {
    ha: 797,
    x_min: 6,
    x_max: 792,
    o: "m 347 0 l 347 883 l 6 883 l 6 972 l 792 972 l 792 883 l 450 883 l 450 0 l 347 0 m 129 438 l 129 519 l 668 519 l 668 438 l 129 438 z "
  },
  Ť: {
    ha: 797,
    x_min: 6,
    x_max: 792,
    o: "m 347 0 l 347 883 l 6 883 l 6 972 l 792 972 l 792 883 l 450 883 l 450 0 l 347 0 z "
  },
  Ţ: {
    ha: 797,
    x_min: 6,
    x_max: 792,
    o: "m 347 0 l 347 883 l 6 883 l 6 972 l 792 972 l 792 883 l 450 883 l 450 0 l 347 0 m 368 -306 q 305 -297 333 -306 q 251 -274 276 -289 l 275 -221 q 319 -240 296 -233 q 367 -247 342 -247 q 431 -230 408 -247 q 453 -182 453 -212 q 431 -136 453 -154 q 367 -118 410 -118 l 335 -118 l 368 8 l 428 8 l 407 -72 q 494 -108 464 -76 q 525 -185 525 -139 q 481 -273 525 -240 q 368 -306 438 -306 z "
  },
  Ț: {
    ha: 797,
    x_min: 6,
    x_max: 792,
    o: "m 347 0 l 347 883 l 6 883 l 6 972 l 792 972 l 792 883 l 450 883 l 450 0 l 347 0 m 350 -364 l 389 -214 l 399 -253 q 356 -237 372 -253 q 339 -199 339 -222 q 356 -160 339 -175 q 399 -144 372 -144 q 442 -160 426 -144 q 458 -199 458 -176 q 455 -228 458 -212 q 443 -261 451 -243 l 404 -364 l 350 -364 z "
  },
  Ṭ: {
    ha: 797,
    x_min: 6,
    x_max: 792,
    o: "m 347 0 l 347 883 l 6 883 l 6 972 l 792 972 l 792 883 l 450 883 l 450 0 l 347 0 m 399 -264 q 357 -247 375 -264 q 339 -204 339 -231 q 357 -161 339 -178 q 399 -144 375 -144 q 441 -161 424 -144 q 458 -204 458 -178 q 441 -247 458 -231 q 399 -264 424 -264 z "
  },
  Ṯ: {
    ha: 797,
    x_min: 6,
    x_max: 792,
    o: "m 347 0 l 347 883 l 6 883 l 6 972 l 792 972 l 792 883 l 450 883 l 450 0 l 347 0 m 185 -235 l 185 -169 l 613 -169 l 613 -235 l 185 -235 z "
  },
  U: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ú: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ŭ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ǔ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Û: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ȕ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ü: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ụ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 550 -264 q 508 -247 526 -264 q 490 -204 490 -231 q 508 -161 490 -178 q 550 -144 526 -144 q 592 -161 575 -144 q 610 -204 610 -178 q 592 -247 610 -231 q 550 -264 575 -264 z "
  },
  Ù: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ủ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ư: {
    ha: 1107,
    x_min: 150,
    x_max: 1088,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 901 897 l 901 972 l 922 972 q 992 1000 971 972 q 1014 1067 1014 1028 q 1006 1115 1014 1093 q 986 1156 999 1138 l 1051 1181 q 1078 1127 1068 1157 q 1088 1064 1088 1097 q 1046 944 1088 990 q 922 897 1004 897 l 901 897 z "
  },
  Ứ: {
    ha: 1107,
    x_min: 150,
    x_max: 1088,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 901 897 l 901 972 l 922 972 q 992 1000 971 972 q 1014 1067 1014 1028 q 1006 1115 1014 1093 q 986 1156 999 1138 l 1051 1181 q 1078 1127 1068 1157 q 1088 1064 1088 1097 q 1046 944 1088 990 q 922 897 1004 897 l 901 897 z "
  },
  Ự: {
    ha: 1107,
    x_min: 150,
    x_max: 1088,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 901 897 l 901 972 l 922 972 q 992 1000 971 972 q 1014 1067 1014 1028 q 1006 1115 1014 1093 q 986 1156 999 1138 l 1051 1181 q 1078 1127 1068 1157 q 1088 1064 1088 1097 q 1046 944 1088 990 q 922 897 1004 897 l 901 897 m 550 -264 q 508 -247 526 -264 q 490 -204 490 -231 q 508 -161 490 -178 q 550 -144 526 -144 q 592 -161 575 -144 q 610 -204 610 -178 q 592 -247 610 -231 q 550 -264 575 -264 z "
  },
  Ừ: {
    ha: 1107,
    x_min: 150,
    x_max: 1088,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 901 897 l 901 972 l 922 972 q 992 1000 971 972 q 1014 1067 1014 1028 q 1006 1115 1014 1093 q 986 1156 999 1138 l 1051 1181 q 1078 1127 1068 1157 q 1088 1064 1088 1097 q 1046 944 1088 990 q 922 897 1004 897 l 901 897 z "
  },
  Ử: {
    ha: 1107,
    x_min: 150,
    x_max: 1088,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 901 897 l 901 972 l 922 972 q 992 1000 971 972 q 1014 1067 1014 1028 q 1006 1115 1014 1093 q 986 1156 999 1138 l 1051 1181 q 1078 1127 1068 1157 q 1088 1064 1088 1097 q 1046 944 1088 990 q 922 897 1004 897 l 901 897 z "
  },
  Ữ: {
    ha: 1107,
    x_min: 150,
    x_max: 1088,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 901 897 l 901 972 l 922 972 q 992 1000 971 972 q 1014 1067 1014 1028 q 1006 1115 1014 1093 q 986 1156 999 1138 l 1051 1181 q 1078 1127 1068 1157 q 1088 1064 1088 1097 q 1046 944 1088 990 q 922 897 1004 897 l 901 897 z "
  },
  Ű: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ȗ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ū: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ṻ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ų: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 849 972 l 949 972 l 949 415 q 882 149 949 246 q 700 11 815 51 q 569 -50 614 -18 q 510 -112 525 -82 q 494 -167 494 -142 q 520 -225 494 -206 q 585 -244 546 -244 q 630 -237 607 -244 q 669 -218 653 -231 l 692 -272 q 638 -297 668 -287 q 574 -306 607 -306 q 463 -269 504 -306 q 421 -174 421 -233 q 438 -103 421 -140 q 498 -31 456 -67 q 617 36 540 6 l 607 -6 q 578 -8 593 -7 q 550 -8 564 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 z "
  },
  Ů: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 m 549 1069 q 474 1089 507 1069 q 423 1140 442 1108 q 404 1211 404 1172 q 424 1283 404 1250 q 476 1337 443 1317 q 549 1357 508 1357 q 623 1337 590 1357 q 675 1283 656 1317 q 694 1211 694 1250 q 675 1140 694 1172 q 623 1089 656 1108 q 549 1069 590 1069 m 549 1118 q 617 1145 590 1118 q 643 1211 643 1172 q 617 1280 643 1251 q 549 1308 590 1308 q 482 1281 508 1308 q 456 1211 456 1253 q 481 1144 456 1171 q 549 1118 507 1118 z "
  },
  Ũ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  Ṹ: {
    ha: 1100,
    x_min: 150,
    x_max: 949,
    o: "m 550 -8 q 257 99 364 -8 q 150 415 150 206 l 150 972 l 253 972 l 253 419 q 331 165 253 247 q 550 83 408 83 q 771 165 693 83 q 849 419 849 247 l 849 972 l 949 972 l 949 415 q 842 99 949 206 q 550 -8 736 -8 z "
  },
  V: {
    ha: 969,
    x_min: 4,
    x_max: 967,
    o: "m 435 0 l 4 972 l 115 972 l 518 57 l 457 57 l 863 972 l 967 972 l 536 0 l 435 0 z "
  },
  W: {
    ha: 1543,
    x_min: 51,
    x_max: 1493,
    o: "m 379 0 l 51 972 l 157 972 l 438 135 l 728 972 l 822 972 l 1100 130 l 1394 972 l 1493 972 l 1165 0 l 1057 0 l 772 828 l 486 0 l 379 0 z "
  },
  Ẃ: {
    ha: 1543,
    x_min: 51,
    x_max: 1493,
    o: "m 379 0 l 51 972 l 157 972 l 464 57 l 411 57 l 728 972 l 822 972 l 1135 57 l 1085 57 l 1394 972 l 1493 972 l 1165 0 l 1057 0 l 758 868 l 786 868 l 486 0 l 379 0 z "
  },
  Ŵ: {
    ha: 1543,
    x_min: 51,
    x_max: 1493,
    o: "m 379 0 l 51 972 l 157 972 l 464 57 l 411 57 l 728 972 l 822 972 l 1135 57 l 1085 57 l 1394 972 l 1493 972 l 1165 0 l 1057 0 l 758 868 l 786 868 l 486 0 l 379 0 z "
  },
  Ẅ: {
    ha: 1543,
    x_min: 51,
    x_max: 1493,
    o: "m 379 0 l 51 972 l 157 972 l 464 57 l 411 57 l 728 972 l 822 972 l 1135 57 l 1085 57 l 1394 972 l 1493 972 l 1165 0 l 1057 0 l 758 868 l 786 868 l 486 0 l 379 0 z "
  },
  Ẁ: {
    ha: 1543,
    x_min: 51,
    x_max: 1493,
    o: "m 379 0 l 51 972 l 157 972 l 464 57 l 411 57 l 728 972 l 822 972 l 1135 57 l 1085 57 l 1394 972 l 1493 972 l 1165 0 l 1057 0 l 758 868 l 786 868 l 486 0 l 379 0 z "
  },
  X: {
    ha: 911,
    x_min: 24,
    x_max: 888,
    o: "m 24 0 l 422 539 l 422 460 l 47 972 l 165 972 l 481 544 l 435 543 l 750 972 l 861 972 l 490 467 l 490 539 l 888 0 l 768 0 l 432 457 l 475 457 l 142 0 l 24 0 z "
  },
  Y: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ý: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ŷ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ÿ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ẏ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ỵ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 m 440 -264 q 399 -247 417 -264 q 381 -204 381 -231 q 399 -161 381 -178 q 440 -144 417 -144 q 483 -161 465 -144 q 500 -204 500 -178 q 483 -247 500 -231 q 440 -264 465 -264 z "
  },
  Ỳ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ỷ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ȳ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Ỹ: {
    ha: 882,
    x_min: 1,
    x_max: 881,
    o: "m 390 0 l 390 361 l 414 297 l 1 972 l 111 972 l 474 379 l 415 379 l 778 972 l 881 972 l 468 297 l 492 361 l 492 0 l 390 0 z "
  },
  Z: {
    ha: 904,
    x_min: 63,
    x_max: 860,
    o: "m 63 0 l 63 71 l 738 922 l 749 883 l 72 883 l 72 972 l 843 972 l 843 901 l 169 50 l 157 89 l 860 89 l 860 0 l 63 0 z "
  },
  Ź: {
    ha: 904,
    x_min: 63,
    x_max: 860,
    o: "m 63 0 l 63 71 l 738 922 l 749 883 l 72 883 l 72 972 l 843 972 l 843 901 l 169 50 l 157 89 l 860 89 l 860 0 l 63 0 z "
  },
  Ž: {
    ha: 904,
    x_min: 63,
    x_max: 860,
    o: "m 63 0 l 63 71 l 738 922 l 749 883 l 72 883 l 72 972 l 843 972 l 843 901 l 169 50 l 157 89 l 860 89 l 860 0 l 63 0 z "
  },
  Ż: {
    ha: 904,
    x_min: 63,
    x_max: 860,
    o: "m 63 0 l 63 71 l 738 922 l 749 883 l 72 883 l 72 972 l 843 972 l 843 901 l 169 50 l 157 89 l 860 89 l 860 0 l 63 0 z "
  },
  Ẓ: {
    ha: 904,
    x_min: 63,
    x_max: 860,
    o: "m 63 0 l 63 71 l 738 922 l 749 883 l 72 883 l 72 972 l 843 972 l 843 901 l 169 50 l 157 89 l 860 89 l 860 0 l 63 0 m 472 -264 q 431 -247 449 -264 q 413 -204 413 -231 q 431 -161 413 -178 q 472 -144 449 -144 q 515 -161 497 -144 q 532 -204 532 -178 q 515 -247 532 -231 q 472 -264 497 -264 z "
  },
  a: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  á: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 306 843 l 496 1015 l 628 1015 l 403 843 l 306 843 z "
  },
  ă: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 396 836 q 248 884 308 836 q 185 1015 188 932 l 254 1015 q 298 929 257 961 q 396 897 339 897 q 495 929 454 897 q 538 1015 536 961 l 607 1015 q 544 884 604 932 q 396 836 483 836 z "
  },
  ắ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ặ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 399 -264 q 357 -247 375 -264 q 339 -204 339 -231 q 357 -161 339 -178 q 399 -144 375 -144 q 441 -161 424 -144 q 458 -204 458 -178 q 441 -247 458 -231 q 399 -264 424 -264 m 396 836 q 248 884 308 836 q 185 1015 188 932 l 254 1015 q 298 929 257 961 q 396 897 339 897 q 495 929 454 897 q 538 1015 536 961 l 607 1015 q 544 884 604 932 q 396 836 483 836 z "
  },
  ằ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ẳ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ẵ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ǎ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 346 843 l 167 1015 l 258 1015 l 435 869 l 357 869 l 533 1015 l 625 1015 l 446 843 l 346 843 z "
  },
  â: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 167 843 l 346 1015 l 446 1015 l 625 843 l 533 843 l 357 990 l 435 990 l 258 843 l 167 843 z "
  },
  ấ: {
    ha: 819,
    x_min: 76,
    x_max: 811,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ậ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 399 -264 q 357 -247 375 -264 q 339 -204 339 -231 q 357 -161 339 -178 q 399 -144 375 -144 q 441 -161 424 -144 q 458 -204 458 -178 q 441 -247 458 -231 q 399 -264 424 -264 m 167 843 l 346 1015 l 446 1015 l 625 843 l 533 843 l 357 990 l 435 990 l 258 843 l 167 843 z "
  },
  ầ: {
    ha: 819,
    x_min: 76,
    x_max: 693,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ẩ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ẫ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 z "
  },
  ȁ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 465 843 l 308 1015 l 418 1015 l 553 843 l 465 843 m 239 843 l 83 1015 l 193 1015 l 326 843 l 239 843 z "
  },
  ä: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 519 875 q 478 892 496 875 q 460 935 460 908 q 478 978 460 961 q 519 994 496 994 q 562 978 544 994 q 579 935 579 961 q 562 892 579 908 q 519 875 544 875 m 272 875 q 230 892 247 875 q 213 935 213 908 q 230 978 213 961 q 272 994 247 994 q 314 978 296 994 q 332 935 332 961 q 314 892 332 908 q 272 875 296 875 z "
  },
  ạ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 399 -264 q 357 -247 375 -264 q 339 -204 339 -231 q 357 -161 339 -178 q 399 -144 375 -144 q 441 -161 424 -144 q 458 -204 458 -178 q 441 -247 458 -231 q 399 -264 424 -264 z "
  },
  à: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 389 843 l 164 1015 l 296 1015 l 486 843 l 389 843 z "
  },
  ả: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 414 833 l 379 876 q 441 919 421 896 q 461 975 461 943 q 440 1024 461 1004 q 385 1043 419 1043 q 301 1017 342 1043 l 278 1065 q 333 1092 301 1083 q 393 1101 364 1101 q 488 1069 451 1101 q 525 982 525 1036 q 498 897 525 933 q 414 833 471 860 z "
  },
  ȃ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 185 843 q 248 974 188 926 q 396 1021 308 1021 q 544 974 483 1021 q 607 843 604 926 l 538 843 q 495 929 536 897 q 396 961 454 961 q 298 929 339 961 q 254 843 257 897 l 185 843 z "
  },
  ā: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 182 896 l 182 961 l 610 961 l 610 896 l 182 896 z "
  },
  ą: {
    ha: 819,
    x_min: 76,
    x_max: 718,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 600 -306 q 489 -269 531 -306 q 447 -174 447 -233 q 465 -103 447 -140 q 525 -31 482 -67 q 643 38 568 6 l 689 0 q 585 -58 622 -29 q 534 -113 549 -86 q 519 -167 519 -140 q 545 -225 519 -206 q 610 -244 571 -244 q 656 -237 633 -244 q 696 -218 679 -231 l 718 -272 q 663 -297 693 -287 q 600 -306 633 -306 z "
  },
  å: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 394 826 q 320 846 353 826 q 269 897 288 865 q 250 968 250 929 q 269 1040 250 1007 q 322 1094 289 1074 q 394 1114 354 1114 q 469 1094 436 1114 q 521 1040 501 1074 q 540 968 540 1007 q 521 897 540 929 q 469 846 501 865 q 394 826 436 826 m 394 875 q 463 902 436 875 q 489 968 489 929 q 463 1037 489 1008 q 394 1065 436 1065 q 328 1038 354 1065 q 301 968 301 1010 q 327 901 301 928 q 394 875 353 875 z "
  },
  ǻ: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 394 826 q 320 846 353 826 q 269 897 288 865 q 250 968 250 929 q 269 1040 250 1007 q 322 1094 289 1074 q 394 1114 354 1114 q 469 1094 436 1114 q 521 1040 501 1074 q 540 968 540 1007 q 521 897 540 929 q 469 846 501 865 q 394 826 436 826 m 394 875 q 463 902 436 875 q 489 968 489 929 q 463 1037 489 1008 q 394 1065 436 1065 q 328 1038 354 1065 q 301 968 301 1010 q 327 901 301 928 q 394 875 353 875 m 503 1046 l 444 1067 l 585 1206 l 640 1161 l 503 1046 z "
  },
  ã: {
    ha: 819,
    x_min: 76,
    x_max: 689,
    o: "m 594 0 l 594 161 l 590 188 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 393 736 307 736 q 612 666 535 736 q 689 453 689 596 l 689 0 l 594 0 m 343 -7 q 201 20 261 -7 q 108 95 140 47 q 76 206 76 143 q 103 309 76 263 q 192 384 131 356 q 358 413 254 413 l 610 413 l 610 339 l 361 339 q 215 301 256 339 q 174 208 174 264 q 222 108 174 146 q 358 71 271 71 q 502 109 442 71 q 590 219 563 147 l 613 151 q 516 36 585 79 q 343 -7 447 -7 m 490 851 q 433 865 458 851 q 388 898 408 879 q 349 931 368 917 q 308 946 329 946 q 258 922 276 946 q 236 857 239 899 l 176 857 q 213 968 179 926 q 301 1010 247 1010 q 359 995 333 1010 q 405 962 385 981 q 444 929 425 943 q 483 915 463 915 q 535 938 515 915 q 556 1001 554 961 l 615 1001 q 579 893 614 935 q 490 851 544 851 z "
  },
  æ: {
    ha: 1369,
    x_min: 76,
    x_max: 1306,
    o: "m 353 -7 q 149 53 222 -7 q 76 208 76 113 q 103 308 76 263 q 192 383 131 354 q 358 411 254 411 l 607 411 l 607 338 l 361 338 q 215 301 256 338 q 174 210 174 264 q 223 108 174 146 q 360 71 272 71 q 528 126 465 71 q 590 279 590 182 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 392 736 307 736 q 588 683 517 736 q 676 525 660 631 l 632 533 q 757 681 674 626 q 950 736 840 736 q 1091 709 1026 736 q 1203 633 1156 682 q 1278 518 1251 585 q 1306 371 1306 451 q 1305 353 1306 361 q 1303 338 1304 346 l 669 338 l 669 411 l 1250 411 l 1210 379 q 1174 524 1210 464 q 1079 618 1139 585 q 949 651 1019 651 q 819 618 879 651 q 724 524 760 585 q 689 376 689 463 l 689 361 q 726 215 689 278 q 827 116 763 151 q 978 81 892 81 q 1102 104 1046 81 q 1201 176 1158 128 l 1257 113 q 1135 23 1208 53 q 975 -7 1063 -7 q 819 21 892 -7 q 692 106 746 49 q 608 249 638 163 l 672 247 q 610 97 658 153 q 494 17 563 42 q 353 -7 426 -7 z "
  },
  ǽ: {
    ha: 1369,
    x_min: 76,
    x_max: 1306,
    o: "m 353 -7 q 149 53 222 -7 q 76 208 76 113 q 103 308 76 263 q 192 383 131 354 q 358 411 254 411 l 607 411 l 607 338 l 361 338 q 215 301 256 338 q 174 210 174 264 q 223 108 174 146 q 360 71 272 71 q 528 126 465 71 q 590 279 590 182 l 590 457 q 538 600 590 550 q 383 650 486 650 q 249 626 313 650 q 140 564 185 603 l 96 638 q 229 710 151 685 q 392 736 307 736 q 588 683 517 736 q 676 525 660 631 l 632 533 q 757 681 674 626 q 950 736 840 736 q 1091 709 1026 736 q 1203 633 1156 682 q 1278 518 1251 585 q 1306 371 1306 451 q 1305 353 1306 361 q 1303 338 1304 346 l 669 338 l 669 411 l 1250 411 l 1210 379 q 1174 524 1210 464 q 1079 618 1139 585 q 949 651 1019 651 q 819 618 879 651 q 724 524 760 585 q 689 376 689 463 l 689 361 q 726 215 689 278 q 827 116 763 151 q 978 81 892 81 q 1102 104 1046 81 q 1201 176 1158 128 l 1257 113 q 1135 23 1208 53 q 975 -7 1063 -7 q 819 21 892 -7 q 692 106 746 49 q 608 249 638 163 l 672 247 q 610 97 658 153 q 494 17 563 42 q 353 -7 426 -7 m 550 843 l 740 1015 l 872 1015 l 647 843 l 550 843 z "
  },
  b: {
    ha: 942,
    x_min: 138,
    x_max: 878,
    o: "m 514 -7 q 342 37 418 -7 q 221 164 265 81 q 176 365 176 247 q 222 567 176 485 q 343 693 267 650 q 514 736 419 736 q 701 690 618 736 q 831 560 783 643 q 878 365 878 476 q 831 172 878 256 q 701 40 783 88 q 514 -7 618 -7 m 138 0 l 138 1031 l 236 1031 l 236 514 l 222 367 l 232 219 l 232 0 l 138 0 m 507 81 q 646 116 585 81 q 743 216 707 151 q 779 365 779 281 q 743 515 779 451 q 646 615 707 579 q 507 650 585 650 q 367 615 429 650 q 270 515 306 579 q 235 365 235 451 q 270 216 235 281 q 367 116 306 151 q 507 81 429 81 z "
  },
  c: {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 z "
  },
  ć: {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 m 325 843 l 515 1015 l 647 1015 l 422 843 l 325 843 z "
  },
  č: {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 m 365 843 l 186 1015 l 278 1015 l 454 869 l 376 869 l 553 1015 l 644 1015 l 465 843 l 365 843 z "
  },
  ç: {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 m 382 -306 q 319 -297 347 -306 q 265 -274 290 -289 l 289 -221 q 333 -240 310 -233 q 381 -247 356 -247 q 444 -230 422 -247 q 467 -182 467 -212 q 445 -136 467 -154 q 381 -118 424 -118 l 349 -118 l 382 8 l 442 8 l 421 -72 q 508 -108 478 -76 q 539 -185 539 -139 q 495 -273 539 -240 q 382 -306 451 -306 z "
  },
  ḉ: {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 m 382 -306 q 319 -297 347 -306 q 265 -274 290 -289 l 289 -221 q 333 -240 310 -233 q 381 -247 356 -247 q 444 -230 422 -247 q 467 -182 467 -212 q 445 -136 467 -154 q 381 -118 424 -118 l 349 -118 l 382 8 l 442 8 l 421 -72 q 508 -108 478 -76 q 539 -185 539 -139 q 495 -273 539 -240 q 382 -306 451 -306 m 325 843 l 515 1015 l 647 1015 l 422 843 l 325 843 z "
  },
  ĉ: {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 m 186 843 l 365 1015 l 465 1015 l 644 843 l 553 843 l 376 990 l 454 990 l 278 843 l 186 843 z "
  },
  ċ: {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 m 415 875 q 368 894 388 875 q 349 942 349 914 q 368 990 349 971 q 415 1008 388 1008 q 463 990 443 1008 q 482 942 482 971 q 463 894 482 914 q 415 875 443 875 z "
  },
  d: {
    ha: 942,
    x_min: 64,
    x_max: 804,
    o: "m 428 -7 q 241 40 324 -7 q 111 172 158 88 q 64 365 64 256 q 111 560 64 476 q 241 690 158 643 q 428 736 324 736 q 599 693 524 736 q 720 567 675 650 q 765 365 765 485 q 721 164 765 247 q 601 37 676 81 q 428 -7 525 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 574 615 636 579 q 435 650 513 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 710 0 l 710 219 l 719 367 l 706 514 l 706 1031 l 804 1031 l 804 0 l 710 0 z "
  },
  ð: {
    ha: 879,
    x_min: 64,
    x_max: 815,
    o: "m 406 -8 q 230 29 307 -8 q 108 136 153 67 q 64 299 64 206 q 108 461 64 392 q 231 568 153 531 q 411 606 310 606 q 563 575 494 606 q 677 485 632 544 q 733 342 722 426 l 696 329 q 712 419 708 374 q 715 503 715 465 q 671 729 715 638 q 544 867 626 821 q 351 914 463 914 q 240 905 292 914 q 147 883 189 896 l 131 968 q 231 989 174 981 q 351 997 288 997 q 595 939 492 997 q 757 766 699 881 q 815 482 815 651 q 767 222 815 332 q 628 51 719 111 q 406 -8 538 -8 m 411 76 q 555 108 496 76 q 644 191 614 140 q 675 299 675 242 q 642 413 675 363 q 553 492 610 463 q 419 521 496 521 q 232 460 300 521 q 164 299 164 399 q 195 182 164 232 q 282 104 226 132 q 411 76 338 76 m 211 685 l 183 753 l 733 982 l 761 914 l 211 685 z "
  },
  ď: {
    ha: 942,
    x_min: 64,
    x_max: 1017,
    o: "m 428 -7 q 241 40 324 -7 q 111 172 158 88 q 64 365 64 256 q 111 560 64 476 q 241 690 158 643 q 428 736 324 736 q 599 693 524 736 q 720 567 675 650 q 765 365 765 485 q 721 164 765 247 q 601 37 676 81 q 428 -7 525 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 574 615 636 579 q 435 650 513 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 710 0 l 710 219 l 719 367 l 706 514 l 706 1031 l 804 1031 l 804 0 l 710 0 m 933 808 l 933 1069 l 1017 1069 l 1004 808 l 933 808 z "
  },
  đ: {
    ha: 942,
    x_min: 64,
    x_max: 942,
    o: "m 428 -7 q 241 40 324 -7 q 111 172 158 88 q 64 365 64 256 q 111 560 64 476 q 241 690 158 643 q 428 736 324 736 q 599 693 524 736 q 720 567 675 650 q 765 365 765 485 q 721 164 765 247 q 601 37 676 81 q 428 -7 525 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 574 615 636 579 q 435 650 513 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 710 0 l 710 219 l 719 367 l 706 514 l 706 1031 l 804 1031 l 804 0 l 710 0 m 400 843 l 400 915 l 942 915 l 942 843 l 400 843 z "
  },
  ḍ: {
    ha: 942,
    x_min: 64,
    x_max: 804,
    o: "m 428 -7 q 241 40 324 -7 q 111 172 158 88 q 64 365 64 256 q 111 560 64 476 q 241 690 158 643 q 428 736 324 736 q 599 693 524 736 q 720 567 675 650 q 765 365 765 485 q 721 164 765 247 q 601 37 676 81 q 428 -7 525 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 574 615 636 579 q 435 650 513 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 710 0 l 710 219 l 719 367 l 706 514 l 706 1031 l 804 1031 l 804 0 l 710 0 m 472 -264 q 431 -247 449 -264 q 413 -204 413 -231 q 431 -161 413 -178 q 472 -144 449 -144 q 515 -161 497 -144 q 532 -204 532 -178 q 515 -247 532 -231 q 472 -264 497 -264 z "
  },
  ḏ: {
    ha: 942,
    x_min: 64,
    x_max: 804,
    o: "m 428 -7 q 241 40 324 -7 q 111 172 158 88 q 64 365 64 256 q 111 560 64 476 q 241 690 158 643 q 428 736 324 736 q 599 693 524 736 q 720 567 675 650 q 765 365 765 485 q 721 164 765 247 q 601 37 676 81 q 428 -7 525 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 574 615 636 579 q 435 650 513 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 710 0 l 710 219 l 719 367 l 706 514 l 706 1031 l 804 1031 l 804 0 l 710 0 m 258 -235 l 258 -169 l 686 -169 l 686 -235 l 258 -235 z "
  },
  ǆ: {
    ha: 1669,
    x_min: 64,
    x_max: 1593,
    o: "m 428 -7 q 241 40 324 -7 q 111 172 158 88 q 64 365 64 256 q 111 560 64 476 q 241 690 158 643 q 428 736 324 736 q 599 693 524 736 q 720 567 675 650 q 765 365 765 485 q 721 164 765 247 q 601 37 676 81 q 428 -7 525 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 574 615 636 579 q 435 650 513 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 710 0 l 710 219 l 719 367 l 706 514 l 706 1031 l 804 1031 l 804 0 l 710 0 z "
  },
  e: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 z "
  },
  é: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 329 843 l 519 1015 l 651 1015 l 426 843 l 329 843 z "
  },
  ĕ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 419 836 q 272 884 332 836 q 208 1015 211 932 l 278 1015 q 322 929 281 961 q 419 897 363 897 q 519 929 478 897 q 561 1015 560 961 l 631 1015 q 567 884 628 932 q 419 836 507 836 z "
  },
  ě: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 369 843 l 190 1015 l 282 1015 l 458 869 l 381 869 l 557 1015 l 649 1015 l 469 843 l 369 843 z "
  },
  ḝ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 389 -306 q 326 -297 354 -306 q 272 -274 297 -289 l 296 -221 q 340 -240 317 -233 q 388 -247 363 -247 q 451 -230 429 -247 q 474 -182 474 -212 q 452 -136 474 -154 q 388 -118 431 -118 l 356 -118 l 389 8 l 449 8 l 428 -72 q 515 -108 485 -76 q 546 -185 546 -139 q 502 -273 546 -240 q 389 -306 458 -306 m 419 836 q 272 884 332 836 q 208 1015 211 932 l 278 1015 q 322 929 281 961 q 419 897 363 897 q 519 929 478 897 q 561 1015 560 961 l 631 1015 q 567 884 628 932 q 419 836 507 836 z "
  },
  ê: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 190 843 l 369 1015 l 469 1015 l 649 843 l 557 843 l 381 990 l 458 990 l 282 843 l 190 843 z "
  },
  ế: {
    ha: 839,
    x_min: 64,
    x_max: 835,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 z "
  },
  ệ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 419 -264 q 378 -247 396 -264 q 360 -204 360 -231 q 378 -161 360 -178 q 419 -144 396 -144 q 462 -161 444 -144 q 479 -204 479 -178 q 462 -247 479 -231 q 419 -264 444 -264 m 190 843 l 369 1015 l 469 1015 l 649 843 l 557 843 l 381 990 l 458 990 l 282 843 l 190 843 z "
  },
  ề: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 z "
  },
  ể: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 z "
  },
  ễ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 z "
  },
  ȅ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 489 843 l 332 1015 l 442 1015 l 576 843 l 489 843 m 263 843 l 107 1015 l 217 1015 l 350 843 l 263 843 z "
  },
  ë: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 543 875 q 501 892 519 875 q 483 935 483 908 q 501 978 483 961 q 543 994 519 994 q 585 978 568 994 q 603 935 603 961 q 585 892 603 908 q 543 875 568 875 m 296 875 q 253 892 271 875 q 236 935 236 908 q 253 978 236 961 q 296 994 271 994 q 338 978 319 994 q 356 935 356 961 q 338 892 356 908 q 296 875 319 875 z "
  },
  ė: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 419 875 q 372 894 392 875 q 353 942 353 914 q 372 990 353 971 q 419 1008 392 1008 q 467 990 447 1008 q 486 942 486 971 q 467 894 486 914 q 419 875 447 875 z "
  },
  ẹ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 419 -264 q 378 -247 396 -264 q 360 -204 360 -231 q 378 -161 360 -178 q 419 -144 396 -144 q 462 -161 444 -144 q 479 -204 479 -178 q 462 -247 479 -231 q 419 -264 444 -264 z "
  },
  è: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 413 843 l 188 1015 l 319 1015 l 510 843 l 413 843 z "
  },
  ẻ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 438 833 l 403 876 q 465 919 444 896 q 485 975 485 943 q 464 1024 485 1004 q 408 1043 443 1043 q 325 1017 365 1043 l 301 1065 q 356 1092 325 1083 q 417 1101 388 1101 q 512 1069 475 1101 q 549 982 549 1036 q 522 897 549 933 q 438 833 494 860 z "
  },
  ȇ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 208 843 q 272 974 211 926 q 419 1021 332 1021 q 567 974 507 1021 q 631 843 628 926 l 561 843 q 519 929 560 897 q 419 961 478 961 q 322 929 363 961 q 278 843 281 897 l 208 843 z "
  },
  ē: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 206 896 l 206 961 l 633 961 l 633 896 l 206 896 z "
  },
  ḗ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 z "
  },
  ḕ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 z "
  },
  ę: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 597 -306 q 487 -269 529 -306 q 444 -169 444 -232 q 470 -72 444 -125 q 563 35 496 -18 l 594 19 q 524 0 561 7 q 447 -7 488 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 705 88 718 99 q 676 63 692 76 q 577 -34 611 7 q 530 -106 543 -75 q 517 -164 517 -136 q 542 -225 517 -206 q 608 -244 568 -244 q 653 -237 631 -244 q 693 -218 676 -231 l 715 -272 q 660 -297 690 -287 q 597 -306 631 -306 z "
  },
  ẽ: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 447 -7 q 247 41 333 -7 q 113 173 161 89 q 64 365 64 257 q 110 557 64 474 q 238 688 157 640 q 421 736 319 736 q 603 690 524 736 q 729 559 683 643 q 775 365 775 475 q 774 351 775 358 q 774 335 774 343 l 139 335 l 139 408 l 721 408 l 682 379 q 648 520 682 458 q 556 617 614 582 q 421 651 497 651 q 286 617 346 651 q 193 519 226 582 q 160 376 160 457 l 160 361 q 197 215 160 278 q 299 116 233 151 q 450 81 365 81 q 574 104 517 81 q 674 176 632 128 l 729 113 q 608 24 681 54 q 447 -7 535 -7 m 514 851 q 457 865 482 851 q 412 898 432 879 q 372 931 392 917 q 332 946 353 946 q 281 922 300 946 q 260 857 263 899 l 200 857 q 237 968 203 926 q 325 1010 271 1010 q 383 995 357 1010 q 428 962 408 981 q 467 929 449 943 q 507 915 486 915 q 558 938 539 915 q 579 1001 578 961 l 639 1001 q 603 893 638 935 q 514 851 568 851 z "
  },
  ə: {
    ha: 839,
    x_min: 64,
    x_max: 775,
    o: "m 392 736 q 592 688 506 736 q 726 557 678 640 q 775 365 775 474 q 728 173 775 257 q 601 41 682 89 q 418 -7 521 -7 q 235 40 315 -7 q 110 172 156 88 q 64 365 64 256 q 65 379 64 371 q 65 394 65 388 l 700 394 l 700 321 l 118 321 l 157 350 q 191 210 157 272 q 283 113 225 149 q 418 78 342 78 q 553 113 494 78 q 646 211 613 149 q 679 353 679 274 l 679 369 q 642 515 679 453 q 540 614 606 578 q 389 650 475 650 q 264 626 321 650 q 165 553 207 603 l 110 618 q 233 706 160 676 q 392 736 306 736 z "
  },
  ʒ: {
    ha: 714,
    x_min: -31,
    x_max: 664,
    o: "m 314 -278 q 115 -242 207 -278 q -31 -150 22 -207 l 10 -69 q 135 -153 56 -121 q 311 -186 215 -186 q 498 -131 433 -186 q 563 17 563 -76 q 499 165 563 110 q 300 219 436 219 l 231 219 l 231 290 l 535 679 l 543 642 l 3 642 l 3 729 l 624 729 l 624 658 l 321 269 l 279 301 l 317 301 q 577 223 490 301 q 664 17 664 144 q 624 -133 664 -67 q 508 -238 585 -199 q 314 -278 431 -278 z "
  },
  ǯ: {
    ha: 714,
    x_min: -31,
    x_max: 664,
    o: "m 314 -278 q 115 -242 207 -278 q -31 -150 22 -207 l 10 -69 q 135 -153 56 -121 q 311 -186 215 -186 q 498 -131 433 -186 q 563 17 563 -76 q 499 165 563 110 q 300 219 436 219 l 231 219 l 231 290 l 535 679 l 543 642 l 3 642 l 3 729 l 624 729 l 624 658 l 321 269 l 279 301 l 317 301 q 577 223 490 301 q 664 17 664 144 q 624 -133 664 -67 q 508 -238 585 -199 q 314 -278 431 -278 m 257 843 l 78 1015 l 169 1015 l 346 869 l 268 869 l 444 1015 l 536 1015 l 357 843 l 257 843 z "
  },
  f: {
    ha: 471,
    x_min: 24,
    x_max: 521,
    o: "m 154 0 l 154 821 q 211 978 154 918 q 375 1038 268 1038 q 456 1026 417 1038 q 521 992 494 1015 l 488 918 q 439 945 467 936 q 379 954 411 954 q 283 919 317 954 q 250 817 250 885 l 250 706 l 253 660 l 253 0 l 154 0 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 z "
  },
  g: {
    ha: 951,
    x_min: 64,
    x_max: 814,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 431 28 q 243 73 326 28 q 112 199 160 118 q 64 383 64 279 q 112 567 64 488 q 243 692 160 647 q 431 736 326 736 q 606 696 528 736 q 729 576 683 656 q 775 383 775 497 q 729 190 775 269 q 606 69 683 111 q 431 28 528 28 m 440 115 q 583 149 521 115 q 682 244 646 183 q 718 383 718 304 q 682 522 718 463 q 583 616 646 582 q 440 650 521 650 q 298 616 361 650 q 199 522 235 582 q 164 383 164 463 q 199 244 164 304 q 298 149 235 183 q 440 115 361 115 z "
  },
  ğ: {
    ha: 951,
    x_min: 64,
    x_max: 814,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 431 28 q 243 73 326 28 q 112 199 160 118 q 64 383 64 279 q 112 567 64 488 q 243 692 160 647 q 431 736 326 736 q 606 696 528 736 q 729 576 683 656 q 775 383 775 497 q 729 190 775 269 q 606 69 683 111 q 431 28 528 28 m 440 115 q 583 149 521 115 q 682 244 646 183 q 718 383 718 304 q 682 522 718 463 q 583 616 646 582 q 440 650 521 650 q 298 616 361 650 q 199 522 235 582 q 164 383 164 463 q 199 244 164 304 q 298 149 235 183 q 440 115 361 115 m 451 836 q 303 884 364 836 q 240 1015 243 932 l 310 1015 q 353 929 313 961 q 451 897 394 897 q 551 929 510 897 q 593 1015 592 961 l 663 1015 q 599 884 660 932 q 451 836 539 836 z "
  },
  ǧ: {
    ha: 951,
    x_min: 64,
    x_max: 814,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 431 28 q 243 73 326 28 q 112 199 160 118 q 64 383 64 279 q 112 567 64 488 q 243 692 160 647 q 431 736 326 736 q 606 696 528 736 q 729 576 683 656 q 775 383 775 497 q 729 190 775 269 q 606 69 683 111 q 431 28 528 28 m 440 115 q 583 149 521 115 q 682 244 646 183 q 718 383 718 304 q 682 522 718 463 q 583 616 646 582 q 440 650 521 650 q 298 616 361 650 q 199 522 235 582 q 164 383 164 463 q 199 244 164 304 q 298 149 235 183 q 440 115 361 115 m 401 843 l 222 1015 l 314 1015 l 490 869 l 413 869 l 589 1015 l 681 1015 l 501 843 l 401 843 z "
  },
  ĝ: {
    ha: 951,
    x_min: 64,
    x_max: 814,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 431 28 q 243 73 326 28 q 112 199 160 118 q 64 383 64 279 q 112 567 64 488 q 243 692 160 647 q 431 736 326 736 q 606 696 528 736 q 729 576 683 656 q 775 383 775 497 q 729 190 775 269 q 606 69 683 111 q 431 28 528 28 m 440 115 q 583 149 521 115 q 682 244 646 183 q 718 383 718 304 q 682 522 718 463 q 583 616 646 582 q 440 650 521 650 q 298 616 361 650 q 199 522 235 582 q 164 383 164 463 q 199 244 164 304 q 298 149 235 183 q 440 115 361 115 m 222 843 l 401 1015 l 501 1015 l 681 843 l 589 843 l 413 990 l 490 990 l 314 843 l 222 843 z "
  },
  ģ: {
    ha: 951,
    x_min: 64,
    x_max: 814,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 431 28 q 243 73 326 28 q 112 199 160 118 q 64 383 64 279 q 112 567 64 488 q 243 692 160 647 q 431 736 326 736 q 606 696 528 736 q 729 576 683 656 q 775 383 775 497 q 729 190 775 269 q 606 69 683 111 q 431 28 528 28 m 440 115 q 583 149 521 115 q 682 244 646 183 q 718 383 718 304 q 682 522 718 463 q 583 616 646 582 q 440 650 521 650 q 298 616 361 650 q 199 522 235 582 q 164 383 164 463 q 199 244 164 304 q 298 149 235 183 q 440 115 361 115 m 451 836 q 404 853 421 836 q 388 890 388 869 q 392 918 388 904 q 403 950 396 932 l 451 1085 l 511 1085 l 463 906 l 451 944 q 498 930 481 944 q 515 890 515 915 q 499 852 515 868 q 451 836 482 836 z "
  },
  ġ: {
    ha: 951,
    x_min: 64,
    x_max: 814,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 431 28 q 243 73 326 28 q 112 199 160 118 q 64 383 64 279 q 112 567 64 488 q 243 692 160 647 q 431 736 326 736 q 606 696 528 736 q 729 576 683 656 q 775 383 775 497 q 729 190 775 269 q 606 69 683 111 q 431 28 528 28 m 440 115 q 583 149 521 115 q 682 244 646 183 q 718 383 718 304 q 682 522 718 463 q 583 616 646 582 q 440 650 521 650 q 298 616 361 650 q 199 522 235 582 q 164 383 164 463 q 199 244 164 304 q 298 149 235 183 q 440 115 361 115 m 451 875 q 404 894 424 875 q 385 942 385 914 q 404 990 385 971 q 451 1008 424 1008 q 499 990 479 1008 q 518 942 518 971 q 499 894 518 914 q 451 875 479 875 z "
  },
  ḡ: {
    ha: 951,
    x_min: 64,
    x_max: 814,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 431 28 q 243 73 326 28 q 112 199 160 118 q 64 383 64 279 q 112 567 64 488 q 243 692 160 647 q 431 736 326 736 q 606 696 528 736 q 729 576 683 656 q 775 383 775 497 q 729 190 775 269 q 606 69 683 111 q 431 28 528 28 m 440 115 q 583 149 521 115 q 682 244 646 183 q 718 383 718 304 q 682 522 718 463 q 583 616 646 582 q 440 650 521 650 q 298 616 361 650 q 199 522 235 582 q 164 383 164 463 q 199 244 164 304 q 298 149 235 183 q 440 115 361 115 m 238 896 l 238 961 l 665 961 l 665 896 l 238 896 z "
  },
  ǥ: {
    ha: 960,
    x_min: 64,
    x_max: 903,
    o: "m 449 -276 q 257 -247 349 -276 q 108 -164 165 -218 l 158 -89 q 285 -162 210 -135 q 446 -189 361 -189 q 650 -124 585 -189 q 715 76 715 -60 l 715 258 l 729 383 l 719 508 l 719 729 l 814 729 l 814 89 q 722 -188 814 -100 q 449 -276 629 -276 m 400 -86 l 400 -15 l 903 -15 l 903 -86 l 400 -86 m 431 49 q 243 92 326 49 q 112 214 160 136 q 64 393 64 292 q 112 573 64 496 q 243 693 160 650 q 431 736 326 736 q 606 697 528 736 q 729 581 683 657 q 775 393 775 504 q 729 205 775 282 q 606 88 683 128 q 431 49 528 49 m 440 132 q 583 165 521 132 q 682 258 646 199 q 718 393 718 317 q 682 529 718 471 q 583 620 646 588 q 440 653 521 653 q 298 620 361 653 q 199 529 235 588 q 164 393 164 471 q 199 258 164 317 q 298 165 235 199 q 440 132 361 132 z "
  },
  h: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 1031 l 236 1031 l 236 529 l 217 567 q 328 691 251 646 q 510 736 404 736 z "
  },
  ħ: {
    ha: 939,
    x_min: 0,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 1031 l 236 1031 l 236 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 0 843 l 0 915 l 542 915 l 542 843 l 0 843 z "
  },
  ḫ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 1031 l 236 1031 l 236 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 472 -285 q 324 -239 385 -285 q 261 -117 264 -193 l 328 -117 q 371 -198 329 -168 q 472 -228 413 -228 q 575 -198 533 -228 q 617 -117 617 -168 l 683 -117 q 620 -239 681 -193 q 472 -285 560 -285 z "
  },
  ȟ: {
    ha: 939,
    x_min: -43,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 1031 l 236 1031 l 236 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 138 1144 l -42 1317 l 50 1317 l 226 1171 l 149 1171 l 325 1317 l 417 1317 l 238 1144 l 138 1144 z "
  },
  ĥ: {
    ha: 939,
    x_min: -43,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 1031 l 236 1031 l 236 529 l 217 567 q 328 691 251 646 q 510 736 404 736 z "
  },
  ḥ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 1031 l 236 1031 l 236 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 472 -264 q 431 -247 449 -264 q 413 -204 413 -231 q 431 -161 413 -178 q 472 -144 449 -144 q 515 -161 497 -144 q 532 -204 532 -178 q 515 -247 532 -231 q 472 -264 497 -264 z "
  },
  i: {
    ha: 374,
    x_min: 115,
    x_max: 260,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 188 890 q 136 911 157 890 q 115 961 115 932 q 136 1010 115 990 q 188 1031 157 1031 q 239 1011 218 1031 q 260 963 260 992 q 240 911 260 932 q 188 890 219 890 z "
  },
  ı: {
    ha: 374,
    x_min: 138,
    x_max: 236,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 z "
  },
  í: {
    ha: 374,
    x_min: 96,
    x_max: 419,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 97 843 l 288 1015 l 419 1015 l 194 843 l 97 843 z "
  },
  ĭ: {
    ha: 374,
    x_min: 10,
    x_max: 364,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 188 836 q 62 884 113 836 q 11 1015 11 932 l 76 1015 q 107 929 76 961 q 188 897 138 897 q 268 929 238 897 q 299 1015 299 961 l 364 1015 q 314 884 364 932 q 188 836 264 836 z "
  },
  î: {
    ha: 374,
    x_min: -8,
    x_max: 382,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m -7 843 l 139 1015 l 236 1015 l 382 843 l 293 843 l 154 990 l 221 990 l 82 843 l -7 843 z "
  },
  ȉ: {
    ha: 374,
    x_min: -126,
    x_max: 344,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 257 843 l 100 1015 l 210 1015 l 344 843 l 257 843 m 31 843 l -125 1015 l -15 1015 l 118 843 l 31 843 z "
  },
  ï: {
    ha: 374,
    x_min: 38,
    x_max: 336,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 279 875 q 239 892 256 875 q 222 935 222 910 q 239 976 222 958 q 279 993 256 993 q 321 976 304 993 q 338 935 338 960 q 321 892 338 910 q 279 875 304 875 m 96 875 q 54 892 71 875 q 38 935 38 910 q 54 976 38 958 q 96 993 71 993 q 137 976 121 993 q 153 935 153 960 q 137 892 153 910 q 96 875 121 875 z "
  },
  ḯ: {
    ha: 374,
    x_min: 7,
    x_max: 390,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 z "
  },
  ị: {
    ha: 374,
    x_min: 115,
    x_max: 260,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 188 890 q 136 911 157 890 q 115 961 115 932 q 136 1010 115 990 q 188 1031 157 1031 q 239 1011 218 1031 q 260 963 260 992 q 240 911 260 932 q 188 890 219 890 m 188 -264 q 146 -247 164 -264 q 128 -204 128 -231 q 146 -161 128 -178 q 188 -144 164 -144 q 230 -161 213 -144 q 247 -204 247 -178 q 230 -247 247 -231 q 188 -264 213 -264 z "
  },
  ì: {
    ha: 374,
    x_min: -46,
    x_max: 278,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 181 843 l -44 1015 l 88 1015 l 278 843 l 181 843 z "
  },
  ỉ: {
    ha: 374,
    x_min: 68,
    x_max: 315,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 206 833 l 171 876 q 233 919 213 896 q 253 975 253 943 q 232 1024 253 1004 q 176 1043 211 1043 q 93 1017 133 1043 l 69 1065 q 124 1092 93 1083 q 185 1101 156 1101 q 280 1069 243 1101 q 317 982 317 1036 q 290 897 317 933 q 206 833 263 860 z "
  },
  ȋ: {
    ha: 374,
    x_min: 10,
    x_max: 364,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 11 843 q 62 974 11 926 q 188 1021 113 1021 q 314 974 264 1021 q 364 843 364 926 l 299 843 q 268 929 299 897 q 188 961 238 961 q 107 929 138 961 q 76 843 76 897 l 11 843 z "
  },
  ĳ: {
    ha: 756,
    x_min: 115,
    x_max: 640,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 188 890 q 136 911 157 890 q 115 961 115 932 q 136 1010 115 990 q 188 1031 157 1031 q 239 1011 218 1031 q 260 963 260 992 q 240 911 260 932 q 188 890 219 890 z "
  },
  ī: {
    ha: 374,
    x_min: 13,
    x_max: 361,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 13 896 l 13 961 l 363 961 l 363 896 l 13 896 z "
  },
  į: {
    ha: 374,
    x_min: 85,
    x_max: 290,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 188 890 q 136 911 157 890 q 115 961 115 932 q 136 1010 115 990 q 188 1031 157 1031 q 239 1011 218 1031 q 260 963 260 992 q 240 911 260 932 q 188 890 219 890 m 207 -306 q 117 -271 151 -306 q 83 -179 83 -236 q 108 -74 83 -131 q 200 38 133 -18 l 236 0 q 169 -94 183 -53 q 156 -169 156 -136 q 174 -226 156 -206 q 218 -246 193 -246 q 246 -240 233 -246 q 269 -226 258 -235 l 289 -276 q 207 -306 258 -306 z "
  },
  ĩ: {
    ha: 374,
    x_min: 3,
    x_max: 371,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 267 851 q 216 865 238 851 q 177 898 194 879 q 145 931 160 917 q 113 946 131 946 q 76 922 89 946 q 63 857 63 899 l 3 857 q 31 969 3 929 q 108 1010 60 1010 q 160 995 139 1010 q 198 963 181 981 q 230 931 215 944 q 263 917 244 917 q 299 940 286 917 q 313 1001 313 963 l 372 1001 q 344 892 372 932 q 267 851 317 851 z "
  },
  j: {
    ha: 381,
    x_min: -125,
    x_max: 267,
    o: "m 29 -276 q -56 -265 -15 -276 q -125 -229 -97 -253 l -90 -154 q 24 -192 -46 -192 q 113 -157 82 -192 q 144 -54 144 -122 l 144 729 l 243 729 l 243 -54 q 188 -216 243 -156 q 29 -276 133 -276 m 194 890 q 143 911 164 890 q 122 961 122 932 q 143 1010 122 990 q 194 1031 164 1031 q 246 1011 225 1031 q 267 963 267 992 q 247 911 267 932 q 194 890 226 890 z "
  },
  "ȷ": {
    ha: 381,
    x_min: -125,
    x_max: 243,
    o: "m 29 -276 q -56 -265 -15 -276 q -125 -229 -97 -253 l -90 -154 q 24 -192 -46 -192 q 113 -157 82 -192 q 144 -54 144 -122 l 144 729 l 243 729 l 243 -54 q 188 -216 243 -156 q 29 -276 133 -276 z "
  },
  ĵ: {
    ha: 381,
    x_min: -125,
    x_max: 389,
    o: "m 29 -276 q -56 -265 -15 -276 q -125 -229 -97 -253 l -90 -154 q 24 -192 -46 -192 q 113 -157 82 -192 q 144 -54 144 -122 l 144 729 l 243 729 l 243 -54 q 188 -216 243 -156 q 29 -276 133 -276 m 0 843 l 146 1015 l 243 1015 l 389 843 l 300 843 l 161 990 l 228 990 l 89 843 l 0 843 z "
  },
  k: {
    ha: 835,
    x_min: 138,
    x_max: 824,
    o: "m 215 189 l 218 315 l 672 729 l 793 729 l 472 422 l 417 375 l 215 189 m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 703 0 l 399 379 l 463 456 l 824 0 l 703 0 z "
  },
  ǩ: {
    ha: 835,
    x_min: -43,
    x_max: 824,
    o: "m 215 189 l 218 315 l 672 729 l 793 729 l 472 422 l 417 375 l 215 189 m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 703 0 l 399 379 l 463 456 l 824 0 l 703 0 m 138 1144 l -42 1317 l 50 1317 l 226 1171 l 149 1171 l 325 1317 l 417 1317 l 238 1144 l 138 1144 z "
  },
  ķ: {
    ha: 835,
    x_min: 138,
    x_max: 824,
    o: "m 215 189 l 218 315 l 672 729 l 793 729 l 472 422 l 417 375 l 215 189 m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 703 0 l 399 379 l 463 456 l 824 0 l 703 0 m 383 -364 l 422 -214 l 432 -253 q 389 -237 406 -253 q 372 -199 372 -222 q 389 -160 372 -175 q 432 -144 406 -144 q 476 -160 460 -144 q 492 -199 492 -176 q 488 -228 492 -212 q 476 -261 485 -243 l 438 -364 l 383 -364 z "
  },
  ĸ: {
    ha: 819,
    x_min: 138,
    x_max: 824,
    o: "m 215 189 l 218 315 l 672 729 l 793 729 l 472 422 l 417 375 l 215 189 m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 703 0 l 399 379 l 463 456 l 824 0 l 703 0 z "
  },
  l: {
    ha: 374,
    x_min: 138,
    x_max: 236,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 z "
  },
  ĺ: {
    ha: 374,
    x_min: 96,
    x_max: 419,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 97 1144 l 288 1317 l 419 1317 l 194 1144 l 97 1144 z "
  },
  ľ: {
    ha: 374,
    x_min: 138,
    x_max: 447,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 364 808 l 364 1069 l 447 1069 l 435 808 l 364 808 z "
  },
  ļ: {
    ha: 374,
    x_min: 128,
    x_max: 247,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 139 -364 l 178 -214 l 188 -253 q 144 -237 161 -253 q 128 -199 128 -222 q 144 -160 128 -175 q 188 -144 161 -144 q 231 -160 215 -144 q 247 -199 247 -176 q 244 -228 247 -212 q 232 -261 240 -243 l 193 -364 l 139 -364 z "
  },
  ŀ: {
    ha: 436,
    x_min: 138,
    x_max: 469,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 404 428 q 358 447 376 428 q 339 493 339 467 q 358 539 339 519 q 404 558 376 558 q 451 539 432 558 q 469 493 469 519 q 451 447 469 467 q 404 428 432 428 z "
  },
  ḷ: {
    ha: 374,
    x_min: 128,
    x_max: 247,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 188 -264 q 146 -247 164 -264 q 128 -204 128 -231 q 146 -161 128 -178 q 188 -144 164 -144 q 230 -161 213 -144 q 247 -204 247 -178 q 230 -247 247 -231 q 188 -264 213 -264 z "
  },
  ǉ: {
    ha: 756,
    x_min: 138,
    x_max: 640,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m 403 -276 q 317 -265 358 -276 q 249 -229 276 -253 l 283 -154 q 397 -192 328 -192 q 487 -157 456 -192 q 518 -54 518 -122 l 518 729 l 617 729 l 617 -54 q 562 -216 617 -156 q 403 -276 507 -276 m 568 890 q 517 911 538 890 q 496 961 496 932 q 517 1010 496 990 q 568 1031 538 1031 q 619 1011 599 1031 q 640 963 640 992 q 620 911 640 932 q 568 890 600 890 z "
  },
  ḻ: {
    ha: 374,
    x_min: -26,
    x_max: 401,
    o: "m 138 0 l 138 1031 l 236 1031 l 236 0 l 138 0 m -26 -235 l -26 -169 l 401 -169 l 401 -235 l -26 -235 z "
  },
  ł: {
    ha: 388,
    x_min: 4,
    x_max: 385,
    o: "m 144 0 l 144 1031 l 243 1031 l 243 0 l 144 0 m 49 338 l 3 397 l 339 650 l 383 589 l 49 338 z "
  },
  m: {
    ha: 1474,
    x_min: 138,
    x_max: 1343,
    o: "m 1049 736 q 1203 702 1138 736 q 1306 599 1269 668 q 1343 424 1343 529 l 1343 0 l 1244 0 l 1244 414 q 1190 588 1244 529 q 1035 647 1135 647 q 905 616 960 647 q 820 526 850 585 q 790 383 790 467 l 790 0 l 692 0 l 692 414 q 636 588 692 529 q 481 647 581 647 q 351 616 407 647 q 266 526 296 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 532 l 217 567 q 324 691 250 646 q 500 736 399 736 q 682 683 607 736 q 779 522 757 629 l 740 538 q 853 681 772 626 q 1049 736 935 736 z "
  },
  ṃ: {
    ha: 1474,
    x_min: 138,
    x_max: 1343,
    o: "m 1049 736 q 1203 702 1138 736 q 1306 599 1269 668 q 1343 424 1343 529 l 1343 0 l 1244 0 l 1244 414 q 1190 588 1244 529 q 1035 647 1135 647 q 905 616 960 647 q 820 526 850 585 q 790 383 790 467 l 790 0 l 692 0 l 692 414 q 636 588 692 529 q 481 647 581 647 q 351 616 407 647 q 266 526 296 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 532 l 217 567 q 324 691 250 646 q 500 736 399 736 q 682 683 607 736 q 779 522 757 629 l 740 538 q 853 681 772 626 q 1049 736 935 736 m 739 -264 q 697 -247 715 -264 q 679 -204 679 -231 q 697 -161 679 -178 q 739 -144 715 -144 q 781 -161 764 -144 q 799 -204 799 -178 q 781 -247 799 -231 q 739 -264 764 -264 z "
  },
  n: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 z "
  },
  ń: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 382 843 l 572 1015 l 704 1015 l 479 843 l 382 843 z "
  },
  ŉ: {
    ha: 1001,
    x_min: 32,
    x_max: 871,
    o: "m 572 736 q 728 702 661 736 q 834 599 796 668 q 872 424 872 529 l 872 0 l 774 0 l 774 414 q 716 588 774 529 q 554 647 658 647 q 419 616 476 647 q 330 526 361 585 q 299 383 299 467 l 299 0 l 200 0 l 200 729 l 294 729 l 294 529 l 279 567 q 390 691 314 646 q 572 736 467 736 z "
  },
  ň: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 422 843 l 243 1015 l 335 1015 l 511 869 l 433 869 l 610 1015 l 701 1015 l 522 843 l 422 843 z "
  },
  ņ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 424 -364 l 463 -214 l 472 -253 q 429 -237 446 -253 q 413 -199 413 -222 q 429 -160 413 -175 q 472 -144 446 -144 q 516 -160 500 -144 q 532 -199 532 -176 q 528 -228 532 -212 q 517 -261 525 -243 l 478 -364 l 424 -364 z "
  },
  ṅ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 472 875 q 425 894 444 875 q 406 942 406 914 q 425 990 406 971 q 472 1008 444 1008 q 519 990 500 1008 q 539 942 539 971 q 519 894 539 914 q 472 875 500 875 z "
  },
  ṇ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 472 -264 q 431 -247 449 -264 q 413 -204 413 -231 q 431 -161 413 -178 q 472 -144 449 -144 q 515 -161 497 -144 q 532 -204 532 -178 q 515 -247 532 -231 q 472 -264 497 -264 z "
  },
  ŋ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 -54 q 754 -216 810 -156 q 596 -276 699 -276 q 510 -265 551 -276 q 442 -229 468 -253 l 476 -154 q 590 -192 519 -192 q 680 -157 649 -192 q 711 -54 711 -122 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 z "
  },
  ǌ: {
    ha: 1321,
    x_min: 138,
    x_max: 1206,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 968 -276 q 883 -265 924 -276 q 814 -229 842 -253 l 849 -154 q 963 -192 893 -192 q 1052 -157 1021 -192 q 1083 -54 1083 -122 l 1083 729 l 1182 729 l 1182 -54 q 1127 -216 1182 -156 q 968 -276 1072 -276 m 1133 890 q 1082 911 1103 890 q 1061 961 1061 932 q 1082 1010 1061 990 q 1133 1031 1103 1031 q 1185 1011 1164 1031 q 1206 963 1206 992 q 1185 911 1206 932 q 1133 890 1165 890 z "
  },
  ṉ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 258 -235 l 258 -169 l 686 -169 l 686 -235 l 258 -235 z "
  },
  ñ: {
    ha: 939,
    x_min: 138,
    x_max: 810,
    o: "m 510 736 q 666 702 599 736 q 772 599 733 668 q 810 424 810 529 l 810 0 l 711 0 l 711 414 q 653 588 711 529 q 492 647 596 647 q 356 616 414 647 q 267 526 299 585 q 236 383 236 467 l 236 0 l 138 0 l 138 729 l 232 729 l 232 529 l 217 567 q 328 691 251 646 q 510 736 404 736 m 567 851 q 510 865 535 851 q 465 898 485 879 q 425 931 444 917 q 385 946 406 946 q 334 922 353 946 q 313 857 315 899 l 253 857 q 290 968 256 926 q 378 1010 324 1010 q 435 995 410 1010 q 481 962 461 981 q 520 929 501 943 q 560 915 539 915 q 611 938 592 915 q 632 1001 631 961 l 692 1001 q 656 893 690 935 q 567 851 621 851 z "
  },
  o: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ó: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 344 843 l 535 1015 l 667 1015 l 442 843 l 344 843 z "
  },
  ŏ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 435 836 q 287 884 347 836 q 224 1015 226 932 l 293 1015 q 337 929 296 961 q 435 897 378 897 q 534 929 493 897 q 576 1015 575 961 l 646 1015 q 583 884 643 932 q 435 836 522 836 z "
  },
  ô: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 206 843 l 385 1015 l 485 1015 l 664 843 l 572 843 l 396 990 l 474 990 l 297 843 l 206 843 z "
  },
  ố: {
    ha: 871,
    x_min: 64,
    x_max: 850,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ộ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 435 -264 q 393 -247 411 -264 q 375 -204 375 -231 q 393 -161 375 -178 q 435 -144 411 -144 q 477 -161 460 -144 q 494 -204 494 -178 q 477 -247 494 -231 q 435 -264 460 -264 m 206 843 l 385 1015 l 485 1015 l 664 843 l 572 843 l 396 990 l 474 990 l 297 843 l 206 843 z "
  },
  ồ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ổ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ỗ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ȍ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 504 843 l 347 1015 l 457 1015 l 592 843 l 504 843 m 278 843 l 122 1015 l 232 1015 l 365 843 l 278 843 z "
  },
  ö: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 558 875 q 517 892 535 875 q 499 935 499 908 q 517 978 499 961 q 558 994 535 994 q 601 978 583 994 q 618 935 618 961 q 601 892 618 908 q 558 875 583 875 m 311 875 q 269 892 286 875 q 251 935 251 908 q 269 978 251 961 q 311 994 286 994 q 353 978 335 994 q 371 935 371 961 q 353 892 371 908 q 311 875 335 875 z "
  },
  ȫ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ȱ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ọ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 435 -264 q 393 -247 411 -264 q 375 -204 375 -231 q 393 -161 375 -178 q 435 -144 411 -144 q 477 -161 460 -144 q 494 -204 494 -178 q 477 -247 494 -231 q 435 -264 460 -264 z "
  },
  ò: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 428 843 l 203 1015 l 335 1015 l 525 843 l 428 843 z "
  },
  ỏ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 453 833 l 418 876 q 480 919 460 896 q 500 975 500 943 q 479 1024 500 1004 q 424 1043 458 1043 q 340 1017 381 1043 l 317 1065 q 372 1092 340 1083 q 432 1101 403 1101 q 527 1069 490 1101 q 564 982 564 1036 q 537 897 564 933 q 453 833 510 860 z "
  },
  ơ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 245 688 161 640 q 436 736 329 736 q 499 735 474 736 q 551 731 525 733 q 608 728 576 728 q 694 757 667 728 q 721 825 721 786 q 713 873 721 851 q 693 914 704 894 l 757 939 q 783 885 774 915 q 793 822 793 854 q 772 738 793 775 q 708 681 750 701 q 603 660 665 660 q 566 662 585 660 q 524 667 547 664 l 572 713 q 742 583 678 675 q 807 365 807 490 q 759 173 807 257 q 627 41 711 89 q 435 -7 543 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ớ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 245 688 161 640 q 436 736 329 736 q 499 735 474 736 q 551 731 525 733 q 608 728 576 728 q 694 757 667 728 q 721 825 721 786 q 713 873 721 851 q 693 914 704 894 l 757 939 q 783 885 774 915 q 793 822 793 854 q 772 738 793 775 q 708 681 750 701 q 603 660 665 660 q 566 662 585 660 q 524 667 547 664 l 572 713 q 742 583 678 675 q 807 365 807 490 q 759 173 807 257 q 627 41 711 89 q 435 -7 543 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 344 843 l 535 1015 l 667 1015 l 442 843 l 344 843 z "
  },
  ợ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 245 688 161 640 q 436 736 329 736 q 499 735 474 736 q 551 731 525 733 q 608 728 576 728 q 694 757 667 728 q 721 825 721 786 q 713 873 721 851 q 693 914 704 894 l 757 939 q 783 885 774 915 q 793 822 793 854 q 772 738 793 775 q 708 681 750 701 q 603 660 665 660 q 566 662 585 660 q 524 667 547 664 l 572 713 q 742 583 678 675 q 807 365 807 490 q 759 173 807 257 q 627 41 711 89 q 435 -7 543 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 435 -264 q 393 -247 411 -264 q 375 -204 375 -231 q 393 -161 375 -178 q 435 -144 411 -144 q 477 -161 460 -144 q 494 -204 494 -178 q 477 -247 494 -231 q 435 -264 460 -264 z "
  },
  ờ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 245 688 161 640 q 436 736 329 736 q 499 735 474 736 q 551 731 525 733 q 608 728 576 728 q 694 757 667 728 q 721 825 721 786 q 713 873 721 851 q 693 914 704 894 l 757 939 q 783 885 774 915 q 793 822 793 854 q 772 738 793 775 q 708 681 750 701 q 603 660 665 660 q 566 662 585 660 q 524 667 547 664 l 572 713 q 742 583 678 675 q 807 365 807 490 q 759 173 807 257 q 627 41 711 89 q 435 -7 543 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 428 843 l 203 1015 l 335 1015 l 525 843 l 428 843 z "
  },
  ở: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 245 688 161 640 q 436 736 329 736 q 499 735 474 736 q 551 731 525 733 q 608 728 576 728 q 694 757 667 728 q 721 825 721 786 q 713 873 721 851 q 693 914 704 894 l 757 939 q 783 885 774 915 q 793 822 793 854 q 772 738 793 775 q 708 681 750 701 q 603 660 665 660 q 566 662 585 660 q 524 667 547 664 l 572 713 q 742 583 678 675 q 807 365 807 490 q 759 173 807 257 q 627 41 711 89 q 435 -7 543 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 453 833 l 418 876 q 480 919 460 896 q 500 975 500 943 q 479 1024 500 1004 q 424 1043 458 1043 q 340 1017 381 1043 l 317 1065 q 372 1092 340 1083 q 432 1101 403 1101 q 527 1069 490 1101 q 564 982 564 1036 q 537 897 564 933 q 453 833 510 860 z "
  },
  ỡ: {
    ha: 876,
    x_min: 64,
    x_max: 807,
    o: "m 526 851 q 472 865 496 851 q 429 898 449 879 q 392 931 410 917 q 353 946 374 946 q 306 922 324 946 q 286 857 288 899 l 231 857 q 264 968 232 926 q 349 1010 296 1010 q 401 995 378 1010 q 444 962 425 981 q 482 929 464 943 q 519 915 500 915 q 569 938 550 915 q 589 1001 588 961 l 644 1001 q 610 893 642 935 q 526 851 578 851 m 435 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 245 688 161 640 q 436 736 329 736 q 499 735 474 736 q 551 731 525 733 q 608 728 576 728 q 694 757 667 728 q 721 825 721 786 q 713 873 721 851 q 693 914 704 894 l 757 939 q 783 885 774 915 q 793 822 793 854 q 772 738 793 775 q 708 681 750 701 q 603 660 665 660 q 566 662 585 660 q 524 667 547 664 l 572 713 q 742 583 678 675 q 807 365 807 490 q 759 173 807 257 q 627 41 711 89 q 435 -7 543 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ő: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 504 843 l 638 1015 l 747 1015 l 592 843 l 504 843 m 278 843 l 413 1015 l 522 1015 l 365 843 l 278 843 z "
  },
  ȏ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 224 843 q 287 974 226 926 q 435 1021 347 1021 q 583 974 522 1021 q 646 843 643 926 l 576 843 q 534 929 575 897 q 435 961 493 961 q 337 929 378 961 q 293 843 296 897 l 224 843 z "
  },
  ō: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 221 896 l 221 961 l 649 961 l 649 896 l 221 896 z "
  },
  ṓ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ṑ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ǫ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 475 -306 q 364 -269 406 -306 q 322 -176 322 -233 q 339 -103 322 -140 q 397 -29 356 -65 q 511 38 439 7 l 513 0 q 470 -6 488 -4 q 435 -7 453 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 688 161 640 q 435 736 328 736 q 627 688 543 736 q 759 558 711 640 q 807 365 807 475 q 749 157 807 246 q 592 24 690 68 q 467 -47 508 -14 q 410 -110 425 -81 q 396 -167 396 -139 q 422 -225 396 -206 q 486 -244 447 -244 q 531 -237 508 -244 q 571 -218 554 -231 l 593 -272 q 539 -297 569 -287 q 475 -306 508 -306 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ø: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 93 -99 l 708 825 l 774 825 l 160 -99 l 93 -99 z "
  },
  ǿ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 93 -99 l 708 825 l 774 825 l 160 -99 l 93 -99 m 343 843 l 533 1015 l 665 1015 l 440 843 l 343 843 z "
  },
  õ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 529 851 q 472 865 497 851 q 427 898 447 879 q 388 931 407 917 q 347 946 368 946 q 297 922 315 946 q 275 857 278 899 l 215 857 q 252 968 218 926 q 340 1010 286 1010 q 398 995 372 1010 q 444 962 424 981 q 483 929 464 943 q 522 915 501 915 q 574 938 554 915 q 594 1001 593 961 l 654 1001 q 618 893 653 935 q 529 851 583 851 z "
  },
  ṍ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ṏ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  ȭ: {
    ha: 871,
    x_min: 64,
    x_max: 807,
    o: "m 435 -7 q 245 41 329 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 689 161 642 q 435 736 328 736 q 627 689 543 736 q 759 558 711 642 q 807 365 807 475 q 759 173 807 257 q 626 41 711 89 q 435 -7 542 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 436 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 z "
  },
  œ: {
    ha: 1483,
    x_min: 64,
    x_max: 1419,
    o: "m 435 -7 q 244 41 328 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 244 688 161 640 q 435 736 328 736 q 624 688 543 736 q 751 558 706 640 q 797 365 797 475 q 751 173 797 257 q 624 41 706 89 q 435 -7 543 -7 m 435 81 q 575 116 514 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 575 615 636 579 q 435 650 514 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 1092 -7 q 894 41 979 -7 q 761 173 808 89 q 714 365 714 257 q 759 557 714 474 q 883 688 804 640 q 1065 736 963 736 q 1248 690 1168 736 q 1374 559 1328 643 q 1419 365 1419 475 q 1419 351 1419 358 q 1418 335 1418 343 l 783 335 l 783 408 l 1365 408 l 1326 379 q 1292 520 1326 458 q 1200 617 1258 582 q 1065 651 1142 651 q 931 617 989 651 q 838 519 872 582 q 804 376 804 457 l 804 361 q 841 215 804 278 q 944 116 878 151 q 1094 81 1010 81 q 1219 104 1161 81 q 1317 176 1276 128 l 1372 113 q 1251 24 1324 54 q 1092 -7 1179 -7 z "
  },
  p: {
    ha: 942,
    x_min: 138,
    x_max: 878,
    o: "m 514 -7 q 343 37 419 -7 q 222 163 267 81 q 176 365 176 246 q 221 567 176 485 q 342 693 265 650 q 514 736 418 736 q 701 690 618 736 q 831 559 783 643 q 878 365 878 475 q 831 171 878 254 q 701 40 783 88 q 514 -7 618 -7 m 138 -269 l 138 729 l 232 729 l 232 510 l 222 364 l 236 217 l 236 -269 l 138 -269 m 507 81 q 646 116 585 81 q 743 216 707 151 q 779 365 779 281 q 743 514 779 450 q 646 614 707 578 q 507 650 585 650 q 367 614 429 650 q 270 514 306 578 q 235 365 235 450 q 270 216 235 281 q 367 116 306 151 q 507 81 429 81 z "
  },
  þ: {
    ha: 942,
    x_min: 138,
    x_max: 878,
    o: "m 514 -7 q 343 37 419 -7 q 222 163 267 81 q 176 365 176 246 q 221 567 176 485 q 342 693 265 650 q 514 736 418 736 q 701 690 618 736 q 831 559 783 643 q 878 365 878 475 q 831 171 878 254 q 701 40 783 88 q 514 -7 618 -7 m 138 -269 l 138 1031 l 236 1031 l 236 510 l 222 364 l 236 217 l 236 -269 l 138 -269 m 507 81 q 646 116 585 81 q 743 216 707 151 q 779 365 779 281 q 743 514 779 450 q 646 614 707 578 q 507 650 585 650 q 367 614 429 650 q 270 514 306 578 q 235 365 235 450 q 270 216 235 281 q 367 116 306 151 q 507 81 429 81 z "
  },
  q: {
    ha: 942,
    x_min: 64,
    x_max: 804,
    o: "m 428 -7 q 241 40 324 -7 q 111 171 158 88 q 64 365 64 254 q 111 559 64 475 q 241 690 158 643 q 428 736 324 736 q 601 693 525 736 q 721 567 676 650 q 765 365 765 485 q 720 163 765 246 q 599 37 675 81 q 428 -7 524 -7 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 514 707 450 q 574 614 636 578 q 435 650 513 650 q 297 614 358 650 q 200 514 236 578 q 164 365 164 450 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 706 -269 l 706 217 l 719 364 l 710 510 l 710 729 l 804 729 l 804 -269 l 706 -269 z "
  },
  r: {
    ha: 557,
    x_min: 138,
    x_max: 504,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 z "
  },
  ŕ: {
    ha: 557,
    x_min: 138,
    x_max: 554,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 m 232 843 l 422 1015 l 554 1015 l 329 843 l 232 843 z "
  },
  ř: {
    ha: 557,
    x_min: 92,
    x_max: 551,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 m 272 843 l 93 1015 l 185 1015 l 361 869 l 283 869 l 460 1015 l 551 1015 l 372 843 l 272 843 z "
  },
  ŗ: {
    ha: 557,
    x_min: 128,
    x_max: 504,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 m 139 -364 l 178 -214 l 188 -253 q 144 -237 161 -253 q 128 -199 128 -222 q 144 -160 128 -175 q 188 -144 161 -144 q 231 -160 215 -144 q 247 -199 247 -176 q 244 -228 247 -212 q 232 -261 240 -243 l 193 -364 l 139 -364 z "
  },
  ȑ: {
    ha: 557,
    x_min: 8,
    x_max: 504,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 m 392 843 l 235 1015 l 344 1015 l 479 843 l 392 843 m 165 843 l 10 1015 l 119 1015 l 253 843 l 165 843 z "
  },
  ṛ: {
    ha: 557,
    x_min: 128,
    x_max: 504,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 m 188 -264 q 146 -247 164 -264 q 128 -204 128 -231 q 146 -161 128 -178 q 188 -144 164 -144 q 230 -161 213 -144 q 247 -204 247 -178 q 230 -247 247 -231 q 188 -264 213 -264 z "
  },
  ȓ: {
    ha: 557,
    x_min: 110,
    x_max: 533,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 m 111 843 q 174 974 114 926 q 322 1021 235 1021 q 470 974 410 1021 q 533 843 531 926 l 464 843 q 422 929 463 897 q 322 961 381 961 q 224 929 265 961 q 181 843 183 897 l 111 843 z "
  },
  ṟ: {
    ha: 557,
    x_min: -26,
    x_max: 504,
    o: "m 138 0 l 138 729 l 232 729 l 232 531 l 222 565 q 325 692 253 649 q 504 736 397 736 l 504 640 q 493 641 499 640 q 482 642 488 642 q 301 572 367 642 q 236 372 236 501 l 236 0 l 138 0 m -26 -235 l -26 -169 l 401 -169 l 401 -235 l -26 -235 z "
  },
  s: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 z "
  },
  ś: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 247 843 l 438 1015 l 569 1015 l 344 843 l 247 843 z "
  },
  ṥ: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 z "
  },
  "ꞌ": {
    ha: 333,
    x_min: 117,
    x_max: 217,
    o: "m 117 413 l 118 906 l 217 906 l 204 413 l 117 413 z "
  },
  š: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 288 843 l 108 1015 l 200 1015 l 376 869 l 299 869 l 475 1015 l 567 1015 l 388 843 l 288 843 z "
  },
  ṧ: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 z "
  },
  ş: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 307 -306 q 244 -297 272 -306 q 190 -274 215 -289 l 214 -221 q 258 -240 235 -233 q 306 -247 281 -247 q 369 -230 347 -247 q 392 -182 392 -212 q 370 -136 392 -154 q 306 -118 349 -118 l 274 -118 l 307 8 l 367 8 l 346 -72 q 433 -108 403 -76 q 464 -185 464 -139 q 420 -273 464 -240 q 307 -306 376 -306 z "
  },
  ŝ: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 108 843 l 288 1015 l 388 1015 l 567 843 l 475 843 l 299 990 l 376 990 l 200 843 l 108 843 z "
  },
  ș: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 289 -364 l 328 -214 l 338 -253 q 294 -237 311 -253 q 278 -199 278 -222 q 294 -160 278 -175 q 338 -144 311 -144 q 381 -160 365 -144 q 397 -199 397 -176 q 394 -228 397 -212 q 382 -261 390 -243 l 343 -364 l 289 -364 z "
  },
  ṡ: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 338 875 q 290 894 310 875 q 271 942 271 914 q 290 990 271 971 q 338 1008 310 1008 q 385 990 365 1008 q 404 942 404 971 q 385 894 404 914 q 338 875 365 875 z "
  },
  ṣ: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 338 -264 q 296 -247 314 -264 q 278 -204 278 -231 q 296 -161 278 -178 q 338 -144 314 -144 q 380 -161 363 -144 q 397 -204 397 -178 q 380 -247 397 -231 q 338 -264 363 -264 z "
  },
  ṩ: {
    ha: 678,
    x_min: 36,
    x_max: 635,
    o: "m 333 -7 q 163 19 243 -7 q 36 83 82 44 l 81 161 q 194 103 125 128 q 340 79 264 79 q 490 112 444 79 q 536 199 536 144 q 510 262 536 239 q 443 297 485 285 q 350 317 401 308 q 248 336 299 325 q 156 369 197 347 q 88 428 114 390 q 63 528 63 465 q 96 635 63 588 q 194 709 129 682 q 351 736 258 736 q 493 717 422 736 q 610 668 564 699 l 567 589 q 463 637 518 622 q 351 651 407 651 q 206 617 253 651 q 160 531 160 583 q 185 465 160 489 q 253 428 211 442 q 347 407 296 415 q 448 387 397 399 q 541 355 499 375 q 609 298 583 335 q 635 201 635 261 q 599 91 635 138 q 497 19 564 44 q 333 -7 429 -7 m 338 -264 q 296 -247 314 -264 q 278 -204 278 -231 q 296 -161 278 -178 q 338 -144 314 -144 q 380 -161 363 -144 q 397 -204 397 -178 q 380 -247 397 -231 q 338 -264 363 -264 m 338 875 q 290 894 310 875 q 271 942 271 914 q 290 990 271 971 q 338 1008 310 1008 q 385 990 365 1008 q 404 942 404 971 q 385 894 404 914 q 338 875 365 875 z "
  },
  ß: {
    ha: 928,
    x_min: 138,
    x_max: 864,
    o: "m 535 -7 q 453 -1 494 -7 q 378 15 411 4 l 396 99 q 457 84 425 89 q 531 79 489 79 q 652 103 600 79 q 734 172 704 126 q 764 279 764 217 q 697 425 764 374 q 521 476 629 476 l 440 476 l 440 561 q 621 618 556 563 q 686 768 686 674 q 630 901 686 850 q 472 951 574 951 q 300 888 364 951 q 236 700 236 825 l 236 0 l 138 0 l 138 692 q 181 883 138 807 q 299 999 224 960 q 472 1038 375 1038 q 638 1003 568 1038 q 744 908 707 968 q 782 772 782 849 q 758 660 782 710 q 696 577 735 611 q 609 525 657 543 q 514 507 561 507 l 553 549 q 712 517 642 549 q 823 424 782 485 q 864 276 864 364 q 821 124 864 188 q 703 27 778 61 q 535 -7 629 -7 z "
  },
  ſ: {
    ha: 410,
    x_min: 39,
    x_max: 535,
    o: "m 169 0 l 169 821 q 226 978 169 918 q 389 1038 283 1038 q 469 1026 431 1038 q 535 992 508 1015 l 501 918 q 453 945 481 936 q 394 954 425 954 q 300 919 332 954 q 268 817 268 885 l 268 0 l 169 0 m 39 647 l 39 729 l 221 729 l 221 647 l 39 647 z "
  },
  t: {
    ha: 564,
    x_min: 24,
    x_max: 522,
    o: "m 368 -7 q 210 49 265 -7 q 154 206 154 104 l 154 890 l 253 890 l 253 211 q 285 113 253 147 q 379 78 318 78 q 488 115 444 78 l 522 44 q 452 6 493 18 q 368 -7 411 -7 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 z "
  },
  ŧ: {
    ha: 578,
    x_min: 31,
    x_max: 529,
    o: "m 375 -7 q 217 49 272 -7 q 161 206 161 104 l 161 890 l 260 890 l 260 211 q 292 113 260 147 q 386 78 325 78 q 494 115 451 78 l 529 44 q 459 6 500 18 q 375 -7 418 -7 m 31 647 l 31 729 l 482 729 l 482 647 l 31 647 m 47 374 l 47 444 l 467 444 l 467 374 l 47 374 z "
  },
  ť: {
    ha: 564,
    x_min: 24,
    x_max: 522,
    o: "m 368 -7 q 210 49 265 -7 q 154 206 154 104 l 154 890 l 253 890 l 253 211 q 285 113 253 147 q 379 78 318 78 q 488 115 444 78 l 522 44 q 452 6 493 18 q 368 -7 411 -7 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 379 831 l 379 1061 l 458 1061 l 446 831 l 379 831 z "
  },
  ţ: {
    ha: 564,
    x_min: 24,
    x_max: 522,
    o: "m 368 -7 q 210 49 265 -7 q 154 206 154 104 l 154 890 l 253 890 l 253 211 q 285 113 253 147 q 379 78 318 78 q 488 115 444 78 l 522 44 q 452 6 493 18 q 368 -7 411 -7 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 315 -306 q 252 -297 281 -306 q 199 -274 224 -289 l 222 -221 q 266 -240 243 -233 q 314 -247 289 -247 q 378 -230 356 -247 q 400 -182 400 -212 q 378 -136 400 -154 q 314 -118 357 -118 l 282 -118 l 315 8 l 375 8 l 354 -72 q 442 -108 411 -76 q 472 -185 472 -139 q 428 -273 472 -240 q 315 -306 385 -306 z "
  },
  ț: {
    ha: 564,
    x_min: 24,
    x_max: 522,
    o: "m 368 -7 q 210 49 265 -7 q 154 206 154 104 l 154 890 l 253 890 l 253 211 q 285 113 253 147 q 379 78 318 78 q 488 115 444 78 l 522 44 q 452 6 493 18 q 368 -7 411 -7 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 297 -364 l 336 -214 l 346 -253 q 303 -237 319 -253 q 286 -199 286 -222 q 303 -160 286 -175 q 346 -144 319 -144 q 390 -160 374 -144 q 406 -199 406 -176 q 402 -228 406 -212 q 390 -261 399 -243 l 351 -364 l 297 -364 z "
  },
  ẗ: {
    ha: 564,
    x_min: 19,
    x_max: 522,
    o: "m 368 -7 q 210 49 265 -7 q 154 206 154 104 l 154 890 l 253 890 l 253 211 q 285 113 253 147 q 379 78 318 78 q 488 115 444 78 l 522 44 q 452 6 493 18 q 368 -7 411 -7 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 328 1035 q 286 1051 304 1035 q 268 1094 268 1068 q 286 1138 268 1121 q 328 1154 304 1154 q 370 1138 353 1154 q 388 1094 388 1121 q 370 1051 388 1068 q 328 1035 353 1035 m 81 1035 q 38 1051 56 1035 q 21 1094 21 1068 q 38 1138 21 1121 q 81 1154 56 1154 q 122 1138 104 1154 q 140 1094 140 1121 q 122 1051 140 1068 q 81 1035 104 1035 z "
  },
  ṭ: {
    ha: 564,
    x_min: 24,
    x_max: 522,
    o: "m 368 -7 q 210 49 265 -7 q 154 206 154 104 l 154 890 l 253 890 l 253 211 q 285 113 253 147 q 379 78 318 78 q 488 115 444 78 l 522 44 q 452 6 493 18 q 368 -7 411 -7 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 346 -264 q 304 -247 322 -264 q 286 -204 286 -231 q 304 -161 286 -178 q 346 -144 322 -144 q 388 -161 371 -144 q 406 -204 406 -178 q 388 -247 406 -231 q 346 -264 371 -264 z "
  },
  ṯ: {
    ha: 564,
    x_min: 24,
    x_max: 560,
    o: "m 368 -7 q 210 49 265 -7 q 154 206 154 104 l 154 890 l 253 890 l 253 211 q 285 113 253 147 q 379 78 318 78 q 488 115 444 78 l 522 44 q 452 6 493 18 q 368 -7 411 -7 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 132 -235 l 132 -169 l 560 -169 l 560 -235 l 132 -235 z "
  },
  u: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 z "
  },
  ú: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 374 843 l 564 1015 l 696 1015 l 471 843 l 374 843 z "
  },
  ŭ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 464 836 q 316 884 376 836 q 253 1015 256 932 l 322 1015 q 366 929 325 961 q 464 897 407 897 q 563 929 522 897 q 606 1015 604 961 l 675 1015 q 612 884 672 932 q 464 836 551 836 z "
  },
  ǔ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 414 843 l 235 1015 l 326 1015 l 503 869 l 425 869 l 601 1015 l 693 1015 l 514 843 l 414 843 z "
  },
  û: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 235 843 l 414 1015 l 514 1015 l 693 843 l 601 843 l 425 990 l 503 990 l 326 843 l 235 843 z "
  },
  ȕ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 533 843 l 376 1015 l 486 1015 l 621 843 l 533 843 m 307 843 l 151 1015 l 261 1015 l 394 843 l 307 843 z "
  },
  ü: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 588 875 q 546 892 564 875 q 528 935 528 908 q 546 978 528 961 q 588 994 564 994 q 630 978 613 994 q 647 935 647 961 q 630 892 647 908 q 588 875 613 875 m 340 875 q 298 892 315 875 q 281 935 281 908 q 298 978 281 961 q 340 994 315 994 q 382 978 364 994 q 400 935 400 961 q 382 892 400 908 q 340 875 364 875 z "
  },
  ụ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 464 -264 q 422 -247 440 -264 q 404 -204 404 -231 q 422 -161 404 -178 q 464 -144 440 -144 q 506 -161 489 -144 q 524 -204 524 -178 q 506 -247 524 -231 q 464 -264 489 -264 z "
  },
  ù: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 457 843 l 232 1015 l 364 1015 l 554 843 l 457 843 z "
  },
  ủ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 482 833 l 447 876 q 509 919 489 896 q 529 975 529 943 q 508 1024 529 1004 q 453 1043 488 1043 q 369 1017 410 1043 l 346 1065 q 401 1092 369 1083 q 461 1101 432 1101 q 556 1069 519 1101 q 593 982 593 1036 q 566 897 593 933 q 482 833 539 860 z "
  },
  ư: {
    ha: 942,
    x_min: 131,
    x_max: 914,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 728 654 l 728 729 l 749 729 q 819 757 797 729 q 840 824 840 785 q 833 872 840 850 q 813 913 825 894 l 878 938 q 904 884 894 914 q 914 821 914 854 q 872 701 914 747 q 749 654 831 654 l 728 654 z "
  },
  ứ: {
    ha: 942,
    x_min: 131,
    x_max: 914,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 728 654 l 728 729 l 749 729 q 819 757 797 729 q 840 824 840 785 q 833 872 840 850 q 813 913 825 894 l 878 938 q 904 884 894 914 q 914 821 914 854 q 872 701 914 747 q 749 654 831 654 l 728 654 m 374 843 l 564 1015 l 696 1015 l 471 843 l 374 843 z "
  },
  ự: {
    ha: 942,
    x_min: 131,
    x_max: 914,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 728 654 l 728 729 l 749 729 q 819 757 797 729 q 840 824 840 785 q 833 872 840 850 q 813 913 825 894 l 878 938 q 904 884 894 914 q 914 821 914 854 q 872 701 914 747 q 749 654 831 654 l 728 654 m 464 -264 q 422 -247 440 -264 q 404 -204 404 -231 q 422 -161 404 -178 q 464 -144 440 -144 q 506 -161 489 -144 q 524 -204 524 -178 q 506 -247 524 -231 q 464 -264 489 -264 z "
  },
  ừ: {
    ha: 942,
    x_min: 131,
    x_max: 914,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 728 654 l 728 729 l 749 729 q 819 757 797 729 q 840 824 840 785 q 833 872 840 850 q 813 913 825 894 l 878 938 q 904 884 894 914 q 914 821 914 854 q 872 701 914 747 q 749 654 831 654 l 728 654 m 457 843 l 232 1015 l 364 1015 l 554 843 l 457 843 z "
  },
  ử: {
    ha: 942,
    x_min: 131,
    x_max: 914,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 728 654 l 728 729 l 749 729 q 819 757 797 729 q 840 824 840 785 q 833 872 840 850 q 813 913 825 894 l 878 938 q 904 884 894 914 q 914 821 914 854 q 872 701 914 747 q 749 654 831 654 l 728 654 m 482 833 l 447 876 q 509 919 489 896 q 529 975 529 943 q 508 1024 529 1004 q 453 1043 488 1043 q 369 1017 410 1043 l 346 1065 q 401 1092 369 1083 q 461 1101 432 1101 q 556 1069 519 1101 q 593 982 593 1036 q 566 897 593 933 q 482 833 539 860 z "
  },
  ữ: {
    ha: 942,
    x_min: 131,
    x_max: 914,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 728 654 l 728 729 l 749 729 q 819 757 797 729 q 840 824 840 785 q 833 872 840 850 q 813 913 825 894 l 878 938 q 904 884 894 914 q 914 821 914 854 q 872 701 914 747 q 749 654 831 654 l 728 654 m 558 851 q 501 865 526 851 q 456 898 476 879 q 417 931 436 917 q 376 946 397 946 q 326 922 344 946 q 304 857 307 899 l 244 857 q 281 968 247 926 q 369 1010 315 1010 q 427 995 401 1010 q 473 962 453 981 q 512 929 493 943 q 551 915 531 915 q 603 938 583 915 q 624 1001 622 961 l 683 1001 q 647 893 682 935 q 558 851 613 851 z "
  },
  ű: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 533 843 l 667 1015 l 776 1015 l 621 843 l 533 843 m 307 843 l 442 1015 l 551 1015 l 394 843 l 307 843 z "
  },
  ȗ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 253 843 q 316 974 256 926 q 464 1021 376 1021 q 612 974 551 1021 q 675 843 672 926 l 606 843 q 563 929 604 897 q 464 961 522 961 q 366 929 407 961 q 322 843 325 897 l 253 843 z "
  },
  ū: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 250 896 l 250 961 l 678 961 l 678 896 l 250 896 z "
  },
  ṻ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 z "
  },
  ų: {
    ha: 933,
    x_min: 131,
    x_max: 825,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 707 -306 q 596 -269 638 -306 q 554 -174 554 -233 q 572 -103 554 -140 q 632 -31 589 -67 q 750 38 675 6 l 796 0 q 692 -58 729 -29 q 641 -113 656 -86 q 626 -167 626 -140 q 652 -225 626 -206 q 717 -244 678 -244 q 763 -237 740 -244 q 803 -218 786 -231 l 825 -272 q 770 -297 800 -287 q 707 -306 740 -306 z "
  },
  ů: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 463 826 q 388 846 421 826 q 337 897 356 865 q 318 968 318 929 q 338 1040 318 1007 q 390 1094 357 1074 q 463 1114 422 1114 q 537 1094 504 1114 q 589 1040 569 1074 q 608 968 608 1007 q 589 897 608 929 q 537 846 569 865 q 463 826 504 826 m 463 875 q 531 902 504 875 q 557 968 557 929 q 531 1037 557 1008 q 463 1065 504 1065 q 396 1038 422 1065 q 369 968 369 1010 q 395 901 369 928 q 463 875 421 875 z "
  },
  ũ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 m 558 851 q 501 865 526 851 q 456 898 476 879 q 417 931 436 917 q 376 946 397 946 q 326 922 344 946 q 304 857 307 899 l 244 857 q 281 968 247 926 q 369 1010 315 1010 q 427 995 401 1010 q 473 962 453 981 q 512 929 493 943 q 551 915 531 915 q 603 938 583 915 q 624 1001 622 961 l 683 1001 q 647 893 682 935 q 558 851 613 851 z "
  },
  ṹ: {
    ha: 933,
    x_min: 131,
    x_max: 796,
    o: "m 439 -7 q 276 28 346 -7 q 169 132 207 63 q 131 306 131 201 l 131 729 l 229 729 l 229 317 q 287 141 229 200 q 449 82 344 82 q 581 113 525 82 q 667 204 638 144 q 697 347 697 264 l 697 729 l 796 729 l 796 0 l 701 0 l 701 200 l 717 164 q 609 38 682 83 q 439 -7 536 -7 z "
  },
  v: {
    ha: 753,
    x_min: 1,
    x_max: 751,
    o: "m 325 0 l 1 729 l 104 729 l 401 53 l 353 53 l 654 729 l 751 729 l 426 0 l 325 0 z "
  },
  w: {
    ha: 1221,
    x_min: 11,
    x_max: 1210,
    o: "m 286 0 l 11 729 l 106 729 l 356 53 l 313 53 l 569 729 l 654 729 l 908 53 l 865 53 l 1119 729 l 1210 729 l 933 0 l 840 0 l 596 636 l 625 636 l 379 0 l 286 0 z "
  },
  ẃ: {
    ha: 1221,
    x_min: 11,
    x_max: 1210,
    o: "m 286 0 l 11 729 l 106 729 l 356 53 l 313 53 l 569 729 l 654 729 l 908 53 l 865 53 l 1119 729 l 1210 729 l 933 0 l 840 0 l 596 636 l 625 636 l 379 0 l 286 0 m 518 842 l 708 1014 l 840 1014 l 615 842 l 518 842 z "
  },
  ŵ: {
    ha: 1221,
    x_min: 11,
    x_max: 1210,
    o: "m 286 0 l 11 729 l 106 729 l 356 53 l 313 53 l 569 729 l 654 729 l 908 53 l 865 53 l 1119 729 l 1210 729 l 933 0 l 840 0 l 596 636 l 625 636 l 379 0 l 286 0 m 379 842 l 558 1014 l 658 1014 l 838 842 l 746 842 l 569 989 l 647 989 l 471 842 l 379 842 z "
  },
  ẅ: {
    ha: 1221,
    x_min: 11,
    x_max: 1210,
    o: "m 286 0 l 11 729 l 106 729 l 356 53 l 313 53 l 569 729 l 654 729 l 908 53 l 865 53 l 1119 729 l 1210 729 l 933 0 l 840 0 l 596 636 l 625 636 l 379 0 l 286 0 m 732 874 q 690 890 708 874 q 672 933 672 907 q 690 976 672 960 q 732 993 708 993 q 774 976 757 993 q 792 933 792 960 q 774 890 792 907 q 732 874 757 874 m 485 874 q 442 890 460 874 q 425 933 425 907 q 442 976 425 960 q 485 993 460 993 q 526 976 508 993 q 544 933 544 960 q 526 890 544 907 q 485 874 508 874 z "
  },
  ẁ: {
    ha: 1221,
    x_min: 11,
    x_max: 1210,
    o: "m 286 0 l 11 729 l 106 729 l 356 53 l 313 53 l 569 729 l 654 729 l 908 53 l 865 53 l 1119 729 l 1210 729 l 933 0 l 840 0 l 596 636 l 625 636 l 379 0 l 286 0 m 601 842 l 376 1014 l 508 1014 l 699 842 l 601 842 z "
  },
  x: {
    ha: 742,
    x_min: 26,
    x_max: 715,
    o: "m 26 0 l 335 400 l 333 351 l 40 729 l 151 729 l 392 417 l 350 418 l 590 729 l 699 729 l 403 347 l 404 400 l 715 0 l 603 0 l 349 333 l 388 328 l 138 0 l 26 0 z "
  },
  y: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 z "
  },
  ý: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 267 843 l 457 1015 l 589 1015 l 364 843 l 267 843 z "
  },
  ŷ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 128 843 l 307 1015 l 407 1015 l 586 843 l 494 843 l 318 990 l 396 990 l 219 843 l 128 843 z "
  },
  ÿ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 481 875 q 439 892 457 875 q 421 935 421 908 q 439 978 421 961 q 481 994 457 994 q 523 978 506 994 q 540 935 540 961 q 523 892 540 908 q 481 875 506 875 m 233 875 q 191 892 208 875 q 174 935 174 908 q 191 978 174 961 q 233 994 208 994 q 275 978 257 994 q 293 935 293 961 q 275 892 293 908 q 233 875 257 875 z "
  },
  ẏ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 357 875 q 310 894 329 875 q 290 942 290 914 q 310 990 290 971 q 357 1008 329 1008 q 404 990 385 1008 q 424 942 424 971 q 404 894 424 914 q 357 875 385 875 z "
  },
  ỵ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 539 -264 q 497 -247 515 -264 q 479 -204 479 -231 q 497 -161 479 -178 q 539 -144 515 -144 q 581 -161 564 -144 q 599 -204 599 -178 q 581 -247 599 -231 q 539 -264 564 -264 z "
  },
  ỳ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 350 843 l 125 1015 l 257 1015 l 447 843 l 350 843 z "
  },
  ỷ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 375 833 l 340 876 q 402 919 382 896 q 422 975 422 943 q 401 1024 422 1004 q 346 1043 381 1043 q 263 1017 303 1043 l 239 1065 q 294 1092 263 1083 q 354 1101 325 1101 q 449 1069 413 1101 q 486 982 486 1036 q 459 897 486 933 q 375 833 432 860 z "
  },
  ȳ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 143 896 l 143 961 l 571 961 l 571 896 l 143 896 z "
  },
  ỹ: {
    ha: 753,
    x_min: -35,
    x_max: 751,
    o: "m 143 -276 q 45 -260 92 -276 q -35 -210 -1 -243 l 11 -136 q 72 -177 39 -162 q 144 -192 104 -192 q 228 -165 193 -192 q 296 -69 264 -137 l 343 38 l 354 53 l 654 729 l 751 729 l 386 -87 q 319 -200 356 -158 q 239 -259 282 -242 q 143 -276 196 -276 m 338 -21 l 1 729 l 104 729 l 401 60 l 338 -21 m 451 851 q 394 865 419 851 q 349 898 369 879 q 310 931 329 917 q 269 946 290 946 q 219 922 238 946 q 197 857 200 899 l 138 857 q 174 968 140 926 q 263 1010 208 1010 q 320 995 294 1010 q 366 962 346 981 q 405 929 386 943 q 444 915 424 915 q 496 938 476 915 q 517 1001 515 961 l 576 1001 q 540 893 575 935 q 451 851 506 851 z "
  },
  z: {
    ha: 710,
    x_min: 58,
    x_max: 653,
    o: "m 58 0 l 58 65 l 544 681 l 565 647 l 67 647 l 67 729 l 643 729 l 643 665 l 158 49 l 133 82 l 653 82 l 653 0 l 58 0 z "
  },
  ź: {
    ha: 710,
    x_min: 58,
    x_max: 653,
    o: "m 58 0 l 58 65 l 544 681 l 565 647 l 67 647 l 67 729 l 643 729 l 643 665 l 158 49 l 133 82 l 653 82 l 653 0 l 58 0 m 265 843 l 456 1015 l 588 1015 l 363 843 l 265 843 z "
  },
  ž: {
    ha: 710,
    x_min: 58,
    x_max: 653,
    o: "m 58 0 l 58 65 l 544 681 l 565 647 l 67 647 l 67 729 l 643 729 l 643 665 l 158 49 l 133 82 l 653 82 l 653 0 l 58 0 m 306 843 l 126 1015 l 218 1015 l 394 869 l 317 869 l 493 1015 l 585 1015 l 406 843 l 306 843 z "
  },
  ż: {
    ha: 710,
    x_min: 58,
    x_max: 653,
    o: "m 58 0 l 58 65 l 544 681 l 565 647 l 67 647 l 67 729 l 643 729 l 643 665 l 158 49 l 133 82 l 653 82 l 653 0 l 58 0 m 356 875 q 308 894 328 875 q 289 942 289 914 q 308 990 289 971 q 356 1008 328 1008 q 403 990 383 1008 q 422 942 422 971 q 403 894 422 914 q 356 875 383 875 z "
  },
  ẓ: {
    ha: 710,
    x_min: 58,
    x_max: 653,
    o: "m 58 0 l 58 65 l 544 681 l 565 647 l 67 647 l 67 729 l 643 729 l 643 665 l 158 49 l 133 82 l 653 82 l 653 0 l 58 0 m 365 -264 q 324 -247 342 -264 q 306 -204 306 -231 q 324 -161 306 -178 q 365 -144 342 -144 q 408 -161 390 -144 q 425 -204 425 -178 q 408 -247 425 -231 q 365 -264 390 -264 z "
  },
  ﬁ: {
    ha: 846,
    x_min: 24,
    x_max: 731,
    o: "m 154 0 l 154 821 q 211 978 154 918 q 375 1038 268 1038 q 456 1026 417 1038 q 521 992 494 1015 l 488 918 q 439 945 467 936 q 379 954 411 954 q 283 919 317 954 q 250 817 250 885 l 250 706 l 253 660 l 253 0 l 154 0 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 608 0 l 608 729 l 707 729 l 707 0 l 608 0 m 658 890 q 607 911 628 890 q 586 961 586 932 q 607 1010 586 990 q 658 1031 628 1031 q 710 1011 689 1031 q 731 963 731 992 q 710 911 731 932 q 658 890 690 890 z "
  },
  ﬂ: {
    ha: 846,
    x_min: 24,
    x_max: 707,
    o: "m 154 0 l 154 821 q 211 978 154 918 q 375 1038 268 1038 q 456 1026 417 1038 q 521 992 494 1015 l 488 918 q 439 945 467 936 q 379 954 411 954 q 283 919 317 954 q 250 817 250 885 l 250 706 l 253 660 l 253 0 l 154 0 m 24 647 l 24 729 l 475 729 l 475 647 l 24 647 m 608 0 l 608 1031 l 707 1031 l 707 0 l 608 0 z "
  },
  ª: {
    ha: 557,
    x_min: 57,
    x_max: 458,
    o: "m 390 597 l 390 692 l 385 707 l 385 867 q 353 951 385 924 q 257 978 321 978 q 170 965 211 978 q 100 926 129 951 l 71 975 q 158 1019 106 1003 q 264 1036 210 1036 q 408 994 358 1036 q 458 864 458 951 l 458 597 l 390 597 m 228 593 q 101 629 144 593 q 57 719 57 665 q 99 808 57 772 q 239 844 140 844 l 399 844 l 399 796 l 247 796 q 154 776 182 796 q 126 724 126 756 q 157 665 126 686 q 243 644 188 644 q 332 665 297 644 q 385 725 367 686 l 399 681 q 340 617 383 642 q 228 593 296 593 z "
  },
  º: {
    ha: 575,
    x_min: 47,
    x_max: 528,
    o: "m 288 593 q 164 622 218 593 q 78 701 110 650 q 47 815 47 751 q 78 930 47 881 q 164 1008 110 979 q 288 1036 218 1036 q 411 1008 357 1036 q 497 930 465 979 q 528 815 528 881 q 497 701 528 751 q 411 622 465 650 q 288 593 357 593 m 288 656 q 408 700 361 656 q 456 815 456 744 q 408 931 456 888 q 288 975 361 975 q 167 931 214 975 q 119 815 119 886 q 167 700 119 744 q 288 656 214 656 z "
  },
  А: {
    ha: 1033,
    x_min: 22,
    x_max: 1013,
    o: "m 21 0 l 465 972 l 567 972 l 1011 0 l 903 0 l 494 913 l 536 913 l 128 0 l 21 0 m 196 260 l 226 343 l 792 343 l 822 260 l 196 260 z "
  },
  Б: {
    ha: 1008,
    x_min: 164,
    x_max: 935,
    o: "m 164 0 l 164 972 l 875 972 l 875 885 l 265 885 l 265 567 l 583 567 q 845 497 756 567 q 935 290 935 426 q 838 75 935 150 q 561 0 742 0 l 164 0 m 265 82 l 560 82 q 763 134 694 82 q 832 286 832 186 q 560 485 832 485 l 265 485 l 265 82 z "
  },
  В: {
    ha: 1040,
    x_min: 164,
    x_max: 947,
    o: "m 164 0 l 164 972 l 568 972 q 810 909 722 972 q 899 724 899 846 q 814 541 899 603 q 592 479 729 479 l 615 514 q 863 450 778 514 q 947 263 947 386 q 859 69 947 138 q 594 0 771 0 l 164 0 m 265 82 l 594 82 q 782 128 718 82 q 846 269 846 174 q 782 408 846 364 q 594 453 718 453 l 265 453 l 265 82 m 265 532 l 563 532 q 735 577 675 532 q 796 711 796 622 q 735 845 796 800 q 563 890 675 890 l 265 890 l 265 532 z "
  },
  Г: {
    ha: 794,
    x_min: 164,
    x_max: 782,
    o: "m 164 0 l 164 972 l 782 972 l 782 883 l 238 883 l 264 910 l 265 0 l 164 0 z "
  },
  Ѓ: {
    ha: 794,
    x_min: 164,
    x_max: 782,
    o: "m 164 0 l 164 972 l 782 972 l 782 883 l 238 883 l 264 910 l 265 0 l 164 0 z "
  },
  Ґ: {
    ha: 799,
    x_min: 164,
    x_max: 782,
    o: "m 164 0 l 164 972 l 686 972 l 686 1172 l 782 1172 l 782 883 l 265 883 l 265 0 l 164 0 z "
  },
  Д: {
    ha: 1103,
    x_min: 15,
    x_max: 1057,
    o: "m 810 49 l 810 883 l 344 883 l 336 647 q 323 437 332 538 q 295 256 314 336 q 245 126 276 176 q 164 68 214 76 l 51 89 q 144 129 107 86 q 201 250 181 172 q 231 432 221 328 q 244 657 240 536 l 256 972 l 911 972 l 911 49 l 810 49 m 15 -218 l 17 89 l 1057 89 l 1057 -218 l 961 -218 l 961 0 l 113 0 l 111 -218 l 15 -218 z "
  },
  Е: {
    ha: 915,
    x_min: 164,
    x_max: 851,
    o: "m 256 538 l 769 538 l 769 450 l 256 450 l 256 538 m 267 89 l 851 89 l 851 0 l 164 0 l 164 972 l 831 972 l 831 883 l 267 883 l 267 89 z "
  },
  Ѐ: {
    ha: 915,
    x_min: 164,
    x_max: 851,
    o: "m 256 538 l 769 538 l 769 450 l 256 450 l 256 538 m 267 89 l 851 89 l 851 0 l 164 0 l 164 972 l 831 972 l 831 883 l 267 883 l 267 89 z "
  },
  Ё: {
    ha: 915,
    x_min: 164,
    x_max: 851,
    o: "m 256 538 l 769 538 l 769 450 l 256 450 l 256 538 m 267 89 l 851 89 l 851 0 l 164 0 l 164 972 l 831 972 l 831 883 l 267 883 l 267 89 z "
  },
  Ж: {
    ha: 1404,
    x_min: 33,
    x_max: 1371,
    o: "m 1251 0 l 928 485 l 1015 535 l 1371 0 l 1251 0 m 721 446 l 721 536 l 999 536 l 999 446 l 721 446 m 1019 475 l 925 492 l 1235 972 l 1346 972 l 1019 475 m 153 0 l 33 0 l 389 535 l 476 485 l 153 0 m 753 0 l 653 0 l 653 972 l 753 972 l 753 0 m 683 446 l 406 446 l 406 536 l 683 536 l 683 446 m 385 475 l 58 972 l 169 972 l 478 492 l 385 475 z "
  },
  З: {
    ha: 883,
    x_min: 49,
    x_max: 792,
    o: "m 49 117 l 86 190 q 230 108 150 135 q 390 80 310 81 q 538 103 471 79 q 647 173 606 126 q 689 286 689 219 q 622 417 689 371 q 435 463 554 463 l 226 463 l 226 546 l 429 546 q 590 590 532 546 q 647 711 647 633 q 615 806 647 767 q 526 867 582 846 q 400 891 469 889 q 256 873 331 893 q 113 810 182 853 l 79 894 q 258 966 165 946 q 439 979 351 986 q 597 939 526 972 q 708 851 667 906 q 750 722 750 797 q 715 600 750 653 q 616 519 679 547 q 467 490 553 490 l 472 521 q 641 490 569 521 q 752 403 713 460 q 792 272 792 347 q 756 147 792 201 q 659 55 721 92 q 521 2 597 18 q 361 -7 444 -14 q 197 30 278 0 q 49 117 117 60 z "
  },
  И: {
    ha: 1144,
    x_min: 164,
    x_max: 981,
    o: "m 164 0 l 164 972 l 265 972 l 265 167 l 888 972 l 981 972 l 981 0 l 879 0 l 879 804 l 257 0 l 164 0 z "
  },
  Й: {
    ha: 1144,
    x_min: 164,
    x_max: 981,
    o: "m 164 0 l 164 972 l 265 972 l 265 167 l 888 972 l 981 972 l 981 0 l 879 0 l 879 804 l 257 0 l 164 0 m 569 1043 q 405 1090 465 1043 q 343 1222 344 1138 l 419 1222 q 462 1135 421 1167 q 569 1103 503 1103 q 677 1135 636 1103 q 719 1222 718 1167 l 796 1222 q 733 1090 794 1138 q 569 1043 672 1043 z "
  },
  Ѝ: {
    ha: 1144,
    x_min: 164,
    x_max: 981,
    o: "m 164 0 l 164 972 l 265 972 l 265 167 l 888 972 l 981 972 l 981 0 l 879 0 l 879 804 l 257 0 l 164 0 z "
  },
  "Ҋ": {
    ha: 1178,
    x_min: 164,
    x_max: 1119,
    o: "m 164 0 l 164 972 l 265 972 l 265 167 l 888 972 l 981 972 l 981 0 l 879 0 l 879 804 l 257 0 l 164 0 m 569 1043 q 405 1090 465 1043 q 343 1222 344 1138 l 419 1222 q 462 1135 421 1167 q 569 1103 503 1103 q 677 1135 636 1103 q 719 1222 718 1167 l 796 1222 q 733 1090 794 1138 q 569 1043 672 1043 m 943 -218 l 1007 28 l 1050 0 l 879 0 l 879 89 l 1118 89 l 1025 -218 l 943 -218 z "
  },
  К: {
    ha: 975,
    x_min: 164,
    x_max: 947,
    o: "m 829 0 l 456 485 l 539 535 l 947 0 l 829 0 m 164 0 l 164 972 l 264 972 l 264 0 l 164 0 m 233 446 l 233 536 l 538 536 l 538 446 l 233 446 m 547 475 l 453 492 l 815 972 l 926 972 l 547 475 z "
  },
  Ќ: {
    ha: 975,
    x_min: 164,
    x_max: 947,
    o: "m 829 0 l 456 485 l 539 535 l 947 0 l 829 0 m 164 0 l 164 972 l 264 972 l 264 0 l 164 0 m 233 446 l 233 536 l 538 536 l 538 446 l 233 446 m 547 475 l 453 492 l 815 972 l 926 972 l 547 475 z "
  },
  Л: {
    ha: 1090,
    x_min: 15,
    x_max: 926,
    o: "m 93 -8 q 56 -6 74 -8 q 15 1 38 -4 l 24 93 q 69 88 47 88 q 170 137 132 88 q 228 290 208 186 q 253 556 247 393 l 267 972 l 926 972 l 926 0 l 825 0 l 825 911 l 851 883 l 332 883 l 357 913 l 344 558 q 324 306 339 413 q 279 130 308 200 q 204 26 250 60 q 93 -8 158 -8 z "
  },
  М: {
    ha: 1338,
    x_min: 164,
    x_max: 1174,
    o: "m 164 0 l 164 972 l 249 972 l 693 214 l 649 214 l 1089 972 l 1174 972 l 1174 0 l 1075 0 l 1075 818 l 1099 818 l 693 124 l 644 124 l 236 818 l 263 818 l 263 0 l 164 0 z "
  },
  Н: {
    ha: 1140,
    x_min: 164,
    x_max: 976,
    o: "m 875 972 l 976 972 l 976 0 l 875 0 l 875 972 m 267 0 l 164 0 l 164 972 l 267 972 l 267 0 m 885 449 l 256 449 l 256 539 l 885 539 l 885 449 z "
  },
  О: {
    ha: 1182,
    x_min: 79,
    x_max: 1101,
    o: "m 590 -8 q 387 28 481 -8 q 224 133 293 65 q 117 290 156 200 q 79 486 79 379 q 117 683 79 593 q 224 840 156 772 q 386 944 293 907 q 590 981 479 981 q 793 944 700 981 q 955 840 886 907 q 1062 683 1024 774 q 1100 486 1100 593 q 1062 289 1100 379 q 955 132 1024 199 q 793 28 886 65 q 590 -8 700 -8 m 590 83 q 752 113 678 83 q 881 198 826 143 q 967 326 936 253 q 997 486 997 399 q 967 647 997 574 q 881 774 936 719 q 752 859 826 829 q 590 889 678 889 q 428 859 503 889 q 298 774 353 829 q 212 647 243 719 q 181 486 181 574 q 212 326 181 400 q 298 198 243 253 q 428 113 353 143 q 590 83 503 83 z "
  },
  П: {
    ha: 1146,
    x_min: 164,
    x_max: 982,
    o: "m 164 0 l 164 972 l 982 972 l 982 0 l 881 0 l 881 911 l 907 883 l 239 883 l 265 911 l 265 0 l 164 0 z "
  },
  Р: {
    ha: 985,
    x_min: 164,
    x_max: 925,
    o: "m 164 0 l 164 972 l 528 972 q 740 933 651 972 q 877 819 829 893 q 925 639 925 744 q 877 462 925 536 q 740 347 829 388 q 528 307 651 307 l 221 307 l 267 356 l 267 0 l 164 0 m 267 347 l 221 397 l 525 397 q 747 460 671 397 q 822 639 822 524 q 747 819 822 756 q 525 883 671 883 l 221 883 l 267 932 l 267 347 z "
  },
  С: {
    ha: 994,
    x_min: 81,
    x_max: 946,
    o: "m 589 -8 q 386 28 479 -8 q 225 132 293 65 q 119 289 157 199 q 81 486 81 379 q 119 683 81 593 q 226 840 157 774 q 388 944 294 907 q 590 981 481 981 q 789 945 696 981 q 946 839 882 910 l 881 774 q 749 862 821 835 q 593 889 676 889 q 431 859 506 889 q 300 774 356 829 q 213 647 244 719 q 182 486 182 574 q 213 326 182 399 q 300 198 244 253 q 431 113 356 143 q 593 83 506 83 q 749 111 676 83 q 881 200 821 139 l 946 135 q 789 28 882 64 q 589 -8 696 -8 z "
  },
  Т: {
    ha: 817,
    x_min: 15,
    x_max: 800,
    o: "m 357 0 l 357 911 l 385 883 l 15 883 l 15 972 l 800 972 l 800 883 l 432 883 l 458 911 l 458 0 l 357 0 z "
  },
  У: {
    ha: 944,
    x_min: 29,
    x_max: 928,
    o: "m 147 96 q 281 83 218 68 q 396 181 343 97 l 443 256 l 453 268 l 825 972 l 928 972 l 486 158 q 381 32 442 74 q 253 -12 321 -10 q 118 13 186 -15 l 147 96 m 450 175 l 29 972 l 139 972 l 506 260 l 450 175 z "
  },
  Ў: {
    ha: 944,
    x_min: 29,
    x_max: 928,
    o: "m 147 96 q 281 83 218 68 q 396 181 343 97 l 443 256 l 453 268 l 825 972 l 928 972 l 486 158 q 381 32 442 74 q 253 -12 321 -10 q 118 13 186 -15 l 147 96 m 450 175 l 29 972 l 139 972 l 506 260 l 450 175 m 463 1043 q 298 1090 358 1043 q 236 1222 238 1138 l 313 1222 q 355 1135 314 1167 q 463 1103 396 1103 q 570 1135 529 1103 q 613 1222 611 1167 l 689 1222 q 626 1090 688 1138 q 463 1043 565 1043 z "
  },
  Ф: {
    ha: 1274,
    x_min: 69,
    x_max: 1204,
    o: "m 624 67 q 326 116 450 67 q 136 260 203 165 q 69 488 69 354 q 136 715 69 621 q 326 858 203 808 q 624 908 450 908 q 631 908 625 908 q 642 908 636 908 q 649 908 647 908 q 947 858 824 908 q 1138 715 1071 808 q 1204 488 1204 621 q 1138 260 1204 354 q 949 116 1072 165 q 653 67 825 67 q 644 67 650 67 q 631 67 638 67 q 624 67 625 67 m 635 147 q 640 147 638 147 q 644 147 643 147 q 894 188 790 149 q 1051 303 997 228 q 1106 488 1106 379 q 1051 672 1106 597 q 894 787 996 747 q 647 826 792 826 q 642 826 646 826 q 635 826 638 826 q 383 788 488 826 q 224 673 279 749 q 168 488 168 597 q 224 301 168 376 q 385 186 281 225 q 635 147 490 147 m 589 -33 l 589 1006 l 685 1006 l 685 -33 l 589 -33 z "
  },
  Х: {
    ha: 903,
    x_min: 31,
    x_max: 872,
    o: "m 56 972 l 174 972 l 450 588 l 725 972 l 846 972 l 514 506 l 872 0 l 751 0 l 450 418 l 149 0 l 31 0 l 388 501 l 56 972 z "
  },
  Ч: {
    ha: 1015,
    x_min: 82,
    x_max: 850,
    o: "m 768 411 q 602 354 685 374 q 443 335 519 335 q 177 417 272 335 q 82 651 82 500 l 82 972 l 183 972 l 183 663 q 255 488 183 550 q 453 425 326 425 q 608 445 528 425 q 768 503 689 465 l 768 411 m 750 0 l 750 972 l 850 972 l 850 0 l 750 0 z "
  },
  Ц: {
    ha: 1149,
    x_min: 164,
    x_max: 1108,
    o: "m 164 0 l 164 972 l 265 972 l 265 89 l 853 89 l 853 972 l 954 972 l 954 0 l 164 0 m 1013 -228 l 1013 28 l 1039 0 l 853 0 l 853 89 l 1108 89 l 1108 -228 l 1013 -228 z "
  },
  Ш: {
    ha: 1519,
    x_min: 164,
    x_max: 1356,
    o: "m 735 89 l 710 61 l 710 972 l 811 972 l 811 61 l 783 89 l 1282 89 l 1254 61 l 1254 972 l 1356 972 l 1356 0 l 164 0 l 164 972 l 265 972 l 265 61 l 239 89 l 735 89 z "
  },
  Щ: {
    ha: 1551,
    x_min: 164,
    x_max: 1507,
    o: "m 735 89 l 710 61 l 710 972 l 811 972 l 811 61 l 783 89 l 1282 89 l 1254 61 l 1254 972 l 1356 972 l 1356 0 l 164 0 l 164 972 l 265 972 l 265 61 l 239 89 l 735 89 m 1411 -218 l 1411 28 l 1439 0 l 1253 0 l 1253 89 l 1507 89 l 1507 -218 l 1411 -218 z "
  },
  Џ: {
    ha: 1119,
    x_min: 164,
    x_max: 954,
    o: "m 954 972 l 954 0 l 607 0 l 607 -228 l 511 -228 l 511 0 l 164 0 l 164 972 l 265 972 l 265 89 l 853 89 l 853 972 l 954 972 z "
  },
  Ь: {
    ha: 986,
    x_min: 164,
    x_max: 925,
    o: "m 571 625 q 834 548 743 625 q 925 319 925 471 q 828 81 925 163 q 550 0 731 0 l 164 0 l 164 972 l 265 972 l 265 625 l 571 625 m 547 82 q 752 142 682 82 q 822 317 822 201 q 753 487 822 432 q 547 542 683 542 l 265 542 l 265 82 l 547 82 z "
  },
  Ъ: {
    ha: 1139,
    x_min: 15,
    x_max: 1078,
    o: "m 725 625 q 987 548 896 625 q 1078 319 1078 471 q 981 81 1078 163 q 703 0 883 0 l 318 0 l 318 883 l 15 883 l 15 972 l 419 972 l 419 625 l 725 625 m 701 82 q 906 142 836 82 q 976 317 976 201 q 907 487 976 432 q 701 542 838 542 l 419 542 l 419 82 l 701 82 z "
  },
  Ы: {
    ha: 1358,
    x_min: 164,
    x_max: 1194,
    o: "m 571 625 q 834 548 743 625 q 925 319 925 471 q 828 81 925 163 q 550 0 731 0 l 164 0 l 164 972 l 265 972 l 265 625 l 571 625 m 547 82 q 752 142 682 82 q 822 317 822 201 q 753 487 822 432 q 547 542 683 542 l 265 542 l 265 82 l 547 82 m 1093 0 l 1093 972 l 1194 972 l 1194 0 l 1093 0 z "
  },
  Љ: {
    ha: 1647,
    x_min: 15,
    x_max: 1586,
    o: "m 93 -8 q 56 -6 74 -8 q 15 1 38 -4 l 24 93 q 69 88 47 88 q 170 137 132 88 q 228 290 208 186 q 253 556 247 393 l 267 972 l 926 972 l 926 0 l 825 0 l 825 911 l 851 883 l 332 883 l 357 913 l 344 558 q 324 306 339 413 q 279 130 308 200 q 204 26 250 60 q 93 -8 158 -8 m 1232 625 q 1495 548 1404 625 q 1586 319 1586 471 q 1489 81 1586 163 q 1211 0 1392 0 l 825 0 l 825 972 l 926 972 l 926 625 l 1232 625 m 1208 82 q 1413 142 1343 82 q 1483 317 1483 201 q 1414 487 1483 432 q 1208 542 1344 542 l 926 542 l 926 82 l 1208 82 z "
  },
  Њ: {
    ha: 1644,
    x_min: 164,
    x_max: 1589,
    o: "m 164 0 l 164 972 l 265 972 l 265 572 l 853 572 l 853 972 l 954 972 l 954 0 l 853 0 l 853 483 l 265 483 l 265 0 l 164 0 m 954 54 l 928 82 l 1232 82 q 1419 138 1353 82 q 1486 290 1486 193 q 1420 441 1486 389 q 1232 493 1354 493 l 928 493 l 954 522 l 954 54 m 853 0 l 853 972 l 954 972 l 954 544 l 928 576 l 1257 576 q 1501 503 1414 576 q 1589 296 1589 429 q 1496 78 1589 157 q 1238 0 1403 0 l 853 0 z "
  },
  Ѕ: {
    ha: 871,
    x_min: 75,
    x_max: 799,
    o: "m 436 -8 q 228 27 328 -8 q 75 118 129 63 l 115 197 q 253 113 167 147 q 436 79 340 79 q 585 102 528 79 q 670 164 643 125 q 697 250 697 203 q 665 342 697 307 q 579 397 632 376 q 463 432 526 417 q 335 465 399 447 q 217 511 271 482 q 131 588 164 540 q 99 714 99 636 q 137 847 99 786 q 254 944 175 907 q 457 981 333 981 q 619 958 539 981 q 758 894 700 935 l 724 813 q 591 874 661 854 q 456 893 521 893 q 311 869 368 893 q 227 806 254 846 q 200 717 200 767 q 233 625 200 660 q 319 571 265 590 q 436 536 372 551 q 563 503 500 521 q 680 456 626 485 q 766 381 733 428 q 799 257 799 333 q 760 126 799 186 q 641 28 721 65 q 436 -8 561 -8 z "
  },
  Є: {
    ha: 982,
    x_min: 82,
    x_max: 933,
    o: "m 688 519 l 688 435 l 150 435 l 150 519 l 688 519 m 565 -8 q 374 28 463 -8 q 220 132 286 65 q 118 289 154 199 q 82 486 82 379 q 118 683 82 593 q 220 840 154 774 q 374 944 286 907 q 565 981 463 981 q 773 944 678 981 q 933 838 868 908 l 869 772 q 733 862 808 835 q 571 889 657 889 q 417 858 488 889 q 295 774 347 828 q 214 647 243 719 q 185 486 185 574 q 214 326 185 399 q 295 199 243 253 q 417 114 347 144 q 571 83 488 83 q 733 111 657 83 q 869 200 808 139 l 933 135 q 773 28 868 64 q 565 -8 678 -8 z "
  },
  Э: {
    ha: 981,
    x_min: 49,
    x_max: 899,
    o: "m 293 453 l 293 538 l 831 538 l 831 453 l 293 453 m 415 981 q 607 944 519 981 q 760 840 694 907 q 863 683 826 774 q 899 486 899 593 q 863 289 899 379 q 760 132 826 199 q 607 28 694 65 q 415 -8 519 -8 q 208 28 304 -8 q 49 135 113 64 l 113 200 q 249 110 174 138 q 411 83 324 83 q 563 114 493 83 q 685 199 633 144 q 767 326 738 253 q 796 486 796 399 q 767 647 796 574 q 685 774 738 719 q 563 858 633 828 q 411 889 493 889 q 249 861 324 889 q 113 772 174 833 l 49 838 q 208 944 113 908 q 415 981 304 981 z "
  },
  І: {
    ha: 429,
    x_min: 164,
    x_max: 265,
    o: "m 164 0 l 164 972 l 265 972 l 265 0 l 164 0 z "
  },
  Ї: {
    ha: 419,
    x_min: 26,
    x_max: 393,
    o: "m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 m 333 1083 q 292 1100 310 1083 q 274 1143 274 1117 q 292 1186 274 1169 q 333 1203 310 1203 q 376 1186 358 1203 q 393 1143 393 1169 q 376 1100 393 1117 q 333 1083 358 1083 m 86 1083 q 44 1100 61 1083 q 26 1143 26 1117 q 44 1186 26 1169 q 86 1203 61 1203 q 128 1186 110 1203 q 146 1143 146 1169 q 128 1100 146 1117 q 86 1083 110 1083 z "
  },
  Ј: {
    ha: 732,
    x_min: 29,
    x_max: 582,
    o: "m 299 -8 q 145 28 217 -8 q 31 131 74 64 l 90 200 q 183 111 131 142 q 300 81 236 81 q 481 294 481 81 l 481 883 l 125 883 l 125 972 l 582 972 l 582 299 q 510 68 582 144 q 299 -8 439 -8 z "
  },
  Ћ: {
    ha: 1160,
    x_min: 15,
    x_max: 1086,
    o: "m 357 0 l 357 911 l 385 883 l 15 883 l 15 972 l 825 972 l 825 883 l 432 883 l 458 911 l 458 0 l 357 0 m 438 510 q 603 565 525 547 q 753 583 681 583 q 994 506 903 583 q 1086 271 1086 429 l 1086 0 l 985 0 l 985 260 q 917 433 985 374 q 733 492 850 492 q 438 414 604 492 l 438 510 z "
  },
  Ю: {
    ha: 1517,
    x_min: 164,
    x_max: 1435,
    o: "m 164 0 l 164 972 l 265 972 l 265 540 l 517 540 l 517 447 l 265 447 l 265 0 l 164 0 m 949 -8 q 756 28 844 -8 q 602 132 668 65 q 500 289 536 199 q 464 486 464 379 q 500 683 464 593 q 602 840 536 774 q 756 944 668 907 q 949 981 844 981 q 1142 944 1053 981 q 1296 840 1231 907 q 1398 683 1361 774 q 1435 486 1435 593 q 1398 289 1435 379 q 1296 132 1361 199 q 1142 28 1231 65 q 949 -8 1053 -8 m 949 83 q 1101 113 1031 83 q 1222 197 1171 143 q 1303 324 1274 251 q 1332 486 1332 397 q 1303 648 1332 575 q 1222 775 1274 721 q 1101 859 1171 829 q 949 889 1031 889 q 798 859 868 889 q 676 775 728 829 q 596 648 625 721 q 567 486 567 575 q 596 324 567 397 q 676 197 625 251 q 798 113 728 143 q 949 83 868 83 z "
  },
  Я: {
    ha: 1017,
    x_min: 92,
    x_max: 853,
    o: "m 751 0 l 751 322 l 779 294 l 461 294 q 262 335 344 294 q 135 449 179 375 q 92 628 92 524 q 139 816 92 739 q 273 933 186 893 q 475 972 360 972 l 853 972 l 853 0 l 751 0 m 92 0 l 331 342 l 436 342 l 201 0 l 92 0 m 751 351 l 751 913 l 779 883 l 479 883 q 269 819 343 883 q 194 631 194 754 q 264 447 194 511 q 469 382 333 382 l 779 382 l 751 351 z "
  },
  Ђ: {
    ha: 1146,
    x_min: 17,
    x_max: 1088,
    o: "m 360 0 l 360 911 l 386 883 l 17 883 l 17 972 l 831 972 l 831 883 l 433 883 l 460 911 l 460 0 l 360 0 m 653 7 l 667 93 q 780 82 724 79 q 883 108 836 85 q 958 176 931 132 q 986 288 986 219 q 940 425 986 375 q 817 491 894 475 q 641 490 739 507 q 439 424 543 472 l 440 517 q 687 582 569 569 q 894 566 804 594 q 1036 469 985 538 q 1088 290 1088 400 q 1051 133 1088 196 q 951 36 1014 69 q 812 -4 889 3 q 653 7 735 -11 z "
  },
  Ѣ: {
    ha: 1114,
    x_min: 26,
    x_max: 1053,
    o: "m 290 0 l 290 1031 l 392 1031 l 392 621 l 701 621 q 963 544 874 621 q 1053 317 1053 467 q 957 81 1053 163 q 679 0 861 0 l 290 0 m 392 82 l 678 82 q 881 140 813 82 q 949 313 949 199 q 678 539 949 539 l 392 539 l 392 82 m 26 782 l 26 860 l 696 860 l 696 782 l 26 782 z "
  },
  Ѫ: {
    ha: 1228,
    x_min: 31,
    x_max: 1197,
    o: "m 31 0 l 133 226 q 228 388 175 325 q 347 482 282 451 q 488 513 413 513 l 504 513 l 140 901 l 140 972 l 1088 972 l 1088 906 l 721 513 l 740 513 q 882 482 817 513 q 1001 388 947 451 q 1096 226 1056 325 l 1197 0 l 1090 0 l 1003 200 q 880 378 953 321 q 715 435 807 435 l 663 435 l 663 0 l 567 0 l 567 435 l 515 435 q 347 378 421 435 q 225 200 274 321 l 138 0 l 31 0 m 257 892 l 614 513 l 615 513 l 971 892 l 257 892 z "
  },
  Ѳ: {
    ha: 1182,
    x_min: 79,
    x_max: 1101,
    o: "m 590 981 q 793 944 700 981 q 956 840 886 907 q 1063 683 1025 774 q 1101 486 1101 593 q 1063 289 1101 379 q 956 132 1025 199 q 793 28 886 65 q 590 -8 700 -8 q 388 28 481 -8 q 225 133 294 65 q 117 290 156 200 q 79 486 79 379 q 117 683 79 593 q 225 840 156 772 q 388 944 294 907 q 590 981 481 981 m 590 889 q 438 863 508 889 q 312 788 367 836 q 224 673 257 739 q 185 528 192 607 l 996 528 q 956 673 989 607 q 868 788 922 739 q 743 863 814 836 q 590 889 672 889 m 590 83 q 743 110 672 83 q 868 185 814 136 q 956 300 922 233 q 996 446 989 367 l 185 446 q 224 300 192 367 q 312 185 257 233 q 438 110 367 136 q 590 83 508 83 z "
  },
  Ѵ: {
    ha: 1039,
    x_min: 26,
    x_max: 1024,
    o: "m 426 0 l 26 972 l 138 972 l 478 147 l 700 760 q 825 949 751 897 q 1024 969 899 1000 l 1011 869 q 873 851 924 890 q 782 700 822 813 l 528 0 l 426 0 z "
  },
  Ғ: {
    ha: 844,
    x_min: 49,
    x_max: 815,
    o: "m 49 413 l 49 490 l 717 490 l 717 413 l 49 413 m 197 0 l 197 972 l 815 972 l 815 883 l 271 883 l 299 910 l 299 0 l 197 0 z "
  },
  Ҕ: {
    ha: 974,
    x_min: 164,
    x_max: 900,
    o: "m 164 0 l 164 972 l 810 972 l 810 883 l 239 883 l 265 911 l 265 0 l 164 0 m 446 -185 l 464 -99 q 634 -86 558 -118 q 755 18 710 -54 q 800 190 800 90 q 768 331 800 272 q 681 425 736 390 q 557 467 626 460 q 410 451 488 474 q 256 375 332 429 l 246 463 q 436 541 342 521 q 614 547 531 561 q 762 488 697 533 q 863 369 826 443 q 900 197 900 294 q 865 19 900 99 q 768 -112 831 -60 q 624 -185 706 -165 q 446 -185 542 -204 z "
  },
  Җ: {
    ha: 1461,
    x_min: 33,
    x_max: 1442,
    o: "m 1251 0 l 928 485 l 1015 535 l 1371 0 l 1251 0 m 721 446 l 721 536 l 999 536 l 999 446 l 721 446 m 1019 475 l 925 492 l 1235 972 l 1346 972 l 1019 475 m 153 0 l 33 0 l 389 535 l 476 485 l 153 0 m 753 0 l 653 0 l 653 972 l 753 972 l 753 0 m 683 446 l 406 446 l 406 536 l 683 536 l 683 446 m 385 475 l 58 972 l 169 972 l 478 492 l 385 475 m 1347 -218 l 1347 28 l 1375 0 l 1253 0 l 1253 89 l 1443 89 l 1443 -218 l 1347 -218 z "
  },
  Ҙ: {
    ha: 883,
    x_min: 49,
    x_max: 792,
    o: "m 49 117 l 86 190 q 230 108 150 135 q 390 80 310 81 q 538 103 471 79 q 647 173 606 126 q 689 286 689 219 q 622 417 689 371 q 435 463 554 463 l 226 463 l 226 546 l 429 546 q 590 590 532 546 q 647 711 647 633 q 615 806 647 767 q 526 867 582 846 q 400 891 469 889 q 256 873 331 893 q 113 810 182 853 l 79 894 q 258 966 165 946 q 439 979 351 986 q 597 939 526 972 q 708 851 667 906 q 750 722 750 797 q 715 600 750 653 q 616 519 679 547 q 467 490 553 490 l 472 521 q 641 490 569 521 q 752 403 713 460 q 792 272 792 347 q 756 147 792 201 q 659 55 721 92 q 521 2 597 18 q 361 -7 444 -14 q 197 30 278 0 q 49 117 117 60 m 465 25 l 465 -218 l 371 -218 l 371 25 l 465 25 z "
  },
  Қ: {
    ha: 1039,
    x_min: 164,
    x_max: 1021,
    o: "m 829 0 l 456 485 l 539 535 l 947 0 l 829 0 m 164 0 l 164 972 l 264 972 l 264 0 l 164 0 m 233 446 l 233 536 l 538 536 l 538 446 l 233 446 m 547 475 l 453 492 l 815 972 l 926 972 l 547 475 m 925 -218 l 925 28 l 953 0 l 831 0 l 831 89 l 1021 89 l 1021 -218 l 925 -218 z "
  },
  Ҝ: {
    ha: 1010,
    x_min: 164,
    x_max: 979,
    o: "m 860 0 l 517 485 l 600 535 l 979 0 l 860 0 m 164 0 l 164 972 l 264 972 l 264 0 l 164 0 m 233 446 l 233 536 l 585 536 l 585 446 l 233 446 m 383 238 l 383 747 l 463 747 l 463 238 l 383 238 m 608 475 l 514 492 l 842 972 l 953 972 l 608 475 z "
  },
  Ҟ: {
    ha: 1006,
    x_min: 51,
    x_max: 978,
    o: "m 51 767 l 51 842 l 549 842 l 549 767 l 51 767 m 860 0 l 486 485 l 569 535 l 978 0 l 860 0 m 194 0 l 194 972 l 294 972 l 294 0 l 194 0 m 264 446 l 264 536 l 568 536 l 568 446 l 264 446 m 578 475 l 483 492 l 846 972 l 957 972 l 578 475 z "
  },
  Ҡ: {
    ha: 1129,
    x_min: 15,
    x_max: 1101,
    o: "m 15 883 l 15 972 l 419 972 l 419 883 l 15 883 m 985 0 l 610 485 l 693 535 l 1101 0 l 985 0 m 319 0 l 319 972 l 419 972 l 419 0 l 319 0 m 388 446 l 388 536 l 692 536 l 692 446 l 388 446 m 701 475 l 608 492 l 969 972 l 1081 972 l 701 475 z "
  },
  Ң: {
    ha: 1174,
    x_min: 164,
    x_max: 1132,
    o: "m 875 972 l 976 972 l 976 0 l 875 0 l 875 972 m 267 0 l 164 0 l 164 972 l 267 972 l 267 0 m 885 449 l 256 449 l 256 539 l 885 539 l 885 449 m 1036 -218 l 1036 28 l 1064 0 l 878 0 l 878 89 l 1132 89 l 1132 -218 l 1036 -218 z "
  },
  Ҥ: {
    ha: 1511,
    x_min: 164,
    x_max: 1496,
    o: "m 875 972 l 976 972 l 976 0 l 875 0 l 875 972 m 267 0 l 164 0 l 164 972 l 267 972 l 267 0 m 885 449 l 256 449 l 256 539 l 885 539 l 885 449 m 878 0 l 878 972 l 1496 972 l 1496 883 l 951 883 l 978 910 l 979 0 l 878 0 z "
  },
  "Ԥ": {
    ha: 1179,
    x_min: 164,
    x_max: 1135,
    o: "m 164 0 l 164 972 l 982 972 l 982 0 l 881 0 l 881 911 l 907 883 l 239 883 l 265 911 l 265 0 l 164 0 m 1039 -218 l 1039 28 l 1067 0 l 881 0 l 881 89 l 1135 89 l 1135 -218 l 1039 -218 z "
  },
  Ҩ: {
    ha: 1350,
    x_min: 88,
    x_max: 1246,
    o: "m 619 -8 q 404 29 501 -8 q 235 136 307 67 q 126 301 164 206 q 88 508 88 396 q 155 780 88 657 q 343 978 222 903 l 419 928 q 250 748 311 858 q 189 506 189 638 q 246 278 189 376 q 403 124 303 179 q 638 69 504 69 q 836 106 746 69 q 992 210 926 143 q 1093 366 1057 276 q 1129 561 1129 456 q 1096 733 1129 660 q 1003 848 1063 807 q 863 889 943 889 q 719 847 781 889 q 624 728 658 804 q 589 553 589 653 q 640 321 589 422 q 781 156 692 219 q 986 75 869 93 q 1233 93 1103 57 l 1246 15 q 1013 -8 1125 -17 q 806 45 901 1 q 638 163 710 89 q 526 336 567 238 q 486 553 486 435 q 534 774 486 678 q 667 926 582 871 q 864 981 751 981 q 1057 928 974 981 q 1186 784 1140 876 q 1232 572 1232 692 q 1202 389 1232 476 q 1116 228 1172 301 q 984 103 1060 156 q 816 21 908 50 q 619 -8 724 -8 z "
  },
  Ҫ: {
    ha: 994,
    x_min: 81,
    x_max: 946,
    o: "m 589 -8 q 386 28 479 -8 q 225 132 293 65 q 119 289 157 199 q 81 486 81 379 q 119 683 81 593 q 226 840 157 774 q 388 944 294 907 q 590 981 481 981 q 789 945 696 981 q 946 839 882 910 l 881 774 q 749 862 821 835 q 593 889 676 889 q 431 859 506 889 q 300 774 356 829 q 213 647 244 719 q 182 486 182 574 q 213 326 182 399 q 300 198 244 253 q 431 113 356 143 q 593 83 506 83 q 749 111 676 83 q 881 200 821 139 l 946 135 q 789 28 882 64 q 589 -8 696 -8 m 618 25 l 618 -218 l 524 -218 l 524 25 l 618 25 z "
  },
  Ҭ: {
    ha: 817,
    x_min: 15,
    x_max: 800,
    o: "m 357 0 l 357 911 l 385 883 l 15 883 l 15 972 l 800 972 l 800 883 l 432 883 l 458 911 l 458 0 l 357 0 m 515 -218 l 515 28 l 543 0 l 357 0 l 357 89 l 611 89 l 611 -218 l 515 -218 z "
  },
  Ү: {
    ha: 906,
    x_min: 13,
    x_max: 892,
    o: "m 401 0 l 401 361 l 425 297 l 13 972 l 122 972 l 485 379 l 426 379 l 789 972 l 892 972 l 481 297 l 503 361 l 503 0 l 401 0 z "
  },
  Ұ: {
    ha: 906,
    x_min: 13,
    x_max: 892,
    o: "m 157 307 l 157 379 l 743 379 l 743 307 l 157 307 m 401 0 l 401 361 l 425 297 l 13 972 l 122 972 l 485 379 l 426 379 l 789 972 l 892 972 l 481 297 l 503 361 l 503 0 l 401 0 z "
  },
  Ҳ: {
    ha: 958,
    x_min: 31,
    x_max: 942,
    o: "m 56 972 l 174 972 l 450 588 l 725 972 l 846 972 l 514 506 l 872 0 l 751 0 l 450 418 l 149 0 l 31 0 l 388 501 l 56 972 m 846 -218 l 846 28 l 874 0 l 751 0 l 751 89 l 942 89 l 942 -218 l 846 -218 z "
  },
  Ҵ: {
    ha: 1343,
    x_min: 17,
    x_max: 1303,
    o: "m 358 0 l 358 911 l 386 883 l 17 883 l 17 972 l 771 972 l 771 883 l 432 883 l 460 911 l 460 0 l 358 0 m 358 -1 l 358 971 l 460 971 l 460 89 l 1047 89 l 1047 971 l 1149 971 l 1149 -1 l 358 -1 m 1208 -229 l 1208 28 l 1233 -1 l 1047 -1 l 1047 89 l 1303 89 l 1303 -229 l 1208 -229 z "
  },
  Ҷ: {
    ha: 1049,
    x_min: 82,
    x_max: 1004,
    o: "m 768 411 q 602 354 685 374 q 443 335 519 335 q 177 417 272 335 q 82 651 82 500 l 82 972 l 183 972 l 183 663 q 255 488 183 550 q 453 425 326 425 q 608 445 528 425 q 768 503 689 465 l 768 411 m 750 0 l 750 972 l 850 972 l 850 0 l 750 0 m 908 -218 l 908 28 l 936 0 l 750 0 l 750 89 l 1004 89 l 1004 -218 l 908 -218 z "
  },
  Ҹ: {
    ha: 1015,
    x_min: 82,
    x_max: 850,
    o: "m 419 128 l 419 636 l 497 636 l 497 128 l 419 128 m 768 411 q 601 354 683 374 q 443 335 518 335 q 177 417 272 335 q 82 651 82 500 l 82 972 l 182 972 l 182 663 q 253 488 182 550 q 453 425 325 425 q 608 445 528 425 q 768 503 688 465 l 768 411 m 749 0 l 749 972 l 850 972 l 850 0 l 749 0 z "
  },
  Һ: {
    ha: 1015,
    x_min: 164,
    x_max: 933,
    o: "m 832 0 l 832 310 q 761 485 832 424 q 561 547 690 547 q 408 527 489 547 q 247 469 326 507 l 246 561 q 414 619 331 600 q 571 638 497 638 q 838 555 743 638 q 933 321 933 472 l 933 0 l 832 0 m 164 0 l 164 972 l 265 972 l 265 0 l 164 0 z "
  },
  "Ԧ": {
    ha: 1108,
    x_min: 164,
    x_max: 1086,
    o: "m 832 0 l 832 310 q 761 485 832 424 q 561 547 690 547 q 408 527 489 547 q 247 469 326 507 l 246 561 q 414 619 331 600 q 571 638 497 638 q 838 555 743 638 q 933 321 933 472 l 933 0 l 832 0 m 164 0 l 164 972 l 265 972 l 265 0 l 164 0 m 990 -218 l 990 28 l 1018 0 l 832 0 l 832 89 l 1086 89 l 1086 -218 l 990 -218 z "
  },
  Ҽ: {
    ha: 1353,
    x_min: 43,
    x_max: 1293,
    o: "m 808 -8 q 619 25 710 -8 q 459 122 529 58 q 349 276 389 185 q 308 483 308 368 q 347 688 308 596 q 455 844 386 779 q 613 945 524 910 q 803 981 703 981 q 993 946 904 981 q 1149 845 1082 911 q 1255 690 1217 779 q 1293 489 1293 600 q 1292 461 1293 476 q 1289 433 1290 446 l 272 433 q 143 465 194 433 q 67 548 92 496 q 48 663 43 600 q 89 790 53 726 l 183 769 q 147 683 156 726 q 152 602 139 639 q 199 543 165 565 q 283 521 232 521 l 1215 521 l 1189 486 q 1160 650 1190 576 q 1078 778 1131 724 q 955 861 1025 832 q 803 890 885 890 q 650 860 721 890 q 525 776 579 831 q 441 648 471 722 q 411 485 411 574 q 443 318 411 393 q 531 191 475 243 q 658 111 588 139 q 810 83 729 83 q 968 113 888 83 q 1119 204 1049 142 l 1193 138 q 1007 27 1107 63 q 808 -8 907 -8 z "
  },
  Ҿ: {
    ha: 1353,
    x_min: 43,
    x_max: 1293,
    o: "m 808 -8 q 619 25 710 -8 q 459 122 529 58 q 349 276 389 185 q 308 483 308 368 q 347 688 308 596 q 455 844 386 779 q 613 945 524 910 q 803 981 703 981 q 993 946 904 981 q 1149 845 1082 911 q 1255 690 1217 779 q 1293 489 1293 600 q 1292 461 1293 476 q 1289 433 1290 446 l 272 433 q 143 465 194 433 q 67 548 92 496 q 48 663 43 600 q 89 790 53 726 l 183 769 q 147 683 156 726 q 152 602 139 639 q 199 543 165 565 q 283 521 232 521 l 1215 521 l 1189 486 q 1160 650 1190 576 q 1078 778 1131 724 q 955 861 1025 832 q 803 890 885 890 q 650 860 721 890 q 525 776 579 831 q 441 648 471 722 q 411 485 411 574 q 443 318 411 393 q 531 191 475 243 q 658 111 588 139 q 810 83 729 83 q 968 113 888 83 q 1119 204 1049 142 l 1193 138 q 1007 27 1107 63 q 808 -8 907 -8 m 858 25 l 858 -218 l 764 -218 l 764 25 l 858 25 z "
  },
  Ӏ: {
    ha: 431,
    x_min: 164,
    x_max: 267,
    o: "m 164 0 l 164 972 l 267 972 l 267 0 l 164 0 z "
  },
  Ӂ: {
    ha: 1404,
    x_min: 33,
    x_max: 1371,
    o: "m 1251 0 l 928 485 l 1015 535 l 1371 0 l 1251 0 m 721 446 l 721 536 l 999 536 l 999 446 l 721 446 m 1019 475 l 925 492 l 1235 972 l 1346 972 l 1019 475 m 153 0 l 33 0 l 389 535 l 476 485 l 153 0 m 753 0 l 653 0 l 653 972 l 753 972 l 753 0 m 683 446 l 406 446 l 406 536 l 683 536 l 683 446 m 385 475 l 58 972 l 169 972 l 478 492 l 385 475 m 704 1043 q 540 1090 600 1043 q 478 1222 479 1138 l 554 1222 q 597 1135 556 1167 q 704 1103 638 1103 q 812 1135 771 1103 q 854 1222 853 1167 l 931 1222 q 868 1090 929 1138 q 704 1043 807 1043 z "
  },
  Ӄ: {
    ha: 975,
    x_min: 164,
    x_max: 935,
    o: "m 164 0 l 164 972 l 264 972 l 264 0 l 164 0 m 233 446 l 233 536 l 525 536 l 525 446 l 233 446 m 553 483 l 454 492 l 814 972 l 925 972 l 553 483 m 724 -278 q 568 -237 644 -278 l 597 -158 q 704 -189 656 -189 q 792 -155 760 -189 q 825 -58 825 -121 q 798 56 825 -8 q 721 190 771 119 q 603 331 671 260 q 458 468 536 403 l 538 525 q 747 314 657 418 q 885 114 836 210 q 935 -61 935 18 q 877 -220 935 -162 q 724 -278 819 -278 z "
  },
  Ӈ: {
    ha: 1133,
    x_min: 164,
    x_max: 969,
    o: "m 600 -229 l 633 -154 q 711 -188 671 -181 q 788 -185 751 -196 q 846 -144 824 -174 q 868 -67 868 -114 l 868 443 l 265 443 l 265 0 l 164 0 l 164 972 l 265 972 l 265 533 l 868 533 l 868 972 l 969 972 l 969 -72 q 932 -197 969 -150 q 838 -264 894 -244 q 717 -274 782 -283 q 600 -229 653 -265 z "
  },
  "Ӊ": {
    ha: 1174,
    x_min: 164,
    x_max: 1117,
    o: "m 875 972 l 976 972 l 976 0 l 875 0 l 875 972 m 267 0 l 164 0 l 164 972 l 267 972 l 267 0 m 885 449 l 256 449 l 256 539 l 885 539 l 885 449 m 942 -218 l 1006 28 l 1049 0 l 878 0 l 878 89 l 1117 89 l 1024 -218 l 942 -218 z "
  },
  Ӌ: {
    ha: 1011,
    x_min: 81,
    x_max: 847,
    o: "m 442 353 q 175 434 269 353 q 81 663 81 515 l 81 972 l 181 972 l 181 674 q 252 503 181 564 q 450 443 324 443 q 605 463 525 443 q 765 521 685 483 l 765 429 q 599 372 682 392 q 442 353 517 353 m 579 -218 l 579 89 l 847 89 l 847 0 l 661 0 l 675 28 l 675 -218 l 579 -218 m 746 0 l 746 972 l 847 972 l 847 0 l 746 0 z "
  },
  "Ӎ": {
    ha: 1379,
    x_min: 164,
    x_max: 1321,
    o: "m 164 0 l 164 972 l 249 972 l 693 214 l 649 214 l 1089 972 l 1174 972 l 1174 0 l 1075 0 l 1075 818 l 1099 818 l 693 124 l 644 124 l 236 818 l 263 818 l 263 0 l 164 0 m 1146 -218 l 1210 28 l 1253 0 l 1082 0 l 1082 89 l 1321 89 l 1228 -218 l 1146 -218 z "
  },
  Ӑ: {
    ha: 1033,
    x_min: 22,
    x_max: 1013,
    o: "m 21 0 l 465 972 l 567 972 l 1011 0 l 903 0 l 494 913 l 536 913 l 128 0 l 21 0 m 196 260 l 226 343 l 792 343 l 822 260 l 196 260 m 517 1043 q 352 1090 413 1043 q 290 1222 292 1138 l 367 1222 q 409 1135 368 1167 q 517 1103 450 1103 q 624 1135 583 1103 q 667 1222 665 1167 l 743 1222 q 681 1090 742 1138 q 517 1043 619 1043 z "
  },
  Ӓ: {
    ha: 1033,
    x_min: 22,
    x_max: 1013,
    o: "m 21 0 l 465 972 l 567 972 l 1011 0 l 903 0 l 494 913 l 536 913 l 128 0 l 21 0 m 196 260 l 226 343 l 792 343 l 822 260 l 196 260 z "
  },
  Ӕ: {
    ha: 1424,
    x_min: 13,
    x_max: 1361,
    o: "m 13 0 l 606 972 l 707 972 l 707 883 l 615 883 l 679 925 l 119 0 l 13 0 m 244 260 l 256 343 l 707 343 l 707 260 l 244 260 m 765 538 l 1281 538 l 1281 450 l 765 450 l 765 538 m 776 89 l 1361 89 l 1361 0 l 674 0 l 674 972 l 1340 972 l 1340 883 l 776 883 l 776 89 z "
  },
  Ӗ: {
    ha: 915,
    x_min: 164,
    x_max: 851,
    o: "m 256 538 l 769 538 l 769 450 l 256 450 l 256 538 m 267 89 l 851 89 l 851 0 l 164 0 l 164 972 l 831 972 l 831 883 l 267 883 l 267 89 m 499 1043 q 334 1090 394 1043 q 272 1222 274 1138 l 349 1222 q 391 1135 350 1167 q 499 1103 432 1103 q 606 1135 565 1103 q 649 1222 647 1167 l 725 1222 q 663 1090 724 1138 q 499 1043 601 1043 z "
  },
  Ә: {
    ha: 1144,
    x_min: 60,
    x_max: 1064,
    o: "m 558 -8 q 365 26 456 -8 q 206 127 275 61 q 99 283 138 193 q 60 483 60 374 q 60 508 60 496 q 64 533 61 521 l 1029 533 l 1029 457 l 136 457 l 163 486 q 192 324 163 397 q 276 196 222 250 q 403 112 331 142 q 558 82 475 82 q 715 112 642 82 q 844 196 789 142 q 931 324 900 250 q 961 488 961 399 q 928 654 961 579 q 838 781 896 729 q 707 861 781 833 q 551 889 633 889 q 390 860 472 889 q 235 768 308 831 l 161 835 q 351 945 250 910 q 554 981 453 981 q 747 947 656 981 q 910 851 839 914 q 1023 696 982 788 q 1064 489 1064 604 q 1024 285 1064 376 q 915 128 985 193 q 753 27 844 63 q 558 -8 663 -8 z "
  },
  Ӛ: {
    ha: 1144,
    x_min: 60,
    x_max: 1064,
    o: "m 558 -8 q 365 26 456 -8 q 206 127 275 61 q 99 283 138 193 q 60 483 60 374 q 60 508 60 496 q 64 533 61 521 l 1029 533 l 1029 457 l 136 457 l 163 486 q 192 324 163 397 q 276 196 222 250 q 403 112 331 142 q 558 82 475 82 q 715 112 642 82 q 844 196 789 142 q 931 324 900 250 q 961 488 961 399 q 928 654 961 579 q 838 781 896 729 q 707 861 781 833 q 551 889 633 889 q 390 860 472 889 q 235 768 308 831 l 161 835 q 351 945 250 910 q 554 981 453 981 q 747 947 656 981 q 910 851 839 914 q 1023 696 982 788 q 1064 489 1064 604 q 1024 285 1064 376 q 915 128 985 193 q 753 27 844 63 q 558 -8 663 -8 z "
  },
  Ӝ: {
    ha: 1404,
    x_min: 33,
    x_max: 1371,
    o: "m 1251 0 l 928 485 l 1015 535 l 1371 0 l 1251 0 m 721 446 l 721 536 l 999 536 l 999 446 l 721 446 m 1019 475 l 925 492 l 1235 972 l 1346 972 l 1019 475 m 153 0 l 33 0 l 389 535 l 476 485 l 153 0 m 753 0 l 653 0 l 653 972 l 753 972 l 753 0 m 683 446 l 406 446 l 406 536 l 683 536 l 683 446 m 385 475 l 58 972 l 169 972 l 478 492 l 385 475 z "
  },
  Ӟ: {
    ha: 883,
    x_min: 49,
    x_max: 792,
    o: "m 49 117 l 86 190 q 230 108 150 135 q 390 80 310 81 q 538 103 471 79 q 647 173 606 126 q 689 286 689 219 q 622 417 689 371 q 435 463 554 463 l 226 463 l 226 546 l 429 546 q 590 590 532 546 q 647 711 647 633 q 615 806 647 767 q 526 867 582 846 q 400 891 469 889 q 256 873 331 893 q 113 810 182 853 l 79 894 q 258 966 165 946 q 439 979 351 986 q 597 939 526 972 q 708 851 667 906 q 750 722 750 797 q 715 600 750 653 q 616 519 679 547 q 467 490 553 490 l 472 521 q 641 490 569 521 q 752 403 713 460 q 792 272 792 347 q 756 147 792 201 q 659 55 721 92 q 521 2 597 18 q 361 -7 444 -14 q 197 30 278 0 q 49 117 117 60 z "
  },
  Ӡ: {
    ha: 854,
    x_min: 44,
    x_max: 778,
    o: "m 410 -8 q 197 26 294 -8 q 44 114 100 60 l 85 194 q 219 113 135 146 q 407 81 304 81 q 606 134 538 81 q 675 279 675 188 q 607 421 675 368 q 394 474 539 474 l 322 474 l 322 546 l 646 922 l 654 885 l 81 885 l 81 972 l 735 972 l 735 901 l 413 525 l 372 556 l 410 556 q 615 521 533 556 q 737 424 696 486 q 778 279 778 361 q 737 132 778 197 q 614 29 696 67 q 410 -8 532 -8 z "
  },
  Ӣ: {
    ha: 1144,
    x_min: 164,
    x_max: 981,
    o: "m 164 0 l 164 972 l 265 972 l 265 167 l 888 972 l 981 972 l 981 0 l 879 0 l 879 804 l 257 0 l 164 0 z "
  },
  Ӥ: {
    ha: 1144,
    x_min: 164,
    x_max: 981,
    o: "m 164 0 l 164 972 l 265 972 l 265 167 l 888 972 l 981 972 l 981 0 l 879 0 l 879 804 l 257 0 l 164 0 z "
  },
  Ӧ: {
    ha: 1182,
    x_min: 79,
    x_max: 1101,
    o: "m 590 -8 q 387 28 481 -8 q 224 133 293 65 q 117 290 156 200 q 79 486 79 379 q 117 683 79 593 q 224 840 156 772 q 386 944 293 907 q 590 981 479 981 q 793 944 700 981 q 955 840 886 907 q 1062 683 1024 774 q 1100 486 1100 593 q 1062 289 1100 379 q 955 132 1024 199 q 793 28 886 65 q 590 -8 700 -8 m 590 83 q 752 113 678 83 q 881 198 826 143 q 967 326 936 253 q 997 486 997 399 q 967 647 997 574 q 881 774 936 719 q 752 859 826 829 q 590 889 678 889 q 428 859 503 889 q 298 774 353 829 q 212 647 243 719 q 181 486 181 574 q 212 326 181 400 q 298 198 243 253 q 428 113 353 143 q 590 83 503 83 z "
  },
  Ө: {
    ha: 1182,
    x_min: 79,
    x_max: 1101,
    o: "m 590 981 q 793 944 700 981 q 956 840 886 907 q 1063 683 1025 774 q 1101 486 1101 593 q 1063 289 1101 379 q 956 132 1025 199 q 793 28 886 65 q 590 -8 700 -8 q 388 28 481 -8 q 225 133 294 65 q 117 290 156 200 q 79 486 79 379 q 117 683 79 593 q 225 840 156 772 q 388 944 294 907 q 590 981 481 981 m 590 889 q 438 863 508 889 q 312 788 367 836 q 224 673 257 739 q 185 528 192 607 l 996 528 q 956 673 989 607 q 868 788 922 739 q 743 863 814 836 q 590 889 672 889 m 590 83 q 743 110 672 83 q 868 185 814 136 q 956 300 922 233 q 996 446 989 367 l 185 446 q 224 300 192 367 q 312 185 257 233 q 438 110 367 136 q 590 83 508 83 z "
  },
  Ӫ: {
    ha: 1182,
    x_min: 79,
    x_max: 1101,
    o: "m 590 981 q 793 944 700 981 q 956 840 886 907 q 1063 683 1025 774 q 1101 486 1101 593 q 1063 289 1101 379 q 956 132 1025 199 q 793 28 886 65 q 590 -8 700 -8 q 388 28 481 -8 q 225 133 294 65 q 117 290 156 200 q 79 486 79 379 q 117 683 79 593 q 225 840 156 772 q 388 944 294 907 q 590 981 481 981 m 590 889 q 438 863 508 889 q 312 788 367 836 q 224 673 257 739 q 185 528 192 607 l 996 528 q 956 673 989 607 q 868 788 922 739 q 743 863 814 836 q 590 889 672 889 m 590 83 q 743 110 672 83 q 868 185 814 136 q 956 300 922 233 q 996 446 989 367 l 185 446 q 224 300 192 367 q 312 185 257 233 q 438 110 367 136 q 590 83 508 83 z "
  },
  Ӭ: {
    ha: 981,
    x_min: 49,
    x_max: 899,
    o: "m 293 453 l 293 538 l 831 538 l 831 453 l 293 453 m 415 981 q 607 944 519 981 q 760 840 694 907 q 863 683 826 774 q 899 486 899 593 q 863 289 899 379 q 760 132 826 199 q 607 28 694 65 q 415 -8 519 -8 q 208 28 304 -8 q 49 135 113 64 l 113 200 q 249 110 174 138 q 411 83 324 83 q 563 114 493 83 q 685 199 633 144 q 767 326 738 253 q 796 486 796 399 q 767 647 796 574 q 685 774 738 719 q 563 858 633 828 q 411 889 493 889 q 249 861 324 889 q 113 772 174 833 l 49 838 q 208 944 113 908 q 415 981 304 981 z "
  },
  Ӯ: {
    ha: 944,
    x_min: 29,
    x_max: 928,
    o: "m 147 96 q 281 83 218 68 q 396 181 343 97 l 443 256 l 453 268 l 825 972 l 928 972 l 486 158 q 381 32 442 74 q 253 -12 321 -10 q 118 13 186 -15 l 147 96 m 450 175 l 29 972 l 139 972 l 506 260 l 450 175 z "
  },
  Ӱ: {
    ha: 944,
    x_min: 29,
    x_max: 928,
    o: "m 147 96 q 281 83 218 68 q 396 181 343 97 l 443 256 l 453 268 l 825 972 l 928 972 l 486 158 q 381 32 442 74 q 253 -12 321 -10 q 118 13 186 -15 l 147 96 m 450 175 l 29 972 l 139 972 l 506 260 l 450 175 z "
  },
  Ӳ: {
    ha: 944,
    x_min: 29,
    x_max: 928,
    o: "m 147 96 q 281 83 218 68 q 396 181 343 97 l 443 256 l 453 268 l 825 972 l 928 972 l 486 158 q 381 32 442 74 q 253 -12 321 -10 q 118 13 186 -15 l 147 96 m 450 175 l 29 972 l 139 972 l 506 260 l 450 175 z "
  },
  Ӵ: {
    ha: 1015,
    x_min: 82,
    x_max: 850,
    o: "m 768 411 q 602 354 685 374 q 443 335 519 335 q 177 417 272 335 q 82 651 82 500 l 82 972 l 183 972 l 183 663 q 255 488 183 550 q 453 425 326 425 q 608 445 528 425 q 768 503 689 465 l 768 411 m 750 0 l 750 972 l 850 972 l 850 0 l 750 0 z "
  },
  "Ӷ": {
    ha: 794,
    x_min: 164,
    x_max: 782,
    o: "m 164 0 l 164 972 l 782 972 l 782 883 l 238 883 l 264 910 l 265 0 l 164 0 m 322 -218 l 322 28 l 350 0 l 164 0 l 164 89 l 418 89 l 418 -218 l 322 -218 z "
  },
  Ӹ: {
    ha: 1358,
    x_min: 164,
    x_max: 1194,
    o: "m 571 625 q 834 548 743 625 q 925 319 925 471 q 828 81 925 163 q 550 0 731 0 l 164 0 l 164 972 l 265 972 l 265 625 l 571 625 m 547 82 q 752 142 682 82 q 822 317 822 201 q 753 487 822 432 q 547 542 683 542 l 265 542 l 265 82 l 547 82 m 1093 0 l 1093 972 l 1194 972 l 1194 0 l 1093 0 z "
  },
  "Ӻ": {
    ha: 846,
    x_min: 49,
    x_max: 817,
    o: "m 197 0 l 197 972 l 817 972 l 817 883 l 299 883 l 299 0 l 197 0 m 236 -276 q 153 -265 194 -276 q 76 -228 111 -253 l 110 -156 q 221 -192 158 -192 q 311 -158 276 -192 q 346 -56 346 -124 l 346 22 l 376 0 l 197 0 l 197 89 l 444 89 l 444 -69 q 417 -181 444 -135 q 344 -252 390 -228 q 236 -276 297 -276 m 49 413 l 49 490 l 717 490 l 717 413 l 49 413 z "
  },
  "Ӽ": {
    ha: 904,
    x_min: 28,
    x_max: 861,
    o: "m 28 0 l 392 500 l 51 972 l 169 972 l 456 576 l 740 972 l 853 972 l 513 501 l 461 439 l 147 0 l 28 0 m 650 -278 q 572 -267 611 -278 q 496 -237 533 -257 l 524 -164 q 631 -194 579 -194 q 719 -160 686 -194 q 751 -64 751 -126 q 724 43 751 -17 q 651 169 697 103 q 549 306 606 235 q 435 449 493 376 l 500 521 q 634 352 569 433 q 750 197 699 271 q 831 57 801 124 q 861 -68 861 -10 q 833 -181 861 -135 q 758 -253 806 -228 q 650 -278 711 -278 z "
  },
  "Ӿ": {
    ha: 928,
    x_min: 44,
    x_max: 886,
    o: "m 136 460 l 136 538 l 781 538 l 781 460 l 136 460 m 69 972 l 188 972 l 464 588 l 740 972 l 860 972 l 528 506 l 886 0 l 765 0 l 464 418 l 164 0 l 44 0 l 403 501 l 69 972 z "
  },
  "Ԑ": {
    ha: 882,
    x_min: 90,
    x_max: 833,
    o: "m 833 117 q 685 30 767 60 q 521 -7 604 0 q 361 2 438 -14 q 223 55 285 18 q 126 147 161 92 q 90 272 90 201 q 130 403 90 347 q 241 490 169 460 q 410 521 313 521 l 415 490 q 266 519 329 490 q 167 600 203 547 q 132 722 132 653 q 174 852 132 797 q 285 940 215 907 q 443 980 356 972 q 624 967 531 988 q 803 894 717 946 l 769 811 q 626 874 700 854 q 482 892 551 893 q 356 869 413 890 q 267 807 300 847 q 235 711 235 767 q 292 590 235 633 q 453 546 350 546 l 656 546 l 656 463 l 447 463 q 261 417 328 463 q 194 286 194 371 q 235 173 194 219 q 344 103 276 126 q 492 80 411 79 q 652 108 572 81 q 796 190 732 135 l 833 117 z "
  },
  "Ԓ": {
    ha: 1092,
    x_min: 15,
    x_max: 928,
    o: "m 558 -229 l 592 -154 q 670 -188 629 -181 q 747 -185 711 -196 q 804 -144 782 -174 q 826 -67 826 -114 l 826 883 l 357 883 l 344 558 q 324 306 339 413 q 279 128 308 199 q 204 24 250 58 q 93 -10 158 -10 q 56 -8 75 -10 q 15 0 38 -6 l 24 92 q 69 86 47 86 q 169 135 132 86 q 226 288 207 185 q 253 556 246 392 l 268 972 l 928 972 l 928 -72 q 891 -197 928 -150 q 797 -264 854 -244 q 676 -274 740 -283 q 558 -229 613 -265 z "
  },
  "Ԛ": {
    ha: 1188,
    x_min: 79,
    x_max: 1146,
    o: "m 590 -8 q 387 28 481 -8 q 224 133 293 65 q 117 290 156 200 q 79 486 79 379 q 117 683 79 593 q 224 840 156 772 q 386 944 293 907 q 590 981 479 981 q 793 944 700 981 q 955 840 886 907 q 1062 683 1024 774 q 1100 486 1100 593 q 1062 289 1100 379 q 955 132 1024 199 q 793 28 886 65 q 590 -8 700 -8 m 908 -193 q 822 -182 864 -193 q 738 -147 781 -171 q 651 -83 696 -122 q 554 11 607 -44 l 667 39 q 751 -46 710 -12 q 831 -95 792 -79 q 910 -111 871 -111 q 1094 -22 1018 -111 l 1144 -82 q 908 -193 1053 -193 m 590 83 q 752 113 678 83 q 881 199 826 143 q 967 327 936 254 q 997 486 997 400 q 967 647 997 574 q 881 774 936 719 q 752 859 826 829 q 590 889 678 889 q 428 859 503 889 q 298 774 353 829 q 212 647 243 719 q 181 486 181 574 q 212 327 181 400 q 298 199 243 254 q 428 113 353 143 q 590 83 503 83 z "
  },
  "Ԝ": {
    ha: 1489,
    x_min: 36,
    x_max: 1453,
    o: "m 360 0 l 36 972 l 143 972 l 446 57 l 390 57 l 701 972 l 796 972 l 1101 57 l 1049 57 l 1354 972 l 1453 972 l 1131 0 l 1024 0 l 733 867 l 761 867 l 467 0 l 360 0 z "
  },
  Ҍ: {
    ha: 1021,
    x_min: 46,
    x_max: 960,
    o: "m 199 0 l 199 1031 l 300 1031 l 300 621 l 608 621 q 870 544 781 621 q 960 317 960 467 q 864 81 960 163 q 586 0 768 0 l 199 0 m 300 82 l 586 82 q 789 140 721 82 q 857 313 857 199 q 586 539 857 539 l 300 539 l 300 82 m 46 782 l 46 860 l 610 860 l 610 782 l 46 782 z "
  },
  Ҏ: {
    ha: 1017,
    x_min: 164,
    x_max: 925,
    o: "m 164 0 l 164 972 l 528 972 q 740 932 651 972 q 877 817 829 892 q 925 636 925 743 q 877 455 925 531 q 740 340 829 379 q 528 300 651 300 l 239 300 l 267 329 l 267 0 l 164 0 m 267 358 l 239 389 l 525 389 q 747 453 671 389 q 822 636 822 518 q 747 819 822 756 q 525 883 671 883 l 239 883 l 267 913 l 267 358 m 908 178 l 850 131 l 485 608 l 542 656 l 908 178 z "
  },
  "Ԩ": {
    ha: 1135,
    x_min: -101,
    x_max: 971,
    o: "m -101 -229 l -68 -154 q 10 -188 -31 -181 q 85 -185 50 -196 q 144 -144 121 -174 q 167 -67 167 -114 l 167 972 l 267 972 l 267 533 l 869 533 l 869 972 l 971 972 l 971 0 l 869 0 l 869 443 l 267 443 l 267 -72 q 230 -197 267 -150 q 136 -264 193 -244 q 16 -274 79 -283 q -101 -229 -47 -265 z "
  },
  "Ԯ": {
    ha: 1124,
    x_min: 15,
    x_max: 1079,
    o: "m 93 -10 q 56 -8 74 -10 q 15 0 38 -6 l 24 92 q 69 86 47 86 q 170 135 132 86 q 228 288 208 185 q 253 556 247 392 l 267 972 l 926 972 l 926 0 l 825 0 l 825 911 l 851 883 l 332 883 l 357 913 l 344 558 q 324 306 339 413 q 279 128 308 199 q 204 24 250 58 q 93 -10 158 -10 m 983 -218 l 983 28 l 1011 0 l 825 0 l 825 89 l 1079 89 l 1079 -218 l 983 -218 z "
  },
  а: {
    ha: 810,
    x_min: 75,
    x_max: 688,
    o: "m 593 0 l 593 161 l 589 188 l 589 457 q 537 600 589 550 q 382 650 485 650 q 247 626 311 650 q 139 564 183 603 l 94 638 q 228 710 150 685 q 392 736 306 736 q 610 666 533 736 q 688 453 688 596 l 688 0 l 593 0 m 342 -7 q 199 20 260 -7 q 107 95 139 47 q 75 206 75 143 q 102 309 75 263 q 191 384 129 356 q 357 413 253 413 l 608 413 l 608 339 l 360 339 q 213 301 254 339 q 172 208 172 264 q 221 108 172 146 q 357 71 269 71 q 501 109 440 71 q 589 219 561 147 l 611 151 q 515 36 583 79 q 342 -7 446 -7 z "
  },
  б: {
    ha: 915,
    x_min: 94,
    x_max: 844,
    o: "m 468 -8 q 310 21 379 -8 q 193 110 242 50 q 119 258 144 169 q 94 463 94 346 q 114 645 94 567 q 168 781 133 724 q 249 877 203 838 q 351 941 296 917 q 464 978 406 965 l 792 1054 l 808 963 l 500 893 q 430 874 471 886 q 347 836 389 861 q 268 767 304 811 q 210 652 232 722 q 189 478 189 582 q 190 442 189 456 q 194 415 192 429 q 197 372 196 400 l 154 408 q 217 556 169 493 q 335 655 264 619 q 494 690 407 690 q 675 647 596 690 q 799 525 754 603 q 844 344 844 447 q 798 163 844 243 q 667 37 751 82 q 468 -8 582 -8 m 479 74 q 617 109 557 74 q 710 206 676 144 q 744 343 744 267 q 710 476 744 418 q 617 569 676 535 q 478 603 557 603 q 340 570 400 603 q 247 479 281 538 q 213 344 213 421 q 247 207 213 268 q 341 110 281 146 q 479 74 401 74 z "
  },
  в: {
    ha: 844,
    x_min: 140,
    x_max: 754,
    o: "m 140 0 l 140 729 l 463 729 q 658 682 586 729 q 729 543 729 635 q 661 406 729 454 q 482 358 593 358 l 501 388 q 693 339 632 388 q 754 199 754 290 q 685 52 754 104 q 472 0 617 0 l 140 0 m 236 78 l 468 78 q 609 108 561 78 q 657 204 657 138 q 614 301 657 271 q 478 332 571 332 l 236 332 l 236 78 m 236 406 l 456 406 q 585 438 540 406 q 631 531 631 469 q 585 622 631 592 q 456 653 540 653 l 236 653 l 236 406 z "
  },
  г: {
    ha: 660,
    x_min: 140,
    x_max: 657,
    o: "m 140 0 l 140 729 l 657 729 l 657 643 l 214 643 l 239 668 l 239 0 l 140 0 z "
  },
  ѓ: {
    ha: 660,
    x_min: 140,
    x_max: 657,
    o: "m 140 0 l 140 729 l 657 729 l 657 643 l 214 643 l 239 668 l 239 0 l 140 0 m 313 842 l 503 1014 l 635 1014 l 410 842 l 313 842 z "
  },
  ґ: {
    ha: 624,
    x_min: 140,
    x_max: 619,
    o: "m 140 0 l 140 729 l 528 729 l 528 881 l 619 881 l 619 643 l 239 643 l 239 0 l 140 0 z "
  },
  д: {
    ha: 904,
    x_min: 13,
    x_max: 853,
    o: "m 640 47 l 640 643 l 289 643 l 281 481 q 272 336 278 407 q 251 206 265 265 q 210 110 236 147 q 142 68 183 74 l 43 86 q 114 117 86 85 q 157 207 142 150 q 179 337 172 264 q 190 486 186 410 l 200 729 l 739 729 l 739 47 l 640 47 m 13 -176 l 13 86 l 853 86 l 853 -176 l 760 -176 l 760 0 l 106 0 l 106 -176 l 13 -176 z "
  },
  е: {
    ha: 858,
    x_min: 71,
    x_max: 781,
    o: "m 453 -7 q 253 41 339 -7 q 118 173 167 89 q 69 365 69 257 q 116 557 69 474 q 244 688 163 640 q 426 736 325 736 q 609 690 529 736 q 735 559 689 643 q 781 365 781 475 q 780 351 781 358 q 779 335 779 343 l 144 335 l 144 408 l 726 408 l 688 379 q 653 520 688 458 q 561 617 619 582 q 426 651 503 651 q 292 617 351 651 q 199 519 232 582 q 165 376 165 457 l 165 361 q 202 215 165 278 q 305 116 239 151 q 456 81 371 81 q 580 104 522 81 q 679 176 638 128 l 735 113 q 613 24 686 54 q 453 -7 540 -7 z "
  },
  ѐ: {
    ha: 868,
    x_min: 71,
    x_max: 781,
    o: "m 453 -7 q 253 41 339 -7 q 118 173 167 89 q 69 365 69 257 q 116 557 69 474 q 244 688 163 640 q 426 736 325 736 q 609 690 529 736 q 735 559 689 643 q 781 365 781 475 q 780 351 781 358 q 779 335 779 343 l 144 335 l 144 408 l 726 408 l 688 379 q 653 520 688 458 q 561 617 619 582 q 426 651 503 651 q 292 617 351 651 q 199 519 232 582 q 165 376 165 457 l 165 361 q 202 215 165 278 q 305 116 239 151 q 456 81 371 81 q 580 104 522 81 q 679 176 638 128 l 735 113 q 613 24 686 54 q 453 -7 540 -7 m 418 843 l 193 1015 l 325 1015 l 515 843 l 418 843 z "
  },
  ё: {
    ha: 858,
    x_min: 71,
    x_max: 781,
    o: "m 453 -7 q 253 41 339 -7 q 118 173 167 89 q 69 365 69 257 q 116 557 69 474 q 244 688 163 640 q 426 736 325 736 q 609 690 529 736 q 735 559 689 643 q 781 365 781 475 q 780 351 781 358 q 779 335 779 343 l 144 335 l 144 408 l 726 408 l 688 379 q 653 520 688 458 q 561 617 619 582 q 426 651 503 651 q 292 617 351 651 q 199 519 232 582 q 165 376 165 457 l 165 361 q 202 215 165 278 q 305 116 239 151 q 456 81 371 81 q 580 104 522 81 q 679 176 638 128 l 735 113 q 613 24 686 54 q 453 -7 540 -7 m 550 875 q 508 892 526 875 q 490 935 490 908 q 508 978 490 961 q 550 994 526 994 q 592 978 575 994 q 610 935 610 961 q 592 892 610 908 q 550 875 575 875 m 303 875 q 260 892 278 875 q 243 935 243 908 q 260 978 243 961 q 303 994 278 994 q 344 978 326 994 q 363 935 363 961 q 344 892 363 908 q 303 875 326 875 z "
  },
  ж: {
    ha: 1147,
    x_min: 24,
    x_max: 1124,
    o: "m 1006 0 l 756 361 l 838 410 l 1124 0 l 1006 0 m 592 325 l 592 410 l 822 410 l 822 325 l 592 325 m 847 354 l 753 368 l 996 729 l 1103 729 l 847 354 m 142 0 l 24 0 l 310 410 l 390 361 l 142 0 m 622 0 l 524 0 l 524 729 l 622 729 l 622 0 m 554 325 l 325 325 l 325 410 l 554 410 l 554 325 m 301 354 l 44 729 l 151 729 l 393 368 l 301 354 z "
  },
  з: {
    ha: 742,
    x_min: 42,
    x_max: 658,
    o: "m 336 -8 q 499 19 426 -8 q 615 97 572 47 q 658 211 658 146 q 588 343 658 294 q 393 392 518 392 l 389 365 q 515 388 460 365 q 604 450 571 410 q 638 544 638 490 q 596 649 638 606 q 484 717 554 693 q 326 738 414 740 q 199 720 263 738 q 72 669 136 703 l 100 593 q 215 637 157 622 q 328 653 274 651 q 435 639 388 653 q 509 597 482 625 q 536 531 536 569 q 513 468 536 494 q 449 428 490 442 q 353 414 407 414 l 235 414 l 235 342 l 360 342 q 504 309 451 342 q 557 218 557 276 q 529 146 557 178 q 451 96 501 114 q 333 76 401 78 q 196 97 265 76 q 74 156 126 117 l 42 82 q 179 14 101 36 q 336 -8 257 -8 z "
  },
  и: {
    ha: 956,
    x_min: 140,
    x_max: 814,
    o: "m 140 0 l 140 729 l 239 729 l 239 150 l 726 729 l 814 729 l 814 0 l 715 0 l 715 581 l 229 0 l 140 0 z "
  },
  й: {
    ha: 956,
    x_min: 140,
    x_max: 814,
    o: "m 140 0 l 140 729 l 239 729 l 239 150 l 726 729 l 814 729 l 814 0 l 715 0 l 715 581 l 229 0 l 140 0 m 471 835 q 323 881 379 835 q 264 1015 267 928 l 335 1015 q 374 928 336 960 q 471 896 411 896 q 569 928 531 896 q 608 1015 607 960 l 679 1015 q 621 881 678 928 q 471 835 564 835 z "
  },
  ѝ: {
    ha: 956,
    x_min: 140,
    x_max: 814,
    o: "m 140 0 l 140 729 l 239 729 l 239 150 l 726 729 l 814 729 l 814 0 l 715 0 l 715 581 l 229 0 l 140 0 m 465 843 l 240 1015 l 372 1015 l 563 843 l 465 843 z "
  },
  "ҋ": {
    ha: 982,
    x_min: 140,
    x_max: 933,
    o: "m 140 0 l 140 729 l 239 729 l 239 150 l 726 729 l 814 729 l 814 0 l 715 0 l 715 581 l 229 0 l 140 0 m 472 836 q 324 884 385 836 q 261 1015 264 932 l 331 1015 q 374 929 333 961 q 472 897 415 897 q 572 929 531 897 q 614 1015 613 961 l 683 1015 q 620 884 681 932 q 472 836 560 836 m 778 -160 l 829 26 l 889 0 l 717 0 l 717 86 l 935 86 l 858 -160 l 778 -160 z "
  },
  к: {
    ha: 807,
    x_min: 140,
    x_max: 792,
    o: "m 675 0 l 375 361 l 457 410 l 792 0 l 675 0 m 140 0 l 140 729 l 239 729 l 239 0 l 140 0 m 208 325 l 208 410 l 443 410 l 443 325 l 208 325 m 465 354 l 374 368 l 664 729 l 771 729 l 465 354 z "
  },
  ќ: {
    ha: 807,
    x_min: 140,
    x_max: 792,
    o: "m 675 0 l 375 361 l 457 410 l 792 0 l 675 0 m 140 0 l 140 729 l 239 729 l 239 0 l 140 0 m 208 325 l 208 410 l 443 410 l 443 325 l 208 325 m 465 354 l 374 368 l 664 729 l 771 729 l 465 354 m 325 843 l 515 1015 l 647 1015 l 422 843 l 325 843 z "
  },
  л: {
    ha: 878,
    x_min: 7,
    x_max: 738,
    o: "m 7 1 l 14 86 q 33 83 24 85 q 49 81 42 81 q 120 114 93 81 q 161 203 147 147 q 181 328 175 258 q 190 469 186 399 l 203 729 l 738 729 l 738 0 l 639 0 l 639 672 l 664 643 l 267 643 l 290 674 l 279 463 q 265 282 275 368 q 233 131 254 196 q 174 28 211 65 q 78 -8 136 -8 q 44 -6 61 -8 q 7 1 26 -3 z "
  },
  м: {
    ha: 1097,
    x_min: 140,
    x_max: 957,
    o: "m 140 0 l 140 729 l 240 729 l 571 169 l 529 169 l 865 729 l 957 729 l 957 0 l 867 0 l 867 617 l 885 608 l 571 89 l 526 89 l 210 614 l 231 618 l 231 0 l 140 0 z "
  },
  н: {
    ha: 938,
    x_min: 140,
    x_max: 797,
    o: "m 140 0 l 140 729 l 239 729 l 239 407 l 699 407 l 699 729 l 797 729 l 797 0 l 699 0 l 699 322 l 239 322 l 239 0 l 140 0 z "
  },
  о: {
    ha: 883,
    x_min: 69,
    x_max: 813,
    o: "m 440 -7 q 251 41 335 -7 q 118 173 167 89 q 69 365 69 257 q 118 558 69 475 q 250 689 167 642 q 440 736 333 736 q 633 689 549 736 q 765 558 717 642 q 813 365 813 475 q 765 173 813 257 q 632 41 717 89 q 440 -7 547 -7 m 440 81 q 581 116 519 81 q 677 216 642 151 q 713 365 713 281 q 677 515 713 451 q 581 615 642 579 q 442 650 519 650 q 303 615 364 650 q 206 515 242 579 q 169 365 169 451 q 206 216 169 281 q 303 116 242 151 q 440 81 364 81 z "
  },
  п: {
    ha: 936,
    x_min: 140,
    x_max: 796,
    o: "m 140 0 l 140 729 l 796 729 l 796 0 l 697 0 l 697 669 l 722 643 l 214 643 l 239 669 l 239 0 l 140 0 z "
  },
  р: {
    ha: 953,
    x_min: 142,
    x_max: 882,
    o: "m 517 -7 q 346 37 422 -7 q 224 163 269 81 q 179 365 179 246 q 224 567 179 485 q 344 693 268 650 q 517 736 421 736 q 703 690 621 736 q 833 559 786 643 q 881 365 881 475 q 833 171 881 254 q 703 40 786 88 q 517 -7 621 -7 m 140 -269 l 140 729 l 235 729 l 235 510 l 225 364 l 239 217 l 239 -269 l 140 -269 m 510 81 q 649 116 588 81 q 746 216 710 151 q 782 365 782 281 q 746 514 782 450 q 649 614 710 578 q 510 650 588 650 q 370 614 432 650 q 273 514 308 578 q 238 365 238 450 q 273 216 238 281 q 370 116 308 151 q 510 81 432 81 z "
  },
  с: {
    ha: 782,
    x_min: 69,
    x_max: 732,
    o: "m 446 -7 q 252 41 338 -7 q 118 173 167 89 q 69 365 69 257 q 118 558 69 475 q 252 689 167 642 q 446 736 338 736 q 614 700 539 736 q 732 592 689 664 l 658 542 q 565 624 621 597 q 444 650 510 650 q 304 615 367 650 q 206 515 242 579 q 169 365 169 451 q 206 215 169 279 q 304 116 242 151 q 444 81 367 81 q 565 107 510 81 q 658 188 621 133 l 732 138 q 614 30 689 67 q 446 -7 539 -7 z "
  },
  т: {
    ha: 657,
    x_min: 3,
    x_max: 654,
    o: "m 279 0 l 279 669 l 304 643 l 3 643 l 3 729 l 654 729 l 654 643 l 353 643 l 378 669 l 378 0 l 279 0 z "
  },
  у: {
    ha: 775,
    x_min: -25,
    x_max: 761,
    o: "m 153 -276 q 55 -260 101 -276 q -25 -210 8 -243 l 21 -136 q 81 -177 49 -162 q 154 -192 114 -192 q 238 -165 203 -192 q 306 -69 274 -137 l 353 38 l 364 53 l 664 729 l 761 729 l 396 -87 q 328 -200 365 -158 q 249 -259 292 -242 q 153 -276 206 -276 m 347 -21 l 11 729 l 114 729 l 411 60 l 347 -21 z "
  },
  ў: {
    ha: 775,
    x_min: -25,
    x_max: 761,
    o: "m 153 -276 q 55 -260 101 -276 q -25 -210 8 -243 l 21 -136 q 81 -177 49 -162 q 154 -192 114 -192 q 238 -165 203 -192 q 306 -69 274 -137 l 353 38 l 364 53 l 664 729 l 761 729 l 396 -87 q 328 -200 365 -158 q 249 -259 292 -242 q 153 -276 206 -276 m 347 -21 l 11 729 l 114 729 l 411 60 l 347 -21 m 367 835 q 219 881 275 835 q 160 1015 163 928 l 231 1015 q 269 928 232 960 q 367 896 307 896 q 465 928 426 896 q 504 1015 503 960 l 575 1015 q 517 881 574 928 q 367 835 460 835 z "
  },
  ф: {
    ha: 1090,
    x_min: 68,
    x_max: 1022,
    o: "m 550 -8 q 544 -8 550 -8 q 534 -8 539 -8 q 526 -8 529 -8 q 189 90 310 -7 q 68 367 68 188 q 190 640 68 543 q 532 738 311 736 q 538 738 533 738 q 547 738 543 738 q 553 738 551 738 q 899 640 775 736 q 1022 367 1022 543 q 898 89 1022 186 q 550 -8 774 -8 m 549 78 q 756 112 672 78 q 882 210 839 146 q 925 367 925 274 q 882 520 925 457 q 756 617 839 583 q 549 650 672 650 q 541 650 547 650 q 533 650 535 650 q 331 616 413 650 q 207 519 249 582 q 165 367 165 457 q 208 211 165 275 q 332 113 250 147 q 533 78 414 79 q 542 78 536 78 q 549 78 547 78 m 496 -269 l 496 1031 l 592 1031 l 592 -269 l 496 -269 z "
  },
  х: {
    ha: 731,
    x_min: 21,
    x_max: 710,
    o: "m 21 0 l 329 400 l 328 351 l 35 729 l 146 729 l 386 417 l 344 418 l 585 729 l 693 729 l 397 347 l 399 400 l 710 0 l 597 0 l 343 333 l 382 328 l 132 0 l 21 0 z "
  },
  ч: {
    ha: 832,
    x_min: 65,
    x_max: 692,
    o: "m 601 308 q 473 265 538 281 q 344 249 408 249 q 140 308 215 249 q 65 490 65 367 l 65 729 l 163 729 l 163 496 q 217 371 163 413 q 363 329 271 329 q 479 344 418 329 q 603 386 540 358 l 601 308 m 593 0 l 593 729 l 692 729 l 692 0 l 593 0 z "
  },
  ц: {
    ha: 950,
    x_min: 140,
    x_max: 901,
    o: "m 140 0 l 140 729 l 239 729 l 239 86 l 685 86 l 685 729 l 783 729 l 783 0 l 140 0 m 808 -176 l 808 8 l 833 0 l 685 0 l 685 86 l 901 86 l 901 -176 l 808 -176 z "
  },
  ш: {
    ha: 1289,
    x_min: 140,
    x_max: 1149,
    o: "m 619 86 l 597 60 l 597 729 l 696 729 l 696 60 l 669 86 l 1076 86 l 1050 60 l 1050 729 l 1149 729 l 1149 0 l 140 0 l 140 729 l 239 729 l 239 60 l 214 86 l 619 86 z "
  },
  щ: {
    ha: 1289,
    x_min: 140,
    x_max: 1261,
    o: "m 619 86 l 597 60 l 597 729 l 696 729 l 696 60 l 669 86 l 1076 86 l 1050 60 l 1050 729 l 1149 729 l 1149 0 l 140 0 l 140 729 l 239 729 l 239 60 l 214 86 l 619 86 m 1168 -160 l 1168 26 l 1193 0 l 1044 0 l 1044 86 l 1261 86 l 1261 -160 l 1168 -160 z "
  },
  џ: {
    ha: 888,
    x_min: 140,
    x_max: 747,
    o: "m 747 729 l 747 0 l 492 0 l 492 -176 l 397 -176 l 397 0 l 140 0 l 140 729 l 239 729 l 239 86 l 649 86 l 649 729 l 747 729 z "
  },
  ь: {
    ha: 782,
    x_min: 140,
    x_max: 735,
    o: "m 454 472 q 663 411 592 471 q 735 239 735 351 q 658 60 735 122 q 435 -1 581 -3 l 140 0 l 140 729 l 239 729 l 239 475 l 454 472 m 429 74 q 583 115 531 72 q 635 239 635 157 q 583 359 635 321 q 429 399 532 397 l 239 401 l 239 76 l 429 74 z "
  },
  ъ: {
    ha: 863,
    x_min: 3,
    x_max: 815,
    o: "m 539 475 q 745 414 675 475 q 815 242 815 353 q 739 62 815 124 q 519 0 663 0 l 231 0 l 231 643 l 3 643 l 3 729 l 329 729 l 329 475 l 539 475 m 518 76 q 665 118 615 76 q 715 242 715 160 q 518 400 715 400 l 329 400 l 329 76 l 518 76 z "
  },
  ы: {
    ha: 1090,
    x_min: 140,
    x_max: 950,
    o: "m 851 0 l 851 729 l 950 729 l 950 0 l 851 0 m 447 472 q 657 411 585 471 q 729 239 729 351 q 651 60 729 122 q 429 -1 574 -3 l 140 0 l 140 729 l 239 729 l 239 475 l 447 472 m 422 74 q 577 115 525 72 q 629 239 629 157 q 578 359 629 321 q 422 399 526 397 l 239 401 l 239 76 l 422 74 z "
  },
  љ: {
    ha: 1279,
    x_min: 7,
    x_max: 1233,
    o: "m 7 1 l 14 86 q 33 83 24 85 q 49 81 42 81 q 120 114 93 81 q 161 203 147 147 q 181 328 175 258 q 190 469 186 399 l 203 729 l 738 729 l 738 0 l 639 0 l 639 672 l 664 643 l 267 643 l 290 674 l 279 463 q 265 282 275 368 q 233 131 254 196 q 174 28 211 65 q 78 -8 136 -8 q 44 -6 61 -8 q 7 1 26 -3 m 951 472 q 1160 411 1089 471 q 1232 239 1232 351 q 1155 60 1232 122 q 932 -1 1078 -3 l 638 0 l 638 729 l 736 729 l 736 475 l 951 472 m 926 74 q 1080 115 1028 72 q 1132 239 1132 157 q 1081 359 1132 321 q 926 399 1029 397 l 736 401 l 736 76 l 926 74 z "
  },
  њ: {
    ha: 1311,
    x_min: 140,
    x_max: 1271,
    o: "m 1006 436 q 1201 381 1132 436 q 1271 225 1271 326 q 1196 60 1271 119 q 986 0 1121 0 l 683 0 l 683 351 l 239 351 l 239 0 l 140 0 l 140 729 l 239 729 l 239 436 l 683 436 l 683 729 l 782 729 l 782 436 l 1006 436 m 983 75 q 1122 113 1074 75 q 1171 219 1171 151 q 1122 321 1171 286 q 983 356 1074 356 l 782 356 l 782 75 l 983 75 z "
  },
  ѕ: {
    ha: 733,
    x_min: 65,
    x_max: 664,
    o: "m 363 -7 q 192 19 272 -7 q 65 83 111 44 l 110 161 q 224 103 154 128 q 369 79 293 79 q 519 112 474 79 q 565 199 565 144 q 540 262 565 239 q 472 297 514 285 q 379 317 431 308 q 277 336 328 325 q 185 369 226 347 q 117 428 143 390 q 92 528 92 465 q 125 635 92 588 q 223 709 158 682 q 381 736 288 736 q 522 717 451 736 q 639 668 593 699 l 596 589 q 492 637 547 622 q 381 651 436 651 q 235 617 282 651 q 189 531 189 583 q 215 465 189 489 q 283 428 240 442 q 376 407 325 415 q 477 387 426 399 q 570 355 528 375 q 638 298 613 335 q 664 201 664 261 q 628 91 664 138 q 526 19 593 44 q 363 -7 458 -7 z "
  },
  є: {
    ha: 794,
    x_min: 68,
    x_max: 751,
    o: "m 553 396 l 553 322 l 129 322 l 129 396 l 553 396 m 456 -7 q 257 41 344 -7 q 119 174 169 89 q 68 365 68 258 q 119 558 68 474 q 257 690 169 642 q 456 738 344 738 q 622 710 546 738 q 751 626 699 682 l 694 569 q 587 635 646 614 q 458 656 528 656 q 306 618 374 656 q 199 515 239 581 q 160 365 160 449 q 199 215 160 281 q 306 112 239 150 q 458 74 374 74 q 587 95 528 74 q 694 163 646 117 l 751 106 q 622 22 699 50 q 456 -7 546 -7 z "
  },
  э: {
    ha: 793,
    x_min: 42,
    x_max: 726,
    o: "m 242 333 l 242 408 l 665 408 l 665 333 l 242 333 m 339 736 q 538 688 450 736 q 676 556 625 640 q 726 365 726 472 q 676 174 726 258 q 538 40 625 89 q 339 -8 450 -8 q 172 20 249 -8 q 42 103 94 49 l 100 161 q 207 95 147 117 q 335 74 267 74 q 488 112 421 74 q 594 216 556 150 q 633 365 633 282 q 594 515 633 449 q 488 618 556 581 q 335 656 421 656 q 207 634 267 656 q 100 568 147 613 l 42 625 q 172 708 94 681 q 339 736 249 736 z "
  },
  і: {
    ha: 379,
    x_min: 118,
    x_max: 263,
    o: "m 140 0 l 140 729 l 239 729 l 239 0 l 140 0 m 190 890 q 139 911 160 890 q 118 961 118 932 q 139 1010 118 990 q 190 1031 160 1031 q 242 1011 221 1031 q 263 963 263 992 q 242 911 263 932 q 190 890 222 890 z "
  },
  ї: {
    ha: 374,
    x_min: 38,
    x_max: 336,
    o: "m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 279 875 q 239 892 256 875 q 222 935 222 910 q 239 976 222 958 q 279 993 256 993 q 321 976 304 993 q 338 935 338 960 q 321 892 338 910 q 279 875 304 875 m 96 875 q 54 892 71 875 q 38 935 38 910 q 54 976 38 958 q 96 993 71 993 q 137 976 121 993 q 153 935 153 960 q 137 892 153 910 q 96 875 121 875 z "
  },
  ј: {
    ha: 381,
    x_min: -128,
    x_max: 264,
    o: "m 26 -276 q -59 -265 -18 -276 q -128 -229 -100 -253 l -93 -154 q 21 -192 -49 -192 q 110 -157 79 -192 q 142 -54 142 -122 l 142 729 l 240 729 l 240 -54 q 185 -216 240 -156 q 26 -276 131 -276 m 192 890 q 140 911 161 890 q 119 961 119 932 q 140 1010 119 990 q 192 1031 161 1031 q 243 1011 222 1031 q 264 963 264 992 q 244 911 264 932 q 192 890 224 890 z "
  },
  ћ: {
    ha: 931,
    x_min: -46,
    x_max: 813,
    o: "m -46 847 l -46 910 l 586 910 l 586 847 l -46 847 m 513 736 q 669 702 603 736 q 774 599 736 668 q 813 424 813 529 l 813 0 l 714 0 l 714 414 q 657 588 714 529 q 496 647 600 647 q 359 616 417 647 q 271 526 301 585 q 240 383 240 467 l 240 0 l 142 0 l 142 1031 l 240 1031 l 240 529 l 221 567 q 331 691 256 646 q 513 736 407 736 z "
  },
  ю: {
    ha: 1201,
    x_min: 140,
    x_max: 1131,
    o: "m 140 0 l 140 729 l 239 729 l 239 415 l 461 415 l 461 325 l 239 325 l 239 0 l 140 0 m 768 -7 q 581 41 664 -7 q 451 173 499 89 q 404 365 404 257 q 451 558 404 475 q 581 689 499 642 q 768 736 664 736 q 954 689 872 736 q 1083 558 1036 642 q 1131 365 1131 475 q 1083 173 1131 257 q 954 41 1036 89 q 768 -7 872 -7 m 768 79 q 904 115 844 79 q 999 216 964 151 q 1033 365 1033 281 q 999 515 1033 451 q 904 615 964 579 q 768 650 844 650 q 633 615 693 650 q 538 515 572 579 q 503 365 503 451 q 538 216 503 281 q 633 115 572 151 q 768 79 693 79 z "
  },
  я: {
    ha: 842,
    x_min: 78,
    x_max: 701,
    o: "m 611 0 l 611 263 l 629 242 l 382 242 q 163 303 242 242 q 83 481 83 364 q 168 667 83 606 q 394 729 253 729 l 701 729 l 701 0 l 611 0 m 78 0 l 278 281 l 381 281 l 185 0 l 78 0 m 611 292 l 611 672 l 629 643 l 397 643 q 240 604 296 643 q 183 478 183 565 q 390 315 183 315 l 629 315 l 611 292 z "
  },
  ђ: {
    ha: 931,
    x_min: -10,
    x_max: 813,
    o: "m 600 -276 q 513 -265 554 -276 q 444 -229 472 -253 l 479 -154 q 593 -192 524 -192 q 683 -157 651 -192 q 714 -54 714 -122 l 714 414 q 657 588 714 529 q 496 647 600 647 q 359 616 417 647 q 271 526 301 585 q 240 383 240 467 l 240 0 l 142 0 l 142 1031 l 236 1031 l 236 529 l 221 567 q 331 691 256 646 q 513 736 407 736 q 669 702 603 736 q 774 599 736 668 q 813 424 813 529 l 813 -54 q 758 -216 813 -156 q 600 -276 703 -276 m -10 843 l -10 915 l 582 915 l 582 843 l -10 843 z "
  },
  ѣ: {
    ha: 828,
    x_min: 3,
    x_max: 782,
    o: "m 3 682 l 3 757 l 560 757 l 560 682 l 3 682 m 500 472 q 710 411 638 471 q 782 239 782 351 q 704 60 782 122 q 482 -1 626 -3 l 188 0 l 188 1031 l 286 1031 l 286 475 l 500 472 m 476 74 q 630 115 578 72 q 682 239 682 157 q 631 359 682 321 q 476 399 579 397 l 286 401 l 286 76 l 476 74 z "
  },
  ѫ: {
    ha: 944,
    x_min: 28,
    x_max: 918,
    o: "m 28 0 l 100 167 q 172 292 132 243 q 261 365 211 342 q 371 388 311 388 l 575 388 q 685 365 636 388 q 774 292 735 342 q 846 167 814 243 l 918 0 l 819 0 l 758 143 q 676 274 725 232 q 556 317 626 317 l 514 317 l 514 0 l 428 0 l 428 317 l 390 317 q 270 274 321 317 q 186 143 219 232 l 126 0 l 28 0 m 471 388 l 729 660 l 214 660 l 471 388 m 389 369 l 108 665 l 108 729 l 833 729 l 833 665 l 553 369 l 389 369 z "
  },
  ѳ: {
    ha: 897,
    x_min: 69,
    x_max: 828,
    o: "m 449 736 q 644 689 558 736 q 778 558 729 642 q 828 365 828 475 q 778 173 828 257 q 644 41 729 89 q 449 -7 558 -7 q 253 41 339 -7 q 119 173 168 89 q 69 365 69 257 q 119 558 69 475 q 254 689 168 642 q 449 736 340 736 m 449 657 q 311 625 372 657 q 212 536 250 593 q 167 401 174 479 l 731 401 q 685 535 724 478 q 586 625 647 593 q 449 657 525 657 m 449 74 q 586 106 525 74 q 685 195 647 138 q 731 331 724 253 l 167 331 q 211 195 174 253 q 310 106 249 138 q 449 74 372 74 z "
  },
  ѵ: {
    ha: 799,
    x_min: 14,
    x_max: 796,
    o: "m 333 0 l 14 729 l 122 729 l 414 54 l 356 54 l 551 574 q 613 688 581 649 q 689 736 644 728 q 796 728 733 744 l 785 631 q 719 636 744 642 q 674 601 693 631 q 629 510 654 571 l 432 0 l 333 0 z "
  },
  ғ: {
    ha: 697,
    x_min: 64,
    x_max: 678,
    o: "m 64 288 l 64 360 l 579 360 l 579 288 l 64 288 m 161 0 l 161 729 l 678 729 l 678 643 l 235 643 l 260 668 l 260 0 l 161 0 z "
  },
  ҕ: {
    ha: 822,
    x_min: 140,
    x_max: 783,
    o: "m 140 0 l 140 729 l 639 729 l 639 643 l 214 643 l 239 669 l 239 0 l 140 0 m 340 -267 l 363 -181 q 532 -172 460 -197 q 644 -85 604 -147 q 683 64 683 -24 q 653 197 683 144 q 574 276 624 249 q 463 306 524 303 q 339 289 401 308 q 221 229 276 269 l 218 319 q 378 381 297 365 q 533 385 460 397 q 662 332 606 372 q 751 226 718 292 q 783 68 783 160 q 751 -91 783 -21 q 659 -207 718 -161 q 519 -269 600 -253 q 340 -267 438 -285 z "
  },
  җ: {
    ha: 1197,
    x_min: 24,
    x_max: 1188,
    o: "m 1006 0 l 756 361 l 838 410 l 1124 0 l 1006 0 m 592 325 l 592 410 l 822 410 l 822 325 l 592 325 m 847 354 l 753 368 l 996 729 l 1103 729 l 847 354 m 142 0 l 24 0 l 310 410 l 390 361 l 142 0 m 622 0 l 524 0 l 524 729 l 622 729 l 622 0 m 554 325 l 325 325 l 325 410 l 554 410 l 554 325 m 301 354 l 44 729 l 151 729 l 393 368 l 301 354 m 1097 -161 l 1097 26 l 1124 0 l 1004 0 l 1004 85 l 1188 85 l 1188 -161 l 1097 -161 z "
  },
  ҙ: {
    ha: 742,
    x_min: 42,
    x_max: 658,
    o: "m 336 -8 q 499 19 426 -8 q 615 97 572 47 q 658 211 658 146 q 588 343 658 294 q 393 392 518 392 l 389 365 q 515 388 460 365 q 604 450 571 410 q 638 544 638 490 q 596 649 638 606 q 484 717 554 693 q 326 738 414 740 q 199 720 263 738 q 72 669 136 703 l 100 593 q 215 637 157 622 q 328 653 274 651 q 435 639 388 653 q 509 597 482 625 q 536 531 536 569 q 513 468 536 494 q 449 428 490 442 q 353 414 407 414 l 235 414 l 235 342 l 360 342 q 504 309 451 342 q 557 218 557 276 q 529 146 557 178 q 451 96 501 114 q 333 76 401 78 q 196 97 265 76 q 74 156 126 117 l 42 82 q 179 14 101 36 q 336 -8 257 -8 m 388 24 l 294 24 l 294 -160 l 388 -160 l 388 24 z "
  },
  қ: {
    ha: 807,
    x_min: 140,
    x_max: 858,
    o: "m 675 0 l 375 361 l 457 410 l 792 0 l 675 0 m 140 0 l 140 729 l 239 729 l 239 0 l 140 0 m 208 325 l 208 410 l 443 410 l 443 325 l 208 325 m 465 354 l 374 368 l 664 729 l 771 729 l 465 354 m 768 -161 l 768 26 l 794 0 l 675 0 l 675 85 l 858 85 l 858 -161 l 768 -161 z "
  },
  ҝ: {
    ha: 829,
    x_min: 138,
    x_max: 807,
    o: "m 692 0 l 429 361 l 508 408 l 807 0 l 692 0 m 138 0 l 138 729 l 236 729 l 236 0 l 138 0 m 207 325 l 207 410 l 492 410 l 492 325 l 207 325 m 517 354 l 426 368 l 681 729 l 786 729 l 517 354 m 325 178 l 325 560 l 397 560 l 397 178 l 325 178 z "
  },
  ҟ: {
    ha: 807,
    x_min: 1,
    x_max: 792,
    o: "m 1 843 l 1 917 l 460 915 l 460 843 l 1 843 m 675 0 l 375 361 l 457 410 l 792 0 l 675 0 m 142 0 l 142 1031 l 240 1031 l 240 0 l 142 0 m 210 325 l 210 410 l 443 410 l 443 325 l 210 325 m 465 354 l 374 368 l 664 729 l 771 729 l 465 354 z "
  },
  ҡ: {
    ha: 897,
    x_min: 3,
    x_max: 882,
    o: "m 3 644 l 3 729 l 329 729 l 329 644 l 3 644 m 765 0 l 465 361 l 547 410 l 882 0 l 765 0 m 231 0 l 231 729 l 329 729 l 329 0 l 231 0 m 299 325 l 299 410 l 533 410 l 533 325 l 299 325 m 556 354 l 464 368 l 754 729 l 861 729 l 556 354 z "
  },
  ң: {
    ha: 963,
    x_min: 140,
    x_max: 914,
    o: "m 140 0 l 140 729 l 239 729 l 239 407 l 699 407 l 699 729 l 797 729 l 797 0 l 699 0 l 699 322 l 239 322 l 239 0 l 140 0 m 821 -160 l 821 26 l 846 0 l 697 0 l 697 86 l 914 86 l 914 -160 l 821 -160 z "
  },
  ҥ: {
    ha: 1218,
    x_min: 140,
    x_max: 1215,
    o: "m 140 0 l 140 729 l 239 729 l 239 407 l 699 407 l 699 729 l 797 729 l 797 0 l 699 0 l 699 322 l 239 322 l 239 0 l 140 0 m 699 0 l 699 729 l 1215 729 l 1215 643 l 772 643 l 797 668 l 797 0 l 699 0 z "
  },
  "ԥ": {
    ha: 936,
    x_min: 140,
    x_max: 913,
    o: "m 140 0 l 140 729 l 796 729 l 796 0 l 697 0 l 697 669 l 722 643 l 214 643 l 239 669 l 239 0 l 140 0 m 821 -160 l 821 26 l 846 0 l 697 0 l 697 86 l 914 86 l 914 -160 l 821 -160 z "
  },
  ҩ: {
    ha: 1103,
    x_min: 72,
    x_max: 1010,
    o: "m 504 -8 q 278 41 376 -8 q 126 179 181 90 q 72 385 72 268 q 125 590 72 496 q 272 739 178 683 l 347 693 q 217 558 264 639 q 171 382 171 478 q 215 217 171 288 q 336 106 258 146 q 518 67 414 67 q 718 113 631 67 q 855 241 806 160 q 904 428 904 322 q 879 546 904 494 q 808 626 854 597 q 703 654 763 654 q 593 624 640 654 q 519 541 546 594 q 493 417 493 488 q 533 248 493 321 q 644 129 574 175 q 806 71 714 83 q 1001 85 899 58 l 1010 11 q 824 -8 914 -14 q 656 31 733 -1 q 521 119 579 64 q 430 250 463 175 q 397 415 397 325 q 435 585 397 513 q 543 698 474 657 q 704 739 613 739 q 860 700 793 739 q 964 592 926 661 q 1001 433 1001 524 q 963 259 1001 339 q 857 119 925 179 q 699 25 789 58 q 504 -8 608 -8 z "
  },
  ҫ: {
    ha: 782,
    x_min: 69,
    x_max: 732,
    o: "m 446 -7 q 252 41 338 -7 q 118 173 167 89 q 69 365 69 257 q 118 558 69 475 q 252 689 167 642 q 446 736 338 736 q 614 700 539 736 q 732 592 689 664 l 658 542 q 565 624 621 597 q 444 650 510 650 q 304 615 367 650 q 206 515 242 579 q 169 365 169 451 q 206 215 169 279 q 304 116 242 151 q 444 81 367 81 q 565 107 510 81 q 658 188 621 133 l 732 138 q 614 30 689 67 q 446 -7 539 -7 m 485 24 l 485 -160 l 392 -160 l 392 24 l 485 24 z "
  },
  ҭ: {
    ha: 657,
    x_min: 3,
    x_max: 654,
    o: "m 279 0 l 279 669 l 304 643 l 3 643 l 3 729 l 654 729 l 654 643 l 353 643 l 378 669 l 378 0 l 279 0 m 401 -160 l 401 26 l 426 0 l 279 0 l 279 86 l 494 86 l 494 -160 l 401 -160 z "
  },
  ү: {
    ha: 776,
    x_min: 14,
    x_max: 764,
    o: "m 360 -51 l 14 729 l 118 729 l 414 53 l 365 53 l 667 729 l 764 729 l 417 -51 l 360 -51 m 438 49 l 438 -269 l 339 -269 l 339 49 l 438 49 z "
  },
  ұ: {
    ha: 776,
    x_min: 14,
    x_max: 764,
    o: "m 100 -28 l 100 43 l 675 43 l 675 -28 l 100 -28 m 360 -51 l 14 729 l 118 729 l 414 53 l 365 53 l 667 729 l 764 729 l 417 -51 l 360 -51 m 438 49 l 438 -269 l 339 -269 l 339 49 l 438 49 z "
  },
  ҳ: {
    ha: 731,
    x_min: 21,
    x_max: 779,
    o: "m 21 0 l 329 400 l 328 351 l 35 729 l 146 729 l 386 417 l 344 418 l 585 729 l 693 729 l 397 347 l 399 400 l 710 0 l 597 0 l 343 333 l 382 328 l 132 0 l 21 0 m 689 -161 l 689 26 l 715 0 l 596 0 l 596 85 l 779 85 l 779 -161 l 689 -161 z "
  },
  ҵ: {
    ha: 1051,
    x_min: 3,
    x_max: 996,
    o: "m 279 0 l 279 729 l 378 729 l 378 86 l 789 86 l 789 729 l 888 729 l 888 0 l 279 0 m 903 -160 l 903 26 l 926 0 l 789 0 l 789 86 l 996 86 l 996 -160 l 903 -160 m 614 729 l 614 643 l 3 643 l 3 729 l 614 729 z "
  },
  ҷ: {
    ha: 863,
    x_min: 65,
    x_max: 808,
    o: "m 601 308 q 473 265 538 281 q 344 249 408 249 q 140 308 215 249 q 65 490 65 367 l 65 729 l 163 729 l 163 496 q 217 371 163 413 q 363 329 271 329 q 479 344 418 329 q 603 386 540 358 l 601 308 m 593 0 l 593 729 l 692 729 l 692 0 l 593 0 m 717 -160 l 717 26 l 742 0 l 593 0 l 593 86 l 810 86 l 810 -160 l 717 -160 z "
  },
  ҹ: {
    ha: 832,
    x_min: 64,
    x_max: 692,
    o: "m 340 103 l 340 489 l 413 489 l 413 103 l 340 103 m 601 308 q 472 265 538 281 q 343 249 407 249 q 140 308 215 249 q 64 490 64 367 l 64 729 l 163 729 l 163 496 q 217 371 163 413 q 361 329 271 329 q 478 344 417 329 q 601 386 539 358 l 601 308 m 593 0 l 593 729 l 692 729 l 692 0 l 593 0 z "
  },
  һ: {
    ha: 931,
    x_min: 142,
    x_max: 813,
    o: "m 513 736 q 669 702 601 736 q 774 599 736 668 q 813 424 813 529 l 813 0 l 714 0 l 714 414 q 656 588 714 529 q 494 647 599 647 q 359 616 417 647 q 270 526 301 585 q 239 383 239 467 l 239 0 l 140 0 l 140 1031 l 239 1031 l 239 529 l 219 567 q 331 691 254 646 q 513 736 407 736 z "
  },
  "ԧ": {
    ha: 961,
    x_min: 140,
    x_max: 921,
    o: "m 714 0 l 714 411 q 656 585 714 526 q 496 644 599 644 q 360 613 418 644 q 270 522 301 581 q 239 381 239 463 l 194 417 q 239 587 199 515 q 351 697 279 658 q 519 736 424 736 q 673 702 607 736 q 776 599 739 668 q 813 426 813 529 l 813 0 l 714 0 m 140 0 l 140 1031 l 239 1031 l 239 0 l 140 0 m 828 -160 l 828 26 l 874 0 l 714 0 l 714 86 l 921 86 l 921 -160 l 828 -160 z "
  },
  ҽ: {
    ha: 1044,
    x_min: 28,
    x_max: 982,
    o: "m 292 335 l 218 335 q 85 371 132 335 q 33 467 39 407 q 65 599 28 528 l 149 578 q 121 496 121 535 q 148 433 121 457 q 229 408 175 408 l 292 408 l 292 335 m 642 -7 q 436 41 525 -7 q 297 173 347 89 q 246 365 246 257 q 294 557 246 474 q 426 688 342 640 q 615 736 510 736 q 804 690 722 736 q 934 559 886 643 q 982 365 982 475 q 981 351 982 358 q 979 335 981 343 l 324 335 l 324 408 l 926 408 l 885 379 q 851 520 886 458 q 755 617 815 582 q 615 651 694 651 q 476 617 536 651 q 380 519 415 582 q 344 376 344 457 l 344 361 q 383 215 344 278 q 490 116 422 151 q 644 81 557 81 q 774 104 715 81 q 876 176 833 128 l 933 113 q 808 24 883 54 q 642 -7 733 -7 z "
  },
  ҿ: {
    ha: 1044,
    x_min: 28,
    x_max: 982,
    o: "m 292 335 l 218 335 q 85 371 132 335 q 33 467 39 407 q 65 599 28 528 l 149 578 q 121 496 121 535 q 148 433 121 457 q 229 408 175 408 l 292 408 l 292 335 m 642 -7 q 436 41 525 -7 q 297 173 347 89 q 246 365 246 257 q 294 557 246 474 q 426 688 342 640 q 615 736 510 736 q 804 690 722 736 q 934 559 886 643 q 982 365 982 475 q 981 351 982 358 q 979 335 981 343 l 324 335 l 324 408 l 926 408 l 885 379 q 851 520 886 458 q 755 617 815 582 q 615 651 694 651 q 476 617 536 651 q 380 519 415 582 q 344 376 344 457 l 344 361 q 383 215 344 278 q 490 116 422 151 q 644 81 557 81 q 774 104 715 81 q 876 176 833 128 l 933 113 q 808 24 883 54 q 642 -7 733 -7 m 671 24 l 671 -160 l 578 -160 l 578 24 l 671 24 z "
  },
  "ӏ": {
    ha: 381,
    x_min: 142,
    x_max: 240,
    o: "m 142 0 l 142 1031 l 240 1031 l 240 0 l 142 0 z "
  },
  ӂ: {
    ha: 1147,
    x_min: 24,
    x_max: 1124,
    o: "m 1006 0 l 756 361 l 838 410 l 1124 0 l 1006 0 m 592 325 l 592 410 l 822 410 l 822 325 l 592 325 m 847 354 l 753 368 l 996 729 l 1103 729 l 847 354 m 142 0 l 24 0 l 310 410 l 390 361 l 142 0 m 622 0 l 524 0 l 524 729 l 622 729 l 622 0 m 554 325 l 325 325 l 325 410 l 554 410 l 554 325 m 301 354 l 44 729 l 151 729 l 393 368 l 301 354 m 572 835 q 424 881 481 835 q 365 1015 368 928 l 436 1015 q 475 928 438 960 q 572 896 513 896 q 670 928 632 896 q 710 1015 708 960 l 781 1015 q 722 881 779 928 q 572 835 665 835 z "
  },
  ӄ: {
    ha: 807,
    x_min: 140,
    x_max: 771,
    o: "m 560 -276 q 407 -236 485 -276 l 436 -161 q 546 -193 496 -193 q 636 -158 601 -193 q 671 -65 671 -124 q 634 71 671 -3 q 532 219 597 144 q 382 357 467 294 l 457 413 q 622 256 551 339 q 731 89 692 172 q 769 -69 769 6 q 743 -178 769 -132 q 669 -251 717 -225 q 560 -276 622 -276 m 140 0 l 140 729 l 239 729 l 239 0 l 140 0 m 208 325 l 208 410 l 443 410 l 443 325 l 208 325 m 465 354 l 374 368 l 664 729 l 771 729 l 465 354 z "
  },
  "ӆ": {
    ha: 904,
    x_min: 7,
    x_max: 856,
    o: "m 7 1 l 14 86 q 33 83 24 85 q 49 81 42 81 q 120 114 93 81 q 161 203 147 147 q 181 328 175 258 q 190 469 186 399 l 203 729 l 738 729 l 738 0 l 639 0 l 639 672 l 664 643 l 267 643 l 290 674 l 279 463 q 265 282 275 368 q 233 131 254 196 q 174 28 211 65 q 78 -8 136 -8 q 44 -6 61 -8 q 7 1 26 -3 m 700 -160 l 751 26 l 811 0 l 639 0 l 639 86 l 857 86 l 781 -160 l 700 -160 z "
  },
  ӈ: {
    ha: 947,
    x_min: 140,
    x_max: 807,
    o: "m 597 -276 q 511 -265 553 -276 q 442 -229 469 -253 l 475 -154 q 585 -192 518 -192 q 676 -157 644 -192 q 708 -54 708 -122 l 708 322 l 239 322 l 239 0 l 140 0 l 140 729 l 239 729 l 239 407 l 708 407 l 708 729 l 807 729 l 807 -60 q 753 -217 807 -157 q 597 -276 699 -276 z "
  },
  "ӊ": {
    ha: 964,
    x_min: 140,
    x_max: 915,
    o: "m 140 0 l 140 729 l 239 729 l 239 407 l 699 407 l 699 729 l 797 729 l 797 0 l 699 0 l 699 322 l 239 322 l 239 0 l 140 0 m 760 -160 l 811 26 l 871 0 l 699 0 l 699 86 l 917 86 l 840 -160 l 760 -160 z "
  },
  ӌ: {
    ha: 829,
    x_min: 61,
    x_max: 689,
    o: "m 340 264 q 137 323 213 264 q 61 506 61 382 l 61 729 l 160 729 l 160 510 q 213 387 160 428 q 360 346 267 346 q 599 403 472 346 l 597 324 q 469 279 535 294 q 340 264 404 264 m 463 -160 l 463 82 l 681 82 l 681 0 l 531 0 l 557 26 l 557 -160 l 463 -160 m 590 0 l 590 729 l 689 729 l 689 0 l 590 0 z "
  },
  "ӎ": {
    ha: 1133,
    x_min: 140,
    x_max: 1085,
    o: "m 140 0 l 140 729 l 240 729 l 571 169 l 529 169 l 865 729 l 957 729 l 957 0 l 867 0 l 867 617 l 885 608 l 571 89 l 526 89 l 210 614 l 231 618 l 231 0 l 140 0 m 928 -160 l 979 26 l 1039 0 l 867 0 l 867 86 l 1085 86 l 1008 -160 l 928 -160 z "
  },
  ӑ: {
    ha: 810,
    x_min: 75,
    x_max: 688,
    o: "m 593 0 l 593 161 l 589 188 l 589 457 q 537 600 589 550 q 382 650 485 650 q 247 626 311 650 q 139 564 183 603 l 94 638 q 228 710 150 685 q 392 736 306 736 q 610 666 533 736 q 688 453 688 596 l 688 0 l 593 0 m 342 -7 q 199 20 260 -7 q 107 95 139 47 q 75 206 75 143 q 102 309 75 263 q 191 384 129 356 q 357 413 253 413 l 608 413 l 608 339 l 360 339 q 213 301 254 339 q 172 208 172 264 q 221 108 172 146 q 357 71 269 71 q 501 109 440 71 q 589 219 561 147 l 611 151 q 515 36 583 79 q 342 -7 446 -7 m 393 835 q 245 881 301 835 q 186 1015 189 928 l 257 1015 q 296 928 258 960 q 393 896 333 896 q 491 928 453 896 q 531 1015 529 960 l 601 1015 q 543 881 600 928 q 393 835 486 835 z "
  },
  ӓ: {
    ha: 810,
    x_min: 75,
    x_max: 688,
    o: "m 593 0 l 593 161 l 589 188 l 589 457 q 537 600 589 550 q 382 650 485 650 q 247 626 311 650 q 139 564 183 603 l 94 638 q 228 710 150 685 q 392 736 306 736 q 610 666 533 736 q 688 453 688 596 l 688 0 l 593 0 m 342 -7 q 199 20 260 -7 q 107 95 139 47 q 75 206 75 143 q 102 309 75 263 q 191 384 129 356 q 357 413 253 413 l 608 413 l 608 339 l 360 339 q 213 301 254 339 q 172 208 172 264 q 221 108 172 146 q 357 71 269 71 q 501 109 440 71 q 589 219 561 147 l 611 151 q 515 36 583 79 q 342 -7 446 -7 m 518 875 q 476 892 494 875 q 458 935 458 908 q 476 978 458 961 q 518 994 494 994 q 560 978 543 994 q 578 935 578 961 q 560 892 578 908 q 518 875 543 875 m 271 875 q 228 892 246 875 q 211 935 211 908 q 228 978 211 961 q 271 994 246 994 q 313 978 294 994 q 331 935 331 961 q 313 892 331 908 q 271 875 294 875 z "
  },
  ӕ: {
    ha: 1375,
    x_min: 75,
    x_max: 1304,
    o: "m 351 -7 q 148 53 221 -7 q 75 208 75 113 q 102 308 75 263 q 191 383 129 354 q 357 411 253 411 l 606 411 l 606 338 l 360 338 q 213 301 254 338 q 172 210 172 264 q 222 108 172 146 q 358 71 271 71 q 526 126 464 71 q 589 279 589 182 l 589 457 q 537 600 589 550 q 382 650 485 650 q 247 626 311 650 q 139 564 183 603 l 94 638 q 228 710 150 685 q 390 736 306 736 q 587 683 515 736 q 675 525 658 631 l 631 533 q 756 681 672 626 q 949 736 839 736 q 1090 709 1025 736 q 1202 633 1154 682 q 1277 518 1250 585 q 1304 371 1304 451 q 1303 353 1304 361 q 1301 338 1303 346 l 668 338 l 668 411 l 1249 411 l 1208 379 q 1173 524 1208 464 q 1078 618 1138 585 q 947 651 1018 651 q 818 618 878 651 q 723 524 758 585 q 688 376 688 463 l 688 361 q 724 215 688 278 q 826 116 761 151 q 976 81 890 81 q 1101 104 1044 81 q 1200 176 1157 128 l 1256 113 q 1134 23 1207 53 q 974 -7 1061 -7 q 817 21 890 -7 q 690 106 744 49 q 607 249 636 163 l 671 247 q 609 97 657 153 q 493 17 561 42 q 351 -7 425 -7 z "
  },
  ӗ: {
    ha: 868,
    x_min: 71,
    x_max: 781,
    o: "m 453 -7 q 253 41 339 -7 q 118 173 167 89 q 69 365 69 257 q 116 557 69 474 q 244 688 163 640 q 426 736 325 736 q 609 690 529 736 q 735 559 689 643 q 781 365 781 475 q 780 351 781 358 q 779 335 779 343 l 144 335 l 144 408 l 726 408 l 688 379 q 653 520 688 458 q 561 617 619 582 q 426 651 503 651 q 292 617 351 651 q 199 519 232 582 q 165 376 165 457 l 165 361 q 202 215 165 278 q 305 116 239 151 q 456 81 371 81 q 580 104 522 81 q 679 176 638 128 l 735 113 q 613 24 686 54 q 453 -7 540 -7 m 425 835 q 277 881 333 835 q 218 1015 221 928 l 289 1015 q 328 928 290 960 q 425 896 365 896 q 523 928 485 896 q 563 1015 561 960 l 633 1015 q 575 881 632 928 q 425 835 518 835 z "
  },
  ә: {
    ha: 857,
    x_min: 76,
    x_max: 788,
    o: "m 403 736 q 604 688 518 736 q 739 557 690 640 q 788 365 788 474 q 741 173 788 257 q 614 41 694 89 q 429 -7 533 -7 q 248 40 328 -7 q 122 172 168 88 q 76 365 76 256 q 76 379 76 371 q 78 394 76 388 l 713 394 l 713 321 l 129 321 l 169 350 q 203 210 169 272 q 295 113 236 149 q 429 78 354 78 q 565 113 506 78 q 657 211 624 149 q 690 353 690 274 l 690 369 q 653 515 690 453 q 551 614 617 578 q 401 650 486 650 q 276 626 333 650 q 178 553 219 603 l 122 618 q 245 706 172 676 q 403 736 318 736 z "
  },
  ӛ: {
    ha: 857,
    x_min: 76,
    x_max: 788,
    o: "m 403 736 q 604 688 518 736 q 739 557 690 640 q 788 365 788 474 q 741 173 788 257 q 614 41 694 89 q 429 -7 533 -7 q 248 40 328 -7 q 122 172 168 88 q 76 365 76 256 q 76 379 76 371 q 78 394 76 388 l 713 394 l 713 321 l 129 321 l 169 350 q 203 210 169 272 q 295 113 236 149 q 429 78 354 78 q 565 113 506 78 q 657 211 624 149 q 690 353 690 274 l 690 369 q 653 515 690 453 q 551 614 617 578 q 401 650 486 650 q 276 626 333 650 q 178 553 219 603 l 122 618 q 245 706 172 676 q 403 736 318 736 m 556 875 q 514 892 532 875 q 496 935 496 908 q 514 978 496 961 q 556 994 532 994 q 598 978 581 994 q 615 935 615 961 q 598 892 615 908 q 556 875 581 875 m 308 875 q 266 892 283 875 q 249 935 249 908 q 266 978 249 961 q 308 994 283 994 q 350 978 332 994 q 368 935 368 961 q 350 892 368 908 q 308 875 332 875 z "
  },
  ӝ: {
    ha: 1147,
    x_min: 24,
    x_max: 1124,
    o: "m 1006 0 l 756 361 l 838 410 l 1124 0 l 1006 0 m 592 325 l 592 410 l 822 410 l 822 325 l 592 325 m 847 354 l 753 368 l 996 729 l 1103 729 l 847 354 m 142 0 l 24 0 l 310 410 l 390 361 l 142 0 m 622 0 l 524 0 l 524 729 l 622 729 l 622 0 m 554 325 l 325 325 l 325 410 l 554 410 l 554 325 m 301 354 l 44 729 l 151 729 l 393 368 l 301 354 m 697 875 q 656 892 674 875 q 638 935 638 908 q 656 978 638 961 q 697 994 674 994 q 740 978 722 994 q 757 935 757 961 q 740 892 757 908 q 697 875 722 875 m 450 875 q 408 892 425 875 q 390 935 390 908 q 408 978 390 961 q 450 994 425 994 q 492 978 474 994 q 510 935 510 961 q 492 892 510 908 q 450 875 474 875 z "
  },
  ӟ: {
    ha: 742,
    x_min: 42,
    x_max: 658,
    o: "m 336 -8 q 499 19 426 -8 q 615 97 572 47 q 658 211 658 146 q 588 343 658 294 q 393 392 518 392 l 389 365 q 515 388 460 365 q 604 450 571 410 q 638 544 638 490 q 596 649 638 606 q 484 717 554 693 q 326 738 414 740 q 199 720 263 738 q 72 669 136 703 l 100 593 q 215 637 157 622 q 328 653 274 651 q 435 639 388 653 q 509 597 482 625 q 536 531 536 569 q 513 468 536 494 q 449 428 490 442 q 353 414 407 414 l 235 414 l 235 342 l 360 342 q 504 309 451 342 q 557 218 557 276 q 529 146 557 178 q 451 96 501 114 q 333 76 401 78 q 196 97 265 76 q 74 156 126 117 l 42 82 q 179 14 101 36 q 336 -8 257 -8 m 479 875 q 438 892 456 875 q 419 935 419 908 q 438 978 419 961 q 479 994 456 994 q 522 978 504 994 q 539 935 539 961 q 522 892 539 908 q 479 875 504 875 m 232 875 q 190 892 207 875 q 172 935 172 908 q 190 978 172 961 q 232 994 207 994 q 274 978 256 994 q 292 935 292 961 q 274 892 292 908 q 232 875 256 875 z "
  },
  ӡ: {
    ha: 714,
    x_min: -31,
    x_max: 664,
    o: "m 314 -278 q 115 -242 207 -278 q -31 -150 22 -207 l 10 -69 q 135 -153 56 -121 q 311 -186 215 -186 q 498 -131 433 -186 q 563 17 563 -76 q 499 165 563 110 q 300 219 436 219 l 231 219 l 231 290 l 535 679 l 543 642 l 3 642 l 3 729 l 624 729 l 624 658 l 321 269 l 279 301 l 317 301 q 577 223 490 301 q 664 17 664 144 q 624 -133 664 -67 q 508 -238 585 -199 q 314 -278 431 -278 z "
  },
  ӣ: {
    ha: 956,
    x_min: 140,
    x_max: 814,
    o: "m 140 0 l 140 729 l 239 729 l 239 150 l 726 729 l 814 729 l 814 0 l 715 0 l 715 581 l 229 0 l 140 0 m 258 896 l 258 961 l 686 961 l 686 896 l 258 896 z "
  },
  ӥ: {
    ha: 956,
    x_min: 140,
    x_max: 814,
    o: "m 140 0 l 140 729 l 239 729 l 239 150 l 726 729 l 814 729 l 814 0 l 715 0 l 715 581 l 229 0 l 140 0 m 596 875 q 554 892 572 875 q 536 935 536 908 q 554 978 536 961 q 596 994 572 994 q 638 978 621 994 q 656 935 656 961 q 638 892 656 908 q 596 875 621 875 m 349 875 q 306 892 324 875 q 289 935 289 908 q 306 978 289 961 q 349 994 324 994 q 390 978 372 994 q 408 935 408 961 q 390 892 408 908 q 349 875 372 875 z "
  },
  ӧ: {
    ha: 883,
    x_min: 69,
    x_max: 813,
    o: "m 440 -7 q 251 41 335 -7 q 118 173 167 89 q 69 365 69 257 q 118 558 69 475 q 250 689 167 642 q 440 736 333 736 q 633 689 549 736 q 765 558 717 642 q 813 365 813 475 q 765 173 813 257 q 632 41 717 89 q 440 -7 547 -7 m 440 81 q 581 116 519 81 q 677 216 642 151 q 713 365 713 281 q 677 515 713 451 q 581 615 642 579 q 442 650 519 650 q 303 615 364 650 q 206 515 242 579 q 169 365 169 451 q 206 216 169 281 q 303 116 242 151 q 440 81 364 81 m 564 875 q 522 892 540 875 q 504 935 504 908 q 522 978 504 961 q 564 994 540 994 q 606 978 589 994 q 624 935 624 961 q 606 892 624 908 q 564 875 589 875 m 317 875 q 274 892 292 875 q 257 935 257 908 q 274 978 257 961 q 317 994 292 994 q 358 978 340 994 q 376 935 376 961 q 358 892 376 908 q 317 875 340 875 z "
  },
  ө: {
    ha: 897,
    x_min: 69,
    x_max: 828,
    o: "m 449 736 q 644 689 558 736 q 778 558 729 642 q 828 365 828 475 q 778 173 828 257 q 644 41 729 89 q 449 -7 558 -7 q 253 41 339 -7 q 119 173 168 89 q 69 365 69 257 q 119 558 69 475 q 254 689 168 642 q 449 736 340 736 m 449 657 q 311 625 372 657 q 212 536 250 593 q 167 401 174 479 l 731 401 q 685 535 724 478 q 586 625 647 593 q 449 657 525 657 m 449 74 q 586 106 525 74 q 685 195 647 138 q 731 331 724 253 l 167 331 q 211 195 174 253 q 310 106 249 138 q 449 74 372 74 z "
  },
  ӫ: {
    ha: 897,
    x_min: 69,
    x_max: 828,
    o: "m 449 736 q 644 689 558 736 q 778 558 729 642 q 828 365 828 475 q 778 173 828 257 q 644 41 729 89 q 449 -7 558 -7 q 253 41 339 -7 q 119 173 168 89 q 69 365 69 257 q 119 558 69 475 q 254 689 168 642 q 449 736 340 736 m 449 657 q 311 625 372 657 q 212 536 250 593 q 167 401 174 479 l 731 401 q 685 535 724 478 q 586 625 647 593 q 449 657 525 657 m 449 74 q 586 106 525 74 q 685 195 647 138 q 731 331 724 253 l 167 331 q 211 195 174 253 q 310 106 249 138 q 449 74 372 74 m 572 875 q 531 892 549 875 q 513 935 513 908 q 531 978 513 961 q 572 994 549 994 q 615 978 597 994 q 632 935 632 961 q 615 892 632 908 q 572 875 597 875 m 325 875 q 283 892 300 875 q 265 935 265 908 q 283 978 265 961 q 325 994 300 994 q 367 978 349 994 q 385 935 385 961 q 367 892 385 908 q 325 875 349 875 z "
  },
  ӭ: {
    ha: 793,
    x_min: 42,
    x_max: 726,
    o: "m 242 333 l 242 408 l 665 408 l 665 333 l 242 333 m 339 736 q 538 688 450 736 q 676 556 625 640 q 726 365 726 472 q 676 174 726 258 q 538 40 625 89 q 339 -8 450 -8 q 172 20 249 -8 q 42 103 94 49 l 100 161 q 207 95 147 117 q 335 74 267 74 q 488 112 421 74 q 594 216 556 150 q 633 365 633 282 q 594 515 633 449 q 488 618 556 581 q 335 656 421 656 q 207 634 267 656 q 100 568 147 613 l 42 625 q 172 708 94 681 q 339 736 249 736 m 483 875 q 442 892 460 875 q 424 935 424 908 q 442 978 424 961 q 483 994 460 994 q 526 978 508 994 q 543 935 543 961 q 526 892 543 908 q 483 875 508 875 m 236 875 q 194 892 211 875 q 176 935 176 908 q 194 978 176 961 q 236 994 211 994 q 278 978 260 994 q 296 935 296 961 q 278 892 296 908 q 236 875 260 875 z "
  },
  ӯ: {
    ha: 775,
    x_min: -25,
    x_max: 761,
    o: "m 153 -276 q 55 -260 101 -276 q -25 -210 8 -243 l 21 -136 q 81 -177 49 -162 q 154 -192 114 -192 q 238 -165 203 -192 q 306 -69 274 -137 l 353 38 l 364 53 l 664 729 l 761 729 l 396 -87 q 328 -200 365 -158 q 249 -259 292 -242 q 153 -276 206 -276 m 347 -21 l 11 729 l 114 729 l 411 60 l 347 -21 m 153 896 l 153 961 l 581 961 l 581 896 l 153 896 z "
  },
  ӱ: {
    ha: 775,
    x_min: -25,
    x_max: 761,
    o: "m 153 -276 q 55 -260 101 -276 q -25 -210 8 -243 l 21 -136 q 81 -177 49 -162 q 154 -192 114 -192 q 238 -165 203 -192 q 306 -69 274 -137 l 353 38 l 364 53 l 664 729 l 761 729 l 396 -87 q 328 -200 365 -158 q 249 -259 292 -242 q 153 -276 206 -276 m 347 -21 l 11 729 l 114 729 l 411 60 l 347 -21 m 490 875 q 449 892 467 875 q 431 935 431 908 q 449 978 431 961 q 490 994 467 994 q 533 978 515 994 q 550 935 550 961 q 533 892 550 908 q 490 875 515 875 m 243 875 q 201 892 218 875 q 183 935 183 908 q 201 978 183 961 q 243 994 218 994 q 285 978 267 994 q 303 935 303 961 q 285 892 303 908 q 243 875 267 875 z "
  },
  ӳ: {
    ha: 775,
    x_min: -25,
    x_max: 761,
    o: "m 153 -276 q 55 -260 101 -276 q -25 -210 8 -243 l 21 -136 q 81 -177 49 -162 q 154 -192 114 -192 q 238 -165 203 -192 q 306 -69 274 -137 l 353 38 l 364 53 l 664 729 l 761 729 l 396 -87 q 328 -200 365 -158 q 249 -259 292 -242 q 153 -276 206 -276 m 347 -21 l 11 729 l 114 729 l 411 60 l 347 -21 m 436 843 l 569 1015 l 679 1015 l 524 843 l 436 843 m 210 843 l 344 1015 l 454 1015 l 297 843 l 210 843 z "
  },
  ӵ: {
    ha: 832,
    x_min: 65,
    x_max: 692,
    o: "m 601 308 q 473 265 538 281 q 344 249 408 249 q 140 308 215 249 q 65 490 65 367 l 65 729 l 163 729 l 163 496 q 217 371 163 413 q 363 329 271 329 q 479 344 418 329 q 603 386 540 358 l 601 308 m 593 0 l 593 729 l 692 729 l 692 0 l 593 0 m 499 875 q 457 892 475 875 q 439 935 439 908 q 457 978 439 961 q 499 994 475 994 q 541 978 524 994 q 558 935 558 961 q 541 892 558 908 q 499 875 524 875 m 251 875 q 209 892 226 875 q 192 935 192 908 q 209 978 192 961 q 251 994 226 994 q 293 978 275 994 q 311 935 311 961 q 293 892 311 908 q 251 875 275 875 z "
  },
  "ӷ": {
    ha: 660,
    x_min: 140,
    x_max: 657,
    o: "m 140 0 l 140 729 l 657 729 l 657 643 l 214 643 l 239 668 l 239 0 l 140 0 m 264 -160 l 264 26 l 289 0 l 140 0 l 140 86 l 357 86 l 357 -160 l 264 -160 z "
  },
  ӹ: {
    ha: 1090,
    x_min: 140,
    x_max: 950,
    o: "m 851 0 l 851 729 l 950 729 l 950 0 l 851 0 m 447 472 q 657 411 585 471 q 729 239 729 351 q 651 60 729 122 q 429 -1 574 -3 l 140 0 l 140 729 l 239 729 l 239 475 l 447 472 m 422 74 q 577 115 525 72 q 629 239 629 157 q 578 359 629 321 q 422 399 526 397 l 239 401 l 239 76 l 422 74 m 690 875 q 649 892 667 875 q 631 935 631 908 q 649 978 631 961 q 690 994 667 994 q 733 978 715 994 q 750 935 750 961 q 733 892 750 908 q 690 875 715 875 m 443 875 q 401 892 418 875 q 383 935 383 908 q 401 978 383 961 q 443 994 418 994 q 485 978 467 994 q 503 935 503 961 q 485 892 503 908 q 443 875 467 875 z "
  },
  "ӻ": {
    ha: 664,
    x_min: 18,
    x_max: 631,
    o: "m 168 0 l 168 729 l 631 729 l 631 643 l 267 643 l 267 0 l 168 0 m 174 -276 q 88 -264 129 -276 q 18 -228 46 -251 l 50 -156 q 101 -183 71 -174 q 163 -193 131 -193 q 253 -158 222 -193 q 285 -53 285 -122 l 285 22 l 315 0 l 168 0 l 168 86 l 383 86 l 383 -64 q 359 -175 383 -128 q 288 -249 335 -222 q 174 -276 242 -276 m 56 308 l 56 381 l 574 381 l 574 308 l 56 308 z "
  },
  "ӽ": {
    ha: 728,
    x_min: 24,
    x_max: 708,
    o: "m 24 0 l 308 375 l 40 729 l 151 729 l 365 447 l 582 729 l 692 729 l 136 0 l 24 0 m 500 -276 q 346 -233 421 -276 l 378 -158 q 431 -183 403 -174 q 488 -193 460 -193 q 576 -160 542 -193 q 610 -76 610 -126 q 583 20 610 -33 q 495 150 556 74 q 335 342 435 226 l 403 404 q 543 234 485 307 q 638 106 601 161 q 692 6 675 51 q 708 -82 708 -40 q 681 -185 708 -142 q 608 -253 654 -229 q 500 -276 561 -276 z "
  },
  "ӿ": {
    ha: 771,
    x_min: 40,
    x_max: 731,
    o: "m 40 0 l 350 403 l 347 346 l 56 729 l 169 729 l 407 418 l 365 417 l 607 729 l 714 729 l 419 347 l 421 407 l 731 0 l 614 0 l 365 331 l 403 326 l 151 0 l 40 0 m 129 333 l 129 406 l 643 406 l 643 333 l 129 333 z "
  },
  "ԑ": {
    ha: 742,
    x_min: 83,
    x_max: 700,
    o: "m 406 -8 q 242 19 315 -8 q 126 97 169 47 q 83 211 83 146 q 153 343 83 294 q 347 392 224 392 l 353 365 q 226 388 282 365 q 138 450 171 410 q 104 544 104 490 q 146 649 104 606 q 258 717 188 693 q 415 738 328 740 q 543 720 479 738 q 669 669 607 703 l 642 593 q 527 637 585 622 q 414 653 469 651 q 307 639 354 653 q 233 597 260 625 q 206 531 206 569 q 229 468 206 494 q 294 428 253 442 q 388 414 335 414 l 507 414 l 507 342 l 382 342 q 238 309 290 342 q 185 218 185 276 q 213 146 185 178 q 290 96 240 114 q 408 76 340 78 q 546 97 476 76 q 667 156 615 117 l 700 82 q 563 14 640 36 q 406 -8 485 -8 z "
  },
  "ԓ": {
    ha: 878,
    x_min: 7,
    x_max: 738,
    o: "m 526 -276 q 440 -265 482 -276 q 371 -229 399 -253 l 404 -154 q 514 -192 449 -192 q 606 -157 574 -192 q 639 -54 639 -122 l 639 672 l 664 643 l 267 643 l 290 674 l 279 463 q 265 282 275 368 q 233 131 254 196 q 174 28 211 65 q 78 -10 136 -10 q 44 -6 61 -10 q 7 1 26 -3 l 14 85 q 33 82 24 83 q 49 81 42 81 q 120 114 93 81 q 161 203 147 147 q 181 328 175 258 q 190 469 186 399 l 203 729 l 738 729 l 738 -58 q 683 -217 738 -157 q 526 -276 629 -276 z "
  },
  "ԛ": {
    ha: 953,
    x_min: 71,
    x_max: 811,
    o: "m 435 -7 q 248 40 331 -7 q 118 171 165 88 q 71 365 71 254 q 118 559 71 475 q 248 690 165 643 q 435 736 331 736 q 608 693 532 736 q 728 567 683 650 q 772 365 772 485 q 727 163 772 246 q 606 37 682 81 q 435 -7 531 -7 m 442 81 q 581 116 519 81 q 678 216 643 151 q 714 365 714 281 q 678 514 714 450 q 581 614 643 578 q 442 650 519 650 q 304 614 365 650 q 207 514 243 578 q 171 365 171 450 q 207 216 171 281 q 304 116 243 151 q 442 81 365 81 m 713 -269 l 713 217 l 726 364 l 717 510 l 717 729 l 811 729 l 811 -269 l 713 -269 z "
  },
  "ԝ": {
    ha: 1289,
    x_min: 19,
    x_max: 1268,
    o: "m 306 0 l 19 729 l 122 729 l 382 53 l 333 53 l 601 729 l 693 729 l 956 53 l 908 53 l 1172 729 l 1268 729 l 983 0 l 882 0 l 631 636 l 660 636 l 407 0 l 306 0 z "
  },
  ҍ: {
    ha: 824,
    x_min: 32,
    x_max: 778,
    o: "m 183 0 l 183 729 l 282 729 l 282 463 l 496 461 q 706 403 633 460 q 778 235 778 347 q 700 58 778 118 q 478 -1 622 -3 l 183 0 m 472 74 q 626 113 574 72 q 678 235 678 154 q 626 351 678 317 q 472 388 575 386 l 282 389 l 282 76 l 472 74 m 32 563 l 32 636 l 556 636 l 556 563 l 32 563 z "
  },
  ҏ: {
    ha: 968,
    x_min: 142,
    x_max: 883,
    o: "m 529 -7 q 356 38 431 -7 q 240 167 282 83 q 199 364 199 250 q 240 563 199 479 q 355 691 281 646 q 529 736 429 736 q 710 690 631 736 q 837 559 790 643 q 883 364 883 475 q 837 170 883 254 q 710 40 790 86 q 529 -7 631 -7 m 142 -269 l 142 729 l 236 729 l 236 510 l 226 364 l 240 215 l 240 -269 l 142 -269 m 513 79 q 653 115 590 79 q 751 215 715 150 q 786 364 786 279 q 750 514 786 450 q 652 614 714 578 q 513 650 590 650 q 372 614 435 650 q 274 514 310 578 q 239 364 239 450 q 274 215 239 279 q 372 115 310 150 q 513 79 435 79 m 864 -42 l 807 -86 l 542 249 l 600 294 l 864 -42 z "
  },
  "ԩ": {
    ha: 938,
    x_min: -125,
    x_max: 797,
    o: "m 699 729 l 797 729 l 797 0 l 699 0 l 699 324 l 240 324 l 240 -60 q 186 -217 240 -157 q 32 -276 132 -276 q -55 -265 -12 -276 q -125 -229 -97 -253 l -92 -154 q 18 -192 -49 -192 q 110 -157 78 -192 q 142 -54 142 -122 l 142 729 l 240 729 l 240 410 l 699 410 l 699 729 z "
  },
  "ԯ": {
    ha: 903,
    x_min: 7,
    x_max: 854,
    o: "m 7 1 l 14 86 q 33 83 24 85 q 49 81 42 81 q 120 114 93 81 q 161 203 147 147 q 181 328 175 258 q 190 469 186 399 l 203 729 l 738 729 l 738 0 l 639 0 l 639 672 l 664 643 l 267 643 l 290 674 l 279 463 q 265 282 275 368 q 233 131 254 196 q 174 28 211 65 q 78 -8 136 -8 q 44 -6 61 -8 q 7 1 26 -3 m 761 -160 l 761 26 l 786 0 l 638 0 l 638 86 l 854 86 l 854 -160 l 761 -160 z "
  },
  Δ: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 549 972 l 993 0 l 3 0 l 447 972 l 549 972 m 126 40 l 96 89 l 897 89 l 867 40 l 476 913 l 518 913 l 126 40 z "
  },
  Ω: {
    ha: 1253,
    x_min: 13,
    x_max: 1240,
    o: "m 13 0 l 13 90 l 324 90 q 169 267 222 161 q 117 494 117 372 q 155 690 117 601 q 263 844 193 779 q 425 945 332 910 q 626 981 518 981 q 828 945 736 981 q 990 844 921 910 q 1098 690 1060 779 q 1136 494 1136 601 q 1083 267 1136 372 q 929 90 1031 161 l 1240 90 l 1240 0 l 771 0 l 771 83 q 967 258 900 150 q 1033 490 1033 365 q 1003 651 1033 578 q 919 777 974 724 q 790 860 864 831 q 626 889 715 889 q 464 860 539 889 q 335 777 389 831 q 250 651 281 724 q 219 490 219 578 q 286 257 219 365 q 482 83 353 149 l 482 0 l 13 0 z "
  },
  μ: {
    ha: 942,
    x_min: 138,
    x_max: 804,
    o: "m 138 -269 l 138 729 l 236 729 l 236 317 q 294 141 236 200 q 457 82 351 82 q 589 113 533 82 q 675 204 644 144 q 706 347 706 264 l 706 729 l 804 729 l 804 0 l 710 0 l 710 203 l 726 176 q 665 73 706 114 q 571 13 624 32 q 458 -7 518 -7 q 310 28 372 -7 q 217 132 249 64 l 236 176 l 236 -269 l 138 -269 z "
  },
  π: {
    ha: 1003,
    x_min: -8,
    x_max: 992,
    o: "m 47 365 q 6 440 21 397 q -8 522 -8 482 q 20 628 -8 581 q 103 702 49 675 q 233 729 157 729 l 992 729 l 990 647 l 244 647 q 122 610 163 647 q 82 507 82 574 q 93 449 82 479 q 124 392 104 418 l 47 365 m 249 0 l 326 676 l 425 676 l 347 0 l 249 0 m 672 0 l 672 676 l 769 676 l 769 0 l 672 0 z "
  },
  Å: {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 3 0 l 447 972 l 549 972 l 993 0 l 885 0 l 476 913 l 518 913 l 110 0 l 3 0 m 178 260 l 208 343 l 774 343 l 804 260 l 178 260 m 497 1069 q 423 1089 456 1069 q 372 1140 390 1108 q 353 1211 353 1172 q 372 1283 353 1250 q 423 1335 390 1315 q 497 1356 456 1356 q 572 1335 539 1356 q 624 1283 604 1315 q 643 1211 643 1250 q 624 1140 643 1172 q 572 1089 604 1108 q 497 1069 539 1069 m 497 1117 q 565 1144 539 1117 q 592 1211 592 1171 q 565 1279 592 1251 q 497 1307 538 1307 q 430 1280 457 1307 q 403 1211 403 1253 q 429 1144 403 1171 q 497 1117 456 1117 z "
  },
  K: {
    ha: 988,
    x_min: 158,
    x_max: 979,
    o: "m 247 242 l 243 367 l 832 972 l 950 972 l 521 522 l 463 460 l 247 242 m 158 0 l 158 972 l 261 972 l 261 0 l 158 0 m 857 0 l 438 483 l 507 558 l 979 0 l 857 0 z "
  },
  "₀": {
    ha: 597,
    x_min: 44,
    x_max: 553,
    o: "m 299 -144 q 115 -65 185 -144 q 44 150 44 14 q 115 364 44 285 q 299 443 185 443 q 483 364 413 443 q 553 150 553 285 q 483 -65 553 14 q 299 -144 413 -144 m 299 -81 q 428 -21 378 -81 q 479 150 479 39 q 428 320 479 261 q 299 379 378 379 q 169 320 219 379 q 118 150 118 261 q 169 -21 118 39 q 299 -81 219 -81 z "
  },
  "₁": {
    ha: 597,
    x_min: 117,
    x_max: 511,
    o: "m 361 -124 l 315 -76 l 511 -76 l 511 -139 l 117 -139 l 117 -76 l 331 -76 l 285 -124 l 285 410 l 318 375 l 126 375 l 126 438 l 361 438 l 361 -124 z "
  },
  "₂": {
    ha: 597,
    x_min: 44,
    x_max: 522,
    o: "m 67 -139 l 67 -90 l 331 143 q 402 222 385 192 q 419 281 419 251 q 383 350 419 321 q 265 379 347 379 q 168 363 213 379 q 96 315 124 347 l 44 356 q 138 421 81 399 q 269 443 194 443 q 438 397 382 443 q 494 285 494 351 q 473 203 494 242 q 386 106 451 164 l 149 -104 l 125 -76 l 522 -76 l 522 -139 l 67 -139 z "
  },
  "₃": {
    ha: 597,
    x_min: 43,
    x_max: 521,
    o: "m 281 -144 q 140 -124 204 -144 q 43 -71 76 -104 l 75 -15 q 161 -62 107 -43 q 281 -81 215 -81 q 406 -51 365 -81 q 446 28 446 -21 q 406 107 446 78 q 283 136 367 136 l 225 136 l 225 188 l 424 403 l 435 375 l 58 375 l 58 438 l 493 438 l 493 389 l 296 172 l 264 193 l 296 193 q 463 147 406 193 q 521 28 521 101 q 494 -59 521 -19 q 413 -122 467 -99 q 281 -144 360 -144 z "
  },
  "₄": {
    ha: 597,
    x_min: 38,
    x_max: 556,
    o: "m 38 8 l 38 58 l 324 438 l 407 438 l 119 58 l 82 69 l 556 69 l 556 8 l 38 8 m 361 -139 l 361 8 l 367 69 l 367 196 l 433 196 l 433 -139 l 361 -139 z "
  },
  "₅": {
    ha: 597,
    x_min: 47,
    x_max: 524,
    o: "m 283 -144 q 144 -124 208 -144 q 47 -71 79 -104 l 78 -15 q 164 -62 110 -43 q 283 -81 218 -81 q 409 -51 368 -81 q 450 28 450 -21 q 407 103 450 76 q 251 131 364 131 l 96 131 l 129 438 l 486 438 l 486 375 l 157 375 l 194 410 l 167 160 l 129 193 l 263 193 q 417 172 360 193 q 499 114 474 151 q 524 28 524 76 q 497 -60 524 -21 q 416 -122 469 -99 q 283 -144 363 -144 z "
  },
  "₆": {
    ha: 597,
    x_min: 58,
    x_max: 546,
    o: "m 324 -144 q 127 -69 196 -144 q 58 142 58 6 q 97 304 58 238 q 203 407 135 371 q 365 443 272 443 q 444 435 404 443 q 513 411 485 428 l 486 353 q 428 373 460 367 q 364 379 397 379 q 196 320 260 379 q 132 153 132 261 q 135 109 132 135 q 144 60 138 83 l 125 85 q 193 174 136 140 q 329 208 250 208 q 442 187 394 208 q 518 126 490 165 q 546 36 546 88 q 517 -59 546 -18 q 440 -122 489 -100 q 324 -144 390 -144 m 322 -86 q 432 -53 392 -86 q 472 32 472 -21 q 432 118 472 85 q 317 151 392 151 q 201 118 246 151 q 157 32 157 85 q 174 -23 157 4 q 228 -68 190 -50 q 322 -86 265 -86 z "
  },
  "₇": {
    ha: 597,
    x_min: 54,
    x_max: 551,
    o: "m 189 -139 l 478 408 l 501 375 l 88 375 l 121 411 l 121 271 l 54 271 l 54 438 l 551 438 l 551 389 l 272 -139 l 189 -139 z "
  },
  "₈": {
    ha: 597,
    x_min: 43,
    x_max: 554,
    o: "m 297 -144 q 161 -124 218 -144 q 74 -66 104 -103 q 43 19 43 -29 q 73 106 43 71 q 160 161 103 142 q 297 181 217 181 q 437 161 379 181 q 524 106 494 142 q 554 19 554 71 q 524 -66 554 -29 q 435 -124 493 -103 q 297 -144 378 -144 m 297 -86 q 433 -56 385 -86 q 481 24 481 -26 q 433 103 481 72 q 297 133 385 133 q 164 103 211 133 q 117 24 117 72 q 164 -56 117 -26 q 297 -86 211 -86 m 297 143 q 124 182 185 143 q 64 290 64 221 q 127 401 64 358 q 297 443 190 443 q 469 400 406 443 q 533 289 533 357 q 472 182 533 221 q 297 143 411 143 m 297 189 q 418 217 376 189 q 460 288 460 244 q 417 358 460 332 q 297 385 374 385 q 179 358 221 385 q 138 289 138 332 q 179 217 138 246 q 297 189 221 189 z "
  },
  "₉": {
    ha: 597,
    x_min: 51,
    x_max: 539,
    o: "m 232 -144 q 153 -137 193 -144 q 85 -112 114 -129 l 111 -54 q 169 -74 139 -68 q 233 -81 200 -81 q 402 -21 339 -81 q 465 146 465 39 q 463 190 465 164 q 453 239 460 215 l 472 214 q 405 125 461 160 q 268 90 349 90 q 156 112 204 90 q 79 172 107 133 q 51 263 51 211 q 80 358 51 318 q 158 421 108 399 q 274 443 208 443 q 470 369 401 443 q 539 157 539 294 q 501 -5 539 63 q 394 -108 463 -72 q 232 -144 325 -144 m 281 147 q 396 181 351 147 q 440 267 440 215 q 424 322 440 294 q 370 367 407 349 q 275 385 333 385 q 165 353 206 385 q 124 267 124 321 q 165 181 124 215 q 281 147 206 147 z "
  },
  "⁰": {
    ha: 597,
    x_min: 44,
    x_max: 553,
    o: "m 299 449 q 115 528 185 449 q 44 743 44 607 q 115 957 44 878 q 299 1036 185 1036 q 483 957 413 1036 q 553 743 553 878 q 483 528 553 607 q 299 449 413 449 m 299 513 q 428 572 378 513 q 479 743 479 632 q 428 913 479 854 q 299 972 378 972 q 169 913 219 972 q 118 743 118 854 q 169 572 118 632 q 299 513 219 513 z "
  },
  "¹": {
    ha: 597,
    x_min: 117,
    x_max: 511,
    o: "m 361 469 l 315 517 l 511 517 l 511 454 l 117 454 l 117 517 l 331 517 l 285 469 l 285 1003 l 318 968 l 126 968 l 126 1031 l 361 1031 l 361 469 z "
  },
  "²": {
    ha: 597,
    x_min: 44,
    x_max: 522,
    o: "m 67 454 l 67 503 l 331 736 q 402 815 385 785 q 419 874 419 844 q 383 943 419 914 q 265 972 347 972 q 168 956 213 972 q 96 908 124 940 l 44 949 q 138 1014 81 992 q 269 1036 194 1036 q 438 990 382 1036 q 494 878 494 944 q 473 796 494 835 q 386 699 451 757 l 149 489 l 125 517 l 522 517 l 522 454 l 67 454 z "
  },
  "³": {
    ha: 597,
    x_min: 43,
    x_max: 521,
    o: "m 281 449 q 140 469 204 449 q 43 522 76 489 l 75 578 q 161 531 107 550 q 281 513 215 513 q 406 542 365 513 q 446 621 446 572 q 406 700 446 671 q 283 729 367 729 l 225 729 l 225 781 l 424 996 l 435 968 l 58 968 l 58 1031 l 493 1031 l 493 982 l 296 765 l 264 786 l 296 786 q 463 740 406 786 q 521 621 521 694 q 494 534 521 574 q 413 472 467 494 q 281 449 360 449 z "
  },
  "⁴": {
    ha: 597,
    x_min: 38,
    x_max: 556,
    o: "m 38 601 l 38 651 l 324 1031 l 407 1031 l 119 651 l 82 663 l 556 663 l 556 601 l 38 601 m 361 454 l 361 601 l 367 663 l 367 789 l 433 789 l 433 454 l 361 454 z "
  },
  "⁵": {
    ha: 597,
    x_min: 47,
    x_max: 524,
    o: "m 283 449 q 144 469 208 449 q 47 522 79 489 l 78 578 q 164 531 110 550 q 283 513 218 513 q 409 542 368 513 q 450 621 450 572 q 407 697 450 669 q 251 724 364 724 l 96 724 l 129 1031 l 486 1031 l 486 968 l 157 968 l 194 1003 l 167 753 l 129 786 l 263 786 q 417 765 360 786 q 499 707 474 744 q 524 621 524 669 q 497 533 524 572 q 416 472 469 494 q 283 449 363 449 z "
  },
  "⁶": {
    ha: 597,
    x_min: 58,
    x_max: 546,
    o: "m 324 449 q 127 524 196 449 q 58 735 58 599 q 97 897 58 831 q 203 1000 135 964 q 365 1036 272 1036 q 444 1028 404 1036 q 513 1004 485 1021 l 486 946 q 428 966 460 960 q 364 972 397 972 q 196 913 260 972 q 132 746 132 854 q 135 702 132 728 q 144 653 138 676 l 125 678 q 193 767 136 733 q 329 801 250 801 q 442 780 394 801 q 518 719 490 758 q 546 629 546 681 q 517 534 546 575 q 440 471 489 493 q 324 449 390 449 m 322 507 q 432 540 392 507 q 472 625 472 572 q 432 711 472 678 q 317 744 392 744 q 201 711 246 744 q 157 625 157 678 q 174 570 157 597 q 228 525 190 543 q 322 507 265 507 z "
  },
  "⁷": {
    ha: 597,
    x_min: 54,
    x_max: 551,
    o: "m 189 454 l 478 1001 l 501 968 l 88 968 l 121 1004 l 121 864 l 54 864 l 54 1031 l 551 1031 l 551 982 l 272 454 l 189 454 z "
  },
  "⁸": {
    ha: 597,
    x_min: 43,
    x_max: 554,
    o: "m 297 449 q 161 469 218 449 q 74 527 104 490 q 43 613 43 564 q 73 699 43 664 q 160 754 103 735 q 297 774 217 774 q 437 754 379 774 q 524 699 494 735 q 554 613 554 664 q 524 527 554 564 q 435 469 493 490 q 297 449 378 449 m 297 507 q 433 537 385 507 q 481 617 481 567 q 433 696 481 665 q 297 726 385 726 q 164 696 211 726 q 117 617 117 665 q 164 537 117 567 q 297 507 211 507 m 297 736 q 124 775 185 736 q 64 883 64 814 q 127 994 64 951 q 297 1036 190 1036 q 469 993 406 1036 q 533 882 533 950 q 472 775 533 814 q 297 736 411 736 m 297 782 q 418 810 376 782 q 460 881 460 838 q 417 951 460 925 q 297 978 374 978 q 179 951 221 978 q 138 882 138 925 q 179 810 138 839 q 297 782 221 782 z "
  },
  "⁹": {
    ha: 597,
    x_min: 51,
    x_max: 539,
    o: "m 232 449 q 153 456 193 449 q 85 481 114 464 l 111 539 q 169 519 139 525 q 233 513 200 513 q 402 572 339 513 q 465 739 465 632 q 463 783 465 757 q 453 832 460 808 l 472 807 q 405 718 461 753 q 268 683 349 683 q 156 705 204 683 q 79 765 107 726 q 51 856 51 804 q 80 951 51 911 q 158 1014 108 992 q 274 1036 208 1036 q 470 962 401 1036 q 539 750 539 888 q 501 588 539 656 q 394 485 463 521 q 232 449 325 449 m 281 740 q 396 774 351 740 q 440 860 440 808 q 424 915 440 888 q 370 960 407 942 q 275 978 333 978 q 165 946 206 978 q 124 860 124 914 q 165 774 124 808 q 281 740 206 740 z "
  },
  "⁄": {
    ha: 235,
    x_min: -256,
    x_max: 490,
    o: "m -256 0 l 408 972 l 490 972 l -174 0 l -256 0 z "
  },
  "½": {
    ha: 1429,
    x_min: 117,
    x_max: 1354,
    o: "m 361 411 l 315 458 l 511 458 l 511 396 l 117 396 l 117 458 l 331 458 l 285 411 l 285 944 l 318 910 l 126 910 l 126 972 l 361 972 l 361 411 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 899 0 l 899 49 l 1163 282 q 1234 360 1217 331 q 1251 419 1251 390 q 1215 489 1251 460 q 1097 518 1179 518 q 1000 502 1044 518 q 928 454 956 486 l 876 494 q 969 560 913 538 q 1101 582 1026 582 q 1270 536 1214 582 q 1326 424 1326 490 q 1305 342 1326 381 q 1218 244 1283 303 l 981 35 l 957 63 l 1354 63 l 1354 0 l 899 0 z "
  },
  "⅓": {
    ha: 1429,
    x_min: 117,
    x_max: 1353,
    o: "m 361 411 l 315 458 l 511 458 l 511 396 l 117 396 l 117 458 l 331 458 l 285 411 l 285 944 l 318 910 l 126 910 l 126 972 l 361 972 l 361 411 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 1113 -6 q 972 15 1036 -6 q 875 68 908 35 l 907 124 q 993 77 939 96 q 1113 58 1047 58 q 1238 88 1197 58 q 1278 167 1278 118 q 1238 246 1278 217 q 1115 275 1199 275 l 1057 275 l 1057 326 l 1256 542 l 1267 514 l 890 514 l 890 576 l 1325 576 l 1325 528 l 1128 311 l 1096 332 l 1128 332 q 1295 286 1238 332 q 1353 167 1353 240 q 1326 80 1353 119 q 1245 17 1299 40 q 1113 -6 1192 -6 z "
  },
  "⅔": {
    ha: 1429,
    x_min: 44,
    x_max: 1353,
    o: "m 67 396 l 67 444 l 331 678 q 402 756 385 726 q 419 815 419 786 q 383 885 419 856 q 265 914 347 914 q 168 898 213 914 q 96 850 124 882 l 44 890 q 138 956 81 933 q 269 978 194 978 q 438 932 382 978 q 494 819 494 886 q 473 738 494 776 q 386 640 451 699 l 149 431 l 125 458 l 522 458 l 522 396 l 67 396 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 1113 -6 q 972 15 1036 -6 q 875 68 908 35 l 907 124 q 993 77 939 96 q 1113 58 1047 58 q 1238 88 1197 58 q 1278 167 1278 118 q 1238 246 1278 217 q 1115 275 1199 275 l 1057 275 l 1057 326 l 1256 542 l 1267 514 l 890 514 l 890 576 l 1325 576 l 1325 528 l 1128 311 l 1096 332 l 1128 332 q 1295 286 1238 332 q 1353 167 1353 240 q 1326 80 1353 119 q 1245 17 1299 40 q 1113 -6 1192 -6 z "
  },
  "¼": {
    ha: 1429,
    x_min: 117,
    x_max: 1388,
    o: "m 361 411 l 315 458 l 511 458 l 511 396 l 117 396 l 117 458 l 331 458 l 285 411 l 285 944 l 318 910 l 126 910 l 126 972 l 361 972 l 361 411 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 869 147 l 869 197 l 1156 576 l 1239 576 l 951 197 l 914 208 l 1388 208 l 1388 147 l 869 147 m 1193 0 l 1193 147 l 1199 208 l 1199 335 l 1265 335 l 1265 0 l 1193 0 z "
  },
  "¾": {
    ha: 1429,
    x_min: 43,
    x_max: 1388,
    o: "m 281 390 q 140 410 204 390 q 43 464 76 431 l 75 519 q 161 473 107 492 q 281 454 215 454 q 406 484 365 454 q 446 563 446 514 q 406 642 446 613 q 283 671 367 671 l 225 671 l 225 722 l 424 938 l 435 910 l 58 910 l 58 972 l 493 972 l 493 924 l 296 707 l 264 728 l 296 728 q 463 682 406 728 q 521 563 521 636 q 494 476 521 515 q 413 413 467 436 q 281 390 360 390 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 869 147 l 869 197 l 1156 576 l 1239 576 l 951 197 l 914 208 l 1388 208 l 1388 147 l 869 147 m 1193 0 l 1193 147 l 1199 208 l 1199 335 l 1265 335 l 1265 0 l 1193 0 z "
  },
  "⅛": {
    ha: 1429,
    x_min: 117,
    x_max: 1386,
    o: "m 361 411 l 315 458 l 511 458 l 511 396 l 117 396 l 117 458 l 331 458 l 285 411 l 285 944 l 318 910 l 126 910 l 126 972 l 361 972 l 361 411 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 1129 -6 q 993 15 1050 -6 q 906 73 936 36 q 875 158 875 110 q 905 245 875 210 q 992 300 935 281 q 1129 319 1049 319 q 1269 300 1211 319 q 1356 245 1326 281 q 1386 158 1386 210 q 1356 73 1386 110 q 1267 15 1325 36 q 1129 -6 1210 -6 m 1129 53 q 1265 83 1217 53 q 1313 163 1313 113 q 1265 242 1313 211 q 1129 272 1217 272 q 996 242 1043 272 q 949 163 949 211 q 996 83 949 113 q 1129 53 1043 53 m 1129 282 q 956 321 1017 282 q 896 429 896 360 q 959 540 896 497 q 1129 582 1022 582 q 1301 539 1238 582 q 1365 428 1365 496 q 1304 321 1365 360 q 1129 282 1243 282 m 1129 328 q 1250 356 1208 328 q 1292 426 1292 383 q 1249 497 1292 471 q 1129 524 1206 524 q 1011 497 1053 524 q 969 428 969 471 q 1011 356 969 385 q 1129 328 1053 328 z "
  },
  "⅜": {
    ha: 1429,
    x_min: 43,
    x_max: 1386,
    o: "m 281 390 q 140 410 204 390 q 43 464 76 431 l 75 519 q 161 473 107 492 q 281 454 215 454 q 406 484 365 454 q 446 563 446 514 q 406 642 446 613 q 283 671 367 671 l 225 671 l 225 722 l 424 938 l 435 910 l 58 910 l 58 972 l 493 972 l 493 924 l 296 707 l 264 728 l 296 728 q 463 682 406 728 q 521 563 521 636 q 494 476 521 515 q 413 413 467 436 q 281 390 360 390 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 1129 -6 q 993 15 1050 -6 q 906 73 936 36 q 875 158 875 110 q 905 245 875 210 q 992 300 935 281 q 1129 319 1049 319 q 1269 300 1211 319 q 1356 245 1326 281 q 1386 158 1386 210 q 1356 73 1386 110 q 1267 15 1325 36 q 1129 -6 1210 -6 m 1129 53 q 1265 83 1217 53 q 1313 163 1313 113 q 1265 242 1313 211 q 1129 272 1217 272 q 996 242 1043 272 q 949 163 949 211 q 996 83 949 113 q 1129 53 1043 53 m 1129 282 q 956 321 1017 282 q 896 429 896 360 q 959 540 896 497 q 1129 582 1022 582 q 1301 539 1238 582 q 1365 428 1365 496 q 1304 321 1365 360 q 1129 282 1243 282 m 1129 328 q 1250 356 1208 328 q 1292 426 1292 383 q 1249 497 1292 471 q 1129 524 1206 524 q 1011 497 1053 524 q 969 428 969 471 q 1011 356 969 385 q 1129 328 1053 328 z "
  },
  "⅝": {
    ha: 1429,
    x_min: 47,
    x_max: 1386,
    o: "m 283 390 q 144 410 208 390 q 47 464 79 431 l 78 519 q 164 473 110 492 q 283 454 218 454 q 409 484 368 454 q 450 563 450 514 q 407 638 450 611 q 251 665 364 665 l 96 665 l 129 972 l 486 972 l 486 910 l 157 910 l 194 944 l 167 694 l 129 728 l 263 728 q 417 707 360 728 q 499 649 474 686 q 524 563 524 611 q 497 475 524 514 q 416 413 469 436 q 283 390 363 390 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 1129 -6 q 993 15 1050 -6 q 906 73 936 36 q 875 158 875 110 q 905 245 875 210 q 992 300 935 281 q 1129 319 1049 319 q 1269 300 1211 319 q 1356 245 1326 281 q 1386 158 1386 210 q 1356 73 1386 110 q 1267 15 1325 36 q 1129 -6 1210 -6 m 1129 53 q 1265 83 1217 53 q 1313 163 1313 113 q 1265 242 1313 211 q 1129 272 1217 272 q 996 242 1043 272 q 949 163 949 211 q 996 83 949 113 q 1129 53 1043 53 m 1129 282 q 956 321 1017 282 q 896 429 896 360 q 959 540 896 497 q 1129 582 1022 582 q 1301 539 1238 582 q 1365 428 1365 496 q 1304 321 1365 360 q 1129 282 1243 282 m 1129 328 q 1250 356 1208 328 q 1292 426 1292 383 q 1249 497 1292 471 q 1129 524 1206 524 q 1011 497 1053 524 q 969 428 969 471 q 1011 356 969 385 q 1129 328 1053 328 z "
  },
  "⅞": {
    ha: 1429,
    x_min: 54,
    x_max: 1386,
    o: "m 189 396 l 478 943 l 501 910 l 88 910 l 121 946 l 121 806 l 54 806 l 54 972 l 551 972 l 551 924 l 272 396 l 189 396 m 342 0 l 1006 972 l 1088 972 l 424 0 l 342 0 m 1129 -6 q 993 15 1050 -6 q 906 73 936 36 q 875 158 875 110 q 905 245 875 210 q 992 300 935 281 q 1129 319 1049 319 q 1269 300 1211 319 q 1356 245 1326 281 q 1386 158 1386 210 q 1356 73 1386 110 q 1267 15 1325 36 q 1129 -6 1210 -6 m 1129 53 q 1265 83 1217 53 q 1313 163 1313 113 q 1265 242 1313 211 q 1129 272 1217 272 q 996 242 1043 272 q 949 163 949 211 q 996 83 949 113 q 1129 53 1043 53 m 1129 282 q 956 321 1017 282 q 896 429 896 360 q 959 540 896 497 q 1129 582 1022 582 q 1301 539 1238 582 q 1365 428 1365 496 q 1304 321 1365 360 q 1129 282 1243 282 m 1129 328 q 1250 356 1208 328 q 1292 426 1292 383 q 1249 497 1292 471 q 1129 524 1206 524 q 1011 497 1053 524 q 969 428 969 471 q 1011 356 969 385 q 1129 328 1053 328 z "
  },
  ".": {
    ha: 294,
    x_min: 74,
    x_max: 221,
    o: "m 147 -7 q 95 15 117 -7 q 74 69 74 38 q 95 124 74 103 q 147 144 117 144 q 199 124 178 144 q 221 69 221 103 q 199 15 221 38 q 147 -7 178 -7 z "
  },
  ",": {
    ha: 294,
    x_min: 75,
    x_max: 221,
    o: "m 78 -203 l 139 54 l 150 -6 q 97 15 118 -6 q 75 69 75 36 q 97 124 75 103 q 149 144 118 144 q 201 122 181 144 q 221 69 221 100 q 219 47 221 58 q 214 22 218 36 q 203 -11 210 8 l 144 -203 l 78 -203 z "
  },
  ":": {
    ha: 294,
    x_min: 74,
    x_max: 221,
    o: "m 147 585 q 95 607 117 585 q 74 661 74 629 q 95 715 74 694 q 147 736 117 736 q 199 715 178 736 q 221 661 221 694 q 199 607 221 629 q 147 585 178 585 m 147 -7 q 95 15 117 -7 q 74 69 74 38 q 95 124 74 103 q 147 144 117 144 q 199 124 178 144 q 221 69 221 103 q 199 15 221 38 q 147 -7 178 -7 z "
  },
  ";": {
    ha: 294,
    x_min: 74,
    x_max: 221,
    o: "m 147 585 q 95 607 117 585 q 74 661 74 629 q 95 715 74 694 q 147 736 117 736 q 199 715 178 736 q 221 661 221 694 q 199 607 221 629 q 147 585 178 585 m 78 -203 l 139 54 l 150 -6 q 97 15 118 -6 q 75 69 75 36 q 97 124 75 103 q 149 144 118 144 q 201 122 181 144 q 221 69 221 100 q 219 47 221 58 q 214 22 218 36 q 203 -11 210 8 l 144 -203 l 78 -203 z "
  },
  "…": {
    ha: 899,
    x_min: 74,
    x_max: 825,
    o: "m 147 -7 q 95 15 117 -7 q 74 69 74 38 q 95 124 74 103 q 147 144 117 144 q 199 124 178 144 q 221 69 221 103 q 199 15 221 38 q 147 -7 178 -7 m 449 -7 q 397 15 418 -7 q 375 69 375 38 q 397 124 375 103 q 449 144 418 144 q 501 124 479 144 q 522 69 522 103 q 501 15 522 38 q 449 -7 479 -7 m 751 -7 q 699 15 721 -7 q 678 69 678 38 q 699 124 678 103 q 751 144 721 144 q 803 124 782 144 q 825 69 825 103 q 803 15 825 38 q 751 -7 782 -7 z "
  },
  "!": {
    ha: 361,
    x_min: 107,
    x_max: 253,
    o: "m 142 292 l 122 972 l 239 972 l 218 292 l 142 292 m 181 -7 q 128 15 150 -7 q 107 65 107 36 q 128 116 107 96 q 181 136 150 136 q 233 116 213 136 q 253 65 253 96 q 233 15 253 36 q 181 -7 213 -7 z "
  },
  "¡": {
    ha: 361,
    x_min: 107,
    x_max: 253,
    o: "m 218 438 l 239 -214 l 122 -214 l 142 438 l 218 438 m 181 736 q 233 715 213 736 q 253 664 253 694 q 233 614 253 635 q 181 593 213 593 q 128 614 150 593 q 107 664 107 635 q 128 715 107 694 q 181 736 150 736 z "
  },
  "?": {
    ha: 788,
    x_min: 18,
    x_max: 683,
    o: "m 326 292 q 345 392 326 350 q 392 465 364 433 q 453 525 421 497 q 515 581 486 553 q 563 644 544 610 q 581 724 581 678 q 522 846 581 799 q 357 893 464 893 q 203 865 268 893 q 92 781 138 836 l 18 836 q 161 943 74 906 q 364 981 249 981 q 533 951 461 981 q 644 868 604 922 q 683 739 683 814 q 665 637 683 679 q 617 562 646 594 q 556 501 589 529 q 494 443 524 472 q 447 378 465 414 q 429 292 429 342 l 326 292 m 378 -7 q 327 15 349 -7 q 306 65 306 36 q 327 116 306 96 q 378 136 349 136 q 431 116 410 136 q 451 65 451 96 q 431 15 451 36 q 378 -7 410 -7 z "
  },
  "¿": {
    ha: 788,
    x_min: 104,
    x_max: 769,
    o: "m 424 -222 q 255 -193 326 -222 q 144 -111 183 -164 q 104 11 104 -58 q 123 109 104 68 q 171 181 142 150 q 231 238 200 211 q 292 293 263 265 q 340 356 322 321 q 358 438 358 390 l 461 438 q 442 344 461 383 q 395 273 424 304 q 334 215 367 242 q 273 160 301 188 q 226 99 244 132 q 207 22 207 65 q 265 -89 207 -43 q 431 -135 324 -135 q 585 -106 519 -135 q 696 -22 650 -78 l 769 -78 q 627 -184 714 -146 q 424 -222 540 -222 m 410 593 q 358 614 379 593 q 338 664 338 635 q 358 715 338 694 q 410 736 379 736 q 461 715 440 736 q 482 664 482 694 q 461 614 482 635 q 410 593 440 593 z "
  },
  "·": {
    ha: 350,
    x_min: 101,
    x_max: 249,
    o: "m 175 300 q 123 322 144 300 q 101 376 101 344 q 123 431 101 410 q 175 453 144 453 q 228 431 207 453 q 249 376 249 410 q 228 322 249 344 q 175 300 207 300 z "
  },
  "•": {
    ha: 410,
    x_min: 101,
    x_max: 310,
    o: "m 206 274 q 153 288 178 274 q 115 325 129 301 q 101 381 101 349 q 115 433 101 410 q 153 471 129 457 q 206 485 178 485 q 257 471 233 485 q 295 433 281 457 q 310 381 310 410 q 295 325 310 349 q 257 288 281 301 q 206 274 233 274 z "
  },
  "*": {
    ha: 536,
    x_min: 31,
    x_max: 506,
    o: "m 506 876 l 314 768 l 314 790 l 506 682 l 474 624 l 285 733 l 300 740 l 300 528 l 236 528 l 238 740 l 251 733 l 64 624 l 31 682 l 224 790 l 224 768 l 31 876 l 64 935 l 251 825 l 238 818 l 236 1031 l 300 1031 l 300 818 l 285 825 l 474 935 l 506 876 z "
  },
  "#": {
    ha: 967,
    x_min: 40,
    x_max: 925,
    o: "m 567 0 l 686 972 l 761 972 l 642 0 l 567 0 m 40 264 l 40 340 l 881 340 l 881 264 l 40 264 m 206 0 l 325 972 l 401 972 l 281 0 l 206 0 m 85 632 l 85 708 l 925 708 l 925 632 l 85 632 z "
  },
  "/": {
    ha: 465,
    x_min: -35,
    x_max: 514,
    o: "m -35 -139 l 424 1169 l 514 1169 l 56 -139 l -35 -139 z "
  },
  "\\": {
    ha: 465,
    x_min: -49,
    x_max: 500,
    o: "m 500 -139 l 410 -139 l -49 1169 l 42 1169 l 500 -139 z "
  },
  "(": {
    ha: 457,
    x_min: 144,
    x_max: 400,
    o: "m 306 -269 q 187 23 229 -143 q 144 381 144 189 q 187 740 144 572 q 306 1031 229 907 l 400 1031 q 280 727 318 888 q 242 381 242 567 q 280 34 242 194 q 400 -269 318 -126 l 306 -269 z "
  },
  ")": {
    ha: 457,
    x_min: 56,
    x_max: 313,
    o: "m 150 -269 l 56 -269 q 177 34 139 -126 q 215 381 215 194 q 177 727 215 567 q 56 1031 139 888 l 150 1031 q 271 740 229 907 q 313 381 313 572 q 271 23 313 189 q 150 -269 229 -143 z "
  },
  "{": {
    ha: 464,
    x_min: 83,
    x_max: 435,
    o: "m 382 -269 q 241 -223 289 -269 q 193 -85 193 -176 l 193 268 q 177 322 193 306 q 131 339 161 339 l 83 339 l 83 422 l 131 422 q 177 439 161 422 q 193 493 193 456 l 193 846 q 241 985 193 939 q 382 1031 289 1031 l 435 1031 l 435 949 l 397 949 q 318 919 344 949 q 292 838 292 890 l 292 494 q 282 429 292 453 q 252 393 272 406 q 200 374 232 381 l 200 388 q 252 369 232 382 q 282 332 272 356 q 292 267 292 308 l 292 -76 q 318 -158 292 -129 q 397 -187 344 -187 l 435 -187 l 435 -269 l 382 -269 z "
  },
  "}": {
    ha: 464,
    x_min: 29,
    x_max: 381,
    o: "m 81 -269 l 29 -269 l 29 -187 l 67 -187 q 147 -158 121 -187 q 172 -76 172 -129 l 172 267 q 182 332 172 308 q 213 369 192 356 q 264 388 233 382 l 264 374 q 213 393 233 381 q 182 429 192 406 q 172 494 172 453 l 172 838 q 147 919 172 890 q 67 949 121 949 l 29 949 l 29 1031 l 81 1031 q 223 985 175 1031 q 271 846 271 939 l 271 493 q 288 439 271 456 q 333 422 304 422 l 381 422 l 381 339 l 333 339 q 288 322 304 339 q 271 268 271 306 l 271 -85 q 223 -223 271 -176 q 81 -269 175 -269 z "
  },
  "[": {
    ha: 442,
    x_min: 158,
    x_max: 413,
    o: "m 158 -269 l 158 1031 l 413 1031 l 413 949 l 257 949 l 257 -187 l 413 -187 l 413 -269 l 158 -269 z "
  },
  "]": {
    ha: 442,
    x_min: 29,
    x_max: 283,
    o: "m 283 -269 l 29 -269 l 29 -187 l 185 -187 l 185 949 l 29 949 l 29 1031 l 283 1031 l 283 -269 z "
  },
  "-": {
    ha: 531,
    x_min: 83,
    x_max: 447,
    o: "m 83 333 l 83 419 l 447 419 l 447 333 l 83 333 z "
  },
  "­": {
    ha: 531,
    x_min: 83,
    x_max: 447,
    o: "m 83 333 l 83 419 l 447 419 l 447 333 l 83 333 z "
  },
  "–": {
    ha: 694,
    x_min: 0,
    x_max: 694,
    o: "m 0 342 l 0 413 l 694 413 l 694 342 l 0 342 z "
  },
  "—": {
    ha: 1389,
    x_min: 0,
    x_max: 1389,
    o: "m 0 342 l 0 413 l 1389 413 l 1389 342 l 0 342 z "
  },
  "‒": {
    ha: 972,
    x_min: 67,
    x_max: 906,
    o: "m 67 458 l 67 529 l 906 529 l 906 458 l 67 458 z "
  },
  "―": {
    ha: 1389,
    x_min: 0,
    x_max: 1389,
    o: "m 0 342 l 0 413 l 1389 413 l 1389 342 l 0 342 z "
  },
  "‐": {
    ha: 531,
    x_min: 83,
    x_max: 447,
    o: "m 83 333 l 83 419 l 447 419 l 447 333 l 83 333 z "
  },
  _: {
    ha: 694,
    x_min: 0,
    x_max: 694,
    o: "m 0 -67 l 0 0 l 694 0 l 694 -67 l 0 -67 z "
  },
  "‚": {
    ha: 294,
    x_min: 75,
    x_max: 221,
    o: "m 78 -203 l 139 54 l 150 -6 q 97 15 118 -6 q 75 69 75 36 q 97 124 75 103 q 149 144 118 144 q 201 122 181 144 q 221 69 221 100 q 219 47 221 58 q 214 22 218 36 q 203 -11 210 8 l 144 -203 l 78 -203 z "
  },
  "„": {
    ha: 531,
    x_min: 75,
    x_max: 457,
    o: "m 78 -203 l 139 54 l 150 -6 q 97 15 118 -6 q 75 69 75 36 q 97 124 75 103 q 149 144 118 144 q 201 122 181 144 q 221 69 221 100 q 219 47 221 58 q 214 22 218 36 q 203 -11 210 8 l 144 -203 l 78 -203 m 314 -203 l 375 54 l 386 -6 q 333 15 354 -6 q 311 69 311 36 q 333 124 311 103 q 385 144 354 144 q 437 122 417 144 q 457 69 457 100 q 456 47 457 58 q 450 22 454 36 q 439 -11 446 8 l 381 -203 l 314 -203 z "
  },
  "“": {
    ha: 531,
    x_min: 74,
    x_max: 456,
    o: "m 217 1031 l 156 774 l 144 833 q 199 813 178 833 q 219 760 219 793 q 199 706 219 726 q 147 685 178 685 q 94 706 114 685 q 74 760 74 728 q 75 782 74 772 q 81 806 76 792 q 92 839 85 819 l 150 1031 l 217 1031 m 453 1031 l 392 774 l 381 833 q 435 813 414 833 q 456 760 456 793 q 435 706 456 726 q 383 685 414 685 q 330 706 350 685 q 310 760 310 728 q 311 782 310 772 q 317 806 313 792 q 328 839 321 819 l 386 1031 l 453 1031 z "
  },
  "”": {
    ha: 531,
    x_min: 75,
    x_max: 457,
    o: "m 78 692 l 139 947 l 150 889 q 97 909 118 889 q 75 963 75 929 q 97 1017 75 996 q 149 1038 118 1038 q 201 1016 181 1038 q 221 963 221 994 q 219 940 221 951 q 215 916 218 929 q 204 883 211 903 l 144 692 l 78 692 m 314 692 l 375 947 l 386 889 q 333 909 354 889 q 311 963 311 929 q 333 1017 311 996 q 385 1038 354 1038 q 437 1016 417 1038 q 457 963 457 994 q 456 940 457 951 q 451 916 454 929 q 440 883 447 903 l 381 692 l 314 692 z "
  },
  "‘": {
    ha: 294,
    x_min: 74,
    x_max: 219,
    o: "m 217 1031 l 156 774 l 144 833 q 199 813 178 833 q 219 760 219 793 q 199 706 219 726 q 147 685 178 685 q 94 706 114 685 q 74 760 74 728 q 75 782 74 772 q 81 806 76 792 q 92 839 85 819 l 150 1031 l 217 1031 z "
  },
  "’": {
    ha: 294,
    x_min: 75,
    x_max: 221,
    o: "m 78 692 l 139 947 l 150 889 q 97 909 118 889 q 75 963 75 929 q 97 1017 75 996 q 149 1038 118 1038 q 201 1016 181 1038 q 221 963 221 994 q 219 940 221 951 q 215 916 218 929 q 204 883 211 903 l 144 692 l 78 692 z "
  },
  "«": {
    ha: 663,
    x_min: 69,
    x_max: 611,
    o: "m 271 103 l 69 365 l 271 628 l 363 628 l 165 365 l 363 103 l 271 103 m 518 103 l 317 365 l 518 628 l 610 628 l 413 365 l 610 103 l 518 103 z "
  },
  "»": {
    ha: 663,
    x_min: 53,
    x_max: 593,
    o: "m 144 103 l 53 103 l 250 365 l 53 628 l 144 628 l 346 365 l 144 103 m 392 103 l 300 103 l 497 365 l 300 628 l 392 628 l 593 365 l 392 103 z "
  },
  "‹": {
    ha: 415,
    x_min: 69,
    x_max: 363,
    o: "m 271 103 l 69 365 l 271 628 l 363 628 l 165 365 l 363 103 l 271 103 z "
  },
  "›": {
    ha: 415,
    x_min: 53,
    x_max: 346,
    o: "m 144 103 l 53 103 l 250 365 l 53 628 l 144 628 l 346 365 l 144 103 z "
  },
  '"': {
    ha: 518,
    x_min: 96,
    x_max: 421,
    o: "m 103 606 l 96 972 l 183 972 l 176 606 l 103 606 m 340 606 l 333 972 l 421 972 l 414 606 l 340 606 z "
  },
  "'": {
    ha: 281,
    x_min: 96,
    x_max: 183,
    o: "m 103 606 l 96 972 l 183 972 l 176 606 l 103 606 z "
  },
  "⟨": {
    ha: 444,
    x_min: 61,
    x_max: 374,
    o: "m 285 -269 l 61 381 l 285 1031 l 374 1031 l 157 381 l 374 -269 l 285 -269 z "
  },
  "⟩": {
    ha: 444,
    x_min: 71,
    x_max: 383,
    o: "m 160 1031 l 383 381 l 160 -269 l 71 -269 l 288 381 l 71 1031 l 160 1031 z "
  },
  " ": {
    ha: 972,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  " ": {
    ha: 139,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  " ": {
    ha: 294,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  " ": {
    ha: 364,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  " ": {
    ha: 364,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  " ": {
    ha: 182,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  "​": {
    ha: 0,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  "\r": {
    ha: 364,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  "₵": {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 521 -167 l 521 1139 l 590 1139 l 590 -167 l 521 -167 m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 378 944 285 907 q 581 981 471 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 z "
  },
  "¢": {
    ha: 782,
    x_min: 64,
    x_max: 726,
    o: "m 397 -167 l 397 896 l 465 896 l 465 -167 l 397 -167 m 440 -7 q 247 41 332 -7 q 113 173 161 89 q 64 365 64 257 q 113 558 64 475 q 247 689 161 642 q 440 736 332 736 q 608 700 533 736 q 726 592 683 664 l 653 542 q 560 624 615 597 q 439 650 504 650 q 299 615 361 650 q 200 515 236 579 q 164 365 164 451 q 200 215 164 279 q 299 116 236 151 q 439 81 361 81 q 560 107 504 81 q 653 188 615 133 l 726 138 q 608 30 683 67 q 440 -7 533 -7 z "
  },
  "₡": {
    ha: 999,
    x_min: 72,
    x_max: 938,
    o: "m 458 -167 l 790 1139 l 856 1139 l 524 -167 l 458 -167 m 251 -167 l 583 1139 l 649 1139 l 317 -167 l 251 -167 m 581 -8 q 378 28 471 -8 q 217 132 285 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 217 840 149 774 q 378 944 285 907 q 581 981 471 981 q 781 945 688 981 q 938 839 874 910 l 872 774 q 740 862 813 835 q 585 889 668 889 q 422 859 497 889 q 292 774 347 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 399 q 292 198 236 253 q 422 113 347 143 q 585 83 497 83 q 740 111 668 83 q 872 200 813 139 l 938 135 q 781 28 874 64 q 581 -8 688 -8 z "
  },
  "¤": {
    ha: 972,
    x_min: 47,
    x_max: 925,
    o: "m 210 657 l 47 819 l 104 882 l 268 719 l 210 657 m 104 0 l 47 63 l 210 225 l 268 163 l 104 0 m 867 0 l 704 163 l 763 225 l 925 63 l 867 0 m 763 657 l 704 719 l 867 882 l 925 819 l 763 657 m 486 72 q 339 101 408 72 q 217 181 269 131 q 135 299 165 232 q 106 442 106 365 q 135 585 106 518 q 217 704 165 653 q 339 785 269 756 q 486 814 408 814 q 635 785 565 814 q 757 704 704 756 q 840 585 810 653 q 869 442 869 518 q 840 299 869 365 q 757 181 810 232 q 635 101 704 131 q 486 72 565 72 m 486 156 q 638 194 569 156 q 747 298 706 233 q 788 442 788 363 q 747 586 788 521 q 638 691 706 651 q 486 731 569 731 q 336 691 404 731 q 228 586 268 651 q 188 442 188 521 q 228 298 188 363 q 336 194 268 233 q 486 156 404 156 z "
  },
  $: {
    ha: 854,
    x_min: 65,
    x_max: 789,
    o: "m 397 -167 l 397 1139 l 467 1139 l 467 -167 l 397 -167 m 426 -8 q 219 27 318 -8 q 65 118 119 63 l 106 197 q 244 113 157 147 q 426 79 331 79 q 576 102 518 79 q 660 164 633 125 q 688 250 688 203 q 655 342 688 307 q 569 397 622 376 q 453 432 517 417 q 325 465 389 447 q 208 511 261 482 q 122 588 154 540 q 89 714 89 636 q 127 847 89 786 q 244 944 165 907 q 447 981 324 981 q 610 958 529 981 q 749 894 690 935 l 714 813 q 581 874 651 854 q 446 893 511 893 q 301 869 358 893 q 217 806 244 846 q 190 717 190 767 q 223 625 190 660 q 309 571 256 590 q 426 536 363 551 q 553 503 490 521 q 670 456 617 485 q 756 381 724 428 q 789 257 789 333 q 750 126 789 186 q 631 28 711 65 q 426 -8 551 -8 z "
  },
  "₫": {
    ha: 942,
    x_min: 64,
    x_max: 942,
    o: "m 428 -7 q 241 40 324 -7 q 111 172 158 88 q 64 365 64 256 q 111 560 64 476 q 241 690 158 643 q 428 736 324 736 q 599 693 524 736 q 720 567 675 650 q 765 365 765 485 q 721 164 765 247 q 601 37 676 81 q 428 -7 525 -7 m 93 -181 l 93 -119 l 807 -119 l 807 -181 l 93 -181 m 435 81 q 574 116 513 81 q 672 216 636 151 q 707 365 707 281 q 672 515 707 451 q 574 615 636 579 q 435 650 513 650 q 297 615 358 650 q 200 515 236 579 q 164 365 164 451 q 200 216 164 281 q 297 116 236 151 q 435 81 358 81 m 710 0 l 710 219 l 719 367 l 706 514 l 706 1031 l 804 1031 l 804 0 l 710 0 m 400 849 l 400 910 l 942 910 l 942 849 l 400 849 z "
  },
  "€": {
    ha: 1114,
    x_min: 42,
    x_max: 1054,
    o: "m 42 360 l 42 421 l 786 421 l 786 360 l 42 360 m 42 551 l 42 613 l 786 613 l 786 551 l 42 551 m 696 -8 q 494 28 588 -8 q 333 132 401 65 q 226 289 264 199 q 188 486 188 379 q 226 683 188 593 q 333 840 264 774 q 494 944 401 907 q 696 981 588 981 q 897 945 804 981 q 1054 839 989 910 l 988 774 q 856 862 929 835 q 701 889 783 889 q 538 859 613 889 q 407 774 463 829 q 321 647 351 719 q 290 486 290 574 q 321 326 290 399 q 407 198 351 253 q 538 113 463 143 q 701 83 613 83 q 856 111 783 83 q 988 200 929 139 l 1054 135 q 897 28 989 64 q 696 -8 804 -8 z "
  },
  ƒ: {
    ha: 608,
    x_min: -125,
    x_max: 658,
    o: "m 25 -276 q -60 -265 -19 -276 q -125 -229 -100 -253 l -85 -154 q 22 -192 -44 -192 q 117 -157 81 -192 q 163 -54 154 -122 l 271 821 q 345 978 282 918 q 511 1038 408 1038 q 594 1026 554 1038 q 658 990 633 1014 l 615 915 q 570 944 597 935 q 513 953 543 953 q 413 918 450 953 q 367 815 376 883 l 353 706 l 350 660 l 261 -60 q 188 -217 249 -157 q 25 -276 126 -276 m 118 636 l 128 718 l 578 718 l 568 636 l 118 636 z "
  },
  "₣": {
    ha: 908,
    x_min: 42,
    x_max: 854,
    o: "m 42 181 l 42 242 l 603 242 l 603 181 l 42 181 m 279 501 l 793 501 l 793 413 l 279 413 l 279 501 m 290 0 l 188 0 l 188 972 l 854 972 l 854 883 l 290 883 l 290 0 z "
  },
  "₲": {
    ha: 1074,
    x_min: 72,
    x_max: 947,
    o: "m 521 -167 l 521 1139 l 590 1139 l 590 -167 l 521 -167 m 585 -8 q 380 28 474 -8 q 217 132 286 65 q 110 289 149 199 q 72 486 72 379 q 110 683 72 593 q 218 840 149 774 q 381 944 288 907 q 586 981 475 981 q 790 946 697 981 q 947 840 882 911 l 883 775 q 749 863 822 836 q 590 889 675 889 q 424 859 500 889 q 292 774 349 829 q 205 647 236 719 q 174 486 174 574 q 205 326 174 400 q 292 198 236 253 q 424 113 349 143 q 589 83 500 83 q 747 108 672 83 q 883 193 821 133 l 942 115 q 779 23 872 54 q 585 -8 686 -8 m 843 128 l 843 486 l 942 486 l 942 115 l 843 128 z "
  },
  "₴": {
    ha: 1146,
    x_min: 135,
    x_max: 1004,
    o: "m 581 -10 q 378 26 460 -10 q 256 122 297 61 q 215 257 215 182 q 228 331 215 300 q 264 386 242 363 l 431 386 q 373 351 399 369 q 333 309 347 333 q 318 250 318 285 q 345 164 318 203 q 430 102 372 125 q 578 79 488 79 q 764 110 676 79 q 903 189 851 142 l 936 111 q 778 24 874 57 q 581 -10 682 -10 m 135 363 l 135 422 l 1004 422 l 1004 363 l 135 363 m 135 554 l 135 614 l 1004 614 l 1004 554 l 135 554 m 690 582 q 751 618 724 600 q 797 660 779 636 q 814 717 814 685 q 788 806 814 767 q 704 869 761 846 q 558 893 647 893 q 422 875 493 893 q 288 819 351 857 l 260 901 q 400 960 322 939 q 556 982 478 982 q 755 946 675 982 q 875 849 835 910 q 915 714 915 789 q 903 639 915 671 q 869 582 890 607 l 690 582 z "
  },
  "₭": {
    ha: 872,
    x_min: 42,
    x_max: 864,
    o: "m 42 451 l 42 521 l 760 521 l 760 451 l 42 451 m 188 0 l 188 972 l 289 972 l 289 0 l 188 0 m 740 0 l 292 486 l 415 486 l 864 0 l 740 0 m 740 972 l 864 972 l 415 486 l 292 486 l 740 972 z "
  },
  "₤": {
    ha: 885,
    x_min: 42,
    x_max: 863,
    o: "m 42 0 l 42 89 l 844 89 l 844 0 l 42 0 m 199 18 l 199 638 q 242 819 199 742 q 373 938 286 896 q 585 981 460 981 q 738 963 669 981 q 863 907 807 946 l 825 822 q 712 874 775 858 q 576 889 649 889 q 369 824 438 889 q 300 638 300 758 l 300 18 l 199 18 m 42 360 l 42 421 l 685 421 l 685 360 l 42 360 m 42 551 l 42 613 l 685 613 l 685 551 l 42 551 z "
  },
  "₺": {
    ha: 965,
    x_min: 42,
    x_max: 904,
    o: "m 199 0 l 199 972 l 299 972 l 299 89 l 375 89 q 696 194 589 89 q 803 489 803 299 l 904 489 q 843 224 904 333 q 660 58 782 115 q 356 0 538 0 l 199 0 m 42 301 l 42 367 l 685 704 l 685 639 l 42 301 m 42 497 l 42 563 l 685 900 l 685 835 l 42 497 z "
  },
  "₼": {
    ha: 1276,
    x_min: 158,
    x_max: 1118,
    o: "m 158 0 l 158 426 q 219 731 158 607 q 389 917 281 854 q 639 981 497 981 q 888 917 781 981 q 1057 731 996 854 q 1118 426 1118 607 l 1118 0 l 1022 0 l 1022 424 q 976 685 1022 581 q 845 840 931 789 q 639 892 760 892 q 433 840 519 892 q 301 684 347 788 q 254 424 254 581 l 254 0 l 158 0 m 604 167 l 604 1139 l 672 1139 l 672 167 l 604 167 z "
  },
  "₦": {
    ha: 1208,
    x_min: 42,
    x_max: 1167,
    o: "m 199 0 l 199 972 l 282 972 l 953 128 l 908 128 l 908 972 l 1010 972 l 1010 0 l 926 0 l 256 844 l 300 844 l 300 0 l 199 0 m 42 360 l 42 421 l 1167 421 l 1167 360 l 42 360 m 42 551 l 42 613 l 1167 613 l 1167 551 l 42 551 z "
  },
  "₧": {
    ha: 2246,
    x_min: 158,
    x_max: 2201,
    o: "m 158 0 l 158 972 l 522 972 q 735 933 646 972 q 872 819 824 893 q 919 639 919 744 q 872 462 919 536 q 735 347 824 388 q 522 307 646 307 l 215 307 l 261 356 l 261 0 l 158 0 m 261 347 l 215 397 l 519 397 q 741 460 665 397 q 817 639 817 524 q 741 819 817 756 q 519 883 665 883 l 215 883 l 261 932 l 261 347 m 1372 -7 q 1214 49 1269 -7 q 1158 206 1158 104 l 1158 890 l 1257 890 l 1257 211 q 1290 113 1257 147 q 1383 78 1322 78 q 1492 115 1449 78 l 1526 44 q 1456 6 1497 18 q 1372 -7 1415 -7 m 1028 647 l 1028 729 l 1479 729 l 1479 647 l 1028 647 m 1900 -7 q 1729 19 1810 -7 q 1603 83 1649 44 l 1647 161 q 1761 103 1692 128 q 1907 79 1831 79 q 2057 112 2011 79 q 2103 199 2103 144 q 2077 262 2103 239 q 2010 297 2051 285 q 1917 317 1968 308 q 1815 336 1865 325 q 1722 369 1764 347 q 1655 428 1681 390 q 1629 528 1629 465 q 1663 635 1629 588 q 1760 709 1696 682 q 1918 736 1825 736 q 2060 717 1989 736 q 2176 668 2131 699 l 2133 589 q 2029 637 2085 622 q 1918 651 1974 651 q 1773 617 1819 651 q 1726 531 1726 583 q 1752 465 1726 489 q 1820 428 1778 442 q 1913 407 1863 415 q 2015 387 1964 399 q 2108 355 2065 375 q 2176 298 2150 335 q 2201 201 2201 261 q 2166 91 2201 138 q 2063 19 2131 44 q 1900 -7 1996 -7 z "
  },
  "₱": {
    ha: 1157,
    x_min: 42,
    x_max: 1115,
    o: "m 42 514 l 42 574 l 1115 574 l 1115 514 l 42 514 m 42 706 l 42 765 l 1115 765 l 1115 706 l 42 706 m 199 0 l 199 972 l 561 972 q 774 933 685 972 q 910 819 863 893 q 958 639 958 744 q 910 462 958 536 q 774 347 863 388 q 561 307 685 307 l 254 307 l 300 356 l 300 0 l 199 0 m 300 347 l 254 397 l 560 397 q 781 460 704 397 q 857 639 857 524 q 781 819 857 756 q 560 883 704 883 l 254 883 l 300 932 l 300 347 z "
  },
  "₽": {
    ha: 1026,
    x_min: 42,
    x_max: 949,
    o: "m 188 0 l 188 972 l 551 972 q 842 889 736 972 q 949 650 949 806 q 842 410 949 493 q 551 326 736 326 l 244 326 l 290 375 l 290 0 l 188 0 m 290 367 l 244 414 l 553 414 q 770 475 694 414 q 846 649 846 536 q 770 822 846 761 q 553 883 694 883 l 244 883 l 290 932 l 290 367 m 42 181 l 42 242 l 603 242 l 603 181 l 42 181 z "
  },
  "₹": {
    ha: 997,
    x_min: 33,
    x_max: 928,
    o: "m 158 343 l 158 432 l 381 432 q 605 496 532 432 q 678 663 678 560 q 601 845 678 778 q 374 911 524 913 l 33 910 l 33 972 l 928 972 l 928 911 l 553 911 l 582 939 q 732 830 685 904 q 779 661 779 756 q 732 491 779 563 q 596 381 685 419 q 383 343 507 343 l 158 343 m 683 0 l 429 385 l 542 385 l 796 0 l 683 0 m 33 717 l 33 779 l 928 779 l 928 717 l 33 717 z "
  },
  "£": {
    ha: 885,
    x_min: 42,
    x_max: 863,
    o: "m 199 18 l 199 638 q 242 819 199 742 q 373 938 286 896 q 585 981 460 981 q 738 963 669 981 q 863 907 807 946 l 825 822 q 712 874 775 858 q 576 889 649 889 q 369 824 438 889 q 300 638 300 758 l 300 18 l 199 18 m 42 0 l 42 89 l 844 89 l 844 0 l 42 0 m 42 451 l 42 521 l 685 521 l 685 451 l 42 451 z "
  },
  "₸": {
    ha: 997,
    x_min: 110,
    x_max: 896,
    o: "m 451 0 l 451 722 l 110 722 l 110 785 l 896 785 l 896 722 l 553 722 l 553 0 l 451 0 m 110 910 l 110 972 l 896 972 l 896 910 l 110 910 z "
  },
  "₮": {
    ha: 936,
    x_min: 75,
    x_max: 863,
    o: "m 417 0 l 417 911 l 444 883 l 75 883 l 75 972 l 863 972 l 863 883 l 492 883 l 519 911 l 519 0 l 417 0 m 172 165 l 172 231 l 764 529 l 764 465 l 172 165 m 172 363 l 172 426 l 764 725 l 764 661 l 172 363 z "
  },
  "₩": {
    ha: 1626,
    x_min: 42,
    x_max: 1585,
    o: "m 406 0 l 64 972 l 171 972 l 492 57 l 436 57 l 767 972 l 864 972 l 1190 57 l 1138 57 l 1461 972 l 1563 972 l 1221 0 l 1113 0 l 800 868 l 828 868 l 514 0 l 406 0 m 42 360 l 42 421 l 1585 421 l 1585 360 l 42 360 m 42 551 l 42 613 l 1585 613 l 1585 551 l 42 551 z "
  },
  "¥": {
    ha: 965,
    x_min: 1,
    x_max: 964,
    o: "m 432 0 l 432 422 l 456 354 l 1 972 l 110 972 l 514 425 l 454 425 l 858 972 l 964 972 l 510 354 l 533 422 l 533 0 l 432 0 m 126 181 l 126 242 l 839 242 l 839 181 l 126 181 m 126 372 l 126 433 l 839 433 l 839 372 l 126 372 z "
  },
  "∙": {
    ha: 378,
    x_min: 115,
    x_max: 263,
    o: "m 189 408 q 137 431 158 408 q 115 485 115 453 q 137 540 115 518 q 189 561 158 561 q 242 540 221 561 q 263 485 263 518 q 242 431 263 453 q 189 408 221 408 z "
  },
  "⁒": {
    ha: 714,
    x_min: 118,
    x_max: 594,
    o: "m 144 0 l 490 972 l 569 972 l 222 0 l 144 0 m 525 0 q 477 20 497 0 q 457 68 457 40 q 477 116 457 96 q 525 136 497 136 q 574 116 554 136 q 594 68 594 96 q 574 20 594 40 q 525 0 554 0 m 188 836 q 139 856 160 836 q 118 904 118 876 q 139 953 118 933 q 188 972 160 972 q 235 953 215 972 q 256 904 256 933 q 235 856 256 876 q 188 836 215 836 z "
  },
  "∕": {
    ha: 465,
    x_min: -35,
    x_max: 514,
    o: "m -35 -139 l 424 1169 l 514 1169 l 56 -139 l -35 -139 z "
  },
  "+": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 356 192 l 356 781 l 443 781 l 443 192 l 356 192 m 97 444 l 97 526 l 701 526 l 701 444 l 97 444 z "
  },
  "−": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 97 444 l 97 526 l 701 526 l 701 444 l 97 444 z "
  },
  "×": {
    ha: 799,
    x_min: 158,
    x_max: 640,
    o: "m 158 301 l 585 731 l 640 671 l 214 242 l 158 301 m 158 671 l 214 731 l 640 301 l 585 242 l 158 671 z "
  },
  "÷": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 97 444 l 97 526 l 701 526 l 701 444 l 97 444 m 399 153 q 353 172 372 153 q 333 221 333 192 q 353 269 333 250 q 399 288 372 288 q 446 269 426 288 q 465 221 465 250 q 446 172 465 192 q 399 153 426 153 m 399 685 q 353 704 372 685 q 333 751 333 724 q 353 801 333 782 q 399 819 372 819 q 446 801 426 819 q 465 751 465 782 q 446 704 465 724 q 399 685 426 685 z "
  },
  "=": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 97 606 l 97 688 l 701 688 l 701 606 l 97 606 m 97 285 l 97 367 l 701 367 l 701 285 l 97 285 z "
  },
  "≠": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 151 114 l 563 858 l 647 858 l 236 114 l 151 114 m 97 285 l 97 367 l 701 367 l 701 285 l 97 285 m 97 606 l 97 688 l 701 688 l 701 606 l 97 606 z "
  },
  ">": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 97 199 l 97 285 l 665 508 l 665 464 l 97 688 l 97 774 l 701 532 l 701 440 l 97 199 z "
  },
  "<": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 701 199 l 97 440 l 97 532 l 701 774 l 701 688 l 133 464 l 133 508 l 701 285 l 701 199 z "
  },
  "≥": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 97 243 l 97 331 l 667 551 l 667 497 l 97 718 l 97 806 l 701 568 l 701 481 l 97 243 m 701 0 l 97 0 l 97 82 l 701 82 l 701 0 z "
  },
  "≤": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 701 243 l 97 481 l 97 568 l 701 806 l 701 718 l 132 497 l 132 551 l 701 331 l 701 243 m 97 0 l 97 82 l 701 82 l 701 0 l 97 0 z "
  },
  "±": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 97 0 l 97 82 l 701 82 l 701 0 l 97 0 m 356 240 l 356 821 l 443 821 l 443 240 l 356 240 m 97 489 l 97 572 l 701 572 l 701 489 l 97 489 z "
  },
  "≈": {
    ha: 799,
    x_min: 86,
    x_max: 713,
    o: "m 540 536 q 453 558 490 536 q 386 607 417 579 q 326 656 356 635 q 261 676 297 676 q 184 641 213 676 q 153 544 156 606 l 86 544 q 137 701 89 649 q 258 754 185 754 q 345 733 308 754 q 412 683 382 711 q 472 634 442 656 q 538 613 501 613 q 615 649 586 613 q 646 747 644 686 l 713 747 q 663 590 710 643 q 540 536 615 536 m 540 218 q 453 239 490 218 q 386 288 417 260 q 326 337 356 315 q 261 358 297 358 q 184 322 213 358 q 153 225 156 286 l 86 225 q 137 383 89 331 q 258 435 185 435 q 345 414 308 435 q 412 365 382 393 q 472 316 442 338 q 538 294 501 294 q 615 331 586 294 q 646 428 644 367 l 713 428 q 663 271 710 324 q 540 218 615 218 z "
  },
  "~": {
    ha: 799,
    x_min: 86,
    x_max: 713,
    o: "m 540 378 q 453 399 490 378 q 386 449 417 421 q 326 497 356 476 q 261 518 297 518 q 184 483 213 518 q 153 386 156 447 l 86 386 q 137 543 89 490 q 258 596 185 596 q 345 574 308 596 q 412 525 382 553 q 472 476 442 497 q 538 454 501 454 q 615 491 586 454 q 646 588 644 528 l 713 588 q 663 431 710 483 q 540 378 615 378 z "
  },
  "¬": {
    ha: 799,
    x_min: 97,
    x_max: 701,
    o: "m 701 528 l 701 196 l 614 196 l 614 446 l 97 446 l 97 528 l 701 528 z "
  },
  "^": {
    ha: 800,
    x_min: 115,
    x_max: 685,
    o: "m 115 199 l 358 774 l 443 774 l 685 199 l 603 199 l 379 739 l 421 739 l 197 199 l 115 199 z "
  },
  "∅": {
    ha: 799,
    x_min: 58,
    x_max: 742,
    o: "m 92 132 l 58 168 l 708 776 l 742 740 l 92 132 m 400 167 q 254 206 321 167 q 149 311 188 244 q 110 457 110 378 q 149 603 110 538 q 255 707 189 668 q 400 746 321 746 q 547 707 481 746 q 651 603 613 668 q 690 457 690 538 q 651 311 690 378 q 547 206 613 244 q 400 167 481 167 m 400 238 q 511 267 461 238 q 590 347 561 297 q 619 457 619 397 q 590 567 619 518 q 511 646 561 617 q 400 675 461 675 q 290 646 339 675 q 211 567 240 617 q 182 457 182 518 q 211 347 182 397 q 290 267 240 297 q 400 238 339 238 z "
  },
  "∞": {
    ha: 1278,
    x_min: 64,
    x_max: 1214,
    o: "m 946 222 q 813 247 868 222 q 719 311 757 271 q 650 399 681 351 q 592 495 619 447 q 530 583 564 543 q 450 648 496 624 q 338 672 404 672 q 240 647 283 672 q 171 581 196 622 q 146 486 146 539 q 171 392 146 433 q 240 325 196 350 q 338 300 283 300 q 450 324 404 300 q 530 389 496 349 q 592 477 564 429 q 650 573 619 525 q 719 661 681 621 q 813 726 757 701 q 946 750 868 750 q 1083 716 1024 750 q 1178 623 1143 682 q 1214 488 1214 564 q 1178 351 1214 411 q 1083 257 1143 292 q 946 222 1024 222 m 333 222 q 196 257 257 222 q 99 351 135 292 q 64 486 64 411 q 99 622 64 563 q 196 716 135 682 q 333 750 257 750 q 466 726 411 750 q 560 661 521 701 q 628 574 599 621 q 687 478 658 526 q 749 389 715 429 q 828 324 782 349 q 940 300 874 300 q 1039 325 996 300 q 1107 392 1082 350 q 1132 488 1132 435 q 1107 582 1132 540 q 1039 648 1082 624 q 940 672 996 672 q 828 648 874 672 q 749 583 782 624 q 687 495 715 543 q 628 399 658 447 q 560 311 599 351 q 466 247 521 271 q 333 222 411 222 z "
  },
  "∫": {
    ha: 535,
    x_min: -50,
    x_max: 585,
    o: "m 107 -276 q 20 -265 61 -276 q -50 -229 -21 -253 l -17 -154 q 94 -192 26 -192 q 185 -157 153 -192 q 218 -54 218 -122 l 218 824 q 273 980 218 921 q 428 1039 328 1039 q 514 1028 472 1039 q 585 992 556 1017 l 550 918 q 502 946 531 936 q 440 956 474 956 q 349 920 381 956 q 317 818 317 885 l 317 -60 q 262 -217 317 -157 q 107 -276 207 -276 z "
  },
  Ω: {
    ha: 1253,
    x_min: 13,
    x_max: 1240,
    o: "m 13 0 l 13 90 l 324 90 q 169 267 222 161 q 117 494 117 372 q 155 690 117 601 q 263 844 193 779 q 425 945 332 910 q 626 981 518 981 q 828 945 736 981 q 990 844 921 910 q 1098 690 1060 779 q 1136 494 1136 601 q 1083 267 1136 372 q 929 90 1031 161 l 1240 90 l 1240 0 l 771 0 l 771 83 q 967 258 900 150 q 1033 490 1033 365 q 1003 651 1033 578 q 919 777 974 724 q 790 860 864 831 q 626 889 715 889 q 464 860 539 889 q 335 777 389 831 q 250 651 281 724 q 219 490 219 578 q 286 257 219 365 q 482 83 353 149 l 482 0 l 13 0 z "
  },
  "∆": {
    ha: 996,
    x_min: 3,
    x_max: 993,
    o: "m 549 972 l 993 0 l 3 0 l 447 972 l 549 972 m 126 40 l 96 89 l 897 89 l 867 40 l 476 913 l 518 913 l 126 40 z "
  },
  "∏": {
    ha: 1129,
    x_min: 158,
    x_max: 971,
    o: "m 158 -269 l 158 972 l 971 972 l 971 -269 l 869 -269 l 869 879 l 261 879 l 261 -269 l 158 -269 z "
  },
  "∑": {
    ha: 904,
    x_min: 63,
    x_max: 860,
    o: "m 63 -269 l 63 -199 l 564 389 l 564 317 l 79 901 l 79 972 l 851 972 l 851 883 l 169 883 l 188 921 l 629 388 l 629 317 l 169 -215 l 154 -181 l 860 -181 l 860 -269 l 63 -269 z "
  },
  "√": {
    ha: 1106,
    x_min: 97,
    x_max: 1103,
    o: "m 1007 1031 l 1103 1031 l 649 -269 l 547 -269 l 278 446 l 97 446 l 97 528 l 350 528 l 610 -175 l 586 -175 l 1007 1031 z "
  },
  µ: {
    ha: 942,
    x_min: 138,
    x_max: 804,
    o: "m 138 -269 l 138 729 l 236 729 l 236 317 q 294 141 236 200 q 457 82 351 82 q 589 113 533 82 q 675 204 644 144 q 706 347 706 264 l 706 729 l 804 729 l 804 0 l 710 0 l 710 203 l 726 176 q 665 73 706 114 q 571 13 624 32 q 458 -7 518 -7 q 310 28 372 -7 q 217 132 249 64 l 236 176 l 236 -269 l 138 -269 z "
  },
  "∂": {
    ha: 972,
    x_min: 111,
    x_max: 861,
    o: "m 453 -8 q 278 29 356 -8 q 156 136 200 67 q 111 299 111 206 q 156 461 111 392 q 278 568 200 531 q 457 606 357 606 q 610 575 542 606 q 723 485 678 544 q 781 342 768 426 l 742 329 q 758 419 754 374 q 763 503 763 465 q 718 724 763 633 q 592 863 674 815 q 397 911 510 911 q 288 903 340 911 q 192 882 236 896 l 176 967 q 278 989 221 981 q 397 997 336 997 q 647 938 543 997 q 806 763 750 878 q 861 482 861 647 q 814 222 861 332 q 676 51 767 111 q 453 -8 585 -8 m 458 76 q 602 108 543 76 q 692 191 661 140 q 722 299 722 242 q 690 413 722 363 q 599 492 657 463 q 467 521 542 521 q 278 460 347 521 q 210 299 210 399 q 241 182 210 232 q 328 104 272 132 q 458 76 385 76 z "
  },
  "%": {
    ha: 1151,
    x_min: 58,
    x_max: 1093,
    o: "m 203 0 l 867 972 l 949 972 l 285 0 l 203 0 m 278 451 q 163 484 213 451 q 85 576 113 517 q 58 715 58 636 q 85 854 58 794 q 163 947 113 914 q 278 979 213 979 q 392 947 343 979 q 469 854 442 914 q 497 715 497 794 q 469 576 497 636 q 392 484 442 517 q 278 451 343 451 m 278 514 q 387 567 346 514 q 428 715 428 621 q 387 863 428 810 q 278 917 346 917 q 168 863 208 917 q 128 715 128 810 q 168 567 128 621 q 278 514 208 514 m 874 -7 q 760 26 810 -7 q 682 118 710 58 q 654 257 654 178 q 682 396 654 336 q 760 488 710 456 q 874 521 810 521 q 990 488 940 521 q 1066 396 1039 456 q 1093 257 1093 336 q 1066 118 1093 178 q 990 26 1039 58 q 874 -7 940 -7 m 874 56 q 983 109 942 56 q 1024 257 1024 163 q 983 405 1024 351 q 874 458 942 458 q 765 405 806 458 q 724 257 724 351 q 765 109 724 163 q 874 56 806 56 z "
  },
  "‰": {
    ha: 1653,
    x_min: 58,
    x_max: 1594,
    o: "m 203 0 l 867 972 l 949 972 l 285 0 l 203 0 m 278 451 q 163 484 213 451 q 85 576 113 517 q 58 715 58 636 q 85 854 58 794 q 163 947 113 914 q 278 979 213 979 q 392 947 343 979 q 469 854 442 914 q 497 715 497 794 q 469 576 497 636 q 392 484 442 517 q 278 451 343 451 m 278 514 q 387 567 346 514 q 428 715 428 621 q 387 863 428 810 q 278 917 346 917 q 168 863 208 917 q 128 715 128 810 q 168 567 128 621 q 278 514 208 514 m 874 -7 q 760 26 810 -7 q 682 118 710 58 q 654 257 654 178 q 682 396 654 336 q 760 488 710 456 q 874 521 810 521 q 990 488 940 521 q 1066 396 1039 456 q 1093 257 1093 336 q 1066 118 1093 178 q 990 26 1039 58 q 874 -7 940 -7 m 874 56 q 983 109 942 56 q 1024 257 1024 163 q 983 405 1024 351 q 874 458 942 458 q 765 405 806 458 q 724 257 724 351 q 765 109 724 163 q 874 56 806 56 m 1375 -7 q 1261 26 1311 -7 q 1183 117 1211 58 q 1156 257 1156 176 q 1183 397 1156 338 q 1261 488 1211 456 q 1375 521 1311 521 q 1491 488 1442 521 q 1567 396 1540 456 q 1594 257 1594 336 q 1567 118 1594 178 q 1491 26 1540 58 q 1375 -7 1442 -7 m 1375 56 q 1484 109 1443 56 q 1525 257 1525 163 q 1484 405 1525 351 q 1375 458 1443 458 q 1266 405 1307 458 q 1225 257 1225 351 q 1266 109 1225 163 q 1375 56 1307 56 z "
  },
  "↑": {
    ha: 833,
    x_min: 144,
    x_max: 689,
    o: "m 144 400 l 144 489 l 415 676 l 689 489 l 689 400 l 415 579 l 144 400 m 375 88 l 375 599 l 457 599 l 457 88 l 375 88 z "
  },
  "↗": {
    ha: 833,
    x_min: 182,
    x_max: 686,
    o: "m 242 588 l 301 651 l 625 590 l 686 263 l 625 200 l 558 522 l 242 588 m 182 204 l 544 565 l 601 503 l 240 142 l 182 204 z "
  },
  "→": {
    ha: 833,
    x_min: 103,
    x_max: 686,
    o: "m 500 651 l 686 379 l 500 104 l 407 104 l 586 379 l 407 651 l 500 651 m 607 417 l 607 340 l 103 340 l 103 417 l 607 417 z "
  },
  "↘": {
    ha: 833,
    x_min: 183,
    x_max: 685,
    o: "m 625 575 l 685 513 l 626 186 l 301 124 l 242 188 l 563 256 l 625 575 m 242 633 l 603 272 l 544 211 l 183 572 l 242 633 z "
  },
  "↓": {
    ha: 833,
    x_min: 161,
    x_max: 706,
    o: "m 706 358 l 706 268 l 435 81 l 161 268 l 161 358 l 435 178 l 706 358 m 475 669 l 475 158 l 393 158 l 393 669 l 475 669 z "
  },
  "↙": {
    ha: 833,
    x_min: 167,
    x_max: 671,
    o: "m 611 196 l 551 132 l 228 193 l 167 521 l 228 583 l 294 261 l 611 196 m 671 579 l 308 218 l 251 281 l 613 642 l 671 579 z "
  },
  "←": {
    ha: 833,
    x_min: 147,
    x_max: 731,
    o: "m 333 106 l 147 378 l 333 653 l 426 653 l 247 378 l 426 106 l 333 106 m 226 340 l 226 417 l 731 417 l 731 340 l 226 340 z "
  },
  "↖": {
    ha: 833,
    x_min: 168,
    x_max: 669,
    o: "m 228 208 l 168 271 l 226 597 l 551 660 l 611 596 l 290 528 l 228 208 m 611 150 l 250 511 l 308 572 l 669 211 l 611 150 z "
  },
  "↔": {
    ha: 954,
    x_min: 69,
    x_max: 885,
    o: "m 604 106 l 783 378 l 604 653 l 697 653 l 885 378 l 697 106 l 604 106 m 256 106 l 69 378 l 256 653 l 350 653 l 169 378 l 350 106 l 256 106 m 144 340 l 144 417 l 806 417 l 806 340 l 144 340 z "
  },
  "↕": {
    ha: 833,
    x_min: 143,
    x_max: 689,
    o: "m 144 601 l 144 692 l 415 879 l 689 692 l 689 601 l 415 782 l 144 601 m 417 71 l 143 258 l 143 349 l 417 168 l 686 349 l 686 258 l 417 71 m 375 151 l 375 801 l 457 801 l 457 151 l 375 151 z "
  },
  "◆": {
    ha: 833,
    x_min: 35,
    x_max: 797,
    o: "m 35 368 l 417 750 l 797 368 l 417 -12 l 35 368 z "
  },
  "◇": {
    ha: 833,
    x_min: 35,
    x_max: 797,
    o: "m 35 368 l 417 750 l 797 368 l 417 -12 l 35 368 m 118 368 l 417 76 l 714 368 l 417 660 l 118 368 z "
  },
  "◊": {
    ha: 696,
    x_min: 64,
    x_max: 632,
    o: "m 347 31 l 64 458 l 349 882 l 632 458 l 347 31 m 347 149 l 557 458 l 349 767 l 139 458 l 347 149 z "
  },
  "■": {
    ha: 833,
    x_min: 147,
    x_max: 686,
    o: "m 147 99 l 147 638 l 686 638 l 686 99 l 147 99 z "
  },
  "□": {
    ha: 833,
    x_min: 147,
    x_max: 686,
    o: "m 147 99 l 147 638 l 686 638 l 686 99 l 147 99 m 207 161 l 626 161 l 626 575 l 207 575 l 207 161 z "
  },
  "▲": {
    ha: 833,
    x_min: 121,
    x_max: 713,
    o: "m 121 72 l 417 664 l 713 72 l 121 72 z "
  },
  "▶": {
    ha: 833,
    x_min: 160,
    x_max: 751,
    o: "m 160 665 l 751 369 l 160 74 l 160 665 z "
  },
  "▼": {
    ha: 833,
    x_min: 121,
    x_max: 713,
    o: "m 121 664 l 713 664 l 417 72 l 121 664 z "
  },
  "◀": {
    ha: 835,
    x_min: 81,
    x_max: 672,
    o: "m 672 72 l 81 368 l 672 664 l 672 72 z "
  },
  "△": {
    ha: 833,
    x_min: 121,
    x_max: 713,
    o: "m 121 72 l 417 664 l 713 72 l 121 72 m 203 126 l 631 126 l 417 544 l 203 126 z "
  },
  "▷": {
    ha: 833,
    x_min: 160,
    x_max: 751,
    o: "m 160 665 l 751 369 l 160 74 l 160 665 m 211 579 l 211 160 l 638 369 l 211 579 z "
  },
  "▽": {
    ha: 833,
    x_min: 121,
    x_max: 713,
    o: "m 121 664 l 713 664 l 417 72 l 121 664 m 203 610 l 417 192 l 631 610 l 203 610 z "
  },
  "◁": {
    ha: 833,
    x_min: 81,
    x_max: 672,
    o: "m 672 72 l 81 368 l 672 664 l 672 72 m 621 158 l 621 578 l 194 368 l 621 158 z "
  },
  "@": {
    ha: 1435,
    x_min: 72,
    x_max: 1363,
    o: "m 715 -278 q 454 -231 572 -278 q 251 -101 336 -185 q 119 99 165 -17 q 72 353 72 215 q 119 606 72 492 q 252 805 165 721 q 458 935 339 889 q 721 981 578 981 q 980 936 863 981 q 1183 810 1097 892 q 1316 617 1269 729 q 1363 368 1363 504 q 1335 167 1363 251 q 1257 38 1308 83 q 1133 -7 1206 -7 q 1019 36 1063 -7 q 976 157 976 79 l 976 267 l 988 356 l 974 494 l 974 704 l 1064 704 l 1064 178 q 1089 96 1064 119 q 1150 72 1114 72 q 1225 107 1193 72 q 1274 208 1257 142 q 1292 367 1292 274 q 1250 589 1292 489 q 1132 761 1208 689 q 951 872 1056 833 q 721 910 847 910 q 489 869 594 910 q 308 755 383 829 q 190 578 232 681 q 149 353 149 476 q 190 126 149 229 q 306 -51 231 24 q 485 -166 381 -125 q 715 -207 589 -207 q 849 -192 778 -207 q 982 -146 921 -176 l 1006 -214 q 864 -262 943 -246 q 715 -278 785 -278 m 699 -7 q 522 40 600 -7 q 399 167 444 86 q 354 353 354 249 q 399 538 354 457 q 522 664 444 618 q 699 710 600 710 q 869 667 794 710 q 985 544 943 624 q 1028 353 1028 464 q 985 161 1028 242 q 869 37 943 81 q 699 -7 796 -7 m 711 74 q 847 108 786 74 q 941 206 907 143 q 975 353 975 269 q 941 499 975 438 q 847 595 907 561 q 711 629 786 629 q 574 595 633 629 q 480 499 514 561 q 446 353 446 436 q 480 207 446 269 q 574 109 514 144 q 711 74 633 74 z "
  },
  "&": {
    ha: 929,
    x_min: 68,
    x_max: 911,
    o: "m 394 -8 q 226 23 300 -8 q 110 110 153 54 q 68 239 68 165 q 96 353 68 301 q 185 456 124 406 q 350 563 247 507 q 487 647 438 611 q 557 715 536 682 q 578 785 578 747 q 541 872 578 839 q 436 906 504 906 q 322 869 363 906 q 282 774 282 832 q 291 718 282 744 q 326 660 300 692 q 397 579 351 628 l 911 50 l 854 -15 l 318 536 q 241 626 269 588 q 201 699 213 664 q 190 772 190 733 q 220 881 190 835 q 306 953 250 928 q 436 979 361 979 q 555 956 504 979 q 634 890 606 933 q 663 786 663 847 q 637 688 663 733 q 553 598 611 642 q 394 500 494 554 q 256 411 307 451 q 185 333 206 371 q 164 249 164 294 q 194 156 164 196 q 277 95 224 117 q 400 74 331 74 q 574 114 497 74 q 702 236 650 154 q 778 442 754 318 l 857 417 q 767 183 831 278 q 608 40 703 89 q 394 -8 514 -8 z "
  },
  "¶": {
    ha: 878,
    x_min: 29,
    x_max: 719,
    o: "m 314 -139 l 314 549 q 166 580 231 550 q 65 664 101 610 q 29 790 29 718 q 66 919 29 865 q 170 1001 103 972 q 328 1031 238 1031 l 719 1031 l 719 -139 l 636 -139 l 636 953 l 397 953 l 397 -139 l 314 -139 z "
  },
  "§": {
    ha: 681,
    x_min: 39,
    x_max: 638,
    o: "m 472 204 l 400 257 q 502 303 461 267 q 543 400 543 339 q 518 472 543 444 q 453 516 493 500 q 363 544 413 532 q 266 569 314 556 q 177 606 218 583 q 111 665 136 628 q 86 763 86 703 q 122 878 86 829 q 226 953 158 926 q 388 979 293 979 q 478 971 431 979 q 567 947 525 963 q 638 908 610 931 l 604 833 q 499 883 557 867 q 381 899 442 899 q 228 865 281 899 q 175 765 175 832 q 200 697 175 722 q 265 656 225 671 q 354 628 306 640 q 451 601 403 615 q 540 564 500 588 q 606 501 581 540 q 631 400 631 463 q 585 277 631 329 q 472 204 540 225 m 319 -146 q 213 -134 267 -146 q 113 -101 158 -122 q 39 -54 68 -81 l 72 22 q 183 -40 115 -14 q 322 -65 250 -65 q 460 -31 410 -65 q 510 68 510 3 q 485 138 510 113 q 420 180 460 164 q 332 208 381 196 q 234 233 283 219 q 144 269 185 246 q 79 331 104 292 q 54 431 54 369 q 99 556 54 506 q 211 628 144 607 l 281 576 q 182 531 222 567 q 142 435 142 494 q 167 362 142 389 q 232 318 192 335 q 322 290 272 301 q 419 265 371 279 q 509 228 468 251 q 574 167 550 206 q 599 69 599 129 q 564 -44 599 4 q 467 -119 529 -93 q 319 -146 404 -146 z "
  },
  "©": {
    ha: 1124,
    x_min: 72,
    x_max: 1053,
    o: "m 561 -4 q 368 33 457 -4 q 213 138 279 71 q 109 294 146 206 q 72 486 72 383 q 110 678 72 589 q 214 834 147 767 q 370 939 281 901 q 564 976 460 976 q 758 940 668 976 q 913 836 847 903 q 1016 681 979 769 q 1053 489 1053 593 q 1015 295 1053 385 q 910 138 978 206 q 754 33 843 71 q 561 -4 665 -4 m 560 47 q 733 81 654 47 q 873 175 813 115 q 967 316 933 235 q 1000 489 1000 397 q 967 661 1000 582 q 876 800 935 740 q 737 892 817 860 q 564 925 657 925 q 389 892 469 925 q 249 798 308 858 q 157 658 190 738 q 124 486 124 579 q 157 315 124 394 q 249 174 190 235 q 388 81 308 114 q 560 47 468 47 m 574 197 q 425 234 490 197 q 322 336 360 271 q 285 486 285 401 q 322 636 285 571 q 425 738 360 701 q 574 775 490 775 q 702 747 644 775 q 794 668 760 718 l 735 624 q 664 683 706 664 q 572 703 622 703 q 466 676 513 703 q 392 600 419 649 q 364 486 364 551 q 392 372 364 421 q 466 297 419 324 q 572 269 513 269 q 664 289 622 269 q 735 349 706 308 l 794 306 q 702 226 760 254 q 574 197 644 197 z "
  },
  "®": {
    ha: 1124,
    x_min: 72,
    x_max: 1053,
    o: "m 561 -4 q 368 33 457 -4 q 213 138 279 71 q 109 294 146 206 q 72 486 72 383 q 110 678 72 589 q 214 834 147 767 q 370 939 281 901 q 564 976 460 976 q 758 940 668 976 q 913 836 847 903 q 1016 681 979 769 q 1053 489 1053 593 q 1015 295 1053 385 q 910 138 978 206 q 754 33 843 71 q 561 -4 665 -4 m 740 206 l 600 422 l 675 422 l 815 206 l 740 206 m 560 47 q 733 81 654 47 q 873 175 813 115 q 967 316 933 235 q 1000 489 1000 397 q 967 661 1000 582 q 876 800 935 740 q 737 892 817 860 q 564 925 657 925 q 389 892 469 925 q 249 798 308 858 q 157 658 190 738 q 124 486 124 579 q 157 315 124 394 q 249 174 190 235 q 388 81 308 114 q 560 47 468 47 m 371 206 l 371 767 l 588 767 q 751 716 692 767 q 810 581 810 665 q 751 442 810 492 q 588 392 692 392 l 443 392 l 443 206 l 371 206 m 442 453 l 583 453 q 698 486 657 453 q 739 581 739 519 q 698 673 739 640 q 583 706 657 706 l 442 706 l 442 453 z "
  },
  "™": {
    ha: 1418,
    x_min: 6,
    x_max: 1260,
    o: "m 603 396 l 603 972 l 665 972 l 949 531 l 917 531 l 1197 972 l 1258 972 l 1260 396 l 1188 396 l 1186 864 l 1201 864 l 949 467 l 914 467 l 656 864 l 676 864 l 676 396 l 603 396 m 222 396 l 222 908 l 6 908 l 6 972 l 514 972 l 514 908 l 297 908 l 297 396 l 222 396 z "
  },
  "°": {
    ha: 582,
    x_min: 69,
    x_max: 513,
    o: "m 290 539 q 178 569 229 539 q 99 648 128 599 q 69 760 69 697 q 99 871 69 821 q 178 950 128 921 q 290 979 229 979 q 403 950 353 979 q 483 871 454 921 q 513 760 513 821 q 483 649 513 699 q 403 569 454 599 q 290 539 353 539 m 292 597 q 373 619 336 597 q 431 678 410 642 q 451 760 451 714 q 431 842 451 806 q 373 900 410 879 q 292 921 336 921 q 209 900 246 921 q 151 842 172 879 q 131 760 131 806 q 151 677 131 714 q 209 619 172 640 q 292 597 246 597 z "
  },
  "′": {
    ha: 281,
    x_min: 96,
    x_max: 183,
    o: "m 103 606 l 96 972 l 183 972 l 176 606 l 103 606 z "
  },
  "″": {
    ha: 518,
    x_min: 96,
    x_max: 421,
    o: "m 103 606 l 96 972 l 183 972 l 176 606 l 103 606 m 340 606 l 333 972 l 421 972 l 414 606 l 340 606 z "
  },
  "|": {
    ha: 408,
    x_min: 158,
    x_max: 250,
    o: "m 158 -269 l 158 1031 l 250 1031 l 250 -269 l 158 -269 z "
  },
  "¦": {
    ha: 408,
    x_min: 158,
    x_max: 250,
    o: "m 158 544 l 158 1031 l 250 1031 l 250 544 l 158 544 m 158 -269 l 158 217 l 250 217 l 250 -269 l 158 -269 z "
  },
  ℓ: {
    ha: 647,
    x_min: 54,
    x_max: 592,
    o: "m 318 -3 q 211 29 249 -3 q 163 118 174 61 q 157 251 151 175 l 75 192 l 54 239 l 167 324 l 236 732 q 320 916 261 857 q 451 975 379 975 q 551 936 510 975 q 592 819 592 897 q 567 694 592 758 q 494 563 542 629 q 381 432 447 497 q 233 303 314 367 q 234 129 214 189 q 335 69 254 69 q 452 105 399 69 q 556 197 506 140 l 592 158 q 463 38 531 78 q 318 -3 394 -3 m 247 388 q 402 537 339 461 q 499 685 465 613 q 532 817 532 758 q 508 892 532 869 q 450 915 483 915 q 366 873 406 915 q 308 736 326 831 l 247 388 z "
  },
  "†": {
    ha: 760,
    x_min: 42,
    x_max: 718,
    o: "m 331 -269 l 331 538 l 42 538 l 42 625 l 331 625 l 331 972 l 429 972 l 429 625 l 718 625 l 718 538 l 429 538 l 429 -269 l 331 -269 z "
  },
  "‡": {
    ha: 760,
    x_min: 42,
    x_max: 718,
    o: "m 718 538 l 429 538 l 429 165 l 718 165 l 718 78 l 429 78 l 429 -269 l 331 -269 l 331 78 l 42 78 l 42 165 l 331 165 l 331 538 l 42 538 l 42 625 l 331 625 l 331 972 l 429 972 l 429 625 l 718 625 l 718 538 z "
  },
  "℮": {
    ha: 1232,
    x_min: 72,
    x_max: 1161,
    o: "m 617 -4 q 406 34 504 -4 q 232 140 307 72 q 115 295 157 207 q 72 485 72 383 q 115 676 72 588 q 232 833 157 765 q 406 938 307 900 q 617 976 504 976 q 828 938 729 976 q 1002 833 928 900 q 1119 676 1076 765 q 1161 485 1161 588 l 1161 474 l 279 474 q 271 468 271 474 l 271 201 q 275 184 271 192 q 283 169 279 176 q 431 61 340 97 q 618 25 521 25 q 815 69 724 25 q 968 186 906 114 l 1047 186 q 861 49 975 101 q 617 -4 747 -4 m 279 500 l 956 500 q 964 508 964 500 l 964 776 q 949 808 964 796 q 800 910 885 872 q 618 947 715 947 q 435 908 521 947 q 285 804 350 869 q 275 790 279 799 q 271 771 271 782 l 271 508 q 279 500 271 500 z "
  },
  "№": {
    ha: 1667,
    x_min: 158,
    x_max: 1589,
    o: "m 158 0 l 158 972 l 243 972 l 914 128 l 869 128 l 869 972 l 971 972 l 971 0 l 886 0 l 217 844 l 261 844 l 261 0 l 158 0 m 1136 347 l 1136 415 l 1561 415 l 1561 347 l 1136 347 m 1349 536 q 1225 565 1279 536 q 1140 643 1171 593 q 1108 758 1108 693 q 1140 872 1108 822 q 1225 951 1171 922 q 1349 979 1279 979 q 1472 951 1418 979 q 1558 872 1526 922 q 1589 758 1589 822 q 1558 643 1589 693 q 1472 565 1526 593 q 1349 536 1418 536 m 1349 599 q 1470 643 1424 599 q 1517 758 1517 688 q 1470 874 1517 831 q 1349 918 1424 918 q 1228 874 1276 918 q 1181 758 1181 829 q 1228 643 1181 688 q 1349 599 1276 599 z "
  },
  ʼ: {
    ha: 308,
    x_min: 82,
    x_max: 228,
    o: "m 85 692 l 146 947 l 157 889 q 103 909 125 889 q 82 963 82 929 q 103 1017 82 996 q 156 1038 125 1038 q 208 1016 188 1038 q 228 963 228 994 q 226 940 228 951 q 222 916 225 929 q 211 883 218 903 l 151 692 l 85 692 z "
  },
  ʻ: {
    ha: 369,
    x_min: 106,
    x_max: 251,
    o: "m 249 1167 l 188 910 l 176 969 q 231 949 210 969 q 251 896 251 929 q 231 842 251 863 q 179 821 210 821 q 126 842 146 821 q 106 896 106 864 q 107 918 106 908 q 113 942 108 928 q 124 975 117 956 l 182 1167 l 249 1167 z "
  },
  "ʺ": {
    ha: 518,
    x_min: 96,
    x_max: 421,
    o: "m 103 606 l 96 972 l 183 972 l 176 606 l 103 606 m 340 606 l 333 972 l 421 972 l 414 606 l 340 606 z "
  },
  "ˉ": {
    ha: 833,
    x_min: 203,
    x_max: 631,
    o: "m 203 896 l 203 961 l 631 961 l 631 896 l 203 896 z "
  },
  "ˋ": {
    ha: 833,
    x_min: 185,
    x_max: 507,
    o: "m 410 843 l 185 1015 l 317 1015 l 507 843 l 410 843 z "
  },
  "ʹ": {
    ha: 281,
    x_min: 96,
    x_max: 183,
    o: "m 103 606 l 96 972 l 183 972 l 176 606 l 103 606 z "
  },
  ʿ: {
    ha: 833,
    x_min: 268,
    x_max: 415,
    o: "m 415 826 q 340 846 374 826 q 288 897 307 865 q 268 968 268 929 q 288 1040 268 1007 q 340 1094 307 1074 q 415 1114 374 1114 l 415 1064 q 349 1036 375 1064 q 322 968 322 1008 q 348 903 322 929 q 415 876 374 876 l 415 826 z "
  },
  ʾ: {
    ha: 833,
    x_min: 415,
    x_max: 563,
    o: "m 415 826 l 415 876 q 483 903 457 876 q 510 968 510 929 q 483 1036 510 1008 q 415 1064 457 1064 l 415 1114 q 491 1093 458 1114 q 543 1040 524 1072 q 563 968 563 1008 q 544 897 563 929 q 492 846 525 865 q 415 826 458 826 z "
  },
  "ˊ": {
    ha: 833,
    x_min: 326,
    x_max: 649,
    o: "m 326 843 l 517 1015 l 649 1015 l 424 843 l 326 843 z "
  },
  "ˌ": {
    ha: 231,
    x_min: 79,
    x_max: 151,
    o: "m 79 -301 l 79 -42 l 151 -42 l 151 -301 l 79 -301 z "
  },
  "ˈ": {
    ha: 231,
    x_min: 79,
    x_max: 151,
    o: "m 79 713 l 79 972 l 151 972 l 151 713 l 79 713 z "
  },
  "̈": {
    ha: 0,
    x_min: 233,
    x_max: 600,
    o: "m 540 875 q 499 892 517 875 q 481 935 481 908 q 499 978 481 961 q 540 994 517 994 q 583 978 565 994 q 600 935 600 961 q 583 892 600 908 q 540 875 565 875 m 293 875 q 251 892 268 875 q 233 935 233 908 q 251 978 233 961 q 293 994 268 994 q 335 978 317 994 q 353 935 353 961 q 335 892 353 908 q 293 875 317 875 z "
  },
  "̇": {
    ha: 0,
    x_min: 350,
    x_max: 483,
    o: "m 417 875 q 369 894 389 875 q 350 942 350 914 q 369 990 350 971 q 417 1008 389 1008 q 464 990 444 1008 q 483 942 483 971 q 464 894 483 914 q 417 875 444 875 z "
  },
  "̀": {
    ha: 0,
    x_min: 185,
    x_max: 507,
    o: "m 410 843 l 185 1015 l 317 1015 l 507 843 l 410 843 z "
  },
  "́": {
    ha: 0,
    x_min: 326,
    x_max: 649,
    o: "m 326 843 l 517 1015 l 649 1015 l 424 843 l 326 843 z "
  },
  "̋": {
    ha: 0,
    x_min: 260,
    x_max: 729,
    o: "m 486 843 l 619 1015 l 729 1015 l 574 843 l 486 843 m 260 843 l 394 1015 l 504 1015 l 347 843 l 260 843 z "
  },
  "̂": {
    ha: 0,
    x_min: 188,
    x_max: 646,
    o: "m 188 843 l 367 1015 l 467 1015 l 646 843 l 554 843 l 378 990 l 456 990 l 279 843 l 188 843 z "
  },
  "̌": {
    ha: 0,
    x_min: 188,
    x_max: 646,
    o: "m 367 843 l 188 1015 l 279 1015 l 456 869 l 378 869 l 554 1015 l 646 1015 l 467 843 l 367 843 z "
  },
  "̆": {
    ha: 0,
    x_min: 206,
    x_max: 628,
    o: "m 417 836 q 269 884 329 836 q 206 1015 208 932 l 275 1015 q 319 929 278 961 q 417 897 360 897 q 516 929 475 897 q 558 1015 557 961 l 628 1015 q 565 884 625 932 q 417 836 504 836 z "
  },
  "̊": {
    ha: 0,
    x_min: 271,
    x_max: 561,
    o: "m 415 826 q 341 846 374 826 q 290 897 308 865 q 271 968 271 929 q 290 1040 271 1007 q 342 1094 310 1074 q 415 1114 375 1114 q 490 1094 457 1114 q 542 1040 522 1074 q 561 968 561 1007 q 542 897 561 929 q 490 846 522 865 q 415 826 457 826 m 415 875 q 483 902 457 875 q 510 968 510 929 q 483 1037 510 1008 q 415 1065 457 1065 q 349 1038 375 1065 q 322 968 322 1010 q 348 901 322 928 q 415 875 374 875 z "
  },
  "̃": {
    ha: 0,
    x_min: 197,
    x_max: 636,
    o: "m 511 851 q 454 865 479 851 q 409 898 429 879 q 369 931 389 917 q 329 946 350 946 q 278 922 297 946 q 257 857 260 899 l 197 857 q 234 968 200 926 q 322 1010 268 1010 q 380 995 354 1010 q 426 962 406 981 q 465 929 446 943 q 504 915 483 915 q 556 938 536 915 q 576 1001 575 961 l 636 1001 q 600 893 635 935 q 511 851 565 851 z "
  },
  "̄": {
    ha: 0,
    x_min: 203,
    x_max: 631,
    o: "m 203 896 l 203 961 l 631 961 l 631 896 l 203 896 z "
  },
  "̉": {
    ha: 0,
    x_min: 299,
    x_max: 546,
    o: "m 435 833 l 400 876 q 462 919 442 896 q 482 975 482 943 q 461 1024 482 1004 q 406 1043 440 1043 q 322 1017 363 1043 l 299 1065 q 353 1092 322 1083 q 414 1101 385 1101 q 509 1069 472 1101 q 546 982 546 1036 q 519 897 546 933 q 435 833 492 860 z "
  },
  "̏": {
    ha: 0,
    x_min: 104,
    x_max: 574,
    o: "m 486 843 l 329 1015 l 439 1015 l 574 843 l 486 843 m 260 843 l 104 1015 l 214 1015 l 347 843 l 260 843 z "
  },
  "̑": {
    ha: 0,
    x_min: 206,
    x_max: 628,
    o: "m 206 843 q 269 974 208 926 q 417 1021 329 1021 q 565 974 504 1021 q 628 843 625 926 l 558 843 q 516 929 557 897 q 417 961 475 961 q 319 929 360 961 q 275 843 278 897 l 206 843 z "
  },
  "̒": {
    ha: 0,
    x_min: 353,
    x_max: 481,
    o: "m 417 836 q 369 853 386 836 q 353 890 353 869 q 357 918 353 904 q 368 950 361 932 l 417 1085 l 476 1085 l 428 906 l 417 944 q 463 930 446 944 q 481 890 481 915 q 464 852 481 868 q 417 836 447 836 z "
  },
  "̛": {
    ha: 0,
    x_min: 396,
    x_max: 582,
    o: "m 396 654 l 396 729 l 417 729 q 487 757 465 729 q 508 824 508 785 q 501 872 508 850 q 481 913 493 894 l 546 938 q 572 884 563 914 q 582 821 582 854 q 540 701 582 747 q 417 654 499 654 l 396 654 z "
  },
  "̣": {
    ha: 0,
    x_min: 357,
    x_max: 476,
    o: "m 417 -264 q 375 -247 393 -264 q 357 -204 357 -231 q 375 -161 357 -178 q 417 -144 393 -144 q 459 -161 442 -144 q 476 -204 476 -178 q 459 -247 476 -231 q 417 -264 442 -264 z "
  },
  "̤": {
    ha: 0,
    x_min: 244,
    x_max: 590,
    o: "m 532 -260 q 491 -243 508 -260 q 474 -201 474 -226 q 491 -161 474 -178 q 532 -144 508 -144 q 573 -161 556 -144 q 590 -201 590 -178 q 573 -243 590 -226 q 532 -260 556 -260 m 301 -260 q 261 -243 278 -260 q 244 -201 244 -226 q 261 -161 244 -178 q 301 -144 278 -144 q 343 -161 326 -144 q 360 -201 360 -178 q 343 -243 360 -226 q 301 -260 326 -260 z "
  },
  "̦": {
    ha: 0,
    x_min: 357,
    x_max: 476,
    o: "m 368 -364 l 407 -214 l 417 -253 q 374 -237 390 -253 q 357 -199 357 -222 q 374 -160 357 -175 q 417 -144 390 -144 q 460 -160 444 -144 q 476 -199 476 -176 q 473 -228 476 -212 q 461 -261 469 -243 l 422 -364 l 368 -364 z "
  },
  "̧": {
    ha: 0,
    x_min: 269,
    x_max: 543,
    o: "m 386 -306 q 323 -297 351 -306 q 269 -274 294 -289 l 293 -221 q 337 -240 314 -233 q 385 -247 360 -247 q 449 -230 426 -247 q 471 -182 471 -212 q 449 -136 471 -154 q 385 -118 428 -118 l 353 -118 l 386 8 l 446 8 l 425 -72 q 513 -108 482 -76 q 543 -185 543 -139 q 499 -273 543 -240 q 386 -306 456 -306 z "
  },
  "̨": {
    ha: 0,
    x_min: 176,
    x_max: 447,
    o: "m 329 -306 q 218 -269 260 -306 q 176 -174 176 -233 q 194 -103 176 -140 q 254 -31 211 -67 q 372 38 297 6 l 418 0 q 315 -58 351 -29 q 263 -113 278 -86 q 249 -167 249 -140 q 274 -225 249 -206 q 339 -244 300 -244 q 385 -237 363 -244 q 425 -218 408 -231 l 447 -272 q 392 -297 422 -287 q 329 -306 363 -306 z "
  },
  "̮": {
    ha: 0,
    x_min: 206,
    x_max: 628,
    o: "m 417 -285 q 269 -239 329 -285 q 206 -117 208 -193 l 272 -117 q 315 -198 274 -168 q 417 -228 357 -228 q 519 -198 478 -228 q 561 -117 561 -168 l 628 -117 q 565 -239 625 -193 q 417 -285 504 -285 z "
  },
  "̱": {
    ha: 0,
    x_min: 203,
    x_max: 631,
    o: "m 203 -235 l 203 -169 l 631 -169 l 631 -235 l 203 -235 z "
  },
  "̵": {
    ha: 0,
    x_min: 146,
    x_max: 688,
    o: "m 146 574 l 146 646 l 688 646 l 688 574 l 146 574 z "
  },
  "̶": {
    ha: 0,
    x_min: 36,
    x_max: 1143,
    o: "m 36 568 l 36 651 l 1143 651 l 1143 568 l 36 568 z "
  },
  "̷": {
    ha: 0,
    x_min: 72,
    x_max: 453,
    o: "m 118 376 l 72 436 l 408 689 l 453 628 l 118 376 z "
  },
  "̸": {
    ha: 0,
    x_min: 88,
    x_max: 768,
    o: "m 88 -97 l 703 826 l 768 826 l 154 -97 l 88 -97 z "
  },
  "´": {
    ha: 833,
    x_min: 326,
    x_max: 649,
    o: "m 326 843 l 517 1015 l 649 1015 l 424 843 l 326 843 z "
  },
  "˘": {
    ha: 833,
    x_min: 206,
    x_max: 628,
    o: "m 417 836 q 269 884 329 836 q 206 1015 208 932 l 275 1015 q 319 929 278 961 q 417 897 360 897 q 516 929 475 897 q 558 1015 557 961 l 628 1015 q 565 884 625 932 q 417 836 504 836 z "
  },
  "ˇ": {
    ha: 833,
    x_min: 188,
    x_max: 646,
    o: "m 367 843 l 188 1015 l 279 1015 l 456 869 l 378 869 l 554 1015 l 646 1015 l 467 843 l 367 843 z "
  },
  "¸": {
    ha: 833,
    x_min: 269,
    x_max: 543,
    o: "m 386 -306 q 323 -297 351 -306 q 269 -274 294 -289 l 293 -221 q 337 -240 314 -233 q 385 -247 360 -247 q 449 -230 426 -247 q 471 -182 471 -212 q 449 -136 471 -154 q 385 -118 428 -118 l 353 -118 l 386 8 l 446 8 l 425 -72 q 513 -108 482 -76 q 543 -185 543 -139 q 499 -273 543 -240 q 386 -306 456 -306 z "
  },
  "ˆ": {
    ha: 833,
    x_min: 188,
    x_max: 646,
    o: "m 188 843 l 367 1015 l 467 1015 l 646 843 l 554 843 l 378 990 l 456 990 l 279 843 l 188 843 z "
  },
  "¨": {
    ha: 833,
    x_min: 233,
    x_max: 600,
    o: "m 540 875 q 499 892 517 875 q 481 935 481 908 q 499 978 481 961 q 540 994 517 994 q 583 978 565 994 q 600 935 600 961 q 583 892 600 908 q 540 875 565 875 m 293 875 q 251 892 268 875 q 233 935 233 908 q 251 978 233 961 q 293 994 268 994 q 335 978 317 994 q 353 935 353 961 q 335 892 353 908 q 293 875 317 875 z "
  },
  "˙": {
    ha: 833,
    x_min: 350,
    x_max: 483,
    o: "m 417 875 q 369 894 389 875 q 350 942 350 914 q 369 990 350 971 q 417 1008 389 1008 q 464 990 444 1008 q 483 942 483 971 q 464 894 483 914 q 417 875 444 875 z "
  },
  "`": {
    ha: 833,
    x_min: 185,
    x_max: 507,
    o: "m 410 843 l 185 1015 l 317 1015 l 507 843 l 410 843 z "
  },
  "˝": {
    ha: 833,
    x_min: 260,
    x_max: 729,
    o: "m 486 843 l 619 1015 l 729 1015 l 574 843 l 486 843 m 260 843 l 394 1015 l 504 1015 l 347 843 l 260 843 z "
  },
  "¯": {
    ha: 833,
    x_min: 203,
    x_max: 631,
    o: "m 203 896 l 203 961 l 631 961 l 631 896 l 203 896 z "
  },
  "˛": {
    ha: 833,
    x_min: 176,
    x_max: 447,
    o: "m 329 -306 q 218 -269 260 -306 q 176 -174 176 -233 q 194 -103 176 -140 q 254 -31 211 -67 q 372 38 297 6 l 418 0 q 315 -58 351 -29 q 263 -113 278 -86 q 249 -167 249 -140 q 274 -225 249 -206 q 339 -244 300 -244 q 385 -237 363 -244 q 425 -218 408 -231 l 447 -272 q 392 -297 422 -287 q 329 -306 363 -306 z "
  },
  "˚": {
    ha: 833,
    x_min: 271,
    x_max: 561,
    o: "m 415 826 q 341 846 374 826 q 290 897 308 865 q 271 968 271 929 q 290 1040 271 1007 q 342 1094 310 1074 q 415 1114 375 1114 q 490 1094 457 1114 q 542 1040 522 1074 q 561 968 561 1007 q 542 897 561 929 q 490 846 522 865 q 415 826 457 826 m 415 875 q 483 902 457 875 q 510 968 510 929 q 483 1037 510 1008 q 415 1065 457 1065 q 349 1038 375 1065 q 322 968 322 1010 q 348 901 322 928 q 415 875 374 875 z "
  },
  "˜": {
    ha: 833,
    x_min: 197,
    x_max: 636,
    o: "m 511 851 q 454 865 479 851 q 409 898 429 879 q 369 931 389 917 q 329 946 350 946 q 278 922 297 946 q 257 857 260 899 l 197 857 q 234 968 200 926 q 322 1010 268 1010 q 380 995 354 1010 q 426 962 406 981 q 465 929 446 943 q 504 915 483 915 q 556 938 536 915 q 576 1001 575 961 l 636 1001 q 600 893 635 935 q 511 851 565 851 z "
  },
  "\0": {
    ha: 0,
    x_min: 0,
    x_max: 0,
    o: ""
  },
  Ҧ: {
    ha: 1672,
    x_min: 164,
    x_max: 1613,
    o: "m 1157 -183 l 1175 -99 q 1305 -100 1244 -114 q 1412 -46 1365 -86 q 1485 55 1458 -6 q 1511 190 1511 115 q 1480 330 1511 271 q 1394 424 1449 389 q 1271 466 1340 458 q 1124 452 1201 474 q 968 375 1046 431 l 965 468 q 1153 542 1060 524 q 1330 547 1247 561 q 1476 486 1413 532 q 1576 367 1540 440 q 1613 197 1613 294 q 1576 19 1613 99 q 1477 -114 1540 -61 q 1332 -185 1414 -167 q 1157 -183 1250 -204 m 164 0 l 164 972 l 982 972 l 982 0 l 881 0 l 881 911 l 907 883 l 239 883 l 265 911 l 265 0 l 164 0 z "
  },
  ҧ: {
    ha: 1346,
    x_min: 140,
    x_max: 1314,
    o: "m 140 0 l 140 729 l 774 729 l 774 0 l 675 0 l 675 669 l 700 643 l 214 643 l 239 669 l 239 0 l 140 0 m 869 -267 l 890 -181 q 1060 -172 989 -197 q 1172 -85 1132 -147 q 1213 64 1213 -24 q 1183 197 1213 144 q 1103 276 1153 249 q 992 306 1053 303 q 868 289 931 308 q 750 229 806 269 l 747 319 q 908 381 828 365 q 1061 385 989 397 q 1190 332 1133 372 q 1281 226 1247 292 q 1314 68 1314 160 q 1281 -91 1314 -21 q 1189 -207 1249 -161 q 1048 -269 1129 -253 q 869 -267 967 -285 z "
  }
}, me = "Montserrat", de = 1344, fe = -349, xe = -139, he = 69, pe = {
  yMin: -364,
  xMin: -256,
  yMax: 1449,
  xMax: 2201
}, ge = 1e3, be = {
  format: 0,
  copyright: "Copyright 2011 The Montserrat Project Authors (https://github.com/JulietaUla/Montserrat)",
  fontFamily: "Montserrat",
  fontSubfamily: "Regular",
  uniqueID: "8.000;ULA;Montserrat-Regular",
  fullName: "Montserrat Regular",
  version: "Version 8.000",
  postScriptName: "Montserrat-Regular",
  manufacturer: "Julieta Ulanovsky",
  designer: "Julieta Ulanovsky",
  manufacturerURL: "http://www.zkysky.com.ar/",
  designerURL: "http://www.zkysky.com.ar/",
  licence: "This Font Software is licensed under the SIL Open Font License, Version 1.1. This license is available with a FAQ at: http://scripts.sil.org/OFL",
  licenceURL: "http://scripts.sil.org/OFL",
  unknown1: "MontserratRoman",
  unknown2: "Weight",
  unknown3: "Thin",
  unknown4: "ExtraLight",
  unknown5: "Light",
  unknown6: "Regular",
  unknown7: "Medium",
  unknown8: "SemiBold",
  unknown9: "Bold",
  unknown10: "ExtraBold",
  unknown11: "Black",
  unknown12: "MontserratRoman-Thin",
  unknown13: "MontserratRoman-ExtraLight",
  unknown14: "MontserratRoman-Light",
  unknown15: "MontserratRoman-Regular",
  unknown16: "MontserratRoman-Medium",
  unknown17: "MontserratRoman-SemiBold",
  unknown18: "MontserratRoman-Bold",
  unknown19: "MontserratRoman-ExtraBold",
  unknown20: "MontserratRoman-Black",
  unknown21: "Italic",
  unknown22: "Roman"
}, _e = "normal", ve = "normal", N9 = {
  glyphs: ue,
  familyName: me,
  ascender: de,
  descender: fe,
  underlinePosition: xe,
  underlineThickness: he,
  boundingBox: pe,
  resolution: ge,
  original_font_information: be,
  cssFontWeight: _e,
  cssFontStyle: ve
}, k1 = (e) => {
  const l = e.replace("#", "");
  return new g6(l.length === 6 ? parseInt("0x" + l, 16) : l);
}, M9 = (e) => {
  let l;
  const t = document.getElementById(`map-special-svg-${e}`);
  if (t) {
    const o = t.querySelector("svg");
    if (o) {
      const n = o.cloneNode(!0);
      n.querySelectorAll("[fill]").forEach((q) => {
        q.setAttribute("fill", "#FFFFFF");
      }), l = new XMLSerializer().serializeToString(n);
    }
  }
  return l;
}, ye = (e) => (e = e.slice(-10), e.length === 10 ? `${e.slice(0, 3)}.${e.slice(3, 6)}.${e.slice(-4)}` : e), L9 = (e, l) => l.IMAGE_PROXY_URL ? l.IMAGE_PROXY_URL + encodeURIComponent(e) : e, l8 = { x: 0, y: 0, z: 0 }, f4 = {
  camera: l8,
  controls: l8
}, V1 = {
  MAP_STYLE: "2D",
  MAP_BACKGROUND_COLOR: "#FFFFFF",
  ACCENT_COLOR: "#4EA5FF",
  STORE_DEFAULT_COLOR: "#E2E2E2",
  STORE_TEXT_COLOR: "#444444",
  STORE_HEIGHT: 12,
  WALL_COLOR: "#888888",
  BOUNDARY_COLOR: "#888888",
  BASE_COLOR: "#25292B",
  OVERLAY_COLOR: "#FFFFFF",
  WALL_THICKNESS: 0.6,
  BOUNDARY_THICKNESS: 0.8,
  OVERLAY_OPACITY: 0.7,
  KIOSK_SIZE: 15,
  ZOOM_STEP: 100,
  SELECTED_ZOOM_LIMIT: 1200,
  CAMERA_MAX_DISTANCE: 2e3,
  CAMERA_MIN_DISTANCE: 300
}, S4 = {
  MAP_BACKGROUND_COLOR: k1(V1.MAP_BACKGROUND_COLOR),
  ROLE: "WP_SITE",
  DEVICE: "desktop",
  KIOSK_ID: 0,
  CENTER_ID: 0,
  SELECTED_RETAILER_ID: 0,
  STATS: !1,
  STYLE: V1.MAP_STYLE,
  DEBUG: !1,
  ACCENT_COLOR: k1(V1.ACCENT_COLOR),
  STORE_DEFAULT_COLOR: k1(V1.STORE_DEFAULT_COLOR),
  STORE_HEIGHT: V1.STORE_HEIGHT,
  WALL_THICKNESS: V1.WALL_THICKNESS,
  BOUNDARY_THICKNESS: V1.BOUNDARY_THICKNESS,
  WALL_COLOR: k1(V1.WALL_COLOR),
  BOUNDARY_COLOR: k1(V1.BOUNDARY_COLOR),
  BASE_COLOR: k1(V1.BASE_COLOR),
  STORE_TEXT_COLOR: k1(V1.STORE_TEXT_COLOR),
  OVERLAY_COLOR: k1(V1.OVERLAY_COLOR),
  OVERLAY_OPACITY: V1.OVERLAY_OPACITY,
  CAMERA_CONTROLS_STATES: {
    display_app: f4,
    desktop: f4,
    tablet: f4,
    mobile: f4,
    perFloor: null
  },
  ORIGINAL_CAMERA_POSITION: null,
  // loaded and fit to canvas loaded area without any custom positions
  DEFAULT_CAMERA_POSITION: null,
  // custom default camera position
  DEFAULT_CONTROLS_TARGET: null,
  // custom default controls target
  DEFAULT_SELECTED_STORE: null,
  CAMERA: {
    fov: 75,
    far: 1e4,
    minDistance: 0.1,
    maxDistance: 5e3,
    animSpeed: 0.2
  },
  KIOSK_SIZE: V1.KIOSK_SIZE,
  ZOOM_STEP: V1.ZOOM_STEP,
  SELECTED_ZOOM_LIMIT: V1.SELECTED_ZOOM_LIMIT
}, T2 = {
  id: 0,
  retailer_id: null,
  kiosk_id: null,
  map_obj_name: "",
  obj_type: "retailer",
  layer_type: "retail_name",
  value: "",
  custom_text: "",
  custom_image: "",
  bg_color: "",
  transparent: !1,
  text_color: "",
  size: 8,
  rotate: 0,
  offset_x: 0,
  offset_y: 0,
  lock_size: !1
}, D2 = "custom-layer-", t8 = 20;
function Ie(e) {
  Ee(e);
  const l = Ce(e);
  return e.on = l.on, e.off = l.off, e.fire = l.fire, e;
}
function Ce(e) {
  let l = /* @__PURE__ */ Object.create(null);
  return {
    on: function(t, o, n) {
      if (typeof o != "function")
        throw new Error("callback is expected to be a function");
      let r = l[t];
      return r || (r = l[t] = []), r.push({ callback: o, ctx: n }), e;
    },
    off: function(t, o) {
      if (typeof t > "u")
        return l = /* @__PURE__ */ Object.create(null), e;
      if (l[t])
        if (typeof o != "function")
          delete l[t];
        else {
          const q = l[t];
          for (let c = 0; c < q.length; ++c)
            q[c].callback === o && q.splice(c, 1);
        }
      return e;
    },
    fire: function(t) {
      const o = l[t];
      if (!o)
        return e;
      let n;
      arguments.length > 1 && (n = Array.prototype.slice.call(arguments, 1));
      for (let r = 0; r < o.length; ++r) {
        const q = o[r];
        q.callback.apply(q.ctx, n);
      }
      return e;
    }
  };
}
function Ee(e) {
  if (!e)
    throw new Error("Eventify cannot use falsy object as events subject");
  const l = ["on", "fire", "off"];
  for (let t = 0; t < l.length; ++t)
    if (e.hasOwnProperty(l[t]))
      throw new Error("Subject cannot be eventified, since it already has property '" + l[t] + "'");
}
function Ae(e) {
  if (e = e || {}, "uniqueLinkId" in e && (console.warn(
    "ngraph.graph: Starting from version 0.14 `uniqueLinkId` is deprecated.\nUse `multigraph` option instead\n",
    `
`,
    `Note: there is also change in default behavior: From now on each graph
is considered to be not a multigraph by default (each edge is unique).`
  ), e.multigraph = e.uniqueLinkId), e.multigraph === void 0 && (e.multigraph = !1), typeof Map != "function")
    throw new Error("ngraph.graph requires `Map` to be defined. Please polyfill it before using ngraph");
  var l = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), o = {}, n = 0, r = e.multigraph ? u : g, q = [], c = J, i = J, a = J, s = J, m = {
    /**
     * Sometimes duck typing could be slow. Giving clients a hint about data structure
     * via explicit version number here:
     */
    version: 20,
    /**
     * Adds node to the graph. If node with given id already exists in the graph
     * its data is extended with whatever comes in 'data' argument.
     *
     * @param nodeId the node's identifier. A string or number is preferred.
     * @param [data] additional data for the node being added. If node already
     *   exists its data object is augmented with the new one.
     *
     * @return {node} The newly added node or node with given id if it already exists.
     */
    addNode: p,
    /**
     * Adds a link to the graph. The function always create a new
     * link between two nodes. If one of the nodes does not exists
     * a new node is created.
     *
     * @param fromId link start node id;
     * @param toId link end node id;
     * @param [data] additional data to be set on the new link;
     *
     * @return {link} The newly created link
     */
    addLink: S,
    /**
     * Removes link from the graph. If link does not exist does nothing.
     *
     * @param link - object returned by addLink() or getLinks() methods.
     *
     * @returns true if link was removed; false otherwise.
     */
    removeLink: w,
    /**
     * Removes node with given id from the graph. If node does not exist in the graph
     * does nothing.
     *
     * @param nodeId node's identifier passed to addNode() function.
     *
     * @returns true if node was removed; false otherwise.
     */
    removeNode: _,
    /**
     * Gets node with given identifier. If node does not exist undefined value is returned.
     *
     * @param nodeId requested node identifier;
     *
     * @return {node} in with requested identifier or undefined if no such node exists.
     */
    getNode: d,
    /**
     * Gets number of nodes in this graph.
     *
     * @return number of nodes in the graph.
     */
    getNodeCount: f,
    /**
     * Gets total number of links in the graph.
     */
    getLinkCount: E,
    /**
     * Synonym for `getLinkCount()`
     */
    getEdgeCount: E,
    /**
     * Synonym for `getLinkCount()`
     */
    getLinksCount: E,
    /**
     * Synonym for `getNodeCount()`
     */
    getNodesCount: f,
    /**
     * Gets all links (inbound and outbound) from the node with given id.
     * If node with given id is not found null is returned.
     *
     * @param nodeId requested node identifier.
     *
     * @return Set of links from and to requested node if such node exists;
     *   otherwise null is returned.
     */
    getLinks: C,
    /**
     * Invokes callback on each node of the graph.
     *
     * @param {Function(node)} callback Function to be invoked. The function
     *   is passed one argument: visited node.
     */
    forEachNode: B,
    /**
     * Invokes callback on every linked (adjacent) node to the given one.
     *
     * @param nodeId Identifier of the requested node.
     * @param {Function(node, link)} callback Function to be called on all linked nodes.
     *   The function is passed two parameters: adjacent node and link object itself.
     * @param oriented if true graph treated as oriented.
     */
    forEachLinkedNode: $,
    /**
     * Enumerates all links in the graph
     *
     * @param {Function(link)} callback Function to be called on all links in the graph.
     *   The function is passed one parameter: graph's link object.
     *
     * Link object contains at least the following fields:
     *  fromId - node id where link starts;
     *  toId - node id where link ends,
     *  data - additional data passed to graph.addLink() method.
     */
    forEachLink: l1,
    /**
     * Suspend all notifications about graph changes until
     * endUpdate is called.
     */
    beginUpdate: a,
    /**
     * Resumes all notifications about graph changes and fires
     * graph 'changed' event in case there are any pending changes.
     */
    endUpdate: s,
    /**
     * Removes all nodes and links from the graph.
     */
    clear: j,
    /**
     * Detects whether there is a link between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     * NOTE: this function is synonym for getLink()
     *
     * @returns link if there is one. null otherwise.
     */
    hasLink: D,
    /**
     * Detects whether there is a node with given id
     * 
     * Operation complexity is O(1)
     * NOTE: this function is synonym for getNode()
     *
     * @returns node if there is one; Falsy value otherwise.
     */
    hasNode: d,
    /**
     * Gets an edge between two nodes.
     * Operation complexity is O(n) where n - number of links of a node.
     *
     * @param {string} fromId link start identifier
     * @param {string} toId link end identifier
     *
     * @returns link if there is one; undefined otherwise.
     */
    getLink: D,
    /**
     * Gets a link by its id.
     *
     * @param {string} linkId link identifier
     *
     * @returns link if there is one; undefined otherwise.
     */
    getLinkById: e1
  };
  return Ie(m), v(), m;
  function v() {
    var M = m.on;
    m.on = W;
    function W() {
      return m.beginUpdate = a = P, m.endUpdate = s = q1, c = A, i = x, m.on = M, M.apply(m, arguments);
    }
  }
  function A(M, W) {
    q.push({
      link: M,
      changeType: W
    });
  }
  function x(M, W) {
    q.push({
      node: M,
      changeType: W
    });
  }
  function p(M, W) {
    if (M === void 0)
      throw new Error("Invalid node identifier");
    a();
    var H = d(M);
    return H ? (H.data = W, i(H, "update")) : (H = new Se(M, W), i(H, "add")), l.set(M, H), s(), H;
  }
  function d(M) {
    return l.get(M);
  }
  function _(M) {
    var W = d(M);
    if (!W)
      return !1;
    a();
    var H = W.links;
    return H && (H.forEach(F), W.links = null), l.delete(M), i(W, "remove"), s(), !0;
  }
  function S(M, W, H) {
    a();
    var z = d(M) || p(M), I = d(W) || p(W), b = r(M, W, H), h = t.has(b.id);
    return t.set(b.id, b), n8(z, b), M !== W && n8(I, b), c(b, h ? "update" : "add"), s(), b;
  }
  function g(M, W, H) {
    var z = b2(M, W), I = t.get(z);
    return I ? (I.data = H, I) : new o8(M, W, H, z);
  }
  function u(M, W, H) {
    var z = b2(M, W), I = o.hasOwnProperty(z);
    if (I || D(M, W)) {
      I || (o[z] = 0);
      var b = "@" + ++o[z];
      z = b2(M + b, W + b);
    }
    return new o8(M, W, H, z);
  }
  function f() {
    return l.size;
  }
  function E() {
    return t.size;
  }
  function C(M) {
    var W = d(M);
    return W ? W.links : null;
  }
  function w(M, W) {
    return W !== void 0 && (M = D(M, W)), F(M);
  }
  function F(M) {
    if (!M || !t.get(M.id)) return !1;
    a(), t.delete(M.id);
    var W = d(M.fromId), H = d(M.toId);
    return W && W.links.delete(M), H && H.links.delete(M), c(M, "remove"), s(), !0;
  }
  function D(M, W) {
    if (!(M === void 0 || W === void 0))
      return t.get(b2(M, W));
  }
  function e1(M) {
    if (M !== void 0)
      return t.get(M);
  }
  function j() {
    a(), B(function(M) {
      _(M.id);
    }), s();
  }
  function l1(M) {
    if (typeof M == "function")
      for (var W = t.values(), H = W.next(); !H.done; ) {
        if (M(H.value))
          return !0;
        H = W.next();
      }
  }
  function $(M, W, H) {
    var z = d(M);
    if (z && z.links && typeof W == "function")
      return H ? Z(z.links, M, W) : Q(z.links, M, W);
  }
  function Q(M, W, H) {
    for (var z, I = M.values(), b = I.next(); !b.done; ) {
      var h = b.value, R = h.fromId === W ? h.toId : h.fromId;
      if (z = H(l.get(R), h), z)
        return !0;
      b = I.next();
    }
  }
  function Z(M, W, H) {
    for (var z, I = M.values(), b = I.next(); !b.done; ) {
      var h = b.value;
      if (h.fromId === W && (z = H(l.get(h.toId), h), z))
        return !0;
      b = I.next();
    }
  }
  function J() {
  }
  function P() {
    n += 1;
  }
  function q1() {
    n -= 1, n === 0 && q.length > 0 && (m.fire("changed", q), q.length = 0);
  }
  function B(M) {
    if (typeof M != "function")
      throw new Error("Function is expected to iterate over graph nodes. You passed " + M);
    for (var W = l.values(), H = W.next(); !H.done; ) {
      if (M(H.value))
        return !0;
      H = W.next();
    }
  }
}
function Se(e, l) {
  this.id = e, this.links = null, this.data = l;
}
function n8(e, l) {
  e.links ? e.links.add(l) : e.links = /* @__PURE__ */ new Set([l]);
}
function o8(e, l, t, o) {
  this.fromId = e, this.toId = l, this.data = t, this.id = o;
}
function b2(e, l) {
  return e.toString() + "👉 " + l.toString();
}
function w4(e, l) {
  if (!new.target) return new w4(e, l);
  if (Array.isArray(e) || (l = e, e = []), l = l || {}, this.data = e || [], this.length = this.data.length, this.compare = l.compare || ze, this.setNodeId = l.setNodeId || Re, this.length > 0)
    for (var t = this.length >> 1; t >= 0; t--) this._down(t);
  if (l.setNodeId)
    for (var t = 0; t < this.length; ++t)
      this.setNodeId(this.data[t], t);
}
function Re() {
}
function ze(e, l) {
  return e - l;
}
w4.prototype = {
  push: function(e) {
    this.data.push(e), this.setNodeId(e, this.length), this.length++, this._up(this.length - 1);
  },
  pop: function() {
    if (this.length !== 0) {
      var e = this.data[0];
      return this.length--, this.length > 0 && (this.data[0] = this.data[this.length], this.setNodeId(this.data[0], 0), this._down(0)), this.data.pop(), e;
    }
  },
  peek: function() {
    return this.data[0];
  },
  updateItem: function(e) {
    this._down(e), this._up(e);
  },
  _up: function(e) {
    for (var l = this.data, t = this.compare, o = this.setNodeId, n = l[e]; e > 0; ) {
      var r = e - 1 >> 1, q = l[r];
      if (t(n, q) >= 0) break;
      l[e] = q, o(q, e), e = r;
    }
    l[e] = n, o(n, e);
  },
  _down: function(e) {
    for (var l = this.data, t = this.compare, o = this.length >> 1, n = l[e], r = this.setNodeId; e < o; ) {
      var q = (e << 1) + 1, c = q + 1, i = l[q];
      if (c < this.length && t(l[c], i) < 0 && (q = c, i = l[c]), t(i, n) >= 0) break;
      l[e] = i, r(i, e), e = q;
    }
    l[e] = n, r(n, e);
  }
};
function Oe(e) {
  this.node = e, this.parent = null, this.closed = !1, this.open = 0, this.distanceToSource = Number.POSITIVE_INFINITY, this.fScore = Number.POSITIVE_INFINITY, this.heapIndex = -1;
}
function P9() {
  var e = 0, l = [];
  return {
    createNewState: o,
    reset: t
  };
  function t() {
    e = 0;
  }
  function o(n) {
    var r = l[e];
    return r ? (r.node = n, r.parent = null, r.closed = !1, r.open = 0, r.distanceToSource = Number.POSITIVE_INFINITY, r.fScore = Number.POSITIVE_INFINITY, r.heapIndex = -1) : (r = new Oe(n), l[e] = r), e++, r;
  }
}
function v6(e, l) {
  var t = e.x - l.x, o = e.y - l.y;
  return Math.sqrt(t * t + o * o);
}
function y6(e, l) {
  var t = e.x - l.x, o = e.y - l.y;
  return Math.abs(t) + Math.abs(o);
}
const F9 = [];
typeof Object.freeze == "function" && Object.freeze(F9);
const F1 = {
  // Path search settings
  heuristic: Te,
  distance: we,
  blocked: Ne,
  compareFScore: Me,
  NO_PATH: F9,
  // heap settings
  setHeapIndex: Le,
  // nba:
  setH1: Be,
  setH2: Ge,
  compareF1Score: Pe,
  compareF2Score: Fe
};
function Te() {
  return 0;
}
function we() {
  return 1;
}
function Ne() {
  return !1;
}
function Me(e, l) {
  var t = e.fScore - l.fScore;
  return t;
}
function Le(e, l) {
  e.heapIndex = l;
}
function Pe(e, l) {
  return e.f1 - l.f1;
}
function Fe(e, l) {
  return e.f2 - l.f2;
}
function Be(e, l) {
  e.h1 = l;
}
function Ge(e, l) {
  e.h2 = l;
}
var ke = F1.NO_PATH;
function I6(e, l) {
  l = l || {};
  var t = l.oriented, o = l.blocked;
  o || (o = F1.blocked);
  var n = l.heuristic;
  n || (n = F1.heuristic);
  var r = l.distance;
  r || (r = F1.distance);
  var q = P9();
  return {
    /**
     * Finds a path between node `fromId` and `toId`.
     * @returns {Array} of nodes between `toId` and `fromId`. Empty array is returned
     * if no path is found.
     */
    find: c
  };
  function c(i, a) {
    var s = e.getNode(i);
    if (!s) throw new Error("fromId is not defined in this graph: " + i);
    var m = e.getNode(a);
    if (!m) throw new Error("toId is not defined in this graph: " + a);
    q.reset();
    var v = /* @__PURE__ */ new Map(), A = new w4({
      compare: F1.compareFScore,
      setNodeId: F1.setHeapIndex
    }), x = q.createNewState(s);
    v.set(i, x), x.fScore = n(s, m), x.distanceToSource = 0, A.push(x), x.open = 1;
    for (var p; A.length > 0; ) {
      if (p = A.pop(), De(p, m)) return Ve(p);
      p.closed = !0, e.forEachLinkedNode(p.node.id, d, t);
    }
    return ke;
    function d(_, S) {
      var g = v.get(_.id);
      if (g || (g = q.createNewState(_), v.set(_.id, g)), !g.closed && (g.open === 0 && (A.push(g), g.open = 1), !o(_, p.node, S))) {
        var u = p.distanceToSource + r(_, p.node, S);
        u >= g.distanceToSource || (g.parent = p, g.distanceToSource = u, g.fScore = u + n(g.node, m), A.updateItem(g.heapIndex));
      }
    }
  }
}
I6.l2 = v6;
I6.l1 = y6;
function De(e, l) {
  return e.node === l;
}
function Ve(e) {
  for (var l = [e.node], t = e.parent; t; )
    l.push(t.node), t = t.parent;
  return l;
}
var l2 = 1, v3 = 2, We = F1.NO_PATH;
function C6(e, l) {
  l = l || {};
  var t = l.oriented, o = l.blocked;
  o || (o = F1.blocked);
  var n = l.heuristic;
  n || (n = F1.heuristic);
  var r = l.distance;
  r || (r = F1.distance);
  var q = P9();
  return {
    find: c
  };
  function c(i, a) {
    var s = e.getNode(i);
    if (!s) throw new Error("fromId is not defined in this graph: " + i);
    var m = e.getNode(a);
    if (!m) throw new Error("toId is not defined in this graph: " + a);
    if (s === m) return [s];
    q.reset();
    var v = t ? F : w, A = /* @__PURE__ */ new Map(), x = new w4({
      compare: F1.compareFScore,
      setNodeId: F1.setHeapIndex
    }), p = new w4({
      compare: F1.compareFScore,
      setNodeId: F1.setHeapIndex
    }), d = q.createNewState(s);
    A.set(i, d), d.fScore = n(s, m), d.distanceToSource = 0, x.push(d), d.open = l2;
    var _ = q.createNewState(m);
    _.fScore = n(m, s), _.distanceToSource = 0, p.push(_), _.open = v3;
    for (var S = Number.POSITIVE_INFINITY, g, u, f = x, E = l2; x.length > 0 && p.length > 0; ) {
      x.length < p.length ? (E = l2, f = x) : (E = v3, f = p);
      var C = f.pop();
      if (C.closed = !0, !(C.distanceToSource > S) && (e.forEachLinkedNode(C.node.id, v), g && u))
        return e1(g, u);
    }
    return We;
    function w(l1, $) {
      return j(l1, $, C);
    }
    function F(l1, $) {
      if (E === l2) {
        if ($.fromId === C.node.id) return j(l1, $, C);
      } else if (E === v3 && $.toId === C.node.id)
        return j(l1, $, C);
    }
    function D(l1) {
      var $ = l1.open;
      return !!($ && $ !== E);
    }
    function e1(l1, $) {
      for (var Q = [], Z = l1; Z; )
        Q.push(Z.node), Z = Z.parent;
      for (var J = $; J; )
        Q.unshift(J.node), J = J.parent;
      return Q;
    }
    function j(l1, $, Q) {
      var Z = A.get(l1.id);
      if (Z || (Z = q.createNewState(l1), A.set(l1.id, Z)), !Z.closed && !o(Z.node, Q.node, $)) {
        if (D(Z)) {
          var J = Z.distanceToSource + Q.distanceToSource;
          J < S && (g = Z, u = Q, S = J);
          return;
        }
        var P = Q.distanceToSource + r(Z.node, Q.node, $);
        if (!(P >= Z.distanceToSource)) {
          var q1 = E === l2 ? m : s, B = P + n(Z.node, q1);
          B >= S || (Z.fScore = B, Z.open === 0 && (f.push(Z), f.updateItem(Z.heapIndex), Z.open = E), Z.parent = Q, Z.distanceToSource = P);
        }
      }
    }
  }
}
C6.l2 = v6;
C6.l1 = y6;
function je(e) {
  this.node = e, this.p1 = null, this.p2 = null, this.closed = !1, this.g1 = Number.POSITIVE_INFINITY, this.g2 = Number.POSITIVE_INFINITY, this.f1 = Number.POSITIVE_INFINITY, this.f2 = Number.POSITIVE_INFINITY, this.h1 = -1, this.h2 = -1;
}
function Xe() {
  var e = 0, l = [];
  return {
    /**
     * Creates a new NBASearchState instance
     */
    createNewState: o,
    /**
     * Marks all created instances available for recycling.
     */
    reset: t
  };
  function t() {
    e = 0;
  }
  function o(n) {
    var r = l[e];
    return r ? (r.node = n, r.p1 = null, r.p2 = null, r.closed = !1, r.g1 = Number.POSITIVE_INFINITY, r.g2 = Number.POSITIVE_INFINITY, r.f1 = Number.POSITIVE_INFINITY, r.f2 = Number.POSITIVE_INFINITY, r.h1 = -1, r.h2 = -1) : (r = new je(n), l[e] = r), e++, r;
  }
}
var He = F1.NO_PATH;
function E6(e, l) {
  l = l || {};
  var t = l.oriented, o = l.quitFast, n = l.blocked;
  n || (n = F1.blocked);
  var r = l.heuristic;
  r || (r = F1.heuristic);
  var q = l.distance;
  q || (q = F1.distance);
  var c = Xe();
  return {
    /**
     * Finds a path between node `fromId` and `toId`.
     * @returns {Array} of nodes between `toId` and `fromId`. Empty array is returned
     * if no path is found.
     */
    find: i
  };
  function i(a, s) {
    var m = e.getNode(a);
    if (!m) throw new Error("fromId is not defined in this graph: " + a);
    var v = e.getNode(s);
    if (!v) throw new Error("toId is not defined in this graph: " + s);
    c.reset();
    var A = t ? Q : j, x = t ? $ : l1, p = /* @__PURE__ */ new Map(), d = new w4({
      compare: F1.compareF1Score,
      setNodeId: F1.setH1
    }), _ = new w4({
      compare: F1.compareF2Score,
      setNodeId: F1.setH2
    }), S, g = Number.POSITIVE_INFINITY, u = c.createNewState(m);
    p.set(a, u), u.g1 = 0;
    var f = r(m, v);
    u.f1 = f, d.push(u);
    var E = c.createNewState(v);
    p.set(s, E), E.g2 = 0;
    var C = f;
    E.f2 = C, _.push(E);
    for (var w; _.length && d.length && (d.length < _.length ? D() : e1(), !(o && S)); )
      ;
    var F = Ze(S);
    return F;
    function D() {
      w = d.pop(), !w.closed && (w.closed = !0, w.f1 < g && w.g1 + C - r(m, w.node) < g && e.forEachLinkedNode(w.node.id, A), d.length > 0 && (f = d.peek().f1));
    }
    function e1() {
      w = _.pop(), !w.closed && (w.closed = !0, w.f2 < g && w.g2 + f - r(w.node, v) < g && e.forEachLinkedNode(w.node.id, x), _.length > 0 && (C = _.peek().f2));
    }
    function j(Z, J) {
      var P = p.get(Z.id);
      if (P || (P = c.createNewState(Z), p.set(Z.id, P)), !P.closed && !n(w.node, Z, J)) {
        var q1 = w.g1 + q(w.node, Z, J);
        q1 < P.g1 && (P.g1 = q1, P.f1 = q1 + r(P.node, v), P.p1 = w, P.h1 < 0 ? d.push(P) : d.updateItem(P.h1));
        var B = P.g1 + P.g2;
        B < g && (g = B, S = P);
      }
    }
    function l1(Z, J) {
      var P = p.get(Z.id);
      if (P || (P = c.createNewState(Z), p.set(Z.id, P)), !P.closed && !n(w.node, Z, J)) {
        var q1 = w.g2 + q(w.node, Z, J);
        q1 < P.g2 && (P.g2 = q1, P.f2 = q1 + r(m, P.node), P.p2 = w, P.h2 < 0 ? _.push(P) : _.updateItem(P.h2));
        var B = P.g1 + P.g2;
        B < g && (g = B, S = P);
      }
    }
    function $(Z, J) {
      if (J.toId === w.node.id) return l1(Z, J);
    }
    function Q(Z, J) {
      if (J.fromId === w.node.id) return j(Z, J);
    }
  }
}
E6.l2 = v6;
E6.l1 = y6;
function Ze(e) {
  if (!e) return He;
  for (var l = [e.node], t = e.p1; t; )
    l.push(t.node), t = t.p1;
  for (var o = e.p2; o; )
    l.unshift(o.node), o = o.p2;
  return l;
}
const Ye = {
  aStar: I6,
  aGreedy: C6,
  nba: E6
};
function B9(e, l) {
  return function() {
    return e.apply(l, arguments);
  };
}
const { toString: Je } = Object.prototype, { getPrototypeOf: A6 } = Object, { iterator: l3, toStringTag: G9 } = Symbol, t3 = /* @__PURE__ */ ((e) => (l) => {
  const t = Je.call(l);
  return e[t] || (e[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), s4 = (e) => (e = e.toLowerCase(), (l) => t3(l) === e), n3 = (e) => (l) => typeof l === e, { isArray: U4 } = Array, Y4 = n3("undefined");
function u2(e) {
  return e !== null && !Y4(e) && e.constructor !== null && !Y4(e.constructor) && t4(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const k9 = s4("ArrayBuffer");
function Ue(e) {
  let l;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? l = ArrayBuffer.isView(e) : l = e && e.buffer && k9(e.buffer), l;
}
const $e = n3("string"), t4 = n3("function"), D9 = n3("number"), m2 = (e) => e !== null && typeof e == "object", Qe = (e) => e === !0 || e === !1, w2 = (e) => {
  if (t3(e) !== "object")
    return !1;
  const l = A6(e);
  return (l === null || l === Object.prototype || Object.getPrototypeOf(l) === null) && !(G9 in e) && !(l3 in e);
}, Ke = (e) => {
  if (!m2(e) || u2(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, e0 = s4("Date"), l0 = s4("File"), t0 = s4("Blob"), n0 = s4("FileList"), o0 = (e) => m2(e) && t4(e.pipe), r0 = (e) => {
  let l;
  return e && (typeof FormData == "function" && e instanceof FormData || t4(e.append) && ((l = t3(e)) === "formdata" || // detect form-data instance
  l === "object" && t4(e.toString) && e.toString() === "[object FormData]"));
}, q0 = s4("URLSearchParams"), [i0, a0, s0, c0] = ["ReadableStream", "Request", "Response", "Headers"].map(s4), u0 = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function d2(e, l, { allOwnKeys: t = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let o, n;
  if (typeof e != "object" && (e = [e]), U4(e))
    for (o = 0, n = e.length; o < n; o++)
      l.call(null, e[o], o, e);
  else {
    if (u2(e))
      return;
    const r = t ? Object.getOwnPropertyNames(e) : Object.keys(e), q = r.length;
    let c;
    for (o = 0; o < q; o++)
      c = r[o], l.call(null, e[c], c, e);
  }
}
function V9(e, l) {
  if (u2(e))
    return null;
  l = l.toLowerCase();
  const t = Object.keys(e);
  let o = t.length, n;
  for (; o-- > 0; )
    if (n = t[o], l === n.toLowerCase())
      return n;
  return null;
}
const R4 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, W9 = (e) => !Y4(e) && e !== R4;
function Z3() {
  const { caseless: e, skipUndefined: l } = W9(this) && this || {}, t = {}, o = (n, r) => {
    const q = e && V9(t, r) || r;
    w2(t[q]) && w2(n) ? t[q] = Z3(t[q], n) : w2(n) ? t[q] = Z3({}, n) : U4(n) ? t[q] = n.slice() : (!l || !Y4(n)) && (t[q] = n);
  };
  for (let n = 0, r = arguments.length; n < r; n++)
    arguments[n] && d2(arguments[n], o);
  return t;
}
const m0 = (e, l, t, { allOwnKeys: o } = {}) => (d2(l, (n, r) => {
  t && t4(n) ? e[r] = B9(n, t) : e[r] = n;
}, { allOwnKeys: o }), e), d0 = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), f0 = (e, l, t, o) => {
  e.prototype = Object.create(l.prototype, o), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: l.prototype
  }), t && Object.assign(e.prototype, t);
}, x0 = (e, l, t, o) => {
  let n, r, q;
  const c = {};
  if (l = l || {}, e == null) return l;
  do {
    for (n = Object.getOwnPropertyNames(e), r = n.length; r-- > 0; )
      q = n[r], (!o || o(q, e, l)) && !c[q] && (l[q] = e[q], c[q] = !0);
    e = t !== !1 && A6(e);
  } while (e && (!t || t(e, l)) && e !== Object.prototype);
  return l;
}, h0 = (e, l, t) => {
  e = String(e), (t === void 0 || t > e.length) && (t = e.length), t -= l.length;
  const o = e.indexOf(l, t);
  return o !== -1 && o === t;
}, p0 = (e) => {
  if (!e) return null;
  if (U4(e)) return e;
  let l = e.length;
  if (!D9(l)) return null;
  const t = new Array(l);
  for (; l-- > 0; )
    t[l] = e[l];
  return t;
}, g0 = /* @__PURE__ */ ((e) => (l) => e && l instanceof e)(typeof Uint8Array < "u" && A6(Uint8Array)), b0 = (e, l) => {
  const o = (e && e[l3]).call(e);
  let n;
  for (; (n = o.next()) && !n.done; ) {
    const r = n.value;
    l.call(e, r[0], r[1]);
  }
}, _0 = (e, l) => {
  let t;
  const o = [];
  for (; (t = e.exec(l)) !== null; )
    o.push(t);
  return o;
}, v0 = s4("HTMLFormElement"), y0 = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, o, n) {
    return o.toUpperCase() + n;
  }
), r8 = (({ hasOwnProperty: e }) => (l, t) => e.call(l, t))(Object.prototype), I0 = s4("RegExp"), j9 = (e, l) => {
  const t = Object.getOwnPropertyDescriptors(e), o = {};
  d2(t, (n, r) => {
    let q;
    (q = l(n, r, e)) !== !1 && (o[r] = q || n);
  }), Object.defineProperties(e, o);
}, C0 = (e) => {
  j9(e, (l, t) => {
    if (t4(e) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const o = e[t];
    if (t4(o)) {
      if (l.enumerable = !1, "writable" in l) {
        l.writable = !1;
        return;
      }
      l.set || (l.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, E0 = (e, l) => {
  const t = {}, o = (n) => {
    n.forEach((r) => {
      t[r] = !0;
    });
  };
  return U4(e) ? o(e) : o(String(e).split(l)), t;
}, A0 = () => {
}, S0 = (e, l) => e != null && Number.isFinite(e = +e) ? e : l;
function R0(e) {
  return !!(e && t4(e.append) && e[G9] === "FormData" && e[l3]);
}
const z0 = (e) => {
  const l = new Array(10), t = (o, n) => {
    if (m2(o)) {
      if (l.indexOf(o) >= 0)
        return;
      if (u2(o))
        return o;
      if (!("toJSON" in o)) {
        l[n] = o;
        const r = U4(o) ? [] : {};
        return d2(o, (q, c) => {
          const i = t(q, n + 1);
          !Y4(i) && (r[c] = i);
        }), l[n] = void 0, r;
      }
    }
    return o;
  };
  return t(e, 0);
}, O0 = s4("AsyncFunction"), T0 = (e) => e && (m2(e) || t4(e)) && t4(e.then) && t4(e.catch), X9 = ((e, l) => e ? setImmediate : l ? ((t, o) => (R4.addEventListener("message", ({ source: n, data: r }) => {
  n === R4 && r === t && o.length && o.shift()();
}, !1), (n) => {
  o.push(n), R4.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  t4(R4.postMessage)
), w0 = typeof queueMicrotask < "u" ? queueMicrotask.bind(R4) : typeof process < "u" && process.nextTick || X9, N0 = (e) => e != null && t4(e[l3]), X = {
  isArray: U4,
  isArrayBuffer: k9,
  isBuffer: u2,
  isFormData: r0,
  isArrayBufferView: Ue,
  isString: $e,
  isNumber: D9,
  isBoolean: Qe,
  isObject: m2,
  isPlainObject: w2,
  isEmptyObject: Ke,
  isReadableStream: i0,
  isRequest: a0,
  isResponse: s0,
  isHeaders: c0,
  isUndefined: Y4,
  isDate: e0,
  isFile: l0,
  isBlob: t0,
  isRegExp: I0,
  isFunction: t4,
  isStream: o0,
  isURLSearchParams: q0,
  isTypedArray: g0,
  isFileList: n0,
  forEach: d2,
  merge: Z3,
  extend: m0,
  trim: u0,
  stripBOM: d0,
  inherits: f0,
  toFlatObject: x0,
  kindOf: t3,
  kindOfTest: s4,
  endsWith: h0,
  toArray: p0,
  forEachEntry: b0,
  matchAll: _0,
  isHTMLForm: v0,
  hasOwnProperty: r8,
  hasOwnProp: r8,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: j9,
  freezeMethods: C0,
  toObjectSet: E0,
  toCamelCase: y0,
  noop: A0,
  toFiniteNumber: S0,
  findKey: V9,
  global: R4,
  isContextDefined: W9,
  isSpecCompliantForm: R0,
  toJSONObject: z0,
  isAsyncFn: O0,
  isThenable: T0,
  setImmediate: X9,
  asap: w0,
  isIterable: N0
};
function g1(e, l, t, o, n) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", l && (this.code = l), t && (this.config = t), o && (this.request = o), n && (this.response = n, this.status = n.status ? n.status : null);
}
X.inherits(g1, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: X.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const H9 = g1.prototype, Z9 = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Z9[e] = { value: e };
});
Object.defineProperties(g1, Z9);
Object.defineProperty(H9, "isAxiosError", { value: !0 });
g1.from = (e, l, t, o, n, r) => {
  const q = Object.create(H9);
  X.toFlatObject(e, q, function(s) {
    return s !== Error.prototype;
  }, (a) => a !== "isAxiosError");
  const c = e && e.message ? e.message : "Error", i = l == null && e ? e.code : l;
  return g1.call(q, c, i, t, o, n), e && q.cause == null && Object.defineProperty(q, "cause", { value: e, configurable: !0 }), q.name = e && e.name || "Error", r && Object.assign(q, r), q;
};
const M0 = null;
function Y3(e) {
  return X.isPlainObject(e) || X.isArray(e);
}
function Y9(e) {
  return X.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function q8(e, l, t) {
  return e ? e.concat(l).map(function(n, r) {
    return n = Y9(n), !t && r ? "[" + n + "]" : n;
  }).join(t ? "." : "") : l;
}
function L0(e) {
  return X.isArray(e) && !e.some(Y3);
}
const P0 = X.toFlatObject(X, {}, null, function(l) {
  return /^is[A-Z]/.test(l);
});
function o3(e, l, t) {
  if (!X.isObject(e))
    throw new TypeError("target must be an object");
  l = l || new FormData(), t = X.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, d) {
    return !X.isUndefined(d[p]);
  });
  const o = t.metaTokens, n = t.visitor || s, r = t.dots, q = t.indexes, i = (t.Blob || typeof Blob < "u" && Blob) && X.isSpecCompliantForm(l);
  if (!X.isFunction(n))
    throw new TypeError("visitor must be a function");
  function a(x) {
    if (x === null) return "";
    if (X.isDate(x))
      return x.toISOString();
    if (X.isBoolean(x))
      return x.toString();
    if (!i && X.isBlob(x))
      throw new g1("Blob is not supported. Use a Buffer instead.");
    return X.isArrayBuffer(x) || X.isTypedArray(x) ? i && typeof Blob == "function" ? new Blob([x]) : Buffer.from(x) : x;
  }
  function s(x, p, d) {
    let _ = x;
    if (x && !d && typeof x == "object") {
      if (X.endsWith(p, "{}"))
        p = o ? p : p.slice(0, -2), x = JSON.stringify(x);
      else if (X.isArray(x) && L0(x) || (X.isFileList(x) || X.endsWith(p, "[]")) && (_ = X.toArray(x)))
        return p = Y9(p), _.forEach(function(g, u) {
          !(X.isUndefined(g) || g === null) && l.append(
            // eslint-disable-next-line no-nested-ternary
            q === !0 ? q8([p], u, r) : q === null ? p : p + "[]",
            a(g)
          );
        }), !1;
    }
    return Y3(x) ? !0 : (l.append(q8(d, p, r), a(x)), !1);
  }
  const m = [], v = Object.assign(P0, {
    defaultVisitor: s,
    convertValue: a,
    isVisitable: Y3
  });
  function A(x, p) {
    if (!X.isUndefined(x)) {
      if (m.indexOf(x) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      m.push(x), X.forEach(x, function(_, S) {
        (!(X.isUndefined(_) || _ === null) && n.call(
          l,
          _,
          X.isString(S) ? S.trim() : S,
          p,
          v
        )) === !0 && A(_, p ? p.concat(S) : [S]);
      }), m.pop();
    }
  }
  if (!X.isObject(e))
    throw new TypeError("data must be an object");
  return A(e), l;
}
function i8(e) {
  const l = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(o) {
    return l[o];
  });
}
function S6(e, l) {
  this._pairs = [], e && o3(e, this, l);
}
const J9 = S6.prototype;
J9.append = function(l, t) {
  this._pairs.push([l, t]);
};
J9.toString = function(l) {
  const t = l ? function(o) {
    return l.call(this, o, i8);
  } : i8;
  return this._pairs.map(function(n) {
    return t(n[0]) + "=" + t(n[1]);
  }, "").join("&");
};
function F0(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function U9(e, l, t) {
  if (!l)
    return e;
  const o = t && t.encode || F0;
  X.isFunction(t) && (t = {
    serialize: t
  });
  const n = t && t.serialize;
  let r;
  if (n ? r = n(l, t) : r = X.isURLSearchParams(l) ? l.toString() : new S6(l, t).toString(o), r) {
    const q = e.indexOf("#");
    q !== -1 && (e = e.slice(0, q)), e += (e.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return e;
}
class a8 {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(l, t, o) {
    return this.handlers.push({
      fulfilled: l,
      rejected: t,
      synchronous: o ? o.synchronous : !1,
      runWhen: o ? o.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(l) {
    this.handlers[l] && (this.handlers[l] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(l) {
    X.forEach(this.handlers, function(o) {
      o !== null && l(o);
    });
  }
}
const $9 = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, B0 = typeof URLSearchParams < "u" ? URLSearchParams : S6, G0 = typeof FormData < "u" ? FormData : null, k0 = typeof Blob < "u" ? Blob : null, D0 = {
  isBrowser: !0,
  classes: {
    URLSearchParams: B0,
    FormData: G0,
    Blob: k0
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, R6 = typeof window < "u" && typeof document < "u", J3 = typeof navigator == "object" && navigator || void 0, V0 = R6 && (!J3 || ["ReactNative", "NativeScript", "NS"].indexOf(J3.product) < 0), W0 = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", j0 = R6 && window.location.href || "http://localhost", X0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: R6,
  hasStandardBrowserEnv: V0,
  hasStandardBrowserWebWorkerEnv: W0,
  navigator: J3,
  origin: j0
}, Symbol.toStringTag, { value: "Module" })), $1 = {
  ...X0,
  ...D0
};
function H0(e, l) {
  return o3(e, new $1.classes.URLSearchParams(), {
    visitor: function(t, o, n, r) {
      return $1.isNode && X.isBuffer(t) ? (this.append(o, t.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    },
    ...l
  });
}
function Z0(e) {
  return X.matchAll(/\w+|\[(\w*)]/g, e).map((l) => l[0] === "[]" ? "" : l[1] || l[0]);
}
function Y0(e) {
  const l = {}, t = Object.keys(e);
  let o;
  const n = t.length;
  let r;
  for (o = 0; o < n; o++)
    r = t[o], l[r] = e[r];
  return l;
}
function Q9(e) {
  function l(t, o, n, r) {
    let q = t[r++];
    if (q === "__proto__") return !0;
    const c = Number.isFinite(+q), i = r >= t.length;
    return q = !q && X.isArray(n) ? n.length : q, i ? (X.hasOwnProp(n, q) ? n[q] = [n[q], o] : n[q] = o, !c) : ((!n[q] || !X.isObject(n[q])) && (n[q] = []), l(t, o, n[q], r) && X.isArray(n[q]) && (n[q] = Y0(n[q])), !c);
  }
  if (X.isFormData(e) && X.isFunction(e.entries)) {
    const t = {};
    return X.forEachEntry(e, (o, n) => {
      l(Z0(o), n, t, 0);
    }), t;
  }
  return null;
}
function J0(e, l, t) {
  if (X.isString(e))
    try {
      return (l || JSON.parse)(e), X.trim(e);
    } catch (o) {
      if (o.name !== "SyntaxError")
        throw o;
    }
  return (t || JSON.stringify)(e);
}
const f2 = {
  transitional: $9,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(l, t) {
    const o = t.getContentType() || "", n = o.indexOf("application/json") > -1, r = X.isObject(l);
    if (r && X.isHTMLForm(l) && (l = new FormData(l)), X.isFormData(l))
      return n ? JSON.stringify(Q9(l)) : l;
    if (X.isArrayBuffer(l) || X.isBuffer(l) || X.isStream(l) || X.isFile(l) || X.isBlob(l) || X.isReadableStream(l))
      return l;
    if (X.isArrayBufferView(l))
      return l.buffer;
    if (X.isURLSearchParams(l))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), l.toString();
    let c;
    if (r) {
      if (o.indexOf("application/x-www-form-urlencoded") > -1)
        return H0(l, this.formSerializer).toString();
      if ((c = X.isFileList(l)) || o.indexOf("multipart/form-data") > -1) {
        const i = this.env && this.env.FormData;
        return o3(
          c ? { "files[]": l } : l,
          i && new i(),
          this.formSerializer
        );
      }
    }
    return r || n ? (t.setContentType("application/json", !1), J0(l)) : l;
  }],
  transformResponse: [function(l) {
    const t = this.transitional || f2.transitional, o = t && t.forcedJSONParsing, n = this.responseType === "json";
    if (X.isResponse(l) || X.isReadableStream(l))
      return l;
    if (l && X.isString(l) && (o && !this.responseType || n)) {
      const q = !(t && t.silentJSONParsing) && n;
      try {
        return JSON.parse(l, this.parseReviver);
      } catch (c) {
        if (q)
          throw c.name === "SyntaxError" ? g1.from(c, g1.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return l;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: $1.classes.FormData,
    Blob: $1.classes.Blob
  },
  validateStatus: function(l) {
    return l >= 200 && l < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
X.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  f2.headers[e] = {};
});
const U0 = X.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), $0 = (e) => {
  const l = {};
  let t, o, n;
  return e && e.split(`
`).forEach(function(q) {
    n = q.indexOf(":"), t = q.substring(0, n).trim().toLowerCase(), o = q.substring(n + 1).trim(), !(!t || l[t] && U0[t]) && (t === "set-cookie" ? l[t] ? l[t].push(o) : l[t] = [o] : l[t] = l[t] ? l[t] + ", " + o : o);
  }), l;
}, s8 = Symbol("internals");
function t2(e) {
  return e && String(e).trim().toLowerCase();
}
function N2(e) {
  return e === !1 || e == null ? e : X.isArray(e) ? e.map(N2) : String(e);
}
function Q0(e) {
  const l = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; o = t.exec(e); )
    l[o[1]] = o[2];
  return l;
}
const K0 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function y3(e, l, t, o, n) {
  if (X.isFunction(o))
    return o.call(this, l, t);
  if (n && (l = t), !!X.isString(l)) {
    if (X.isString(o))
      return l.indexOf(o) !== -1;
    if (X.isRegExp(o))
      return o.test(l);
  }
}
function el(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (l, t, o) => t.toUpperCase() + o);
}
function ll(e, l) {
  const t = X.toCamelCase(" " + l);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(e, o + t, {
      value: function(n, r, q) {
        return this[o].call(this, l, n, r, q);
      },
      configurable: !0
    });
  });
}
let n4 = class {
  constructor(l) {
    l && this.set(l);
  }
  set(l, t, o) {
    const n = this;
    function r(c, i, a) {
      const s = t2(i);
      if (!s)
        throw new Error("header name must be a non-empty string");
      const m = X.findKey(n, s);
      (!m || n[m] === void 0 || a === !0 || a === void 0 && n[m] !== !1) && (n[m || i] = N2(c));
    }
    const q = (c, i) => X.forEach(c, (a, s) => r(a, s, i));
    if (X.isPlainObject(l) || l instanceof this.constructor)
      q(l, t);
    else if (X.isString(l) && (l = l.trim()) && !K0(l))
      q($0(l), t);
    else if (X.isObject(l) && X.isIterable(l)) {
      let c = {}, i, a;
      for (const s of l) {
        if (!X.isArray(s))
          throw TypeError("Object iterator must return a key-value pair");
        c[a = s[0]] = (i = c[a]) ? X.isArray(i) ? [...i, s[1]] : [i, s[1]] : s[1];
      }
      q(c, t);
    } else
      l != null && r(t, l, o);
    return this;
  }
  get(l, t) {
    if (l = t2(l), l) {
      const o = X.findKey(this, l);
      if (o) {
        const n = this[o];
        if (!t)
          return n;
        if (t === !0)
          return Q0(n);
        if (X.isFunction(t))
          return t.call(this, n, o);
        if (X.isRegExp(t))
          return t.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(l, t) {
    if (l = t2(l), l) {
      const o = X.findKey(this, l);
      return !!(o && this[o] !== void 0 && (!t || y3(this, this[o], o, t)));
    }
    return !1;
  }
  delete(l, t) {
    const o = this;
    let n = !1;
    function r(q) {
      if (q = t2(q), q) {
        const c = X.findKey(o, q);
        c && (!t || y3(o, o[c], c, t)) && (delete o[c], n = !0);
      }
    }
    return X.isArray(l) ? l.forEach(r) : r(l), n;
  }
  clear(l) {
    const t = Object.keys(this);
    let o = t.length, n = !1;
    for (; o--; ) {
      const r = t[o];
      (!l || y3(this, this[r], r, l, !0)) && (delete this[r], n = !0);
    }
    return n;
  }
  normalize(l) {
    const t = this, o = {};
    return X.forEach(this, (n, r) => {
      const q = X.findKey(o, r);
      if (q) {
        t[q] = N2(n), delete t[r];
        return;
      }
      const c = l ? el(r) : String(r).trim();
      c !== r && delete t[r], t[c] = N2(n), o[c] = !0;
    }), this;
  }
  concat(...l) {
    return this.constructor.concat(this, ...l);
  }
  toJSON(l) {
    const t = /* @__PURE__ */ Object.create(null);
    return X.forEach(this, (o, n) => {
      o != null && o !== !1 && (t[n] = l && X.isArray(o) ? o.join(", ") : o);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([l, t]) => l + ": " + t).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(l) {
    return l instanceof this ? l : new this(l);
  }
  static concat(l, ...t) {
    const o = new this(l);
    return t.forEach((n) => o.set(n)), o;
  }
  static accessor(l) {
    const o = (this[s8] = this[s8] = {
      accessors: {}
    }).accessors, n = this.prototype;
    function r(q) {
      const c = t2(q);
      o[c] || (ll(n, q), o[c] = !0);
    }
    return X.isArray(l) ? l.forEach(r) : r(l), this;
  }
};
n4.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
X.reduceDescriptors(n4.prototype, ({ value: e }, l) => {
  let t = l[0].toUpperCase() + l.slice(1);
  return {
    get: () => e,
    set(o) {
      this[t] = o;
    }
  };
});
X.freezeMethods(n4);
function I3(e, l) {
  const t = this || f2, o = l || t, n = n4.from(o.headers);
  let r = o.data;
  return X.forEach(e, function(c) {
    r = c.call(t, r, n.normalize(), l ? l.status : void 0);
  }), n.normalize(), r;
}
function K9(e) {
  return !!(e && e.__CANCEL__);
}
function $4(e, l, t) {
  g1.call(this, e ?? "canceled", g1.ERR_CANCELED, l, t), this.name = "CanceledError";
}
X.inherits($4, g1, {
  __CANCEL__: !0
});
function e5(e, l, t) {
  const o = t.config.validateStatus;
  !t.status || !o || o(t.status) ? e(t) : l(new g1(
    "Request failed with status code " + t.status,
    [g1.ERR_BAD_REQUEST, g1.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function tl(e) {
  const l = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return l && l[1] || "";
}
function nl(e, l) {
  e = e || 10;
  const t = new Array(e), o = new Array(e);
  let n = 0, r = 0, q;
  return l = l !== void 0 ? l : 1e3, function(i) {
    const a = Date.now(), s = o[r];
    q || (q = a), t[n] = i, o[n] = a;
    let m = r, v = 0;
    for (; m !== n; )
      v += t[m++], m = m % e;
    if (n = (n + 1) % e, n === r && (r = (r + 1) % e), a - q < l)
      return;
    const A = s && a - s;
    return A ? Math.round(v * 1e3 / A) : void 0;
  };
}
function ol(e, l) {
  let t = 0, o = 1e3 / l, n, r;
  const q = (a, s = Date.now()) => {
    t = s, n = null, r && (clearTimeout(r), r = null), e(...a);
  };
  return [(...a) => {
    const s = Date.now(), m = s - t;
    m >= o ? q(a, s) : (n = a, r || (r = setTimeout(() => {
      r = null, q(n);
    }, o - m)));
  }, () => n && q(n)];
}
const V2 = (e, l, t = 3) => {
  let o = 0;
  const n = nl(50, 250);
  return ol((r) => {
    const q = r.loaded, c = r.lengthComputable ? r.total : void 0, i = q - o, a = n(i), s = q <= c;
    o = q;
    const m = {
      loaded: q,
      total: c,
      progress: c ? q / c : void 0,
      bytes: i,
      rate: a || void 0,
      estimated: a && c && s ? (c - q) / a : void 0,
      event: r,
      lengthComputable: c != null,
      [l ? "download" : "upload"]: !0
    };
    e(m);
  }, t);
}, c8 = (e, l) => {
  const t = e != null;
  return [(o) => l[0]({
    lengthComputable: t,
    total: e,
    loaded: o
  }), l[1]];
}, u8 = (e) => (...l) => X.asap(() => e(...l)), rl = $1.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, l) => (t) => (t = new URL(t, $1.origin), e.protocol === t.protocol && e.host === t.host && (l || e.port === t.port)))(
  new URL($1.origin),
  $1.navigator && /(msie|trident)/i.test($1.navigator.userAgent)
) : () => !0, ql = $1.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, l, t, o, n, r, q) {
      if (typeof document > "u") return;
      const c = [`${e}=${encodeURIComponent(l)}`];
      X.isNumber(t) && c.push(`expires=${new Date(t).toUTCString()}`), X.isString(o) && c.push(`path=${o}`), X.isString(n) && c.push(`domain=${n}`), r === !0 && c.push("secure"), X.isString(q) && c.push(`SameSite=${q}`), document.cookie = c.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const l = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return l ? decodeURIComponent(l[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function il(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function al(e, l) {
  return l ? e.replace(/\/?\/$/, "") + "/" + l.replace(/^\/+/, "") : e;
}
function l5(e, l, t) {
  let o = !il(l);
  return e && (o || t == !1) ? al(e, l) : l;
}
const m8 = (e) => e instanceof n4 ? { ...e } : e;
function N4(e, l) {
  l = l || {};
  const t = {};
  function o(a, s, m, v) {
    return X.isPlainObject(a) && X.isPlainObject(s) ? X.merge.call({ caseless: v }, a, s) : X.isPlainObject(s) ? X.merge({}, s) : X.isArray(s) ? s.slice() : s;
  }
  function n(a, s, m, v) {
    if (X.isUndefined(s)) {
      if (!X.isUndefined(a))
        return o(void 0, a, m, v);
    } else return o(a, s, m, v);
  }
  function r(a, s) {
    if (!X.isUndefined(s))
      return o(void 0, s);
  }
  function q(a, s) {
    if (X.isUndefined(s)) {
      if (!X.isUndefined(a))
        return o(void 0, a);
    } else return o(void 0, s);
  }
  function c(a, s, m) {
    if (m in l)
      return o(a, s);
    if (m in e)
      return o(void 0, a);
  }
  const i = {
    url: r,
    method: r,
    data: r,
    baseURL: q,
    transformRequest: q,
    transformResponse: q,
    paramsSerializer: q,
    timeout: q,
    timeoutMessage: q,
    withCredentials: q,
    withXSRFToken: q,
    adapter: q,
    responseType: q,
    xsrfCookieName: q,
    xsrfHeaderName: q,
    onUploadProgress: q,
    onDownloadProgress: q,
    decompress: q,
    maxContentLength: q,
    maxBodyLength: q,
    beforeRedirect: q,
    transport: q,
    httpAgent: q,
    httpsAgent: q,
    cancelToken: q,
    socketPath: q,
    responseEncoding: q,
    validateStatus: c,
    headers: (a, s, m) => n(m8(a), m8(s), m, !0)
  };
  return X.forEach(Object.keys({ ...e, ...l }), function(s) {
    const m = i[s] || n, v = m(e[s], l[s], s);
    X.isUndefined(v) && m !== c || (t[s] = v);
  }), t;
}
const t5 = (e) => {
  const l = N4({}, e);
  let { data: t, withXSRFToken: o, xsrfHeaderName: n, xsrfCookieName: r, headers: q, auth: c } = l;
  if (l.headers = q = n4.from(q), l.url = U9(l5(l.baseURL, l.url, l.allowAbsoluteUrls), e.params, e.paramsSerializer), c && q.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  ), X.isFormData(t)) {
    if ($1.hasStandardBrowserEnv || $1.hasStandardBrowserWebWorkerEnv)
      q.setContentType(void 0);
    else if (X.isFunction(t.getHeaders)) {
      const i = t.getHeaders(), a = ["content-type", "content-length"];
      Object.entries(i).forEach(([s, m]) => {
        a.includes(s.toLowerCase()) && q.set(s, m);
      });
    }
  }
  if ($1.hasStandardBrowserEnv && (o && X.isFunction(o) && (o = o(l)), o || o !== !1 && rl(l.url))) {
    const i = n && r && ql.read(r);
    i && q.set(n, i);
  }
  return l;
}, sl = typeof XMLHttpRequest < "u", cl = sl && function(e) {
  return new Promise(function(t, o) {
    const n = t5(e);
    let r = n.data;
    const q = n4.from(n.headers).normalize();
    let { responseType: c, onUploadProgress: i, onDownloadProgress: a } = n, s, m, v, A, x;
    function p() {
      A && A(), x && x(), n.cancelToken && n.cancelToken.unsubscribe(s), n.signal && n.signal.removeEventListener("abort", s);
    }
    let d = new XMLHttpRequest();
    d.open(n.method.toUpperCase(), n.url, !0), d.timeout = n.timeout;
    function _() {
      if (!d)
        return;
      const g = n4.from(
        "getAllResponseHeaders" in d && d.getAllResponseHeaders()
      ), f = {
        data: !c || c === "text" || c === "json" ? d.responseText : d.response,
        status: d.status,
        statusText: d.statusText,
        headers: g,
        config: e,
        request: d
      };
      e5(function(C) {
        t(C), p();
      }, function(C) {
        o(C), p();
      }, f), d = null;
    }
    "onloadend" in d ? d.onloadend = _ : d.onreadystatechange = function() {
      !d || d.readyState !== 4 || d.status === 0 && !(d.responseURL && d.responseURL.indexOf("file:") === 0) || setTimeout(_);
    }, d.onabort = function() {
      d && (o(new g1("Request aborted", g1.ECONNABORTED, e, d)), d = null);
    }, d.onerror = function(u) {
      const f = u && u.message ? u.message : "Network Error", E = new g1(f, g1.ERR_NETWORK, e, d);
      E.event = u || null, o(E), d = null;
    }, d.ontimeout = function() {
      let u = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
      const f = n.transitional || $9;
      n.timeoutErrorMessage && (u = n.timeoutErrorMessage), o(new g1(
        u,
        f.clarifyTimeoutError ? g1.ETIMEDOUT : g1.ECONNABORTED,
        e,
        d
      )), d = null;
    }, r === void 0 && q.setContentType(null), "setRequestHeader" in d && X.forEach(q.toJSON(), function(u, f) {
      d.setRequestHeader(f, u);
    }), X.isUndefined(n.withCredentials) || (d.withCredentials = !!n.withCredentials), c && c !== "json" && (d.responseType = n.responseType), a && ([v, x] = V2(a, !0), d.addEventListener("progress", v)), i && d.upload && ([m, A] = V2(i), d.upload.addEventListener("progress", m), d.upload.addEventListener("loadend", A)), (n.cancelToken || n.signal) && (s = (g) => {
      d && (o(!g || g.type ? new $4(null, e, d) : g), d.abort(), d = null);
    }, n.cancelToken && n.cancelToken.subscribe(s), n.signal && (n.signal.aborted ? s() : n.signal.addEventListener("abort", s)));
    const S = tl(n.url);
    if (S && $1.protocols.indexOf(S) === -1) {
      o(new g1("Unsupported protocol " + S + ":", g1.ERR_BAD_REQUEST, e));
      return;
    }
    d.send(r || null);
  });
}, ul = (e, l) => {
  const { length: t } = e = e ? e.filter(Boolean) : [];
  if (l || t) {
    let o = new AbortController(), n;
    const r = function(a) {
      if (!n) {
        n = !0, c();
        const s = a instanceof Error ? a : this.reason;
        o.abort(s instanceof g1 ? s : new $4(s instanceof Error ? s.message : s));
      }
    };
    let q = l && setTimeout(() => {
      q = null, r(new g1(`timeout ${l} of ms exceeded`, g1.ETIMEDOUT));
    }, l);
    const c = () => {
      e && (q && clearTimeout(q), q = null, e.forEach((a) => {
        a.unsubscribe ? a.unsubscribe(r) : a.removeEventListener("abort", r);
      }), e = null);
    };
    e.forEach((a) => a.addEventListener("abort", r));
    const { signal: i } = o;
    return i.unsubscribe = () => X.asap(c), i;
  }
}, ml = function* (e, l) {
  let t = e.byteLength;
  if (t < l) {
    yield e;
    return;
  }
  let o = 0, n;
  for (; o < t; )
    n = o + l, yield e.slice(o, n), o = n;
}, dl = async function* (e, l) {
  for await (const t of fl(e))
    yield* ml(t, l);
}, fl = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const l = e.getReader();
  try {
    for (; ; ) {
      const { done: t, value: o } = await l.read();
      if (t)
        break;
      yield o;
    }
  } finally {
    await l.cancel();
  }
}, d8 = (e, l, t, o) => {
  const n = dl(e, l);
  let r = 0, q, c = (i) => {
    q || (q = !0, o && o(i));
  };
  return new ReadableStream({
    async pull(i) {
      try {
        const { done: a, value: s } = await n.next();
        if (a) {
          c(), i.close();
          return;
        }
        let m = s.byteLength;
        if (t) {
          let v = r += m;
          t(v);
        }
        i.enqueue(new Uint8Array(s));
      } catch (a) {
        throw c(a), a;
      }
    },
    cancel(i) {
      return c(i), n.return();
    }
  }, {
    highWaterMark: 2
  });
}, f8 = 64 * 1024, { isFunction: _2 } = X, xl = (({ Request: e, Response: l }) => ({
  Request: e,
  Response: l
}))(X.global), {
  ReadableStream: x8,
  TextEncoder: h8
} = X.global, p8 = (e, ...l) => {
  try {
    return !!e(...l);
  } catch {
    return !1;
  }
}, hl = (e) => {
  e = X.merge.call({
    skipUndefined: !0
  }, xl, e);
  const { fetch: l, Request: t, Response: o } = e, n = l ? _2(l) : typeof fetch == "function", r = _2(t), q = _2(o);
  if (!n)
    return !1;
  const c = n && _2(x8), i = n && (typeof h8 == "function" ? /* @__PURE__ */ ((x) => (p) => x.encode(p))(new h8()) : async (x) => new Uint8Array(await new t(x).arrayBuffer())), a = r && c && p8(() => {
    let x = !1;
    const p = new t($1.origin, {
      body: new x8(),
      method: "POST",
      get duplex() {
        return x = !0, "half";
      }
    }).headers.has("Content-Type");
    return x && !p;
  }), s = q && c && p8(() => X.isReadableStream(new o("").body)), m = {
    stream: s && ((x) => x.body)
  };
  n && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((x) => {
    !m[x] && (m[x] = (p, d) => {
      let _ = p && p[x];
      if (_)
        return _.call(p);
      throw new g1(`Response type '${x}' is not supported`, g1.ERR_NOT_SUPPORT, d);
    });
  });
  const v = async (x) => {
    if (x == null)
      return 0;
    if (X.isBlob(x))
      return x.size;
    if (X.isSpecCompliantForm(x))
      return (await new t($1.origin, {
        method: "POST",
        body: x
      }).arrayBuffer()).byteLength;
    if (X.isArrayBufferView(x) || X.isArrayBuffer(x))
      return x.byteLength;
    if (X.isURLSearchParams(x) && (x = x + ""), X.isString(x))
      return (await i(x)).byteLength;
  }, A = async (x, p) => {
    const d = X.toFiniteNumber(x.getContentLength());
    return d ?? v(p);
  };
  return async (x) => {
    let {
      url: p,
      method: d,
      data: _,
      signal: S,
      cancelToken: g,
      timeout: u,
      onDownloadProgress: f,
      onUploadProgress: E,
      responseType: C,
      headers: w,
      withCredentials: F = "same-origin",
      fetchOptions: D
    } = t5(x), e1 = l || fetch;
    C = C ? (C + "").toLowerCase() : "text";
    let j = ul([S, g && g.toAbortSignal()], u), l1 = null;
    const $ = j && j.unsubscribe && (() => {
      j.unsubscribe();
    });
    let Q;
    try {
      if (E && a && d !== "get" && d !== "head" && (Q = await A(w, _)) !== 0) {
        let M = new t(p, {
          method: "POST",
          body: _,
          duplex: "half"
        }), W;
        if (X.isFormData(_) && (W = M.headers.get("content-type")) && w.setContentType(W), M.body) {
          const [H, z] = c8(
            Q,
            V2(u8(E))
          );
          _ = d8(M.body, f8, H, z);
        }
      }
      X.isString(F) || (F = F ? "include" : "omit");
      const Z = r && "credentials" in t.prototype, J = {
        ...D,
        signal: j,
        method: d.toUpperCase(),
        headers: w.normalize().toJSON(),
        body: _,
        duplex: "half",
        credentials: Z ? F : void 0
      };
      l1 = r && new t(p, J);
      let P = await (r ? e1(l1, D) : e1(p, J));
      const q1 = s && (C === "stream" || C === "response");
      if (s && (f || q1 && $)) {
        const M = {};
        ["status", "statusText", "headers"].forEach((I) => {
          M[I] = P[I];
        });
        const W = X.toFiniteNumber(P.headers.get("content-length")), [H, z] = f && c8(
          W,
          V2(u8(f), !0)
        ) || [];
        P = new o(
          d8(P.body, f8, H, () => {
            z && z(), $ && $();
          }),
          M
        );
      }
      C = C || "text";
      let B = await m[X.findKey(m, C) || "text"](P, x);
      return !q1 && $ && $(), await new Promise((M, W) => {
        e5(M, W, {
          data: B,
          headers: n4.from(P.headers),
          status: P.status,
          statusText: P.statusText,
          config: x,
          request: l1
        });
      });
    } catch (Z) {
      throw $ && $(), Z && Z.name === "TypeError" && /Load failed|fetch/i.test(Z.message) ? Object.assign(
        new g1("Network Error", g1.ERR_NETWORK, x, l1),
        {
          cause: Z.cause || Z
        }
      ) : g1.from(Z, Z && Z.code, x, l1);
    }
  };
}, pl = /* @__PURE__ */ new Map(), n5 = (e) => {
  let l = e && e.env || {};
  const { fetch: t, Request: o, Response: n } = l, r = [
    o,
    n,
    t
  ];
  let q = r.length, c = q, i, a, s = pl;
  for (; c--; )
    i = r[c], a = s.get(i), a === void 0 && s.set(i, a = c ? /* @__PURE__ */ new Map() : hl(l)), s = a;
  return a;
};
n5();
const z6 = {
  http: M0,
  xhr: cl,
  fetch: {
    get: n5
  }
};
X.forEach(z6, (e, l) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: l });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: l });
  }
});
const g8 = (e) => `- ${e}`, gl = (e) => X.isFunction(e) || e === null || e === !1;
function bl(e, l) {
  e = X.isArray(e) ? e : [e];
  const { length: t } = e;
  let o, n;
  const r = {};
  for (let q = 0; q < t; q++) {
    o = e[q];
    let c;
    if (n = o, !gl(o) && (n = z6[(c = String(o)).toLowerCase()], n === void 0))
      throw new g1(`Unknown adapter '${c}'`);
    if (n && (X.isFunction(n) || (n = n.get(l))))
      break;
    r[c || "#" + q] = n;
  }
  if (!n) {
    const q = Object.entries(r).map(
      ([i, a]) => `adapter ${i} ` + (a === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let c = t ? q.length > 1 ? `since :
` + q.map(g8).join(`
`) : " " + g8(q[0]) : "as no adapter specified";
    throw new g1(
      "There is no suitable adapter to dispatch the request " + c,
      "ERR_NOT_SUPPORT"
    );
  }
  return n;
}
const o5 = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: bl,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: z6
};
function C3(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new $4(null, e);
}
function b8(e) {
  return C3(e), e.headers = n4.from(e.headers), e.data = I3.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), o5.getAdapter(e.adapter || f2.adapter, e)(e).then(function(o) {
    return C3(e), o.data = I3.call(
      e,
      e.transformResponse,
      o
    ), o.headers = n4.from(o.headers), o;
  }, function(o) {
    return K9(o) || (C3(e), o && o.response && (o.response.data = I3.call(
      e,
      e.transformResponse,
      o.response
    ), o.response.headers = n4.from(o.response.headers))), Promise.reject(o);
  });
}
const r5 = "1.13.2", r3 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, l) => {
  r3[e] = function(o) {
    return typeof o === e || "a" + (l < 1 ? "n " : " ") + e;
  };
});
const _8 = {};
r3.transitional = function(l, t, o) {
  function n(r, q) {
    return "[Axios v" + r5 + "] Transitional option '" + r + "'" + q + (o ? ". " + o : "");
  }
  return (r, q, c) => {
    if (l === !1)
      throw new g1(
        n(q, " has been removed" + (t ? " in " + t : "")),
        g1.ERR_DEPRECATED
      );
    return t && !_8[q] && (_8[q] = !0, console.warn(
      n(
        q,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), l ? l(r, q, c) : !0;
  };
};
r3.spelling = function(l) {
  return (t, o) => (console.warn(`${o} is likely a misspelling of ${l}`), !0);
};
function _l(e, l, t) {
  if (typeof e != "object")
    throw new g1("options must be an object", g1.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(e);
  let n = o.length;
  for (; n-- > 0; ) {
    const r = o[n], q = l[r];
    if (q) {
      const c = e[r], i = c === void 0 || q(c, r, e);
      if (i !== !0)
        throw new g1("option " + r + " must be " + i, g1.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new g1("Unknown option " + r, g1.ERR_BAD_OPTION);
  }
}
const M2 = {
  assertOptions: _l,
  validators: r3
}, c4 = M2.validators;
let O4 = class {
  constructor(l) {
    this.defaults = l || {}, this.interceptors = {
      request: new a8(),
      response: new a8()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(l, t) {
    try {
      return await this._request(l, t);
    } catch (o) {
      if (o instanceof Error) {
        let n = {};
        Error.captureStackTrace ? Error.captureStackTrace(n) : n = new Error();
        const r = n.stack ? n.stack.replace(/^.+\n/, "") : "";
        try {
          o.stack ? r && !String(o.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (o.stack += `
` + r) : o.stack = r;
        } catch {
        }
      }
      throw o;
    }
  }
  _request(l, t) {
    typeof l == "string" ? (t = t || {}, t.url = l) : t = l || {}, t = N4(this.defaults, t);
    const { transitional: o, paramsSerializer: n, headers: r } = t;
    o !== void 0 && M2.assertOptions(o, {
      silentJSONParsing: c4.transitional(c4.boolean),
      forcedJSONParsing: c4.transitional(c4.boolean),
      clarifyTimeoutError: c4.transitional(c4.boolean)
    }, !1), n != null && (X.isFunction(n) ? t.paramsSerializer = {
      serialize: n
    } : M2.assertOptions(n, {
      encode: c4.function,
      serialize: c4.function
    }, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), M2.assertOptions(t, {
      baseUrl: c4.spelling("baseURL"),
      withXsrfToken: c4.spelling("withXSRFToken")
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let q = r && X.merge(
      r.common,
      r[t.method]
    );
    r && X.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (x) => {
        delete r[x];
      }
    ), t.headers = n4.concat(q, r);
    const c = [];
    let i = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(t) === !1 || (i = i && p.synchronous, c.unshift(p.fulfilled, p.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function(p) {
      a.push(p.fulfilled, p.rejected);
    });
    let s, m = 0, v;
    if (!i) {
      const x = [b8.bind(this), void 0];
      for (x.unshift(...c), x.push(...a), v = x.length, s = Promise.resolve(t); m < v; )
        s = s.then(x[m++], x[m++]);
      return s;
    }
    v = c.length;
    let A = t;
    for (; m < v; ) {
      const x = c[m++], p = c[m++];
      try {
        A = x(A);
      } catch (d) {
        p.call(this, d);
        break;
      }
    }
    try {
      s = b8.call(this, A);
    } catch (x) {
      return Promise.reject(x);
    }
    for (m = 0, v = a.length; m < v; )
      s = s.then(a[m++], a[m++]);
    return s;
  }
  getUri(l) {
    l = N4(this.defaults, l);
    const t = l5(l.baseURL, l.url, l.allowAbsoluteUrls);
    return U9(t, l.params, l.paramsSerializer);
  }
};
X.forEach(["delete", "get", "head", "options"], function(l) {
  O4.prototype[l] = function(t, o) {
    return this.request(N4(o || {}, {
      method: l,
      url: t,
      data: (o || {}).data
    }));
  };
});
X.forEach(["post", "put", "patch"], function(l) {
  function t(o) {
    return function(r, q, c) {
      return this.request(N4(c || {}, {
        method: l,
        headers: o ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: q
      }));
    };
  }
  O4.prototype[l] = t(), O4.prototype[l + "Form"] = t(!0);
});
let vl = class q5 {
  constructor(l) {
    if (typeof l != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(r) {
      t = r;
    });
    const o = this;
    this.promise.then((n) => {
      if (!o._listeners) return;
      let r = o._listeners.length;
      for (; r-- > 0; )
        o._listeners[r](n);
      o._listeners = null;
    }), this.promise.then = (n) => {
      let r;
      const q = new Promise((c) => {
        o.subscribe(c), r = c;
      }).then(n);
      return q.cancel = function() {
        o.unsubscribe(r);
      }, q;
    }, l(function(r, q, c) {
      o.reason || (o.reason = new $4(r, q, c), t(o.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(l) {
    if (this.reason) {
      l(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(l) : this._listeners = [l];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(l) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(l);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const l = new AbortController(), t = (o) => {
      l.abort(o);
    };
    return this.subscribe(t), l.signal.unsubscribe = () => this.unsubscribe(t), l.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let l;
    return {
      token: new q5(function(n) {
        l = n;
      }),
      cancel: l
    };
  }
};
function yl(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function Il(e) {
  return X.isObject(e) && e.isAxiosError === !0;
}
const U3 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(U3).forEach(([e, l]) => {
  U3[l] = e;
});
function i5(e) {
  const l = new O4(e), t = B9(O4.prototype.request, l);
  return X.extend(t, O4.prototype, l, { allOwnKeys: !0 }), X.extend(t, l, null, { allOwnKeys: !0 }), t.create = function(n) {
    return i5(N4(e, n));
  }, t;
}
const G1 = i5(f2);
G1.Axios = O4;
G1.CanceledError = $4;
G1.CancelToken = vl;
G1.isCancel = K9;
G1.VERSION = r5;
G1.toFormData = o3;
G1.AxiosError = g1;
G1.Cancel = G1.CanceledError;
G1.all = function(l) {
  return Promise.all(l);
};
G1.spread = yl;
G1.isAxiosError = Il;
G1.mergeConfig = N4;
G1.AxiosHeaders = n4;
G1.formToJSON = (e) => Q9(X.isHTMLForm(e) ? new FormData(e) : e);
G1.getAdapter = o5.getAdapter;
G1.HttpStatusCode = U3;
G1.default = G1;
const {
  Axios: Ga,
  AxiosError: ka,
  CanceledError: Da,
  isCancel: Va,
  CancelToken: Wa,
  VERSION: ja,
  all: Xa,
  Cancel: Ha,
  isAxiosError: Za,
  spread: Ya,
  toFormData: Ja,
  AxiosHeaders: Ua,
  HttpStatusCode: $a,
  formToJSON: Qa,
  getAdapter: Ka,
  mergeConfig: es
} = G1, Cl = (e) => ({
  getMapData: () => new Promise((q, c) => {
    e("/v1/mapit2/data").then((i) => {
      var s, m;
      const a = [];
      if ((s = i == null ? void 0 : i.data) != null && s.items)
        for (const v of (m = i == null ? void 0 : i.data) == null ? void 0 : m.items)
          a.push({
            id: v.id,
            retailer_id: v.retailer_id,
            kiosk_id: v.kiosk_id,
            map_obj_name: v.map_obj_name,
            obj_type: v.obj_type,
            layer_type: v.layer_type,
            value: v.value,
            custom_text: v.custom_text,
            custom_image: v.custom_image,
            bg_color: v.bg_color,
            transparent: v.transparent,
            text_color: v.text_color,
            size: parseInt(v.size),
            rotate: parseInt(v.rotate),
            offset_x: parseInt(v.offset_x),
            offset_y: parseInt(v.offset_y),
            lock_size: !1
          });
      q(a);
    }).catch((i) => {
      console.error("Error mapApiService:getMapData()", i), q([]);
    });
  }),
  getMapFloors: () => new Promise((q, c) => {
    e("/v1/mapit2/floors?limit=100&offset=0").then((i) => {
      var s, m;
      const a = [];
      if ((s = i == null ? void 0 : i.data) != null && s.items)
        for (const v of (m = i == null ? void 0 : i.data) == null ? void 0 : m.items)
          a.push({
            id: v.id,
            name: v.title,
            svgUrl: v.svg
          });
      q(a);
    }).catch((i) => {
      console.error("Error mapApiService:getMapFloors()", i), q([]);
    });
  }),
  getMapKiosks: () => new Promise((q, c) => {
    e("/v1/display_kiosks?limit=100&page=1&display_type_id=1").then((i) => {
      var s, m;
      const a = [];
      if ((s = i == null ? void 0 : i.data) != null && s.items)
        for (const v of (m = i == null ? void 0 : i.data) == null ? void 0 : m.items)
          a.push({
            id: v.id,
            name: v.title
          });
      q(a);
    }).catch((i) => {
      console.error("Error mapApiService:getMapKiosks()", i), q([]);
    });
  }),
  getMapSettings: () => new Promise((q, c) => {
    e("/v1/mapit2/settings").then((i) => {
      var v, A;
      const a = { ...S4 };
      let s = V1;
      (v = i == null ? void 0 : i.data) != null && v.settings && (s = (A = i == null ? void 0 : i.data) == null ? void 0 : A.settings, s.MAP_BACKGROUND_COLOR && (a.MAP_BACKGROUND_COLOR = k1(s.MAP_BACKGROUND_COLOR)), s.STORE_DEFAULT_COLOR && (a.STORE_DEFAULT_COLOR = k1(s.STORE_DEFAULT_COLOR)), s.ACCENT_COLOR && (a.ACCENT_COLOR = k1(s.ACCENT_COLOR)), s.BASE_COLOR && (a.BASE_COLOR = k1(s.BASE_COLOR)), s.BOUNDARY_COLOR && (a.BOUNDARY_COLOR = k1(s.BOUNDARY_COLOR)), s.BASE_COLOR && (a.BASE_COLOR = k1(s.BASE_COLOR)), s.WALL_COLOR && (a.WALL_COLOR = k1(s.WALL_COLOR)), s.STORE_TEXT_COLOR && (a.STORE_TEXT_COLOR = k1(s.STORE_TEXT_COLOR)), s.OVERLAY_COLOR && (a.OVERLAY_COLOR = k1(s.OVERLAY_COLOR)), s.BOUNDARY_THICKNESS && (a.BOUNDARY_THICKNESS = s.BOUNDARY_THICKNESS), s.WALL_THICKNESS && (a.WALL_THICKNESS = s.WALL_THICKNESS), s.OVERLAY_OPACITY && (a.OVERLAY_OPACITY = s.OVERLAY_OPACITY), s.KIOSK_SIZE && (a.KIOSK_SIZE = s.KIOSK_SIZE), s.ZOOM_STEP && (a.ZOOM_STEP = s.ZOOM_STEP), s.SELECTED_ZOOM_LIMIT && (a.SELECTED_ZOOM_LIMIT = s.SELECTED_ZOOM_LIMIT), a.CAMERA.minDistance = s.CAMERA_MIN_DISTANCE ? s.CAMERA_MIN_DISTANCE : a.CAMERA.minDistance, a.CAMERA.maxDistance = s.CAMERA_MAX_DISTANCE ? s.CAMERA_MAX_DISTANCE : a.CAMERA.maxDistance, a.CAMERA = { ...a.CAMERA });
      const m = { ...a };
      delete m.DEVICE, delete m.ROLE, q({
        apiResponse: s,
        responseConfig: m
      });
    }).catch((i) => {
      console.error("Error mapApiService:getMapSettings()", i), q({
        apiResponse: V1,
        responseConfig: S4
      });
    });
  }),
  getMapResponsiveSettings: () => new Promise((q, c) => {
    e("/v1/mapit2/responsive").then((i) => {
      const a = { ...S4.CAMERA_CONTROLS_STATES };
      if (i.data)
        if (Array.isArray(i.data)) {
          a.perFloor = a.perFloor || {};
          for (const s of i.data)
            a.perFloor[s.floor_id] = s, a.perFloor[s.floor_id].display_app = s.display_app || JSON.parse(JSON.stringify(f4)), a.perFloor[s.floor_id].desktop = s.desktop || JSON.parse(JSON.stringify(f4)), a.perFloor[s.floor_id].tablet = s.tablet || JSON.parse(JSON.stringify(f4)), a.perFloor[s.floor_id].mobile = s.mobile || JSON.parse(JSON.stringify(f4));
        } else
          i.data.display_app && (a.display_app = i.data.display_app), i.data.desktop && (a.desktop = i.data.desktop), i.data.tablet && (a.tablet = i.data.tablet), i.data.mobile && (a.mobile = i.data.mobile), i.data.perFloor && (a.perFloor = i.data.perFloor);
      q(a);
    }).catch((i) => {
      console.error("Error mapApiService:getMapResponsiveSettings()", i), q({ ...S4.CAMERA_CONTROLS_STATES });
    });
  })
}), El = (e) => ({
  getAllRetailers: () => new Promise((o, n) => {
    let r = [];
    const q = (c = 1) => {
      e(`/v1/retailers?limit=100&page=${c}`).then((i) => {
        var a, s;
        if ((a = i == null ? void 0 : i.data) != null && a.items)
          if (r = [...r, ...i.data.items], i.data.count > r.length)
            q(c + 1);
          else {
            const m = [], v = [];
            for (const A of r) {
              const x = {
                id: A.id,
                location: A.location,
                retailer_phone: A.retailer_phone,
                map_obj_name: ""
              };
              A.global_retailer ? (x.global_retailer_id = A.global_retailer.id, x.retail_name = A.global_retailer.name, x.slug = A.global_retailer.slug, x.retailer_description = A.global_retailer.description, x.logo = ((s = A.global_retailer.media) == null ? void 0 : s.url) || "") : (x.global_retailer_id = A.global_retailer_id, x.retail_name = A.name, x.slug = A.slug, x.retailer_description = A.description, x.logo = A.media.url || ""), m.push(x), v.push(A.global_retailer_id);
            }
            m.sort((A, x) => {
              const p = (A.retail_name || "").toLowerCase(), d = (x.retail_name || "").toLowerCase();
              return p < d ? -1 : p > d ? 1 : 0;
            }), o({ retailers: m, globalRetailerIds: v });
          }
      }).catch((i) => {
        console.error("Error fetching retailers", i), o({ retailers: [], globalRetailerIds: [] });
      });
    };
    q();
  }),
  getRetailer: (o) => new Promise((n, r) => {
    e(`/v1/retailers/${o}`).then((q) => {
      var c;
      if ((c = q == null ? void 0 : q.data) != null && c.id) {
        const i = q == null ? void 0 : q.data, a = {
          id: i.id,
          global_retailer_id: i.global_retailer_id,
          retail_name: i.name,
          slug: i.slug,
          retailer_description: i.description,
          location: i.location,
          retailer_phone: i.retailer_phone,
          logo: i.media.url || "",
          map_obj_name: "",
          opening_hours: i.opening_hours
        };
        n(a);
      }
    }).catch((q) => {
      console.error("Error fetching retailers", q), r(q);
    });
  })
}), Al = (e, l) => {
  const t = {
    baseURL: e,
    timeout: 3e4,
    // Set the request timeout in milliseconds
    withCredentials: !0,
    headers: {
      "Content-Type": "application/json"
    },
    params: l.ROLE === "PORTAL" || l.ROLE === "PORTAL_RESPONSIVE" ? {
      center_id: l.CENTER_ID
    } : void 0
  }, o = G1.create(t), n = (c) => {
    console.error("Axios Interceptor Error: ", c.response);
  };
  o.interceptors.response.use(
    (c) => c,
    n
  );
  const r = Cl(o), q = El(o);
  return {
    mapApiService: r,
    retailersService: q
  };
}, a5 = d6(void 0), Sl = ({ children: e, initialData: l, mapApiResponseRef: t }) => {
  const o = l.webApiBaseUrl, [n, r] = c1(!0), [q, c] = c1(!1), [i, a] = c1({ ...S4, ...l.config }), [s, m] = c1({
    retailers: [],
    globalRetailerIds: [],
    floors: [],
    kiosks: [],
    map_objs: [],
    mapSettings: V1
  });
  t && (t.current = s);
  const [v, A] = c1(/* @__PURE__ */ new Map()), [x, p] = c1([]), [d, _] = c1({}), [S, g] = c1({}), [u, f] = c1({}), [E, C] = c1([]), [w, F] = c1({}), [D, e1] = c1(Ae()), [j, l1] = c1(Ye), [$, Q] = c1(null), [Z, J] = c1(), P = W1(() => Al(o, i), [o, i.CENTER_ID]);
  p1(() => {
    a((M) => ({ ...M, ...l.config }));
  }, [l.config, l.config.CENTER_ID]);
  const q1 = r1(() => {
    Promise.all([
      P.retailersService.getAllRetailers(),
      P.mapApiService.getMapData(),
      P.mapApiService.getMapFloors(),
      P.mapApiService.getMapKiosks(),
      P.mapApiService.getMapSettings(),
      P.mapApiService.getMapResponsiveSettings()
    ]).then(([
      { retailers: M, globalRetailerIds: W },
      H,
      z,
      I,
      b,
      h
    ]) => {
      const R = H.map((k) => k.map_obj_name);
      H = H.filter((k, N) => R.indexOf(k.map_obj_name) === N), m({
        retailers: M,
        globalRetailerIds: W,
        map_objs: H,
        floors: z,
        kiosks: I,
        mapSettings: b.apiResponse
      }), a((k) => ({
        ...k,
        ...b.responseConfig,
        CAMERA_CONTROLS_STATES: h,
        CENTER_ID: l.config.CENTER_ID || k.CENTER_ID,
        KIOSK_ID: l.config.KIOSK_ID || k.KIOSK_ID,
        SELECTED_RETAILER_ID: l.config.SELECTED_RETAILER_ID || k.SELECTED_RETAILER_ID
      })), g(M.reduce(
        (k, N) => (k[N.id] = N, k),
        {}
      )), f(I.reduce(
        (k, N) => {
          k[N.id] = N;
          const K = H.find((T) => T.kiosk_id === N.id);
          return K && (k[N.id].map_obj_name = K.map_obj_name), k;
        },
        {}
      )), _(H.reduce(
        (k, N) => (k[N.map_obj_name] = { ...T2, ...N }, k),
        {}
      )), C(z.map((k) => {
        const N = new J7();
        return N.scale.y *= -1, N.lookAt(0, 1, 0), {
          ...k,
          objsGroup: N,
          interactiveObjs: [],
          escalatorsObjs: [],
          escalatorsNodes: {},
          escalatorMeshes: [],
          route_points: [],
          route_tube: void 0,
          route_texture: null,
          routeMeshes: [],
          route_active: !1
        };
      })), c(!0);
    }).catch((M) => {
      console.error("Error: MapBoxContextProvider fetching api data:", M), c(!0);
    });
  }, [P]);
  p1(() => {
    c(!1), q1();
  }, [q1]);
  const B = {
    refetchMapData: q1,
    apiServices: P,
    loading: n,
    setLoading: r,
    initialFloorsDataIsLoaded: q,
    setInitialFloorsDataIsLoaded: c,
    mapConfig: i,
    setMapConfig: a,
    mapApiResponse: s,
    setMapApiResponse: m,
    meshByObjectId: v,
    setMeshByObjectId: A,
    allMapObjects: x,
    setAllMapObjects: p,
    allIndexedMapObjects: d,
    setAllIndexedMapObjects: _,
    allIndexedRetailers: S,
    setAllIndexedRetailers: g,
    indexedKiosks: u,
    setIndexedKiosks: f,
    floorsData: E,
    setFloorsData: C,
    allNodesFloor: w,
    setAllNodesFloor: F,
    pathFinderGraph: D,
    setPathFinderGraph: e1,
    ngraphPath: j,
    setNgraphPath: l1,
    meshObject: $,
    setMeshObject: Q,
    cameraLength: Z,
    setCameraLength: J
  };
  return /* @__PURE__ */ G(a5.Provider, { value: B, children: e });
};
function r4() {
  const e = Q1(a5);
  if (e === void 0)
    throw new Error("useMapBoxContext must be used within MapBoxContextProvider");
  return e;
}
function Rl(e, l = 3, t = 0) {
  let o = new R9(), n = new w1(e.v1.x, e.v1.y, 0), r = new w1(e.v2.x, e.v2.y, 0), q = r.clone().sub(n).normalize().multiplyScalar(-l * t), c = n.clone().add(q);
  q = n.clone().sub(r).normalize().multiplyScalar(-l * t);
  let i = r.clone().add(q), a = n.distanceTo(i), s = {
    x: c.x - (r.y - c.y) * l / a,
    y: c.y - (c.x - r.x) * l / a
  }, m = {
    x: c.x + (r.y - c.y) * l / a,
    y: c.y + (c.x - r.x) * l / a
  }, v = {
    x: i.x + (n.y - i.y) * l / a,
    y: i.y + (i.x - n.x) * l / a
  }, A = {
    x: i.x - (n.y - i.y) * l / a,
    y: i.y - (i.x - n.x) * l / a
  };
  return o.moveTo(s.x, s.y), o.lineTo(m.x, m.y), o.lineTo(A.x, A.y), o.lineTo(v.x, v.y), o;
}
const zl = (e, l) => {
  const t = e[0].index !== null, o = new Set(Object.keys(e[0].attributes)), n = new Set(Object.keys(e[0].morphAttributes)), r = {}, q = {}, c = e[0].morphTargetsRelative, i = new p6();
  if (e.forEach((a, s) => {
    let m = 0;
    if (t !== (a.index !== null))
      return console.error(
        "THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + s + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."
      ), null;
    for (let v in a.attributes) {
      if (!o.has(v))
        return console.error(
          "THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + s + '. All geometries must have compatible attributes; make sure "' + v + '" attribute exists among all geometries, or in none of them.'
        ), null;
      r[v] === void 0 && (r[v] = []), r[v].push(a.attributes[v]), m++;
    }
    if (m !== o.size)
      return console.error(
        "THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + s + ". Make sure all geometries have the same number of attributes."
      ), null;
    if (c !== a.morphTargetsRelative)
      return console.error(
        "THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + s + ". .morphTargetsRelative must be consistent throughout all geometries."
      ), null;
    for (let v in a.morphAttributes) {
      if (!n.has(v))
        return console.error(
          "THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + s + ".  .morphAttributes must be consistent throughout all geometries."
        ), null;
      q[v] === void 0 && (q[v] = []), q[v].push(a.morphAttributes[v]);
    }
    i.userData.mergedUserData = i.userData.mergedUserData || [], i.userData.mergedUserData.push(a.userData);
  }), t) {
    let a = 0;
    const s = [];
    e.forEach((m) => {
      const v = m.index;
      for (let A = 0; A < v.count; ++A)
        s.push(v.getX(A) + a);
      a += m.attributes.position.count;
    }), i.setIndex(s);
  }
  for (let a in r) {
    const s = v8(r[a]);
    if (!s)
      return console.error(
        "THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the " + a + " attribute."
      ), null;
    i.setAttribute(a, s);
  }
  for (let a in q) {
    const s = q[a][0].length;
    if (s === 0)
      break;
    i.morphAttributes = i.morphAttributes || {}, i.morphAttributes[a] = [];
    for (let m = 0; m < s; ++m) {
      const v = [];
      for (let x = 0; x < q[a].length; ++x)
        v.push(q[a][x][m]);
      const A = v8(v);
      if (!A)
        return console.error(
          "THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the " + a + " morphAttribute."
        ), null;
      i.morphAttributes[a].push(A);
    }
  }
  return i;
}, v8 = (e) => {
  let l, t, o, n = 0;
  if (e.forEach((r) => {
    if (l === void 0 && (l = r.array.constructor), l !== r.array.constructor)
      return console.error(
        "THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."
      ), null;
    if (t === void 0 && (t = r.itemSize), t !== r.itemSize)
      return console.error(
        "THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."
      ), null;
    if (o === void 0 && (o = r.normalized), o !== r.normalized)
      return console.error(
        "THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."
      ), null;
    n += r.array.length;
  }), l && t) {
    const r = new l(n);
    let q = 0;
    return e.forEach((c) => {
      r.set(c.array, q), q += c.array.length;
    }), new U7(r, t, o);
  }
};
class s5 extends H3 {
  constructor(l, t = {}) {
    const {
      bevelEnabled: o = !1,
      bevelSize: n = 8,
      bevelThickness: r = 10,
      font: q,
      height: c = 50,
      size: i = 100,
      lineHeight: a = 1,
      letterSpacing: s = 0,
      ...m
    } = t;
    if (q === void 0)
      super();
    else {
      const v = q.generateShapes(l, i, { lineHeight: a, letterSpacing: s });
      super(v, { ...m, bevelEnabled: o, bevelSize: n, bevelThickness: r, depth: c });
    }
    this.type = "TextGeometry";
  }
}
const K1 = {
  Kiosk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443.83 787.21">
            <path fill="#444444" d="M451,587.7V8.14H7.14V589.5H111.43V730.89H71.27L38.59,763.58v31.78H416.36V764.93l-34.05-34H345.78V587.7ZM396.91,71.23v452.7H59.85V71.23Z" transform="translate(-7.14 -8.14)" />
          </svg>`,
  Escalator: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 445.3">
                <path fill="#444444" d="M243.4,75.9c21.2,0,38.1-16.8,38.1-38S264.6,0,243.4,0c-21.2,0-38.1,16.8-38.1,38S222.1,75.9,243.4,75.9z M508.5,41.2h-88.7 c-18.5,0-41.9,7.6-56.1,21.7l-82.2,81.9V121c0-51-75.7-50.4-75.7,0v98.2l-71.3,71c-6.5,6.5-7.6,7.1-20.7,7.1H70.2 C26.1,297.2,0,336.8,0,369.9c0,33.6,26.1,75.4,74,75.4h77.9c18.5,0,40.8-7.1,58.8-24.4l228.1-226.7c4.9-4.3,7.6-5.4,15.8-5.4h56.1 c27.2,0,65.3-30.4,65.3-74.8C576.5,70.5,537.9,41.2,508.5,41.2z M504.7,150.8h-47.9c-20.1,0-29.4,2.7-41.4,14.7L185.7,394.3 c-9.3,9.2-21.2,13-36.5,13H73.5c-19.6,0-36.5-16.3-36.5-38c0-21.7,16.3-33.6,33.2-33.6H122c15.2,0,25-4.3,33.7-13L389.3,90 c9.8-9.8,19.1-10.9,35.4-10.9h80c19.6,0,32.7,21.7,32.7,34.7C537.9,126.4,528.6,150.8,504.7,150.8z" />
              </svg>`,
  ATM: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 577.8 577">
          <path fill="#444444" d="M388.7,314c-3.7-10.3-10.3-19.8-17.7-27.2c-7.4-7.4-17.7-14-29.5-19.1c-6.6-2.9-19.2-6.6-39.1-11.8V144.2 c13.3,2.2,22.8,8.1,30.2,16.2c7.4,8.1,11.8,19.9,14,35.3l39.8-5.9c-2.9-24.3-13.3-44.1-30.2-58.1c-13.3-11-31-17.7-53.8-19.8V93.4 h-24.3v18.4c-25.8,2.2-45,9.6-58.2,21.3c-19.9,17.7-29.5,39.7-29.5,67.6c0,15.5,3.7,29.4,10.3,41.9s16.2,22,28.7,28.7 c17,9.6,33.2,16.2,49.4,20.6v121.3c-14.8-1.5-28-8.8-39.1-22.8c-7.4-9.6-13.3-25-16.2-46.3l-39.1,7.4c1.5,20.6,6.6,37.5,15.5,51.5 s19.9,23.5,31.7,30.1c12.5,6.6,28,11,47.9,13.2v39v-0.1V483h22.1v-39c28-0.7,50.1-11,67.1-28.7c17-18.4,25.8-40.4,25.8-67.6 C394.6,336,392.4,324.3,388.7,314z M278.9,145.1v107.2c-17.7-5.2-30.2-11.8-37.6-20.6s-11.1-19.8-11.1-33.1c0-14,4.4-25.7,13.3-35.3 C252.2,153.9,263.7,147.4,278.9,145.1V145h0.7C279.3,145,279.1,145,278.9,145.1z M340,394.2c-9.6,11-22.1,18.4-37.6,19.8l0,0V297.9 c20.6,5.2,34.6,11.8,42,20.6c6.6,8.1,10.3,19.8,10.3,33.8C354.8,369.2,349.6,383.1,340,394.2z" />
          <path fill="#444444" d="M289.8,2.5c-158.7,0-288,128-288,287.2c0,158.3,129.3,287.2,288,287.2s288-128.9,288-287.2S448.6,2.5,289.8,2.5z M289.9,533.9C155,533.9,45.2,424.3,45.2,289.8C45.2,154.5,155,45.7,289.9,45.7s244.7,109.5,244.7,244.1S424.8,533.9,289.9,533.9z" />
        </svg>`,
  Management: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 414.6">
                  <path fill="#444444" d="M371.6,180.4c66.8,0,101,58.5,121.4,121.9l16.4,50.4c2.7,8.8-7.5,16.3-16.4,16.3h-56.6l-7.5-27.2 c-17.7-53.1-45-106.2-94.8-125.9c13-8.8,23.9-21.1,30.7-35.4C366.1,180.4,368.8,180.4,371.6,180.4z M441.2,145.7 c64.8,2,98.2,59.2,118.7,121.9l15.7,49.7c2.7,8.8-7.5,17.7-16.4,17.7h-35.5l-12.3-38.1c-16.4-53.1-44.3-106.2-94.8-125.9 C426.2,162.7,434.3,155.2,441.2,145.7z M51.6,334.3H16.8c-9.6,0-19.1-8.2-16.4-17.7l15.7-49.7C35.9,204.2,70.1,147.1,134.9,145 c6.1,9.5,15,18.4,24.6,24.5c-49.8,19.7-77.8,72.8-94.8,125.9L51.6,334.3L51.6,334.3z M437.7,0c35.5,0,64.8,28.6,64.8,64.7 c0,31.3-22.5,57.2-52.5,62.6c3.4-8.8,5.5-18.4,5.5-27.9c0-39.5-27.3-71.5-62.8-81C403.6,6.8,419.3,0,437.7,0L437.7,0z M137.6,0 c17.7,0,34.1,6.8,45,18.4c-35.5,9.5-62.8,41.5-62.8,81c0,9.5,2.1,19.1,5.5,27.9C96,121.9,72.8,96,72.8,64.7 C73.5,28.6,102.1,0,137.6,0L137.6,0z M287.7,0c19.8,0,37.5,8.8,49.8,22.5c-15.7,6.8-29.3,19.1-38.2,34l-3.4,5.5c-2.7,0-5.5,0-7.5,0 c-2,0-6.1,0-8.9,0l-3.4-5.5c-9.6-15-22.5-27.2-38.2-34C250.2,8.9,267.9,0,287.7,0L287.7,0z M287.7,226c66.8,0,101,58.5,122.1,121.9 l15.7,50.4c2.7,8.8-8.2,16.3-16.4,16.3H166.2c-9.6,0-19.8-8.2-16.4-16.3l15.7-50.4C186,284.6,220.8,226,287.7,226z M287.7,81 c35.5,0,64.8,28.6,64.8,64.7s-28.7,64.7-64.8,64.7c-35.5,0-64.8-28.6-64.8-64.7S252.2,81,287.7,81z M138.3,369H82.3 c-9.6,0-19.1-8.2-16.4-16.3l15.7-50.4c21.1-63.3,55.3-121.9,122.1-121.9c2.7,0,5.5,0,7.5,0c6.1,15,17.7,27.2,30.7,35.4 c-49.8,19.7-78.5,72.8-94.8,125.9C147.1,341.8,138.3,369,138.3,369z M203.8,34.7c23.9,0,44.3,12.9,55.9,31.3 c-32.1,12.2-55.9,42.9-55.9,79c0,6.1,0.7,12.2,2.1,18.4h-2.1c-35.5,0-64.8-28.6-64.8-64.7S168.3,34.7,203.8,34.7z M371.6,34.7 c35.5,0,64.8,28.6,64.8,64.7s-29.3,64-64.8,64h-2.7c2.1-6.1,2.7-12.2,2.7-18.4c0-36.8-23.9-66.7-55.9-79 C327.2,47.7,347,34.7,371.6,34.7z" />
                </svg>`,
  PlayArea: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 537.9">
                <path fill="#444444" d="M384.3,137c38,0,68.8-30.7,68.8-68.5S422.3,0,384.3,0s-68.8,30.7-68.8,68.5S346.4,137,384.3,137z" />
                <path fill="#444444" d="M283.3,96c20,26.3,35.9,53.3,67.6,64.4c31.2,11.1,60.5,11.1,83.5-5.3c22.9-16.4,34.7-46.8,54.1-87.2 c18.8-40.4,34.1-48,57-48c23.5,0,31.2,28.1,30.6,39.8s-10.6,31-40,52.7c-49.4,36.3-57.6,108.3-59.4,127.7 c-1.8,19.3-2.9,50.4,17.6,169.2c20.6,118.9-20,125.9-25.3,127.1c-5.3,0.6-21.2,8.2-31.1-16.4c-10-24.6-11.8-91.3-14.1-120 c-2.9-28.7-6.5-70.9-35.9-79c-30-8.2-40.6,39.8-51.7,76.1c-10.6,36.9-40,71.4-72.3,59.1s-29.4-50.4-10-78.5 c19.4-27.5,61.7-57.4,67.6-124.1c5.9-66.8-11.8-69.1-68.2-90.8c-55.8-22.3-60.5-33.4-67.6-48.6s7.6-46.8,31.1-52.7 C239.2,55.1,259.1,63.9,283.3,96L283.3,96z" />
                <path fill="#444444" d="M134.7,251.7c26.9,0,48.8-21.8,48.8-48.6s-21.8-48.6-48.8-48.6s-48.8,21.8-48.8,48.6S107.7,251.7,134.7,251.7z" />
                <path fill="#444444" d="M204,227.8c-15.3,17.6-28.2,35.7-51.1,41.6c-22.9,6.4-43.5,4.7-58.8-8.2c-15.3-12.9-21.7-35.1-32.9-64.4S40,161,23.5,159.8 C7.1,158.7,0,178,0,186.2c-0.6,8.2,5.9,22.3,25.3,39.2C58.2,253.5,60,305.1,60,318.5c0.6,13.5-0.6,35.7-21.7,118.3 s7.1,89.6,10.6,90.8s14.7,7,22.9-10s12.9-63.8,16.5-83.7c3.5-19.9,8.2-49.8,29.4-53.9s26.5,30.4,32.3,56.8 c5.9,26.3,24.7,52.7,47.6,45.7c22.9-7,23.5-34,11.2-54.4c-12.3-20.5-40-43.9-40.6-90.8c-0.6-47.4,12.3-48,52.9-60.3 c40.6-12.3,44.7-20.5,50.5-30.4c5.9-10-2.9-33.4-18.8-38.6C237.5,201.4,222.8,206.7,204,227.8L204,227.8z" />
              </svg>`,
  RestRoom: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 533.9">
              <path fill="#444444" d="M282.3,533.9h9.2V0h-9.2V533.9z" />
              <path fill="#444444" d="M118.2,97.1c25.4-4.6,41.6-30.1,34.7-55.5C146,16.2,122.9,2.3,97.4,6.9S58.1,39.3,62.8,62.4S95.1,104,118.2,97.1z" />
              <path fill="#444444" d="M159.8,145.6h4.6c0,0,2.3,0,2.3,2.3L183,270.4c2.3,9.2,9.2,16.2,18.5,16.2c11.6,0,18.5-9.2,18.5-20.8l-18.5-129.4 c-2.3-13.9-13.9-23.1-27.7-23.1H44.3c-13.9,0-25.4,9.2-27.7,23.1L0.4,265.8c-2.3,11.6,6.9,20.8,18.5,20.8c9.2,0,16.2-6.9,18.5-16.2 l16.2-122.5c0,0,0-2.3,2.3-2.3h4.6c0,0,2.3,0,2.3,2.3L30.4,390.6c0,0,0,2.3,2.3,2.3h37c0,0,2.3,0,2.3,2.3v117.9 c0,9.2,6.9,16.2,16.2,16.2s16.2-6.9,16.2-16.2V393c0,0,0-2.3,2.3-2.3h11.6c0,0,2.3,0,2.3,2.3v117.9c0,9.2,6.9,16.2,16.2,16.2 c9.2,0,16.2-6.9,16.2-16.2V393c0,0,0-2.3,2.3-2.3h30.1c0,0,2.3,0,2.3-2.3l-27.7-242.7l0,0l0,0L159.8,145.6z" />
              <path fill="#444444" d="M497.3,76.3c13.9-23.1,4.6-50.9-16.2-62.4s-50.9-6.9-64.7,16.2c-13.9,23.1-4.6,50.9,16.2,62.4 C455.7,106.3,483.5,99.4,497.3,76.3z" />
              <path fill="#444444" d="M545.9,113.3h-178c-13.9,0-25.4,9.2-27.7,23.1v129.4c0,11.6,9.2,20.8,20.8,20.8s18.5-9.2,18.5-20.8V159.5c0,0,0-2.3,2.3-2.3 h2.3c0,0,2.3,0,2.3,2.3l25.4,161.8v187.2c0,11.6,9.2,20.8,20.8,20.8l0,0c11.6,0,20.8-9.2,20.8-20.8V323.6c0,0,0-2.3,2.3-2.3h6.9 c0,0,2.3,0,2.3,2.3v184.9c0,11.6,9.2,20.8,20.8,20.8l0,0c11.6,0,20.8-9.2,20.8-20.8V321.3l25.4-161.8c0,0,0-2.3,2.3-2.3h-2.3 c0,0,2.3,0,2.3,2.3v106.3c0,11.6,9.2,20.8,20.8,20.8s20.8-9.2,20.8-20.8V136.4C571.4,122.5,559.8,113.3,545.9,113.3L545.9,113.3 L545.9,113.3z" />
            </svg>`,
  FamilyRestRoom: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 522.5">
                    <path fill="#444444" d="M119.8,91.5c25-5.9,40.5-30.8,34.6-55.7c-5.9-24.9-30.9-40.4-55.9-34.5S58,32,63.9,56.9S94.8,97.3,119.8,91.5z" />
                    <path fill="#444444" d="M160.6,139.1h4.5c0.6,0,1.3,0.6,1.3,1.3l15.3,123.1c1.3,8.9,8.9,15.9,17.8,15.9c10.8,0,19.1-9.5,17.8-20.3l-15.9-128.9 c-1.9-13.3-13.4-24.1-27.4-24.1H43.4c-14,0-25.5,10.2-27.4,24.1L0.1,259.1c-1.3,10.8,7,20.3,17.8,20.3c8.9,0,16.5-7,17.8-15.9 l15.3-123.8c0-0.6,0.6-1.3,1.3-1.3h4.5c0.6,0,1.3,0.6,1.3,1.3L29.4,384.1c0,0.6,0.6,1.3,1.3,1.3H67c0.6,0,1.3,0.6,1.3,1.3v118.1 c0,9.5,7.6,16.5,16.5,16.5c9.5,0,16.5-7.6,16.5-16.5V387.3c0-0.6,0.6-1.3,1.3-1.3h10.8c0.6,0,1.3,0.6,1.3,1.3v118.1 c0,9.5,7.6,16.5,16.5,16.5c9.5,0,16.5-7.6,16.5-16.5V387.3c0-0.6,0.6-1.3,1.3-1.3h36.3c0.6,0,1.3-0.6,1.3-1.3L158,140.3 C159.3,139.7,159.9,139.1,160.6,139.1L160.6,139.1z" />
                    <path fill="#444444" d="M498.9,69.8c12.9-22.1,5.4-50.5-16.8-63.4c-22.2-12.9-50.6-5.4-63.6,16.7c-12.9,22.1-5.4,50.5,16.8,63.4 C457.5,99.4,486,91.9,498.9,69.8z" />
                    <path fill="#444444" d="M547.9,106.1H369.6c-14,0-25.5,10.2-27.4,24.1v128.9c0,10.8,8.9,19.7,19.7,19.7s19.7-8.9,19.7-19.7v-106 c0-0.6,0.6-1.3,1.3-1.3h2.5c0.6,0,1.3,0.6,1.3,1.3l25.5,162.5v187.3c0,10.8,8.9,19.7,19.7,19.7h0.6c10.8,0,19.7-8.9,19.7-19.7v-186 c0-0.6,0.6-1.3,1.3-1.3h10.8c0.6,0,1.3,0.6,1.3,1.3v186c0,10.8,8.9,19.7,19.7,19.7h0.6c10.8,0,19.7-8.9,19.7-19.7V315.6l25.5-162.5 c0-0.6,0.6-1.3,1.3-1.3h2.6c0.6,0,1.3,0.6,1.3,1.3v106c0,10.8,8.9,19.7,19.7,19.7s19.7-8.9,19.7-19.7V130.2 C573.4,116.2,562,106.1,547.9,106.1L547.9,106.1z" />
                    <path fill="#444444" d="M259.6,480l19.7-19.7L251.9,433L229,455.8c-7.6,7.6-5.7,20.3,1.3,27.3l32.5,33.6c12.7,12.7,29.3-5.1,17.2-17.1L259.6,480 L259.6,480z M288.9,347.9c19.1,0,34.4-15.2,34.4-34.3s-15.3-34.3-34.4-34.3s-34.4,15.2-34.4,34.3S269.7,347.9,288.9,347.9z  M369.7,405.7l-46.5-46.3c-3.8-3.8-8.3-6.3-14.7-6.3h-41.4c-6.4,0-10.8,2.5-14,6.3l-45.9,45.7c-12.7,12.7,4.5,28.6,17.2,15.9 l28-27.9v26h72.6v-26l28.6,28.6C364.6,433.6,381.8,417.1,369.7,405.7L369.7,405.7z M324.5,433l-27.4,27.3l19.7,19.7l-20.4,20.3 c-12.1,12.1,4.5,29.2,17.2,17.1l32.5-33.6c7-7,8.9-20.3,1.3-27.3C347.4,455.9,324.5,433,324.5,433z" />
                  </svg>`,
  Elevator: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 576">
                <path fill="#444444" d="M576,145.2v268.6c-0.1,1.6-0.3,3.1-0.3,4.7c-0.3,33.3-0.6,66.6-0.8,99.9c-0.1,21.1-9.7,37.2-26.7,49 c-7.7,5.4-15.9,9.3-25.9,8c-3.8-0.5-7.7-0.1-11.5-0.1c-115.3,0.1-230.6,0.2-345.9,0.3c-1.1,0-2.2,0.2-3.3,0.3h-16.9 c-1.2-0.1-2.4-0.3-3.6-0.3c-30.2-0.3-60.4-0.6-90.7-0.8c-11.1-0.1-20.7-4.1-29.1-11.2c-8.7-7.4-15.5-16.7-19.9-27.3l-0.2-0.5 c-0.7-1.6-1.1-3.4-1.2-5.4v0C0,492.8,0,455.1,0,417.4c0-124.1,0-248.1,0-372.2c0-0.2,0-0.3,0-0.5c0-1.5,0.3-2.9,0.7-4.2l0,0.1 C8.3,22.5,20.5,8.9,38.7,1c1.2-0.5,2.6-0.9,4-0.9h0c162.8,0,325.6,0,488.4,0c1.5,0,2.8,0.4,4.1,0.9l-0.1,0c3.4,1.4,6.1,2.7,8.8,4.2 l-0.4-0.2c19.7,11.2,30.9,27.8,31.3,50.8c0.4,28.2,0.6,56.3,0.8,84.5C575.7,141.8,575.8,143.5,576,145.2L576,145.2z M536.4,288.6 h0.3c0-56.7,0-113.4,0-170c0-18.2-0.4-36.4-0.7-54.6c-0.1-8-8.4-19.8-15.9-22.7c-1-0.4-2.1-0.6-3.2-0.7h0c-3.2-0.3-6.4-0.6-9.5-0.6 c-25.5-0.4-51-0.9-76.6-1c-96.4-0.2-192.7-0.4-289.1-0.4c-22.9,0-45.8,0.1-68.7,0.3c-3.4,0-6.8,0.1-10,0.9 c-9.9,2.3-17.1,8.3-21.7,17.3c-1,1.9-2,3.9-2.1,5.9c-0.1,149.8-0.1,299.6-0.1,449.4c0,0.9-0.1,2,0.3,2.7c2.7,4.2,5.1,8.6,8.3,12.3 c5.6,6.3,13.2,8.4,21.6,8.4c23.7,0.1,47.5,0.6,71.2,0.6c123.5,0,247,0,370.5,0c0.1,0,0.2,0,0.3,0c1.1,0,2.1-0.2,3-0.6l-0.1,0 c8.3-3.5,15.4-8.4,20.2-16.3c1.2-1.8,2-4.1,2-6.5l0,0C536.4,438.2,536.4,363.4,536.4,288.6L536.4,288.6z" />
                <path fill="#444444" d="M307,277.5l75.9,68.4l0.9-0.2V150.9h49.7v194.8l1,0.3l78.2-67.4c0.1,1,0.2,1.7,0.3,2.4c0.3,19.9,0.6,39.8,0.8,59.7 c0,0,0,0,0,0.1c0,1.4-0.5,2.6-1.4,3.6l0,0c-34.1,32.7-68.2,65.3-102.3,97.9c-0.3,0.3-0.6,0.5-1,0.9c-0.6-0.5-1.3-1-1.9-1.5 c-32.7-30.7-65.5-61.4-98.2-92c-1.4-1.2-2.3-3-2.3-5c0-0.1,0-0.3,0-0.4v0c0.2-20.9,0.3-41.9,0.4-62.8C307,280.5,307,279.4,307,277.5 L307,277.5z" />
                <path fill="#444444" d="M142.2,234.5L67,301.8c-0.1-1.2-0.3-1.9-0.3-2.7c-0.3-20.7-0.7-41.5-1-62.2c0-1.3,0.5-2.5,1.3-3.4l0,0 c33.3-31.4,66.7-62.8,100.1-94.1c0.3-0.3,0.6-0.5,1-0.8c5.9,5.7,11.8,11.3,17.7,16.9c28.1,26.9,56.2,53.9,84.3,80.9 c0.9,0.8,1.4,2,1.5,3.3v0c-0.5,20.2-1.1,40.3-1.6,60.5c0,0.3-0.1,0.7-0.2,1.7l-77.4-67.1l-0.9,0.1v193.9h-48.3v-194L142.2,234.5z" />
              </svg>`,
  Security: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 576 597.6">
                <path fill="#444444" d="M554,80.7L298.5,1.5c-6.6-2-13.2-2-19.9,0L23.2,80.7C9.3,84.7,0,97.9,0,112.4c0,352.5,178.7,436.4,274,481.9 c4.6,2,9.3,3.3,13.9,3.3c4.6,0,9.9-1.3,13.9-3.3c96-45.5,274-129.4,274-481.9C577.2,97.9,567.9,85.3,554,80.7z M288.6,527.6 C197.2,484.1,73.5,411.4,66.2,136.2l222.4-68.6L511,136.8C503.7,412.1,379.3,484.1,288.6,527.6z" />
                <path fill="#444444" d="M278.7,152l-26.5,87.1l-90.7-2.6c-4.6,0-8.6,2.6-9.9,7.3c-1.3,4.6,0,9.2,4,11.9l74.8,51.5L200.6,393c-1.3,4.6,0,9.2,4,11.9 c4,2.6,8.6,2.6,12.6,0l72.1-54.8l72.1,54.8c4,2.6,8.6,2.6,12.6,0c4-2.6,5.3-7.3,4-11.9l-29.8-85.8l74.8-51.5c4-2.6,5.3-7.3,4-11.9 c-1.3-4.6-5.3-7.3-9.9-7.3l-90.7,2l-26.5-87.1c-1.3-4.6-5.3-7.3-9.9-7.3C283.9,144.1,280,147.4,278.7,152L278.7,152z" />
              </svg>`,
  ChildStroller: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 370.06">
                    <path fill="#444444" d="M130.29,178.61l-42.67,34L33.24,254.13c-15.48,12.09-28.32-2.64-28.32-2.64-12.08-15.86,1.89-26.06,1.89-26.06l68-53.24s7.55-7.93,26.81-2.26l28.7,8.68"/>
                    <path fill="#444444" d="M210,111A38.52,38.52,0,1,1,248.48,72.5,38.68,38.68,0,0,1,210,111"/>
                    <path fill="#444444" d="M390.84,0a42.88,42.88,0,0,0-24.92,8.31L80.44,235.63a43.71,43.71,0,0,0-13.59,22.28,40.67,40.67,0,0,0,1.89,23.41,47.9,47.9,0,0,0-22.28,41.16A47.58,47.58,0,1,0,94,274.9,41.43,41.43,0,0,0,84.22,276a22.77,22.77,0,0,1-1.51-14.35,25.82,25.82,0,0,1,8.68-13.59l17.37-14,88,29.08a33.54,33.54,0,0,0,42.67-21.53l1.51-4.91,18.88,45.32a47.09,47.09,0,0,0-22.28,40.4,47.58,47.58,0,1,0,47.58-47.58,41.43,41.43,0,0,0-9.82,1.13l-26.43-62.68,43.8-126.12,83.08-66.08a23.7,23.7,0,0,1,15.1-5.29,25.3,25.3,0,0,1,25.3,25.3,25.72,25.72,0,0,1-10.2,20.39,8,8,0,0,0,10.58,12.08A41.37,41.37,0,0,0,390.84,0ZM93.66,301.33A20.77,20.77,0,1,1,72.89,322.1,20.71,20.71,0,0,1,93.66,301.33Zm191.07,0A20.77,20.77,0,1,1,264,322.1,20.71,20.71,0,0,1,284.73,301.33Z"/>
                  </svg>`,
  VendingMachine: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 432 594">
                      <circle fill="#444444" cx="324" cy="175.5" r="13.5"/>
                      <circle fill="#444444" cx="364.5" cy="175.5" r="13.5"/>
                      <circle fill="#444444" cx="324" cy="243" r="13.5"/>
                      <circle fill="#444444" cx="364.5" cy="243" r="13.5"/>
                      <circle fill="#444444" cx="324" cy="310.5" r="13.5"/>
                      <circle fill="#444444" cx="364.5" cy="310.5" r="13.5"/>
                      <path fill="#444444" d="M216,94.5H67.5C59.4,94.5,54,99.9,54,108c0,8.1,5.4,13.5,13.5,13.5H216c8.1,0,13.5-5.4,13.5-13.5 C229.5,99.9,224.1,94.5,216,94.5z"/>
                      <path fill="#444444" d="M216,162H67.5c-8.1,0-13.5,5.4-13.5,13.5c0,8.1,5.4,13.5,13.5,13.5H216c8.1,0,13.5-5.4,13.5-13.5 C229.5,167.4,224.1,162,216,162z"/>
                      <path fill="#444444" d="M216,229.5H67.5c-8.1,0-13.5,5.4-13.5,13.5c0,8.1,5.4,13.5,13.5,13.5H216c8.1,0,13.5-5.4,13.5-13.5 C229.5,234.9,224.1,229.5,216,229.5z"/>
                      <path fill="#444444" d="M216,297H67.5c-8.1,0-13.5,5.4-13.5,13.5S59.4,324,67.5,324H216c8.1,0,13.5-5.4,13.5-13.5S224.1,297,216,297z"/>
                      <path fill="#444444" d="M391.5,0H324c-8.1,0-13.5,5.4-13.5,13.5S315.9,27,324,27h67.5c8.1,0,13.5,5.4,13.5,13.5V567H27V40.5 C27,32.4,32.4,27,40.5,27h216v499.5c0,8.1,5.4,13.5,13.5,13.5s13.5-5.4,13.5-13.5v-513C283.5,5.4,278.1,0,270,0H40.5 C17.5,0,0,17.5,0,40.5v540c0,8.1,5.4,13.5,13.5,13.5h405c8.1,0,13.5-5.4,13.5-13.5v-540C432,17.5,414.5,0,391.5,0z"/>
                      <path fill="#444444" d="M364.5,94.5H324c-8.1,0-13.5,5.4-13.5,13.5c0,8.1,5.4,13.5,13.5,13.5h40.5c8.1,0,13.5-5.4,13.5-13.5 C378,99.9,372.6,94.5,364.5,94.5z"/>
                      <path fill="#444444" d="M216,432H67.5c-8.1,0-13.5,5.4-13.5,13.5V513c0,8.1,5.4,13.5,13.5,13.5H216c8.1,0,13.5-5.4,13.5-13.5v-67.5 C229.5,437.4,224.1,432,216,432z M81,499.5V459h121.5v40.5H81z"/>
                    </svg>`,
  Stairs: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 432 448.5">
              <path fill="#444444" d="M432,243.3h-81.7v33.1h-72.2v33.1h-72.2v33.1h-72.2v33.1H61.5v33.1H0v39.7h101.2v-33.1h72.2v-33.1h72.2v-33.1h72.2v-33.1 h72.2V283H432L432,243.3"/>
              <path fill="#444444" d="M99.9,109.3c12,0,21.8-9.7,21.8-21.8c0-12-9.8-21.8-21.8-21.8c-12,0-21.8,9.7-21.8,21.8C78.1,99.6,87.9,109.3,99.9,109.3"/>
              <path fill="#444444" d="M179.4,299.8l-56.5-47.4l11.7-82.9c12.5,14.8,20.7,33.4,22.7,53.8l17.8-4.8c-0.9-32.2-14.2-61.3-35.3-82.6 c-14.4-14.5-32.9-19.2-45.9-20.6c-0.1,0-0.2,0-0.3,0c-1.6,0-2.9,1.2-3.2,2.7c-6.5,34.7-27.7,64.2-56.9,81.9l9.3,16.1 c15.6-6.6,29.5-16.4,40.9-28.6v177.3H107l10.4-73.7l57.7,33.3L179.4,299.8"/>
              <path fill="#444444" d="M294.1,43.6c12,0,21.8-9.8,21.8-21.8c0-12-9.8-21.8-21.8-21.8c-12,0-21.8,9.8-21.8,21.8C272.3,33.8,282.1,43.6,294.1,43.6" />
              <path fill="#444444" d="M337.2,154.3l-41.8-24.1l3.9-20c1.4-7.5,2.2-15.2,2.2-23.1c0-12-1.8-23.7-5-34.6c-0.4-1.4-1.7-2.4-3.1-2.4c0,0-0.1,0-0.1,0 c-46.7,1.6-84.1,40-84.1,87.1c0,2.3,0.1,4.6,0.3,6.9l18.3,3.2c0-0.5,0-0.9,0-1.4c0-19.5,8.6-36.9,22.3-48.7l-10.5,201.1h23.3 l24.9-128l23,10.7L294.9,240l16.6,16.6l34.6-74.3c1.3-2.8,2-5.9,2-9.2C348.1,165.1,343.8,158,337.2,154.3"/>
            </svg>`,
  ChargingStation: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 432 627.4">
                      <polygon fill="#444444" points="314.4,282.1 133.8,467.8 188.6,334.2 114.9,334.2 225.6,148.6 314.4,148.6 236.7,282.1 "/>
                      <path fill="#444444" d="M374.2,0H63.3C28.4,0.1,0.1,28.4,0,63.3v503.6c0,32.8,30.1,60.5,62.6,60.5h309.2c33.3,0,60.3-27,60.3-60.3V374.2l0,0V57.8 C432,25.9,406.1,0,374.2,0z M220.3,600.4c-8.3,0.2-15.2-6.4-15.4-14.7c0-0.2,0-0.5,0-0.7c0.1-8.5,6.9-15.3,15.4-15.4 c8.3-0.2,15.2,6.4,15.4,14.7c0,0.2,0,0.5,0,0.7C235.4,593.8,229.1,600.4,220.3,600.4z M391.1,544.8H44v-465h346.7v294.4l0.4,55 V544.8z"/>
                    </svg>`,
  WheelChair: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 432 492.2">
                  <path fill="#444444" d="M134.7,80.1l9.5,103h104.6v33.3H146.6l3.2,30.9h147.4l66.6,157l56.3-23.8l11.9,27l-84,36.4l-69.7-163.3H118.9l-19-221.9 c-3.2-5.5-4.7-11.9-4.7-18.2C95.1,18.2,112.5,0,134.7,0c22.2,0,40.4,18.2,40.4,40.4C175.2,61.8,156.9,80.1,134.7,80.1L134.7,80.1z" />
                  <path fill="#444444" d="M306.7,397.1c-25.3,56.3-81.6,95.1-146.6,95.1C72.1,492.2,0,420.9,0,332.1C0,268.7,37.2,214,91.1,187.9l3.2,36.5 c-36.5,22.2-61,61.8-61,107.8c0,69.8,57.1,126.8,126.8,126.8c65,0,118.1-48.3,126-110.2L306.7,397.1"/>
                </svg>`
}, q3 = [
  {
    name: "ATM",
    type: "atm",
    svgCode: K1.ATM
  },
  {
    name: "Management",
    type: "management",
    svgCode: K1.Management
  },
  {
    name: "Kids Area",
    type: "playarea",
    svgCode: K1.PlayArea
  },
  {
    name: "Restroom",
    type: "restroom",
    svgCode: K1.RestRoom
  },
  {
    name: "Family Restroom",
    type: "family-restroom",
    svgCode: K1.FamilyRestRoom
  },
  {
    name: "Elevator",
    type: "elevator",
    svgCode: K1.Elevator
  },
  {
    name: "Security",
    type: "security",
    svgCode: K1.Security
  },
  {
    name: "Escalator",
    type: "escalator",
    svgCode: K1.Escalator
  },
  {
    name: "Child Stroller",
    type: "child-stroller",
    svgCode: K1.ChildStroller
  },
  {
    name: "Vending Machine",
    type: "vending-machine",
    svgCode: K1.VendingMachine
  },
  {
    name: "Stairs",
    type: "stairs",
    svgCode: K1.Stairs
  },
  {
    name: "Charging Station",
    type: "charging-station",
    svgCode: K1.ChargingStation
  },
  {
    name: "Wheelchair",
    type: "wheelchair",
    svgCode: K1.WheelChair
  }
], y8 = {
  "route-path": 0,
  escalator: 0,
  underlay: 0,
  overlay: 1,
  "building-base": 1,
  base: 2,
  store: 3,
  "big-store": 4,
  kiosk: 5,
  wall: 6,
  "outer-wall": 7,
  boundary: 8,
  amenity: 9,
  "layer-image": 10,
  "layer-text": 11,
  "route-tube": 12,
  "special-shape": 13
}, i3 = () => {
  const { mapConfig: e, allMapObjects: l, allIndexedMapObjects: t, allIndexedRetailers: o, floorsData: n } = r4(), r = r1((a) => a != null && y8[a] !== void 0 ? y8[a] : 0, []), q = r1((a, s, m, v) => {
    const A = {
      color: m instanceof g6 ? m : k1(m),
      side: i2,
      transparent: !1,
      depthWrite: !0,
      depthTest: !0,
      opacity: 1
    };
    (e.STYLE === "2D" || a === "base" || a == null) && a !== "boundary" && (A.depthWrite = !1, A.depthTest = !1), a === "overlay" && (A.color = e.OVERLAY_COLOR, A.opacity = e.OVERLAY_OPACITY), a && ["store", "big-store", "kiosk"].includes(a) && e.ROLE !== "PORTAL" && t[s] && t[s].transparent && (A.opacity = 0);
    var x = new z9(A);
    return a && ["store", "big-store", "kiosk", "amenity"].includes(a) && (x.colorDefault = x.color, t[s] && t[s].bg_color !== "" && (x.color = k1(t[s].bg_color), x.colorDefault = x.color), x.active = !1), e.ROLE !== "PORTAL" && v && (x.opacity = 0, x.transparent = !0), x.transparent = x.opacity !== 1, x;
  }, [t, e.OVERLAY_COLOR, e.OVERLAY_OPACITY, e.ROLE, e.STYLE]), c = r1((a, s, m, v, A) => {
    const x = "MaterialAndGeometry";
    let p = A.toShapes(!0), d;
    e.STYLE === "2D" ? d = ["building-base"] : d = ["store", "big-store", "base", "building-base"];
    let _ = ["wall", "outer-wall", "boundary"];
    var S;
    if (a && d.includes(a))
      S = new H3(p, {
        depth: -m,
        bevelEnabled: !1
      });
    else if (a && _.includes(a)) {
      let g = [];
      A.subPaths.forEach((u) => {
        u.curves.forEach((f) => {
          if (f.type === "LineCurve") {
            let E = 0;
            a === "boundary" && (E = 1);
            let C = Rl(f, v, E), w = new H3(C, {
              depth: -m,
              bevelEnabled: !1
            });
            g.push(w);
          } else
            console.warn(x + '"%s" found in walls. Check layer "%s"', f.type, s);
        });
      }), g.length === 1 ? S = g[0] : g.length > 1 ? S = zl(g) : console.warn(x + 'Unneccessary wall exists "%s"', s);
    } else {
      S = new $7(p);
      try {
        S.attributes.position.count === 0 && console.warn(x + 'Unneccessary map shape "%s"', s, A.userData.node);
      } catch (g) {
        console.error(g.message);
      }
    }
    return S;
  }, [e.STYLE]), i = r1((a, s, m, v, A, x, p, d, _, S) => {
    var C, w;
    const g = q(a, s, m, v), u = c(a, s, p, d, S), f = new k2(u, g);
    f.object_id = s, f.mesh_type = a, f.floor_index = _, f.visible = A, f.position.z = x;
    let E = "";
    if (["retail_logo", "retail_name", "retail_text", "custom_text", "amenity"].includes((C = t[s]) == null ? void 0 : C.layer_type)) {
      if (t[s].layer_type && ["retail_name", "retail_logo"].includes(t[s].layer_type) && t[s].retailer_id && o[((w = t[s]) == null ? void 0 : w.retailer_id) || 0])
        E = o[t[s].retailer_id].retail_name;
      else if (["retail_text", "custom_text"].includes(t[s].layer_type))
        E = t[s].custom_text, E === "" && t[s].retailer_id && o[t[s].retailer_id] && (E = o[t[s].retailer_id].retail_name);
      else if (["amenity"].includes(t[s].layer_type) && (E = t[s].value, E)) {
        const F = q3.find((D) => D.type === E);
        F && (E = F.name);
      }
    }
    return f.userData.storeName = E, e.STYLE === "2D" && (f.renderOrder = r(a), s && s.includes("underlay") && (f.renderOrder = r("underlay"))), n[_].objsGroup.add(f), a === "escalator" && (n[_].escalatorsNodes[s] = null, n[_].escalatorsObjs.push(f), f.escalator_id = _ + "-" + s), a && ["store", "big-store", "kiosk", "amenity"].includes(a) && (f.route_node_id = null, t[s] && t[s].layer_type, l.push(s), (e.ROLE !== "PORTAL" && a === "kiosk" || e.ROLE !== "PORTAL" && e.ROLE !== "PORTAL_KIOSK" && t[s] && t[s].obj_type === "retailer" && t[s].retailer_id != null || e.ROLE !== "PORTAL" && e.ROLE !== "PORTAL_KIOSK" && t[s] && t[s].obj_type === "custom" && t[s].custom_text !== "" || e.ROLE !== "PORTAL" && e.ROLE !== "PORTAL_KIOSK" && t[s] && t[s].layer_type === "amenity" && t[s].value !== null || e.ROLE === "PORTAL" && t[s] && (t[s].obj_type === "special" || t[s].obj_type === "custom") || e.ROLE === "PORTAL" && ["store", "kiosk", "amenity"].includes(f.mesh_type ?? "") || e.ROLE === "PORTAL") && n[_].interactiveObjs.push(f)), {
      mesh: f,
      geometry: u,
      material: g,
      object_id: s,
      mesh_type: a,
      floor_index: _,
      visible: A,
      renderOrder: f.renderOrder
    };
  }, [t, o, l, n, c, q, r, e.ROLE, e.STYLE]);
  return {
    getRenderOrder: r,
    getMaterial: q,
    getGeometry: c,
    getMaterialAndGeometry: i
  };
}, E3 = "ROUTE: ", Ol = 1e4, c5 = () => {
  const { floorsData: e, allNodesFloor: l, ngraphPath: t, pathFinderGraph: o, allIndexedMapObjects: n } = r4(), { getRenderOrder: r } = i3(), q = r1((_, S, g) => {
    if (!g.data) return !1;
    let u = g.data.weight;
    const f = l[_.id], E = l[S.id];
    return f !== E ? u + Ol + Math.abs(f - E) : u;
  }, [l]), c = r1((_) => {
    var S;
    for (let g = 0; g < _.length; g++) {
      const u = _[g];
      u.route_active = !1, u.route_tube != null && (u.route_tube.geometry.dispose(), u.route_tube.material.dispose(), (S = u.objsGroup) == null || S.remove(u.route_tube)), u.route_tube = void 0, u.route_texture = null, u.escalatorMeshes = [];
    }
  }, []), i = r1((_, S, g) => {
    let u = g.find(_, S);
    return u.length === 0 ? !1 : u;
  }, []), a = r1((_, S, g) => {
    let f = document.createElement("canvas").getContext("2d");
    if (f) {
      f.canvas.width = _, f.canvas.height = 80, f.fillStyle = "#4ea5ff", f.fillRect(0, 0, _, 80);
      let E = 0.1 * _;
      const C = 60, w = 120;
      E < C && (E = C), E > w && (E = w);
      let F = f.createLinearGradient(0, 0, E, 0);
      F.addColorStop(0, "#4ea5ff"), F.addColorStop(0.4, "white"), F.addColorStop(0.6, "white"), F.addColorStop(1, "#4ea5ff"), f.fillStyle = F, f.fillRect(10, 0, E, 80);
      let D = new O9(f.canvas);
      return D.offset.x = 1, D.colorSpace = "srgb", g[S].route_texture = D, D;
    } else
      return;
  }, []), s = r1((_, S, g, u = "2D") => {
    var D;
    let f = 0, E = new Q7();
    for (let e1 = 1; e1 < _.length; e1++) {
      let j = new w1(_[e1 - 1].data.x, _[e1 - 1].data.y, 0), l1 = new w1(_[e1].data.x, _[e1].data.y, 0);
      E.add(new K7(j, l1)), f += j.distanceTo(l1);
    }
    var C = new ee(E, 400, 6, 8);
    C = new p6().copy(C);
    var w = new H4({
      map: a(f, S, g),
      transparent: !0,
      side: i2,
      depthTest: !1,
      depthWrite: !1
    });
    let F = new k2(C, w);
    return u === "2D" && (F.position.z = -10, F.scale.z = 0.1), F.position.z = 0, F.renderOrder = r("route-tube"), F.mesh_type = "route-tube", F.geometry.index !== null ? F.geometry.setDrawRange(0, F.geometry.index.count) : console.warn("route_tube.geometry.index is null"), g[S].route_tube = F, (D = g[S].objsGroup) == null || D.add(F), F;
  }, [r, a]), m = r1((_, S, g, u, f, E, C, w, F = null) => {
    var M, W, H, z, I, b;
    const D = [];
    c(E);
    let e1 = g.getObjectByProperty("object_id", _), j = g.getObjectByProperty("object_id", S), l1 = e1.route_node_id, $ = j.route_node_id;
    if (l1 || console.error(E3 + 'Route Anchor point missing for "%s"', _), $ || console.error(E3 + 'Route Anchor point missing for "%s"', S), !l1 || !$) return D;
    const Q = e1.floor_index, Z = j.floor_index, J = t.nba(C, {
      distance: q,
      oriented: !0,
      blocked(h, R, k) {
        return k.data.blocked;
      },
      //@ts-ignore
      debug: !0
    }), P = i(l1, $, J), q1 = [];
    if (!P)
      return [];
    P.reverse();
    const B = [];
    for (let h = 0; h < P.length; h++) {
      const R = P[h];
      B[u[R.id]] ? B[u[R.id]].push(R) : B[u[R.id]] = [R], f.includes(R.id) && f.includes(P[h - 1].id) && f.includes(P[h + 1].id), q1.push(R);
    }
    for (let h = 0; h < q1.length; h++) {
      const R = q1[h];
      if (u[q1[0].id] !== u[q1[q1.length - 1].id] && f.includes(R.id)) {
        const k = Object.keys(E[u[R.id]].escalatorsNodes).find((T) => {
          var t1, U;
          return ((U = (t1 = E[u[R.id]]) == null ? void 0 : t1.escalatorsNodes) == null ? void 0 : U[T]) === R.id;
        }), N = g.getObjectByProperty("escalator_id", u[R.id] + "-" + k);
        let K = null;
        if (u[R.id] !== u[q1[h + 1].id] && f.includes(q1[h + 1].id) && (K = {
          index: u[q1[h + 1].id],
          direction: "To"
        }), u[R.id] !== u[q1[h - 1].id] && f.includes(q1[h - 1].id) && (K = {
          index: u[q1[h - 1].id],
          direction: "From"
        }), K && N) {
          N.goToFloor = K;
          const T = N.clone();
          T.goToFloor = K, T.object_id = k, (W = (M = E[u[R.id]]) == null ? void 0 : M.escalatorMeshes) == null || W.push(T);
        }
      }
    }
    for (let h = 0; h < B.length; h++) {
      const R = B[h];
      if (R && R.length > 1) {
        const k = s(R, h, E, w);
        D[h] = k, E[h].route_active = !0, E[h].routeMeshes = [k], h === Q && ((z = (H = E[h]) == null ? void 0 : H.routeMeshes) == null || z.push(e1)), h === Z && ((b = (I = E[h]) == null ? void 0 : I.routeMeshes) == null || b.push(j));
      }
    }
    return D;
  }, [s, i, t, c, q]), v = r1((_, S, g, u, f, E, C, w) => {
    if (S === g)
      return {
        routePaths: [],
        fromFloor: void 0
      };
    const F = m(S, g, u, _, E, f, C, w);
    F.length || console.warn(E3 + 'No route found in between "%s" and "%s"', S, g);
    let D = u.getObjectByProperty("object_id", S);
    return {
      routePaths: F,
      fromFloor: D.floor_index
    };
  }, [m]), A = r1((_, S, g, u) => {
    let f = 0, E = g.find(S, _);
    if (E.length === 0) return !1;
    for (let C = 1; C < E.length; C++) {
      let w = u.getLink(E[C - 1].id, E[C].id);
      f += (w == null ? void 0 : w.data.weight) || 0;
    }
    return f;
  }, []), x = r1(() => {
    if (e.length > 1) {
      const _ = [], S = [];
      for (let g = 0; g < e.length; g++)
        S[g] = [], e[g].escalatorsNodes && (_[g] = Object.fromEntries(
          Object.entries(e[g].escalatorsNodes).map(([u, f]) => {
            const E = u.split("-"), C = E.slice(0, 2).join("-"), w = E.includes("end"), F = E.includes("start"), D = E.includes("up"), e1 = E.includes("down"), j = D ? "up" : e1 ? "down" : "both";
            return S[g].push(C), [C, {
              node: f,
              escalatorId: C,
              isExitOnly: w,
              isEntranceOnly: F,
              upOnly: D,
              downOnly: e1,
              direction: j,
              floorsTo: []
            }];
          })
        ));
      for (let g = 0; g < e.length; g++)
        for (let u = 0; u < S[g].length; u++) {
          const f = S[g][u], E = _[g][f];
          for (let C = g + 1; C < e.length; C++)
            for (let w = 0; w < S[C].length; w++) {
              const F = S[C][w];
              f === F && E.floorsTo.push(C);
            }
        }
      for (let g = 0; g < e.length - 1; g++) {
        const u = _[g];
        for (const f in u) {
          const E = u[f], C = E.node;
          E.floorsTo.forEach((w) => {
            const D = _[w][f].node;
            D && (E.isExitOnly ? (o.addLink(C, D, { blocked: !0 }), o.addLink(D, C, { weight: 1 })) : E.isEntranceOnly ? (o.addLink(D, C, { blocked: !0 }), o.addLink(C, D, { weight: 1 })) : (o.addLink(C, D, { weight: 1 }), o.addLink(D, C, { weight: 1 })));
          });
        }
      }
    }
  }, [e, o]), p = r1((_, S, g, u, f) => {
    let E = g.getObjectByProperty("object_id", _), C = E ? E.route_node_id : "";
    var w = null, F = 9999;
    const D = [];
    for (let e1 in n) {
      const j = n[e1];
      j.layer_type === "amenity" && j.obj_type === "special" && j.value === S && D.push(e1);
    }
    return D.forEach((e1) => {
      let j = g.getObjectByProperty("object_id", e1);
      const l1 = t.aStar(o, {
        distance: q,
        //@ts-ignore
        debug: !0
      });
      if (j && C) {
        var $ = j.route_node_id;
        try {
          var Q = A(C || "", $ || "", l1, o);
          Q && Q < F && (F = Q, w = e1);
        } catch (Z) {
          console.warn(`Amenity Path: ${Z.message}`);
        }
      }
      !C && j && (w = $);
    }), v(l, _, w ?? "", g, e, u, o, f);
  }, [n, l, v, e, A, t, o, q]), d = r1((_, S, g) => {
    const u = /* @__PURE__ */ new Map(), f = e[_];
    return f && f.route_points && f.route_points.forEach((E) => {
      let C = new w1(E.node.x, E.node.y, -10), w = new w1(0, 0, 1);
      g.set(C, w);
      var F = g.intersectObjects(e[_].interactiveObjs);
      F.length && (F[0].object.route_node_id = E.name, u.set(F[0].object.object_id, E.name));
      var D = g.intersectObjects(e[_].escalatorsObjs);
      if (D.length) {
        let j = D[0].object.object_id;
        const l1 = e[_].escalatorsNodes;
        l1 && (l1[j] = E.name, l[E.name] = _, S.push(E.name));
      }
    }), u;
  }, [l, e]);
  return {
    delete_route_path: c,
    create_route: v,
    create_route_paths: m,
    create_route_path: s,
    get_route_nodes: i,
    get_nodes_distance: A,
    get_route_texture: a,
    linkFloorEscalators: x,
    make_amenity_route: p,
    assign_route_nodes_to_stores: d
  };
};
function Tl(e) {
  return "node-" + e;
}
function I8(e, l, t, o) {
  let n = !1, r = "-name-not-found-";
  const q = t[l];
  if (q.route_points !== void 0) {
    for (let c = 0; c < q.route_points.length; c++)
      if (e.x === q.route_points[c].node.x && e.y === q.route_points[c].node.y) {
        n = !0, r = q.route_points[c].name;
        break;
      }
    n || (r = Tl(o));
  }
  return [r, n];
}
const wl = () => {
  const { mapConfig: e, floorsData: l, allNodesFloor: t, pathFinderGraph: o } = r4();
  return {
    getMeshParams: r1((r, q, c, i) => {
      var f;
      const a = "MeshParams";
      let s = null;
      var m = r.color.clone(), v = 0, A = 0, x = !0, p = !0, d = !1, _ = e.WALL_THICKNESS, S = !0, g = (f = r.userData) == null ? void 0 : f.node.id;
      return g !== void 0 ? g.startsWith("boundary") ? (s = "boundary", m = e.BOUNDARY_COLOR, _ = e.BOUNDARY_THICKNESS, e.STYLE === "3D" && (v = 9)) : g.startsWith("wall") ? (s = "wall", m = e.WALL_COLOR, e.STYLE === "3D" && (v = 8.5)) : g.startsWith("outer-wall") ? (s = "outer-wall", m = e.WALL_COLOR, e.STYLE === "3D" && (p = !1)) : g.startsWith("base") ? (s = "base", m = e.BASE_COLOR) : g.startsWith("store") ? (s = "store", m = e.STORE_DEFAULT_COLOR, e.STYLE === "3D" && (v = e.STORE_HEIGHT), g.startsWith("store-underlay") && (S = !1)) : g.startsWith("route-path") ? (s = "route-path", p = !1, r.subPaths.forEach((E) => {
        E.curves.length === 0 && console.warn(a + 'Route-path standalone anchor point exists, layer_name: "%s"', g), E.curves.forEach((C) => {
          var $, Q;
          const w = C.v1, F = C.v2, [D, e1] = I8(w, c, l, i);
          e1 || (($ = l[c].route_points) == null || $.push({
            name: D,
            node: new w1(w.x, w.y, 1)
          }), t[D] = c);
          const [j, l1] = I8(F, c, l, i);
          l1 || ((Q = l[c].route_points) == null || Q.push({
            name: j,
            node: new w1(F.x, F.y, 1)
          }), t[j] = c), o.addNode(D, { ...w }), o.addNode(j, { ...F }), o.addLink(D, j, { weight: w.distanceTo(F) }), o.addLink(j, D, { weight: w.distanceTo(F) });
        });
      })) : g.startsWith("escalator-") ? (s = "escalator", x = !1, d = !0) : g.startsWith("kiosk-") ? (s = "kiosk", d = !0) : g.startsWith("amenity-") ? (s = "amenity", d = !0, A = 1) : g.startsWith("overlay") ? s = "overlay" : g.startsWith("special-shape") ? s = "special-shape" : v = 1 : console.warn(a + "Layer name is undefined, path", r), {
        mesh_type: s,
        layer_color: m,
        extrude: v,
        z_index: A,
        mesh_visible: x,
        mesh_draw: p,
        mesh_transparent: d,
        line_thickness: _,
        interactiveMesh: S,
        path: r,
        layer_name: g
      };
    }, [t, l, e.BASE_COLOR, e.BOUNDARY_COLOR, e.BOUNDARY_THICKNESS, e.STORE_DEFAULT_COLOR, e.STORE_HEIGHT, e.STYLE, e.WALL_COLOR, e.WALL_THICKNESS, o])
  };
};
let Nl = 0;
const Ml = (e) => {
  const { mapConfig: l, pathFinderGraph: t } = r4(), { getMaterialAndGeometry: o } = i3(), { getMeshParams: n } = wl(), { assign_route_nodes_to_stores: r, linkFloorEscalators: q } = c5(), [c, i, a] = W1(() => {
    const s = /* @__PURE__ */ new Set(), m = [], v = [];
    e.forEach((A, x) => {
      var p, d;
      if (A.paths && A.paths.length) {
        const _ = [];
        for (let f = 0; f < A.paths.length; f++)
          _.push((d = (p = A.paths[f]) == null ? void 0 : p.userData) == null ? void 0 : d.node.id);
        const S = A.paths;
        for (let f = 0; f < S.length; f++) {
          const {
            mesh_type: E,
            layer_color: C,
            extrude: w,
            z_index: F,
            mesh_visible: D,
            mesh_draw: e1,
            mesh_transparent: j,
            line_thickness: l1,
            path: $,
            layer_name: Q
          } = n(
            S[f],
            S,
            x,
            ++Nl
          );
          if (e1) {
            const Z = o(
              E,
              Q,
              C,
              j,
              D,
              F,
              w,
              l1,
              x,
              $
            );
            Q.startsWith("kiosk-") && l.ROLE, m[x] || (m[x] = []), m[x].push(Z);
          }
        }
        const g = new le(), u = r(
          x,
          v,
          g
        );
        if (u.size && m[x].length)
          for (let f = 0; f < m[x].length; f++)
            u.has(m[x][f].mesh.object_id) && (m[x][f].mesh.route_node_id = u.get(m[x][f].mesh.object_id));
        q();
      }
    });
    for (let A = 0; A < m.length; A++) {
      const x = m[A];
      for (let p = 0; p < x.length; p++)
        s.add(x[p].object_id);
    }
    return [m, v, s];
  }, [r, o, n, q, l.ROLE, e]);
  return {
    GeometriesAndMaterials: c,
    graph: t,
    escalator_nodes: i,
    allSvgObjectIds: a
  };
}, u5 = () => {
  const { allIndexedRetailers: e, allIndexedMapObjects: l, floorsData: t, mapConfig: o } = r4(), { getRenderOrder: n } = i3(), r = (x, p, d, _, S, g, u, f) => {
    for (let E = 0; E < x.length; E++)
      q(x[E], p, d, _, S, g, u, f);
  }, q = (x, p, d, _, S, g, u, f) => {
    let E = p.getObjectByProperty("object_id", x.map_obj_name);
    E && add_store_name_logo(E, d, _, S, g, u, f, p);
  }, c = (x) => (Array.isArray(x) || (x = [x]), x.reduce((d, _) => (_.geometry.boundingBox || _.geometry.computeBoundingBox(), d.union(_.geometry.boundingBox), d), new T9())), i = (x, p, d, _, S) => {
    let g = S[x];
    p.z = -d.z, _.rotateZ(((g == null ? void 0 : g.rotate) || 0) * Math.PI / 180), _.scale.y *= -1, p.x += (g == null ? void 0 : g.offset_x) || 0, p.y += (g == null ? void 0 : g.offset_y) || 0, _.position.set(p.x, p.y, p.z + 1);
  }, a = async (x) => {
    try {
      const p = L9(x, o), d = await fetch(p);
      if (!d.ok)
        throw new Error(`Failed to fetch image: ${d.statusText}`);
      const _ = await d.blob();
      return URL.createObjectURL(_);
    } catch (p) {
      return console.error("Error fetching or converting the image:", p), "";
    }
  }, s = (x, p) => new Promise((d, _) => {
    var S;
    if (x.obj_type === "retailer")
      p ? a(p.logo).then((g) => {
        d(g);
      }) : (console.error("retailer not found"), d(""));
    else if (x.obj_type === "special") {
      let g = x.value;
      if (x.layer_type === "kiosk" && (g = "kiosk"), x.layer_type === "escalator" && (g = "escalator"), g) {
        let u = "222222";
        x.text_color != null && (u = x.text_color.replace("#", ""));
        const f = document.getElementById("map-special-svg-" + g);
        if (f) {
          const E = f.querySelector("svg");
          if (E) {
            const C = E.cloneNode(!0);
            C.querySelectorAll("[fill]").forEach((j) => {
              j.setAttribute("fill", "#" + u);
            });
            const F = new XMLSerializer().serializeToString(C), D = new Blob([F], { type: "image/svg+xml" }), e1 = URL.createObjectURL(D);
            d(e1);
          } else
            console.error("svg_element not found", g), d("");
        } else
          console.error("svg_block not found", g), d("");
      }
    } else
      x.custom_image !== "" && ((S = x == null ? void 0 : x.custom_image) != null && S.startsWith("http")) ? d(x.custom_image) : (console.error("custom_image URL not found"), d(""));
  }), m = (x, p, d) => {
    const _ = document.createElement("img");
    _.crossOrigin = "anonymous", _.src = x, _.onload = function() {
      const S = document.getElementById("temp-image-rendering");
      S && (_.style.height = "100px", S.appendChild(_), setTimeout(() => {
        const g = document.createElement("canvas"), u = g.getContext("2d");
        if (u) {
          g.width = _.width * t8, g.height = _.height * t8, u == null || u.drawImage(_, 0, 0, g.width, g.height);
          let f = new O9(g);
          f.colorSpace = "srgb";
          const E = new te(p.size, p.size * _.height / _.width), C = new H4({
            map: f,
            transparent: !0,
            side: i2,
            depthTest: !1,
            depthWrite: !1
          });
          p.layer_type === "kiosk" && (C.visible = !1), d(E, C);
        }
      }, 100));
    }, _.onerror = function() {
      console.error("processImage():: Error loading image:", x);
    };
  }, v = r1((x, p, d, _, S, g, u, f, E, C) => {
    s(d, p[d.retailer_id]).then((w) => {
      w && m(w, d, (F, D) => {
        var l1;
        const e1 = new k2(F, D), j = _.floor_index;
        i(S, u, f, e1, x), e1.object_id = g, e1.floor_index = j, e1.renderOrder = n("layer-image"), (l1 = E[j]) == null || l1.objsGroup.add(e1), C({ storeLogo: e1 });
      });
    });
  }, [n]), A = r1((x, p, d, _, S, g) => {
    const u = _ + p;
    let f = null;
    if (x.boundingBox || x.computeBoundingBox(), !x.boundingBox)
      return null;
    const E = x.boundingBox, C = new w1();
    E.getCenter(C);
    const w = new w1();
    E.getSize(w);
    let F = l[p] ? l[p] : { layer_type: p.startsWith("escalator") ? "escalator" : "custom_text", custom_text: "", size: 8 };
    if (["retail_name", "retail_text", "custom_text"].includes(F.layer_type)) {
      let D = "";
      F.layer_type === "retail_name" && F.retailer_id && e[F.retailer_id] ? D = e[F.retailer_id].retail_name : ["retail_text", "custom_text"].includes(F.layer_type) ? D = F.custom_text : D = "";
      let e1 = o.STORE_TEXT_COLOR;
      F.text_color && (e1 = k1(F.text_color));
      const j = {
        color: e1,
        transparent: !1,
        side: i2,
        depthWrite: !1,
        depthTest: !1
      };
      let l1 = new H4(j), $ = new s5(D, {
        font: S,
        size: parseInt(F.size),
        height: 0.01,
        curveSegments: 4
      });
      $.center();
      const Q = new k2($, l1);
      Q.userData.debug_name = D, Q.userData.font = S, i(p, C, w, Q, l), Q.object_id = u, Q.floor_index = d, Q.renderOrder = n("layer-text"), F.layer_type === "retail_name" && (Q.userData.retail_name = D), t[d].objsGroup.add(Q), f = { textMesh: Q };
    } else (F.layer_type === "retail_logo" || F.layer_type === "custom_image" || F.obj_type === "special" && F.layer_type === "kiosk" && F.kiosk_id != null || F.obj_type === "special" && F.layer_type === "amenity" && F.value !== "" || F.layer_type === "escalator") && v(l, e, F, x, p, u, C, w, t, g);
    return f;
  }, [l, e, t, v, n, o.STORE_TEXT_COLOR]);
  return {
    drawTextLogoStoreOnMap: r,
    addTextOrLogoOnStore: q,
    getMeshGroupBoundingBox: c,
    layer_text_logo_position_by_id: i,
    getImage: s,
    processImage: m,
    getImageLogo: v,
    get_store_name_logo_geometry: A
  };
};
let A3 = [];
const Ll = () => {
  const { mapConfig: e, initialFloorsDataIsLoaded: l, allIndexedMapObjects: t, allIndexedRetailers: o, allMapObjects: n, allNodesFloor: r, pathFinderGraph: q, setPathFinderGraph: c, mapApiResponse: i } = r4(), [a, s] = c1([]), [m, v] = c1([]), [A, x] = c1([]), [p, d] = c1([]);
  let _ = V7(_6, i.floors.map((D) => L9(D.svgUrl, e)));
  const { GeometriesAndMaterials: S, graph: g, escalator_nodes: u, allSvgObjectIds: f } = Ml(_), { get_store_name_logo_geometry: E } = u5(), C = w9(N9), w = r1((D) => (e1) => {
    x((j) => (j[D] ? j[D].push({ ...e1 }) : j[D] = [{ ...e1 }], [...j]));
  }, []), F = r1(() => {
    s((D) => (D && D.forEach((e1) => {
      e1 && e1.forEach((j) => {
        j.mesh.removeFromParent();
      });
    }), [])), v((D) => (D && D.forEach((e1) => {
      e1 && e1.forEach((j) => {
        j.textMesh.removeFromParent();
      });
    }), [])), x((D) => (D && D.forEach((e1) => {
      e1 && e1.forEach((j) => {
        j.storeLogo.removeFromParent();
      });
    }), []));
  }, []);
  return p1(() => {
    if (l && e.ROLE === "PORTAL")
      return () => {
        F();
      };
  }, [F, l]), p1(() => () => {
    F();
  }, []), p1(() => {
    if (!C || !_) return;
    x([]);
    const D = [];
    if (A3.forEach((l1) => {
      let $;
      for (let Z = 0; Z < S.length && ($ = S[Z].find((J) => J.object_id === l1.map_obj_name), $ === void 0); Z++)
        ;
      if (!$) return null;
      const Q = E($.geometry, l1.map_obj_name, $.floor_index, D2, C, w($.floor_index));
      Q && (D[$.floor_index] || (D[$.floor_index] = []), D[$.floor_index].push(Q));
    }), S.reduce((l1, $) => l1 + $.length, 0) - A3.length !== 0) {
      const l1 = /* @__PURE__ */ new Set();
      A3.forEach(($) => {
        l1.add($.map_obj_name);
      }), S.forEach(($) => {
        $.forEach((Q) => {
          if (!l1.has(Q.object_id)) {
            const Z = E(
              Q.geometry,
              Q.object_id,
              Q.floor_index,
              D2,
              C,
              w(Q.floor_index)
            );
            Z && (D[Q.floor_index] || (D[Q.floor_index] = []), D[Q.floor_index].push(Z));
          }
        });
      });
    }
    s([...S]), v(D), c(g), d([...u]);
  }, [_, C, t, o, n, r, q, e, c, w, S, E, g, u]), W1(() => ({
    meshParams: a,
    textParams: m,
    storeLogos: A,
    pathFinderGraph: q,
    escalator_nodes: p,
    allSvgObjectIds: f
  }), [a, m, A, q, p, f]);
}, Pl = (e) => {
  const { scene: l } = h6();
  return e.background && (l.background = new g6(e.background)), null;
}, Fl = (e) => {
  const { camera: l } = h6(), t = e.far || e.near || e.fov;
  return e.far && (l.far = e.far), e.near && (l.near = e.near), l instanceof O2 && e.fov && (l.fov = e.fov), t && l.updateProjectionMatrix(), null;
};
function C8(e) {
  return e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
}
function Bl({ mesh: e }) {
  const l = v1(null);
  return p1(() => {
    var r;
    if (!e)
      return;
    if (!((r = e.geometry.index) != null && r.count)) {
      console.log("NO ROUTE TUBE GEOMETRY INDEX COUNT");
      return;
    }
    if (!(e.material instanceof H4))
      return;
    if (!e.material.map) {
      console.log("NO ROUTE TEXTURE");
      return;
    }
    e.geometry.setDrawRange(0, 0);
    const t = e.geometry.index.count, o = (() => {
      const c = performance.now();
      return () => {
        const i = (performance.now() - c) / 1e3, a = Math.floor(C8(i) * t);
        i >= 1 && (l.current = n), e.geometry.setDrawRange(0, a);
      };
    })(), n = (() => {
      if (!(e.material instanceof H4) || !e.material.map)
        return null;
      const q = e.material.map.offset, c = 2e3, i = 0.1, a = 1 + i, s = performance.now();
      return () => {
        const m = (performance.now() - s) / c % 1;
        q.x = i - a * C8(m);
      };
    })();
    return l.current = o, () => {
      l.current = null, e.removeFromParent(), e.material instanceof H4 && e.material.dispose(), e.geometry && e.geometry.dispose();
    };
  }, [e]), S9(() => {
    if (l.current)
      try {
        l.current();
      } catch (t) {
        console.error(`ERROR ANIMATE ROUTE: ${t.message}`), l.current = null;
      }
  }), e ? /* @__PURE__ */ G("primitive", { object: e }) : null;
}
const Gl = "_escalator_elems_1kqb9_1", kl = "_element_1kqb9_4", Dl = "_svgIcon_1kqb9_21", Vl = "_label_1kqb9_34", v2 = {
  escalator_elems: Gl,
  element: kl,
  svgIcon: Dl,
  label: Vl
}, Wl = "_mapCenterMarker_1eu0j_18", jl = {
  mapCenterMarker: Wl
}, E8 = ({ size: e, lockSize: l, blink: t, cameraLength: o, text_color: n = "black" }) => {
  const { mapConfig: r } = r4(), [, q] = c1(1), [c, i] = c1(null), a = l ? 5 * e / 256 : 8 * e;
  p1(() => {
    !l && o !== void 0 && q(1 - (o - r.CAMERA.minDistance) / (r.CAMERA.maxDistance - r.CAMERA.minDistance));
  }, [l, r, o]);
  const s = W1(() => c ? new ne({ map: c, sizeAttenuation: !l, depthTest: !1, depthWrite: !1, color: n }) : null, [l, c, n]);
  return p1(() => {
    var v;
    const m = (v = document.getElementById("map-special-svg-kiosk")) == null ? void 0 : v.querySelector("svg");
    if (m) {
      const A = m.cloneNode(!0), x = new XMLSerializer().serializeToString(A), p = new Blob([x], { type: "image/svg+xml" }), d = URL.createObjectURL(p), _ = document.createElement("canvas");
      _.width = 256, _.height = 256;
      const S = _.getContext("2d"), g = document.createElement("img");
      g.src = d, g.onload = () => {
        S == null || S.drawImage(g, 96, 0, 64, 128);
        const u = new oe(_);
        u.needsUpdate = !0, i(u);
      };
    }
  }, []), s ? /* @__PURE__ */ f1("group", { children: [
    /* @__PURE__ */ G("sprite", { scale: a, material: s }),
    t && /* @__PURE__ */ G(b6, { children: /* @__PURE__ */ G("div", { className: `mapCenterMarker ${jl.mapCenterMarker}` }) })
  ] }) : null;
}, Xl = (e) => {
  if (e) {
    var l = { ...e };
    return l.r = e.r * 0.92, l.g = e.g * 0.92, l.b = e.b * 0.92, l;
  }
  return null;
}, A8 = (e) => {
  const { type: l, mesh: t, currentFloorIndex: o } = e;
  p1(() => (t.userData.triggerUpdate = () => {
  }, () => t.userData.triggerUpdate = void 0), [t.userData]);
  const { cameraLength: n } = r4();
  switch (l) {
    case "storeLogo":
      return t.userData.kioskConfig && t.userData.kioskConfig.floorIndex === o ? /* @__PURE__ */ G("primitive", { object: t, children: /* @__PURE__ */ G(E8, { size: t.userData.kioskConfig.size, blink: t.userData.kioskConfig.blink, cameraLength: n, lockSize: t.userData.kioskConfig.lockSize, text_color: t.userData.kioskConfig.text_color }) }, t.uuid) : /* @__PURE__ */ G("primitive", { object: t, children: t.userData.htmlContent ? /* @__PURE__ */ G(b6, { style: { pointerEvents: "none" }, distanceFactor: t.userData.distanceFactor, children: t.userData.htmlContent }) : null }, t.uuid);
    case "kiosk":
      return t.userData.kioskConfig && t.userData.kioskConfig.floorIndex === o ? /* @__PURE__ */ G(E8, { size: t.userData.kioskConfig.size, blink: t.userData.kioskConfig.blink, cameraLength: n, lockSize: t.userData.kioskConfig.lockSize, text_color: t.userData.kioskConfig.text_color }) : null;
    default:
      return null;
  }
}, Hl = (e) => {
  const { meshFloors: l, routeTube: t, floorIndex: o, currentFloorIndex: n, activeObjectId: r, hoverObjectId: q, visible: c, handleChangeFloor: i } = e, { mapConfig: a, floorsData: s } = r4(), { meshParams: m, textParams: v, storeLogos: A } = l, x = s[o], p = e.onPointerMove, d = e.onPointerEnter, _ = e.onPointerLeave, S = e.onClick, g = m[o], u = v[o], f = A[o], E = s[o].escalatorMeshes;
  return /* @__PURE__ */ f1("group", { visible: c, children: [
    g == null ? void 0 : g.map((C) => {
      if (!C.mesh) return null;
      const w = c && C.mesh.visible && x.interactiveObjs && x.interactiveObjs.includes(C.mesh), F = q && C.mesh.object_id === q, D = r && C.mesh.object_id === r;
      if (w)
        if ((D || F) && (C.mesh.material instanceof z9 || C.mesh.material instanceof re)) {
          const e1 = D ? a.ACCENT_COLOR : C.mesh.material.colorDefault;
          C.mesh.material.color = F ? Xl(e1) : e1;
        } else
          C.mesh.material.color = C.mesh.material.colorDefault;
      return /* @__PURE__ */ G("group", { ...w ? { onPointerOver: d, onPointerMove: p, onPointerOut: _, onClick: S } : {}, children: /* @__PURE__ */ G("primitive", { object: C.mesh }) }, C.mesh.uuid);
    }),
    u == null ? void 0 : u.map((C) => C.textMesh ? /* @__PURE__ */ G(Y1.Fragment, { children: /* @__PURE__ */ G("primitive", { object: C.textMesh, children: C.textMesh.userData.kioskConfig ? /* @__PURE__ */ G(A8, { mesh: C.textMesh, currentFloorIndex: n, type: "kiosk", visible: c }, void 0) : null }) }, C.textMesh.uuid) : null),
    f == null ? void 0 : f.map((C) => C.storeLogo ? /* @__PURE__ */ G(A8, { mesh: C.storeLogo, currentFloorIndex: n, type: "storeLogo", visible: c }, C.storeLogo.uuid) : null),
    E == null ? void 0 : E.map((C) => {
      var w, F;
      return /* @__PURE__ */ G("primitive", { object: C, children: /* @__PURE__ */ G(b6, { visible: !0, position: (w = C.geometry.boundingSphere) == null ? void 0 : w.center, children: /* @__PURE__ */ G(
        "div",
        {
          className: `escalator_elems ${v2.escalator_elems}`,
          style: { display: c ? "block" : "none" },
          onClick: (D) => {
            var e1;
            return D.stopPropagation(), i(((e1 = C.goToFloor) == null ? void 0 : e1.index) || 0), !1;
          },
          onPointerMove: (D) => D.stopPropagation(),
          children: /* @__PURE__ */ f1("div", { className: `element ${v2.element}`, id: C.object_id, children: [
            /* @__PURE__ */ G("div", { className: `svgIcon ${v2.svgIcon}`, dangerouslySetInnerHTML: { __html: M9("escalator") } }),
            /* @__PURE__ */ f1("div", { className: `label ${v2.label}`, children: [
              (F = C.goToFloor) == null ? void 0 : F.direction,
              ": ",
              C.goToFloor ? s[C.goToFloor.index].name : ""
            ] })
          ] })
        }
      ) }) }, `escalator-${C.object_id}`);
    }),
    /* @__PURE__ */ G(Bl, { mesh: t })
  ] });
};
function S8(e, l, t, o) {
  if (Array.isArray(e) || (e = [e]), !e.length)
    return console.warn("get_camera_focus_object: no objects passed"), { position: new w1(), target: new w1() };
  const n = e.reduce((p, d) => (d.geometry.boundingBox || d.geometry.computeBoundingBox(), d.geometry.boundingBox && p.union(d.geometry.boundingBox), p), new T9()), r = new w1();
  n.getSize(r);
  const q = new w1();
  n.getCenter(q), e[0].localToWorld(q);
  let c = Math.tan(Math.PI * l / 360), i = 1.1, a = r.x * i / 2 / (c * t), s = r.y * i / 2 / c, m = Math.max(a, s), v = Zl(m, o);
  const A = new w1(q.x, 0, q.z);
  return { position: new w1(q.x, m, q.z + v), target: A };
}
function Zl(e, l) {
  let t = 60;
  return l === "2D" && (t = 89.9), e / Math.tan(t * Math.PI / 180);
}
const Yl = L4((e, l) => {
  const { mapConfig: t, allMapObjects: o, allIndexedMapObjects: n, allNodesFloor: r, mapApiResponse: q, pathFinderGraph: c, setCameraLength: i, floorsData: a } = r4(), { make_amenity_route: s, create_route: m } = c5(), [v, A] = c1(!1), {
    meshFloors: x,
    currentFloorIndex: p,
    currKioskObj: d,
    currKioskFloorIndex: _,
    routeTargetId: S,
    routeTargetFromId: g,
    selectedAmenityType: u,
    handleChangeFloor: f,
    escalatorNodes: E,
    zoom: C,
    handleCameraLength: w,
    handleCameraAndControlsChange: F,
    activeObjectId: D,
    isSelectedRetailerSlug: e1,
    setIsCameraInit: j,
    handleObjectClick: l1,
    triggerClick: $,
    cameraControlsPosition: Q,
    deviceType: Z
  } = e, [J, P] = c1({ min: t.CAMERA.minDistance, max: t.CAMERA.maxDistance, initialDistance: 0, needsUpdate: !0 }), q1 = v1(null), [B, M] = c1([]), W = v1(null), { camera: H, scene: z } = h6(), I = v1(null), b = t.STYLE, h = t.ACCENT_COLOR, R = d ? d.object_id : g || void 0, k = t.ROLE === "PORTAL" && S, N = r1((V = !1) => {
    if (!(H instanceof O2)) {
      console.error("Camera is not a PerspectiveCamera");
      return;
    }
    const O = x.meshParams[_];
    if (!(O != null && O.length)) {
      console.warn("objects not loaded yet");
      return;
    }
    let y;
    y = O.map((y1) => y1.mesh);
    const n1 = S8(y, H.fov, H.aspect, t.ROLE === "PORTAL" ? "2D" : b);
    let a1 = !0;
    if (Q) {
      let y1 = Q.camera;
      y1 instanceof w1 || (y1 = new w1(y1.x, y1.y, y1.z)), a1 = y1.length() === 0;
    }
    !V && Q && !a1 && !["PORTAL"].includes(t.ROLE) && (n1.position.set(Q.camera.x, Q.camera.y, Q.camera.z), n1.target.set(Q.controls.x, Q.controls.y, Q.controls.z));
    const I1 = Math.min(
      J.max,
      Math.max(
        J.min,
        n1.position.distanceTo(n1.target)
      )
    );
    n1.position.sub(n1.target).setLength(I1).add(n1.target), I.current = {
      ...n1,
      fromPosition: W.current.object.position.clone(),
      fromTarget: W.current.target.clone(),
      animationStartTime: performance.now(),
      duration: t.CAMERA.animSpeed
      // how long it takes to move camera to get to new position
    }, ["DISPLAY_APP", "WP_SITE"].includes(t.ROLE) && J.needsUpdate === !1 && J.initialDistance > 0 && P((y1) => ({
      ...y1,
      min: t.CAMERA.minDistance < 0.1 ? 0.1 : t.CAMERA.minDistance,
      max: t.CAMERA.maxDistance
    }));
  }, [H, J.needsUpdate, t.CAMERA.animSpeed, t.CAMERA.maxDistance, t.CAMERA.minDistance, Q, t.ROLE, _, x.meshParams, b]), K = I.current ? I.current.position.distanceTo(I.current.target) : 0;
  p1(() => {
    Q && N();
  }, [Q, N]), p1(() => {
    K > 0 && J.needsUpdate && (P({ min: t.CAMERA.minDistance < 0.1 ? 0.1 : t.CAMERA.minDistance, max: t.CAMERA.maxDistance, initialDistance: K, needsUpdate: !1 }), j(!0));
  }, [K, J.needsUpdate, t.CAMERA, j]), p1(() => {
    P((V) => ({ ...V, needsUpdate: !0 }));
  }, [t.CAMERA]), p1(() => {
    x.meshParams.length > 0 && N();
  }, [x.meshParams.length, N]), p1(() => {
    if (!u || t.ROLE === "PORTAL") {
      M([]);
      return;
    }
    const { routePaths: V, fromFloor: O } = s(R ?? "", u, z, E, b);
    M(V), O !== void 0 && f(O), d && t.ROLE === "DISPLAY_APP" && f(_);
  }, [u, z, c, a, E, b, R, t.ROLE, r, n, s, d, f, _]);
  const T = r1(() => {
    a.flat().forEach((V) => V.escalatorMeshes = []);
  }, [a]);
  p1(() => {
    if (!R || !S || t.ROLE === "PORTAL") {
      if (t.ROLE === "PORTAL")
        if (S) {
          const y = z.getObjectByProperty("object_id", S);
          y && M([y]);
        } else
          T(), M([]);
      else u || (T(), M([]));
      return;
    }
    u || a.forEach((y) => {
      y.escalatorMeshes = [];
    });
    const { routePaths: V, fromFloor: O } = m(r, R, S, z, a, x.escalator_nodes, c, b);
    M(V), O !== void 0 && f(O);
  }, [R, S, z, H, a, h, c, b, x.escalator_nodes, u, t.ROLE, r, $, m, T, f]);
  const t1 = x.meshParams[p];
  p1(() => {
    var a1;
    if (t.ROLE === "PORTAL_RESPONSIVE") return;
    if (!(H instanceof O2)) {
      console.error("Camera is not a PerspectiveCamera");
      return;
    }
    if (!(t1 != null && t1.length)) {
      console.warn("objects not loaded yet");
      return;
    }
    let V = (a1 = a[p]) == null ? void 0 : a1.routeMeshes;
    if (!D && !u)
      return;
    let O = [];
    if (B[p] && (V != null && V.length))
      O = [...V];
    else if (D && (t.ROLE === "PORTAL" || e1)) {
      const I1 = S && t1.find((y1) => y1.mesh.object_id === S);
      I1 && (O = [I1.mesh]);
    }
    O.length || (O = t1.map((I1) => I1.mesh));
    const y = S8(O, H.fov, H.aspect, t.ROLE === "PORTAL" || t.ROLE === "WP_SITE" ? "2D" : b), n1 = Math.min(
      k ? t.CAMERA.maxDistance : J.max,
      Math.max(
        k ? t.CAMERA.minDistance : J.min,
        y.position.distanceTo(y.target)
      )
    );
    y.position.sub(y.target).setLength(n1).add(y.target), I.current = {
      ...y,
      fromPosition: W.current.object.position.clone(),
      fromTarget: W.current.target.clone(),
      animationStartTime: performance.now(),
      duration: t.CAMERA.animSpeed
      // how long it takes to move camera to get to new position
    };
  }, [B, t1, p, b, H, S, t.ROLE, t.CAMERA.maxDistance, t.CAMERA.minDistance, t.CAMERA.animSpeed, a, D, u, e1, k, J.max, J.min]), p1(() => {
    if (C != null && C.direction && W.current) {
      if (!(H instanceof O2)) {
        console.error("Camera is not a PerspectiveCamera");
        return;
      }
      if (!t1.length) {
        console.warn("objects not loaded yet");
        return;
      }
      let V;
      if (B[p]) {
        V = [B[p]];
        const n1 = S && t1.find((a1) => a1.mesh.object_id === S);
        n1 && V.push(n1.mesh);
      } else
        V = t1.map((n1) => n1.mesh);
      const O = {
        position: W.current.object.position.clone(),
        target: W.current.target.clone()
      };
      let y = parseInt(O.position.distanceTo(O.target));
      C.direction === "in" ? y -= t.ZOOM_STEP : y += t.ZOOM_STEP, y = Math.min(
        J.max,
        Math.max(
          J.min,
          y
        )
      ), O.position.sub(O.target).setLength(y).add(O.target), I.current = {
        ...O,
        fromPosition: W.current.object.position.clone(),
        fromTarget: W.current.target.clone(),
        animationStartTime: performance.now(),
        duration: t.CAMERA.animSpeed
        // how long it takes to move camera to get to new position
      };
    }
  }, [C]);
  const U = () => J.initialDistance, Y = r1((V) => {
    if (w) {
      const O = new w1();
      O.copy(V.target.object.position), O.sub(W.current.target), w(O.length()), i(O.length()), F && F({
        camera: W.current.object.position.clone(),
        controls: W.current.target.clone()
      });
    }
  }, [w, F, i]);
  S9(() => {
    var V, O;
    if ((V = I.current) != null && V.duration && ((O = I.current) == null ? void 0 : O.duration) > 0) {
      v || (A(!0), I.current.duration = 0);
      const y = I.current, n1 = (performance.now() - y.animationStartTime) / 1e3, a1 = Math.min(1, n1 / (y == null ? void 0 : y.duration));
      W.current.object.position.lerpVectors(y.fromPosition, y.position, a1), W.current.target.lerpVectors(y == null ? void 0 : y.fromTarget, y.target, a1), W.current.object.updateProjectionMatrix(), a1 >= 1 && (I.current = null);
    }
  });
  const L = r1((V) => {
    if (V > 0) {
      const O = q.retailers.find((y) => y.id === V);
      if (O) {
        const y = q.map_objs.filter((n1) => n1.retailer_id === O.id);
        for (let n1 = 0; n1 < y.length; n1++)
          if (o.includes(y[n1].map_obj_name)) {
            const a1 = z.getObjectByProperty("object_id", y[n1].map_obj_name);
            a1 && l1(a1, y[n1].map_obj_name, !0);
            break;
          }
      }
    }
  }, [l1, q, z]);
  return f6(l, () => ({
    resetCamera: N,
    createRouteToStore: L,
    getInitialDistance: U
  })), /* @__PURE__ */ f1("group", { rotation: [Math.PI / 2, 0, 0], ref: q1, children: [
    /* @__PURE__ */ G(
      ie,
      {
        makeDefault: !0,
        onChange: Y,
        ref: W,
        maxPolarAngle: Math.PI / 2,
        minDistance: k ? S4.CAMERA.minDistance : J.min,
        maxDistance: k ? S4.CAMERA.maxDistance : J.max,
        enableZoom: t.ROLE === "PORTAL" || t.ROLE === "DISPLAY_APP" || t.ROLE === "WP_SITE" && ["mobile", "tablet"].includes(Z),
        enableRotate: t.ROLE !== "WP_SITE" && t.ROLE !== "PORTAL_RESPONSIVE" && t.ROLE !== "DISPLAY_APP",
        dampingFactor: 0.3
      }
    ),
    a && a.map((V, O) => /* @__PURE__ */ G(
      Hl,
      {
        visible: p === O,
        floorIndex: O,
        currentFloorIndex: p,
        currKioskObj: e.currKioskObj,
        activeObjectId: e.activeObjectId,
        hoverObjectId: e.hoverObjectId,
        meshFloors: x,
        routeTube: t.ROLE !== "PORTAL" ? B && B[O] : void 0,
        onPointerEnter: e.onPointerEnter,
        onPointerLeave: e.onPointerLeave,
        onPointerMove: e.onPointerMove,
        onClick: e.onClick,
        handleChangeFloor: f
      },
      `Map-${O}`
    ))
  ] });
}), Jl = "_threejsMapWrapper_6jbfd_1", Ul = "_threejsMap_6jbfd_1", $l = "_map_controls_6jbfd_18", Ql = "_amenities_6jbfd_112", Kl = "_amenity_6jbfd_123", et = "_content_6jbfd_155", lt = "_icon_6jbfd_163", tt = "_name_6jbfd_176", _4 = {
  threejsMapWrapper: Jl,
  threejsMap: Ul,
  map_controls: $l,
  amenities: Ql,
  amenity: Kl,
  content: et,
  icon: lt,
  name: tt
}, nt = (e) => {
  const { selectedFloorIndex: l, handleFloorChange: t, amenitiesList: o, zoomIn: n, zoomOut: r, reset: q, handleAmenityClick: c, onExtractedAmenities: i } = e, { mapConfig: a, mapApiResponse: s, floorsData: m, allMapObjects: v } = r4(), A = (p) => {
    p.preventDefault(), q instanceof Function && (a.ROLE === "PORTAL_RESPONSIVE" || a.ROLE === "PORTAL" ? q(!0) : q());
  }, x = W1(() => s != null && s.map_objs ? s == null ? void 0 : s.map_objs.filter((p) => p.layer_type === "amenity" && v.includes(p.map_obj_name)).map((p) => p.value) : [], [s, v]);
  return p1(() => {
    i && i(x);
  }, [i, x]), /* @__PURE__ */ G("div", { className: _4.threejsMapWrapper, children: /* @__PURE__ */ f1("div", { className: _4.threejsMap, children: [
    m.length > 0 && /* @__PURE__ */ G("div", { className: `map_controls ${_4.map_controls}`, children: /* @__PURE__ */ f1("div", { className: "map_controls_wrapper", children: [
      /* @__PURE__ */ G("div", { className: "floors btn_group", children: m.length > 1 && m.map((p, d) => /* @__PURE__ */ G("div", { className: `floor control_btn ${d === l ? "active" : ""}`, onClick: () => {
        t(d);
      }, children: p.name }, d)) }),
      /* @__PURE__ */ f1("div", { className: "reset-zoom", children: [
        /* @__PURE__ */ G("div", { onClick: A, className: "reset_btn control_btn", children: "RESET" }),
        /* @__PURE__ */ f1("div", { className: "zoom_btns", children: [
          /* @__PURE__ */ G("div", { onClick: r, className: "zoom-out control_btn", children: "–" }),
          /* @__PURE__ */ G("div", { onClick: n, className: "zoom-in control_btn", children: "+" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ G("div", { className: "loading_map hide", children: "Loading map, please wait..." }),
    !["PORTAL", "DISPLAY_APP"].includes(a.ROLE) && /* @__PURE__ */ G("div", { className: `amenities ${_4.amenities}`, style: { display: "block" }, children: o.map((p, d) => x.includes(p.type) ? /* @__PURE__ */ G(
      "div",
      {
        className: `amenity ${_4.amenity}`,
        onClick: () => c(p.type),
        children: /* @__PURE__ */ f1("div", { className: `content ${_4.content}`, children: [
          /* @__PURE__ */ G("div", { className: `icon ${_4.icon}`, dangerouslySetInnerHTML: { __html: M9(p.type) } }),
          /* @__PURE__ */ G("div", { className: `name ${_4.name}`, children: p.name })
        ] })
      },
      `amenity-${p.name}-${d}`
    ) : null) })
  ] }) });
}, ot = "_mapBoxSidebar_kftp4_1", rt = "_active_kftp4_6", qt = "_sidebarWrapper_kftp4_10", it = "_sidebarBox_kftp4_15", at = "_mapBox_kftp4_1", st = "_storeNamePlaceholder_kftp4_29", ct = "_stats_kftp4_41", I4 = {
  mapBoxSidebar: ot,
  active: rt,
  sidebarWrapper: qt,
  sidebarBox: it,
  mapBox: at,
  storeNamePlaceholder: st,
  stats: ct
};
function O6(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var m5 = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var l = {}.hasOwnProperty;
    function t() {
      for (var r = "", q = 0; q < arguments.length; q++) {
        var c = arguments[q];
        c && (r = n(r, o(c)));
      }
      return r;
    }
    function o(r) {
      if (typeof r == "string" || typeof r == "number")
        return r;
      if (typeof r != "object")
        return "";
      if (Array.isArray(r))
        return t.apply(null, r);
      if (r.toString !== Object.prototype.toString && !r.toString.toString().includes("[native code]"))
        return r.toString();
      var q = "";
      for (var c in r)
        l.call(r, c) && r[c] && (q = n(q, c));
      return q;
    }
    function n(r, q) {
      return q ? r ? r + " " + q : r + q : r;
    }
    e.exports ? (t.default = t, e.exports = t) : window.classNames = t;
  })();
})(m5);
var ut = m5.exports;
const L1 = /* @__PURE__ */ O6(ut);
function h1() {
  return h1 = Object.assign ? Object.assign.bind() : function(e) {
    for (var l = 1; l < arguments.length; l++) {
      var t = arguments[l];
      for (var o in t) ({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, h1.apply(null, arguments);
}
function d5(e, l) {
  if (e == null) return {};
  var t = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (l.indexOf(o) !== -1) continue;
    t[o] = e[o];
  }
  return t;
}
function W2(e, l) {
  return W2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, o) {
    return t.__proto__ = o, t;
  }, W2(e, l);
}
function mt(e, l) {
  e.prototype = Object.create(l.prototype), e.prototype.constructor = e, W2(e, l);
}
const dt = ["xxl", "xl", "lg", "md", "sm", "xs"], ft = "xs", x2 = /* @__PURE__ */ s1.createContext({
  prefixes: {},
  breakpoints: dt,
  minBreakpoint: ft
}), {
  Consumer: ls,
  Provider: ts
} = x2;
function X1(e, l) {
  const {
    prefixes: t
  } = Q1(x2);
  return e || t[l] || l;
}
function xt() {
  const {
    breakpoints: e
  } = Q1(x2);
  return e;
}
function ht() {
  const {
    minBreakpoint: e
  } = Q1(x2);
  return e;
}
function pt() {
  const {
    dir: e
  } = Q1(x2);
  return e === "rtl";
}
function a3(e) {
  return e && e.ownerDocument || document;
}
function gt(e) {
  var l = a3(e);
  return l && l.defaultView || window;
}
function bt(e, l) {
  return gt(e).getComputedStyle(e, l);
}
var _t = /([A-Z])/g;
function vt(e) {
  return e.replace(_t, "-$1").toLowerCase();
}
var yt = /^ms-/;
function y2(e) {
  return vt(e).replace(yt, "-ms-");
}
var It = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function Ct(e) {
  return !!(e && It.test(e));
}
function T4(e, l) {
  var t = "", o = "";
  if (typeof l == "string")
    return e.style.getPropertyValue(y2(l)) || bt(e).getPropertyValue(y2(l));
  Object.keys(l).forEach(function(n) {
    var r = l[n];
    !r && r !== 0 ? e.style.removeProperty(y2(n)) : Ct(n) ? o += n + "(" + r + ") " : t += y2(n) + ": " + r + ";";
  }), o && (t += "transform: " + o + ";"), e.style.cssText += ";" + t;
}
var $3 = { exports: {} }, I2 = { exports: {} }, A1 = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var R8;
function Et() {
  if (R8) return A1;
  R8 = 1;
  var e = typeof Symbol == "function" && Symbol.for, l = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, n = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, q = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, a = e ? Symbol.for("react.concurrent_mode") : 60111, s = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, v = e ? Symbol.for("react.suspense_list") : 60120, A = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, d = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
  function g(f) {
    if (typeof f == "object" && f !== null) {
      var E = f.$$typeof;
      switch (E) {
        case l:
          switch (f = f.type, f) {
            case i:
            case a:
            case o:
            case r:
            case n:
            case m:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case c:
                case s:
                case x:
                case A:
                case q:
                  return f;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  function u(f) {
    return g(f) === a;
  }
  return A1.AsyncMode = i, A1.ConcurrentMode = a, A1.ContextConsumer = c, A1.ContextProvider = q, A1.Element = l, A1.ForwardRef = s, A1.Fragment = o, A1.Lazy = x, A1.Memo = A, A1.Portal = t, A1.Profiler = r, A1.StrictMode = n, A1.Suspense = m, A1.isAsyncMode = function(f) {
    return u(f) || g(f) === i;
  }, A1.isConcurrentMode = u, A1.isContextConsumer = function(f) {
    return g(f) === c;
  }, A1.isContextProvider = function(f) {
    return g(f) === q;
  }, A1.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === l;
  }, A1.isForwardRef = function(f) {
    return g(f) === s;
  }, A1.isFragment = function(f) {
    return g(f) === o;
  }, A1.isLazy = function(f) {
    return g(f) === x;
  }, A1.isMemo = function(f) {
    return g(f) === A;
  }, A1.isPortal = function(f) {
    return g(f) === t;
  }, A1.isProfiler = function(f) {
    return g(f) === r;
  }, A1.isStrictMode = function(f) {
    return g(f) === n;
  }, A1.isSuspense = function(f) {
    return g(f) === m;
  }, A1.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === o || f === a || f === r || f === n || f === m || f === v || typeof f == "object" && f !== null && (f.$$typeof === x || f.$$typeof === A || f.$$typeof === q || f.$$typeof === c || f.$$typeof === s || f.$$typeof === d || f.$$typeof === _ || f.$$typeof === S || f.$$typeof === p);
  }, A1.typeOf = g, A1;
}
var S1 = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var z8;
function At() {
  return z8 || (z8 = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, l = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, n = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, q = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, a = e ? Symbol.for("react.concurrent_mode") : 60111, s = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, v = e ? Symbol.for("react.suspense_list") : 60120, A = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, d = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
    function g(T) {
      return typeof T == "string" || typeof T == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      T === o || T === a || T === r || T === n || T === m || T === v || typeof T == "object" && T !== null && (T.$$typeof === x || T.$$typeof === A || T.$$typeof === q || T.$$typeof === c || T.$$typeof === s || T.$$typeof === d || T.$$typeof === _ || T.$$typeof === S || T.$$typeof === p);
    }
    function u(T) {
      if (typeof T == "object" && T !== null) {
        var t1 = T.$$typeof;
        switch (t1) {
          case l:
            var U = T.type;
            switch (U) {
              case i:
              case a:
              case o:
              case r:
              case n:
              case m:
                return U;
              default:
                var Y = U && U.$$typeof;
                switch (Y) {
                  case c:
                  case s:
                  case x:
                  case A:
                  case q:
                    return Y;
                  default:
                    return t1;
                }
            }
          case t:
            return t1;
        }
      }
    }
    var f = i, E = a, C = c, w = q, F = l, D = s, e1 = o, j = x, l1 = A, $ = t, Q = r, Z = n, J = m, P = !1;
    function q1(T) {
      return P || (P = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), B(T) || u(T) === i;
    }
    function B(T) {
      return u(T) === a;
    }
    function M(T) {
      return u(T) === c;
    }
    function W(T) {
      return u(T) === q;
    }
    function H(T) {
      return typeof T == "object" && T !== null && T.$$typeof === l;
    }
    function z(T) {
      return u(T) === s;
    }
    function I(T) {
      return u(T) === o;
    }
    function b(T) {
      return u(T) === x;
    }
    function h(T) {
      return u(T) === A;
    }
    function R(T) {
      return u(T) === t;
    }
    function k(T) {
      return u(T) === r;
    }
    function N(T) {
      return u(T) === n;
    }
    function K(T) {
      return u(T) === m;
    }
    S1.AsyncMode = f, S1.ConcurrentMode = E, S1.ContextConsumer = C, S1.ContextProvider = w, S1.Element = F, S1.ForwardRef = D, S1.Fragment = e1, S1.Lazy = j, S1.Memo = l1, S1.Portal = $, S1.Profiler = Q, S1.StrictMode = Z, S1.Suspense = J, S1.isAsyncMode = q1, S1.isConcurrentMode = B, S1.isContextConsumer = M, S1.isContextProvider = W, S1.isElement = H, S1.isForwardRef = z, S1.isFragment = I, S1.isLazy = b, S1.isMemo = h, S1.isPortal = R, S1.isProfiler = k, S1.isStrictMode = N, S1.isSuspense = K, S1.isValidElementType = g, S1.typeOf = u;
  }()), S1;
}
var O8;
function f5() {
  return O8 || (O8 = 1, process.env.NODE_ENV === "production" ? I2.exports = Et() : I2.exports = At()), I2.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var S3, T8;
function St() {
  if (T8) return S3;
  T8 = 1;
  var e = Object.getOwnPropertySymbols, l = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function o(r) {
    if (r == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(r);
  }
  function n() {
    try {
      if (!Object.assign)
        return !1;
      var r = new String("abc");
      if (r[5] = "de", Object.getOwnPropertyNames(r)[0] === "5")
        return !1;
      for (var q = {}, c = 0; c < 10; c++)
        q["_" + String.fromCharCode(c)] = c;
      var i = Object.getOwnPropertyNames(q).map(function(s) {
        return q[s];
      });
      if (i.join("") !== "0123456789")
        return !1;
      var a = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(s) {
        a[s] = s;
      }), Object.keys(Object.assign({}, a)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return S3 = n() ? Object.assign : function(r, q) {
    for (var c, i = o(r), a, s = 1; s < arguments.length; s++) {
      c = Object(arguments[s]);
      for (var m in c)
        l.call(c, m) && (i[m] = c[m]);
      if (e) {
        a = e(c);
        for (var v = 0; v < a.length; v++)
          t.call(c, a[v]) && (i[a[v]] = c[a[v]]);
      }
    }
    return i;
  }, S3;
}
var R3, w8;
function T6() {
  if (w8) return R3;
  w8 = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return R3 = e, R3;
}
var z3, N8;
function x5() {
  return N8 || (N8 = 1, z3 = Function.call.bind(Object.prototype.hasOwnProperty)), z3;
}
var O3, M8;
function Rt() {
  if (M8) return O3;
  M8 = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var l = T6(), t = {}, o = x5();
    e = function(r) {
      var q = "Warning: " + r;
      typeof console < "u" && console.error(q);
      try {
        throw new Error(q);
      } catch {
      }
    };
  }
  function n(r, q, c, i, a) {
    if (process.env.NODE_ENV !== "production") {
      for (var s in r)
        if (o(r, s)) {
          var m;
          try {
            if (typeof r[s] != "function") {
              var v = Error(
                (i || "React class") + ": " + c + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw v.name = "Invariant Violation", v;
            }
            m = r[s](q, s, i, c, null, l);
          } catch (x) {
            m = x;
          }
          if (m && !(m instanceof Error) && e(
            (i || "React class") + ": type specification of " + c + " `" + s + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in t)) {
            t[m.message] = !0;
            var A = a ? a() : "";
            e(
              "Failed " + c + " type: " + m.message + (A ?? "")
            );
          }
        }
    }
  }
  return n.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, O3 = n, O3;
}
var T3, L8;
function zt() {
  if (L8) return T3;
  L8 = 1;
  var e = f5(), l = St(), t = T6(), o = x5(), n = Rt(), r = function() {
  };
  process.env.NODE_ENV !== "production" && (r = function(c) {
    var i = "Warning: " + c;
    typeof console < "u" && console.error(i);
    try {
      throw new Error(i);
    } catch {
    }
  });
  function q() {
    return null;
  }
  return T3 = function(c, i) {
    var a = typeof Symbol == "function" && Symbol.iterator, s = "@@iterator";
    function m(B) {
      var M = B && (a && B[a] || B[s]);
      if (typeof M == "function")
        return M;
    }
    var v = "<<anonymous>>", A = {
      array: _("array"),
      bigint: _("bigint"),
      bool: _("boolean"),
      func: _("function"),
      number: _("number"),
      object: _("object"),
      string: _("string"),
      symbol: _("symbol"),
      any: S(),
      arrayOf: g,
      element: u(),
      elementType: f(),
      instanceOf: E,
      node: D(),
      objectOf: w,
      oneOf: C,
      oneOfType: F,
      shape: j,
      exact: l1
    };
    function x(B, M) {
      return B === M ? B !== 0 || 1 / B === 1 / M : B !== B && M !== M;
    }
    function p(B, M) {
      this.message = B, this.data = M && typeof M == "object" ? M : {}, this.stack = "";
    }
    p.prototype = Error.prototype;
    function d(B) {
      if (process.env.NODE_ENV !== "production")
        var M = {}, W = 0;
      function H(I, b, h, R, k, N, K) {
        if (R = R || v, N = N || h, K !== t) {
          if (i) {
            var T = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw T.name = "Invariant Violation", T;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var t1 = R + ":" + h;
            !M[t1] && // Avoid spamming the console because they are often not actionable except for lib authors
            W < 3 && (r(
              "You are manually calling a React.PropTypes validation function for the `" + N + "` prop on `" + R + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[t1] = !0, W++);
          }
        }
        return b[h] == null ? I ? b[h] === null ? new p("The " + k + " `" + N + "` is marked as required " + ("in `" + R + "`, but its value is `null`.")) : new p("The " + k + " `" + N + "` is marked as required in " + ("`" + R + "`, but its value is `undefined`.")) : null : B(b, h, R, k, N);
      }
      var z = H.bind(null, !1);
      return z.isRequired = H.bind(null, !0), z;
    }
    function _(B) {
      function M(W, H, z, I, b, h) {
        var R = W[H], k = Z(R);
        if (k !== B) {
          var N = J(R);
          return new p(
            "Invalid " + I + " `" + b + "` of type " + ("`" + N + "` supplied to `" + z + "`, expected ") + ("`" + B + "`."),
            { expectedType: B }
          );
        }
        return null;
      }
      return d(M);
    }
    function S() {
      return d(q);
    }
    function g(B) {
      function M(W, H, z, I, b) {
        if (typeof B != "function")
          return new p("Property `" + b + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var h = W[H];
        if (!Array.isArray(h)) {
          var R = Z(h);
          return new p("Invalid " + I + " `" + b + "` of type " + ("`" + R + "` supplied to `" + z + "`, expected an array."));
        }
        for (var k = 0; k < h.length; k++) {
          var N = B(h, k, z, I, b + "[" + k + "]", t);
          if (N instanceof Error)
            return N;
        }
        return null;
      }
      return d(M);
    }
    function u() {
      function B(M, W, H, z, I) {
        var b = M[W];
        if (!c(b)) {
          var h = Z(b);
          return new p("Invalid " + z + " `" + I + "` of type " + ("`" + h + "` supplied to `" + H + "`, expected a single ReactElement."));
        }
        return null;
      }
      return d(B);
    }
    function f() {
      function B(M, W, H, z, I) {
        var b = M[W];
        if (!e.isValidElementType(b)) {
          var h = Z(b);
          return new p("Invalid " + z + " `" + I + "` of type " + ("`" + h + "` supplied to `" + H + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return d(B);
    }
    function E(B) {
      function M(W, H, z, I, b) {
        if (!(W[H] instanceof B)) {
          var h = B.name || v, R = q1(W[H]);
          return new p("Invalid " + I + " `" + b + "` of type " + ("`" + R + "` supplied to `" + z + "`, expected ") + ("instance of `" + h + "`."));
        }
        return null;
      }
      return d(M);
    }
    function C(B) {
      if (!Array.isArray(B))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? r(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : r("Invalid argument supplied to oneOf, expected an array.")), q;
      function M(W, H, z, I, b) {
        for (var h = W[H], R = 0; R < B.length; R++)
          if (x(h, B[R]))
            return null;
        var k = JSON.stringify(B, function(K, T) {
          var t1 = J(T);
          return t1 === "symbol" ? String(T) : T;
        });
        return new p("Invalid " + I + " `" + b + "` of value `" + String(h) + "` " + ("supplied to `" + z + "`, expected one of " + k + "."));
      }
      return d(M);
    }
    function w(B) {
      function M(W, H, z, I, b) {
        if (typeof B != "function")
          return new p("Property `" + b + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var h = W[H], R = Z(h);
        if (R !== "object")
          return new p("Invalid " + I + " `" + b + "` of type " + ("`" + R + "` supplied to `" + z + "`, expected an object."));
        for (var k in h)
          if (o(h, k)) {
            var N = B(h, k, z, I, b + "." + k, t);
            if (N instanceof Error)
              return N;
          }
        return null;
      }
      return d(M);
    }
    function F(B) {
      if (!Array.isArray(B))
        return process.env.NODE_ENV !== "production" && r("Invalid argument supplied to oneOfType, expected an instance of array."), q;
      for (var M = 0; M < B.length; M++) {
        var W = B[M];
        if (typeof W != "function")
          return r(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + P(W) + " at index " + M + "."
          ), q;
      }
      function H(z, I, b, h, R) {
        for (var k = [], N = 0; N < B.length; N++) {
          var K = B[N], T = K(z, I, b, h, R, t);
          if (T == null)
            return null;
          T.data && o(T.data, "expectedType") && k.push(T.data.expectedType);
        }
        var t1 = k.length > 0 ? ", expected one of type [" + k.join(", ") + "]" : "";
        return new p("Invalid " + h + " `" + R + "` supplied to " + ("`" + b + "`" + t1 + "."));
      }
      return d(H);
    }
    function D() {
      function B(M, W, H, z, I) {
        return $(M[W]) ? null : new p("Invalid " + z + " `" + I + "` supplied to " + ("`" + H + "`, expected a ReactNode."));
      }
      return d(B);
    }
    function e1(B, M, W, H, z) {
      return new p(
        (B || "React class") + ": " + M + " type `" + W + "." + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function j(B) {
      function M(W, H, z, I, b) {
        var h = W[H], R = Z(h);
        if (R !== "object")
          return new p("Invalid " + I + " `" + b + "` of type `" + R + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var k in B) {
          var N = B[k];
          if (typeof N != "function")
            return e1(z, I, b, k, J(N));
          var K = N(h, k, z, I, b + "." + k, t);
          if (K)
            return K;
        }
        return null;
      }
      return d(M);
    }
    function l1(B) {
      function M(W, H, z, I, b) {
        var h = W[H], R = Z(h);
        if (R !== "object")
          return new p("Invalid " + I + " `" + b + "` of type `" + R + "` " + ("supplied to `" + z + "`, expected `object`."));
        var k = l({}, W[H], B);
        for (var N in k) {
          var K = B[N];
          if (o(B, N) && typeof K != "function")
            return e1(z, I, b, N, J(K));
          if (!K)
            return new p(
              "Invalid " + I + " `" + b + "` key `" + N + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(W[H], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(B), null, "  ")
            );
          var T = K(h, N, z, I, b + "." + N, t);
          if (T)
            return T;
        }
        return null;
      }
      return d(M);
    }
    function $(B) {
      switch (typeof B) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !B;
        case "object":
          if (Array.isArray(B))
            return B.every($);
          if (B === null || c(B))
            return !0;
          var M = m(B);
          if (M) {
            var W = M.call(B), H;
            if (M !== B.entries) {
              for (; !(H = W.next()).done; )
                if (!$(H.value))
                  return !1;
            } else
              for (; !(H = W.next()).done; ) {
                var z = H.value;
                if (z && !$(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function Q(B, M) {
      return B === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function Z(B) {
      var M = typeof B;
      return Array.isArray(B) ? "array" : B instanceof RegExp ? "object" : Q(M, B) ? "symbol" : M;
    }
    function J(B) {
      if (typeof B > "u" || B === null)
        return "" + B;
      var M = Z(B);
      if (M === "object") {
        if (B instanceof Date)
          return "date";
        if (B instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function P(B) {
      var M = J(B);
      switch (M) {
        case "array":
        case "object":
          return "an " + M;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + M;
        default:
          return M;
      }
    }
    function q1(B) {
      return !B.constructor || !B.constructor.name ? v : B.constructor.name;
    }
    return A.checkPropTypes = n, A.resetWarningCache = n.resetWarningCache, A.PropTypes = A, A;
  }, T3;
}
var w3, P8;
function Ot() {
  if (P8) return w3;
  P8 = 1;
  var e = T6();
  function l() {
  }
  function t() {
  }
  return t.resetWarningCache = l, w3 = function() {
    function o(q, c, i, a, s, m) {
      if (m !== e) {
        var v = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw v.name = "Invariant Violation", v;
      }
    }
    o.isRequired = o;
    function n() {
      return o;
    }
    var r = {
      array: o,
      bigint: o,
      bool: o,
      func: o,
      number: o,
      object: o,
      string: o,
      symbol: o,
      any: o,
      arrayOf: n,
      element: o,
      elementType: o,
      instanceOf: n,
      node: o,
      objectOf: n,
      oneOf: n,
      oneOfType: n,
      shape: n,
      exact: n,
      checkPropTypes: t,
      resetWarningCache: l
    };
    return r.PropTypes = r, r;
  }, w3;
}
if (process.env.NODE_ENV !== "production") {
  var Tt = f5(), wt = !0;
  $3.exports = zt()(Tt.isElement, wt);
} else
  $3.exports = Ot()();
var Nt = $3.exports;
const m1 = /* @__PURE__ */ O6(Nt), F8 = {
  disabled: !1
};
var Mt = process.env.NODE_ENV !== "production" ? m1.oneOfType([m1.number, m1.shape({
  enter: m1.number,
  exit: m1.number,
  appear: m1.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && m1.oneOfType([m1.string, m1.shape({
  enter: m1.string,
  exit: m1.string,
  active: m1.string
}), m1.shape({
  enter: m1.string,
  enterDone: m1.string,
  enterActive: m1.string,
  exit: m1.string,
  exitDone: m1.string,
  exitActive: m1.string
})]);
const h5 = Y1.createContext(null);
var Lt = function(l) {
  return l.scrollTop;
}, r2 = "unmounted", C4 = "exited", v4 = "entering", E4 = "entered", Q3 = "exiting", g4 = /* @__PURE__ */ function(e) {
  mt(l, e);
  function l(o, n) {
    var r;
    r = e.call(this, o, n) || this;
    var q = n, c = q && !q.isMounting ? o.enter : o.appear, i;
    return r.appearStatus = null, o.in ? c ? (i = C4, r.appearStatus = v4) : i = E4 : o.unmountOnExit || o.mountOnEnter ? i = r2 : i = C4, r.state = {
      status: i
    }, r.nextCallback = null, r;
  }
  l.getDerivedStateFromProps = function(n, r) {
    var q = n.in;
    return q && r.status === r2 ? {
      status: C4
    } : null;
  };
  var t = l.prototype;
  return t.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, t.componentDidUpdate = function(n) {
    var r = null;
    if (n !== this.props) {
      var q = this.state.status;
      this.props.in ? q !== v4 && q !== E4 && (r = v4) : (q === v4 || q === E4) && (r = Q3);
    }
    this.updateStatus(!1, r);
  }, t.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, t.getTimeouts = function() {
    var n = this.props.timeout, r, q, c;
    return r = q = c = n, n != null && typeof n != "number" && (r = n.exit, q = n.enter, c = n.appear !== void 0 ? n.appear : q), {
      exit: r,
      enter: q,
      appear: c
    };
  }, t.updateStatus = function(n, r) {
    if (n === void 0 && (n = !1), r !== null)
      if (this.cancelNextCallback(), r === v4) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var q = this.props.nodeRef ? this.props.nodeRef.current : X4.findDOMNode(this);
          q && Lt(q);
        }
        this.performEnter(n);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === C4 && this.setState({
      status: r2
    });
  }, t.performEnter = function(n) {
    var r = this, q = this.props.enter, c = this.context ? this.context.isMounting : n, i = this.props.nodeRef ? [c] : [X4.findDOMNode(this), c], a = i[0], s = i[1], m = this.getTimeouts(), v = c ? m.appear : m.enter;
    if (!n && !q || F8.disabled) {
      this.safeSetState({
        status: E4
      }, function() {
        r.props.onEntered(a);
      });
      return;
    }
    this.props.onEnter(a, s), this.safeSetState({
      status: v4
    }, function() {
      r.props.onEntering(a, s), r.onTransitionEnd(v, function() {
        r.safeSetState({
          status: E4
        }, function() {
          r.props.onEntered(a, s);
        });
      });
    });
  }, t.performExit = function() {
    var n = this, r = this.props.exit, q = this.getTimeouts(), c = this.props.nodeRef ? void 0 : X4.findDOMNode(this);
    if (!r || F8.disabled) {
      this.safeSetState({
        status: C4
      }, function() {
        n.props.onExited(c);
      });
      return;
    }
    this.props.onExit(c), this.safeSetState({
      status: Q3
    }, function() {
      n.props.onExiting(c), n.onTransitionEnd(q.exit, function() {
        n.safeSetState({
          status: C4
        }, function() {
          n.props.onExited(c);
        });
      });
    });
  }, t.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, t.safeSetState = function(n, r) {
    r = this.setNextCallback(r), this.setState(n, r);
  }, t.setNextCallback = function(n) {
    var r = this, q = !0;
    return this.nextCallback = function(c) {
      q && (q = !1, r.nextCallback = null, n(c));
    }, this.nextCallback.cancel = function() {
      q = !1;
    }, this.nextCallback;
  }, t.onTransitionEnd = function(n, r) {
    this.setNextCallback(r);
    var q = this.props.nodeRef ? this.props.nodeRef.current : X4.findDOMNode(this), c = n == null && !this.props.addEndListener;
    if (!q || c) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var i = this.props.nodeRef ? [this.nextCallback] : [q, this.nextCallback], a = i[0], s = i[1];
      this.props.addEndListener(a, s);
    }
    n != null && setTimeout(this.nextCallback, n);
  }, t.render = function() {
    var n = this.state.status;
    if (n === r2)
      return null;
    var r = this.props, q = r.children;
    r.in, r.mountOnEnter, r.unmountOnExit, r.appear, r.enter, r.exit, r.timeout, r.addEndListener, r.onEnter, r.onEntering, r.onEntered, r.onExit, r.onExiting, r.onExited, r.nodeRef;
    var c = d5(r, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Y1.createElement(h5.Provider, {
        value: null
      }, typeof q == "function" ? q(n, c) : Y1.cloneElement(Y1.Children.only(q), c))
    );
  }, l;
}(Y1.Component);
g4.contextType = h5;
g4.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: m1.shape({
    current: typeof Element > "u" ? m1.any : function(e, l, t, o, n, r) {
      var q = e[l];
      return m1.instanceOf(q && "ownerDocument" in q ? q.ownerDocument.defaultView.Element : Element)(e, l, t, o, n, r);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: m1.oneOfType([m1.func.isRequired, m1.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: m1.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: m1.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: m1.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: m1.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: m1.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: m1.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(l) {
    var t = Mt;
    l.addEndListener || (t = t.isRequired);
    for (var o = arguments.length, n = new Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++)
      n[r - 1] = arguments[r];
    return t.apply(void 0, [l].concat(n));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: m1.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: m1.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: m1.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: m1.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: m1.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: m1.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: m1.func
} : {};
function D4() {
}
g4.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: D4,
  onEntering: D4,
  onEntered: D4,
  onExit: D4,
  onExiting: D4,
  onExited: D4
};
g4.UNMOUNTED = r2;
g4.EXITED = C4;
g4.ENTERING = v4;
g4.ENTERED = E4;
g4.EXITING = Q3;
function Pt(e) {
  return e.code === "Escape" || e.keyCode === 27;
}
function Ft() {
  const e = s1.version.split(".");
  return {
    major: +e[0],
    minor: +e[1],
    patch: +e[2]
  };
}
function s3(e) {
  if (!e || typeof e == "function")
    return null;
  const {
    major: l
  } = Ft();
  return l >= 19 ? e.props.ref : e.ref;
}
const Q4 = !!(typeof window < "u" && window.document && window.document.createElement);
var K3 = !1, e6 = !1;
try {
  var N3 = {
    get passive() {
      return K3 = !0;
    },
    get once() {
      return e6 = K3 = !0;
    }
  };
  Q4 && (window.addEventListener("test", N3, N3), window.removeEventListener("test", N3, !0));
} catch {
}
function p5(e, l, t, o) {
  if (o && typeof o != "boolean" && !e6) {
    var n = o.once, r = o.capture, q = t;
    !e6 && n && (q = t.__once || function c(i) {
      this.removeEventListener(l, c, r), t.call(this, i);
    }, t.__once = q), e.addEventListener(l, q, K3 ? o : r);
  }
  e.addEventListener(l, t, o);
}
function l6(e, l, t, o) {
  var n = o && typeof o != "boolean" ? o.capture : o;
  e.removeEventListener(l, t, n), t.__once && e.removeEventListener(l, t.__once, n);
}
function j2(e, l, t, o) {
  return p5(e, l, t, o), function() {
    l6(e, l, t, o);
  };
}
function Bt(e, l, t, o) {
  if (o === void 0 && (o = !0), e) {
    var n = document.createEvent("HTMLEvents");
    n.initEvent(l, t, o), e.dispatchEvent(n);
  }
}
function Gt(e) {
  var l = T4(e, "transitionDuration") || "", t = l.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(l) * t;
}
function kt(e, l, t) {
  t === void 0 && (t = 5);
  var o = !1, n = setTimeout(function() {
    o || Bt(e, "transitionend", !0);
  }, l + t), r = j2(e, "transitionend", function() {
    o = !0;
  }, {
    once: !0
  });
  return function() {
    clearTimeout(n), r();
  };
}
function g5(e, l, t, o) {
  t == null && (t = Gt(e) || 0);
  var n = kt(e, t, o), r = j2(e, "transitionend", l);
  return function() {
    n(), r();
  };
}
function B8(e, l) {
  const t = T4(e, l) || "", o = t.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(t) * o;
}
function Dt(e, l) {
  const t = B8(e, "transitionDuration"), o = B8(e, "transitionDelay"), n = g5(e, (r) => {
    r.target === e && (n(), l(r));
  }, t + o);
}
function Vt(e) {
  e.offsetHeight;
}
const G8 = (e) => !e || typeof e == "function" ? e : (l) => {
  e.current = l;
};
function Wt(e, l) {
  const t = G8(e), o = G8(l);
  return (n) => {
    t && t(n), o && o(n);
  };
}
function b5(e, l) {
  return W1(() => Wt(e, l), [e, l]);
}
function jt(e) {
  return e && "setState" in e ? X4.findDOMNode(e) : e ?? null;
}
const _5 = /* @__PURE__ */ Y1.forwardRef(({
  onEnter: e,
  onEntering: l,
  onEntered: t,
  onExit: o,
  onExiting: n,
  onExited: r,
  addEndListener: q,
  children: c,
  childRef: i,
  ...a
}, s) => {
  const m = v1(null), v = b5(m, i), A = (E) => {
    v(jt(E));
  }, x = (E) => (C) => {
    E && m.current && E(m.current, C);
  }, p = r1(x(e), [e]), d = r1(x(l), [l]), _ = r1(x(t), [t]), S = r1(x(o), [o]), g = r1(x(n), [n]), u = r1(x(r), [r]), f = r1(x(q), [q]);
  return /* @__PURE__ */ G(g4, {
    ref: s,
    ...a,
    onEnter: p,
    onEntered: _,
    onEntering: d,
    onExit: S,
    onExited: u,
    onExiting: g,
    addEndListener: f,
    nodeRef: m,
    children: typeof c == "function" ? (E, C) => (
      // TODO: Types for RTG missing innerProps, so need to cast.
      c(E, {
        ...C,
        ref: A
      })
    ) : /* @__PURE__ */ Y1.cloneElement(c, {
      ref: A
    })
  });
});
_5.displayName = "TransitionWrapper";
function Xt(e) {
  const l = v1(e);
  return p1(() => {
    l.current = e;
  }, [e]), l;
}
function t6(e) {
  const l = Xt(e);
  return r1(function(...t) {
    return l.current && l.current(...t);
  }, [l]);
}
const Ht = (e) => (
  // eslint-disable-next-line react/display-name
  /* @__PURE__ */ s1.forwardRef((l, t) => /* @__PURE__ */ G("div", {
    ...l,
    ref: t,
    className: L1(l.className, e)
  }))
);
function Zt(e) {
  const l = v1(e);
  return p1(() => {
    l.current = e;
  }, [e]), l;
}
function A4(e) {
  const l = Zt(e);
  return r1(function(...t) {
    return l.current && l.current(...t);
  }, [l]);
}
function Yt() {
  const e = v1(!0), l = v1(() => e.current);
  return p1(() => (e.current = !0, () => {
    e.current = !1;
  }), []), l.current;
}
function Jt(e) {
  const l = v1(null);
  return p1(() => {
    l.current = e;
  }), l.current;
}
const Ut = typeof global < "u" && // @ts-ignore
global.navigator && // @ts-ignore
global.navigator.product === "ReactNative", $t = typeof document < "u", k8 = $t || Ut ? E9 : p1, Qt = {
  [v4]: "show",
  [E4]: "show"
}, w6 = /* @__PURE__ */ s1.forwardRef(({
  className: e,
  children: l,
  transitionClasses: t = {},
  onEnter: o,
  ...n
}, r) => {
  const q = {
    in: !1,
    timeout: 300,
    mountOnEnter: !1,
    unmountOnExit: !1,
    appear: !1,
    ...n
  }, c = r1((i, a) => {
    Vt(i), o == null || o(i, a);
  }, [o]);
  return /* @__PURE__ */ G(_5, {
    ref: r,
    addEndListener: Dt,
    ...q,
    onEnter: c,
    childRef: s3(l),
    children: (i, a) => /* @__PURE__ */ s1.cloneElement(l, {
      ...a,
      className: L1("fade", e, l.props.className, Qt[i], t[i])
    })
  });
});
w6.displayName = "Fade";
const Kt = {
  /** An accessible label indicating the relevant information about the Close Button. */
  "aria-label": m1.string,
  /** A callback fired after the Close Button is clicked. */
  onClick: m1.func,
  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: m1.oneOf(["white"])
}, N6 = /* @__PURE__ */ s1.forwardRef(({
  className: e,
  variant: l,
  "aria-label": t = "Close",
  ...o
}, n) => /* @__PURE__ */ G("button", {
  ref: n,
  type: "button",
  className: L1("btn-close", l && `btn-close-${l}`, e),
  "aria-label": t,
  ...o
}));
N6.displayName = "CloseButton";
N6.propTypes = Kt;
function en(e) {
  const l = v1(e);
  return l.current = e, l;
}
function ln(e) {
  const l = en(e);
  p1(() => () => l.current(), []);
}
function tn(e, l) {
  return s1.Children.toArray(e).some((t) => /* @__PURE__ */ s1.isValidElement(t) && t.type === l);
}
function nn({
  as: e,
  bsPrefix: l,
  className: t,
  ...o
}) {
  l = X1(l, "col");
  const n = xt(), r = ht(), q = [], c = [];
  return n.forEach((i) => {
    const a = o[i];
    delete o[i];
    let s, m, v;
    typeof a == "object" && a != null ? {
      span: s,
      offset: m,
      order: v
    } = a : s = a;
    const A = i !== r ? `-${i}` : "";
    s && q.push(s === !0 ? `${l}${A}` : `${l}${A}-${s}`), v != null && c.push(`order${A}-${v}`), m != null && c.push(`offset${A}-${m}`);
  }), [{
    ...o,
    className: L1(t, ...q, ...c)
  }, {
    as: e,
    bsPrefix: l,
    spans: q
  }];
}
const v5 = /* @__PURE__ */ s1.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (e, l) => {
    const [{
      className: t,
      ...o
    }, {
      as: n = "div",
      bsPrefix: r,
      spans: q
    }] = nn(e);
    return /* @__PURE__ */ G(n, {
      ...o,
      ref: l,
      className: L1(t, !q.length && r)
    });
  }
);
v5.displayName = "Col";
var on = Function.prototype.bind.call(Function.prototype.call, [].slice);
function V4(e, l) {
  return on(e.querySelectorAll(l));
}
function D8(e, l) {
  if (e.contains) return e.contains(l);
  if (e.compareDocumentPosition) return e === l || !!(e.compareDocumentPosition(l) & 16);
}
var rn = process.env.NODE_ENV !== "production", y5 = function() {
};
if (rn) {
  var qn = function(l, t) {
    var o = arguments.length;
    t = new Array(o > 1 ? o - 1 : 0);
    for (var n = 1; n < o; n++)
      t[n - 1] = arguments[n];
    var r = 0, q = "Warning: " + l.replace(/%s/g, function() {
      return t[r++];
    });
    typeof console < "u" && console.error(q);
    try {
      throw new Error(q);
    } catch {
    }
  };
  y5 = function(e, l, t) {
    var o = arguments.length;
    t = new Array(o > 2 ? o - 2 : 0);
    for (var n = 2; n < o; n++)
      t[n - 2] = arguments[n];
    if (l === void 0)
      throw new Error(
        "`warning(condition, format, ...args)` requires a warning message argument"
      );
    e || qn.apply(null, [l].concat(t));
  };
}
var an = y5;
const I5 = /* @__PURE__ */ O6(an), sn = "data-rr-ui-";
function cn(e) {
  return `${sn}${e}`;
}
const C5 = /* @__PURE__ */ d6(Q4 ? window : void 0);
C5.Provider;
function M6() {
  return Q1(C5);
}
const un = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: m1.string,
  /** Display feedback as a tooltip. */
  tooltip: m1.bool,
  as: m1.elementType
}, c3 = /* @__PURE__ */ s1.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    as: e = "div",
    className: l,
    type: t = "valid",
    tooltip: o = !1,
    ...n
  }, r) => /* @__PURE__ */ G(e, {
    ...n,
    ref: r,
    className: L1(l, `${t}-${o ? "tooltip" : "feedback"}`)
  })
);
c3.displayName = "Feedback";
c3.propTypes = un;
const h4 = /* @__PURE__ */ s1.createContext({}), L6 = /* @__PURE__ */ s1.forwardRef(({
  id: e,
  bsPrefix: l,
  className: t,
  type: o = "checkbox",
  isValid: n = !1,
  isInvalid: r = !1,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: q = "input",
  ...c
}, i) => {
  const {
    controlId: a
  } = Q1(h4);
  return l = X1(l, "form-check-input"), /* @__PURE__ */ G(q, {
    ...c,
    ref: i,
    type: o,
    id: e || a,
    className: L1(t, l, n && "is-valid", r && "is-invalid")
  });
});
L6.displayName = "FormCheckInput";
const X2 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  className: l,
  htmlFor: t,
  ...o
}, n) => {
  const {
    controlId: r
  } = Q1(h4);
  return e = X1(e, "form-check-label"), /* @__PURE__ */ G("label", {
    ...o,
    ref: n,
    htmlFor: t || r,
    className: L1(l, e)
  });
});
X2.displayName = "FormCheckLabel";
const E5 = /* @__PURE__ */ s1.forwardRef(({
  id: e,
  bsPrefix: l,
  bsSwitchPrefix: t,
  inline: o = !1,
  reverse: n = !1,
  disabled: r = !1,
  isValid: q = !1,
  isInvalid: c = !1,
  feedbackTooltip: i = !1,
  feedback: a,
  feedbackType: s,
  className: m,
  style: v,
  title: A = "",
  type: x = "checkbox",
  label: p,
  children: d,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: _ = "input",
  ...S
}, g) => {
  l = X1(l, "form-check"), t = X1(t, "form-switch");
  const {
    controlId: u
  } = Q1(h4), f = W1(() => ({
    controlId: e || u
  }), [u, e]), E = !d && p != null && p !== !1 || tn(d, X2), C = /* @__PURE__ */ G(L6, {
    ...S,
    type: x === "switch" ? "checkbox" : x,
    ref: g,
    isValid: q,
    isInvalid: c,
    disabled: r,
    as: _
  });
  return /* @__PURE__ */ G(h4.Provider, {
    value: f,
    children: /* @__PURE__ */ G("div", {
      style: v,
      className: L1(m, E && l, o && `${l}-inline`, n && `${l}-reverse`, x === "switch" && t),
      children: d || /* @__PURE__ */ f1(z4, {
        children: [C, E && /* @__PURE__ */ G(X2, {
          title: A,
          children: p
        }), a && /* @__PURE__ */ G(c3, {
          type: s,
          tooltip: i,
          children: a
        })]
      })
    })
  });
});
E5.displayName = "FormCheck";
const H2 = Object.assign(E5, {
  Input: L6,
  Label: X2
}), A5 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  type: l,
  size: t,
  htmlSize: o,
  id: n,
  className: r,
  isValid: q = !1,
  isInvalid: c = !1,
  plaintext: i,
  readOnly: a,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: s = "input",
  ...m
}, v) => {
  const {
    controlId: A
  } = Q1(h4);
  return e = X1(e, "form-control"), process.env.NODE_ENV !== "production" && I5(A == null || !n, "`controlId` is ignored on `<FormControl>` when `id` is specified."), /* @__PURE__ */ G(s, {
    ...m,
    type: l,
    size: o,
    ref: v,
    readOnly: a,
    id: n || A,
    className: L1(r, i ? `${e}-plaintext` : e, t && `${e}-${t}`, l === "color" && `${e}-color`, q && "is-valid", c && "is-invalid")
  });
});
A5.displayName = "FormControl";
const mn = Object.assign(A5, {
  Feedback: c3
}), S5 = /* @__PURE__ */ s1.forwardRef(({
  className: e,
  bsPrefix: l,
  as: t = "div",
  ...o
}, n) => (l = X1(l, "form-floating"), /* @__PURE__ */ G(t, {
  ref: n,
  className: L1(e, l),
  ...o
})));
S5.displayName = "FormFloating";
const P6 = /* @__PURE__ */ s1.forwardRef(({
  controlId: e,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: l = "div",
  ...t
}, o) => {
  const n = W1(() => ({
    controlId: e
  }), [e]);
  return /* @__PURE__ */ G(h4.Provider, {
    value: n,
    children: /* @__PURE__ */ G(l, {
      ...t,
      ref: o
    })
  });
});
P6.displayName = "FormGroup";
const R5 = /* @__PURE__ */ s1.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: e = "label",
  bsPrefix: l,
  column: t = !1,
  visuallyHidden: o = !1,
  className: n,
  htmlFor: r,
  ...q
}, c) => {
  const {
    controlId: i
  } = Q1(h4);
  l = X1(l, "form-label");
  let a = "col-form-label";
  typeof t == "string" && (a = `${a} ${a}-${t}`);
  const s = L1(n, l, o && "visually-hidden", t && a);
  return process.env.NODE_ENV !== "production" && I5(i == null || !r, "`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified."), r = r || i, t ? /* @__PURE__ */ G(v5, {
    ref: c,
    as: "label",
    className: s,
    htmlFor: r,
    ...q
  }) : /* @__PURE__ */ G(e, {
    ref: c,
    className: s,
    htmlFor: r,
    ...q
  });
});
R5.displayName = "FormLabel";
const z5 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  className: l,
  id: t,
  ...o
}, n) => {
  const {
    controlId: r
  } = Q1(h4);
  return e = X1(e, "form-range"), /* @__PURE__ */ G("input", {
    ...o,
    type: "range",
    ref: n,
    className: L1(l, e),
    id: t || r
  });
});
z5.displayName = "FormRange";
const O5 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  size: l,
  htmlSize: t,
  className: o,
  isValid: n = !1,
  isInvalid: r = !1,
  id: q,
  ...c
}, i) => {
  const {
    controlId: a
  } = Q1(h4);
  return e = X1(e, "form-select"), /* @__PURE__ */ G("select", {
    ...c,
    size: t,
    ref: i,
    className: L1(o, e, l && `${e}-${l}`, n && "is-valid", r && "is-invalid"),
    id: q || a
  });
});
O5.displayName = "FormSelect";
const T5 = /* @__PURE__ */ s1.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    bsPrefix: e,
    className: l,
    as: t = "small",
    muted: o,
    ...n
  }, r) => (e = X1(e, "form-text"), /* @__PURE__ */ G(t, {
    ...n,
    ref: r,
    className: L1(l, e, o && "text-muted")
  }))
);
T5.displayName = "FormText";
const w5 = /* @__PURE__ */ s1.forwardRef((e, l) => /* @__PURE__ */ G(H2, {
  ...e,
  ref: l,
  type: "switch"
}));
w5.displayName = "Switch";
const dn = Object.assign(w5, {
  Input: H2.Input,
  Label: H2.Label
}), N5 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  className: l,
  children: t,
  controlId: o,
  label: n,
  ...r
}, q) => (e = X1(e, "form-floating"), /* @__PURE__ */ f1(P6, {
  ref: q,
  className: L1(l, e),
  controlId: o,
  ...r,
  children: [t, /* @__PURE__ */ G("label", {
    htmlFor: o,
    children: n
  })]
})));
N5.displayName = "FloatingLabel";
const fn = {
  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: m1.any,
  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: m1.bool,
  as: m1.elementType
}, F6 = /* @__PURE__ */ s1.forwardRef(({
  className: e,
  validated: l,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: t = "form",
  ...o
}, n) => /* @__PURE__ */ G(t, {
  ...o,
  ref: n,
  className: L1(e, l && "was-validated")
}));
F6.displayName = "Form";
F6.propTypes = fn;
const xn = Object.assign(F6, {
  Group: P6,
  Control: mn,
  Floating: S5,
  Check: H2,
  Switch: dn,
  Label: R5,
  Text: T5,
  Range: z5,
  Select: O5,
  FloatingLabel: N5
}), V8 = (e) => !e || typeof e == "function" ? e : (l) => {
  e.current = l;
};
function hn(e, l) {
  const t = V8(e), o = V8(l);
  return (n) => {
    t && t(n), o && o(n);
  };
}
function B6(e, l) {
  return W1(() => hn(e, l), [e, l]);
}
var C2;
function W8(e) {
  if ((!C2 && C2 !== 0 || e) && Q4) {
    var l = document.createElement("div");
    l.style.position = "absolute", l.style.top = "-9999px", l.style.width = "50px", l.style.height = "50px", l.style.overflow = "scroll", document.body.appendChild(l), C2 = l.offsetWidth - l.clientWidth, document.body.removeChild(l);
  }
  return C2;
}
function pn() {
  return c1(null);
}
function M3(e) {
  e === void 0 && (e = a3());
  try {
    var l = e.activeElement;
    return !l || !l.nodeName ? null : l;
  } catch {
    return e.body;
  }
}
function gn(e) {
  const l = v1(e);
  return l.current = e, l;
}
function bn(e) {
  const l = gn(e);
  p1(() => () => l.current(), []);
}
function _n(e = document) {
  const l = e.defaultView;
  return Math.abs(l.innerWidth - e.documentElement.clientWidth);
}
const j8 = cn("modal-open");
class G6 {
  constructor({
    ownerDocument: l,
    handleContainerOverflow: t = !0,
    isRTL: o = !1
  } = {}) {
    this.handleContainerOverflow = t, this.isRTL = o, this.modals = [], this.ownerDocument = l;
  }
  getScrollbarWidth() {
    return _n(this.ownerDocument);
  }
  getElement() {
    return (this.ownerDocument || document).body;
  }
  setModalAttributes(l) {
  }
  removeModalAttributes(l) {
  }
  setContainerStyle(l) {
    const t = {
      overflow: "hidden"
    }, o = this.isRTL ? "paddingLeft" : "paddingRight", n = this.getElement();
    l.style = {
      overflow: n.style.overflow,
      [o]: n.style[o]
    }, l.scrollBarWidth && (t[o] = `${parseInt(T4(n, o) || "0", 10) + l.scrollBarWidth}px`), n.setAttribute(j8, ""), T4(n, t);
  }
  reset() {
    [...this.modals].forEach((l) => this.remove(l));
  }
  removeContainerStyle(l) {
    const t = this.getElement();
    t.removeAttribute(j8), Object.assign(t.style, l.style);
  }
  add(l) {
    let t = this.modals.indexOf(l);
    return t !== -1 || (t = this.modals.length, this.modals.push(l), this.setModalAttributes(l), t !== 0) || (this.state = {
      scrollBarWidth: this.getScrollbarWidth(),
      style: {}
    }, this.handleContainerOverflow && this.setContainerStyle(this.state)), t;
  }
  remove(l) {
    const t = this.modals.indexOf(l);
    t !== -1 && (this.modals.splice(t, 1), !this.modals.length && this.handleContainerOverflow && this.removeContainerStyle(this.state), this.removeModalAttributes(l));
  }
  isTopModal(l) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === l;
  }
}
const L3 = (e, l) => Q4 ? e == null ? (l || a3()).body : (typeof e == "function" && (e = e()), e && "current" in e && (e = e.current), e && ("nodeType" in e || e.getBoundingClientRect) ? e : null) : null;
function vn(e, l) {
  const t = M6(), [o, n] = c1(() => L3(e, t == null ? void 0 : t.document));
  if (!o) {
    const r = L3(e);
    r && n(r);
  }
  return p1(() => {
  }, [l, o]), p1(() => {
    const r = L3(e);
    r !== o && n(r);
  }, [e, o]), o;
}
function yn({
  children: e,
  in: l,
  onExited: t,
  mountOnEnter: o,
  unmountOnExit: n
}) {
  const r = v1(null), q = v1(l), c = A4(t);
  p1(() => {
    l ? q.current = !0 : c(r.current);
  }, [l, c]);
  const i = B6(r, s3(e)), a = /* @__PURE__ */ x6(e, {
    ref: i
  });
  return l ? a : n || !q.current && o ? null : a;
}
const In = ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "addEndListener", "children"];
function Cn(e, l) {
  if (e == null) return {};
  var t = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (l.indexOf(o) >= 0) continue;
    t[o] = e[o];
  }
  return t;
}
function En(e) {
  let {
    onEnter: l,
    onEntering: t,
    onEntered: o,
    onExit: n,
    onExiting: r,
    onExited: q,
    addEndListener: c,
    children: i
  } = e, a = Cn(e, In);
  const s = v1(null), m = B6(s, s3(i)), v = (u) => (f) => {
    u && s.current && u(s.current, f);
  }, A = r1(v(l), [l]), x = r1(v(t), [t]), p = r1(v(o), [o]), d = r1(v(n), [n]), _ = r1(v(r), [r]), S = r1(v(q), [q]), g = r1(v(c), [c]);
  return Object.assign({}, a, {
    nodeRef: s
  }, l && {
    onEnter: A
  }, t && {
    onEntering: x
  }, o && {
    onEntered: p
  }, n && {
    onExit: d
  }, r && {
    onExiting: _
  }, q && {
    onExited: S
  }, c && {
    addEndListener: g
  }, {
    children: typeof i == "function" ? (u, f) => (
      // TODO: Types for RTG missing innerProps, so need to cast.
      i(u, Object.assign({}, f, {
        ref: m
      }))
    ) : /* @__PURE__ */ x6(i, {
      ref: m
    })
  });
}
const An = ["component"];
function Sn(e, l) {
  if (e == null) return {};
  var t = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (l.indexOf(o) >= 0) continue;
    t[o] = e[o];
  }
  return t;
}
const Rn = /* @__PURE__ */ s1.forwardRef((e, l) => {
  let {
    component: t
  } = e, o = Sn(e, An);
  const n = En(o);
  return /* @__PURE__ */ G(t, Object.assign({
    ref: l
  }, n));
});
function zn({
  in: e,
  onTransition: l
}) {
  const t = v1(null), o = v1(!0), n = A4(l);
  return k8(() => {
    if (!t.current)
      return;
    let r = !1;
    return n({
      in: e,
      element: t.current,
      initial: o.current,
      isStale: () => r
    }), () => {
      r = !0;
    };
  }, [e, n]), k8(() => (o.current = !1, () => {
    o.current = !0;
  }), []), t;
}
function On({
  children: e,
  in: l,
  onExited: t,
  onEntered: o,
  transition: n
}) {
  const [r, q] = c1(!l);
  l && r && q(!1);
  const c = zn({
    in: !!l,
    onTransition: (a) => {
      const s = () => {
        a.isStale() || (a.in ? o == null || o(a.element, a.initial) : (q(!0), t == null || t(a.element)));
      };
      Promise.resolve(n(a)).then(s, (m) => {
        throw a.in || q(!0), m;
      });
    }
  }), i = B6(c, s3(e));
  return r && !l ? null : /* @__PURE__ */ x6(e, {
    ref: i
  });
}
function X8(e, l, t) {
  return e ? /* @__PURE__ */ G(Rn, Object.assign({}, t, {
    component: e
  })) : l ? /* @__PURE__ */ G(On, Object.assign({}, t, {
    transition: l
  })) : /* @__PURE__ */ G(yn, Object.assign({}, t));
}
const Tn = ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "runTransition", "backdropTransition", "runBackdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"];
function wn(e, l) {
  if (e == null) return {};
  var t = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (l.indexOf(o) >= 0) continue;
    t[o] = e[o];
  }
  return t;
}
let P3;
function Nn(e) {
  return P3 || (P3 = new G6({
    ownerDocument: e == null ? void 0 : e.document
  })), P3;
}
function Mn(e) {
  const l = M6(), t = e || Nn(l), o = v1({
    dialog: null,
    backdrop: null
  });
  return Object.assign(o.current, {
    add: () => t.add(o.current),
    remove: () => t.remove(o.current),
    isTopModal: () => t.isTopModal(o.current),
    setDialogRef: r1((n) => {
      o.current.dialog = n;
    }, []),
    setBackdropRef: r1((n) => {
      o.current.backdrop = n;
    }, [])
  });
}
const M5 = /* @__PURE__ */ L4((e, l) => {
  let {
    show: t = !1,
    role: o = "dialog",
    className: n,
    style: r,
    children: q,
    backdrop: c = !0,
    keyboard: i = !0,
    onBackdropClick: a,
    onEscapeKeyDown: s,
    transition: m,
    runTransition: v,
    backdropTransition: A,
    runBackdropTransition: x,
    autoFocus: p = !0,
    enforceFocus: d = !0,
    restoreFocus: _ = !0,
    restoreFocusOptions: S,
    renderDialog: g,
    renderBackdrop: u = (Y) => /* @__PURE__ */ G("div", Object.assign({}, Y)),
    manager: f,
    container: E,
    onShow: C,
    onHide: w = () => {
    },
    onExit: F,
    onExited: D,
    onExiting: e1,
    onEnter: j,
    onEntering: l1,
    onEntered: $
  } = e, Q = wn(e, Tn);
  const Z = M6(), J = vn(E), P = Mn(f), q1 = Yt(), B = Jt(t), [M, W] = c1(!t), H = v1(null);
  f6(l, () => P, [P]), Q4 && !B && t && (H.current = M3(Z == null ? void 0 : Z.document)), t && M && W(!1);
  const z = A4(() => {
    if (P.add(), N.current = j2(document, "keydown", R), k.current = j2(
      document,
      "focus",
      // the timeout is necessary b/c this will run before the new modal is mounted
      // and so steals focus from it
      () => setTimeout(b),
      !0
    ), C && C(), p) {
      var Y, L;
      const V = M3((Y = (L = P.dialog) == null ? void 0 : L.ownerDocument) != null ? Y : Z == null ? void 0 : Z.document);
      P.dialog && V && !D8(P.dialog, V) && (H.current = V, P.dialog.focus());
    }
  }), I = A4(() => {
    if (P.remove(), N.current == null || N.current(), k.current == null || k.current(), _) {
      var Y;
      (Y = H.current) == null || Y.focus == null || Y.focus(S), H.current = null;
    }
  });
  p1(() => {
    !t || !J || z();
  }, [
    t,
    J,
    /* should never change: */
    z
  ]), p1(() => {
    M && I();
  }, [M, I]), bn(() => {
    I();
  });
  const b = A4(() => {
    if (!d || !q1() || !P.isTopModal())
      return;
    const Y = M3(Z == null ? void 0 : Z.document);
    P.dialog && Y && !D8(P.dialog, Y) && P.dialog.focus();
  }), h = A4((Y) => {
    Y.target === Y.currentTarget && (a == null || a(Y), c === !0 && w());
  }), R = A4((Y) => {
    i && Pt(Y) && P.isTopModal() && (s == null || s(Y), Y.defaultPrevented || w());
  }), k = v1(), N = v1(), K = (...Y) => {
    W(!0), D == null || D(...Y);
  };
  if (!J)
    return null;
  const T = Object.assign({
    role: o,
    ref: P.setDialogRef,
    // apparently only works on the dialog role element
    "aria-modal": o === "dialog" ? !0 : void 0
  }, Q, {
    style: r,
    className: n,
    tabIndex: -1
  });
  let t1 = g ? g(T) : /* @__PURE__ */ G("div", Object.assign({}, T, {
    children: /* @__PURE__ */ s1.cloneElement(q, {
      role: "document"
    })
  }));
  t1 = X8(m, v, {
    unmountOnExit: !0,
    mountOnEnter: !0,
    appear: !0,
    in: !!t,
    onExit: F,
    onExiting: e1,
    onExited: K,
    onEnter: j,
    onEntering: l1,
    onEntered: $,
    children: t1
  });
  let U = null;
  return c && (U = u({
    ref: P.setBackdropRef,
    onClick: h
  }), U = X8(A, x, {
    in: !!t,
    appear: !0,
    mountOnEnter: !0,
    unmountOnExit: !0,
    children: U
  })), /* @__PURE__ */ G(z4, {
    children: /* @__PURE__ */ X4.createPortal(/* @__PURE__ */ f1(z4, {
      children: [U, t1]
    }), J)
  });
});
M5.displayName = "Modal";
const Ln = Object.assign(M5, {
  Manager: G6
});
function Pn(e, l) {
  return e.classList ? e.classList.contains(l) : (" " + (e.className.baseVal || e.className) + " ").indexOf(" " + l + " ") !== -1;
}
function Fn(e, l) {
  e.classList ? e.classList.add(l) : Pn(e, l) || (typeof e.className == "string" ? e.className = e.className + " " + l : e.setAttribute("class", (e.className && e.className.baseVal || "") + " " + l));
}
function H8(e, l) {
  return e.replace(new RegExp("(^|\\s)" + l + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function Bn(e, l) {
  e.classList ? e.classList.remove(l) : typeof e.className == "string" ? e.className = H8(e.className, l) : e.setAttribute("class", H8(e.className && e.className.baseVal || "", l));
}
const W4 = {
  FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  STICKY_CONTENT: ".sticky-top",
  NAVBAR_TOGGLER: ".navbar-toggler"
};
class Gn extends G6 {
  adjustAndStore(l, t, o) {
    const n = t.style[l];
    t.dataset[l] = n, T4(t, {
      [l]: `${parseFloat(T4(t, l)) + o}px`
    });
  }
  restore(l, t) {
    const o = t.dataset[l];
    o !== void 0 && (delete t.dataset[l], T4(t, {
      [l]: o
    }));
  }
  setContainerStyle(l) {
    super.setContainerStyle(l);
    const t = this.getElement();
    if (Fn(t, "modal-open"), !l.scrollBarWidth) return;
    const o = this.isRTL ? "paddingLeft" : "paddingRight", n = this.isRTL ? "marginLeft" : "marginRight";
    V4(t, W4.FIXED_CONTENT).forEach((r) => this.adjustAndStore(o, r, l.scrollBarWidth)), V4(t, W4.STICKY_CONTENT).forEach((r) => this.adjustAndStore(n, r, -l.scrollBarWidth)), V4(t, W4.NAVBAR_TOGGLER).forEach((r) => this.adjustAndStore(n, r, l.scrollBarWidth));
  }
  removeContainerStyle(l) {
    super.removeContainerStyle(l);
    const t = this.getElement();
    Bn(t, "modal-open");
    const o = this.isRTL ? "paddingLeft" : "paddingRight", n = this.isRTL ? "marginLeft" : "marginRight";
    V4(t, W4.FIXED_CONTENT).forEach((r) => this.restore(o, r)), V4(t, W4.STICKY_CONTENT).forEach((r) => this.restore(n, r)), V4(t, W4.NAVBAR_TOGGLER).forEach((r) => this.restore(n, r));
  }
}
let F3;
function kn(e) {
  return F3 || (F3 = new Gn(e)), F3;
}
const L5 = /* @__PURE__ */ s1.forwardRef(({
  className: e,
  bsPrefix: l,
  as: t = "div",
  ...o
}, n) => (l = X1(l, "modal-body"), /* @__PURE__ */ G(t, {
  ref: n,
  className: L1(e, l),
  ...o
})));
L5.displayName = "ModalBody";
const P5 = /* @__PURE__ */ s1.createContext({
  onHide() {
  }
}), k6 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  className: l,
  contentClassName: t,
  centered: o,
  size: n,
  fullscreen: r,
  children: q,
  scrollable: c,
  ...i
}, a) => {
  e = X1(e, "modal");
  const s = `${e}-dialog`, m = typeof r == "string" ? `${e}-fullscreen-${r}` : `${e}-fullscreen`;
  return /* @__PURE__ */ G("div", {
    ...i,
    ref: a,
    className: L1(s, l, n && `${e}-${n}`, o && `${s}-centered`, c && `${s}-scrollable`, r && m),
    children: /* @__PURE__ */ G("div", {
      className: L1(`${e}-content`, t),
      children: q
    })
  });
});
k6.displayName = "ModalDialog";
const F5 = /* @__PURE__ */ s1.forwardRef(({
  className: e,
  bsPrefix: l,
  as: t = "div",
  ...o
}, n) => (l = X1(l, "modal-footer"), /* @__PURE__ */ G(t, {
  ref: n,
  className: L1(e, l),
  ...o
})));
F5.displayName = "ModalFooter";
const B5 = /* @__PURE__ */ s1.forwardRef(({
  closeLabel: e = "Close",
  closeVariant: l,
  closeButton: t = !1,
  onHide: o,
  children: n,
  ...r
}, q) => {
  const c = Q1(P5), i = t6(() => {
    c == null || c.onHide(), o == null || o();
  });
  return /* @__PURE__ */ f1("div", {
    ref: q,
    ...r,
    children: [n, t && /* @__PURE__ */ G(N6, {
      "aria-label": e,
      variant: l,
      onClick: i
    })]
  });
});
B5.displayName = "AbstractModalHeader";
const G5 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  className: l,
  closeLabel: t = "Close",
  closeButton: o = !1,
  ...n
}, r) => (e = X1(e, "modal-header"), /* @__PURE__ */ G(B5, {
  ref: r,
  ...n,
  className: L1(l, e),
  closeLabel: t,
  closeButton: o
})));
G5.displayName = "ModalHeader";
const Dn = Ht("h4"), k5 = /* @__PURE__ */ s1.forwardRef(({
  className: e,
  bsPrefix: l,
  as: t = Dn,
  ...o
}, n) => (l = X1(l, "modal-title"), /* @__PURE__ */ G(t, {
  ref: n,
  className: L1(e, l),
  ...o
})));
k5.displayName = "ModalTitle";
function Vn(e) {
  return /* @__PURE__ */ G(w6, {
    ...e,
    timeout: null
  });
}
function Wn(e) {
  return /* @__PURE__ */ G(w6, {
    ...e,
    timeout: null
  });
}
const D5 = /* @__PURE__ */ s1.forwardRef(({
  bsPrefix: e,
  className: l,
  style: t,
  dialogClassName: o,
  contentClassName: n,
  children: r,
  dialogAs: q = k6,
  "data-bs-theme": c,
  "aria-labelledby": i,
  "aria-describedby": a,
  "aria-label": s,
  /* BaseModal props */
  show: m = !1,
  animation: v = !0,
  backdrop: A = !0,
  keyboard: x = !0,
  onEscapeKeyDown: p,
  onShow: d,
  onHide: _,
  container: S,
  autoFocus: g = !0,
  enforceFocus: u = !0,
  restoreFocus: f = !0,
  restoreFocusOptions: E,
  onEntered: C,
  onExit: w,
  onExiting: F,
  onEnter: D,
  onEntering: e1,
  onExited: j,
  backdropClassName: l1,
  manager: $,
  ...Q
}, Z) => {
  const [J, P] = c1({}), [q1, B] = c1(!1), M = v1(!1), W = v1(!1), H = v1(null), [z, I] = pn(), b = b5(Z, I), h = t6(_), R = pt();
  e = X1(e, "modal");
  const k = W1(() => ({
    onHide: h
  }), [h]);
  function N() {
    return $ || kn({
      isRTL: R
    });
  }
  function K(b1) {
    if (!Q4) return;
    const j1 = N().getScrollbarWidth() > 0, e4 = b1.scrollHeight > a3(b1).documentElement.clientHeight;
    P({
      paddingRight: j1 && !e4 ? W8() : void 0,
      paddingLeft: !j1 && e4 ? W8() : void 0
    });
  }
  const T = t6(() => {
    z && K(z.dialog);
  });
  ln(() => {
    l6(window, "resize", T), H.current == null || H.current();
  });
  const t1 = () => {
    M.current = !0;
  }, U = (b1) => {
    M.current && z && b1.target === z.dialog && (W.current = !0), M.current = !1;
  }, Y = () => {
    B(!0), H.current = g5(z.dialog, () => {
      B(!1);
    });
  }, L = (b1) => {
    b1.target === b1.currentTarget && Y();
  }, V = (b1) => {
    if (A === "static") {
      L(b1);
      return;
    }
    if (W.current || b1.target !== b1.currentTarget) {
      W.current = !1;
      return;
    }
    _ == null || _();
  }, O = (b1) => {
    x ? p == null || p(b1) : (b1.preventDefault(), A === "static" && Y());
  }, y = (b1, j1) => {
    b1 && K(b1), D == null || D(b1, j1);
  }, n1 = (b1) => {
    H.current == null || H.current(), w == null || w(b1);
  }, a1 = (b1, j1) => {
    e1 == null || e1(b1, j1), p5(window, "resize", T);
  }, I1 = (b1) => {
    b1 && (b1.style.display = ""), j == null || j(b1), l6(window, "resize", T);
  }, y1 = r1((b1) => /* @__PURE__ */ G("div", {
    ...b1,
    className: L1(`${e}-backdrop`, l1, !v && "show")
  }), [v, l1, e]), N1 = {
    ...t,
    ...J
  };
  N1.display = "block";
  const P1 = (b1) => /* @__PURE__ */ G("div", {
    role: "dialog",
    ...b1,
    style: N1,
    className: L1(l, e, q1 && `${e}-static`, !v && "show"),
    onClick: A ? V : void 0,
    onMouseUp: U,
    "data-bs-theme": c,
    "aria-label": s,
    "aria-labelledby": i,
    "aria-describedby": a,
    children: /* @__PURE__ */ G(q, {
      ...Q,
      onMouseDown: t1,
      className: o,
      contentClassName: n,
      children: r
    })
  });
  return /* @__PURE__ */ G(P5.Provider, {
    value: k,
    children: /* @__PURE__ */ G(Ln, {
      show: m,
      ref: b,
      backdrop: A,
      container: S,
      keyboard: !0,
      autoFocus: g,
      enforceFocus: u,
      restoreFocus: f,
      restoreFocusOptions: E,
      onEscapeKeyDown: O,
      onShow: d,
      onHide: _,
      onEnter: y,
      onEntering: a1,
      onEntered: C,
      onExit: n1,
      onExiting: F,
      onExited: I1,
      manager: N(),
      transition: v ? Vn : void 0,
      backdropTransition: v ? Wn : void 0,
      renderBackdrop: y1,
      renderDialog: P1
    })
  });
});
D5.displayName = "Modal";
const Z8 = Object.assign(D5, {
  Body: L5,
  Header: G5,
  Title: k5,
  Footer: F5,
  Dialog: k6,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
});
function n6() {
  return n6 = Object.assign || function(e) {
    for (var l = 1; l < arguments.length; l++) {
      var t = arguments[l];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, n6.apply(this, arguments);
}
function jn(e, l) {
  if (e == null) return {};
  var t = Xn(e, l), o, n;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (n = 0; n < r.length; n++)
      o = r[n], !(l.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(e, o) && (t[o] = e[o]);
  }
  return t;
}
function Xn(e, l) {
  if (e == null) return {};
  var t = {}, o = Object.keys(e), n, r;
  for (r = 0; r < o.length; r++)
    n = o[r], !(l.indexOf(n) >= 0) && (t[n] = e[n]);
  return t;
}
var D6 = L4(function(e, l) {
  var t = e.color, o = t === void 0 ? "currentColor" : t, n = e.size, r = n === void 0 ? 24 : n, q = jn(e, ["color", "size"]);
  return /* @__PURE__ */ Y1.createElement("svg", n6({
    ref: l,
    xmlns: "http://www.w3.org/2000/svg",
    width: r,
    height: r,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: o,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, q), /* @__PURE__ */ Y1.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /* @__PURE__ */ Y1.createElement("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), /* @__PURE__ */ Y1.createElement("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  }));
});
D6.propTypes = {
  color: m1.string,
  size: m1.oneOfType([m1.string, m1.number])
};
D6.displayName = "XCircle";
const Hn = "_retailerInfoModal_da5av_1", Zn = "_retailerInfoCloseBtn_da5av_11", Yn = "_closeBtn_da5av_21", Jn = "_modalBody_da5av_28", Un = "_contentWrapper_da5av_34", $n = "_content_da5av_34", Qn = "_retailerLogo_da5av_41", Kn = "_img_da5av_46", eo = "_retailerInfoContent_da5av_52", lo = "_getDirectionsFrom_da5av_64", to = "_retailerDropdown_da5av_70", no = "_btn_da5av_77", a4 = {
  retailerInfoModal: Hn,
  retailerInfoCloseBtn: Zn,
  closeBtn: Yn,
  modalBody: Jn,
  contentWrapper: Un,
  content: $n,
  retailerLogo: Qn,
  img: Kn,
  retailerInfoContent: eo,
  getDirectionsFrom: lo,
  retailerDropdown: to,
  btn: no
};
function M4(e) {
  "@babel/helpers - typeof";
  return M4 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(l) {
    return typeof l;
  } : function(l) {
    return l && typeof Symbol == "function" && l.constructor === Symbol && l !== Symbol.prototype ? "symbol" : typeof l;
  }, M4(e);
}
function oo(e, l) {
  if (M4(e) != "object" || !e) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var o = t.call(e, l);
    if (M4(o) != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (l === "string" ? String : Number)(e);
}
function V5(e) {
  var l = oo(e, "string");
  return M4(l) == "symbol" ? l : l + "";
}
function q2(e, l, t) {
  return (l = V5(l)) in e ? Object.defineProperty(e, l, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[l] = t, e;
}
function Y8(e, l) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    l && (o = o.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function x1(e) {
  for (var l = 1; l < arguments.length; l++) {
    var t = arguments[l] != null ? arguments[l] : {};
    l % 2 ? Y8(Object(t), !0).forEach(function(o) {
      q2(e, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Y8(Object(t)).forEach(function(o) {
      Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return e;
}
function ro(e) {
  if (Array.isArray(e)) return e;
}
function qo(e, l) {
  var t = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (t != null) {
    var o, n, r, q, c = [], i = !0, a = !1;
    try {
      if (r = (t = t.call(e)).next, l === 0) {
        if (Object(t) !== t) return;
        i = !1;
      } else for (; !(i = (o = r.call(t)).done) && (c.push(o.value), c.length !== l); i = !0) ;
    } catch (s) {
      a = !0, n = s;
    } finally {
      try {
        if (!i && t.return != null && (q = t.return(), Object(q) !== q)) return;
      } finally {
        if (a) throw n;
      }
    }
    return c;
  }
}
function o6(e, l) {
  (l == null || l > e.length) && (l = e.length);
  for (var t = 0, o = Array(l); t < l; t++) o[t] = e[t];
  return o;
}
function W5(e, l) {
  if (e) {
    if (typeof e == "string") return o6(e, l);
    var t = {}.toString.call(e).slice(8, -1);
    return t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set" ? Array.from(e) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? o6(e, l) : void 0;
  }
}
function io() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function x4(e, l) {
  return ro(e) || qo(e, l) || W5(e, l) || io();
}
function b4(e, l) {
  if (e == null) return {};
  var t, o, n = d5(e, l);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (o = 0; o < r.length; o++) t = r[o], l.indexOf(t) === -1 && {}.propertyIsEnumerable.call(e, t) && (n[t] = e[t]);
  }
  return n;
}
var ao = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function so(e) {
  var l = e.defaultInputValue, t = l === void 0 ? "" : l, o = e.defaultMenuIsOpen, n = o === void 0 ? !1 : o, r = e.defaultValue, q = r === void 0 ? null : r, c = e.inputValue, i = e.menuIsOpen, a = e.onChange, s = e.onInputChange, m = e.onMenuClose, v = e.onMenuOpen, A = e.value, x = b4(e, ao), p = c1(c !== void 0 ? c : t), d = x4(p, 2), _ = d[0], S = d[1], g = c1(i !== void 0 ? i : n), u = x4(g, 2), f = u[0], E = u[1], C = c1(A !== void 0 ? A : q), w = x4(C, 2), F = w[0], D = w[1], e1 = r1(function(P, q1) {
    typeof a == "function" && a(P, q1), D(P);
  }, [a]), j = r1(function(P, q1) {
    var B;
    typeof s == "function" && (B = s(P, q1)), S(B !== void 0 ? B : P);
  }, [s]), l1 = r1(function() {
    typeof v == "function" && v(), E(!0);
  }, [v]), $ = r1(function() {
    typeof m == "function" && m(), E(!1);
  }, [m]), Q = c !== void 0 ? c : _, Z = i !== void 0 ? i : f, J = A !== void 0 ? A : F;
  return x1(x1({}, x), {}, {
    inputValue: Q,
    menuIsOpen: Z,
    onChange: e1,
    onInputChange: j,
    onMenuClose: $,
    onMenuOpen: l1,
    value: J
  });
}
function co(e, l) {
  if (!(e instanceof l)) throw new TypeError("Cannot call a class as a function");
}
function J8(e, l) {
  for (var t = 0; t < l.length; t++) {
    var o = l[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, V5(o.key), o);
  }
}
function uo(e, l, t) {
  return l && J8(e.prototype, l), t && J8(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function mo(e, l) {
  if (typeof l != "function" && l !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(l && l.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), l && W2(e, l);
}
function Z2(e) {
  return Z2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(l) {
    return l.__proto__ || Object.getPrototypeOf(l);
  }, Z2(e);
}
function j5() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (j5 = function() {
    return !!e;
  })();
}
function fo(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xo(e, l) {
  if (l && (M4(l) == "object" || typeof l == "function")) return l;
  if (l !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return fo(e);
}
function ho(e) {
  var l = j5();
  return function() {
    var t, o = Z2(e);
    if (l) {
      var n = Z2(this).constructor;
      t = Reflect.construct(o, arguments, n);
    } else t = o.apply(this, arguments);
    return xo(this, t);
  };
}
function po(e) {
  if (Array.isArray(e)) return o6(e);
}
function go(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function bo() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function V6(e) {
  return po(e) || go(e) || W5(e) || bo();
}
function _o(e) {
  if (e.sheet)
    return e.sheet;
  for (var l = 0; l < document.styleSheets.length; l++)
    if (document.styleSheets[l].ownerNode === e)
      return document.styleSheets[l];
}
function vo(e) {
  var l = document.createElement("style");
  return l.setAttribute("data-emotion", e.key), e.nonce !== void 0 && l.setAttribute("nonce", e.nonce), l.appendChild(document.createTextNode("")), l.setAttribute("data-s", ""), l;
}
var yo = /* @__PURE__ */ function() {
  function e(t) {
    var o = this;
    this._insertTag = function(n) {
      var r;
      o.tags.length === 0 ? o.insertionPoint ? r = o.insertionPoint.nextSibling : o.prepend ? r = o.container.firstChild : r = o.before : r = o.tags[o.tags.length - 1].nextSibling, o.container.insertBefore(n, r), o.tags.push(n);
    }, this.isSpeedy = t.speedy === void 0 ? !0 : t.speedy, this.tags = [], this.ctr = 0, this.nonce = t.nonce, this.key = t.key, this.container = t.container, this.prepend = t.prepend, this.insertionPoint = t.insertionPoint, this.before = null;
  }
  var l = e.prototype;
  return l.hydrate = function(o) {
    o.forEach(this._insertTag);
  }, l.insert = function(o) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(vo(this));
    var n = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var r = _o(n);
      try {
        r.insertRule(o, r.cssRules.length);
      } catch {
      }
    } else
      n.appendChild(document.createTextNode(o));
    this.ctr++;
  }, l.flush = function() {
    this.tags.forEach(function(o) {
      var n;
      return (n = o.parentNode) == null ? void 0 : n.removeChild(o);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), U1 = "-ms-", Y2 = "-moz-", C1 = "-webkit-", X5 = "comm", W6 = "rule", j6 = "decl", Io = "@import", H5 = "@keyframes", Co = "@layer", Eo = Math.abs, u3 = String.fromCharCode, Ao = Object.assign;
function So(e, l) {
  return Z1(e, 0) ^ 45 ? (((l << 2 ^ Z1(e, 0)) << 2 ^ Z1(e, 1)) << 2 ^ Z1(e, 2)) << 2 ^ Z1(e, 3) : 0;
}
function Z5(e) {
  return e.trim();
}
function Ro(e, l) {
  return (e = l.exec(e)) ? e[0] : e;
}
function E1(e, l, t) {
  return e.replace(l, t);
}
function r6(e, l) {
  return e.indexOf(l);
}
function Z1(e, l) {
  return e.charCodeAt(l) | 0;
}
function a2(e, l, t) {
  return e.slice(l, t);
}
function u4(e) {
  return e.length;
}
function X6(e) {
  return e.length;
}
function E2(e, l) {
  return l.push(e), e;
}
function zo(e, l) {
  return e.map(l).join("");
}
var m3 = 1, J4 = 1, Y5 = 0, o4 = 0, D1 = 0, K4 = "";
function d3(e, l, t, o, n, r, q) {
  return { value: e, root: l, parent: t, type: o, props: n, children: r, line: m3, column: J4, length: q, return: "" };
}
function n2(e, l) {
  return Ao(d3("", null, null, "", null, null, 0), e, { length: -e.length }, l);
}
function Oo() {
  return D1;
}
function To() {
  return D1 = o4 > 0 ? Z1(K4, --o4) : 0, J4--, D1 === 10 && (J4 = 1, m3--), D1;
}
function i4() {
  return D1 = o4 < Y5 ? Z1(K4, o4++) : 0, J4++, D1 === 10 && (J4 = 1, m3++), D1;
}
function d4() {
  return Z1(K4, o4);
}
function L2() {
  return o4;
}
function h2(e, l) {
  return a2(K4, e, l);
}
function s2(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function J5(e) {
  return m3 = J4 = 1, Y5 = u4(K4 = e), o4 = 0, [];
}
function U5(e) {
  return K4 = "", e;
}
function P2(e) {
  return Z5(h2(o4 - 1, q6(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function wo(e) {
  for (; (D1 = d4()) && D1 < 33; )
    i4();
  return s2(e) > 2 || s2(D1) > 3 ? "" : " ";
}
function No(e, l) {
  for (; --l && i4() && !(D1 < 48 || D1 > 102 || D1 > 57 && D1 < 65 || D1 > 70 && D1 < 97); )
    ;
  return h2(e, L2() + (l < 6 && d4() == 32 && i4() == 32));
}
function q6(e) {
  for (; i4(); )
    switch (D1) {
      case e:
        return o4;
      case 34:
      case 39:
        e !== 34 && e !== 39 && q6(D1);
        break;
      case 40:
        e === 41 && q6(e);
        break;
      case 92:
        i4();
        break;
    }
  return o4;
}
function Mo(e, l) {
  for (; i4() && e + D1 !== 57; )
    if (e + D1 === 84 && d4() === 47)
      break;
  return "/*" + h2(l, o4 - 1) + "*" + u3(e === 47 ? e : i4());
}
function Lo(e) {
  for (; !s2(d4()); )
    i4();
  return h2(e, o4);
}
function Po(e) {
  return U5(F2("", null, null, null, [""], e = J5(e), 0, [0], e));
}
function F2(e, l, t, o, n, r, q, c, i) {
  for (var a = 0, s = 0, m = q, v = 0, A = 0, x = 0, p = 1, d = 1, _ = 1, S = 0, g = "", u = n, f = r, E = o, C = g; d; )
    switch (x = S, S = i4()) {
      case 40:
        if (x != 108 && Z1(C, m - 1) == 58) {
          r6(C += E1(P2(S), "&", "&\f"), "&\f") != -1 && (_ = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        C += P2(S);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        C += wo(x);
        break;
      case 92:
        C += No(L2() - 1, 7);
        continue;
      case 47:
        switch (d4()) {
          case 42:
          case 47:
            E2(Fo(Mo(i4(), L2()), l, t), i);
            break;
          default:
            C += "/";
        }
        break;
      case 123 * p:
        c[a++] = u4(C) * _;
      case 125 * p:
      case 59:
      case 0:
        switch (S) {
          case 0:
          case 125:
            d = 0;
          case 59 + s:
            _ == -1 && (C = E1(C, /\f/g, "")), A > 0 && u4(C) - m && E2(A > 32 ? $8(C + ";", o, t, m - 1) : $8(E1(C, " ", "") + ";", o, t, m - 2), i);
            break;
          case 59:
            C += ";";
          default:
            if (E2(E = U8(C, l, t, a, s, n, c, g, u = [], f = [], m), r), S === 123)
              if (s === 0)
                F2(C, l, E, E, u, r, m, c, f);
              else
                switch (v === 99 && Z1(C, 3) === 110 ? 100 : v) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    F2(e, E, E, o && E2(U8(e, E, E, 0, 0, n, c, g, n, u = [], m), f), n, f, m, c, o ? u : f);
                    break;
                  default:
                    F2(C, E, E, E, [""], f, 0, c, f);
                }
        }
        a = s = A = 0, p = _ = 1, g = C = "", m = q;
        break;
      case 58:
        m = 1 + u4(C), A = x;
      default:
        if (p < 1) {
          if (S == 123)
            --p;
          else if (S == 125 && p++ == 0 && To() == 125)
            continue;
        }
        switch (C += u3(S), S * p) {
          case 38:
            _ = s > 0 ? 1 : (C += "\f", -1);
            break;
          case 44:
            c[a++] = (u4(C) - 1) * _, _ = 1;
            break;
          case 64:
            d4() === 45 && (C += P2(i4())), v = d4(), s = m = u4(g = C += Lo(L2())), S++;
            break;
          case 45:
            x === 45 && u4(C) == 2 && (p = 0);
        }
    }
  return r;
}
function U8(e, l, t, o, n, r, q, c, i, a, s) {
  for (var m = n - 1, v = n === 0 ? r : [""], A = X6(v), x = 0, p = 0, d = 0; x < o; ++x)
    for (var _ = 0, S = a2(e, m + 1, m = Eo(p = q[x])), g = e; _ < A; ++_)
      (g = Z5(p > 0 ? v[_] + " " + S : E1(S, /&\f/g, v[_]))) && (i[d++] = g);
  return d3(e, l, t, n === 0 ? W6 : c, i, a, s);
}
function Fo(e, l, t) {
  return d3(e, l, t, X5, u3(Oo()), a2(e, 2, -2), 0);
}
function $8(e, l, t, o) {
  return d3(e, l, t, j6, a2(e, 0, o), a2(e, o + 1, -1), o);
}
function Z4(e, l) {
  for (var t = "", o = X6(e), n = 0; n < o; n++)
    t += l(e[n], n, e, l) || "";
  return t;
}
function Bo(e, l, t, o) {
  switch (e.type) {
    case Co:
      if (e.children.length) break;
    case Io:
    case j6:
      return e.return = e.return || e.value;
    case X5:
      return "";
    case H5:
      return e.return = e.value + "{" + Z4(e.children, o) + "}";
    case W6:
      e.value = e.props.join(",");
  }
  return u4(t = Z4(e.children, o)) ? e.return = e.value + "{" + t + "}" : "";
}
function Go(e) {
  var l = X6(e);
  return function(t, o, n, r) {
    for (var q = "", c = 0; c < l; c++)
      q += e[c](t, o, n, r) || "";
    return q;
  };
}
function ko(e) {
  return function(l) {
    l.root || (l = l.return) && e(l);
  };
}
function Do(e) {
  var l = /* @__PURE__ */ Object.create(null);
  return function(t) {
    return l[t] === void 0 && (l[t] = e(t)), l[t];
  };
}
var Vo = function(l, t, o) {
  for (var n = 0, r = 0; n = r, r = d4(), n === 38 && r === 12 && (t[o] = 1), !s2(r); )
    i4();
  return h2(l, o4);
}, Wo = function(l, t) {
  var o = -1, n = 44;
  do
    switch (s2(n)) {
      case 0:
        n === 38 && d4() === 12 && (t[o] = 1), l[o] += Vo(o4 - 1, t, o);
        break;
      case 2:
        l[o] += P2(n);
        break;
      case 4:
        if (n === 44) {
          l[++o] = d4() === 58 ? "&\f" : "", t[o] = l[o].length;
          break;
        }
      default:
        l[o] += u3(n);
    }
  while (n = i4());
  return l;
}, jo = function(l, t) {
  return U5(Wo(J5(l), t));
}, Q8 = /* @__PURE__ */ new WeakMap(), Xo = function(l) {
  if (!(l.type !== "rule" || !l.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  l.length < 1)) {
    for (var t = l.value, o = l.parent, n = l.column === o.column && l.line === o.line; o.type !== "rule"; )
      if (o = o.parent, !o) return;
    if (!(l.props.length === 1 && t.charCodeAt(0) !== 58 && !Q8.get(o)) && !n) {
      Q8.set(l, !0);
      for (var r = [], q = jo(t, r), c = o.props, i = 0, a = 0; i < q.length; i++)
        for (var s = 0; s < c.length; s++, a++)
          l.props[a] = r[i] ? q[i].replace(/&\f/g, c[s]) : c[s] + " " + q[i];
    }
  }
}, Ho = function(l) {
  if (l.type === "decl") {
    var t = l.value;
    // charcode for l
    t.charCodeAt(0) === 108 && // charcode for b
    t.charCodeAt(2) === 98 && (l.return = "", l.value = "");
  }
};
function $5(e, l) {
  switch (So(e, l)) {
    case 5103:
      return C1 + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return C1 + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return C1 + e + Y2 + e + U1 + e + e;
    case 6828:
    case 4268:
      return C1 + e + U1 + e + e;
    case 6165:
      return C1 + e + U1 + "flex-" + e + e;
    case 5187:
      return C1 + e + E1(e, /(\w+).+(:[^]+)/, C1 + "box-$1$2" + U1 + "flex-$1$2") + e;
    case 5443:
      return C1 + e + U1 + "flex-item-" + E1(e, /flex-|-self/, "") + e;
    case 4675:
      return C1 + e + U1 + "flex-line-pack" + E1(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return C1 + e + U1 + E1(e, "shrink", "negative") + e;
    case 5292:
      return C1 + e + U1 + E1(e, "basis", "preferred-size") + e;
    case 6060:
      return C1 + "box-" + E1(e, "-grow", "") + C1 + e + U1 + E1(e, "grow", "positive") + e;
    case 4554:
      return C1 + E1(e, /([^-])(transform)/g, "$1" + C1 + "$2") + e;
    case 6187:
      return E1(E1(E1(e, /(zoom-|grab)/, C1 + "$1"), /(image-set)/, C1 + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return E1(e, /(image-set\([^]*)/, C1 + "$1$`$1");
    case 4968:
      return E1(E1(e, /(.+:)(flex-)?(.*)/, C1 + "box-pack:$3" + U1 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + C1 + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return E1(e, /(.+)-inline(.+)/, C1 + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (u4(e) - 1 - l > 6) switch (Z1(e, l + 1)) {
        case 109:
          if (Z1(e, l + 4) !== 45) break;
        case 102:
          return E1(e, /(.+:)(.+)-([^]+)/, "$1" + C1 + "$2-$3$1" + Y2 + (Z1(e, l + 3) == 108 ? "$3" : "$2-$3")) + e;
        case 115:
          return ~r6(e, "stretch") ? $5(E1(e, "stretch", "fill-available"), l) + e : e;
      }
      break;
    case 4949:
      if (Z1(e, l + 1) !== 115) break;
    case 6444:
      switch (Z1(e, u4(e) - 3 - (~r6(e, "!important") && 10))) {
        case 107:
          return E1(e, ":", ":" + C1) + e;
        case 101:
          return E1(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + C1 + (Z1(e, 14) === 45 ? "inline-" : "") + "box$3$1" + C1 + "$2$3$1" + U1 + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (Z1(e, l + 11)) {
        case 114:
          return C1 + e + U1 + E1(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return C1 + e + U1 + E1(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return C1 + e + U1 + E1(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return C1 + e + U1 + e + e;
  }
  return e;
}
var Zo = function(l, t, o, n) {
  if (l.length > -1 && !l.return) switch (l.type) {
    case j6:
      l.return = $5(l.value, l.length);
      break;
    case H5:
      return Z4([n2(l, {
        value: E1(l.value, "@", "@" + C1)
      })], n);
    case W6:
      if (l.length) return zo(l.props, function(r) {
        switch (Ro(r, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return Z4([n2(l, {
              props: [E1(r, /:(read-\w+)/, ":" + Y2 + "$1")]
            })], n);
          case "::placeholder":
            return Z4([n2(l, {
              props: [E1(r, /:(plac\w+)/, ":" + C1 + "input-$1")]
            }), n2(l, {
              props: [E1(r, /:(plac\w+)/, ":" + Y2 + "$1")]
            }), n2(l, {
              props: [E1(r, /:(plac\w+)/, U1 + "input-$1")]
            })], n);
        }
        return "";
      });
  }
}, Yo = [Zo], Jo = function(l) {
  var t = l.key;
  if (t === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(p) {
      var d = p.getAttribute("data-emotion");
      d.indexOf(" ") !== -1 && (document.head.appendChild(p), p.setAttribute("data-s", ""));
    });
  }
  var n = l.stylisPlugins || Yo, r = {}, q, c = [];
  q = l.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
    function(p) {
      for (var d = p.getAttribute("data-emotion").split(" "), _ = 1; _ < d.length; _++)
        r[d[_]] = !0;
      c.push(p);
    }
  );
  var i, a = [Xo, Ho];
  {
    var s, m = [Bo, ko(function(p) {
      s.insert(p);
    })], v = Go(a.concat(n, m)), A = function(d) {
      return Z4(Po(d), v);
    };
    i = function(d, _, S, g) {
      s = S, A(d ? d + "{" + _.styles + "}" : _.styles), g && (x.inserted[_.name] = !0);
    };
  }
  var x = {
    key: t,
    sheet: new yo({
      key: t,
      container: q,
      nonce: l.nonce,
      speedy: l.speedy,
      prepend: l.prepend,
      insertionPoint: l.insertionPoint
    }),
    nonce: l.nonce,
    inserted: r,
    registered: {},
    insert: i
  };
  return x.sheet.hydrate(c), x;
}, i6 = { exports: {} }, R1 = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var K8;
function Uo() {
  if (K8) return R1;
  K8 = 1;
  var e = typeof Symbol == "function" && Symbol.for, l = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, n = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, q = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, a = e ? Symbol.for("react.concurrent_mode") : 60111, s = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, v = e ? Symbol.for("react.suspense_list") : 60120, A = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, d = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
  function g(f) {
    if (typeof f == "object" && f !== null) {
      var E = f.$$typeof;
      switch (E) {
        case l:
          switch (f = f.type, f) {
            case i:
            case a:
            case o:
            case r:
            case n:
            case m:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case c:
                case s:
                case x:
                case A:
                case q:
                  return f;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  function u(f) {
    return g(f) === a;
  }
  return R1.AsyncMode = i, R1.ConcurrentMode = a, R1.ContextConsumer = c, R1.ContextProvider = q, R1.Element = l, R1.ForwardRef = s, R1.Fragment = o, R1.Lazy = x, R1.Memo = A, R1.Portal = t, R1.Profiler = r, R1.StrictMode = n, R1.Suspense = m, R1.isAsyncMode = function(f) {
    return u(f) || g(f) === i;
  }, R1.isConcurrentMode = u, R1.isContextConsumer = function(f) {
    return g(f) === c;
  }, R1.isContextProvider = function(f) {
    return g(f) === q;
  }, R1.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === l;
  }, R1.isForwardRef = function(f) {
    return g(f) === s;
  }, R1.isFragment = function(f) {
    return g(f) === o;
  }, R1.isLazy = function(f) {
    return g(f) === x;
  }, R1.isMemo = function(f) {
    return g(f) === A;
  }, R1.isPortal = function(f) {
    return g(f) === t;
  }, R1.isProfiler = function(f) {
    return g(f) === r;
  }, R1.isStrictMode = function(f) {
    return g(f) === n;
  }, R1.isSuspense = function(f) {
    return g(f) === m;
  }, R1.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === o || f === a || f === r || f === n || f === m || f === v || typeof f == "object" && f !== null && (f.$$typeof === x || f.$$typeof === A || f.$$typeof === q || f.$$typeof === c || f.$$typeof === s || f.$$typeof === d || f.$$typeof === _ || f.$$typeof === S || f.$$typeof === p);
  }, R1.typeOf = g, R1;
}
var z1 = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e9;
function $o() {
  return e9 || (e9 = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, l = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, n = e ? Symbol.for("react.strict_mode") : 60108, r = e ? Symbol.for("react.profiler") : 60114, q = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, a = e ? Symbol.for("react.concurrent_mode") : 60111, s = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, v = e ? Symbol.for("react.suspense_list") : 60120, A = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, d = e ? Symbol.for("react.fundamental") : 60117, _ = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
    function g(T) {
      return typeof T == "string" || typeof T == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      T === o || T === a || T === r || T === n || T === m || T === v || typeof T == "object" && T !== null && (T.$$typeof === x || T.$$typeof === A || T.$$typeof === q || T.$$typeof === c || T.$$typeof === s || T.$$typeof === d || T.$$typeof === _ || T.$$typeof === S || T.$$typeof === p);
    }
    function u(T) {
      if (typeof T == "object" && T !== null) {
        var t1 = T.$$typeof;
        switch (t1) {
          case l:
            var U = T.type;
            switch (U) {
              case i:
              case a:
              case o:
              case r:
              case n:
              case m:
                return U;
              default:
                var Y = U && U.$$typeof;
                switch (Y) {
                  case c:
                  case s:
                  case x:
                  case A:
                  case q:
                    return Y;
                  default:
                    return t1;
                }
            }
          case t:
            return t1;
        }
      }
    }
    var f = i, E = a, C = c, w = q, F = l, D = s, e1 = o, j = x, l1 = A, $ = t, Q = r, Z = n, J = m, P = !1;
    function q1(T) {
      return P || (P = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), B(T) || u(T) === i;
    }
    function B(T) {
      return u(T) === a;
    }
    function M(T) {
      return u(T) === c;
    }
    function W(T) {
      return u(T) === q;
    }
    function H(T) {
      return typeof T == "object" && T !== null && T.$$typeof === l;
    }
    function z(T) {
      return u(T) === s;
    }
    function I(T) {
      return u(T) === o;
    }
    function b(T) {
      return u(T) === x;
    }
    function h(T) {
      return u(T) === A;
    }
    function R(T) {
      return u(T) === t;
    }
    function k(T) {
      return u(T) === r;
    }
    function N(T) {
      return u(T) === n;
    }
    function K(T) {
      return u(T) === m;
    }
    z1.AsyncMode = f, z1.ConcurrentMode = E, z1.ContextConsumer = C, z1.ContextProvider = w, z1.Element = F, z1.ForwardRef = D, z1.Fragment = e1, z1.Lazy = j, z1.Memo = l1, z1.Portal = $, z1.Profiler = Q, z1.StrictMode = Z, z1.Suspense = J, z1.isAsyncMode = q1, z1.isConcurrentMode = B, z1.isContextConsumer = M, z1.isContextProvider = W, z1.isElement = H, z1.isForwardRef = z, z1.isFragment = I, z1.isLazy = b, z1.isMemo = h, z1.isPortal = R, z1.isProfiler = k, z1.isStrictMode = N, z1.isSuspense = K, z1.isValidElementType = g, z1.typeOf = u;
  }()), z1;
}
process.env.NODE_ENV === "production" ? i6.exports = Uo() : i6.exports = $o();
var Qo = i6.exports, Q5 = Qo, Ko = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, er = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, K5 = {};
K5[Q5.ForwardRef] = Ko;
K5[Q5.Memo] = er;
var lr = !0;
function tr(e, l, t) {
  var o = "";
  return t.split(" ").forEach(function(n) {
    e[n] !== void 0 ? l.push(e[n] + ";") : n && (o += n + " ");
  }), o;
}
var e7 = function(l, t, o) {
  var n = l.key + "-" + t.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (o === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  lr === !1) && l.registered[n] === void 0 && (l.registered[n] = t.styles);
}, nr = function(l, t, o) {
  e7(l, t, o);
  var n = l.key + "-" + t.name;
  if (l.inserted[t.name] === void 0) {
    var r = t;
    do
      l.insert(t === r ? "." + n : "", r, l.sheet, !0), r = r.next;
    while (r !== void 0);
  }
};
function or(e) {
  for (var l = 0, t, o = 0, n = e.length; n >= 4; ++o, n -= 4)
    t = e.charCodeAt(o) & 255 | (e.charCodeAt(++o) & 255) << 8 | (e.charCodeAt(++o) & 255) << 16 | (e.charCodeAt(++o) & 255) << 24, t = /* Math.imul(k, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), t ^= /* k >>> r: */
    t >>> 24, l = /* Math.imul(k, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (l & 65535) * 1540483477 + ((l >>> 16) * 59797 << 16);
  switch (n) {
    case 3:
      l ^= (e.charCodeAt(o + 2) & 255) << 16;
    case 2:
      l ^= (e.charCodeAt(o + 1) & 255) << 8;
    case 1:
      l ^= e.charCodeAt(o) & 255, l = /* Math.imul(h, m): */
      (l & 65535) * 1540483477 + ((l >>> 16) * 59797 << 16);
  }
  return l ^= l >>> 13, l = /* Math.imul(h, m): */
  (l & 65535) * 1540483477 + ((l >>> 16) * 59797 << 16), ((l ^ l >>> 15) >>> 0).toString(36);
}
var rr = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, qr = /[A-Z]|^ms/g, ir = /_EMO_([^_]+?)_([^]*?)_EMO_/g, l7 = function(l) {
  return l.charCodeAt(1) === 45;
}, l9 = function(l) {
  return l != null && typeof l != "boolean";
}, B3 = /* @__PURE__ */ Do(function(e) {
  return l7(e) ? e : e.replace(qr, "-$&").toLowerCase();
}), t9 = function(l, t) {
  switch (l) {
    case "animation":
    case "animationName":
      if (typeof t == "string")
        return t.replace(ir, function(o, n, r) {
          return m4 = {
            name: n,
            styles: r,
            next: m4
          }, n;
        });
  }
  return rr[l] !== 1 && !l7(l) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function c2(e, l, t) {
  if (t == null)
    return "";
  var o = t;
  if (o.__emotion_styles !== void 0)
    return o;
  switch (typeof t) {
    case "boolean":
      return "";
    case "object": {
      var n = t;
      if (n.anim === 1)
        return m4 = {
          name: n.name,
          styles: n.styles,
          next: m4
        }, n.name;
      var r = t;
      if (r.styles !== void 0) {
        var q = r.next;
        if (q !== void 0)
          for (; q !== void 0; )
            m4 = {
              name: q.name,
              styles: q.styles,
              next: m4
            }, q = q.next;
        var c = r.styles + ";";
        return c;
      }
      return ar(e, l, t);
    }
    case "function": {
      if (e !== void 0) {
        var i = m4, a = t(e);
        return m4 = i, c2(e, l, a);
      }
      break;
    }
  }
  var s = t;
  return s;
}
function ar(e, l, t) {
  var o = "";
  if (Array.isArray(t))
    for (var n = 0; n < t.length; n++)
      o += c2(e, l, t[n]) + ";";
  else
    for (var r in t) {
      var q = t[r];
      if (typeof q != "object") {
        var c = q;
        l9(c) && (o += B3(r) + ":" + t9(r, c) + ";");
      } else if (Array.isArray(q) && typeof q[0] == "string" && l == null)
        for (var i = 0; i < q.length; i++)
          l9(q[i]) && (o += B3(r) + ":" + t9(r, q[i]) + ";");
      else {
        var a = c2(e, l, q);
        switch (r) {
          case "animation":
          case "animationName": {
            o += B3(r) + ":" + a + ";";
            break;
          }
          default:
            o += r + "{" + a + "}";
        }
      }
    }
  return o;
}
var n9 = /label:\s*([^\s;{]+)\s*(;|$)/g, m4;
function t7(e, l, t) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var o = !0, n = "";
  m4 = void 0;
  var r = e[0];
  if (r == null || r.raw === void 0)
    o = !1, n += c2(t, l, r);
  else {
    var q = r;
    n += q[0];
  }
  for (var c = 1; c < e.length; c++)
    if (n += c2(t, l, e[c]), o) {
      var i = r;
      n += i[c];
    }
  n9.lastIndex = 0;
  for (var a = "", s; (s = n9.exec(n)) !== null; )
    a += "-" + s[1];
  var m = or(n) + a;
  return {
    name: m,
    styles: n,
    next: m4
  };
}
var sr = function(l) {
  return l();
}, cr = s1.useInsertionEffect ? s1.useInsertionEffect : !1, ur = cr || sr, n7 = /* @__PURE__ */ s1.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Jo({
    key: "css"
  }) : null
);
n7.Provider;
var mr = function(l) {
  return /* @__PURE__ */ L4(function(t, o) {
    var n = Q1(n7);
    return l(t, n, o);
  });
}, dr = /* @__PURE__ */ s1.createContext({}), H6 = {}.hasOwnProperty, a6 = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", fr = function(l, t) {
  var o = {};
  for (var n in t)
    H6.call(t, n) && (o[n] = t[n]);
  return o[a6] = l, o;
}, xr = function(l) {
  var t = l.cache, o = l.serialized, n = l.isStringTag;
  return e7(t, o, n), ur(function() {
    return nr(t, o, n);
  }), null;
}, hr = /* @__PURE__ */ mr(function(e, l, t) {
  var o = e.css;
  typeof o == "string" && l.registered[o] !== void 0 && (o = l.registered[o]);
  var n = e[a6], r = [o], q = "";
  typeof e.className == "string" ? q = tr(l.registered, r, e.className) : e.className != null && (q = e.className + " ");
  var c = t7(r, void 0, s1.useContext(dr));
  q += l.key + "-" + c.name;
  var i = {};
  for (var a in e)
    H6.call(e, a) && a !== "css" && a !== a6 && (i[a] = e[a]);
  return i.className = q, t && (i.ref = t), /* @__PURE__ */ s1.createElement(s1.Fragment, null, /* @__PURE__ */ s1.createElement(xr, {
    cache: l,
    serialized: c,
    isStringTag: typeof n == "string"
  }), /* @__PURE__ */ s1.createElement(n, i));
}), pr = hr, d1 = function(l, t) {
  var o = arguments;
  if (t == null || !H6.call(t, "css"))
    return s1.createElement.apply(void 0, o);
  var n = o.length, r = new Array(n);
  r[0] = pr, r[1] = fr(l, t);
  for (var q = 2; q < n; q++)
    r[q] = o[q];
  return s1.createElement.apply(null, r);
};
(function(e) {
  var l;
  l || (l = e.JSX || (e.JSX = {}));
})(d1 || (d1 = {}));
function Z6() {
  for (var e = arguments.length, l = new Array(e), t = 0; t < e; t++)
    l[t] = arguments[t];
  return t7(l);
}
function gr() {
  var e = Z6.apply(void 0, arguments), l = "animation-" + e.name;
  return {
    name: l,
    styles: "@keyframes " + l + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
function br(e, l) {
  return l || (l = e.slice(0)), Object.freeze(Object.defineProperties(e, {
    raw: {
      value: Object.freeze(l)
    }
  }));
}
const _r = Math.min, vr = Math.max, J2 = Math.round, A2 = Math.floor, U2 = (e) => ({
  x: e,
  y: e
});
function yr(e) {
  const {
    x: l,
    y: t,
    width: o,
    height: n
  } = e;
  return {
    width: o,
    height: n,
    top: t,
    left: l,
    right: l + o,
    bottom: t + n,
    x: l,
    y: t
  };
}
function f3() {
  return typeof window < "u";
}
function o7(e) {
  return q7(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function p4(e) {
  var l;
  return (e == null || (l = e.ownerDocument) == null ? void 0 : l.defaultView) || window;
}
function r7(e) {
  var l;
  return (l = (q7(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : l.documentElement;
}
function q7(e) {
  return f3() ? e instanceof Node || e instanceof p4(e).Node : !1;
}
function Ir(e) {
  return f3() ? e instanceof Element || e instanceof p4(e).Element : !1;
}
function Y6(e) {
  return f3() ? e instanceof HTMLElement || e instanceof p4(e).HTMLElement : !1;
}
function o9(e) {
  return !f3() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof p4(e).ShadowRoot;
}
const Cr = /* @__PURE__ */ new Set(["inline", "contents"]);
function i7(e) {
  const {
    overflow: l,
    overflowX: t,
    overflowY: o,
    display: n
  } = J6(e);
  return /auto|scroll|overlay|hidden|clip/.test(l + o + t) && !Cr.has(n);
}
function Er() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Ar = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Sr(e) {
  return Ar.has(o7(e));
}
function J6(e) {
  return p4(e).getComputedStyle(e);
}
function Rr(e) {
  if (o7(e) === "html")
    return e;
  const l = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    o9(e) && e.host || // Fallback.
    r7(e)
  );
  return o9(l) ? l.host : l;
}
function a7(e) {
  const l = Rr(e);
  return Sr(l) ? e.ownerDocument ? e.ownerDocument.body : e.body : Y6(l) && i7(l) ? l : a7(l);
}
function $2(e, l, t) {
  var o;
  l === void 0 && (l = []), t === void 0 && (t = !0);
  const n = a7(e), r = n === ((o = e.ownerDocument) == null ? void 0 : o.body), q = p4(n);
  if (r) {
    const c = s6(q);
    return l.concat(q, q.visualViewport || [], i7(n) ? n : [], c && t ? $2(c) : []);
  }
  return l.concat(n, $2(n, [], t));
}
function s6(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function zr(e) {
  const l = J6(e);
  let t = parseFloat(l.width) || 0, o = parseFloat(l.height) || 0;
  const n = Y6(e), r = n ? e.offsetWidth : t, q = n ? e.offsetHeight : o, c = J2(t) !== r || J2(o) !== q;
  return c && (t = r, o = q), {
    width: t,
    height: o,
    $: c
  };
}
function U6(e) {
  return Ir(e) ? e : e.contextElement;
}
function r9(e) {
  const l = U6(e);
  if (!Y6(l))
    return U2(1);
  const t = l.getBoundingClientRect(), {
    width: o,
    height: n,
    $: r
  } = zr(l);
  let q = (r ? J2(t.width) : t.width) / o, c = (r ? J2(t.height) : t.height) / n;
  return (!q || !Number.isFinite(q)) && (q = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: q,
    y: c
  };
}
const Or = /* @__PURE__ */ U2(0);
function Tr(e) {
  const l = p4(e);
  return !Er() || !l.visualViewport ? Or : {
    x: l.visualViewport.offsetLeft,
    y: l.visualViewport.offsetTop
  };
}
function wr(e, l, t) {
  return !1;
}
function q9(e, l, t, o) {
  l === void 0 && (l = !1);
  const n = e.getBoundingClientRect(), r = U6(e);
  let q = U2(1);
  l && (q = r9(e));
  const c = wr() ? Tr(r) : U2(0);
  let i = (n.left + c.x) / q.x, a = (n.top + c.y) / q.y, s = n.width / q.x, m = n.height / q.y;
  if (r) {
    const v = p4(r), A = o;
    let x = v, p = s6(x);
    for (; p && o && A !== x; ) {
      const d = r9(p), _ = p.getBoundingClientRect(), S = J6(p), g = _.left + (p.clientLeft + parseFloat(S.paddingLeft)) * d.x, u = _.top + (p.clientTop + parseFloat(S.paddingTop)) * d.y;
      i *= d.x, a *= d.y, s *= d.x, m *= d.y, i += g, a += u, x = p4(p), p = s6(x);
    }
  }
  return yr({
    width: s,
    height: m,
    x: i,
    y: a
  });
}
function s7(e, l) {
  return e.x === l.x && e.y === l.y && e.width === l.width && e.height === l.height;
}
function Nr(e, l) {
  let t = null, o;
  const n = r7(e);
  function r() {
    var c;
    clearTimeout(o), (c = t) == null || c.disconnect(), t = null;
  }
  function q(c, i) {
    c === void 0 && (c = !1), i === void 0 && (i = 1), r();
    const a = e.getBoundingClientRect(), {
      left: s,
      top: m,
      width: v,
      height: A
    } = a;
    if (c || l(), !v || !A)
      return;
    const x = A2(m), p = A2(n.clientWidth - (s + v)), d = A2(n.clientHeight - (m + A)), _ = A2(s), g = {
      rootMargin: -x + "px " + -p + "px " + -d + "px " + -_ + "px",
      threshold: vr(0, _r(1, i)) || 1
    };
    let u = !0;
    function f(E) {
      const C = E[0].intersectionRatio;
      if (C !== i) {
        if (!u)
          return q();
        C ? q(!1, C) : o = setTimeout(() => {
          q(!1, 1e-7);
        }, 1e3);
      }
      C === 1 && !s7(a, e.getBoundingClientRect()) && q(), u = !1;
    }
    try {
      t = new IntersectionObserver(f, {
        ...g,
        // Handle <iframe>s
        root: n.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(f, g);
    }
    t.observe(e);
  }
  return q(!0), r;
}
function Mr(e, l, t, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: n = !0,
    ancestorResize: r = !0,
    elementResize: q = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: i = !1
  } = o, a = U6(e), s = n || r ? [...a ? $2(a) : [], ...$2(l)] : [];
  s.forEach((_) => {
    n && _.addEventListener("scroll", t, {
      passive: !0
    }), r && _.addEventListener("resize", t);
  });
  const m = a && c ? Nr(a, t) : null;
  let v = -1, A = null;
  q && (A = new ResizeObserver((_) => {
    let [S] = _;
    S && S.target === a && A && (A.unobserve(l), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var g;
      (g = A) == null || g.observe(l);
    })), t();
  }), a && !i && A.observe(a), A.observe(l));
  let x, p = i ? q9(e) : null;
  i && d();
  function d() {
    const _ = q9(e);
    p && !s7(p, _) && t(), p = _, x = requestAnimationFrame(d);
  }
  return t(), () => {
    var _;
    s.forEach((S) => {
      n && S.removeEventListener("scroll", t), r && S.removeEventListener("resize", t);
    }), m == null || m(), (_ = A) == null || _.disconnect(), A = null, i && cancelAnimationFrame(x);
  };
}
var c6 = E9, Lr = ["className", "clearValue", "cx", "getStyles", "getClassNames", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"], Q2 = function() {
};
function Pr(e, l) {
  return l ? l[0] === "-" ? e + l : e + "__" + l : e;
}
function Fr(e, l) {
  for (var t = arguments.length, o = new Array(t > 2 ? t - 2 : 0), n = 2; n < t; n++)
    o[n - 2] = arguments[n];
  var r = [].concat(o);
  if (l && e)
    for (var q in l)
      l.hasOwnProperty(q) && l[q] && r.push("".concat(Pr(e, q)));
  return r.filter(function(c) {
    return c;
  }).map(function(c) {
    return String(c).trim();
  }).join(" ");
}
var i9 = function(l) {
  return Hr(l) ? l.filter(Boolean) : M4(l) === "object" && l !== null ? [l] : [];
}, c7 = function(l) {
  l.className, l.clearValue, l.cx, l.getStyles, l.getClassNames, l.getValue, l.hasValue, l.isMulti, l.isRtl, l.options, l.selectOption, l.selectProps, l.setValue, l.theme;
  var t = b4(l, Lr);
  return x1({}, t);
}, B1 = function(l, t, o) {
  var n = l.cx, r = l.getStyles, q = l.getClassNames, c = l.className;
  return {
    css: r(t, l),
    className: n(o ?? {}, q(t, l), c)
  };
};
function x3(e) {
  return [document.documentElement, document.body, window].indexOf(e) > -1;
}
function Br(e) {
  return x3(e) ? window.innerHeight : e.clientHeight;
}
function u7(e) {
  return x3(e) ? window.pageYOffset : e.scrollTop;
}
function K2(e, l) {
  if (x3(e)) {
    window.scrollTo(0, l);
    return;
  }
  e.scrollTop = l;
}
function Gr(e) {
  var l = getComputedStyle(e), t = l.position === "absolute", o = /(auto|scroll)/;
  if (l.position === "fixed") return document.documentElement;
  for (var n = e; n = n.parentElement; )
    if (l = getComputedStyle(n), !(t && l.position === "static") && o.test(l.overflow + l.overflowY + l.overflowX))
      return n;
  return document.documentElement;
}
function kr(e, l, t, o) {
  return t * ((e = e / o - 1) * e * e + 1) + l;
}
function S2(e, l) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 200, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Q2, n = u7(e), r = l - n, q = 10, c = 0;
  function i() {
    c += q;
    var a = kr(c, n, r, t);
    K2(e, a), c < t ? window.requestAnimationFrame(i) : o(e);
  }
  i();
}
function a9(e, l) {
  var t = e.getBoundingClientRect(), o = l.getBoundingClientRect(), n = l.offsetHeight / 3;
  o.bottom + n > t.bottom ? K2(e, Math.min(l.offsetTop + l.clientHeight - e.offsetHeight + n, e.scrollHeight)) : o.top - n < t.top && K2(e, Math.max(l.offsetTop - n, 0));
}
function Dr(e) {
  var l = e.getBoundingClientRect();
  return {
    bottom: l.bottom,
    height: l.height,
    left: l.left,
    right: l.right,
    top: l.top,
    width: l.width
  };
}
function s9() {
  try {
    return document.createEvent("TouchEvent"), !0;
  } catch {
    return !1;
  }
}
function Vr() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch {
    return !1;
  }
}
var m7 = !1, Wr = {
  get passive() {
    return m7 = !0;
  }
}, R2 = typeof window < "u" ? window : {};
R2.addEventListener && R2.removeEventListener && (R2.addEventListener("p", Q2, Wr), R2.removeEventListener("p", Q2, !1));
var jr = m7;
function Xr(e) {
  return e != null;
}
function Hr(e) {
  return Array.isArray(e);
}
function z2(e, l, t) {
  return e ? l : t;
}
var Zr = function(l) {
  for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    o[n - 1] = arguments[n];
  var r = Object.entries(l).filter(function(q) {
    var c = x4(q, 1), i = c[0];
    return !o.includes(i);
  });
  return r.reduce(function(q, c) {
    var i = x4(c, 2), a = i[0], s = i[1];
    return q[a] = s, q;
  }, {});
}, Yr = ["children", "innerProps"], Jr = ["children", "innerProps"];
function Ur(e) {
  var l = e.maxHeight, t = e.menuEl, o = e.minHeight, n = e.placement, r = e.shouldScroll, q = e.isFixedPosition, c = e.controlHeight, i = Gr(t), a = {
    placement: "bottom",
    maxHeight: l
  };
  if (!t || !t.offsetParent) return a;
  var s = i.getBoundingClientRect(), m = s.height, v = t.getBoundingClientRect(), A = v.bottom, x = v.height, p = v.top, d = t.offsetParent.getBoundingClientRect(), _ = d.top, S = q ? window.innerHeight : Br(i), g = u7(i), u = parseInt(getComputedStyle(t).marginBottom, 10), f = parseInt(getComputedStyle(t).marginTop, 10), E = _ - f, C = S - p, w = E + g, F = m - g - p, D = A - S + g + u, e1 = g + p - f, j = 160;
  switch (n) {
    case "auto":
    case "bottom":
      if (C >= x)
        return {
          placement: "bottom",
          maxHeight: l
        };
      if (F >= x && !q)
        return r && S2(i, D, j), {
          placement: "bottom",
          maxHeight: l
        };
      if (!q && F >= o || q && C >= o) {
        r && S2(i, D, j);
        var l1 = q ? C - u : F - u;
        return {
          placement: "bottom",
          maxHeight: l1
        };
      }
      if (n === "auto" || q) {
        var $ = l, Q = q ? E : w;
        return Q >= o && ($ = Math.min(Q - u - c, l)), {
          placement: "top",
          maxHeight: $
        };
      }
      if (n === "bottom")
        return r && K2(i, D), {
          placement: "bottom",
          maxHeight: l
        };
      break;
    case "top":
      if (E >= x)
        return {
          placement: "top",
          maxHeight: l
        };
      if (w >= x && !q)
        return r && S2(i, e1, j), {
          placement: "top",
          maxHeight: l
        };
      if (!q && w >= o || q && E >= o) {
        var Z = l;
        return (!q && w >= o || q && E >= o) && (Z = q ? E - f : w - f), r && S2(i, e1, j), {
          placement: "top",
          maxHeight: Z
        };
      }
      return {
        placement: "bottom",
        maxHeight: l
      };
    default:
      throw new Error('Invalid placement provided "'.concat(n, '".'));
  }
  return a;
}
function $r(e) {
  var l = {
    bottom: "top",
    top: "bottom"
  };
  return e ? l[e] : "bottom";
}
var d7 = function(l) {
  return l === "auto" ? "bottom" : l;
}, Qr = function(l, t) {
  var o, n = l.placement, r = l.theme, q = r.borderRadius, c = r.spacing, i = r.colors;
  return x1((o = {
    label: "menu"
  }, q2(o, $r(n), "100%"), q2(o, "position", "absolute"), q2(o, "width", "100%"), q2(o, "zIndex", 1), o), t ? {} : {
    backgroundColor: i.neutral0,
    borderRadius: q,
    boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
    marginBottom: c.menuGutter,
    marginTop: c.menuGutter
  });
}, f7 = /* @__PURE__ */ d6(null), Kr = function(l) {
  var t = l.children, o = l.minMenuHeight, n = l.maxMenuHeight, r = l.menuPlacement, q = l.menuPosition, c = l.menuShouldScrollIntoView, i = l.theme, a = Q1(f7) || {}, s = a.setPortalPlacement, m = v1(null), v = c1(n), A = x4(v, 2), x = A[0], p = A[1], d = c1(null), _ = x4(d, 2), S = _[0], g = _[1], u = i.spacing.controlHeight;
  return c6(function() {
    var f = m.current;
    if (f) {
      var E = q === "fixed", C = c && !E, w = Ur({
        maxHeight: n,
        menuEl: f,
        minHeight: o,
        placement: r,
        shouldScroll: C,
        isFixedPosition: E,
        controlHeight: u
      });
      p(w.maxHeight), g(w.placement), s == null || s(w.placement);
    }
  }, [n, r, q, c, o, s, u]), t({
    ref: m,
    placerProps: x1(x1({}, l), {}, {
      placement: S || d7(r),
      maxHeight: x
    })
  });
}, eq = function(l) {
  var t = l.children, o = l.innerRef, n = l.innerProps;
  return d1("div", h1({}, B1(l, "menu", {
    menu: !0
  }), {
    ref: o
  }, n), t);
}, lq = eq, tq = function(l, t) {
  var o = l.maxHeight, n = l.theme.spacing.baseUnit;
  return x1({
    maxHeight: o,
    overflowY: "auto",
    position: "relative",
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: "touch"
  }, t ? {} : {
    paddingBottom: n,
    paddingTop: n
  });
}, nq = function(l) {
  var t = l.children, o = l.innerProps, n = l.innerRef, r = l.isMulti;
  return d1("div", h1({}, B1(l, "menuList", {
    "menu-list": !0,
    "menu-list--is-multi": r
  }), {
    ref: n
  }, o), t);
}, x7 = function(l, t) {
  var o = l.theme, n = o.spacing.baseUnit, r = o.colors;
  return x1({
    textAlign: "center"
  }, t ? {} : {
    color: r.neutral40,
    padding: "".concat(n * 2, "px ").concat(n * 3, "px")
  });
}, oq = x7, rq = x7, qq = function(l) {
  var t = l.children, o = t === void 0 ? "No options" : t, n = l.innerProps, r = b4(l, Yr);
  return d1("div", h1({}, B1(x1(x1({}, r), {}, {
    children: o,
    innerProps: n
  }), "noOptionsMessage", {
    "menu-notice": !0,
    "menu-notice--no-options": !0
  }), n), o);
}, iq = function(l) {
  var t = l.children, o = t === void 0 ? "Loading..." : t, n = l.innerProps, r = b4(l, Jr);
  return d1("div", h1({}, B1(x1(x1({}, r), {}, {
    children: o,
    innerProps: n
  }), "loadingMessage", {
    "menu-notice": !0,
    "menu-notice--loading": !0
  }), n), o);
}, aq = function(l) {
  var t = l.rect, o = l.offset, n = l.position;
  return {
    left: t.left,
    position: n,
    top: o,
    width: t.width,
    zIndex: 1
  };
}, sq = function(l) {
  var t = l.appendTo, o = l.children, n = l.controlElement, r = l.innerProps, q = l.menuPlacement, c = l.menuPosition, i = v1(null), a = v1(null), s = c1(d7(q)), m = x4(s, 2), v = m[0], A = m[1], x = W1(function() {
    return {
      setPortalPlacement: A
    };
  }, []), p = c1(null), d = x4(p, 2), _ = d[0], S = d[1], g = r1(function() {
    if (n) {
      var C = Dr(n), w = c === "fixed" ? 0 : window.pageYOffset, F = C[v] + w;
      (F !== (_ == null ? void 0 : _.offset) || C.left !== (_ == null ? void 0 : _.rect.left) || C.width !== (_ == null ? void 0 : _.rect.width)) && S({
        offset: F,
        rect: C
      });
    }
  }, [n, c, v, _ == null ? void 0 : _.offset, _ == null ? void 0 : _.rect.left, _ == null ? void 0 : _.rect.width]);
  c6(function() {
    g();
  }, [g]);
  var u = r1(function() {
    typeof a.current == "function" && (a.current(), a.current = null), n && i.current && (a.current = Mr(n, i.current, g, {
      elementResize: "ResizeObserver" in window
    }));
  }, [n, g]);
  c6(function() {
    u();
  }, [u]);
  var f = r1(function(C) {
    i.current = C, u();
  }, [u]);
  if (!t && c !== "fixed" || !_) return null;
  var E = d1("div", h1({
    ref: f
  }, B1(x1(x1({}, l), {}, {
    offset: _.offset,
    position: c,
    rect: _.rect
  }), "menuPortal", {
    "menu-portal": !0
  }), r), o);
  return d1(f7.Provider, {
    value: x
  }, t ? /* @__PURE__ */ se(E, t) : E);
}, cq = function(l) {
  var t = l.isDisabled, o = l.isRtl;
  return {
    label: "container",
    direction: o ? "rtl" : void 0,
    pointerEvents: t ? "none" : void 0,
    // cancel mouse events when disabled
    position: "relative"
  };
}, uq = function(l) {
  var t = l.children, o = l.innerProps, n = l.isDisabled, r = l.isRtl;
  return d1("div", h1({}, B1(l, "container", {
    "--is-disabled": n,
    "--is-rtl": r
  }), o), t);
}, mq = function(l, t) {
  var o = l.theme.spacing, n = l.isMulti, r = l.hasValue, q = l.selectProps.controlShouldRenderValue;
  return x1({
    alignItems: "center",
    display: n && r && q ? "flex" : "grid",
    flex: 1,
    flexWrap: "wrap",
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden"
  }, t ? {} : {
    padding: "".concat(o.baseUnit / 2, "px ").concat(o.baseUnit * 2, "px")
  });
}, dq = function(l) {
  var t = l.children, o = l.innerProps, n = l.isMulti, r = l.hasValue;
  return d1("div", h1({}, B1(l, "valueContainer", {
    "value-container": !0,
    "value-container--is-multi": n,
    "value-container--has-value": r
  }), o), t);
}, fq = function() {
  return {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexShrink: 0
  };
}, xq = function(l) {
  var t = l.children, o = l.innerProps;
  return d1("div", h1({}, B1(l, "indicatorsContainer", {
    indicators: !0
  }), o), t);
}, c9, hq = ["size"], pq = ["innerProps", "isRtl", "size"];
function gq() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var bq = process.env.NODE_ENV === "production" ? {
  name: "8mmkcg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0"
} : {
  name: "tj5bde-Svg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */",
  toString: gq
}, h7 = function(l) {
  var t = l.size, o = b4(l, hq);
  return d1("svg", h1({
    height: t,
    width: t,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: bq
  }, o));
}, $6 = function(l) {
  return d1(h7, h1({
    size: 20
  }, l), d1("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
}, p7 = function(l) {
  return d1(h7, h1({
    size: 20
  }, l), d1("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
}, g7 = function(l, t) {
  var o = l.isFocused, n = l.theme, r = n.spacing.baseUnit, q = n.colors;
  return x1({
    label: "indicatorContainer",
    display: "flex",
    transition: "color 150ms"
  }, t ? {} : {
    color: o ? q.neutral60 : q.neutral20,
    padding: r * 2,
    ":hover": {
      color: o ? q.neutral80 : q.neutral40
    }
  });
}, _q = g7, vq = function(l) {
  var t = l.children, o = l.innerProps;
  return d1("div", h1({}, B1(l, "dropdownIndicator", {
    indicator: !0,
    "dropdown-indicator": !0
  }), o), t || d1(p7, null));
}, yq = g7, Iq = function(l) {
  var t = l.children, o = l.innerProps;
  return d1("div", h1({}, B1(l, "clearIndicator", {
    indicator: !0,
    "clear-indicator": !0
  }), o), t || d1($6, null));
}, Cq = function(l, t) {
  var o = l.isDisabled, n = l.theme, r = n.spacing.baseUnit, q = n.colors;
  return x1({
    label: "indicatorSeparator",
    alignSelf: "stretch",
    width: 1
  }, t ? {} : {
    backgroundColor: o ? q.neutral10 : q.neutral20,
    marginBottom: r * 2,
    marginTop: r * 2
  });
}, Eq = function(l) {
  var t = l.innerProps;
  return d1("span", h1({}, t, B1(l, "indicatorSeparator", {
    "indicator-separator": !0
  })));
}, Aq = gr(c9 || (c9 = br([`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`]))), Sq = function(l, t) {
  var o = l.isFocused, n = l.size, r = l.theme, q = r.colors, c = r.spacing.baseUnit;
  return x1({
    label: "loadingIndicator",
    display: "flex",
    transition: "color 150ms",
    alignSelf: "center",
    fontSize: n,
    lineHeight: 1,
    marginRight: n,
    textAlign: "center",
    verticalAlign: "middle"
  }, t ? {} : {
    color: o ? q.neutral60 : q.neutral20,
    padding: c * 2
  });
}, G3 = function(l) {
  var t = l.delay, o = l.offset;
  return d1("span", {
    css: /* @__PURE__ */ Z6({
      animation: "".concat(Aq, " 1s ease-in-out ").concat(t, "ms infinite;"),
      backgroundColor: "currentColor",
      borderRadius: "1em",
      display: "inline-block",
      marginLeft: o ? "1em" : void 0,
      height: "1em",
      verticalAlign: "top",
      width: "1em"
    }, process.env.NODE_ENV === "production" ? "" : ";label:LoadingDot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1RSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */")
  });
}, Rq = function(l) {
  var t = l.innerProps, o = l.isRtl, n = l.size, r = n === void 0 ? 4 : n, q = b4(l, pq);
  return d1("div", h1({}, B1(x1(x1({}, q), {}, {
    innerProps: t,
    isRtl: o,
    size: r
  }), "loadingIndicator", {
    indicator: !0,
    "loading-indicator": !0
  }), t), d1(G3, {
    delay: 0,
    offset: o
  }), d1(G3, {
    delay: 160,
    offset: !0
  }), d1(G3, {
    delay: 320,
    offset: !o
  }));
}, zq = function(l, t) {
  var o = l.isDisabled, n = l.isFocused, r = l.theme, q = r.colors, c = r.borderRadius, i = r.spacing;
  return x1({
    label: "control",
    alignItems: "center",
    cursor: "default",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: i.controlHeight,
    outline: "0 !important",
    position: "relative",
    transition: "all 100ms"
  }, t ? {} : {
    backgroundColor: o ? q.neutral5 : q.neutral0,
    borderColor: o ? q.neutral10 : n ? q.primary : q.neutral20,
    borderRadius: c,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: n ? "0 0 0 1px ".concat(q.primary) : void 0,
    "&:hover": {
      borderColor: n ? q.primary : q.neutral30
    }
  });
}, Oq = function(l) {
  var t = l.children, o = l.isDisabled, n = l.isFocused, r = l.innerRef, q = l.innerProps, c = l.menuIsOpen;
  return d1("div", h1({
    ref: r
  }, B1(l, "control", {
    control: !0,
    "control--is-disabled": o,
    "control--is-focused": n,
    "control--menu-is-open": c
  }), q, {
    "aria-disabled": o || void 0
  }), t);
}, Tq = Oq, wq = ["data"], Nq = function(l, t) {
  var o = l.theme.spacing;
  return t ? {} : {
    paddingBottom: o.baseUnit * 2,
    paddingTop: o.baseUnit * 2
  };
}, Mq = function(l) {
  var t = l.children, o = l.cx, n = l.getStyles, r = l.getClassNames, q = l.Heading, c = l.headingProps, i = l.innerProps, a = l.label, s = l.theme, m = l.selectProps;
  return d1("div", h1({}, B1(l, "group", {
    group: !0
  }), i), d1(q, h1({}, c, {
    selectProps: m,
    theme: s,
    getStyles: n,
    getClassNames: r,
    cx: o
  }), a), d1("div", null, t));
}, Lq = function(l, t) {
  var o = l.theme, n = o.colors, r = o.spacing;
  return x1({
    label: "group",
    cursor: "default",
    display: "block"
  }, t ? {} : {
    color: n.neutral40,
    fontSize: "75%",
    fontWeight: 500,
    marginBottom: "0.25em",
    paddingLeft: r.baseUnit * 3,
    paddingRight: r.baseUnit * 3,
    textTransform: "uppercase"
  });
}, Pq = function(l) {
  var t = c7(l);
  t.data;
  var o = b4(t, wq);
  return d1("div", h1({}, B1(l, "groupHeading", {
    "group-heading": !0
  }), o));
}, Fq = Mq, Bq = ["innerRef", "isDisabled", "isHidden", "inputClassName"], Gq = function(l, t) {
  var o = l.isDisabled, n = l.value, r = l.theme, q = r.spacing, c = r.colors;
  return x1(x1({
    visibility: o ? "hidden" : "visible",
    // force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: n ? "translateZ(0)" : ""
  }, kq), t ? {} : {
    margin: q.baseUnit / 2,
    paddingBottom: q.baseUnit / 2,
    paddingTop: q.baseUnit / 2,
    color: c.neutral80
  });
}, b7 = {
  gridArea: "1 / 2",
  font: "inherit",
  minWidth: "2px",
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0
}, kq = {
  flex: "1 1 auto",
  display: "inline-grid",
  gridArea: "1 / 1 / 2 / 3",
  gridTemplateColumns: "0 min-content",
  "&:after": x1({
    content: 'attr(data-value) " "',
    visibility: "hidden",
    whiteSpace: "pre"
  }, b7)
}, Dq = function(l) {
  return x1({
    label: "input",
    color: "inherit",
    background: 0,
    opacity: l ? 0 : 1,
    width: "100%"
  }, b7);
}, Vq = function(l) {
  var t = l.cx, o = l.value, n = c7(l), r = n.innerRef, q = n.isDisabled, c = n.isHidden, i = n.inputClassName, a = b4(n, Bq);
  return d1("div", h1({}, B1(l, "input", {
    "input-container": !0
  }), {
    "data-value": o || ""
  }), d1("input", h1({
    className: t({
      input: !0
    }, i),
    ref: r,
    style: Dq(c),
    disabled: q
  }, a)));
}, Wq = Vq, jq = function(l, t) {
  var o = l.theme, n = o.spacing, r = o.borderRadius, q = o.colors;
  return x1({
    label: "multiValue",
    display: "flex",
    minWidth: 0
  }, t ? {} : {
    backgroundColor: q.neutral10,
    borderRadius: r / 2,
    margin: n.baseUnit / 2
  });
}, Xq = function(l, t) {
  var o = l.theme, n = o.borderRadius, r = o.colors, q = l.cropWithEllipsis;
  return x1({
    overflow: "hidden",
    textOverflow: q || q === void 0 ? "ellipsis" : void 0,
    whiteSpace: "nowrap"
  }, t ? {} : {
    borderRadius: n / 2,
    color: r.neutral80,
    fontSize: "85%",
    padding: 3,
    paddingLeft: 6
  });
}, Hq = function(l, t) {
  var o = l.theme, n = o.spacing, r = o.borderRadius, q = o.colors, c = l.isFocused;
  return x1({
    alignItems: "center",
    display: "flex"
  }, t ? {} : {
    borderRadius: r / 2,
    backgroundColor: c ? q.dangerLight : void 0,
    paddingLeft: n.baseUnit,
    paddingRight: n.baseUnit,
    ":hover": {
      backgroundColor: q.dangerLight,
      color: q.danger
    }
  });
}, _7 = function(l) {
  var t = l.children, o = l.innerProps;
  return d1("div", o, t);
}, Zq = _7, Yq = _7;
function Jq(e) {
  var l = e.children, t = e.innerProps;
  return d1("div", h1({
    role: "button"
  }, t), l || d1($6, {
    size: 14
  }));
}
var Uq = function(l) {
  var t = l.children, o = l.components, n = l.data, r = l.innerProps, q = l.isDisabled, c = l.removeProps, i = l.selectProps, a = o.Container, s = o.Label, m = o.Remove;
  return d1(a, {
    data: n,
    innerProps: x1(x1({}, B1(l, "multiValue", {
      "multi-value": !0,
      "multi-value--is-disabled": q
    })), r),
    selectProps: i
  }, d1(s, {
    data: n,
    innerProps: x1({}, B1(l, "multiValueLabel", {
      "multi-value__label": !0
    })),
    selectProps: i
  }, t), d1(m, {
    data: n,
    innerProps: x1(x1({}, B1(l, "multiValueRemove", {
      "multi-value__remove": !0
    })), {}, {
      "aria-label": "Remove ".concat(t || "option")
    }, c),
    selectProps: i
  }));
}, $q = Uq, Qq = function(l, t) {
  var o = l.isDisabled, n = l.isFocused, r = l.isSelected, q = l.theme, c = q.spacing, i = q.colors;
  return x1({
    label: "option",
    cursor: "default",
    display: "block",
    fontSize: "inherit",
    width: "100%",
    userSelect: "none",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
  }, t ? {} : {
    backgroundColor: r ? i.primary : n ? i.primary25 : "transparent",
    color: o ? i.neutral20 : r ? i.neutral0 : "inherit",
    padding: "".concat(c.baseUnit * 2, "px ").concat(c.baseUnit * 3, "px"),
    // provide some affordance on touch devices
    ":active": {
      backgroundColor: o ? void 0 : r ? i.primary : i.primary50
    }
  });
}, Kq = function(l) {
  var t = l.children, o = l.isDisabled, n = l.isFocused, r = l.isSelected, q = l.innerRef, c = l.innerProps;
  return d1("div", h1({}, B1(l, "option", {
    option: !0,
    "option--is-disabled": o,
    "option--is-focused": n,
    "option--is-selected": r
  }), {
    ref: q,
    "aria-disabled": o
  }, c), t);
}, ei = Kq, li = function(l, t) {
  var o = l.theme, n = o.spacing, r = o.colors;
  return x1({
    label: "placeholder",
    gridArea: "1 / 1 / 2 / 3"
  }, t ? {} : {
    color: r.neutral50,
    marginLeft: n.baseUnit / 2,
    marginRight: n.baseUnit / 2
  });
}, ti = function(l) {
  var t = l.children, o = l.innerProps;
  return d1("div", h1({}, B1(l, "placeholder", {
    placeholder: !0
  }), o), t);
}, ni = ti, oi = function(l, t) {
  var o = l.isDisabled, n = l.theme, r = n.spacing, q = n.colors;
  return x1({
    label: "singleValue",
    gridArea: "1 / 1 / 2 / 3",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }, t ? {} : {
    color: o ? q.neutral40 : q.neutral80,
    marginLeft: r.baseUnit / 2,
    marginRight: r.baseUnit / 2
  });
}, ri = function(l) {
  var t = l.children, o = l.isDisabled, n = l.innerProps;
  return d1("div", h1({}, B1(l, "singleValue", {
    "single-value": !0,
    "single-value--is-disabled": o
  }), n), t);
}, qi = ri, ii = {
  ClearIndicator: Iq,
  Control: Tq,
  DropdownIndicator: vq,
  DownChevron: p7,
  CrossIcon: $6,
  Group: Fq,
  GroupHeading: Pq,
  IndicatorsContainer: xq,
  IndicatorSeparator: Eq,
  Input: Wq,
  LoadingIndicator: Rq,
  Menu: lq,
  MenuList: nq,
  MenuPortal: sq,
  LoadingMessage: iq,
  NoOptionsMessage: qq,
  MultiValue: $q,
  MultiValueContainer: Zq,
  MultiValueLabel: Yq,
  MultiValueRemove: Jq,
  Option: ei,
  Placeholder: ni,
  SelectContainer: uq,
  SingleValue: qi,
  ValueContainer: dq
}, ai = function(l) {
  return x1(x1({}, ii), l.components);
}, u9 = Number.isNaN || function(l) {
  return typeof l == "number" && l !== l;
};
function si(e, l) {
  return !!(e === l || u9(e) && u9(l));
}
function ci(e, l) {
  if (e.length !== l.length)
    return !1;
  for (var t = 0; t < e.length; t++)
    if (!si(e[t], l[t]))
      return !1;
  return !0;
}
function ui(e, l) {
  l === void 0 && (l = ci);
  var t = null;
  function o() {
    for (var n = [], r = 0; r < arguments.length; r++)
      n[r] = arguments[r];
    if (t && t.lastThis === this && l(n, t.lastArgs))
      return t.lastResult;
    var q = e.apply(this, n);
    return t = {
      lastResult: q,
      lastArgs: n,
      lastThis: this
    }, q;
  }
  return o.clear = function() {
    t = null;
  }, o;
}
function mi() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var di = process.env.NODE_ENV === "production" ? {
  name: "7pg0cj-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap"
} : {
  name: "1f43avz-a11yText-A11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IEpTWCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
  toString: mi
}, fi = function(l) {
  return d1("span", h1({
    css: di
  }, l));
}, m9 = fi, xi = {
  guidance: function(l) {
    var t = l.isSearchable, o = l.isMulti, n = l.tabSelectsValue, r = l.context, q = l.isInitialFocus;
    switch (r) {
      case "menu":
        return "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu".concat(n ? ", press Tab to select the option and exit the menu" : "", ".");
      case "input":
        return q ? "".concat(l["aria-label"] || "Select", " is focused ").concat(t ? ",type to refine list" : "", ", press Down to open the menu, ").concat(o ? " press left to focus selected values" : "") : "";
      case "value":
        return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
      default:
        return "";
    }
  },
  onChange: function(l) {
    var t = l.action, o = l.label, n = o === void 0 ? "" : o, r = l.labels, q = l.isDisabled;
    switch (t) {
      case "deselect-option":
      case "pop-value":
      case "remove-value":
        return "option ".concat(n, ", deselected.");
      case "clear":
        return "All selected options have been cleared.";
      case "initial-input-focus":
        return "option".concat(r.length > 1 ? "s" : "", " ").concat(r.join(","), ", selected.");
      case "select-option":
        return q ? "option ".concat(n, " is disabled. Select another option.") : "option ".concat(n, ", selected.");
      default:
        return "";
    }
  },
  onFocus: function(l) {
    var t = l.context, o = l.focused, n = l.options, r = l.label, q = r === void 0 ? "" : r, c = l.selectValue, i = l.isDisabled, a = l.isSelected, s = l.isAppleDevice, m = function(p, d) {
      return p && p.length ? "".concat(p.indexOf(d) + 1, " of ").concat(p.length) : "";
    };
    if (t === "value" && c)
      return "value ".concat(q, " focused, ").concat(m(c, o), ".");
    if (t === "menu" && s) {
      var v = i ? " disabled" : "", A = "".concat(a ? " selected" : "").concat(v);
      return "".concat(q).concat(A, ", ").concat(m(n, o), ".");
    }
    return "";
  },
  onFilter: function(l) {
    var t = l.inputValue, o = l.resultsMessage;
    return "".concat(o).concat(t ? " for search term " + t : "", ".");
  }
}, hi = function(l) {
  var t = l.ariaSelection, o = l.focusedOption, n = l.focusedValue, r = l.focusableOptions, q = l.isFocused, c = l.selectValue, i = l.selectProps, a = l.id, s = l.isAppleDevice, m = i.ariaLiveMessages, v = i.getOptionLabel, A = i.inputValue, x = i.isMulti, p = i.isOptionDisabled, d = i.isSearchable, _ = i.menuIsOpen, S = i.options, g = i.screenReaderStatus, u = i.tabSelectsValue, f = i.isLoading, E = i["aria-label"], C = i["aria-live"], w = W1(function() {
    return x1(x1({}, xi), m || {});
  }, [m]), F = W1(function() {
    var Q = "";
    if (t && w.onChange) {
      var Z = t.option, J = t.options, P = t.removedValue, q1 = t.removedValues, B = t.value, M = function(R) {
        return Array.isArray(R) ? null : R;
      }, W = P || Z || M(B), H = W ? v(W) : "", z = J || q1 || void 0, I = z ? z.map(v) : [], b = x1({
        // multiSelected items are usually items that have already been selected
        // or set by the user as a default value so we assume they are not disabled
        isDisabled: W && p(W, c),
        label: H,
        labels: I
      }, t);
      Q = w.onChange(b);
    }
    return Q;
  }, [t, w, p, c, v]), D = W1(function() {
    var Q = "", Z = o || n, J = !!(o && c && c.includes(o));
    if (Z && w.onFocus) {
      var P = {
        focused: Z,
        label: v(Z),
        isDisabled: p(Z, c),
        isSelected: J,
        options: r,
        context: Z === o ? "menu" : "value",
        selectValue: c,
        isAppleDevice: s
      };
      Q = w.onFocus(P);
    }
    return Q;
  }, [o, n, v, p, w, r, c, s]), e1 = W1(function() {
    var Q = "";
    if (_ && S.length && !f && w.onFilter) {
      var Z = g({
        count: r.length
      });
      Q = w.onFilter({
        inputValue: A,
        resultsMessage: Z
      });
    }
    return Q;
  }, [r, A, _, w, S, g, f]), j = (t == null ? void 0 : t.action) === "initial-input-focus", l1 = W1(function() {
    var Q = "";
    if (w.guidance) {
      var Z = n ? "value" : _ ? "menu" : "input";
      Q = w.guidance({
        "aria-label": E,
        context: Z,
        isDisabled: o && p(o, c),
        isMulti: x,
        isSearchable: d,
        tabSelectsValue: u,
        isInitialFocus: j
      });
    }
    return Q;
  }, [E, o, n, x, p, d, _, w, c, u, j]), $ = d1(X3, null, d1("span", {
    id: "aria-selection"
  }, F), d1("span", {
    id: "aria-focused"
  }, D), d1("span", {
    id: "aria-results"
  }, e1), d1("span", {
    id: "aria-guidance"
  }, l1));
  return d1(X3, null, d1(m9, {
    id: a
  }, j && $), d1(m9, {
    "aria-live": C,
    "aria-atomic": "false",
    "aria-relevant": "additions text",
    role: "log"
  }, q && !j && $));
}, pi = hi, u6 = [{
  base: "A",
  letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
}, {
  base: "AA",
  letters: "Ꜳ"
}, {
  base: "AE",
  letters: "ÆǼǢ"
}, {
  base: "AO",
  letters: "Ꜵ"
}, {
  base: "AU",
  letters: "Ꜷ"
}, {
  base: "AV",
  letters: "ꜸꜺ"
}, {
  base: "AY",
  letters: "Ꜽ"
}, {
  base: "B",
  letters: "BⒷＢḂḄḆɃƂƁ"
}, {
  base: "C",
  letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
}, {
  base: "D",
  letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
}, {
  base: "DZ",
  letters: "ǱǄ"
}, {
  base: "Dz",
  letters: "ǲǅ"
}, {
  base: "E",
  letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
}, {
  base: "F",
  letters: "FⒻＦḞƑꝻ"
}, {
  base: "G",
  letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
}, {
  base: "H",
  letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
}, {
  base: "I",
  letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
}, {
  base: "J",
  letters: "JⒿＪĴɈ"
}, {
  base: "K",
  letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
}, {
  base: "L",
  letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
}, {
  base: "LJ",
  letters: "Ǉ"
}, {
  base: "Lj",
  letters: "ǈ"
}, {
  base: "M",
  letters: "MⓂＭḾṀṂⱮƜ"
}, {
  base: "N",
  letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
}, {
  base: "NJ",
  letters: "Ǌ"
}, {
  base: "Nj",
  letters: "ǋ"
}, {
  base: "O",
  letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
}, {
  base: "OI",
  letters: "Ƣ"
}, {
  base: "OO",
  letters: "Ꝏ"
}, {
  base: "OU",
  letters: "Ȣ"
}, {
  base: "P",
  letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
}, {
  base: "Q",
  letters: "QⓆＱꝖꝘɊ"
}, {
  base: "R",
  letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
}, {
  base: "S",
  letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
}, {
  base: "T",
  letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
}, {
  base: "TZ",
  letters: "Ꜩ"
}, {
  base: "U",
  letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
}, {
  base: "V",
  letters: "VⓋＶṼṾƲꝞɅ"
}, {
  base: "VY",
  letters: "Ꝡ"
}, {
  base: "W",
  letters: "WⓌＷẀẂŴẆẄẈⱲ"
}, {
  base: "X",
  letters: "XⓍＸẊẌ"
}, {
  base: "Y",
  letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
}, {
  base: "Z",
  letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
}, {
  base: "a",
  letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
}, {
  base: "aa",
  letters: "ꜳ"
}, {
  base: "ae",
  letters: "æǽǣ"
}, {
  base: "ao",
  letters: "ꜵ"
}, {
  base: "au",
  letters: "ꜷ"
}, {
  base: "av",
  letters: "ꜹꜻ"
}, {
  base: "ay",
  letters: "ꜽ"
}, {
  base: "b",
  letters: "bⓑｂḃḅḇƀƃɓ"
}, {
  base: "c",
  letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
}, {
  base: "d",
  letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
}, {
  base: "dz",
  letters: "ǳǆ"
}, {
  base: "e",
  letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
}, {
  base: "f",
  letters: "fⓕｆḟƒꝼ"
}, {
  base: "g",
  letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
}, {
  base: "h",
  letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
}, {
  base: "hv",
  letters: "ƕ"
}, {
  base: "i",
  letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
}, {
  base: "j",
  letters: "jⓙｊĵǰɉ"
}, {
  base: "k",
  letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
}, {
  base: "l",
  letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
}, {
  base: "lj",
  letters: "ǉ"
}, {
  base: "m",
  letters: "mⓜｍḿṁṃɱɯ"
}, {
  base: "n",
  letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
}, {
  base: "nj",
  letters: "ǌ"
}, {
  base: "o",
  letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
}, {
  base: "oi",
  letters: "ƣ"
}, {
  base: "ou",
  letters: "ȣ"
}, {
  base: "oo",
  letters: "ꝏ"
}, {
  base: "p",
  letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
}, {
  base: "q",
  letters: "qⓠｑɋꝗꝙ"
}, {
  base: "r",
  letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
}, {
  base: "s",
  letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
}, {
  base: "t",
  letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
}, {
  base: "tz",
  letters: "ꜩ"
}, {
  base: "u",
  letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
}, {
  base: "v",
  letters: "vⓥｖṽṿʋꝟʌ"
}, {
  base: "vy",
  letters: "ꝡ"
}, {
  base: "w",
  letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
}, {
  base: "x",
  letters: "xⓧｘẋẍ"
}, {
  base: "y",
  letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
}, {
  base: "z",
  letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
}], gi = new RegExp("[" + u6.map(function(e) {
  return e.letters;
}).join("") + "]", "g"), v7 = {};
for (var k3 = 0; k3 < u6.length; k3++)
  for (var D3 = u6[k3], V3 = 0; V3 < D3.letters.length; V3++)
    v7[D3.letters[V3]] = D3.base;
var y7 = function(l) {
  return l.replace(gi, function(t) {
    return v7[t];
  });
}, bi = ui(y7), d9 = function(l) {
  return l.replace(/^\s+|\s+$/g, "");
}, _i = function(l) {
  return "".concat(l.label, " ").concat(l.value);
}, vi = function(l) {
  return function(t, o) {
    if (t.data.__isNew__) return !0;
    var n = x1({
      ignoreCase: !0,
      ignoreAccents: !0,
      stringify: _i,
      trim: !0,
      matchFrom: "any"
    }, l), r = n.ignoreCase, q = n.ignoreAccents, c = n.stringify, i = n.trim, a = n.matchFrom, s = i ? d9(o) : o, m = i ? d9(c(t)) : c(t);
    return r && (s = s.toLowerCase(), m = m.toLowerCase()), q && (s = bi(s), m = y7(m)), a === "start" ? m.substr(0, s.length) === s : m.indexOf(s) > -1;
  };
}, yi = ["innerRef"];
function Ii(e) {
  var l = e.innerRef, t = b4(e, yi), o = Zr(t, "onExited", "in", "enter", "exit", "appear");
  return d1("input", h1({
    ref: l
  }, o, {
    css: /* @__PURE__ */ Z6({
      label: "dummyInput",
      // get rid of any default styles
      background: 0,
      border: 0,
      // important! this hides the flashing cursor
      caretColor: "transparent",
      fontSize: "inherit",
      gridArea: "1 / 1 / 2 / 3",
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: "transparent",
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: "relative",
      transform: "scale(.01)"
    }, process.env.NODE_ENV === "production" ? "" : ";label:DummyInput;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyByZW1vdmVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHVtbXlJbnB1dCh7XG4gIGlubmVyUmVmLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydpbnB1dCddICYge1xuICByZWFkb25seSBpbm5lclJlZjogUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xufSkge1xuICAvLyBSZW1vdmUgYW5pbWF0aW9uIHByb3BzIG5vdCBtZWFudCBmb3IgSFRNTCBlbGVtZW50c1xuICBjb25zdCBmaWx0ZXJlZFByb3BzID0gcmVtb3ZlUHJvcHMoXG4gICAgcHJvcHMsXG4gICAgJ29uRXhpdGVkJyxcbiAgICAnaW4nLFxuICAgICdlbnRlcicsXG4gICAgJ2V4aXQnLFxuICAgICdhcHBlYXInXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8aW5wdXRcbiAgICAgIHJlZj17aW5uZXJSZWZ9XG4gICAgICB7Li4uZmlsdGVyZWRQcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBsYWJlbDogJ2R1bW15SW5wdXQnLFxuICAgICAgICAvLyBnZXQgcmlkIG9mIGFueSBkZWZhdWx0IHN0eWxlc1xuICAgICAgICBiYWNrZ3JvdW5kOiAwLFxuICAgICAgICBib3JkZXI6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgdGhpcyBoaWRlcyB0aGUgZmxhc2hpbmcgY3Vyc29yXG4gICAgICAgIGNhcmV0Q29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgICAgIGdyaWRBcmVhOiAnMSAvIDEgLyAyIC8gMycsXG4gICAgICAgIG91dGxpbmU6IDAsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgd2l0aG91dCBgd2lkdGhgIGJyb3dzZXJzIHdvbid0IGFsbG93IGZvY3VzXG4gICAgICAgIHdpZHRoOiAxLFxuXG4gICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gZGVza3RvcFxuICAgICAgICBjb2xvcjogJ3RyYW5zcGFyZW50JyxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIG1vYmlsZSB3aGlsc3QgbWFpbnRhaW5pbmcgXCJzY3JvbGwgaW50byB2aWV3XCIgYmVoYXZpb3VyXG4gICAgICAgIGxlZnQ6IC0xMDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSguMDEpJyxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cbiJdfQ== */")
  }));
}
var Ci = function(l) {
  l.cancelable && l.preventDefault(), l.stopPropagation();
};
function Ei(e) {
  var l = e.isEnabled, t = e.onBottomArrive, o = e.onBottomLeave, n = e.onTopArrive, r = e.onTopLeave, q = v1(!1), c = v1(!1), i = v1(0), a = v1(null), s = r1(function(d, _) {
    if (a.current !== null) {
      var S = a.current, g = S.scrollTop, u = S.scrollHeight, f = S.clientHeight, E = a.current, C = _ > 0, w = u - f - g, F = !1;
      w > _ && q.current && (o && o(d), q.current = !1), C && c.current && (r && r(d), c.current = !1), C && _ > w ? (t && !q.current && t(d), E.scrollTop = u, F = !0, q.current = !0) : !C && -_ > g && (n && !c.current && n(d), E.scrollTop = 0, F = !0, c.current = !0), F && Ci(d);
    }
  }, [t, o, n, r]), m = r1(function(d) {
    s(d, d.deltaY);
  }, [s]), v = r1(function(d) {
    i.current = d.changedTouches[0].clientY;
  }, []), A = r1(function(d) {
    var _ = i.current - d.changedTouches[0].clientY;
    s(d, _);
  }, [s]), x = r1(function(d) {
    if (d) {
      var _ = jr ? {
        passive: !1
      } : !1;
      d.addEventListener("wheel", m, _), d.addEventListener("touchstart", v, _), d.addEventListener("touchmove", A, _);
    }
  }, [A, v, m]), p = r1(function(d) {
    d && (d.removeEventListener("wheel", m, !1), d.removeEventListener("touchstart", v, !1), d.removeEventListener("touchmove", A, !1));
  }, [A, v, m]);
  return p1(function() {
    if (l) {
      var d = a.current;
      return x(d), function() {
        p(d);
      };
    }
  }, [l, x, p]), function(d) {
    a.current = d;
  };
}
var f9 = ["boxSizing", "height", "overflow", "paddingRight", "position"], x9 = {
  boxSizing: "border-box",
  // account for possible declaration `width: 100%;` on body
  overflow: "hidden",
  position: "relative",
  height: "100%"
};
function h9(e) {
  e.cancelable && e.preventDefault();
}
function p9(e) {
  e.stopPropagation();
}
function g9() {
  var e = this.scrollTop, l = this.scrollHeight, t = e + this.offsetHeight;
  e === 0 ? this.scrollTop = 1 : t === l && (this.scrollTop = e - 1);
}
function b9() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}
var _9 = !!(typeof window < "u" && window.document && window.document.createElement), o2 = 0, j4 = {
  capture: !1,
  passive: !1
};
function Ai(e) {
  var l = e.isEnabled, t = e.accountForScrollbars, o = t === void 0 ? !0 : t, n = v1({}), r = v1(null), q = r1(function(i) {
    if (_9) {
      var a = document.body, s = a && a.style;
      if (o && f9.forEach(function(x) {
        var p = s && s[x];
        n.current[x] = p;
      }), o && o2 < 1) {
        var m = parseInt(n.current.paddingRight, 10) || 0, v = document.body ? document.body.clientWidth : 0, A = window.innerWidth - v + m || 0;
        Object.keys(x9).forEach(function(x) {
          var p = x9[x];
          s && (s[x] = p);
        }), s && (s.paddingRight = "".concat(A, "px"));
      }
      a && b9() && (a.addEventListener("touchmove", h9, j4), i && (i.addEventListener("touchstart", g9, j4), i.addEventListener("touchmove", p9, j4))), o2 += 1;
    }
  }, [o]), c = r1(function(i) {
    if (_9) {
      var a = document.body, s = a && a.style;
      o2 = Math.max(o2 - 1, 0), o && o2 < 1 && f9.forEach(function(m) {
        var v = n.current[m];
        s && (s[m] = v);
      }), a && b9() && (a.removeEventListener("touchmove", h9, j4), i && (i.removeEventListener("touchstart", g9, j4), i.removeEventListener("touchmove", p9, j4)));
    }
  }, [o]);
  return p1(function() {
    if (l) {
      var i = r.current;
      return q(i), function() {
        c(i);
      };
    }
  }, [l, q, c]), function(i) {
    r.current = i;
  };
}
function Si() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var Ri = function(l) {
  var t = l.target;
  return t.ownerDocument.activeElement && t.ownerDocument.activeElement.blur();
}, zi = process.env.NODE_ENV === "production" ? {
  name: "1kfdb0e",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0"
} : {
  name: "bp8cua-ScrollManager",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9EVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2ssIE1vdXNlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9IChldmVudDogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgcmV0dXJuIChcbiAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgIChlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYmx1cigpXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY3JvbGxNYW5hZ2VyKHtcbiAgY2hpbGRyZW4sXG4gIGxvY2tFbmFibGVkLFxuICBjYXB0dXJlRW5hYmxlZCA9IHRydWUsXG4gIG9uQm90dG9tQXJyaXZlLFxuICBvbkJvdHRvbUxlYXZlLFxuICBvblRvcEFycml2ZSxcbiAgb25Ub3BMZWF2ZSxcbn06IFByb3BzKSB7XG4gIGNvbnN0IHNldFNjcm9sbENhcHR1cmVUYXJnZXQgPSB1c2VTY3JvbGxDYXB0dXJlKHtcbiAgICBpc0VuYWJsZWQ6IGNhcHR1cmVFbmFibGVkLFxuICAgIG9uQm90dG9tQXJyaXZlLFxuICAgIG9uQm90dG9tTGVhdmUsXG4gICAgb25Ub3BBcnJpdmUsXG4gICAgb25Ub3BMZWF2ZSxcbiAgfSk7XG4gIGNvbnN0IHNldFNjcm9sbExvY2tUYXJnZXQgPSB1c2VTY3JvbGxMb2NrKHsgaXNFbmFibGVkOiBsb2NrRW5hYmxlZCB9KTtcblxuICBjb25zdCB0YXJnZXRSZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PiA9IChlbGVtZW50KSA9PiB7XG4gICAgc2V0U2Nyb2xsQ2FwdHVyZVRhcmdldChlbGVtZW50KTtcbiAgICBzZXRTY3JvbGxMb2NrVGFyZ2V0KGVsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAge2xvY2tFbmFibGVkICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9e2JsdXJTZWxlY3RJbnB1dH1cbiAgICAgICAgICBjc3M9e3sgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQ6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtjaGlsZHJlbih0YXJnZXRSZWYpfVxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iXX0= */",
  toString: Si
};
function Oi(e) {
  var l = e.children, t = e.lockEnabled, o = e.captureEnabled, n = o === void 0 ? !0 : o, r = e.onBottomArrive, q = e.onBottomLeave, c = e.onTopArrive, i = e.onTopLeave, a = Ei({
    isEnabled: n,
    onBottomArrive: r,
    onBottomLeave: q,
    onTopArrive: c,
    onTopLeave: i
  }), s = Ai({
    isEnabled: t
  }), m = function(A) {
    a(A), s(A);
  };
  return d1(X3, null, t && d1("div", {
    onClick: Ri,
    css: zi
  }), l(m));
}
function Ti() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var wi = process.env.NODE_ENV === "production" ? {
  name: "1a0ro4n-requiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%"
} : {
  name: "5kkxb2-requiredInput-RequiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%;label:RequiredInput;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVpcmVkSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNJIiwiZmlsZSI6IlJlcXVpcmVkSW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBGb2N1c0V2ZW50SGFuZGxlciwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IFJlcXVpcmVkSW5wdXQ6IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgcmVhZG9ubHkgbmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb25Gb2N1czogRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59PiA9ICh7IG5hbWUsIG9uRm9jdXMgfSkgPT4gKFxuICA8aW5wdXRcbiAgICByZXF1aXJlZFxuICAgIG5hbWU9e25hbWV9XG4gICAgdGFiSW5kZXg9ey0xfVxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAncmVxdWlyZWRJbnB1dCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH19XG4gICAgLy8gUHJldmVudCBgU3dpdGNoaW5nIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWRgIGVycm9yXG4gICAgdmFsdWU9XCJcIlxuICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVkSW5wdXQ7XG4iXX0= */",
  toString: Ti
}, Ni = function(l) {
  var t = l.name, o = l.onFocus;
  return d1("input", {
    required: !0,
    name: t,
    tabIndex: -1,
    "aria-hidden": "true",
    onFocus: o,
    css: wi,
    value: "",
    onChange: function() {
    }
  });
}, Mi = Ni;
function Q6(e) {
  var l;
  return typeof window < "u" && window.navigator != null ? e.test(((l = window.navigator.userAgentData) === null || l === void 0 ? void 0 : l.platform) || window.navigator.platform) : !1;
}
function Li() {
  return Q6(/^iPhone/i);
}
function I7() {
  return Q6(/^Mac/i);
}
function Pi() {
  return Q6(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  I7() && navigator.maxTouchPoints > 1;
}
function Fi() {
  return Li() || Pi();
}
function Bi() {
  return I7() || Fi();
}
var Gi = function(l) {
  return l.label;
}, ki = function(l) {
  return l.label;
}, Di = function(l) {
  return l.value;
}, Vi = function(l) {
  return !!l.isDisabled;
}, Wi = {
  clearIndicator: yq,
  container: cq,
  control: zq,
  dropdownIndicator: _q,
  group: Nq,
  groupHeading: Lq,
  indicatorsContainer: fq,
  indicatorSeparator: Cq,
  input: Gq,
  loadingIndicator: Sq,
  loadingMessage: rq,
  menu: Qr,
  menuList: tq,
  menuPortal: aq,
  multiValue: jq,
  multiValueLabel: Xq,
  multiValueRemove: Hq,
  noOptionsMessage: oq,
  option: Qq,
  placeholder: li,
  singleValue: oi,
  valueContainer: mq
}, ji = {
  primary: "#2684FF",
  primary75: "#4C9AFF",
  primary50: "#B2D4FF",
  primary25: "#DEEBFF",
  danger: "#DE350B",
  dangerLight: "#FFBDAD",
  neutral0: "hsl(0, 0%, 100%)",
  neutral5: "hsl(0, 0%, 95%)",
  neutral10: "hsl(0, 0%, 90%)",
  neutral20: "hsl(0, 0%, 80%)",
  neutral30: "hsl(0, 0%, 70%)",
  neutral40: "hsl(0, 0%, 60%)",
  neutral50: "hsl(0, 0%, 50%)",
  neutral60: "hsl(0, 0%, 40%)",
  neutral70: "hsl(0, 0%, 30%)",
  neutral80: "hsl(0, 0%, 20%)",
  neutral90: "hsl(0, 0%, 10%)"
}, Xi = 4, C7 = 4, Hi = 38, Zi = C7 * 2, Yi = {
  baseUnit: C7,
  controlHeight: Hi,
  menuGutter: Zi
}, W3 = {
  borderRadius: Xi,
  colors: ji,
  spacing: Yi
}, Ji = {
  "aria-live": "polite",
  backspaceRemovesValue: !0,
  blurInputOnSelect: s9(),
  captureMenuScroll: !s9(),
  classNames: {},
  closeMenuOnSelect: !0,
  closeMenuOnScroll: !1,
  components: {},
  controlShouldRenderValue: !0,
  escapeClearsValue: !1,
  filterOption: vi(),
  formatGroupLabel: Gi,
  getOptionLabel: ki,
  getOptionValue: Di,
  isDisabled: !1,
  isLoading: !1,
  isMulti: !1,
  isRtl: !1,
  isSearchable: !0,
  isOptionDisabled: Vi,
  loadingMessage: function() {
    return "Loading...";
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: !1,
  menuPlacement: "bottom",
  menuPosition: "absolute",
  menuShouldBlockScroll: !1,
  menuShouldScrollIntoView: !Vr(),
  noOptionsMessage: function() {
    return "No options";
  },
  openMenuOnFocus: !1,
  openMenuOnClick: !0,
  options: [],
  pageSize: 5,
  placeholder: "Select...",
  screenReaderStatus: function(l) {
    var t = l.count;
    return "".concat(t, " result").concat(t !== 1 ? "s" : "", " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: !0,
  unstyled: !1
};
function v9(e, l, t, o) {
  var n = S7(e, l, t), r = R7(e, l, t), q = A7(e, l), c = e3(e, l);
  return {
    type: "option",
    data: l,
    isDisabled: n,
    isSelected: r,
    label: q,
    value: c,
    index: o
  };
}
function B2(e, l) {
  return e.options.map(function(t, o) {
    if ("options" in t) {
      var n = t.options.map(function(q, c) {
        return v9(e, q, l, c);
      }).filter(function(q) {
        return I9(e, q);
      });
      return n.length > 0 ? {
        type: "group",
        data: t,
        options: n,
        index: o
      } : void 0;
    }
    var r = v9(e, t, l, o);
    return I9(e, r) ? r : void 0;
  }).filter(Xr);
}
function E7(e) {
  return e.reduce(function(l, t) {
    return t.type === "group" ? l.push.apply(l, V6(t.options.map(function(o) {
      return o.data;
    }))) : l.push(t.data), l;
  }, []);
}
function y9(e, l) {
  return e.reduce(function(t, o) {
    return o.type === "group" ? t.push.apply(t, V6(o.options.map(function(n) {
      return {
        data: n.data,
        id: "".concat(l, "-").concat(o.index, "-").concat(n.index)
      };
    }))) : t.push({
      data: o.data,
      id: "".concat(l, "-").concat(o.index)
    }), t;
  }, []);
}
function Ui(e, l) {
  return E7(B2(e, l));
}
function I9(e, l) {
  var t = e.inputValue, o = t === void 0 ? "" : t, n = l.data, r = l.isSelected, q = l.label, c = l.value;
  return (!O7(e) || !r) && z7(e, {
    label: q,
    value: c,
    data: n
  }, o);
}
function $i(e, l) {
  var t = e.focusedValue, o = e.selectValue, n = o.indexOf(t);
  if (n > -1) {
    var r = l.indexOf(t);
    if (r > -1)
      return t;
    if (n < l.length)
      return l[n];
  }
  return null;
}
function Qi(e, l) {
  var t = e.focusedOption;
  return t && l.indexOf(t) > -1 ? t : l[0];
}
var j3 = function(l, t) {
  var o, n = (o = l.find(function(r) {
    return r.data === t;
  })) === null || o === void 0 ? void 0 : o.id;
  return n || null;
}, A7 = function(l, t) {
  return l.getOptionLabel(t);
}, e3 = function(l, t) {
  return l.getOptionValue(t);
};
function S7(e, l, t) {
  return typeof e.isOptionDisabled == "function" ? e.isOptionDisabled(l, t) : !1;
}
function R7(e, l, t) {
  if (t.indexOf(l) > -1) return !0;
  if (typeof e.isOptionSelected == "function")
    return e.isOptionSelected(l, t);
  var o = e3(e, l);
  return t.some(function(n) {
    return e3(e, n) === o;
  });
}
function z7(e, l, t) {
  return e.filterOption ? e.filterOption(l, t) : !0;
}
var O7 = function(l) {
  var t = l.hideSelectedOptions, o = l.isMulti;
  return t === void 0 ? o : t;
}, Ki = 1, T7 = /* @__PURE__ */ function(e) {
  mo(t, e);
  var l = ho(t);
  function t(o) {
    var n;
    if (co(this, t), n = l.call(this, o), n.state = {
      ariaSelection: null,
      focusedOption: null,
      focusedOptionId: null,
      focusableOptionsWithIds: [],
      focusedValue: null,
      inputIsHidden: !1,
      isFocused: !1,
      selectValue: [],
      clearFocusValueOnUpdate: !1,
      prevWasFocused: !1,
      inputIsHiddenAfterUpdate: void 0,
      prevProps: void 0,
      instancePrefix: "",
      isAppleDevice: !1
    }, n.blockOptionHover = !1, n.isComposing = !1, n.commonProps = void 0, n.initialTouchX = 0, n.initialTouchY = 0, n.openAfterFocus = !1, n.scrollToFocusedOptionOnUpdate = !1, n.userIsDragging = void 0, n.controlRef = null, n.getControlRef = function(i) {
      n.controlRef = i;
    }, n.focusedOptionRef = null, n.getFocusedOptionRef = function(i) {
      n.focusedOptionRef = i;
    }, n.menuListRef = null, n.getMenuListRef = function(i) {
      n.menuListRef = i;
    }, n.inputRef = null, n.getInputRef = function(i) {
      n.inputRef = i;
    }, n.focus = n.focusInput, n.blur = n.blurInput, n.onChange = function(i, a) {
      var s = n.props, m = s.onChange, v = s.name;
      a.name = v, n.ariaOnChange(i, a), m(i, a);
    }, n.setValue = function(i, a, s) {
      var m = n.props, v = m.closeMenuOnSelect, A = m.isMulti, x = m.inputValue;
      n.onInputChange("", {
        action: "set-value",
        prevInputValue: x
      }), v && (n.setState({
        inputIsHiddenAfterUpdate: !A
      }), n.onMenuClose()), n.setState({
        clearFocusValueOnUpdate: !0
      }), n.onChange(i, {
        action: a,
        option: s
      });
    }, n.selectOption = function(i) {
      var a = n.props, s = a.blurInputOnSelect, m = a.isMulti, v = a.name, A = n.state.selectValue, x = m && n.isOptionSelected(i, A), p = n.isOptionDisabled(i, A);
      if (x) {
        var d = n.getOptionValue(i);
        n.setValue(A.filter(function(_) {
          return n.getOptionValue(_) !== d;
        }), "deselect-option", i);
      } else if (!p)
        m ? n.setValue([].concat(V6(A), [i]), "select-option", i) : n.setValue(i, "select-option");
      else {
        n.ariaOnChange(i, {
          action: "select-option",
          option: i,
          name: v
        });
        return;
      }
      s && n.blurInput();
    }, n.removeValue = function(i) {
      var a = n.props.isMulti, s = n.state.selectValue, m = n.getOptionValue(i), v = s.filter(function(x) {
        return n.getOptionValue(x) !== m;
      }), A = z2(a, v, v[0] || null);
      n.onChange(A, {
        action: "remove-value",
        removedValue: i
      }), n.focusInput();
    }, n.clearValue = function() {
      var i = n.state.selectValue;
      n.onChange(z2(n.props.isMulti, [], null), {
        action: "clear",
        removedValues: i
      });
    }, n.popValue = function() {
      var i = n.props.isMulti, a = n.state.selectValue, s = a[a.length - 1], m = a.slice(0, a.length - 1), v = z2(i, m, m[0] || null);
      s && n.onChange(v, {
        action: "pop-value",
        removedValue: s
      });
    }, n.getFocusedOptionId = function(i) {
      return j3(n.state.focusableOptionsWithIds, i);
    }, n.getFocusableOptionsWithIds = function() {
      return y9(B2(n.props, n.state.selectValue), n.getElementId("option"));
    }, n.getValue = function() {
      return n.state.selectValue;
    }, n.cx = function() {
      for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++)
        a[s] = arguments[s];
      return Fr.apply(void 0, [n.props.classNamePrefix].concat(a));
    }, n.getOptionLabel = function(i) {
      return A7(n.props, i);
    }, n.getOptionValue = function(i) {
      return e3(n.props, i);
    }, n.getStyles = function(i, a) {
      var s = n.props.unstyled, m = Wi[i](a, s);
      m.boxSizing = "border-box";
      var v = n.props.styles[i];
      return v ? v(m, a) : m;
    }, n.getClassNames = function(i, a) {
      var s, m;
      return (s = (m = n.props.classNames)[i]) === null || s === void 0 ? void 0 : s.call(m, a);
    }, n.getElementId = function(i) {
      return "".concat(n.state.instancePrefix, "-").concat(i);
    }, n.getComponents = function() {
      return ai(n.props);
    }, n.buildCategorizedOptions = function() {
      return B2(n.props, n.state.selectValue);
    }, n.getCategorizedOptions = function() {
      return n.props.menuIsOpen ? n.buildCategorizedOptions() : [];
    }, n.buildFocusableOptions = function() {
      return E7(n.buildCategorizedOptions());
    }, n.getFocusableOptions = function() {
      return n.props.menuIsOpen ? n.buildFocusableOptions() : [];
    }, n.ariaOnChange = function(i, a) {
      n.setState({
        ariaSelection: x1({
          value: i
        }, a)
      });
    }, n.onMenuMouseDown = function(i) {
      i.button === 0 && (i.stopPropagation(), i.preventDefault(), n.focusInput());
    }, n.onMenuMouseMove = function(i) {
      n.blockOptionHover = !1;
    }, n.onControlMouseDown = function(i) {
      if (!i.defaultPrevented) {
        var a = n.props.openMenuOnClick;
        n.state.isFocused ? n.props.menuIsOpen ? i.target.tagName !== "INPUT" && i.target.tagName !== "TEXTAREA" && n.onMenuClose() : a && n.openMenu("first") : (a && (n.openAfterFocus = !0), n.focusInput()), i.target.tagName !== "INPUT" && i.target.tagName !== "TEXTAREA" && i.preventDefault();
      }
    }, n.onDropdownIndicatorMouseDown = function(i) {
      if (!(i && i.type === "mousedown" && i.button !== 0) && !n.props.isDisabled) {
        var a = n.props, s = a.isMulti, m = a.menuIsOpen;
        n.focusInput(), m ? (n.setState({
          inputIsHiddenAfterUpdate: !s
        }), n.onMenuClose()) : n.openMenu("first"), i.preventDefault();
      }
    }, n.onClearIndicatorMouseDown = function(i) {
      i && i.type === "mousedown" && i.button !== 0 || (n.clearValue(), i.preventDefault(), n.openAfterFocus = !1, i.type === "touchend" ? n.focusInput() : setTimeout(function() {
        return n.focusInput();
      }));
    }, n.onScroll = function(i) {
      typeof n.props.closeMenuOnScroll == "boolean" ? i.target instanceof HTMLElement && x3(i.target) && n.props.onMenuClose() : typeof n.props.closeMenuOnScroll == "function" && n.props.closeMenuOnScroll(i) && n.props.onMenuClose();
    }, n.onCompositionStart = function() {
      n.isComposing = !0;
    }, n.onCompositionEnd = function() {
      n.isComposing = !1;
    }, n.onTouchStart = function(i) {
      var a = i.touches, s = a && a.item(0);
      s && (n.initialTouchX = s.clientX, n.initialTouchY = s.clientY, n.userIsDragging = !1);
    }, n.onTouchMove = function(i) {
      var a = i.touches, s = a && a.item(0);
      if (s) {
        var m = Math.abs(s.clientX - n.initialTouchX), v = Math.abs(s.clientY - n.initialTouchY), A = 5;
        n.userIsDragging = m > A || v > A;
      }
    }, n.onTouchEnd = function(i) {
      n.userIsDragging || (n.controlRef && !n.controlRef.contains(i.target) && n.menuListRef && !n.menuListRef.contains(i.target) && n.blurInput(), n.initialTouchX = 0, n.initialTouchY = 0);
    }, n.onControlTouchEnd = function(i) {
      n.userIsDragging || n.onControlMouseDown(i);
    }, n.onClearIndicatorTouchEnd = function(i) {
      n.userIsDragging || n.onClearIndicatorMouseDown(i);
    }, n.onDropdownIndicatorTouchEnd = function(i) {
      n.userIsDragging || n.onDropdownIndicatorMouseDown(i);
    }, n.handleInputChange = function(i) {
      var a = n.props.inputValue, s = i.currentTarget.value;
      n.setState({
        inputIsHiddenAfterUpdate: !1
      }), n.onInputChange(s, {
        action: "input-change",
        prevInputValue: a
      }), n.props.menuIsOpen || n.onMenuOpen();
    }, n.onInputFocus = function(i) {
      n.props.onFocus && n.props.onFocus(i), n.setState({
        inputIsHiddenAfterUpdate: !1,
        isFocused: !0
      }), (n.openAfterFocus || n.props.openMenuOnFocus) && n.openMenu("first"), n.openAfterFocus = !1;
    }, n.onInputBlur = function(i) {
      var a = n.props.inputValue;
      if (n.menuListRef && n.menuListRef.contains(document.activeElement)) {
        n.inputRef.focus();
        return;
      }
      n.props.onBlur && n.props.onBlur(i), n.onInputChange("", {
        action: "input-blur",
        prevInputValue: a
      }), n.onMenuClose(), n.setState({
        focusedValue: null,
        isFocused: !1
      });
    }, n.onOptionHover = function(i) {
      if (!(n.blockOptionHover || n.state.focusedOption === i)) {
        var a = n.getFocusableOptions(), s = a.indexOf(i);
        n.setState({
          focusedOption: i,
          focusedOptionId: s > -1 ? n.getFocusedOptionId(i) : null
        });
      }
    }, n.shouldHideSelectedOptions = function() {
      return O7(n.props);
    }, n.onValueInputFocus = function(i) {
      i.preventDefault(), i.stopPropagation(), n.focus();
    }, n.onKeyDown = function(i) {
      var a = n.props, s = a.isMulti, m = a.backspaceRemovesValue, v = a.escapeClearsValue, A = a.inputValue, x = a.isClearable, p = a.isDisabled, d = a.menuIsOpen, _ = a.onKeyDown, S = a.tabSelectsValue, g = a.openMenuOnFocus, u = n.state, f = u.focusedOption, E = u.focusedValue, C = u.selectValue;
      if (!p && !(typeof _ == "function" && (_(i), i.defaultPrevented))) {
        switch (n.blockOptionHover = !0, i.key) {
          case "ArrowLeft":
            if (!s || A) return;
            n.focusValue("previous");
            break;
          case "ArrowRight":
            if (!s || A) return;
            n.focusValue("next");
            break;
          case "Delete":
          case "Backspace":
            if (A) return;
            if (E)
              n.removeValue(E);
            else {
              if (!m) return;
              s ? n.popValue() : x && n.clearValue();
            }
            break;
          case "Tab":
            if (n.isComposing || i.shiftKey || !d || !S || !f || // don't capture the event if the menu opens on focus and the focused
            // option is already selected; it breaks the flow of navigation
            g && n.isOptionSelected(f, C))
              return;
            n.selectOption(f);
            break;
          case "Enter":
            if (i.keyCode === 229)
              break;
            if (d) {
              if (!f || n.isComposing) return;
              n.selectOption(f);
              break;
            }
            return;
          case "Escape":
            d ? (n.setState({
              inputIsHiddenAfterUpdate: !1
            }), n.onInputChange("", {
              action: "menu-close",
              prevInputValue: A
            }), n.onMenuClose()) : x && v && n.clearValue();
            break;
          case " ":
            if (A)
              return;
            if (!d) {
              n.openMenu("first");
              break;
            }
            if (!f) return;
            n.selectOption(f);
            break;
          case "ArrowUp":
            d ? n.focusOption("up") : n.openMenu("last");
            break;
          case "ArrowDown":
            d ? n.focusOption("down") : n.openMenu("first");
            break;
          case "PageUp":
            if (!d) return;
            n.focusOption("pageup");
            break;
          case "PageDown":
            if (!d) return;
            n.focusOption("pagedown");
            break;
          case "Home":
            if (!d) return;
            n.focusOption("first");
            break;
          case "End":
            if (!d) return;
            n.focusOption("last");
            break;
          default:
            return;
        }
        i.preventDefault();
      }
    }, n.state.instancePrefix = "react-select-" + (n.props.instanceId || ++Ki), n.state.selectValue = i9(o.value), o.menuIsOpen && n.state.selectValue.length) {
      var r = n.getFocusableOptionsWithIds(), q = n.buildFocusableOptions(), c = q.indexOf(n.state.selectValue[0]);
      n.state.focusableOptionsWithIds = r, n.state.focusedOption = q[c], n.state.focusedOptionId = j3(r, q[c]);
    }
    return n;
  }
  return uo(t, [{
    key: "componentDidMount",
    value: function() {
      this.startListeningComposition(), this.startListeningToTouch(), this.props.closeMenuOnScroll && document && document.addEventListener && document.addEventListener("scroll", this.onScroll, !0), this.props.autoFocus && this.focusInput(), this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef && a9(this.menuListRef, this.focusedOptionRef), Bi() && this.setState({
        isAppleDevice: !0
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function(n) {
      var r = this.props, q = r.isDisabled, c = r.menuIsOpen, i = this.state.isFocused;
      // ensure focus is restored correctly when the control becomes enabled
      (i && !q && n.isDisabled || // ensure focus is on the Input when the menu opens
      i && c && !n.menuIsOpen) && this.focusInput(), i && q && !n.isDisabled ? this.setState({
        isFocused: !1
      }, this.onMenuClose) : !i && !q && n.isDisabled && this.inputRef === document.activeElement && this.setState({
        isFocused: !0
      }), this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate && (a9(this.menuListRef, this.focusedOptionRef), this.scrollToFocusedOptionOnUpdate = !1);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.stopListeningComposition(), this.stopListeningToTouch(), document.removeEventListener("scroll", this.onScroll, !0);
    }
    // ==============================
    // Consumer Handlers
    // ==============================
  }, {
    key: "onMenuOpen",
    value: function() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function() {
      this.onInputChange("", {
        action: "menu-close",
        prevInputValue: this.props.inputValue
      }), this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function(n, r) {
      this.props.onInputChange(n, r);
    }
    // ==============================
    // Methods
    // ==============================
  }, {
    key: "focusInput",
    value: function() {
      this.inputRef && this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function() {
      this.inputRef && this.inputRef.blur();
    }
    // aliased for consumers
  }, {
    key: "openMenu",
    value: function(n) {
      var r = this, q = this.state, c = q.selectValue, i = q.isFocused, a = this.buildFocusableOptions(), s = n === "first" ? 0 : a.length - 1;
      if (!this.props.isMulti) {
        var m = a.indexOf(c[0]);
        m > -1 && (s = m);
      }
      this.scrollToFocusedOptionOnUpdate = !(i && this.menuListRef), this.setState({
        inputIsHiddenAfterUpdate: !1,
        focusedValue: null,
        focusedOption: a[s],
        focusedOptionId: this.getFocusedOptionId(a[s])
      }, function() {
        return r.onMenuOpen();
      });
    }
  }, {
    key: "focusValue",
    value: function(n) {
      var r = this.state, q = r.selectValue, c = r.focusedValue;
      if (this.props.isMulti) {
        this.setState({
          focusedOption: null
        });
        var i = q.indexOf(c);
        c || (i = -1);
        var a = q.length - 1, s = -1;
        if (q.length) {
          switch (n) {
            case "previous":
              i === 0 ? s = 0 : i === -1 ? s = a : s = i - 1;
              break;
            case "next":
              i > -1 && i < a && (s = i + 1);
              break;
          }
          this.setState({
            inputIsHidden: s !== -1,
            focusedValue: q[s]
          });
        }
      }
    }
  }, {
    key: "focusOption",
    value: function() {
      var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "first", r = this.props.pageSize, q = this.state.focusedOption, c = this.getFocusableOptions();
      if (c.length) {
        var i = 0, a = c.indexOf(q);
        q || (a = -1), n === "up" ? i = a > 0 ? a - 1 : c.length - 1 : n === "down" ? i = (a + 1) % c.length : n === "pageup" ? (i = a - r, i < 0 && (i = 0)) : n === "pagedown" ? (i = a + r, i > c.length - 1 && (i = c.length - 1)) : n === "last" && (i = c.length - 1), this.scrollToFocusedOptionOnUpdate = !0, this.setState({
          focusedOption: c[i],
          focusedValue: null,
          focusedOptionId: this.getFocusedOptionId(c[i])
        });
      }
    }
  }, {
    key: "getTheme",
    value: (
      // ==============================
      // Getters
      // ==============================
      function() {
        return this.props.theme ? typeof this.props.theme == "function" ? this.props.theme(W3) : x1(x1({}, W3), this.props.theme) : W3;
      }
    )
  }, {
    key: "getCommonProps",
    value: function() {
      var n = this.clearValue, r = this.cx, q = this.getStyles, c = this.getClassNames, i = this.getValue, a = this.selectOption, s = this.setValue, m = this.props, v = m.isMulti, A = m.isRtl, x = m.options, p = this.hasValue();
      return {
        clearValue: n,
        cx: r,
        getStyles: q,
        getClassNames: c,
        getValue: i,
        hasValue: p,
        isMulti: v,
        isRtl: A,
        options: x,
        selectOption: a,
        selectProps: m,
        setValue: s,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function() {
      var n = this.state.selectValue;
      return n.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function() {
      var n = this.props, r = n.isClearable, q = n.isMulti;
      return r === void 0 ? q : r;
    }
  }, {
    key: "isOptionDisabled",
    value: function(n, r) {
      return S7(this.props, n, r);
    }
  }, {
    key: "isOptionSelected",
    value: function(n, r) {
      return R7(this.props, n, r);
    }
  }, {
    key: "filterOption",
    value: function(n, r) {
      return z7(this.props, n, r);
    }
  }, {
    key: "formatOptionLabel",
    value: function(n, r) {
      if (typeof this.props.formatOptionLabel == "function") {
        var q = this.props.inputValue, c = this.state.selectValue;
        return this.props.formatOptionLabel(n, {
          context: r,
          inputValue: q,
          selectValue: c
        });
      } else
        return this.getOptionLabel(n);
    }
  }, {
    key: "formatGroupLabel",
    value: function(n) {
      return this.props.formatGroupLabel(n);
    }
    // ==============================
    // Mouse Handlers
    // ==============================
  }, {
    key: "startListeningComposition",
    value: (
      // ==============================
      // Composition Handlers
      // ==============================
      function() {
        document && document.addEventListener && (document.addEventListener("compositionstart", this.onCompositionStart, !1), document.addEventListener("compositionend", this.onCompositionEnd, !1));
      }
    )
  }, {
    key: "stopListeningComposition",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("compositionstart", this.onCompositionStart), document.removeEventListener("compositionend", this.onCompositionEnd));
    }
  }, {
    key: "startListeningToTouch",
    value: (
      // ==============================
      // Touch Handlers
      // ==============================
      function() {
        document && document.addEventListener && (document.addEventListener("touchstart", this.onTouchStart, !1), document.addEventListener("touchmove", this.onTouchMove, !1), document.addEventListener("touchend", this.onTouchEnd, !1));
      }
    )
  }, {
    key: "stopListeningToTouch",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("touchstart", this.onTouchStart), document.removeEventListener("touchmove", this.onTouchMove), document.removeEventListener("touchend", this.onTouchEnd));
    }
  }, {
    key: "renderInput",
    value: (
      // ==============================
      // Renderers
      // ==============================
      function() {
        var n = this.props, r = n.isDisabled, q = n.isSearchable, c = n.inputId, i = n.inputValue, a = n.tabIndex, s = n.form, m = n.menuIsOpen, v = n.required, A = this.getComponents(), x = A.Input, p = this.state, d = p.inputIsHidden, _ = p.ariaSelection, S = this.commonProps, g = c || this.getElementId("input"), u = x1(x1(x1({
          "aria-autocomplete": "list",
          "aria-expanded": m,
          "aria-haspopup": !0,
          "aria-errormessage": this.props["aria-errormessage"],
          "aria-invalid": this.props["aria-invalid"],
          "aria-label": this.props["aria-label"],
          "aria-labelledby": this.props["aria-labelledby"],
          "aria-required": v,
          role: "combobox",
          "aria-activedescendant": this.state.isAppleDevice ? void 0 : this.state.focusedOptionId || ""
        }, m && {
          "aria-controls": this.getElementId("listbox")
        }), !q && {
          "aria-readonly": !0
        }), this.hasValue() ? (_ == null ? void 0 : _.action) === "initial-input-focus" && {
          "aria-describedby": this.getElementId("live-region")
        } : {
          "aria-describedby": this.getElementId("placeholder")
        });
        return q ? /* @__PURE__ */ s1.createElement(x, h1({}, S, {
          autoCapitalize: "none",
          autoComplete: "off",
          autoCorrect: "off",
          id: g,
          innerRef: this.getInputRef,
          isDisabled: r,
          isHidden: d,
          onBlur: this.onInputBlur,
          onChange: this.handleInputChange,
          onFocus: this.onInputFocus,
          spellCheck: "false",
          tabIndex: a,
          form: s,
          type: "text",
          value: i
        }, u)) : /* @__PURE__ */ s1.createElement(Ii, h1({
          id: g,
          innerRef: this.getInputRef,
          onBlur: this.onInputBlur,
          onChange: Q2,
          onFocus: this.onInputFocus,
          disabled: r,
          tabIndex: a,
          inputMode: "none",
          form: s,
          value: ""
        }, u));
      }
    )
  }, {
    key: "renderPlaceholderOrValue",
    value: function() {
      var n = this, r = this.getComponents(), q = r.MultiValue, c = r.MultiValueContainer, i = r.MultiValueLabel, a = r.MultiValueRemove, s = r.SingleValue, m = r.Placeholder, v = this.commonProps, A = this.props, x = A.controlShouldRenderValue, p = A.isDisabled, d = A.isMulti, _ = A.inputValue, S = A.placeholder, g = this.state, u = g.selectValue, f = g.focusedValue, E = g.isFocused;
      if (!this.hasValue() || !x)
        return _ ? null : /* @__PURE__ */ s1.createElement(m, h1({}, v, {
          key: "placeholder",
          isDisabled: p,
          isFocused: E,
          innerProps: {
            id: this.getElementId("placeholder")
          }
        }), S);
      if (d)
        return u.map(function(w, F) {
          var D = w === f, e1 = "".concat(n.getOptionLabel(w), "-").concat(n.getOptionValue(w));
          return /* @__PURE__ */ s1.createElement(q, h1({}, v, {
            components: {
              Container: c,
              Label: i,
              Remove: a
            },
            isFocused: D,
            isDisabled: p,
            key: e1,
            index: F,
            removeProps: {
              onClick: function() {
                return n.removeValue(w);
              },
              onTouchEnd: function() {
                return n.removeValue(w);
              },
              onMouseDown: function(l1) {
                l1.preventDefault();
              }
            },
            data: w
          }), n.formatOptionLabel(w, "value"));
        });
      if (_)
        return null;
      var C = u[0];
      return /* @__PURE__ */ s1.createElement(s, h1({}, v, {
        data: C,
        isDisabled: p
      }), this.formatOptionLabel(C, "value"));
    }
  }, {
    key: "renderClearIndicator",
    value: function() {
      var n = this.getComponents(), r = n.ClearIndicator, q = this.commonProps, c = this.props, i = c.isDisabled, a = c.isLoading, s = this.state.isFocused;
      if (!this.isClearable() || !r || i || !this.hasValue() || a)
        return null;
      var m = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ s1.createElement(r, h1({}, q, {
        innerProps: m,
        isFocused: s
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function() {
      var n = this.getComponents(), r = n.LoadingIndicator, q = this.commonProps, c = this.props, i = c.isDisabled, a = c.isLoading, s = this.state.isFocused;
      if (!r || !a) return null;
      var m = {
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ s1.createElement(r, h1({}, q, {
        innerProps: m,
        isDisabled: i,
        isFocused: s
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function() {
      var n = this.getComponents(), r = n.DropdownIndicator, q = n.IndicatorSeparator;
      if (!r || !q) return null;
      var c = this.commonProps, i = this.props.isDisabled, a = this.state.isFocused;
      return /* @__PURE__ */ s1.createElement(q, h1({}, c, {
        isDisabled: i,
        isFocused: a
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function() {
      var n = this.getComponents(), r = n.DropdownIndicator;
      if (!r) return null;
      var q = this.commonProps, c = this.props.isDisabled, i = this.state.isFocused, a = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ s1.createElement(r, h1({}, q, {
        innerProps: a,
        isDisabled: c,
        isFocused: i
      }));
    }
  }, {
    key: "renderMenu",
    value: function() {
      var n = this, r = this.getComponents(), q = r.Group, c = r.GroupHeading, i = r.Menu, a = r.MenuList, s = r.MenuPortal, m = r.LoadingMessage, v = r.NoOptionsMessage, A = r.Option, x = this.commonProps, p = this.state.focusedOption, d = this.props, _ = d.captureMenuScroll, S = d.inputValue, g = d.isLoading, u = d.loadingMessage, f = d.minMenuHeight, E = d.maxMenuHeight, C = d.menuIsOpen, w = d.menuPlacement, F = d.menuPosition, D = d.menuPortalTarget, e1 = d.menuShouldBlockScroll, j = d.menuShouldScrollIntoView, l1 = d.noOptionsMessage, $ = d.onMenuScrollToTop, Q = d.onMenuScrollToBottom;
      if (!C) return null;
      var Z = function(H, z) {
        var I = H.type, b = H.data, h = H.isDisabled, R = H.isSelected, k = H.label, N = H.value, K = p === b, T = h ? void 0 : function() {
          return n.onOptionHover(b);
        }, t1 = h ? void 0 : function() {
          return n.selectOption(b);
        }, U = "".concat(n.getElementId("option"), "-").concat(z), Y = {
          id: U,
          onClick: t1,
          onMouseMove: T,
          onMouseOver: T,
          tabIndex: -1,
          role: "option",
          "aria-selected": n.state.isAppleDevice ? void 0 : R
          // is not supported on Apple devices
        };
        return /* @__PURE__ */ s1.createElement(A, h1({}, x, {
          innerProps: Y,
          data: b,
          isDisabled: h,
          isSelected: R,
          key: U,
          label: k,
          type: I,
          value: N,
          isFocused: K,
          innerRef: K ? n.getFocusedOptionRef : void 0
        }), n.formatOptionLabel(H.data, "menu"));
      }, J;
      if (this.hasOptions())
        J = this.getCategorizedOptions().map(function(W) {
          if (W.type === "group") {
            var H = W.data, z = W.options, I = W.index, b = "".concat(n.getElementId("group"), "-").concat(I), h = "".concat(b, "-heading");
            return /* @__PURE__ */ s1.createElement(q, h1({}, x, {
              key: b,
              data: H,
              options: z,
              Heading: c,
              headingProps: {
                id: h,
                data: W.data
              },
              label: n.formatGroupLabel(W.data)
            }), W.options.map(function(R) {
              return Z(R, "".concat(I, "-").concat(R.index));
            }));
          } else if (W.type === "option")
            return Z(W, "".concat(W.index));
        });
      else if (g) {
        var P = u({
          inputValue: S
        });
        if (P === null) return null;
        J = /* @__PURE__ */ s1.createElement(m, x, P);
      } else {
        var q1 = l1({
          inputValue: S
        });
        if (q1 === null) return null;
        J = /* @__PURE__ */ s1.createElement(v, x, q1);
      }
      var B = {
        minMenuHeight: f,
        maxMenuHeight: E,
        menuPlacement: w,
        menuPosition: F,
        menuShouldScrollIntoView: j
      }, M = /* @__PURE__ */ s1.createElement(Kr, h1({}, x, B), function(W) {
        var H = W.ref, z = W.placerProps, I = z.placement, b = z.maxHeight;
        return /* @__PURE__ */ s1.createElement(i, h1({}, x, B, {
          innerRef: H,
          innerProps: {
            onMouseDown: n.onMenuMouseDown,
            onMouseMove: n.onMenuMouseMove
          },
          isLoading: g,
          placement: I
        }), /* @__PURE__ */ s1.createElement(Oi, {
          captureEnabled: _,
          onTopArrive: $,
          onBottomArrive: Q,
          lockEnabled: e1
        }, function(h) {
          return /* @__PURE__ */ s1.createElement(a, h1({}, x, {
            innerRef: function(k) {
              n.getMenuListRef(k), h(k);
            },
            innerProps: {
              role: "listbox",
              "aria-multiselectable": x.isMulti,
              id: n.getElementId("listbox")
            },
            isLoading: g,
            maxHeight: b,
            focusedOption: p
          }), J);
        }));
      });
      return D || F === "fixed" ? /* @__PURE__ */ s1.createElement(s, h1({}, x, {
        appendTo: D,
        controlElement: this.controlRef,
        menuPlacement: w,
        menuPosition: F
      }), M) : M;
    }
  }, {
    key: "renderFormField",
    value: function() {
      var n = this, r = this.props, q = r.delimiter, c = r.isDisabled, i = r.isMulti, a = r.name, s = r.required, m = this.state.selectValue;
      if (s && !this.hasValue() && !c)
        return /* @__PURE__ */ s1.createElement(Mi, {
          name: a,
          onFocus: this.onValueInputFocus
        });
      if (!(!a || c))
        if (i)
          if (q) {
            var v = m.map(function(p) {
              return n.getOptionValue(p);
            }).join(q);
            return /* @__PURE__ */ s1.createElement("input", {
              name: a,
              type: "hidden",
              value: v
            });
          } else {
            var A = m.length > 0 ? m.map(function(p, d) {
              return /* @__PURE__ */ s1.createElement("input", {
                key: "i-".concat(d),
                name: a,
                type: "hidden",
                value: n.getOptionValue(p)
              });
            }) : /* @__PURE__ */ s1.createElement("input", {
              name: a,
              type: "hidden",
              value: ""
            });
            return /* @__PURE__ */ s1.createElement("div", null, A);
          }
        else {
          var x = m[0] ? this.getOptionValue(m[0]) : "";
          return /* @__PURE__ */ s1.createElement("input", {
            name: a,
            type: "hidden",
            value: x
          });
        }
    }
  }, {
    key: "renderLiveRegion",
    value: function() {
      var n = this.commonProps, r = this.state, q = r.ariaSelection, c = r.focusedOption, i = r.focusedValue, a = r.isFocused, s = r.selectValue, m = this.getFocusableOptions();
      return /* @__PURE__ */ s1.createElement(pi, h1({}, n, {
        id: this.getElementId("live-region"),
        ariaSelection: q,
        focusedOption: c,
        focusedValue: i,
        isFocused: a,
        selectValue: s,
        focusableOptions: m,
        isAppleDevice: this.state.isAppleDevice
      }));
    }
  }, {
    key: "render",
    value: function() {
      var n = this.getComponents(), r = n.Control, q = n.IndicatorsContainer, c = n.SelectContainer, i = n.ValueContainer, a = this.props, s = a.className, m = a.id, v = a.isDisabled, A = a.menuIsOpen, x = this.state.isFocused, p = this.commonProps = this.getCommonProps();
      return /* @__PURE__ */ s1.createElement(c, h1({}, p, {
        className: s,
        innerProps: {
          id: m,
          onKeyDown: this.onKeyDown
        },
        isDisabled: v,
        isFocused: x
      }), this.renderLiveRegion(), /* @__PURE__ */ s1.createElement(r, h1({}, p, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: v,
        isFocused: x,
        menuIsOpen: A
      }), /* @__PURE__ */ s1.createElement(i, h1({}, p, {
        isDisabled: v
      }), this.renderPlaceholderOrValue(), this.renderInput()), /* @__PURE__ */ s1.createElement(q, h1({}, p, {
        isDisabled: v
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(n, r) {
      var q = r.prevProps, c = r.clearFocusValueOnUpdate, i = r.inputIsHiddenAfterUpdate, a = r.ariaSelection, s = r.isFocused, m = r.prevWasFocused, v = r.instancePrefix, A = n.options, x = n.value, p = n.menuIsOpen, d = n.inputValue, _ = n.isMulti, S = i9(x), g = {};
      if (q && (x !== q.value || A !== q.options || p !== q.menuIsOpen || d !== q.inputValue)) {
        var u = p ? Ui(n, S) : [], f = p ? y9(B2(n, S), "".concat(v, "-option")) : [], E = c ? $i(r, S) : null, C = Qi(r, u), w = j3(f, C);
        g = {
          selectValue: S,
          focusedOption: C,
          focusedOptionId: w,
          focusableOptionsWithIds: f,
          focusedValue: E,
          clearFocusValueOnUpdate: !1
        };
      }
      var F = i != null && n !== q ? {
        inputIsHidden: i,
        inputIsHiddenAfterUpdate: void 0
      } : {}, D = a, e1 = s && m;
      return s && !e1 && (D = {
        value: z2(_, S, S[0] || null),
        options: S,
        action: "initial-input-focus"
      }, e1 = !m), (a == null ? void 0 : a.action) === "initial-input-focus" && (D = null), x1(x1(x1({}, g), F), {}, {
        prevProps: n,
        ariaSelection: D,
        prevWasFocused: e1
      });
    }
  }]), t;
}(D7);
T7.defaultProps = Ji;
var ea = /* @__PURE__ */ L4(function(e, l) {
  var t = so(e);
  return /* @__PURE__ */ s1.createElement(T7, h1({
    ref: l
  }, t));
}), G2 = ea;
const la = ({ show: e, onHide: l, amenity: t, selectedAmenityMapObjName: o, mapObjectName: n, onClickMapObj: r, allSvgObjectIds: q }) => {
  const { mapConfig: c, allIndexedMapObjects: i, allIndexedRetailers: a } = r4(), [s, m] = c1(), [v, A] = c1([]), [x, p] = c1([]), [d, _] = c1(-1);
  p1(() => {
    if (n) {
      const E = i[n];
      if (E && E.retailer_id) {
        const C = a[E.retailer_id];
        C && m(C);
      }
    } else
      m(void 0);
  }, [i, a, n]);
  const S = (E) => {
    E.preventDefault(), E.stopPropagation();
    let C;
    if (c.KIOSK_ID ? C = Object.values(i).filter((F) => F.kiosk_id === c.KIOSK_ID && q.has(F.map_obj_name))[0] : C = Object.values(i).filter((F) => F.retailer_id === d && q.has(F.map_obj_name))[0], !C) {
      console.error("Map object not found");
      return;
    }
    t ? r(C.map_obj_name, o) : r(C.map_obj_name);
  };
  p1(() => {
    const E = new Set(
      Object.values(i).filter((w) => w.retailer_id !== null).filter((w) => q.has(w.map_obj_name)).map((w) => w.retailer_id)
    ), C = Array.from(E).map((w) => a[w]).filter(Boolean).sort((w, F) => w.retail_name.localeCompare(F.retail_name));
    p(C.map((w) => w.global_retailer_id)), A(C);
  }, [i, a, q]);
  const g = W1(() => v.filter((C) => !(s && C.id === s.id)).map((C) => {
    const F = x.filter(
      (D) => D === C.global_retailer_id
    ).length > 1 && C.location ? `${C.retail_name} (${C.location})` : C.retail_name;
    return { value: C.id, label: F };
  }), [v, x, s]), u = W1(() => g.find((E) => E.value === d) || null, [g, d]), f = (E) => {
    _((E == null ? void 0 : E.value) ?? -1);
  };
  return e ? /* @__PURE__ */ f1(
    Z8,
    {
      show: e,
      dialogClassName: a4.retailerInfoModal,
      className: "px-2",
      onHide: l,
      centered: !0,
      scrollable: !0,
      unmountOnClose: !0,
      onExited: () => _(-1),
      children: [
        /* @__PURE__ */ G("div", { className: a4.retailerInfoCloseBtn, children: /* @__PURE__ */ G(D6, { onClick: l, size: 24, color: "white", className: a4.closeBtn }) }),
        /* @__PURE__ */ f1(Z8.Body, { className: a4.modalBody, children: [
          /* @__PURE__ */ G("div", { className: a4.contentWrapper, children: s ? /* @__PURE__ */ f1("div", { className: a4.content, children: [
            /* @__PURE__ */ G("div", { className: a4.retailerLogo, children: /* @__PURE__ */ G("img", { className: a4.img, src: s.logo, alt: s.retail_name }) }),
            /* @__PURE__ */ f1("div", { className: a4.retailerInfoContent, children: [
              /* @__PURE__ */ f1("div", { children: [
                /* @__PURE__ */ G("b", { children: "Retailer:" }),
                " ",
                s.retail_name
              ] }),
              s.location && /* @__PURE__ */ f1("div", { children: [
                /* @__PURE__ */ G("b", { children: "Location:" }),
                " ",
                s.location
              ] }),
              s.retailer_phone && /* @__PURE__ */ f1("div", { children: [
                /* @__PURE__ */ G("b", { children: "Phone:" }),
                " ",
                /* @__PURE__ */ G("a", { href: `tel:${s.retailer_phone}`, children: ye(s.retailer_phone) })
              ] }),
              s.retailer_description && /* @__PURE__ */ G("div", { dangerouslySetInnerHTML: { __html: s.retailer_description } })
            ] })
          ] }) : null }),
          /* @__PURE__ */ f1(xn, { className: a4.getDirectionsFrom, children: [
            /* @__PURE__ */ G(
              G2,
              {
                name: "retailer",
                className: a4.retailerDropdown,
                classNamePrefix: "react-select",
                menuPortalTarget: typeof document < "u" ? document.body : void 0,
                "aria-label": "Choose a Retailer",
                options: g,
                isLoading: !1,
                noOptionsMessage: () => "Retailer not found",
                placeholder: "Get direction from ...",
                value: u,
                onChange: f,
                styles: {
                  menuPortal: (E) => ({ ...E, zIndex: 2e3 }),
                  menu: (E) => ({ ...E, zIndex: 2e3 })
                },
                isClearable: !0
              }
            ),
            /* @__PURE__ */ G("button", { type: "button", disabled: d === -1, onClick: S, className: a4.btn, children: "Map IT" })
          ] })
        ] })
      ]
    }
  ) : null;
};
var ta = ["color", "size", "title", "className"];
function m6() {
  return m6 = Object.assign ? Object.assign.bind() : function(e) {
    for (var l = 1; l < arguments.length; l++) {
      var t = arguments[l];
      for (var o in t) ({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
  }, m6.apply(null, arguments);
}
function na(e, l) {
  if (e == null) return {};
  var t, o, n = oa(e, l);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (o = 0; o < r.length; o++) t = r[o], l.indexOf(t) === -1 && {}.propertyIsEnumerable.call(e, t) && (n[t] = e[t]);
  }
  return n;
}
function oa(e, l) {
  if (e == null) return {};
  var t = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (l.indexOf(o) !== -1) continue;
    t[o] = e[o];
  }
  return t;
}
var w7 = /* @__PURE__ */ L4(function(e, l) {
  var t = e.color, o = t === void 0 ? "currentColor" : t, n = e.size, r = n === void 0 ? "1em" : n, q = e.title, c = q === void 0 ? null : q, i = e.className, a = i === void 0 ? "" : i, s = na(e, ta);
  return /* @__PURE__ */ Y1.createElement("svg", m6({
    ref: l,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: r,
    height: r,
    fill: o,
    className: ["bi", "bi-arrow-clockwise", a].filter(Boolean).join(" ")
  }, s), c ? /* @__PURE__ */ Y1.createElement("title", null, c) : null, /* @__PURE__ */ Y1.createElement("path", {
    fillRule: "evenodd",
    d: "M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
  }), /* @__PURE__ */ Y1.createElement("path", {
    d: "M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
  }));
});
w7.propTypes = {
  color: m1.string,
  size: m1.oneOfType([m1.string, m1.number]),
  title: m1.string,
  className: m1.string
};
const ra = "_sidebarComp_1b6ud_1", qa = "_sidebarFields_1b6ud_2", ia = "_tabOptions_1b6ud_7", aa = "_mainBtnsGroup_1b6ud_12", sa = "_deleteBtn_1b6ud_17", ca = "_btnsGroup_1b6ud_27", ua = "_active_1b6ud_38", ma = "_sidebarField_1b6ud_2", da = "_label_1b6ud_50", fa = "_fieldWrapper_1b6ud_56", xa = "_numberFieldGroup_1b6ud_62", ha = "_button_1b6ud_68", pa = "_decrement_1b6ud_78", ga = "_increment_1b6ud_84", ba = "_input_1b6ud_95", _a = "_colorFieldGroup_1b6ud_104", va = "_colorField_1b6ud_104", ya = "_inputField_1b6ud_118", Ia = "_rotateButton_1b6ud_130", Ca = "_selectField_1b6ud_148", Ea = "_textareaField_1b6ud_179", Aa = "_textField_1b6ud_187", i1 = {
  sidebarComp: ra,
  sidebarFields: qa,
  tabOptions: ia,
  mainBtnsGroup: aa,
  deleteBtn: sa,
  btnsGroup: ca,
  active: ua,
  sidebarField: ma,
  label: da,
  fieldWrapper: fa,
  numberFieldGroup: xa,
  button: ha,
  decrement: pa,
  increment: ga,
  input: ba,
  colorFieldGroup: _a,
  colorField: va,
  inputField: ya,
  rotateButton: Ia,
  selectField: Ca,
  textareaField: Ea,
  textField: Aa
}, Sa = (e) => {
  const { setData: l, selectedId: t, floorIndex: o, onResetData: n, onChangeData: r, onNewData: q, triggerSceneUpdate: c } = e, { mapApiResponse: i, meshObject: a, allIndexedRetailers: s } = r4(), { getImage: m, processImage: v, layer_text_logo_position_by_id: A } = u5(), { getMaterial: x } = i3(), p = w9(N9), [d, _] = c1("retailer"), [S, g] = c1("retail_name"), [u, f] = c1(T2), [E, C] = c1(null), [, w] = A9(), F = v1({}), [D, e1] = c1([]), j = r1((L) => {
    if (L) {
      const V = L.reduce((O, y) => y.kiosk_id !== null ? [...O, y.kiosk_id] : O, []);
      e1([...V]);
    }
  }, []);
  p1(() => {
    j(i.map_objs);
  }, [i, j]);
  const l1 = (L, V, O) => {
    const y = L.userData.kioskConfig;
    y ? (L.userData.distanceFactor = V != null && V.lock_size ? 1500 : void 0, L.userData.kioskConfig = {
      ...y,
      lockSize: V.lock_size,
      blink: y.blink,
      size: Number(V.size),
      floorIndex: O,
      text_color: V.text_color
    }) : L.userData.kioskConfig = {
      lockSize: V.lock_size,
      blink: !1,
      size: Number(V.size),
      floorIndex: O,
      text_color: V.text_color
    };
  }, $ = r1(async (L, V) => {
    if (E !== (L == null ? void 0 : L.map_obj_name)) return;
    let O = "";
    L.layer_type === "retail_logo" ? O = await m(L, s[L.retailer_id || 0]) : O = await m(L), O && v(O, L, (y, n1) => {
      V.geometry = y, V.material = n1;
      const a1 = y.boundingBox, I1 = new w1();
      if (a1) {
        a1.getCenter(I1);
        const y1 = new w1();
        a1.getSize(y1), V.object_id && A(V.object_id, I1, y1, V, { [V.object_id]: { ...L } });
      }
    });
  }, [m, A, E, v, s]), Q = r1((L, V) => {
    e.meshFloors.meshParams.flat().filter((O) => O !== void 0).forEach((O) => {
      O.mesh.object_id === V && (O.mesh.userData.storeName = L);
    });
  }, [e.meshFloors.meshParams]), Z = r1((L, V, O) => {
    if (!L || E !== (u == null ? void 0 : u.map_obj_name)) return;
    let y = new s5(V, {
      font: L.userData && L.userData.font ? L.userData.font : p,
      size: O,
      height: 0.01,
      curveSegments: 4
    });
    y.center(), L.geometry && L.geometry.dispose(), L.geometry = y, Q(V, u.map_obj_name);
  }, [u == null ? void 0 : u.map_obj_name, p, E, Q]), J = r1((L, V = !1) => {
    const O = i.map_objs.findIndex((y) => y.map_obj_name === L.map_obj_name);
    O !== -1 ? (L.id = i.map_objs[O].id, i.map_objs[O] = { ...L }, l(O, { ...L }), j(i.map_objs), V && (r == null || r(L))) : V && (q == null || q(L));
  }, [i, l, j, q, r]), P = () => {
    if (a) {
      const L = a.textImageMeshObject;
      L && L.userData && L.userData.kioskConfig && (L.userData.kioskConfig = null, e.meshFloors.storeLogos.flat().filter((V) => V !== void 0).forEach((V) => {
        V.storeLogo.object_id === L.object_id && V.storeLogo.userData.kioskConfig !== void 0 && (V.storeLogo.userData.kioskConfig = null);
      }));
    }
  }, q1 = (L) => {
    if (_(L), u.obj_type = L, P(), L === "retailer" && (["retail_name", "retail_logo", "retail_text"].includes(S) || B("retail_name"), u.kiosk_id = null), L === "special" && (["kiosk", "amenity"].includes(S) || B("kiosk"), u.retailer_id = null, a)) {
      const V = a.textImageMeshObject;
      Z(V, "", u.size);
    }
    L === "custom" && (["custom_text", "custom_image"].includes(S) || B("custom_text"), u.retailer_id = null, u.kiosk_id = null), I("size", u.size.toString()), I("text_color", u.text_color || i.mapSettings.STORE_TEXT_COLOR), f({ ...u }), J({ ...u });
  }, B = (L) => {
    u && (g(L), u.layer_type = L, P(), L === "retail_name" || L === "retail_logo" || L === "retail_text" || (L === "kiosk" ? (u.value = "", a && $(u, a.textImageMeshObject)) : L === "amenity" && (u.kiosk_id = null)), I("size", u.size.toString()), f({ ...u }), J({ ...u }));
  }, M = () => {
    u && (Object.assign(u, T2, { id: u.id, map_obj_name: u.map_obj_name }), q1("retailer"), B("retail_name"), Q("", u.map_obj_name), n && n({ ...u }));
  }, W = (L, V) => {
    L && u && (u.retailer_id = L.value, B(u.layer_type), f({ ...u }), J({ ...u }, !0));
  }, H = (L, V) => {
    L && u && (u.kiosk_id = L.value, f({ ...u }), J({ ...u }, !0), a && (l1(a.textImageMeshObject, u, o), c()));
  }, z = (L, V) => {
    L && u && (u.value = L.value, f({ ...u }), J({ ...u }, !0), a && $(u, a.textImageMeshObject));
  }, I = r1((L, V) => {
    var O, y, n1;
    if (u && a) {
      const a1 = a.textImageMeshObject, I1 = new w1(), y1 = a.svgShapeMeshObject.geometry.boundingBox;
      switch (y1 && y1.getCenter(I1), L) {
        case "custom_text":
          u.custom_text = V, ["retail_text", "custom_text"].includes(u.layer_type) && Z(a1, u.custom_text, u.size);
          break;
        case "custom_image":
          u.custom_image = V, $(u, a1), J({ ...u }, !0);
          break;
        case "size":
          if (u.size = parseInt(V), ["retail_logo", "kiosk", "amenity", "custom_image"].includes(u.layer_type))
            u.layer_type === "retail_logo" || u.layer_type === "custom_image" ? ($(u, a1), setTimeout(() => {
              J({ ...u }, !0);
            }, 300)) : u.layer_type === "amenity" ? ($(u, a1), w(() => {
              f({ ...u }), J({ ...u }, !0);
            })) : u.kiosk_id && u.layer_type === "kiosk" && (l1(a1, u, o), c());
          else {
            let P1 = "";
            u.layer_type === "retail_name" && ((O = s[u.retailer_id || 0]) != null && O.retail_name) ? P1 = (y = s[u.retailer_id || 0]) == null ? void 0 : y.retail_name : ["retail_text", "custom_text"].includes(u.layer_type) && (P1 = u.custom_text), Z(a1, P1 || "", u.size);
          }
          break;
        case "lock_size":
          u.lock_size = !1, u.value = V, u.layer_type === "kiosk" && (l1(a1, u, o), c());
          break;
        case "rotate":
          u.rotate = parseInt(V), a1.rotation.set(
            a1.rotation.x,
            a1.rotation.y,
            u.rotate * Math.PI / 180
          );
          break;
        case "offset_x":
          I1.x += parseFloat(V), a1.position.setX(I1.x), u.offset_x = parseInt(V);
          break;
        case "offset_y":
          I1.y += parseFloat(V), a1.position.setY(I1.y), u.offset_y = parseInt(V);
          break;
        case "text_color":
          if (u.text_color = V, ["retail_name", "retail_text", "custom_text"].includes(u.layer_type)) {
            const P1 = {
              color: u.text_color,
              transparent: !0,
              side: i2,
              depthWrite: !1,
              depthTest: !1
            };
            let b1 = new qe(P1);
            a1.material = b1;
          } else (u.layer_type === "retail_logo" || u.layer_type === "custom_image" || u.obj_type === "special" && u.layer_type === "kiosk" && u.kiosk_id != null || u.obj_type === "special" && u.layer_type === "amenity" && u.value !== null) && ($(u, a1), u.layer_type === "kiosk" && l1(a1, u, o), w(() => {
            J({
              ...u,
              text_color: u.text_color && u.text_color.replace("#", "")
            }, !0);
          }));
          break;
        case "bg_color":
          u.bg_color = V;
          let N1 = "store";
          (n1 = a1.object_id) != null && n1.startsWith("big-store") && (N1 = "big-store"), a1.material = x(
            N1,
            u.map_obj_name,
            u.bg_color,
            u.transparent
          );
          break;
      }
      w(() => {
        f({ ...u }), J({ ...u }, !0);
      });
    }
  }, [o, u, x, $, Z, i.retailers, a, c, J]), b = r1((L) => {
    const V = L.target;
    I(V.name, V.value);
  }, [I]);
  p1(() => {
    if (t) {
      const L = i.map_objs.findIndex((V) => V.map_obj_name === t);
      if (L !== -1) {
        const V = { ...i.map_objs[L] };
        f(V), _(V.obj_type), g(V.layer_type);
      } else
        f({
          ...T2,
          map_obj_name: t,
          id: (/* @__PURE__ */ new Date()).getTime()
        });
    }
  }, [i, t]), p1(() => {
    u && C(u.map_obj_name);
  }, [u]);
  const h = (L) => {
    u && Object.hasOwn(u, L) && I(L, (u[L] - 1).toString());
  }, R = (L) => {
    u && Object.hasOwn(u, L) && I(L, (u[L] + 1).toString());
  }, k = (L, V = 45) => {
    if (u && Object.hasOwn(u, L)) {
      let O = u[L];
      const y = O % V;
      y !== 0 && (O -= y), O += V, O > 360 ? O = V : O === 360 && (O = 0), I(L, O.toString());
    }
  }, N = (L) => {
    const V = window.setInterval(() => {
      h(L);
    }, 200);
    F.current[L] = V;
  }, K = (L) => {
    const V = window.setInterval(() => {
      R(L);
    }, 200);
    F.current[L] = V;
  }, T = (L) => {
    F.current[L] && (clearInterval(F.current[L]), F.current[L] = null);
  }, t1 = (i == null ? void 0 : i.retailers.map((L) => ({
    value: L.id,
    label: (i == null ? void 0 : i.globalRetailerIds.filter((V) => V === L.global_retailer_id).length) > 1 ? `${L.retail_name} (${L.location})` : L.retail_name
  }))) || [], U = (i == null ? void 0 : i.kiosks.map((L) => ({
    value: L.id,
    label: L.name,
    isDisabled: D.includes(L.id)
  }))) || [], Y = q3.map((L) => ({
    value: L.type,
    label: L.name
  })) || [];
  return u ? /* @__PURE__ */ G("div", { className: `sidebarComp ${i1.sidebarComp}`, children: /* @__PURE__ */ f1("div", { className: i1.sidebarFields, children: [
    /* @__PURE__ */ f1("div", { className: i1.tabOptions, children: [
      /* @__PURE__ */ f1("div", { className: i1.mainBtnsGroup, children: [
        /* @__PURE__ */ f1("div", { className: i1.btnsGroup, children: [
          /* @__PURE__ */ G("button", { onClick: () => q1("retailer"), className: d === "retailer" ? i1.active : "", children: "Retailer" }),
          /* @__PURE__ */ G("button", { onClick: () => q1("special"), className: d === "special" ? i1.active : "", children: "Special" }),
          /* @__PURE__ */ G("button", { onClick: () => q1("custom"), className: d === "custom" ? i1.active : "", children: "Custom" })
        ] }),
        /* @__PURE__ */ G("button", { className: i1.deleteBtn, onClick: M, children: "Delete" })
      ] }),
      d === "retailer" && /* @__PURE__ */ f1(z4, { children: [
        /* @__PURE__ */ G(
          G2,
          {
            className: i1.selectField,
            classNamePrefix: "custom",
            menuPortalTarget: document.body,
            "aria-label": "Choose a Retailer",
            options: t1,
            isLoading: !1,
            noOptionsMessage: () => "Retailers not found",
            placeholder: "Choose a Retailer...",
            value: t1.find((L) => L.value === u.retailer_id) || null,
            onChange: W
          }
        ),
        u.retailer_id > 0 && /* @__PURE__ */ f1("div", { className: i1.btnsGroup, children: [
          /* @__PURE__ */ G("button", { onClick: () => B("retail_name"), className: S === "retail_name" ? i1.active : "", children: "Retail Name" }),
          /* @__PURE__ */ G("button", { onClick: () => B("retail_logo"), className: S === "retail_logo" ? i1.active : "", children: "Retail Logo" }),
          /* @__PURE__ */ G("button", { onClick: () => B("retail_text"), className: S === "retail_text" ? i1.active : "", children: "Custom Text" })
        ] })
      ] }),
      d === "special" && /* @__PURE__ */ f1(z4, { children: [
        /* @__PURE__ */ f1("div", { className: i1.btnsGroup, children: [
          /* @__PURE__ */ G("button", { onClick: () => B("kiosk"), className: S === "kiosk" ? i1.active : "", children: "Kiosk" }),
          /* @__PURE__ */ G("button", { onClick: () => B("amenity"), className: S === "amenity" ? i1.active : "", children: "Amenity" })
        ] }),
        S === "kiosk" && /* @__PURE__ */ G(
          G2,
          {
            className: i1.selectField,
            classNamePrefix: "custom",
            "aria-label": "Choose a Kiosk",
            options: U,
            noOptionsMessage: () => "Kiosks not found",
            placeholder: "Choose a Kiosk...",
            value: U.find((L) => L.value === u.kiosk_id) || null,
            onChange: H
          }
        ),
        S === "amenity" && /* @__PURE__ */ G(
          G2,
          {
            className: i1.selectField,
            classNamePrefix: "custom",
            "aria-label": "Choose Amenity",
            options: Y,
            noOptionsMessage: () => "Amenity not found",
            placeholder: "Choose Amenity...",
            value: Y.find((L) => L.value === u.value) || null,
            onChange: z
          }
        )
      ] }),
      d === "custom" && /* @__PURE__ */ f1(z4, { children: [
        /* @__PURE__ */ f1("div", { className: i1.btnsGroup, children: [
          /* @__PURE__ */ G("button", { onClick: () => B("custom_text"), className: S === "custom_text" ? i1.active : "", children: "Text" }),
          /* @__PURE__ */ G("button", { onClick: () => B("custom_image"), className: S === "custom_image" ? i1.active : "", children: "Image" })
        ] }),
        S === "custom_image" && /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
          /* @__PURE__ */ G("label", { className: i1.label, children: "Image URL" }),
          /* @__PURE__ */ G("div", { className: i1.fieldWrapper, children: /* @__PURE__ */ G(
            "input",
            {
              name: "custom_image",
              type: "text",
              className: i1.textField,
              value: u.custom_image,
              onChange: b
            }
          ) })
        ] })
      ] }),
      (d === "retailer" && S === "retail_text" || d === "custom" && S === "custom_text") && /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
        /* @__PURE__ */ G("label", { className: i1.label, children: "Text" }),
        /* @__PURE__ */ G("div", { className: i1.fieldWrapper, children: /* @__PURE__ */ G(
          "textarea",
          {
            name: "custom_text",
            rows: 3,
            className: i1.textareaField,
            value: u.custom_text,
            onChange: b
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
      /* @__PURE__ */ G("label", { className: i1.label, children: "Size" }),
      /* @__PURE__ */ G("div", { className: i1.fieldWrapper, children: /* @__PURE__ */ f1("div", { className: i1.numberFieldGroup, children: [
        /* @__PURE__ */ G(
          "button",
          {
            className: `${i1.button} ${i1.decrement}`,
            onClick: () => h("size"),
            onMouseDown: () => N("size"),
            onMouseUp: () => T("size"),
            onMouseLeave: () => T("size"),
            children: "-"
          }
        ),
        /* @__PURE__ */ G(
          "input",
          {
            type: "number",
            value: u.size,
            onChange: (L) => I("size", L.target.value),
            className: i1.input
          }
        ),
        /* @__PURE__ */ G(
          "button",
          {
            className: `${i1.button} ${i1.increment}`,
            onClick: () => R("size"),
            onMouseDown: () => K("size"),
            onMouseUp: () => T("size"),
            onMouseLeave: () => T("size"),
            children: "+"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
      /* @__PURE__ */ G("label", { className: i1.label, children: "Rotate" }),
      /* @__PURE__ */ f1("div", { className: i1.fieldWrapper, children: [
        /* @__PURE__ */ f1("div", { className: i1.numberFieldGroup, children: [
          /* @__PURE__ */ G(
            "button",
            {
              className: `${i1.button} ${i1.decrement}`,
              onClick: () => h("rotate"),
              onMouseDown: () => N("rotate"),
              onMouseUp: () => T("rotate"),
              onMouseLeave: () => T("rotate"),
              children: "-"
            }
          ),
          /* @__PURE__ */ G(
            "input",
            {
              type: "number",
              value: u.rotate,
              onChange: (L) => I("rotate", L.target.value),
              className: i1.input
            }
          ),
          /* @__PURE__ */ G(
            "button",
            {
              className: `${i1.button} ${i1.increment}`,
              onClick: () => R("rotate"),
              onMouseDown: () => K("rotate"),
              onMouseUp: () => T("rotate"),
              onMouseLeave: () => T("rotate"),
              children: "+"
            }
          )
        ] }),
        /* @__PURE__ */ G(
          "button",
          {
            className: i1.rotateButton,
            onClick: () => k("rotate"),
            children: /* @__PURE__ */ G(w7, { size: 24 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
      /* @__PURE__ */ G("label", { className: i1.label, children: "Offset X" }),
      /* @__PURE__ */ G("div", { className: i1.fieldWrapper, children: /* @__PURE__ */ f1("div", { className: i1.numberFieldGroup, children: [
        /* @__PURE__ */ G(
          "button",
          {
            className: `${i1.button} ${i1.decrement}`,
            onClick: () => h("offset_x"),
            onMouseDown: () => N("offset_x"),
            onMouseUp: () => T("offset_x"),
            onMouseLeave: () => T("offset_x"),
            children: "-"
          }
        ),
        /* @__PURE__ */ G(
          "input",
          {
            type: "number",
            value: u.offset_x,
            onChange: (L) => I("offset_x", L.target.value),
            className: i1.input
          }
        ),
        /* @__PURE__ */ G(
          "button",
          {
            className: `${i1.button} ${i1.increment}`,
            onClick: () => R("offset_x"),
            onMouseDown: () => K("offset_x"),
            onMouseUp: () => T("offset_x"),
            onMouseLeave: () => T("offset_x"),
            children: "+"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
      /* @__PURE__ */ G("label", { className: i1.label, children: "Offset Y" }),
      /* @__PURE__ */ G("div", { className: i1.fieldWrapper, children: /* @__PURE__ */ f1("div", { className: i1.numberFieldGroup, children: [
        /* @__PURE__ */ G(
          "button",
          {
            className: `${i1.button} ${i1.decrement}`,
            onClick: () => h("offset_y"),
            onMouseDown: () => N("offset_y"),
            onMouseUp: () => T("offset_y"),
            onMouseLeave: () => T("offset_y"),
            children: "-"
          }
        ),
        /* @__PURE__ */ G(
          "input",
          {
            type: "number",
            value: u.offset_y,
            onChange: (L) => I("offset_y", L.target.value),
            className: i1.input
          }
        ),
        /* @__PURE__ */ G(
          "button",
          {
            className: `${i1.button} ${i1.increment}`,
            onClick: () => R("offset_y"),
            onMouseDown: () => K("offset_y"),
            onMouseUp: () => T("offset_y"),
            onMouseLeave: () => T("offset_y"),
            children: "+"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
      /* @__PURE__ */ G("label", { className: i1.label, children: "BG Color" }),
      /* @__PURE__ */ G("div", { className: i1.fieldWrapper, children: /* @__PURE__ */ f1("div", { className: i1.colorFieldGroup, children: [
        /* @__PURE__ */ G(
          "input",
          {
            type: "color",
            name: "bg_color",
            className: i1.colorField,
            value: u.bg_color,
            onChange: b
          }
        ),
        /* @__PURE__ */ G(
          "input",
          {
            type: "text",
            name: "bg_color",
            className: i1.inputField,
            value: u.bg_color,
            onChange: b
          }
        )
      ] }) })
    ] }),
    ["retail_name", "custom_text", "retail_text", "kiosk", "amenity"].includes(u.layer_type) && /* @__PURE__ */ f1("div", { className: i1.sidebarField, children: [
      /* @__PURE__ */ f1("label", { className: i1.label, children: [
        ["kiosk", "amenity"].includes(u.layer_type) ? "Icon" : "Text",
        " Color"
      ] }),
      /* @__PURE__ */ G("div", { className: i1.fieldWrapper, children: /* @__PURE__ */ f1("div", { className: i1.colorFieldGroup, children: [
        /* @__PURE__ */ G(
          "input",
          {
            name: "text_color",
            type: "color",
            className: i1.colorField,
            value: u.text_color,
            onChange: b
          }
        ),
        /* @__PURE__ */ G(
          "input",
          {
            type: "text",
            name: "text_color",
            className: i1.inputField,
            value: u.text_color,
            onChange: b
          }
        )
      ] }) })
    ] })
  ] }) }) : null;
}, Ra = L4((e, l) => {
  const { selectedActiveObjectId: t, setSelectedActiveObjectId: o, onMapDataUpdate: n, onChangeCameraControlPosition: r, handleClickOnRetailer: q } = e, [c, i] = c1(!1), [a, s] = c1(""), [m, v] = c1(!1), [A, x] = c1(-1), [p, d] = c1([]), [_, S] = c1(f4), [g, u] = c1(0), [f, E] = c1("desktop"), [C, w] = c1(!1), [F, D] = c1(!1), [, e1] = A9(), [j, l1] = c1(0), [$, Q] = c1(""), [Z, J] = c1(""), [P, q1] = c1(null), [, B] = c1(0), M = v1(null), W = v1(null);
  W.current = g;
  const H = v1(null), z = r1((o1) => {
    B(o1);
  }, []), { setMapConfig: I, refetchMapData: b, mapApiResponse: h, mapConfig: R, floorsData: k, setMeshObject: N, indexedKiosks: K, initialFloorsDataIsLoaded: T } = r4(), t1 = r1((o1) => {
    x(o1);
  }, [x]), U = Ll(), { meshParams: Y, storeLogos: L, textParams: V, allSvgObjectIds: O } = U, y = v1(null), [n1, a1] = c1(null), [, I1] = c1(0), y1 = r1(() => {
    I1((o1) => o1 + 1);
  }, []), [N1, P1] = c1(!1);
  f6(l, () => {
    var o1, u1;
    return {
      refetchMapData: b,
      createRouteToAmenity: g2,
      createRouteToStore: (o1 = H.current) == null ? void 0 : o1.createRouteToStore,
      getInitialDistance: (u1 = H.current) == null ? void 0 : u1.getInitialDistance,
      resetMap: K6,
      setMapConfig: I,
      refreshState: D
    };
  });
  const b1 = r1((o1) => {
    R.ROLE === "DISPLAY_APP" ? E("display_app") : R.ROLE === "PORTAL_RESPONSIVE" ? E(R.DEVICE) : o1 > 1024 ? E("desktop") : o1 > 767 ? E("tablet") : E("mobile");
  }, [R]);
  p1(() => {
    if (M.current) {
      const o1 = M.current.offsetWidth;
      u(o1), b1(o1);
      const u1 = () => {
        if (M.current) {
          const _1 = M.current.offsetWidth;
          u(_1), b1(_1);
        }
      };
      return window.addEventListener("resize", u1), u1(), () => {
        window.removeEventListener("resize", u1);
      };
    }
  }, [M.current, F, b1]);
  const [j1, e4, P4] = W1(() => {
    let o1 = "", u1 = null, _1 = k.length ? k.length - 1 : 0;
    if (K[R.KIOSK_ID]) {
      const O1 = K[R.KIOSK_ID].map_obj_name, M1 = Y == null ? void 0 : Y.flat().find((J1) => J1.object_id === O1);
      M1 && (u1 = M1.mesh, _1 = M1.floor_index);
    } else
      R.ROLE === "DEMO" && console.error("Kiosk not found in config");
    return [u1, _1, o1];
  }, [R, Y, k, K]), H1 = A > -1 && A < k.length ? A : e4;
  p1(() => {
    var _1;
    let o1;
    const u1 = ((_1 = k[H1]) == null ? void 0 : _1.id) || null;
    u1 && R.CAMERA_CONTROLS_STATES.perFloor && R.CAMERA_CONTROLS_STATES.perFloor[u1] ? o1 = R.CAMERA_CONTROLS_STATES.perFloor[u1] : o1 = R.CAMERA_CONTROLS_STATES, R.ROLE === "DISPLAY_APP" ? S(JSON.parse(JSON.stringify(o1.display_app))) : R.ROLE === "WP_SITE" ? S(JSON.parse(JSON.stringify(f === "desktop" ? o1.desktop : f === "tablet" ? o1.tablet : o1.mobile))) : R.ROLE === "PORTAL_RESPONSIVE" && (R.DEVICE === "desktop" ? S(JSON.parse(JSON.stringify(o1.desktop))) : R.DEVICE === "display_app" ? S(JSON.parse(JSON.stringify(o1.display_app))) : R.DEVICE === "mobile" ? S(JSON.parse(JSON.stringify(o1.mobile))) : R.DEVICE === "tablet" && S(JSON.parse(JSON.stringify(o1.tablet))));
  }, [f, R, H1, k]);
  const p2 = r1((o1) => {
    var _1;
    const u1 = ((_1 = k[H1]) == null ? void 0 : _1.id) || null;
    r && r(R.CAMERA_CONTROLS_STATES, o1, u1);
  }, [r, H1, k, R.CAMERA_CONTROLS_STATES]);
  let F4 = "", B4 = R.DEFAULT_SELECTED_STORE ?? "";
  t ? (B4 = t, F4 = a) : $ && (B4 = "", F4 = a);
  const h3 = r1((o1, u1) => {
    d((_1) => {
      const O1 = _1.findIndex((M1) => M1.data.map_obj_name === u1.map_obj_name);
      return O1 !== -1 ? _1[O1] = { index: o1, data: { ...u1 } } : _1.push({ index: o1, data: { ...u1 } }), [..._1];
    });
  }, []), N7 = r1((o1) => {
    e.onSubmit && e.onSubmit(o1, b);
  }, [e, b]);
  p1(() => {
    document.body.style.cursor = n1 ? "pointer" : "default";
  }, [n1]);
  const K6 = r1((o1 = !1) => {
    var u1, _1;
    o(""), s(""), Q(""), l1(0), t1(e4), H.current && (R.ROLE === "PORTAL_RESPONSIVE" ? (u1 = H == null ? void 0 : H.current) == null || u1.resetCamera(o1) : (_1 = H == null ? void 0 : H.current) == null || _1.resetCamera(o1));
  }, [e4, t1, R.ROLE, o]);
  p1(() => {
    const o1 = [];
    Y.forEach((O1) => {
      O1.forEach((M1) => {
        (M1 == null ? void 0 : M1.mesh_type) === "kiosk" && o1.push(M1);
      });
    });
    const u1 = /* @__PURE__ */ new Map();
    L.filter((O1) => O1 !== void 0).forEach((O1) => {
      O1.forEach((M1) => {
        u1.set(M1.storeLogo.object_id, M1.storeLogo);
      });
    });
    const _1 = j1 == null ? void 0 : j1.object_id;
    o1.forEach((O1) => {
      const M1 = O1.mesh, J1 = u1.get("custom-layer-" + O1.object_id), l4 = h.map_objs.find((k7) => k7.map_obj_name === M1.object_id);
      M1 && J1 && J1.userData.kioskConfig !== null && (J1.userData.kioskConfig = {
        lockSize: l4 == null ? void 0 : l4.lock_size,
        blink: O1.object_id === _1,
        size: l4 ? l4.size : R.KIOSK_SIZE,
        floorIndex: M1.floor_index
      }, J1.userData.distanceFactor = l4 != null && l4.lock_size ? 1500 : void 0, J1.visible = !0);
    });
  }, [L, Y, j1, R, h.map_objs]), p1(() => {
    if (n) {
      const o1 = [];
      p.forEach((u1) => {
        o1.push({ ...u1.data });
      });
    }
  }, [p, n]), p1(() => {
    document.body.style.cursor = m ? "pointer" : "auto";
  }, [m]), p1(() => {
    R != null && R.SELECTED_RETAILER_ID && C && l1(R.SELECTED_RETAILER_ID);
  }, [R, C]), p1(() => {
    if (R && j > 0) {
      const o1 = h.retailers.find((u1) => u1.id === j);
      if (o1) {
        const u1 = h.map_objs.find((O1) => O1.retailer_id === o1.id), _1 = Y == null ? void 0 : Y.flat().find((O1) => O1.object_id === (u1 == null ? void 0 : u1.map_obj_name));
        _1 && x(_1.floor_index), u1 && o(u1.map_obj_name);
      }
    }
  }, [R, o, j, Y, h.map_objs, h.retailers]);
  const G4 = r1((o1) => {
    var M1, J1;
    const u1 = (M1 = V[H1]) == null ? void 0 : M1.find((l4) => l4.textMesh.object_id === `${D2}${o1.object_id}`), _1 = (J1 = L[H1]) == null ? void 0 : J1.find((l4) => l4.storeLogo.object_id === `${D2}${o1.object_id}`);
    let O1 = null;
    u1 && (O1 = {
      svgShapeMeshObject: o1,
      textImageMeshObject: u1.textMesh
    }), _1 && (O1 = {
      svgShapeMeshObject: o1,
      textImageMeshObject: _1.storeLogo
    }), N(O1);
  }, [L, V, N, H1]);
  p1(() => {
    var o1, u1;
    if (Y && Y.length && t) {
      const _1 = (u1 = (o1 = Y[H1]) == null ? void 0 : o1.find((O1) => O1.object_id === t)) == null ? void 0 : u1.mesh;
      _1 && G4(_1);
    }
  }, [Y, G4, t, H1]);
  const g2 = r1((o1, u1) => {
    o(""), s(""), Q(o1), u1 && (J(u1), R.ROLE === "DISPLAY_APP" && o(u1)), R.ROLE === "WP_SITE" && P1(!0);
  }, [R.ROLE, o]), p3 = r1((o1, u1, _1) => {
    var O1;
    if (!_1 && R.ROLE === "DISPLAY_APP" && q && ((O1 = o1.mesh_type) != null && O1.startsWith("store"))) {
      const M1 = h.map_objs.find((J1) => J1.map_obj_name === o1.object_id && J1.obj_type === "retailer");
      if (M1) {
        const J1 = h.retailers.find((l4) => l4.id === M1.retailer_id);
        J1 && q(J1.id);
      }
      return !1;
    }
    R.ROLE === "DISPLAY_APP" && j1 && t1(e4), e1(() => {
      G4(o1), o(u1 ?? ""), i((M1) => !M1), l1(0), Q(""), s("");
    });
  }, [e4, j1, q, t1, G4, h.map_objs, h.retailers, R.ROLE, o]), M7 = r1((o1) => {
    if (o1.stopPropagation(), o1.delta > 15)
      return;
    const u1 = o1.object.object_id, _1 = h.map_objs.find((O1) => O1.map_obj_name === u1);
    _1 && _1.layer_type === "amenity" ? (g2(_1.value, u1), R.ROLE === "PORTAL" && (G4(o1.object), o(u1 ?? ""))) : (p3(o1.object, u1 ?? ""), R.ROLE !== "PORTAL" && !R.KIOSK_ID && (_1 != null && _1.retailer_id) && P1(!0));
  }, [R, g2, o, G4, p3, h.map_objs]), L7 = r1((o1) => {
    o1.stopPropagation(), v(!0), o1.object.userData.storeName !== "" && a1(o1.object);
  }, []), P7 = r1((o1) => {
    o1.stopPropagation(), a1(null), v(!1), y && y.current && (y.current.style.display = "none");
  }, []), q4 = v1({ x: null, y: null, distance: -1 / 0 }), F7 = r1((o1) => {
    if (o1.stopPropagation(), o1.buttons > 0) {
      if (q4.current.x === null && (q4.current.x = o1.clientX), q4.current.y === null && (q4.current.y = o1.clientY), q4.current.x !== null && q4.current.y !== null) {
        let u1 = Math.sqrt(Math.pow(q4.current.x - o1.clientX, 2) + Math.pow(q4.current.y - o1.clientY, 2));
        u1 > q4.current.distance && (q4.current.distance = u1);
      }
    } else
      q4.current.x = q4.current.y = null, q4.current.distance = -1 / 0;
    y && y.current && o1.object.userData.storeName && o1.object.userData.storeName !== "" ? (y.current.style.top = `${o1.offsetY - 65}px`, y.current.style.left = `${o1.offsetX}px`, y.current.style.display = "block") : y.current && (y.current.style.display = "none");
  }, []), e2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    whiteSpace: "nowrap"
  }, B7 = r1((o1, u1) => {
    s(o1), u1 && o(u1 || ""), P1(!1);
  }, [s, P1, o]);
  if (!T)
    return /* @__PURE__ */ G("div", { className: "messageStyle", style: e2, children: "Map loading, please wait..." });
  if (k.length <= 0)
    return /* @__PURE__ */ G("div", { className: "messageStyle", style: e2, children: "Map doesn't have any floors" });
  if (!Y.length)
    return R.ROLE === "WP_SITE" ? /* @__PURE__ */ G("div", { className: "messageStyle", style: e2, children: "No Map for Center" }) : /* @__PURE__ */ G("div", { className: "messageStyle", style: e2, children: "Map loading, please wait..." });
  if (P4)
    return /* @__PURE__ */ G("div", { className: "messageStyle", style: e2, children: P4 });
  !j1 && R.ROLE === "DEMO" && console.error("NO KIOSK OBJECT FOUND");
  const G7 = U;
  let g3 = n1, e8 = "";
  return g3 && g3.object_id && (e8 = g3.object_id), /* @__PURE__ */ f1(z4, { children: [
    R.ROLE === "PORTAL" && /* @__PURE__ */ G("div", { className: `mapBoxSidebar ${I4.mapBoxSidebar} ${t ? I4.active : ""}`, children: /* @__PURE__ */ G("div", { className: `sidebarWrapper ${I4.sidebarWrapper}`, children: /* @__PURE__ */ G("div", { className: `sidebarBox ${I4.sidebarBox}`, children: t ? /* @__PURE__ */ G(
      Sa,
      {
        floorIndex: H1,
        meshFloors: U,
        setData: h3,
        selectedId: t,
        onSubmit: N7,
        onResetData: e.onResetData,
        onChangeData: e.onChangeData,
        onNewData: e.onNewData,
        triggerSceneUpdate: y1
      }
    ) : null }) }) }),
    /* @__PURE__ */ f1("div", { ref: M, className: `mapBox ${I4.mapBox}`, children: [
      /* @__PURE__ */ G(
        nt,
        {
          selectedFloorIndex: H1,
          handleFloorChange: t1,
          reset: K6,
          zoomIn: () => q1({ direction: "in" }),
          zoomOut: () => q1({ direction: "out" }),
          amenitiesList: q3,
          handleAmenityClick: g2,
          onExtractedAmenities: e.onExtractedAmenities
        }
      ),
      /* @__PURE__ */ f1(W7, { style: { position: "absolute", top: 0, left: 0 }, flat: !0, children: [
        Number(R.STATS) ? /* @__PURE__ */ G(ae, { className: I4.stats }) : null,
        /* @__PURE__ */ G(Pl, { background: R.MAP_BACKGROUND_COLOR }),
        /* @__PURE__ */ G(Fl, { near: 1, far: R.CAMERA.far, fov: R.CAMERA.fov }),
        /* @__PURE__ */ G("ambientLight", { intensity: 4, color: "#c4c4c4" }),
        /* @__PURE__ */ G("directionalLight", { position: [0, 400, 0], color: "#ffffff", intensity: 0.3 }),
        /* @__PURE__ */ G("directionalLight", { position: [0, 0, 400], color: "#c4c4c4", intensity: 0.2 }),
        /* @__PURE__ */ G("directionalLight", { position: [0, 0, -400], color: "#c4c4c4", intensity: 0.2 }),
        /* @__PURE__ */ G(
          Yl,
          {
            meshFloors: G7,
            activeObjectId: B4,
            hoverObjectId: e8,
            currKioskObj: j1,
            currKioskFloorIndex: e4,
            routeTargetId: B4,
            routeTargetFromId: F4,
            currentFloorIndex: H1,
            onPointerEnter: L7,
            onPointerLeave: P7,
            onPointerMove: F7,
            onClick: M7,
            handleChangeFloor: t1,
            selectedAmenityType: $,
            escalatorNodes: U.escalator_nodes,
            zoom: P,
            handleCameraLength: z,
            ref: H,
            cameraControlsPosition: _,
            handleCameraAndControlsChange: p2,
            isSelectedRetailerSlug: !0,
            setIsCameraInit: w,
            handleObjectClick: p3,
            triggerClick: c,
            deviceType: f
          }
        )
      ] }),
      R.ROLE !== "DISPLAY_APP" && (R.ROLE !== "WP_SITE" || !["mobile", "tablet"].includes(f)) && /* @__PURE__ */ G(
        "div",
        {
          ref: y,
          className: `store-name-placeholder ${I4.storeNamePlaceholder}`,
          style: { display: n1 ? "block" : "none" },
          children: n1 && n1.userData.storeName
        }
      )
    ] }),
    R.ROLE === "WP_SITE" && /* @__PURE__ */ G(
      la,
      {
        show: N1,
        onHide: () => P1(!1),
        amenity: $,
        selectedAmenityMapObjName: Z,
        mapObjectName: t,
        onClickMapObj: B7,
        allSvgObjectIds: O
      }
    )
  ] });
}), za = "_mapBoxComponent_18958_1", Oa = "_tempImageRendering_18958_13", C9 = {
  mapBoxComponent: za,
  tempImageRendering: Oa
}, ns = (e) => {
  const {
    config: l,
    webApiURI: t,
    onSubmit: o,
    mapBoxRefObj: n,
    onChangeCameraControlPosition: r,
    onResetData: q,
    onChangeData: c,
    onNewData: i,
    mapApiResponseRef: a,
    onExtractedAmenities: s,
    handleClickOnRetailer: m
  } = e, [v, A] = Y1.useState(""), x = (d, _) => {
    o && o(d, _);
  };
  return /* @__PURE__ */ G(Sl, { mapApiResponseRef: a, initialData: {
    webApiBaseUrl: t,
    config: l
  }, children: /* @__PURE__ */ f1("div", { className: `mapBoxComponent ${C9.mapBoxComponent} MAP_ROLE_${l.ROLE}`, children: [
    /* @__PURE__ */ G(
      Ra,
      {
        ref: n,
        setSelectedActiveObjectId: A,
        selectedActiveObjectId: v,
        onSubmit: x,
        onResetData: q,
        onChangeData: c,
        onNewData: i,
        onChangeCameraControlPosition: r,
        onExtractedAmenities: s,
        handleClickOnRetailer: m
      }
    ),
    /* @__PURE__ */ f1("div", { className: "hide", children: [
      /* @__PURE__ */ G("div", { id: "map-special-svg-kiosk", dangerouslySetInnerHTML: { __html: K1.Kiosk } }),
      /* @__PURE__ */ G("div", { id: "map-special-svg-escalator", dangerouslySetInnerHTML: { __html: K1.Escalator } }),
      q3.map((d, _) => /* @__PURE__ */ G("div", { id: `map-special-svg-${d.type}`, dangerouslySetInnerHTML: { __html: d.svgCode } }, _))
    ] }),
    /* @__PURE__ */ G("div", { id: "temp-image-rendering", className: C9.tempImageRendering })
  ] }) });
};
export {
  ns as MapBox
};
//# sourceMappingURL=index.module.js.map
