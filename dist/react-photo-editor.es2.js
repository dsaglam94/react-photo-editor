import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import './components/style.css';/* empty css                       */
import { usePhotoEditor } from "./react-photo-editor.es3.js";
const modalHeaderButtonClasses = "rpe-text-gray-900 rpe-bg-white rpe-border rpe-border-gray-300 rpe-ml-2 focus:rpe-outline-hidden hover:rpe-bg-gray-100 focus:rpe-ring-4 focus:rpe-ring-gray-100 rpe-font-medium rpe-rounded-full rpe-text-sm rpe-px-2 rpe-py-1 dark:rpe-bg-gray-800 dark:rpe-text-white dark:rpe-border-gray-600 dark:hover:rpe-bg-gray-700 dark:hover:rpe-border-gray-600 dark:focus:rpe-ring-gray-700";
const ReactPhotoEditor = ({
  file,
  onSaveImage,
  allowColorEditing = true,
  allowFlip = true,
  allowRotate = true,
  allowZoom = true,
  allowDrawing = true,
  downloadOnSave,
  open,
  onClose,
  modalHeight,
  modalWidth,
  canvasHeight,
  canvasWidth,
  maxCanvasHeight,
  maxCanvasWidth,
  labels = {
    close: "Close",
    save: "Save",
    rotate: "Rotate",
    brightness: "Brightness",
    contrast: "Contrast",
    saturate: "Saturate",
    grayscale: "Grayscale",
    whiteBalance: "White Balance",
    reset: "Reset photo",
    flipHorizontal: "Flip photo horizontally",
    flipVertical: "Flip photo vertically",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    draw: "Draw",
    brushColor: "Choose brush color",
    brushWidth: "Choose brush width"
  }
}) => {
  const {
    canvasRef,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    saturate,
    setSaturate,
    grayscale,
    setGrayscale,
    whiteBalance,
    setWhiteBalance,
    rotate,
    setRotate,
    flipHorizontal,
    setFlipHorizontal,
    flipVertical,
    setFlipVertical,
    mode,
    setMode,
    setLineColor,
    lineColor,
    setLineWidth,
    lineWidth,
    isDragging,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleWheel,
    handleZoomIn,
    handleZoomOut,
    resetFilters,
    downloadImage,
    generateEditedFile
  } = usePhotoEditor({ file });
  useEffect(() => {
    resetFilters();
  }, [open]);
  const handleInputChange = (event, setValue, min, max) => {
    var _a;
    const value = parseInt((_a = event.target) == null ? void 0 : _a.value);
    if (!isNaN(value) && value >= min && value <= max) {
      setValue(value);
    }
  };
  const renderInputs = [
    {
      name: labels.rotate,
      value: rotate,
      setValue: setRotate,
      min: -180,
      max: 180,
      type: "range",
      id: "rotateInput",
      "aria-labelledby": "rotateInputLabel",
      hide: !allowRotate
    },
    {
      name: labels.brightness,
      value: brightness,
      setValue: setBrightness,
      min: 0,
      max: 200,
      type: "range",
      id: "brightnessInput",
      "aria-labelledby": "brightnessInputLabel",
      hide: !allowColorEditing
    },
    {
      name: labels.contrast,
      value: contrast,
      setValue: setContrast,
      min: 0,
      max: 200,
      type: "range",
      id: "contrastInput",
      "aria-labelledby": "contrastInputLabel",
      hide: !allowColorEditing
    },
    {
      name: labels.saturate,
      value: saturate,
      setValue: setSaturate,
      min: 0,
      max: 200,
      type: "range",
      id: "saturateInput",
      "aria-labelledby": "saturateInputLabel",
      hide: !allowColorEditing
    },
    {
      name: labels.whiteBalance,
      value: whiteBalance,
      setValue: setWhiteBalance,
      min: -100,
      max: 100,
      type: "range",
      id: "whiteBalanceInput",
      "aria-labelledby": "whiteBalanceInputLabel",
      hide: !allowColorEditing
    },
    {
      name: labels.grayscale,
      value: grayscale,
      setValue: setGrayscale,
      min: 0,
      max: 100,
      type: "range",
      id: "grayscaleInput",
      "aria-labelledby": "grayscaleInputLabel",
      hide: !allowColorEditing
    }
  ];
  const closeEditor = () => {
    resetFilters();
    if (onClose) {
      onClose();
    }
  };
  const saveImage = async () => {
    if (downloadOnSave) {
      downloadImage();
    }
    const editedFile = await generateEditedFile();
    editedFile && onSaveImage(editedFile);
    if (onClose) {
      onClose();
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "data-testid": "photo-editor-main",
        className: "photo-editor-main rpe-justify-center rpe-items-center rpe-flex rpe-overflow-auto rpe-fixed rpe-inset-0 rpe-z-50",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              height: modalHeight ?? "38rem",
              width: modalWidth ?? "40rem"
            },
            id: "photo-editor-modal",
            className: "rpe-relative rpe-rounded-lg rpe-shadow-lg rpe-max-sm:w-[22rem] rpe-bg-white dark:rpe-bg-[#1e1e1e]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "rpe-flex rpe-justify-end rpe-p-2 rpe-rounded-t", children: [
                /* @__PURE__ */ jsx("button", { className: modalHeaderButtonClasses, onClick: closeEditor, type: "button", children: labels.close }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: modalHeaderButtonClasses,
                    onClick: () => void saveImage(),
                    type: "button",
                    "data-testid": "save-button",
                    children: labels.save
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "rpe-p-2", children: /* @__PURE__ */ jsxs("div", { className: "rpe-flex rpe-flex-col", children: [
                /* @__PURE__ */ jsx(
                  "canvas",
                  {
                    style: {
                      width: canvasWidth ?? "auto",
                      height: canvasHeight ?? "auto",
                      maxHeight: maxCanvasHeight ?? "22rem",
                      maxWidth: maxCanvasWidth ?? "36rem"
                    },
                    className: `rpe-canvas rpe-touch-none rpe-border dark:rpe-border-gray-700 rpe-object-fill rpe-mx-auto 
											${mode === "draw" ? "rpe-cursor-crosshair" : isDragging ? "rpe-cursor-grabbing" : "rpe-cursor-grab"}`,
                    "data-testid": "image-editor-canvas",
                    id: "rpe-canvas",
                    ref: canvasRef,
                    onPointerDown: handlePointerDown,
                    onPointerMove: handlePointerMove,
                    onPointerUp: handlePointerUp,
                    onPointerLeave: handlePointerUp,
                    onWheel: handleWheel,
                    width: typeof canvasWidth === "number" ? canvasWidth : void 0,
                    height: typeof canvasHeight === "number" ? canvasHeight : void 0
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "rpe-items-center rpe-flex rpe-m-1 rpe-flex-col", children: /* @__PURE__ */ jsx("div", { className: "rpe-flex rpe-flex-col rpe-bottom-12 rpe-gap-1 rpe-mt-4 rpe-max-sm:w-72 rpe-w-11/12 rpe-absolute ", children: renderInputs.map(
                  (input) => !input.hide && /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "rpe-flex rpe-flex-row rpe-items-center",
                      children: [
                        /* @__PURE__ */ jsxs(
                          "label",
                          {
                            id: `${input.name}InputLabel`,
                            className: "rpe-text-xs rpe-font-medium rpe-text-gray-900 dark:rpe-text-white rpe-w-10",
                            htmlFor: input.id,
                            children: [
                              input.name[0].toUpperCase() + input.name.slice(1),
                              ":",
                              " "
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            id: input.id,
                            type: input.type,
                            value: input.value,
                            step: "1",
                            onChange: (e) => handleInputChange(e, input.setValue, input.min, input.max),
                            min: input.min,
                            max: input.max,
                            className: "rpe-ml-[1.7rem] rpe-w-full rpe-h-1 rpe-bg-gray-200 rpe-rounded-lg rpe-appearance-none rpe-cursor-pointer rpe-range-sm dark:rpe-bg-gray-700",
                            "aria-labelledby": `${input.name}InputLabel`,
                            "aria-valuemin": input.min,
                            "aria-valuemax": input.max,
                            "aria-valuenow": input.value
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "number",
                            value: input.value,
                            onChange: (e) => handleInputChange(e, input.setValue, input.min, input.max),
                            min: input.min,
                            max: input.max,
                            className: "rpe-w-14 rpe-ml-2 rpe-rounded-md rpe-text-right rpe-bg-gray-100 rpe-text-black dark:rpe-bg-gray-700 dark:rpe-text-white",
                            "aria-labelledby": `${input.name}InputLabel`,
                            "aria-valuemin": input.min,
                            "aria-valuemax": input.max,
                            "aria-valuenow": input.value
                          }
                        )
                      ]
                    },
                    input.name
                  )
                ) }) }),
                /* @__PURE__ */ jsx("div", { className: "rpe-flex rpe-justify-center rpe-items-center rpe-content-center", children: /* @__PURE__ */ jsxs("div", { className: "rpe-absolute rpe-bottom-0 rpe-mt-2 rpe-flex rpe-items-center", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      title: labels.reset,
                      className: "rpe-mx-1 focus:rpe-ring-2 focus:rpe-ring-gray-300 dark:focus:rpe-ring-gray-700 rpe-rounded-md rpe-p-1",
                      onClick: resetFilters,
                      "aria-label": labels.reset,
                      type: "button",
                      children: /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          className: "lucide lucide-rotate-ccw dark:rpe-stroke-slate-200",
                          children: [
                            /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
                            /* @__PURE__ */ jsx("path", { d: "M3 3v5h5" })
                          ]
                        }
                      )
                    }
                  ),
                  allowFlip && /* @__PURE__ */ jsxs("div", { className: "rpe-inline-block", "data-testid": "flip-btns", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "rpe-mx-1 focus:rpe-ring-2 focus:rpe-ring-gray-300 dark:focus:rpe-ring-gray-700 rpe-rounded-md rpe-p-1",
                        onClick: () => setFlipHorizontal(!flipHorizontal),
                        type: "button",
                        title: labels.flipHorizontal,
                        "aria-label": labels.flipHorizontal,
                        children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "lucide lucide-flip-horizontal dark:rpe-stroke-slate-200",
                            children: [
                              /* @__PURE__ */ jsx("path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" }),
                              /* @__PURE__ */ jsx("path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" }),
                              /* @__PURE__ */ jsx("path", { d: "M12 20v2" }),
                              /* @__PURE__ */ jsx("path", { d: "M12 14v2" }),
                              /* @__PURE__ */ jsx("path", { d: "M12 8v2" }),
                              /* @__PURE__ */ jsx("path", { d: "M12 2v2" })
                            ]
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "rpe-mx-1 focus:rpe-ring-2 focus:rpe-ring-gray-300 dark:focus:rpe-ring-gray-700 rpe-rounded-md rpe-p-1",
                        onClick: () => setFlipVertical(!flipVertical),
                        type: "button",
                        title: labels.flipVertical,
                        "aria-label": labels.flipVertical,
                        children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "lucide lucide-flip-vertical dark:rpe-stroke-slate-200",
                            children: [
                              /* @__PURE__ */ jsx("path", { d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" }),
                              /* @__PURE__ */ jsx("path", { d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" }),
                              /* @__PURE__ */ jsx("path", { d: "M4 12H2" }),
                              /* @__PURE__ */ jsx("path", { d: "M10 12H8" }),
                              /* @__PURE__ */ jsx("path", { d: "M16 12h-2" }),
                              /* @__PURE__ */ jsx("path", { d: "M22 12h-2" })
                            ]
                          }
                        )
                      }
                    )
                  ] }),
                  allowZoom && /* @__PURE__ */ jsxs("div", { className: "rpe-inline-block", "data-testid": "zoom-btns", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "data-testid": "zoom-in",
                        type: "button",
                        className: "rpe-mx-1 focus:rpe-ring-2 focus:rpe-ring-gray-300 dark:focus:rpe-ring-gray-700 rpe-rounded-md rpe-p-1",
                        onClick: handleZoomIn,
                        title: labels.zoomIn,
                        "aria-label": labels.zoomIn,
                        children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "lucide lucide-zoom-in dark:rpe-stroke-slate-200",
                            children: [
                              /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                              /* @__PURE__ */ jsx("line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }),
                              /* @__PURE__ */ jsx("line", { x1: "11", x2: "11", y1: "8", y2: "14" }),
                              /* @__PURE__ */ jsx("line", { x1: "8", x2: "14", y1: "11", y2: "11" })
                            ]
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "data-testid": "zoom-out",
                        type: "button",
                        className: "rpe-mx-1 focus:rpe-ring-2 focus:rpe-ring-gray-300 dark:focus:rpe-ring-gray-700 rpe-rounded-md rpe-p-1",
                        onClick: handleZoomOut,
                        title: labels.zoomOut,
                        "aria-label": labels.zoomOut,
                        children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "lucide lucide-zoom-out dark:rpe-stroke-slate-200",
                            children: [
                              /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                              /* @__PURE__ */ jsx("line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }),
                              /* @__PURE__ */ jsx("line", { x1: "8", x2: "14", y1: "11", y2: "11" })
                            ]
                          }
                        )
                      }
                    )
                  ] }),
                  allowDrawing && /* @__PURE__ */ jsxs("div", { className: "rpe-flex rpe-items-center", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "data-testid": "draw-btn",
                        type: "button",
                        className: "rpe-mx-1 focus:rpe-ring-2 focus:rpe-ring-gray-300 dark:focus:rpe-ring-gray-700 rpe-rounded-md rpe-p-1",
                        onClick: () => mode == "pan" ? setMode("draw") : setMode("pan"),
                        title: labels.draw,
                        "aria-label": labels.draw,
                        children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "lucide lucide-brush dark:rpe-stroke-slate-200",
                            children: [
                              /* @__PURE__ */ jsx("path", { d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" }),
                              /* @__PURE__ */ jsx("path", { d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" })
                            ]
                          }
                        )
                      }
                    ),
                    mode == "draw" && /* @__PURE__ */ jsxs("div", { className: "rpe-flex rpe-items-center dark:rpe-bg-zinc-600 rpe-bg-zinc-200 rpe-p-1 rpe-rounded-md", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "color",
                          onChange: (e) => setLineColor(e.target.value),
                          className: "rpe-mx-1 rpe-w-6 rpe-h-6 rpe-rounded-sm focus:rpe-ring-2 focus:rpe-ring-gray-300 dark:focus:rpe-ring-gray-700",
                          id: "rpe-brush-color",
                          value: lineColor,
                          title: labels.brushColor,
                          "aria-label": labels.brushColor
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          title: labels.brushWidth,
                          "aria-label": labels.brushWidth,
                          onChange: (e) => handleInputChange(e, setLineWidth, 2, 100),
                          className: "rpe-w-12 rpe-ml-2 rpe-rounded-md rpe-text-right rpe-bg-gray-100 rpe-text-black dark:rpe-bg-gray-700 dark:rpe-text-white rpe-mx-1 rpe-p-0 rpe-text-sm",
                          id: "rpe-brush-width",
                          value: lineWidth,
                          min: 2,
                          max: 100
                        }
                      )
                    ] })
                  ] })
                ] }) })
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "rpe-opacity-75 rpe-fixed rpe-inset-0 rpe-z-40 rpe-bg-black" })
  ] }) });
};
export {
  ReactPhotoEditor
};
