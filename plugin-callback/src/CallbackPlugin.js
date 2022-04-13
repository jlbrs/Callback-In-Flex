import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import reducers, { namespace } from './states';
import CustomTaskList from "./components/CustomTaskList/CustomTaskList";

const PLUGIN_NAME = 'CallbackPlugin';

export default class CallbackPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
    this.flex = null;
    this.manager = null;
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    this.flex = flex;
    this.manager = manager;

    const options = { sortOrder: -1 };
    // flex.TaskInfoPanel.Content.remove("content")
    flex.IncomingTaskCanvas.Content
      .add(<CustomTaskList key="CallbackPlugin-component" clickToDial={(n,m) => this.clickToDial(n,m)} />, options);

    flex.Actions.addListener("afterAcceptTask", (payload) => {
      if(payload.task.attributes.type && payload.task.attributes.type === "callback") {
        this.clickToDial(payload.task.attributes.phone_number, payload.task);
      }
    });
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }

  clickToDial(destinationNumber, oldTask) {
    let a = (payload) => {
      console.log('TASKAXXEPTED', payload);
      this.flex.Actions.removeListener("afterAcceptTask", a);
      this.flex.Actions.invokeAction("CompleteTask", { sid: oldTask.sid });
    };
    this.flex.Actions.invokeAction("AcceptTask", { sid: oldTask.sid });
    this.flex.Actions.addListener("afterAcceptTask", a);
    this.flex.Actions.invokeAction("StartOutboundCall", {
      destination: destinationNumber,
      callerId: oldTask.attributes.caller_id,
      taskAttributes: oldTask.attributes
    });
  };

}
