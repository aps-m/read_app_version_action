import * as core from '@actions/core'
import { Handle } from './version_api'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const ver_file: string = core.getInput('ver_file')
    const defined_version_var: string = core.getInput('defined_version_var')

    core.setOutput('result_version', Handle(ver_file, defined_version_var))
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
