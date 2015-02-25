define([
    './utils',
    'dojo/_base/lang'
], function (utils,lang) {

    /**
     * String Replace which works with multiple found items. Native aborts on the first needle.
     * @param find
     * @param replace
     * @param str
     * @returns {string}
     */
    utils.replaceAll = function (find, replace, str) {
        //return str.replace(new RegExp(find, 'g'), replace);\
        if (!str) {
            //debugger;
        }
        return str ? str.split(find).join(replace) : '';//faster!
    };
    /**
     *
     * @param expression
     * @param delimiters
     * @returns {*}
     * @private
     */
    utils.findOcurrences = function (expression, delimiters) {

        // prepare delimiters for the regular expression
        var d = {
            begin: utils.escapeRegExp(delimiters.begin),
            end: utils.escapeRegExp(delimiters.end)
        };

        // regular expression for [<content>]
        var allExceptEnd = "[^" + d.end + "]*";

        // final regular expression = find all [variables]
        var patt = d.begin + "(" + allExceptEnd + ")" + d.end;

        return expression.match(new RegExp(patt, 'g'));
    };

    /**
     * Escape regular expressions in a string
     * @param string
     * @returns {*}
     * @private
     */
    utils.escapeRegExp = function (string) {

        var special = ["[", "]", "(", ")", "{", "}", "*", "+", "."];
        for (var n = 0; n < special.length; n++) {
            string = string.replace(special[n], "\\" + special[n]);
        }

        return string;
    };

    /**
     * Tokenizes by begin & end pattern
     * @param expression
     * @param delimiters
     * @returns {string}
     */
    utils.findOcurrences = function (expression, delimiters) {

        // prepare delimiters for the regular expression
        var d = {
            begin: utils.escapeRegExp(delimiters.begin),
            end: utils.escapeRegExp(delimiters.end)
        };

        // regular expression for [<content>]
        var allExceptEnd = "[^" + d.end + "]*";

        // final regular expression = find all [variables]
        var patt = d.begin + "(" + allExceptEnd + ")" + d.end;

        return expression.match(new RegExp(patt, 'g'));
    };

    /**
     *
     * @param str {string} hackstack
     * @param hash {Object}
     * @returns {string}
     */
    utils.multipleReplace = function (str, hash) {

        //to array
        var a = [];
        for (var key in hash) {
            a[a.length] = key;
        }
        return str.replace(new RegExp(a.join('\\b|\\b'), 'g'), function (m) {
            return hash[m] || hash["\\" + m];
        });
    };

    /**
     * Flexible replacer, supports multiple replace and safe replace
     *
     * @param str {string} the haystack

     * @param needle {string|null} optional, only needed for simple cases, otherwise its using the 'what' map
     *
     * @param what {string|Object}. When string, its replacing 'needle' with 'what'. If its a hash-map:
     * variable:value, its replacing occurrences of all variables in 'haystack'. In such case, you can specify
     * delimiters to make sure that 'unresolved' variables will be stripped of in the result.
     *
     * @param delimiters {Object} Delimiters to identify variables. This is used to eliminate unresolved variables from
     * the result.
     *
     * @param delimiters.begin {string}
     * @param delimiters.end {string}
     *
     * @returns {string}
     *
     *
     * @example:
     *
     * 1. simple case: replace all '/' with ''
     *
     * return utils.replace('/foo/','/','') //returns 'foo'
     *
     * 2. simple case with multiple variables:
     *
     * return utils.replace('darling, i miss you so much',null,{'miss':'kiss','much':'little'})
     * # darling, i kiss you so little
     *
     * @memberOf module:xide/utils
     * @extends xide/utils
     */
    utils.replace = function (str, needle, what, delimiters) {

        if (!str) {
            return '';
        }
        if (what && lang.isObject(what) || lang.isArray(what)) {

            if (delimiters) {

                var ocurr = utils.findOcurrences(str, delimiters),
                    replaceAll = utils.replaceAll;
                if (ocurr) {

                    for (var i = 0, j = ocurr.length; i < j; i++) {
                        var el = ocurr[i];

                        //strip off delimiters
                        var _variableName = replaceAll(delimiters.begin, '', el);
                        _variableName = replaceAll(delimiters.end, '', _variableName);
                        str = replaceAll(el, what[_variableName], str);
                    }
                } else {
                    return str;
                }
            } else {
                //fast case
                return utils.multipleReplace(str, what)
            }
            return str;
        }
        //fast case
        return utils.replaceAll(needle, what, str);
    };

    return utils;
});
