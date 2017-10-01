var data;

document.addEventListener("DOMContentLoaded", function() {
    var session;
    var colHeadings = ['Labels', 'Data'];
    data = [
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ]
    ],
    container = document.getElementById('example');

    hot = new Handsontable(container, {
        data: data,
        colHeaders: colHeadings,
        colWidths: 298,
        afterGetColHeader: function (col, TH) {
            // nothing for first column
            if (col == -1)
            {
                return;
            }
            }
    });

    $("th").dblclick(function (e) {
        e.preventDefault();
        var a = hot.getSelected();
        var b  = hot.getColHeader(a[1],a[2]);
        var headers = hot.getColHeader();
        var value;

        if($("th").find("input[name='id']").val())
        {
            value  = $("th").find("input[name='id']").val();
            headers[session] = value;
            session = a[1];
            headers[a[1]]="<input name='id' type='text' value="+b+"\>";
            hot.updateSettings({
                colHeaders: headers
            });
        }
        else
        {
            session = a[1];
            headers[a[1]]="<input name='id' type='text' value="+b+"\>";
                  hot.updateSettings({
                colHeaders: headers
            });
      $(this).find("input[name='id']").focus();
        }

    });

    $("th").change(function (e){
      e.preventDefault();
      var a = hot.getSelected();
        var b  = hot.getColHeader(a[1],a[2]);
            var headers = hot.getColHeader();
      var value  = $(this).find("input[name='id']").val();
        headers[a[1]] = value;
        hot.updateSettings({
                    colHeaders: headers
                });
    });

    hot.render();
});



var GraphEditor = Backbone.View.extend({
    events: {
    //   'click .js-gif': '_done',
    //   'click .js-search-gifs': '_search',
    //   'submit .js-search-gifs': '_search',
    //   'mouseenter .js-gif': '_play',
    //   'mouseleave .js-gif': '_pause'
        'click label': '_labelSelect',
        'mouseover .ui-value': '_dropdown',
        'click #preview-button': '_preview',
        'click #submitButton': '_done'
    },

    _done: function(e){
        // console.log('hi')
        var chart = document.getElementById('myChart').toDataURL();
        var width = document.getElementById('myChart').width;
        Mixmax.done({
        src: chart,
        width: width
      });
        // console.log(document.getElementById('myChart'));
        // console.log(document.getElementById('myChart').width);
    },

    _labelSelect: function(e) {
        document.querySelector('.ui-value').textContent = e.target.textContent;
        document.querySelector('.ui-options').style.opacity = "0";
    },

    _dropdown: function(e) {
        document.querySelector('.ui-options').style.opacity = "1";
    },

    _preview: function(e) {
        var headers = document.getElementsByClassName('colHeader');
        var finalHeader = [];
        for(var i = 0 ; i < headers.length/2 ; i++){
          finalHeader[i] = headers[i].innerText;
        }

        let labels = [];
        let dataSet = [];

        data.forEach((el) => {
          el.forEach((item, i) => {
            if (i === 0) labels.push(item);
            else dataSet.push(item);
          });
        });

        this.initializeChart(labels, dataSet);
    },

    initializeChart: function(labels, dataSet) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [...labels],
                datasets: [{
                    data: [...dataSet],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                // onAnimationComplete: done
            }
        });
    }

    // render: function() {
    //   var self = this,
    //       body = document.body,
    //       gallery = $('.js-image-results'),
    //       timer;

    //   this._currentImages = [];

    //   // Show loading spinner
    //   $('.spinner-bokeh').removeClass('hidden');

    //   // Disable pointer events while scrolling to improve performance.
    //   $(window).on('scroll', function() {
    //     clearTimeout(timer);
    //     if(!body.classList.contains('disable-hover')) {
    //       body.classList.add('disable-hover')
    //     }

    //     timer = setTimeout(function(){
    //       body.classList.remove('disable-hover')
    //     },300);
    //   }, false);

    //   gallery.masonry({
    //     itemSelector: 'figure',
    //     columnWidth:  function() {
    //       return gallery.width() / 3;
    //     }
    //   });

    //   this._currentXhr = $.ajax({
    //     url:'https://api.giphy.com/v1/gifs/trending?api_key=' + this._apiKey + '&limit=100',
    //     success:function(result){
    //       if (result.data.length > 0) {
    //         $(result.data).each(function(index, result) {
    //           var gifStillUrl = result.images.downsized_still.url;
    //           var gifAnimatedUrl = result.images.downsized.url;
    //           var gifAnimatedFullUrl = result.images.original.url;
    //           var gifAnimatedFullWidth = result.images.original.width;
    //           self._loadImage(gifStillUrl, gifAnimatedUrl, gifAnimatedFullUrl, gifAnimatedFullWidth, gallery);
    //         });
    //       }
    //     }
    //   });
    // },

    // _done: function(e) {
    //   var target = $(e.target);
    //   var gif = target.attr('data-gif-animated-full');
    //   var width = target.attr('data-gif-animated-full-width');

    //   // Let Mixmax know it was done.
    //   Mixmax.done({
    //     src: gif,
    //     width: width
    //   });
    // },

    // _cancel: function() {
    //   Mixmax.cancel();
    // },

    // _search: function(e) {
    //   e.preventDefault();

    //   var self = this,
    //       term = $('.js-giphy-search').val(),
    //       gallery = $('.js-image-results');

    //   // Cancel last Ajax request
    //   if (this._currentXhr) this._currentXhr.abort();

    //   // Clear images any images currently loading
    //   if (this._currentImages) {
    //     var currentImages = $(this._currentImages);

    //     currentImages.each(function(index, image){
    //       image.src = '';
    //       image.onload = null;
    //     });

    //     currentImages = [];
    //   }

    //   $('.spinner-bokeh').removeClass('hidden');
    //   $('.js-no-results').remove();

    //   gallery.empty().masonry().masonry('remove', gallery.find('.js-gif'));
    //   gallery.masonry().masonry('destroy');
    //   gallery.masonry({
    //     itemSelector: 'figure',
    //     columnWidth:  function() {
    //       return gallery.width() / 3;
    //     }
    //   });

    //   this._currentXhr = $.ajax({
    //     url:'https://api.giphy.com/v1/gifs/search?q=' + encodeURIComponent(term) + '&api_key=' + this._apiKey + '&limit=100',
    //     success:function(result){
    //       if (result.data.length > 0) {
    //         $(result.data).each(function(index, result) {
    //           var gifStillUrl = result.images.downsized_still.url;
    //           var gifAnimatedUrl = result.images.downsized.url;
    //           var gifAnimatedFullUrl = result.images.original.url;
    //           var gifAnimatedFullWidth = result.images.original.width;
    //           self._loadImage(gifStillUrl, gifAnimatedUrl, gifAnimatedFullUrl, gifAnimatedFullWidth, gallery);
    //         });
    //       } else {
    //         $('.spinner-bokeh').addClass('hidden');
    //         var phrase = term.length == 0 ? 'for you' : 'for <strong>&ldquo;' + term + '&rdquo;</strong>'
    //         var noResultsHTML = $('<div class="js-no-results  text--reverse   m++  p++">'
    //           + '<h2 class="text--normal  mb++">We couldn&rsquo;t find any results ' + phrase + ', but we did find Taylor&nbsp;Lautner.</h2>'
    //           + '<img src="' + Environment.getRootUrl() +'/img/giphy/taylor.gif"></div>');
    //         noResultsHTML.hide();
    //         gallery.append(noResultsHTML);
    //         noResultsHTML.fadeIn(150);
    //       }
    //     }
    //   });
    // },

    // _loadImage: function(gifStillUrl, gifAnimatedUrl, gifAnimatedFullUrl, gifAnimatedFullWidth, container){
    //   var imgStill = new Image();
    //   var imgAnimated = new Image();
    //   var el = $('<figure><img '
    //       + 'data-gif-animated="' + gifAnimatedUrl + '" '
    //       + 'data-gif-animated-full="' + gifAnimatedFullUrl + '" '
    //       + 'data-gif-animated-full-width="' + gifAnimatedFullWidth + '" '
    //       + 'class="js-gif" src="' + gifStillUrl + '"></figure>');
    //   el.hide();
    //   container.append(el);

    //   imgStill.onload = function(){
    //     imgStill.loaded = true;
    //     loadIfDone();
    //   };

    //   imgAnimated.onload = function(){
    //     imgAnimated.loaded = true;
    //     loadIfDone();
    //   };

    //   imgStill.src = gifStillUrl;
    //   imgAnimated.src = gifAnimatedUrl;
    //   this._currentImages.push(imgStill, imgAnimated);

    //   function loadIfDone(){
    //     if (!imgStill.loaded || !imgAnimated.loaded) return;
    //     container.masonry( 'appended', el ).fadeIn();
    //     el.fadeIn(200);
    //     $('.spinner-bokeh').addClass('hidden');
    //   }
    // },

    // _play: function(e) {
    //   var target = $(e.target);
    //   var gifStill = target.attr('src');
    //   var gifAnimated = target.data('gifAnimated');

    //   target.attr('src', gifAnimated);
    //   target.data('gifStill', gifStill);
    // },

    // _pause: function(e) {
    //   var target = $(e.target);
    //   var gifStill = target.data('gifStill');
    //   var gifAnimated = target.attr('src');

    //   target.attr('src', gifStill);
    //   target.data('gifAnimated', gifAnimated);
    // }
});

// Create
new GraphEditor({
el: document.body
}).render();
