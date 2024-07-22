import './app.css';
import { JSX } from 'preact/jsx-runtime';
import TheForm from './TheForm';

function App(): JSX.Element {
  return (
    <div class="app">
      <TheForm />
    </div>
  );
}

export default App;
