import { useState } from "react";
import axios from "axios";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedMusic, setGeneratedMusic] = useState("");

  const handleGenerate = async () => {
    const apiKey = import.meta.env.VITE_LOUDLY_API_KEY;

    try {
      const formData = new FormData();
      const musicPrompt =
        'Create a ${genre} song titled "${title}". Musical style: ${prompt}. High quality production with clear melody and rhythm.';
      formData.append("prompt", musicPrompt);
      formData.append("duration", "30");

      const response = await axios.post(
        "https://soundtracks.loudly.com/api/ai/prompt/songs",
        formData,
        {
          headers: {
            "API-KEY": apiKey,
          },
        }
      );

      if (response.data && response.data.music_file_path) {
        setGeneratedMusic(response.data.music_file_path);
      }
    } catch (error) {
      console.error("Error :", error);
      alert("音楽の生成中にエラーが発生しました。");
    }
  };

  return (
    <div>
      <h1>音楽作成ページ</h1>
      <div>
        <div>
          <label>楽曲タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="楽曲タイトルを入力"
          />
        </div>
        <div>
          <label>ジャンル</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">ジャンルを選択</option>
            <option value="electronic">エレクトロニック</option>
            <option value="jazz">ジャズ</option>
            <option value="classic">クラシック</option>
            <option value="ambient">アンビエント</option>
            <option value="rock">ロック</option>
            <option value="pop">ポップ</option>
          </select>
        </div>
      </div>

      <div>
        <label>音楽の説明</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="音楽の説明を入力"
        />
      </div>

      <button onClick={handleGenerate}>音楽を生成</button>

      {generatedMusic && (
        <div>
          <h3>生成された音楽</h3>
          <audio controls>
            <source src={generatedMusic} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default CreatePage;
