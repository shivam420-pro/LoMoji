import React from 'react';

// Asset Library with categorized icons, shapes, and emojis
const ASSET_LIBRARY = {
  shapes: [
    { id: 'rect', name: 'Rectangle', icon: '▭', type: 'rectangle', fill: '#6366f1' },
    { id: 'circle', name: 'Circle', icon: '●', type: 'circle', fill: '#8b5cf6' },
    { id: 'triangle', name: 'Triangle', icon: '▲', type: 'triangle', fill: '#ec4899' },
    { id: 'star', name: 'Star', icon: '★', type: 'star', fill: '#f59e0b' },
    { id: 'heart', name: 'Heart', icon: '♥', type: 'heart', fill: '#ef4444' },
    { id: 'diamond', name: 'Diamond', icon: '◆', type: 'diamond', fill: '#10b981' },
  ],
  icons: [
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
  ],
  emojis: [
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
  ],
  arrows: [
    { id: 'arrow-up', name: 'Arrow Up', icon: '↑', type: 'emoji', emoji: '↑' },
    { id: 'arrow-down', name: 'Arrow Down', icon: '↓', type: 'emoji', emoji: '↓' },
    { id: 'arrow-left', name: 'Arrow Left', icon: '←', type: 'emoji', emoji: '←' },
    { id: 'arrow-right', name: 'Arrow Right', icon: '→', type: 'emoji', emoji: '→' },
    { id: 'arrow-up-right', name: 'Arrow Up Right', icon: '↗', type: 'emoji', emoji: '↗' },
    { id: 'arrow-down-right', name: 'Arrow Down Right', icon: '↘', type: 'emoji', emoji: '↘' },
  ],
  symbols: [
    { id: 'check', name: 'Check', icon: '✓', type: 'emoji', emoji: '✓' },
    { id: 'cross', name: 'Cross', icon: '✕', type: 'emoji', emoji: '✕' },
    { id: 'plus', name: 'Plus', icon: '➕', type: 'emoji', emoji: '➕' },
    { id: 'minus', name: 'Minus', icon: '➖', type: 'emoji', emoji: '➖' },
    { id: 'info', name: 'Info', icon: 'ℹ️', type: 'emoji', emoji: 'ℹ️' },
    { id: 'warning', name: 'Warning', icon: '⚠️', type: 'emoji', emoji: '⚠️' },
    { id: 'question', name: 'Question', icon: '❓', type: 'emoji', emoji: '❓' },
    { id: 'exclamation', name: 'Exclamation', icon: '❗', type: 'emoji', emoji: '❗' },
  ],
};

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🎨' },
  { id: 'shapes', name: 'Shapes', icon: '▭' },
  { id: 'icons', name: 'Icons', icon: '🔧' },
  { id: 'emojis', name: 'Emojis', icon: '😀' },
  { id: 'arrows', name: 'Arrows', icon: '➡️' },
  { id: 'symbols', name: 'Symbols', icon: '✨' },
];

const AssetsPanel = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onAssetClick,
  onClose
}) => {
  // Get all assets or filtered by category
  const getAllAssets = () => {
    if (selectedCategory === 'all') {
      return Object.values(ASSET_LIBRARY).flat();
    }
    return ASSET_LIBRARY[selectedCategory] || [];
  };

  // Filter assets by search query
  const filteredAssets = getAllAssets().filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="assets-panel panel">
      <div className="panel-header">
        <h3>Assets</h3>
        <button
          className="panel-close-btn"
          onClick={onClose}
        >×</button>
      </div>

      {/* Search Bar */}
      <div className="assets-search">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="assets-search-input"
        />
      </div>

      {/* Assets Grid */}
      <div className="assets-grid">
        {filteredAssets.length === 0 ? (
          <div className="empty-state">No assets found</div>
        ) : (
          filteredAssets.map(asset => (
            <button
              key={asset.id}
              className="asset-item"
              onClick={() => onAssetClick(asset)}
              title={asset.name}
            >
              <div className="asset-icon">{asset.icon}</div>
              <div className="asset-name">{asset.name}</div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AssetsPanel;