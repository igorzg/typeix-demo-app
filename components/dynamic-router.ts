import {Route, Injectable, IResolvedRoute, Inject, Methods, Headers} from "typeix";
import {InMemoryCache} from "./in-memory-cache";
/**
 * Dynamic route rule
 * @constructor
 * @function
 * @name DynamicRouteRule
 *
 * @description
 * Here we can define dynamic route rule which has to implement Route
 */
@Injectable()
export class DynamicRouteRule implements Route {

    @Inject(InMemoryCache)
    cache: InMemoryCache;

    /**
     * Dynamic parse request example
     * @param pathName
     * @param method
     * @param headers
     * @returns {Promise<{method: Methods, params: {}, route: string}>}
     */
    parseRequest(
        pathName: string,
        method: string,
        headers: Headers
    ): Promise<IResolvedRoute|boolean> {
        return Promise.resolve(
            {
                method: Methods.GET,
                params: {
                    pathName,
                    method,
                    headers
                },
                route: "core/not_found"
            }
        );
    }
    /**
     * Create url pattern
     * @param routeName
     * @param params
     * @returns {undefined}
     */
    createUrl(
        routeName: string,
        params: Object):
    Promise<string|boolean> {
        return null;
    }

}
