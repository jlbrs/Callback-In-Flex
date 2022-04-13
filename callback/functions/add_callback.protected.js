exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient()


  delete event.request;
  console.debug("pre-parsing: ", event);

  Object.keys(event).map(function(key, index) {
    try {
      event[key] = JSON.parse(event[key]);
      console.debug(`Parsed: ${key}`);
    } catch (e) {
      console.debug(`Not parsed: ${key}`);
    }
  });

  console.log("post-parsing: ", event);

  client.taskrouter.workspaces(context.WORKSPACE_SID)
      .tasks
      .create({attributes: JSON.stringify({
          type: "callback",
          ...event
        }), workflowSid: context.WORKFLOW_SID})
      .then(task => console.log(`Task created: ${task.sid}`))
      .then(() => {
        return callback(null, null);
      });
};
