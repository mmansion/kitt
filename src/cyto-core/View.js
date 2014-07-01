/*
* View
*
* Visit {Coming soon} for documentation, updates and examples.
*
* Copyright (c) 2014 whisperlab.io
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

define(['/cyUtils.js'], function (utils) {

  /**
  * Provides the primary View class
  * @module View
  */

  var _canvas  = document.createElement('canvas')
    , _context = _canvas.getContext('2d');

    //canvas extensions

    _stroke = _context.stroke.bind(_context);
    _fill   = _context.fill.bind(_context);

  /**
   * The View class wraps and extends the DOM's canvas element and drawing context,
   * providing additional properties, methods and events which get exposed to the
   * ctyo library's root object.
   * @class View
   */

  var View = function(root) {

    var p = Object.getPrototypeOf(this);

    this.width  = _canvas.width;
    this.height = _canvas.height;

    var _hasStroke = true
      , _hasFill   = false;

    utils.bindObjects(p, _context);


    this.swapCanvas = function (oldCanvas) {
      _canvas.setAttribute('id',    'cyto-' + oldCanvas.id);

      _canvas.setAttribute('width',  oldCanvas.width);
      _canvas.setAttribute('height', oldCanvas.height);

      oldCanvas.parentNode.replaceChild(_canvas, oldCanvas);

      this.width  = _canvas.width;
      this.height = _canvas.height;
    };

    /* View Prototype
       --------------------------------------------------- */

    p.background = function(c) {
      var color = c || '#011722';

      _context.save(); //save the context on a stack
      _context.fillStyle = color; //TODO: make configurable
      _context.fillRect(0, 0, this.width, this.height);  // now fill the canvas
      _context.restore();
    };

    p.bg = function() {
      this.background();
    };

    p.getContext = function() {
      return _context;
    };

    p.stroke = function(color) {
      if(color === undefined) {
        _stroke();
      } else {
        _hasStroke = true;
        this.strokeStyle = color;
      }
    };

    p.noStroke = function(color) {
      _hasStroke = false;
      this.strokeStyle = 'rgba(0,0,0,0)';
    };

    p.fill = function(color) {
      if(color === undefined) {
        _fill();
      } else {
        _hasFill = true;
        this.fillStyle = color;
      }
    };

    p.noFill = function() {
      _hasFill = false;
      this.fillStyle = 'rgba(0,0,0,0)';
    };

    p.hasFill = function() {
      return _hasFill;
    };

    p.hasStroke = function() {
      return _hasStroke;
    };

  };

  View.prototype = _context;
  
  return View;
});