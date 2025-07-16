// Constants
const BASE_URL = 'https://github-visitor-counter-zeta.vercel.app';
const API_ENDPOINT = '/api';

// DOM Elements
const elements = {
    username: document.getElementById('username'),
    theme: document.getElementById('theme'),
    columns: document.getElementById('columns'),
    columnsValue: document.getElementById('columnsValue'),
    maxflags: document.getElementById('maxflags'),
    maxflagsValue: document.getElementById('maxflagsValue'),
    label: document.getElementById('label'),
    showcount: document.getElementById('showcount'),
    size: document.getElementById('size'),
    bg: document.getElementById('bg'),
    bgPicker: document.getElementById('bgPicker'),
    text: document.getElementById('text'),
    textPicker: document.getElementById('textPicker'),
    border: document.getElementById('border'),
    borderPicker: document.getElementById('borderPicker'),
    preview: document.getElementById('preview'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    markdownCode: document.getElementById('markdownCode'),
    copyButton: document.getElementById('copyButton')
};

// Theme definitions
const themes = {
    default: { bg: 'FFFFFF', text: '000000', border: 'CCCCCC' },
    dark: { bg: '0D1117', text: 'C9D1D9', border: '30363D' },
    github: { bg: '24292E', text: 'FFFFFF', border: '444D56' },
    github_dark: { bg: '161B22', text: 'E6EDF3', border: '30363D' },
    transparent: { bg: 'FFFFFF', text: '000000', border: 'FFFFFF' }
};

// Debounce function
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

// Update preview
function updatePreview() {
    const username = elements.username.value.trim();
    
    if (!username) {
        elements.preview.src = `${API_ENDPOINT}?username=github`;
        updateMarkdownCode();
        return;
    }
    
    // Show loading overlay
    elements.loadingOverlay.classList.add('active');
    
    // Build URL parameters
    const params = new URLSearchParams();
    params.append('username', username);
    
    const theme = elements.theme.value;
    if (theme !== 'default') {
        params.append('theme', theme);
    }
    
    const columns = elements.columns.value;
    if (columns !== '2') {
        params.append('columns', columns);
    }
    
    const maxflags = elements.maxflags.value;
    if (maxflags !== '10') {
        params.append('maxflags', maxflags);
    }
    
    const label = elements.label.value.trim();
    if (label && label !== 'Visitors') {
        params.append('label', label);
    }
    
    if (!elements.showcount.checked) {
        params.append('showcount', 'false');
    }
    
    const size = elements.size.value;
    if (size !== 'medium') {
        params.append('size', size);
    }
    
    // Custom colors
    const bg = elements.bg.value.trim();
    if (bg && bg !== themes[theme]?.bg) {
        params.append('bg', bg);
    }
    
    const text = elements.text.value.trim();
    if (text && text !== themes[theme]?.text) {
        params.append('text', text);
    }
    
    const border = elements.border.value.trim();
    if (border && border !== themes[theme]?.border) {
        params.append('border', border);
    }
    
    // Update preview image
    const newSrc = `${API_ENDPOINT}?${params.toString()}`;
    elements.preview.src = newSrc;
    
    // Update markdown code
    updateMarkdownCode();
}

// Update markdown code
function updateMarkdownCode() {
    const username = elements.username.value.trim();
    
    if (!username) {
        elements.markdownCode.textContent = `![](${BASE_URL}/api?username=YOUR_USERNAME)`;
        return;
    }
    
    // Build the same URL as preview
    const params = new URLSearchParams();
    params.append('username', username);
    
    const theme = elements.theme.value;
    if (theme !== 'default') {
        params.append('theme', theme);
    }
    
    const columns = elements.columns.value;
    if (columns !== '2') {
        params.append('columns', columns);
    }
    
    const maxflags = elements.maxflags.value;
    if (maxflags !== '10') {
        params.append('maxflags', maxflags);
    }
    
    const label = elements.label.value.trim();
    if (label && label !== 'Visitors') {
        params.append('label', label);
    }
    
    if (!elements.showcount.checked) {
        params.append('showcount', 'false');
    }
    
    const size = elements.size.value;
    if (size !== 'medium') {
        params.append('size', size);
    }
    
    // Custom colors
    const currentTheme = themes[theme] || themes.default;
    const bg = elements.bg.value.trim();
    if (bg && bg !== currentTheme.bg) {
        params.append('bg', bg);
    }
    
    const text = elements.text.value.trim();
    if (text && text !== currentTheme.text) {
        params.append('text', text);
    }
    
    const border = elements.border.value.trim();
    if (border && border !== currentTheme.border) {
        params.append('border', border);
    }
    
    const url = `${BASE_URL}/api?${params.toString()}`;
    elements.markdownCode.textContent = `![](${url})`;
}

// Debounced update function
const debouncedUpdate = debounce(updatePreview, 500);

// Event listeners
elements.username.addEventListener('input', debouncedUpdate);
elements.theme.addEventListener('change', () => {
    updateThemeColors();
    updatePreview();
});
elements.columns.addEventListener('input', (e) => {
    elements.columnsValue.textContent = e.target.value;
    debouncedUpdate();
});
elements.maxflags.addEventListener('input', (e) => {
    elements.maxflagsValue.textContent = e.target.value;
    debouncedUpdate();
});
elements.label.addEventListener('input', debouncedUpdate);
elements.showcount.addEventListener('change', updatePreview);
elements.size.addEventListener('change', updatePreview);

// Color input handling
function setupColorInput(textInput, colorPicker) {
    textInput.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
        e.target.value = value;
        if (value.length === 6) {
            colorPicker.value = `#${value}`;
            debouncedUpdate();
        }
    });
    
    colorPicker.addEventListener('input', (e) => {
        const hex = e.target.value.substring(1).toUpperCase();
        textInput.value = hex;
        debouncedUpdate();
    });
}

setupColorInput(elements.bg, elements.bgPicker);
setupColorInput(elements.text, elements.textPicker);
setupColorInput(elements.border, elements.borderPicker);

// Update theme colors
function updateThemeColors() {
    const theme = elements.theme.value;
    const themeColors = themes[theme] || themes.default;
    
    elements.bg.placeholder = themeColors.bg;
    elements.text.placeholder = themeColors.text;
    elements.border.placeholder = themeColors.border;
    
    // Clear custom colors when theme changes
    elements.bg.value = '';
    elements.text.value = '';
    elements.border.value = '';
    
    elements.bgPicker.value = `#${themeColors.bg}`;
    elements.textPicker.value = `#${themeColors.text}`;
    elements.borderPicker.value = `#${themeColors.border}`;
}

// Copy to clipboard
elements.copyButton.addEventListener('click', async () => {
    const code = elements.markdownCode.textContent;
    
    try {
        await navigator.clipboard.writeText(code);
        
        // Show success state
        elements.copyButton.classList.add('success');
        elements.copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;
        
        // Reset after 2 seconds
        setTimeout(() => {
            elements.copyButton.classList.remove('success');
            elements.copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
            `;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
});

// Handle image load
elements.preview.addEventListener('load', () => {
    elements.loadingOverlay.classList.remove('active');
});

elements.preview.addEventListener('error', () => {
    elements.loadingOverlay.classList.remove('active');
});

// Initialize
updateThemeColors();
updatePreview();

// Auto-focus username input
elements.username.focus();