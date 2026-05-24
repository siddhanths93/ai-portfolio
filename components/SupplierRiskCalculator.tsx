"use client";

import React, { useState } from "react";

export default function SupplierRiskCalculator() {
  const [formData, setFormData] = useState({
    financialHealth: 3,
    geographicConcentration: 3,
    qualityScore: 3,
    onTimeDelivery: 95,
    spendConcentration: 15,
    contractLength: 2
  });
  
  const [showResults, setShowResults] = useState(false);

  const calculateRisk = () => {
    // Real-world risk scoring algorithm
    const weights = {
      financialHealth: 0.25,
      geographicConcentration: 0.15,
      qualityScore: 0.20,
      onTimeDelivery: 0.15,
      spendConcentration: 0.15,
      contractLength: 0.10
    };

    // Normalize and weight each factor
    const financialScore = (5 - formData.financialHealth) * 20;
    const geoScore = (5 - formData.geographicConcentration) * 20;
    const qualityScore = (5 - formData.qualityScore) * 20;
    const otdScore = (100 - formData.onTimeDelivery);
    const spendScore = Math.min(formData.spendConcentration * 2, 100);
    const contractScore = formData.contractLength < 2 ? 80 : formData.contractLength > 3 ? 20 : 50;

    const totalRisk = 
      financialScore * weights.financialHealth +
      geoScore * weights.geographicConcentration +
      qualityScore * weights.qualityScore +
      otdScore * weights.onTimeDelivery +
      spendScore * weights.spendConcentration +
      contractScore * weights.contractLength;

    return Math.round(totalRisk);
  };

  const riskScore = calculateRisk();
  const riskLevel: "High" | "Medium" | "Low" = riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low';
  const riskColor = riskScore > 70 ? '#DC2626' : riskScore > 40 ? '#F59E0B' : '#10B981';

  const recommendations = {
    High: [
      'Immediate dual-sourcing strategy required',
      'Monthly financial health reviews',
      'Escalate to procurement leadership',
      'Increase safety stock by 40-60%'
    ],
    Medium: [
      'Identify backup suppliers within 90 days',
      'Quarterly business reviews',
      'Negotiate performance-based contracts',
      'Monitor financial metrics monthly'
    ],
    Low: [
      'Annual supplier reviews sufficient',
      'Maintain current contract terms',
      'Consider strategic partnership opportunities',
      'Standard safety stock levels'
    ]
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem',
      background: '#000000'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '0.5rem'
          }}>
            Supplier Risk Assessment Tool
          </h1>
          <p style={{
            color: '#6B7280',
            fontSize: '0.95rem'
          }}>
            Quantify supplier risk using weighted factors that drive supply chain disruptions
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Financial Health */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Financial Health (1=Poor, 5=Excellent)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.financialHealth}
              onChange={(e) => setFormData({...formData, financialHealth: Number(e.target.value)})}
              style={{ width: '100%',   accentColor: '#000000', background: '#FFFFFF' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
              <span>Poor</span>
              <span style={{ fontWeight: '600', color: '#374151' }}>{formData.financialHealth}</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Geographic Concentration */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Geographic Diversification (1=Single location, 5=Highly diversified)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.geographicConcentration}
              onChange={(e) => setFormData({...formData, geographicConcentration: Number(e.target.value)})}
              style={{ width: '100%',   accentColor: '#000000', background: '#FFFFFF'}}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
              <span>Single Site</span>
              <span style={{ fontWeight: '600', color: '#374151' }}>{formData.geographicConcentration}</span>
              <span>Multi-Region</span>
            </div>
          </div>

          {/* Quality Score */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Quality Performance (1=Poor, 5=Excellent)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.qualityScore}
              onChange={(e) => setFormData({...formData, qualityScore: Number(e.target.value)})}
              style={{ width: '100%',   accentColor: '#000000', background: '#FFFFFF' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
              <span>Poor</span>
              <span style={{ fontWeight: '600', color: '#374151' }}>{formData.qualityScore}</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* On-Time Delivery */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              On-Time Delivery Rate (%)
            </label>
            <input
              type="number"
              min="50"
              max="100"
              value={formData.onTimeDelivery}
              onChange={(e) => setFormData({...formData, onTimeDelivery: Number(e.target.value)})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '1rem',
                color: '#111827',
                background: '#FFFFFF'
              }}
            />
          </div>

          {/* Spend Concentration */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Spend Concentration (% of total procurement)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.spendConcentration}
              onChange={(e) => setFormData({...formData, spendConcentration: Number(e.target.value)})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '1rem',color: '#111827',
                background: '#FFFFFF'
              }}
            />
          </div>

          {/* Contract Length */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Contract Length (years)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.5"
              value={formData.contractLength}
              onChange={(e) => setFormData({...formData, contractLength: Number(e.target.value)})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '1rem',
                color: '#111827',
                background: '#FFFFFF'
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setShowResults(true)}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            marginBottom: '2rem'
          }}
          onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Calculate Risk Score
        </button>

        {showResults && (
          <div style={{
            background: '#F9FAFB',
            borderRadius: '12px',
            padding: '2rem',
            border: `3px solid ${riskColor}`
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                fontSize: '4rem',
                fontWeight: '700',
                color: riskColor,
                marginBottom: '0.5rem'
              }}>
                {riskScore}
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1F2937',
                marginBottom: '0.5rem'
              }}>
                {riskLevel} Risk
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#6B7280'
              }}>
                Risk Score: 0-40 (Low), 41-70 (Medium), 71-100 (High)
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1F2937',
                marginBottom: '1rem'
              }}>
                Recommended Actions
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {recommendations[riskLevel].map((rec, idx) => (
                  <li key={idx} style={{
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    borderLeft: `4px solid ${riskColor}`,
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'white',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: '#6B7280'
            }}>
              <strong>Methodology:</strong> Risk score calculated using weighted factors: Financial Health (25%), Quality (20%), On-Time Delivery (15%), Geographic Risk (15%), Spend Concentration (15%), Contract Stability (10%)
            </div>
          </div>
        )}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        color: 'white',
        fontSize: '0.875rem'
      }}>
        Built by Sid Shetty • Procurement & Supply Chain Analytics
      </div>
    </div>
  );
}