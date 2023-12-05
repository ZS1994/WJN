/**
 * 网络请求
 */
import UrlConfig from "../config/UrlConfig";
import ApiResult from "../subtype/ApiResult";

export default {
    post(urlb = "", data = {}) {
        // post请求
        return new Promise<ApiResult>((resolve, reject) => {
            fetch(UrlConfig.BASE_URL + urlb, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    siteId: 'LZY_yzbbs',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }).then((response) => {
                return response.json().then(value => {
                    return value;
                });
            }).then((data: ApiResult) => {
                if (data.success === false) {
                    // 打印错误日志
                    console.error(data);
                    reject(data);
                    return data;
                } else {
                    resolve(data);
                    return data;
                }
            });
        });
    },
}