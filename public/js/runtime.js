setInterval(() => {
    let create_time = Math.round(new Date('2025/04/22 00:00:00').getTime() / 1000); // 在此行修改建站时间
    let timestamp = Math.round((new Date().getTime()) / 1000);
    let second = timestamp - create_time;
    let time = new Array(0, 0, 0, 0, 0);

    var nol = function(h) {
        return h > 9 ? h : '0' + h;
    }
    if (second >= 365 * 24 * 3600) {
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
    }
    if (second >= 24 * 3600) {
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
    }
    if (second >= 3600) {
        time[2] = nol(parseInt(second / 3600));
        second %= 3600;
    }
    if (second >= 60) {
        time[3] = nol(parseInt(second / 60));
        second %= 60;
    }
    if (second >= 0) {
        time[4] = nol(second);
    }
    let currentTimeHtml = ""
    if (time[0] != 0) {
        currentTimeHtml += '<span class="runtime-num">' + time[0] + '</span> YEAR '
    }
    currentTimeHtml += '<span class="runtime-num">' + time[1] + '</span> DAYS '
    currentTimeHtml += '<span class="runtime-num">' + time[2] + '</span> : '
    currentTimeHtml += '<span class="runtime-num">' + time[3] + '</span> : '
    currentTimeHtml += '<span class="runtime-num">' + time[4] + '</span>';
    document.getElementById("runtime").innerHTML = currentTimeHtml;
}, 1000);
