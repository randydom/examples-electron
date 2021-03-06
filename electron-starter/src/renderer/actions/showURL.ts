import { IpcMessageEvent } from 'electron'
import { Dispatch } from 'redux'
import { IPCKey } from '../../common/Constants'
import { ActionType } from '../Types'

const ipcRenderer = window.require('electron').ipcRenderer

export const requestShowURL = () => ({
  type: ActionType.RequestShowURL as ActionType.RequestShowURL
})

export const finishShowURL = (succeeded: boolean) => ({
  type: ActionType.FinishShowURL as ActionType.FinishShowURL,
  payload: {
    succeeded
  }
})

export const showURL = (url: string) => (dispatch: Dispatch) => {
  dispatch(requestShowURL())
  ipcRenderer.on(
    IPCKey.FinishShowURL,
    (ev: IpcMessageEvent, succeeded: boolean) => {
      dispatch(finishShowURL(succeeded))
    }
  )

  ipcRenderer.send(IPCKey.RequestShowURL, url)
}
