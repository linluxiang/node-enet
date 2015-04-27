all:
	swig -javascript -node -c++ -DV8_VERSION=0x041027 -I/usr/local/include node-enet.i
	node-gyp configure
	node-gyp build
