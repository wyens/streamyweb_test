import React from 'react';
import { ViewItem } from '~/src/Base/ViewItem';
import { type LoginMainModel, StateLogin } from '~/src/Models/LoginMainModel/LoginMainModel';
import { BASE_ICONS } from '~/src/Constants/icons';
import 'app/styles/LoginMainView/LoginMainView.css';

class LoginMainView extends ViewItem {
    get controller(): LoginMainModel {
        return this.props.controller;
    }

    public renderCode = () => {
        return (
            <div className="LoginMain_yourCode">
                <div className="LoginMain_center">
                    <p className="LoginMain_textYourCode">Az Ön kódja</p>

                    <div className="LoginMain_pill">
                        <button
                            className="LoginMain_codeBtn"
                            autoFocus
                            tabIndex={0}>
                            <span className="LoginMain_char">{this.controller.code}</span>
                        </button>
                    </div>
                </div>

                <div className="LoginMain_center">
                    <p className="LoginMain_textYourCodeInfo">
                        Adja meg ezt a kódot a szolgáltatójának a hozzáférés aktiválásához
                    </p>
                    <p className="LoginMain_textYourCodeInfo">
                        A szolgáltató jóváhagyása után az eszköze automatikusan aktiválódik
                    </p>
                </div>
            </div>
        );
    };

    public renderPreloader = () => {
        return (
            <div className="LoginMain_preloader">
                <p className="LoginMain_textPreloader">
                    Kérjük, várjon néhány másodpercet — az aktiválási kódot a szerverről töltjük le
                </p>
                <div style={{ marginTop: 56 }}>
                    <div className="LoginMain_spinner" aria-label="loading" />
                </div>
            </div>
        );
    };

    public renderView = () => {
        return this.controller.state === StateLogin.preloader
            ? this.renderPreloader()
            : this.renderCode();
    };

    render() {
        return (
            <div className="LoginMain_container">
                {/* header */}
                <div className="LoginMain_header">
                    <img src={BASE_ICONS.locked} alt="locked" className="LoginMain_locked" />
                    <p className="LoginMain_textHeader">Eszköz aktiválása</p>
                </div>

                {/* text main */}
                <div className="LoginMain_main">
                    <p className="LoginMain_textMain">Az eszköze még nincs aktiválva</p>
                </div>

                {this.renderView()}
            </div>
        );
    }
}

export { LoginMainView };