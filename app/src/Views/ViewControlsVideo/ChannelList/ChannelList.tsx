import React from 'react';
import { ViewItem } from '~/src/Base/ViewItem';
import { ControllerChannelList } from '~/src/Models/ControllerControlsVideo/ChannelList/ControllerChannelList';
import { controllers } from '~/src/Controllers/Controllers';
import {ChannelFilters} from "~/src/Views/ViewControlsVideo/ChannelList/ChannelFilters";
import {NewIptvRowView} from "~/src/ViewsNew/MainListPage/Components/Iptvs/NewIptvRowView";
import {ListView} from "~/src/Views/Components/ListView/ListView";


export class ChannelList extends ViewItem {
    get controller(): ControllerChannelList {
        return this.props.controller;
    }

    onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            this.controller.controls.hideChannelList?.();
        }
    };

    render() {
        const isVisible = this.controller.isVisible;

        if (!isVisible) {
            return null;
        }

        return (
            <div style={styles.overlay}  onClick={this.onOverlayClick}>
                <div style={styles.panel}>
                    <ChannelFilters
                        ref={this.controller.setCategoryFocusRef}
                        selectedCategory={this.controller.selectedCategory}
                        onSelectCategory={this.controller.onCategoryChanged}
                        selectedChannel={controllers().main.videoPlayerPage.initialChannel?.title || ''}
                        categories={controllers().main.mainListPage.categories.items}
                    />
                    <ListView
                        isFull={true}
                        autoFocus={true}
                        ref={this.controller.iptvList.set}
                        controller={this.controller.iptvList}
                        RightComponent={NewIptvRowView}
                    />
                </div>
            </div>
        );
    }
}



const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end'
    },
    panel: {
        width: '100%',
        height: '66vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: '10px 20px 5px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
};