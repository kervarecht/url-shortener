URL Redirect - Node.js and MongoDB
=========================

Very simple application.

Main routes are /url, /h, /q

/url accepts http queries and stores them in MongoDB.  Returns a unique hash (using shorthash library) for each link.  The hash is predictable to prevent clicking blind if desired.

/h accepts the shortened link and redirects the user to the original.

/q provides a query option to the user if they would like to see the URL before clicking it.
