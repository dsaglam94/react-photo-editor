import { Dispatch } from 'react';
import { MutableRefObject } from 'react';
import { SetStateAction } from 'react';

export declare const ReactPhotoEditor: React.FC<ReactPhotoEditorProps>;

declare interface ReactPhotoEditorProps {
    /**
     * The input image file to be edited.
     */
    file: File | undefined;
    /**
     * Whether to allow color editing options.
     * @default true
     */
    allowColorEditing?: boolean;
    /**
     * Whether to allow rotation of the image.
     * @default true
     */
    allowRotate?: boolean;
    /**
     * Whether to allow flipping (horizontal/vertical) of the image.
     * @default true
     */
    allowFlip?: boolean;
    /**
     * Whether to allow zooming of the image.
     * @default true
     */
    allowZoom?: boolean;
    /**
     * Whether to enable drawing options.
     * @default true
     */
    allowDrawing?: boolean;
    /**
     * Whether to enable the option to download the edited image upon saving.
     * @default false
     */
    downloadOnSave?: boolean;
    /**
     * Whether the photo editor modal is open.
     * @default false
     */
    open?: boolean;
    /**
     * Function invoked when the photo editor modal is closed.
     */
    onClose?: () => void;
    /**
     * Function invoked when the edited image is saved.
     * @param image - The edited image file.
     */
    onSaveImage: (image: File) => void;
    /**
     * The height of the photo editor modal.
     * This can be specified as a number (pixels) or string (CSS value).
     * @default '38rem'
     */
    modalHeight?: number | string;
    /**
     * The width of the photo editor modal.
     * This can be specified as a number (pixels) or string (CSS value).
     * @default '40rem'
     */
    modalWidth?: number | string;
    /**
     * The width of the canvas element used for editing the image.
     * This can be specified as a number (pixels) or string (CSS value).
     * @default 'auto'
     */
    canvasWidth?: number | string;
    /**
     * The height of the canvas element used for editing the image.
     * This can be specified as a number or string (CSS value).
     * @default 'auto'
     */
    canvasHeight?: number | string;
    /**
     * The maximum height of the canvas element.
     * This can be specified as a number or string (CSS value).
     * @default '22rem'
     */
    maxCanvasHeight?: number | string;
    /**
     * The maximum width of the canvas element.
     * This can be specified as a number or string (CSS value).
     * @default '36rem'
     */
    maxCanvasWidth?: number | string;
    /**
     * Custom labels or text options for various elements in the photo editor.
     * Use this to override default text for buttons, tooltips, etc.
     *
     * Example:
     * labels: {
     *     close: 'Exit',
     *     save: 'Apply Changes',
     *     rotate: 'Turn',
     * }
     */
    labels?: ReactPhotoEditorTranslations;
}

declare interface ReactPhotoEditorTranslations {
    close: string;
    save: string;
    rotate: string;
    brightness: string;
    contrast: string;
    saturate: string;
    grayscale: string;
    whiteBalance: string;
    reset: string;
    flipHorizontal: string;
    flipVertical: string;
    zoomIn: string;
    zoomOut: string;
    draw: string;
    brushColor: string;
    brushWidth: string;
}

/**
 * Custom hook for handling photo editing within a canvas.
 *
 * @param {UsePhotoEditorParams} params - Configuration parameters for the hook.
 * @returns {Object} - Returns state and functions for managing image editing.
 */
export declare const usePhotoEditor: ({ file, defaultBrightness, defaultContrast, defaultSaturate, defaultGrayscale, defaultWhiteBalance, defaultFlipHorizontal, defaultFlipVertical, defaultZoom, defaultRotate, defaultLineColor, defaultLineWidth, defaultMode, }: UsePhotoEditorParams) => {
    /** Reference to the canvas element. */
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    /** Source URL of the image being edited. */
    imageSrc: string;
    /** Current brightness level. */
    brightness: number;
    /** Current contrast level. */
    contrast: number;
    /** Current saturation level. */
    saturate: number;
    /** Current grayscale level. */
    grayscale: number;
    /** Current white balance level. */
    whiteBalance: number;
    /** Current rotation angle in degrees. */
    rotate: number;
    /** Flag indicating if the image is flipped horizontally. */
    flipHorizontal: boolean;
    /** Flag indicating if the image is flipped vertically. */
    flipVertical: boolean;
    /** Current zoom level. */
    zoom: number;
    /** Flag indicating if the image is being dragged. */
    isDragging: boolean;
    /** Starting coordinates for panning. */
    panStart: {
        x: number;
        y: number;
    } | null;
    /** Current horizontal offset for panning. */
    offsetX: number;
    /** Current vertical offset for panning. */
    offsetY: number;
    /** Current mode ('pan' or 'draw') */
    mode: "pan" | "draw";
    /** Current line color. */
    lineColor: string;
    /** Current line width. */
    lineWidth: number;
    /** Function to set the brightness level. */
    setBrightness: Dispatch<SetStateAction<number>>;
    /** Function to set the contrast level. */
    setContrast: Dispatch<SetStateAction<number>>;
    /** Function to set the saturation level. */
    setSaturate: Dispatch<SetStateAction<number>>;
    /** Function to set the grayscale level. */
    setGrayscale: Dispatch<SetStateAction<number>>;
    /** Function to set the white balance level. */
    setWhiteBalance: Dispatch<SetStateAction<number>>;
    /** Function to set the rotation angle. */
    setRotate: Dispatch<SetStateAction<number>>;
    /** Function to set the horizontal flip state. */
    setFlipHorizontal: Dispatch<SetStateAction<boolean>>;
    /** Function to set the vertical flip state. */
    setFlipVertical: Dispatch<SetStateAction<boolean>>;
    /** Function to set the zoom level. */
    setZoom: Dispatch<SetStateAction<number>>;
    /** Function to set the dragging state. */
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    /** Function to set the starting coordinates for panning. */
    setPanStart: Dispatch<SetStateAction<    {
    x: number;
    y: number;
    } | null>>;
    /** Function to set the horizontal offset for panning. */
    setOffsetX: Dispatch<SetStateAction<number>>;
    /** Function to set the vertical offset for panning. */
    setOffsetY: Dispatch<SetStateAction<number>>;
    /** Function to zoom in. */
    handleZoomIn: () => void;
    /** Function to zoom out. */
    handleZoomOut: () => void;
    /** Function to handle pointer down events. */
    handlePointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => void;
    /** Function to handle pointer up events. */
    handlePointerUp: () => void;
    /** Function to handle pointer move events. */
    handlePointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => void;
    /** Function to handle wheel events for zooming. */
    handleWheel: (event: React.WheelEvent<HTMLCanvasElement>) => void;
    /** Function to download the edited image. */
    downloadImage: () => void;
    /** Function to generate the edited image file. */
    generateEditedFile: () => Promise<File | null>;
    /** Function to reset filters and styles to default. */
    resetFilters: () => void;
    /** Function to apply filters and transformations. */
    applyFilter: () => void;
    /** Function to set the mode. */
    setMode: Dispatch<SetStateAction<"pan" | "draw">>;
    /** Function to set the line color. */
    setLineColor: Dispatch<SetStateAction<string>>;
    /** Function to set the line width. */
    setLineWidth: Dispatch<SetStateAction<number>>;
};

/**
 * Parameters for the usePhotoEditor hook.
 */
declare interface UsePhotoEditorParams {
    /**
     * The image file to be edited.
     */
    file?: File;
    /**
     * Initial brightness level (default: 100).
     */
    defaultBrightness?: number;
    /**
     * Initial contrast level (default: 100).
     */
    defaultContrast?: number;
    /**
     * Initial saturation level (default: 100).
     */
    defaultSaturate?: number;
    /**
     * Initial grayscale level (default: 0).
     */
    defaultGrayscale?: number;
    /**
     * Initial white balance level (default: 0).
     */
    defaultWhiteBalance?: number;
    /**
     * Flip the image horizontally (default: false).
     */
    defaultFlipHorizontal?: boolean;
    /**
     * Flip the image vertically (default: false).
     */
    defaultFlipVertical?: boolean;
    /**
     * Initial zoom level (default: 1).
     */
    defaultZoom?: number;
    /**
     * Initial rotation angle in degrees (default: 0).
     */
    defaultRotate?: number;
    /**
     * Initial line color for drawing (default: '#000000').
     */
    defaultLineColor?: string;
    /**
     * Initial line width for drawing (default: 2).
     */
    defaultLineWidth?: number;
    /**
     * Initial mode for the canvas (default: 'pan').
     */
    defaultMode?: 'pan' | 'draw';
}

export { }
