exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient()
  client.taskrouter.workspaces(context.WORKSPACE_SID)
      .tasks
      .create({attributes: JSON.stringify({
          type: "callback",
          name: event.phone_number,
          motif: event.motif
        }), workflowSid: context.WORKFLOW_SID})
      .then(task => console.log(task.sid))
      .then(() => {
        return callback(null, null);
      });
};
