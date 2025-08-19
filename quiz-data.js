// Rails継承チェーン理解度テスト - クイズデータ
const quizData = {
    basics: [
        {
            id: 'b1',
            question: 'Railsの継承チェーンにおいて、全てのモデルクラスが継承する基底クラスは？',
            options: [
                'ActiveRecord::Base',
                'ApplicationRecord',
                'ActionController::Base',
                'ApplicationController'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ActiveRecord::Baseは全てのモデルクラスの基底クラスです。ApplicationRecordはActiveRecord::Baseを継承し、さらに個別のモデルクラスがApplicationRecordを継承します。'
        },
        {
            id: 'b2',
            question: 'MVCモデルの「M」は何を表す？',
            options: [
                'Module（モジュール）',
                'Model（モデル）',
                'Method（メソッド）',
                'Migration（マイグレーション）'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'MVCのMはModel（モデル）を表し、データとビジネスロジックを担当します。'
        },
        {
            id: 'b3',
            question: 'includeとextendの違いとして正しいものは？',
            options: [
                'includeはクラスメソッド、extendはインスタンスメソッドを追加',
                'includeはインスタンスメソッド、extendはクラスメソッドを追加',
                'どちらも同じ動作をする',
                'includeは継承、extendはミックスイン'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'includeはモジュールをインスタンスメソッドとして追加し、extendはクラスメソッドとして追加します。'
        },
        {
            id: 'b4',
            question: 'Concernsの主な目的は？',
            options: [
                'パフォーマンスの向上',
                'セキュリティの強化',
                '共通機能の切り出しと再利用',
                'データベースの最適化'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'Concernsは複数のクラスで共通する機能を切り出して再利用可能にするための仕組みです。'
        },
        {
            id: 'b5',
            question: 'self.abstract_class = true の目的は？',
            options: [
                'クラスを削除可能にする',
                'クラスを継承不可にする',
                'テーブルと紐付かない抽象クラスとして定義',
                'クラスをプライベートにする'
            ],
            correct: 2,
            difficulty: 'hard',
            explanation: 'self.abstract_class = trueは、そのクラスがデータベーステーブルと直接紐付かない抽象クラスであることを示します。ApplicationRecordなどで使用されます。'
        }
    ],
    classes: [
        {
            id: 'c1',
            question: 'ApplicationControllerは何を継承している？',
            options: [
                'ActiveRecord::Base',
                'ActionController::Base',
                'ActionView::Base',
                'ActiveSupport::Base'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'ApplicationControllerはActionController::Baseを継承し、全コントローラーの基底クラスとなります。'
        },
        {
            id: 'c2',
            question: 'ActiveRecordに含まれないモジュールは？',
            options: [
                'ActiveRecord::Validations',
                'ActiveRecord::Callbacks',
                'ActiveRecord::Rendering',
                'ActiveRecord::Associations'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'ActiveRecord::Renderingは存在しません。RenderingはActionControllerの機能です。'
        },
        {
            id: 'c3',
            question: 'ActionMailerの基底クラスは？',
            options: [
                'ActionMailer::Base',
                'ApplicationMailer',
                'ActionController::Base',
                'ActiveRecord::Base'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ActionMailer::Baseがメーラーの基底クラスで、ApplicationMailerがこれを継承します。'
        },
        {
            id: 'c4',
            question: 'ActiveJobの主な用途は？',
            options: [
                'データベースのマイグレーション',
                '非同期処理の実行',
                'ビューのレンダリング',
                'ルーティングの管理'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'ActiveJobは非同期処理（バックグラウンドジョブ）を実行するためのフレームワークです。'
        },
        {
            id: 'c5',
            question: 'ActionCableは何を実現するための機能？',
            options: [
                'データベース接続',
                'メール送信',
                'WebSocket通信',
                'ファイルアップロード'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'ActionCableはWebSocketを使用したリアルタイム通信を実現するためのフレームワークです。'
        }
    ],
    methods: [
        {
            id: 'm1',
            question: 'createメソッドの対になるメソッドは？',
            options: [
                'delete',
                'destroy',
                'remove',
                'drop'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'createに対応するのはdestroyです。createは作成して保存、destroyは削除を行います。'
        },
        {
            id: 'm2',
            question: 'before_saveの対になるコールバックは？',
            options: [
                'after_save',
                'on_save',
                'post_save',
                'end_save'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'before_saveに対応するのはafter_saveです。保存処理の前後で実行されます。'
        },
        {
            id: 'm3',
            question: 'valid?メソッドの対になるメソッドは？',
            options: [
                'invalid?',
                'error?',
                'false?',
                'broken?'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'valid?（有効）に対応するのはinvalid?（無効）です。バリデーションの結果を確認します。'
        },
        {
            id: 'm4',
            question: 'has_manyの対になる関連付けは？',
            options: [
                'has_one',
                'belongs_to',
                'has_and_belongs_to_many',
                'has_through'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'has_many（1対多の「1」側）に対応するのはbelongs_to（1対多の「多」側）です。'
        },
        {
            id: 'm5',
            question: 'add_columnマイグレーションの対になるメソッドは？',
            options: [
                'delete_column',
                'drop_column',
                'remove_column',
                'destroy_column'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'add_columnに対応するのはremove_columnです。カラムの追加と削除を行います。'
        },
        {
            id: 'm6',
            question: 'pluralizeメソッドの対になるメソッドは？',
            options: [
                'singularize',
                'capitalize',
                'underscore',
                'downcase'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'pluralize（複数形に変換）に対応するのはsingularize（単数形に変換）です。'
        },
        {
            id: 'm7',
            question: 'perform_laterの対になるメソッドは？',
            options: [
                'perform_now',
                'perform_sync',
                'perform_immediate',
                'perform_direct'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'perform_later（非同期実行）に対応するのはperform_now（同期実行）です。ActiveJobで使用されます。'
        }
    ],
    directory: [
        {
            id: 'd1',
            question: 'Railsアプリケーションでモデルファイルが配置されるディレクトリは？',
            options: [
                'app/model',
                'app/models',
                'models/',
                'lib/models'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'モデルファイルはapp/modelsディレクトリに配置されます。'
        },
        {
            id: 'd2',
            question: 'ApplicationRecordが定義されているファイルの場所は？',
            options: [
                'app/models/application_record.rb',
                'app/controllers/application_record.rb',
                'config/application_record.rb',
                'lib/application_record.rb'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'ApplicationRecordはapp/models/application_record.rbに定義されています。'
        },
        {
            id: 'd3',
            question: 'マイグレーションファイルが配置されるディレクトリは？',
            options: [
                'db/migration',
                'db/migrations',
                'db/migrate',
                'database/migrations'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'マイグレーションファイルはdb/migrateディレクトリに配置されます。'
        },
        {
            id: 'd4',
            question: 'Gemfileがあるディレクトリは？',
            options: [
                'config/',
                'app/',
                'lib/',
                'プロジェクトルート'
            ],
            correct: 3,
            difficulty: 'easy',
            explanation: 'GemfileはRailsプロジェクトのルートディレクトリに配置されます。'
        },
        {
            id: 'd5',
            question: '初期化スクリプトが配置されるディレクトリは？',
            options: [
                'config/initializers',
                'config/initialize',
                'app/initializers',
                'lib/initializers'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: '初期化スクリプトはconfig/initializersディレクトリに配置され、アルファベット順に読み込まれます。'
        },
        {
            id: 'd6',
            question: 'Railsの読み込み順序で最初に読み込まれるファイルは？',
            options: [
                'application.rb',
                'routes.rb',
                'boot.rb',
                'environment.rb'
            ],
            correct: 2,
            difficulty: 'hard',
            explanation: 'boot.rbが最初に読み込まれ、Bundlerのセットアップを行います。'
        }
    ],
    inheritance: [
        {
            id: 'i1',
            question: 'インスタンス変数の記法は？',
            options: [
                '@variable',
                '@@variable',
                '$variable',
                'variable'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'インスタンス変数は@で始まります。各インスタンスごとに独立した値を持ちます。'
        },
        {
            id: 'i2',
            question: 'クラス変数の特徴として正しいものは？',
            options: [
                'インスタンスごとに独立',
                '親子クラス間で共有される',
                '継承されない',
                'メソッド内でのみ有効'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'クラス変数（@@）は親子クラス間で共有されるため、使用には注意が必要です。'
        },
        {
            id: 'i3',
            question: 'attr_accessorが生成するメソッドは？',
            options: [
                'ゲッターのみ',
                'セッターのみ',
                'ゲッターとセッター両方',
                'コンストラクタ'
            ],
            correct: 2,
            difficulty: 'easy',
            explanation: 'attr_accessorはゲッター（読み取り）とセッター（書き込み）の両方のメソッドを生成します。'
        },
        {
            id: 'i4',
            question: 'privateメソッドの特徴は？',
            options: [
                '子クラスから直接呼び出し可能',
                '定義したクラス内でのみ呼び出し可能',
                'どこからでも呼び出し可能',
                '継承されない'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'privateメソッドは定義したクラス内でのみ呼び出し可能です。継承はされますが、子クラスから直接呼び出すことはできません。'
        },
        {
            id: 'i5',
            question: 'superキーワードの役割は？',
            options: [
                '親クラスを削除する',
                '親クラスの同名メソッドを呼び出す',
                '子クラスを作成する',
                'メソッドをオーバーライドする'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'superは親クラスの同名メソッドを呼び出すために使用されます。'
        },
        {
            id: 'i6',
            question: 'メソッド解決順序（MRO）で最初に探索される場所は？',
            options: [
                '親クラス',
                'includeしたモジュール',
                '自クラス',
                'Object'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'メソッド解決順序では、まず自クラスから探索が始まり、次にincludeしたモジュール、親クラスの順に探索されます。'
        },
        {
            id: 'i7',
            question: 'prependの特徴は？',
            options: [
                'モジュールをインスタンスメソッドとして追加',
                'モジュールをクラスメソッドとして追加',
                'モジュールを継承チェーンの前に挿入',
                'モジュールを削除'
            ],
            correct: 2,
            difficulty: 'hard',
            explanation: 'prependはモジュールを継承チェーンの前（自クラスより前）に挿入します。これにより、元のメソッドをsuperで呼び出すことができます。'
        },
        {
            id: 'i8',
            question: 'method_missingの用途は？',
            options: [
                'エラーを発生させる',
                '存在しないメソッドの呼び出しを捕捉',
                'メソッドを削除する',
                'メソッドをコピーする'
            ],
            correct: 1,
            difficulty: 'hard',
            explanation: 'method_missingは存在しないメソッドが呼び出された時に実行され、動的なメソッド定義などに使用されます。'
        }
    ]
};

// 総合テスト用の問題を生成
function getAllQuestions() {
    const allQuestions = [];
    Object.values(quizData).forEach(category => {
        allQuestions.push(...category);
    });
    // シャッフルして返す
    return shuffleArray(allQuestions);
}

// 配列をシャッフル
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// カテゴリー別の問題数を取得
function getQuestionCount(category) {
    if (category === 'all') {
        return Object.values(quizData).reduce((sum, cat) => sum + cat.length, 0);
    }
    return quizData[category] ? quizData[category].length : 0;
}

// カテゴリー別の問題を取得
function getQuestionsByCategory(category, limit = null) {
    let questions;
    if (category === 'all') {
        questions = getAllQuestions();
    } else {
        questions = quizData[category] ? [...quizData[category]] : [];
        questions = shuffleArray(questions);
    }
    
    if (limit && limit < questions.length) {
        return questions.slice(0, limit);
    }
    return questions;
}