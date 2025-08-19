// Rails継承チェーン理解度テスト - クイズエンジン
class QuizEngine {
    constructor() {
        this.currentCategory = 'all';
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.startTime = null;
        this.timerInterval = null;
        this.isQuizActive = false;
    }

    init() {
        this.attachEventListeners();
        this.loadSavedProgress();
    }

    attachEventListeners() {
        // カテゴリーボタン
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
            });
        });

        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (!this.isQuizActive) return;
            
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.answer-option');
                if (options[optionIndex]) {
                    this.selectAnswer(optionIndex);
                }
            } else if (e.key === 'Enter') {
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.nextQuestion();
                }
            } else if (e.key === 'ArrowLeft') {
                this.previousQuestion();
            } else if (e.key === 'ArrowRight') {
                this.nextQuestion();
            }
        });
    }

    startQuiz() {
        const selectedCategory = document.querySelector('.category-btn.active').dataset.category;
        this.currentCategory = selectedCategory;
        
        // 問題を取得（最大20問）
        this.questions = getQuestionsByCategory(this.currentCategory, 20);
        
        if (this.questions.length === 0) {
            alert('選択したカテゴリーに問題がありません。');
            return;
        }

        this.currentQuestionIndex = 0;
        this.answers = {};
        this.isQuizActive = true;
        
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
        
        // 難易度バッジの色を取得
        const difficultyClass = `difficulty-${question.difficulty}`;
        const difficultyText = {
            easy: '初級',
            medium: '中級',
            hard: '上級'
        }[question.difficulty];
        
        let html = `
            <div class="question-card">
                <div>
                    <span class="question-number">問題 ${this.currentQuestionIndex + 1}</span>
                    <span class="difficulty-badge ${difficultyClass}">${difficultyText}</span>
                </div>
                <div class="question-text">${this.escapeHtml(question.question)}</div>
                <div class="answer-options">
        `;
        
        // 選択肢をシャッフル（オプション）
        const options = question.options.map((opt, idx) => ({text: opt, originalIndex: idx}));
        
        options.forEach((option, idx) => {
            const isSelected = this.answers[question.id] === option.originalIndex;
            const label = ['A', 'B', 'C', 'D'][idx];
            
            html += `
                <div class="answer-option ${isSelected ? 'selected' : ''}" 
                     onclick="quiz.selectAnswer(${option.originalIndex})"
                     data-original-index="${option.originalIndex}">
                    <span class="answer-label">${label}</span>
                    ${this.escapeHtml(option.text)}
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="explanation" id="explanation">
                    <strong><i class="fas fa-lightbulb"></i> 解説：</strong><br>
                    ${this.escapeHtml(question.explanation)}
                </div>
            </div>
        `;
        
        questionArea.innerHTML = html;
        
        // 進捗バーを更新
        this.updateProgress();
        
        // ボタンの状態を更新
        this.updateNavigationButtons();
    }

    selectAnswer(answerIndex) {
        const question = this.questions[this.currentQuestionIndex];
        this.answers[question.id] = answerIndex;
        
        // 選択状態を更新
        document.querySelectorAll('.answer-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector(`.answer-option[data-original-index="${answerIndex}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        // 自動的に次の問題へ（最後の問題以外）
        if (this.currentQuestionIndex < this.questions.length - 1) {
            setTimeout(() => this.nextQuestion(), 300);
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
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
        
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
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
        if (!confirm('テストを終了しますか？未回答の問題がある場合、不正解として扱われます。')) {
            return;
        }
        
        this.isQuizActive = false;
        this.stopTimer();
        this.showResults();
    }

    showResults() {
        // 結果を計算
        let correctCount = 0;
        const results = [];
        
        this.questions.forEach(question => {
            const userAnswer = this.answers[question.id];
            const isCorrect = userAnswer === question.correct;
            if (isCorrect) correctCount++;
            
            results.push({
                question: question.question,
                userAnswer: userAnswer !== undefined ? question.options[userAnswer] : '未回答',
                correctAnswer: question.options[question.correct],
                isCorrect: isCorrect,
                explanation: question.explanation
            });
        });
        
        const score = Math.round((correctCount / this.questions.length) * 100);
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        
        // スコア表示
        document.getElementById('scoreNumber').textContent = `${score}%`;
        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('incorrectCount').textContent = this.questions.length - correctCount;
        document.getElementById('timeSpent').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // メッセージ
        let message = '';
        if (score >= 90) {
            message = '素晴らしい！Rails継承チェーンをマスターしています！🎉';
        } else if (score >= 70) {
            message = 'よくできました！理解度は良好です！👍';
        } else if (score >= 50) {
            message = 'まずまずの結果です。復習してみましょう！📚';
        } else {
            message = 'もう少し頑張りましょう。各ページを見直してください！💪';
        }
        document.getElementById('scoreMessage').textContent = message;
        
        // 詳細結果
        let summaryHTML = '';
        results.forEach((result, idx) => {
            const icon = result.isCorrect ? 
                '<i class="fas fa-check-circle" style="color: #16a34a;"></i>' : 
                '<i class="fas fa-times-circle" style="color: #dc2626;"></i>';
            
            summaryHTML += `
                <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-icon">${icon}</div>
                    <div style="flex: 1;">
                        <div style="font-weight: bold; margin-bottom: 5px;">
                            問題${idx + 1}: ${this.escapeHtml(result.question)}
                        </div>
                        <div style="font-size: 14px; color: #6b7280;">
                            あなたの回答: ${this.escapeHtml(result.userAnswer)}
                        </div>
                        ${!result.isCorrect ? `
                            <div style="font-size: 14px; color: #16a34a;">
                                正解: ${this.escapeHtml(result.correctAnswer)}
                            </div>
                            <div style="font-size: 13px; color: #9ca3af; margin-top: 5px;">
                                ${this.escapeHtml(result.explanation)}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
        document.getElementById('resultsSummary').innerHTML = summaryHTML;
        
        // UIの切り替え
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('resultsContainer').classList.add('active');
        
        // 結果を保存
        this.saveResults(score, correctCount, timeSpent);
    }

    retryQuiz() {
        this.startQuiz();
    }

    resetQuiz() {
        this.isQuizActive = false;
        this.stopTimer();
        this.currentQuestionIndex = 0;
        this.answers = {};
        
        document.getElementById('categorySelection').style.display = 'block';
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('resultsContainer').classList.remove('active');
    }

    saveResults(score, correctCount, timeSpent) {
        const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
        results.push({
            category: this.currentCategory,
            score: score,
            correctCount: correctCount,
            totalQuestions: this.questions.length,
            timeSpent: timeSpent,
            date: new Date().toISOString()
        });
        
        // 最新の10件のみ保存
        if (results.length > 10) {
            results.shift();
        }
        
        localStorage.setItem('quizResults', JSON.stringify(results));
    }

    loadSavedProgress() {
        // 将来の実装用
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// グローバル変数としてインスタンスを作成
const quiz = new QuizEngine();

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