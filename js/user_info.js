var UserInfo;

function getUserInfo() {   
    var serializedData = {};
    serializedData.option = "getUserInfo";

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        data: serializedData,
        async: false,
        success: function (data) {
            UserInfo = ConvertStringToArray(data, ",", ";");
            UserInfo
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + ' - ' + textStatus + errorThrown);
        }
    });
}

$(document).ready(function () {
    getUserInfo();
    $("#user-name").html(UserInfo[0][1]);
    $("#user-image").attr('src', UserInfo[0][5]);
});