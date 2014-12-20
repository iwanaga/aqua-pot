aqua-pot
========

Monitor soil humidity. Notify via email when dried.

[@IT Arduino 始める Web 技術者のための IoT 入門 第３回目](http://www.atmarkit.co.jp/ait/articles/1408/01/news019.html) のコードです。

# インストール手順
## 1. MailGun のアカウントを作成する
http://www.mailgun.com/

Web API でメールを送信できるサービスです。
月 1 万通までは無料。

## 2. Node.js インストール
### Mac, Unix の場合
```bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash
nvm install 0.10
nvm alias default 0.10
```

### Windows の場合
http://nodejs.org/download/ からダウンロードしてインストール

## 3. 本プログラムをインストール
```bash
git clone https://github.com/iwanaga/aqua-pot.git
cd aqua-pot
npm install
npm install forever -g
```

## 4. 起動
### daemon 化しない場合
```bash
node main.js
```
Ctrl + C で停止

### daemon 化する場合
```bash
forever start main.js
```
停止するときは、下記を実行します
```bash
forever stopall
```
