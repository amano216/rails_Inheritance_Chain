// グローバル検索機能 Version 2 - 事前定義コンテンツを使用
class GlobalSearchEngine {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.pageContents = allPageContents; // page-content.jsから読み込み
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
            'p, h1, h2, h3, h4, h5, h6, li, td, th, .code-snippet, .method-name, .method-desc, .chat-bubble, .learning-step, .pro-tip, .warning-box, span, div.code-example'
        );
        
        const matchedElements = new Set();
        currentPageElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(searchTerm) && !matchedElements.has(element)) {
                matchedElements.add(element);
                results.currentPage.push({
                    element: element,
                    text: this.getSnippet(element.textContent, searchTerm)
                });
            }
        });

        // 他のページを検索
        for (const [page, data] of Object.entries(this.pageContents)) {
            if (page !== this.currentPage) {
                const contentLower = data.content.toLowerCase();
                const titleLower = data.title.toLowerCase();
                const keywordsMatch = data.keywords.some(k => k.toLowerCase().includes(searchTerm));
                const sectionsMatch = data.sections.some(s => s.toLowerCase().includes(searchTerm));
                
                if (contentLower.includes(searchTerm) || titleLower.includes(searchTerm) || keywordsMatch || sectionsMatch) {
                    const matches = this.findMatches(data, searchTerm);
                    if (matches.length > 0) {
                        results.otherPages.push({
                            page: page,
                            title: data.title,
                            matches: matches,
                            matchCount: matches.length
                        });
                    }
                }
            }
        }

        return results;
    }

    findMatches(pageData, searchTerm) {
        const matches = [];
        const searchRegex = new RegExp(this.escapeRegex(searchTerm), 'gi');
        
        // タイトルで検索
        if (pageData.title.toLowerCase().includes(searchTerm)) {
            matches.push({
                type: 'title',
                text: pageData.title
            });
        }
        
        // セクションで検索
        pageData.sections.forEach(section => {
            if (section.toLowerCase().includes(searchTerm)) {
                matches.push({
                    type: 'section',
                    text: section
                });
            }
        });
        
        // コンテンツで検索（最大5件）
        const contentLines = pageData.content.split('\n').map(line => line.trim()).filter(line => line);
        let contentMatches = 0;
        for (const line of contentLines) {
            if (line.toLowerCase().includes(searchTerm) && contentMatches < 5) {
                matches.push({
                    type: 'content',
                    text: this.getSnippet(line, searchTerm)
                });
                contentMatches++;
            }
        }
        
        return matches;
    }

    getSnippet(text, searchTerm) {
        const maxLength = 100;
        const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
        
        if (index === -1) {
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        }
        
        const start = Math.max(0, index - 30);
        const end = Math.min(text.length, index + searchTerm.length + 30);
        let snippet = text.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        
        return snippet;
    }

    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    highlightText(element, searchTerm) {
        if (element.classList.contains('search-processed')) return;
        
        const innerHTML = element.innerHTML;
        if (innerHTML.includes('search-highlight')) return;
        
        element.classList.add('search-processed');
        
        if (element.children.length === 0) {
            const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
            element.innerHTML = innerHTML.replace(regex, '<span class="search-highlight">$1</span>');
        }
    }

    clearHighlights() {
        // ハイライトを削除
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
        
        // 処理済みフラグを削除
        const processed = document.querySelectorAll('.search-processed');
        processed.forEach(el => el.classList.remove('search-processed'));
    }
    
    clearSearch() {
        this.clearHighlights();
        const searchResults = document.getElementById('globalSearchResults');
        if (searchResults) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        }
    }
}

// グローバル検索UIの初期化
function initializeGlobalSearch() {
    const searchEngine = new GlobalSearchEngine();
    window.searchEngine = searchEngine; // グローバルに公開
    
    // ハンバーガーメニュー内の検索入力を優先的に取得
    const headerSearchInput = document.querySelector('.header-search-input');
    // 古い検索UIの入力（後方互換性のため）
    const oldSearchInput = document.querySelector('.global-search-container .global-search-input');
    
    // 使用する検索入力を決定（ヘッダー内を優先）
    const searchInput = headerSearchInput || oldSearchInput;
    
    let searchResults = document.getElementById('globalSearchResults');
    const clearButton = document.querySelector('.header-search-clear') || document.getElementById('clearGlobalSearch');
    
    if (!searchInput) return;
    
    // 検索結果コンテナがなければ作成
    if (!searchResults) {
        const resultsDiv = document.createElement('div');
        resultsDiv.id = 'globalSearchResults';
        document.body.appendChild(resultsDiv);
        searchResults = resultsDiv;
    }

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
                        <button class="jump-to-first" onclick="(function(){
                            const firstHighlight = document.querySelector('.search-highlight');
                            if(firstHighlight) firstHighlight.scrollIntoView({behavior: 'smooth', block: 'center'});
                        })()">
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
                    let icon = '';
                    if (match.type === 'title') icon = '📌 ';
                    else if (match.type === 'section') icon = '📂 ';
                    else icon = '📝 ';
                    
                    const highlighted = match.text.replace(
                        new RegExp(`(${searchEngine.escapeRegex(query)})`, 'gi'),
                        '<mark>$1</mark>'
                    );
                    html += `<div class="snippet">${icon}${highlighted}</div>`;
                });
                
                if (pageResult.matches.length > 3) {
                    html += `<div class="snippet more-results">...他${pageResult.matches.length - 3}件</div>`;
                }
                
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
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const firstLink = searchResults.querySelector('.page-link');
            if (firstLink) {
                window.location.href = firstLink.href;
            }
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