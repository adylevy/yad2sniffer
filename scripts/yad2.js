
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'yad2GetTable') {

        var tableEl = document.getElementsByClassName('main_table_wrap')[0].innerHTML;;

        chrome.runtime.sendMessage({
            action: "yad2Table",
            tElements: tableEl,
            url: location.href
        });
    }
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'yad2UpdateTr') {

        var trId = msg.trId;
        var last = msg.last;
        var all = msg.all;
        var highlight = msg.highlight;
        var currentPrice = all[0].price;

        var theTr = document.getElementById(trId);
        theTr.classList.add('yad2Sniffer');
        if (highlight && all.length>1){
            theTr.classList.add('yad2SnifferHighlight');
        }
        if (currentPrice != last.price){
            theTr.classList.add('yad2SnifferPriceDrop');
        }
        var txt = [];
        for(var i =1;i<all.length;i++){
            txt.push(all[i].date+' '+all[i].price);
        }
        theTr.setAttribute('data-sniffer',txt.join(', '));
        bindEvents();
    }
});


function getParents(el, tag) {
    el = el.parentNode;
    while (el && el.tagName.toLowerCase() != tag) {
        el = el.parentNode;
    }
    return el;
}

function closest(el, fn) {
    return el && (
            fn(el) ? el : closest(el.parentNode, fn)
        );
}

function bindEvents() {
    var els = document.querySelectorAll('tr.yad2SnifferHighlight');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.getAttribute('data-binded')=='true'){
            continue;
        }

        el.setAttribute('data-binded','true');
        var tds = el.querySelectorAll('td');
        var td = tds[2];
        var tt = document.createElement('span');
        tt.className = 'snifferTooltip';
        tt.style.display = 'block';
        td.appendChild(tt);
        td.style.position = 'relative';

        el.addEventListener('mouseover', function (e) {
            var tr = closest(e.target, function (el) {
                return el.tagName.toLowerCase() === 'tr';
            });
            var tt = tr.querySelectorAll('.snifferTooltip')[0];

            tt.setAttribute('data-snifferTooltip',tr.getAttribute('data-sniffer'));

        });

    }
    ;
}
