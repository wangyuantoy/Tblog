## Tblog

* A project to build personal blog
* framework: node+express+mongoose+ejs
* local view: port:5000

### Start instruction

database of this project is not deposited in a server, to have good experience you've got install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)in your pc/laptop, and config like below as default:

> install path D:\MongoDB

> database path D:\MongoDB\data

> logs path D:\MongoDB\logs

> configuration file D:\MongoDB\etc\mongodb.conf
>> *dbpath=D:\MongoDB\data*
>> *logpath=D:\MongoDB\logs\mongodb.log*
>> *logappend=true*
>> *journal=true*
>> *quiet=true*
>> *port=27017*

### Change Log

#### V0.1.0(2017/4/6 13.00)
 * publish basic functions
 * add register/login/logout
 * add article list
 * enable to modify or delete article
 * add pagination and comment

