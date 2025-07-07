// YouTube Video Summarizer - Main JavaScript File

class YouTubeSummarizer {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeTheme();
    }

    initializeElements() {
        // Main elements
        this.themeToggle = document.getElementById('themeToggle');
        this.videoUrlInput = document.getElementById('videoUrl');
        this.languageSelect = document.getElementById('outputLanguage');
        this.summarizeBtn = document.getElementById('summarizeBtn');
        
        // Section elements
        this.loadingContainer = document.getElementById('loadingContainer');
        this.exportSection = document.getElementById('exportSection');
        this.resultsSection = document.getElementById('resultsSection');
        
        // Tab elements
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        
        // Export buttons
        this.exportPdfBtn = document.getElementById('exportPdf');
        this.exportTxtBtn = document.getElementById('exportTxt');
        this.exportPngBtn = document.getElementById('exportPng');
    }

    initializeEventListeners() {
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Summarize button
        this.summarizeBtn.addEventListener('click', () => this.handleSummarize());
        
        // Tab navigation
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Export buttons (placeholder functionality)
        this.exportPdfBtn.addEventListener('click', () => this.handleExport('pdf'));
        this.exportTxtBtn.addEventListener('click', () => this.handleExport('txt'));
        this.exportPngBtn.addEventListener('click', () => this.handleExport('png'));
        
        // URL input validation
        this.videoUrlInput.addEventListener('input', () => this.validateUrl());
        
        // Enter key support for URL input
        this.videoUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSummarize();
            }
        });
    }

    initializeTheme() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
            this.themeToggle.title = 'Switch to light mode';
        } else {
            icon.className = 'fas fa-sun';
            this.themeToggle.title = 'Switch to dark mode';
        }
    }

    validateUrl() {
        const url = this.videoUrlInput.value.trim();
        const isValid = this.isValidYouTubeUrl(url);
        
        // Update input styling based on validation
        if (url && !isValid) {
            this.videoUrlInput.style.borderColor = 'var(--accent-danger)';
        } else {
            this.videoUrlInput.style.borderColor = 'var(--border-color)';
        }
        
        return isValid;
    }

    isValidYouTubeUrl(url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)[a-zA-Z0-9_-]{11}/;
        return youtubeRegex.test(url);
    }

    async handleSummarize() {
        const url = this.videoUrlInput.value.trim();
        const language = this.languageSelect.value;
        
        // Validate URL
        if (!url) {
            this.showError('Please enter a YouTube video URL');
            return;
        }
        
        if (!this.isValidYouTubeUrl(url)) {
            this.showError('Please enter a valid YouTube video URL');
            return;
        }
        
        try {
            // Show loading state
            this.showLoading();
            
            // Simulate API call (replace with actual implementation)
            await this.simulateProcessing();
            
            // Show results
            this.showResults();
            this.loadDemoContent();
            
        } catch (error) {
            this.hideLoading();
            this.showError('An error occurred while processing the video. Please try again.');
            console.error('Error:', error);
        }
    }

    showLoading() {
        this.loadingContainer.style.display = 'block';
        this.exportSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.summarizeBtn.disabled = true;
        this.summarizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    hideLoading() {
        this.loadingContainer.style.display = 'none';
        this.summarizeBtn.disabled = false;
        this.summarizeBtn.innerHTML = '<i class="fas fa-magic"></i> Summarize Video';
    }

    showResults() {
        this.hideLoading();
        this.exportSection.style.display = 'block';
        this.resultsSection.style.display = 'block';
        
        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add error styles if not already present
        if (!document.querySelector('.error-notification-styles')) {
            const style = document.createElement('style');
            style.className = 'error-notification-styles';
            style.textContent = `
                .error-notification {
                    background: var(--accent-danger);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: var(--shadow-md);
                    animation: slideIn 0.3s ease-out;
                }
                .error-notification button {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0.25rem;
                    border-radius: 0.25rem;
                    transition: background-color 0.2s;
                }
                .error-notification button:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                @keyframes slideIn {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Insert error notification
        const inputSection = document.querySelector('.input-section');
        inputSection.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    switchTab(tabName) {
        // Remove active class from all tabs and panes
        this.tabBtns.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to selected tab and pane
        const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedPane = document.getElementById(tabName);
        
        if (selectedBtn && selectedPane) {
            selectedBtn.classList.add('active');
            selectedPane.classList.add('active');
        }
    }

    handleExport(format) {
        // Placeholder functionality - would integrate with actual export libraries
        const messages = {
            pdf: 'PDF export functionality will be implemented using html2pdf.js',
            txt: 'TXT export functionality will be implemented using Blob API',
            png: 'PNG export functionality will be implemented using html-to-image'
        };
        
        // Show temporary notification
        this.showExportNotification(format.toUpperCase(), messages[format]);
    }

    showExportNotification(format, message) {
        const notification = document.createElement('div');
        notification.className = 'export-notification';
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <div>
                <strong>${format} Export</strong>
                <p>${message}</p>
            </div>
        `;
        
        // Add notification styles if not already present
        if (!document.querySelector('.export-notification-styles')) {
            const style = document.createElement('style');
            style.className = 'export-notification-styles';
            style.textContent = `
                .export-notification {
                    background: var(--accent-primary);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: var(--shadow-md);
                    animation: slideIn 0.3s ease-out;
                }
                .export-notification p {
                    margin: 0;
                    font-size: 0.875rem;
                    opacity: 0.9;
                }
            `;
            document.head.appendChild(style);
        }
        
        const exportSection = document.querySelector('.export-section');
        exportSection.appendChild(notification);
        
        setTimeout(() => notification.remove(), 4000);
    }

    async simulateProcessing() {
        // Simulate API processing time
        return new Promise(resolve => {
            setTimeout(resolve, 3000); // 3 seconds simulation
        });
    }

    loadDemoContent() {
        // Load demo content for each tab
        this.loadSummaryContent();
        this.loadNotesContent();
        this.loadMindMapContent();
        this.loadQnAContent();
    }

    loadSummaryContent() {
        const summaryContent = document.querySelector('.summary-content');
        summaryContent.innerHTML = `
            <div class="demo-content">
                <h4>📹 Video Summary</h4>
                <p>This is a demonstration of the video summary feature. In the actual implementation, 
                this section would contain an AI-generated summary of the YouTube video content, 
                highlighting the main points, key takeaways, and important information discussed in the video.</p>
                
                <h5>Key Points:</h5>
                <ul>
                    <li>🎯 Main topic and purpose of the video</li>
                    <li>📊 Important statistics or data mentioned</li>
                    <li>💡 Key insights and conclusions</li>
                    <li>🔗 Related topics and references</li>
                </ul>
                
                <p><strong>Duration:</strong> Video length and summary ratio would be displayed here.</p>
            </div>
        `;
    }

    loadNotesContent() {
        const notesContent = document.querySelector('.notes-content');
        notesContent.innerHTML = `
            <div class="demo-content">
                <h4>📝 Structured Notes</h4>
                
                <div class="note-section">
                    <h5>🔍 Introduction</h5>
                    <ul>
                        <li>Brief overview of the topic</li>
                        <li>Context and background information</li>
                    </ul>
                </div>
                
                <div class="note-section">
                    <h5>🎯 Main Content</h5>
                    <ul>
                        <li>Primary points discussed in the video</li>
                        <li>Supporting evidence and examples</li>
                        <li>Step-by-step processes (if applicable)</li>
                    </ul>
                </div>
                
                <div class="note-section">
                    <h5>💭 Conclusion</h5>
                    <ul>
                        <li>Summary of key takeaways</li>
                        <li>Final thoughts and recommendations</li>
                    </ul>
                </div>
            </div>
        `;
    }

    loadMindMapContent() {
        const mindmapContent = document.querySelector('.mindmap-content');
        mindmapContent.innerHTML = `
            <div class="demo-content">
                <h4>🧠 Interactive Mind Map</h4>
                <div class="mindmap-placeholder">
                    <i class="fas fa-project-diagram"></i>
                    <p>Mind map visualization will be rendered here using markmap.js library.</p>
                    <p>The mind map will show the hierarchical structure of video content, 
                    connecting related topics and concepts in an interactive visual format.</p>
                    
                    <div class="mindmap-features">
                        <h5>Features:</h5>
                        <ul>
                            <li>🌳 Hierarchical topic organization</li>
                            <li>🎨 Interactive nodes and branches</li>
                            <li>🔍 Expandable/collapsible sections</li>
                            <li>🎯 Click-to-focus functionality</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    loadQnAContent() {
        const qnaContent = document.querySelector('.qna-content');
        qnaContent.innerHTML = `
            <div class="demo-content">
                <h4>❓ Questions & Answers</h4>
                
                <div class="qna-item">
                    <div class="question">
                        <strong>Q1:</strong> What is the main topic of this video?
                    </div>
                    <div class="answer">
                        <strong>A:</strong> This would contain an AI-generated answer based on the video content analysis.
                    </div>
                </div>
                
                <div class="qna-item">
                    <div class="question">
                        <strong>Q2:</strong> What are the key takeaways mentioned?
                    </div>
                    <div class="answer">
                        <strong>A:</strong> The system would identify and list the most important points discussed in the video.
                    </div>
                </div>
                
                <div class="qna-item">
                    <div class="question">
                        <strong>Q3:</strong> How can this information be applied?
                    </div>
                    <div class="answer">
                        <strong>A:</strong> Practical applications and implementation suggestions would be provided here.
                    </div>
                </div>
                
                <p class="qna-note">
                    <i class="fas fa-lightbulb"></i>
                    <em>AI will generate 5-10 relevant questions and answers based on the video transcript.</em>
                </p>
            </div>
        `;
        
        // Add QnA-specific styles
        if (!document.querySelector('.qna-styles')) {
            const style = document.createElement('style');
            style.className = 'qna-styles';
            style.textContent = `
                .qna-item {
                    background: var(--bg-secondary);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    border-left: 4px solid var(--accent-primary);
                }
                .qna-item .question {
                    color: var(--accent-primary);
                    margin-bottom: 0.5rem;
                }
                .qna-item .answer {
                    color: var(--text-secondary);
                }
                .qna-note {
                    background: var(--bg-tertiary);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .note-section {
                    margin-bottom: 1.5rem;
                }
                .note-section h5 {
                    color: var(--accent-primary);
                    margin-bottom: 0.5rem;
                }
                .mindmap-placeholder {
                    text-align: center;
                    padding: 2rem;
                    background: var(--bg-tertiary);
                    border-radius: 0.5rem;
                    border: 2px dashed var(--border-color);
                }
                .mindmap-placeholder i {
                    font-size: 3rem;
                    color: var(--accent-primary);
                    margin-bottom: 1rem;
                    display: block;
                }
                .mindmap-features {
                    margin-top: 1.5rem;
                    text-align: left;
                    max-width: 300px;
                    margin-left: auto;
                    margin-right: auto;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new YouTubeSummarizer();
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';