/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import * as versionApi from '../src/version_api'

// Mock the GitHub Actions core library
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>
let handleMock: jest.SpiedFunction<typeof versionApi.Handle>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
    handleMock = jest.spyOn(versionApi, 'Handle')
  })

  it('sets the result_version output', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'ver_file':
          return 'version.h'
        case 'defined_version_var':
          return 'FIRMWARE_VERSION'
        default:
          return ''
      }
    })
    handleMock.mockReturnValue('1.2.3-b4')

    await main.run()

    expect(handleMock).toHaveBeenCalledWith('version.h', 'FIRMWARE_VERSION')
    expect(setOutputMock).toHaveBeenCalledWith('result_version', '1.2.3-b4')
    expect(setFailedMock).not.toHaveBeenCalled()
  })

  it('sets a failed status', async () => {
    const failure = new Error('cannot read version')
    getInputMock.mockReturnValue('ignored')
    handleMock.mockImplementation(() => {
      throw failure
    })

    await main.run()

    expect(setFailedMock).toHaveBeenCalledWith('cannot read version')
  })
})
