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
      <div className="flex items-center justify-between mb-4">
        <h2 className="heading">Alert Settings</h2>
        <Button variant="primary" size="sm">
          <Icon name="plus" size="sm" className="mr-2" />
          Add Alert
        </Button>
      </div>

      <div className="card shadow-sm">
        <h3 className="font-semibold text-text mb-4">Quick Setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Coin Name</label>
            <input
              type="text"
              placeholder="e.g., PEPE"
              className="input"
            />
          </div>
          <div>
            <label className="label">Threshold Score</label>
            <input
              type="number"
              placeholder="75"
              className="input"
            />
          </div>
        </div>
        <Button variant="primary" size="sm" className="mt-5">
          Create Alert
        </Button>
      </div>

      <div className="section">
        <div className="flex items-center justify-between mb-3">
          <h3 className="subheading">Active Alerts</h3>
          <span className="badge badge-primary">
            {alerts.filter(a => a.isActive).length} Active
          </span>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`list-item card-interactive ${alert.isActive ? 'list-item-active' : ''}`}>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 ${alert.isActive ? 'bg-accent' : 'bg-accent/20'} text-white rounded-full shadow-sm transition-colors duration-base`}>
                  <Icon name="bell" size="sm" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-text">{alert.coinName}</h4>
                  <div className="flex items-center mt-1">
                    <span className="caption">
                      Alert when score reaches <span className="font-medium">{alert.alertThreshold}</span>
                    </span>
                    <span className={`ml-2 badge ${alert.isActive ? 'badge-success' : 'badge-warning'}`}>
                      {alert.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  onClick={() => toggleAlert(alert.id)}
                  className={`alert-toggle ${alert.isActive ? 'alert-toggle-active' : ''}`}
                  role="switch"
                  aria-checked={alert.isActive}
                  tabIndex={0}
                />
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Icon name="settings" size="sm" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {alerts.length === 0 && (
          <div className="card bg-surface/50 border-dashed border-border p-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Icon name="bell" size="lg" className="text-primary/70" />
              </div>
              <h4 className="font-medium mb-1">No Alerts Set</h4>
              <p className="caption mb-4">Create your first alert to get notified about memecoin trends</p>
              <Button variant="primary" size="sm">
                <Icon name="plus" size="sm" className="mr-2" />
                Create Alert
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="card bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="bg-warning/10 p-2 rounded-full shrink-0">
            <Icon name="alert" size="md" className="text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-text">Alert Limits</h3>
            <p className="caption mt-1">
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
