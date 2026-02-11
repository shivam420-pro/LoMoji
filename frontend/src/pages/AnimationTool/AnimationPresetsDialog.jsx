import React, { useState, useMemo } from 'react';
import './AnimationTool.css';

// Animation presets inspired by LottieLab
const ANIMATION_PRESETS = {
  transform: [
    {
      id: 'slide',
      name: 'Slide',
      icon: '→',
      description: 'Move object from left to position',
      properties: ['position'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x - 150, y: obj.y }, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 30, value: { x: obj.x, y: obj.y }, easing: 'easeOut' }
      ]
    },
    {
      id: 'slide-up',
      name: 'Slide Up',
      icon: '↑',
      description: 'Move object from bottom to position',
      properties: ['position'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x, y: obj.y + 150 }, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 30, value: { x: obj.x, y: obj.y }, easing: 'easeOut' }
      ]
    },
    {
      id: 'slide-down',
      name: 'Slide Down',
      icon: '↓',
      description: 'Move object from top to position',
      properties: ['position'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x, y: obj.y - 150 }, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 30, value: { x: obj.x, y: obj.y }, easing: 'easeOut' }
      ]
    },
    {
      id: 'grow',
      name: 'Grow',
      icon: '⤢',
      description: 'Scale object from small to large',
      properties: ['scale'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: 0, height: 0 }, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame + 30, value: { width: obj.width, height: obj.height }, easing: 'easeOut' }
      ]
    },
    {
      id: 'shrink',
      name: 'Shrink',
      icon: '⤡',
      description: 'Scale object from large to small',
      properties: ['scale'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: obj.width, height: obj.height }, easing: 'easeIn' },
        { property: 'scale', frame: currentFrame + 30, value: { width: 0, height: 0 }, easing: 'easeIn' }
      ]
    },
    {
      id: 'spin',
      name: 'Spin',
      icon: '↻',
      description: 'Rotate object 360 degrees',
      properties: ['rotation'],
      keyframeData: (obj, currentFrame) => [
        { property: 'rotation', frame: currentFrame, value: obj.rotation, easing: 'linear' },
        { property: 'rotation', frame: currentFrame + 40, value: obj.rotation + 360, easing: 'linear' }
      ]
    },
    {
      id: 'twist',
      name: 'Twist',
      icon: '⟲',
      description: 'Rotate object back and forth',
      properties: ['rotation'],
      keyframeData: (obj, currentFrame) => [
        { property: 'rotation', frame: currentFrame, value: obj.rotation, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 15, value: obj.rotation + 30, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 30, value: obj.rotation, easing: 'easeInOut' }
      ]
    },
    {
      id: 'zoom',
      name: 'Zoom',
      icon: '⊕',
      description: 'Scale up and down',
      properties: ['scale'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: obj.width, height: obj.height }, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 15, value: { width: obj.width * 1.5, height: obj.height * 1.5 }, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 30, value: { width: obj.width, height: obj.height }, easing: 'easeInOut' }
      ]
    },
    {
      id: 'bounce',
      name: 'Bounce',
      icon: '⬆',
      description: 'Bounce up and down',
      properties: ['position'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x, y: obj.y }, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 10, value: { x: obj.x, y: obj.y - 40 }, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 20, value: { x: obj.x, y: obj.y }, easing: 'easeIn' },
        { property: 'position', frame: currentFrame + 27, value: { x: obj.x, y: obj.y - 20 }, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 35, value: { x: obj.x, y: obj.y }, easing: 'easeIn' }
      ]
    },
    {
      id: 'shake',
      name: 'Shake',
      icon: '⇄',
      description: 'Shake object horizontally',
      properties: ['position'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x, y: obj.y }, easing: 'linear' },
        { property: 'position', frame: currentFrame + 3, value: { x: obj.x - 10, y: obj.y }, easing: 'linear' },
        { property: 'position', frame: currentFrame + 6, value: { x: obj.x + 10, y: obj.y }, easing: 'linear' },
        { property: 'position', frame: currentFrame + 9, value: { x: obj.x - 10, y: obj.y }, easing: 'linear' },
        { property: 'position', frame: currentFrame + 12, value: { x: obj.x + 10, y: obj.y }, easing: 'linear' },
        { property: 'position', frame: currentFrame + 15, value: { x: obj.x, y: obj.y }, easing: 'linear' }
      ]
    },
    {
      id: 'wobble',
      name: 'Wobble',
      icon: '〰',
      description: 'Rotate with wobble effect',
      properties: ['rotation'],
      keyframeData: (obj, currentFrame) => [
        { property: 'rotation', frame: currentFrame, value: obj.rotation, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 5, value: obj.rotation - 15, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 10, value: obj.rotation + 12, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 15, value: obj.rotation - 10, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 20, value: obj.rotation + 8, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 25, value: obj.rotation, easing: 'easeInOut' }
      ]
    },
    {
      id: 'swing',
      name: 'Swing',
      icon: '⌇',
      description: 'Swing like a pendulum',
      properties: ['rotation'],
      keyframeData: (obj, currentFrame) => [
        { property: 'rotation', frame: currentFrame, value: obj.rotation + 20, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 15, value: obj.rotation - 20, easing: 'easeInOut' },
        { property: 'rotation', frame: currentFrame + 30, value: obj.rotation + 20, easing: 'easeInOut' }
      ]
    }
  ],
  styles: [
    {
      id: 'fade-in',
      name: 'Fade In',
      icon: '◐',
      description: 'Fade in from transparent',
      properties: ['opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'opacity', frame: currentFrame, value: 0, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame + 30, value: 1, easing: 'easeOut' }
      ]
    },
    {
      id: 'fade-out',
      name: 'Fade Out',
      icon: '◑',
      description: 'Fade out to transparent',
      properties: ['opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'opacity', frame: currentFrame, value: 1, easing: 'easeIn' },
        { property: 'opacity', frame: currentFrame + 30, value: 0, easing: 'easeIn' }
      ]
    },
    {
      id: 'pulse',
      name: 'Pulse',
      icon: '💓',
      description: 'Pulse with scale and opacity',
      properties: ['scale', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: obj.width, height: obj.height }, easing: 'easeInOut' },
        { property: 'opacity', frame: currentFrame, value: 1, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 15, value: { width: obj.width * 1.2, height: obj.height * 1.2 }, easing: 'easeInOut' },
        { property: 'opacity', frame: currentFrame + 15, value: 0.7, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 30, value: { width: obj.width, height: obj.height }, easing: 'easeInOut' },
        { property: 'opacity', frame: currentFrame + 30, value: 1, easing: 'easeInOut' }
      ]
    },
    {
      id: 'heartbeat',
      name: 'Heartbeat',
      icon: '❤',
      description: 'Double pulse like heartbeat',
      properties: ['scale'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: obj.width, height: obj.height }, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame + 5, value: { width: obj.width * 1.3, height: obj.height * 1.3 }, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 10, value: { width: obj.width, height: obj.height }, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 15, value: { width: obj.width * 1.3, height: obj.height * 1.3 }, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 20, value: { width: obj.width, height: obj.height }, easing: 'easeIn' }
      ]
    },
    {
      id: 'blink',
      name: 'Blink',
      icon: '👁',
      description: 'Quick opacity blink',
      properties: ['opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'opacity', frame: currentFrame, value: 1, easing: 'linear' },
        { property: 'opacity', frame: currentFrame + 3, value: 0, easing: 'linear' },
        { property: 'opacity', frame: currentFrame + 6, value: 1, easing: 'linear' }
      ]
    },
    {
      id: 'flicker',
      name: 'Flicker',
      icon: '✦',
      description: 'Rapid opacity changes',
      properties: ['opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'opacity', frame: currentFrame, value: 1, easing: 'linear' },
        { property: 'opacity', frame: currentFrame + 5, value: 0.3, easing: 'linear' },
        { property: 'opacity', frame: currentFrame + 10, value: 1, easing: 'linear' },
        { property: 'opacity', frame: currentFrame + 15, value: 0.5, easing: 'linear' },
        { property: 'opacity', frame: currentFrame + 20, value: 1, easing: 'linear' }
      ]
    },
    {
      id: 'glow',
      name: 'Glow',
      icon: '✨',
      description: 'Glow effect with scale',
      properties: ['scale', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: obj.width * 0.9, height: obj.height * 0.9 }, easing: 'easeInOut' },
        { property: 'opacity', frame: currentFrame, value: 0.6, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 20, value: { width: obj.width * 1.1, height: obj.height * 1.1 }, easing: 'easeInOut' },
        { property: 'opacity', frame: currentFrame + 20, value: 1, easing: 'easeInOut' },
        { property: 'scale', frame: currentFrame + 40, value: { width: obj.width * 0.9, height: obj.height * 0.9 }, easing: 'easeInOut' },
        { property: 'opacity', frame: currentFrame + 40, value: 0.6, easing: 'easeInOut' }
      ]
    }
  ],
  reveal: [
    {
      id: 'pop-in',
      name: 'Pop In',
      icon: '💥',
      description: 'Pop in with bounce effect',
      properties: ['scale', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: 0, height: 0 }, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame, value: 0, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame + 15, value: { width: obj.width * 1.2, height: obj.height * 1.2 }, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame + 15, value: 1, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame + 25, value: { width: obj.width, height: obj.height }, easing: 'easeInOut' }
      ]
    },
    {
      id: 'slide-fade',
      name: 'Slide & Fade',
      icon: '🌊',
      description: 'Slide and fade in together',
      properties: ['position', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x - 100, y: obj.y }, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame, value: 0, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 30, value: { x: obj.x, y: obj.y }, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame + 30, value: 1, easing: 'easeOut' }
      ]
    },
    {
      id: 'zoom-fade',
      name: 'Zoom & Fade',
      icon: '🔍',
      description: 'Zoom in while fading',
      properties: ['scale', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: obj.width * 0.5, height: obj.height * 0.5 }, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame, value: 0, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame + 30, value: { width: obj.width, height: obj.height }, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame + 30, value: 1, easing: 'easeOut' }
      ]
    },
    {
      id: 'spin-in',
      name: 'Spin In',
      icon: '🌀',
      description: 'Spin while scaling in',
      properties: ['scale', 'rotation', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'scale', frame: currentFrame, value: { width: 0, height: 0 }, easing: 'easeOut' },
        { property: 'rotation', frame: currentFrame, value: obj.rotation - 180, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame, value: 0, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame + 30, value: { width: obj.width, height: obj.height }, easing: 'easeOut' },
        { property: 'rotation', frame: currentFrame + 30, value: obj.rotation, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame + 30, value: 1, easing: 'easeOut' }
      ]
    },
    {
      id: 'flip-in',
      name: 'Flip In',
      icon: '🔄',
      description: 'Flip rotate while appearing',
      properties: ['rotation', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'rotation', frame: currentFrame, value: obj.rotation + 90, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame, value: 0, easing: 'easeOut' },
        { property: 'rotation', frame: currentFrame + 25, value: obj.rotation, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame + 25, value: 1, easing: 'easeOut' }
      ]
    },
    {
      id: 'sweep',
      name: 'Sweep',
      icon: '⟿',
      description: 'Wipe in from side',
      properties: ['position', 'scale'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x - 50, y: obj.y }, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame, value: { width: 0, height: obj.height }, easing: 'easeOut' },
        { property: 'position', frame: currentFrame + 30, value: { x: obj.x, y: obj.y }, easing: 'easeOut' },
        { property: 'scale', frame: currentFrame + 30, value: { width: obj.width, height: obj.height }, easing: 'easeOut' }
      ]
    },
    {
      id: 'drop-in',
      name: 'Drop In',
      icon: '⬇',
      description: 'Drop from above with bounce',
      properties: ['position', 'opacity'],
      keyframeData: (obj, currentFrame) => [
        { property: 'position', frame: currentFrame, value: { x: obj.x, y: obj.y - 200 }, easing: 'easeIn' },
        { property: 'opacity', frame: currentFrame, value: 0, easing: 'linear' },
        { property: 'position', frame: currentFrame + 20, value: { x: obj.x, y: obj.y + 10 }, easing: 'easeOut' },
        { property: 'opacity', frame: currentFrame + 10, value: 1, easing: 'linear' },
        { property: 'position', frame: currentFrame + 30, value: { x: obj.x, y: obj.y }, easing: 'easeOut' }
      ]
    }
  ]
};

const AnimationPresetsDialog = ({
  isOpen,
  onClose,
  onApplyPreset,
  selectedObject,
  currentFrame
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter presets based on search and category
  const filteredPresets = useMemo(() => {
    let allPresets = [];

    if (selectedCategory === 'all') {
      Object.entries(ANIMATION_PRESETS).forEach(([category, presets]) => {
        allPresets.push(...presets.map(p => ({ ...p, category })));
      });
    } else {
      allPresets = (ANIMATION_PRESETS[selectedCategory] || []).map(p => ({ ...p, category: selectedCategory }));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      allPresets = allPresets.filter(preset =>
        preset.name.toLowerCase().includes(query) ||
        preset.description.toLowerCase().includes(query)
      );
    }

    return allPresets;
  }, [searchQuery, selectedCategory]);

  const handlePresetClick = (preset) => {
    if (!selectedObject) return;

    const keyframes = preset.keyframeData(selectedObject, currentFrame);
    onApplyPreset(keyframes);

    // Optional: Show success feedback
    console.log(`✅ Applied ${preset.name} animation`);
  };

  if (!isOpen) return null;

  return (
    <div className="animation-presets-overlay" onClick={onClose}>
      <div className="animation-presets-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dialog-header">
          <h3>Animation Presets</h3>
          <button className="dialog-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Search Bar */}
        <div className="dialog-search">
          <input
            type="text"
            className="dialog-search-input"
            placeholder="Search animations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Category Tabs */}
        <div className="dialog-categories">
          <button
            className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          <button
            className={`category-tab ${selectedCategory === 'transform' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('transform')}
          >
            Transform
          </button>
          <button
            className={`category-tab ${selectedCategory === 'styles' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('styles')}
          >
            Styles
          </button>
          <button
            className={`category-tab ${selectedCategory === 'reveal' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('reveal')}
          >
            Reveal / Trim
          </button>
        </div>

        {/* Presets Grid */}
        <div className="dialog-content">
          {filteredPresets.length === 0 ? (
            <div className="empty-state">
              No animations found matching "{searchQuery}"
            </div>
          ) : (
            <div className="presets-grid">
              {filteredPresets.map((preset) => (
                <button
                  key={preset.id}
                  className="preset-card"
                  onClick={() => handlePresetClick(preset)}
                  disabled={!selectedObject}
                  title={preset.description}
                >
                  <div className="preset-icon">{preset.icon}</div>
                  <div className="preset-name">{preset.name}</div>
                  <div className="preset-description">{preset.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        {selectedObject && (
          <div className="dialog-footer">
            <span className="dialog-footer-info">
              ✨ Click a preset to apply to "{selectedObject.name}"
            </span>
          </div>
        )}
        {!selectedObject && (
          <div className="dialog-footer">
            <span className="dialog-footer-warning">
              ⚠️ Select an object on the canvas first
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimationPresetsDialog;
