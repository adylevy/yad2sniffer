/**
 * Created by adylevy on 10/13/15.
 */

var models = ['scripts/models/car4o4Model.js', 'scripts/models/carMotoModel.js','scripts/models/nadlanRent.js','scripts/models/nadlanSell.js','scripts/models/yad2Model.js']

require(models.concat([  'scripts/modelFactory.js', 'bower_components/lockr/lockr.js']));

function getDomain(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
}

function showHistory(tr, line, lineHistory, tabId) {
    var last = lineHistory.length!=undefined ? lineHistory[lineHistory.length-1]: lineHistory;
        chrome.tabs.sendMessage(tabId, {action: "yad2UpdateTr", trId: tr.id, all:lineHistory, last: last, highlight: !line.compareWithObj(last)}, function (response) {
        });

}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {

        if (getDomain(tab.url) == 'www.yad2.co.il') {
            chrome.tabs.sendMessage(tabId, {action: "yad2GetTable"}, function (response) {
            });
        }
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.action == "yad2Table") {
        var el = $(request.tElements);
        var url = request.url;
        var rg = /.*\.co\.il\/([^\?]*[\.php]{1})\?{0,1}.*/;
        var mtch = rg.exec(url);
        var sitesection = mtch && mtch.length>0 ? mtch[1] : '';

        var model = modelFactory.getModel(sitesection);

        el.eq(0).find('tr').each(function (idx, tr) {
            var line = new model();
            line.parseDom(tr);
            if (line.id != 0) {
                var lineHistory = Lockr.get(line.id);
                if (lineHistory != undefined) {
                    showHistory(tr, line, lineHistory, sender.tab.id);
                    var first = lineHistory.length!=undefined ? lineHistory[0] : lineHistory;
                    if (!line.compareWithObj(first)) {
                        var a = [line.getObject()].concat(lineHistory);
                        Lockr.set(line.id, a);
                    }
                }
                else {
                    Lockr.set(line.id, [line.getObject()]);
                }

            }
            // console.log(line);
        })
    }
});


