"use strict";

const { ServiceBroker } = require("moleculer");
const DbService = require("../../src");

/* istanbul ignore next */
module.exports = function(adapter) {

	function protectReject(err) {
		console.error(err);
		console.error(err.stack);
		expect().toBe(true);		
	}

	describe("Test populates feature", () => {
		// Create broker
		let broker = new ServiceBroker({
			logger: console,
			logLevel: "error"
		});

		// Load my service
		broker.createService(DbService, {
			name: "posts",
			settings: {
				fields: ["_id", "title", "content", "author"],
				populates: {
					author: {
						action: "users.get"
					}
				}
			}
		});

		// Load my service
		broker.createService(DbService, {
			name: "users",
			settings: {
				fields: ["_id", "username", "name"]
			}
		});

		let posts = [
			{ title: "My first post", content: "This is the content", votes: 2},
			{ title: "Second post", content: "Waiting for the next...", votes: 0},
			{ title: "My last post", content: "This is the end! Good bye!", votes: 5}
		];

		let users = [
			{ username: "john", name: "John", password: "123456" },
			{ username: "jane", name: "Jane", password: "password" },
			{ username: "walter", name: "Walter", password: "H31s3nb3rg" }
		];

		beforeAll(() => {
			return broker.start().then(() => {
				return broker.call("users.create", { entity: users }).then(res => {
					res.forEach((e, i) => users[i]._id = e._id);

					posts[0].author = res[2]._id;
					posts[1].author = res[0]._id;
					posts[2].author = res[1]._id;

					return broker.call("posts.create", { entity: posts }).then(res => {
						res.forEach((e, i) => posts[i]._id = e._id);
					});
				});

			});
		});
		
		it("should return with count of entities", () => {
			return broker.call("posts.count").catch(protectReject).then(res => {
				expect(res).toBe(3);
			});
		});

		it("should return with the entity and populate the author", () => {
			return broker.call("posts.get", { id: posts[0]._id, populate: ["author"] }).catch(protectReject).then(res => {
				expect(res).toEqual({
					"_id": posts[0]._id, 
					"author": {"_id": users[2]._id, "name": "Walter", "username": "walter"}, 
					"content": "This is the content", 
					"title": "My first post"
				});
			});
		});

		it("should return with multiple entities by IDs", () => {
			return broker.call("posts.get", { 
				id: [posts[2]._id, posts[0]._id], 
				populate: ["author"], 
				fields: ["title", "author.name"] 
			}).catch(protectReject).then(res => {
				expect(res).toEqual([
					{"author": {"name": "Jane"}, "title": "My last post"}, 
					{"author": {"name": "Walter"}, "title": "My first post"}
				]);
			});
		});

		it("should return with multiple entities as Object", () => {
			return broker.call("posts.get", { 
				id: [posts[2]._id, posts[0]._id], 
				fields: ["title", "votes"], 
				mapping: true 
			}).catch(protectReject).then(res => {
				expect(res[posts[0]._id]).toEqual({"title": "My first post"}); 
				expect(res[posts[2]._id]).toEqual({"title": "My last post"}); 
			});
		});

	});	
};

describe("", ()=> it("", () => expect(true).toBe(true)));