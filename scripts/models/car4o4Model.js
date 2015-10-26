var Car4o4Model = function() {

    this.date, this.price = null;

    this.parseDom = function(tr) {
        // debugger;
        var tds = $(tr).find('td');

        var dateTD = tds.eq(20);
        var onClick = $(dateTD).attr('onclick');
        var rgx = /^[^\(]*\('(\w+)'\,'(\w+)'\,'([\w\.]+)'\,'(\w+)'\,'(\w+)'\,'(\w+)'/g
        var mtch = rgx.exec(onClick);
        if (mtch==null || mtch.length<5){
            this.id=0;
            return;
        }
        this.date = $(dateTD).find('span').text();

        var prgx = /(\d*\,\d*)/;
        var priceRgx= prgx.exec(tds.eq(10).text());
        this.price = priceRgx && priceRgx.length>=1 ? priceRgx[1] : 0;
        this.id = mtch[5];

    }

    this.getObject = function(){
        return {
            id: this.id,
            price: this.price,
            date: this.date
        }
    }

    this.compareWithObj = function(obj){
        if (obj==undefined){
            return false;
        }
        return this.price==obj.price && this.id==obj.id && this.date == obj.date;
    }

}
