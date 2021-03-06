"use strict";

let chalk = require("chalk");
let { ServiceBroker } = require("moleculer");
let DbService = require("../../index");

// Create broker
let broker = new ServiceBroker({
	logger: console,
	logLevel: "debug"
});

// Load my service
broker.createService(DbService, {
	name: "posts",
	settings: {
		fields: ["_id", "title", "content", "votes"]
	},

	actions: {
		vote(ctx) {
			return this.updateById(ctx, { id: ctx.params.id, update: { $inc: { votes: 1 } }});
		},

		unvote(ctx) {
			return this.updateById(ctx, { id: ctx.params.id, update: { $inc: { votes: -1 } }});		
		}
	},

	afterConnected() {
		this.logger.info(chalk.green.bold("Connected successfully"));
		this.clear();
	},

	entityCreated(json) {
		this.logger.info(chalk.cyan.bold("Entity lifecycle event: CREATED")/*, json*/);
	},

	entityUpdated(json) {
		this.logger.info(chalk.cyan.bold("Entity lifecycle event: UPDATED")/*, json*/);
	},

	entityRemoved(json) {
		this.logger.info(chalk.cyan.bold("Entity lifecycle event: REMOVED")/*, json*/);
	},
});

// Start server
broker.start().delay(500).then(() => {
	let id;
	Promise.resolve()
		// Count of posts
		.then(() => console.log(chalk.yellow.bold("\n--- COUNT ---")))
		.then(() => broker.call("posts.count").then(console.log))
		
		// Create new Posts
		.then(() => console.log(chalk.yellow.bold("\n--- CREATE ---")))
		.then(() => broker.call("posts.create", { entity: { title: "Hello", content: "Post content", votes: 0, createdAt: new Date(), updatedAt: null, author: null } })
			.then(doc => {
				id = doc._id;
				console.log("Saved: ", doc);
			})
		)

		// Find posts
		.then(() => console.log(chalk.yellow.bold("\n--- FIND ---")))
		.then(() => broker.call("posts.find").then(console.log))

		// List posts
		.then(() => console.log(chalk.yellow.bold("\n--- LIST ---")))
		.then(() => broker.call("posts.list").then(console.log))

		// Get a post
		.then(() => console.log(chalk.yellow.bold("\n--- GET ---")))
		.then(() => broker.call("posts.get", { id }).then(console.log))

		// Vote a post
		.then(() => console.log(chalk.yellow.bold("\n--- VOTE ---")))
		.then(() => broker.call("posts.vote", { id }).then(console.log))

		// Update a posts
		.then(() => console.log(chalk.yellow.bold("\n--- UPDATE ---")))
		.then(() => broker.call("posts.update", { 
			id, 
			update: { 
				$set: { 
					title: "Hello 2", 
					content: "Post content 2",
					updatedAt: new Date()
				} 
			} 
		}).then(console.log))

		// Get a post
		.then(() => console.log(chalk.yellow.bold("\n--- GET ---")))
		.then(() => broker.call("posts.get", { id }).then(console.log))

		// Get posts
		.then(() => console.log(chalk.yellow.bold("\n--- GET[] mapping ---")))
		.then(() => broker.call("posts.get", { id: [id], mapping: true }).then(console.log))

		// Unvote a post
		.then(() => console.log(chalk.yellow.bold("\n--- UNVOTE ---")))
		.then(() => broker.call("posts.unvote", { id }).then(console.log))
		
		// Count of posts
		.then(() => console.log(chalk.yellow.bold("\n--- COUNT ---")))
		.then(() => broker.call("posts.count").then(console.log))
		
		// Remove a post
		.then(() => console.log(chalk.yellow.bold("\n--- REMOVE BY ID ---")))
		.then(() => broker.call("posts.remove", { id }).then(console.log))

		// Count of posts
		.then(() => console.log(chalk.yellow.bold("\n--- COUNT ---")))
		.then(() => broker.call("posts.count").then(console.log))

		// Error handling
		.catch(console.error)

		// Stop
		.then(() => broker.stop());


});
