/**
 * Override method post ajax
 * 
 * @param url 
 * @param data 
 * @param callback 
 */
jQuery["post"] = function( url, data, success, error ) {

    return jQuery.ajax({
        url: url,
        type: "POST",
        contentType:"application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: success,
        error: error
    });
};