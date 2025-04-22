import { useState, useEffect, useRef } from 'react';
import QRCodeStyling, { type Options, type DotType } from 'qr-code-styling';
import './styles.css';

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

  const handlePrint = () => window.print();

  return (
    <div className='app-container'>
      <h1 className='app-header'>QRCodie</h1>
      <div className='no-print'>
        <textarea
          className='border rounded p-2 w-full mb-4'
          placeholder='Enter text or URL to generate QR code'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
        />
        <div className='flex items-center mb-4 space-x-4'>
          <label>Size:</label>
          <input
            type='range'
            min={100}
            max={500}
            step={10}
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
          />
          <span>{qrSize}px</span>
        </div>
        <div className='flex items-center mb-4 space-x-4'>
          <label>Dot Style:</label>
          <select
            value={styleOptions.dotsOptions.type}
            onChange={(e) =>
              setStyleOptions((prev) => ({
                ...prev,
                dotsOptions: { ...prev.dotsOptions, type: e.target.value as DotType },
              }))
            }
          >
            <option value='square'>Square</option>
            <option value='dots'>Dots</option>
            <option value='rounded'>Rounded</option>
            <option value='classy'>Classy</option>
            <option value='extra-rounded'>Extra Rounded</option>
          </select>
        </div>
        <div className='flex items-center mb-4 space-x-4'>
          <label>Fore Color:</label>
          <input
            type='color'
            value={styleOptions.dotsOptions.color}
            onChange={(e) =>
              setStyleOptions((prev) => ({
                ...prev,
                dotsOptions: { ...prev.dotsOptions, color: e.target.value },
              }))
            }
          />
          <label>Back Color:</label>
          <input
            type='color'
            value={styleOptions.backgroundOptions.color}
            onChange={(e) =>
              setStyleOptions((prev) => ({
                ...prev,
                backgroundOptions: { color: e.target.value },
              }))
            }
          />
        </div>
        <button className='action-button mb-4' onClick={handlePrint}>
          Print QR Code
        </button>
      </div>
      <div
        id='qr-code-print-area'
        ref={containerRef}
        className='flex justify-center items-center'
      />
    </div>
  );
}

export default App;
