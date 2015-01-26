/*global TAFFY, window*/
(function (window) {
  'use strict';

  function Db() {
    var _dbName = null;
    var _lock = false;
    this.query = null;

    this.setDbName = function (dbName) {
      _dbName = dbName;
    };

    this.getDbName = function () {
      return _dbName;
    };

    this.lock = function() {
      _lock = true;
    };

    this.unlock = function() {
      _lock = false;
    };

    this.isLocked = function() {
      return _lock;
    };
  }

  Db.prototype.save = function () {
    var db = this;
    db.lock();
    var dbContent = this.query().get();
    var serializedDb = JSON.stringify(dbContent);
    var dbName = this.getDbName();

    window.dica.fileUtil.writeFile(
      dbName,
      serializedDb,
      function() {
        db.unlock();
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
      if (!db.isLocked()) {
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
