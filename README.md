# QRCodie - QR Code Generator

## Overview

QRCodie is a modern, fast Progressive Web App (PWA) built with React and TypeScript that allows users to quickly generate and customize QR codes from text or URLs. It offers real-time QR code generation with styling options and convenient printing capabilities.

## Features

- **Instant QR Code Generation:** QR codes update in real-time as you type.
- **Customization Options:**
  - Adjust QR code size with a slider (100px to 500px)
  - Choose from multiple dot styles (Square, Dots, Rounded, Classy, Extra-Rounded)
  - Select custom foreground and background colors
- **Print Functionality:** Optimized print view with just the QR code and its content.
- **Responsive Design:** Works great on mobile, tablet, and desktop.
- **PWA Support:** Can be installed as a standalone app on supported devices.

## Technology Stack

- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS
- **QR Code Generation:** qr-code-styling library
- **Build Tool:** Vite

## Usage

1. Enter text or a URL in the input field.
2. Customize the QR code appearance using the provided controls.
3. See the QR code update automatically as you type and change settings.
4. Click **Print QR Code** to print just the QR code and its content.

## Development

### Print Feature

- The application includes optimized print styling that:
  - Hides all UI controls when printing.
  - Centers the QR code on the page.
  - Displays the encoded text beneath the QR code for reference.

## UI/UX Guidelines

- **Simplicity:** Clean, focused interface with clear labels.
- **Instant Feedback:** QR code updates immediately as you type or change settings.
- **Accessibility:** Utilizes semantic HTML and maintains sufficient color contrast.
