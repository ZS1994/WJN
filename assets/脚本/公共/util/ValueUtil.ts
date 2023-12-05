export default {
    /**
     * 空判断
     * @param val
     */
    isEmpty(val) {
        const type = typeof val;
        switch (type) {
            case "number":
                if (val === 'NaN' || val === 'undefined' || val === null) {
                    return true;
                }
                return false;
            case "boolean":
                if (val === 'undefined' || val === null) {
                    return true;
                }
                return false;
            case "string":
                if (val === 'undefined' || val === null || val.trim().length === 0) {
                    return true;
                }
                return false;
            case "object":
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const key in val) {
                    // 能进来，证明不是空对象
                    return false;
                }
                // 在判断一次双重保险，转为json字符串如果不是{}，则是非空
                return true;
            case "function":
                // 如果识别是函数，则证明不是空
                return false;
            default:
                // 其他等于认为空
                return true;
        }
    },
    /**
     * 非空判断
     * @param obj
     */
    isNotEmpty(obj) {
        return !this.isEmpty(obj);
    },
    /**
     * 即非空，也不是0
     * @param obj
     */
    isNotEmptyOrZero(obj) {
        return !this.isEmpty(obj) && Number(obj) !== 0;
    },
    /**
     * 克隆对象
     * @param obj
     */
    clone(obj) {
        if (this.isEmpty(obj)) {
            return null;
        }
        // const str = JSON.stringify(obj); // 序列化对象
        // const newobj = JSON.parse(str); // 还原
        // 改为展开来克隆，json克隆会导致丢失函数
        return {...obj};
    },
    /**
     * 如果目标对象存在该属性，并且属性值为空(有开关控制)，则把源对象的属性值赋值给目标对象;
     * 如果目标对象没有该属性，源对象有，则直接赋值；
     * 如果目标对象有该属性，源对象没有，则不处理；
     * @param from 源对象
     * @param to 目标对象
     * @param isCheckFieldEmpty 开关，默认true，true:只有当目标对象存在该属性并且属性值为空时才赋值；false：无论目标对象的该属性值为空与否都赋值
     */
    copyProperties(from, to, isCheckFieldEmpty = true) {
        // 先克隆一份源对象，避免产生引用
        const fromTmp = this.clone(from);
        // 双重遍历
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key1 in fromTmp) {
            let isHasKey1 = false;
            // eslint-disable-next-line no-restricted-syntax
            for (const key2 in to) {
                if (key2 === key1) {
                    isHasKey1 = true;
                    // 如果目标对象的这个字段是空的，那么就赋值
                    if (isCheckFieldEmpty === true) {
                        if (this.isEmpty(to[key2])) {
                            to[key2] = fromTmp[key1];
                        }
                    } else {
                        to[key2] = fromTmp[key1];
                    }
                }
            }
            if (!isHasKey1) {
                to[key1] = fromTmp[key1];
            }
        }
        return to;
    },
    /**
     *删除数组中的元素，并返回最终的数据
     * @param arr 数组
     * @param index 要删除的下标开始，这个下标所在元素不会被删除，下标从0开始
     * @param len 从删除下标往后删除多少个元素
     */
    arrRemove(arr, index, len) {
        const arrNew = [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            const lastIndex = parseInt(index, 10) + parseInt(len, 10);
            if (i >= index && i < lastIndex) {
                // eslint-disable-next-line no-continue
                continue;
            }
            arrNew.push(item);
        }
        return arrNew;
    },
    // 数字相加
    addNumber: function (num1, num2) {
        if (parseFloat(num1).toString() == "NaN" || parseFloat(num2).toString() == "NaN") return false;
        var r1 = 0, r2 = 0;
        try {
            r1 = num1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
        }
        var n = Math.pow(10, Math.max(r1, r2));
        return (num1 * n + num2 * n) / n;
    },
    // 数字相减
    subNumber(num1, num2) {
        if (parseFloat(num1).toString() == "NaN" || parseFloat(num2).toString() == "NaN") return;
        var r1 = 0, r2 = 0;
        try {
            r1 = num1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch (e) {
        }
        var m = Math.pow(10, Math.max(r1, r2));
        return (num1 * m - num2 * m) / m;
    },
    // 数字相等
    equalNum(num1: any, num2: any): boolean {
        return Number(num1) === Number(num2);
    },
    // 获取字符串，如果为空则显示默认字符串
    getStrWithDefault(str: string, defaultStr: string) {
        return this.isNotEmpty(str) ? str : defaultStr;
    }
}