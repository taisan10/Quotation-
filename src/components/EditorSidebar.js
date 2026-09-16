'use client';

import React, { useState } from 'react';
import { 
  Building, User, DollarSign, Layers, FileText, Plus, Trash2, 
  RotateCcw, Sparkles 
} from 'lucide-react';
import { formatINR } from '../utils/numberToWords';

export default function EditorSidebar({ data, onChange, onResetToDefault, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('items');

  const updateField = (path, value) => {
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(data));
    let current = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onChange(updated);
  };

  // Line Item Handlers
  const handleItemChange = (index, field, value) => {
    const updated = JSON.parse(JSON.stringify(data));
    const item = updated.items[index];
    item[field] = value;
    if (field === 'qty' || field === 'rate') {
      const qty = Number(field === 'qty' ? value : item.qty) || 1;
      const rate = Number(field === 'rate' ? value : item.rate) || 0;
      item.amount = qty * rate;
    }
    onChange(updated);
  };

  const handleAddItem = () => {
    const updated = JSON.parse(JSON.stringify(data));
    updated.items.push({
      id: Date.now(),
      title: "New Custom Feature",
      description: "Detailed scope specifications and deliverables for this item.",
      qty: 1,
      rate: 5000,
      amount: 5000
    });
    onChange(updated);
  };

  const handleDeleteItem = (index) => {
    const updated = JSON.parse(JSON.stringify(data));
    if (updated.items.length <= 1) {
      alert("At least one quotation item is required.");
      return;
    }
    updated.items.splice(index, 1);
    onChange(updated);
  };

  // Category Handlers
  const handleAddCategory = () => {
    const updated = JSON.parse(JSON.stringify(data));
    if (!updated.project.categories) updated.project.categories = [];
    updated.project.categories.push({
      name: "New Collection",
      desc: "Custom ethnic wear collection"
    });
    onChange(updated);
  };

  const handleDeleteCategory = (idx) => {
    const updated = JSON.parse(JSON.stringify(data));
    updated.project.categories.splice(idx, 1);
    onChange(updated);
  };

  // Calculate Subtotal
  const totalAmount = data.items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);

  return (
    <aside className={`editor-sidebar ${!isOpen ? 'collapsed' : ''}`} aria-label="Quotation Editor">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Sparkles size={16} color="#c59a3f" />
          <span>Live Quotation Editor</span>
        </div>
        <button 
          className="btn btn-ghost" 
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} 
          onClick={onResetToDefault}
          title="Reset back to default ₹63,000 package"
        >
          <RotateCcw size={13} style={{ marginRight: '4px' }} /> Reset Default
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="sidebar-tabs" role="tablist">
        <button 
          role="tab"
          aria-selected={activeTab === 'items'}
          className={`tab-btn ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          <DollarSign size={13} />
          <span>Budget & Items</span>
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'scope'}
          className={`tab-btn ${activeTab === 'scope' ? 'active' : ''}`}
          onClick={() => setActiveTab('scope')}
        >
          <Layers size={13} />
          <span>Categories</span>
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'client'}
          className={`tab-btn ${activeTab === 'client' ? 'active' : ''}`}
          onClick={() => setActiveTab('client')}
        >
          <User size={13} />
          <span>Client Details</span>
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'company'}
          className={`tab-btn ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          <Building size={13} />
          <span>MA Creation</span>
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'terms'}
          className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          <FileText size={13} />
          <span>Milestones</span>
        </button>
      </div>

      {/* Tab 1: Budget & Line Items */}
      {activeTab === 'items' && (
        <div className="tab-content" role="tabpanel">
          <div style={{ background: '#1e293b', padding: '12px 14px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 700 }}>
                Quotation Total
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e8c872', fontFamily: 'Outfit, sans-serif' }}>
                {formatINR(totalAmount)}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: totalAmount === 63000 ? '#34d399' : '#f59e0b', marginTop: '4px', fontWeight: 600 }}>
              {totalAmount === 63000 
                ? "✓ Perfectly matched to target ₹63,000 Budget" 
                : `Current Total: ${formatINR(totalAmount)} (Target budget: ₹63,000)`}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Heuristic #6 Fix: Form label 13px Title Case */}
            <span className="form-label">Deliverables Breakdown ({data.items.length} Items)</span>
            {/* Heuristic #18 Fix: Prominent action button */}
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8125rem' }} onClick={handleAddItem}>
              <Plus size={14} /> Add Line Item
            </button>
          </div>

          {data.items.map((item, idx) => (
            <div key={item.id || idx} className="item-card">
              {/* Heuristic #15 & #19 Fix: Item card header spacing & safe delete button */}
              <div className="item-card-header">
                <span className="item-badge">Item #{idx + 1}</span>
                <button 
                  className="delete-btn" 
                  title={`Delete Item #${idx + 1}`}
                  aria-label={`Delete Item #${idx + 1}`}
                  onClick={() => handleDeleteItem(idx)}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Item Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={item.title} 
                  onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Scope Description</label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  value={item.description} 
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Qty</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={item.qty || 1} 
                    onChange={(e) => handleItemChange(idx, 'qty', Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Rate (₹)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={item.rate} 
                    onChange={(e) => handleItemChange(idx, 'rate', Number(e.target.value))}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '0.8125rem', color: '#94a3b8' }}>
                Item Subtotal: <strong style={{ color: '#e8c872' }}>{formatINR(item.amount)}</strong>
              </div>
            </div>
          ))}

          <div className="form-group">
            <label className="form-label">Special Notes in Quotation</label>
            <textarea 
              className="form-textarea"
              value={data.pricingSummary.notes || ''}
              onChange={(e) => updateField('pricingSummary.notes', e.target.value)}
              placeholder="e.g. All inclusive package..."
            />
          </div>
        </div>
      )}

      {/* Tab 2: Scope & Categories */}
      {activeTab === 'scope' && (
        <div className="tab-content" role="tabpanel">
          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input 
              type="text"
              className="form-input"
              value={data.project.title}
              onChange={(e) => updateField('project.title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Project Summary</label>
            <textarea 
              className="form-textarea"
              rows={4}
              value={data.project.summary}
              onChange={(e) => updateField('project.summary', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Heuristic #6 Fix: Clear Title Case form label */}
            <span className="form-label">Clothing Categories (Storefront)</span>
            {/* Heuristic #18 Fix: Prominent primary styling for Add Category action */}
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8125rem' }} 
              onClick={handleAddCategory}
            >
              <Plus size={14} /> Add Category
            </button>
          </div>

          {data.project.categories?.map((cat, idx) => (
            <div key={idx} className="item-card">
              {/* Heuristic #14, #15, #19 Fix: Increased vertical margin and breathing room */}
              <div className="item-card-header">
                <span className="item-badge">Category #{idx + 1}</span>
                <button 
                  className="delete-btn" 
                  aria-label={`Delete Category #${idx + 1}`}
                  onClick={() => handleDeleteCategory(idx)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input 
                  type="text"
                  className="form-input"
                  value={cat.name}
                  onChange={(e) => {
                    const updated = JSON.parse(JSON.stringify(data));
                    updated.project.categories[idx].name = e.target.value;
                    onChange(updated);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Sub-description / Types</label>
                <input 
                  type="text"
                  className="form-input"
                  value={cat.desc}
                  onChange={(e) => {
                    const updated = JSON.parse(JSON.stringify(data));
                    updated.project.categories[idx].desc = e.target.value;
                    onChange(updated);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Client Details */}
      {activeTab === 'client' && (
        <div className="tab-content" role="tabpanel">
          <div className="form-group">
            <label className="form-label">Quotation Number</label>
            <input 
              type="text"
              className="form-input"
              value={data.meta.quotationNo}
              onChange={(e) => updateField('meta.quotationNo', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Quotation Date</label>
              <input 
                type="date"
                className="form-input"
                value={data.meta.date}
                onChange={(e) => updateField('meta.date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Valid Until</label>
              <input 
                type="date"
                className="form-input"
                value={data.meta.validUntil}
                onChange={(e) => updateField('meta.validUntil', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Client / Store Business Name</label>
            <input 
              type="text"
              className="form-input"
              value={data.client.name}
              onChange={(e) => updateField('client.name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Attention / Representative</label>
            <input 
              type="text"
              className="form-input"
              value={data.client.attention}
              onChange={(e) => updateField('client.attention', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Client Address / Location</label>
            <textarea 
              className="form-textarea"
              rows={2}
              value={data.client.address}
              onChange={(e) => updateField('client.address', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Client Phone</label>
              <input 
                type="text"
                className="form-input"
                value={data.client.phone}
                onChange={(e) => updateField('client.phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Client Email</label>
              <input 
                type="email"
                className="form-input"
                value={data.client.email}
                onChange={(e) => updateField('client.email', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Prepared By / Technical Lead</label>
            <input 
              type="text"
              className="form-input"
              value={data.meta.preparedBy}
              onChange={(e) => updateField('meta.preparedBy', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tab 4: Company Letterhead Settings */}
      {activeTab === 'company' && (
        <div className="tab-content" role="tabpanel">
          <div className="form-group">
            <label className="form-label">Company Name (Letterhead)</label>
            <input 
              type="text"
              className="form-input"
              value={data.company.name}
              onChange={(e) => updateField('company.name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Company Subtitle / Tagline</label>
            <input 
              type="text"
              className="form-input"
              value={data.company.subtitle}
              onChange={(e) => updateField('company.subtitle', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Official Location / Address</label>
            <textarea 
              className="form-textarea"
              rows={2}
              value={data.company.address}
              onChange={(e) => updateField('company.address', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Numbers</label>
              <input 
                type="text"
                className="form-input"
                value={data.company.phone}
                onChange={(e) => updateField('company.phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Official Email</label>
              <input 
                type="email"
                className="form-input"
                value={data.company.email}
                onChange={(e) => updateField('company.email', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">GSTIN</label>
              <input 
                type="text"
                className="form-input"
                value={data.company.gstin}
                onChange={(e) => updateField('company.gstin', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">PAN</label>
              <input 
                type="text"
                className="form-input"
                value={data.company.pan}
                onChange={(e) => updateField('company.pan', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '0.5rem', borderTop: '1px solid #334155', paddingTop: '0.85rem' }}>
            <span className="form-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#e8c872' }}>
              Bank Account & UPI Details
            </span>
            <div className="form-group">
              <label className="form-label">Beneficiary Name</label>
              <input 
                type="text"
                className="form-input"
                value={data.company.bank.accountName}
                onChange={(e) => updateField('company.bank.accountName', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">Bank Name & Branch</label>
              <input 
                type="text"
                className="form-input"
                value={data.company.bank.bankName}
                onChange={(e) => updateField('company.bank.bankName', e.target.value)}
              />
            </div>
            <div className="form-row" style={{ marginTop: '0.5rem' }}>
              <div className="form-group">
                <label className="form-label">Account No</label>
                <input 
                  type="text"
                  className="form-input"
                  value={data.company.bank.accountNumber}
                  onChange={(e) => updateField('company.bank.accountNumber', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">IFSC Code</label>
                <input 
                  type="text"
                  className="form-input"
                  value={data.company.bank.ifscCode}
                  onChange={(e) => updateField('company.bank.ifscCode', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">UPI ID</label>
              <input 
                type="text"
                className="form-input"
                value={data.company.bank.upiId}
                onChange={(e) => updateField('company.bank.upiId', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Milestones & Terms */}
      {activeTab === 'terms' && (
        <div className="tab-content" role="tabpanel">
          <div className="form-group">
            <label className="form-label">Overall Project Timeline</label>
            <input 
              type="text"
              className="form-input"
              value={data.timeline.totalDuration}
              onChange={(e) => updateField('timeline.totalDuration', e.target.value)}
            />
          </div>

          <span className="form-label">Payment Milestone Breakdown</span>
          {data.milestones?.map((m, idx) => (
            <div key={idx} className="item-card">
              <span className="item-badge">Stage {idx + 1}</span>
              <div className="form-group">
                <label className="form-label">Milestone Title</label>
                <input 
                  type="text"
                  className="form-input"
                  value={m.phase}
                  onChange={(e) => {
                    const updated = JSON.parse(JSON.stringify(data));
                    updated.milestones[idx].phase = e.target.value;
                    onChange(updated);
                  }}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Percentage (%)</label>
                  <input 
                    type="number"
                    className="form-input"
                    value={m.percentage}
                    onChange={(e) => {
                      const updated = JSON.parse(JSON.stringify(data));
                      const pct = Number(e.target.value) || 0;
                      updated.milestones[idx].percentage = pct;
                      updated.milestones[idx].amount = (totalAmount * pct) / 100;
                      onChange(updated);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Amount (₹)</label>
                  <input 
                    type="number"
                    className="form-input"
                    value={m.amount}
                    onChange={(e) => {
                      const updated = JSON.parse(JSON.stringify(data));
                      updated.milestones[idx].amount = Number(e.target.value) || 0;
                      onChange(updated);
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Payment Release Trigger</label>
                <input 
                  type="text"
                  className="form-input"
                  value={m.trigger}
                  onChange={(e) => {
                    const updated = JSON.parse(JSON.stringify(data));
                    updated.milestones[idx].trigger = e.target.value;
                    onChange(updated);
                  }}
                />
              </div>
            </div>
          ))}

          <div style={{ marginTop: '0.5rem' }}>
            <span className="form-label">Terms & Conditions</span>
            {data.terms?.map((t, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input 
                  type="text"
                  className="form-input"
                  value={t}
                  onChange={(e) => {
                    const updated = JSON.parse(JSON.stringify(data));
                    updated.terms[idx] = e.target.value;
                    onChange(updated);
                  }}
                />
                <button 
                  className="delete-btn" 
                  aria-label={`Delete Term #${idx + 1}`}
                  onClick={() => {
                    const updated = JSON.parse(JSON.stringify(data));
                    updated.terms.splice(idx, 1);
                    onChange(updated);
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', fontSize: '0.8125rem', padding: '0.5rem', marginTop: '6px' }}
              onClick={() => {
                const updated = JSON.parse(JSON.stringify(data));
                updated.terms.push("New terms condition line.");
                onChange(updated);
              }}
            >
              <Plus size={14} /> Add Term Condition
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
