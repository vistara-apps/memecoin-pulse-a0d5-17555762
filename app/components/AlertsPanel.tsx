'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { Button } from './Button';

interface UserAlert {
  id: string;
  coinId: string;
  coinName: string;
  alertThreshold: number;
  isActive: boolean;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<UserAlert[]>([
    {
      id: '1',
      coinId: 'pepe',
      coinName: 'PEPE',
      alertThreshold: 80,
      isActive: true,
    },
    {
      id: '2',
      coinId: 'doge',
      coinName: 'DOGE',
      alertThreshold: 90,
      isActive: false,
    },
  ]);

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading">Alert Settings</h2>
        <Button variant="primary" size="sm">
          <Icon name="plus" size="sm" className="mr-2" />
          Add Alert
        </Button>
      </div>

      <div className="card">
        <h3 className="font-semibold text-text mb-4">Quick Setup</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block caption text-muted mb-2">Coin Name</label>
            <input
              type="text"
              placeholder="e.g., PEPE"
              className="w-full px-3 py-2 bg-bg border border-primary/20 rounded-md focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block caption text-muted mb-2">Threshold Score</label>
            <input
              type="number"
              placeholder="75"
              className="w-full px-3 py-2 bg-bg border border-primary/20 rounded-md focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <Button variant="primary" size="sm" className="mt-4">
          Create Alert
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-text">Active Alerts</h3>
        
        {alerts.map((alert) => (
          <div key={alert.id} className="list-item">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-accent/20 text-accent rounded-full">
                <Icon name="bell" size="sm" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-text">{alert.coinName}</h4>
                <p className="caption text-muted">
                  Alert when score reaches {alert.alertThreshold}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                onClick={() => toggleAlert(alert.id)}
                className={`alert-toggle ${alert.isActive ? 'alert-toggle-active' : ''}`}
              />
              <Button variant="ghost" size="sm">
                <Icon name="settings" size="sm" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
        <div className="flex items-start space-x-3">
          <Icon name="alert" size="md" className="text-warning mt-1" />
          <div>
            <h3 className="font-semibold text-text">Alert Limits</h3>
            <p className="caption text-muted mt-1">
              Free tier: 2 active alerts. Upgrade for unlimited alerts and advanced features.
            </p>
            <Button variant="secondary" size="sm" className="mt-3">
              View Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
