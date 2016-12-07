function GetValueToURL(key, default_) {
    if (default_ == null) {
        default_ = "";
    }

    var search = unescape(location.hash);
    if (search == "") {
        return default_;
    }
    search = search.substr(1);
    var params = search.split("&");
    for (var i = 0; i < params.length; i++) {
        var pairs = params[i].split("=");
        if (pairs[0] == key) { return pairs[1]; }
    }
    return default_;
}


function FormatNumber (value) {
    var num = parseInt(value);
    var cadena = ""; var aux;
    var cont = 1, m, k;

    if (num < 0)
        aux = 1;
    else aux = 0;
    num = num.toString();

    for (m = num.length - 1; m >= 0; m--) {
        cadena = num.charAt(m) + cadena;
        if (cont % 3 == 0 && m > aux) cadena = "." + cadena; else cadena = cadena;
        if (cont == 3) cont = 1; else cont++;
    }
    cadena = cadena.replace(".", ",");
    cadena = cadena.replace(".", ",");
    return cadena;
}

function ConvertStringToArray(value, ColumSplit, RowSplit) {
    var auxTable = new Array();
    var rows = value.split(RowSplit);
    auxTable = rows;
    $.each(rows, function (index, row) {
        auxTable[index] = row.split(ColumSplit);
    });
    return auxTable;
}
