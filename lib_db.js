/*global TAFFY, window*/
(function (window) {
  'use strict';

  function Db() {
    var _dbName = null;
    this.query = null;

    this.setDbName = function (dbName) {
      _dbName = dbName;
    };

    this.getDbName = function () {
      return _dbName;
    };
  }

  Db.prototype.save = function () {
    var db = this;
    this.lock = true;
    var dbContent = this.query().get();
    var serializedDb = JSON.stringify(dbContent);
    var dbName = this.getDbName();

    window.dica.fileUtil.writeFile(
      dbName,
      serializedDb,
      function () {
        db.lock = false;
      }
    );
  };

  Db.prototype.init = function (dbName, initReadyCallback, cacheSize) {
    var db = this;
    cacheSize = cacheSize || 10000;
    var timeout = null;
    dbName = dbName || 'test';
    var internalDbName = 'db.' + dbName;
    this.setDbName(internalDbName);

    function saveOnDbChange() {
      if (false === db.lock) {
        if (null !== timeout) {
          clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
          db.save();
        }, 10000);
      }
    }

    function initQuery() {
      db.query.settings({
        cacheSize: cacheSize,
        onDBChange: saveOnDbChange
      });
      if (typeof initReadyCallback === 'function') {
        initReadyCallback();
      }
    }

    window.dica.fileUtil.readFile(internalDbName, function (dbContent) {
      try {
        db.query = new TAFFY(JSON.parse(dbContent));
      } catch (error) {
        console.error('Cannot initialize db with old content. Set it to an empty db.', error);
        db.query = new TAFFY();
      }
      initQuery();
    }, function () {
      db.query = new TAFFY();
      initQuery();
    });
  };

  window.dica = window.dica || {};
  window.dica.Db = Db;
}(window));
