// 各ページのコンテンツを事前定義（ローカルファイルシステムでも動作）
const allPageContents = {
    'index.html': {
        title: 'Rails 継承チェーン ビジュアル化',
        keywords: ['Rails', '継承チェーン', 'ActiveRecord', 'ActionController', 'ActionView', 'Ruby on Rails', 'MVCモデル', 'ApplicationRecord', 'ApplicationController'],
        sections: [
            'Rails継承チェーンとは？',
            '初心者向けチャット形式解説',
            'MVCの継承構造',
            'ActiveRecordの継承チェーン',
            'ActionControllerの継承チェーン',
            'ActionViewの継承チェーン',
            'Applicationクラスの役割',
            'extend vs include の違い',
            'module (Concerns) の使い方'
        ],
        content: `Rails 継承チェーン ビジュアル化
        MVCモデル Ruby on Rails フレームワーク
        ActiveRecord Base ApplicationRecord モデル データベース
        ActionController Base ApplicationController コントローラー
        ActionView Base ビュー テンプレート ERB
        継承 inheritance extend include module mixin
        親クラス 子クラス superclass subclass
        オブジェクト指向 OOP クラス設計
        Concerns 共通処理 DRY原則`
    },
    'page2.html': {
        title: 'Rails 主要クラス完全ガイド',
        keywords: ['ActiveRecord', 'ActionController', 'ActionView', 'ActiveJob', 'ActionMailer', 'ActionCable', 'ActiveStorage', 'ActiveSupport'],
        sections: [
            'ActiveRecord主要クラス',
            'ActionController主要クラス',
            'ActionView主要クラス',
            'ActiveJob関連',
            'ActionMailer関連',
            'ActionCable関連',
            'ActiveStorage関連',
            'ActiveSupport関連'
        ],
        content: `Rails 主要クラス完全ガイド
        ActiveRecord::Base モデルの基底クラス
        ActiveRecord::Migration データベースマイグレーション
        ActiveRecord::Associations has_many belongs_to has_one
        ActiveRecord::Validations validates presence uniqueness
        ActiveRecord::Callbacks before_save after_create
        ActiveRecord::Scopes scope default_scope
        ActiveRecord::QueryMethods where order limit joins includes
        ActionController::Base コントローラーの基底クラス
        ActionController::Rendering render redirect_to
        ActionController::Parameters params strong parameters
        ActionController::Cookies cookies session
        ActionController::RequestForgeryProtection CSRF対策
        ActionController::Filters before_action after_action around_action
        ActionView::Base ビューの基底クラス
        ActionView::Helpers link_to form_with content_tag
        ActionView::Layouts layout yield content_for
        ActionView::Partials render partial collection
        ActiveJob::Base perform_later perform_now
        ActionMailer::Base deliver_now deliver_later
        ActionCable::Connection WebSocket接続
        ActionCable::Channel broadcast subscribe
        ActiveStorage::Blob ファイルアップロード
        ActiveStorage::Attachment has_one_attached has_many_attached
        ActiveSupport::Concern module include extend`
    },
    'page3.html': {
        title: 'Rails 対になるメソッド完全ガイド',
        keywords: ['create', 'destroy', 'save', 'delete', 'before', 'after', 'valid', 'invalid', 'has_many', 'belongs_to', 'add', 'remove', 'push', 'pop'],
        sections: [
            'データベース操作の対',
            'バリデーション・存在チェックの対',
            'コールバック（前後処理）の対',
            'アソシエーション（関連）の対',
            'マイグレーション（DB構造変更）の対',
            'ビュー・レンダリング系の対',
            'ActiveJob（非同期処理）の対',
            '文字列変換の対',
            'ルーティング系の対',
            'セッション・キャッシュの対',
            'テスト系の対',
            '時間・日付系の対',
            'WebSocket (ActionCable)系の対',
            'ActiveStorage（ファイル管理）の対'
        ],
        content: `Rails 対になるメソッド完全ガイド
        create destroy 作成 削除 CRUD操作
        save delete 保存 削除 データベース
        new build インスタンス生成
        find find_by 検索 取得
        first last 最初 最後
        valid? invalid? バリデーション 有効 無効
        present? blank? 存在 空
        empty? any? 空配列 要素あり
        nil? present? null チェック
        before_save after_save 保存前 保存後
        before_create after_create 作成前 作成後
        before_update after_update 更新前 更新後
        before_destroy after_destroy 削除前 削除後
        before_validation after_validation バリデーション前後
        has_many belongs_to 1対多 多対1
        has_one belongs_to 1対1 関連
        has_and_belongs_to_many 多対多
        add_column remove_column カラム追加 カラム削除
        add_index remove_index インデックス追加 削除
        create_table drop_table テーブル作成 削除
        up down マイグレーション 適用 戻す
        render redirect_to 表示 リダイレクト
        show hide 表示 非表示
        link_to button_to リンク ボタン
        form_with form_for フォーム生成
        perform_later perform_now 非同期実行 同期実行
        enqueue dequeue キュー追加 取り出し
        pluralize singularize 複数形 単数形
        capitalize downcase 大文字 小文字
        camelize underscore キャメルケース スネークケース
        resources resource RESTful単数 複数
        namespace scope 名前空間 スコープ
        get post put patch delete HTTPメソッド
        session.create session.destroy セッション開始 終了
        cache.write cache.read キャッシュ書き込み 読み込み
        cache.fetch cache.delete キャッシュ取得 削除
        setup teardown テスト準備 後処理
        assert refute アサート 否定
        stub mock スタブ モック
        beginning_of_day end_of_day 日付開始 終了
        ago from_now 過去 未来
        past? future? 過去判定 未来判定
        subscribe unsubscribe 購読 購読解除
        broadcast receive 送信 受信
        connect disconnect 接続 切断
        attach detach 添付 削除
        upload download アップロード ダウンロード
        purge delete_all ファイル削除`
    },
    'page4.html': {
        title: 'Rails クラス継承とディレクトリ構造',
        keywords: ['ディレクトリ', 'ファイル構造', 'app/models', 'app/controllers', 'app/views', 'Gemfile', '継承チェーン', 'ApplicationRecord', 'ApplicationController'],
        sections: [
            'Railsアプリケーションのディレクトリ構造',
            'クラス継承チェーンとファイルマッピング',
            '主要クラスとファイルパスの対応表',
            'Rails Gemファイルの場所と読み込み順序',
            '実際のコード例'
        ],
        content: `Rails クラス継承とディレクトリ構造
        rails_app app models controllers views jobs mailers channels helpers
        config routes.rb application.rb database.yml initializers
        db migrate schema.rb seeds.rb
        lib vendor Gemfile Gemfile.lock
        ActiveRecord::Base ApplicationRecord User Post Comment
        ActionController::Base ApplicationController UsersController
        ActiveJob::Base ApplicationJob EmailJob
        ActionMailer::Base ApplicationMailer UserMailer
        ActionCable::Channel ApplicationCable Connection
        gem activerecord actionpack actionview activejob
        actionmailer actioncable activestorage activesupport railties
        rbenv rvm gems ruby バージョン管理
        boot.rb environment.rb 初期化 読み込み順序`
    },
    'page5.html': {
        title: 'Rails プロパティとメソッドの継承',
        keywords: ['インスタンス変数', 'クラス変数', '@variable', '@@variable', 'attr_accessor', 'attr_reader', 'attr_writer', 'public', 'private', 'protected', 'super', 'method_missing', 'respond_to?'],
        sections: [
            'Ruby/Railsの変数の種類と継承',
            '実例：変数の継承動作',
            'アクセサメソッド（attr_*）',
            'メソッドの可視性と継承',
            'superキーワードの使い方',
            'メソッド解決順序 (Method Resolution Order)',
            'モジュールの継承（include, extend, prepend）',
            'Railsでよく使う継承パターン'
        ],
        content: `Rails プロパティとメソッドの継承
        ローカル変数 variable インスタンス変数 @variable
        クラス変数 @@variable クラスインスタンス変数
        グローバル変数 $variable 定数 CONSTANT
        attr_accessor attr_reader attr_writer
        ゲッター getter セッター setter アクセサ
        public private protected 可視性 visibility
        super 親クラス 呼び出し オーバーライド override
        method_missing respond_to? respond_to_missing?
        動的メソッド dynamic method metaprogramming
        ancestors 継承チェーン method resolution order MRO
        include extend prepend モジュール module mixin
        concern ActiveSupport::Concern
        abstract_class self.abstract_class = true
        継承 inheritance 多重継承 単一継承`
    },
    'page6.html': {
        title: 'Rails 継承チェーン 理解度テスト',
        keywords: ['テスト', 'クイズ', '理解度', '問題', '試験', 'quiz', 'test', 'assessment'],
        sections: [
            '基礎概念テスト',
            '主要クラステスト',
            '対になるメソッドテスト',
            'ディレクトリ構造テスト',
            'プロパティ継承テスト',
            '総合テスト'
        ],
        content: `Rails 継承チェーン 理解度テスト クイズ
        基礎概念 MVCモデル 継承チェーン
        ApplicationRecord ApplicationController
        ActiveRecord::Base ActionController::Base
        include extend prepend concern module
        対になるメソッド create destroy save delete
        before after valid invalid has_many belongs_to
        ディレクトリ構造 app/models app/controllers app/views
        db/migrate config/routes.rb Gemfile
        インスタンス変数 クラス変数 @variable @@variable
        attr_accessor attr_reader attr_writer
        public private protected super
        method_missing respond_to? MRO
        テスト問題 理解度チェック 学習確認
        スコア 正解 不正解 解説`
    }
};