/**
 * constitution-check.ts
 *
 * CONSTITUTION.md に定められた禁止語・免責フッター等を機械的にチェックする。
 * 違反があれば exit(1) で処理を中断する。
 *
 * 実行: npm run check
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");

// ────────────────────────────────────────────────────────────
// スキャン対象ファイルパターン
// CONSTITUTION.md, docs/ACCEPTANCE_CRITERIA.md, scripts/ は除外
// ────────────────────────────────────────────────────────────
const SCAN_PATTERNS = [
  "app/**/*.tsx",
  "app/**/*.ts",
  "components/**/*.tsx",
  "components/**/*.ts",
  "constants/**/*.ts",
  "lib/**/*.ts",
  "README.md",
];

const EXCLUDE_PATHS = [
  "scripts/constitution-check.ts",
  "CONSTITUTION.md",
  "docs/ACCEPTANCE_CRITERIA.md",
  "node_modules",
  ".next",
];

// ────────────────────────────────────────────────────────────
// 禁止語リスト（CONSTITUTION.md 第3条に準拠）
// ────────────────────────────────────────────────────────────
const FORBIDDEN_WORDS: string[] = [
  "診断",
  "治療",
  "改善",
  "指導",
  "助言",
  "処方",
  "病名",
  "治す",
  "治り",
  "優れている",
  "劣っている",
  "正常",
  "異常",
];

/**
 * 否定文脈（免責文・否定表現）で禁止語が使われている場合は OK とする。
 * 例：「診断を行うものではありません」「正常異常の判定を含みません」はOK
 */
const NEGATION_CONTEXTS: string[] = [
  "ではありません",
  "を行うものではありません",
  "を含みません",
  "ではなく",
  "区別はありません",
  "ではない",
  "でもありません",
  "判定を含みません",
  "でもない",
];

/**
 * 行が否定文脈で禁止語を使用しているかどうか判定する。
 * 否定文脈であれば true を返す（= 許容する）。
 */
function isNegationContext(line: string): boolean {
  return NEGATION_CONTEXTS.some((neg) => line.includes(neg));
}

/**
 * .ts / .tsx ファイルのコメント行かどうかを判定する。
 * コメント行（// で始まる行、* で始まる行、/* で始まる行）は除外する。
 */
function isCommentLine(line: string, fileExt: string): boolean {
  if (![".ts", ".tsx"].includes(fileExt)) return false;
  const trimmed = line.trimStart();
  return (
    trimmed.startsWith("//") ||
    trimmed.startsWith("* ") ||
    trimmed.startsWith("*/") ||
    trimmed.startsWith("/*") ||
    trimmed === "*"
  );
}

// スコア評価文脈での「高い」「低い」を検出するパターン
// 単純文字列マッチだと誤検知が多いため、評価文脈を示す前後の語と組み合わせる
const SCORE_EVALUATION_PATTERNS: RegExp[] = [
  /スコアが(高い|低い)/,
  /(高い|低い)スコア/,
  /チャンネルが(高い|低い)/,
  /(高い|低い)チャンネル/,
  /能力が(高い|低い)/,
  /(高い|低い)能力/,
];

// 断定表現の警告パターン（exit(1) ではなく警告のみ）
const ASSERTIVE_WARNING_PATTERNS: RegExp[] = [
  /あなたは.*です。/,
  /必ず.*します/,
  /するべきです/,
  /しなければなりません/,
];

// ────────────────────────────────────────────────────────────
// ファイル収集
// ────────────────────────────────────────────────────────────
function collectFiles(): string[] {
  const results: string[] = [];

  function walkDir(dir: string, baseDir: string): void {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(ROOT, fullPath);

      // 除外パスチェック
      const excluded = EXCLUDE_PATHS.some(
        (ex) => relPath.startsWith(ex) || relPath === ex
      );
      if (excluded) continue;

      if (entry.isDirectory()) {
        walkDir(fullPath, baseDir);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (
          [".tsx", ".ts", ".md"].includes(ext) ||
          entry.name === "README.md"
        ) {
          results.push(fullPath);
        }
      }
    }
  }

  // app/, components/, constants/, lib/, README.md をスキャン
  const dirsToScan = ["app", "components", "constants", "lib"];
  for (const dir of dirsToScan) {
    walkDir(path.join(ROOT, dir), ROOT);
  }

  // README.md
  const readmePath = path.join(ROOT, "README.md");
  if (fs.existsSync(readmePath)) {
    results.push(readmePath);
  }

  return results;
}

// ────────────────────────────────────────────────────────────
// フッターチェック
// ────────────────────────────────────────────────────────────
function checkFooterInLayout(): { ok: boolean; message: string } {
  const layoutPath = path.join(ROOT, "app", "layout.tsx");
  if (!fs.existsSync(layoutPath)) {
    return { ok: false, message: "app/layout.tsx が見つかりません" };
  }

  const content = fs.readFileSync(layoutPath, "utf-8");

  // Footer コンポーネントのインポートと使用を確認
  const hasFooterImport = /import.*Footer/.test(content);
  const hasFooterUsage = /<Footer\s*\/>|<Footer>/.test(content);

  if (!hasFooterImport || !hasFooterUsage) {
    return {
      ok: false,
      message:
        "app/layout.tsx に Footer コンポーネントが含まれていません（AC-01 違反）",
    };
  }

  // フッターコンポーネント本体が免責文を含むか確認
  const footerPath = path.join(ROOT, "components", "Footer.tsx");
  if (!fs.existsSync(footerPath)) {
    return {
      ok: false,
      message: "components/Footer.tsx が見つかりません",
    };
  }

  const footerContent = fs.readFileSync(footerPath, "utf-8");
  const hasDisclaimer =
    footerContent.includes("医学的・心理学的な診断を行うものではありません") &&
    footerContent.includes("優劣・正常異常の判定を含みません") &&
    footerContent.includes("医療機関や専門家にご相談ください");

  if (!hasDisclaimer) {
    return {
      ok: false,
      message:
        "components/Footer.tsx の免責文が CONSTITUTION.md 第4条と一致しません",
    };
  }

  return { ok: true, message: "Footer チェック: OK" };
}

// ────────────────────────────────────────────────────────────
// チャンネル定義チェック
// ────────────────────────────────────────────────────────────
function checkChannelsFile(): { ok: boolean; message: string } {
  const channelsPath = path.join(ROOT, "constants", "channels.ts");
  if (!fs.existsSync(channelsPath)) {
    return {
      ok: false,
      message: "constants/channels.ts が見つかりません",
    };
  }

  const content = fs.readFileSync(channelsPath, "utf-8");

  // 必須キーの確認
  const requiredKeys: string[] = [
    "belief",
    "affect",
    "social",
    "imagination",
    "cognition",
    "physiology",
  ];
  for (const key of requiredKeys) {
    if (!content.includes(`"${key}"`)) {
      return {
        ok: false,
        message: `constants/channels.ts にチャンネルキー "${key}" が見つかりません`,
      };
    }
  }

  // 「入口」が使われていないことを確認
  if (content.includes("入口")) {
    return {
      ok: false,
      message:
        'constants/channels.ts に禁止語「入口」が含まれています（「対処」に統一）',
    };
  }

  // 3点コンテンツの確認
  const requiredFields = ["usefulScene", "overuseRisk", "oneMinuteWork"];
  for (const field of requiredFields) {
    if (!content.includes(field)) {
      return {
        ok: false,
        message: `constants/channels.ts に必須フィールド "${field}" が見つかりません`,
      };
    }
  }

  return { ok: true, message: "channels.ts チェック: OK" };
}

// ────────────────────────────────────────────────────────────
// メインチェック実行
// ────────────────────────────────────────────────────────────
function main(): void {
  console.log("=== BASIC-Ph Constitution Check ===\n");

  let hasError = false;
  let hasWarning = false;

  // 1. Footer チェック
  console.log("[1] Footerチェック（AC-01）");
  const footerResult = checkFooterInLayout();
  if (footerResult.ok) {
    console.log("  OK:", footerResult.message);
  } else {
    console.error("  NG:", footerResult.message);
    hasError = true;
  }

  // 2. channels.ts チェック
  console.log("\n[2] チャンネル定義チェック（AC-02 / AC-07）");
  const channelsResult = checkChannelsFile();
  if (channelsResult.ok) {
    console.log("  OK:", channelsResult.message);
  } else {
    console.error("  NG:", channelsResult.message);
    hasError = true;
  }

  // 3. 禁止語チェック
  console.log("\n[3] 禁止語チェック（AC-04）");
  const files = collectFiles();
  const forbiddenViolations: { file: string; line: number; word: string; text: string }[] = [];
  const scoreEvalViolations: { file: string; line: number; text: string }[] = [];
  const assertiveWarnings: { file: string; line: number; text: string }[] = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const relPath = path.relative(ROOT, filePath);

    const fileExt = path.extname(filePath);

    lines.forEach((line, idx) => {
      const lineNo = idx + 1;

      // コメント行はスキップ（コード説明のため禁止語が含まれる場合がある）
      if (isCommentLine(line, fileExt)) return;

      // 否定文脈（免責文・否定表現）はスキップ
      const inNegation = isNegationContext(line);

      // 禁止語チェック
      if (!inNegation) {
        for (const word of FORBIDDEN_WORDS) {
          if (line.includes(word)) {
            forbiddenViolations.push({
              file: relPath,
              line: lineNo,
              word,
              text: line.trim(),
            });
          }
        }
      }

      // スコア評価文脈での高い/低い
      for (const pattern of SCORE_EVALUATION_PATTERNS) {
        if (pattern.test(line)) {
          scoreEvalViolations.push({
            file: relPath,
            line: lineNo,
            text: line.trim(),
          });
        }
      }

      // 断定表現（警告）
      for (const pattern of ASSERTIVE_WARNING_PATTERNS) {
        if (pattern.test(line)) {
          assertiveWarnings.push({
            file: relPath,
            line: lineNo,
            text: line.trim(),
          });
        }
      }
    });
  }

  if (forbiddenViolations.length === 0) {
    console.log("  OK: 禁止語は検出されませんでした");
  } else {
    for (const v of forbiddenViolations) {
      console.error(`  NG: [${v.file}:${v.line}] 禁止語「${v.word}」検出`);
      console.error(`      ${v.text}`);
    }
    hasError = true;
  }

  if (scoreEvalViolations.length > 0) {
    console.log("\n  [スコア評価文脈の高い/低い]");
    for (const v of scoreEvalViolations) {
      console.error(`  NG: [${v.file}:${v.line}] スコア評価語検出`);
      console.error(`      ${v.text}`);
    }
    hasError = true;
  }

  // 4. 断定表現（警告のみ）
  if (assertiveWarnings.length > 0) {
    console.log("\n[4] 断定表現（警告・AC-03）");
    for (const w of assertiveWarnings) {
      console.warn(`  WARN: [${w.file}:${w.line}] 断定表現の可能性`);
      console.warn(`        ${w.text}`);
    }
    hasWarning = true;
  } else {
    console.log("\n[4] 断定表現チェック（AC-03）");
    console.log("  OK: 明確な断定表現は検出されませんでした");
  }

  // 5. CONSTITUTION.md の存在確認
  console.log("\n[5] CONSTITUTION.md 存在確認");
  if (fs.existsSync(path.join(ROOT, "CONSTITUTION.md"))) {
    console.log("  OK: CONSTITUTION.md が存在します");
  } else {
    console.error("  NG: CONSTITUTION.md が見つかりません");
    hasError = true;
  }

  // ────────────────────────────────────────────────────────
  // 結果サマリー
  // ────────────────────────────────────────────────────────
  console.log("\n=== 結果サマリー ===");
  if (!hasError && !hasWarning) {
    console.log("すべてのチェックが通過しました (exit 0)");
    process.exit(0);
  } else if (!hasError && hasWarning) {
    console.warn("警告があります。内容を確認してください。(exit 0)");
    process.exit(0);
  } else {
    console.error("\n違反があります。修正してから再度 npm run check を実行してください。(exit 1)");
    process.exit(1);
  }
}

main();
