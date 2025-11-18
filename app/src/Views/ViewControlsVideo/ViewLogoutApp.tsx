import React from 'react';
import { ViewItem } from '../../Base/ViewItem';
import { ControllerLogout } from '../../Models/ControllerControlsVideo/ControllerLogout';
import { LogoutMenuTV } from '../Components/LogoutMenuTV';

export class ViewLogoutApp extends ViewItem {
    get controller(): ControllerLogout {
        return this.props.controller;
    }

    render() {
        const { isVisible, onCancel, onConfirm } = this.controller;

        if (!isVisible) {
            return null;
        }

        return (
            <div className="logout-layer">
                <div className="logout-backdrop" onClick={onCancel} />

                <div className="logout-content">
                    <LogoutMenuTV onCancel={onCancel} onConfirm={onConfirm} />
                </div>
            </div>
        );
    }
}