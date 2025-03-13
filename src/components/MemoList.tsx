import { useEffect, useState } from 'react';

interface Memo {
  id: number;
  text: string;
}

export const MemoList = () => {
  const [memo, setMemo] = useState<string>('');
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    console.log("ローカルデータの取得開始");
    const savedMemos = localStorage.getItem("memos");

    if (savedMemos !== null) {
      try {
          const parsedMemos: Memo[] = JSON.parse(savedMemos);
          console.log("ローカルストレージから取得したデータ:", parsedMemos);
          if (Array.isArray(parsedMemos)) {
            setMemos(parsedMemos);
          } else {
            console.warn("ローカルストレージのデータ形式が不正だったのでリセットします");
            setMemos([]);
          }
      } catch (error) {
          console.error("JSONのパースに失敗しました:", error);
          setMemos([]);
      // setMemos(JSON.parse(savedMemos));
      }
    }
  }, []);

  useEffect(() => {
    console.log("ローカルストレージに保存:", memos);
    if (memos.length > 0) {
    localStorage.setItem("memos", JSON.stringify(memos));
    }
  },[memos]);

  const addMemo = () => {
    if (memo.trim() === '') return;
    const newMemos =[...memos, { id: Date.now(), text: memo }];
    setMemos(newMemos);
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
