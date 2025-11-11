import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import { WM, WS } from '../../assets/styles/paddings';
import { BASE_ICONS, DOC_ICONS } from '../../Constants/icons';
import { fileType } from '../../DataTypes/BaseTypes';
import { Text } from './TextItem';

type fileItemProps = {
  file: fileType | null;
  children?: any;
  onPress?: () => void;
  canDelete?: boolean;
};
type fileItemState = {
  file: fileType | null;
};

const isImage = (type: string) => {
  return type == 'image/png' || type == 'image/jpg' || type == 'image/jpeg';
};

const getImageDependsType = (file: fileType) => {
  console.error('FILE TYPE', file);
  return isImage(file.type) ? { uri: file.uri } : DOC_ICONS.document;
};

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

class FileItemView extends React.Component {
  props: fileItemProps;
  state: fileItemState;
  constructor(props: fileItemProps) {
    super(props);
    this.props = props;
    this.state = {
      file: this.props.file,
    };
  }

  updateMe(file: fileType | null) {
    this.setState({ file });
  }
  renderDeleteFile(type: string) {
    return (
      <Pressable
        onPress={() => this.setState({ file: null })}
        style={[styles.remove, isImage(type) ? styles.removeImage : styles.removeFile]}
      >
        <Image source={BASE_ICONS.close} style={[styles.image25, styles.borderRadiusImage]} />
      </Pressable>
    );
  }
  render() {
    const { children, onPress, canDelete } = this.props;
    const { file } = this.state;
    if (file === null) {
      return children || null;
    }
    return (
      <Pressable onPress={onPress} style={[styles.container]}>
        <View style={[styles.imageBox]}>
          <Image source={getImageDependsType(file)} style={[styles.image, styles.borderRadiusImage]} />
          {canDelete && this.renderDeleteFile(file.type)}
        </View>
        <View style={styles.descriptionBox}>
          <View style={styles.descriptionBoxName}>
            <Text style="h3" ellipsizeMode="middle" numberOfLines={1}>
              {file.name || file.fileName}
            </Text>
          </View>
          <View style={styles.descriptionBoxSize}>
            <Text style="descTitle">{formatBytes(file.size || file.fileSize)}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
}

export { FileItemView };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  imageBox: {
    width: 50,
    height: 50,
    marginHorizontal: WM,
    marginVertical: WS,
  },
  image: {
    width: 50,
    height: 50,
  },
  descriptionBox: {
    width: '80%',
  },
  descriptionBoxName: {},
  descriptionBoxSize: {},
  remove: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImage: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  removeFile: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  image25: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  borderRadiusImage: {
    borderRadius: 5,
  },
});
