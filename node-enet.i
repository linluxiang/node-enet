%module node_enet
%{
extern "C" {
#include "enet/unix.h"
#include "enet/enet.h"
%}
%include "enet/unix.h"
%include "enet/enet.h"
%{
}
%}
