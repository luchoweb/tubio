const db = require('_helpers/db');

module.exports = {
	getAll,
	getById,
	getByUsername,
	create,
	update,
	delete: _delete
};

async function getAll() {
  return await db.Business.findAll();
}

async function getById(id) {
  return await getBusiness(id);
}

async function getByUsername(username) {
	const biz = await db.Business.findOne({ where: { username } });
	if (!biz) throw 'Business not found';

	let links = [];
	const { id: business_id } = biz.dataValues;
	links = await db.Links.findAll({ where: { business_id } });

	return {
		biz,
		links
	};
}

async function create(params) {
	// validate
	if (await db.Business.findOne({ where: { email: params.email } }) || await db.Business.findOne({ where: { username } })) {
		throw 'Email or username is already registered';
	}

	const biz = new db.Business(params);

	// save user
	await biz.save();
}

async function update(id, params) {
	const biz = await getBusiness(id);

	// validate
	const usernameChanged = params.username && user.username !== params.username;
	if (usernameChanged && await db.Business.findOne({ where: { username: params.username } })) {
		throw 'Username "' + params.username + '" is already taken';
	}

	// copy params to user and save
	Object.assign(biz, params);
	await biz.save();
}

async function _delete(id) {
	const user = await getUser(id);
	await user.destroy();
}

// helper functions

async function getBusiness(id) {
	const biz = await db.Business.findByPk(id);
	if (!biz) throw 'Bussines not found';
	return biz;
}

async function validateUsername(username) {
	if (db.Business.findOne({ where: { username } })) {
		throw 'Username "' + username + '" is already taken';
	}
}