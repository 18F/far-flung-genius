'use strict';

const _           = require('lodash');
const Mustache    = require('mustache');
const templates   = require('./templates');
const views       = require('./views');

templates.load();
views.load();

class MustacheRenderer {
  constructor(name, data) {
    this.name = name;
    this.data = data;
    this.extraViews = [];
  }

  render() {
    return Mustache.render(this.layoutTemplate(), this.view(), this.partials());
  }

  addView(view) {
    this.extraViews.push(view);
  }

  pageTemplate() {
    return MustacheRenderer.templates[this.name + '_page'];
  }

  layoutTemplate() {
    return MustacheRenderer.templates.layout;
  }

  pageView() {
    let view = MustacheRenderer.views[this.name];
    if (_.isFunction(view)) { view = view(this.data); }
    return view;
  }

  layoutView() {
    return Object.assign({}, MustacheRenderer.views.layout, {controller_namespace: this.name + '-page'});
  }

  view() {
    let base = [{}, this.layoutView(), this.pageView()];
    return Object.assign.apply(null, base.concat(this.extraViews));
  }

  partials() {
    return Object.assign({}, MustacheRenderer.templates, {page: this.pageTemplate()});
  }
}

MustacheRenderer.templates = templates;
MustacheRenderer.views = views;

module.exports = MustacheRenderer;
