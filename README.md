crypto-cacerts
==============

Node has a set of trusted certificates compiled into it that is uses during SSL/HTTPS negotiations.  The list of certificates can be replaced with user-specified certificates during the usage of the https module, but only for that particular https instance.

Sometimes, we need to use libraries that make the HTTPS calls deep within, and cannot modify the code.  This module is designed to [monkey patch](http://en.wikipedia.org/wiki/Monkey_patch) the built-in crypto module and allow you to specify a directory of existing certificates that apply to **all** HTTPS connections that are made using the underlying crypto module.

Usage:

    require('./crypto-cacerts').cryptoPatch("/etc/ssl/certs");

This will use all of the certificates in your OpenSSL certificates directory.
