// グローバル検索機能
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    const searchStatus = document.getElementById('searchStatus');
    
    if (!searchInput) return;
    
    // 検索実行
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            clearHighlights();
            if (searchStatus) searchStatus.textContent = '';
            return;
        }
        
        // 全ての検索対象要素を取得
        const searchableElements = document.querySelectorAll(
            'p, h1, h2, h3, h4, h5, h6, li, td, th, .code-snippet, .chat-bubble, .learning-step, .pro-tip, .warning-box'
        );
        
        let matchCount = 0;
        clearHighlights();
        
        searchableElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(searchTerm)) {
                highlightText(element, searchTerm);
                matchCount++;
            }
        });
        
        // 検索結果の表示
        if (searchStatus) {
            if (matchCount > 0) {
                searchStatus.textContent = `${matchCount}件の結果が見つかりました`;
                searchStatus.style.color = '#10b981';
                
                // 最初の結果にスクロール
                const firstHighlight = document.querySelector('.search-highlight');
                if (firstHighlight) {
                    firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                searchStatus.textContent = '結果が見つかりませんでした';
                searchStatus.style.color = '#ef4444';
            }
        }
    }
    
    // テキストをハイライト
    function highlightText(element, searchTerm) {
        const innerHTML = element.innerHTML;
        const textContent = element.textContent;
        
        // 既にハイライトされている場合はスキップ
        if (innerHTML.includes('search-highlight')) return;
        
        // HTMLタグを含む要素の場合は、テキストノードのみを処理
        if (element.children.length > 0) {
            highlightTextNodes(element, searchTerm);
        } else {
            // シンプルなテキスト要素の場合
            const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
            element.innerHTML = innerHTML.replace(regex, '<span class="search-highlight">$1</span>');
        }
    }
    
    // テキストノードのみをハイライト
    function highlightTextNodes(element, searchTerm) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.toLowerCase().includes(searchTerm)) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            const span = document.createElement('span');
            span.innerHTML = textNode.textContent.replace(
                new RegExp(`(${escapeRegex(searchTerm)})`, 'gi'),
                '<span class="search-highlight">$1</span>'
            );
            textNode.parentNode.replaceChild(span, textNode);
        });
    }
    
    // 正規表現エスケープ
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // ハイライトをクリア
    function clearHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize(); // 隣接するテキストノードを結合
        });
    }
    
    // イベントリスナー
    searchInput.addEventListener('input', debounce(performSearch, 300));
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            clearHighlights();
            if (searchStatus) searchStatus.textContent = '';
        }
    });
    
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            clearHighlights();
            if (searchStatus) searchStatus.textContent = '';
            searchInput.focus();
        });
    }
    
    // デバウンス関数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 検索結果間のナビゲーション
    let currentHighlightIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'F3' || (e.key === 'g' && (e.ctrlKey || e.metaKey))) && !e.shiftKey) {
            e.preventDefault();
            navigateHighlights(1);
        } else if ((e.key === 'F3' || (e.key === 'g' && (e.ctrlKey || e.metaKey))) && e.shiftKey) {
            e.preventDefault();
            navigateHighlights(-1);
        }
    });
    
    function navigateHighlights(direction) {
        const highlights = document.querySelectorAll('.search-highlight');
        if (highlights.length === 0) return;
        
        // 現在のハイライトからcurrentクラスを削除
        highlights.forEach(h => h.classList.remove('current-highlight'));
        
        // インデックスを更新
        currentHighlightIndex = (currentHighlightIndex + direction + highlights.length) % highlights.length;
        
        // 新しいハイライトにcurrentクラスを追加してスクロール
        const currentHighlight = highlights[currentHighlightIndex];
        currentHighlight.classList.add('current-highlight');
        currentHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', initializeSearch);