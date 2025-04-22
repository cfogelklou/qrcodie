# README.md - QRCodie PWA Specification

## 1. Project Overview

**Project Name:** QRCodie

**Description:** QRCodie is a modern, simple, and fast Progressive Web App (PWA) built using Vite, React, and TypeScript. Its primary function is to generate QR codes from user-provided text data. The application emphasizes ease of use, performance, and offers customization options including styling, scaling, and printing of the generated QR codes.

**Target Platform:** Web (Desktop & Mobile), installable as a PWA.

**Goal:** This specification document serves as a blueprint for an AI agent to generate the complete source code for the QRCodie application.

## 2. Core Features

- **Real-time QR Code Generation:** The QR code should update instantly or with minimal delay as the user types text into the input field.
- **QR Code Display:** A clear and prominent display area for the generated QR code.
- **Customizable Scaling:** A user control (e.g., slider or number input) to adjust the visual size (dimensions) of the displayed QR code.
- **Print Functionality:** A dedicated "Print" button that triggers the browser's print dialog, optimized to print only the QR code or a clean view containing it.
- **QR Code Styling:** Options for the user to select different visual styles for the QR code (e.g., dot shapes, corner styles, foreground/background colors).
- **PWA Capabilities:** Implementation of essential PWA features:
  - Service worker for basic offline caching (app shell).
  - Web App Manifest for installability (add to home screen).
- **Responsive & Modern UI:** A clean, intuitive, and aesthetically pleasing interface that adapts seamlessly to various screen sizes (mobile, tablet, desktop).

## 3. Technology Stack

- **Build Tool:** Vite (latest stable version)
- **Framework/Library:** React (v18+ using functional components and hooks)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.0+
- **QR Code Generation Library:** **`qr-code-styling`**
  - **Reasoning:** This library is chosen for its high performance (renders to Canvas), extensive styling capabilities (dots, corners, gradients, colors, logos - though we'll start simple), and good compatibility with React/TypeScript.
- **PWA Implementation:** `vite-plugin-pwa`
- **State Management:** React Context API for managing shared state (input text, size, style options) if prop drilling becomes complex, otherwise standard component state is sufficient for this simple app.

## 5. Component Specifications

### 5.1. `App.tsx`

- **Responsibilities:**
  - Define the main application layout (e.g., using Tailwind CSS flexbox/grid).
  - Manage the core application state:
    - `inputText`: `string` (Text data from the user). Default: empty string or a placeholder like "Enter text here".
    - `qrSize`: `number` (Pixel dimension for the QR code width/height). Default: e.g., `300`.
    - `qrStyleOptions`: `object` (Configuration object for `qr-code-styling`, reflecting selected styles). Default: basic square dots, black on white.
  - Render `InputSection`, `ControlsSection`, and `QRCodeDisplay`.
  - Pass state values and update functions as props to child components.

### 5.2. `InputSection.tsx`

- **Props:** `inputText: string`, `setInputText: (text: string) => void`
- **Responsibilities:**
  - Render a `<textarea>` element for multi-line input.
  - Include a `placeholder` attribute (e.g., "Enter text or URL to generate QR code").
  - Use Tailwind CSS for styling (padding, border, rounded corners).
  - On change (`onChange` event), call `setInputText` to update the state in `App.tsx`.
  - Consider adding a label for accessibility.

### 5.3. `QRCodeDisplay.tsx`

- **Props:** `text: string`, `size: number`, `styleOptions: object`
- **Responsibilities:**
  - Render a container `div` (e.g., with `id="qr-code-container"`) where the QR code canvas will be appended. This `div` should also have an `id` suitable for printing (e.g., `id="qr-code-print-area"`).
  - Utilize the `useQRCode` custom hook (or manage `qr-code-styling` instance directly within `useEffect`).
  - The hook/component should:
    - Instantiate `QRCodeStyling` on mount.
    - Use `useEffect` hooks to watch for changes in `text`, `size`, and `styleOptions` props.
    - Call the `qrCodeInstance.update({...})` method with the new options when props change.
    - Call `qrCodeInstance.append(containerRef.current)` to attach the canvas to the container div.
    - Handle cleanup: ensure the QR code instance is properly handled on unmount if necessary.
  - Style the container using Tailwind CSS (e.g., center the QR code within it, add padding/margins).

### 5.4. `ControlsSection.tsx`

- **Props:** `size: number`, `setSize: (size: number) => void`, `styleOptions: object`, `setStyleOptions: (options: object) => void`, `onPrint: () => void`
- **Responsibilities:**
  - Render controls grouped logically (e.g., using flexbox and Tailwind spacing).
  - **Scale Control:**
    - A labeled slider (`<input type="range">`) to control `size`. Define `min`, `max`, `step`.
    - Display the current size value next to the slider.
    - On change, call `setSize`.
  - **Style Controls:**
    - Dropdown (`<select>`) or radio buttons for "Dot Style" (e.g., `square`, `dots`, `rounded`, `classy`, `extra-rounded`). Update `styleOptions.dotsOptions.type`.
    - (Optional) Color pickers (`<input type="color">`) for "Foreground Color" and "Background Color". Update `styleOptions.dotsOptions.color` and `styleOptions.backgroundOptions.color`. Start with just dot style if complexity is a concern.
    - On change, update the relevant part of the `styleOptions` object by calling `setStyleOptions`.
  - **Print Button:**
    - A styled `<button>` (using Tailwind CSS).
    - Label: "Print QR Code".
    - On click (`onClick`), call the `onPrint` function passed from `App.tsx`.

### 5.5. `useQRCode.ts` (Custom Hook - Recommended)

- **Purpose:** Encapsulate the logic for managing the `qr-code-styling` instance.
- **Parameters:** `containerRef: React.RefObject<HTMLDivElement>`, `options: object` (containing text, size, style)
- **Functionality:**
  - Manages the `QRCodeStyling` instance using `useRef`.
  - Uses `useEffect` to initialize the instance and append it to the `containerRef`.
  - Uses `useEffect` to watch for changes in `options` and call `qrCodeInstance.update()`.
  - Handles cleanup on unmount.
- **Returns:** (Optional) Could return the instance if direct access is needed elsewhere, but primarily manages side effects.

## 6. Functionality Details

### 6.1. QR Code Generation (`qr-code-styling`)

- Import `QRCodeStyling` from the library.
- Create an instance: `new QRCodeStyling({ width: ..., height: ..., data: ..., ...styleOptions })`.
- Use `qrInstance.append(domElement)` to attach the generated canvas.
- Use `qrInstance.update(newOptions)` to modify the QR code without recreating the canvas element (more performant).

### 6.2. Printing

- The `onPrint` function (likely defined in `App.tsx` and passed to `ControlsSection`) should simply call `window.print()`.
- Crucially, define print-specific CSS using `@media print` in `src/styles.css`:

  - Hide all elements by default (`body * { visibility: hidden; }`).
  - Make the QR code container (`#qr-code-print-area`) and its contents visible (`visibility: visible;`).
  - Position the container to take up the print page (`position: absolute; left: 0; top: 0; width: 100%; ...`).
  - Remove default margins/padding from `body` in print view.
  - Ensure elements _not_ meant for printing (like controls, input) are explicitly hidden (`display: none !important;`) or have a `.no-print` class applied.

  ```css
  /* Example Print Styles in styles.css */
  @media print {
    body * {
      visibility: hidden;
    }
    #qr-code-print-area,
    #qr-code-print-area * {
      visibility: visible;
    }
    #qr-code-print-area {
      position: absolute;
      left: 5%; /* Add some margin */
      top: 5%;
      width: 90%; /* Adjust as needed */
      height: auto;
      margin: 0;
      padding: 0;
      display: flex; /* Center the canvas if smaller than container */
      justify-content: center;
      align-items: center;
    }
    /* Add this class to elements to hide during print */
    .no-print {
      display: none !important;
    }
  }
  ```

  _Apply `id="qr-code-print-area"` to the `div` rendered by `QRCodeDisplay.tsx`. Apply `className="no-print"` to `InputSection` and `ControlsSection`._

## 7. UI/UX Guidelines

- **Layout:** Use Tailwind CSS for a responsive layout. Single column on small screens, potentially transitioning to two columns (e.g., controls/input left, QR code right) on larger screens (`md:` or `lg:` breakpoints).
- **Feedback:** The QR code update should feel instantaneous. No complex loading states needed unless `inputText` becomes extremely large.
- **Simplicity:** Keep the interface clean and focused. Avoid unnecessary visual elements. Use clear labels for all controls.
- **Accessibility:** Use semantic HTML where appropriate. Ensure sufficient color contrast. Add ARIA attributes if necessary, especially for custom controls.
- **Error Handling:** While basic, consider what happens if the QR code library fails (though unlikely for valid input). Display a simple error message in the QR code area.

## 8. Development & Build Scripts (Standard Vite)

- `bun install`: Install dependencies.
- `bun run dev`: Start the development server with HMR.
- `bun run build`: Create an optimized production build (in `/dist`).
- `bun run preview`: Serve the production build locally for testing.

## 9. Icon Generation

To ensure consistent branding, the application uses an AI-generated `.svg` icon as the base for generating `.png` icons. The `.svg` icon is located in the `public/` directory and is used to create `.png` icons of various sizes for the PWA manifest.

### Steps to Generate Icons

1. Place the AI-generated `.svg` icon in the `public/` directory. For example:

   ```
   public/icon.svg
   ```

2. Use the provided script to generate `.png` icons:

   ```bash
   ./scripts/convert-svg-to-png.sh
   ```

3. The script will generate `.png` icons in the `public/` directory with the required sizes (e.g., 192x192, 512x512) for the PWA manifest.

### Example SVG Icon

The `.svg` icon should be simple, scalable, and visually appealing.
