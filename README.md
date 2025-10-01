# demo_image-js-tiff-in-browser

ブラウザ上でTIFFファイルをプレビューするデモアプリケーション

## 概要

このプロジェクトは、`tiff` ライブラリ（image-js/tiff）を使用してブラウザ上でTIFF画像をデコードし、プレビュー表示するReactアプリケーションのデモです。ドラッグ&ドロップでTIFFファイルをアップロードし、サムネイルとして表示できます。

## 主な機能

- TIFFファイルのドラッグ&ドロップアップロード
- ブラウザ上でのTIFFデコード
- サムネイルプレビュー表示

## 使用技術

- React 19
- TypeScript
- Vite (Rolldown)
- tiff (image-js/tiff) - TIFFデコードライブラリ
- react-dropzone - ファイルドロップゾーンUI

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# プレビュー
pnpm preview
```

## 使い方

1. アプリケーションを起動
2. ドロップゾーンにTIFFファイルをドラッグ&ドロップ、またはクリックしてファイルを選択
3. アップロードされたTIFF画像がサムネイルとして表示されます
