const db = require('_helpers/db');

module.exports = {
	getAll,
	getById,
	getByBusiness,
  getAllByBusiness,
	create,
	update,
	delete: _delete
};

async function getAll() {
  return await db.Links.findAll();
}

async function getById(id) {
  return await getLink(id);
}

async function getByBusiness(business_id) {
	const link = await db.Links.findOne({ where: { business_id } });
	if (!link) throw 'Link not found';
	return link;
}

async function getAllByBusiness(business_id) {
	const links = await db.Links.findAll({ where: { business_id } });
	if (!links) throw 'Links not found';
	return links;
}

async function getByLink(link) {
	const lnk = await db.Links.findOne({ where: { link } });
	if (!lnk) throw 'Link not found';
	return lnk;
}

async function create(params) {
	// validate
	if ( await db.Links.findOne({ where: { link: params.link } }) ) {
		throw 'Email or username is already registered';
	}

	const blinkiz = new db.Links(params);

	// save user
	await link.save();
}

async function update(id, params) {
	const link = await getLink(id);

	// validate
	const linkChanged = params.link && user.link !== params.link;
	if (linkChanged && await db.Links.findOne({ where: { link: params.link } })) {
		throw 'Link "' + params.link + '" is already registered';
	}

	// copy params to user and save
	Object.assign(link, params);
	await link.save();
}

async function _delete(id) {
	const link = await getLink(id);
	await link.destroy();
}

// helper functions

async function getLink(id) {
	const link = await db.Links.findByPk(id);
	if (!link) throw 'Link not found';
	return link;
}
