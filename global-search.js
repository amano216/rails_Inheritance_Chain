// グローバル検索機能 - 全ページのコンテンツを検索
const pageContents = {
    'index.html': {
        title: 'Rails 継承チェーン ビジュアル化',
        keywords: ['Rails', '継承チェーン', 'ActiveRecord', 'ActionController', 'ActionView', 'Ruby on Rails', 'MVCモデル'],
        searchableContent: ''
    },
    'page2.html': {
        title: 'Rails 主要クラス完全ガイド',
        keywords: ['ActiveRecord', 'ActionController', 'ActionView', 'ActiveJob', 'ActionMailer', 'ActionCable', 'ActiveStorage'],
        searchableContent: ''
    },
    'page3.html': {
        title: 'Rails 対になるメソッド完全ガイド',
        keywords: ['create', 'destroy', 'save', 'delete', 'before', 'after', 'valid', 'invalid', 'has_many', 'belongs_to'],
        searchableContent: ''
    }
};

class GlobalSearchEngine {
    constructor() {
        this.searchIndex = [];
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.initializeSearchIndex();
    }

    async initializeSearchIndex() {
        // 現在のページ以外のコンテンツをプリロード
        for (const [page, data] of Object.entries(pageContents)) {
            if (page !== this.currentPage) {
                try {
                    const response = await fetch(page);
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    // テキストコンテンツを抽出
                    const textElements = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th, .code-snippet, .method-name, .method-desc');
                    let contentText = '';
                    textElements.forEach(el => {
                        contentText += ' ' + el.textContent;
                    });
                    
                    pageContents[page].searchableContent = contentText.toLowerCase();
                    
                    // インデックスに追加
                    this.searchIndex.push({
                        page: page,
                        title: data.title,
                        content: contentText.toLowerCase(),
                        keywords: data.keywords
                    });
                } catch (e) {
                    console.error(`Failed to load ${page}:`, e);
                }
            }
        }
    }

    search(query) {
        const searchTerm = query.toLowerCase().trim();
        if (!searchTerm) return { currentPage: [], otherPages: [] };

        const results = {
            currentPage: [],
            otherPages: []
        };

        // 現在のページを検索
        const currentPageElements = document.querySelectorAll(
            'p, h1, h2, h3, h4, h5, h6, li, td, th, .code-snippet, .method-name, .method-desc, .chat-bubble, .learning-step, .pro-tip, .warning-box'
        );
        
        currentPageElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(searchTerm)) {
                results.currentPage.push({
                    element: element,
                    text: this.getSnippet(element.textContent, searchTerm)
                });
            }
        });

        // 他のページを検索
        this.searchIndex.forEach(pageData => {
            if (pageData.content.includes(searchTerm) || 
                pageData.keywords.some(k => k.toLowerCase().includes(searchTerm))) {
                const matches = this.findMatches(pageData.content, searchTerm);
                if (matches.length > 0) {
                    results.otherPages.push({
                        page: pageData.page,
                        title: pageData.title,
                        matches: matches,
                        matchCount: matches.length
                    });
                }
            }
        });

        return results;
    }

    findMatches(content, searchTerm) {
        const matches = [];
        const regex = new RegExp(`.{0,50}${this.escapeRegex(searchTerm)}.{0,50}`, 'gi');
        const found = content.match(regex);
        if (found) {
            found.slice(0, 5).forEach(match => {
                matches.push(match.trim());
            });
        }
        return matches;
    }

    getSnippet(text, searchTerm) {
        const index = text.toLowerCase().indexOf(searchTerm);
        if (index === -1) return text.substring(0, 100) + '...';
        
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + searchTerm.length + 50);
        let snippet = text.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        
        return snippet;
    }

    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    highlightText(element, searchTerm) {
        const innerHTML = element.innerHTML;
        if (innerHTML.includes('search-highlight')) return;
        
        if (element.children.length === 0) {
            const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
            element.innerHTML = innerHTML.replace(regex, '<span class="search-highlight">$1</span>');
        }
    }

    clearHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }
}

// グローバル検索UIの初期化
function initializeGlobalSearch() {
    const searchEngine = new GlobalSearchEngine();
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('globalSearchResults');
    const clearButton = document.getElementById('clearGlobalSearch');
    
    if (!searchInput) return;

    function performGlobalSearch() {
        const query = searchInput.value;
        
        if (!query.trim()) {
            searchEngine.clearHighlights();
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }

        const results = searchEngine.search(query);
        
        // 現在のページのハイライト
        searchEngine.clearHighlights();
        results.currentPage.forEach(result => {
            searchEngine.highlightText(result.element, query);
        });

        // 検索結果の表示
        displaySearchResults(results, query);
    }

    function displaySearchResults(results, query) {
        let html = '<div class="search-results-container">';
        
        // 現在のページの結果
        if (results.currentPage.length > 0) {
            html += `
                <div class="search-section">
                    <h3 class="search-section-title">
                        <i class="fas fa-file-alt"></i> 現在のページ
                        <span class="result-count">${results.currentPage.length}件</span>
                    </h3>
                    <div class="current-page-info">
                        ${results.currentPage.length}件の結果が見つかりました
                        <button class="jump-to-first" onclick="document.querySelector('.search-highlight').scrollIntoView({behavior: 'smooth', block: 'center'})">
                            <i class="fas fa-arrow-down"></i> 最初の結果へ
                        </button>
                    </div>
                </div>
            `;
        }
        
        // 他のページの結果
        if (results.otherPages.length > 0) {
            html += '<div class="search-section"><h3 class="search-section-title"><i class="fas fa-folder-open"></i> 他のページ</h3>';
            
            results.otherPages.forEach(pageResult => {
                html += `
                    <div class="other-page-result">
                        <div class="page-result-header">
                            <a href="${pageResult.page}?search=${encodeURIComponent(query)}" class="page-link">
                                <i class="fas fa-external-link-alt"></i> ${pageResult.title}
                            </a>
                            <span class="match-count">${pageResult.matchCount}件</span>
                        </div>
                        <div class="match-snippets">
                `;
                
                pageResult.matches.slice(0, 3).forEach(match => {
                    const highlighted = match.replace(
                        new RegExp(`(${searchEngine.escapeRegex(query)})`, 'gi'),
                        '<mark>$1</mark>'
                    );
                    html += `<div class="snippet">${highlighted}</div>`;
                });
                
                html += '</div></div>';
            });
            
            html += '</div>';
        }
        
        // 結果がない場合
        if (results.currentPage.length === 0 && results.otherPages.length === 0) {
            html += `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>「${query}」に一致する結果が見つかりませんでした</p>
                </div>
            `;
        }
        
        html += '</div>';
        searchResults.innerHTML = html;
        searchResults.style.display = 'block';
    }

    // イベントリスナー
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performGlobalSearch, 300);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchEngine.clearHighlights();
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        }
    });

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            searchEngine.clearHighlights();
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            searchInput.focus();
        });
    }

    // URLパラメータから検索クエリを取得
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        searchInput.value = searchQuery;
        setTimeout(() => performGlobalSearch(), 500);
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', initializeGlobalSearch);