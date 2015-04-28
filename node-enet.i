%module node_enet
%typemap(in) void* = char*;
%typemap(in) const void * = const char *;
%typemap(in) void const * = char const *;
//%typemap(in) enet_uint8 * = char *;
%{
extern "C" {
#include "enet/types.h"
#include "enet/unix.h"
#include "enet/protocol.h"
#include "enet/time.h"
#include "enet/list.h"
#include "enet/utility.h"
#include "enet/callbacks.h"
#include "enet/enet.h"
const char * ConvertToString(enet_uint8 * data) {
  return (char *) data;
}
}
//v8::Local<v8::String> GetDataFromPacket(const ENetPacket*);
%}
%{
extern "C" {
%}
%include "enet/types.h"
%include "enet/unix.h"
%include "enet/protocol.h"
%include "enet/time.h"
%include "enet/list.h"
%include "enet/utility.h"
%include "enet/callbacks.h"
%include "enet/enet.h"
%{
}
%}

/*
v8::Local<v8::String> GetDataFromPacket(const ENetPacket* packet) {
  if (packet == NULL) return "";
  if (packet->data == NULL) return "";
  return SWIGV8_STRING_NEW2(packet->data, packet->dataLength);
}

*/

const char * ConvertToString(enet_uint8 * data) {
  return (char *) data;
}
