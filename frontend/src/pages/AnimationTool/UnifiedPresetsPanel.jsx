import React, { useState } from 'react';

// Unified Asset Library with all presets
const UNIFIED_PRESETS = {
  shapes: {
    title: 'Shapes',
    icon: '▭',
    items: [
      { id: 'rect', name: 'Rectangle', icon: '▭', type: 'rectangle', fill: '#6366f1' },
      { id: 'circle', name: 'Circle', icon: '●', type: 'circle', fill: '#8b5cf6' },
      { id: 'triangle', name: 'Triangle', icon: '▲', type: 'triangle', fill: '#ec4899' },
      { id: 'star', name: 'Star', icon: '★', type: 'star', fill: '#f59e0b' },
      { id: 'heart', name: 'Heart', icon: '♥', type: 'heart', fill: '#ef4444' },
      { id: 'diamond', name: 'Diamond', icon: '◆', type: 'diamond', fill: '#10b981' },
      { id: 'pentagon', name: 'Pentagon', icon: '⬟', type: 'pentagon', fill: '#06b6d4' },
      { id: 'hexagon', name: 'Hexagon', icon: '⬡', type: 'hexagon', fill: '#8b5cf6' },
    ]
  },
  icons: {
    title: 'Icons',
    icon: '🔧',
    items: [
      { id: 'home', name: 'Home', icon: '🏠', type: 'emoji', emoji: '🏠' },
      { id: 'user', name: 'User', icon: '👤', type: 'emoji', emoji: '👤' },
      { id: 'settings', name: 'Settings', icon: '⚙️', type: 'emoji', emoji: '⚙️' },
      { id: 'search', name: 'Search', icon: '🔍', type: 'emoji', emoji: '🔍' },
      { id: 'heart-icon', name: 'Heart', icon: '❤️', type: 'emoji', emoji: '❤️' },
      { id: 'star-icon', name: 'Star', icon: '⭐', type: 'emoji', emoji: '⭐' },
      { id: 'bell', name: 'Bell', icon: '🔔', type: 'emoji', emoji: '🔔' },
      { id: 'mail', name: 'Mail', icon: '✉️', type: 'emoji', emoji: '✉️' },
      { id: 'cart', name: 'Cart', icon: '🛒', type: 'emoji', emoji: '🛒' },
      { id: 'camera', name: 'Camera', icon: '📷', type: 'emoji', emoji: '📷' },
      { id: 'lock', name: 'Lock', icon: '🔒', type: 'emoji', emoji: '🔒' },
      { id: 'unlock', name: 'Unlock', icon: '🔓', type: 'emoji', emoji: '🔓' },
      { id: 'download', name: 'Download', icon: '⬇️', type: 'emoji', emoji: '⬇️' },
      { id: 'upload', name: 'Upload', icon: '⬆️', type: 'emoji', emoji: '⬆️' },
      { id: 'link', name: 'Link', icon: '🔗', type: 'emoji', emoji: '🔗' },
      { id: 'chart', name: 'Chart', icon: '📊', type: 'emoji', emoji: '📊' },
    ]
  },
  emojis: {
    title: 'Emojis',
    icon: '😀',
    items: [
      { id: 'smile', name: 'Smile', icon: '😀', type: 'emoji', emoji: '😀' },
      { id: 'laugh', name: 'Laugh', icon: '😂', type: 'emoji', emoji: '😂' },
      { id: 'love', name: 'Love', icon: '😍', type: 'emoji', emoji: '😍' },
      { id: 'cool', name: 'Cool', icon: '😎', type: 'emoji', emoji: '😎' },
      { id: 'thinking', name: 'Thinking', icon: '🤔', type: 'emoji', emoji: '🤔' },
      { id: 'party', name: 'Party', icon: '🎉', type: 'emoji', emoji: '🎉' },
      { id: 'fire', name: 'Fire', icon: '🔥', type: 'emoji', emoji: '🔥' },
      { id: 'sparkles', name: 'Sparkles', icon: '✨', type: 'emoji', emoji: '✨' },
      { id: 'thumbs-up', name: 'Thumbs Up', icon: '👍', type: 'emoji', emoji: '👍' },
      { id: 'thumbs-down', name: 'Thumbs Down', icon: '👎', type: 'emoji', emoji: '👎' },
      { id: 'clap', name: 'Clap', icon: '👏', type: 'emoji', emoji: '👏' },
      { id: 'wave', name: 'Wave', icon: '👋', type: 'emoji', emoji: '👋' },
      { id: 'rocket', name: 'Rocket', icon: '🚀', type: 'emoji', emoji: '🚀' },
      { id: 'trophy', name: 'Trophy', icon: '🏆', type: 'emoji', emoji: '🏆' },
      { id: 'gift', name: 'Gift', icon: '🎁', type: 'emoji', emoji: '🎁' },
      { id: 'rainbow', name: 'Rainbow', icon: '🌈', type: 'emoji', emoji: '🌈' },
    ]
  },
  arrows: {
    title: 'Arrows',
    icon: '➡️',
    items: [
      { id: 'arrow-up', name: 'Arrow Up', icon: '↑', type: 'emoji', emoji: '↑' },
      { id: 'arrow-down', name: 'Arrow Down', icon: '↓', type: 'emoji', emoji: '↓' },
      { id: 'arrow-left', name: 'Arrow Left', icon: '←', type: 'emoji', emoji: '←' },
      { id: 'arrow-right', name: 'Arrow Right', icon: '→', type: 'emoji', emoji: '→' },
      { id: 'arrow-up-right', name: 'Arrow Up Right', icon: '↗', type: 'emoji', emoji: '↗' },
      { id: 'arrow-down-right', name: 'Arrow Down Right', icon: '↘', type: 'emoji', emoji: '↘' },
      { id: 'arrow-up-left', name: 'Arrow Up Left', icon: '↖', type: 'emoji', emoji: '↖' },
      { id: 'arrow-down-left', name: 'Arrow Down Left', icon: '↙', type: 'emoji', emoji: '↙' },
      { id: 'arrow-circle-right', name: 'Circle Right', icon: '⮕', type: 'emoji', emoji: '⮕' },
      { id: 'arrow-double-right', name: 'Double Right', icon: '⇒', type: 'emoji', emoji: '⇒' },
    ]
  },
  symbols: {
    title: 'Symbols',
    icon: '✨',
    items: [
      { id: 'check', name: 'Check', icon: '✓', type: 'emoji', emoji: '✓' },
      { id: 'cross', name: 'Cross', icon: '✕', type: 'emoji', emoji: '✕' },
      { id: 'plus', name: 'Plus', icon: '➕', type: 'emoji', emoji: '➕' },
      { id: 'minus', name: 'Minus', icon: '➖', type: 'emoji', emoji: '➖' },
      { id: 'info', name: 'Info', icon: 'ℹ️', type: 'emoji', emoji: 'ℹ️' },
      { id: 'warning', name: 'Warning', icon: '⚠️', type: 'emoji', emoji: '⚠️' },
      { id: 'question', name: 'Question', icon: '❓', type: 'emoji', emoji: '❓' },
      { id: 'exclamation', name: 'Exclamation', icon: '❗', type: 'emoji', emoji: '❗' },
      { id: 'dollar', name: 'Dollar', icon: '💲', type: 'emoji', emoji: '💲' },
      { id: 'percent', name: 'Percent', icon: '％', type: 'emoji', emoji: '％' },
    ]
  },
  logos: {
    title: 'Logos',
    icon: '🏢',
    items: [
      { id: 'apple', name: 'Apple', icon: '', type: 'emoji', emoji: '' },
      { id: 'android', name: 'Android', icon: '🤖', type: 'emoji', emoji: '🤖' },
      { id: 'windows', name: 'Windows', icon: '🪟', type: 'emoji', emoji: '🪟' },
      { id: 'chrome', name: 'Chrome', icon: '🌐', type: 'emoji', emoji: '🌐' },
      { id: 'cloud', name: 'Cloud', icon: '☁️', type: 'emoji', emoji: '☁️' },
      { id: 'database', name: 'Database', icon: '🗄️', type: 'emoji', emoji: '🗄️' },
      { id: 'code', name: 'Code', icon: '💻', type: 'emoji', emoji: '💻' },
      { id: 'mobile', name: 'Mobile', icon: '📱', type: 'emoji', emoji: '📱' },
    ]
  }
};

const UnifiedPresetsPanel = ({ onAssetClick, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({ shapes: true });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Filter items based on search
  const getFilteredItems = (items) => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="assets-panel panel">
      <div className="panel-header">
        <h3>Presets</h3>
        <button
          className="panel-close-btn"
          onClick={onClose}
        >×</button>
      </div>

      {/* Search Bar */}
      <div className="assets-search">
        <input
          type="text"
          placeholder="Search presets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="assets-search-input"
        />
      </div>

      {/* Unified Presets with Collapsible Sections */}
      <div className="unified-presets-container">
        {Object.entries(UNIFIED_PRESETS).map(([key, section]) => {
          const filteredItems = getFilteredItems(section.items);

          // Hide section if no items match search
          if (searchQuery && filteredItems.length === 0) return null;

          return (
            <div key={key} className="preset-section">
              {/* Section Header */}
              <button
                className={`preset-section-header ${expandedSections[key] ? 'expanded' : ''}`}
                onClick={() => toggleSection(key)}
              >
                <span className="preset-section-icon">{section.icon}</span>
                <span className="preset-section-title">{section.title}</span>
                <span className="preset-section-count">({filteredItems.length})</span>
                <span className="preset-section-arrow">
                  {expandedSections[key] ? '▼' : '▶'}
                </span>
              </button>

              {/* Section Content */}
              {expandedSections[key] && (
                <div className="preset-section-content">
                  <div className="assets-grid">
                    {filteredItems.map(item => (
                      <button
                        key={item.id}
                        className="asset-item"
                        onClick={() => onAssetClick(item)}
                        title={item.name}
                      >
                        <div className="asset-icon">{item.icon}</div>
                        <div className="asset-name">{item.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show More Button (optional) */}
      <div style={{ padding: '16px', borderTop: '1px solid #3a3a3a' }}>
        <button
          className="btn-secondary"
          onClick={() => {
            // Expand all sections
            const allExpanded = {};
            Object.keys(UNIFIED_PRESETS).forEach(key => {
              allExpanded[key] = true;
            });
            setExpandedSections(allExpanded);
          }}
          style={{ width: '100%', padding: '10px', fontSize: '13px' }}
        >
          + Expand All Sections
        </button>
      </div>
    </div>
  );
};

export default UnifiedPresetsPanel;
