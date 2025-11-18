import React, { useState } from 'react';

type LogoutMenuTVProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export const LogoutMenuTV: React.FC<LogoutMenuTVProps> = ({onConfirm, onCancel }) => {
    const [yesFocused, setYesFocused] = useState(true);
    const [noFocused, setNoFocused] = useState(false);

    return (
        <div className="logout-menu-container">
            <div className="logout-menu-panel">
                <div className="logout-menu-title">Kijelentkezik a fiókból?</div>

                <div className="logout-menu-row">
                    <button
                        autoFocus
                        onClick={onConfirm}
                        onFocus={() => {
                            setYesFocused(true);
                            setNoFocused(false);
                        }}
                        onBlur={() => setYesFocused(false)}
                        onMouseEnter={() => {
                            setYesFocused(true);
                            setNoFocused(false);
                        }}
                        onMouseLeave={() => setYesFocused(false)}
                        className={'logout-menu-btn' + (yesFocused ? ' logout-menu-btn-focused' : '')}>
                            <span
                                className={
                                    'logout-menu-btn-text' +
                                    (yesFocused ? ' logout-menu-btn-text-focused' : '')
                                }
                            >
                              Igen
                            </span>
                    </button>

                    <button
                        onClick={onCancel}
                        onFocus={() => {
                            setNoFocused(true);
                            setYesFocused(false);
                        }}
                        onBlur={() => setNoFocused(false)}
                        onMouseEnter={() => {
                            setNoFocused(true);
                            setYesFocused(false);
                        }}
                        onMouseLeave={() => setNoFocused(false)}
                        className={'logout-menu-btn' + (noFocused ? ' logout-menu-btn-focused' : '')}>
                            <span
                                className={
                                    'logout-menu-btn-text' +
                                    (noFocused ? ' logout-menu-btn-text-focused' : '')
                                }
                            >
                              Nem
                            </span>
                    </button>
                </div>
            </div>
        </div>
    );
};