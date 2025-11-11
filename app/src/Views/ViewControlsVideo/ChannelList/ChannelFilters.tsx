import { Image, Pressable, StyleSheet, View, ScrollView, TVFocusGuideView } from "react-native";
import { ViewItem, viewItemProps } from "../../../Base/ViewItem";
import { Text } from "../../Components/TextItem";
import { BASE_ICONS } from "../../../Constants/icons";
import { FONTS } from "../../../assets/styles/fonts";
import { PressableFocusView } from "../../../ViewsNew/MainListPage/Components/Iptvs/PressableFocusView";

type channelFilterProps = viewItemProps & {
  categories?: Array<{id: any, genre: string}>;
  selectedChannel?: string;
  selectedCategory?:any;
  onSelectCategory?: (categoryId: any) => void;
  setCategoryFocus?: (ref:any)=>void
}

type ChannelFiltersState = {
  isDropdownOpen: boolean;
  selectedCategoryId: any;
  focusedCategory: boolean
}

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
    this.setState({focusedCategory: bool})
  }

  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  handleCategorySelect = (categoryId: any, genre: string) => {
    this.setState({ 
      selectedCategoryId: categoryId,
      isDropdownOpen: false 
    });
    if (this.props.onSelectCategory) {
      this.props.onSelectCategory(!categoryId ? this.props.categories?.find(oi=>oi.genre === "all") : this.props.categories?.find(oi=>oi.id === categoryId));
    }
  }

  getSelectedCategoryName = () => {
    if (!this.state.selectedCategoryId) return "All";
    const category = this.props.categories?.find(cat => cat.id === this.state.selectedCategoryId);
    return category ? category.genre : "All";
  }

  render() {
    const { categories, selectedChannel } = this.props;
    const { isDropdownOpen } = this.state;

    return (
      <TVFocusGuideView 
        style={styles.wrapper}
        autoFocus={true}
        onBlur={()=>this.setFocused(false)}
      >
        <View style={styles.container}>
          <View style={styles.titleBox}>
            {/* <Text customStyle={styles.titlePre}>Now: </Text> */}
            <Text customStyle={[styles.titleName, styles.selectedCategory]}>{this.getSelectedCategoryName()}</Text>
            <Text customStyle={styles.titleName}>•</Text>
            <Text customStyle={styles.titleName}>{selectedChannel ? `${selectedChannel}` : "Select a channel"}</Text>
          </View>

          <PressableFocusView 
            style={styles.categorySelector} 
            onPress={this.toggleDropdown}
            setFocusItem={this.props.setCategoryFocus}
            focused={this.state.focusedCategory}
          >
            <Text customStyle={styles.categoryName}>{this.getSelectedCategoryName()}</Text>
            <View style={styles.arrowIconBox}>
              <Image 
                source={BASE_ICONS.right} 
                style={[
                  styles.arrowIcon, 
                  { transform: [{ rotate: isDropdownOpen ? '270deg' : '90deg' }] }
                ]} 
              />
            </View>
          </PressableFocusView>
        </View>

        {isDropdownOpen && categories && categories.length > 0 && (
          <TVFocusGuideView 
            style={styles.dropdownContainer}
            trapFocusDown
            trapFocusLeft
            trapFocusRight
            autoFocus={true}
          >
            <ScrollView 
              style={styles.dropdownScroll}
              showsVerticalScrollIndicator={false}
            >
              <PressableFocusView
                style={[
                  styles.dropdownItem,
                  !this.state.selectedCategoryId && styles.dropdownItemSelected
                ]}
                focused={!this.state.selectedCategoryId || false}
                onPress={() => this.handleCategorySelect(null, "All")}
              >
                <Text customStyle={[
                  styles.dropdownItemText,
                  !this.state.selectedCategoryId && styles.dropdownItemTextSelected
                ]}>
                  All Categories
                </Text>
              </PressableFocusView>
              
              {categories.filter(oi=>oi.genre!="all").map((category) => (
                <PressableFocusView
                  key={category.id}
                  style={[
                    styles.dropdownItem,
                    this.state.selectedCategoryId === category.id && styles.dropdownItemSelected
                  ]}
                  focused={this.state.selectedCategoryId === category.id || false}
                  onPress={() => this.handleCategorySelect(category.id, category.genre)}
                >
                  <Text customStyle={[
                    styles.dropdownItemText,
                    this.state.selectedCategoryId === category.id && styles.dropdownItemTextSelected
                  ]}>
                    {category.genre}
                  </Text>
                </PressableFocusView>
              ))}
            </ScrollView>
          </TVFocusGuideView>
        )}
      </TVFocusGuideView>
    );
  }
}

export { ChannelFilters };

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    position: 'relative',
    zIndex: 100
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  titlePre: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#888',
    marginRight: 8
  },
  titleName: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#fff'
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    minWidth: 180,
    justifyContent: "space-between"
  },
  categoryName: {
    fontSize: 18,
    fontFamily: FONTS.semi,
    marginRight: 12,
    color: '#fff'
  },
  arrowIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#fff'
  },
  arrowIconBox: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4
  },
  dropdownContainer: {
    position: 'absolute',
    top: 55,
    right: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.98)',
    borderRadius: 8,
    minWidth: 250,
    maxHeight: 280,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10
  },
  dropdownScroll: {
    maxHeight: 400
  },
  dropdownItem: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255, 255, 255, 0.05)'
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: FONTS.semi,
    color: '#ccc'
  },
  dropdownItemTextSelected: {
    color: '#fff',
    fontFamily: FONTS.bold
  },
  selectedCategory: {
    color: "#2d75f1ff",
    textTransform:"uppercase"
  }
});