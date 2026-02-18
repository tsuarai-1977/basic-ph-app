# BASIC-Ph セルフ理解ツール

多次元対処モデル **BASIC-Ph** に基づく自己理解・自己対処の可視化ツールです。

> **本ツールは医学的・心理学的な評価・判定（診断）を行うものではありません。**
> チャンネルに優劣・正常異常の区別はありません。
> 詳細は [CONSTITUTION.md](./CONSTITUTION.md) を参照してください。

---

## 概要

BASIC-Ph（Belief・Affect・Social・Imagination・Cognition・Physiology）は、
人がストレスや困難な状況に向き合うときに用いる対処のチャンネルを6つに整理したモデルです。

本ツールは28問への回答をもとに、**あなたが普段どのチャンネルを通じて心のバランスをとろうとしているか**を可視化します。

---

## 動かし方

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 憲法チェック（禁止語・フッター等の確認）

```bash
npm run check
```

CONSTITUTION.md に定められた禁止語・免責フッターの存在を機械的にチェックします。
CI/CDに組み込んで、変更のたびに実行することを推奨します。

### ビルド

```bash
npm run build
npm run start
```

---

## 画面遷移

```
/ (トップ) → /questions (28問・0〜4回答) → /result (結果表示) → /share (PDF出力)
```

---

## ファイル構成

```
.
├── CONSTITUTION.md               # 設計憲法（source of truth・改変禁止）
├── docs/
│   └── ACCEPTANCE_CRITERIA.md   # 受け入れ基準（AC）
├── constants/
│   ├── channels.ts               # 6チャンネル定義（source of truth）
│   └── questions.ts              # 28問定義
├── types/
│   └── index.ts                  # 型定義
├── lib/
│   ├── scoring.ts                # スコアリングロジック
│   └── storage.ts                # sessionStorage 操作
├── components/
│   └── Footer.tsx                # 免責フッター（全ページ表示）
├── app/
│   ├── layout.tsx                # ルートレイアウト（Footer 常時表示）
│   ├── page.tsx                  # トップページ
│   ├── questions/page.tsx        # 質問回答ページ
│   ├── result/page.tsx           # 結果表示ページ
│   └── share/page.tsx            # PDF出力ページ
└── scripts/
    └── constitution-check.ts     # 憲法チェックスクリプト
```

---

## 設計原則

- チャンネルに優劣・順位はありません
- すべての文言は「〜かもしれません」「〜することがあります」等、断定しない文体を基本とします
- 設計上の判断はすべて [CONSTITUTION.md](./CONSTITUTION.md) を参照します
- 結果文言は `constants/channels.ts` を唯一の正（source of truth）とし、独自生成・書き換えを行いません

---

## 免責事項

本ツールはBASIC-Phに基づく自己理解・自己対処の可視化を目的としており、医学的・心理学的な診断を行うものではありません。結果は「あなたの対処のあり方の傾向」を示す参考情報であり、優劣・正常異常の判定を含みません。心身の不調や専門的なサポートが必要と感じる場合は、医療機関や専門家にご相談ください。
