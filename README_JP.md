# PWPR STAT GRAPH

English README: [README.md](README.md)

## これは何?

ゲームの映像配信からデータを抽出してグラフに表示する個人プロジェクト。

- ゲーム: [eBASEBALL パワフルプロ野球 2022](https://www.konami.com/pawa/2022/)
  - 野球のゲーム
  - 特定のゲームモードのみに対応: 栄冠ナイン
    - 投手のみに対応
      - `球速`, `スタミナ`, `コントロール`のみ対応
    - ゲームを進めていく中でのステータスの増減をプロットする
    - 現在英語名のみ対応
    - 現在最初 5 投手のみ対応
    - ゲームイメージ
      ![gameplay-screenshot](/.github/readme/images/gameplay.jpg)

### スクリーンショット

ゲームを進めていく中で特定ステータスがどのように成長しているかをプロットしているグラフ。

![app-screenshot](/.github/readme/images/screenshot.png)

### 全体的なセットアップ

以下の図はデータ収集からグラフをプロットするまでに必要なセットアップを表している。

![entire-setup](/.github/readme/images/setup.jpg)

## 開発者向け

### 必要なもの

これは私の環境です。
他のハードウェア/ソフトウェアに変えてもいいですが、正常に動くかは保証しません。これは単純に私の環境で動いたものを記載しています。

- データ収集

  - 言語:
    - Python 3.10.4
  - ソフトウェア:
    - Tesseract 5.0.1
    - OBS 27.2.4 (配信キャプチャのため)
    - 配信キャプチャするために[OBS VirtualCam v2.0.5](https://obsproject.com/forum/resources/obs-virtualcam.949/) が必要
  - ハードウェア:
    - ハードウェア: ゲーム(Switch や Playstation など)から映像キャプチャするための[HDMI キャプチャボード](https://www.amazon.co.jp/gp/product/B089GZ4N48)

- API サーバー

  - 言語:
    - Python 3.10.4

- フロントエンド
  - node: v16.15.0 and above

### セットアップ

以下の Makefile コマンドを実行して dependency をインストールします。  
これで backend と frontend すべての dependency をインストールします。

```bash
$ make install
```

### データ収集

1. ゲームを起動する
1. OBS を起動してゲーム画面を表示する
   - OBS Virtual Camera を起動する
1. 以下のコマンドで配信からデータ収集を始める
   ```bash
   $ make start-accumulator
   ```
1. 栄冠ナインモードでゲームを遊ぶ
1. 終わったらデータ収集を終える(WIP:とりあえず今は`ctrl + c`で終える)
1. データは `{start_timestamp}.csv` の形で出力されている。

### API Dev Server を起動する

以下のコマンドで API Server を development モードで起動する。
サービスは `http://localhost:5000` で開始される。

```bash
$ make start-server
```

### Frontend Dev server を起動する

以下のコマンドで Frontend dev server を起動する。
サービスは `http://localhost:3000` で開始される。

```bash
$ make start-front
```

### ビルド

TODO: このアプリでビルドの説明は書かないかもしれない。なぜならローカル用でのみ使うので dev server で十分機能するからだ。
