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

    composite_version = ""
    

    with open(__FileName, encoding='utf-8') as f:

        for line in f:
            probe = re.search(r'#define ' + __DefineName + r' "[\w.-]+"', line)
            if probe:
                probe = probe[0]
                probe = probe.replace('"', '')
                probe = probe.replace('#define ' + __DefineName + ' ', '')
                print(probe)
                break
            else:
                probe = re.search(r'#define ' + __DefineName + r'_MAJOR[\s]+\([0-9]+\)', line)
                if probe:
                    probe = re.search(r'\([0-9]+\)', line)
                    probe = probe[0]
                    probe = probe.replace('(', '')
                    probe = probe.replace(')', '')
                    composite_version += probe + '.'

                probe = re.search(r'#define ' + __DefineName + r'_MINOR[\s]+\([0-9]+\)', line)
                if probe:
                    probe = re.search(r'\([0-9]+\)', line)
                    probe = probe[0]
                    probe = probe.replace('(', '')
                    probe = probe.replace(')', '')
                    composite_version += probe + '.'

                probe = re.search(r'#define ' + __DefineName + r'_PATCH[\s]+\([0-9]+\)', line)
                if probe:
                    probe = re.search(r'\([0-9]+\)', line)
                    probe = probe[0]
                    probe = probe.replace('(', '')
                    probe = probe.replace(')', '')
                    composite_version += probe

                probe = re.search(r'#define ' + __DefineName + r'_BETABUILD[\s]+\([0-9]+\)', line)
                if probe:
                    probe = re.search(r'\([0-9]+\)', line)
                    probe = probe[0]
                    probe = probe.replace('(', '')
                    probe = probe.replace(')', '')

                    if not int(probe) == 0:
                        composite_version += '-b' + probe

                    print(composite_version)
                    break

