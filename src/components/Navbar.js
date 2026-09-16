'use client';

import React from 'react';
import { 
  Download, Printer, SlidersHorizontal, RotateCcw, 
  FileCheck, Eye, Sparkles, Check 
} from 'lucide-react';

export default function Navbar({ 
  onDownloadPDF, 
  onPrint, 
  isSidebarOpen, 
  onToggleSidebar, 
  onReset,
  isDownloading,
  hasSavedChanges
}) {
  return (
    <header className="top-navbar no-print">
      <div className="brand-wrapper">
        <div className="brand-logo-badge">
          <span>MA</span>
        </div>
        <div className="brand-text">
          <h1>
            MA CREATION
            <span className="brand-tag">Quotation Studio</span>
          </h1>
          <p>Lavish Library, 1st Floor, Charkhi Dadri (Haryana)</p>
        </div>
      </div>

      <div className="nav-actions">
        {hasSavedChanges && (
          <div className="indicator-pill" title="Changes auto-saved in browser">
            <span className="indicator-dot"></span>
            <span>Saved</span>
          </div>
        )}

        <button 
          className="btn btn-secondary"
          onClick={onToggleSidebar}
          title="Toggle Editor Sidebar"
        >
          <SlidersHorizontal size={15} />
          <span>{isSidebarOpen ? 'Hide Editor' : 'Edit Quotation'}</span>
        </button>

        <button 
          className="btn btn-secondary"
          onClick={onPrint}
          title="Print standard A4 document"
        >
          <Printer size={15} />
          <span>Print A4</span>
        </button>

        <button 
          className="btn btn-primary"
          onClick={onDownloadPDF}
          disabled={isDownloading}
          title="Download high-resolution PDF"
        >
          <Download size={15} />
          <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
        </button>
      </div>
    </header>
  );
}
