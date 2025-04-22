import { useAppContext } from './context';
import './styles.css';

function App() {
  const { count, increment } = useAppContext();

  return (
    <div>
      <h1>QRCodie</h1>
      <div className='card'>
        <button className='blue-button' onClick={increment}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
