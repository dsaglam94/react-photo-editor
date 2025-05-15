import { useRef, useState, useEffect } from "react";
const usePhotoEditor = ({
  file,
  defaultBrightness = 100,
  defaultContrast = 100,
  defaultSaturate = 100,
  defaultGrayscale = 0,
  defaultWhiteBalance = 0,
  defaultFlipHorizontal = false,
  defaultFlipVertical = false,
  defaultZoom = 1,
  defaultRotate = 0,
  defaultLineColor = "#000000",
  defaultLineWidth = 2,
  defaultMode = "pan"
}) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());
  const [imageSrc, setImageSrc] = useState("");
  const [brightness, setBrightness] = useState(defaultBrightness);
  const [contrast, setContrast] = useState(defaultContrast);
  const [saturate, setSaturate] = useState(defaultSaturate);
  const [grayscale, setGrayscale] = useState(defaultGrayscale);
  const [whiteBalance, setWhiteBalance] = useState(defaultWhiteBalance);
  const [rotate, setRotate] = useState(defaultRotate);
  const [flipHorizontal, setFlipHorizontal] = useState(defaultFlipHorizontal);
  const [flipVertical, setFlipVertical] = useState(defaultFlipVertical);
  const [zoom, setZoom] = useState(defaultZoom);
  const [isDragging, setIsDragging] = useState(false);
  const [panStart, setPanStart] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [mode, setMode] = useState(defaultMode);
  const [drawStart, setDrawStart] = useState(null);
  const [lineColor, setLineColor] = useState(defaultLineColor);
  const [lineWidth, setLineWidth] = useState(defaultLineWidth);
  const drawingPathsRef = useRef([]);
  useEffect(() => {
    if (file) {
      const fileSrc = URL.createObjectURL(file);
      setImageSrc(fileSrc);
      return () => {
        URL.revokeObjectURL(fileSrc);
      };
    }
  }, [file]);
  useEffect(() => {
    applyFilter();
  }, [
    file,
    imageSrc,
    rotate,
    flipHorizontal,
    flipVertical,
    zoom,
    brightness,
    contrast,
    saturate,
    grayscale,
    whiteBalance,
    offsetX,
    offsetY
  ]);
  const redrawDrawingPaths = (context) => {
    drawingPathsRef.current.forEach(({ path, color, width }) => {
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = width;
      context.lineCap = "round";
      context.lineJoin = "round";
      path.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();
    });
  };
  const applyFilter = () => {
    if (!imageSrc) return;
    const canvas = canvasRef.current;
    const context = canvas == null ? void 0 : canvas.getContext("2d");
    const imgElement = imgRef.current;
    imgRef.current.src = imageSrc;
    imgRef.current.onload = applyFilter;
    imgElement.onload = () => {
      if (canvas && context) {
        const zoomedWidth = imgElement.width * zoom;
        const zoomedHeight = imgElement.height * zoom;
        const translateX = (imgElement.width - zoomedWidth) / 2;
        const translateY = (imgElement.height - zoomedHeight) / 2;
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.filter = getFilterString();
        context.save();
        if (rotate) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          context.translate(centerX, centerY);
          context.rotate(rotate * Math.PI / 180);
          context.translate(-centerX, -centerY);
        }
        if (flipHorizontal) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        if (flipVertical) {
          context.translate(0, canvas.height);
          context.scale(1, -1);
        }
        context.translate(translateX + offsetX, translateY + offsetY);
        context.scale(zoom, zoom);
        context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
        context.restore();
        if (whiteBalance !== 0) {
          const imageData = applyWhiteBalance(
            context.getImageData(0, 0, canvas.width, canvas.height)
          );
          context.putImageData(imageData, 0, 0);
        }
        context.filter = "none";
        redrawDrawingPaths(context);
      }
    };
  };
  const generateEditedFile = () => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas || !file) {
        resolve(null);
        return;
      }
      const fileExtension = (file.name.split(".").pop() || "").toLowerCase();
      let mimeType;
      switch (fileExtension) {
        case "jpg":
        case "jpeg":
          mimeType = "image/jpeg";
          break;
        case "png":
          mimeType = "image/png";
          break;
        default:
          mimeType = "image/png";
      }
      canvas.toBlob((blob) => {
        if (blob) {
          const newFile = new File([blob], file.name, { type: blob.type });
          resolve(newFile);
        } else {
          resolve(null);
        }
      }, mimeType);
    });
  };
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas && file) {
      const link = document.createElement("a");
      link.download = file.name;
      link.href = canvas.toDataURL(file == null ? void 0 : file.type);
      link.click();
    }
  };
  const getFilterString = () => {
    return `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%)`;
  };
  const applyWhiteBalance = (imageData) => {
    const data = imageData.data;
    const wbAmount = whiteBalance / 100;
    for (let i = 0; i < data.length; i += 4) {
      data[i] += 255 * wbAmount;
      data[i + 2] = data[i + 2] - 255 * wbAmount;
    }
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.min(255, Math.max(0, data[i]));
    }
    return imageData;
  };
  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };
  const handlePointerDown = (event) => {
    if (mode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      setDrawStart({ x, y });
      drawingPathsRef.current.push({ path: [{ x, y }], color: lineColor, width: lineWidth });
    } else {
      setIsDragging(true);
      const initialX = event.clientX - (flipHorizontal ? -offsetX : offsetX);
      const initialY = event.clientY - (flipVertical ? -offsetY : offsetY);
      setPanStart({ x: initialX, y: initialY });
    }
  };
  const handlePointerMove = (event) => {
    if (mode === "draw" && drawStart) {
      const canvas = canvasRef.current;
      const context = canvas == null ? void 0 : canvas.getContext("2d");
      const rect = canvas == null ? void 0 : canvas.getBoundingClientRect();
      if (!canvas || !context || !rect) return;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      const currentPath = drawingPathsRef.current[drawingPathsRef.current.length - 1].path;
      context.strokeStyle = lineColor;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.beginPath();
      context.moveTo(drawStart.x, drawStart.y);
      context.lineTo(x, y);
      context.stroke();
      setDrawStart({ x, y });
      currentPath.push({ x, y });
      return;
    }
    if (isDragging && panStart) {
      event.preventDefault();
      const offsetXDelta = event.clientX - panStart.x;
      const offsetYDelta = event.clientY - panStart.y;
      setOffsetX(flipHorizontal ? -offsetXDelta : offsetXDelta);
      setOffsetY(flipVertical ? -offsetYDelta : offsetYDelta);
    }
  };
  const handlePointerUp = () => {
    setIsDragging(false);
    setDrawStart(null);
  };
  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };
  const resetFilters = () => {
    setBrightness(defaultBrightness);
    setContrast(defaultContrast);
    setSaturate(defaultSaturate);
    setGrayscale(defaultGrayscale);
    setWhiteBalance(defaultWhiteBalance);
    setRotate(defaultRotate);
    setFlipHorizontal(defaultFlipHorizontal);
    setFlipVertical(defaultFlipVertical);
    setZoom(defaultZoom);
    setLineColor(defaultLineColor);
    setLineWidth(defaultLineWidth);
    drawingPathsRef.current = [];
    setOffsetX(0);
    setOffsetY(0);
    setPanStart(null);
    setIsDragging(false);
    setMode("pan");
    applyFilter();
  };
  return {
    /** Reference to the canvas element. */
    canvasRef,
    /** Source URL of the image being edited. */
    imageSrc,
    /** Current brightness level. */
    brightness,
    /** Current contrast level. */
    contrast,
    /** Current saturation level. */
    saturate,
    /** Current grayscale level. */
    grayscale,
    /** Current white balance level. */
    whiteBalance,
    /** Current rotation angle in degrees. */
    rotate,
    /** Flag indicating if the image is flipped horizontally. */
    flipHorizontal,
    /** Flag indicating if the image is flipped vertically. */
    flipVertical,
    /** Current zoom level. */
    zoom,
    /** Flag indicating if the image is being dragged. */
    isDragging,
    /** Starting coordinates for panning. */
    panStart,
    /** Current horizontal offset for panning. */
    offsetX,
    /** Current vertical offset for panning. */
    offsetY,
    /** Current mode ('pan' or 'draw') */
    mode,
    /** Current line color. */
    lineColor,
    /** Current line width. */
    lineWidth,
    /** Function to set the brightness level. */
    setBrightness,
    /** Function to set the contrast level. */
    setContrast,
    /** Function to set the saturation level. */
    setSaturate,
    /** Function to set the grayscale level. */
    setGrayscale,
    /** Function to set the white balance level. */
    setWhiteBalance,
    /** Function to set the rotation angle. */
    setRotate,
    /** Function to set the horizontal flip state. */
    setFlipHorizontal,
    /** Function to set the vertical flip state. */
    setFlipVertical,
    /** Function to set the zoom level. */
    setZoom,
    /** Function to set the dragging state. */
    setIsDragging,
    /** Function to set the starting coordinates for panning. */
    setPanStart,
    /** Function to set the horizontal offset for panning. */
    setOffsetX,
    /** Function to set the vertical offset for panning. */
    setOffsetY,
    /** Function to zoom in. */
    handleZoomIn,
    /** Function to zoom out. */
    handleZoomOut,
    /** Function to handle pointer down events. */
    handlePointerDown,
    /** Function to handle pointer up events. */
    handlePointerUp,
    /** Function to handle pointer move events. */
    handlePointerMove,
    /** Function to handle wheel events for zooming. */
    handleWheel,
    /** Function to download the edited image. */
    downloadImage,
    /** Function to generate the edited image file. */
    generateEditedFile,
    /** Function to reset filters and styles to default. */
    resetFilters,
    /** Function to apply filters and transformations. */
    applyFilter,
    /** Function to set the mode. */
    setMode,
    /** Function to set the line color. */
    setLineColor,
    /** Function to set the line width. */
    setLineWidth
  };
};
export {
  usePhotoEditor
};
