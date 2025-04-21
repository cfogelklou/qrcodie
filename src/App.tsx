import { useCounter } from './context'
import './styles.css'

function App() {
  const { count, increment } = useCounter();

  return (
    <div>
      <h1>QRCodie</h1>
      <div className="card">
        <button onClick={increment}>
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