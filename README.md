#Installation
## Dependence
* swig
* v8
* node-gyp

On OSX you can run this
```sh
brew install enet
brew install swig
brew isntall v8
npm install -g node-gyp
```

###Reminder
You need to specify the specific v8 version in Makefile on OSX like this:

```sh
swig -javascript -node -c++ -DV8_VERSION=0x041027 enetjs.i
```

## Build
```sh
make
```
