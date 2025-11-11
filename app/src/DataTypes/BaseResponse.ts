import type {langs} from '../Constants/AppSettings';
import type {idType} from './BaseTypes';
import type {favoritesType} from "~/src/DataTypes/dataTypes";

export type baseResponse = {
  status: boolean;
  statusCode: number;
  statusMessage: string;
  data: any;
};

export type tokenBody = {
  userToken: string;
};
export type favoriteBody = {
  userToken: string;
  channel_id: string;
};

export type noBody = {
  some?: string;
};

export type authBody = {
  country: string;
  phone: string;
};

export type changeLanguageBody = {
  userToken: string;
  language: langs;
};

export type tableBody = {
  pageIndex: number;
  pageSize: number;
  sQuery?: number;
};
export type save_device_tokenType = {
  firebaseToken: string;
  userToken: string;
};


export type userInfoBody = {
  userToken: string;
};


export type saveTimeBody = {
  userToken?: string;
  movie_hash?: idType;
  time: number;
  stream_type?: favoritesType;
}

export type sortedTypes = "ASC"|"DESC"

export type getMoviesBody = {
  category_id?: string|number;
  pageIndex: number;
  pageSize: number;
  sortByYear?: sortedTypes;
  sortByRating?:sortedTypes;
  filterYear?: string;
  filterCountry?: string;
  withPhotoOnly?: boolean
}

export type loadMovieCastsBody = {
  movie_hash: string;
  pageIndex: number;
  pageSize: number;
  episode_id?: idType;
}

export type getRecomendationsBody = {
  userToken?: string;
  movie_hash: string|number;
  pageIndex: number;
  pageSize: number;
}

export type checkFavoritesOneBody = {
  userToken?: string;
  movie_hash?: idType
}

export type makeFavoritesOneBody = {
  userToken?: string;
  movie_hash?: idType;
  stream_type?: favoritesType;
}

export type getFavoritesBody = {
  userToken?: string;
  stream_type?: favoritesType;
  pageIndex: number;
  pageSize: number;
}
export type methodTypes = "coinbase" | "paypal" | "stripe" | null;
export type getPaymentLinkBody = {
  userToken: string;
  period: string;
  method: methodTypes;
  tariffToken: string;
}

export type searchMovieBody = {
  search: string;
  pageIndex: number;
  pageSize: number;
}
