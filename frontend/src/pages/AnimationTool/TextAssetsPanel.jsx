import React from 'react';

// Text Templates Library
const TEXT_TEMPLATES = {
  defaultStyles: [
    { id: 'heading', text: 'Add a heading', fontSize: 48, fontFamily: 'Arial', fontWeight: 'bold', fill: '#000000' },
    { id: 'subheading', text: 'Add a subheading', fontSize: 32, fontFamily: 'Arial', fontWeight: 'normal', fill: '#333333' },
    { id: 'body', text: 'Add body text', fontSize: 20, fontFamily: 'Arial', fontWeight: 'normal', fill: '#666666' },
  ],
  fontPairings: [
    {
      id: 'version',
      heading: { text: 'Version 1.0', fontSize: 42, fontFamily: 'Arial', fontWeight: 'bold', fill: '#000000' },
      subtext: { text: 'I must not fear, fear...', fontSize: 16, fontFamily: 'Georgia', fontWeight: 'normal', fill: '#666666' }
    },
    {
      id: 'aiready',
      heading: { text: 'AI ready', fontSize: 38, fontFamily: 'Verdana', fontWeight: 'bold', fill: '#6366f1' },
      subtext: { text: 'out the box.', fontSize: 18, fontFamily: 'Arial', fontWeight: 'normal', fill: '#333333' }
    },
    {
      id: 'runway',
      heading: { text: 'RUNWAY', fontSize: 44, fontFamily: 'Impact', fontWeight: 'bold', fill: '#000000' },
      subtext: { text: 'PARIS COLLECTION', fontSize: 14, fontFamily: 'Arial', fontWeight: 'normal', fill: '#666666' }
    },
    {
      id: 'hey',
      heading: { text: 'hey.', fontSize: 48, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#000000' },
      subtext: { text: 'What\'s your name? Your age?', fontSize: 14, fontFamily: 'Arial', fontWeight: 'normal', fill: '#666666' }
    },
    {
      id: 'build',
      heading: { text: 'Build.\nBuild.', fontSize: 40, fontFamily: 'Arial', fontWeight: 'bold', fill: '#000000' },
      subtext: { text: 'Create anything.', fontSize: 14, fontFamily: 'Arial', fontWeight: 'normal', fill: '#666666' }
    },
    {
      id: 'clouds',
      heading: { text: 'clouds', fontSize: 52, fontFamily: 'Georgia', fontWeight: 'normal', fill: '#60a5fa' },
      subtext: { text: '', fontSize: 14, fontFamily: 'Arial', fontWeight: 'normal', fill: '#666666' }
    },
  ]
};

const TextAssetsPanel = ({ onTextClick, onClose }) => {
  const addTextBox = () => {
    onTextClick({ text: 'Add text', fontSize: 32, fontFamily: 'Arial', fontWeight: 'normal', fill: '#000000' });
  };

  return (
    <div className="text-assets-panel panel">
      <div className="panel-header">
        <h3>Text</h3>
        <button
          className="panel-close-btn"
          onClick={onClose}
        >×</button>
      </div>

      <div className="text-assets-content">
        {/* Add Text Box Button */}
        <button className="add-text-box-btn" onClick={addTextBox}>
          + Add text box
        </button>

        {/* Default Styles Section */}
        <div className="text-section">
          <h4 className="text-section-title">Default styles</h4>
          <div className="text-templates-list">
            {TEXT_TEMPLATES.defaultStyles.map(template => (
              <button
                key={template.id}
                className="text-template-item default-style"
                onClick={() => onTextClick(template)}
              >
                <span style={{
                  fontSize: `${template.fontSize / 3}px`,
                  fontFamily: template.fontFamily,
                  fontWeight: template.fontWeight,
                  color: template.fill
                }}>
                  {template.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Pairings Section */}
        <div className="text-section">
          <h4 className="text-section-title">Font pairings</h4>
          <div className="font-pairings-grid">
            {TEXT_TEMPLATES.fontPairings.map(pairing => (
              <div
                key={pairing.id}
                className="font-pairing-card"
                onClick={() => {
                  // Add both heading and subtext
                  onTextClick({ ...pairing.heading, y: 250 });
                  if (pairing.subtext.text) {
                    setTimeout(() => {
                      onTextClick({ ...pairing.subtext, y: 320 });
                    }, 100);
                  }
                }}
              >
                <div className="font-pairing-preview">
                  <div
                    className="pairing-heading"
                    style={{
                      fontSize: `${pairing.heading.fontSize / 4}px`,
                      fontFamily: pairing.heading.fontFamily,
                      fontWeight: pairing.heading.fontWeight,
                      color: pairing.heading.fill,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {pairing.heading.text}
                  </div>
                  {pairing.subtext.text && (
                    <div
                      className="pairing-subtext"
                      style={{
                        fontSize: `${pairing.subtext.fontSize / 2.5}px`,
                        fontFamily: pairing.subtext.fontFamily,
                        fontWeight: pairing.subtext.fontWeight,
                        color: pairing.subtext.fill,
                        marginTop: '4px'
                      }}
                    >
                      {pairing.subtext.text}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAssetsPanel;