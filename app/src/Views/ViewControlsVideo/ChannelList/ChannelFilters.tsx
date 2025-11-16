import React, {type CSSProperties } from "react";
import { ViewItem, type viewItemProps } from "~/src/Base/ViewItem";
import { TextItem } from "../../Components/TextItem";
import { BASE_ICONS } from "~/src/Constants/icons";
import { FONTS } from "~/src/assets/styles/fonts";
import { PressableFocusView } from "~/src/ViewsNew/MainListPage/Components/Iptvs/PressableFocusView";

type channelFilterProps = viewItemProps & {
    categories?: Array<{ id: any; genre: string }>;
    selectedChannel?: string;
    selectedCategory?: any;
    onSelectCategory?: (category: any) => void;
    setCategoryFocus?: (ref: any) => void;
};

type ChannelFiltersState = {
    isDropdownOpen: boolean;
    selectedCategoryId: any;
    focusedCategory: boolean;
};

class ChannelFilters extends ViewItem {
    props: channelFilterProps;
    state: ChannelFiltersState;

    constructor(props: channelFilterProps) {
        super(props);
        this.props = props;
        this.state = {
            isDropdownOpen: false,
            focusedCategory: false,
            selectedCategoryId: this.props.selectedCategory?.id || null
        };
    }

    setFocused = (bool: boolean = true) => {
        this.setState({ focusedCategory: bool });
    };

    toggleDropdown = () => {
        this.setState((prev) => ({ isDropdownOpen: !prev.isDropdownOpen }));
    };

    handleCategorySelect = (categoryId: any, genre: string) => {
        this.setState({
            selectedCategoryId: categoryId,
            isDropdownOpen: false,
        });

        if (this.props.onSelectCategory) {
            const found =
                !categoryId
                    ? this.props.categories?.find((oi) => oi.genre === "all")
                    : this.props.categories?.find((oi) => oi.id === categoryId);

            this.props.onSelectCategory(found);
        }
    };

    getSelectedCategoryName = () => {
        if (!this.state.selectedCategoryId) return "All";
        const category = this.props.categories?.find(
            (cat) => cat.id === this.state.selectedCategoryId
        );
        return category ? category.genre : "All";
    };

    render() {
        const { categories, selectedChannel, setCategoryFocus } = this.props;
        const { isDropdownOpen } = this.state;

        return (
            <div
                style={styles.wrapper}
                tabIndex={-1}
                onBlur={() => this.setFocused(false)}
            >
                <div style={styles.container}>
                    <div style={styles.titleBox}>
                        <TextItem customStyle={{...styles.titleName, ...styles.selectedCategory}}>
                            {this.getSelectedCategoryName()}
                        </TextItem>
                        <TextItem customStyle={styles.titleName}>•</TextItem>
                        <TextItem customStyle={styles.titleName}>
                            {selectedChannel ? selectedChannel : "Select a channel"}
                        </TextItem>
                    </div>

                    <PressableFocusView
                        style={styles.categorySelector}
                        onPress={this.toggleDropdown}
                        setFocusItem={setCategoryFocus}
                        focused={this.state.focusedCategory}
                    >
                        <TextItem customStyle={styles.categoryName}>
                            {this.getSelectedCategoryName()}
                        </TextItem>
                        <div style={styles.arrowIconBox}>
                            <img src={BASE_ICONS.right}
                                style={{
                                    ...styles.arrowIcon,
                                    transform: isDropdownOpen
                                        ? "rotate(270deg)"
                                        : "rotate(90deg)",
                                }}
                             alt={''}m/>
                        </div>
                    </PressableFocusView>
                </div>

                {isDropdownOpen && categories && categories.length > 0 && (
                    <div style={styles.dropdownContainer}>
                        <div style={styles.dropdownScroll}>
                            <PressableFocusView
                                style={{
                                    ...styles.dropdownItem,
                                    ...(!!!this.state.selectedCategoryId
                                        ? styles.dropdownItemSelected
                                        : {}),
                                }}
                                focused={!this.state.selectedCategoryId || false}
                                onPress={() => this.handleCategorySelect(null, "All")}
                            >
                                <TextItem
                                    customStyle={{
                                        ...styles.dropdownItemText,
                                        ...(!!!this.state.selectedCategoryId
                                            ? styles.dropdownItemTextSelected
                                            : {}),
                                    }}
                                >
                                    All Categories
                                </TextItem>
                            </PressableFocusView>

                            {categories
                                .filter((oi) => oi.genre !== "all")
                                .map((category) => (
                                    <PressableFocusView
                                        key={category.id}
                                        style={{
                                            ...styles.dropdownItem,
                                            ...(this.state.selectedCategoryId === category.id
                                                ? styles.dropdownItemSelected
                                                : {}),
                                        }}
                                        focused={
                                            this.state.selectedCategoryId === category.id || false
                                        }
                                        onPress={() =>
                                            this.handleCategorySelect(category.id, category.genre)
                                        }
                                    >
                                        <TextItem
                                            customStyle={{
                                                ...styles.dropdownItemText,
                                                ...(this.state.selectedCategoryId === category.id
                                                    ? styles.dropdownItemTextSelected
                                                    : {}),
                                            }}
                                        >
                                            {category.genre}
                                        </TextItem>
                                    </PressableFocusView>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export { ChannelFilters };

const styles: Record<string, CSSProperties> = {
    wrapper: {
        marginBottom: 10,
        position: "relative",
        zIndex: 100,
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    titlePre: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: "#888",
        marginRight: 8,
    },
    titleName: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: "#fff",
    },
    categorySelector: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px 24px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 8,
        minWidth: 180,
        justifyContent: "space-between",
        cursor: "pointer",
    },
    categoryName: {
        fontSize: 18,
        fontFamily: FONTS.semi,
        marginRight: 12,
        color: "#fff",
    },
    arrowIcon: {
        width: 15,
        height: 15,
        objectFit: "contain",
    },
    arrowIconBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
    },
    dropdownContainer: {
        position: "absolute",
        top: 55,
        right: 0,
        backgroundColor: "rgba(20, 20, 20, 0.98)",
        borderRadius: 8,
        minWidth: 250,
        maxHeight: 280,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
    },
    dropdownScroll: {
        maxHeight: 400,
        overflowY: "auto",
    },
    dropdownItem: {
        padding: "14px 24px",
    },
    dropdownItemSelected: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    dropdownItemText: {
        fontSize: 16,
        fontFamily: FONTS.semi,
        color: "#ccc",
    },
    dropdownItemTextSelected: {
        color: "#fff",
        fontFamily: FONTS.bold,
    },
    selectedCategory: {
        color: "#2d75f1ff",
        textTransform: "uppercase",
    },
};