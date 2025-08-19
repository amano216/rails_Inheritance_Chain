// Rails継承チェーン理解度テスト - 拡張版100問（コード読解60%以上）
const quizDataExtended = {
    // コード読解問題（60問以上）
    codeReading: [
        {
            id: 'cr1',
            question: '以下のコードで、Userクラスが継承しているクラスチェーンを正しく表しているものは？\n\n```ruby\nclass User < ApplicationRecord\n  has_many :posts\nend\n```',
            options: [
                'User → ApplicationRecord → ActiveRecord::Base → Object',
                'User → ActiveRecord::Base → ApplicationRecord → Object',
                'User → ApplicationRecord → Object → ActiveRecord::Base',
                'User → Object → ApplicationRecord → ActiveRecord::Base'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'UserはApplicationRecordを継承し、ApplicationRecordはActiveRecord::Baseを継承、最終的にObjectを継承します。'
        },
        {
            id: 'cr2',
            question: '以下のコードで定義されているApplicationRecordの役割は？\n\n```ruby\nclass ApplicationRecord < ActiveRecord::Base\n  self.abstract_class = true\nend\n```',
            options: [
                'データベーステーブルと直接紐付く具体的なモデル',
                '全モデルの共通基底クラス（抽象クラス）',
                'コントローラーの基底クラス',
                'ビューヘルパーのモジュール'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'self.abstract_class = trueにより、ApplicationRecordは抽象クラスとして機能し、全モデルの共通基底クラスとなります。'
        },
        {
            id: 'cr3',
            question: '以下のコントローラーコードで、before_actionはどこから継承されている？\n\n```ruby\nclass UsersController < ApplicationController\n  before_action :authenticate_user!\nend\n```',
            options: [
                'ApplicationController',
                'ActionController::Base',
                'ActiveRecord::Base',
                'ActionController::Callbacks'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'before_actionはActionController::Base（正確にはActionController::Callbacks）から継承されています。'
        },
        {
            id: 'cr4',
            question: '以下のコードでincludeとextendの違いを正しく説明しているものは？\n\n```ruby\nmodule Trackable\n  def track\n    puts "tracking"\n  end\nend\n\nclass Post < ApplicationRecord\n  include Trackable  # A\n  extend Trackable   # B\nend\n```',
            options: [
                'A: インスタンスメソッド追加、B: クラスメソッド追加',
                'A: クラスメソッド追加、B: インスタンスメソッド追加',
                'A,B共にインスタンスメソッド追加',
                'A,B共にクラスメソッド追加'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'includeはモジュールをインスタンスメソッドとして、extendはクラスメソッドとして追加します。'
        },
        {
            id: 'cr5',
            question: '以下のマイグレーションコードで、ActiveRecord::Migrationから継承される主な機能は？\n\n```ruby\nclass CreateUsers < ActiveRecord::Migration[7.0]\n  def change\n    create_table :users do |t|\n      t.string :name\n      t.timestamps\n    end\n  end\nend\n```',
            options: [
                'create_table, add_column, remove_columnなどのDDLメソッド',
                'find, where, orderなどのクエリメソッド',
                'validates, has_manyなどの関連付けメソッド',
                'render, redirect_toなどのレスポンスメソッド'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ActiveRecord::MigrationはDDL（Data Definition Language）メソッドを提供し、データベース構造を変更できます。'
        },
        {
            id: 'cr6',
            question: '以下のコードで、superの動作として正しいものは？\n\n```ruby\nclass AdminUser < User\n  def save\n    log_admin_action\n    super\n  end\nend\n```',
            options: [
                '親クラス（User）のsaveメソッドを呼び出す',
                'AdminUserクラスのsaveメソッドを再帰的に呼び出す',
                'saveメソッドの実行をスキップする',
                'エラーを発生させる'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'superは親クラスの同名メソッドを呼び出します。この場合、Userクラスのsaveメソッドが実行されます。'
        },
        {
            id: 'cr7',
            question: '以下のコードで、@userはどのスコープで有効？\n\n```ruby\nclass PostsController < ApplicationController\n  def index\n    @user = User.find(params[:user_id])\n    @posts = @user.posts\n  end\nend\n```',
            options: [
                'indexアクション内とそのビューテンプレート',
                'PostsController全体',
                'アプリケーション全体',
                'indexアクション内のみ'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'インスタンス変数@userは、アクション内とそれに対応するビューテンプレートで利用可能です。'
        },
        {
            id: 'cr8',
            question: '以下のコードで、ApplicationJobが継承している基底クラスは？\n\n```ruby\nclass SendEmailJob < ApplicationJob\n  queue_as :default\n  \n  def perform(user)\n    UserMailer.welcome(user).deliver_later\n  end\nend\n```',
            options: [
                'ActiveJob::Base',
                'ActionMailer::Base',
                'ActiveRecord::Base',
                'ActionController::Base'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ApplicationJobはActiveJob::Baseを継承し、非同期ジョブ処理の基本機能を提供します。'
        },
        {
            id: 'cr9',
            question: '以下のコードで、concernの利点として正しいものは？\n\n```ruby\nmodule Searchable\n  extend ActiveSupport::Concern\n  \n  included do\n    scope :search, ->(query) { where("name LIKE ?", "%#{query}%") }\n  end\nend\n\nclass Product < ApplicationRecord\n  include Searchable\nend\n```',
            options: [
                '複数のモデルで共通機能を再利用できる',
                'データベースのパフォーマンスが向上する',
                'メモリ使用量が削減される',
                'テストが不要になる'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'Concernを使うことで、複数のモデル間で共通の機能（この場合は検索機能）を簡単に共有できます。'
        },
        {
            id: 'cr10',
            question: '以下のコードで、has_manyとbelongs_toの関係を正しく説明しているものは？\n\n```ruby\nclass User < ApplicationRecord\n  has_many :posts\nend\n\nclass Post < ApplicationRecord\n  belongs_to :user\nend\n```',
            options: [
                '1人のUserが複数のPostを持ち、1つのPostは1人のUserに属する',
                '複数のUserが1つのPostを持ち、1つのPostは複数のUserに属する',
                '1人のUserが1つのPostを持ち、1つのPostは1人のUserに属する',
                '関連付けはされていない'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'has_many :postsは1対多の「1」側、belongs_to :userは「多」側を表します。'
        },
        {
            id: 'cr11',
            question: '以下のコードで、attr_accessorが生成するメソッドは？\n\n```ruby\nclass User < ApplicationRecord\n  attr_accessor :temp_password\nend\n```',
            options: [
                'temp_passwordとtemp_password=の両方',
                'temp_passwordのみ（getter）',
                'temp_password=のみ（setter）',
                'メソッドは生成されない'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'attr_accessorはgetterとsetterの両方のメソッドを生成します。'
        },
        {
            id: 'cr12',
            question: '以下のコードで、privateメソッドの特徴として正しいものは？\n\n```ruby\nclass User < ApplicationRecord\n  def public_method\n    private_method  # A\n  end\n  \n  private\n  \n  def private_method\n    "private"\n  end\nend\n\nuser = User.new\nuser.private_method  # B\n```',
            options: [
                'Aは動作するが、Bはエラーになる',
                'Aはエラーになるが、Bは動作する',
                'A、B共に動作する',
                'A、B共にエラーになる'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'privateメソッドはクラス内部からは呼び出せますが、外部から直接呼び出すことはできません。'
        },
        {
            id: 'cr13',
            question: '以下のコードで、ApplicationControllerが配置されるファイルパスは？\n\n```ruby\nclass ApplicationController < ActionController::Base\n  protect_from_forgery with: :exception\nend\n```',
            options: [
                'app/controllers/application_controller.rb',
                'app/models/application_controller.rb',
                'lib/controllers/application_controller.rb',
                'config/application_controller.rb'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ApplicationControllerはapp/controllers/application_controller.rbに配置されます。'
        },
        {
            id: 'cr14',
            question: '以下のコードで、before_saveコールバックの実行タイミングは？\n\n```ruby\nclass User < ApplicationRecord\n  before_save :normalize_email\n  \n  private\n  \n  def normalize_email\n    self.email = email.downcase\n  end\nend\n```',
            options: [
                'レコードが保存される直前（createとupdate両方）',
                'レコードが作成される時のみ',
                'レコードが更新される時のみ',
                'レコードが削除される直前'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'before_saveは新規作成（create）と更新（update）の両方で、保存直前に実行されます。'
        },
        {
            id: 'cr15',
            question: '以下のコードで、renderとredirect_toの違いとして正しいものは？\n\n```ruby\nclass UsersController < ApplicationController\n  def create\n    @user = User.new(user_params)\n    if @user.save\n      redirect_to @user  # A\n    else\n      render :new        # B\n    end\n  end\nend\n```',
            options: [
                'A: 新しいHTTPリクエスト発生、B: 同じリクエスト内でビュー表示',
                'A: 同じリクエスト内でビュー表示、B: 新しいHTTPリクエスト発生',
                'A、B共に新しいHTTPリクエスト発生',
                'A、B共に同じリクエスト内でビュー表示'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'redirect_toは新しいHTTPリクエストを発生させ、renderは現在のリクエスト内でビューを表示します。'
        },
        {
            id: 'cr16',
            question: '以下のコードで、scopeの定義として正しいものは？\n\n```ruby\nclass Post < ApplicationRecord\n  scope :published, -> { where(published: true) }\n  scope :recent, -> { order(created_at: :desc) }\nend\n```',
            options: [
                'クエリの再利用可能な名前付き条件',
                'データベースのインデックス',
                'バリデーションルール',
                'コールバックメソッド'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'scopeは再利用可能なクエリ条件に名前を付けて定義する機能です。'
        },
        {
            id: 'cr17',
            question: '以下のコードで、validates presenceの動作として正しいものは？\n\n```ruby\nclass User < ApplicationRecord\n  validates :email, presence: true\nend\n\nuser = User.new\nuser.valid?\n```',
            options: [
                'emailが空の場合、valid?はfalseを返す',
                'emailが空の場合、valid?はtrueを返す',
                'emailが空の場合、例外が発生する',
                'emailの形式をチェックする'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'validates :email, presence: trueは、emailフィールドが空でないことを検証します。'
        },
        {
            id: 'cr18',
            question: '以下のコードで、method_missingの用途として適切なものは？\n\n```ruby\nclass DynamicFinder\n  def method_missing(method_name, *args)\n    if method_name.to_s.start_with?("find_by_")\n      attribute = method_name.to_s.sub("find_by_", "")\n      find_by(attribute => args.first)\n    else\n      super\n    end\n  end\nend\n```',
            options: [
                '動的なメソッド呼び出しを処理する',
                'エラーログを記録する',
                'メソッドを削除する',
                'メソッドの実行速度を向上させる'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'method_missingは存在しないメソッドが呼ばれた時に実行され、動的なメソッド処理を可能にします。'
        },
        {
            id: 'cr19',
            question: '以下のコードで、ActiveRecord::Baseから継承される機能でないものは？\n\n```ruby\nclass Product < ApplicationRecord\n  # ActiveRecord::Baseの機能を利用\nend\n```',
            options: [
                'render, redirect_to',
                'find, where, order',
                'save, update, destroy',
                'validates, has_many'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'render, redirect_toはActionController::Baseの機能で、ActiveRecord::Baseには含まれません。'
        },
        {
            id: 'cr20',
            question: '以下のコードで、form_withヘルパーはどこから提供される？\n\n```erb\n<%= form_with model: @user do |form| %>\n  <%= form.text_field :name %>\n<% end %>\n```',
            options: [
                'ActionView::Helpers::FormHelper',
                'ActiveRecord::Base',
                'ActionController::Base',
                'ApplicationHelper'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'form_withはActionView::Helpers::FormHelperモジュールから提供されます。'
        },
        {
            id: 'cr21',
            question: '以下のコードで、belongs_toの:optionalオプションの効果は？\n\n```ruby\nclass Comment < ApplicationRecord\n  belongs_to :user, optional: true\nend\n```',
            options: [
                'userがnilでも保存を許可する',
                'userを自動的に作成する',
                'userとの関連を削除する',
                'userを必須にする'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'optional: trueを指定すると、関連付けられたオブジェクトがnilでも保存できます。'
        },
        {
            id: 'cr22',
            question: '以下のコードで、ActiveJob::Baseを継承することで得られる機能は？\n\n```ruby\nclass HardWorkerJob < ApplicationJob\n  queue_as :urgent\n  \n  def perform(*args)\n    # 重い処理\n  end\nend\n```',
            options: [
                'バックグラウンドでの非同期実行',
                'データベーストランザクション',
                'HTTPリクエスト処理',
                'ビューのレンダリング'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ActiveJob::Baseは非同期ジョブ実行のための基本機能を提供します。'
        },
        {
            id: 'cr23',
            question: '以下のコードで、preprendの特徴として正しいものは？\n\n```ruby\nmodule Loggable\n  def save\n    puts "Logging save action"\n    super\n  end\nend\n\nclass User < ApplicationRecord\n  prepend Loggable\nend\n```',
            options: [
                'メソッドチェーンの先頭に挿入される',
                'メソッドチェーンの末尾に挿入される',
                'クラスメソッドとして追加される',
                'インスタンス変数として追加される'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'prependはモジュールをメソッド探索順序の先頭に挿入し、元のメソッドをsuperで呼び出せます。'
        },
        {
            id: 'cr24',
            question: '以下のコードで、クラス変数@@countの問題点は？\n\n```ruby\nclass Parent\n  @@count = 0\n  def self.increment\n    @@count += 1\n  end\nend\n\nclass Child < Parent\nend\n\nParent.increment\nChild.increment\n```',
            options: [
                '親子クラスで@@countが共有される',
                '@@countが定義されていない',
                'incrementメソッドが継承されない',
                'エラーが発生する'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'クラス変数は継承階層で共有されるため、親子クラスで同じ変数を参照してしまいます。'
        },
        {
            id: 'cr25',
            question: '以下のコードで、delegateの役割は？\n\n```ruby\nclass Post < ApplicationRecord\n  belongs_to :user\n  delegate :name, :email, to: :user, prefix: true\nend\n\npost = Post.first\npost.user_name  # userのnameを取得\n```',
            options: [
                '関連オブジェクトのメソッドを委譲する',
                'メソッドを削除する',
                'メソッドをプライベートにする',
                'メソッドを複製する'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'delegateは関連オブジェクトのメソッドを現在のオブジェクトから直接呼び出せるようにします。'
        },
        {
            id: 'cr26',
            question: '以下のコードで、ActionController::Parametersの役割は？\n\n```ruby\nclass UsersController < ApplicationController\n  def create\n    @user = User.new(user_params)\n  end\n  \n  private\n  \n  def user_params\n    params.require(:user).permit(:name, :email)\n  end\nend\n```',
            options: [
                'Strong Parametersによるマスアサインメント対策',
                'URLパラメータの生成',
                'セッション管理',
                'キャッシュ制御'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'ActionController::ParametersはStrong Parametersを実装し、許可された属性のみを受け入れます。'
        },
        {
            id: 'cr27',
            question: '以下のコードで、pluckメソッドの特徴は？\n\n```ruby\nUser.where(active: true).pluck(:email)\n# => ["user1@example.com", "user2@example.com"]\n```',
            options: [
                '指定したカラムの値のみを配列で取得',
                'ActiveRecordオブジェクトを返す',
                'レコードを削除する',
                'レコードを更新する'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'pluckは指定したカラムの値だけを直接配列として取得し、ActiveRecordオブジェクトを生成しません。'
        },
        {
            id: 'cr28',
            question: '以下のコードで、dependent: :destroyの効果は？\n\n```ruby\nclass User < ApplicationRecord\n  has_many :posts, dependent: :destroy\nend\n```',
            options: [
                'Userが削除されたら関連するPostも削除',
                'Postが削除されたらUserも削除',
                'Userの削除を禁止',
                'Postの削除を禁止'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'dependent: :destroyは親レコードが削除された時、関連する子レコードも自動的に削除します。'
        },
        {
            id: 'cr29',
            question: '以下のコードで、yieldの役割は？\n\n```erb\n<!-- app/views/layouts/application.html.erb -->\n<body>\n  <%= yield %>\n</body>\n```',
            options: [
                '個別のビューテンプレートの内容を挿入',
                'JavaScriptを実行',
                'CSSを読み込む',
                'エラーメッセージを表示'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'yieldはレイアウトファイル内で、個別のビューテンプレートの内容を挿入する場所を指定します。'
        },
        {
            id: 'cr30',
            question: '以下のコードで、N+1問題を解決する方法は？\n\n```ruby\n# N+1問題が発生するコード\nusers = User.all\nusers.each do |user|\n  puts user.posts.count\nend\n```',
            options: [
                'User.includes(:posts)',
                'User.find(:posts)',
                'User.where(:posts)',
                'User.select(:posts)'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'includesを使用することで関連データを事前に読み込み、N+1問題を解決できます。'
        },
        {
            id: 'cr31',
            question: '以下のコードで、トランザクションの動作として正しいものは？\n\n```ruby\nActiveRecord::Base.transaction do\n  user.save!\n  post.save!\n  comment.save!\nend\n```',
            options: [
                '全て成功するか、全て失敗する',
                '1つずつ順番に保存される',
                '失敗しても続行される',
                '並列で保存される'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'トランザクション内では、全ての操作が成功するか、エラー時は全てロールバックされます。'
        },
        {
            id: 'cr32',
            question: '以下のコードで、find_or_create_byの動作は？\n\n```ruby\nUser.find_or_create_by(email: "test@example.com") do |user|\n  user.name = "Test User"\nend\n```',
            options: [
                '条件に合うレコードを検索し、なければ作成',
                '必ず新しいレコードを作成',
                '条件に合うレコードを削除',
                'エラーを発生させる'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'find_or_create_byは条件に合うレコードがあれば取得し、なければ新規作成します。'
        },
        {
            id: 'cr33',
            question: '以下のコードで、after_commitコールバックの特徴は？\n\n```ruby\nclass User < ApplicationRecord\n  after_commit :send_welcome_email, on: :create\nend\n```',
            options: [
                'トランザクション完了後に実行される',
                'トランザクション開始前に実行される',
                'バリデーション前に実行される',
                '削除時のみ実行される'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'after_commitはトランザクションが正常にコミットされた後に実行されます。'
        },
        {
            id: 'cr34',
            question: '以下のコードで、||=演算子の意味は？\n\n```ruby\nclass UsersController < ApplicationController\n  def current_user\n    @current_user ||= User.find(session[:user_id])\n  end\nend\n```',
            options: [
                '値がnilまたはfalseの場合のみ代入',
                '常に代入',
                '値がtrueの場合のみ代入',
                '値を削除'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: '||=はメモ化パターンで、変数がnilまたはfalseの時のみ右辺を評価して代入します。'
        },
        {
            id: 'cr35',
            question: '以下のコードで、inverse_ofの役割は？\n\n```ruby\nclass User < ApplicationRecord\n  has_many :posts, inverse_of: :user\nend\n\nclass Post < ApplicationRecord\n  belongs_to :user, inverse_of: :posts\nend\n```',
            options: [
                '双方向の関連付けを明示し、メモリ効率を向上',
                '関連付けを無効化',
                'カスケード削除を設定',
                'バリデーションをスキップ'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'inverse_ofは双方向の関連付けを明示し、不要なデータベースクエリを削減します。'
        },
        {
            id: 'cr36',
            question: '以下のコードで、content_forとyieldの組み合わせの用途は？\n\n```erb\n<!-- ビュー -->\n<% content_for :title do %>\n  ユーザー一覧\n<% end %>\n\n<!-- レイアウト -->\n<title><%= yield :title %></title>\n```',
            options: [
                'レイアウトの特定部分にコンテンツを挿入',
                'JavaScriptの実行',
                'データベースクエリの実行',
                'エラーハンドリング'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'content_forで定義したコンテンツを、レイアウトのyieldで指定した場所に挿入できます。'
        },
        {
            id: 'cr37',
            question: '以下のコードで、ActiveStorageの用途は？\n\n```ruby\nclass User < ApplicationRecord\n  has_one_attached :avatar\nend\n```',
            options: [
                'ファイルアップロード機能の提供',
                'データベースバックアップ',
                'キャッシュ管理',
                'セッション管理'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ActiveStorageはファイルアップロード機能を提供し、has_one_attachedで1つのファイルを関連付けます。'
        },
        {
            id: 'cr38',
            question: '以下のコードで、around_actionの実行順序は？\n\n```ruby\nclass ApplicationController < ActionController::Base\n  around_action :set_time_zone\n  \n  private\n  \n  def set_time_zone\n    old_time_zone = Time.zone\n    Time.zone = current_user.time_zone\n    yield  # アクションの実行\n    Time.zone = old_time_zone\n  end\nend\n```',
            options: [
                'アクション前後で処理を実行',
                'アクション前のみ実行',
                'アクション後のみ実行',
                '実行されない'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'around_actionはアクションの前後で処理を実行し、yieldでアクション本体を実行します。'
        },
        {
            id: 'cr39',
            question: '以下のコードで、joinsとincludesの違いは？\n\n```ruby\nUser.joins(:posts).where(posts: { published: true })\nUser.includes(:posts).where(posts: { published: true })\n```',
            options: [
                'joins: INNER JOIN、includes: LEFT OUTER JOIN + eager loading',
                'joins: LEFT JOIN、includes: INNER JOIN',
                '違いはない',
                'joins: 削除、includes: 作成'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'joinsはINNER JOINを実行し、includesは関連データを事前読み込み（eager loading）します。'
        },
        {
            id: 'cr40',
            question: '以下のコードで、STI（単一テーブル継承）の実装として正しいものは？\n\n```ruby\nclass Vehicle < ApplicationRecord\nend\n\nclass Car < Vehicle\nend\n\nclass Truck < Vehicle\nend\n```',
            options: [
                'vehiclesテーブルにtypeカラムが必要',
                'cars、trucksテーブルが必要',
                'vehiclesテーブルは不要',
                'typeカラムは不要'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'STIでは親クラスのテーブル（vehicles）にtypeカラムを持ち、サブクラスの種類を記録します。'
        },
        {
            id: 'cr41',
            question: '以下のコードで、accepts_nested_attributes_forの役割は？\n\n```ruby\nclass User < ApplicationRecord\n  has_many :addresses\n  accepts_nested_attributes_for :addresses\nend\n```',
            options: [
                '関連オブジェクトを同時に作成・更新',
                '関連オブジェクトを削除',
                'バリデーションをスキップ',
                'キャッシュを有効化'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'accepts_nested_attributes_forは、親オブジェクトと同時に子オブジェクトを作成・更新できます。'
        },
        {
            id: 'cr42',
            question: '以下のコードで、counter_cacheの目的は？\n\n```ruby\nclass Post < ApplicationRecord\n  belongs_to :user, counter_cache: true\nend\n```',
            options: [
                '関連レコード数をキャッシュしてパフォーマンス向上',
                'レコードの削除を防ぐ',
                'バリデーションの追加',
                'インデックスの作成'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'counter_cacheは関連レコード数を親テーブルにキャッシュし、カウントクエリを削減します。'
        },
        {
            id: 'cr43',
            question: '以下のコードで、touch: trueの効果は？\n\n```ruby\nclass Comment < ApplicationRecord\n  belongs_to :post, touch: true\nend\n```',
            options: [
                'Commentが更新されたらPostのupdated_atも更新',
                'Postが更新されたらCommentも更新',
                'タイムスタンプを無効化',
                '削除を防ぐ'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'touch: trueは子レコードが更新された時、親レコードのタイムスタンプも更新します。'
        },
        {
            id: 'cr44',
            question: '以下のコードで、polymorphic関連の特徴は？\n\n```ruby\nclass Comment < ApplicationRecord\n  belongs_to :commentable, polymorphic: true\nend\n\nclass Post < ApplicationRecord\n  has_many :comments, as: :commentable\nend\n```',
            options: [
                '複数の異なるモデルと関連付け可能',
                '1つのモデルとのみ関連付け',
                '関連付けを無効化',
                'STIの実装'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'polymorphic関連により、Commentは複数の異なるモデル（Post、Articleなど）に属することができます。'
        },
        {
            id: 'cr45',
            question: '以下のコードで、perform_nowとperform_laterの違いは？\n\n```ruby\nEmailJob.perform_now(user)\nEmailJob.perform_later(user)\n```',
            options: [
                'perform_now: 同期実行、perform_later: 非同期実行',
                'perform_now: 非同期実行、perform_later: 同期実行',
                '違いはない',
                'perform_now: 削除、perform_later: 作成'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'perform_nowは即座に同期実行、perform_laterはキューに入れて非同期実行します。'
        },
        {
            id: 'cr46',
            question: '以下のコードで、database.ymlの設定が読み込まれる場所は？\n\n```yaml\ndefault: &default\n  adapter: postgresql\n  encoding: unicode\n  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>\n```',
            options: [
                'config/database.yml',
                'db/database.yml',
                'app/database.yml',
                'lib/database.yml'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'データベース設定はconfig/database.ymlに記述されます。'
        },
        {
            id: 'cr47',
            question: '以下のコードで、.envファイルの役割は？\n\n```ruby\n# .env\nDATABASE_URL=postgres://localhost/myapp\nSECRET_KEY_BASE=abc123...\n```',
            options: [
                '環境変数を管理（dotenv gem使用時）',
                'ルーティング設定',
                'データベーススキーマ',
                'テスト設定'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: '.envファイルはdotenv gemと組み合わせて環境変数を管理します。'
        },
        {
            id: 'cr48',
            question: '以下のコードで、Gemfileの役割は？\n\n```ruby\nsource "https://rubygems.org"\ngem "rails", "~> 7.0.0"\ngem "pg", "~> 1.1"\n```',
            options: [
                'アプリケーションの依存関係を定義',
                'データベース設定',
                'ルーティング設定',
                'テスト実行'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'Gemfileはアプリケーションが依存するgemとそのバージョンを定義します。'
        },
        {
            id: 'cr49',
            question: '以下のコードで、routes.rbの記述として正しいものは？\n\n```ruby\nRails.application.routes.draw do\n  resources :users do\n    resources :posts\n  end\nend\n```',
            options: [
                'ネストしたRESTfulルーティング',
                'データベース設定',
                'モデルの定義',
                'ビューの設定'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'この記述はusersとpostsのネストしたRESTfulルーティングを定義します。'
        },
        {
            id: 'cr50',
            question: '以下のコードで、db:migrateタスクの実行結果は？\n\n```bash\nrails db:migrate\n```',
            options: [
                '未実行のマイグレーションファイルを実行',
                '全てのマイグレーションをロールバック',
                'データベースを削除',
                'シードデータを投入'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'rails db:migrateは未実行のマイグレーションファイルを実行し、データベーススキーマを更新します。'
        },
        {
            id: 'cr51',
            question: '以下のコードで、has_secure_passwordの前提条件は？\n\n```ruby\nclass User < ApplicationRecord\n  has_secure_password\nend\n```',
            options: [
                'password_digestカラムとbcrypt gemが必要',
                'passwordカラムが必要',
                'encrypted_passwordカラムが必要',
                '特別な設定は不要'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'has_secure_passwordはpassword_digestカラムとbcrypt gemを必要とし、パスワードを暗号化します。'
        },
        {
            id: 'cr52',
            question: '以下のコードで、eager_loadの効果は？\n\n```ruby\nusers = User.eager_load(:posts, :comments)\n```',
            options: [
                'LEFT OUTER JOINで関連データを一度に取得',
                '関連データを遅延読み込み',
                'データを削除',
                'キャッシュをクリア'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'eager_loadはLEFT OUTER JOINを使用して、関連データを1つのクエリで取得します。'
        },
        {
            id: 'cr53',
            question: '以下のコードで、ActiveRecord::Relationの特徴は？\n\n```ruby\nusers = User.where(active: true).order(:name)\n# usersはActiveRecord::Relationオブジェクト\n```',
            options: [
                '遅延評価され、必要時にSQLが実行される',
                '即座にSQLが実行される',
                '配列として返される',
                'ハッシュとして返される'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'ActiveRecord::Relationは遅延評価され、実際にデータが必要になった時点でSQLが実行されます。'
        },
        {
            id: 'cr54',
            question: '以下のコードで、alias_attributeの用途は？\n\n```ruby\nclass User < ApplicationRecord\n  alias_attribute :username, :email\nend\n```',
            options: [
                '属性に別名を付ける',
                '属性を削除する',
                '属性を暗号化する',
                'バリデーションを追加する'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'alias_attributeは既存の属性に別名を付け、同じ値にアクセスする別の方法を提供します。'
        },
        {
            id: 'cr55',
            question: '以下のコードで、ActiveSupport::Concernの利点は？\n\n```ruby\nmodule Timestampable\n  extend ActiveSupport::Concern\n  \n  included do\n    before_save :set_timestamp\n  end\n  \n  def set_timestamp\n    self.processed_at = Time.current\n  end\nend\n```',
            options: [
                'モジュールの依存関係を適切に管理',
                'パフォーマンスの向上',
                'メモリ使用量の削減',
                'テストの自動化'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'ActiveSupport::Concernはモジュールの依存関係を管理し、included/class_methodsブロックで整理できます。'
        },
        {
            id: 'cr56',
            question: '以下のコードで、config.eager_load_pathsの役割は？\n\n```ruby\n# config/application.rb\nconfig.eager_load_paths << Rails.root.join("lib")\n```',
            options: [
                'オートロードされるパスを追加',
                'データベース接続を設定',
                'ビューパスを設定',
                'アセットパスを設定'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'eager_load_pathsは本番環境で事前読み込みされるパスを指定します。'
        },
        {
            id: 'cr57',
            question: '以下のコードで、ActiveModel::Dirtyの機能は？\n\n```ruby\nuser = User.find(1)\nuser.name = "New Name"\nuser.name_changed?  # => true\nuser.name_was       # => "Old Name"\n```',
            options: [
                '属性の変更を追跡',
                '属性を暗号化',
                '属性を削除',
                'バリデーションを実行'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'ActiveModel::Dirtyは属性の変更を追跡し、変更前の値や変更の有無を確認できます。'
        },
        {
            id: 'cr58',
            question: '以下のコードで、config/initializers/ディレクトリの役割は？\n\n```ruby\n# config/initializers/inflections.rb\nActiveSupport::Inflector.inflections(:en) do |inflect|\n  inflect.irregular "person", "people"\nend\n```',
            options: [
                'アプリケーション起動時の初期設定',
                'テスト設定',
                'デプロイ設定',
                'データベース設定'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'config/initializers/内のファイルはアプリケーション起動時に実行される初期設定を含みます。'
        },
        {
            id: 'cr59',
            question: '以下のコードで、db/seeds.rbの用途は？\n\n```ruby\n# db/seeds.rb\nUser.create!(name: "Admin", email: "admin@example.com")\n10.times do |i|\n  Post.create!(title: "Post #{i}", user: User.first)\nend\n```',
            options: [
                '初期データの投入',
                'マイグレーションの実行',
                'テストデータの削除',
                'バックアップの作成'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'seeds.rbは開発用の初期データを定義し、rails db:seedで実行されます。'
        },
        {
            id: 'cr60',
            question: '以下のコードで、Rackミドルウェアの役割は？\n\n```ruby\n# config/application.rb\nconfig.middleware.use MyCustomMiddleware\n```',
            options: [
                'HTTPリクエスト/レスポンスの処理をチェーン',
                'データベース接続の管理',
                'ビューのレンダリング',
                'モデルのバリデーション'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Rackミドルウェアは、HTTPリクエスト/レスポンスを順番に処理するチェーンを形成します。'
        }
    ],
    
    // 理論問題（40問）
    theory: [
        {
            id: 't1',
            question: 'Railsの設計思想「Convention over Configuration」の意味は？',
            options: [
                '設定より規約を優先し、デフォルトの動作を提供',
                '全てを詳細に設定する必要がある',
                '設定ファイルを使わない',
                '規約を無視して自由に設定'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'CoC（Convention over Configuration）は、規約に従うことで設定を最小限にする設計思想です。'
        },
        {
            id: 't2',
            question: 'DRY原則の意味は？',
            options: [
                "Don't Repeat Yourself - 重複を避ける",
                "Do Repeat Yourself - 繰り返しを推奨",
                "Delete Redundant Years - 古いコードを削除",
                "Develop Rapidly Yourself - 高速開発"
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'DRY（Don\'t Repeat Yourself）は、同じコードや知識の重複を避ける原則です。'
        },
        {
            id: 't3',
            question: 'RESTfulルーティングの7つのアクションに含まれないものは？',
            options: [
                'search',
                'index',
                'show',
                'create'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'RESTfulの7つのアクションは：index, show, new, create, edit, update, destroyです。'
        },
        {
            id: 't4',
            question: 'マイグレーションファイルの命名規則として正しいものは？',
            options: [
                'タイムスタンプ_動作_テーブル名.rb',
                'テーブル名_動作_タイムスタンプ.rb',
                '動作_テーブル名.rb',
                'migration_番号.rb'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'マイグレーションファイルは「20231201123456_create_users.rb」のようにタイムスタンプで始まります。'
        },
        {
            id: 't5',
            question: 'ActiveRecordのORMとは何の略？',
            options: [
                'Object-Relational Mapping',
                'Object-Resource Manager',
                'Online-Record Management',
                'Optimized-Rails Module'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ORMはObject-Relational Mappingの略で、オブジェクトとデータベースをマッピングします。'
        },
        {
            id: 't6',
            question: 'Railsアプリケーションの環境として存在しないものは？',
            options: [
                'debug',
                'development',
                'test',
                'production'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'Railsのデフォルト環境は：development、test、productionの3つです。'
        },
        {
            id: 't7',
            question: 'gemとは何？',
            options: [
                'Rubyのパッケージ管理システムのライブラリ',
                'データベース管理ツール',
                'テストフレームワーク',
                'デプロイツール'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'gemはRubyのライブラリパッケージで、RubyGemsで管理されます。'
        },
        {
            id: 't8',
            question: 'Bundlerの役割は？',
            options: [
                'gemの依存関係を管理',
                'JavaScriptをバンドル',
                'CSSを圧縮',
                'データベースを管理'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'BundlerはGemfileに基づいてgemの依存関係を管理するツールです。'
        },
        {
            id: 't9',
            question: 'Railsのアセットパイプラインの目的でないものは？',
            options: [
                'データベースの最適化',
                'JavaScriptの連結と圧縮',
                'CSSの連結と圧縮',
                'フィンガープリントの付与'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'アセットパイプラインは静的ファイル（JS、CSS、画像）を最適化しますが、データベースは扱いません。'
        },
        {
            id: 't10',
            question: 'CSRFトークンの目的は？',
            options: [
                'クロスサイトリクエストフォージェリを防ぐ',
                'パスワードを暗号化する',
                'SQLインジェクションを防ぐ',
                'XSS攻撃を防ぐ'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'CSRFトークンは、悪意のあるサイトからの不正なリクエストを防ぎます。'
        },
        {
            id: 't11',
            question: 'Strong Parametersの目的は？',
            options: [
                'マスアサインメント脆弱性を防ぐ',
                'パスワードを強化する',
                'データベース接続を強化する',
                'HTTPSを強制する'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'Strong Parametersは、許可された属性のみを受け入れることでマスアサインメント攻撃を防ぎます。'
        },
        {
            id: 't12',
            question: 'Railsでセッションが保存される場所のデフォルトは？',
            options: [
                'Cookie（暗号化）',
                'データベース',
                'メモリ',
                'ファイルシステム'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'Railsはデフォルトで暗号化されたCookieにセッションを保存します。'
        },
        {
            id: 't13',
            question: 'Action Cableの用途は？',
            options: [
                'WebSocketによるリアルタイム通信',
                'メール送信',
                'ファイルアップロード',
                'バックグラウンドジョブ'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'Action CableはWebSocketを使用してリアルタイム機能を実装します。'
        },
        {
            id: 't14',
            question: 'Turboの主な機能は？',
            options: [
                'SPAのようなUXをJavaScript無しで実現',
                'データベースの高速化',
                'テストの高速化',
                'デプロイの高速化'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'TurboはページリロードなしでHTMLを更新し、SPAのような体験を提供します。'
        },
        {
            id: 't15',
            question: 'Railsのキャッシュストアとして使えないものは？',
            options: [
                'MySQL',
                'Redis',
                'Memcached',
                'ファイルシステム'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'MySQLはデータベースであり、キャッシュストアとしては使用されません。'
        },
        {
            id: 't16',
            question: 'Active Recordパターンの特徴は？',
            options: [
                '1つのオブジェクトが1つのデータベース行に対応',
                '複数のテーブルを1つのオブジェクトで管理',
                'SQLを直接書く必要がある',
                'NoSQLデータベース専用'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'Active Recordパターンでは、1つのオブジェクトが1つのデータベース行に対応します。'
        },
        {
            id: 't17',
            question: 'Railsエンジンとは？',
            options: [
                'ミニRailsアプリケーションとして機能するgem',
                'データベースエンジン',
                'JavaScriptエンジン',
                'テンプレートエンジン'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Railsエンジンは、完全な機能を持つミニRailsアプリケーションをgemとして提供します。'
        },
        {
            id: 't18',
            question: 'zeitwerkの役割は？',
            options: [
                'Railsのオートローディング',
                'タイムゾーン管理',
                'ジョブスケジューリング',
                'ログ管理'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'zeitwerkはRails 6から導入されたオートローダーで、ファイルの自動読み込みを管理します。'
        },
        {
            id: 't19',
            question: 'Pumaとは何？',
            options: [
                'Railsアプリケーションサーバー',
                'データベース',
                'テストフレームワーク',
                'デプロイツール'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'PumaはRailsのデフォルトのアプリケーションサーバーです。'
        },
        {
            id: 't20',
            question: 'Railsのログレベルとして存在しないものは？',
            options: [
                'verbose',
                'debug',
                'info',
                'error'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Railsのログレベルは：debug, info, warn, error, fatal, unknownです。'
        },
        {
            id: 't21',
            question: 'rails consoleの--sandboxオプションの効果は？',
            options: [
                '終了時に全ての変更をロールバック',
                'テスト環境で起動',
                '読み取り専用モード',
                '高速モード'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: '--sandboxオプションを使うと、console終了時に全ての変更がロールバックされます。'
        },
        {
            id: 't22',
            question: 'Railsの「Fat Model, Skinny Controller」の意味は？',
            options: [
                'ビジネスロジックはモデルに、コントローラーは薄く',
                'モデルを大きく、コントローラーを小さく',
                'データベースを大きく、メモリを小さく',
                'ビューを大きく、モデルを小さく'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'ビジネスロジックをモデルに集約し、コントローラーは流れの制御に専念する設計方針です。'
        },
        {
            id: 't23',
            question: 'Service Objectパターンの用途は？',
            options: [
                '複雑なビジネスロジックをカプセル化',
                'データベース接続を管理',
                'ビューをレンダリング',
                'ルーティングを設定'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Service Objectは複雑なビジネスロジックをモデルから分離してカプセル化します。'
        },
        {
            id: 't24',
            question: 'Decoratorパターンの用途は？',
            options: [
                'ビューロジックをモデルから分離',
                'データベースを装飾',
                'ルーティングを装飾',
                'テストを装飾'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Decoratorパターンは、表示用のロジックをモデルから分離します（draperなどのgemで実装）。'
        },
        {
            id: 't25',
            question: 'Form Objectパターンの利点は？',
            options: [
                '複雑なフォームロジックをカプセル化',
                'フォームの表示速度向上',
                'データベース接続の改善',
                'セキュリティの自動化'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Form Objectは複数モデルにまたがる複雑なフォーム処理をカプセル化します。'
        },
        {
            id: 't26',
            question: 'Value Objectパターンの特徴は？',
            options: [
                'イミュータブルで値の等価性で比較',
                'データベースに保存される',
                'IDを持つ',
                '状態が変更可能'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Value Objectは不変で、同じ値を持つオブジェクトは等価として扱われます。'
        },
        {
            id: 't27',
            question: 'Railsでの国際化（i18n）の設定ファイルの場所は？',
            options: [
                'config/locales/',
                'app/locales/',
                'lib/locales/',
                'public/locales/'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: '国際化の翻訳ファイルはconfig/locales/ディレクトリに配置されます。'
        },
        {
            id: 't28',
            question: 'ActiveModelの役割は？',
            options: [
                'ActiveRecord以外でモデル機能を提供',
                'データベース接続',
                'ビューのレンダリング',
                'ルーティング'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'ActiveModelは、データベースに依存しないモデルの機能（バリデーションなど）を提供します。'
        },
        {
            id: 't29',
            question: 'rails db:rollbackの動作は？',
            options: [
                '最後のマイグレーションを取り消す',
                '全てのマイグレーションを取り消す',
                'データベースを削除',
                'データをバックアップ'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'db:rollbackは最後に実行されたマイグレーションを1つ取り消します。'
        },
        {
            id: 't30',
            question: 'production環境でのアセットのプリコンパイルコマンドは？',
            options: [
                'rails assets:precompile',
                'rails compile:assets',
                'rails build:assets',
                'rails generate:assets'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'rails assets:precompileでアセットをプリコンパイルします。'
        },
        {
            id: 't31',
            question: 'Railsのセキュリティヘッダーとして適切でないものは？',
            options: [
                'X-Database-Type',
                'X-Frame-Options',
                'X-XSS-Protection',
                'X-Content-Type-Options'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'X-Database-Typeというセキュリティヘッダーは存在しません。'
        },
        {
            id: 't32',
            question: 'Railsの「魔法」と呼ばれる機能の例でないものは？',
            options: [
                '手動でのSQL記述',
                '命名規則による自動マッピング',
                'メソッドの動的生成',
                'オートローディング'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: '手動でのSQL記述は「魔法」ではなく、明示的な処理です。'
        },
        {
            id: 't33',
            question: 'Railsのテストフレームワークのデフォルトは？',
            options: [
                'Minitest',
                'RSpec',
                'Cucumber',
                'Jest'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'RailsのデフォルトテストフレームワークはMinitestです。'
        },
        {
            id: 't34',
            question: 'fixtures（フィクスチャ）の用途は？',
            options: [
                'テスト用の固定データ',
                'デプロイ設定',
                'ルーティング設定',
                'ビューテンプレート'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'fixturesはテスト用の固定データを提供します。'
        },
        {
            id: 't35',
            question: 'FactoryBotの利点は？',
            options: [
                '動的なテストデータ生成',
                'テストの高速化',
                'テストの自動実行',
                'カバレッジ測定'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'FactoryBotは動的で柔軟なテストデータを生成できます。'
        },
        {
            id: 't36',
            question: 'Capybaraの用途は？',
            options: [
                '統合テスト（E2Eテスト）',
                'ユニットテスト',
                'パフォーマンステスト',
                'セキュリティテスト'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'Capybaraはブラウザの動作をシミュレートする統合テストツールです。'
        },
        {
            id: 't37',
            question: 'rails db:schema:loadの用途は？',
            options: [
                'スキーマファイルから新規データベースを構築',
                'マイグレーションを実行',
                'データをバックアップ',
                'インデックスを作成'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'db:schema:loadはschema.rbから新しいデータベースを構築します。'
        },
        {
            id: 't38',
            question: 'rails db:createの動作は？',
            options: [
                'データベースを作成',
                'テーブルを作成',
                'マイグレーションを作成',
                'モデルを作成'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'db:createはdatabase.ymlの設定に基づいてデータベースを作成します。'
        },
        {
            id: 't39',
            question: 'Webpackerの後継として導入されたものは？',
            options: [
                'Importmap / esbuild / rollup',
                'Sprockets',
                'Browserify',
                'Gulp'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'Rails 7ではWebpackerの代わりにImportmap、esbuild、rollupなどが選択できます。'
        },
        {
            id: 't40',
            question: 'Hotwireの構成要素でないものは？',
            options: [
                'jQuery',
                'Turbo',
                'Stimulus',
                'Strada'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'HotwireはTurbo、Stimulus、Stradaで構成され、jQueryは含まれません。'
        }
    ]
};

// 全問題を統合して100問にする関数
function getAllExtendedQuestions() {
    const allQuestions = [
        ...quizDataExtended.codeReading,
        ...quizDataExtended.theory
    ];
    return shuffleArray(allQuestions);
}

// 元のquizDataと統合
Object.assign(quizData, quizDataExtended);