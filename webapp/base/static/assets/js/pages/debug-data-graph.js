var runScript = function() {
    var socket = io();
    var maxbuf = 300;
    var updateInterval = 30;   // ms

    var brow_buf = {
        ave: [],
        cur: [],
        pos: [],
        vel: [],
        acc: [],
        fcx: [],
        fcy: [],
        dif: [],
        up: [],
    };
    var realtime_brow       = 'on'; //If == to on then fetch data every x seconds. else stop fetching

    var nose_buf = {
        xraw: [],
        yraw: [],
        xpos: [],
        xvel: [],
        ypos: [],
        yvel: [],
        xdelt: [],
        xacc: [],
        ydelt: [],
        yacc: [],
    };
    var realtime_nose       = 'on'; //If == to on then fetch data every x seconds. else stop fetching

    var mouth_buf = {
        v_ave: [],
        h_ave: [],
        v_cur: [],
        h_cur: [],
        ratio: [],
        v_pos: [],
        h_pos: [],
        v_vel: [],
        h_vel: [],
        v_acc: [],
        h_acc: [],
    };
    var realtime_mouth       = 'on'; //If == to on then fetch data every x seconds. else stop fetching

    var eyes_buf = {
        raw_ear: [],
        kf_ear: [],
        kf_vel: [],
        pup_dist: [],
        open: [],
    };
    var realtime_eyes       = 'on'; //If == to on then fetch data every x seconds. else stop fetching

    var brow_dataset = {
        "average height": {
            xaxis: 1, yaxis: 1,
            label: "average height",
            data: brow_buf.ave,
        },
        "current height": {
            xaxis: 1, yaxis: 1,
            label: "current height",
            data: brow_buf.cur,
        },
        "kf position": {
            xaxis: 1, yaxis: 1,
            label: "kf position",
            data: brow_buf.pos,
        },
        "kf velocity": {
            xaxis: 1, yaxis: 2,
            label: "kf velocity",
            data: brow_buf.vel,
        },
        "kf acceleration": {
            xaxis: 1, yaxis: 2,
            label: "kf acceleration",
            data: brow_buf.acc,
        },
        "face xangle": {
            xaxis: 1, yaxis: 1,
            label: "face xangle",
            data: brow_buf.fcx,
        },
        "face yangle": {
            xaxis: 1, yaxis: 1,
            label: "face yangle",
            data: brow_buf.fcy,
        },
        "height delta": {
            xaxis: 1, yaxis: 2,
            label: "height delta",
            data: brow_buf.dif,
        },
        "raised": {
            xaxis: 1, yaxis: 1,
            label: "raised",
            data: brow_buf.up,
        },
    };

    var nose_dataset = {
        "x raw": {
            xaxis: 1, yaxis: 1,
            label: "x raw",
            lines: { fill: false },
            data: nose_buf.xraw,
        },
        "y raw": {
            xaxis: 1, yaxis: 1,
            label: "y raw",
            lines: { fill: false },
            data: nose_buf.yraw,
        },
        "x pos": {
            xaxis: 1, yaxis: 1,
            label: "x pos",
            lines: { fill: false },
            data: nose_buf.xpos,
        },
        "x vel": {
            xaxis: 1, yaxis: 2,
            label: "x vel",
            data: nose_buf.xvel,
        },
        "y pos": {
            xaxis: 1, yaxis: 1,
            label: "y pos",
            lines: { fill: false },
            data: nose_buf.ypos,
        },
        "y vel": {
            xaxis: 1, yaxis: 2,
            label: "y vel",
            data: nose_buf.yvel,
        },
        "x delta": {
            xaxis: 1, yaxis: 2,
            label: "x delta",
            data: nose_buf.xdelt,
        },
        "x acc": {
            xaxis: 1, yaxis: 2,
            label: "x acc",
            data: nose_buf.xacc,
        },
        "y delta": {
            xaxis: 1, yaxis: 2,
            label: "y delta",
            data: nose_buf.ydelt,
        },
        "y acc": {
            xaxis: 1, yaxis: 2,
            label: "y acc",
            data: nose_buf.yacc,
        },
    };

    var mouth_dataset = {
        "ver ave": {
            xaxis: 1, yaxis: 1,
            label: "ver ave",
            data: mouth_buf.v_ave,
        },
        "hor ave": {
            xaxis: 1, yaxis: 1,
            label: "hor ave",
            data: mouth_buf.h_ave,
        },
        "ver cur": {
            xaxis: 1, yaxis: 1,
            label: "ver cur",
            data: mouth_buf.v_cur,
        },
        "hor cur": {
            xaxis: 1, yaxis: 1,
            label: "hor cur",
            data: mouth_buf.h_cur,
        },
        "ratio": {
            xaxis: 1, yaxis: 1,
            label: "ratio",
            data: mouth_buf.ratio,
        },
        "ver pos": {
            xaxis: 1, yaxis: 2,
            label: "ver pos",
            data: mouth_buf.v_pos,
        },
        "hor pos": {
            xaxis: 1, yaxis: 2,
            label: "hor pos",
            data: mouth_buf.h_pos,
        },
        "ver vel": {
            xaxis: 1, yaxis: 2,
            label: "ver vel",
            data: mouth_buf.v_vel,
        },
        "hor vel": {
            xaxis: 1, yaxis: 2,
            label: "hor vel",
            data: mouth_buf.h_vel,
        },
        "ver acc": {
            xaxis: 1, yaxis: 2,
            label: "ver acc",
            data: mouth_buf.v_acc,
        },
        "hor acc": {
            xaxis: 1, yaxis: 2,
            label: "hor acc",
            data: mouth_buf.h_acc,
        },
    };

    var eyes_dataset = {
        "raw ear": {
            xaxis: 1, yaxis: 1,
            label: "raw ear",
            lines: { fill: false },
            data: eyes_buf.raw_ear,
        },
        "kf ear": {
            xaxis: 1, yaxis: 1,
            label: "kf ear",
            lines: { fill: false },
            data: eyes_buf.kf_ear,
        },
        "kf vel": {
            xaxis: 1, yaxis: 2,
            label: "kf vel",
            data: eyes_buf.kf_vel,
        },
        "pupil dist": {
            xaxis: 1, yaxis: 1,
            label: "pupil dist",
            data: eyes_buf.pup_dist,
        },
        "open": {
            xaxis: 1, yaxis: 1,
            label: "open",
            data: eyes_buf.open,
        },
    };

    var browSeriesContainer = $("#brow-series");
    var noseSeriesContainer = $("#nose-series");
    var mouthSeriesContainer = $("#mouth-series");
    var eyesSeriesContainer = $("#eyes-series");
    var now = (new Date()).getTime();
    var i = 0;
    $.each(brow_dataset, function(key, val) {
        initData(now, val.data);
        val.color = i;
        ++i;
        browSeriesContainer.append("<br/><input type='checkbox' name='" + key +
            "' checked='checked' id='id" + key + "'></input>" +
            "&nbsp;<label for='id" + key + "'>"
            + val.label + "</label>");
    });
    i = 0;
    $.each(nose_dataset, function(key, val) {
        initData(now, val.data);
        val.color = i;
        ++i;
        noseSeriesContainer.append("<br/><input type='checkbox' name='" + key +
            "' checked='checked' id='id" + key + "'></input>" +
            "&nbsp;<label for='id" + key + "'>"
            + val.label + "</label>");
    });
    i = 0;
    $.each(mouth_dataset, function(key, val) {
        initData(now, val.data);
        val.color = i;
        ++i;
        mouthSeriesContainer.append("<br/><input type='checkbox' name='" + key +
            "' checked='checked' id='id" + key + "'></input>" +
            "&nbsp;<label for='id" + key + "'>"
            + val.label + "</label>");
    });
    i = 0;
    $.each(eyes_dataset, function(key, val) {
        initData(now, val.data);
        val.color = i;
        ++i;
        eyesSeriesContainer.append("<br/><input type='checkbox' name='" + key +
            "' checked='checked' id='id" + key + "'></input>" +
            "&nbsp;<label for='id" + key + "'>"
            + val.label + "</label>");
    });

    var brow_plot = $.plot('#brow-chart', getBrowData(),
    {
        legend: {
            show: true,
            position: "sw",
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3',
        },
        series: {
            color: '#3c8dbc',
            lines: {
                lineWidth: 2,
                show: true,
                fill: true,
            },
        },
        yaxes: [{min: 0, max: 50,}, {position: "right"}],
        xaxes: [{
            mode: "time",
            timeBase: "milliseconds",
            timeformat: "%I:%M:%S",
            timezone: "browser",
            show: true,
        }],
    });

    var nose_plot = $.plot('#nose-chart', getNoseData(),
    {
        legend: {
            show: true,
            position: "sw",
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3',
        },
        series: {
            color: '#3c8dbc',
            lines: {
                lineWidth: 2,
                show: true,
                fill: true,
            },
        },
        yaxes: [{min: 0, max: 50,}, {position: "right"}],
        xaxes: [{
            mode: "time",
            timeBase: "milliseconds",
            timeformat: "%I:%M:%S",
            timezone: "browser",
            show: true,
        }],
    });

    var mouth_plot = $.plot('#mouth-chart', getMouthData(),
    {
        legend: {
            show: true,
            position: "sw",
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3',
        },
        series: {
            color: '#3c8dbc',
            lines: {
                lineWidth: 2,
                show: true,
                fill: true,
            },
        },
        yaxes: [{min: 0, max: 50,}, {position: "right"}],
        xaxes: [{
            mode: "time",
            timeBase: "milliseconds",
            timeformat: "%I:%M:%S",
            timezone: "browser",
            show: true,
        }],
    });

    var eyes_plot = $.plot('#eyes-chart', getEyesData(),
    {
        legend: {
            show: true,
            position: "sw",
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3',
        },
        series: {
            color: '#3c8dbc',
            lines: {
                lineWidth: 2,
                show: true,
                fill: true,
            },
        },
        yaxes: [{min: 0, max: 50,}, {position: "right"}],
        xaxes: [{
            mode: "time",
            timeBase: "milliseconds",
            timeformat: "%I:%M:%S",
            timezone: "browser",
            show: true,
        }],
    });

    function getBrowData() {
        var data = [];
        browSeriesContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            if (key && brow_dataset[key]) {
                data.push(brow_dataset[key]);
            }
        });
        return data;
    }

    function getNoseData() {
        var data = [];
        noseSeriesContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            if (key && nose_dataset[key]) {
                data.push(nose_dataset[key]);
            }
        });
        return data;
    }

    function getMouthData() {
        var data = [];
        mouthSeriesContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            if (key && mouth_dataset[key]) {
                data.push(mouth_dataset[key]);
            }
        });
        return data;
    }

    function getEyesData() {
        var data = [];
        eyesSeriesContainer.find("input:checked").each(function () {
            var key = $(this).attr("name");
            if (key && eyes_dataset[key]) {
                data.push(eyes_dataset[key]);
            }
        });
        return data;
    }

    function update_brow() {
        brow_plot.setData(getBrowData());
        brow_plot.setupGrid(true);
        brow_plot.draw();

        if (realtime_brow === 'on') {
          setTimeout(update_brow, updateInterval);
        }
    }

    function update_nose() {
        nose_plot.setData(getNoseData());
        nose_plot.setupGrid(true);
        nose_plot.draw();

        if (realtime_nose === 'on') {
          setTimeout(update_nose, updateInterval);
        }
    }

    function update_mouth() {
        mouth_plot.setData(getMouthData());
        mouth_plot.setupGrid(true);
        mouth_plot.draw();

        if (realtime_mouth === 'on') {
          setTimeout(update_mouth, updateInterval);
        }
    }

    function update_eyes() {
        eyes_plot.setData(getEyesData());
        eyes_plot.setupGrid(true);
        eyes_plot.draw();

        if (realtime_eyes === 'on') {
          setTimeout(update_eyes, updateInterval);
        }
    }

    function initData(now, data) {
        for (var i = 0; i < maxbuf; i++) {
            data[i] = [now - updateInterval * (maxbuf-i), 0];
        }
    }

    //REALTIME TOGGLE
    $('#realtime-brow .btn').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).data('toggle') === 'on') {
            realtime_brow = 'on';
            var now = (new Date()).getTime();
            $.each(brow_dataset, function(key, val) {
                initData(now, val.data);
            });
            socket.emit('toggle_debug_data', { brows: true });
        }
        else {
            realtime_brow = 'off';
            socket.emit('toggle_debug_data', { brows: false });
        }
        update_brow();
    });
    $('#realtime-nose .btn').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).data('toggle') === 'on') {
            realtime_nose = 'on';
            var now = (new Date()).getTime();
            $.each(nose_dataset, function(key, val) {
                initData(now, val.data);
            });
            socket.emit('toggle_debug_data', { nose: true });
        }
        else {
            realtime_nose = 'off';
            socket.emit('toggle_debug_data', { nose: false });
        }
        update_nose();
    });
    $('#realtime-mouth .btn').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).data('toggle') === 'on') {
            realtime_mouth = 'on';
            var now = (new Date()).getTime();
            $.each(mouth_dataset, function(key, val) {
                initData(now, val.data);
            });
            socket.emit('toggle_debug_data', { mouth: true });
        }
        else {
            realtime_mouth = 'off';
            socket.emit('toggle_debug_data', { mouth: false });
        }
        update_mouth();
    });
    $('#realtime-eyes .btn').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).data('toggle') === 'on') {
            realtime_eyes = 'on';
            var now = (new Date()).getTime();
            $.each(eyes_dataset, function(key, val) {
                initData(now, val.data);
            });
            socket.emit('toggle_debug_data', { eyes: true });
        }
        else {
            realtime_eyes = 'off';
            socket.emit('toggle_debug_data', { eyes: false });
        }
        update_eyes();
    });

    $('#br-kf-btn').click(function () {
        socket.emit('kf_update', { brows: { Q: $('#br-kf-q').val(), R: $('#br-kf-r').val() } });
    });

    $('#ns-kf-btn').click(function () {
        socket.emit('kf_update', { nose: { Q: $('#ns-kf-q').val(), R: $('#ns-kf-r').val() } });
    });

    $('#mo-kf-btn').click(function () {
        socket.emit('kf_update', { mouth: { Q: $('#mo-kf-q').val(), R: $('#mo-kf-r').val() } });
    });

    $('#ey-kf-btn').click(function () {
        socket.emit('kf_update', { eyes: { Q: $('#ey-kf-q').val(), R: $('#ey-kf-r').val() } });
    });

    socket.on('brow_data', function(data) {
        var now = (new Date()).getTime();
        var i = 0;
        $.each(brow_dataset, function(key, val) {
            if (key === 'raised') {
                var v = 0;
                if (data[i] === 'up ') {
                    v = 5;
                }
                else if (data[i] === 'up+') {
                    v = 10;
                }
                if (val.data.push([now, v]) > maxbuf) { val.data.shift(); }
            }
            else {
                if (val.data.push([now, data[i]]) > maxbuf) { val.data.shift(); }
            }
            ++i;
        });
    });

    socket.on('nose_data', function(data) {
        var now = (new Date()).getTime();
        var i = 0;
        $.each(nose_dataset, function(key, val) {
            if (val.data.push([now, data[i]]) > maxbuf) { val.data.shift(); }
            ++i;
        });
    });

    socket.on('mouth_data', function(data) {
        var now = (new Date()).getTime();
        var i = 0;
        var j = 0;
        $.each(mouth_dataset, function(key, val) {
            if (key === 'ratio') {
                if (val.data.push([now, data[i]]) > maxbuf) { val.data.shift(); }
                ++i;
            } else {
                if (val.data.push([now, data[i][j]]) > maxbuf) { val.data.shift(); }
                ++j;
                if (j > 1) {
                    j = 0;
                    ++i;
                }
            }
        });
    });

    socket.on('eyes_data', function(data) {
        var now = (new Date()).getTime();
        var i = 0;
        $.each(eyes_dataset, function(key, val) {
            if (val.data.push([now, data[i]]) > maxbuf) { val.data.shift(); }
            ++i;
        });
    });

    //INITIALIZE REALTIME DATA FETCHING
    if (realtime_brow === 'on') {
        $('#realtime-brow .btn').first().click();
    } else {
        $('#realtime-brow .btn').last().click();
    }
    if (realtime_nose === 'on') {
        $('#realtime-nose .btn').first().click();
    } else {
        $('#realtime-nose .btn').last().click();
    }
    if (realtime_mouth === 'on') {
        $('#realtime-mouth .btn').first().click();
    } else {
        $('#realtime-mouth .btn').last().click();
    }
    if (realtime_eyes === 'on') {
        $('#realtime-eyes .btn').first().click();
    } else {
        $('#realtime-eyes .btn').last().click();
    }

};
