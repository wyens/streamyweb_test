// import { IptvChannel } from '../Controllers/Pages/HomeStack/IptvPage/IptvChannel';
// import { Input } from '../Views/Components/InputItem';

export type idType = string | number;

export type errorType = {
  isError: boolean;
  errorMessage: string;
};
export type onChangeInput = (text: idType | Input) => void;

export type fileType = {
  name?: string;
  fileName?: string;
  size: number;
  fileSize: number;
  uri: string;
  type: any;
};


export type channelItemProps = {
  id: idType;
  streamchannel_id: idType;
  stream_icon?: any;
  title: string;
  channel_name: string;
  image_hash: string;
  stream_epg?: string;
  stream_timezone?: string
  category_name?: string; 
  channel_hash: string; 
  category_id?: string;
  country?: string;
  selected?: boolean;
  favoritesStatus?:boolean;
  scrolling?: (y:number, x?:number)=>void
  list?: any;
}