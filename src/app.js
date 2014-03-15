define([
  'kitt',
  'jquery', 
  'highlight'
  ]

  //on document load, init app
  , function(kitt, $, hljs) {

    $(function() { //on document load

      var screenWidth   = window.innerWidth
        , screenHeight  = window.innerHeight
        , xhrObjLoader  = new XMLHttpRequest()
        , loadedModules = [] //track modules for unloading later
        , defaultSketch;

      hljs.initHighlightingOnLoad();
      
      xhrObjLoader.addEventListener('load', function(evt) {
        var sketchList = JSON.parse(evt.target.responseText)
          , items = [];

        Array.prototype.forEach.call(sketchList, function(sketch) {
          items.push('<li><a href="' + sketch.src + '">' + sketch.title + '</a></li>');
          if(sketch.default) {
            defaultSketch = sketch.src;
          }
        });

        $('ul#sketch-list').append(items);
        addEventHandlers();
        //load first script for dev
        loadSelectedSketch('sketches/'+defaultSketch);

      }, false);

      xhrObjLoader.open('get', 'sketches.json');
      xhrObjLoader.send();

      /**
       *
       * Event Handlers 
       *
       */

      function addEventHandlers() {
        //preserve modules when loaded to reference them for unloading (
        //requirejs doesn't provide a way to unload AMD modules
        requirejs.onResourceLoad = function (context, map, depArray) {
          loadedModules.push({name: map.name, url: map.url});
        }

        //click menu items to load next sketch
        $('a').click(function(e) {
          var path = 'sketches/' + $(this).attr('href');

          e.preventDefault();

         loadSelectedSketch(path);
        });
      }

      /**
       *
       * Private Functions 
       *
       */

      function clearLoadedModules() {
        var scripts = document.scripts,
            context = require.s.contexts['_'];

        sketch = null;
        sketch = {};

        //deletes the module properties from the requirejs context
        loadedModules.forEach(function(module) {

          delete(context.defined[module.name]);
          delete(context.urlFetched[module.url]);

          //remove the script tag HTML element
          Array.prototype.slice.call(scripts).forEach(function(script) {
            if(script.src.search(module.url) !== -1) {
              script.parentNode.removeChild(script);
            }
          });
        });
      }

      function loadSelectedSketch(path) {
        removeOldCanvas();
        createNewCanvas();
        clearLoadedModules();

        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function(evt) {
          var data = evt.target.response
            , script = document.createElement('script');

          script.type = 'text/javascript';
          script.innerHTML = data;
          
          document.body.appendChild(script);

          kitt.start(document.getElementById('sketch'));

          //$('#code').html('<section><pre><code class="javascript">' + data + '</code></pre></section>');
          //$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        }, false);

        xhr.open('get', path);
        xhr.send();

        //loads sketches as requirejs modules
       // $.get(path, function(data) {

          //TODO: parse script string and inject core sketch modules onload, rather than within each sketch
          //console.log(typeof data);
          
          //$('#code').html('<section><pre><code class="javascript">' + data + '</code></pre></section>');
          //$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        // });
      }

      function removeOldCanvas() {
        if($('canvas').length) {
          $('canvas').remove();
        }
      }

      function createNewCanvas() {
        $('<canvas id="sketch" width="'+screenWidth+'" height="'+screenHeight+'"></canvas>').appendTo('body');
      }
  });
});