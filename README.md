fileutil
========

Simple cross platform (cordova, node-webkit) TAFFYdb wrapper to extend it with the functionality to load an existing db and automatic save after changes.
It uses dica-developer-fileutil for storing the database files.

The cordova implementation depends on the plugin ```org.apache.cordova.file```.

API
===

|method|parameter|
-------|----------
|Db.save()||
|Db(databaseName, initReadyCallback, cacheSize)|databaseName ... the name of the database as String<br />initReadyCallback ... callback on successfull initialisation of the database as function<br />cacheSize ... the number of elements to keep in cache as number|

Install
=====

```bower install https://github.com/Dica-Developer/db.git``` or
```bower install dica-developer-db```

Usage
=====

On including the file lib_db.js an object Db will be added to the global window object.
The file util functions can be found under ```window.dica.Db```.

To init a database:

```javascript
new window.dica.Db('readme.txt', 'This is the new file content.', function() {
  console.log('File successfuly written.');
}, function (error) {
  console.error('Error on writing file', error);
})
```

To read a file use the following method:

```javascript
window.dica.fileUtil.readFile(filePath, function(fileContent) {
  console.log('The file content is: ', fileContent);
}, function (error) {
  console.error('Error on reading file', error);
}))
```
