# BASIC-Ph セルフ理解ツール

心理学モデル **BASIC-Ph** に基づいた、コーピングチャンネル自己診断 Web アプリです。

---

## BASIC-Ph とは

イスラエルの心理学者モリ・ラハド（Mooli Lahad）が提唱した、人が困難に対処するときに用いる **6つのチャンネル** のモデルです。

| チャンネル | 意味 |
|:--|:--|
| **B** — Belief | 信念・意味・価値観 |
| **A** — Affect | 感情・感情表現 |
| **S** — Social | 社会・対人関係 |
| **I** — Imagination | 想像力・創造性・ユーモア |
| **C** — Cognition | 思考・認知・分析 |
| **Ph** — Physical | 身体・生理 |

---

## 画面遷移（MVP）

```
[Start]
 ・モデル説明
 ・診断開始ボタン
    ↓
[Question] ×18問
 ・チャンネルバッジ付き質問文
 ・1〜5 のリッカートスケール
 ・進捗バー・前後ナビ
    ↓
[Result]
 ・レーダーチャート（6チャンネル）
 ・バースコア一覧＋コメント
 ・結果の localStorage 保存（最大10件）
 ・履歴一覧（折りたたみ）
```

---

## スコアリング

- 各チャンネルにつき 3問、5点満点 → **合計 15点** が上限
- `スコア = (合計 ÷ 15) × 100` で **0〜100点** に正規化
- 75点以上 → 高（主要なチャンネル）/ 45〜74点 → 中 / 44点以下 → 低

---

## 質問構成

```
B  (Belief)      : 3問 — 信念・意味・価値観軸
A  (Affect)      : 3問 — 感情認識・表現・活用軸
S  (Social)      : 3問 — 社会的サポート・つながり軸
I  (Imagination) : 3問 — 想像力・ユーモア・創造性軸
C  (Cognition)   : 3問 — 論理思考・情報整理・分析軸
Ph (Physical)    : 3問 — 身体ケア・運動・感覚軸
合計 18問
```

---

## セットアップ（ローカルで動かす手順）

### 必要なもの

- [Node.js](https://nodejs.org/) v18 以上
- npm（Node.js に同梱）

### 手順

```bash
# 1. リポジトリをクローン
git clone <このリポジトリのURL>
cd basic-ph-app

# 2. 依存パッケージをインストール
npm install

# 3. 開発サーバーを起動
npm run dev
```

起動後、ターミナルに表示される URL（通常 `http://localhost:5173`）をブラウザで開きます。

### ビルド（本番用）

```bash
npm run build
# → dist/ フォルダに静的ファイルが出力されます

npm run preview  # ローカルでビルド結果を確認
```

---

## ファイル構成

```
basic-ph-app/
├── index.html               # エントリーポイント HTML
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx             # React マウント
    ├── App.jsx              # 画面状態管理（start / question / result）
    ├── data/
    │   └── questions.js     # 質問データ・チャンネル定義・スケールラベル
    ├── utils/
    │   └── scoring.js       # スコア計算・コメント生成・localStorage 操作
    ├── components/
    │   ├── StartScreen.jsx  # 開始画面
    │   ├── QuestionForm.jsx # 質問フォーム（1問ずつ表示）
    │   └── ResultScreen.jsx # 結果表示（レーダー・バー・履歴）
    └── styles/
        └── main.css         # 全スタイル
```

---

## 技術スタック

| 技術 | 用途 |
|:--|:--|
| [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) | UI フレームワーク & 開発サーバー |
| [Chart.js 4](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) | レーダーチャート描画 |
| localStorage | 診断結果のブラウザ保存（最大10件） |
| Pure CSS | スタイリング（外部ライブラリ不使用） |

---

## 今後の拡張アイデア（後フェーズ）

- [ ] 質問数の増加・設問の精度向上（臨床監修）
- [ ] 時系列グラフ（変化の可視化）
- [ ] 結果の PDF 出力 / シェア機能
- [ ] 支援職向けモード（クライエント管理）
- [ ] バックエンド連携（アカウント保存・統計）
- [ ] 多言語対応（英語・アラビア語など）

---

## ライセンス

MIT

---

> ※ このツールは自己理解を目的としたものです。臨床的な診断・評価の代替ではありません。
