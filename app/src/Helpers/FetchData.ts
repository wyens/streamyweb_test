import { AppSettings } from "../Constants/AppSettings"
import type {baseResponse} from "../DataTypes/BaseResponse"
// import { controllers } from "../Controllers/Controller"
// import { baseResponse } from "../DataTypes/baseResponse"

const noInternetConnectionError:baseResponse = {
    data: [],
    status: false,
    statusCode: 0,
    statusMessage: 'The same internet connection error'
}

const duringParsingError:baseResponse = {
    data: [],
    status: false,
    statusCode: 1,
    statusMessage: 'Error during parsing json response'
}

export const fetchData = async (
    url = '',
    type = 'POST',
    body = {},
    isAborted = false
) => {
    try{
        // console.log('BODY', JSON.stringify(body))
        // const startTime = new Date().getTime();
        // console.log('sendURL', `${AppSettings.endpoint}/${url}`);
        var bodySend = {}
        if(type !== "GET"){
            // @ts-ignore
            bodySend.body = JSON.stringify(body)
        }
        // const { add, get} = controllers().fetcher
        // const fetcher = get(add(url, isAborted))
        console.log("Hear :" + `${AppSettings.endpoint}/${url}`)
        const response = await fetch(
            `${AppSettings.endpoint}/${url}`,
            {
                method: type,
                headers: {
                  'Content-Type': 'text/plain',
                //   'Accept-Encoding': "gzip, compress, br"
                },
                mode: 'cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, *same-origin, omit
                // referrer: document.location.origin,
                // referrerPolicy: "origin",
                // signal: fetcher.signal,
                ...bodySend
            }
        )
        // console.log("FIRSTRESPONSE",response)
        
        if (response.ok) {
            // console.error("NO ERROR", response)
            try{
                // fetcher.isready()
                const json = AppSettings.devMode ? await response.text() : await response.json();
                // console.warn("JSON2",json)
                return JSON.parse(json);
            } catch(e){
                return duringParsingError
            }
        } else {
            console.log('!OK', response)
            return response
        }
    } catch(e){
        console.log('error', e)
        return noInternetConnectionError
        // throw e
    }
}

