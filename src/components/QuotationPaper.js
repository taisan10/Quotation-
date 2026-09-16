'use client';

import React from 'react';
import { formatINR, numberToIndianWords } from '../utils/numberToWords';
import { Building2, Sparkles, ShieldCheck, CreditCard } from 'lucide-react';

export default function QuotationPaper({ data, onChange }) {
  const {
    company,
    meta,
    client,
    project,
    items = [],
    pricingSummary = {},
    milestones = [],
    timeline = {},
    terms = []
  } = data;

  // Calculate Subtotal
  const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const discountAmount = (subtotal * (Number(pricingSummary.discountPercent) || 0)) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * (Number(pricingSummary.taxPercent) || 0)) / 100;
  const grandTotal = taxableAmount + taxAmount;

  return (
    <div className="quotation-paper" id="quotation-document">
      {/* Subtle Luxury Watermark */}
      <div className="paper-watermark">MA CREATION</div>

      {/* 1. Official Letterhead Header (Heuristic #20 Spacing) */}
      <div className="letterhead-top">
        <div className="letterhead-banner">
          {/* Brand Logo & Company Info */}
          <div className="company-brand-section">
            <div className="letterhead-emblem">
              <span>MA</span>
            </div>
            <div className="company-details">
              <h2>{company.name}</h2>
              <div className="company-tagline">{company.subtitle}</div>
              <div className="company-address-block">
                <p>
                  <strong>Address:</strong> {company.address}
                </p>
                <p>
                  <strong>Phone:</strong> {company.phone} &nbsp;|&nbsp; <strong>Email:</strong> {company.email}
                </p>
                <p>
                  <strong>GST:</strong> {company.gstin} 
                </p>
                {/* Heuristic #7 Fix: Clear structured representation */}
               
              </div>
            </div>
          </div>

          {/* Quotation Metadata Box */}
          <div className="quotation-badge-box">
            {/* Heuristic #17 Fix: Static document heading without button drop-shadow */}
            <div className="quotation-title-pill" role="heading" aria-level={2}>QUOTATION</div>
            <table className="meta-table">
              <tbody>
                <tr>
                  <td className="meta-label">Quote Ref:</td>
                  <td className="meta-value">{meta.quotationNo}</td>
                </tr>
                <tr>
                  <td className="meta-label">Date:</td>
                  <td className="meta-value">{meta.date}</td>
                </tr>
                <tr>
                  <td className="meta-label">Valid Until:</td>
                  <td className="meta-value">{meta.validUntil}</td>
                </tr>
                {/* Heuristic #8 & #16 Fix: Title Case & aligned on the same axis */}
                <tr>
                  <td className="meta-label">Status:</td>
                  <td className="meta-value" style={{ color: '#059669', textAlign: 'right' }}>
                    {meta.status || 'Proposal / Estimate'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Client & Project Details */}
      <div className="client-project-grid">
        {/* Bill To */}
        <div className="info-card-box">
          <div className="info-card-title">
            <Building2 size={13} /> Quotation Prepared For (Client):
          </div>
          <div className="client-name">{client.name}</div>
          <div className="client-sub">
            {/* <p>{client.attention}</p> */}
            <p>{client.address}</p>
            <p><strong>Contact:</strong> {client.phone} </p>
          </div>
        </div>

        {/* Project Scope Highlight */}
        <div className="info-card-box">
          <div className="info-card-title">
            <Sparkles size={13} /> Project Scope & Deliverables:
          </div>
          <div className="project-title-highlight">{project.title}</div>
          {/* Heuristic #9 Fix: Legible body text size (13px / 0.8125rem) */}
          <p className="project-summary-text">
            {project.summary}
          </p>
          <div className="budget-highlight-badge">
            Agreed Budget: <span>{formatINR(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* 3. Clothing Categories Showcase Bar */}
      <div className="category-showcase-bar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Heuristic #10 Fix: Category heading size at least 13px with sentence case */}
          <span className="category-bar-header">
            Ladies Clothing Storefront Categories Included:
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            Includes Custom Admin Dashboard Controls
          </span>
        </div>
        <div className="category-tags-list">
          {project.categories?.map((cat, idx) => (
            <div key={idx} className="category-tag-chip active-tag">
              <span>✦</span>
              <strong>{cat.name}</strong>
              <span style={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem' }}>({cat.desc})</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Itemized Pricing Table */}
      <div className="items-table-wrapper">
        <table className="quotation-table">
          <thead>
            <tr>
              <th style={{ width: '36px', textAlign: 'center' }}>#</th>
              <th>Scope Description & Technical Deliverables</th>
              <th style={{ width: '50px', textAlign: 'center' }}>Qty</th>
              <th style={{ width: '85px', textAlign: 'right' }}>Rate (₹)</th>
              <th style={{ width: '95px', textAlign: 'right' }}>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id || index}>
                <td className="item-num">{index + 1}</td>
                <td className="item-name-cell">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </td>
                <td className="item-qty-cell">{item.qty || 1}</td>
                <td className="item-price-cell">{formatINR(item.rate)}</td>
                <td className="item-total-cell">{formatINR(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Totals & Amount in Words */}
      <div className="totals-row-wrapper">
        <div className="amount-in-words-box">
          <div className="words-label">Total Amount in Words:</div>
          <div className="words-text">{numberToIndianWords(grandTotal)}</div>
          {/* Heuristic #11 Fix: Special note font-size at least 13px */}
          {pricingSummary.notes && (
            <p className="special-note-text">
              <strong>Special Note:</strong> {pricingSummary.notes}
            </p>
          )}
        </div>

        <div className="totals-calculation-card">
          <div className="totals-line">
            <span>Subtotal:</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatINR(subtotal)}</span>
          </div>

          {pricingSummary.discountPercent > 0 && (
            <div className="totals-line" style={{ color: '#059669' }}>
              <span>Discount ({pricingSummary.discountPercent}%):</span>
              <span>- {formatINR(discountAmount)}</span>
            </div>
          )}

          {pricingSummary.taxPercent > 0 ? (
            <div className="totals-line">
              <span>{pricingSummary.taxLabel || 'GST'} ({pricingSummary.taxPercent}%):</span>
              <span>+ {formatINR(taxAmount)}</span>
            </div>
          ) : (
            <div className="totals-line" style={{ color: '#64748b' }}>
              <span>GST:</span>
              <span style={{ fontWeight: 600, color: '#475569' }}>Excluded (Extra)</span>
            </div>
          )}

          <div className="grand-total-line">
            <span>TOTAL AMOUNT:</span>
            <span className="total-num">{formatINR(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* 6. Milestones, Timeline & Bank Information */}
      <div className="bottom-columns-grid">
        {/* Payment Milestones */}
        <div className="section-mini-box">
          <div className="section-mini-title">
            <CreditCard size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Payment Milestones ({timeline.totalDuration || '3-4 Weeks'})
          </div>
          {milestones.map((m, idx) => (
            <div key={idx} className="milestone-item-row">
              <div>
                <span className="milestone-title">{m.phase}</span>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.trigger}</div>
              </div>
              <span className="milestone-val">
                {m.percentage}% ({formatINR(m.amount)})
              </span>
            </div>
          ))}
        </div>

        {/* Bank & Payment Details */}
        <div className="section-mini-box">
          <div className="section-mini-title">
            <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Bank & Payment Account Details
          </div>
          <div className="bank-detail-text">
            <p><strong>Beneficiary:</strong> {company.bank.accountName}</p>
            <p><strong>Bank:</strong> {company.bank.bankName} ({company.bank.branch})</p>
            <p><strong>Account No:</strong> {company.bank.accountNumber}</p>
            <p><strong>IFSC Code:</strong> {company.bank.ifscCode} &nbsp;|&nbsp; <strong>UPI ID:</strong> {company.bank.upiId}</p>
          </div>
        </div>
      </div>

      {/* 7. Terms & Conditions (Heuristic #12 Fix) */}
      <div className="section-mini-box" style={{ marginBottom: '8px' }}>
        <div className="section-mini-title">Terms & Conditions of Project Execution</div>
        <ul className="terms-list">
          {terms.map((t, idx) => (
            <li key={idx}>{t}</li>
          ))}
        </ul>
      </div>

      {/* 8. Letterhead Footer & Official Signature Block */}
      <div className="letterhead-footer-bar">
        <div className="footer-signatures-row">
          <div className="client-acceptance-box">
            <p>Client Acceptance / Confirmed By</p>
            {/* Heuristic #13 Fix: Signature footnote font size 12px */}
            <p className="signature-footnote">(Signature with Company Stamp)</p>
          </div>

          <div className="authorized-sign-box">
            <div className="official-stamp-graphic">
              ★ MA CREATION OFFICIAL STAMP ★
            </div>
            <div className="signatory-name">{meta.preparedBy}</div>
            <div className="signatory-company">For MA CREATION (Charkhi Dadri)</div>
          </div>
        </div>

        <div className="bottom-credits-tag">
          MA CREATION • Lavish Library, 1st Floor, Charkhi Dadri, Haryana • E-Commerce & Web Development Studio
        </div>
      </div>
    </div>
  );
}
