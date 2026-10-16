import { useEffect, useRef, useState, type ReactElement } from 'react';
import QRCodeStyling, { type Options, type DotType } from 'qr-code-styling';
import './styles.css';

const DOT_STYLES: ReadonlyArray<{ value: DotType; label: string }> = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

function BrandMark(): ReactElement {
  return (
    <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true' focusable='false'>
      <path
        d='M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <rect x='8.5' y='8.5' width='7' height='7' rx='1.5' fill='currentColor' />
    </svg>
  );
}

function PrintIcon(): ReactElement {
  return (
    <svg viewBox='0 0 24 24' width='16' height='16' aria-hidden='true' focusable='false'>
      <path
        d='M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect x='6' y='14' width='12' height='7' rx='1' fill='none' stroke='currentColor' strokeWidth='1.75' />
    </svg>
  );
}

function DownloadIcon(): ReactElement {
  return (
    <svg viewBox='0 0 24 24' width='16' height='16' aria-hidden='true' focusable='false'>
      <path
        d='M12 3v12m0 0 5-5m-5 5-5-5'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M4 21h16' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' />
    </svg>
  );
}

function App() {
  const [inputText, setInputText] = useState('');
  const [qrSize, setQrSize] = useState(300);
  const [styleOptions, setStyleOptions] = useState({
    dotsOptions: { type: 'square' as DotType, color: '#000000' },
    backgroundOptions: { color: '#ffffff' },
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  // Initialize QRCodeStyling instance once
  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: qrSize,
      height: qrSize,
      data: inputText || ' ',
      ...styleOptions,
    } as Options);
    if (containerRef.current && qrCodeRef.current) {
      qrCodeRef.current.append(containerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- construct from initial state only, then update via the effect below
  }, []);

  // Update QR code on options change
  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.update({
        width: qrSize,
        height: qrSize,
        data: inputText || ' ',
        ...styleOptions,
      } as Partial<Options>);
    }
  }, [inputText, qrSize, styleOptions]);

  const hasContent = inputText.trim().length > 0;

  const handlePrint = () => window.print();

  const handleDownload = () => {
    qrCodeRef.current?.download({ name: 'qrcodie', extension: 'png' });
  };

  return (
    <div className='app'>
      <header className='app-header no-print'>
        <div className='brand'>
          <BrandMark />
          <h1>QRCodie</h1>
        </div>
        <p className='app-tagline'>
          Turn any text or URL into a custom QR code right in your browser, ready to print or download.
        </p>
      </header>

      <div className='app-main'>
        <section className='controls no-print' aria-label='QR code settings'>
          <div className='field'>
            <label className='field-label' htmlFor='qr-content'>
              Text or URL
            </label>
            <textarea
              id='qr-content'
              className='text-input'
              placeholder='Enter text or a URL to generate your QR code'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
            />
          </div>

          <div className='field'>
            <label className='field-label' htmlFor='qr-dot-style'>
              Dot style
            </label>
            <select
              id='qr-dot-style'
              value={styleOptions.dotsOptions.type}
              onChange={(e) =>
                setStyleOptions((prev) => ({
                  ...prev,
                  dotsOptions: { ...prev.dotsOptions, type: e.target.value as DotType },
                }))
              }
            >
              {DOT_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div className='field-colors'>
            <div className='field'>
              <label className='field-label' htmlFor='qr-fore-color'>
                Foreground
              </label>
              <div className='color-field'>
                <input
                  id='qr-fore-color'
                  type='color'
                  value={styleOptions.dotsOptions.color}
                  onChange={(e) =>
                    setStyleOptions((prev) => ({
                      ...prev,
                      dotsOptions: { ...prev.dotsOptions, color: e.target.value },
                    }))
                  }
                />
                <span className='color-hex'>{styleOptions.dotsOptions.color.toUpperCase()}</span>
              </div>
            </div>
            <div className='field'>
              <label className='field-label' htmlFor='qr-back-color'>
                Background
              </label>
              <div className='color-field'>
                <input
                  id='qr-back-color'
                  type='color'
                  value={styleOptions.backgroundOptions.color}
                  onChange={(e) =>
                    setStyleOptions((prev) => ({
                      ...prev,
                      backgroundOptions: { color: e.target.value },
                    }))
                  }
                />
                <span className='color-hex'>{styleOptions.backgroundOptions.color.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className='field'>
            <div className='field-header'>
              <label className='field-label' htmlFor='qr-size'>
                Size
              </label>
              <span className='size-value'>{qrSize} px</span>
            </div>
            <input
              id='qr-size'
              type='range'
              min={100}
              max={1024}
              step={4}
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
            />
          </div>
        </section>

        <section className='preview' aria-label='QR code preview'>
          <div className='print-container'>
            <div id='qr-code-print-area' ref={containerRef} className='qr-stage' />
            {!hasContent && (
              <p className='qr-hint' role='status'>
                Your QR code appears here
                <span className='qr-hint-sub'>Type text or a URL to get started.</span>
              </p>
            )}
            {/* Print-only: show the user's input text beneath the QR code */}
            <div className='print-only'>{inputText}</div>
          </div>
          <p className='preview-caption no-print'>
            {qrSize} × {qrSize} px
          </p>
          <div className='preview-actions no-print'>
            <button type='button' className='btn btn-primary' onClick={handlePrint} disabled={!hasContent}>
              <PrintIcon />
              Print QR code
            </button>
            <button type='button' className='btn btn-secondary' onClick={handleDownload} disabled={!hasContent}>
              <DownloadIcon />
              Download PNG
            </button>
          </div>
        </section>
      </div>

      <p className='app-footnote no-print'>
        Codes are generated entirely in your browser. Nothing you type is uploaded anywhere.
      </p>

    </div>
  );
}

export default App;
