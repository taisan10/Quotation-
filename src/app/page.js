'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import EditorSidebar from '../components/EditorSidebar';
import QuotationPaper from '../components/QuotationPaper';
import { defaultQuotationData } from '../data/defaultQuotation';
import { ZoomIn, ZoomOut, Maximize2, Sparkles, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'ma_creation_quotation_data_v3';

export default function Home() {
  const [quotationData, setQuotationData] = useState(defaultQuotationData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [scale, setScale] = useState(0.95);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasSavedChanges, setHasSavedChanges] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setQuotationData(JSON.parse(saved));
        setHasSavedChanges(true);
      } else {
        setQuotationData(defaultQuotationData);
      }
    } catch (err) {
      console.warn('Could not load saved quotation data', err);
    }
  }, []);

  // Save to localStorage whenever data changes
  const handleDataChange = (updated) => {
    setQuotationData(updated);
    setHasSavedChanges(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save to localStorage', err);
    }
  };

  // Reset to default ₹63k package
  const handleReset = () => {
    if (confirm("Reset quotation back to default MA Creation ₹63,000 Ladies Clothing proposal?")) {
      setQuotationData(defaultQuotationData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuotationData));
      } catch (e) {}
    }
  };

  // Zoom controls
  const handleZoomIn = () => setScale(prev => Math.min(1.3, Number((prev + 0.05).toFixed(2))));
  const handleZoomOut = () => setScale(prev => Math.max(0.65, Number((prev - 0.05).toFixed(2))));
  const handleResetZoom = () => setScale(0.95);

  // Native A4 Print
  const handlePrint = () => {
    window.print();
  };

  // Direct PDF Download using html2pdf.js with zero whitespace isolation
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('quotation-document');
      if (!element) {
        alert('Quotation element not found');
        setIsDownloading(false);
        return;
      }

      // Clone element to an isolated offscreen container without transforms, scroll offsets, or margins
      const clone = element.cloneNode(true);
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.boxShadow = 'none';
      clone.style.width = '210mm';
      clone.style.minHeight = '297mm';
      clone.style.position = 'relative';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.background = '#ffffff';

      const container = document.createElement('div');
      container.id = 'pdf-export-isolated-container';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '-9999px';
      container.style.width = '210mm';
      container.style.background = '#ffffff';
      container.style.zIndex = '-99999';
      container.style.margin = '0';
      container.style.padding = '0';
      container.appendChild(clone);
      document.body.appendChild(container);

      // Dynamically import html2pdf
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin: [0, 0, 0, 0], // Zero margin because .quotation-paper already has built-in margins
        filename: `Quotation_MA_Creation_${quotationData.meta.quotationNo.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
          windowWidth: 794 // Exact standard A4 width in pixels
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(clone).save();
      document.body.removeChild(container);
    } catch (error) {
      console.error('PDF export failed, falling back to print dialog', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        onDownloadPDF={handleDownloadPDF}
        onPrint={handlePrint}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onReset={handleReset}
        isDownloading={isDownloading}
        hasSavedChanges={hasSavedChanges}
      />

      {/* Main Workspace Split */}
      <main className="main-workspace">
        {/* Collapsible Left Customizer Drawer */}
        <EditorSidebar 
          data={quotationData}
          onChange={handleDataChange}
          onResetToDefault={handleReset}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Live A4 Preview Canvas */}
        <section className="preview-canvas">
          {/* Canvas Floating Toolbar */}
          <div className="canvas-toolbar no-print">
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} color="#dfb746" /> A4 Live Preview
            </span>
            <button className="toolbar-btn" onClick={handleZoomOut} title="Zoom Out">
              <ZoomOut size={14} />
            </button>
            <span className="scale-text">{Math.round(scale * 100)}%</span>
            <button className="toolbar-btn" onClick={handleZoomIn} title="Zoom In">
              <ZoomIn size={14} />
            </button>
            <button className="toolbar-btn" onClick={handleResetZoom} title="Reset Scale (Fit A4)">
              <Maximize2 size={13} />
            </button>
          </div>

          {/* Scalable Paper Wrapper */}
          <div 
            className="paper-wrapper"
            style={{ transform: `scale(${scale})` }}
          >
            <QuotationPaper 
              data={quotationData} 
              onChange={handleDataChange}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
