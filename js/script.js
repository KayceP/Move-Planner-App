function loadData() {

    var $body = $('body');
    var $wikiElem = $(
        '#wikipedia-links');
    var $nytHeaderElem = $(
        '#nytimes-header');
    var $nytElem = $(
        '#nytimes-articles');
    var $greeting = $('#greeting');

    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' +
        cityStr;

    $greeting.text(
        'So, you want to live at ' +
        address + '?');

    var streetviewUrl =
        'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
        address + '';
    $body.append(
        '<img class="bgimg" src="' +
        streetviewUrl + '">');

    var nytimesUrl =
        'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
        cityStr +
        '&sort=newest&api-key=bb916a746fb440e2a8a99949b7c0c4d0';
    $.getJSON(nytimesUrl, function (
        data) {

        $nytHeaderElem.text(
            'New York Times Articles About ' +
            cityStr);

        articles = data.response
            .docs;
        for (var i = 0; i <
            articles.length; i++
        ) {
            var article =
                articles[i];
            $nytElem.append(
                '<li class="article">' +
                '<a href="' +
                article.web_url +
                '">' +
                article.headline
                .main +
                '</a>' +
                '<p>' +
                article.snippet +
                '</p>' +
                '</li>');
        };

    }).error(function (e) {
        $nytHeaderElem.text(
            'New York Times Articles Could Not Be Loaded'
        );
    });

    // load wikipedia data

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
