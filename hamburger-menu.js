// ハンバーガーメニューの機能
class HamburgerMenu {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        this.createMenuHTML();
        this.attachEventListeners();
        this.setActivePage();
    }

    createMenuHTML() {
        const menuHTML = `
            <!-- ハンバーガーメニュー -->
            <div class="hamburger-menu">
                <div class="menu-header">
                    <div class="menu-title">
                        <i class="fas fa-gem"></i>
                        <span class="title-text">Rails 継承チェーン</span>
                    </div>
                    <div class="header-search">
                        <i class="fas fa-search header-search-icon"></i>
                        <input type="text" id="globalSearchInput" class="header-search-input" placeholder="全ページから検索...">
                        <button class="header-search-clear" id="clearGlobalSearch" onclick="this.previousElementSibling.value=''; this.previousElementSibling.focus(); window.searchEngine && window.searchEngine.clearSearch();">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="hamburger-icon" id="hamburgerToggle">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </div>
                </div>
            </div>

            <!-- メニューコンテナ -->
            <div class="menu-container" id="menuContainer">
                <div class="menu-items">
                    <!-- 学習コンテンツ -->
                    <div class="menu-section">
                        <div class="menu-section-title">学習コンテンツ</div>
                        <a href="index.html" class="menu-item" data-page="index.html">
                            <i class="fas fa-home"></i>
                            基礎概念と継承チェーン
                            <span class="page-number">1</span>
                        </a>
                        <a href="page2.html" class="menu-item" data-page="page2.html">
                            <i class="fas fa-th-list"></i>
                            Rails主要クラス一覧
                            <span class="page-number">2</span>
                        </a>
                        <a href="page3.html" class="menu-item" data-page="page3.html">
                            <i class="fas fa-exchange-alt"></i>
                            対になるメソッド完全版
                            <span class="page-number">3</span>
                        </a>
                        <a href="page4.html" class="menu-item" data-page="page4.html">
                            <i class="fas fa-folder-tree"></i>
                            クラス継承とディレクトリ
                            <span class="page-number">4</span>
                            <span class="menu-item-badge">NEW</span>
                        </a>
                        <a href="page5.html" class="menu-item" data-page="page5.html">
                            <i class="fas fa-code-branch"></i>
                            プロパティとメソッド継承
                            <span class="page-number">5</span>
                            <span class="menu-item-badge">NEW</span>
                        </a>
                        <a href="page6.html" class="menu-item" data-page="page6.html">
                            <i class="fas fa-brain"></i>
                            理解度テスト
                            <span class="page-number">6</span>
                            <span class="menu-item-badge">QUIZ</span>
                        </a>
                    </div>

                    <!-- 便利機能 -->
                    <div class="menu-section">
                        <div class="menu-section-title">便利機能</div>
                        <a href="#" class="menu-item" onclick="window.print(); return false;">
                            <i class="fas fa-print"></i>
                            このページを印刷
                        </a>
                        <a href="#" class="menu-item" onclick="toggleDarkMode(); return false;">
                            <i class="fas fa-moon"></i>
                            ダークモード切替
                        </a>
                    </div>

                    <!-- 外部リンク -->
                    <div class="menu-section">
                        <div class="menu-section-title">参考リソース</div>
                        <a href="https://guides.rubyonrails.org/" target="_blank" class="menu-item">
                            <i class="fas fa-external-link-alt"></i>
                            Rails公式ガイド
                        </a>
                        <a href="https://api.rubyonrails.org/" target="_blank" class="menu-item">
                            <i class="fas fa-book"></i>
                            Rails APIドキュメント
                        </a>
                        <a href="https://github.com/rails/rails" target="_blank" class="menu-item">
                            <i class="fab fa-github"></i>
                            Rails GitHub
                        </a>
                    </div>
                </div>

                <!-- フッター -->
                <div class="menu-footer">
                    <div class="menu-footer-text">
                        Rails 継承チェーン学習ガイド v2.0<br>
                        © 2024 Rails Learning Project
                    </div>
                </div>
            </div>

            <!-- オーバーレイ -->
            <div class="menu-overlay" id="menuOverlay"></div>

            <!-- パンくずリスト -->
            <div class="breadcrumb" id="breadcrumb">
                <!-- 動的に生成 -->
            </div>
        `;

        // ボディの最初に挿入
        document.body.insertAdjacentHTML('afterbegin', menuHTML);
    }

    attachEventListeners() {
        const hamburgerToggle = document.getElementById('hamburgerToggle');
        const menuContainer = document.getElementById('menuContainer');
        const menuOverlay = document.getElementById('menuOverlay');

        // ハンバーガーアイコンクリック
        hamburgerToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // オーバーレイクリックでメニューを閉じる
        menuOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });

        // メニューアイテムクリックでメニューを閉じる
        const menuItems = document.querySelectorAll('.menu-item[data-page]');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => this.closeMenu(), 100);
            });
        });
    }

    toggleMenu() {
        const hamburgerIcon = document.getElementById('hamburgerToggle');
        const menuContainer = document.getElementById('menuContainer');
        const menuOverlay = document.getElementById('menuOverlay');

        hamburgerIcon.classList.toggle('active');
        menuContainer.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    }

    closeMenu() {
        const hamburgerIcon = document.getElementById('hamburgerToggle');
        const menuContainer = document.getElementById('menuContainer');
        const menuOverlay = document.getElementById('menuOverlay');

        hamburgerIcon.classList.remove('active');
        menuContainer.classList.remove('active');
        menuOverlay.classList.remove('active');
    }

    setActivePage() {
        // 現在のページをアクティブに設定
        const menuItems = document.querySelectorAll('.menu-item[data-page]');
        menuItems.forEach(item => {
            if (item.getAttribute('data-page') === this.currentPage) {
                item.classList.add('active');
            }
        });

        // パンくずリストを生成
        this.generateBreadcrumb();
    }

    generateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        if (!breadcrumb) return;

        const pages = {
            'index.html': 'ホーム',
            'page2.html': 'Rails主要クラス一覧',
            'page3.html': '対になるメソッド',
            'page4.html': 'クラス継承とディレクトリ',
            'page5.html': 'プロパティとメソッド継承',
            'page6.html': '理解度テスト'
        };

        let breadcrumbHTML = '<a href="index.html"><i class="fas fa-home"></i> ホーム</a>';

        if (this.currentPage !== 'index.html' && pages[this.currentPage]) {
            breadcrumbHTML += ' <span class="breadcrumb-separator">/</span> ';
            breadcrumbHTML += `<span>${pages[this.currentPage]}</span>`;
        }

        breadcrumb.innerHTML = breadcrumbHTML;
    }
}

// ダークモード切替
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    
    // アイコンを変更
    const icon = document.querySelector('.menu-item[onclick*="toggleDarkMode"] i');
    if (icon) {
        icon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ダークモードの初期設定
function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// クイックアクセスボタンの作成
function createQuickAccessButtons() {
    const quickAccessHTML = `
        <div class="quick-access">
            <button class="quick-btn primary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" title="ページトップへ">
                <i class="fas fa-arrow-up"></i>
            </button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', quickAccessHTML);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new HamburgerMenu();
    initDarkMode();
    createQuickAccessButtons();
    
    // メインコンテンツにラッパークラスを追加
    const mainContent = document.querySelector('.container, .bg-gradient-to-br, body > div:not(.hamburger-menu):not(.menu-container):not(.menu-overlay):not(.breadcrumb):not(.quick-access):not(.global-search-container)');
    if (mainContent && !mainContent.classList.contains('main-content-wrapper')) {
        mainContent.classList.add('main-content-wrapper');
    }
});