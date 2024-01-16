#!/usr/bin/python3

import re
import sys

__FileName = "version_examples/version.h"
__DefineName = "FIRMWARE_VERSION"
__TagName = ""

def __ArgParser(input):
    global __FileName
    global __DefineName

    for arg in input:
        tag = re.search(r'-[a-z]', arg)
        if tag:
            tag = tag[0]
        else:
            tag = ""
        val = arg.replace(tag, '')
        # print(f'tag: {tag}, val: {val}')
        if tag == '-f':
            __FileName = val
        if tag == '-d':
            __DefineName = val

    

def __InputListBuilder():
    input_list = []
    arg_tag = None
    item = ""
    for param in sys.argv:
        if arg_tag:
            item = arg_tag[0] + param
            input_list.append(item)
            arg_tag = None
        else:   
            arg_tag = re.search(r'-[a-z]', param)
            if arg_tag:
                item = arg_tag[0]
                param = param.replace(item, '')
                if param != "":
                    input_list.append(item + param)
                    arg_tag = None
    return input_list

if __name__ == "__main__":
    input_list = __InputListBuilder()
    __ArgParser(input_list)
    # print(f'Filename: {__FileName}, define: {__DefineName}')
    

    with open(__FileName) as f:
        for line in f:
            probe = re.search(r'#define ' + __DefineName + r' "[\w.-]+"', line)
            if probe:
                probe = probe[0]
                probe = probe.replace('"', '')
                probe = probe.replace('#define ' + __DefineName + ' ', '')
                print(probe)