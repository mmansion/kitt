define(['cyto','jquery'], function(Cyto, $, hljs) {

  window.cyto = {}; //global cyto namespace

  $(function() { //on document load

    cyto = new Cyto(); //initialize the cyto app

    //TODO: use angular to bind to cyto dom element,
    //  and change sketch when data-sketch attribute changes

  });

});