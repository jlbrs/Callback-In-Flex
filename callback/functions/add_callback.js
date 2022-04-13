exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient()
  console.log(event);
  client.taskrouter.workspaces(context.WORKSPACE_SID)
      .tasks
      .create({attributes: JSON.stringify({
          type: "callback",
          name: event.name,
          motif: event.motif,
          shop: JSON.parse(event.shop),
          phone_number: event.phone_number,
          caller_id: event.caller_id
        }), workflowSid: context.WORKFLOW_SID})
      .then(task => console.log(task.sid))
      .then(() => {
        return callback(null, null);
      });
};
