import { MemoList } from './components/MemoList';
import { Weather } from './components/Weather';

export const App = () => {
  return (
    <div>
      <h1>React + TypeScript アプリ</h1>
      <MemoList />
      <Weather />
    </div>
  );
};
