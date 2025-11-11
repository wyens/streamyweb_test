import { AppSettings } from '../Constants/AppSettings';
import type {
    authBody,
    baseResponse,
    changeLanguageBody,
    checkFavoritesOneBody,
    getFavoritesBody,
    getMoviesBody,
    getPaymentLinkBody,
    getRecomendationsBody,
    loadMovieCastsBody,
    makeFavoritesOneBody,
    noBody,
    saveTimeBody,
    save_device_tokenType,
    searchMovieBody,
    tokenBody,
    favoriteBody,
} from '../DataTypes/BaseResponse';
import { fetchData } from '../Helpers/FetchData';

export type watchChannelBody = {
  userToken: string;
  channelToken: string;
};

export class UserDataProvider {
  static getBalancer(body: watchChannelBody) {
    return fetchData(`user/getbalancer/${body.userToken}/${body.channelToken}`, 'GET');
  }

  static authorization(body: authBody) {
    return fetchData('user/sign_in', 'POST', {
      country: body.country,
      phonenumber: body.phone,
    });
  }
  static getCode(body: authBody) {
    return fetchData('user/getcode', 'POST', {
      country: body.country,
      phonenumber: body.phone,
    });
  }
  static check(body: tokenBody) {
    return fetchData('user/token', 'POST', {
      userToken: body.userToken,
    });
  }
  static logout(body: tokenBody) {
    return fetchData('auth/logout', 'POST', {
      userToken: body.userToken,
    });
  }
  static favoritesAdd(body: favoriteBody) {
    return fetchData('user/favorites/add', 'POST', {
      userToken: body.userToken,
      channel_id: body.channel_id,
    });
  }
  static favoritesRemove(body: favoriteBody) {
    return fetchData('user/favorites/remove', 'POST', {
      userToken: body.userToken,
      channel_id: body.channel_id,
    });
  }

  static userInfo(body: tokenBody) {
    return fetchData('auth/get_user_info', 'POST', {
      userToken: body.userToken,
    });
  }
  static changeLanguage(body: changeLanguageBody) {
    return fetchData('user/set_language', 'POST', {
      userToken: body.userToken,
      language: body.language,
    });
  }
  static save_user_token(body: save_device_tokenType) {
    return fetchData('save_device_token', 'POST', body);
  }

  static watchChannel(body: watchChannelBody) {
    // return `${AppSettings.endpoint}/user/watch/${body.userToken}/${body.channelToken}`
    return `${AppSettings.endpoint}/watch/live/${body.userToken}/${body.channelToken}`;
  }

  static getAppVersion() {
    return fetchData('user/appversion', 'GET', {});
  }

  static saveTimeRequest(body: saveTimeBody) {
    return fetchData('user/savetime', 'POST', {
      userToken: body.userToken,
      movie_hash: body.movie_hash,
      type: body.stream_type,
      time: body.time,
    });
  }

  static listChannels(body: any) {
    return fetchData('user/live_channels', 'POST', {
      userToken: body.userToken,
      country: body.country,
      category: body.category,
      category_id: body.category_id,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
      selected_channel_hash: body.selected_channel_hash,
    });
  }

  static loadCategoryIptv(body: noBody) {
    return fetchData('user/channel_categories', 'GET');
  }
  static loadCategoryMovies(body: noBody) {
    return fetchData('user/movie_categories', 'GET');
  }

  static getMovies(body: getMoviesBody) {
    return fetchData(
      'user/movie_channels',
      'POST',
      {
        category_id: body.category_id,
        pageIndex: body.pageIndex,
        pageSize: body.pageSize,
        sortByYear: body.sortByYear,
        sortByRating: body.sortByRating,
        filterYear: body.filterYear,
        filterCountry: body.filterCountry,
        withPhotoOnly: body.withPhotoOnly,
      }
      // true
    );
  }

  static getSeries(body: getMoviesBody) {
    return fetchData(
      'user/series_channels',
      'POST',
      {
        category_id: body.category_id,
        pageIndex: body.pageIndex,
        pageSize: body.pageSize,
        sortByYear: body.sortByYear,
        sortByRating: body.sortByRating,
        filterYear: body.filterYear,
        filterCountry: body.filterCountry,
        withPhotoOnly: body.withPhotoOnly,
      }
      // true
    );
  }

  static oneMovie(body: noBody) {
    return fetchData(
      'user/movieinfo',
      'POST',
      body
      // true
    );
  }
  static oneSerie(body: noBody) {
    return fetchData('user/seriesinfo', 'POST', body);
  }

  static loadMovieCasts(body: loadMovieCastsBody) {
    return fetchData('user/moviecast', 'POST', {
      movie_hash: body.movie_hash,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
    });
  }

  static loadSerieCasts(body: loadMovieCastsBody) {
    return fetchData('user/seriescast', 'POST', {
      series_hash: body.movie_hash,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
      episode_id: body.episode_id,
    });
  }

  static getRecomendations(body: getRecomendationsBody) {
    return fetchData('user/movie_recommendations', 'POST', {
      userToken: body.userToken,
      movie_hash: body.movie_hash,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
    });
  }

  static getSeriesRecomendations(body: getRecomendationsBody) {
    return fetchData(
      'user/series_recommendations',
      'POST',
      {
        userToken: body.userToken,
        series_hash: body.movie_hash,
        pageIndex: body.pageIndex,
        pageSize: body.pageSize,
      },
      true
    );
  }

  static loadPersonMovies(body: noBody) {
    return fetchData('user/searchbyperson', 'POST', body);
  }

  static loadSeasonSeries(body: noBody) {
    return fetchData(
      'user/episodesinfo',
      'POST',
      body
      // {
      //     series_hash: body.movie_hash,
      //     season_num: body.season_num
      // }
    );
  }

  static checkFavoritesOne(body: checkFavoritesOneBody) {
    return fetchData('user/get_favourites_one', 'POST', {
      userToken: body.userToken,
      movie_hash: body.movie_hash,
    });
  }

  static makeFavorite(body: makeFavoritesOneBody) {
    return fetchData('user/favourites', 'POST', {
      userToken: body.userToken,
      movie_hash: body.movie_hash,
      stream_type: body.stream_type,
    });
  }
  static sendDevice(body: any) {
    return fetchData('auth/generate-code/', 'POST', {
      device_name: body.device_name,
      device_type: body.device_type,
      device_identifier: body.device_identifier,
    });
  }

  static checkActivation(body: any) {
    return fetchData('auth/check-activation/', 'POST', {
      code: body.code,
      isDev: body.isDev,
    });
  }

  static getFavorites(body: getFavoritesBody) {
    return fetchData('user/get_favourites', 'POST', {
      userToken: body.userToken,
      type: body.stream_type,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
    });
  }

  static getTarifs(body: tokenBody) {
    return fetchData('user/get_tarifs', 'POST', {
      userToken: body.userToken,
    });
  }

  static getPayLink(body: getPaymentLinkBody) {
    return fetchData('user/getPayLink', 'POST', {
      userToken: body.userToken,
      method: body.method,
      period: body.period,
      tariffToken: body.tariffToken,
    });
  }
  static repeatPayment(body: tokenBody) {
    return fetchData('user/getrepeatPayLink', 'POST', {
      userToken: body.userToken,
    });
  }

  static loadDevices(body: tokenBody) {
    return fetchData('user/devices_list', 'POST', body);
  }
  static addDevice(body: tokenBody) {
    return fetchData('user/add_device', 'POST', body);
  }

  static searchMovie(body: searchMovieBody) {
    return fetchData('user/movie_search', 'POST', {
      search: body.search,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
    });
  }

  static searchSeries(body: searchMovieBody) {
    return fetchData('user/series_search', 'POST', {
      search: body.search,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
    });
  }

  static searchPerson(body: searchMovieBody) {
    return fetchData('user/person_search', 'POST', {
      search: body.search,
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
    });
  }

  static googleAuthorization(body: any) {
    return fetchData('user/google_auth', 'POST', {
      token_id: body.token_id,
      // referal: body.referal,
      country: 'hu',
      mobile: true,
    });
  }
}

export async function loadData(dataProvider: (body: any) => any, body: {}): Promise<baseResponse> {
  try {
    const response: baseResponse = await dataProvider(body);
    if (response.statusCode < 200) {
      // system error exception
      // console.error("STATUS CODE", response.statusMessage)
    }
    return response;
  } catch (e) {
    console.log('error', e);
    throw e;
  }
}
