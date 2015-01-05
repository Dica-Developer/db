fileutil
========

Simple cross platform (cordova, node-webkit) TAFFYdb wrapper to extend it with the functionality to load an existing db and automatic save after changes.
It uses dica-developer-fileutil for storing the database files. The database will be persisted 10 seconds after the last database update.
On database initialisation it first will be looked if the database file already exists and if yes then it will be loaded if not then a new empty database will be created.
Any error on initialization of an existing database will lead to the creation of a new empty database.

The cordova implementation depends on the plugin ```org.apache.cordova.file```.

API
===

|method|parameter|Usage|
-------|---------|------
|Db.save()||To explicitly persist the database to disk.|
|Db(databaseName, initReadyCallback, cacheSize)|databaseName ... the name of the database as String<br />initReadyCallback ... callback on successfull initialisation of the database as function<br />cacheSize ... the number of elements to keep in cache as number|Create a database with the given values for name and cache size.|
|Db.query()|See the http://www.taffydb.com/ query object documentation for more details.|Contains the TAFFYdb object. Documentation to TAFFYdb can be found under http://www.taffydb.com/|

Install
=====

```bower install https://github.com/Dica-Developer/db.git``` or
```bower install dica-developer-db```

Usage
=====

On including the file lib_db.js an object Db will be added to the global window object.
The database object can be found under ```window.dica.Db```.

To init a database with name ```bookStore``` and a cache for 10000 elements you can use the following example:

```javascript
var db = new window.dica.Db('bookStore', function() {
  console.log('Database successfully initialized.');
}, 10000);
```

To persist the database explicitly you can call:

```javascript
db.save();
```
