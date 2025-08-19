// Rails継承チェーン理解度テスト - 強化版クイズエンジン
class QuizEngineV2 {
    constructor() {
        this.currentCategory = 'all';
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.startTime = null;
        this.timerInterval = null;
        this.isQuizActive = false;
        this.showingAnswer = false;
        this.correctAnswers = 0;
        this.viewMode = 'quiz'; // 'quiz' | 'list'
    }

    init() {
        this.attachEventListeners();
        this.loadAllQuestions();
    }

    loadAllQuestions() {
        // 100問全てを読み込み
        const allQuestions = [];
        
        // quiz-data-extended.jsから全問題を取得
        if (typeof quizDataExtended !== 'undefined') {
            // コード読解問題を追加
            allQuestions.push(...quizDataExtended.codeReading);
            // 理論問題を追加
            allQuestions.push(...quizDataExtended.theory);
        }
        
        this.allQuestions = allQuestions;
    }

    attachEventListeners() {
        // カテゴリーボタン
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.updateQuestionCount();
            });
        });

        // 表示モード切替
        const viewToggle = document.getElementById('viewModeToggle');
        if (viewToggle) {
            viewToggle.addEventListener('click', () => {
                this.toggleViewMode();
            });
        }

        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (!this.isQuizActive) return;
            
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.answer-option:not(.disabled)');
                if (options[optionIndex] && !this.showingAnswer) {
                    this.selectAnswer(optionIndex);
                }
            } else if (e.key === 'Enter' && this.showingAnswer) {
                this.nextQuestion();
            } else if (e.key === 'ArrowLeft' && !this.showingAnswer) {
                this.previousQuestion();
            } else if (e.key === 'ArrowRight' && this.showingAnswer) {
                this.nextQuestion();
            }
        });
    }

    updateQuestionCount() {
        const countDisplay = document.getElementById('questionCount');
        if (countDisplay) {
            const count = this.currentCategory === 'all' ? 100 : 
                         this.currentCategory === 'codeReading' ? 60 : 40;
            countDisplay.textContent = `${count}問`;
        }
    }

    toggleViewMode() {
        if (this.viewMode === 'quiz') {
            this.showQuestionList();
        } else {
            this.showQuizMode();
        }
    }

    showQuestionList() {
        this.viewMode = 'list';
        const container = document.getElementById('quizContainer');
        const listHTML = this.generateQuestionListHTML();
        
        container.innerHTML = `
            <div class="card">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold">
                        <i class="fas fa-list"></i> 問題一覧（全${this.allQuestions.length}問）
                    </h2>
                    <button onclick="quiz.showQuizMode()" class="btn-secondary">
                        <i class="fas fa-play"></i> クイズモードに戻る
                    </button>
                </div>
                <div class="question-list">
                    ${listHTML}
                </div>
            </div>
        `;
        container.classList.add('active');
    }

    generateQuestionListHTML() {
        let html = '<div class="question-grid">';
        
        this.allQuestions.forEach((question, index) => {
            const isAnswered = this.answers[question.id] !== undefined;
            const isCorrect = isAnswered && this.answers[question.id] === question.correct;
            
            let statusClass = '';
            let statusIcon = '';
            
            if (isAnswered) {
                if (isCorrect) {
                    statusClass = 'question-item-correct';
                    statusIcon = '<i class="fas fa-check-circle"></i>';
                } else {
                    statusClass = 'question-item-incorrect';
                    statusIcon = '<i class="fas fa-times-circle"></i>';
                }
            }
            
            const difficultyBadge = `<span class="difficulty-badge difficulty-${question.difficulty}">${
                question.difficulty === 'easy' ? '初級' : 
                question.difficulty === 'medium' ? '中級' : '上級'
            }</span>`;
            
            html += `
                <div class="question-item ${statusClass}" onclick="quiz.jumpToQuestion(${index})">
                    <div class="question-item-header">
                        <span class="question-item-number">Q${index + 1}</span>
                        ${difficultyBadge}
                        ${statusIcon}
                    </div>
                    <div class="question-item-text">
                        ${this.truncateText(question.question, 50)}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    truncateText(text, maxLength) {
        // コードブロックを除去してからトランケート
        const cleanText = text.replace(/```[\s\S]*?```/g, '[コード]').replace(/\n/g, ' ');
        if (cleanText.length <= maxLength) return cleanText;
        return cleanText.substring(0, maxLength) + '...';
    }

    jumpToQuestion(index) {
        this.currentQuestionIndex = index;
        this.questions = this.allQuestions;
        this.showQuizMode();
        this.displayQuestion();
    }

    showQuizMode() {
        this.viewMode = 'quiz';
        if (!this.isQuizActive) {
            this.startQuiz();
        } else {
            this.displayQuestion();
        }
    }

    startQuiz() {
        const selectedCategory = this.currentCategory;
        
        // カテゴリーに応じた問題を取得
        if (selectedCategory === 'all') {
            this.questions = [...this.allQuestions];
        } else if (selectedCategory === 'codeReading') {
            this.questions = this.allQuestions.filter(q => q.id.startsWith('cr'));
        } else {
            this.questions = this.allQuestions.filter(q => q.id.startsWith('t'));
        }
        
        if (this.questions.length === 0) {
            alert('選択したカテゴリーに問題がありません。');
            return;
        }

        this.currentQuestionIndex = 0;
        this.answers = {};
        this.correctAnswers = 0;
        this.isQuizActive = true;
        this.showingAnswer = false;
        
        // UIの切り替え
        document.getElementById('categorySelection').style.display = 'none';
        document.getElementById('quizContainer').classList.add('active');
        document.getElementById('resultsContainer').classList.remove('active');
        
        // タイマー開始
        this.startTime = Date.now();
        this.startTimer();
        
        // 最初の問題を表示
        this.displayQuestion();
        
        // 進捗バーと問題数を更新
        document.getElementById('totalQuestions').textContent = this.questions.length;
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionArea = document.getElementById('questionArea');
        
        // コードブロックの処理
        let questionText = question.question;
        questionText = questionText.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<div class="code-block"><pre><code>${this.escapeHtml(code.trim())}</code></pre></div>`;
        });
        
        // 難易度バッジの色を取得
        const difficultyClass = `difficulty-${question.difficulty}`;
        const difficultyText = {
            easy: '初級',
            medium: '中級',
            hard: '上級'
        }[question.difficulty];
        
        let html = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">問題 ${this.currentQuestionIndex + 1}</span>
                    <span class="difficulty-badge ${difficultyClass}">${difficultyText}</span>
                    <button onclick="quiz.toggleViewMode()" class="btn-icon" title="問題一覧">
                        <i class="fas fa-list"></i>
                    </button>
                </div>
                <div class="question-text">${questionText}</div>
                <div class="answer-options">
        `;
        
        // 選択肢を表示
        question.options.forEach((option, idx) => {
            const isSelected = this.answers[question.id] === idx;
            const label = ['A', 'B', 'C', 'D'][idx];
            let optionClass = '';
            let icon = '';
            
            if (this.showingAnswer) {
                optionClass = 'disabled';
                if (idx === question.correct) {
                    optionClass += ' correct';
                    icon = '<i class="fas fa-check-circle" style="color: #16a34a;"></i>';
                } else if (isSelected && idx !== question.correct) {
                    optionClass += ' incorrect';
                    icon = '<i class="fas fa-times-circle" style="color: #dc2626;"></i>';
                }
            } else if (isSelected) {
                optionClass = 'selected';
            }
            
            html += `
                <div class="answer-option ${optionClass}" 
                     onclick="${this.showingAnswer ? '' : `quiz.selectAnswer(${idx})`}"
                     data-index="${idx}">
                    <span class="answer-label">${label}</span>
                    ${this.escapeHtml(option)}
                    ${icon}
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="explanation ${this.showingAnswer ? 'show' : ''}" id="explanation">
                    <div class="explanation-header">
                        ${this.answers[question.id] === question.correct ? 
                            '<i class="fas fa-check-circle" style="color: #16a34a;"></i> 正解！' : 
                            '<i class="fas fa-times-circle" style="color: #dc2626;"></i> 不正解'}
                    </div>
                    <strong>解説：</strong><br>
                    ${this.escapeHtml(question.explanation)}
                </div>
                ${this.showingAnswer ? `
                    <div class="next-button-container">
                        <button onclick="quiz.nextQuestion()" class="btn-primary">
                            ${this.currentQuestionIndex < this.questions.length - 1 ? 
                                '次の問題へ <i class="fas fa-arrow-right"></i>' : 
                                'テスト終了 <i class="fas fa-flag-checkered"></i>'}
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        questionArea.innerHTML = html;
        
        // 進捗バーを更新
        this.updateProgress();
        
        // ボタンの状態を更新
        this.updateNavigationButtons();
    }

    selectAnswer(answerIndex) {
        if (this.showingAnswer) return;
        
        const question = this.questions[this.currentQuestionIndex];
        this.answers[question.id] = answerIndex;
        this.showingAnswer = true;
        
        // 正解の場合カウントアップ
        if (answerIndex === question.correct) {
            this.correctAnswers++;
        }
        
        // 即座に正誤を表示
        this.displayQuestion();
        
        // 統計を更新
        this.updateStats();
    }

    updateStats() {
        const statsDisplay = document.getElementById('currentStats');
        if (statsDisplay) {
            const accuracy = this.correctAnswers > 0 ? 
                Math.round((this.correctAnswers / (this.currentQuestionIndex + 1)) * 100) : 0;
            statsDisplay.innerHTML = `
                <span class="stat-item">
                    <i class="fas fa-check"></i> 正解: ${this.correctAnswers}
                </span>
                <span class="stat-item">
                    <i class="fas fa-times"></i> 不正解: ${this.currentQuestionIndex + 1 - this.correctAnswers}
                </span>
                <span class="stat-item">
                    <i class="fas fa-percentage"></i> 正答率: ${accuracy}%
                </span>
            `;
        }
    }

    nextQuestion() {
        this.showingAnswer = false;
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0 && !this.showingAnswer) {
            this.currentQuestionIndex--;
            this.showingAnswer = false;
            this.displayQuestion();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const finishBtn = document.getElementById('finishBtn');
        
        if (prevBtn) prevBtn.disabled = this.currentQuestionIndex === 0 || this.showingAnswer;
        
        if (this.showingAnswer) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (finishBtn) finishBtn.style.display = 'none';
        } else {
            if (this.currentQuestionIndex === this.questions.length - 1) {
                if (nextBtn) nextBtn.style.display = 'none';
                if (finishBtn) finishBtn.style.display = 'block';
            } else {
                if (nextBtn) nextBtn.style.display = 'block';
                if (finishBtn) finishBtn.style.display = 'none';
            }
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    finishQuiz() {
        if (!this.showingAnswer && this.currentQuestionIndex < this.questions.length - 1) {
            if (!confirm('まだ未回答の問題があります。本当にテストを終了しますか？')) {
                return;
            }
        }
        
        this.isQuizActive = false;
        this.stopTimer();
        this.showResults();
    }

    showResults() {
        // 結果を計算
        const totalQuestions = this.questions.length;
        const answeredQuestions = Object.keys(this.answers).length;
        const correctCount = this.correctAnswers;
        const score = Math.round((correctCount / totalQuestions) * 100);
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        
        // スコア表示
        document.getElementById('scoreNumber').textContent = `${score}%`;
        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('incorrectCount').textContent = totalQuestions - correctCount;
        document.getElementById('answeredCount').textContent = `${answeredQuestions}/${totalQuestions}`;
        document.getElementById('timeSpent').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // メッセージ（シンプルに）
        let message = '';
        if (score >= 90) {
            message = '優秀な成績です。';
        } else if (score >= 70) {
            message = '良い成績です。';
        } else if (score >= 50) {
            message = '復習を推奨します。';
        } else {
            message = '基礎から見直しましょう。';
        }
        document.getElementById('scoreMessage').textContent = message;
        
        // 詳細結果
        this.showDetailedResults();
        
        // UIの切り替え
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('resultsContainer').classList.add('active');
    }

    showDetailedResults() {
        const summaryContainer = document.getElementById('resultsSummary');
        let html = '<div class="results-grid">';
        
        this.questions.forEach((question, idx) => {
            const userAnswer = this.answers[question.id];
            const isCorrect = userAnswer === question.correct;
            const isAnswered = userAnswer !== undefined;
            
            html += `
                <div class="result-card ${isCorrect ? 'correct' : isAnswered ? 'incorrect' : 'unanswered'}">
                    <div class="result-card-header">
                        <span>Q${idx + 1}</span>
                        ${isCorrect ? '<i class="fas fa-check"></i>' : 
                          isAnswered ? '<i class="fas fa-times"></i>' : 
                          '<i class="fas fa-minus"></i>'}
                    </div>
                    <div class="result-card-question">
                        ${this.truncateText(question.question, 100)}
                    </div>
                    ${!isCorrect && isAnswered ? `
                        <div class="result-card-answer">
                            <div class="your-answer">あなたの回答: ${question.options[userAnswer]}</div>
                            <div class="correct-answer">正解: ${question.options[question.correct]}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        html += '</div>';
        summaryContainer.innerHTML = html;
    }

    retryQuiz() {
        this.correctAnswers = 0;
        this.showingAnswer = false;
        this.startQuiz();
    }

    resetQuiz() {
        this.isQuizActive = false;
        this.stopTimer();
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.correctAnswers = 0;
        this.showingAnswer = false;
        
        document.getElementById('categorySelection').style.display = 'block';
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('resultsContainer').classList.remove('active');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// グローバル変数としてインスタンスを作成
const quiz = new QuizEngineV2();

// 関数をグローバルスコープに公開
window.startQuiz = () => quiz.startQuiz();
window.nextQuestion = () => quiz.nextQuestion();
window.previousQuestion = () => quiz.previousQuestion();
window.finishQuiz = () => quiz.finishQuiz();
window.retryQuiz = () => quiz.retryQuiz();
window.resetQuiz = () => quiz.resetQuiz();

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    quiz.init();
});