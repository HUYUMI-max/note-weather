import { useState } from 'react';

interface Memo {
  id: number;
  text: string;
}

export const MemoList = () => {
  const [memo, setMemo] = useState<string>('');
  const [memos, setMemos] = useState<Memo[]>([]);

  const addMemo = () => {
    if (memo.trim() === '') return;
    setMemos([...memos, { id: Date.now(), text: memo }]);
    setMemo('');
  };

  const deleteMemo = (id: number) => {
    setMemos(memos.filter((m) => m.id !== id));
  };

  return (
    <div>
      <h2>メモリスト</h2>
      <input
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="メモを入力"
      />
      <button onClick={addMemo}>追加</button>

      <ul>
        {memos.map((m) => (
          <li key={m.id}>
            {m.text} <button onClick={() => deleteMemo(m.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
